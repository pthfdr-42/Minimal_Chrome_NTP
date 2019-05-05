function list(list_entry) {
  var location = document.getElementById('topsite');
  var list_main = location.appendChild(document.createElement('ol'));
  list_main.start = 0;
  for (var index_number = 0; index_number < list_entry.length; index_number++) {
    var list_item = list_main.appendChild(document.createElement('li'));
    var list_link = list_item.appendChild(document.createElement('a'));
    list_link.href = list_entry[index_number].url;
    list_link.appendChild(document.createTextNode(list_entry[index_number].title));
  }
}
chrome.topSites.get(list);
