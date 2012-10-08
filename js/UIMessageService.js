/**
 * Accepts and handles incoming messages
 *
 * @constructor
 */
function UIMessageService() {
    "use strict";

    var $element = $('#regex-error');

    /**
     * Handle incoming message
     * @param UserMessage
     */
    this.notify = function(message) {
        if (typeof message == 'undefined') {
            $element.slideUp();
            return;
        }
        $element.text(message).slideDown();
    }
}
