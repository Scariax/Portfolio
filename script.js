/**
 * Febin Scaria — Portfolio Interactive Logic
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

  // 7. Project Filtering (All / Upcoming / Completed)
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      // Remove active from all
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach((card) => {
        const cardCategory = card.getAttribute('data-category');
        if (filterValue === 'all' || cardCategory === filterValue) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });

  // 8. Copy Email to Clipboard with Toast
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
});

// 9. Contact Message Form Submission Handler
function handleFormSubmit(event) {
  event.preventDefault();

  const name = document.getElementById('formName').value.trim();
  const email = document.getElementById('formEmail').value.trim();
  const subject = document.getElementById('formSubject').value.trim();
  const message = document.getElementById('formMessage').value.trim();

  const mailtoSubject = encodeURIComponent(`[Portfolio Contact] ${subject} - ${name}`);
  const mailtoBody = encodeURIComponent(
    `Hello Febin,\n\n${message}\n\n---\nSender: ${name}\nEmail: ${email}`
  );

  const mailtoUrl = `mailto:febinscaria02@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`;

  const toastNotification = document.getElementById('toastNotification');
  const toastMessage = document.getElementById('toastMessage');
  if (toastNotification && toastMessage) {
    toastMessage.textContent = 'Opening your email client...';
    toastNotification.classList.add('show');
    setTimeout(() => {
      toastNotification.classList.remove('show');
    }, 3000);
  }

  window.location.href = mailtoUrl;
  return false;
}
