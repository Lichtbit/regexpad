/**
 * Reghex UI Package
 *
 * @author Sebastian Gaul <sebastian@dev.mgvmedia.com>
 * @author Georg Limbach <georf@dev.mgvmedia.com>
 */


// unique counter for block id
var matchingBlockId = 1;

// pointer to last inserted match text
var lastInsertedMatchText = null;

$(function() {
    "use strict";

    // counter, length
    var i, l;

    // reset textarea and checkboxes(for firefox)
    $('textarea').val('');

    // Register existing match text fields
    $('.matchtext-block').each(function() {
        lastInsertedMatchText = new UIMatchText($(this), false);
    });

    // Create and register a message service
    RegHex.registerMessageService(new UIMessageService());

    // Create and register a code block service
    var codeSnip = new UICodeSnip();
    RegHex.registerCodeSnip(codeSnip);

    // Bundle flags into an array
    var bundleFlags = function() {
        var flags = [];
        $('.parser-option').each(function(i, el) {
            if ($(el).is(':checked')) {
                flags.push($(el).attr('name').substr(7));
            }
        });
        return flags;
    };

    // Notify if regular expression changes
    $('#regex').bind('keyup blur input cut paste', function() {
        RegHex.updateRegularExpression($(this).val(), bundleFlags());
    });

    $('#add-matchtext').click(function() {
        // generate new id
            var newid = matchingBlockId++;

            // clone block
            var block = $('#matching-blocks').find('.matchtext-block').first()
                    .clone();
            block.find('label').html('&nbsp;').attr('for', 'newid' + newid);
            block.find('.textarea').text('').attr('id', 'newid' + newid);
            block.find('.matchtext-div').html('&nbsp;');

            // handle events with object
            lastInsertedMatchText = new UIMatchText(block, true);
        });

    var parserType = $('#parser-type');

    // Add parsers to select field
    for (i = 0, l = config.parsers.length; i < l; i++) {
        parserType.append($('<option value="' + config.parsers[i].getName() + '">'
                + config.parsers[i].getName() + '</option>'));
    }

    // bind parser type to RegHex
    parserType.change(function() {
        var i, le;


        // update regex
        RegHex.changeParserType($('#parser-type').val());

        // update about window
        $('.current-parser-name').text($('#parser-type').val());

        // delete old flags
        $('#regex-options').html('');

        // enable usefull options
        var o = RegHex.getRegularExpression().getFlags();
        for (i = 0, le = o.length; i < le; i++) {
            $('#regex-options').append(o[i].getLi());
        }

        // Trigger regex change whenever an option changes
        $('#regex-options input[type="checkbox"]').change(function() {
            $('#regex').trigger('keyup');
        });

        // set new info link
        var l = RegHex.getRegularExpression().getUrls();
        var ul = '';
        for (i = 0, le = l.length; i < le; i++) {
            ul += '<li><a href="' + l[i][0] + '">' + l[i][1] + '</a></li>';
        }
        if (ul != '') {
            $('#additional-parser-info').html('<ul>' + ul + '</ul>');
        } else {
            $('#additional-parser-info').html(ul);
        }

        codeSnip.update('');

        // trigger a new parse event
        $('#regex').keyup();

        // update uri hash
        window.location.hash = '#p-' + $('#parser-type').val();

    });

    // bind Help class to link
    $('#button-tour').click(function() {
        new Help();
    return false;
    });


    // bind permalink handler
    new Permalink($('#button-permalink'));


    /*
     * catch parser type from uri hash
     * url should end as follow:
     *  #p-javascript
     * or
     *  #p-sun-java
     */
    var match;
    if (match = window.location.hash.match(/^#p-(.+)$/)) {
        parserType.find('option').each(function() {
            var self = $(this);
            if (self.val() == match[1]) {
                self.attr('selected', true);
            } else {
                self.removeAttr('selected');
            }
        });
    }

    // trigger first change
    parserType.change();


    /*
     * handle permalinks
     *
     * a permalink have some parts:
     *      r
     *      => regex {String}
     *
     *      f
     *      => flags {String[]}
     *
     *      m0, m1, m2
     *      => matchtexts {String}
     *
     * first parse search parameter for values
     */
    var parm = window.location.search.substring(1).split('&'),
        match, first = true;

    for (i = 0, l = parm.length; i < l; i++) {
        var parts = parm[i].split('=');
        if (parts.length == 2 && parts[1] != '') {

            // flag part
            if (parts[0] == 'f') {
                var flags = parts[1].split(',');
                for (var z = 0; z < flags.length; z++) {
                    $('#option-' + decodeURIComponent(flags[z])).attr('checked', true);
                }

            // regex part
            } else if (parts[0] == 'r') {
                $('#regex').val(decodeURIComponent(parts[1]));

            // matchtext part
            } else if (match = parts[0].match(/^m(\d)$/)) {
                if (first) {
                    first = false;
                } else {
                    $('#add-matchtext').click();
                }
                lastInsertedMatchText.setText(decodeURIComponent(parts[1]));
            }
        }
    }

    // update first time
    $('#regex').trigger('keyup');
});
