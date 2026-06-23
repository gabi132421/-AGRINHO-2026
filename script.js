document.addEventListener("DOMContentLoaded", () => {
    const slides = document.querySelectorAll(".slide");
    const container = document.querySelector(".container");
    let currentSlideIndex = 0;

    // Se não houver slides, interrompe a execução
    if (slides.length === 0) return;

    // 1. Cria a estrutura de botões de navegação dinamicamente
    const navContainer = document.createElement("div");
    navContainer.className = "nav-controls";
    navContainer.innerHTML = `
        <button id="prevBtn" class="nav-btn" disabled>Anterior</button>
        <span id="slideProgress">1 / ${slides.length}</span>
        <button id="nextBtn" class="nav-btn">Próximo</button>
    `;
    container.appendChild(navContainer);

    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    const slideProgress = document.getElementById("slideProgress");

    // 2. Função para atualizar a exibição dos slides
    function updateSlides() {
        slides.forEach((slide, index) => {
            if (index === currentSlideIndex) {
                slide.style.display = "block";
                // Adiciona uma animação simples de transição
                slide.style.opacity = "0";
                setTimeout(() => {
                    slide.style.opacity = "1";
                    slide.style.transition = "opacity 0.3s ease";
                }, 10);
            } else {
                slide.style.display = "none";
            }
        });

        // Atualiza o texto do progresso (ex: 1 / 10)
        slideProgress.textContent = `${currentSlideIndex + 1} / ${slides.length}`;

        // Controla o estado de ativação dos botões
        prevBtn.disabled = currentSlideIndex === 0;
        nextBtn.disabled = currentSlideIndex === slides.length - 1;
    }

    // 3. Eventos de clique para os botões
    prevBtn.addEventListener("click", () => {
        if (currentSlideIndex > 0) {
            currentSlideIndex--;
            updateSlides();
            window.scrollTo({ top: 0, behavior: 'smooth' }); // Rola para o topo do slide
        }
    });

    nextBtn.addEventListener("click", () => {
        if (currentSlideIndex < slides.length - 1) {
            currentSlideIndex++;
            updateSlides();
            window.scrollTo({ top: 0, behavior: 'smooth' }); // Rola para o topo do slide
        }
    });

    // 4. Suporte para navegação pelas setas do teclado
    document.addEventListener("keydown", (event) => {
        if (event.key === "ArrowRight" || event.key === "Space") {
            if (currentSlideIndex < slides.length - 1) {
                event.preventDefault(); // Evita que o espaço role a página antes de mudar o slide
                currentSlideIndex++;
                updateSlides();
            }
        } else if (event.key === "ArrowLeft") {
            currentSlideIndex--;
            updateSlides();
        }
    });

    // Inicializa a apresentação mostrando o primeiro slide
    updateSlides();
});
