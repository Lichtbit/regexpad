/**
 * Generate a live help
 *
 * @author Georg Limbach <georf@dev.mgvmedia.com>
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

    // steps for the help tour
    var _steps = [

        new SetMessageStep('Welcome to the '+reghex+' tour'),
        new WaitStep(5000),


        new SetMessageStep('Select the language you want to use'),
        new MoveMessageStep('#parser-type', 4),
        new HighlightStep('#parser-type'),
        new Step(function() {
            // let it blink 3 times
            $('#parser-type').focus()
            .fadeOut(500).fadeIn(500)
            .fadeOut(500).fadeIn(500)
            .fadeOut(500).fadeIn(500);
        }, 7500),
        new LowlightStep('#parser-type'),


        new SetMessageStep('Write an example text to be matched by your regular expression'),
        new HighlightStep('.matchtext-block:nth-child(1)'),
        new MoveMessageStep('#matchtext', 4, 1500),
        new WaitStep(2000),
        new Step(function() {
            // add a match text
            new TypeInto($('#matchtext').focus(), 'abb', 500);
        }, 7000),
        new WaitStep(1000),
        new LowlightStep('.matchtext-block:nth-child(1)'),


        new SetMessageStep('Add another example area to match a different text'),
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
        }, 4500),
        new LowlightStep('#add-matchtext'),


        new SetMessageStep('Now you can fill in another example to be matched'),
        new MoveMessageStep('.matchtext-block:nth-child(2)', 4, 2000),
        new HighlightStep('.matchtext-block:nth-child(2)'),
        new Step(function() {
            // add a match text
            new TypeInto($('#newid' + (matchingBlockId-1)).focus(), 'test abc ade', 300);
        }, 10000),
        new LowlightStep('.matchtext-block:nth-child(2)'),


        new SetMessageStep('Here you can enter your regular expression'),
        new HighlightStep('#regex'),
        new MoveMessageStep('#regex', 3),
        new Step(function() {
            // add a regular expression
            $('#regex').focus();
            new TypeInto($('#regex'), 'a([a-z]+)', 300);
        }, 10000),
        new LowlightStep('#regex'),


        new HighlightStep('.matchtext-block'),
        new SetMessageStep('Look at your sample text: the green background highlights the matched text'),
        new WaitStep(10000),
        //~ new MoveStep('Subexpression show all the parts of the matched text', '.navigate-match-section:first', 500, function() {return $('.matchtext-block:nth-child(1)'); }),
//~
        //~ new Step('Subexpression show all the parts of the matched text', function() {
            //~ // let plus blink 3 times
            //~ $('.navigate-match-section:first .match-more-info a').focus()
            //~ .fadeOut(300).fadeIn(300)
            //~ .fadeOut(300).fadeIn(300)
            //~ .fadeOut(300).fadeIn(300, function() {
                //~ $('.navigate-match-section:first .match-more-info a').click();
            //~ });
//~
        //~ }, 15000, function() { return $('.navigate-match-section:first, .more-information.overlay.group');}),

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
