function onAnchorClick(event) {
  return false;
}
function buildPopupDom(mostVisitedURLs) {
  var popupDiv = document.getElementById('topsite');
  var ol = popupDiv.appendChild(document.createElement('ol'));
  ol.start = 0;
  for (var i = 0; i < mostVisitedURLs.length; i++) {
    var li = ol.appendChild(document.createElement('li'));
    var a = li.appendChild(document.createElement('a'));
    a.href = mostVisitedURLs[i].url;
    a.appendChild(document.createTextNode(mostVisitedURLs[i].title));
    a.addEventListener('click', onAnchorClick);
  }
}
chrome.topSites.get(buildPopupDom);
