$(document).ready(function() {

  var $getGroupBtn = $('#getGroupBtn');
  var $tokenInput = $('#tokenInput');
  var $groupSelect = $('#groupSelect');
  var $selectGroupBtn = $('#selectGroupBtn');

  $getGroupBtn.click(function() {
    getGroups($tokenInput.val(),
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
    console.log($groupSelect.val());
  })

});