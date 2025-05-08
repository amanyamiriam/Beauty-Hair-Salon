class PaymentProcessor {
    constructor() {
        this.stripe = Stripe('your_publishable_key');
        this.elements = this.stripe.elements();
    }

    async initializePayment(amount) {
        try {
            const response = await fetch('/api/create-payment-intent', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ amount })
            });
            
            const { clientSecret } = await response.json();
            return clientSecret;
        } catch (error) {
            console.error('Payment initialization failed:', error);
            throw error;
        }
    }

    async processPayment(paymentMethod, clientSecret) {
        try {
            const result = await this.stripe.confirmCardPayment(clientSecret, {
                payment_method: paymentMethod
            });

            if (result.error) {
                throw new Error(result.error.message);
            }
            return result.paymentIntent;
        } catch (error) {
            console.error('Payment processing failed:', error);
            throw error;
        }
    }
}