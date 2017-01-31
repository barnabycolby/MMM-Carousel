# MMM-Carousel
> This is an extension to the [MagicMirror](https://github.com/MichMich/MagicMirror) project, allowing the modules to be displayed in a rotating carousel instead of displaying all of them at once. There are three modes available:
* `'global'` - All modules not cited in the `ignoreModules` config are rotated, displaying only one at a time for the duration of `transitionInterval`.  This is particularly useful on small screens where there may not be enough space to display several components at once. 
* `'positional'` - Modules are grouped by `position` setting and rotated within a position except for modules listed in that position's `ignoreModules`, an `overrideTransitionInterval` can also be set to rotated different position at different speeds.
* `'slides'` - groups of modules can be assigned to be displayed at the same time (regardless of `position`), an unlimited number of these "slide" groups can be set up.

[![Build Status](https://travis-ci.org/barnabycolby/MMM-Carousel.svg?branch=master)](https://travis-ci.org/barnabycolby/MMM-Carousel)

## Installation
Run these commands at the root of your magic mirror install.

```shell
cd modules
git clone https://github.com/barnabycolby/MMM-Carousel
```

## Using the module
To use this module, add the following configuration block to the modules array in the `config/config.js` file:
```js
var config = {
    modules: [
        {
            module: 'MMM-Carousel',
            config: {
                // See below for configurable options
            }
        }
    ]
}
```

Note that a `position` setting is not required.

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
				<br><b>Possible values:</b> Any valid <code>int</code>
                <br><b>Default value:</b> <code>10000</code>
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
        			<td>An array of string arrays.  Each string array is a list of content for an individual slide.  The slides will be rotated as a complete set using the <code>transitionInterval</code> setting.  Ingnored modules (<code>ignoreModules</code>) will be diplayed on all slides.
        				<br> <br> This value is <b>OPTIONAL</b>
        				<br><b>Possible values:</b> <code>array of String array</code>
                        <br><b>Default value:</b> <code>[[]]</code>
        			</td>
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
            config: {
                transitionInterval: 10000,
                ignoreModules: ['clock', 'alert'],
                mode: 'slides',
                slides: [
                    ['calendar', 'compliments', 'currentweather'],
                    ['weatherforecast', 'MMM-Trello', 'planetrise', 'newsfeed'],
                    ['MMM-fitbit']
                ]
            }
        }
    ]
}
```