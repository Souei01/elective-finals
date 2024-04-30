const ctx = document.getElementById('myChart');
ctx.width = 250; 
ctx.height = 150;

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Instagram', 'Facebook', 'Twitter'],
      datasets: [{
        label: '# of Socials Followers',
        data: [1500, 4000, 500],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
