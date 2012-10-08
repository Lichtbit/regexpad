/**
 * Generates one help step
 *
 * @author Georg Limbach <georf@dev.mgvmedia.com>
 *
 * @constructor
 * @param {Function} run
 * @param {int} time
 */
function Step(run, time) {
    "use strict";

    /**
     * run method
     * @type Function
     */
    this.run = run;


    /**
     * time for this step
     * @type int
     */
    this.time = time;
}
