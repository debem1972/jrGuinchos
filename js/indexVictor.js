// Navbar scroll effect
window.addEventListener('scroll', function () {
    const navbar = document.querySelector('.navbar');
    const heroLogo = document.getElementById('heroLogo');
    const body = document.body;
    const welcomeCard = document.getElementById('welcomeCard');
    //const truckImage = document.getElementById('truckImage');
    const heroSection = document.querySelector('.hero');
    const divImpactMessage = document.querySelector('.impact-message');

    // Verifica se o dispositivo tem largura menor que 992px
    const isSmallDevice = window.innerWidth < 992;

    if (window.scrollY > 100) {
        navbar.classList.add('visible');
        body.classList.add('asphalt-bg');
        heroLogo.style.transform = 'scale(0.8) translateY(-20px)';
        heroLogo.style.opacity = '0';
        divImpactMessage.style.display = 'flex';

        // Adiciona a classe hero-hidden somente se não for um dispositivo pequeno
        if (!isSmallDevice) {
            heroSection.classList.add('hero-hidden');
        }
    } else {
        navbar.classList.remove('visible');
        body.classList.remove('asphalt-bg');
        heroLogo.style.transform = 'scale(1)';
        heroLogo.style.opacity = '1';
        divImpactMessage.style.display = 'none';


        // Remove a classe hero-hidden independentemente do tamanho da tela
        heroSection.classList.remove('hero-hidden');
        //heroSection.style.display = "flex";
    }

    // Novo efeito de surgimento dos elementos da tela de boas vindas
    if (window.scrollY > 100) {
        welcomeCard.classList.add('slide-in');
        //truckImage.classList.add('slide-in');
    } else {
        welcomeCard.classList.remove('slide-in');
        //truckImage.classList.remove('slide-in');
    }
});

//-------------------------------------------------------------------------

// Centralizando o conteúdo da matéria buscada
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault(); // Impede o comportamento padrão
        const target = document.querySelector(this.getAttribute('href'));

        // Verifica se a seção de boas-vindas está visível
        const welcomeSection = document.querySelector('.hide-on-mobile');
        let offset = 50; // Offset padrão

        // Ajusta o offset se a seção de boas-vindas estiver oculta
        if (welcomeSection && getComputedStyle(welcomeSection).display === 'none') {
            offset = 160; // Ajuste específico para dispositivos menores
        }

        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;

        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    });
});


//----------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', function () {
    const impactMessage = document.getElementById('impactMessage');

    // Adiciona a classe "show" para o efeito de surgimento
    setTimeout(() => {
        impactMessage.classList.add('show');
    }, 500); // Ajuste o tempo de atraso, se necessário
});


//-----------------------------------------------------------------------------
// Initialize map
const map = L.map('map').setView([-27.5, -51], 6);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

// Service area polygon (approximate borders of RS, SC, and PR)

const serviceArea = L.polygon([
    [-33.76045662935868, -53.39034003697749],
    [-30.35217553080969, -57.620085871561585],
    [-22.440201592601106, -53.15468236396208],
    [-26.65162445020887, -47.19955056257737],
    [-33.760482002754465, -53.39040619883146]
]).addTo(map);

serviceArea.setStyle({
    color: '#ee3135',
    fillColor: '#ee3135',
    fillOpacity: 0.2
});

// Company location
const companyLocation = L.marker([-29.90042, -50.25325]).addTo(map);

function locateCompany() {
    map.setView([-29.90042, -50.25325], 15);
    companyLocation.bindPopup('<strong>JR Guinchos</strong><br>Rua Marcílio Dias, 2000<br>Pitangas - Osório - RS').openPopup();
}

//---------------------------------------------------------------------------


/*Cópia do email p/ a área de transferência e ocultação da div .mail*/
//NOVO CÓDIGO
function returnMail() {
    const emailElement = document.querySelector('.emailJrGhinchos'); // Seleciona o span que contém o email
    const emailText = emailElement.textContent;

    // Cria um elemento de área de transferência oculto
    const clipboardInput = document.createElement('input');
    clipboardInput.value = emailText;
    document.body.appendChild(clipboardInput);

    // Seleciona o texto no elemento de entrada
    clipboardInput.select();
    clipboardInput.setSelectionRange(0, emailText.length);

    // Copia o texto para a área de transferência
    document.execCommand('copy');

    // Remove o elemento de entrada da página
    document.body.removeChild(clipboardInput);

    // Exibe um alerta
    alert('O email foi copiado para a área de transferência');
};


