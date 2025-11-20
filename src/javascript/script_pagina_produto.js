// Array de imagens do produto
var images = [
    'https://img.olx.com.br/images/10/106591701263748.webp',
    'https://img.olx.com.br/images/10/108568586761661.webp',
    'https://img.olx.com.br/images/99/997599347603519.webp',
    'https://img.olx.com.br/images/50/506558941896820.webp',
    'https://sp.olx.com.br/sao-paulo-e-regiao/autos-e-pecas/carros-vans-e-utilitarios/bmw-320i-a-2-0-tb-m-sport-activeflex-16v-4p-2020-1455080959?lis=listing_2020'
];

// Estado da aplicação
var currentIndex = 0;
var isFavorite = false;

// Inicializar galeria de miniaturas
function initThumbnails() {
    var thumbnailsContainer = document.getElementById('thumbnails');
    
    for (var i = 0; i < images.length; i++) {
        var thumb = document.createElement('div');
        thumb.className = 'thumbnail' + (i === 0 ? ' active' : '');
        thumb.innerHTML = '<img src="' + images[i] + '" alt="Foto ' + (i + 1) + '">';
        thumb.setAttribute('data-index', i);
        thumb.onclick = function() {
            setImage(parseInt(this.getAttribute('data-index')));
        };
        thumbnailsContainer.appendChild(thumb);
    }
}

// Definir imagem atual
function setImage(index) {
    currentIndex = index;
    document.getElementById('mainImage').src = images[index];
    
    var thumbs = document.querySelectorAll('.thumbnail');
    for (var i = 0; i < thumbs.length; i++) {
        if (i === index) {
            thumbs[i].classList.add('active');
        } else {
            thumbs[i].classList.remove('active');
        }
    }
}

// Próxima imagem
function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    setImage(currentIndex);
}

// Imagem anterior
function prevImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    setImage(currentIndex);
}

// Toggle favorito
function toggleFavorite() {
    isFavorite = !isFavorite;
    var btn = document.getElementById('favoriteBtn');
    var icon = document.getElementById('heartIcon');
    
    if (isFavorite) {
        btn.classList.add('active');
        icon.setAttribute('fill', '#ff0000');
        icon.setAttribute('stroke', '#ff0000');
    } else {
        btn.classList.remove('active');
        icon.setAttribute('fill', 'none');
        icon.setAttribute('stroke', 'currentColor');
    }
}

// Suporte para navegação por teclado
document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowLeft') {
        prevImage();
    } else if (e.key === 'ArrowRight') {
        nextImage();
    }
});

// Inicializar quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', function() {
    initThumbnails();
});