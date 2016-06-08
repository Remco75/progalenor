(function(){
    'use strict';

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

    module.exports = {
        elementWidth: elementWidth,
        elementHeight: elementHeight,
        distanceWithinRange: distanceWithinRange
    }
})();