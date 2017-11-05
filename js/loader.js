var groups;

function getGroups(token, callback=groups=>printJson(groups)) {
  $.ajax({
    url: "https://api.groupme.com/v3/groups",
    type: "get",
    data: {
      token: token,
      per_page: 99
    },
    success: function(response) {
      groups = jsonToGroups(response);
      callback(groups);
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

function addGroupNamesToDropdown($tokenInput, $dropdown, callback=()=>{}) {
  var token = $tokenInput.val();
  getGroups(token, function(groups) {
    var groupNames = groups.toProperty("name");
    groupNames.forEach(function(name) {
      $dropdown.append('<option>' + name + '</option>');
    });
    callback();
  });
}