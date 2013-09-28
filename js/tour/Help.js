/**
 * Generate a live help
 *
 * @constructor
 */

function Help() {
    "use strict";

    // pointer to myself
    var self = this;

    // create an darkroom
    var $darkRoom = $('<div>press escape to exit tour</div>')
        .attr('id', 'darkRoom')
        .appendTo('body');

    // name with colors
    var reghex = '<span class="appname">regex<strong>pad</strong></span>';

    // pointer to last timeout for canceling
    var _lastTimeout = null;

    // milliseconds between each typed character
    var _typingTimeout = 200;

    // steps for the help tour
    var _steps = [

        new SetMessageStep('Welcome to the '+reghex+' tour'),
        new WaitStep(3000),


        new SetMessageStep('Select your programming language.'),
        new MoveMessageStep('#parser-type', 4),
        new HighlightStep('#parser-type'),
        new Step(function() {
            // let it blink 3 times
            $('#parser-type').focus()
            .fadeOut(500).fadeIn(500)
            .fadeOut(500).fadeIn(500)
            .fadeOut(500).fadeIn(500);
        }, 4500),
        new LowlightStep('#parser-type'),


        new SetMessageStep('Write a string to be matched.'),
        new HighlightStep('.matchtext-block:nth-child(1)'),
        new MoveMessageStep('#matchtext', 4, 1500),
        new WaitStep(500),
        new Step(function() {
            // add a match text
            new TypeInto($('#matchtext').focus(), '2013-09-28', _typingTimeout);
        }, 5000),
        new LowlightStep('.matchtext-block:nth-child(1)'),


        new SetMessageStep('Add another field...'),
        new HighlightStep('#add-matchtext'),
        new MoveMessageStep('#add-matchtext', 4, 3000),
        new Step(function() {
            // let plus blink 3 times
            $('#add-matchtext').focus()
            .fadeOut(500).fadeIn(500)
            .fadeOut(500).fadeIn(500)
            .fadeOut(500).fadeIn(500, function() {
                $('#add-matchtext').click();
            });
        }, 3000),
        new LowlightStep('#add-matchtext'),


        new SetMessageStep('... for more example strings.'),
        new MoveMessageStep('.matchtext-block:nth-child(2)', 4, 2000),
        new HighlightStep('.matchtext-block:nth-child(2)'),
        new Step(function() {
            // add a match text
            new TypeInto($('#newid' + (matchingBlockId-1)).focus(), 'Date: 2013-9-28', _typingTimeout);
        }, 5000),
        new LowlightStep('.matchtext-block:nth-child(2)'),


        new SetMessageStep('Enter your regular expression.'),
        new HighlightStep('#regex'),
        new MoveMessageStep('#regex', 3),
        new Step(function() {
            // add a regular expression
            $('#regex').focus();
            new TypeInto($('#regex'), '\\d{4}-\\d\\d?-\\d\\d?', _typingTimeout);
        }, 7000),
        new LowlightStep('#regex'),


        new HighlightStep('.matchtext-block'),
        new SetMessageStep('Matched parts are highlighted with green background.'),
        new WaitStep(5000),

        new SetMessageStep('Now it\'s your turn, give it a try!'),
        new MoveMessageStep('header', 3, 2000),
        new WaitStep(4000),

        // last step!
        new Step(function() {
            _close();
        }, 100)
    ];


    /**
     * run steps
     *
     * @param int
     */
    var _runStep = function(i) {
        if (typeof _steps[i] != 'undefined') {
            _steps[i].run();
            setTimeout(function(){
                _runStep(i+1);
            }, _steps[i].time);
        }
    }


    /**
     * close the help
     */
    var _close = function() {
        location.reload();
    };


    // bind esc for close
    $(document).keyup(function(e) {
        if (e.keyCode == 27) {
            _close();
        }
    });

    // close all fields
    $('.remove-matchtext').click();

    // initiation
    $('#help-current-task').html('').show();

    // run first step
    _runStep(0);
}
