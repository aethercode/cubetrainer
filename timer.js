var timing = false;
var timer = {
  start: 1,
  end: 1
}
function setup() {
  var chosencase = cases[Math.floor(Math.random() * cases.length)];
  var scramble = generate(chosencase.alg);
  $("#scramble").text(scramble);
  $("#image").attr("src", "http://cube.crider.co.uk/visualcube.php?fmt=svg&bg=t&view=plan&size=200&alg="+scramble);
  $("#set").text(" "+chosencase.set);
  $("#case").text(" "+chosencase.name);
}
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
      setup();
    }
  }
});

setup();
