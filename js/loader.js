function getGroups(token, callback=response=>printJson(response)) {
  $.ajax({
    url: "https://api.groupme.com/v3/groups",
    type: "get",
    data: {
      token: token,
      per_page: 99
    },
    success: function(response) {
      callback(response);
    },
    failure: function() {
      printToScreen("Error: Could not retrieve groups.");
    }
  });
}

function printJson(json) {
  printToScreen(JSON.stringify(json, null, 4));
}

function printArray(arr) {
  arr.forEach(e => printToScreen(e));
}

function printToScreen(data) {
  $(document.body).append("<pre>" + data + "</pre><br>");
}

var groups;

function load() {
  getGroups(tst.cf, function(json) {
      groups = jsonToGroups(json);
      var groupNames = groups.toProperty("name");
      printArray(groupNames);
  });
}