var moodData = {};
moodData.array = [];
function DataEntry (opts) {
  console.log('new data obj');
  Object.keys(opts).forEach(function(e,index,keys) {
    this[e] = opts[e];
  },this);
  this.id = postList.length + 1;
  postList.push(this);
}
// moodData.entry.newDate = new Date().toDateString();
// moodData.entry.rating = null;
// moodData.entry.exercise = null;
// moodData.entry.sleep = null;
// moodData.entry.weather = null;
// moodData.entry.eat = null;
// moodData.entry.meds = null;
// moodData.entry.drugs = null;

moodData.saveChart = function(chart) {
  localStorage.clear();
  var savedChart = JSON.stringify(chart);
  localStorage.setItem('moodChartData', savedChart);
};

moodData.loadData = function() {
  var storedData = localStorage.getItem('moodChartData');
  var parsedData = JSON.parse(storedData);
  if(parsedData != null){
    moodData.array = [];
    parsedData.forEach(function(item) {
      // moodView.tempDateArray.push(val);
      moodData.array.push(item);
    });
  }
  console.log(parsedData);
};

moodData.getData = function() {
  moodData.loadData();
  $('#moodSubmit').on('click', function(e) {
    e.preventDefault();
    // add time check here if we get to it
    $('#preview-text').remove();
    var newEnt = new DataEntry({
      newDate: new Date().toDateString(),
      rating: $('input[name="mood"]:checked').val(),
      exercise: $('input[name="exercise"]:checked').val(),
      sleep: $('input[name="sleep"]:checked').val(),
      weather: $('input[name="weather"]:checked').val(),
      eat: $('input[name="eat"]:checked').val(),
      meds: $('input[name="meds"]:checked').val(),
      drugs: $('input[name="drugs"]:checked').val()
    });
    if(!newEnt.rating || !newEnt.exercise || !newEnt.sleep || !newEnt.weather || !newEnt.eat || !newEnt.meds || !newEnt.drugs){
      alert('Please check all options');
      return;
    }
    console.log(moodData.entry);
    moodData.array.push(newEnt);
    moodData.saveChart(moodData.array);
    moodView.makeChart();
    // moodView.makeChart();
  });
};
// Controller
// moodData.loadData();
// moodData.getData();
// moodView.makeChart();
