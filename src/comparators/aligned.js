(function() {
    'use strict';

    module.exports = function(elements, orientation, options) {
        var stripErrorElements;
        if(orientation === 'horizontal') {
            // check if options are sane.
            if (options && (options.left || options.right)) {
                console.error('options left or right do not make sense when checking horizontal alignment');
                return;
            }
            options = (!options) ? {top: true, bottom: true }: options;
            // get all element locations
            stripErrorElements = elements.filter(function(element, index, arr) {

                // do we still have a next element?
                var last = index+1 === arr.length;
                if (!last) {
                    return element.getLocation().then(function(locThis) {
                        return arr[index+1].getLocation().then(function(locNext) {
                            var topOk = (locThis.y === locNext.y), bottomOk;

                            if(options.bottom) {
                                return element.getSize().then(function(sizeThis) {
                                    return arr[index+1].getSize().then(function(sizeNext) {
                                        bottomOk = (locThis.y + sizeThis.height) === (locNext.y + sizeNext.height);
                                    });
                                });
                            }
                            if(options.top && options.bottom) {
                                return topOk && bottomOk;
                            } else if (options.top) {
                                return topOk;
                            } else if (options.bottom) {
                                return bottomOk;
                            }
                        });
                    });
                }
            });
        } else if (orientation === 'vertical') {
            if (options && (options.top || options.bottom)) {
                console.error('options top or bottom do not make sense when checking vertical alignment');
                return;
            }
        } else {
            console.error('no orientation provided');
            return;
        }

        return stripErrorElements.length === elements.length;
    };
})();
