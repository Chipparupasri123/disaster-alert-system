let zoneChartInstance = null;
let engagementChartInstance = null;

document.addEventListener("DOMContentLoaded", () => {
    loadZoneRisk();
    loadEngagement();
});

// ================== ZONE RISK (BAR CHART) ==================
function loadZoneRisk() {
    fetch("http://localhost:8080/api/reports/zone-risk")
        .then(res => res.json())
        .then(data => {
            console.log("Zone Risk Data:", data);

            if (!Array.isArray(data)) {
                console.error("Zone Risk API did not return array:", data);
                return;
            }

            const labels = data.map(item => item.zone.trim());
            const values = data.map(item => item.count);

            drawZoneChart(labels, values);
        })
        .catch(err => console.error("Zone risk error:", err));
}

function drawZoneChart(labels, values) {
    const ctx = document.getElementById("zoneChart").getContext("2d");

    if (zoneChartInstance) {
        zoneChartInstance.destroy();
    }

    zoneChartInstance = new Chart(ctx, {
        type: "bar",
        data: {
            labels: labels,
            datasets: [{
                label: "Disasters per Zone",
                data: values,
                backgroundColor: "#3498db",
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            interaction: {
                mode: 'nearest',
                intersect: false
            },
            hover: {
                mode: 'nearest',
                intersect: false
            },
            plugins: {
                tooltip: {
                    enabled: true,
                     titleFont: { size: 16, color: "#ffffff" },  // tooltip title color
                     bodyFont: { size: 14, color: "#ffffff" } 
                },
                legend: {
                    display: true,
                    position: 'top',
                    labels: {
                        font: { size: 16 },
                        color: "#ffffff",     // Legend text color (Acknowledged/Pending),   // Legend text color (Disasters per Zone)
                        boxWidth: 25,
                        padding: 15
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: { font: { size: 14 }, color: "#ffffff" }  // Y-axis tick color
                },
                x: {
                    ticks: { font: { size: 14 }, color: "#ffffff" }  // X-axis tick color
                }
            }
        }
    });
}

// ================== ALERT ENGAGEMENT (PIE CHART) ==================
function loadEngagement() {
    fetch("http://localhost:8080/api/reports/engagement")
        .then(res => res.json())
        .then(data => {
            console.log("Engagement Data:", data);

            if (typeof data !== "object") {
                console.error("Engagement API invalid:", data);
                return;
            }

            drawEngagementChart(Number(data.acknowledged), Number(data.pending));
        })
        .catch(err => console.error("Engagement error:", err));
}

function drawEngagementChart(ack, pending) {
    const canvas = document.getElementById("engagementChart");
    const ctx = canvas.getContext("2d");

    if (engagementChartInstance) {
        engagementChartInstance.destroy();
    }

    engagementChartInstance = new Chart(ctx, {
        type: "pie",
        data: {
            labels: ["Acknowledged", "Pending"],
            datasets: [{
                data: [ack, pending],
                backgroundColor: ["#2ecc71", "#f1c40f"], // green, yellow
                borderColor: "#ffffff",
                borderWidth: 2,
                hoverOffset: 35  // ensures tooltip triggers properly on hover
            }]
        },
        options: {
            responsive: true,
            interaction: {
                mode: 'nearest',
                intersect: true
            },
            plugins: {
                tooltip: {
                    enabled: true,
                    titleFont: { size: 16, color: "#ffffff" },  // tooltip title color
                    bodyFont: { size: 14, color: "#ffffff" },   // tooltip body color
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.parsed || 0;
                            return `${label}: ${value}`;
                        }
                    }
                },
                legend: {
                    position: 'top',
                    align: 'end',
                    labels: {
                        font: { size: 16 },
                        color: "#ffffff",     // Legend text color (Acknowledged/Pending)
                        boxWidth: 25,
                        padding: 15
                    }
                }
            }
        }
    });
}