export class ControlCtrl {
  init() {
   
    google.charts.load('current', { 'packages': ['bar'] });
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {
      var data = google.visualization.arrayToDataTable([
        ['Рік', 'Садіння, висіювання', 'Природне поновлення'],
        ['2007', 60, 13.6],
        ['2008', 64.8, 15.3],
        ['2009', 64.5, 16.4],
        ['2010', 56.1, 14],
        ['2011', 55.7, 16.7],
        ['2012', 53.5, 16.6],
        ['2013', 48.9, 18.8]
      ]);

      var options = {
        chart: {
          title: 'Відтворення лісів 2007-2013',
          subtitle: 'Відтворення лісів у тис.га',
        }
      };

      var chart = new google.charts.Bar(document.getElementById('columnchart_material'));

      chart.draw(data, google.charts.Bar.convertOptions(options));
    }

  }
}


