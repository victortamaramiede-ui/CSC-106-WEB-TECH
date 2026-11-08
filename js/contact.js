const contactForm = document.getElementById('contact-form');
const successMessage = document.getElementById('contact-success');

if (contactForm) {
  const fields = {
    name: document.getElementById('name'),
    email: document.getElementById('email'),
    phone: document.getElementById('phone'),
    message: document.getElementById('message'),
  };

  const errors = {
    name: document.getElementById('name-error'),
    email: document.getElementById('email-error'),
    phone: document.getElementById('phone-error'),
    message: document.getElementById('message-error'),
  };

  const validateForm = () => {
    const formData = new FormData(contactForm);
    const name = String(formData.get('name') || '').trim();
    const email = String(formData.get('email') || '').trim();
    const phone = String(formData.get('phone') || '').trim();
    const message = String(formData.get('message') || '').trim();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^\d+$/;
    let isValid = true;

    Object.keys(fields).forEach((key) => {
      const value = key === 'name' ? name : key === 'email' ? email : key === 'phone' ? phone : message;
      const input = fields[key];
      const error = errors[key];

      if (!value) {
        error.textContent = 'This field is required.';
        input.setAttribute('aria-invalid', 'true');
        isValid = false;
      } else {
        error.textContent = '';
        input.setAttribute('aria-invalid', 'false');
      }
    });

    if (email && !emailPattern.test(email)) {
      errors.email.textContent = 'Please enter a valid email address.';
      fields.email.setAttribute('aria-invalid', 'true');
      isValid = false;
    }

    if (phone && !phonePattern.test(phone)) {
      errors.phone.textContent = 'Phone number must contain only digits.';
      fields.phone.setAttribute('aria-invalid', 'true');
      isValid = false;
    }

    if (message && message.length < 10) {
      errors.message.textContent = 'Please include a message with at least 10 characters.';
      fields.message.setAttribute('aria-invalid', 'true');
      isValid = false;
    }

    return { isValid, name, email, phone, message };
  };

  contactForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const validation = validateForm();
    if (!validation.isValid) {
      if (successMessage) {
        successMessage.textContent = '';
      }
      return;
    }

    const submitButton = contactForm.querySelector('button[type="submit"]');
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = 'Sending...';
    }

    try {
      const response = await fetch(contactForm.action, {
        method: 'POST',
        body: new FormData(contactForm),
        headers: {
          Accept: 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Form submission failed');
      }

      if (successMessage) {
        successMessage.textContent = 'Thank you! Your message has been sent successfully.';
      }

      contactForm.reset();
      Object.keys(fields).forEach((key) => {
        fields[key].setAttribute('aria-invalid', 'false');
      });
    } catch (error) {
      if (successMessage) {
        successMessage.textContent = 'There was a problem sending your message. Please try again later.';
      }
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = 'Submit';
      }
    }
  });
}
