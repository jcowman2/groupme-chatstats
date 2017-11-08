var userToken;
var groups;
var selectedGroup;
var messages;

function getGroups(successFunc=groups=>printJson(groups), errorFunc=()=>printToScreen("Error: Could not retrieve groups.")) {
  $.ajax({
    url: "https://api.groupme.com/v3/groups",
    type: "get",
    data: {
      token: userToken,
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

function getMostRecentMessage(successFunc=message=>printJson(message), errorFunc=()=>printToScreen("Error: Could not retrieve message.")) {
  var message;
  $.ajax({
    url: "https://api.groupme.com/v3/groups/" + selectedGroup.id + "/messages",
    type: "get",
    data: {
      token: userToken,
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

function getAllMessages(successFunc=messages=>console.log(messages), errorFunc=()=>printToScreen("Error: Could not retrieve messages.")) {
  var numMessages = selectedGroup.messageCount;
  var lastMessageId = undefined;
  messages = [];

  for (var messageIndex = 0; messageIndex < numMessages; messageIndex += 100) {
    $.ajax({
      url: "https://api.groupme.com/v3/groups/" + selectedGroup.id + "/messages",
      type: "get",
      data: lastMessageId == undefined ? {token: userToken, limit: 100} : {token: userToken, limit:100, before_id: lastMessageId},
      success: function(response) {
        console.log(response);
        Array.prototype.push.apply(messages, response.response.messages);
        lastMessageId = messages[messages.length - 1].id;
      }
    });
  }

  successFunc(messages);
}