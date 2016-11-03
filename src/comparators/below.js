(function() {
    'use strict';
    var utils = require('../utils/utils');

    module.exports = function(element1, element2, range) {
        return element1.getLocation().then(function(loc1) {
            return element2.getLocation().then(function(loc2) {
                return utils.elementHeight(element2).then(function(height) {
                    if (range) {
                        return utils.distanceWithinRange(range, loc1.y, (loc2.y+ height));
                    }
                    return loc1.y <= (loc2.y + height);
                });
            });
        });
    };
})();
