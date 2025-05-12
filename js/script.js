document.addEventListener('DOMContentLoaded', function() {
  const loader = document.querySelector('.loader');
  setTimeout(() => {
    loader.classList.add('hidden');

    setTimeout(() => {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth'
      });

      setTimeout(() => {
        window.scrollTo({
          top: 250,
          behavior: 'smooth'
        });
      }, 1500);
    }, 600);
  }, 800);
  const title = document.querySelector('h1');
  const text = title.textContent;
  title.textContent = '';

  for (let i = 0; i < text.length; i++) {
    const span = document.createElement('span');
    span.classList.add('animate-text');
    span.textContent = text[i] === ' ' ? '\u00A0' : text[i];
    span.style.transitionDelay = i * 0.05 + 's';
    title.appendChild(span);

    setTimeout(() => {
      span.classList.add('visible');
    }, 100);
  }

  const typedTextSpan = document.querySelector('.typed-text');
  const cursorSpan = document.querySelector('.cursor');

  const textArray = [
    "Anish Budhathoki",
    ", I'm a Software Engineer",
    ", I'm a Problem Solver",
    ", I'm a Creative Thinker"
  ];

  const typingDelay = 100;
  const erasingDelay = 50;
  const newTextDelay = 2000;
  let textArrayIndex = 0;
  let charIndex = 0;

  function type() {
    if (charIndex < textArray[textArrayIndex].length) {
      if(!cursorSpan.classList.contains('typing')) cursorSpan.classList.add('typing');
      typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
      charIndex++;
      setTimeout(type, typingDelay);
    } else {
      cursorSpan.classList.remove('typing');
      setTimeout(erase, newTextDelay);
    }
  }

  function erase() {
    if (charIndex > 0) {
      if(!cursorSpan.classList.contains('typing')) cursorSpan.classList.add('typing');
      typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex-1);
      charIndex--;
      setTimeout(erase, erasingDelay);
    } else {
      cursorSpan.classList.remove('typing');
      textArrayIndex++;
      if(textArrayIndex >= textArray.length) textArrayIndex = 0;
      setTimeout(type, typingDelay + 1100);
    }
  }

  if(textArray.length) setTimeout(type, newTextDelay + 250);

  const themeSwitch = document.getElementById('theme-switch');

  themeSwitch.addEventListener('change', function() {
    if(this.checked) {
      document.body.classList.add('light-theme');
      localStorage.setItem('theme', 'light');
    } else {
      document.body.classList.remove('light-theme');
      localStorage.setItem('theme', 'dark');
    }
  });

  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    document.body.classList.add('light-theme');
    themeSwitch.checked = true;
  }

  const cursor = document.querySelector('.custom-cursor');
  const cursorDot = document.querySelector('.custom-cursor-dot');

  document.addEventListener('mousemove', function(e) {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';

    cursorDot.style.left = e.clientX + 'px';
    cursorDot.style.top = e.clientY + 'px';
  });

  document.addEventListener('mousedown', function() {
    cursor.style.transform = 'translate(-50%, -50%) scale(0.9)';
  });

  document.addEventListener('mouseup', function() {
    cursor.style.transform = 'translate(-50%, -50%) scale(1)';
  });

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();

      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });

  ScrollReveal().reveal('.info-card', {
    delay: 200,
    distance: '20px',
    origin: 'bottom',
    interval: 100,
    reset: false
  });

  const modal = document.getElementById('project-modal');
  const closeModal = document.querySelector('.close-modal');

  closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });
});
