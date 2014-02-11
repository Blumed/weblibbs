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
    ul = $("<ul></ul>")
    var storage = getWords()
    for( i in storage.words ){
        ul.append( 
            "<li id='word"+i+"' >" +
            "<span>" + storage.words[i].bad + "</span>" + 
            "<span> - </span>" + 
            "<span>" + storage.words[i].good + "</span>" + 
            "</li>"
        );
    }
    if(storage.words.length == 0) { 
        el.hide()
    }
    else {
        el.show()
    }
    el.html(ul)
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

function clearAllWords(){
	localStorage.removeItem("web libs")
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  		chrome.tabs.sendMessage(tabs[0].id, getWords(), function() {
  		})
	})
    listWords( $("#words-list") )
}

