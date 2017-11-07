$(document).ready(function() {

  var $getGroupBtn = $('#getGroupBtn');
  var $tokenInput = $('#tokenInput');
  var $groupSelect = $('#groupSelect');
  var $selectGroupBtn = $('#selectGroupBtn');

  $getGroupBtn.click(function() {
    enterToken($tokenInput.val());
    getGroups(userToken,
      //On Success
      function() {
        $getGroupBtn.hide();
        $tokenInput.attr("readonly", "readonly");
        addGroupNamesToDropdown($groupSelect, function() {
          $groupSelect.show();
          $selectGroupBtn.show();
        });
      },
      //On Failure
      function() {
        alert("Could not retrieve your groups. Please make sure your token is valid.");
      });
  });

  $selectGroupBtn.click(function() {
    selectGroup($groupSelect.val());
    console.log(selectedGroup.id);
    getMostRecentMessage(userToken, selectedGroup.id);
  })

});