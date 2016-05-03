var moodView = {};

moodView.makeChart = function() {
  //Needed to stop chart flickering
  var tempMoodArray = [];
  var tempDateArray = [];
  var tempSleepArray = [];
  var tempWeatherArray = [];
  var tempExerciseArray = [];
  var tempEatArray = [];
  var tempMedsArray = [];
  var tempDrugsArray = [];
  $('canvas').remove();
  $('#mood-tab').append($('<canvas>').attr('id', 'moodChart'));
  //Here to grab mood rating
  moodData.array.forEach(function(item) {
    var val = item.rating;
    tempMoodArray.push(val);
  });
  moodData.array.forEach(function(item) {
    var val = item.exercise;
    tempExerciseArray.push(val);
  });
  moodData.array.forEach(function(item) {
    var val = item.sleep;
    tempSleepArray.push(val);
  });
  moodData.array.forEach(function(item) {
    var val = item.weather;
    tempWeatherArray.push(val);
  });
  moodData.array.forEach(function(item) {
    var val = item.eat;
    tempEatArray.push(val);
  });
  moodData.array.forEach(function(item) {
    var val = item.meds;
    tempMedsArray.push(val);
  });
  moodData.array.forEach(function(item) {
    var val = item.drugs;
    tempDrugsArray.push(val);
  });

//Here to grab date
  moodData.array.forEach(function(item) {
    var val = item.newDate;
    tempDateArray.push(val);
  });

  moodView.data = {
    labels: tempDateArray,
    datasets: [
      {
        label: 'Mood',
        // fillColor need to be darkest
        fillColor: 'rgba(124,80,20,0.7)',
        strokeColor: 'rgba(124,80,20,1)',
        pointColor: 'rgba(124,80,20,1)',
        pointStrokeColor: '#fff',
        pointHightlightFill: '#fff',
        pointHighlightStroke: 'rgba(124,80,20,1)',
        data: tempMoodArray
      },
      {
        label: 'Exercise',
        fillColor: 'rgba(220,220,220,0)',
        strokeColor: 'rgba(220,220,220,0)',
        pointColor: 'rgba(220,220,220,0)',
        pointStrokeColor: '#fff',
        pointHightlightFill: '#fff',
        pointHighlightStroke: 'rgba(220,220,220,0)',
        data: tempExerciseArray
      },
      {
        label: 'Sleep',
        // fillColor need to be 2nd darkest
        fillColor: 'rgba(25,25,87,0.3)',
        strokeColor: 'rgba(25,25,87,1)',
        pointColor: 'rgba(25,25,87,1)',
        pointStrokeColor: '#fff',
        pointHightlightFill: '#fff',
        pointHighlightStroke: 'rgba(25,25,87,1)',
        data: tempSleepArray
      },
      {
        label: 'Weather',
        // fillColor need to be lightest
        fillColor: 'rgba(124,115,20,0.2)',
        strokeColor: 'rgba(124,115,20,1)',
        pointColor: 'rgba(124,115,20,1)',
        pointStrokeColor: '#fff',
        pointHightlightFill: '#fff',
        pointHighlightStroke: 'rgba(124,115,20,1)',
        data: tempWeatherArray
      },
      {
        label: 'Ate well',
        fillColor: 'rgba(220,220,220,0)',
        strokeColor: 'rgba(220,220,220,0)',
        pointColor: 'rgba(220,220,220,0)',
        pointStrokeColor: '#fff',
        pointHightlightFill: '#fff',
        pointHighlightStroke: 'rgba(220,220,220,0)',
        data: tempEatArray
      },
      {
        label: 'Taken meds',
        fillColor: 'rgba(220,220,220,0)',
        strokeColor: 'rgba(220,220,220,0)',
        pointColor: 'rgba(220,220,220,0)',
        pointStrokeColor: '#fff',
        pointHightlightFill: '#fff',
        pointHighlightStroke: 'rgba(220,220,220,0)',
        data: tempMedsArray
      },
      {
        label: 'Taken Drugs',
        fillColor: 'rgba(220,220,220,0)',
        strokeColor: 'rgba(220,220,220,0)',
        pointColor: 'rgba(220,220,220,0)',
        pointStrokeColor: '#fff',
        pointHightlightFill: '#fff',
        pointHighlightStroke: 'rgba(220,220,220,0)',
        data: tempDrugsArray
      }
    ]
  };

  var ctx = $('#moodChart').get(0).getContext('2d');
  moodView.lineChart = new Chart(ctx).Line(moodView.data);
  //Options here
  // Chart.defaults.global.responsive = true;
  Chart.defaults.global.multiTooltipTemplate = '<%= datasetLabel %> - <%= value %>';
};
