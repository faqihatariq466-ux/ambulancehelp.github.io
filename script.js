// Language Toggle Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Set up language selector
    const languageSelect = document.getElementById('languageSelect');
    if (languageSelect) {
        languageSelect.addEventListener('change', function() {
            const selectedLanguage = this.value;
            const body = document.body;
            
            if (selectedLanguage === 'ur') {
                body.classList.add('urdu');
                updateLanguage('ur');
            } else {
                body.classList.remove('urdu');
                updateLanguage('en');
            }
        });
    }

    // Function to update all text content based on selected language
    function updateLanguage(lang) {
        const elements = document.querySelectorAll('[data-en][data-ur]');
        elements.forEach(element => {
            element.textContent = element.getAttribute(`data-${lang}`);
        });
        
        // Update placeholders for form inputs
        const inputs = document.querySelectorAll('input[placeholder], textarea[placeholder]');
        inputs.forEach(input => {
            const placeholderEn = input.getAttribute('data-placeholder-en');
            const placeholderUr = input.getAttribute('data-placeholder-ur');
            if (placeholderEn && placeholderUr) {
                input.placeholder = lang === 'en' ? placeholderEn : placeholderUr;
            }
        });
        
        // Update select options
        const options = document.querySelectorAll('option[data-en][data-ur]');
        options.forEach(option => {
            option.textContent = option.getAttribute(`data-${lang}`);
        });
    }

    // Book Now Functionality - FIXED
    function setupBookNowButton() {
        const bookNowBtn = document.getElementById('bookNowBtn');
        if (bookNowBtn) {
            // Remove existing event listeners to prevent duplicates
            bookNowBtn.replaceWith(bookNowBtn.cloneNode(true));
            
            // Get fresh reference
            const freshBookNowBtn = document.getElementById('bookNowBtn');
            
            freshBookNowBtn.addEventListener('click', function(e) {
                e.preventDefault();
                
                const pickup = document.getElementById('pickup')?.value;
                const destination = document.getElementById('destination')?.value;
                const ambulanceType = document.getElementById('ambulanceType');
                const patientCondition = document.getElementById('patientCondition');
                const patientName = document.getElementById('patientName')?.value;
                const phoneNumber = document.getElementById('phoneNumber')?.value;
                const additionalInfo = document.getElementById('additionalInfo')?.value;
                
                // Validation
                if (!pickup || !destination || !ambulanceType?.value || !patientCondition?.value || !patientName || !phoneNumber) {
                    alert('Please fill in all required fields.');
                    return;
                }
                
                // Get selected option text
                const ambulanceTypeText = ambulanceType.options[ambulanceType.selectedIndex].text;
                const patientConditionText = patientCondition.options[patientCondition.selectedIndex].text;
                
                // Create WhatsApp message
                const message = `🚑 *Ambulance Booking Request* 🚑
                
*Patient Details:*
👤 Patient Name: ${patientName}
📞 Phone Number: ${phoneNumber}

*Transport Details:*
📍 Pickup Location: ${pickup}
🎯 Destination: ${destination}

*Medical Details:*
🏥 Ambulance Type: ${ambulanceTypeText}
💊 Patient Condition: ${patientConditionText}

*Additional Information:*
${additionalInfo || 'None provided'}

_This booking was made through Raheemi Ambulance Service website_`;
                
                // Encode message for WhatsApp URL
                const encodedMessage = encodeURIComponent(message);
                
                // Create WhatsApp URL
                const whatsappURL = `https://wa.me/923003686763?text=${encodedMessage}`;
                
                // Open WhatsApp in a new tab
                window.open(whatsappURL, '_blank');
                
                // Show confirmation modal if exists
                const confirmationModal = document.getElementById('bookingConfirmation');
                if (confirmationModal) {
                    confirmationModal.style.display = 'flex';
                }
                
                // Reset form
                const bookingForm = document.getElementById('bookingForm');
                if (bookingForm) {
                    bookingForm.reset();
                }
            });
        }
    }

    // Close confirmation modal
    const closeConfirmation = document.getElementById('closeConfirmation');
    if (closeConfirmation) {
        closeConfirmation.addEventListener('click', function() {
            const confirmationModal = document.getElementById('bookingConfirmation');
            if (confirmationModal) {
                confirmationModal.style.display = 'none';
            }
        });
    }

    // Mobile Menu Toggle
    const mobileMenu = document.querySelector('.mobile-menu');
    if (mobileMenu) {
        mobileMenu.addEventListener('click', function() {
            const nav = document.querySelector('nav ul');
            if (nav.style.display === 'flex') {
                nav.style.display = 'none';
            } else {
                nav.style.display = 'flex';
                nav.style.flexDirection = 'column';
                nav.style.position = 'absolute';
                nav.style.top = '70px';
                nav.style.right = '20px';
                nav.style.background = 'white';
                nav.style.padding = '20px';
                nav.style.borderRadius = '5px';
                nav.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
                nav.style.width = '200px';
                nav.style.zIndex = '1000';
            }
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Close mobile menu if open
                const nav = document.querySelector('nav ul');
                if (window.innerWidth <= 768 && nav.style.display === 'flex') {
                    nav.style.display = 'none';
                }
            }
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        const nav = document.querySelector('nav ul');
        const mobileMenu = document.querySelector('.mobile-menu');
        
        if (window.innerWidth <= 768 && 
            nav && 
            nav.style.display === 'flex' && 
            !nav.contains(e.target) && 
            mobileMenu && 
            !mobileMenu.contains(e.target)) {
            nav.style.display = 'none';
        }
    });

    // Initialize book now button after DOM is fully loaded
    setTimeout(() => {
        setupBookNowButton();
    }, 100);
});