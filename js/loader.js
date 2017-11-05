function getGroupNames(token) {
  $.ajax({
    url: "https://api.groupme.com/v3/groups",
    type: "get",
    data: {
      token: token
    },
    success: function(response) {
      printJson(response);
    },
    failure: function() {
      printToScreen("Error: Could not retrieve groups.");
    }
  });
}

function printJson(json) {
  printToScreen("<pre>" + JSON.stringify(json, null, 4) + "</pre>");
}

function printToScreen(data) {
  $(document.body).append(data + "<br>");
}

var load = function() {
  getGroupNames(tst.cf); //TODO: Change eventually
}