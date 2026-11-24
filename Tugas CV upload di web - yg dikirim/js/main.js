/**
 * AirCV Portfolio Website JavaScript
 * Interactive Features: Navbar scroll, ScrollSpy, Lightbox Modal, Contact form feedback
 */

document.addEventListener('DOMContentLoaded', function () {
  const navbar = document.querySelector('.navbar-aircv');
  const backToTopBtn = document.getElementById('backToTopBtn');
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link:not(.nav-cta-btn)');
  const sections = document.querySelectorAll('section[id]');
  
  // 1. Navbar scroll effect & Back to Top visibility
  window.addEventListener('scroll', function () {
    const scrollPos = window.scrollY;

    if (scrollPos > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    if (scrollPos > 400) {
      backToTopBtn.classList.add('show');
    } else {
      backToTopBtn.classList.remove('show');
    }

    // ScrollSpy active link update
    let currentSectionId = '';
    sections.forEach(function (section) {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach(function (link) {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + currentSectionId) {
        link.classList.add('active');
      }
    });
  });

  // 2. Smooth Scroll for Nav Links & Auto-close mobile navbar on click
  const navbarCollapse = document.getElementById('navbarNav');
  navLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId.startsWith('#')) {
        e.preventDefault();
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          const headerOffset = 70;
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });

          // Collapse mobile menu if open
          if (navbarCollapse && navbarCollapse.classList.contains('show')) {
            const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
            if (bsCollapse) {
              bsCollapse.hide();
            }
          }
        }
      }
    });
  });

  // 3. Back to Top Click
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', function (e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // 4. Lightbox Modal Functionality (for 6 Internship Photos & 6 Digital Art Photos)
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxDesc = document.getElementById('lightboxDesc');
  const lightboxClose = document.getElementById('lightboxClose');

  const galleryItems = document.querySelectorAll('.gallery-trigger');

  galleryItems.forEach(function (item) {
    item.addEventListener('click', function () {
      const imgSrc = this.getAttribute('data-img');
      const title = this.getAttribute('data-title');
      const desc = this.getAttribute('data-desc');

      lightboxImg.src = imgSrc;
      lightboxTitle.textContent = title || 'Dokumentasi / Karya';
      lightboxDesc.textContent = desc || 'Klik di luar gambar atau tombol close untuk menutup.';

      lightboxModal.classList.add('active');
      document.body.style.overflow = 'hidden'; // prevent background scrolling
    });
  });

  function closeLightbox() {
    lightboxModal.classList.remove('active');
    lightboxImg.src = '';
    document.body.style.overflow = '';
  }

  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
  }

  if (lightboxModal) {
    lightboxModal.addEventListener('click', function (e) {
      if (e.target === lightboxModal) {
        closeLightbox();
      }
    });
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && lightboxModal && lightboxModal.classList.contains('active')) {
      closeLightbox();
    }
  });

  // 5. Contact Form Submission Feedback
  const contactForm = document.getElementById('contactForm');
  const formSuccessAlert = document.getElementById('formSuccessAlert');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn.innerHTML;

      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i> Mengirim...';

      setTimeout(function () {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
        contactForm.reset();

        if (formSuccessAlert) {
          formSuccessAlert.classList.remove('d-none');
          setTimeout(function () {
            formSuccessAlert.classList.add('d-none');
          }, 6000);
        }
      }, 1000);
    });
  }
});
