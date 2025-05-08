class EmailNotificationService {
    constructor() {
        this.emailTemplates = {
            orderConfirmation: {
                subject: 'Order Confirmation - Beauty Hair Salon',
                template: 'order-confirmation.html'
            },
            shipmentUpdate: {
                subject: 'Your Order Has Been Shipped',
                template: 'shipment-update.html'
            },
            orderDelivered: {
                subject: 'Order Delivered',
                template: 'order-delivered.html'
            }
        };
    }

    async sendOrderConfirmation(order) {
        try {
            await this.sendEmail({
                to: order.customerEmail,
                templateName: 'orderConfirmation',
                data: {
                    orderNumber: order.id,
                    items: order.items,
                    total: order.total,
                    shippingAddress: order.shippingAddress
                }
            });
        } catch (error) {
            console.error('Failed to send order confirmation:', error);
            throw error;
        }
    }

    async sendEmail({ to, templateName, data }) {
        // Implementation will depend on your email service provider
        // Example using a generic email service
        try {
            const template = await this.loadTemplate(this.emailTemplates[templateName].template);
            const content = this.populateTemplate(template, data);
            
            // Send email using your preferred email service
            // This is a placeholder for the actual implementation
            console.log(`Sending email to ${to} with template ${templateName}`);
        } catch (error) {
            console.error('Email sending failed:', error);
            throw error;
        }
    }
}