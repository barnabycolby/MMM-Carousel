## <a name="0_2_6"></a>[0.2.6] - Named Slide Support & Update for new MMM-KeyBindings

* Added support for named slides.
* Updated Key Handling for new MMM-KeyBindings methods.
* Broadcast API request to new MMM-Remote-Control API.

## <a name="0_2_5"></a>[0.2.5] - Added direct controls via Notification.

* Added control from Module Notification (See [README](README.md#Navigation-from-other-modules)).
* Removed unneccessary and unused tests and Grunt file.

## <a name="0_2_4"></a>[0.2.4] - Module Fix for bug in MichMich/MagicMirror#1140

* Uses 'MODULE_DOM_CREATED' notification instead of 'DOM_OBJECTS_CREATED'

## <a name="0_2_4"></a>[0.2.4] - Added slideTranistionSpeed Parameter per #4

* Added a parameter for slide transition speed. Default is 1500ms.


## <a name="0_2_3"></a>[0.2.3] - Fix for #1 - Fix timed transition for slides

* Bug fix for Issue #1 -- Correct issue where setting transitionInterval for a "slides" configuration doesn't actually cause the slides to transition automatically.

## <a name="0_2_2"></a>[0.2.2] - Added support for MMM-KeyBindings Instances

* Added support for using MMM-KeyBindings control with multiple instances of the MagicMirror open.  For example, you can use a remote on the screen attached to the Raspberry Pi (SERVER) and use a keyboard on another computer with the mirror running in a browswer (LOCAL) to independently change slides on the respective screens.


## <a name="0_2_1"></a>[0.2.1] - Multiple instances of a module

Changes:

* Added the ability to handle mutiple instances of a module. To use, add a `carouselId: "uniqueString"` to each modules' `config` section:
```
        {
            module: "clock",
            position: "top_left",
            config: {
				carouselId: "1",
                displayType: "both"
            }
        },
        {
            module: "clock",
            position: "top_left",
            config: {
				carouselId: 2,
			}
        },
        {
            module: 'MMM-Carousel',
            position: "bottom_bar",
            config: {
                mode: 'slides',
                slides: [
                    [   {name:'clock', classes:'zoom200', position:"top_left", carouselId: "1"} ],
                    [   {name:'clock', classes:'', position:"top_left", carouselId: 2},  ]]
            }
        },
```

## [0.2.0] - Added manual-only slides and per-slide positions & classes

Changes:

* Added the ability to pass an object with detail for a module on a per slide basis.  Passing a config similar to the following shows a large clock on the first slide and then a small clock and additional modules on the second.
```
    mode: 'slides',
    slides: [
        [   {name:'clock', classes:'zoom200', position:"middle_center"} ],
        [   {name:'clock', classes:'', position:"top_left"}, 
            {name:'calendar', position:'top_left'}, 
            'MMM-WunderGround', 
            'newsfeed'
        ]
```
* Made use of `zoom` classes introduced in [0.1.1]: using the method above, supported zooms are 070%, 080%, 090%, 125%, 150%, 175%, and 200%. Pass `classes:''` for 100%.
* Added support for indefinite slides -- set `transitionInterval: 0` for manual-transition only slides
* Added KeyPress events to go to specific slide index. (e.g. `Slide0: "Home"` in the KeyBindings would jump to the first slide when the home key is pushed). Works with any number of slides in the format `Slide#: "KeyName"` where # is the 0-based index of the slide.

## [0.1.1] - Added manual transitions

Changes:

* Added manual transitions between slides
* Added optional Pagination indicators at the bottom of the screen to show what slide is currently showing.
* Added hidden next/previous page controls that show on hover in each lower corner

## [0.1.0] - First public release

First public release
