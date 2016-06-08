# Progalenor - Responive testing with protractor

Note: You are looking at a early release, the api is still limited, and subject to change.

## What? 
Progalenor is a helper page object to help you write cucumber (or old skool protrator jasmine) tests for pages with responsive behaviour.
It allows you to easily write descriptive feature files or spec descriptions in a 'galen-like' syntax. So kuddo's to the Galen team where kuddo's are due. 

## Why?
For responsive testing you can of course use galen. Although I really like it's idea and descriptive syntax, it is yet another assertion framework, and another application in your build env.
I use protractor / cucumber, so I wanted a tool to do css - less ui-testing of responsive ui's with these tools.

## Usage
### startup
Add this module as (dev)dependency and in you test file do somethin like ` PO = require('progalenor'), `.
If you want to do responsive testing  we need to tell progalenor about our css-breakpoint. we do this by suplying an array, here's my example:

` var breakpoints = [
  { name: 'xs', start: 0 },
  { name: 'sm', start: 768 },
  { name: 'md', start:1024 },
  { name: 'lg', start:1440 }
]
`

You pass in in the constructor of the module: ` var myResponsiveTestTool = new PO(breakpoints)`; 
Now we are ready to test!

### Setting the stage
In order to test in a breakpoint, so can set the browser in the correct width by : ` myResponsiveTestTool.selectMediaQuery('xs')` . Or use any other mediaQuery name 
in the array we just put in there.

### comparisions
Most comparator-functions (see API section below) take 2 protractor elements as input. The first is the base-element, the second is the element to compare agains.
So if you ` myResponsiveTestTool.isLeftOf(el1,el2) ` , you assume that el1 is left of el2. All comparators return a boolean.

###  range
All comparators take an optional range argument. This is a object in the form of { min: "someNumber", max: "someNumber" }. Values are in px.
So if you state ` myResponsiveTestTool.isLeftOf(el1, el2, { min:10, max:20 })`, you expect el1 to be left of el2 with a margin in between of 10 to 20 px.

### API
The following comparator methods are available:
- isAbove
- isBelow
- isLeftOf
- isRightOf
- isInside
 
## examples with cucumber
Soon to come
