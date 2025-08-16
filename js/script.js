document.addEventListener('DOMContentLoaded', () => {
    
    const hamburger = document.querySelector('.nav-hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        
        
        if (hamburger.classList.contains('active')) {
            document.querySelectorAll('.hamburger-line').forEach((line, index) => {
                line.style.transform = index === 0 
                    ? 'rotate(45deg) translate(5px, 5px)'
                    : 'rotate(-45deg) translate(5px, -5px)';
            });
        } else {
            document.querySelectorAll('.hamburger-line').forEach(line => {
                line.style.transform = 'none';
            });
        }
    });
    
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navLinks.classList.contains('active')) {
                    hamburger.classList.remove('active');
                    navLinks.classList.remove('active');
                    document.querySelectorAll('.hamburger-line').forEach(line => {
                        line.style.transform = 'none';
                    });
                }
            }
        });
    });
    
    
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.feature-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    
    document.querySelectorAll('.feature-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1)';
    });
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); 
    
    
    if (document.querySelector('.visual-card')) {
        window.addEventListener('mousemove', (e) => {
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;
            const card = document.querySelector('.visual-card');
            
            card.style.transform = `rotateY(${x * 10 - 5}deg) rotateX(${y * -10 + 5}deg)`;
        });
    }
});

 (function(){
        const root = document.getElementById('wsp');
        const btn  = root.querySelector('.wsp-btn');
        document.addEventListener('click', (e) => {
          if (btn.contains(e.target)) {
            root.classList.toggle('open');
          } else if (!root.contains(e.target)) {
            root.classList.remove('open');
          }
        });
      })();

      document.addEventListener('DOMContentLoaded', () => {
  // Inicializar carrusel de testimonios
  const carouselTrack = document.querySelector('.carousel-track');
  const slides = document.querySelectorAll('.carousel-slide');
  const dots = document.querySelectorAll('.carousel-dot');
  const prevBtn = document.querySelector('.carousel-prev');
  const nextBtn = document.querySelector('.carousel-next');
  
  let currentIndex = 0;
  const slideCount = slides.length;
  
  // Configurar el carrusel
  function setupCarousel() {
    // Crear puntos de navegación si no existen
    if (dots.length === 0) {
      const dotsContainer = document.querySelector('.carousel-dots');
      for (let i = 0; i < slideCount; i++) {
        const dot = document.createElement('div');
        dot.classList.add('carousel-dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
      }
    }
    
    updateCarousel();
  }
  
  // Actualizar la posición del carrusel
  function updateCarousel() {
    carouselTrack.style.transform = `translateX(-${currentIndex * 100}%)`;
    
    // Actualizar estado de los puntos
    document.querySelectorAll('.carousel-dot').forEach((dot, index) => {
      dot.classList.toggle('active', index === currentIndex);
    });
    
    // Actualizar estado de los botones
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex === slideCount - 1;
  }
  
  // Ir a un slide específico
  function goToSlide(index) {
    currentIndex = index;
    updateCarousel();
  }
  
  // Slide anterior
  function prevSlide() {
    if (currentIndex > 0) {
      currentIndex--;
      updateCarousel();
    }
  }
  
  // Slide siguiente
  function nextSlide() {
    if (currentIndex < slideCount - 1) {
      currentIndex++;
      updateCarousel();
    }
  }
  
  // Event listeners
  prevBtn.addEventListener('click', prevSlide);
  nextBtn.addEventListener('click', nextSlide);
  
  // Iniciar autoplay
  let autoplay = setInterval(nextSlide, 5000);
  
  // Pausar autoplay al interactuar
  carouselTrack.addEventListener('mouseenter', () => {
    clearInterval(autoplay);
  });
  
  carouselTrack.addEventListener('mouseleave', () => {
    autoplay = setInterval(nextSlide, 5000);
  });
  
  // Inicializar el carrusel
  setupCarousel();
  
  // WhatsApp float
  const whatsappFloat = document.getElementById('wsp');
  const wspBtn = document.querySelector('.wsp-btn');
  
  wspBtn.addEventListener('click', () => {
    whatsappFloat.classList.toggle('open');
  });
  
  // Cerrar menú de WhatsApp al hacer clic fuera
  document.addEventListener('click', (e) => {
    if (!whatsappFloat.contains(e.target)) {
      whatsappFloat.classList.remove('open');
    }
  });
});

document.addEventListener('DOMContentLoaded', () => {
  // Animación de números en las estadísticas
  function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
      const target = parseInt(stat.getAttribute('data-count'));
      const duration = 2000;
      const startTime = performance.now();
      
      const animate = (currentTime) => {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        const currentValue = Math.floor(progress * target);
        
        stat.textContent = currentValue;
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      
      requestAnimationFrame(animate);
    });
  }
  
  // Observer para animaciones al hacer scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
        
        // Animación especial para estadísticas
        if (entry.target.classList.contains('vite-stats')) {
          animateStats();
        }
      }
    });
  }, observerOptions);
  
  // Elementos a observar
  const sections = document.querySelectorAll('section');
  const cards = document.querySelectorAll('.feature-card, .value-card, .highlight-item, .blog-card');
  
  sections.forEach(section => observer.observe(section));
  cards.forEach(card => observer.observe(card));
  
  // Efecto parallax para la tarjeta visual
  const visualCard = document.querySelector('.visual-card');
  if (visualCard) {
    document.addEventListener('mousemove', (e) => {
      const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
      const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
      visualCard.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
    });
    
    // Resetear al salir
    visualCard.addEventListener('mouseleave', () => {
      visualCard.style.transform = 'rotateY(0deg) rotateX(0deg)';
    });
  }
});