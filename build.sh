#!/bin/sh
cat dist/index.html | grep -v '<script data-main="javascripts/main" src="components/requirejs/require.js"></script>' | grep -v 'DD_belatedPNG_0.0.8a-min.js' | grep -v '<link rel="stylesheet" type="text/css" href="stylesheets/style.css">' > tmp1
mv tmp1 dist/index.html
