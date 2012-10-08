/**
 *
 * @author Georg Limbach <georf@dev.mgvmedia.com>
 *
 * @constructor
 * @param jQuery
 *            selection - the matchtext block
 * @param boolean
 *            create "delete" button
 */
function UIMatchText($block, deleteButton) {
    "use strict";

    // pointer to myself
    var selt = this;

    // set pointer to special areas
    var $textarea = $block.find('.textarea');
    var $matchtextDiv = $block.find('.matchtext-div');
    var $matchInfo = $block.find('.match-info');
    var $nextMatch = $block.find('.next-match');
    var $previousMatch = $block.find('.previous-match');
    var $matchMoreInfo = $block.find('.match-more-info');
    var $moreInformation = $block.find('.more-information');
    var $moreInformationContent = $moreInformation.find('.more-information-content');

    // hide boxes
    $matchMoreInfo.hide();
    $moreInformation.hide();

    // generate model
    var matchText = RegHex.addMatchText(this, $textarea.val());

    // Tell the registered match text about changes
    $textarea.bind('change keyup paste cut', function() {
        matchText.notify();
    });

    // get scroll events
    $textarea.scroll(function() {
        self.updateScrollPosition();
    });

    // last response
    var _response = null;

    // position of selected match
    var _selectedMatch = 0;

    // is the "more information" dialog open?
    var _moreInformationOpen = false;


    /**
     * Escape special chars
     *
     * @param String
     *            text to escape
     * @return String escaped text
     */
    var _escapeHtml = function(text) {
        text = replaceAll(text, '<', '&lt;');
        text = replaceAll(text, '>', '&gt;');
        text = replaceAll(text, '\n', '<br>');
        return text;
    };


    /**
     * Replaces each substring of the value that matches the given string with
     * the given replacement.
     *
     * @param String
     *            value
     * @param String
     *            search for
     * @param String
     *            replace with
     * @return String new text
     */
    var replaceAll = function(value, find, replace) {
        while (value.indexOf(find) != -1) {
            value = value.replace(find, replace);
        }
        return value;
    };


    /**
     * update the match text after an new response
     *
     * @param {object} response
     * @return this
     */
    this.notify = function(response) {

        // its the same text?
        if ($textarea.val() == response.matchText) {

            // is it a new response?
            if (_response != response) {

                // set new response
                _response = response;

                // set match to 0
                _selectedMatch = 0;

                // update all information
                this.update();
            }
        }

        return this;
    };


    /**
     * Highlight the matches in the textarea
     *
     * @return this
     */
    this.highlight = function() {

        // on error highlight nothing
        if (!_response || _response.error) {
            $matchtextDiv.html('');

        // otherwise highlight selected part
        } else {

            var text = _response.matchText;
            var output = "";

            // no matches
            if (_response.matchings.length == 0) {

                // all unmatching
                output = '<span class="unmatched">' + _escapeHtml(text) + '</span>';

            } else {

                var length = _response.matchings[_selectedMatch].text.length;
                var pos = _response.matchings[_selectedMatch].index;

                if (length <= 0) {
                    output = '<span class="unmatched">' + _escapeHtml(text) + '</span>';
                } else {

                    if (pos != 0) {
                        output +=
                            '<span class="unmatched">' +
                                _escapeHtml(text.substring(0, pos)) +
                            '</span>';
                    }

                    output +=
                        '<span class="matched">' +
                            _escapeHtml(text.substring(pos, pos + length)) +
                        '</span>';

                    if (text.length != pos + length) {
                        output +=
                            '<span class="unmatched">' +
                                _escapeHtml(text.substring(pos + length)) +
                            '</span>';
                    }
                }
            }

            // add a no-break space if last char is a new line
            if (text.length != 0 && text.substring(text.length - 1) == "\n") {
                output += '<span>&nbsp;</span>';
            }

            // set spans to background area
            $matchtextDiv.html(output);
        }

        return this;
    };


    /**
     * returns the current value of the textarea
     * @return {String}
     */
    this.getText = function() {
        return $textarea.val();
    };


    /**
     * Sets the current text
     * @param {String}
     * @return this
     */
    this.setText = function (text) {
        $textarea.val(text).change();
        return this;
    };


    /**
     * Updates the infobox
     *
     * Sets button dis/enabled and update text
     */
    this.updateInfobox = function() {

        if (!_moreInformationOpen) {
            $moreInformation.slideUp();
        }

        // if its no valid response or if no matchings
        if (!_response || _response.error || _response.matchings.length == 0) {
            $matchInfo.html('no matches');
            $nextMatch.attr('disabled', 'disabled');
            $previousMatch.attr('disabled', 'disabled');

            $matchMoreInfo.slideUp();
            $moreInformation.slideUp();

        // valid matchings
        } else {
            $matchInfo.html('match ' + (_selectedMatch + 1) + ' of ' + _response.matchings.length);

            var results = _response.matchings[_selectedMatch].subexpressions;

            // no subexpressions
            if (!results || results.length <= 0) {
                $moreInformationContent.html('no subexpressions given.');


            // show subexpressions
            } else {

                var output = 'subexpressions <small>(expression parts in brackets)</small>:<ul>';
                for ( var i = 0; i < results.length; i++) {
                    output += '<li>' + $('<li/>').text('$' + i + ' = ' + results[i]).html() + '</li>';
                }
                output += '</ul>';

                $moreInformationContent.html(output);
            }

            // disable/enable match buttons
            if (_selectedMatch == 0 || _response.error) {
                $previousMatch.attr('disabled', 'disabled');
            } else {
                $previousMatch.removeAttr('disabled');
            }

            if (_selectedMatch >= _response.matchings.length - 1
            || _response.error) {
                $nextMatch.attr('disabled', 'disabled');
            } else {
                $nextMatch.removeAttr('disabled');
            }

            // show more information
            if (_moreInformationOpen) {
                $moreInformation.slideDown();
            } else {
                $matchMoreInfo.slideDown();
            }
        }
    };


    /**
     * Updates all information in and around the textbox
     *
     * @return this
     */
    this.update = function() {
        // update highlighting
        this.highlight();

        // update infobox
        this.updateInfobox();

        // update scroll position
        this.updateScrollPosition();

        return this;
    };


    /**
     * Scroll the background div to the correct position
     *
     * @return this
     */
    this.updateScrollPosition = function() {
        $matchtextDiv.scrollTop($textarea.scrollTop());
        $matchtextDiv.scrollLeft($textarea.scrollLeft());

        return this;
    };


    /**
     * Select next match if possible
     *
     * @return this
     */
    this.nextMatch = function() {
        if (_response
                && _selectedMatch < _response.matchings.length - 1) {
            _selectedMatch++;
        }
        this.update();

        return this;
    };


    /**
     * Select previous match if possible
     *
     * @return this
     */
    this.previousMatch = function() {
        if (_selectedMatch > 0) {
            _selectedMatch--;
        }
        this.update();

        return this;
    };


    /**
     * Open and close the information box
     *
     * @param boolean
     *            open == true
     * @return this
     */
    this.moreInformation = function(open) {
        if (open == undefined) {
          open = !_moreInformationOpen;
        }
        if (_moreInformationOpen != open) {
            _moreInformationOpen = open;
            this.update();
        }
        return this;
    };


    // set button handler
    $nextMatch.click(function() {
        self.nextMatch();
    });
    $previousMatch.click(function() {
        self.previousMatch();
    });

    $matchMoreInfo.find('a').click(function() {
        self.moreInformation();
        return false;
    });
    $moreInformation.find('.less-information').click(function() {
        self.moreInformation(false);
        return false;
    });

    // update all informations after first creation
    this.update();

    if (deleteButton) {

        // generate delete button
        var $btn = $('<button type="button" class="remove-matchtext"/>');
        $btn.html('&ndash;');
        $btn.attr('title', 'remove field');
        $btn.click(function() {
            $block.slideUp(function() {
                    // remove from RegHex
                    RegHex.removeMatchText(matchText);
                    $(this).remove();
                });
        });

        // add to block
        $block.find('.navigate-match-section').prepend('&nbsp;').prepend($btn);
        $block.hide();
        $('#matching-blocks').append($block);
        $block.show();
    }
}
