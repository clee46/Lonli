var moodData = {};
var moodDataArray = [];

moodData.newDate = new Date().toISOString().slice(0,10);
moodData.rating = null;
moodData.exercise = false;
moodData.sleep = null;
moodData.weather = null;
moodData.eat = false;
moodData.meds = false;
moodData.drugs = false;

moodData.saveChart = function(chart) {
  var savedChart = JSON.stringify(chart);
  localStorage.setItem('moodChartData', savedChart);
};

moodData.loadData = function() {
  var storedData = localStorage.getItem('moodChartData');
  var parsedData = JSON.parse(storedData);
  console.log(parsedData);
};

moodData.getData = function() {
  $('#moodSubmit').on('click', function(e) {
    e.preventDefault();
    moodData.rating = $('input[name="mood"]:checked').val();
    moodData.exercise = $('input[name="exercise"]:checked').val();
    moodData.sleep = $('input[name="sleep"]:checked').val();
    moodData.weather = $('#weather option:selected').val();
    moodData.eat = $('input[name="eat"]:checked').val();
    moodData.meds = $('input[name="meds"]:checked').val();
    moodData.drugs = $('input[name="drugs"]:checked').val();
    console.log(moodData);
    moodDataArray.push(moodData);
    moodData.saveChart(moodDataArray);
    moodView.makeChart();
  });
};




moodData.getData();
