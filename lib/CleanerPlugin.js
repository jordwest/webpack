/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";
const del = require("del");

class CleanerPlugin {
	constructor(options) {
		this.options = options || {};

		this.patterns = [];
		this.cleanerOptions = {};

		if (typeof this.options === "string") {
			this.patterns = [this.options];
		} else if (Array.isArray(this.options)) {
			this.patterns = this.options;
		} else {
			this.patterns = this.options.patterns;
			this.cleanerOptions = this.options.options;
		}
	}

	apply(compiler) {
		compiler.hooks.beforeRun.tapAsync(
			"CleanerPlugin",
			this.runCleaner.bind(this)
		);
		compiler.hooks.watchRun.tapAsync(
			"CleanerPlugin",
			this.runCleaner.bind(this)
		);
	}

	runCleaner(compiler, callback) {
		del(this.patterns, this.cleanerOptions)
			.then(() => callback())
			.catch(error => callback(error));
	}
}

module.exports = CleanerPlugin;
