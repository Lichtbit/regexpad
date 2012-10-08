/**
 * Generates one help step
 * It sets a message
 *
 * @author Georg Limbach <georf@dev.mgvmedia.com>
 *
 * @constructor
 */
function SetMessageStep(message) {
    "use strict";


    /**
     * run method
     * @type Function
     */
    this.run = function() {
        $('#help-current-task').html(message);
    };


    /**
     * time for this step
     * @type int
     */
    this.time = 100;
}
