// Contact Form Handler
class ContactForm {
    constructor(formId) {
        this.form = document.getElementById(formId);
        this.messagesContainer = document.getElementById('form-messages');
        this.init();
    }

    init() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }

    async handleSubmit(e) {
        e.preventDefault();

        const formData = new FormData(this.form);
        const data = Object.fromEntries(formData);

        if (!this.validateForm(data)) {
            return;
        }

        this.showLoading();

        try {
            const response = await this.submitForm(data);

            if (response.success) {
                this.showSuccess('Thank you! Your quote request has been sent. We\'ll contact you within 24 hours.');
                this.form.reset();
                this.trackConversion('quote_request');
            } else {
                throw new Error('Submission failed');
            }
        } catch (error) {
            this.showError('Sorry, there was an error sending your message. Please try again or call us directly.');
            console.error('Form submission error:', error);
        }
    }

    validateForm(data) {
        if (!data.name || !data.email || !data.part_needed) {
            this.showError('Please fill in all required fields.');
            return false;
        }

        if (!this.isValidEmail(data.email)) {
            this.showError('Please enter a valid email address.');
            return false;
        }

        return true;
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    async submitForm(data) {
        // Replace with your actual form submission endpoint
        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        return await response.json();
    }

    showLoading() {
        const submitBtn = this.form.querySelector('button[type="submit"]');
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
    }

    resetSubmitButton() {
        const submitBtn = this.form.querySelector('button[type="submit"]');
        submitBtn.innerHTML = 'Request Quote';
        submitBtn.disabled = false;
    }

    showMessage(message, type) {
        this.messagesContainer.innerHTML = `<div class="${type}-message">${message}</div>`;
        this.messagesContainer.style.display = 'block';

        setTimeout(() => {
            this.messagesContainer.style.display = 'none';
        }, 5000);
    }

    showSuccess(message) {
        this.showMessage(message, 'success');
        this.resetSubmitButton();
    }

    showError(message) {
        this.showMessage(message, 'error');
        this.resetSubmitButton();
    }

    trackConversion(type) {
        if (typeof gtag !== 'undefined') {
            gtag('event', 'conversion', {
                'event_category': 'quote_request',
                'event_label': type
            });
        }
    }
}