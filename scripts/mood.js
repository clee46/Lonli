var moodData = {};
moodData.array = [];
var ref = new Firebase('https://brilliant-fire-1757.firebaseio.com/');

function DataEntry (opts) {
  Object.keys(opts).forEach(function(e,index,keys) {
    this[e] = opts[e];
  },this);
}

moodData.saveChart = function(chart, chartRef) {
  if (chartRef !== '') {
    var point = JSON.stringify(chart);
    chartRef.push(point);
  }

};

moodData.loadData = function(chartRef) {
  moodData.array = [];
  if (chartRef !== '') {
    chartRef.once('value', function(snapshot) {
      if (snapshot !== null) { // if there is data, load it
        snapshot.forEach(function(childSnapshot) {
          var temp = new DataEntry(JSON.parse(childSnapshot.val()));
          moodData.array.push(temp);
        });
      }
    });
  }
};
moodData.getData = function() {
  var chartRef = ref.child('users').child(currentUserId).child('moodChartData');
  moodData.loadData(chartRef);
  $(document).off('click', '#moodSubmit').on('click', '#moodSubmit', function(e) {
    e.preventDefault();
    if (currentUserId === '') {alert('You need to login in order to track your mood!');}
    else {
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
      // console.log(moodData.entry);
      moodData.array.push(newEnt);                      // updates local moodData array
      moodData.saveChart(newEnt, chartRef);             // updates Firebase data
      moodView.makeChart();                             // updates chart
      // moodView.makeChart();// needed to get rid of small chart on first load
    }
  });
};
