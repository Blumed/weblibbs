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
    tbl = $("<tbody></tbody>")
    var storage = getWords()
    for( i in storage.words ){
        tbl.append( 
            "<tr id='word"+i+"' >" +
            "<td>" + storage.words[i].bad + "</td>" + 
            "<td>&nbsp;</td>" +
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

function clearAllWords(){
	localStorage.removeItem("web libs")
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  		chrome.tabs.sendMessage(tabs[0].id, getWords(), function() {
  		})
	})
    listWords( $("#words-list") )
}


