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
  //$(document.body).append("Startup successful.<br>");
  //load();
});