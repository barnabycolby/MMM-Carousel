/*global Module, MM, setInterval */
(function () {
    'use strict';

    Module.register('MMM-Carousel', {
        defaults: {
            transitionInterval: 10000,
            ignoreModules: [],
            mode: 'global', //global || positional || slides
            top_bar: {enabled: false, ignoreModules: [], overrideTransitionInterval: 10000},
            top_left: {enabled: false, ignoreModules: [], overrideTransitionInterval: 10000},
            top_center: {enabled: false, ignoreModules: [], overrideTransitionInterval: 10000},
            top_right: {enabled: false, ignoreModules: [], overrideTransitionInterval: 10000},
            upper_third: {enabled: false, ignoreModules: [], overrideTransitionInterval: 10000},
            middle_center: {enabled: false, ignoreModules: [], overrideTransitionInterval: 10000},
            lower_third: {enabled: false, ignoreModules: [], overrideTransitionInterval: 10000},
            bottom_left: {enabled: false, ignoreModules: [], overrideTransitionInterval: 10000},
            bottom_center: {enabled: false, ignoreModules: [], overrideTransitionInterval: 10000},
            bottom_right: {enabled: false, ignoreModules: [], overrideTransitionInterval: 10000},
            bottom_bar: {enabled: false, ignoreModules: [], overrideTransitionInterval: 10000},
            slides: [
                []
            ],
            showPageIndicators: true,
            showPageControls: true
        },

        notificationReceived: function (notification) {
            var position, positions = ['top_bar', 'bottom_bar', 'top_left', 'bottom_left', 'top_center', 'bottom_center', 'top_right', 'bottom_right', 'upper_third', 'middle_center', 'lower_third'];
            if (notification === 'DOM_OBJECTS_CREATED') {
                // Initially, all modules are hidden except the first and any ignored modules
                // We start by getting a list of all of the modules in the transition cycle
                if ((this.config.mode === 'global') || (this.config.mode === 'slides')) {
                    this.setUpTransitionTimers(null);
                } else {
                    for (position = 0; position < positions.length; position += 1) {
                        if (this.config[positions[position]].enabled === true) {
                            this.setUpTransitionTimers(positions[position]);
                        }
                    }
                }
            }
        },

        setUpTransitionTimers: function (positionIndex) {
            var modules, timer = this.config.transitionInterval;
            modules = MM.getModules().exceptModule(this).filter(function (module) {
                if (positionIndex === null) {
                    return this.config.ignoreModules.indexOf(module.name) === -1;
                }
                return ((this.config[positionIndex].ignoreModules.indexOf(module.name) === -1) && (module.data.position === positionIndex));
            }, this);

            if (this.config.mode === 'slides') {
                modules.slides = this.config.slides;
            }

            if (positionIndex !== null) {
                if ((this.config[positionIndex].overrideTransitionInterval !== undefined) && (this.config[positionIndex].overrideTransitionInterval > 0)) {
                    timer = this.config[positionIndex].overrideTransitionInterval;
                }
            }

            modules.currentIndex = -1;
            modules.showPageIndicators = this.config.showPageIndicators; 
            modules.showPageControls = this.config.showPageControls;
            this.moduleTransition.call(modules);

            // Reference to function for manual transitions
            this.manualTransition = this.moduleTransition.bind(modules);

            // We set a timer to cause the page transitions
            this.transitionTimer = setInterval(this.manualTransition, timer);
        },

        moduleTransition: function (goToIndex=-1, goDirection=0) {
            var i, resetCurrentIndex = this.length;
            if (this.slides !== undefined) {
                resetCurrentIndex = this.slides.length;
            }

            // Update the current index
            if (goToIndex === -1) {                             // Go to a specific slide?
                if (goDirection === 0) {
                    this.currentIndex += 1;                     // Normal Transition, Increment by 1
                } else {
                    this.currentIndex += goDirection;           // Told to go a specific direction
                }
                if (this.currentIndex >= resetCurrentIndex) {   // Wrap-around back to beginning
                    this.currentIndex = 0;
                } else if (this.currentIndex < 0) {
                    this.currentIndex = resetCurrentIndex - 1;  // Went too far backwards, wrap-around to end
                }
            } else if (goToIndex >= 0 && goToIndex < resetCurrentIndex) {
                this.currentIndex = goToIndex;                  // Go to a specific slide if in range
            }

            for (i = 0; i < this.length; i += 1) {
                // There is currently no easy way to discover whether a module is ALREADY shown/hidden
                // In testing, calling show/hide twice seems to cause no issues
                if (((this.slides === undefined) && (i === this.currentIndex)) || ((this.slides !== undefined) && (this.slides[this.currentIndex].indexOf(this[i].name) !== -1))) {
                    this[i].show(1500);
                } else {
                    this[i].hide(0);
                }
            }

            // Update the DOM if we're using it.
            if (this.showPageIndicators || this.showPageControls) {
                var slider = document.getElementById("slider_" + this.currentIndex);
                slider.checked = true;
                var label

                if (this.showPageIndicators) {
                    var currPages = document.getElementsByClassName("MMMCarouselCurrentPage");
                    if (currPages && currPages.length > 0) {
                        for(i = 0; i < currPages.length; i++)
                        {
                           currPages[i].classList.remove('MMMCarouselCurrentPage');
                        }
                    }
                    document.getElementById("sliderLabel_" + this.currentIndex).classList.add('MMMCarouselCurrentPage');
                }
                
                if (this.showPageControls) {
                    var currBtns = document.getElementsByClassName("MMMCarouselAvailable");
                    if (currBtns && currBtns.length > 0) {
                        while (currBtns.length > 0) {
                            console.log("removing " + currBtns[0].id);
                           currBtns[0].classList.remove('MMMCarouselAvailable');
                        }
                    }
                    if (this.currentIndex !== resetCurrentIndex - 1) {
                        console.log("Trying to enable button sliderNextBtn_" + (this.currentIndex+1));
                        document.getElementById("sliderNextBtn_" + (this.currentIndex+1)).classList.add('MMMCarouselAvailable');
                    }
                    if (this.currentIndex !== 0) {
                        console.log("Trying to enable button sliderPrevBtn_" + (this.currentIndex-1))
                        document.getElementById("sliderPrevBtn_" + (this.currentIndex-1)).classList.add('MMMCarouselAvailable');
                    }
                }
            }
        },

        manualTransitionCallback: function (slideNum) {
        	console.log("manualTransition was called by slider_" + slideNum);
        	// Perform the manual transitio
            this.manualTransition(slideNum);

            // Restart the timer
            clearInterval(this.transitionTimer);
            this.transitionTimer = setInterval(this.manualTransition, this.config.transitionInterval);
        },

        getStyles: function() {
            return ["MMM-Carousel.css"];
        },

        /* getDom()
		 * This method generates the dom which needs to be displayed. This method is called by the Magic Mirror core.
		 * This method needs to be subclassed if the module wants to display info on the mirror.
		 *
		 * return domobject - The dom to display.
		 */
		getDom: function () {
			var self = this;
			var div = document.createElement("div");
            div.className = "MMMCarouselContainer";

			function makeOnChangeHandler(id) {
			    return function () {
			        self.manualTransitionCallback(id);
			    };
			}

			if (this.config.mode === "slides" && (this.config.showPageIndicators || this.config.showPageControls)) {
			
                var paginationWrapper = document.createElement("div");
                paginationWrapper.className = "slider-pagination";

                for (var i = 0; i < this.config.slides.length; i++) {
                    var input = document.createElement("input");
                    input.type = "radio";
                    input.name = "slider";
                    input.id = "slider_" + i;
                    input.className = "slide-radio";
                    input.onchange = makeOnChangeHandler(i);
                    paginationWrapper.appendChild(input);
                }

                if (this.config.showPageIndicators) {
					for (i = 0; i < this.config.slides.length; i++) {
						var label = document.createElement("label");
						label.setAttribute("for", "slider_" + i);
                        label.id = "sliderLabel_" + i;
						paginationWrapper.appendChild(label);
					}
				}

                div.appendChild(paginationWrapper);

				if (this.config.showPageControls) {
					var nextWrapper = document.createElement("div");
					nextWrapper.className = "next control";
					
					var previousWrapper = document.createElement("div");
					previousWrapper.className = "previous control";

					for (var j = 0; j < this.config.slides.length; j++) {	
						if (j !== 0) {
							var nCtrlLabelWrapper = document.createElement("label");
							nCtrlLabelWrapper.setAttribute("for", "slider_" + j);
                            nCtrlLabelWrapper.id = "sliderNextBtn_" + j;
							nCtrlLabelWrapper.innerHTML = '<i class="fa fa-arrow-circle-right"></i>';
							nextWrapper.appendChild(nCtrlLabelWrapper);
						}

						if (j !== this.config.slides.length - 1) {
							var pCtrlLabelWrapper = document.createElement("label");
                            pCtrlLabelWrapper.setAttribute("for", "slider_" + j);
                            pCtrlLabelWrapper.id = "sliderPrevBtn_" + j;
							pCtrlLabelWrapper.innerHTML = '<i class="fa fa-arrow-circle-left"></i>';
							previousWrapper.appendChild(pCtrlLabelWrapper);
						}
					}

					div.appendChild(nextWrapper);
					div.appendChild(previousWrapper);
				}
			}
			return div;
		},
    });
}());
