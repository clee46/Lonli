var moodView = {};
moodView.tempMoodArray = [];
moodView.tempDateArray = [];

moodView.makeChart = function() {
  $('canvas').remove();
  $('main').append($('<canvas>').attr('id', 'moodChart'));
  moodDataArray.forEach(function(item) {
    var val = item.rating;
    moodView.tempMoodArray.push(val);
  });

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
      }
    ]
  };
  // moodView.data.labels = moodDataArray.map(function(a) {return a.newDate;});

  moodView.ctx = $('#moodChart').get(0).getContext('2d');
  moodView.lineChart = new Chart(moodView.ctx).Line(moodView.data); //Need to add options
  Chart.defaults.global.responsive = true;
};

moodView.makeChart();
