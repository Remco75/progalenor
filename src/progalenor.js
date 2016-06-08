'use strict';

/**
 *  This PO helps with responisiveness testing.
 *  All comparator functions take 2 prostractor elements
 * @constructor
 */

var breakpoints = [];

var RespPO = function (bpObj) {
    if (bpObj) {
        breakpoints = bpObj;
    } else {
        console.log('please supply a object with your breakpoints');
    }
};

RespPO.prototype = Object.create({}, {
    selectMediaQuery: {
        value: function(mq) {
            // set the window width in the center of a media query bandwidth
            var width;
            breakpoints.forEach(function(breakPoint, index) {
                if( breakPoint.name === mq) {
                    if(index < breakpoints.length-1) {
                        width =  (breakPoint.start + breakpoints[index+1].start) / 2
                    } else {
                        width = breakPoint.start+200;
                    }
                }
            });
            return browser.manage().window().setSize(width, 480);
        }
    },
    isAbove: {
        value: require('./comparators/above')
    },
    isBelow: {
        value: require('./comparators/below')
    },
    isLeftOf: {
        value: require('./comparators/left')
    },
    isRightOf: {
        value: require('./comparators/right')
    },
    isInside: {
        value: require('./comparators/inside')
    },
    hasWidth: {
        value: function(element) {
            return elementWidth(element);
        }
    },
    hasHeight: {
        value: function(element) {
            return elementHeight(element);
        }
    }
});


module.exports = RespPO;