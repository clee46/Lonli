var moodData = {};
moodData.array = [];
console.log('mood data');
var ref = new Firebase('https://brilliant-fire-1757.firebaseio.com/');
console.log(ref);

function DataEntry (opts) {
  console.log('new data obj');
  Object.keys(opts).forEach(function(e,index,keys) {
    this[e] = opts[e];
  },this);
  // this.id = postList.length + 1;
  // postList.push(this);
}

moodData.saveChart = function(chart, chartRef) {
  // localStorage.clear();
  console.log(chart);
  console.log(chartRef);
  if (chartRef !== '') {
    // chart.forEach(function(dataPoint) {
      var point = JSON.stringify(chart);
      chartRef.push(point);
    // });
  }
  // var savedChart = JSON.stringify(chart);
  // localStorage.setItem('moodChartData', savedChart);
  // push chart to current user's moodChartData array
  // usersRef.child(currentUserId).moodChartData.push(savedChart);
  // chartRef.push(savedChart);
};

moodData.loadData = function(chartRef) {
  moodData.array = [];
  console.log(chartRef);
  // var storedData = localStorage.getItem('moodChartData');
  if (chartRef !== '') {
    chartRef.once('value', function(snapshot) {
      if (snapshot !== null) { // if there is data, load it
        snapshot.forEach(function(childSnapshot) {
          console.log(childSnapshot);;
          var temp = new DataEntry(JSON.parse(childSnapshot.val()));
          console.log(temp);
          moodData.array.push(temp);
        });
      }
    });
  }
  // var parsedData = JSON.parse(storedData);
  // if(parsedData != null){
  //   moodData.array = [];
  //   parsedData.forEach(function(item) {
  //     moodData.array.push(item);
  //   });
  // }
  // console.log(parsedData);
};
moodData.getData = function() {
  var chartRef = ref.child('users').child(currentUserId).child('moodChartData');
  console.log(currentUserId);
  console.log(chartRef);
  moodData.loadData(chartRef);
  $(document).off('click', '#moodSubmit').on('click', '#moodSubmit', function(e) {
    e.preventDefault();
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
    moodData.array.push(newEnt);                      // updates local moodData array
    moodData.saveChart(newEnt, chartRef);     // updates Firebase data
    moodView.makeChart();                             // updates chart
    // moodView.makeChart();// needed to get rid of small chart on first load
  });
};
