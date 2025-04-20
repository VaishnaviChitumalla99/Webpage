document.addEventListener('DOMContentLoaded', () => {
  let trips = JSON.parse(localStorage.getItem('trips') || '[]');

  // Dummy data if localStorage is empty
  if (trips.length === 0) {
    trips = [
      { destination: "Paris", country: "France", duration: "5 days", budget: "$1500" },
      { destination: "Tokyo", country: "Japan", duration: "7 days", budget: "$2000" },
      { destination: "New York", country: "USA", duration: "3 days", budget: "$1000" },
      { destination: "Rome", country: "Italy", duration: "4 days", budget: "$1200" },
      { destination: "Mumbai", country: "India", duration: "10 days", budget: "$2200" }
    ];
    localStorage.setItem('trips', JSON.stringify(trips));
  }

  const destinations = trips.map(t => t.destination);
  const countries = trips.map(t => t.country);
  const durations = trips.map(t => parseInt(t.duration.replace(/[^0-9]/g, '')) || 0);
  const budgets = trips.map(t => parseInt(t.budget.replace(/[^0-9]/g, '')) || 0);

  const ctx1 = document.getElementById('chart1')?.getContext('2d');
  const ctx2 = document.getElementById('chart2')?.getContext('2d');
  const ctx3 = document.getElementById('chart3')?.getContext('2d');
  const ctx4 = document.getElementById('chart4')?.getContext('2d');

  // Bar Chart - Budgets per Destination
  if (ctx1) {
    new Chart(ctx1, {
      type: 'bar',
      data: {
        labels: destinations,
        datasets: [{
          label: 'Trip Budget ($)',
          data: budgets,
          backgroundColor: 'rgba(33, 150, 243, 0.6)'
        }]
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: 'Trip Budgets by Destination',
            font: {
              size: 18
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Budget (USD)'
            }
          },
          x: {
            title: {
              display: true,
              text: 'Destination'
            }
          }
        }
      }
    });
  }

  // Line Chart - Durations per Country
  if (ctx2) {
    new Chart(ctx2, {
      type: 'line',
      data: {
        labels: countries,
        datasets: [{
          label: 'Trip Duration (days)',
          data: durations,
          fill: false,
          borderColor: 'rgba(255, 87, 34, 0.8)',
          tension: 0.3
        }]
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: 'Trip Durations by Country',
            font: {
              size: 18
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Duration (Days)'
            }
          },
          x: {
            title: {
              display: true,
              text: 'Country'
            }
          }
        }
      }
    });
  }

  // Pie Chart - Duration Distribution
  if (ctx3) {
    new Chart(ctx3, {
      type: 'pie',
      data: {
        labels: destinations,
        datasets: [{
          label: 'Trip Duration',
          data: durations,
          backgroundColor: ['#e91e63', '#00bcd4', '#ffc107', '#4caf50', '#ff9800']
        }]
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: 'Distribution of Trip Durations by Destination',
            font: {
              size: 18
            }
          }
        }
      }
    });
  }

  // Doughnut Chart - Budget Distribution
  if (ctx4) {
    new Chart(ctx4, {
      type: 'doughnut',
      data: {
        labels: destinations,
        datasets: [{
          label: 'Trip Budget ($)',
          data: budgets,
          backgroundColor: [
            '#f44336', '#9c27b0', '#3f51b5', '#009688', '#ff5722'
          ]
        }]
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: 'Budget Distribution Across Destinations',
            font: {
              size: 18
            }
          },
          legend: {
            position: 'right'
          }
        }
      }
    });
  }
});
