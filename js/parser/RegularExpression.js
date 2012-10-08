/**
 * Handle Regular Expression for config
 *
 * @author Georg Limbach <georf@dev.mgvmedia.com>
 *
 * @class RegularExpression
 * @constructor
 * @param {String} name Parser name
 * @param {Flag[]} flags Allowed flags
 * @param {String[][]} urls Array of info urls
 * @param {Function} parser function to parse
 */
function RegularExpression(_name, _flags, _urls, _parser) {
    "use strict";


    /**
     * Regular expression to parse
     * @type String
     */
    var _expression = '';


    /**
     * Set flags
     * @param String
     */
    var _setFlags = [];


    /**
     * Returns the name
     * @returns {String} name
     */
    this.getName = function() {
        return _name;
    };


    /**
     * Returns the allowed flags
     * @returns {Flags[]} flags
     */
    this.getFlags = function() {
        return _flags;
    };


    /**
     * Returns information urls
     * @returns {String[][]} urls
     */
    this.getUrls = function() {
        return _urls;
    }


    /**
     * Sets a new regular expression
     * @param {String} expression e.g. "[a-z]+"
     * @returns this
     */
    this.setRegularExpression = function (expression) {
        _expression = expression;
        return this;
    };


    /**
     * Sets the expression flags
     * @param {String[]} flags e.g. ["i","g"]
     * @returns this
     */
    this.setFlags = function (flags) {
        _setFlags = flags;
        return this;
    };


    /**
     * Return the set flags
     * @returns {String[]}
     */
    this.getSetFlags = function () {
        return _setFlags;
    };


    /**
     * Returns the set regular expression
     * @returns {String}
     */
    this.getRegularExpression = function () {
        return _expression;
    };


    /**
     * Parse a text and return result to callback
     * @param {String} text text to parse
     * @param {Function} callback Callback for result
     * @returns this
     */
    this.parse  = function (text, callback) {

        // check in cache for value
        var cache = RegularExpressionCache.getValue(
            text,
            _expression,
            _setFlags,
            _name
        );

        if (typeof cache != 'boolean') {

            // found in cache
            callback(cache);
            return this;
        }


        // otherwise call parser
        new _parser(this, text, _expression, _setFlags, function(data) {

            // error handling
            if (!data || typeof data.error == "undefined") {
                return;
            }

            // add value to cache
            RegularExpressionCache.addValue(data);

            // call original callback
            callback(data);
        });

        return this;
    };
}
