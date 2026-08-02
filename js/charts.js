const Charts = {
    chart: null,

    initialize() {
        const canvas = document.getElementById("progressChart");
        if (!canvas) return;

        this.render();
    },

    render() {
        const event = EventManager.getCurrent();
        const swims = EventManager.getSwims(event);

        const ctx = document.getElementById("progressChart");
        if (!ctx) return;

        if (this.chart) {
            this.chart.destroy();
        }

        this.chart = new Chart(ctx, {
            type: "line",
            data: {
                labels: swims.map(s => s.date),
                datasets: [
                    {
                        label: event,
                        data: swims.map(s => s.time),
                        tension: 0.3,
                        pointRadius: 5
                    }
                ]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        reverse: true,
                        title: {
                            display: true,
                            text: "Time (seconds)"
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: "Date"
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: true
                    }
                }
            }
        });
    },

    refresh() {
        this.render();
    }
};
