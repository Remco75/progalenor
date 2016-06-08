(function() {
    'use strict';
    var utils = require('../utils/utils');
    // visual test for specifying that one box is completely inside the other box.
    // Range will supply a padding-like test

    module.exports = function(element1, element2, range) {
        return element1.getLocation().then(function(loc1) {
            return element1.getSize().then(function(size1){
                return  element2.getLocation().then(function(loc2) {
                    return element2.getSize().then(function(size2) {
                        var widthOk = (loc1.x > loc2.x && loc1.x+size1.width < loc2.x+size2.width) ,
                            heightOk = (loc1.y > loc2.y && loc1.y+size1.height < loc2.y+ size2.height);

                        if (range) {
                            var leftRange = utils.distanceWithinRange(range, loc2.x , loc1.x),
                                rightRange = utils.distanceWithinRange(range, loc1.x+size1.width, (loc2.x+size2.width)),
                                topRange = utils.distanceWithinRange(range, loc1.y, loc2.y),
                                bottomRange = utils.distanceWithinRange(range, (loc1.y+size1.height), (loc2.y+ size2.height));
                            return leftRange && rightRange && topRange && bottomRange;
                        }
                        return widthOk && heightOk
                    });
                });
            });
        });
    };
})();
