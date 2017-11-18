var userToken;
var groups;
var selectedGroup;
var messages;

const $output = $('#output');

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
  console.log(`${groupName} id: ${selectedGroup.id}`);
  console.log(selectedGroup);
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

function getAllMessages(successFunc=messages=>console.log(messages)) {
  let numMessages = selectedGroup.messageCount;
  let lastMessageId = undefined;
  messages = [];

  function getNextMessageBlock() {
    let paramData = lastMessageId == undefined ? {token: userToken, limit: 100} : {token: userToken, limit:100, before_id: lastMessageId};
    $.ajax({
      url: "https://api.groupme.com/v3/groups/" + selectedGroup.id + "/messages",
      type: "get",
      data: paramData,
      success: function(response) {   //Code to run after each ajax call
        //Add messages to collection
        Array.prototype.push.apply(messages, response.response.messages);
        lastMessageId = messages[messages.length - 1].id;

        analyze(response.response.messages, selectedGroup);

        //Update percentage of messages retrieved
        $output.html(`${Math.floor((messages.length / numMessages) * 100)}% of messages retrieved.`);

        //Get next group or end call stack
        if (messages.length < numMessages) {
          getNextMessageBlock();
        } else {
          successFunc(messages);
        }
      }
    });
  }

  getNextMessageBlock();

}