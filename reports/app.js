// BISFF Presentation Interactive Logic & Chart Engine
let currentSlide = 0;
const totalSlides = 6;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const btnPrev = document.getElementById('btnPrev');
const btnNext = document.getElementById('btnNext');

// Chart Instances
let charts = {};

// Beautifully toned-down (matte/pastel) palette for charts
const chartColors = [
    '#ff6b6b', '#d65a54', '#fb9c4e', '#fcd34d', '#4ade80',
    '#4fd1c5', '#60a5fa', '#818cf8', '#c084fc', '#f472b6',
    '#94a3b8', '#a3e635', '#2dd4bf', '#fbbf24'
];

function updateSlide(index) {
    if (index < 0) index = 0;
    if (index >= totalSlides) index = totalSlides - 1;

    currentSlide = index;

    slides.forEach((slide, i) => {
        if (i === currentSlide) {
            slide.classList.add('active');
        } else {
            slide.classList.remove('active');
        }
    });

    dots.forEach((dot, i) => {
        if (i === currentSlide) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });

    btnPrev.disabled = currentSlide === 0;
    btnNext.disabled = currentSlide === totalSlides - 1;
}

// Navigation Listeners
btnPrev.addEventListener('click', () => updateSlide(currentSlide - 1));
btnNext.addEventListener('click', () => updateSlide(currentSlide + 1));

dots.forEach((dot, i) => {
    dot.addEventListener('click', () => updateSlide(i));
});

// Keyboard Navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') {
        updateSlide(currentSlide + 1);
    } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        updateSlide(currentSlide - 1);
    }
});


function getThemeTextColor() {
    return '#e2e8f0'; // Slightly softer white/gray for text
}

function getThemeGridColor() {
    return 'rgba(255,255,255,0.05)'; // Toned down grid lines (was 0.1)
}

// Initialize Charts
function initCharts() {
    const textColor = getThemeTextColor();
    const gridColor = getThemeGridColor();

    // Chart 1: Audience Categories Donut
    const ctxAudience = document.getElementById('chartAudience')?.getContext('2d');
    if (ctxAudience) {
        charts.audience = new Chart(ctxAudience, {
            type: 'doughnut',
            data: {
                labels: ['General Delegate', 'Cinephile', 'Pitcher', 'Filmmaker', 'Student / Senior', 'Seller', 'Guest', 'Other'],
                datasets: [{
                    data: [1005, 716, 284, 279, 204, 83, 77, 189],
                    backgroundColor: chartColors,
                    borderWidth: 0, // Removed border for a cleaner modern look
                    hoverOffset: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '65%', // Thinner ring looks more elegant
                plugins: {
                    legend: {
                        position: 'right',
                        labels: { color: textColor, font: { family: 'Outfit', size: 12 }, usePointStyle: true, padding: 20 }
                    }
                }
            }
        });
    }

    // Chart 2: Venue Attendance Share Pie
    const ctxVenueShare = document.getElementById('chartVenueShare')?.getContext('2d');
    if (ctxVenueShare) {
        charts.venueShare = new Chart(ctxVenueShare, {
            type: 'pie',
            data: {
                labels: [
                    'Puravankara Audi', 'Nani Angala', 'LIT School', 'HNN Hall',
                    'Knowledgeum', 'Indian Heritage', 'BIC', 'NMKRV Shashwathy', 'Other'
                ],
                datasets: [{
                    data: [742, 454, 380, 304, 184, 105, 97, 95, 99],
                    backgroundColor: chartColors,
                    borderWidth: 0, // Removed border
                    hoverOffset: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'right',
                        labels: { color: textColor, font: { family: 'Outfit', size: 12 }, usePointStyle: true, padding: 20 }
                    }
                }
            }
        });
    }

    // Chart 3: Peak Hours Grouped Bar Chart by Day & Time Window
    const ctxPeakHours = document.getElementById('chartPeakHours')?.getContext('2d');
    if (ctxPeakHours) {
        charts.peakHours = new Chart(ctxPeakHours, {
            type: 'bar',
            data: {
                labels: ['06:00 AM', '09:00 AM', '04:00 PM', '07:00 AM', '05:00 AM', '08:00 AM', '11:00 AM', '10:00 AM', '12:00 PM', '01:00 PM'],
                datasets: [
                    {
                        label: 'Friday (Aug 14)',
                        data: [89, 90, 54, 70, 27, 59, 86, 41, 35, 80],
                        backgroundColor: '#60a5fa', // Toned down blue
                        borderRadius: 4
                    },
                    {
                        label: 'Saturday (Aug 15) - Peak Day ⭐',
                        data: [192, 185, 166, 74, 99, 75, 65, 56, 79, 22],
                        backgroundColor: '#fb9c4e', // Toned down orange
                        borderRadius: 4
                    },
                    {
                        label: 'Sunday (Aug 16)',
                        data: [147, 157, 116, 128, 118, 103, 7, 24, 0, 0],
                        backgroundColor: '#4ade80', // Toned down green
                        borderRadius: 4
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                layout: {
                    padding: {
                        top: 8,
                        right: 6,
                        bottom: 22,
                        left: 6
                    }
                },
                scales: {
                    x: {
                        ticks: { color: textColor, font: { size: 11 }, padding: 8 },
                        grid: { display: false }
                    }, // Hide vertical grid lines
                    y: { ticks: { color: textColor }, grid: { color: gridColor, borderDash: [5, 5] } } // Dashed horizontal lines
                },
                plugins: {
                    legend: {
                        position: 'top',
                        labels: { color: textColor, font: { family: 'Outfit', size: 12 }, usePointStyle: true, padding: 15 }
                    }
                }
            }
        });
    }

    // Chart 4: Category Turnout Rate Horizontal Bar
    const ctxTurnoutBar = document.getElementById('chartTurnoutBar')?.getContext('2d');
    if (ctxTurnoutBar) {
        charts.turnoutBar = new Chart(ctxTurnoutBar, {
            type: 'bar',
            data: {
                labels: [
                    'Organizer', 'Guest', 'Pitcher', 'Discovery Film', 'Buyer',
                    'Senior Citizen', 'General Delegate', 'Cinephile', 'Seller', 'Student', 'Filmmaker', 'Speaker'
                ],
                datasets: [{
                    label: 'Turnout Rate (%)',
                    data: [93.75, 63.64, 40.85, 40.00, 39.39, 39.29, 39.10, 38.97, 36.14, 35.71, 33.33, 17.65],
                    backgroundColor: (ctx) => {
                        const val = ctx.raw;
                        // Toned down dynamic colors
                        if (val > 60) return '#4ade80'; // Soft green
                        if (val > 38) return '#fcd34d'; // Soft yellow
                        return '#60a5fa'; // Soft blue
                    },
                    borderRadius: 6,
                    barPercentage: 0.72,
                    categoryPercentage: 0.82,
                    maxBarThickness: 20
                }]
            },
            options: {
                indexAxis: 'y',
                responsive: true,
                maintainAspectRatio: false,
                layout: {
                    padding: {
                        top: 8,
                        right: 6,
                        bottom: 20,
                        left: 6
                    }
                },
                scales: {
                    x: {
                        ticks: { color: textColor, padding: 8 },
                        grid: { color: gridColor, borderDash: [5, 5] },
                        max: 100
                    },
                    y: { ticks: { color: textColor, autoSkip: false, font: { size: 12 } }, grid: { display: false } } // Hide horizontal grid lines
                },
                plugins: {
                    legend: { display: false }
                }
            }
        });
    }

    // Chart 5: Venue Comparison Grouped Bar Chart
    const ctxVenueComparison = document.getElementById('chartVenueComparison')?.getContext('2d');
    if (ctxVenueComparison) {
        charts.venueComparison = new Chart(ctxVenueComparison, {
            type: 'bar',
            data: {
                labels: [
                    'Puravankara', 'Nani Angala', 'LIT School', 'HNN Hall', 'Knowledgeum',
                    'Indian Heritage', 'BIC', 'NMKRV Shashwathy', 'Alliance Francaise', 'NMKRV Mangala', 'Goethe', 'RVU'
                ],
                datasets: [
                    {
                        label: 'Gross Scans Logged',
                        data: [742, 454, 380, 304, 184, 105, 97, 95, 52, 31, 15, 1],
                        backgroundColor: '#ff6b6b', // Toned down red
                        borderRadius: 6,
                        barPercentage: 0.74,
                        categoryPercentage: 0.86,
                        maxBarThickness: 18
                    },
                    {
                        label: 'Unique Delegates',
                        data: [449, 315, 256, 210, 168, 99, 92, 79, 52, 31, 15, 1],
                        backgroundColor: '#faeb60', // Toned down blue
                        borderRadius: 6,
                        barPercentage: 0.74,
                        categoryPercentage: 0.86,
                        maxBarThickness: 18
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                layout: {
                    padding: {
                        top: 10,
                        bottom: 24,
                        right: 6,
                        left: 6
                    }
                },
                scales: {
                    x: {
                        ticks: {
                            color: textColor,
                            font: { size: 10 },
                            autoSkip: false,
                            padding: 8,
                            maxRotation: 35,
                            minRotation: 35
                        },
                        grid: { display: false }
                    },
                    y: {
                        ticks: { color: textColor, font: { size: 11 } },
                        grid: { color: gridColor, borderDash: [5, 5] }
                    }
                },
                plugins: {
                    legend: {
                        position: 'top',
                        labels: { color: textColor, font: { family: 'Outfit', size: 12 }, usePointStyle: true, padding: 15 }
                    }
                }
            }
        });
    }
}

function updateChartThemes() {
    const textColor = getThemeTextColor();
    const gridColor = getThemeGridColor();

    Object.values(charts).forEach(chart => {
        if (chart.options.scales) {
            if (chart.options.scales.x) {
                chart.options.scales.x.ticks.color = textColor;
                if (chart.options.scales.x.grid.display !== false) {
                    chart.options.scales.x.grid.color = gridColor;
                }
            }
            if (chart.options.scales.y) {
                chart.options.scales.y.ticks.color = textColor;
                if (chart.options.scales.y.grid.display !== false) {
                    chart.options.scales.y.grid.color = gridColor;
                }
            }
        }
        if (chart.options.plugins && chart.options.plugins.legend) {
            chart.options.plugins.legend.labels.color = textColor;
        }
        chart.update();
    });
}

// Initialize on page load
window.addEventListener('DOMContentLoaded', () => {
    updateSlide(0);
    initCharts();
});