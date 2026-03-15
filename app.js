// app.js - Lógica e interactividad de la página

document.addEventListener("DOMContentLoaded", () => {
    // ==========================================
    // 1. Lógica para Preguntas Frecuentes (FAQ)
    // ==========================================
    const faqButtons = document.querySelectorAll('#preguntas button');
    
    faqButtons.forEach(button => {
        button.addEventListener('click', () => {
            const icon = button.querySelector('.material-symbols-outlined');
            const isActive = icon.textContent === 'remove';
            
            // Cerrar todas las demás respuestas (acordeón exclusico)
            faqButtons.forEach(btn => {
                const btnIcon = btn.querySelector('.material-symbols-outlined');
                btnIcon.textContent = 'add';
                const content = btn.parentElement.querySelector('.faq-content');
                if(content) {
                    content.style.maxHeight = null;
                    content.classList.add('hidden');
                }
            });
            
            // Si no estaba activo, lo abrimos
            if (!isActive) {
                icon.textContent = 'remove';
                const content = button.parentElement.querySelector('.faq-content');
                if(content) {
                    content.classList.remove('hidden');
                    // Opcional: Para animar maxHeight. Aquí usamos display block/none via 'hidden'
                }
            }
        });
    });

    // ==========================================
    // 2. Lógica para los Carruseles de Imágenes
    // ==========================================
    const carousels = document.querySelectorAll('.group\\/carousel');
    
    carousels.forEach(carousel => {
        const images = carousel.querySelectorAll('.carousel-img');
        const prevBtn = carousel.querySelector('.prev-btn');
        const nextBtn = carousel.querySelector('.next-btn');
        let currentIndex = 0;

        function updateCarousel() {
            images.forEach((img, index) => {
                if (index === currentIndex) {
                    img.classList.remove('hidden');
                } else {
                    img.classList.add('hidden');
                }
            });
        }

        if(prevBtn && nextBtn && images.length > 0) {
            prevBtn.addEventListener('click', (e) => {
                e.preventDefault();
                currentIndex = (currentIndex > 0) ? currentIndex - 1 : images.length - 1;
                updateCarousel();
            });

            nextBtn.addEventListener('click', (e) => {
                e.preventDefault();
                currentIndex = (currentIndex < images.length - 1) ? currentIndex + 1 : 0;
                updateCarousel();
            });
            
            // Inicializar la primera imagen
            updateCarousel();
        }
    });

    // ==========================================
    // 3. Lógica para Menú Móvil
    // ==========================================
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            const icon = mobileMenuBtn.querySelector('.material-symbols-outlined');
            if (mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.remove('hidden');
                mobileMenu.classList.add('flex');
                if (icon) icon.textContent = 'close';
            } else {
                mobileMenu.classList.add('hidden');
                mobileMenu.classList.remove('flex');
                if (icon) icon.textContent = 'menu';
            }
        });

        // Cerrar menú al hacer clic en un enlace de navegación
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                mobileMenu.classList.remove('flex');
                const icon = mobileMenuBtn.querySelector('.material-symbols-outlined');
                if (icon) icon.textContent = 'menu';
            });
        });

        // Asegurar que el menú se cierre al redimensionar a pantalla grande
        window.addEventListener('resize', () => {
            if (window.innerWidth >= 768) { // 768px es el breakpoint 'md' de Tailwind
                mobileMenu.classList.add('hidden');
                mobileMenu.classList.remove('flex');
                const icon = mobileMenuBtn.querySelector('.material-symbols-outlined');
                if (icon) icon.textContent = 'menu';
            }
        });
    }
});

/**
 * ==========================================
 * 4. EFECTOS VISUALES AVANZADOS
 * ==========================================
 */

document.addEventListener("DOMContentLoaded", () => {
    // A. Lógica del Preloader
    const preloader = document.getElementById('preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                preloader.classList.add('fade-out');
            }, 1000); // Mínimo 1 segundo para lucir el logo
        });
    }

    // B. Scroll Reveal (Intersection Observer)
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.15 });

    revealElements.forEach(el => revealObserver.observe(el));

    // C. Efecto 3D Tilt en Tarjetas
    const tiltCards = document.querySelectorAll('.tilt-card');
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
        });
    });

    // D. Efecto de Botón Magnético
    const magneticBtns = document.querySelectorAll('.magnetic-btn');
    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = `translate(0, 0)`;
        });
    });

    /**
     * ==========================================
     * 5. EFECTOS EXTREMOS 2.0
     * ==========================================
     */
     
    // 1. Scroll Progress Bar
    const progressBar = document.getElementById('scroll-progress');
    window.addEventListener('scroll', () => {
        if(progressBar) {
            const scrollTotal = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (window.scrollY / scrollTotal) * 100;
            progressBar.style.width = progress + '%';
        }
    });

    // 2. Custom Cursor
    const cursor = document.getElementById('custom-cursor');
    if (cursor) {
        // Ocultar en táctiles
        if ('ontouchstart' in window) {
            cursor.style.display = 'none';
        }
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });

        // Efecto hover en enlaces y botones
        document.querySelectorAll('a, button').forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('cursor-hover'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('cursor-hover'));
        });
    }

    // 3. Water Ripple Click en Botones
    document.querySelectorAll('.btn-ripple').forEach(btn => {
        btn.addEventListener('click', function (e) {
            const rect = this.getBoundingClientRect();
            let x, y;
            if (e.clientX !== undefined) {
                x = e.clientX - rect.left;
                y = e.clientY - rect.top;
            } else if (e.touches && e.touches.length > 0) {
                x = e.touches[0].clientX - rect.left;
                y = e.touches[0].clientY - rect.top;
            } else {
                x = rect.width / 2;
                y = rect.height / 2;
            }

            const ripple = document.createElement('span');
            ripple.classList.add('ripple-span');
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;

            const diameter = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = `${diameter}px`;
            ripple.style.marginLeft = `-${diameter / 2}px`;
            ripple.style.marginTop = `-${diameter / 2}px`;

            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    });

    // 4. Glow-card Tracking (Mouse & Touch)
    document.querySelectorAll('.glow-card').forEach(card => {
        const updateGlow = (e) => {
            const rect = card.getBoundingClientRect();
            const x = (e.clientX || (e.touches && e.touches[0].clientX)) - rect.left;
            const y = (e.clientY || (e.touches && e.touches[0].clientY)) - rect.top;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        };
        card.addEventListener('mousemove', updateGlow);
        card.addEventListener('touchmove', updateGlow);
    });

    // 5. Parallax Simple en Scroll
    const parallaxImages = document.querySelectorAll('.animate-parallax');
    window.addEventListener('scroll', () => {
        parallaxImages.forEach(img => {
            const speed = parseFloat(img.getAttribute('data-speed')) || 0.15;
            const rect = img.getBoundingClientRect();
            // Solo animar si está en el viewport
            if(rect.top < window.innerHeight && rect.bottom > 0) {
                 const yPos = -(rect.top * speed);
                 img.style.transform = `translateY(${yPos}px)`;
            }
        });
    });

    // 6. Confetti Burst Particle en botones principales
    document.querySelectorAll('.btn-particles').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const rect = btn.getBoundingClientRect();
            const startX = (e.clientX !== undefined ? e.clientX : rect.left + rect.width / 2);
            const startY = (e.clientY !== undefined ? e.clientY : rect.top + rect.height / 2);

            const colors = ['#ff6b35', '#ef476f', '#ffd166', '#118ab2', '#06d6a0'];
            
            for (let i = 0; i < 20; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                const size = Math.random() * 8 + 4;
                particle.style.width = size + 'px';
                particle.style.height = size + 'px';
                particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                particle.style.left = startX + 'px';
                particle.style.top = startY + 'px';
                
                const angle = Math.random() * Math.PI * 2;
                const distance = Math.random() * 80 + 30;
                particle.style.setProperty('--tx', `${Math.cos(angle) * distance}px`);
                particle.style.setProperty('--ty', `${Math.sin(angle) * distance}px`);
                
                document.body.appendChild(particle);
                setTimeout(() => particle.remove(), 1000);
            }
        });
    });
});


