// Dados de exemplo de produtos
const products = [
    {
        id: 1,
        name: "BMW 320I M Sport Activeflex",
        year: 2020,
        km: 0,
        price: 185000,
        brand: "BMW", // NOVO
        color: "Preto", // NOVO
        // Caminho da imagem do ID 1
        image: "https://img.olx.com.br/images/10/106591701263748.webp" 
    },
    {
        id: 2,
        name: "Mercedes AMG GT",
        year: 2015,
        km: 5000,
        price: 499000,
        brand: "Mercedes", // NOVO
        color: "Prata", // NOVO
        image: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=400"
    },
    {
        id: 3,
        name: "Hyundai HB20S",
        year: 2023,
        km: 12000,
        price: 78000,
        brand: "Hyundai", // NOVO
        color: "Branco", // NOVO
        image: "https://i0.statig.com.br/bancodeimagens/b5/ct/xh/b5ctxh69h2z4bcc6mihkhb6ev.jpg"
    },
    {
        id: 4,
        name: "La Ferrrari",
        year: 2013,
        km: 8000,
        price: 1499000,
        brand: "Ferrari", // NOVO
        color: "Vermelho", // NOVO
        image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=400"
    },
    {
        id: 5,
        name: "Audi A6",
        year: 2023,
        km: 18000,
        price: 142000,
        brand: "Audi", // NOVO
        color: "Cinza", // NOVO
        image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400"
    },
    {
        id: 6,
        name: "McLaren 720s",
        year: 2017,
        km: 3000,
        price: 790000,
        brand: "McLaren", // NOVO
        color: "Laranja", // NOVO
        image: "https://images.unsplash.com/photo-1542362567-b07e54358753?w=400"
    },
    {
        id: 7,
        name: "Nissan Altima",
        year: 2017,
        km: 22000,
        price: 115000,
        brand: "Nissan", // NOVO
        color: "Azul", // NOVO
        image: "https://images.unsplash.com/photo-1581540222194-0def2dda95b8?w=400"
    },
    {
        id: 13,
        name: "Toyota Corolla XEi",
        year: 2024,
        km: 6000,
        price: 135000,
        brand: "Toyota", // NOVO
        color: "Branco", // NOVO
        image: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400"
    },
    
    // Adicione outros produtos aqui, se necessário.
];

        // Objeto para armazenar filtros ativos
        const activeFilters = {};
        const modalSelections = {};

        // Referências aos inputs de busca
        const searchInput = document.getElementById('searchInput');
        const filterSearchInputSmall = document.getElementById('filterSearchInputSmall');


        // Função para formatar preço
        function formatPrice(price) {
            return price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        }

        // Função para renderizar produtos
        function renderProducts(productsToRender) {
            const productsGrid = document.getElementById('productsGrid');
            
            if (productsToRender.length === 0) {
                productsGrid.innerHTML = `
                    <div class="no-products">
                        <i class="fas fa-car no-products-icon"></i>
                        <p class="no-products-text">Nenhum produto encontrado</p>
                    </div>
                `;
                return;
            }
            
            productsGrid.innerHTML = productsToRender.map(product => {
                // Lógica mantida para redirecionar o ID 1 para 'produto.html'
                const productHref = product.id === 1 ? 'produto.html' : `#produto-${product.id}`;
                
                return `
                    <a href="${productHref}" class="product-card">
                        <div class="product-image-container">
                            <img src="${product.image}" alt="${product.name}" class="product-image">
                            <div class="product-favorite">
                                <i class="far fa-heart"></i>
                            </div>
                        </div>
                        <div class="product-info">
                            <h3 class="product-name">${product.name}</h3>
                            <div class="product-details">
                                <span class="product-detail">
                                    <i class="far fa-calendar"></i>
                                    ${product.year}
                                </span>
                                <span class="product-detail">
                                    <i class="fas fa-tachometer-alt"></i>
                                    ${product.km.toLocaleString('pt-BR')} km
                                </span>
                            </div>
                            <div class="product-price">${formatPrice(product.price)}</div>
                        </div>
                    </a>
                `;
            }).join('');

            // Adicionar evento de clique nos corações
            document.querySelectorAll('.product-favorite').forEach(favorite => {
                favorite.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    const icon = this.querySelector('i');
                    icon.classList.toggle('far');
                    icon.classList.toggle('fas');
                    this.style.background = icon.classList.contains('fas') ? '#e74c3c' : 'white';
                    this.style.color = icon.classList.contains('fas') ? 'white' : '#333';
                });
            });
        }

        // FUNÇÃO DE FILTRAGEM DE PRODUTOS PRINCIPAL
function applyFiltersToProducts() {
    let filteredProducts = products;
    
    // Captura o termo de busca dos dois campos.
    const mainSearchTerm = searchInput.value.toLowerCase();
    const filterSearchTerm = filterSearchInputSmall.value.toLowerCase();
    
    // Define o termo de busca. Prioriza o input principal (topo), senão usa o input de filtro.
    let finalSearchTerm = mainSearchTerm || filterSearchTerm; 
    
    if (finalSearchTerm) {
        // Filtra os produtos pelo nome
        filteredProducts = filteredProducts.filter(product => 
            product.name.toLowerCase().includes(finalSearchTerm)
        );
    }
    
    // --- LÓGICA DE FILTRAGEM REAL BASEADA EM activeFilters ---
    
    // Itera sobre todos os tipos de filtro ativos (ex: 'marca', 'cor')
    Object.keys(activeFilters).forEach(filterType => {
        const selectedValues = activeFilters[filterType].map(f => f.value.toLowerCase());
        
        if (selectedValues.length > 0) {
            filteredProducts = filteredProducts.filter(product => {
                // Pega o valor do produto para o tipo de filtro (ex: product['brand'])
                let productValue = product[filterType] ? product[filterType].toLowerCase() : '';
                
                switch (filterType) {
                    case 'marca':
                        // Verifica se a marca do produto está entre as selecionadas
                        return selectedValues.includes(productValue);
                        
                    case 'cor':
                        // Verifica se a cor do produto está entre as selecionadas
                        return selectedValues.includes(productValue);
                        
                    // Adicione lógica para outros filtros aqui, se houver:
                    // case 'categoria':
                    //     //...
                    //     return true; 
                        
                    default:
                        return true;
                }
            });
        }
    });

    // ---------------------------------------------------------
    
    renderProducts(filteredProducts);
}

        // EVENT LISTENER: Busca principal no topo
        if (searchInput) {
            searchInput.addEventListener('input', function() {
                applyFiltersToProducts();
            });
        }

        // EVENT LISTENER: Barra de pesquisa pequena no filtro (AGORA FILTRA PRODUTOS)
        if (filterSearchInputSmall) {
            filterSearchInputSmall.addEventListener('input', function() {
                applyFiltersToProducts();
            });
        }

        // Renderizar produtos iniciais
        renderProducts(products);


        // Carrossel de marcas
let scrollPosition = 0;
const brandsList = document.querySelector('.brands-list');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const brandsWrapper = document.querySelector('.brands-wrapper');

// 1. DUPLICAÇÃO DE ITENS PARA O LOOP
const originalBrands = Array.from(brandsList.children);
if (originalBrands.length > 0) {
    // Clona e anexa os itens
    originalBrands.forEach(item => {
        const clone = item.cloneNode(true);
        brandsList.appendChild(clone);
    });
}

// Garante que a transição de rolagem do carrossel seja suave
brandsList.style.transition = 'transform 0.3s ease-in-out';

// 2. FUNÇÃO AJUSTADA PARA CALCULAR A LARGURA EXATA DO ITEM
function getItemWidth() {
    const firstItem = brandsList.querySelector('.brand-item');
    if (firstItem) {
        const itemStyle = window.getComputedStyle(firstItem);
        const itemWidth = firstItem.offsetWidth;
        const marginX = parseFloat(itemStyle.marginLeft) + parseFloat(itemStyle.marginRight);
        return itemWidth + marginX;
    }
    return 0;
}

// Calcula quantos itens rolar (Rola de 1 em 1 item para maior controle)
const scrollStep = 1;

// 3. ATUALIZAÇÃO DA POSIÇÃO DE ROLAGEM COM LÓGICA DE LOOP
function updateScrollPosition(isInstant = false) {
    if (isInstant) {
        brandsList.style.transition = 'none';
        // Força um reflow para aplicar o 'none'
        brandsList.offsetHeight; 
    } else {
        brandsList.style.transition = 'transform 0.3s ease-in-out';
    }
    
    brandsList.style.transform = `translateX(-${scrollPosition}px)`;
}

// 4. LISTENER PARA O BOTÃO 'PRÓXIMO'
nextBtn.addEventListener('click', () => {
    const itemWidth = getItemWidth();
    if (itemWidth === 0) return;

    // A largura total que queremos ver antes de resetar (Apenas os itens originais)
    const originalContentWidth = originalBrands.length * itemWidth;

    // Move a posição
    scrollPosition += itemWidth * scrollStep;

    // Se passamos da largura original (atingimos a primeira cópia), resetamos.
    if (scrollPosition >= originalContentWidth) {
        // Teletransporte para o início da lista de cópias (que é visualmente igual ao início da lista original)
        scrollPosition = scrollPosition - originalContentWidth; 
        updateScrollPosition(true); // Faz o reset instantâneo
        
        // Aplica a rolagem real após o reset para ter a animação suave.
        requestAnimationFrame(() => {
            scrollPosition += itemWidth * scrollStep;
            updateScrollPosition(false);
        });

    } else {
        updateScrollPosition(false); // Rolagem normal com transição suave
    }
});

// 5. LISTENER PARA O BOTÃO 'ANTERIOR'
prevBtn.addEventListener('click', () => {
    const itemWidth = getItemWidth();
    if (itemWidth === 0) return;

    // A largura total que queremos ver antes de resetar (Apenas os itens originais)
    const originalContentWidth = originalBrands.length * itemWidth;
    
    // Move a posição
    scrollPosition -= itemWidth * scrollStep;

    // Se voltamos antes de zero
    if (scrollPosition < 0) {
        // Teletransporte para o final da lista de cópias (que é visualmente igual ao final da lista original)
        scrollPosition = originalContentWidth + scrollPosition;
        updateScrollPosition(true); // Faz o reset instantâneo
        
        // Aplica a rolagem real após o reset para ter a animação suave.
        requestAnimationFrame(() => {
            scrollPosition -= itemWidth * scrollStep;
            updateScrollPosition(false);
        });
    } else {
        updateScrollPosition(false); // Rolagem normal com transição suave
    }
});



// --- NOVO CÓDIGO SIMPLIFICADO ---

// Função para expandir todos os itens (Mantenha esta função como está)
function expandFilterOptions(filterType) {
    const containerId = `options${capitalize(filterType)}`;
    const optionsContainer = document.getElementById(containerId);
    if (!optionsContainer) return;

    const options = optionsContainer.querySelectorAll('.modal-option');
    
    // Mostra todos os itens ocultos
    options.forEach(option => {
        option.style.display = 'block';
    });

    // Oculta o botão "Mostrar Mais"
    const showMoreBtn = document.getElementById(`showMore${capitalize(filterType)}`);
    if (showMoreBtn) {
        showMoreBtn.style.display = 'none';
    }
}

// ----------------------------------------------------
// ⚠️ NOVO BLOCO DE INICIALIZAÇÃO: Apenas configura o clique

const showMoreMarcaBtn = document.getElementById('showMoreMarca');

if (showMoreMarcaBtn) {
    showMoreMarcaBtn.addEventListener('click', () => {
        // Quando o botão é clicado, simplesmente expande a lista de marcas
        expandFilterOptions('marca');
    });
}

// ----------------------------------------------------


// --- 3. Chamadas de Função (Event Listeners) ---

// Defina quantos itens você quer mostrar inicialmente (ex: 8)
const INITIAL_ITEM_LIMIT = 8;

// Garante que o limite seja aplicado quando o modal for aberto pela primeira vez.
// Você pode chamar isso no carregamento da página ou na função openModal.

// Chamar a função para aplicar o limite (exemplo para o filtro de Marca)
limitFilterOptions('marca', INITIAL_ITEM_LIMIT); 


if (showMoreMarcaBtn) {
    showMoreMarcaBtn.addEventListener('click', () => {
        expandFilterOptions('marca');
    });
}

// Opcional: Ajustar a posição inicial se a largura da tela mudar (responsividade)
window.addEventListener('resize', () => {
    updateScrollPosition(true); // Reseta a posição instantaneamente em caso de resize
});

// Inicia a posição
updateScrollPosition(true);

        // Sistema de Modais
        function openModal(filterType) {
            const modal = document.getElementById(`modal${capitalize(filterType)}`);
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function closeModal(modalId) {
            const modal = document.getElementById(modalId);
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }

        function capitalize(str) {
            return str.charAt(0).toUpperCase() + str.slice(1);
        }

        // Evento de clique nos botões de filtro
        document.querySelectorAll('.filter-button').forEach(button => {
            button.addEventListener('click', function() {
                const filterType = this.getAttribute('data-filter');
                openModal(filterType);
            });
        });

        // Fechar modal ao clicar fora
        document.querySelectorAll('.modal').forEach(modal => {
            modal.addEventListener('click', function(e) {
                if (e.target === this) {
                    closeModal(this.id);
                }
            });
        });

        // Seleção de opções no modal
        document.querySelectorAll('.modal-option').forEach(option => {
            option.addEventListener('click', function() {
                const modalContent = this.closest('.modal-content');
                const modalId = this.closest('.modal').id;
                const filterType = modalId.replace('modal', '').toLowerCase();
                
                // Permitir múltipla seleção
                this.classList.toggle('selected');
            });
        });

        // Busca dentro dos modais
        ['Marca', 'Categoria', 'Cor', 'Localizacao'].forEach(filterType => {
            const searchInputModal = document.getElementById(`search${filterType}`);
            if (searchInputModal) {
                searchInputModal.addEventListener('input', function() {
                    const searchTerm = this.value.toLowerCase();
                    const options = document.querySelectorAll(`#options${filterType} .modal-option`);
                    
                    options.forEach(option => {
                        const text = option.textContent.toLowerCase();
                        if (text.includes(searchTerm)) {
                            option.style.display = 'block';
                        } else {
                            option.style.display = 'none';
                        }
                    });
                });
            }
        });

        // Limpar seleção do modal
        function clearModalSelection(filterType) {
            const options = document.querySelectorAll(`#options${capitalize(filterType)} .modal-option`);
            options.forEach(option => option.classList.remove('selected'));
            modalSelections[filterType] = [];
        }

        // Aplicar filtro
        function applyFilter(filterType) {
            const options = document.querySelectorAll(`#options${capitalize(filterType)} .modal-option.selected`);
            const selectedValues = Array.from(options).map(opt => ({
                value: opt.getAttribute('data-value'),
                label: opt.textContent
            }));
            
            if (selectedValues.length > 0) {
                activeFilters[filterType] = selectedValues;
            } else {
                delete activeFilters[filterType];
            }
            
            closeModal(`modal${capitalize(filterType)}`);
            renderActiveFilters();
            applyFiltersToProducts();
        }

        // Renderizar tags de filtros ativos
        function renderActiveFilters() {
            const container = document.getElementById('activeFilters');
            container.innerHTML = '';
            
            Object.keys(activeFilters).forEach(filterType => {
                activeFilters[filterType].forEach(filter => {
                    const tag = document.createElement('div');
                    tag.className = 'filter-tag';
                    tag.innerHTML = `
                        <span>${capitalize(filterType)}: ${filter.label}</span>
                        <span class="filter-tag-close" onclick="removeFilter('${filterType}', '${filter.value}')">×</span>
                    `;
                    container.appendChild(tag);
                });
            });
        }

        // Remover filtro específico
        function removeFilter(filterType, value) {
            activeFilters[filterType] = activeFilters[filterType].filter(f => f.value !== value);
            
            if (activeFilters[filterType].length === 0) {
                delete activeFilters[filterType];
            }
            
            // Desmarcar a opção no modal
            const option = document.querySelector(`#options${capitalize(filterType)} .modal-option[data-value="${value}"]`);
            if (option) {
                option.classList.remove('selected');
            }
            
            renderActiveFilters();
            applyFiltersToProducts();
        }