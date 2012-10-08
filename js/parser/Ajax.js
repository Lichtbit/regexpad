/**
 * Handle the Regular Expression for Server roundtrips
 *
 * @author Georg Limbach <georf@dev.mgvmedia.com>
 *
 * @class ParserAjax
 * @constructor
 * @param {Function} config The config RegularExpression object
 * @param {String} text Text to parse
 * @param {String} expression Regular expression
 * @param {String} flags Flags to use
 * @param {Function} callback Callback function for data result
 */
function ParserAjax(config, text, expression, flags, callback) {
    "use strict";

    // url for ajax requests
    var URL = 'parser/parser.php';



    // post to server parser
    $.post(URL, {
            json: $.toJSON({
                "parser": config.getName(),
                "regularExpression": expression,
                "flags": flags,
                "matchText": text
            })
        }, callback, "json");
}
