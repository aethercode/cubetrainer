var timing = false;
var timer = {
  start: 1,
  end: 1
}

var casesChanged = true;
var possibleCases = [];
var chosenCase;

var times = [];

function selectAll() {
  for (id in cases) {
    $("#case"+id).addClass("border-secondary");
    cases[id].selected = true;
    casesChanged = true;
  }
}
function deselectAll() {
  for (id in cases) {
    $("#case"+id).removeClass("border-secondary");
    cases[id].selected = false;
    casesChanged = true;
  }
}

function toggleSelect(id) {
  if (cases[id].selected == true) {
    $("#case"+id).toggleClass("border-secondary");
    cases[id].selected = false;
  } else {
    $("#case"+id).toggleClass("border-secondary");
    cases[id].selected = true;
  }
  casesChanged = true;
}

function setup() {
  if (casesChanged == true) {
    updateCases();
  }
  if (possibleCases.length > 0) {
    chosenCase = possibleCases[Math.floor(Math.random() * possibleCases.length)];
    var scramble = generate(chosenCase.alg);
    $("#scramble").text(scramble);
    $("#image").attr("src", "http://cube.crider.co.uk/visualcube.php?fmt=svg&bg=t&view=plan&size=100&alg="+scramble);
    $("#set").text(" "+chosenCase.set);
    $("#case").text(" "+chosenCase.name);
  } else {
    $("#timer").text("pick cases");
    $("#scramble").text("");
    $("#image").attr("src", "http://cube.crider.co.uk/visualcube.php?fmt=svg&bg=t&view=plan&size=100");
  }
}

var time = new Date();
function updateTimer() {
  if (timing == true) {
    var time = new Date();
    $("#timer").text(Math.floor((time.getTime()-timer.start)/1000) + " seconds");
    setTimeout(updateTimer, 20);
  }
}

var timing;
function timeListUpdate() {
  var timelist = "";
  for (t in times) {
    timelist+="<u>"+times[t].time+"("+times[t].name+")</u> ";
  }
  $("#times").html(timelist);
}
function clearTimes() {
  times = [];
  timeListUpdate();
}

function toggleTimer() {
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
    times.push({name: chosenCase.name, time: (Math.round((timer.end-timer.start)/10)/100)});

    timeListUpdate();

    $("#timer").text(Math.round((timer.end-timer.start)/10)/100 + " seconds");
    setup();
 }
}

function updateCases() {
  possibleCases = [];
  for (c in cases) {
    if (cases[c].selected == true) {
      possibleCases.push(cases[c]);
    }
  }
  casesChanged = false;
}

$(document).on('keyup',function(e) {
  if(e.which == 32) {
    if (casesChanged == true) {
      updateCases();
    }
    if (possibleCases.length > 0) {
      toggleTimer();
    } else {
      $("#timer").text("pick cases");
    }
  }
});

var casepickerhtml = "";
for (var c in cases) {
  var generated = generate(cases[c].alg);
  casepickerhtml += "<a  id='"+"case"+c+"' role='button' onclick='toggleSelect(\""+c+"\")' style='margin: 5px' class='btn'><h3>"+cases[c].name+"</h3><img class='card-img-top' src=\"http://cube.crider.co.uk/visualcube.php?fmt=svg&bg=t&view=plan&size=100&alg="+generated+"\"></img></a>";
}
$("#cases").html(casepickerhtml);

$("#pickcases").on('hide.bs.modal', function (e) {
  $("#timer").text("press space");
  setup();
})

$("#pickcases").modal();
