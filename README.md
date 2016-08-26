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
#### ignoreModules
Type: `String array` Default value: `[]`

A list of module names whom should not be considered as part of the carousel. For example, the `alert` module should be able to display the a notification at any time, by ignoring it we can prevent the plugin from hiding any notifications.

#### transitionInterval
Type: `Integer` Default value: `10000`

The number of milliseconds to display each module for.
