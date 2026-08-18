// BISFF Presentation Interactive Logic & Chart Engine

const THEME_COLORS = {
    brand: {
        primary: "#e90000",
        primaryDark: "#951914",
    },
    neutral: {
        black: "#282828",
        white: "#fcfcfc",
    },
    light: {
        background: {
            default: "#f2ebe2",
            paper: "#fcfcfc",
            surface: "#f2ebe2",
        },
    },
    dark: {
        background: {
            default: "#191515",
            paper: "#1E1C1C",
            surface: "#010101",
        },
    },
};

let currentSlide = 0;
const totalSlides = 8;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const btnPrev = document.getElementById('btnPrev');
const btnNext = document.getElementById('btnNext');

// Chart Instances
let charts = {};

// Palette for charts
const chartColors = [
    '#e90000', '#951914', '#f97316', '#eab308', '#22c55e',
    '#06b6d4', '#3b82f6', '#6366f1', '#a855f7', '#ec4899',
    '#64748b', '#84cc16', '#14b8a6', '#d97706'
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
    return '#ffffff';
}

function getThemeGridColor() {
    return 'rgba(255,255,255,0.1)';
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
                    borderColor: THEME_COLORS.dark.background.paper,
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'right',
                        labels: { color: textColor, font: { family: 'Outfit', size: 12 } }
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
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'right',
                        labels: { color: textColor, font: { family: 'Outfit', size: 12 } }
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
                        backgroundColor: '#3b82f6',
                        borderRadius: 4
                    },
                    {
                        label: 'Saturday (Aug 15) - Peak Day ⭐',
                        data: [192, 185, 166, 74, 99, 75, 65, 56, 79, 22],
                        backgroundColor: THEME_COLORS.brand.primary,
                        borderRadius: 4
                    },
                    {
                        label: 'Sunday (Aug 16)',
                        data: [147, 157, 116, 128, 118, 103, 7, 24, 0, 0],
                        backgroundColor: '#22c55e',
                        borderRadius: 4
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: { ticks: { color: textColor, font: { size: 11 } }, grid: { color: gridColor } },
                    y: { ticks: { color: textColor }, grid: { color: gridColor } }
                },
                plugins: {
                    legend: {
                        position: 'top',
                        labels: { color: textColor, font: { family: 'Outfit', size: 11 } }
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
                        if (val > 60) return '#22c55e';
                        if (val > 38) return THEME_COLORS.brand.primary;
                        return '#eab308';
                    },
                    borderRadius: 6
                }]
            },
            options: {
                indexAxis: 'y',
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: { ticks: { color: textColor }, grid: { color: gridColor }, max: 100 },
                    y: { ticks: { color: textColor }, grid: { color: gridColor } }
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
                        backgroundColor: THEME_COLORS.brand.primary,
                        borderRadius: 6
                    },
                    {
                        label: 'Unique Delegates',
                        data: [449, 315, 256, 210, 168, 99, 92, 79, 52, 31, 15, 1],
                        backgroundColor: '#3b82f6',
                        borderRadius: 6
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: { ticks: { color: textColor, font: { size: 11 } }, grid: { color: gridColor } },
                    y: { ticks: { color: textColor }, grid: { color: gridColor } }
                },
                plugins: {
                    legend: {
                        position: 'top',
                        labels: { color: textColor, font: { family: 'Outfit', size: 12 } }
                    }
                }
            }
        });
    }
}

function updateChartThemes() {
    const textColor = '#ffffff';
    const gridColor = 'rgba(255,255,255,0.1)';

    Object.values(charts).forEach(chart => {
        if (chart.options.scales) {
            if (chart.options.scales.x) {
                chart.options.scales.x.ticks.color = textColor;
                chart.options.scales.x.grid.color = gridColor;
            }
            if (chart.options.scales.y) {
                chart.options.scales.y.ticks.color = textColor;
                chart.options.scales.y.grid.color = gridColor;
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
