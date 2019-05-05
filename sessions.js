function buildPopupDom(list_entry) {
  var popupDiv = document.getElementById('sessions');
  var ol = popupDiv.appendChild(document.createElement('ol'));
  ol.start = 0;
  for (var i = 0; i < list_entry.length; i++) {
    var li = ol.appendChild(document.createElement('li'));
    var a = li.appendChild(document.createElement('a'));
    a.href = list_entry[i].url;
    a.appendChild(document.createTextNode(list_entry[i].title));
  }
}
chrome.sessions.getRecentlyClosed(buildPopupDom);
