document.addEventListener('DOMContentLoaded', async () => {
    const bookingForm = document.getElementById('booking-form');
    
    // Load services
    try {
        const services = await api.getServices();
        const serviceSelect = document.getElementById('service-select');
        services.forEach(service => {
            const option = document.createElement('option');
            option.value = service._id;
            option.textContent = service.name;
            serviceSelect.appendChild(option);
        });
    } catch (error) {
        console.error('Failed to load services:', error);
    }

    // Handle form submission
    bookingForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = {
            serviceId: document.getElementById('service-select').value,
            date: document.getElementById('appointment-date').value,
            time: document.getElementById('appointment-time').value,
            notes: document.getElementById('appointment-notes').value
        };

        try {
            const response = await api.createAppointment(formData);
            alert('Appointment booked successfully!');
            bookingForm.reset();
        } catch (error) {
            alert('Failed to book appointment. Please try again.');
        }
    });
});