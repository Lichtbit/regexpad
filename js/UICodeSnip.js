/**
 * @author Georg Limbach <georf@dev.mgvmedia.com>
 * @constructor
 */
function UICodeSnip() {
    "use strict";

    var $cb = $('#codeblock');

    /**
     * Update the code block
     * @param {String} code
     */
    this.update = function(code) {
        $cb.val(code).show();
    }
}
