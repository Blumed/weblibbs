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
}

function getWords(){
    var storage = JSON.parse(localStorage.getItem("web libs"))
	if(storage == null) storage = {words:[]}
	if(storage.words == undefined) storage.words = []
	return storage	
}

$(document).ready(function(){
	$("#submit-button").click(addWord)
});

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.greeting == "giveMeWords"){
      sendResponse(getWords())
    }
  }
)
