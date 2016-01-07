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

InstagramShare.prototype.test = function(successCallback, errorCallback) {
    exec(successCallback, errorCallback, "InstagramShare", "test", []);
};

InstagramShare.prototype.isInstalled = function(successCallback, errorCallback) {
    exec(successCallback, errorCallback, "InstagramShare", "isInstalled", []);
};

InstagramShare.prototype.shareMedia = function(filePath, caption, successCallback, errorCallback) {
    var image = filePath.replace(/data:image\/(png|jpeg);base64,/, "");
    cordova.plugins.clipboard.copy(caption);
    exec(successCallback, errorCallback, "InstagramShare", "shareMedia", [image, caption]);
};

module.exports = new InstagramShare();

