export async function onRequest(context) {
    const { request } = context;

    if (request.method !== 'POST') {
        return new Response('Method not allowed', { status: 405 });
    }

    try {
        const formData = await request.json();

        if (!formData.name || !formData.email || !formData.part_needed) {
            return new Response(JSON.stringify({
                success: false,
                error: 'Missing required fields'
            }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // Send email notification
        await sendEmailNotification(formData);

        return new Response(JSON.stringify({
            success: true,
            message: 'Quote request submitted successfully'
        }), {
            headers: { 'Content-Type': 'application/json' }
        });

    } catch (error) {
        console.error('Form submission error:', error);
        return new Response(JSON.stringify({
            success: false,
            error: 'Internal server error'
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}

async function sendEmailNotification(formData) {
    // Implement your email service here
    const emailData = {
        to: 'nick@superior7products.com',
        from: 'website@superior7products.com',
        subject: `New Quote Request: ${formData.part_needed}`,
        html: generateEmailTemplate(formData)
    };

    // Email service implementation would go here
}

function generateEmailTemplate(formData) {
    return `
        <h2>New Quote Request</h2>
        <p><strong>Name:</strong> ${formData.name}</p>
        <p><strong>Email:</strong> ${formData.email}</p>
        <p><strong>Phone:</strong> ${formData.phone || 'Not provided'}</p>
        <p><strong>Vehicle:</strong> ${formData.vehicle || 'Not specified'}</p>
        <p><strong>Part Needed:</strong> ${formData.part_needed}</p>
        <p><strong>Message:</strong> ${formData.message || 'No additional details'}</p>
        <hr>
        <p><em>Received from Superior 7 Products website</em></p>
    `;
}