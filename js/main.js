$(document).ready(function() {

  var $getGroupBtn = $('#getGroupBtn');
  var $tokenInput = $('#tokenInput');
  var $groupSelect = $('#groupSelect');
  var $selectGroupBtn = $('#selectGroupBtn');
  $getGroupBtn.click(function() {
    $getGroupBtn.hide();
    $tokenInput.attr("readonly", "readonly");
    $groupSelect.show();
    $selectGroupBtn.show();
  });

  $selectGroupBtn.click(function() {
    console.log($groupSelect.val());
  })
  //$(document.body).append("Startup successful.<br>");
  //load();
});