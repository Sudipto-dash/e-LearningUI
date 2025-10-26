// Toggle side nav on mobile
document.querySelector('.side-nav').addEventListener('click', () => {
  document.querySelector('.side-nav').style.left = '0';
});

// Chart.js for Completion Rates (Admin Dashboard)
const completionCtx = document.getElementById('completionChart')?.getContext('2d');
if (completionCtx) {
  new Chart(completionCtx, {
    type: 'bar',
    data: {
      labels: ['AML', 'Compliance Basics', 'Fraud Prevention'],
      datasets: [{
        label: 'Completion Rates',
        data: [80, 95, 70],
        backgroundColor: '#00cc00',
        borderColor: '#00cc00',
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: { beginAtZero: true, max: 100 }
      }
    }
  });
}