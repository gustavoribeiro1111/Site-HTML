// Adicionar interatividade ao site

// Scroll suave para links de navegação
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const element = document.querySelector(href);
            if (element) {
                element.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Animar cards quando entram em vista
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'slideIn 0.6s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Aplicar animação aos cards
document.querySelectorAll('.card, .risco-card, .dica, .prevencao-item').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// Adicionar estilo da animação
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Contador simples de dicas
let dicas = [
    "💧 Água parada por 5 dias já pode gerar mosquitos!",
    "🦟 O Aedes aegypti pica principalmente ao amanhecer e entardecer",
    "🏥 Dengue hemorrágica pode ser fatal",
    "🌡️ Febre acima de 40°C é sinal de alerta",
    "👨‍👩‍👧 Toda a família deve participar da prevenção"
];

// Mostrar dica aleatória ao carregar
window.addEventListener('load', () => {
    console.log('Dica de Prevenção: ' + dicas[Math.floor(Math.random() * dicas.length)]);
});

// Verificação de scroll para highlight da navbar
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Adicionar estilo para link ativo
const navStyle = document.createElement('style');
navStyle.textContent = `
    .nav-links a.active {
        color: #FFE6E0;
        border-bottom: 2px solid #FFE6E0;
        padding-bottom: 5px;
    }
`;
document.head.appendChild(navStyle);

// Função para checklist de prevenção
function criarChecklist() {
    const itens = [
        "☐ Verificou água parada na casa",
        "☐ Fechou a caixa d'água",
        "☐ Limpou as calhas",
        "☐ Lavou vasos de plantas",
        "☐ Retirou pneus velhos",
        "☐ Guardou recipientes abertos"
    ];
    
    return itens;
}

// Adicionar função global para mostrar checklist
window.mostrarChecklist = function() {
    const checklist = criarChecklist();
    alert('Checklist de Prevenção Semanal:\n\n' + checklist.join('\n'));
};

// Log inicial
console.log('🦟 Site de Prevenção de Dengue Carregado!');
console.log('Lembre-se: Água parada = Mosquito = Dengue');
