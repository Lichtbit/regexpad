/**
 * Generates one help step
 * Lowlight an element
 *
 * @author Georg Limbach <georf@dev.mgvmedia.com>
 *
 * @constructor
 * @param {String} element jquery selector string
 */
function LowlightStep(element) {
    "use strict";


    /**
     * run method
     * @type Function
     */
    this.run = function() {
        $(element).css('z-index', 1);
    };


    /**
     * time for this step
     * @type int
     */
    this.time = 100;
}
