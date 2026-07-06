// ============== DOM ELEMENTS ============== //
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const scrollToTopBtn = document.getElementById('scrollToTop');
const contactForm = document.querySelector('.contact-form');

// ============== HAMBURGER MENU ============== //
if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    document.addEventListener('click', (e) => {
        if (!e.target.closest('.navbar')) {
            navLinks.classList.remove('active');
        }
    });
}

// ============== SCROLL TO TOP ============== //
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.add('show');
    } else {
        scrollToTopBtn.classList.remove('show');
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ============== CONTACT FORM ============== //
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Obrigado! Sua mensagem foi enviada com sucesso!\n\nNosso time entrará em contato em breve.');
        contactForm.reset();
    });
}

// ============== ANIMAÇÃO NÚMEROS ============== //
const animateNumbers = () => {
    const stats = document.querySelectorAll('.stat-number');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const text = element.textContent;
                const isPercentage = text.includes('%');
                const isPlus = text.includes('+');
                let number = parseInt(text);
                
                const counter = setInterval(() => {
                    if (number > 0) {
                        number--;
                        let display = number;
                        if (isPercentage) display += '%';
                        if (isPlus) display = '+' + display + '%';
                        if (text.includes('K')) display = Math.ceil(number / 100) + 'K+';
                        element.textContent = display;
                    } else {
                        clearInterval(counter);
                        element.textContent = text;
                    }
                }, 20);
                observer.unobserve(element);
            }
        });
    }, { threshold: 0.5 });

    stats.forEach(stat => observer.observe(stat));
};

animateNumbers();

// ============== SCROLL SPY ============== //
const scrollSpy = () => {
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-links a');
    
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 200) {
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
};

scrollSpy();

// ============== SMOOTH SCROLLING ============== //
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
            navLinks.classList.remove('active');
        }
    });
});

// ============== CHECKBOX PERSISTENCE ============== //
const checkboxes = document.querySelectorAll('.day input[type="checkbox"]');
const storageKey = 'agro-checklist';

// Carrega estado anterior
const loadCheckboxState = () => {
    const savedState = localStorage.getItem(storageKey);
    if (savedState) {
        const state = JSON.parse(savedState);
        checkboxes.forEach((checkbox, index) => {
            checkbox.checked = state[index] || false;
        });
    }
};

// Salva estado
const saveCheckboxState = () => {
    const state = Array.from(checkboxes).map(checkbox => checkbox.checked);
    localStorage.setItem(storageKey, JSON.stringify(state));
};

checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', saveCheckboxState);
});

loadCheckboxState();

// ============== INTERSECTION OBSERVER PARA ANIMAÇÕES ============== //
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.animation = 'fadeInUp 0.6s ease-out';
        }
    });
}, observerOptions);

document.querySelectorAll('.info-card, .risk-item, .dica-card, .step').forEach(el => {
    observer.observe(el);
});

// ============== PERFORMANCE MONITORING ============== //
if (window.performance && window.performance.timing) {
    window.addEventListener('load', () => {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log('Página carregada em: ' + pageLoadTime + 'ms');
    });
}

// ============== VALIDAÇÃO DE FORMULÁRIO ============== //
const validateForm = (form) => {
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;

    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.style.borderColor = '#E74C3C';
        } else {
            input.style.borderColor = '#E0E0E0';
        }
    });

    return isValid;
};

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        if (!validateForm(contactForm)) {
            e.preventDefault();
            alert('Por favor, preencha todos os campos obrigatórios!');
        }
    });
}

console.log('🌾 AgroTech Hub - Site carregado com sucesso!');
