var userToken;
var groups;
var selectedGroup;

function getGroups(token, successFunc=groups=>printJson(groups), errorFunc=()=>printToScreen("Error: Could not retrieve groups.")) {
  $.ajax({
    url: "https://api.groupme.com/v3/groups",
    type: "get",
    data: {
      token: token,
      per_page: 99
    },
    success: function(response) {
      groups = jsonToGroups(response);
    },
    complete: function() {
      //Check if retrieval was succesful or not
      if (groups == undefined) {
        errorFunc();
      } else {
        successFunc(groups);
      }
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

function addGroupNamesToDropdown($select, callback=function(){}) {
    var groupNames = groups.toProperty("name");
    groupNames.forEach(function(name) {
      $select.append('<option>' + name + '</option>');
    });
    callback();
}

function enterToken(token) {
  userToken = token;
}

function selectGroup(groupName) {
  selectedGroup = groups.find(group => group.name == groupName);
}

function getMostRecentMessage(token, groupId, successFunc=message=>printJson(message), errorFunc=()=>printToScreen("Error: Could not retrieve message.")) {
  var message;
  $.ajax({
    url: "https://api.groupme.com/v3/groups/" + groupId + "/messages",
    type: "get",
    data: {
      token: token,
      limit: 1
    },
    success: function(response) {
      console.log(response);
      message = new Message(response.response.messages[0]);
    },
    complete: function() {
      //Check if retrieval was succesful or not
      if (message == undefined) {
        errorFunc();
      } else {
        successFunc(message);
      }
    }
  });
}