'use strict';

var inherit = require('inherit'),
    _ = require('lodash');

module.exports = inherit({
    __constructor: function(captureProcessor) {
        this._captureProcessor = captureProcessor;
    },

    getProcessedCaptureEventName: function() {
        return this._captureProcessor.getProcessedCaptureEventName();
    },

    prepare: function(emitter) {
        return this._captureProcessor.prepare(emitter);
    },

    exec: function(state, browserSession, pageDisposition) {
        var execOpts = {
            refPath: browserSession.browser.config.getScreenshotPath(state.suite, state.name),
            tolerance: state.tolerance || state.tolerance === 0
                ? state.tolerance
                : browserSession.browser.config.tolerance
        };

        return browserSession.capture(pageDisposition)
            .then(function(capture) {
                return this._captureProcessor.exec(capture, execOpts)
                    .then(function(processed) {
                        return _.extend(processed, {
                            coverage: capture.coverage
                        });
                    });
            }.bind(this));
    }
});
