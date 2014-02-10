chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.greeting == "giveMeWords"){
      sendResponse(getWords())
    }
  }
)