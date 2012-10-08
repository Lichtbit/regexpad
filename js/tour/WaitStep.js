/**
 * Generates one help step
 * Only waits
 *
 * @author Georg Limbach <georf@dev.mgvmedia.com>
 *
 * @constructor
 * @param {int} time time to wait
 */
function WaitStep(time) {
    "use strict";

    /**
     * run method
     * @type Function
     */
    this.run = function() {};


    /**
     * time for this step
     * @type int
     */
    this.time = time;
}
