var moodData = {};
var moodDataArray = [];

moodData.newDate = new Date().toISOString().slice(0,10);
moodData.rating = null;
moodData.exercise = null;
moodData.sleep = null;
moodData.weather = null;
moodData.eat = null;
moodData.meds = null;
moodData.drugs = null;

moodData.saveChart = function(chart) {
  var savedChart = JSON.stringify(chart);
  localStorage.setItem('moodChartData', savedChart);
};

moodData.loadData = function() {
  var storedData = localStorage.getItem('moodChartData');
  var parsedData = JSON.parse(storedData);
  if(parsedData != null){
    parsedData.forEach(function(item) {
      // moodView.tempDateArray.push(val);
      moodDataArray.push(item);
    });
  }
  console.log(parsedData);
};

moodData.getData = function() {
  $('#moodSubmit').on('click', function(e) {
    e.preventDefault();
    moodData.rating = $('input[name="mood"]:checked').val();
    moodData.exercise = $('input[name="exercise"]:checked').val();
    moodData.sleep = $('input[name="sleep"]:checked').val();
    moodData.weather = $('input[name="weather"]:checked').val();
    moodData.eat = $('input[name="eat"]:checked').val();
    moodData.meds = $('input[name="meds"]:checked').val();
    moodData.drugs = $('input[name="drugs"]:checked').val();
//Why won't you SEE THIS
    if(!moodData.rating || !moodData.exercise || !moodData.sleep || !moodData.weather || !moodData.eat || !moodData.meds || !moodData.drugs){
      alert('Please check all options');
      return;
    }
    console.log(moodData);
    moodDataArray.push(moodData);
    moodData.saveChart(moodDataArray);
    moodView.makeChart();
  });
};
// Controller
moodData.loadData();
moodData.getData();
