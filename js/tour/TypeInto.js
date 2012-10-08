/**
 * A helper for real time typing
 *
 * @author Georg Limbach <georf@dev.mgvmedia.com>
 *
 *
 * @constructor
 * @param {jQuery} $area Textarea to write into
 * @param {String} _val Value to type
 * @param {int} _millisec Milliseconds between keys
 */
function TypeInto($area, _val, _millisec) {
    "use strict";


    /**
     * Counter for steps
     * @type int
     */
    var _step = 0;


    /**
     * Type one key
     */
    var _typeKey = function() {
        $area.val(_val.substring(0, _step));
        $area.trigger('keyup');

        if (_step < _val.length) {
            _step++;
            setTimeout(_typeKey, _millisec);
        }
    };

    // begin to type
    _typeKey();
}
