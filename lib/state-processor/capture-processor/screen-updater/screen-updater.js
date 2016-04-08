'use strict';

var inherit = require('inherit'),
    fs = require('q-io/fs'),
    CaptureProcessor = require('../capture-processor'),

    RunnerEvents = require('../../../constants/runner-events');

module.exports = inherit(CaptureProcessor, {
    getProcessedCaptureEventName: function() {
        return RunnerEvents.CAPTURE;
    },

    exec: function(capture, opts) {
        var refPath = opts.refPath,
            _this = this;

        return fs.exists(refPath)
            .then(function(isRefExists) {
                return _this._processCapture(capture, opts, isRefExists);
            })
            .thenResolve({imagePath: refPath});
    },

    _processCapture: function() {
        throw new Error('Not implemented');
    }
});
