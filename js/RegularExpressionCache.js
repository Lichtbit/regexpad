/**
 * A implementation of a cache with maximum number of elements
 *
 * Internal it's a simple queue and a array.
 *
 * @author Georg Limbach <georf@dev.mgvmedia.com>
 * @class
 * @constructor
 */
var RegularExpressionCache = new function() {
    "use strict";

    // max count of elements in cache
    var MAX_ELEMENTS = 100;


    /**
     * The cache is a associative array like this:
     * [ "javascript" =>
     *     [
     *         "[a-z]" => Object,
     *         "[a-z]+" => Object
     *     ]
     * ]
     * @type Object
     */
    var _cache = {};


    /**
     * Count all elements in the tree
     * @type number
     */
    var _counter = 0;


    /**
     * Every element has a pointer to his successor
     * @type Object
     */
    var _next = null;
    var _last = null;


    /**
     * generate a hash value for the reg. exp. flags
     * @param {String[]} flags e.g. ["i","g"]
     * @returns {String} e.g. "gi"
     */
    var hashFlags = function (flags) {

        if (typeof flags == 'undefined') {
            flags = [];
        }

        flags.sort();
        var ret = '';
        for (var i = 0; i < flags.length; i++) {
            ret += flags[i];
        }
        return ret;
    };


    /**
     * Clean up the cache
     *
     * Check for to many elements and delete the oldest ones. After
     * that rebuild the search tree.
     *
     * Call this method periodly or in idyll time.
     */
    var cleanUp = function () {
        while (_counter > MAX_ELEMENTS) {
            var data = _next;
            var parser = data.parser;
            var expression = data.regularExpression;

            // search in the tree for the element
            for (var i = 0; i < _cache[parser][expression].length; i++) {
                if (_cache[parser][expression][i] == data) {

                    // delete this element in array
                    _cache[parser][expression].splice(i, 1);

                    break;
                }
            }

            // delete array if its empty
            if (_cache[parser][expression].length == 0) {
                delete(_cache[parser][expression]);
            }

            _next = data._next;
            _counter--;
        }
    };


    /**
     * Checks the cache for a value
     * @param {String} text
     * @param {String} expression
     * @param {String[]} flags
     * @param {String} parser
     * @returns {boolean|Object}
     */
    this.getValue = function (text, expression, flags, parser) {

        if (typeof _cache[parser] == 'undefined' || typeof _cache[parser][expression] == 'undefined') {

            return false;

        } else {
            var opt = hashFlags(flags);

            for (var i = 0; i < _cache[parser][expression].length; i++) {
                var current = _cache[parser][expression][i];
                if (current.matchText == text && current.flagsHash == opt) {
                    return current;
                }
            }
            return false;
        }
    };


    /**
     * Adds a value to cache
     * @param {Object} data
     */
    this.addValue = function (data) {
        var parser = data.parser;
        var expression = data.regularExpression;

        if (typeof parser == 'undefined' || typeof expression == 'undefined') {
            return;
        }

        data.flagsHash = hashFlags(data.flags);

        // check for structur
        if (typeof _cache[parser] == 'undefined') {
            _cache[parser] = {};
        }

        if (typeof _cache[parser][expression] == 'undefined') {
            _cache[parser][expression] = [];
        }


        // update pointers

        // if it's the first element
        if (_next == null) {
            _next = data;
        } else {
            _last._next = data;
        }
        _last = data;

        // insert new element
        var pointer = _cache[parser][expression].length;
        _cache[parser][expression][pointer] = data;
        _counter++;

        // clean cache
        cleanUp();
    };
}
