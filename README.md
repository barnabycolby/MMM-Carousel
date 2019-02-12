# MMM-Carousel w/ Slide Navigation
> This is an extension to the [MagicMirror](https://github.com/MichMich/MagicMirror) project, allowing the modules to be displayed in a rotating carousel instead of displaying all of them at once.
> This version of the module was forked from [barnabycolby's MMM-Carousel](https://github.com/barnabycolby/MMM-Carousel).
>  
>    There are three modes available:
* `'global'` - All modules not cited in the `ignoreModules` config are rotated, displaying only one at a time for the duration of `transitionInterval`.  This is particularly useful on small screens where there may not be enough space to display several components at once. 
* `'positional'` - Modules are grouped by `position` setting and rotated within a position except for modules listed in that position's `ignoreModules`, an `overrideTransitionInterval` can also be set to rotated different position at different speeds.
* `'slides'` - groups of modules can be assigned to be displayed at the same time (regardless of `position`), an unlimited number of these "slide" groups can be set up. Module positions and appearances can also be changed for each slide.
* ***New:*** Slide Indicators and Navigation Buttons can be enabled (see config settings)

    ![](https://raw.githubusercontent.com/shbatm/MMM-Carousel/wip/img/slide.jpg)

    ![](https://raw.githubusercontent.com/shbatm/MMM-Carousel/wip/img/navbar.jpg)
    
    Screencast (from @AgilesChroms) : https://www.youtube.com/watch?v=2WTgQLaAMQk

* ***New:*** Modules can be moved to different positions and CSS classes applied to them for each slide.
* ***New:*** Multiple instances of a module can be used on different slides.
* ***New:*** Integration with [MMM-KeyBindings](https://github.com/shbatm/MMM-KeyBindings) for keyboard and bluetooth remote navigation.

## Installation
Run these commands at the root of your magic mirror install.

```shell
cd modules
git clone https://github.com/shbatm/MMM-Carousel
```

## Using the module
To use this module, add the following configuration block to the modules array in the `config/config.js` file:
```js
var config = {
    modules: [
        {
            module: 'MMM-Carousel',
            position: 'bottom_bar',  // Only required to show navigation
            config: {
                // See below for configurable options
            }
        }
    ]
}
```

Note that a `position` setting is required only if you want to show the page navigation icons and buttons.

### Configuration options
The following properties can be configured:

<table width="100%">
	<!-- why, markdown... -->
	<thead>
		<tr>
			<th>Option</th>
			<th width="100%">Description</th>
		</tr>
	<thead>
	<tbody>
		<tr>
			<td><code>mode</code></td>
			<td><ul><li><code>'global'</code> - All modules not cited in the <code>ignoreModules</code> config are rotated, displaying only one at a time for the duration of <code>transitionInterval</code>.  This is particularly useful on small screens where there may not be enough space to display several components at once. 
                </li><li><code>'positional'</code> - Modules are grouped by <code>position</code> setting and rotated within a position except for modules listed in that position's <code>ignoreModules</code>, an <code>overrideTransitionInterval</code> can also be set to rotated different position at different speeds.
                </li><li><code>'slides'</code> - groups of modules can be assigned to be displayed at the same time (regardless of <code>position</code>), an unlimited number of these "slide" groups can be set up.</li></ul>
				<br> <br> This value is <b>OPTIONAL</b>
				<br><b>Possible values:</b> <code>'global'</code> or <code>'positional'</code> or <code>'slides'</code>
                <br><b>Default value:</b> <code>'global'</code>
			</td>
		</tr>
		<tr>
			<td><code>transitionInterval</code></td>
			<td>The number of milliseconds to display each module for.
				<br> <br> This value is <b>OPTIONAL</b>
				<br><b>Possible values:</b> Any valid <code>int</code>, passing 0 with <code>mode:"slides"</code> will disable the timer for manual navigation.
                <br><b>Default value:</b> <code>10000</code>
			</td>
		</tr>
        <tr>
            <td><code>slideTransitionSpeed</code></td>
            <td>The speed in milliseconds to fade in each module.
                <br> <br> This value is <b>OPTIONAL</b>
                <br><b>Possible values:</b> Any valid <code>int</code>
                <br><b>Default value:</b> <code>1500</code> (ms)
            </td>
        </tr>
		<tr>
			<td><code>ignoreModules</code></td>
			<td>A list of module names whom should not be considered as part of the carousel. For example, the `alert` module should be able to display a notification at any time, by ignoring it we can prevent the plugin from hiding any notifications. <b> NOTE: is only used in <code>'global'</code> and <code>'slides'</code> modes.  Ignored modules in <code>'slides'</code> mode are shown on every slide.</b>.
				<br> <br> This value is <b>OPTIONAL</b>
				<br><b>Possible values:</b> <code>String array</code>
                <br><b>Default value:</b> <code>[]</code>
			</td>
		</tr>
		<tr>
			<td>
			    <code>top_bar</code>
			    <br><code>top_left</code>
			    <br><code>top_center</code>
			    <br><code>top_right</code>
			    <br><code>upper_third</code>
			    <br><code>middle_center</code>
			    <br><code>lower_third</code>
			    <br><code>bottom_left</code>
			    <br><code>bottom_center</code>
			    <br><code>bottom_right</code>
			    <br><code>bottom_bar</code>
			</td>
			<td>Determines if this position should be rotated and which modules in this position should be ignored.  <b>NOTE: is only used when <code>mode</code> is <code>'positional'</code> otherwise ignored</b>.
				<br> <br> This value is <b>OPTIONAL</b>
				<br><b>Possible values:</b> Object with keys;
				<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <code>enabled</code>, a boolean to rotate this position or not,
				<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <code>ignoredModules</code>, a <code>String array</code> of modules names to ignore.
				<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <code>overrideTransitionInterval</code>, a <code>int</code> a transition time for this position only.
                <br><b>Default value:</b> <code>{enabled: false, ignoreModules: [], overrideTransitionInterval: 10000}</code>
			</td>
		</tr>
		<tr>
        			<td><code>slides</code></td>
        			<td>See Examples below. The slides will be rotated as a complete set using the <code>transitionInterval</code> setting.  Ingnored modules (<code>ignoreModules</code>) will be diplayed on all slides.
        				<br> <br> This value is <b>OPTIONAL</b>
        				<br><b>Possible values:</b> <code>array of String/Object array</code> <a href="#advanced-slides">(see below)</a>
                        <br><b>Default value:</b> <code>[[]]</code>
        			</td>
        		</tr>
        <tr>
            <td><code>showPageIndicators</code></td>
            <td>A <code>boolean true or false</code> to show or hide the page indication 'bubbles' at the bottom of the screen. Default is <code>true</code>.
            </td>
        </tr>
        <tr>
            <td><code>showPageControls</code></td>
            <td>A <code>boolean true or false</code> to show or hide the next and previous page buttons. Buttons will only appear when hovered near or over. They can be clicked when not visible. Default is <code>true</code>.
            </td>
        </tr>
	<tr>
		<td><code>keyBindings: {</code><br>
            &nbsp;&nbsp;<code>enabled: true,</code><br>
            &nbsp;&nbsp;<code>mode: "DEFAULT",</code><br>
&nbsp;&nbsp;<code>map: {</code><br>
&nbsp;&nbsp;&nbsp;&nbsp;<code>NextSlide:"ArrowRight",</code><br>
&nbsp;&nbsp;&nbsp;&nbsp;<code>PrevSlide:"ArrowLeft",</code><br>
&nbsp;&nbsp;&nbsp;&nbsp;<code>Slide0:"Home"</code><br>
&nbsp;&nbsp;<code>}</code><br>
<code>}</code></td>
		<td>Key bindings to use for navigation with <A href="https://github.com/shbatm/MMM-KeyBindings">MMM-KeyBindings</A> plugin. The values are the KeyNames to respond to from the <code>"KEYPRESS"</code> events generated in MMM-KeyBindings.<br>Note: any <code>Slide##</code> can be assigned to jump to a specific slide.</td>
	</tr>
        <tr>
        <td><code>keyBindings.mode</code></td>
        <td>Mode Keyword for responding to key press events sent from <A href="https://github.com/shbatm/MMM-KeyBindings">MMM-KeyBindings</A>. Default: "DEFAULT" which repsonds to any key press when no other module has taken focus or changed the keyword.</td>
    </tr>
	</tbody>
</table>

#### Example - Global Carousel
```javascript
var config = {
    modules: [
        {
            module: 'MMM-Carousel',
            config: {
                transitionInterval: 10000,
                ignoreModules: ['clock'],
                mode: 'global'
            }
        }
    ]
}
```
#### Example - Positional Carousel
```javascript
var config = {
    modules: [
        {
            module: 'MMM-Carousel',
            config: {
                transitionInterval: 10000,
                ignoreModules: [],
                mode: 'positional',
                top_left: {enabled: true, ignoreModules: [], overrideTransitionInterval: 15000},
                top_right: {enabled: true, ignoreModules: ['currentweather']}
            }
        }
    ]
}
```
#### Example - Slides Carousel
```javascript
var config = {
    modules: [
        {
            module: 'MMM-Carousel',
            position: 'bottom_bar', // Required only for navigation controls
            config: {
                transitionInterval: 10000,
                showPageIndicators: true,
                showPageControls: true,
                ignoreModules: ['clock', 'alert'],
                mode: 'slides',
                slides: {
                    main: ['calendar', 'compliments', 'currentweather'],
                    "Slide 2": ['weatherforecast', 'MMM-Trello', 'planetrise', 'newsfeed'],
                    "Slide 3": ['MMM-fitbit']
                }
            }
        }
    ]
}
```
#### Example - Slides Carousel w/ [MMM-KeyBindings](https://github.com/shbatm/MMM-KeyBindings)
```javascript
var config = {
    modules: [
        {
            module: 'MMM-Carousel',
            position: 'bottom_bar', // Required only for navigation controls
            config: {
                transitionInterval: 10000,
                ignoreModules: ['clock', 'alert'],
                mode: 'slides',
                showPageIndicators: true,
                showPageControls: true,
                slides: {
                    main: ['calendar', 'compliments', 'currentweather'],
                    "Slide 2": ['weatherforecast', 'MMM-Trello', 'planetrise', 'newsfeed'],
                    "Slide 3": ['MMM-fitbit']
                },
                keyBindings: { 
                    enabled: true,
                    map: {
                        NextSlide: "ArrowRight", 
                        PrevSlide: "ArrowLeft", 
                        Slide0:    "Home"
                    },
                    mode: "DEFAULT"
                }
            }
        }
    ]
}
```

#### <a name="advanced-slides"></a>Example - Advanced Slides Carousel
The `slides` parameter can accept an array of both String or an Object of the form: `{ name: "ModuleName", position: "top_left", classes: "CSSclassName", carouselId: "1" }`. 
Passing a config similar to the following shows a large clock on the first slide and then a small clock and additional modules on the second.  `carouselId` is an optional parameter which can be used to set a unique identifier for multiple instances of a module. To use, set the same parameter in the module's `config` section.
```
    mode: 'slides',
    slides: {
        Main: [   {name:'clock', classes:'zoom200', position:"middle_center", carouselId: "1"} ],
        "Slide 2: [   {name:'clock', classes:'', position:"top_left", carouselId: "2"}, 
            {name:'calendar', position:'top_left'}, 
            'MMM-WunderGround', 
            'newsfeed'
        ]
    }
```

**Note:** The `zoomXXX` classes are available to change the scaling of a module. Using the methods above, you can pass `classes:'zoom%%%'` to scale a single module to a larger or smaller size.  Supported zooms are 070%, 080%, 090%, 125%, 150%, 175%, and 200%. Pass `classes:''` for 100%.  Edit your `'css/custom.css'` file to add additional classes.

## Navigation from other modules

You can navigate to different slides or transition points manually from other modules by sending a Module Notification:

| Notification | Action |
| :-: | - |
| `CAROUSEL_NEXT` | Move to the next transition or slide.
| `CAROUSEL_PREVIOUS` | Move back to the previous transition or slide.
| `CAROUSEL_GOTO` | Move to a given slide/tranistion index.<br>Pass a string or integer in the payload to go to a slide (e.g. `this.sendNotification("CAROUSEL_GOTO", "1")` will jump to the first slide). If you use named slides, you can also pass the slide name in an object (`this.sendNotification("CAROUSEL_GOTO", { slide: "Home" })`). 

### This module is compatable with MMM-Remote-Control's API (v2 or above)

- To see available actions, navigate to `http://magicmirrorip:8080/api/module/carousel`. You can then call the actions using curl or any other web browser/navigator:

```shell
curl -X GET http://magicmirrorip:8080/api/module/carousel/action
```
