// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

function applyWords(request, sender, sendResponse) {
        if(request != undefined && request.words != undefined) 
                walk(document.body,request.words,0)
}
function walk(node,arr,parentNode,ctr)
{
        // I stole this function from here: http://is.gd/mwZp7E
        var child, next
        if( ctr == undefined ) ctr = 0
        switch ( node.nodeType )
        {
            case 1:  // Element
            case 9:  // Document
            case 11: // Document fragment
                child = node.firstChild
                while ( child )
                {
                    ctr = ctr + 1
                    walk(child,arr,node,ctr)
                    child = child.nextSibling
                }
                break
            case 3: // Text node
                if(node.parentElement.tagName.toLowerCase() != "script") {
                    handleText(node,arr,parentNode, ctr);
                }
                break
        }
}

function handleText( textNode, arr, parentNode,ctr ){
    var datattr = "data-weblibbs_original" + ctr
    var text = parentNode.getAttribute(datattr)
    if( text == undefined ){
        parentNode.setAttribute( datattr, text = textNode.nodeValue )
    }
    for( i in arr){ 
        text  = text.replace( new RegExp( arr[i].bad,"gi"), arr[i].good)
    }
    textNode.nodeValue = text
}

//ask for the words from the extension.  
chrome.runtime.onMessage.addListener( applyWords )
chrome.runtime.sendMessage({greeting: "giveMeWords"}, applyWords )

