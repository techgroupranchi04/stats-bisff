// BISFF Presentation Interactive Logic & Chart Engine
let currentSlide = 0;

// Chart Instances
let charts = {};

// Theme-aligned palette for charts
const chartColors = [
    '#e86a6a', '#72dc96', '#e8c050', '#7eb8f5', '#6ed4e4',
    '#f09890', '#fbbf24', '#c084fc', '#4ade80', '#2dd4bf',
    '#a3e635', '#f472b6', '#94a3b8', '#a8a39c'
];

function updateSlide(index) {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const totalSlides = slides.length;
    const btnPrev = document.getElementById('btnPrev');
    const btnNext = document.getElementById('btnNext');

    if (totalSlides === 0) return;

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

    if (btnPrev) btnPrev.disabled = currentSlide === 0;
    if (btnNext) btnNext.disabled = currentSlide === totalSlides - 1;
}

function initNavigation() {
    const btnPrev = document.getElementById('btnPrev');
    const btnNext = document.getElementById('btnNext');
    const dots = document.querySelectorAll('.dot');

    if (btnPrev) {
        btnPrev.onclick = () => updateSlide(currentSlide - 1);
    }
    if (btnNext) {
        btnNext.onclick = () => updateSlide(currentSlide + 1);
    }

    dots.forEach((dot, i) => {
        dot.onclick = () => updateSlide(i);
    });
}

// Keyboard Navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') {
        updateSlide(currentSlide + 1);
    } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        updateSlide(currentSlide - 1);
    }
});


function getThemeTextColor() {
    return '#d8d4cc'; // Theme foreground-muted
}

function getThemeGridColor() {
    return 'rgba(58, 54, 50, 0.4)'; // Theme border
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
                        backgroundColor: '#7eb8f5', // Theme info blue
                        borderRadius: 4
                    },
                    {
                        label: 'Saturday (Aug 15) - Peak Day ⭐',
                        data: [192, 185, 166, 74, 99, 75, 65, 56, 79, 22],
                        backgroundColor: '#e86a6a', // Theme brand
                        borderRadius: 4
                    },
                    {
                        label: 'Sunday (Aug 16)',
                        data: [147, 157, 116, 128, 118, 103, 7, 24, 0, 0],
                        backgroundColor: '#72dc96', // Theme success green
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
                        // Theme-aligned dynamic colors
                        if (val > 60) return '#72dc96'; // Theme success
                        if (val > 38) return '#e8c050'; // Theme warning
                        return '#7eb8f5'; // Theme info
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
                        backgroundColor: '#e86a6a', // Theme brand
                        borderRadius: 6,
                        barPercentage: 0.74,
                        categoryPercentage: 0.86,
                        maxBarThickness: 18
                    },
                    {
                        label: 'Unique Delegates',
                        data: [449, 315, 256, 210, 168, 99, 92, 79, 52, 31, 15, 1],
                        backgroundColor: '#e8c050', // Theme warning
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

    // Chart 6: Verification Query Breakdown Chart
    const ctxVerification = document.getElementById('chartVerification')?.getContext('2d');
    if (ctxVerification) {
        charts.verification = new Chart(ctxVerification, {
            type: 'bar',
            data: {
                labels: [
                    'NMKRV', 'SUCHITRA Audi', 'Knowledgeum', 'Alliance Fr.',
                    'Nani Angala', 'Indian Heritage', 'RVU', 'BIC', 'Goethe'
                ],
                datasets: [{
                    label: 'Event Count',
                    data: [15, 14, 14, 14, 13, 13, 10, 9, 3],
                    backgroundColor: '#72dc96',
                    borderRadius: 6,
                    barPercentage: 0.7,
                    categoryPercentage: 0.8
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: { ticks: { color: textColor, font: { size: 10 } }, grid: { display: false } },
                    y: { ticks: { color: textColor, font: { size: 11 } }, grid: { color: gridColor, borderDash: [5, 5] }, beginAtZero: true }
                },
                plugins: {
                    legend: { display: false }
                }
            }
        });
    }

    // Chart 7: Event-wise Check-ins Chart (Slide 8)
    const ctxEventCheckins = document.getElementById('chartEventCheckins')?.getContext('2d');
    const dateSelect = document.getElementById('dateSelect');
    const chartEventTitle = document.getElementById('chartEventTitle');
    const chartEventNote = document.getElementById('chartEventNote');

    if (ctxEventCheckins) {
        function renderEventChart() {
            const selectedDate = dateSelect ? dateSelect.value : "14-Aug-2026";
            const rows = EVENT_CHECKIN_DATA.filter(row => row.date === selectedDate);
            rows.sort((a, b) => a.scheduled.localeCompare(b.scheduled));

            const dateText = dateSelect && dateSelect.selectedIndex >= 0 ? dateSelect.options[dateSelect.selectedIndex].text : selectedDate;
            const totalScans = rows.reduce((sum, r) => sum + r.checkins, 0);

            if (chartEventTitle) chartEventTitle.textContent = "Event-wise check-ins (time order)";
            if (chartEventNote) chartEventNote.textContent = `${dateText} • ${rows.length} event slot${rows.length === 1 ? "" : "s"} • ${totalScans.toLocaleString()} Total Scans`;

            if (charts.eventCheckins) {
                charts.eventCheckins.destroy();
            }

            const labels = rows.map(r => r.event);

            charts.eventCheckins = new Chart(ctxEventCheckins, {
                type: "bar",
                data: {
                    labels,
                    datasets: [{
                        label: "Check-ins",
                        data: rows.map(r => r.checkins),
                        borderRadius: 6,
                        borderSkipped: false,
                        backgroundColor: '#e86a6a',
                        hoverBackgroundColor: '#ffd4d4'
                    }]
                },
                options: {
                    indexAxis: "x",
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { display: false },
                        tooltip: {
                            callbacks: {
                                title: items => rows[items[0].dataIndex].event,
                                afterTitle: items => {
                                    const r = rows[items[0].dataIndex];
                                    return `${r.scheduled} • ${r.venue}`;
                                },
                                label: item => ` Check-ins: ${item.raw}`
                            }
                        }
                    },
                    scales: {
                        x: {
                            title: { display: true, text: "Events (morning → evening)", color: textColor },
                            ticks: {
                                autoSkip: false,
                                maxRotation: 90,
                                minRotation: 45,
                                font: { size: 10 },
                                color: textColor
                            },
                            grid: { display: false }
                        },
                        y: {
                            beginAtZero: true,
                            title: { display: true, text: "Check-ins", color: textColor },
                            ticks: { precision: 0, color: textColor },
                            grid: { color: gridColor, borderDash: [5, 5] }
                        }
                    }
                }
            });
        }

        if (dateSelect) {
            dateSelect.addEventListener("change", renderEventChart);
        }
        renderEventChart();
    }
}

const EVENT_CHECKIN_DATA = [
  {"date":"14-Aug-2026","event":"AI Films (Set 1)","checkins":55,"scheduled":"10:00 – 11:30","venue":"Suchitra - Puravankara Audi"},
  {"date":"14-Aug-2026","event":"Karnataka Competition (Set 1)","checkins":82,"scheduled":"12:00 – 13:30","venue":"Suchitra - Puravankara Audi"},
  {"date":"14-Aug-2026","event":"Masterclass / Talk","checkins":57,"scheduled":"14:30 – 16:00","venue":"Suchitra - Puravankara Audi"},
  {"date":"14-Aug-2026","event":"Karnataka Competition (Set 2)","checkins":53,"scheduled":"16:30 – 18:00","venue":"Suchitra - Puravankara Audi"},
  {"date":"14-Aug-2026","event":"Indian Competition (Set 1)","checkins":58,"scheduled":"19:00 – 20:30","venue":"Suchitra - Puravankara Audi"},
  {"date":"15-Aug-2026","event":"Indian Competition (Set 2)","checkins":82,"scheduled":"10:30 – 12:00","venue":"Suchitra - Puravankara Audi"},
  {"date":"15-Aug-2026","event":"Karnataka Competition (Set 3)","checkins":51,"scheduled":"12:00 – 13:30","venue":"Suchitra - Puravankara Audi"},
  {"date":"15-Aug-2026","event":"Indian Competition (Set 3)","checkins":96,"scheduled":"14:30 – 16:00","venue":"Suchitra - Puravankara Audi"},
  {"date":"15-Aug-2026","event":"Script to Screen (Goethe Institut / BISFF)","checkins":1,"scheduled":"17:00 – 18:30","venue":"Suchitra - Puravankara Audi"},
  {"date":"15-Aug-2026","event":"Karnataka Competition (Set 4)","checkins":0,"scheduled":"19:30 – 21:00","venue":"Suchitra - Puravankara Audi"},
  {"date":"16-Aug-2026","event":"Karnataka Competition (Set 5)","checkins":48,"scheduled":"10:00 – 11:30","venue":"Suchitra - Puravankara Audi"},
  {"date":"16-Aug-2026","event":"Indian Competition (Set 4)","checkins":79,"scheduled":"12:30 – 14:00","venue":"Suchitra - Puravankara Audi"},
  {"date":"16-Aug-2026","event":"Masterclass / Talk","checkins":68,"scheduled":"14:30 – 16:00","venue":"Suchitra - Puravankara Audi"},
  {"date":"16-Aug-2026","event":"Indian Competition (Set 5)","checkins":9,"scheduled":"15:30 – 17:00","venue":"Suchitra - Puravankara Audi"},
  {"date":"14-Aug-2026","event":"Asian Eye (Set 1)","checkins":44,"scheduled":"10:30 – 12:00","venue":"Suchitra - Nani Angala"},
  {"date":"14-Aug-2026","event":"Animation Competition (Set 3 - Indian)","checkins":52,"scheduled":"14:30 – 16:00","venue":"Suchitra - Nani Angala"},
  {"date":"14-Aug-2026","event":"Queer Qorner Competition (Set 2)","checkins":17,"scheduled":"18:30 – 20:00","venue":"Suchitra - Nani Angala"},
  {"date":"14-Aug-2026","event":"Women's Cinema Collective (Set 1)","checkins":13,"scheduled":"18:30 – 20:00","venue":"Suchitra - Nani Angala"},
  {"date":"15-Aug-2026","event":"Animation Competition (Set 4 - Indian)","checkins":58,"scheduled":"10:00 – 11:30","venue":"Suchitra - Nani Angala"},
  {"date":"15-Aug-2026","event":"Women's Cinema Collective (Set 3)","checkins":54,"scheduled":"12:30 – 14:00","venue":"Suchitra - Nani Angala"},
  {"date":"15-Aug-2026","event":"Animation Competition (Set 6 - Intl)","checkins":62,"scheduled":"14:30 – 16:00","venue":"Suchitra - Nani Angala"},
  {"date":"15-Aug-2026","event":"International Competition (Set 3)","checkins":39,"scheduled":"16:30 – 18:00","venue":"Suchitra - Nani Angala"},
  {"date":"15-Aug-2026","event":"Non Competition (Set 4)","checkins":27,"scheduled":"18:30 – 20:00","venue":"Suchitra - Nani Angala"},
  {"date":"16-Aug-2026","event":"Animation Competition (Set 2 - Indian)","checkins":24,"scheduled":"10:00 – 11:30","venue":"Suchitra - Nani Angala"},
  {"date":"16-Aug-2026","event":"Non Competition (Set 5)","checkins":39,"scheduled":"12:00 – 13:30","venue":"Suchitra - Nani Angala"},
  {"date":"16-Aug-2026","event":"International Competition (Set 1)","checkins":31,"scheduled":"14:00 – 15:30","venue":"Suchitra - Nani Angala"},
  {"date":"16-Aug-2026","event":"Non Competition (Set 6)","checkins":6,"scheduled":"15:30 – 17:00","venue":"Suchitra - Nani Angala"},
  {"date":"14-Aug-2026","event":"Let's Include (Set 4)","checkins":21,"scheduled":"10:30 – 12:00","venue":"Knowledgeum / Jain Knowledgeum Academy"},
  {"date":"14-Aug-2026","event":"Asian Eye (Set 2)","checkins":14,"scheduled":"12:30 – 14:00","venue":"Knowledgeum / Jain Knowledgeum Academy"},
  {"date":"14-Aug-2026","event":"AI Films (Set 2)","checkins":4,"scheduled":"14:00 – 15:30","venue":"Knowledgeum / Jain Knowledgeum Academy"},
  {"date":"14-Aug-2026","event":"Karnataka Competition (Set 5)","checkins":12,"scheduled":"14:30 – 16:00","venue":"Knowledgeum / Jain Knowledgeum Academy"},
  {"date":"14-Aug-2026","event":"Karnataka Competition (Set 3)","checkins":0,"scheduled":"19:00 – 20:30","venue":"Knowledgeum / Jain Knowledgeum Academy"},
  {"date":"15-Aug-2026","event":"Let's Include (Set 2)","checkins":17,"scheduled":"10:00 – 11:30","venue":"Knowledgeum / Jain Knowledgeum Academy"},
  {"date":"15-Aug-2026","event":"Asian Eye (Set 3)","checkins":14,"scheduled":"12:30 – 14:00","venue":"Knowledgeum / Jain Knowledgeum Academy"},
  {"date":"15-Aug-2026","event":"Let's Include (Set 1)","checkins":23,"scheduled":"14:30 – 16:00","venue":"Knowledgeum / Jain Knowledgeum Academy"},
  {"date":"15-Aug-2026","event":"Karnataka Competition (Set 1)","checkins":9,"scheduled":"16:30 – 18:00","venue":"Knowledgeum / Jain Knowledgeum Academy"},
  {"date":"15-Aug-2026","event":"AI Films (Set 3)","checkins":0,"scheduled":"18:30 – 20:00","venue":"Knowledgeum / Jain Knowledgeum Academy"},
  {"date":"16-Aug-2026","event":"Let's Include (Set 3)","checkins":29,"scheduled":"10:00 – 11:30","venue":"Knowledgeum / Jain Knowledgeum Academy"},
  {"date":"16-Aug-2026","event":"Karnataka Competition (Set 4)","checkins":30,"scheduled":"12:00 – 13:30","venue":"Knowledgeum / Jain Knowledgeum Academy"},
  {"date":"16-Aug-2026","event":"Asian Eye (Set 4)","checkins":14,"scheduled":"14:30 – 16:00","venue":"Knowledgeum / Jain Knowledgeum Academy"},
  {"date":"16-Aug-2026","event":"Karnataka Competition (Set 2)","checkins":0,"scheduled":"16:00 – 17:30","venue":"Knowledgeum / Jain Knowledgeum Academy"},
  {"date":"14-Aug-2026","event":"International Competition (Set 1)","checkins":0,"scheduled":"10:00 – 11:31","venue":"Indian Heritage Academy"},
  {"date":"14-Aug-2026","event":"FILM REVIEW WORKSHOP","checkins":0,"scheduled":"12:00 – 13:30","venue":"Indian Heritage Academy"},
  {"date":"14-Aug-2026","event":"Women's Cinema Collective (Set 1)","checkins":0,"scheduled":"14:00 – 15:37","venue":"Indian Heritage Academy"},
  {"date":"14-Aug-2026","event":"Indian Competition (Set 4)","checkins":5,"scheduled":"16:00 – 17:39","venue":"Indian Heritage Academy"},
  {"date":"14-Aug-2026","event":"Dancing Lens (Set 1)","checkins":2,"scheduled":"18:00 – 19:30","venue":"Indian Heritage Academy"},
  {"date":"15-Aug-2026","event":"Dancing Lens (Set 2)","checkins":3,"scheduled":"10:15 – 11:04","venue":"Indian Heritage Academy"},
  {"date":"15-Aug-2026","event":"International Competition (Set 3)","checkins":4,"scheduled":"11:30 – 13:23","venue":"Indian Heritage Academy"},
  {"date":"15-Aug-2026","event":"Indian Competition (Set 5)","checkins":8,"scheduled":"14:00 – 15:44","venue":"Indian Heritage Academy"},
  {"date":"15-Aug-2026","event":"Women's Cinema Collective (Set 3)","checkins":13,"scheduled":"16:15 – 18:10","venue":"Indian Heritage Academy"},
  {"date":"15-Aug-2026","event":"Animation Competition (Indian)","checkins":7,"scheduled":"18:30 – 20:00","venue":"Indian Heritage Academy"},
  {"date":"16-Aug-2026","event":"Asian Eye (Set 3)","checkins":41,"scheduled":"10:00 – 12:04","venue":"Indian Heritage Academy"},
  {"date":"16-Aug-2026","event":"Indian Competition (Set 6)","checkins":22,"scheduled":"12:30 – 14:10","venue":"Indian Heritage Academy"},
  {"date":"16-Aug-2026","event":"Women's Cinema Collective (Set 4)","checkins":0,"scheduled":"15:00 – 16:58","venue":"Indian Heritage Academy"},
  {"date":"14-Aug-2026","event":"RITWIK GHATAK RETROSPECTIVE & Talk","checkins":19,"scheduled":"18:00 – 19:30","venue":"Bengaluru International Centre"},
  {"date":"15-Aug-2026","event":"International Competition (Set 4)","checkins":21,"scheduled":"10:00 – 12:01","venue":"Bengaluru International Centre"},
  {"date":"15-Aug-2026","event":"Indian Competition (Set 3)","checkins":5,"scheduled":"12:30 – 14:08","venue":"Bengaluru International Centre"},
  {"date":"15-Aug-2026","event":"Asian Eye (Set 2)","checkins":5,"scheduled":"15:00 – 16:56","venue":"Bengaluru International Centre"},
  {"date":"15-Aug-2026","event":"Animation Competition (International)","checkins":5,"scheduled":"17:15 – 18:45","venue":"Bengaluru International Centre"},
  {"date":"15-Aug-2026","event":"Indian Competition (Set 2)","checkins":0,"scheduled":"18:30 – 20:18","venue":"Bengaluru International Centre"},
  {"date":"16-Aug-2026","event":"Indian Competition (Set 1)","checkins":31,"scheduled":"10:00 – 11:52","venue":"Bengaluru International Centre"},
  {"date":"16-Aug-2026","event":"Janato Cinema at BISFF 2026","checkins":10,"scheduled":"12:00 – 13:30","venue":"Bengaluru International Centre"},
  {"date":"16-Aug-2026","event":"Indian Competition (Set 7)","checkins":1,"scheduled":"15:00 – 16:45","venue":"Bengaluru International Centre"},
  {"date":"14-Aug-2026","event":"Dancing Lens (Set 2)","checkins":0,"scheduled":"10:30 – 12:00","venue":"NMKRV - Shashwathy"},
  {"date":"14-Aug-2026","event":"Queer Qorner Competition (Set 3)","checkins":0,"scheduled":"12:30 – 14:00","venue":"NMKRV - Shashwathy"},
  {"date":"14-Aug-2026","event":"Dancing Lens (Set 3)","checkins":0,"scheduled":"14:30 – 16:00","venue":"NMKRV - Shashwathy"},
  {"date":"14-Aug-2026","event":"Indian Competition (Set 3)","checkins":0,"scheduled":"16:00 – 17:30","venue":"NMKRV - Shashwathy"},
  {"date":"14-Aug-2026","event":"Animation Competition (Set 4 - Indian)","checkins":0,"scheduled":"18:30 – 20:00","venue":"NMKRV - Shashwathy"},
  {"date":"15-Aug-2026","event":"Women's Cinema Collective (Set 4)","checkins":20,"scheduled":"10:30 – 12:00","venue":"NMKRV - Shashwathy"},
  {"date":"15-Aug-2026","event":"Indian Competition (Set 5)","checkins":11,"scheduled":"12:30 – 14:00","venue":"NMKRV - Shashwathy"},
  {"date":"15-Aug-2026","event":"Non Competition (Set 3)","checkins":2,"scheduled":"14:30 – 16:00","venue":"NMKRV - Shashwathy"},
  {"date":"15-Aug-2026","event":"Asian Eye (Set 1)","checkins":5,"scheduled":"16:00 – 17:30","venue":"NMKRV - Shashwathy"},
  {"date":"16-Aug-2026","event":"Queer Qorner Competition (Set 2)","checkins":25,"scheduled":"10:00 – 11:30","venue":"NMKRV - Shashwathy"},
  {"date":"16-Aug-2026","event":"Women's Cinema Collective (Set 5)","checkins":13,"scheduled":"12:00 – 13:30","venue":"NMKRV - Shashwathy"},
  {"date":"16-Aug-2026","event":"Queer Qorner Competition (Set 4)","checkins":13,"scheduled":"14:00 – 15:30","venue":"NMKRV - Shashwathy"},
  {"date":"16-Aug-2026","event":"Queer Qorner Competition (Set 3)","checkins":4,"scheduled":"15:30 – 17:00","venue":"NMKRV - Shashwathy"},
  {"date":"16-Aug-2026","event":"Animation Competition (Set 6 - Intl)","checkins":0,"scheduled":"16:00 – 17:30","venue":"NMKRV - Shashwathy"},
  {"date":"15-Aug-2026","event":"Asian Eye (Set 1) *(Mangala Hall parallel track)*","checkins":31,"scheduled":"16:00 – 17:30","venue":"NMKRV - Mangala"},
  {"date":"14-Aug-2026","event":"Asian Eye (Set 1)","checkins":9,"scheduled":"10:00 – 11:54","venue":"Alliance Francaise - Byrappa"},
  {"date":"14-Aug-2026","event":"Queer Qorner Competition (Set 1)","checkins":7,"scheduled":"12:30 – 14:00","venue":"Alliance Francaise - Byrappa"},
  {"date":"14-Aug-2026","event":"International Competition (Set 2)","checkins":8,"scheduled":"14:30 – 16:03","venue":"Alliance Francaise - Byrappa"},
  {"date":"14-Aug-2026","event":"Women's Cinema Collective (Set 2)","checkins":5,"scheduled":"17:00 – 18:33","venue":"Alliance Francaise - Byrappa"},
  {"date":"14-Aug-2026","event":"Queer Qorner Competition (Set 2)","checkins":0,"scheduled":"19:00 – 20:30","venue":"Alliance Francaise - Byrappa"},
  {"date":"15-Aug-2026","event":"Queer Qorner Competition (Set 3)","checkins":1,"scheduled":"10:00 – 11:30","venue":"Alliance Francaise - Byrappa"},
  {"date":"15-Aug-2026","event":"Animation Competition (International)","checkins":1,"scheduled":"12:00 – 13:30","venue":"Alliance Francaise - Byrappa"},
  {"date":"15-Aug-2026","event":"AI-Film Showcase","checkins":3,"scheduled":"14:30 – 15:22","venue":"Alliance Francaise - Byrappa"},
  {"date":"15-Aug-2026","event":"French Package","checkins":6,"scheduled":"16:00 – 18:01","venue":"Alliance Francaise - Byrappa"},
  {"date":"15-Aug-2026","event":"Panel Discussion (Humanizing Margins)","checkins":4,"scheduled":"18:30 – 20:00","venue":"Alliance Francaise - Byrappa"},
  {"date":"15-Aug-2026","event":"Dancing Lens (Set 3)","checkins":1,"scheduled":"19:30 – 20:31","venue":"Alliance Francaise - Byrappa"},
  {"date":"16-Aug-2026","event":"Queer Qorner Competition (Set 4)","checkins":6,"scheduled":"10:00 – 11:38","venue":"Alliance Francaise - Byrappa"},
  {"date":"16-Aug-2026","event":"Women's Cinema Collective (Set 3)","checkins":0,"scheduled":"12:15 – 13:57","venue":"Alliance Francaise - Byrappa"},
  {"date":"16-Aug-2026","event":"Queer Qorner Competition (Set 5)","checkins":2,"scheduled":"15:00 – 17:12","venue":"Alliance Francaise - Byrappa"},
  {"date":"16-Aug-2026","event":"Animation Competition (International)","checkins":3,"scheduled":"10:00 – 11:30","venue":"Goethe Institute"},
  {"date":"16-Aug-2026","event":"Script to Screen 2.0 Films","checkins":9,"scheduled":"12:00 – 13:30","venue":"Goethe Institute"},
  {"date":"16-Aug-2026","event":"International Competition (Set 5)","checkins":3,"scheduled":"15:00 – 16:48","venue":"Goethe Institute"},
  {"date":"14-Aug-2026","event":"Let's Include (Set 1)","checkins":0,"scheduled":"10:30 – 12:00","venue":"RVU"},
  {"date":"14-Aug-2026","event":"Non Competition (Set 2)","checkins":0,"scheduled":"12:30 – 14:00","venue":"RVU"},
  {"date":"14-Aug-2026","event":"Asian Eye (Set 4)","checkins":0,"scheduled":"14:30 – 16:00","venue":"RVU"},
  {"date":"14-Aug-2026","event":"Let's Include (Set 2)","checkins":0,"scheduled":"14:30 – 16:00","venue":"RVU"},
  {"date":"14-Aug-2026","event":"Animation Competition (Set 2 - Indian)","checkins":0,"scheduled":"16:30 – 18:00","venue":"RVU"},
  {"date":"15-Aug-2026","event":"AI Films (Set 2)","checkins":0,"scheduled":"10:00 – 11:30","venue":"RVU"},
  {"date":"15-Aug-2026","event":"Let's Include (Set 3)","checkins":0,"scheduled":"12:00 – 13:30","venue":"RVU"},
  {"date":"15-Aug-2026","event":"AI Films (Set 1)","checkins":0,"scheduled":"14:00 – 15:30","venue":"RVU"},
  {"date":"15-Aug-2026","event":"Let's Include (Set 4)","checkins":0,"scheduled":"15:30 – 17:00","venue":"RVU"},
  {"date":"15-Aug-2026","event":"Animation Competition (Set 1 - Intl)","checkins":0,"scheduled":"17:30 – 19:00","venue":"RVU"}
];


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
    initNavigation();
    updateSlide(0);
    initCharts();
});