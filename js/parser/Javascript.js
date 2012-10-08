/**
 * Handle the Regular Expression for Javascript
 *
 * @author Georg Limbach <georf@dev.mgvmedia.com>
 *
 * @class ParserJavascript
 * @constructor
 * @param {Function} config The config RegularExpression object
 * @param {String} text Text to parse
 * @param {String} expression Regular expression
 * @param {String} flags Flags to use
 * @param {Function} callback Callback function for data result
 */
function ParserJavascript(config, text, expression, flags, callback) {
    "use strict";

    var escapeString = function ( text ) {
        return text.replace(/\\/g, "\\\\").replace(/'/g, "\\'");
    };

    // search flags
    var flagString = "";

    // global search
    var global = false;

    // indizies and counters
    var i, l;

    // regex object
    var regex;

    // match object
    var match;

    // array of all matches
    var matches = [];


    // catch javascript exceptions from parser
    try {

        // check flags
        for (i = 0, l = flags.length; i < l; i++) {
            switch (flags[i]) {
            case "g":
                flagString += "g";
                global = true;
                break;
            case "m":
                flagString += "m";
                break;
            case "i":
                flagString += "i";
                break;
            }
        }

        // generate regular expression object
        regex = new RegExp(expression, flagString);

        // for each match
        while ((match = regex.exec(text)) != null) {

            matches[matches.length] = {
                text: match[0],
                index: match.index,
                subexpressions: match
            };

            // only one loop if not global search or an empty result
            if (!global || match[0] == '') break;
        }

        callback( {
            "parser": "javascript",
            "regularExpression": expression,
            "flags": flags,
            "matchText": text,
            "error": false,
            "matchings": matches,
            "programming":
                "var text = '" + escapeString(text) + "';\n" +
                "var match;\n" +
                "\n" +
                "while ((match = text.match(/" + expression + "/" + flagString + "))) {\n" +
                "  console.log(match[0], match);\n" +
                "}\n"
        });
    } catch (e) {
        callback( {
            "parser": "javascript",
            "regularExpression": expression,
            "flags": flags,
            "matchText": text,
            "error": e.message,
            "matchings": [],
            "progamming": ""
        });
    }
}
