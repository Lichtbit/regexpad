#!/bin/bash

cd $(cd $(dirname $0); pwd -P)

CLOSURE="closure-compiler/run-compiler.sh"
JSDOC="jsdoc-toolkit/run-doc-compiler.sh"
JSRUN="jsdoc-toolkit/jsrun.jar"

# make executeable
chmod u+x $CLOSURE
chmod u+x $JSDOC
chmod u+x $JSRUN

# run compiler
$CLOSURE
$JSDOC

# move compiled version to right place
mv closure-compiler/out.js ../js/min.js

# change index.html to minified version
cat ../index.html | php -r "file_put_contents('php://stdout', preg_replace('/<!-- files for compiling -->.*<!-- end files for compiling -->/ms', '<script defer src=\"js/min.js\"></script>', file_get_contents('php://stdin')));" > ../index.html

# move jsdoc to right place
rm -rf ../doc
mv jsdoc-toolkit/out/jsdoc ../doc
