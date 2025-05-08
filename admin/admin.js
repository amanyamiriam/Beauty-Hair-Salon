// Import Chart.js library
document.write('<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>');

// Initialize when document is ready
document.addEventListener('DOMContentLoaded', function() {
    // Revenue Chart
    const revenueChart = new Chart(
        document.querySelector('.revenue-chart .chart-container').getContext('2d'),
        {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                datasets: [{
                    label: 'Revenue',
                    data: [15000, 18000, 16000, 19000, 16000, 20000, 17000, 19000, 22000, 20000, 23000, 25000],
                    borderColor: '#6366f1',
                    tension: 0.4,
                    fill: true,
                    backgroundColor: 'rgba(99, 102, 241, 0.1)'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            borderDash: [2, 2]
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        }
    );

    // Age Distribution Chart
    const ageChart = new Chart(
        document.querySelector('.age-chart .chart-container').getContext('2d'),
        {
            type: 'doughnut',
            data: {
                labels: ['20-35', '36-45', '46-75'],
                datasets: [{
                    data: [45, 30, 25],
                    backgroundColor: ['#6366f1', '#f43f5e', '#10b981']
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        }
    );

    // Sidebar Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            sidebar.classList.toggle('collapsed');
        });
    }

    // Notifications Dropdown
    const notificationBtn = document.querySelector('.notifications');
    if (notificationBtn) {
        notificationBtn.addEventListener('click', function() {
            // Toggle notifications panel
            this.classList.toggle('active');
        });
    }

    // Sample Bookings Data
    const bookingsData = [
        {
            startTime: '10:00 AM',
            service: 'Hair Cut',
            endTime: '10:30 AM',
            client: 'Dennis',
            employee: 'Daniel',
            status: 'upcoming'
        },
        {
            startTime: '11:00 AM',
            service: 'Hair Styling',
            endTime: '12:00 PM',
            client: 'Bonnie',
            employee: 'Leslie',
            status: 'upcoming'
        }
    ];

    // Populate Bookings Table
    function populateBookingsTable(bookings) {
        const tbody = document.querySelector('.bookings-table tbody');
        if (!tbody) return;

        tbody.innerHTML = bookings.map(booking => `
            <tr>
                <td>${booking.startTime}</td>
                <td>${booking.service}</td>
                <td>${booking.endTime}</td>
                <td>${booking.client}</td>
                <td>${booking.employee}</td>
                <td>
                    <button class="action-btn edit">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="action-btn delete">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        `).join('');
    }

    // Initialize Bookings Table
    populateBookingsTable(bookingsData);

    // Tab Switching
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            // Here you would typically filter the bookings based on the selected tab
        });
    });

    // Search Functionality
    const searchInput = document.querySelector('.search-bar input');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const filteredBookings = bookingsData.filter(booking => 
                booking.client.toLowerCase().includes(searchTerm) ||
                booking.service.toLowerCase().includes(searchTerm)
            );
            populateBookingsTable(filteredBookings);
        });
    }

    // Year Selection for Revenue Chart
    const yearSelect = document.querySelector('.revenue-chart select');
    if (yearSelect) {
        yearSelect.addEventListener('change', (e) => {
            // Here you would typically fetch and update data for the selected year
            // For demo, we'll just randomize the data
            const newData = revenueChart.data.datasets[0].data.map(() => 
                Math.floor(Math.random() * 30000) + 10000
            );
            revenueChart.data.datasets[0].data = newData;
            revenueChart.update();
        });
    }
});

// Add this to your existing admin.js

// Fetch and display appointments
async function loadAppointments() {
    try {
        const appointments = await api.getAppointments();
        populateBookingsTable(appointments);
    } catch (error) {
        console.error('Failed to load appointments:', error);
    }
}

// Fetch and display statistics
async function loadDashboardStats() {
    try {
        const stats = await api.request('/stats/dashboard');
        updateDashboardStats(stats);
    } catch (error) {
        console.error('Failed to load dashboard stats:', error);
    }
}

// Update dashboard statistics
function updateDashboardStats(stats) {
    document.querySelector('.stat-card:nth-child(1) p').textContent = stats.totalClients;
    document.querySelector('.stat-card:nth-child(2) p').textContent = stats.totalServices;
    document.querySelector('.stat-card:nth-child(3) p').textContent = stats.activeEmployees;
    document.querySelector('.stat-card:nth-child(4) p').textContent = stats.appointments;
}

// Initialize dashboard data
document.addEventListener('DOMContentLoaded', () => {
    loadAppointments();
    loadDashboardStats();
});