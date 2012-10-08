/**
 * Generates one help step
 * It moves the message
 *
 * @author Georg Limbach <georf@dev.mgvmedia.com>
 *
 * @constructor
 * @param {String} toElement jquery selector string for element to move
 * @param {int} position position to move: 1 = top, 2 = right, 3 = bottom, 4 = left
 * @param {int} [time] default is 1000
 */
function MoveMessageStep(toElement, position, time) {
    "use strict";

    var $div = $('#help-current-task');

    if (typeof time == 'undefined') {
        time = 1000;
    }


    /**
     * run method
     * @type Function
     */
    this.run = function() {
        var $toElement = $(toElement);

        var offset = $toElement.offset();
        var left = offset.left;
        var top = offset.top;

        switch (position) {
            case 1:
                top -= $div.height() + 20;
                break;

            case 2:
                left += $toElement.width() + 50;
                break;

            case 3:
                top += $toElement.height() + 20;
                break;

            case 4:
                left -= $div.width() + 50;
                break;
        }

        $div.animate({
            'left': Math.round(left),
            'top': Math.round(top)
        }, Math.round(time*0.9));
    };


    /**
     * time for this step
     * @type int
     */
    this.time = time;
}
