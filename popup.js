function addWord(){
	var storage = getWords()
	storage.words.push( { bad: $("#bad").val(), good: $("#good").val()} )
	localStorage.setItem("web libs", JSON.stringify(storage))
	$("#bad").val("")
	$("#good").val("")
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  		chrome.tabs.sendMessage(tabs[0].id, storage, function() {
  		})
	})
    listWords( $("#words-list") )
}

function listWords(el){
    tbl = $("<table></table>")
    var storage = getWords()
    for( i in storage.words ){
        tbl.append( 
            "<tr id='word"+i+"' >" +
            "<td>" + storage.words[i].bad + "</td>" + 
            "<td><i> becomes </i></td>" + 
            "<td>" + storage.words[i].good + "</td>" + 
            "</tr>"
        );
    }
    if(storage.words.length == 0) { 
        el.hide()
    }
    else {
        el.show()
    }
    el.html(tbl)
}

function getWords(){
    var storage = JSON.parse(localStorage.getItem("web libs"))
	if(storage == null) storage = {words:[]}
	if(storage.words == undefined) storage.words = []
	return storage	
}

$(document).ready(function(){
	$("#submit-button").click(addWord)
	$("#clear-button").click(clearAllWords)
    listWords( $("#words-list") )
});

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.greeting == "giveMeWords"){
      sendResponse(getWords())
    }
  }
)

function clearAllWords(){
	var storage = getWords()
	storage.words.push( { bad: $("#bad").val(), good: $("#good").val()} )
	localStorage.removeItem("web libs")
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  		chrome.tabs.sendMessage(tabs[0].id, storage, function() {
  		})
	})
    listWords( $("#words-list") )
}

