var data = require('./data');

var count = 100000;
var ejs = require('./ejs/ejs.js');
var ejsWithoutWith = require('./ejs-without-with/ejs.js');
var pug = require('./pug/pug.js');
var pugWithoutWith = require('./pug-without-with/pug.js');
var handlebars = require('./handlebars/handlebars.js');

var test = function(name, sample, cb) {
	var i = 0;
	var start;
	var done = function(error, html) {
		i++;
		if (i === count) {
			var now = Date.now();
			cb(null, name, now - start);
		}
	}
	sample.prepare(data, function() {
		start = Date.now();
		for (var j = 0; j < count; j++) {
			sample.step(done);
		}
	});
};

var testUnescaped = function(name, sample, cb) {
	var i = 0;
	var start;
	var done = function(error, html) {
		i++;
		if (i === count) {
			var now = Date.now();
			cb(null, name, now - start);
		}
	}
	sample.prepareUnescaped(data, function() {
		start = Date.now();
		for (var j = 0; j < count; j++) {
			sample.step(done);
		}
	});
};

var samples = [

	{ name : 'Pug', sample : pug },
	{ name : 'Pug without `with`', sample : pugWithoutWith },
	{ name : 'Handlebars.js', sample : handlebars },
	{ name : 'EJS', sample : ejs },
	{ name : 'EJS without `with`', sample : ejsWithoutWith }
];

var results = [];
var pad = function (val, num, pre) {
	val = typeof val === 'string' ? val : '' + val;
	while (val.length < num) val = (pre ? ' ' : '') + val + (pre ? '' : ' ');
	return val;
};
var runTests = function () {
	if (samples.length) {
		var sample = samples.pop();
		test(sample.name, sample.sample, function (err, name, result) {
			testUnescaped(sample.name, sample.sample, function (err, name, resultUnescaped) {
				console.log(name);
				console.log('  Escaped   : ' + result + 'ms');
				console.log('  Unescaped : ' + resultUnescaped + 'ms');
				console.log('  Total     : ' + (result + resultUnescaped) + 'ms');
				console.log('');
				results.push({
					name: name,
					escaped: result,
					unescaped: resultUnescaped,
					total: result + resultUnescaped
				});
				runTests();
			});
		});
	} else {
		console.log('Performance report for ' + count + ' templates (' + process.platform + '):\n');
		results.sort(function (a, b) {
			var x = a.total;
			var y = b.total;
			return x < y ? -1 : (x > y ? 1 : 0);
		});
		var fastest = results[0].total;
		for (var i = 0; i < results.length; i += 1) {
			var result = results[i];
			var percentage = Math.round((100 / fastest * result.total) - 100);
			console.log(pad(result.name, 20) +
				' (' + pad(result.total, 5, true) + 'ms)' +
				(i == 0 ? ' - fastest' : ' - ' + percentage + '% slower'));
		}
	}
};

console.log('Rendering ' + count + ' templates:\n');
runTests();
