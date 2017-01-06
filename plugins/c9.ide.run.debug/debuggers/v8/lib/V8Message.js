/**
 * V8Debugger
 * 
 * Copyright (c) 2010 Ajax.org B.V.
 * 
 * The MIT License (MIT)
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 * IN THE SOFTWARE.
 */
define(function(require, exports, module) {
"use strict";

var Util = require("./util");

var V8Message = module.exports = function(type) {
    this.seq = V8Message.$seq++;
    this.type = type;
};

(function() {

    this.$msgKeys = [
        "seq",
        "type",
        "command",
        "arguments",
        "request_seq",
        "body",
        "running",
        "success",
        "message",
        "event",
        "runner"
    ];
    var len = this.$msgKeys.length;

    this.parse = function(msgString) {
        var json = JSON.parse(msgString);
        Util.mixin(this, json);
        return this;
    };

    this.stringify = function() {
        var tmp = {};
        for (var i = 0; i < len; i++) {
            var name = this.$msgKeys[i];
            if (typeof this[name] != "undefined")
                tmp[name] = this[name];
        }
        // TODO is there a better place for this
        if (tmp.arguments && !tmp.arguments.maxStringLength)
            tmp.arguments.maxStringLength = 10000;
        return JSON.stringify(tmp);
    };

}).call(V8Message.prototype);

V8Message.$seq = 1;

V8Message.fromString = function(msgString) {
    return new V8Message().parse(msgString);
};

V8Message.fromObject = function(obj) {
    var msg = new V8Message();
    Util.mixin(msg, obj);
    return msg;
};

});