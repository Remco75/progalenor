(function() {
    'use strict';
    var utils = require('../utils/utils');

    module.exports = function(element1, element2, range) {
        return element1.getLocation().then(function(loc1) {
            return utils.elementWidth(element2).then(function(width){
                return  element2.getLocation().then(function(loc2) {
                    if (range) {
                        return utils.distanceWithinRange(range, (loc2.x + width), loc1.x);
                    }
                    return loc1.x > loc2.x + width;
                });
            });
        });
    };
})();
