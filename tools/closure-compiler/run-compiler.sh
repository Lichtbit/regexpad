#!/bin/bash

java -jar compiler.jar \
--js=../../js/parser/RegularExpression.js \
--js=../../js/parser/Javascript.js \
--js=../../js/parser/Ajax.js \
--js=../../js/tour/Help.js \
--js=../../js/tour/HighlightStep.js \
--js=../../js/tour/LowlightStep.js \
--js=../../js/tour/MoveMessageStep.js \
--js=../../js/tour/SetMessageStep.js \
--js=../../js/tour/Step.js \
--js=../../js/tour/WaitStep.js \
--js=../../js/tour/TypeInto.js \
--js=../../js/Flag.js \
--js=../../js/UIMatchText.js \
--js=../../js/MatchText.js \
--js=../../js/UIMessageService.js \
--js=../../js/UICodeSnip.js \
--js=../../js/Permalink.js \
--js=../../js/config.js \
--js=../../js/RegularExpressionCache.js \
--js=../../js/RegHex.js \
--js=../../js/ui.js \
--js_output_file=out.js
