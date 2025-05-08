class ApiService {
    constructor() {
        this.baseUrl = API_BASE_URL;
        this.endpoints = API_ENDPOINTS;
    }

    async request(endpoint, options = {}) {
        const token = localStorage.getItem('token');
        const headers = {
            'Content-Type': 'application/json',
            ...(token && { 'x-auth-token': token })
        };

        try {
            const response = await fetch(this.baseUrl + endpoint, {
                ...options,
                headers
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('API request failed:', error);
            throw error;
        }
    }

    // Authentication
    async login(email, password) {
        return this.request(this.endpoints.auth.login, {
            method: 'POST',
            body: JSON.stringify({ email, password })
        });
    }

    // Appointments
    async getAppointments() {
        return this.request(this.endpoints.appointments.list);
    }

    async createAppointment(appointmentData) {
        return this.request(this.endpoints.appointments.create, {
            method: 'POST',
            body: JSON.stringify(appointmentData)
        });
    }

    // Services
    async getServices() {
        return this.request(this.endpoints.services.list);
    }

    // Products
    async getProducts() {
        return this.request(this.endpoints.products.list);
    }

    // Add these methods to your existing ApiService class

    async getDashboardStats() {
        return this.request('/stats/dashboard');
    }

    async addToCart(productId, quantity) {
        return this.request('/products/cart', {
            method: 'POST',
            body: JSON.stringify({ productId, quantity })
        });
    }

    async getServicesByCategory(category) {
        return this.request(`/services?category=${category}`);
    }

    async searchServices(query) {
        return this.request(`/services/search?q=${encodeURIComponent(query)}`);
    }

    async getAvailableTimeSlots(date, serviceId) {
        return this.request(`/appointments/available-slots?date=${date}&serviceId=${serviceId}`);
    }

    async updateProfile(userData) {
        return this.request('/auth/profile', {
            method: 'PUT',
            body: JSON.stringify(userData)
        });
    }
}

const api = new ApiService();