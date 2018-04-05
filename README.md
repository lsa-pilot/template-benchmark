# Node.JS template engines benchmark

## Old Engines

- [CoffeeKup](https://github.com/mauricemach/coffeekup) v0.3.1 ([website](http://coffeekup.org/))
- [doT](https://github.com/olado/doT) v1.0.1 ([website](http://olado.github.com/doT/))
- [Dust](https://github.com/linkedin/dustjs) v1.2.1 ([website](http://linkedin.github.com/dustjs/))
- [Eco](https://github.com/sstephenson/eco) v1.1.0-rc-3
- [ECT](https://github.com/baryshev/ect) v0.4.7 ([website](http://ectjs.com/))
- [Fest](https://github.com/mailru/fest) v0.5.4
- [Hogan.js](https://github.com/twitter/hogan.js) v2.0.0 ([website](http://twitter.github.com/hogan.js/))
- [Jade](https://github.com/visionmedia/jade) v0.28.1 ([website](http://jade-lang.com/))
- [Swig](https://github.com/paularmstrong/swig) v0.13.5
- [Underscore](https://github.com/documentcloud/underscore) v1.4.4 ([website](http://underscorejs.org/))
- [Gaikan](https://github.com/Deathspike/gaikan) v2.0.0

## Engines tested
- [EJS](https://github.com/visionmedia/ejs) v2.5.8
- [Handlebars.js](https://github.com/wycats/handlebars.js/) v4.0.11 ([website](http://handlebarsjs.com/))
- [Pug.js](https://github.com/pugjs/pug) v2.0.3

## Results

### Linux Ubuntu 17.10, Node 6.11.4 (100.000x)

Handlebars.js        ( 4937ms) - fastest
EJS without `with`   ( 5475ms) - 11% slower
Pug without `with`   ( 7189ms) - 46% slower
Pug                  ( 7526ms) - 52% slower
EJS                  (13296ms) - 169% slower

### Windows 7 x64 SP1, NodeJS 0.10.26 (100.000x)

	
## Usage

	git clone git://github.com/Deathspike/template-benchmark.git
	cd template-benchmark
	npm install
	node ./benchmark.js
