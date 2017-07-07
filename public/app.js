$(document).on("click", ".article-save", function() {
  var thisId = $(this).attr("id");
  var baseURL = window.location.origin;
  console.log(thisId);
  $.ajax({
    method: "POST",
    url: baseURL + "/saved/" + thisId,
    data: {
      saved: true
    }
  }).done(function(data) {
      console.log("Saved!", data);
    });
});
