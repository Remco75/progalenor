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
    isBelow: {
        value: function(element1, element2, range) {
            return element1.getLocation().then(function(loc1) {
                return element2.getLocation().then(function(loc2) {
                    return elementHeight(element2).then(function(height) {
                        if (range) {
                            return distanceWithinRange(range, loc1.y, (loc2.y+ height));
                        }
                        return loc1.y < (loc2.y + height);
                    });
                });
            });
        }
    },
    isLeftOf: {
        value: function(element1, element2, range) {
            return element1.getLocation().then(function(loc1) {
                return elementWidth(element1).then(function(width){
                    return  element2.getLocation().then(function(loc2) {
                        if (range) {
                            return distanceWithinRange(range, (loc1.x + width), loc2.x);
                        }
                        return loc1.x + width < loc2.x;
                    });
                });
            });
        }
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

/**
 * @description Checks whether the distance between 2 values is within the given range
 * @param range {object} With min and max properties
 * @param lowerInput {number} The lower value in of the distance
 * @param higherInput {number} The higher value of the distance
 * @returns {boolean}
 */
function distanceWithinRange(range, lowerInput, higherInput) {
    if (typeof range !== 'object' || !range.min || !range.max || range.min > range.max) {
        console.warn('please supply a valid range object');
        return false
    }
    if (lowerInput + range.min > higherInput) {
        console.warn('lowerBound violation');
        return false;
    }
    if (lowerInput+range.max < higherInput) {
        console.warn('higherBound violation');
        return false;
    }
    return true;
}

function elementWidth(element) {
    return element.getSize().then(function(size) {
        return size.width;
    });
}

function elementHeight(element) {
    return element.getSize().then(function(size) {
        return size.height;
    });
}

module.exports = RespPO;