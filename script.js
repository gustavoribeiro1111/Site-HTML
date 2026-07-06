// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// Close mobile menu when link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Scroll to Top Button
const scrollToTopBtn = document.getElementById('scrollToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.add('show');
    } else {
        scrollToTopBtn.classList.remove('show');
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Navbar Highlight on Scroll
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').slice(1) === current) {
            item.classList.add('active');
        }
    });
});

// Intersection Observer para Animações
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Aplicar observador em elementos
document.querySelectorAll('.card, .info-card, .risk-item, .step, .dica-card, .timeline-item').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// Animação de Números
function animateNumbers() {
    const stats = document.querySelectorAll('.stat-number');
    
    stats.forEach(stat => {
        const finalValue = stat.textContent;
        const isPercentage = finalValue.includes('%');
        const numericValue = parseInt(finalValue);
        
        let currentValue = 0;
        const increment = numericValue / 50;
        
        const timer = setInterval(() => {
            currentValue += increment;
            if (currentValue >= numericValue) {
                stat.textContent = finalValue;
                clearInterval(timer);
            } else {
                stat.textContent = Math.floor(currentValue) + (isPercentage ? '%' : (finalValue.includes('M') ? 'M' : '+'));
            }
        }, 30);
    });
}

// Disparar animação quando seção é visível
const statsSection = document.querySelector('.hero-stats');
if (statsSection) {
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateNumbers();
                statsObserver.unobserve(entry.target);
            }
        });
    });
    statsObserver.observe(statsSection);
}

// Form Submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Obrigado por sua mensagem! Entraremos em contato em breve.');
        contactForm.reset();
    });
}

// Checklist Persistência
const checkboxes = document.querySelectorAll('input[type="checkbox"]');

checkboxes.forEach(checkbox => {
    // Carregar estado salvo
    const saved = localStorage.getItem(checkbox.id || checkbox.name);
    if (saved) {
        checkbox.checked = JSON.parse(saved);
    }

    // Salvar estado ao mudar
    checkbox.addEventListener('change', () => {
        localStorage.setItem(checkbox.id || checkbox.name, checkbox.checked);
    });
});

// Suavidade ao navegar para âncoras
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Dicas Aleatórias no Console
const dicas = [
    '💧 Água parada por 5 dias já pode gerar mosquitos!',
    '🦟 O Aedes aegypti pica principalmente ao amanhecer e entardecer',
    '🏥 Dengue hemorrágica pode ser fatal',
    '🌡️ Febre acima de 40°C é sinal de alerta',
    '👨‍👩‍👧 Toda a família deve participar da prevenção',
    '🌍 A dengue afeta 390 milhões de pessoas por ano',
    '🧬 Existem 4 sorotipos diferentes de dengue',
    '🏡 Um único pneu pode gerar 1000 larvas de mosquitos'
];

console.log('%c🦟 Dengue Alert - Prevenção de Dengue', 'color: #E74C3C; font-size: 20px; font-weight: bold;');
console.log('%cDica: ' + dicas[Math.floor(Math.random() * dicas.length)], 'color: #27AE60; font-size: 14px;');
console.log('%cLembre-se: Água parada = Mosquito = Dengue', 'color: #3498DB; font-size: 12px;');

// Notificação de Suporte
if ('Notification' in window && Notification.permission === 'granted') {
    window.addEventListener('load', () => {
        setTimeout(() => {
            new Notification('Dengue Alert', {
                body: 'Não esqueça de verificar sua casa e quintal hoje!',
                icon: '🦟'
            });
        }, 5000);
    });
}

// Função para solicitar permissão de notificação
function requestNotificationPermission() {
    if ('Notification' in window && Notification.permission === 'default') {
        Notification.requestPermission();
    }
}

// Scroll Spy avançado
function initScrollSpy() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                document.querySelectorAll('.nav-links a').forEach(link => {
                    link.classList.remove('active');
                });
                document.querySelector(`.nav-links a[href="#${id}"]`)?.classList.add('active');
            }
        });
    }, {
        threshold: 0.3
    });

    sections.forEach(section => observer.observe(section));
}

initScrollSpy();

// Preload de imagens
function preloadImages() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = img.src;
        document.head.appendChild(link);
    });
}

preloadImages();

// Tracking de Engagement
document.addEventListener('click', (e) => {
    if (e.target.closest('button, a[href^="#"]')) {
        console.log('Usuário interagiu com:', e.target.textContent.trim());
    }
});

// Função para teste de acessibilidade
function testAccessibility() {
    const buttons = document.querySelectorAll('button');
    const links = document.querySelectorAll('a');
    
    console.log(`%c✓ ${buttons.length} botões encontrados`, 'color: #27AE60');
    console.log(`%c✓ ${links.length} links encontrados`, 'color: #27AE60');
}

// Chamar ao carregar
window.addEventListener('load', () => {
    testAccessibility();
});

// Dark Mode Toggle (Opcional)
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
if (prefersDark.matches) {
    document.body.style.filter = 'invert(1)';
}

// Performance Monitoring
window.addEventListener('load', () => {
    const perfData = window.performance.timing;
    const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
    console.log(`%c⚡ Tempo de carregamento: ${pageLoadTime}ms`, 'color: #F39C12; font-size: 12px;');
});

// Parallax Effect simples
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const banner = document.querySelector('.hero-banner');
    if (banner) {
        banner.style.backgroundPosition = `center ${scrollY * 0.5}px`;
    }
});

// Initialize
console.log('%cSite Dengue Alert Carregado com Sucesso! ✨', 'color: #E74C3C; font-weight: bold; font-size: 16px;');
