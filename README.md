# MMM-Carousel
> This is an extension to the [MagicMirror](https://github.com/MichMich/MagicMirror) project, allowing the modules to be displayed in a rotating carousel instead of displaying all of them at once. This is particularly useful on small screens where there may not be enough space to display several components at once. Each module is displayed in turn for a configurable amount of time before displaying the next module in the list.

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
{
    module: 'MMM-Carousel',
    config: {
        // See below for configurable options
    }
}
```

Note that a `position` setting is not required.

A typical config file is also provided: [config.sample.js](config.sample.js)

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
			<td><code>transitionInterval</code></td>
			<td>The number of milliseconds to display each module for.
				<br> <br> This value is <b>OPTIONAL</b>
				<br><b>Possible values:</b> Any valid <code>int</code>
                <br><b>Default value:</b> <code>10000</code>
			</td>
		</tr>
		<tr>
			<td><code>ignoreModules</code></td>
			<td>A list of module names whom should not be considered as part of the carousel. For example, the `alert` module should be able to display a notification at any time, by ignoring it we can prevent the plugin from hiding any notifications. <b> NOTE: is only used when <code>global</code> is <code>true</code></b>.
				<br> <br> This value is <b>OPTIONAL</b>
				<br><b>Possible values:</b> <code>String array</code>
                <br><b>Default value:</b> <code>[]</code>
			</td>
		</tr>
		<tr>
			<td><code>global</code></td>
			<td>When true all modules regardless of position are rotated.  When false each <code>position</code> is rotated independantly according to the config for that position. (see below).
				<br> <br> This value is <b>OPTIONAL</b>
				<br><b>Possible values:</b> <code>true</code> or <code>false</code>
                <br><b>Default value:</b> <code>true</code>
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
			    <br><code>Bottom_right</code>
			    <br><code>bottom_bar</code>
			</td>
			<td>Determines if this position should be rotated and which modules in this position should be ignored and always displayed.  <b>NOTE: is only used when <code>global</code> is <code>false</code></b>.
				<br> <br> This value is <b>OPTIONAL</b>
				<br><b>Possible values:</b> Object with keys;
				<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <code>enabled</code>, a boolean to rotate this position or not,
				<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <code>ignoredModules</code>, a <code>String array</code> of modules nemes to ignore.
                <br><b>Default value:</b> <code>{enabled: false, ignoreModules: []}</code>
			</td>
		</tr>
	</tbody>
</table>

#### Example
```json
{
    module: 'MMM-Carousel',
    config: {
        transitionInterval: 10000,
        ignoreModules: [],
        global: false,
        top_left: {enabled: true, ignoreModules: []},
        top_right: {enabled: true, ignoreModules: ['currentweather']}
    }
}
```