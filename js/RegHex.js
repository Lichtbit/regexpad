/**
 * Dispatches tasks and provides Reghex's component objects
 *
 * @author Georg Limbach <georf@dev.mgvmedia.com>
 * @author Sebastian Gaul <sebastian@dev.mgvmedia.com>
 *
 * @class
 */
var RegHex = new function() {

    // pointer to myself
    var self = this;


    /**
     * Pointer to select regular expression
     * @type RegularExpression
     */
    var _regularExpression;


    /**
     * Array of MatchText
     * @type MatchText[]
     */
    var _matchTexts = [];


    /**
     * Array of change handler
     * @type function[]
     */
    var _changeHandlers = [];


    /**
     * Object for message service
     *
     * Initialitation with senseless function
     * @type {UIMessageService}
     */
    var _messageService = { notify: function() {} };


    /**
     * Object for presenting code
     *
     * @type {UICodeSnip}
     */
    var _codeSnip = { update: function(){}};


    /**
     * Update all match texts
     */
    var _updateMatchTexts = function() {
        var errorOccured = false;
        for ( var i = 0; i < _matchTexts.length; i++) {
            _matchTexts[i].notify(_matchTexts[i].observer,
                function(error) {
                    _messageService.notify(error);
                    errorOccured = true;
                });
        }


        // Notify message service that parsing was successful, so it
        // can hide previous error messages
        if (!errorOccured) {
            _messageService.notify();
        }
    };


    /**
     * Update the code snip and change handlers about response
     * @param {Object}
     */
    var _response = function(response) {
        var i, l;

        if (typeof response.programming != 'undefined') {
            _codeSnip.update(response.programming);
        }

        for (i = 0, l = _changeHandlers.length; i < l; i++) {
            _changeHandlers[i].call();
        }
    };


    /**
     * Creates a new match text and registers a specified observer
     *
     * @param {UIMatchText} observer
     * @param {String} initialText
     * @returns {MatchText} The created MatchText object
     */
    this.addMatchText = function(observer, initialText) {

        // create object
        var matchText = new MatchText(observer);

        // set text
        matchText.setText(initialText);

        // set default response callback
        matchText.setResponseCallback(_response);

        // add to list
        _matchTexts.push(matchText);

        return matchText;
    };


    /**
     * Returns the match texts as an array
     * @returns {MatchText[]}
     */
    this.getMatchTexts = function () {
        return _matchTexts;
    };


    /**
     * Remove a match text
     *
     * @param {MatchText} matchText to remove
     * @return this
     */
    this.removeMatchText = function(matchText) {
        for ( var i = 0; i < _matchTexts.length; i++) {
            if (_matchTexts[i] == matchText) {
                var current = _matchTexts[i];

                // remove from array
                _matchTexts.splice(i, 1);
                break;
            }
        }
        return this;
    };


    /**
     * Registers a message service which accepts and handles messages
     *
     * @param {UIMessageService} messageService
     */
    this.registerMessageService = function(messageService) {
        _messageService = messageService;
    };


    /**
     * Registers a code snip presenter
     *
     * @param {UICodeSnip} codeSnip
     */
    this.registerCodeSnip = function(codeSnip) {
        _codeSnip = codeSnip;
    };


    /**
     * Updates the reg. exp., e.g. after the user changed the related field
     *
     * @param {String} expression e.g. "ab*c"
     * @param {String[]} flags e.g. ["i", "x", "s"]
     */
    this.updateRegularExpression = function(expression, flags) {
        // set new expression
        _regularExpression.setRegularExpression(expression);

        // set new flags
        _regularExpression.setFlags(flags);

        // update match texts
        _updateMatchTexts();
    };


    /**
     * Returns the RegularExpression object
     *
     * @return RegularExpression
     */
    this.getRegularExpression = function() {
        return _regularExpression;
    };


    /**
     * Change the parser type e.g. the user select a other parser
     *
     * The method search the object for the new parser and set is as
     * current regular expression object.
     *
     * @param {String} parserType
     */
    this.changeParserType = function(parserType) {

        // search config in array
        for (var i = 0; i < config.parsers.length; i++) {
            if (config.parsers[i].getName() == parserType) {
                _regularExpression = config.parsers[i];
            }
        }

        // update match texts
        _updateMatchTexts();
    };


    /**
     * registers a change handler
     *
     * @param {function} callback
     */
    this.registerChangeHandler = function(callback) {
        _changeHandlers.push(callback);
    };
};
