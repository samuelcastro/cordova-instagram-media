/**
 * Created by Samuel Castro <samuelcastrosilva@gmail.com> on 1/5/16.
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
 */

var exec = require('cordova/exec'),
    cordova = require('cordova');

function InstagramShare() {}

/**
 * Checking if the instagram app is installed
 * @param cb
 */
InstagramShare.prototype.isInstalled = function(cb) {
    exec(
        function(version) {
            cb(version);
        },
        function() {
            cb(false)
        },
        "InstagramShare",
        "isInstalled",
        []
    );
};

/**
 * Starting the share process
 * @param data
 * @param caption
 * @param cb
 */
InstagramShare.prototype.shareImage = function(data, caption, cb) {
    if (data.indexOf('data:image') > -1 ) {
        this.shareImageData(data, caption, cb);
    } else {
        cb("Instagram image data should be encoded on the base 64 format.")
    }
};

InstagramShare.prototype.shareVideo = function(data, caption, cb) {
    if (data.indexOf('data:image') > -1 ) {
        this.shareVideoData(data, caption, cb);
    } else {
        cb("Instagram image data should be encoded on the base 64 format.")
    }
};

InstagramShare.prototype.shareVideoData = function(data, caption, cb) {

    /**
     * Calling the cordova exec method passing the native param
     */
    exec(
        function() {
            if (cordova && cordova.plugins && cordova.plugins.clipboard && caption !== '') {
                cordova.plugins.clipboard.copy(caption);
            }
            cb(null);
        },
        function(err) {
            cb(err);
        },
        "InstagramShare",
        "shareVideo",
        [data, caption]
    );
};

/**
 * Sharing image
 * @param filePath
 * @param caption
 * @param cb
 */
InstagramShare.prototype.shareImageData = function(filePath, caption, cb) {
    var image = filePath.replace(/data:image\/(png|jpeg);base64,/, "");

    /**
     * Calling the cordova exec method passing the native param
     */
    exec(
        function() {
            if (cordova && cordova.plugins && cordova.plugins.clipboard && caption !== '') {
                cordova.plugins.clipboard.copy(caption);
            }
            cb(null);
        },
        function(err) {
            cb(err);
        },
        "InstagramShare",
        "shareImage",
        [image, caption]
    );
};

/**
 * Exporting module
 * @type {InstagramShare}
 */
module.exports = new InstagramShare();

