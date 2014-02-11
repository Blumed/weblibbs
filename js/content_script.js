// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

function applyWords(request, sender, sendResponse) {
        if(request != undefined && request.words != undefined) 
                walk(document.body,request.words)
}
//ask for the words from the extension.  
chrome.runtime.sendMessage({greeting: "giveMeWords"}, applyWords )

chrome.runtime.onMessage.addListener( applyWords )

function walk(node,arr)
{
        // I stole this function from here:
        // http://is.gd/mwZp7E

        var child, next;

        switch ( node.nodeType )
        {
                case 1:  // Element
                case 9:  // Document
                case 11: // Document fragment
                        child = node.firstChild;
                        while ( child )
                        {
                                next = child.nextSibling;
                                walk(child,arr);
                                child = next;
                        }
                        break;

                case 3: // Text node
            if(node.parentElement.tagName.toLowerCase() != "script") {
                handleText(node,arr);
            }
                        break;
        }
}

function handleText(textNode,arr) {
        var v = textNode.nodeValue;

  // Deal with the easy case

for( i in arr){ 
  v = v.replace( new RegExp( arr[i].bad,"gi"), arr[i].good)}

        textNode.nodeValue = v;
}
