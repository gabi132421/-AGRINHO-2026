// Menu Mobile
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    menuToggle.innerHTML = navMenu.classList.contains('active') 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
});

// Fechar menu ao clicar em um link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    } else {
        header.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
    }
});

// Animação de contagem dos números
const animateNumbers = () => {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                stat.textContent = target;
                clearInterval(timer);
            } else {
                stat.textContent = Math.floor(current);
            }
        }, 16);
    });
};

// Intersection Observer para animações
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            
            // Animar números quando a seção de stats estiver visível
            if (entry.target.classList.contains('stats-grid')) {
                animateNumbers();
            }
            
            // Animar barras de progresso
            const dataFills = entry.target.querySelectorAll('.data-fill');
            dataFills.forEach(fill => {
                const percent = fill.getAttribute('data-percent');
                setTimeout(() => {
                    fill.style.width = percent + '%';
                }, 200);
            });
            
            // Animar barras do gráfico
            const barFills = entry.target.querySelectorAll('.bar-fill');
            barFills.forEach((fill, index) => {
                const bar = fill.parentElement;
                const value = bar.getAttribute('data-value');
                setTimeout(() => {
                    fill.style.height = (value * 2.5) + 'px';
                }, index * 100);
            });
        }
    });
}, observerOptions);

// Observar elementos
document.querySelectorAll('.stats-grid, .challenge-card, .chart-container').forEach(el => {
    observer.observe(el);
});

// Smooth scroll para links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Ativar link do menu baseado na seção visível
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Galeria Interativa
const galleryItems = document.querySelectorAll('.gallery-item');
const filterBtns = document.querySelectorAll('.filter-btn');
const modal = document.getElementById('galleryModal');
const modalClose = document.getElementById('modalClose');
const modalBody = document.getElementById('modalBody');

// Filtrar galeria
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remover active de todos os botões
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const filter = btn.getAttribute('data-filter');
        
        galleryItems.forEach(item => {
            if (filter === 'all' || item.getAttribute('data-category') === filter) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 10);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Abrir modal da galeria
galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        const category = item.getAttribute('data-category');
        const title = item.querySelector('span').textContent;
        const icon = item.querySelector('.gallery-placeholder i').className;
        
        modalBody.innerHTML = `
            <div style="text-align: center; padding: 2rem;">
                <i class="${icon}" style="font-size: 8rem; color: var(--primary-color); margin-bottom: 1rem;"></i>
                <h2 style="color: var(--primary-color); margin-bottom: 1rem;">${title}</h2>
                <p style="color: var(--text-color); font-size: 1.1rem;">
                    Categoria: ${category.charAt(0).toUpperCase() + category.slice(1)}
                </p>
                <div style="margin-top: 2rem; padding: 1.5rem; background: var(--light-color); border-radius: 10px;">
                    <p>Esta é uma imagem ilustrativa da prática sustentável de ${title.toLowerCase()}.</p>
                    <p style="margin-top: 1rem;">Em um site real, aqui seria exibida uma foto ou vídeo de alta qualidade demonstrando esta tecnologia no campo.</p>
                </div>
            </div>
        `;
        
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

// Fechar modal
modalClose.addEventListener('click', () => {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
});

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Tabs de Soluções
const tabBtns = document.querySelectorAll('.tab-btn');
const tabPanels = document.querySelectorAll('.tab-panel');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const tabId = btn.getAttribute('data-tab');
        
        // Remover active de todos
        tabBtns.forEach(b => b.classList.remove('active'));
        tabPanels.forEach(p => p.classList.remove('active'));
        
        // Adicionar active no atual
        btn.classList.add('active');
        document.getElementById(tabId).classList.add('active');
    });
});

// Calculadora de Impacto
const calculatorForm = document.getElementById('calculatorForm');
const calculatorResult = document.getElementById('calculatorResult');

calculatorForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const area = parseFloat(document.getElementById('area').value);
    const tipo = document.getElementById('tipo').value;
    const agua = parseFloat(document.getElementById('agua').value);
    const energia = parseFloat(document.getElementById('energia').value);
    const praticas = Array.from(document.querySelectorAll('input[name="praticas"]:checked')).map(cb => cb.value);
    
    // Cálculos
    const waterImpact = agua * 12; // Consumo anual
    const carbonImpact = (energia * 12 * 0.0005) + (area * 0.5); // Estimativa simplificada
    
    // Cálculo do score de sustentabilidade
    let sustainabilityScore = 50; // Base
    
    // Bônus por práticas sustentáveis
    const praticaBonus = {
        'plantio_direto': 10,
        'energia_solar': 15,
        'irrigacao_inteligente': 12,
        'ilpf': 15,
        'bioinsumos': 8
    };
    
    praticas.forEach(pratica => {
        sustainabilityScore += praticaBonus[pratica] || 0;
    });
    
    // Ajustes baseados no tipo
    if (tipo === 'floresta') sustainabilityScore += 20;
    if (tipo === 'mista') sustainabilityScore += 5;
    
    // Limitar entre 0 e 100
    sustainabilityScore = Math.min(100, Math.max(0, sustainabilityScore));
    
    // Exibir resultados
    document.getElementById('waterImpact').textContent = waterImpact.toLocaleString('pt-BR');
    document.getElementById('carbonImpact').textContent = carbonImpact.toFixed(1);
    document.getElementById('sustainabilityScore').textContent = sustainabilityScore;
    
    // Mensagem baseada no score
    let message = '';
    let recommendations = [];
    
    if (sustainabilityScore >= 80) {
        message = ' Excelente! Sua propriedade tem alto índice de sustentabilidade!';
    } else if (sustainabilityScore >= 60) {
        message = '✅ Bom trabalho! Sua propriedade está no caminho certo para a sustentabilidade.';
        recommendations.push('Considere implementar energia solar');
        recommendations.push('Adote sistemas de irrigação inteligente');
    } else if (sustainabilityScore >= 40) {
        message = '⚠️ Atenção! Há espaço para melhorias significativas na sustentabilidade.';
        recommendations.push('Implemente plantio direto');
        recommendations.push('Reduza o consumo de água');
        recommendations.push('Considere ILPF (Integração Lavoura-Pecuária-Floresta)');
    } else {
        message = '🚨 Alerta! Sua propriedade precisa de mudanças urgentes para se tornar sustentável.';
        recommendations.push('Adote práticas de conservação do solo');
        recommendations.push('Implemente pelo menos 3 práticas sustentáveis');
        recommendations.push('Busque assistência técnica especializada');
        recommendations.push('Considere certificações ambientais');
    }
    
    document.getElementById('resultMessage').textContent = message;
    
    const recDiv = document.getElementById('resultRecommendations');
    if (recommendations.length > 0) {
        recDiv.innerHTML = `
            <h4>Recomendações:</h4>
            <ul>
                ${recommendations.map(rec => `<li>${rec}</li>`).join('')}
            </ul>
        `;
    } else {
        recDiv.innerHTML = '<h4>Continue assim!</h4><p>Mantenha as boas práticas e compartilhe seu conhecimento com outros produtores.</p>';
    }
    
    calculatorResult.style.display = 'block';
    calculatorResult.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
});

// Quiz de Sustentabilidade
const quizData = [
    {
        question: "Qual prática agrícola ajuda a reduzir a erosão do solo em até 90%?",
        answers: [
            "Queimadas controladas",
            "Plantio Direto",
            "Aragem profunda",
            "Monocultura intensiva"
        ],
        correct: 1
    },
    {
        question: "O que significa ILPF?",
        answers: [
            "Irrigação Limitada Para Fazendas",
            "Integração Lavoura-Pecuária-Floresta",
            "Insumos Livres de Produtos Químicos",
            "Índice de Lucro Por Fazenda"
        ],
        correct: 1
    },
    {
        question: "Qual tecnologia permite economia de até 40% no consumo de água na agricultura?",
        answers: [
            "Tratores modernos",
            "Irrigação Inteligente",
            "Sementes transgênicas",
            "Fertilizantes químicos"
        ],
        correct: 1
    },
    {
        question: "Qual é a principal fonte de energia renovável utilizada em fazendas brasileiras?",
        answers: [
            "Energia Eólica",
            "Energia Nuclear",
            "Energia Solar Fotovoltaica",
            "Energia das Marés"
        ],
        correct: 2
    },
    {
        question: "O que são bioinsumos?",
        answers: [
            "Fertilizantes químicos importados",
            "Produtos biológicos como biofertilizantes e biopesticidas",
            "Maquinário agrícola novo",
            "Sementes geneticamente modificadas"
        ],
        correct: 1
    },
    {
        question: "Qual porcentagem do PIB brasileiro representa o agronegócio?",
        answers: [
            "10%",
            "15%",
            "25%",
            "40%"
        ],
        correct: 2
    },
    {
        question: "O que é Agricultura de Precisão?",
        answers: [
            "Plantio manual cuidadoso",
            "Uso de tecnologias como GPS e drones para otimizar a produção",
            "Cultivo apenas de produtos orgânicos",
            "Plantio em pequenas áreas"
        ],
        correct: 1
    },
    {
        question: "Qual é o principal gás de efeito estufa emitido pela pecuária?",
        answers: [
            "Dióxido de Carbono (CO2)",
            "Metano (CH4)",
            "Óxido Nitroso (N2O)",
            "Vapor de água"
        ],
        correct: 1
    },
    {
        question: "O que é o Plano ABC+?",
        answers: [
            "Programa de alfabetização de produtores rurais",
            "Plano de Agricultura de Baixo Carbono",
            "Certificação de qualidade de produtos",
            "Programa de subsídios para exportação"
        ],
        correct: 1
    },
    {
        question: "Qual prática ajuda no sequestro de carbono do solo?",
        answers: [
            "Queimadas frequentes",
            "Cobertura vegetal permanente e plantio direto",
            "Uso intensivo de agrotóxicos",
            "Desmatamento para expansão"
        ],
        correct: 1
    }
];

let currentQuestion = 0;
let score = 0;
let answeredQuestions = [];

const quizStart = document.getElementById('quizStart');
const quizQuestions = document.getElementById('quizQuestions');
const quizResult = document.getElementById('quizResult');
const startQuizBtn = document.getElementById('startQuiz');
const questionText = document.getElementById('questionText');
const answersGrid = document.getElementById('answersGrid');
const progressFill = document.getElementById('progressFill');
const currentQuestionSpan = document.getElementById('currentQuestion');
const totalQuestionsSpan = document.getElementById('totalQuestions');

startQuizBtn.addEventListener('click', startQuiz);

function startQuiz() {
    quizStart.style.display = 'none';
    quizQuestions.style.display = 'block';
    currentQuestion = 0;
    score = 0;
    answeredQuestions = [];
    totalQuestionsSpan.textContent = quizData.length;
    showQuestion();
}

function showQuestion() {
    const question = quizData[currentQuestion];
    questionText.textContent = `${currentQuestion + 1}. ${question.question}`;
    currentQuestionSpan.textContent = currentQuestion + 1;
    
    // Atualizar barra de progresso
    const progress = ((currentQuestion) / quizData.length) * 100;
    progressFill.style.width = progress + '%';
    
    // Limpar respostas anteriores
    answersGrid.innerHTML = '';
    
    // Criar botões de resposta
    question.answers.forEach((answer, index) => {
        const btn = document.createElement('button');
        btn.className = 'answer-btn';
        btn.textContent = answer;
        btn.addEventListener('click', () => selectAnswer(index, btn));
        answersGrid.appendChild(btn);
    });
}

function selectAnswer(selectedIndex, selectedBtn) {
    const question = quizData[currentQuestion];
    const buttons = answersGrid.querySelectorAll('.answer-btn');
    
    // Desabilitar todos os botões
    buttons.forEach(btn => btn.disabled = true);
    
    // Marcar resposta correta e incorreta
    if (selectedIndex === question.correct) {
        selectedBtn.classList.add('correct');
        score++;
        answeredQuestions.push(true);
    } else {
        selectedBtn.classList.add('incorrect');
        buttons[question.correct].classList.add('correct');
        answeredQuestions.push(false);
    }
    
    // Aguardar e ir para próxima questão
    setTimeout(() => {
        currentQuestion++;
        if (currentQuestion < quizData.length) {
            showQuestion();
        } else {
            showResult();
        }
    }, 1500);
}

function showResult() {
    quizQuestions.style.display = 'none';
    quizResult.style.display = 'block';
    
    const percentage = (score / quizData.length) * 100;
    document.getElementById('scoreValue').textContent = percentage;
    
    let message = '';
    if (percentage === 100) {
        message = ' Perfeito! Você é um especialista em sustentabilidade!';
    } else if (percentage >= 80) {
        message = ' Excelente! Você tem ótimo conhecimento sobre agro sustentável!';
    } else if (percentage >= 60) {
        message = '✅ Bom! Você conhece bem o assunto, mas pode melhorar!';
    } else if (percentage >= 40) {
        message = '📚 Regular! Que tal estudar mais sobre sustentabilidade?';
    } else {
        message = '🌱 Iniciante! Continue aprendendo sobre práticas sustentáveis!';
    }
    
    document.getElementById('scoreMessage').textContent = message;
    
    // Detalhes das respostas
    const detailsHtml = quizData.map((q, i) => `
        <div style="margin-bottom: 1rem; padding: 1rem; background: white; border-radius: 8px;">
            <strong>Questão ${i + 1}:</strong> ${answeredQuestions[i] ? '✅ Correta' : '❌ Incorreta'}
        </div>
    `).join('');
    
    document.getElementById('resultDetails').innerHTML = `
        <h4 style="margin-bottom: 1rem; color: var(--primary-color);">Detalhes:</h4>
        ${detailsHtml}
    `;
}

document.getElementById('restartQuiz').addEventListener('click', () => {
    quizResult.style.display = 'none';
    quizStart.style.display = 'block';
});

// Formulário de Contato
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const assunto = document.getElementById('assunto').value;
    const mensagem = document.getElementById('mensagem').value;
    
    // Validação simples
    if (!nome || !email || !mensagem) {
        alert('Por favor, preencha todos os campos obrigatórios!');
        return;
    }
    
    // Simular envio
    alert(`Obrigado pelo contato, ${nome}! \n\nSua mensagem foi enviada com sucesso. Entraremos em contato em breve pelo e-mail ${email}.`);
    
    // Limpar formulário
    contactForm.reset();
});

// Newsletter do footer
const newsletterForm = document.getElementById('newsletterForm');

newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = newsletterForm.querySelector('input[type="email"]').value;
    
    alert(`Obrigado por se inscrever! \n\nVocê receberá nossas novidades no e-mail: ${email}`);
    newsletterForm.reset();
});

// Animação de entrada suave para todas as seções
const fadeElements = document.querySelectorAll('.stat-card, .tech-card, .sustain-card, .challenge-card');

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

fadeElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    fadeObserver.observe(el);
});

// Lazy loading para performance
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                // Aqui seria o carregamento real de imagens
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('.gallery-placeholder').forEach(img => {
        imageObserver.observe(img);
    });
}

// Console message
console.log('%c AgroSustentável', 'color: #2d6a4f; font-size: 24px; font-weight: bold;');
console.log('%cCultivando o amanhã com sustentabilidade!', 'color: #52b788; font-size: 14px;');
console.log('%cDesenvolvido com ❤️ para um futuro melhor', 'color: #1b4332; font-size: 12px;');
