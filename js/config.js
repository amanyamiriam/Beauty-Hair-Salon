const API_BASE_URL = 'http://localhost:5000/api';

const API_ENDPOINTS = {
    auth: {
        login: '/auth/login',
        register: '/auth/register'
    },
    appointments: {
        list: '/appointments',
        create: '/appointments',
        update: '/appointments'
    },
    services: {
        list: '/services',
        details: '/services'
    },
    products: {
        list: '/products',
        details: '/products'
    }
};