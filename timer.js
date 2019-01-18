var timing = false;
var timer = {
  start: 1,
  end: 1
}
//var starttime = 1;
//var endtime = 1;
var time = new Date();
function updateTimer() {
  if (timing == true) {
    var time = new Date();
    $("#timer").text(Math.floor((time.getTime()-timer.start)/1000) + " seconds");
    setTimeout(updateTimer, 20);
  }
}
$(document).on('keyup',function(e) {
  if(e.which == 32) {
    if (timing !== true) {
      var time = new Date();
      $("#timer").text("...");
      timing = true;
      timer.start = time.getTime();
      updateTimer();
    } else {
      var time = new Date();
      timing = false;
      timer.end = time.getTime();
      $("#timer").text(Math.round((timer.end-timer.start)/10)/100 + " seconds");
    }
  }
});
