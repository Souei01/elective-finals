let btn = document.querySelector('#btn')
let sidebar = document.querySelector('.sidebar')

btn.onclick = function (){
    sidebar.classList.toggle('active');
}
google.charts.load('current', {packages: ['corechart', 'bar']});
google.charts.setOnLoadCallback(drawBasic);

function drawBasic() {

  var data = new google.visualization.DataTable();
  data.addColumn('string', 'Month');
  data.addColumn('number', 'Sales');

  data.addRows([
    ['Jan', 150000],
    ['Feb', 252500],
    ['Mar', 100000],
    ['Apr', 234501],
    ['May', 0],
    ['June', 0],
    ['July', 0],
    ['Aug', 0],
    ['Sept', 0],
    ['Oct', 0],
    ['Nov', 0],
    ['Dec', 0]
  ]);

  var options = {
    title: 'Sales Revenue',
    hAxis: {
      title: 'Month'
    },
    vAxis: {
      title: 'Revenue(Pesos)'
    }
  };

  var chart = new google.visualization.ColumnChart(
    document.getElementById('chart_div'));

  chart.draw(data, options);
}  


