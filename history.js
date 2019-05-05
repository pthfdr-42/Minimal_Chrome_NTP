function onAnchorClick(event) {
  return false;
}

function buildPopupDom(divName, data) {
  var popupDiv = document.getElementById(divName);
  var ol = document.createElement('ol');
  ol.start = 0;
  popupDiv.appendChild(ol);

  for (var i = 0, ie = data.length; i < ie; ++i) {
    var a = document.createElement('a');
    a.href = data[i];
    a.appendChild(document.createTextNode(data[i]));
    a.addEventListener('click', onAnchorClick);
    var li = document.createElement('li');
    li.appendChild(a);
    ol.appendChild(li);
  }
}

function buildTypedUrlList(divName) {
  var numRequestsOutstanding = 0;
  chrome.history.search({
      'text': '',
    },
    function(historyItems) {
      for (var i = 0; i < historyItems.length; ++i) {
        var url = historyItems[i].url;
        var processVisitsWithUrl = function(url) {
          return function(visitItems) {
            processVisits(url, visitItems);
          };
        };
        chrome.history.getVisits({
          url: url
        }, processVisitsWithUrl(url));
        numRequestsOutstanding++;
      }
      if (!numRequestsOutstanding) {
        onAllVisitsProcessed();
      }
    });

  var urlToCount = {};
  var processVisits = function(url, visitItems) {
    for (var i = 0, ie = visitItems.length; i < ie; ++i) {
      if (visitItems[i].transition != 'link') {
        continue;
      }
      if (!urlToCount[url]) {
        urlToCount[url] = 0;
      }
      urlToCount[url]++;
    }
    if (!--numRequestsOutstanding) {
      onAllVisitsProcessed();
    }
  };
  var onAllVisitsProcessed = function() {
    urlArray = [];
    for (var url in urlToCount) {
      urlArray.push(url);
    }
    buildPopupDom(divName, urlArray.slice(0, 50));
  };
}

document.addEventListener('DOMContentLoaded', function() {
  buildTypedUrlList("history");
});
