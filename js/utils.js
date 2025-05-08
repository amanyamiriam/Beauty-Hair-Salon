const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
};

const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    }).format(new Date(date));
};

const handleApiError = (error) => {
    console.error('API Error:', error);
    const message = error.response?.data?.message || 'An error occurred';
    // You can implement your preferred notification system here
    alert(message);
};

const validateForm = (formData, rules) => {
    const errors = {};
    Object.keys(rules).forEach(field => {
        if (rules[field].required && !formData[field]) {
            errors[field] = `${field} is required`;
        }
    });
    return errors;
};