// script.js

document.addEventListener('DOMContentLoaded', function() {
    var ctx = document.getElementById('myDonutChart').getContext('2d');
    var myChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['New', 'Returning'],
        datasets: [{
          label: 'Customer Ratio',
          data: [68, 32], // Replace with your actual data
          backgroundColor: [
            '#4caf50',
            '#2196f3'
          ],
          borderColor: [
            '#ffffff',
            '#ffffff'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '70%',
        legend: {
          position: 'bottom',
        },
        title: {
          display: true,
          text: 'Customer Ratio'
        },
        animation: {
          animateScale: true,
          animateRotate: true
        }
      }
    });
  });
  