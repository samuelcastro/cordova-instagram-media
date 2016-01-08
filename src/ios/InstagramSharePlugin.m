/*
       Copyright (c) 2016 Samuel Castro

       Licensed to the Apache Software Foundation (ASF) under one
       or more contributor license agreements.  See the NOTICE file
       distributed with this work for additional information
       regarding copyright ownership.  The ASF licenses this file
       to you under the Apache License, Version 2.0 (the
       "License"); you may not use this file except in compliance
       with the License.  You may obtain a copy of the License at

         http://www.apache.org/licenses/LICENSE-2.0

       Unless required by applicable law or agreed to in writing,
       software distributed under the License is distributed on an
       "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
       KIND, either express or implied.  See the License for the
       specific language governing permissions and limitations
       under the License.
*/

#import <Cordova/CDV.h>
#import "InstagramSharePlugin.h"

static NSString *InstagramId = @"com.burbn.instagram";

@implementation InstagramSharePlugin

@synthesize toInstagram;
@synthesize callbackId;
@synthesize interactionController;

-(void)isInstalled:(CDVInvokedUrlCommand*)command {
    self.callbackId = command.callbackId;
    CDVPluginResult *result;

    NSURL *instagramURL = [NSURL URLWithString:@"instagram://app"];
    if ([[UIApplication sharedApplication] canOpenURL:instagramURL]) {
        result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
        [self.commandDelegate sendPluginResult:result callbackId: self.callbackId];
    } else {
        result = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR];
        [self.commandDelegate sendPluginResult:result callbackId: self.callbackId];
    }

}

- (void)shareImage:(CDVInvokedUrlCommand*)command {
    self.callbackId = command.callbackId;
    self.toInstagram = FALSE;
    NSString    *objectAtIndex0 = [command argumentAtIndex:0];
    NSString    *caption = [command argumentAtIndex:1];

    CDVPluginResult *result;

    NSURL *instagramURL = [NSURL URLWithString:@"instagram://app"];
    if ([[UIApplication sharedApplication] canOpenURL:instagramURL]) {
        NSLog(@"open in instagram");

        NSData *imageObj = [NSData dataFromBase64String:objectAtIndex0];
        NSString *tmpDir = NSTemporaryDirectory();
        NSString *path = [tmpDir stringByAppendingPathComponent:@"instagram.igo"];

        [imageObj writeToFile:path atomically:true];

        self.interactionController = [UIDocumentInteractionController interactionControllerWithURL:[NSURL fileURLWithPath:path]];
        self.interactionController .UTI = @"com.instagram.exclusivegram";
        if (caption) {
            self.interactionController .annotation = @{@"InstagramCaption" : caption};
        }
        self.interactionController .delegate = self;
        [self.interactionController presentOpenInMenuFromRect:CGRectZero inView:self.webView animated:YES];

    } else {
        result = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageToErrorObject:1];
        [self.commandDelegate sendPluginResult:result callbackId: self.callbackId];
    }
}

- (void) documentInteractionController: (UIDocumentInteractionController *) controller willBeginSendingToApplication: (NSString *) application {
    if ([application isEqualToString:InstagramId]) {
        self.toInstagram = TRUE;
    }
}

- (void) documentInteractionControllerDidDismissOpenInMenu: (UIDocumentInteractionController *) controller {
    CDVPluginResult *result;

    if (self.toInstagram) {
        result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
        [self.commandDelegate sendPluginResult:result callbackId: self.callbackId];
    } else {
        result = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageToErrorObject:2];
        [self.commandDelegate sendPluginResult:result callbackId: self.callbackId];
    }
}

@end
