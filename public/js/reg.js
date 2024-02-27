
    // Get form elements
    const nameInput = document.querySelector('input[name="name"]');
    const emailInput = document.querySelector('input[name="email"]');
    const phoneInput = document.querySelector('input[name="phone"]');
    const techStackInput = document.querySelector('input[name="techStack"]');
    const submitButton = document.querySelector('input[type="submit"]');

    // Function to validate email
    function validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    // Function to check if all inputs are valid
    function validateInputs() {
        if (nameInput.value && validateEmail(emailInput.value) && phoneInput.value && techStackInput.value) {
            submitButton.disabled = false;
        } else {
            submitButton.disabled = true;
        }
    }

    // Add event listeners to form inputs
    nameInput.addEventListener('input', validateInputs);
    emailInput.addEventListener('input', validateInputs);
    phoneInput.addEventListener('input', validateInputs);
    techStackInput.addEventListener('input', validateInputs);

    // Initial validation
    validateInputs();