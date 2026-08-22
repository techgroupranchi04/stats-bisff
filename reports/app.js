// BISFF Presentation Interactive Logic & Chart Engine
let currentSlide = 0;

// Chart Instances
let charts = {};

// Theme-aligned palette for charts (Freecomers Light Theme)
const chartColors = [
    '#b93b3b', '#2b7d5a', '#c28723', '#2d6fa8', '#178998',
    '#994071', '#d67533', '#685bbb', '#4a7c59', '#3b82a6',
    '#8c2525', '#716a62'
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
    return '#5c564e'; // Theme foreground-muted
}

function getThemeGridColor() {
    return 'rgba(220, 212, 200, 0.6)'; // Theme soft grid
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
                labels: ['General Delegate', 'Cinephile', 'Discovery Film (Industry)', 'Filmmaker', 'Student / Senior', 'Guest', 'Other'],
                datasets: [{
                    data: [1005, 716, 468, 279, 204, 77, 58],
                    backgroundColor: chartColors,
                    borderWidth: 0, // Removed border for a cleaner modern look
                    hoverOffset: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '60%',
                layout: {
                    padding: { top: 10, bottom: 10, left: 6, right: 6 }
                },
                plugins: {
                    legend: {
                        position: 'right',
                        labels: { color: textColor, font: { family: 'Outfit', size: 12.5 }, usePointStyle: true, padding: 14 }
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

    // Chart 3: Hourly Footfall Distribution Chart with Day-Wise Selector (Slide 8)
    const ctxPeakHours = document.getElementById('chartPeakHours')?.getContext('2d');
    const peakDaySelect = document.getElementById('peakDaySelect');
    const peakChartTitle = document.getElementById('peakChartTitle');
    const peakBreakdownTitle = document.getElementById('peakBreakdownTitle');
    const peakKpiLabel = document.getElementById('peakKpiLabel');
    const peakKpiValue = document.getElementById('peakKpiValue');
    const peakKpiSub = document.getElementById('peakKpiSub');
    const peakTableBody = document.getElementById('peakTableBody');
    const peakIntelText = document.getElementById('peakIntelText');

    const PEAK_HOURLY_DATA = {
        "all": {
            title: "Hourly Footfall Distribution (All Festival Days)",
            tableTitle: "Peak Hour Breakdown (Overall Festival)",
            kpiLabel: "⭐ Absolute Festival Peak Window",
            peakWindow: "12:00 PM – 01:00 PM",
            peakScans: 425,
            totalScans: 2460,
            runnerUp: "02:00 PM – 03:00 PM with 372 scans",
            hourly: [
                { time: "09:00 AM – 10:00 AM", scans: 125, tag: "Earliest Arrivals (~09:27 AM)" },
                { time: "10:00 AM – 11:00 AM", scans: 324, tag: "Morning Surge" },
                { time: "11:00 AM – 12:00 PM", scans: 365, tag: "Late Morning Rush" },
                { time: "12:00 PM – 01:00 PM", scans: 425, tag: "Peak Morning/Lunch", isPeak: true },
                { time: "01:00 PM – 02:00 PM", scans: 128, tag: "Lunch Break" },
                { time: "02:00 PM – 03:00 PM", scans: 372, tag: "Afternoon Peak", isSecondary: true },
                { time: "03:00 PM – 04:00 PM", scans: 264, tag: "Afternoon Session" },
                { time: "04:00 PM – 05:00 PM", scans: 175, tag: "Evening Transition" },
                { time: "05:00 PM – 06:00 PM", scans: 125, tag: "Late Afternoon" },
                { time: "06:00 PM – 07:00 PM", scans: 82, tag: "Evening Screenings" },
                { time: "07:00 PM – 08:00 PM", scans: 75, tag: "Closing Shows" }
            ],
            intel: "Check-in gates begin active arrivals at <strong>09:27 AM</strong> (no check-ins prior to 09:00 AM). Footfall surges to its primary peak at <strong>12:00 PM – 01:00 PM</strong> (425 scans), dips briefly during lunch, and rebounds for a strong secondary rush at <strong>02:00 PM – 03:00 PM</strong> (372 scans)."
        },
        "14-Aug-2026": {
            title: "Hourly Footfall Distribution — Friday, Aug 14",
            tableTitle: "Friday Peak Hour Breakdown",
            kpiLabel: "⭐ Friday Peak Window",
            peakWindow: "12:00 PM – 01:00 PM",
            peakScans: 110,
            totalScans: 634,
            runnerUp: "02:00 PM – 03:00 PM with 98 scans",
            hourly: [
                { time: "09:00 AM – 10:00 AM", scans: 35, tag: "Opening Morning Arrivals (~09:27 AM)" },
                { time: "10:00 AM – 11:00 AM", scans: 85, tag: "Morning Surge" },
                { time: "11:00 AM – 12:00 PM", scans: 96, tag: "Pre-Lunch Sessions" },
                { time: "12:00 PM – 01:00 PM", scans: 110, tag: "Friday Peak", isPeak: true },
                { time: "01:00 PM – 02:00 PM", scans: 34, tag: "Lunch Break" },
                { time: "02:00 PM – 03:00 PM", scans: 98, tag: "Afternoon Surge", isSecondary: true },
                { time: "03:00 PM – 04:00 PM", scans: 72, tag: "Mid-Afternoon" },
                { time: "04:00 PM – 05:00 PM", scans: 45, tag: "Late Afternoon" },
                { time: "05:00 PM – 06:00 PM", scans: 31, tag: "Evening Transition" },
                { time: "06:00 PM – 07:00 PM", scans: 18, tag: "Evening Screenings" },
                { time: "07:00 PM – 08:00 PM", scans: 10, tag: "Night Screenings" }
            ],
            intel: "Friday marked the festival opening with 634 total check-ins, starting at 09:27 AM and reaching a high of <strong>110 scans at 12:00 PM – 01:00 PM</strong> followed by a secondary peak of <strong>98 scans at 02:00 PM – 03:00 PM</strong>."
        },
        "15-Aug-2026": {
            title: "Hourly Footfall Distribution — Saturday, Aug 15 (Peak Day ⭐)",
            tableTitle: "Saturday Peak Hour Breakdown",
            kpiLabel: "⭐ Absolute Festival Peak Window (Saturday)",
            peakWindow: "12:00 PM – 01:00 PM",
            peakScans: 176,
            totalScans: 1014,
            runnerUp: "02:00 PM – 03:00 PM with 154 scans",
            hourly: [
                { time: "09:00 AM – 10:00 AM", scans: 52, tag: "Morning Arrivals" },
                { time: "10:00 AM – 11:00 AM", scans: 138, tag: "Heavy Rush" },
                { time: "11:00 AM – 12:00 PM", scans: 152, tag: "Pre-Lunch Sessions" },
                { time: "12:00 PM – 01:00 PM", scans: 176, tag: "Festival Peak Record", isPeak: true },
                { time: "01:00 PM – 02:00 PM", scans: 55, tag: "Lunch Break" },
                { time: "02:00 PM – 03:00 PM", scans: 154, tag: "Afternoon Surge", isSecondary: true },
                { time: "03:00 PM – 04:00 PM", scans: 112, tag: "Peak Afternoon" },
                { time: "04:00 PM – 05:00 PM", scans: 74, tag: "Evening Transition" },
                { time: "05:00 PM – 06:00 PM", scans: 52, tag: "Evening Screenings" },
                { time: "06:00 PM – 07:00 PM", scans: 36, tag: "Prime Time Shows" },
                { time: "07:00 PM – 08:00 PM", scans: 15, tag: "Closing Shows" }
            ],
            intel: "Saturday was the <strong>busiest festival day</strong> (1,014 scans logged), breaking records with <strong>176 scans between 12:00 PM – 01:00 PM</strong> and maintaining heavy traffic through late afternoon."
        },
        "16-Aug-2026": {
            title: "Hourly Footfall Distribution — Sunday, Aug 16",
            tableTitle: "Sunday Peak Hour Breakdown",
            kpiLabel: "⭐ Sunday Peak Window",
            peakWindow: "12:00 PM – 01:00 PM",
            peakScans: 139,
            totalScans: 812,
            runnerUp: "02:00 PM – 03:00 PM with 120 scans",
            hourly: [
                { time: "09:00 AM – 10:00 AM", scans: 38, tag: "Morning Arrivals" },
                { time: "10:00 AM – 11:00 AM", scans: 101, tag: "Morning Rush" },
                { time: "11:00 AM – 12:00 PM", scans: 117, tag: "Late Morning Rush" },
                { time: "12:00 PM – 01:00 PM", scans: 139, tag: "Sunday Peak", isPeak: true },
                { time: "01:00 PM – 02:00 PM", scans: 39, tag: "Lunch Break" },
                { time: "02:00 PM – 03:00 PM", scans: 120, tag: "Afternoon Surge", isSecondary: true },
                { time: "03:00 PM – 04:00 PM", scans: 80, tag: "Mid-Afternoon" },
                { time: "04:00 PM – 05:00 PM", scans: 56, tag: "Evening Transition" },
                { time: "05:00 PM – 06:00 PM", scans: 42, tag: "Evening Screenings" },
                { time: "06:00 PM – 07:00 PM", scans: 28, tag: "Closing Ceremony" },
                { time: "07:00 PM – 08:00 PM", scans: 50, tag: "Grand Finale Shows" }
            ],
            intel: "Sunday drew 812 scans with strong all-day attendance, peaking at <strong>139 scans during lunch</strong> and sustaining enthusiasm into the evening grand finale screenings."
        }
    };

    function renderPeakHours(dayKey) {
        const dataObj = PEAK_HOURLY_DATA[dayKey] || PEAK_HOURLY_DATA["all"];
        if (peakChartTitle) peakChartTitle.textContent = dataObj.title;
        if (peakBreakdownTitle) peakBreakdownTitle.textContent = dataObj.tableTitle;
        if (peakKpiLabel) peakKpiLabel.textContent = dataObj.kpiLabel;
        if (peakKpiValue) peakKpiValue.textContent = dataObj.peakWindow;
        if (peakKpiSub) peakKpiSub.innerHTML = `<strong style="color: var(--fc-brand); font-size: 14px;">${dataObj.peakScans.toLocaleString()} Scans Logged</strong> (${dataObj.totalScans.toLocaleString()} Day Total • Followed by ${dataObj.runnerUp})`;
        if (peakIntelText) peakIntelText.innerHTML = `<strong>Key Intelligence:</strong> ${dataObj.intel}`;

        // Update Table
        if (peakTableBody) {
            peakTableBody.innerHTML = dataObj.hourly.map(h => {
                const share = ((h.scans / dataObj.totalScans) * 100).toFixed(1);
                let badgeClass = "badge-neutral";
                let rowStyle = "";
                if (h.isPeak) {
                    badgeClass = "badge-brand";
                    rowStyle = "background: rgba(185, 59, 59, 0.08);";
                } else if (h.isSecondary) {
                    badgeClass = "badge-warning";
                } else if (h.scans > 100) {
                    badgeClass = "badge-success";
                }
                return `
                    <tr style="${rowStyle}">
                        <td><strong>${h.time}</strong></td>
                        <td><span class="badge ${badgeClass}">${h.scans.toLocaleString()} Scans</span></td>
                        <td>${share}%</td>
                        <td><strong>${h.tag}</strong></td>
                    </tr>
                `;
            }).join('');
        }

        // Update or create Chart
        const labels = dataObj.hourly.map(h => h.time.split(' – ')[0]);
        const scanValues = dataObj.hourly.map(h => h.scans);
        const maxVal = Math.max(...scanValues);

        if (charts.peakHours) {
            charts.peakHours.destroy();
        }

        if (ctxPeakHours) {
            charts.peakHours = new Chart(ctxPeakHours, {
                type: 'bar',
                data: {
                    labels,
                    datasets: [{
                        label: 'Check-in Scans',
                        data: scanValues,
                        backgroundColor: (ctx) => {
                            const val = ctx.raw;
                            if (val === maxVal) return '#b93b3b'; // Peak
                            if (val >= maxVal * 0.75) return '#c28723'; // High
                            if (val >= maxVal * 0.4) return '#2d6fa8'; // Moderate
                            return '#716a62'; // Lower
                        },
                        borderRadius: 6,
                        barPercentage: 0.8,
                        categoryPercentage: 0.85
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    layout: {
                        padding: { top: 8, right: 6, bottom: 18, left: 6 }
                    },
                    scales: {
                        x: {
                            ticks: { color: textColor, font: { size: 10.5 }, padding: 8 },
                            grid: { display: false }
                        },
                        y: {
                            ticks: { color: textColor, font: { size: 11 } },
                            grid: { color: gridColor, borderDash: [5, 5] },
                            beginAtZero: true
                        }
                    },
                    plugins: {
                        legend: { display: false },
                        tooltip: {
                            callbacks: {
                                title: items => dataObj.hourly[items[0].dataIndex].time,
                                label: item => ` Scans Logged: ${item.raw.toLocaleString()}`,
                                afterLabel: item => ` Share: ${((item.raw / dataObj.totalScans) * 100).toFixed(1)}% (${dataObj.hourly[item.dataIndex].tag})`
                            }
                        }
                    }
                }
            });
        }
    }

    if (peakDaySelect) {
        peakDaySelect.addEventListener('change', (e) => {
            renderPeakHours(e.target.value);
        });
    }

    renderPeakHours("all");

    // Chart 4: Category Turnout Rate Horizontal Bar
    const ctxTurnoutBar = document.getElementById('chartTurnoutBar')?.getContext('2d');
    if (ctxTurnoutBar) {
        charts.turnoutBar = new Chart(ctxTurnoutBar, {
            type: 'bar',
            data: {
                labels: [
                    'Guest', 'Pitcher', 'Buyer', 'Senior Citizen', 'Seller',
                    'General Delegate', 'Cinephile', 'Student', 'Filmmaker', 'Speaker'
                ],
                datasets: [{
                    label: 'Turnout Rate (%)',
                    data: [63.64, 42.09, 41.67, 39.29, 39.18, 39.10, 38.97, 35.71, 33.33, 26.32],
                    backgroundColor: (ctx) => {
                        const val = ctx.raw;
                        // Theme-aligned dynamic colors
                        if (val > 60) return '#2b7d5a'; // Theme success
                        if (val > 38) return '#c28723'; // Theme warning
                        return '#2d6fa8'; // Theme info
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
                        backgroundColor: '#b93b3b', // Theme brand red
                        borderRadius: 6,
                        barPercentage: 0.92,
                        categoryPercentage: 0.82,
                        maxBarThickness: 38
                    },
                    {
                        label: 'Unique Delegates',
                        data: [449, 315, 256, 210, 168, 99, 92, 79, 52, 31, 15, 1],
                        backgroundColor: '#c28723', // Theme warning sand
                        borderRadius: 6,
                        barPercentage: 0.92,
                        categoryPercentage: 0.82,
                        maxBarThickness: 38
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
                    backgroundColor: '#2b7d5a',
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
    const zeroCheckinContainer = document.getElementById('zeroCheckinContainer');

    if (ctxEventCheckins) {
        function renderEventChart() {
            const selectedDate = dateSelect ? dateSelect.value : "14-Aug-2026";
            const allRows = EVENT_CHECKIN_DATA.filter(row => row.date === selectedDate);
            allRows.sort((a, b) => a.scheduled.localeCompare(b.scheduled));

            // Separate active events from 0-checkin events
            const activeRows = allRows.filter(row => row.checkins > 0);
            const zeroRows = allRows.filter(row => row.checkins === 0);

            const dateText = dateSelect && dateSelect.selectedIndex >= 0 ? dateSelect.options[dateSelect.selectedIndex].text : selectedDate;
            const totalScans = activeRows.reduce((sum, r) => sum + r.checkins, 0);

            if (chartEventTitle) chartEventTitle.textContent = "Event-wise check-ins (time order)";
            if (chartEventNote) {
                chartEventNote.textContent = `${dateText} • ${activeRows.length} active sessions (${totalScans.toLocaleString()} Total Scans) • ${zeroRows.length} sessions with 0 check-ins`;
            }

            // Render Zero Check-ins section at the bottom (compact event names only)
            if (zeroCheckinContainer) {
                if (zeroRows.length === 0) {
                    zeroCheckinContainer.innerHTML = '';
                } else {
                    const itemsHtml = zeroRows.map(r => `
                        <span class="zero-checkin-tag">${r.event}</span>
                    `).join('');

                    zeroCheckinContainer.innerHTML = `
                        <div class="zero-checkins-section">
                            <span class="zero-checkins-label">0 Check-ins Events (${zeroRows.length}):</span>
                            <div class="zero-checkins-list">
                                ${itemsHtml}
                            </div>
                        </div>
                    `;
                }
            }

            if (charts.eventCheckins) {
                charts.eventCheckins.destroy();
            }

            const labels = activeRows.map(r => r.event);

            charts.eventCheckins = new Chart(ctxEventCheckins, {
                type: "bar",
                data: {
                    labels,
                    datasets: [{
                        label: "Check-ins",
                        data: activeRows.map(r => r.checkins),
                        borderRadius: 6,
                        borderSkipped: false,
                        backgroundColor: '#b93b3b',
                        hoverBackgroundColor: '#9c2828'
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
                                title: items => activeRows[items[0].dataIndex].event,
                                afterTitle: items => {
                                    const r = activeRows[items[0].dataIndex];
                                    return `${r.scheduled} • ${r.venue}`;
                                },
                                label: item => ` Check-ins: ${item.raw}`
                            }
                        }
                    },
                    scales: {
                        x: {
                            title: { display: true, text: "Active Events (morning → evening)", color: textColor },
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
    { "date": "14-Aug-2026", "event": "AI Films (Set 1)", "checkins": 55, "scheduled": "10:00 – 11:30", "venue": "Suchitra - Puravankara Audi" },
    { "date": "14-Aug-2026", "event": "Karnataka Competition (Set 1)", "checkins": 82, "scheduled": "12:00 – 13:30", "venue": "Suchitra - Puravankara Audi" },
    { "date": "14-Aug-2026", "event": "Masterclass / Talk", "checkins": 57, "scheduled": "14:30 – 16:00", "venue": "Suchitra - Puravankara Audi" },
    { "date": "14-Aug-2026", "event": "Karnataka Competition (Set 2)", "checkins": 53, "scheduled": "16:30 – 18:00", "venue": "Suchitra - Puravankara Audi" },
    { "date": "14-Aug-2026", "event": "Indian Competition (Set 1)", "checkins": 58, "scheduled": "19:00 – 20:30", "venue": "Suchitra - Puravankara Audi" },
    { "date": "15-Aug-2026", "event": "Indian Competition (Set 2)", "checkins": 82, "scheduled": "10:30 – 12:00", "venue": "Suchitra - Puravankara Audi" },
    { "date": "15-Aug-2026", "event": "Karnataka Competition (Set 3)", "checkins": 51, "scheduled": "12:00 – 13:30", "venue": "Suchitra - Puravankara Audi" },
    { "date": "15-Aug-2026", "event": "Indian Competition (Set 3)", "checkins": 96, "scheduled": "14:30 – 16:00", "venue": "Suchitra - Puravankara Audi" },
    { "date": "15-Aug-2026", "event": "Script to Screen (Goethe Institut / BISFF)", "checkins": 1, "scheduled": "17:00 – 18:30", "venue": "Suchitra - Puravankara Audi" },
    { "date": "15-Aug-2026", "event": "Karnataka Competition (Set 4)", "checkins": 0, "scheduled": "19:30 – 21:00", "venue": "Suchitra - Puravankara Audi" },
    { "date": "16-Aug-2026", "event": "Karnataka Competition (Set 5)", "checkins": 48, "scheduled": "10:00 – 11:30", "venue": "Suchitra - Puravankara Audi" },
    { "date": "16-Aug-2026", "event": "Indian Competition (Set 4)", "checkins": 79, "scheduled": "12:30 – 14:00", "venue": "Suchitra - Puravankara Audi" },
    { "date": "16-Aug-2026", "event": "Masterclass / Talk", "checkins": 68, "scheduled": "14:30 – 16:00", "venue": "Suchitra - Puravankara Audi" },
    { "date": "16-Aug-2026", "event": "Indian Competition (Set 5)", "checkins": 9, "scheduled": "15:30 – 17:00", "venue": "Suchitra - Puravankara Audi" },
    { "date": "14-Aug-2026", "event": "Asian Eye (Set 1)", "checkins": 44, "scheduled": "10:30 – 12:00", "venue": "Suchitra - Nani Angala" },
    { "date": "14-Aug-2026", "event": "Animation Competition (Set 3 - Indian)", "checkins": 52, "scheduled": "14:30 – 16:00", "venue": "Suchitra - Nani Angala" },
    { "date": "14-Aug-2026", "event": "Queer Qorner Competition (Set 2)", "checkins": 17, "scheduled": "18:30 – 20:00", "venue": "Suchitra - Nani Angala" },
    { "date": "14-Aug-2026", "event": "Women's Cinema Collective (Set 1)", "checkins": 13, "scheduled": "18:30 – 20:00", "venue": "Suchitra - Nani Angala" },
    { "date": "15-Aug-2026", "event": "Animation Competition (Set 4 - Indian)", "checkins": 58, "scheduled": "10:00 – 11:30", "venue": "Suchitra - Nani Angala" },
    { "date": "15-Aug-2026", "event": "Women's Cinema Collective (Set 3)", "checkins": 54, "scheduled": "12:30 – 14:00", "venue": "Suchitra - Nani Angala" },
    { "date": "15-Aug-2026", "event": "Animation Competition (Set 6 - Intl)", "checkins": 62, "scheduled": "14:30 – 16:00", "venue": "Suchitra - Nani Angala" },
    { "date": "15-Aug-2026", "event": "International Competition (Set 3)", "checkins": 39, "scheduled": "16:30 – 18:00", "venue": "Suchitra - Nani Angala" },
    { "date": "15-Aug-2026", "event": "Non Competition (Set 4)", "checkins": 27, "scheduled": "18:30 – 20:00", "venue": "Suchitra - Nani Angala" },
    { "date": "16-Aug-2026", "event": "Animation Competition (Set 2 - Indian)", "checkins": 24, "scheduled": "10:00 – 11:30", "venue": "Suchitra - Nani Angala" },
    { "date": "16-Aug-2026", "event": "Non Competition (Set 5)", "checkins": 39, "scheduled": "12:00 – 13:30", "venue": "Suchitra - Nani Angala" },
    { "date": "16-Aug-2026", "event": "International Competition (Set 1)", "checkins": 31, "scheduled": "14:00 – 15:30", "venue": "Suchitra - Nani Angala" },
    { "date": "16-Aug-2026", "event": "Non Competition (Set 6)", "checkins": 6, "scheduled": "15:30 – 17:00", "venue": "Suchitra - Nani Angala" },
    { "date": "14-Aug-2026", "event": "Let's Include (Set 4)", "checkins": 21, "scheduled": "10:30 – 12:00", "venue": "Knowledgeum / Jain Knowledgeum Academy" },
    { "date": "14-Aug-2026", "event": "Asian Eye (Set 2)", "checkins": 14, "scheduled": "12:30 – 14:00", "venue": "Knowledgeum / Jain Knowledgeum Academy" },
    { "date": "14-Aug-2026", "event": "AI Films (Set 2)", "checkins": 4, "scheduled": "14:00 – 15:30", "venue": "Knowledgeum / Jain Knowledgeum Academy" },
    { "date": "14-Aug-2026", "event": "Karnataka Competition (Set 5)", "checkins": 12, "scheduled": "14:30 – 16:00", "venue": "Knowledgeum / Jain Knowledgeum Academy" },
    { "date": "14-Aug-2026", "event": "Karnataka Competition (Set 3)", "checkins": 0, "scheduled": "19:00 – 20:30", "venue": "Knowledgeum / Jain Knowledgeum Academy" },
    { "date": "15-Aug-2026", "event": "Let's Include (Set 2)", "checkins": 17, "scheduled": "10:00 – 11:30", "venue": "Knowledgeum / Jain Knowledgeum Academy" },
    { "date": "15-Aug-2026", "event": "Asian Eye (Set 3)", "checkins": 14, "scheduled": "12:30 – 14:00", "venue": "Knowledgeum / Jain Knowledgeum Academy" },
    { "date": "15-Aug-2026", "event": "Let's Include (Set 1)", "checkins": 23, "scheduled": "14:30 – 16:00", "venue": "Knowledgeum / Jain Knowledgeum Academy" },
    { "date": "15-Aug-2026", "event": "Karnataka Competition (Set 1)", "checkins": 9, "scheduled": "16:30 – 18:00", "venue": "Knowledgeum / Jain Knowledgeum Academy" },
    { "date": "15-Aug-2026", "event": "AI Films (Set 3)", "checkins": 0, "scheduled": "18:30 – 20:00", "venue": "Knowledgeum / Jain Knowledgeum Academy" },
    { "date": "16-Aug-2026", "event": "Let's Include (Set 3)", "checkins": 29, "scheduled": "10:00 – 11:30", "venue": "Knowledgeum / Jain Knowledgeum Academy" },
    { "date": "16-Aug-2026", "event": "Karnataka Competition (Set 4)", "checkins": 30, "scheduled": "12:00 – 13:30", "venue": "Knowledgeum / Jain Knowledgeum Academy" },
    { "date": "16-Aug-2026", "event": "Asian Eye (Set 4)", "checkins": 14, "scheduled": "14:30 – 16:00", "venue": "Knowledgeum / Jain Knowledgeum Academy" },
    { "date": "16-Aug-2026", "event": "Karnataka Competition (Set 2)", "checkins": 0, "scheduled": "16:00 – 17:30", "venue": "Knowledgeum / Jain Knowledgeum Academy" },
    { "date": "14-Aug-2026", "event": "International Competition (Set 1)", "checkins": 0, "scheduled": "10:00 – 11:31", "venue": "Indian Heritage Academy" },
    { "date": "14-Aug-2026", "event": "FILM REVIEW WORKSHOP", "checkins": 0, "scheduled": "12:00 – 13:30", "venue": "Indian Heritage Academy" },
    { "date": "14-Aug-2026", "event": "Women's Cinema Collective (Set 1)", "checkins": 0, "scheduled": "14:00 – 15:37", "venue": "Indian Heritage Academy" },
    { "date": "14-Aug-2026", "event": "Indian Competition (Set 4)", "checkins": 5, "scheduled": "16:00 – 17:39", "venue": "Indian Heritage Academy" },
    { "date": "14-Aug-2026", "event": "Dancing Lens (Set 1)", "checkins": 2, "scheduled": "18:00 – 19:30", "venue": "Indian Heritage Academy" },
    { "date": "15-Aug-2026", "event": "Dancing Lens (Set 2)", "checkins": 3, "scheduled": "10:15 – 11:04", "venue": "Indian Heritage Academy" },
    { "date": "15-Aug-2026", "event": "International Competition (Set 3)", "checkins": 4, "scheduled": "11:30 – 13:23", "venue": "Indian Heritage Academy" },
    { "date": "15-Aug-2026", "event": "Indian Competition (Set 5)", "checkins": 8, "scheduled": "14:00 – 15:44", "venue": "Indian Heritage Academy" },
    { "date": "15-Aug-2026", "event": "Women's Cinema Collective (Set 3)", "checkins": 13, "scheduled": "16:15 – 18:10", "venue": "Indian Heritage Academy" },
    { "date": "15-Aug-2026", "event": "Animation Competition (Indian)", "checkins": 7, "scheduled": "18:30 – 20:00", "venue": "Indian Heritage Academy" },
    { "date": "16-Aug-2026", "event": "Asian Eye (Set 3)", "checkins": 41, "scheduled": "10:00 – 12:04", "venue": "Indian Heritage Academy" },
    { "date": "16-Aug-2026", "event": "Indian Competition (Set 6)", "checkins": 22, "scheduled": "12:30 – 14:10", "venue": "Indian Heritage Academy" },
    { "date": "16-Aug-2026", "event": "Women's Cinema Collective (Set 4)", "checkins": 0, "scheduled": "15:00 – 16:58", "venue": "Indian Heritage Academy" },
    { "date": "14-Aug-2026", "event": "RITWIK GHATAK RETROSPECTIVE & Talk", "checkins": 19, "scheduled": "18:00 – 19:30", "venue": "Bengaluru International Centre" },
    { "date": "15-Aug-2026", "event": "International Competition (Set 4)", "checkins": 21, "scheduled": "10:00 – 12:01", "venue": "Bengaluru International Centre" },
    { "date": "15-Aug-2026", "event": "Indian Competition (Set 3)", "checkins": 5, "scheduled": "12:30 – 14:08", "venue": "Bengaluru International Centre" },
    { "date": "15-Aug-2026", "event": "Asian Eye (Set 2)", "checkins": 5, "scheduled": "15:00 – 16:56", "venue": "Bengaluru International Centre" },
    { "date": "15-Aug-2026", "event": "Animation Competition (International)", "checkins": 5, "scheduled": "17:15 – 18:45", "venue": "Bengaluru International Centre" },
    { "date": "15-Aug-2026", "event": "Indian Competition (Set 2)", "checkins": 0, "scheduled": "18:30 – 20:18", "venue": "Bengaluru International Centre" },
    { "date": "16-Aug-2026", "event": "Indian Competition (Set 1)", "checkins": 31, "scheduled": "10:00 – 11:52", "venue": "Bengaluru International Centre" },
    { "date": "16-Aug-2026", "event": "Janato Cinema at BISFF 2026", "checkins": 10, "scheduled": "12:00 – 13:30", "venue": "Bengaluru International Centre" },
    { "date": "16-Aug-2026", "event": "Indian Competition (Set 7)", "checkins": 1, "scheduled": "15:00 – 16:45", "venue": "Bengaluru International Centre" },
    { "date": "14-Aug-2026", "event": "Dancing Lens (Set 2)", "checkins": 0, "scheduled": "10:30 – 12:00", "venue": "NMKRV - Shashwathy" },
    { "date": "14-Aug-2026", "event": "Queer Qorner Competition (Set 3)", "checkins": 0, "scheduled": "12:30 – 14:00", "venue": "NMKRV - Shashwathy" },
    { "date": "14-Aug-2026", "event": "Dancing Lens (Set 3)", "checkins": 0, "scheduled": "14:30 – 16:00", "venue": "NMKRV - Shashwathy" },
    { "date": "14-Aug-2026", "event": "Indian Competition (Set 3)", "checkins": 0, "scheduled": "16:00 – 17:30", "venue": "NMKRV - Shashwathy" },
    { "date": "14-Aug-2026", "event": "Animation Competition (Set 4 - Indian)", "checkins": 0, "scheduled": "18:30 – 20:00", "venue": "NMKRV - Shashwathy" },
    { "date": "15-Aug-2026", "event": "Women's Cinema Collective (Set 4)", "checkins": 20, "scheduled": "10:30 – 12:00", "venue": "NMKRV - Shashwathy" },
    { "date": "15-Aug-2026", "event": "Indian Competition (Set 5)", "checkins": 11, "scheduled": "12:30 – 14:00", "venue": "NMKRV - Shashwathy" },
    { "date": "15-Aug-2026", "event": "Non Competition (Set 3)", "checkins": 2, "scheduled": "14:30 – 16:00", "venue": "NMKRV - Shashwathy" },
    { "date": "15-Aug-2026", "event": "Asian Eye (Set 1)", "checkins": 5, "scheduled": "16:00 – 17:30", "venue": "NMKRV - Shashwathy" },
    { "date": "16-Aug-2026", "event": "Queer Qorner Competition (Set 2)", "checkins": 25, "scheduled": "10:00 – 11:30", "venue": "NMKRV - Shashwathy" },
    { "date": "16-Aug-2026", "event": "Women's Cinema Collective (Set 5)", "checkins": 13, "scheduled": "12:00 – 13:30", "venue": "NMKRV - Shashwathy" },
    { "date": "16-Aug-2026", "event": "Queer Qorner Competition (Set 4)", "checkins": 13, "scheduled": "14:00 – 15:30", "venue": "NMKRV - Shashwathy" },
    { "date": "16-Aug-2026", "event": "Queer Qorner Competition (Set 3)", "checkins": 4, "scheduled": "15:30 – 17:00", "venue": "NMKRV - Shashwathy" },
    { "date": "16-Aug-2026", "event": "Animation Competition (Set 6 - Intl)", "checkins": 0, "scheduled": "16:00 – 17:30", "venue": "NMKRV - Shashwathy" },
    { "date": "15-Aug-2026", "event": "Asian Eye (Set 1) *(Mangala Hall parallel track)*", "checkins": 31, "scheduled": "16:00 – 17:30", "venue": "NMKRV - Mangala" },
    { "date": "14-Aug-2026", "event": "Asian Eye (Set 1)", "checkins": 9, "scheduled": "10:00 – 11:54", "venue": "Alliance Francaise - Byrappa" },
    { "date": "14-Aug-2026", "event": "Queer Qorner Competition (Set 1)", "checkins": 7, "scheduled": "12:30 – 14:00", "venue": "Alliance Francaise - Byrappa" },
    { "date": "14-Aug-2026", "event": "International Competition (Set 2)", "checkins": 8, "scheduled": "14:30 – 16:03", "venue": "Alliance Francaise - Byrappa" },
    { "date": "14-Aug-2026", "event": "Women's Cinema Collective (Set 2)", "checkins": 5, "scheduled": "17:00 – 18:33", "venue": "Alliance Francaise - Byrappa" },
    { "date": "14-Aug-2026", "event": "Queer Qorner Competition (Set 2)", "checkins": 0, "scheduled": "19:00 – 20:30", "venue": "Alliance Francaise - Byrappa" },
    { "date": "15-Aug-2026", "event": "Queer Qorner Competition (Set 3)", "checkins": 1, "scheduled": "10:00 – 11:30", "venue": "Alliance Francaise - Byrappa" },
    { "date": "15-Aug-2026", "event": "Animation Competition (International)", "checkins": 1, "scheduled": "12:00 – 13:30", "venue": "Alliance Francaise - Byrappa" },
    { "date": "15-Aug-2026", "event": "AI-Film Showcase", "checkins": 3, "scheduled": "14:30 – 15:22", "venue": "Alliance Francaise - Byrappa" },
    { "date": "15-Aug-2026", "event": "French Package", "checkins": 6, "scheduled": "16:00 – 18:01", "venue": "Alliance Francaise - Byrappa" },
    { "date": "15-Aug-2026", "event": "Panel Discussion (Humanizing Margins)", "checkins": 4, "scheduled": "18:30 – 20:00", "venue": "Alliance Francaise - Byrappa" },
    { "date": "15-Aug-2026", "event": "Dancing Lens (Set 3)", "checkins": 1, "scheduled": "19:30 – 20:31", "venue": "Alliance Francaise - Byrappa" },
    { "date": "16-Aug-2026", "event": "Queer Qorner Competition (Set 4)", "checkins": 6, "scheduled": "10:00 – 11:38", "venue": "Alliance Francaise - Byrappa" },
    { "date": "16-Aug-2026", "event": "Women's Cinema Collective (Set 3)", "checkins": 0, "scheduled": "12:15 – 13:57", "venue": "Alliance Francaise - Byrappa" },
    { "date": "16-Aug-2026", "event": "Queer Qorner Competition (Set 5)", "checkins": 2, "scheduled": "15:00 – 17:12", "venue": "Alliance Francaise - Byrappa" },
    { "date": "16-Aug-2026", "event": "Animation Competition (International)", "checkins": 3, "scheduled": "10:00 – 11:30", "venue": "Goethe Institute" },
    { "date": "16-Aug-2026", "event": "Script to Screen 2.0 Films", "checkins": 9, "scheduled": "12:00 – 13:30", "venue": "Goethe Institute" },
    { "date": "16-Aug-2026", "event": "International Competition (Set 5)", "checkins": 3, "scheduled": "15:00 – 16:48", "venue": "Goethe Institute" },
    { "date": "14-Aug-2026", "event": "Let's Include (Set 1)", "checkins": 0, "scheduled": "10:30 – 12:00", "venue": "RVU" },
    { "date": "14-Aug-2026", "event": "Non Competition (Set 2)", "checkins": 0, "scheduled": "12:30 – 14:00", "venue": "RVU" },
    { "date": "14-Aug-2026", "event": "Asian Eye (Set 4)", "checkins": 0, "scheduled": "14:30 – 16:00", "venue": "RVU" },
    { "date": "14-Aug-2026", "event": "Let's Include (Set 2)", "checkins": 0, "scheduled": "14:30 – 16:00", "venue": "RVU" },
    { "date": "14-Aug-2026", "event": "Animation Competition (Set 2 - Indian)", "checkins": 0, "scheduled": "16:30 – 18:00", "venue": "RVU" },
    { "date": "15-Aug-2026", "event": "AI Films (Set 2)", "checkins": 0, "scheduled": "10:00 – 11:30", "venue": "RVU" },
    { "date": "15-Aug-2026", "event": "Let's Include (Set 3)", "checkins": 0, "scheduled": "12:00 – 13:30", "venue": "RVU" },
    { "date": "15-Aug-2026", "event": "AI Films (Set 1)", "checkins": 0, "scheduled": "14:00 – 15:30", "venue": "RVU" },
    { "date": "15-Aug-2026", "event": "Let's Include (Set 4)", "checkins": 0, "scheduled": "15:30 – 17:00", "venue": "RVU" },
    { "date": "15-Aug-2026", "event": "Animation Competition (Set 1 - Intl)", "checkins": 0, "scheduled": "17:30 – 19:00", "venue": "RVU" }
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