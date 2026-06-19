
document.addEventListener('DOMContentLoaded', () => {
  // عناصر هدف برای انیمیشن اسکرول
  const revealElements = document.querySelectorAll(
    'section, .card, .project-card, .service-card, .feature-card, .about-content, .hero-content'
  );

  revealElements.forEach(el => el.classList.add('reveal'));

  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach(el => observer.observe(el));

  // دکمه بازگشت به بالا
  const backToTopBtn = document.querySelector('.back-to-top');

  const toggleBackToTop = () => {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add('show');
    } else {
      backToTopBtn.classList.remove('show');
    }
  };

  window.addEventListener('scroll', toggleBackToTop);
  toggleBackToTop();

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
});












  document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('.project-image');

    images.forEach((img) => {
      const defaultSrc = img.getAttribute('src');
      const hoverSrc = img.getAttribute('data-hover-src');

      if (!hoverSrc) return;

      img.addEventListener('mouseenter', () => {
        img.src = hoverSrc;
      });

      img.addEventListener('mouseleave', () => {
        img.src = defaultSrc;
      });

      // برای اینکه اگر سریع hover شد، عکس از قبل لود شده باشد
      const preload = new Image();
      preload.src = hoverSrc;
    });
  });

