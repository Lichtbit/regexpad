/**
 * Handle a match text
 *
 * @author Georg Limbach <georf@dev.mgvmedia.com>
 *
 * @constructor
 * @param UIMatchField observer
 */
function MatchText(_observer) {
    "use strict";

    // pointer to myself
    var self = this;

    // content of match text
    var _text = "";

    // callback for responses
    var _responseCallback = function(){};


    /**
     * Sets the default response callback
     * @param {Function}
     */
    this.setResponseCallback = function (callback) {
        _responseCallback = callback;
    };


    /**
     * Sets the current text
     *
     * @param string
     * @return this
     */
    this.setText = function (text) {
        _text = text;
        return this;
    };


    /**
     * Returns the current text
     * @returns {String}
     */
    this.getText = function () {
        return _text;
    };


    /**
     * Implements the Observer pattern
     *
     * @param UIMatchField
     * @return this;
     */
    this.notify = function (matchTextField, errorCallback, responseCallback) {

        // internal callback
        var responseCallbackI;

        // set defaults
        if (typeof matchTextField == 'undefined') {
            matchTextField = _observer;
        }

        if (typeof errorCallback == 'undefined') {
          errorCallback = function(value) {};
        }

        if (typeof responseCallback == 'undefined') {
            responseCallbackI = _responseCallback;
        } else {
            responseCallbackI = function (value) {
                _responseCallback(value);
                responseCallback(value);
            }
        }

        // set new value
        this.setText(matchTextField.getText());

        // parse expression
        RegHex.getRegularExpression().parse(_text, function(data) {
            if (typeof data.error != 'boolean') {
                errorCallback(data.error);
            }
            matchTextField.notify(data);
            responseCallbackI(data);
        });

        return this;
    };
}
