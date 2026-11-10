/**
 * SCARIAX (Febin Scaria) — Portfolio Interactive Logic
 * Minimalist, high performance, zero external framework dependencies
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Current Year in Footer
  const yearEl = document.getElementById('currentYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // 2. Ambient Cursor Glow on Desktop
  const ambientGlow = document.getElementById('ambientGlow');
  if (ambientGlow && window.matchMedia('(pointer: fine)').matches) {
    window.addEventListener('mousemove', (e) => {
      ambientGlow.style.left = `${e.clientX}px`;
      ambientGlow.style.top = `${e.clientY}px`;
    });
  }

  // 3. Navbar Sticky Effect on Scroll
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // 4. Mobile Menu Toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      mobileToggle.classList.toggle('active');
    });

    // Close menu when clicking any nav link
    document.querySelectorAll('.nav-link').forEach((link) => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileToggle.classList.remove('active');
      });
    });
  }

  // 5. CV Download Dropdown Toggle
  const cvDropdownBtn = document.getElementById('cvDropdownBtn');
  const dropdownParent = cvDropdownBtn ? cvDropdownBtn.closest('.dropdown') : null;

  if (cvDropdownBtn && dropdownParent) {
    cvDropdownBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      dropdownParent.classList.toggle('open');
    });

    // Close dropdown on outside click
    document.addEventListener('click', (e) => {
      if (!dropdownParent.contains(e.target)) {
        dropdownParent.classList.remove('open');
      }
    });
  }

  // 6. ScrollSpy for Active Nav Link
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const highlightNavOnScroll = () => {
    const scrollY = window.pageYOffset;

    sections.forEach((current) => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };
  window.addEventListener('scroll', highlightNavOnScroll);

  // 7. Copy Email to Clipboard with Toast
  const copyEmailBtn = document.getElementById('copyEmailBtn');
  const copyEmailText = document.getElementById('copyEmailText');
  const toastNotification = document.getElementById('toastNotification');
  const toastMessage = document.getElementById('toastMessage');

  const showToast = (message) => {
    if (!toastNotification) return;
    toastMessage.textContent = message;
    toastNotification.classList.add('show');
    setTimeout(() => {
      toastNotification.classList.remove('show');
    }, 3200);
  };

  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      const email = 'febinscaria02@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        if (copyEmailText) copyEmailText.textContent = 'Copied!';
        showToast('Email address copied to clipboard!');
        setTimeout(() => {
          if (copyEmailText) copyEmailText.textContent = 'Copy';
        }, 2500);
      }).catch(() => {
        showToast('Could not auto-copy, please select manually.');
      });
    });
  }

  // 8. Open Default Mail Client Button in Contact Form
  const clientMailBtn = document.getElementById('clientMailBtn');
  if (clientMailBtn) {
    clientMailBtn.addEventListener('click', () => {
      dispatchMailto();
    });
  }

  // 9. Live Visitor Counter
  initVisitorCounter();
});

// Helper: Dispatch Mail Client
function dispatchMailto() {
  const name = document.getElementById('formName').value.trim() || 'Visitor';
  const email = document.getElementById('formEmail').value.trim() || 'Not specified';
  const subject = document.getElementById('formSubject').value.trim() || 'Inquiry';
  const message = document.getElementById('formMessage').value.trim() || '';

  const mailtoSubject = encodeURIComponent(`[Portfolio Contact] ${subject} - ${name}`);
  const mailtoBody = encodeURIComponent(
    `Hello Febin,\n\n${message}\n\n---\nSender: ${name}\nEmail: ${email}`
  );

  const mailtoUrl = `mailto:febinscaria02@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`;
  
  const statusEl = document.getElementById('formStatus');
  if (statusEl) {
    statusEl.className = 'form-status success';
    statusEl.textContent = 'Opening your email client...';
  }

  window.location.href = mailtoUrl;
}

// 10. Contact Message Form Submission Handler
async function handleFormSubmit(event) {
  event.preventDefault();

  const statusEl = document.getElementById('formStatus');
  const submitBtn = document.getElementById('submitBtn');
  const submitBtnText = document.getElementById('submitBtnText');
  const accessKeyInput = document.getElementById('formAccessKey');
  const accessKey = accessKeyInput ? accessKeyInput.value.trim() : '';

  const name = document.getElementById('formName').value.trim();
  const email = document.getElementById('formEmail').value.trim();
  const subject = document.getElementById('formSubject').value.trim();
  const message = document.getElementById('formMessage').value.trim();

  // If a Web3Forms access key is configured, send silently via AJAX
  if (accessKey && accessKey !== 'YOUR_ACCESS_KEY_HERE') {
    submitBtn.disabled = true;
    if (submitBtnText) submitBtnText.textContent = 'Sending...';

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          access_key: accessKey,
          name: name,
          email: email,
          subject: `[Portfolio Contact] ${subject}`,
          message: message
        })
      });

      const result = await response.json();
      if (result.success) {
        statusEl.className = 'form-status success';
        statusEl.textContent = '✓ Message dispatched directly to Febin! Thank you.';
        document.getElementById('contactForm').reset();
      } else {
        throw new Error(result.message || 'Submission error');
      }
    } catch (err) {
      statusEl.className = 'form-status error';
      statusEl.textContent = 'Direct send unavailable. Opening email client instead...';
      dispatchMailto();
    } finally {
      submitBtn.disabled = false;
      if (submitBtnText) submitBtnText.textContent = 'Send Message';
    }
  } else {
    // If no key is specified, seamless mailto client launch
    dispatchMailto();
  }

  return false;
}

// 11. Visitor Counter Logic (Counts visits cleanly)
function initVisitorCounter() {
  const countEl = document.getElementById('visitCount');
  if (!countEl) return;

  // Key for local storage fallback
  const storageKey = 'scariax_portfolio_visits';
  let localVisits = parseInt(localStorage.getItem(storageKey) || '0', 10) + 1;
  localStorage.setItem(storageKey, localVisits);

  // Attempt to hit live counter API
  fetch('https://api.counterapi.dev/v1/scariax-portfolio-2026/visits/up')
    .then(res => res.json())
    .then(data => {
      if (data && data.count) {
        countEl.textContent = data.count.toLocaleString();
      } else {
        countEl.textContent = localVisits.toLocaleString();
      }
    })
    .catch(() => {
      // In sandbox or offline, display local visit count
      countEl.textContent = localVisits.toLocaleString();
    });
}
