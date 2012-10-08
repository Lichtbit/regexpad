

var Permalink = function($link) {
    "use strict";

    // pointer to myself
    var self = this;

    this.update = function() {

        // counter, index and lenth
        var i, l;

        // current regex parser
        var parser = RegHex.getRegularExpression();

        // current regex flags
        var flags = parser.getSetFlags();

        // current regex
        var regex = parser.getRegularExpression();

        // current match texts as array
        var matchtexts = RegHex.getMatchTexts();



        // build a query
        var query = '?r=' + encodeURIComponent(regex) + '&f=';

        // add flags
        for (i = 0, l = flags.length; i < l; i++) {
            query += encodeURI(flags[i]);
            if (i+1 < l) {
                query += encodeURIComponent(',');
            }
        }

        // add every matchtext
        for (i = 0, l = matchtexts.length; i < l; i++) {
            query += '&m' + i + '=' + encodeURIComponent(matchtexts[i].getText());
        }

        // add hash
        query += '#p-' + parser.getName();

        // put into link
        $link.attr('href', query);
    };


    // register to every change
    RegHex.registerChangeHandler(function() {
        self.update();
    });
};
