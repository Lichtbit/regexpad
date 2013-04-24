#!/bin/bash

cd $(cd $(dirname $0); pwd -P)

java -jar jsrun.jar app/run.js \
../../js/parser/RegularExpression.js \
../../js/parser/Javascript.js \
../../js/parser/Ajax.js \
../../js/tour/Help.js \
../../js/tour/HighlightStep.js \
../../js/tour/LowlightStep.js \
../../js/tour/MoveMessageStep.js \
../../js/tour/SetMessageStep.js \
../../js/tour/Step.js \
../../js/tour/WaitStep.js \
../../js/tour/TypeInto.js \
../../js/Flag.js \
../../js/UIMatchText.js \
../../js/MatchText.js \
../../js/UIMessageService.js \
../../js/UICodeSnip.js \
../../js/Permalink.js \
../../js/config.js \
../../js/RegularExpressionCache.js \
../../js/RegHex.js \
../../js/ui.js \
-t=templates/jsdoc/

