document.addEventListener('DOMContentLoaded', function () {
    const ctx = document.getElementById('liveChart').getContext('2d');
    const initialData = {
        labels: [],
        datasets: [{
            label: 'Live Data',
            data: [],
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 2,
            tension: 0.1
        }]
    };

    const chartOptions = {
        scales: {
            x: {
                type: 'realtime',
                realtime: {
                    duration: 20000,
                    refresh: 1000,
                    delay: 2000,
                    pause: false,
                    ttl: undefined,
                    onRefresh: updateData
                },
                title: {
                    display: true,
                    text: 'Time'
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Value'
                }
            }
        }
    };

    const chart = new Chart(ctx, {
        type: 'line',
        data: initialData,
        options: chartOptions
    });

    function getRandomValue() {
        return Math.floor(Math.random() * 100);
    }

    function updateData(chart) {
        const now = new Date();

        chart.data.labels.push(now);
        chart.data.datasets[0].data.push(getRandomValue());

        chart.update('none');
    }
});
