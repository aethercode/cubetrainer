//TODO: CHANGE ALG TO CASE...
var timing = false;
var timer = {
  start: 1,
  end: 1
}

var casesChanged = true;
var possibleCases = [];
var chosenCase;
var puzzleType = 3;

function toggle222() {
  if (puzzleType == 3) {
    puzzleType = 2;
    $("#togglesize").text("on");
  } else {
    puzzleType = 3;
    $("#togglesize").text("off");
  }
  setup();
}

var darkMode = false;
function toggleDarkMode() {
  if (darkMode) {
    $("#darkmodesetting").text("off");
    $("body").css("background", "white");
    $(".jumbotron").css("background", "rgb(233, 236, 239)");
    $(".modal-content").css("background", "white");
    $(".modal-header").css("border-bottom", "1px solid #e9ecef");
    $("body").css("color", "rgb(33, 37, 41)");
    darkMode = false;
  } else {
    darkMode = true;
    $("#darkmodesetting").text("on");
    $("body").css("background", "black");
    $(".jumbotron").css("background", "rgb(20, 20, 20)");
    $(".modal-content").css("background", "rgb(33, 37, 41)");
    $(".modal-header").css("border-bottom", "1px solid #444");
    $("body").css("color", "white");
  }
}

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
    $("#image").attr("src", "http://cube.crider.co.uk/visualcube.php?pzl="+puzzleType+"&fmt=svg&bg=t&view=plan&size=100&stage=cll&alg="+scramble);
    $("#set").text(" "+chosenCase.set);
    $("#case").text(" "+chosenCase.name);
  } else {
    $("#timer").text("select cases");
    $("#scramble").text("");
    $("#image").attr("src", "http://cube.crider.co.uk/visualcube.php?pzl="+puzzleType+"&fmt=svg&bg=t&view=plan&size=100&stage=cll");
  }
}
function aufToggle() {
  if (auf == true) {
    auf = false;
    $("#aufmodesetting").text("off");
  } else {
    auf = true;
    $("#aufmodesetting").text("on");
  }
  setup();
}

function getCaseAverage(name) {
  var totaltime = 0;
  var totalnum = 0;
  for (t in times) {
    if (times[t].name == name) {
      totalnum ++;
      totaltime += times[t].time;
    }
  }

  if(totalnum > 0) {
    var caseAverage = totaltime/totalnum;
    return {
      total: totalnum,
      average: Math.round(caseAverage*100)/100
    }
  } else {
    return {
      total: "no solves",
      average: "none"
    }
  }
}
function getSetAverage(set) {
  var totaltime = 0;
  var totalnum = 0;
  for (t in times) {
    if (times[t].set == set) {
      totalnum ++;
      totaltime += times[t].time;
    }
  }

  if(totalnum > 0) {
    var caseAverage = totaltime/totalnum;
    return {
      total: totalnum,
      average: Math.round(caseAverage*100)/100
    }
  } else {
    return {
      total: "no solves",
      average: "none"
    }
  }
}

function caseStats(name) {
  $("#casestats").modal();
  var statCase;
  for (alg in cases) {
    if (cases[alg].name == name) {
      statCase = cases[alg];
    }
  }
  var scramble = generate(statCase.alg);
  $("#statsimage").attr("src", "http://cube.crider.co.uk/visualcube.php?pzl="+puzzleType+"&fmt=svg&bg=t&view=plan&size=100&stage=cll&alg="+scramble);
  $("#specificCase").text(name);
  $("#specificCaseTotal").text(getCaseAverage(name).total);
  $("#specificCaseAverage").text(getCaseAverage(name).average);
  $("#specificSetTotal").text(getSetAverage(statCase.set).total);
  $("#specificSetAverage").text(getSetAverage(statCase.set).average);
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
var timesHidden = false;

function timeListUpdate() {
  if (timesHidden == false) {
    var timelist = "";
    for (t in times) {
      timelist+="<a href='#' onclick=\"caseStats('"+times[t].name+"')\"><u>"+times[t].time+"("+times[t].name+")</u></a> ";
    }
    $("#times").html(timelist);
  }
}
function deleteLastTime() {
  times.splice(times.length-1);
  timeListUpdate();
  if (times.length == 0) {
    $("#times").html("none");
  }
}
function toggleTimes() {
  if (timesHidden == true) {
    timesHidden = false;
    timeListUpdate();
    if (times.length == 0) {
      $("#times").html("none");
    }
    $("#timetoggle").html("hide");
  } else {
    $("#times").text("hidden");
    timesHidden = true;
    $("#timetoggle").html("show");
  }
}
function clearTimes() {
  times = [];
  timeListUpdate();
  $("#times").html("none");
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
    times.push({name: chosenCase.name, set:chosenCase.set, time: (Math.round((timer.end-timer.start)/10)/100)});

    timeListUpdate();

    $("#timer").text(Math.round((timer.end-timer.start)/10)/100 + " seconds");
    setup();
 }
}

function generalStatsModal() {
  var casesUsed = [];
  var averageList = [];

  for (t in times) {
    if (casesUsed.length > 0) {
      var caseUsed = false;
      for (c in casesUsed) {
        if (times[t].name == casesUsed[c]) {
          caseUsed = true;
        }
      }
      if (caseUsed !== true) {
        casesUsed.push(times[t].name);
      }
    } else {
      casesUsed.push(times[t].name);
    }
  }

  for (c in casesUsed) {
    averageList.push({time: getCaseAverage(casesUsed[c]).average, name: casesUsed[c]});
  }

  var timesOnly = [];
  var timeListE = [];
  for (t in averageList) {
    timesOnly.push(averageList[t].time);
  }
  timesOnly.sort(function(a, b){return a-b});
  var timescopy = Array.from(averageList);
  for (t in timesOnly) {
    for (tt in timescopy) {
      if (timescopy[tt].time == timesOnly[t]) {
        timeListE.push({time: timesOnly[t], name: timescopy[tt].name});
        timescopy.splice(tt, 1);
      }
    }
  }
  var bwtext = "";
  for (t in timeListE) {
    if (t == 0) {
      bwtext += "name: "+timeListE[t].name+", average: "+timeListE[t].time;
    } else {
      bwtext += "<br>name: "+timeListE[t].name+", average: "+timeListE[t].time;
    }
  }
  $("#bestworstlist").html("<br>"+bwtext);
  $("#overallstats").modal();
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
      $("#timer").text("select cases");
    }
  }
});

var casepickerhtml = "";
for (var c in cases) {
  var generated = generate(cases[c].alg);
  casepickerhtml += "<a  id='"+"case"+c+"' role='button' onclick='toggleSelect(\""+c+"\")' style='margin: 5px; border-width: 2px' class='btn'><h3>"+cases[c].name+"</h3><img class='card-img-top' src=\"http://cube.crider.co.uk/visualcube.php?fmt=svg&bg=t&view=plan&size=100&alg="+generated+"\"></img></a>";
}
$("#cases").html(casepickerhtml);

$("#pickcases").on('hide.bs.modal', function (e) {
  $("#timer").text("press space");
  setup();
})

$("#pickcases").modal();
