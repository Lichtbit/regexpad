/**
 * Generates one help step
 * Highlight an element
 *
 * @author Georg Limbach <georf@dev.mgvmedia.com>
 *
 * @constructor
 * @param {String} element jquery selector string
 */
function HighlightStep(element) {
    "use strict";

    /**
     * run method
     * @type Function
     */
    this.run = function() {
        $(element).css({position: 'relative', 'z-index': '999'});
    };


    /**
     * time for this step
     * @type int
     */
    this.time = 100;
}
