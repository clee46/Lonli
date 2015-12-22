var moodView = {};
moodView.tempMoodArray = [];
moodView.tempDateArray = [];
moodView.tempSleepArray = [];
moodView.tempWeatherArray = [];
moodView.tempExerciseArray = [];
moodView.tempEatArray = [];
moodView.tempMedsArray = [];
moodView.tempDrugsArray = [];

moodView.makeChart = function() {
  //Needed to stop chart flickering
  $('canvas').remove();
  $('main').append($('<canvas>').attr('id', 'moodChart'));
  //Here to grab mood rating
  moodDataArray.forEach(function(item) {
    var val = item.rating;
    moodView.tempMoodArray.push(val);
  });
  moodDataArray.forEach(function(item) {
    var val = item.exercise;
    moodView.tempExerciseArray.push(val);
  });
  moodDataArray.forEach(function(item) {
    var val = item.sleep;
    moodView.tempSleepArray.push(val);
  });
  moodDataArray.forEach(function(item) {
    var val = item.weather;
    moodView.tempWeatherArray.push(val);
  });
  moodDataArray.forEach(function(item) {
    var val = item.eat;
    moodView.tempEatArray.push(val);
  });
  moodDataArray.forEach(function(item) {
    var val = item.meds;
    moodView.tempMedsArray.push(val);
  });
  moodDataArray.forEach(function(item) {
    var val = item.drugs;
    moodView.tempDrugsArray.push(val);
  });

//Here to grab date
  moodDataArray.forEach(function(item) {
    var val = item.newDate;
    moodView.tempDateArray.push(val);
  });

  moodView.data = {
    labels: moodView.tempDateArray,
    datasets: [
      {
        label: 'Mood',
        fillColor: 'rgba(220,220,220,0.2)',
        strokeColor: 'rgba(220,220,220,1)',
        pointColor: 'rgba(220,220,220,1)',
        pointStrokeColor: '#fff',
        pointHightlightFill: '#fff',
        pointHighlightStroke: 'rgba(220,220,220,1)',
        data: moodView.tempMoodArray
      },
      {
        label: 'Exercise',
        fillColor: 'rgba(220,220,220,0.2)',
        strokeColor: 'rgba(220,220,220,1)',
        pointColor: 'rgba(220,220,220,1)',
        pointStrokeColor: '#fff',
        pointHightlightFill: '#fff',
        pointHighlightStroke: 'rgba(220,220,220,1)',
        data: moodView.tempExerciseArray
      },
      {
        label: 'Sleep',
        fillColor: 'rgba(220,220,220,0.2)',
        strokeColor: 'rgba(220,220,220,1)',
        pointColor: 'rgba(220,220,220,1)',
        pointStrokeColor: '#fff',
        pointHightlightFill: '#fff',
        pointHighlightStroke: 'rgba(220,220,220,1)',
        data: moodView.tempSleepArray
      },
      {
        label: 'Weather',
        fillColor: 'rgba(220,220,220,0.2)',
        strokeColor: 'rgba(220,220,220,1)',
        pointColor: 'rgba(220,220,220,1)',
        pointStrokeColor: '#fff',
        pointHightlightFill: '#fff',
        pointHighlightStroke: 'rgba(220,220,220,1)',
        data: moodView.tempWeatherArray
      },
      {
        label: 'Ate well',
        fillColor: 'rgba(220,220,220,0.2)',
        strokeColor: 'rgba(220,220,220,1)',
        pointColor: 'rgba(220,220,220,1)',
        pointStrokeColor: '#fff',
        pointHightlightFill: '#fff',
        pointHighlightStroke: 'rgba(220,220,220,1)',
        data: moodView.tempEatArray
      },
      {
        label: 'Taken meds',
        fillColor: 'rgba(220,220,220,0.2)',
        strokeColor: 'rgba(220,220,220,1)',
        pointColor: 'rgba(220,220,220,1)',
        pointStrokeColor: '#fff',
        pointHightlightFill: '#fff',
        pointHighlightStroke: 'rgba(220,220,220,1)',
        data: moodView.tempMedsArray
      },
      {
        label: 'Taken Drugs',
        fillColor: 'rgba(220,220,220,0.2)',
        strokeColor: 'rgba(220,220,220,1)',
        pointColor: 'rgba(220,220,220,1)',
        pointStrokeColor: '#fff',
        pointHightlightFill: '#fff',
        pointHighlightStroke: 'rgba(220,220,220,1)',
        data: moodView.tempDrugsArray
      }
    ]
  };

  moodView.ctx = $('#moodChart').get(0).getContext('2d');
  moodView.lineChart = new Chart(moodView.ctx).Line(moodView.data);
  //Options here
  Chart.defaults.global.responsive = true;
  Chart.defaults.global.multiTooltipTemplate = '<%= datasetLabel %> - <%= value %>';
};
// Controller
$(function() {
  moodView.makeChart();
  
});
