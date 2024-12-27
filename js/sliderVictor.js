// Selecionando os elementos no DOM
let nextDom = document.querySelector('#next');
let prevDom = document.querySelector('#prev');
let carouselDom = document.querySelector('.myCarousel');
let listItemDom = document.querySelector('.myCarousel .list');
let thumbnailDom = document.querySelector('.myCarousel .thumbnail');

// Função para navegar para o próximo ou anterior
nextDom.onclick = function () {
    showSlider('next');
};
prevDom.onclick = function () {
    showSlider('prev');
};

let timeRunning = 3000;
let timeAutoNext = 7000;
let runTimeOut;
let runAutoRun = setTimeout(() => {
    nextDom.click();
}, timeAutoNext);

// Função que exibe o slider com o tipo de navegação (next ou prev)
function showSlider(type) {
    let itemSlider = document.querySelectorAll('.myCarousel .list .item');
    let itemThumbnail = document.querySelectorAll('.myCarousel .thumbnail .item');

    if (type === 'next') {
        listItemDom.appendChild(itemSlider[0]);
        thumbnailDom.appendChild(itemThumbnail[0]);
        carouselDom.classList.add('next');
    } else {
        let positionLastItem = itemSlider.length - 1;
        listItemDom.prepend(itemSlider[positionLastItem]);
        thumbnailDom.prepend(itemThumbnail[positionLastItem]);
        carouselDom.classList.add('prev');
    }

    clearTimeout(runTimeOut);
    runTimeOut = setTimeout(() => {
        carouselDom.classList.remove('next');
        carouselDom.classList.remove('prev');
    }, timeRunning);

    clearTimeout(runAutoRun);
    runAutoRun = setTimeout(() => {
        nextDom.click();
    }, timeAutoNext);
}

// Seleção de miniatura: agora clicando na miniatura selecionada
document.querySelectorAll('.myCarousel .thumbnail .item').forEach((thumbnail, index) => {
    thumbnail.addEventListener('click', () => {
        // Lógica de navegação baseada na miniatura
        let itemSlider = document.querySelectorAll('.myCarousel .list .item');
        let itemThumbnail = document.querySelectorAll('.myCarousel .thumbnail .item');

        let currentIndex = Array.from(itemThumbnail).indexOf(thumbnail); // Índice da miniatura clicada
        let currentSlide = itemSlider[0]; // O slide visível (primeiro da lista)

        // Se a miniatura clicada não for a visível, navegue para ela
        if (currentIndex !== 0) {
            let difference = currentIndex; // A diferença de índices

            if (difference > 0) {
                for (let i = 0; i < difference; i++) {
                    showSlider('next'); // Avançar no slider
                }
            } else if (difference < 0) {
                for (let i = 0; i < Math.abs(difference); i++) {
                    showSlider('prev'); // Voltar no slider
                }
            }
        }
    });
});

// Navegar com as setas do teclado
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight') {
        showSlider('next');
    } else if (event.key === 'ArrowLeft') {
        showSlider('prev');
    }
});