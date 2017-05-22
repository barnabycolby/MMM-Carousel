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

## [0.1.1] - Added manual transitions

Changes:

* Added manual transitions between slides
* Added optional Pagination indicators at the bottom of the screen to show what slide is currently showing.
* Added hidden next/previous page controls that show on hover in each lower corner

## [0.1.0] - First public release

First public release
