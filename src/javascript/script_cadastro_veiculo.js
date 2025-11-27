const carBrands = [
            'Chevrolet', 'Volkswagen', 'Fiat', 'Ford', 'Renault', 'Toyota', 'Hyundai', 'Jeep', 'Honda', 'Nissan',
            'Mercedes-Benz', 'BMW', 'Audi', 'Volvo', 'Land Rover', 'Citroën', 'Peugeot', 'Kia', 'Mitsubishi', 'Subaru',
            'Lexus', 'Porsche', 'Ferrari', 'Lamborghini', 'Maserati', 'Rolls-Royce', 'Jaguar', 'Mini', 'Smart', 'Chery',
            'JAC Motors', 'Effa', 'Suzuki', 'Dodge', 'Chrysler', 'Caminhonete', 'RAM', 'Lifan', 'Shineray', 'BYD', 'GWM',
            'Tesla', 'McLaren', 'Bugatti', 'Acura', 'Infiniti', 'Geely', 'Troller', 'Iveco', 'Sinotruk', 'Outra'
        ];

        const motoBrands = [
            'Honda', 'Yamaha', 'Suzuki', 'Kawasaki', 'BMW', 'Ducati', 'Harley-Davidson', 'Triumph', 'KTM', 'Royal Enfield',
            'Indian', 'Aprilia', 'Moto Guzzi', 'Vespa', 'Shineray', 'Dafra', 'Haojue', 'Sundown', 'Traxx', 'Green',
            'Kasinski', 'Bull', 'Mottu', 'Muuv', 'Zero Motorcycles', 'Energica', 'Husqvarna', 'GasGas', 'Sherco', 'Beta',
            'Piaggio', 'Peugeot Scooters', 'Can-Am', 'Polaris', 'CFMOTO', 'Loncin', 'Zongshen', 'Benelli', 'MV Agusta', 'Cagiva',
            'Megelli', 'TVS', 'Bajaj', 'Hero', 'KYMCO', 'SYM', 'Fantic', 'Montesa', 'Rieju', 'Outra'
        ];

        function showStep(stepId) {
            document.querySelectorAll('.form-section').forEach(section => {
                section.classList.add('hidden-step');
                section.classList.remove('current-step');
            });
            document.getElementById(stepId).classList.remove('hidden-step');
            document.getElementById(stepId).classList.add('current-step');
        }

        function nextStep(nextStepId) {
            if (nextStepId === 'step3') {
                const marca = document.getElementById('tipo_automovel').value;
                const modeloInput = document.getElementById('modelo');
                
                if (marca) {
                    modeloInput.placeholder = `Modelo do(a) ${marca}`;
                } else {
                    modeloInput.placeholder = 'Digite o modelo do veículo';
                }
            }
            showStep(nextStepId);
        }

        function prevStep(prevStepId) {
            showStep(prevStepId);
        }

        function updateMarcaDropdown(isCar) {
            const dataList = document.getElementById('marca-list');
            dataList.innerHTML = '';
            const brands = isCar ? carBrands : motoBrands;
            brands.forEach(brand => {
                const option = document.createElement('option');
                option.value = brand;
                dataList.appendChild(option);
            });

            const label = document.querySelector('.form-group.large-input label');
            const input = document.getElementById('tipo_automovel');
            
            label.textContent = isCar ? 'Qual a marca do automóvel?' : 'Qual a marca da motocicleta?';
            input.placeholder = 'Digite ou Clique aqui duas vezes para ativar a Sugestões de marcas';
            input.value = ''; 
        }

        function selectCategory(isCar) {
            const car = document.getElementById('car-category');
            const moto = document.getElementById('moto-category');

            if (isCar) {
                car.classList.add('active-category');
                moto.classList.remove('active-category');
            } else {
                moto.classList.add('active-category');
                car.classList.remove('active-category');
            }
            updateMarcaDropdown(isCar);
        }

        function goToStepPhotos() {
            showStep('step6-fotos');
        }

        function formatFileSize(bytes) {
            if (bytes === 0) return '0 Bytes';
            const k = 1024;
            const sizes = ['Bytes', 'KB', 'MB', 'GB'];
            const i = Math.floor(Math.log(bytes) / Math.log(k));
            return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
        }
        
        function removeFile(element) {
            const listItem = element.closest('li');
            const listContainer = listItem.closest('div[id^="uploaded-files-list"]');
            const fileName = listItem.querySelector('.text-truncate').textContent;
            
            let inputId;
            if (listContainer.id.includes('step2')) {
                inputId = 'photo-upload';
            } else if (listContainer.id.includes('step6')) {
                inputId = 'photo-upload-extra';
            }

            if (inputId) {
                const input = document.getElementById(inputId);
                const dataTransfer = new DataTransfer();
                
                Array.from(input.files)
                    .filter(file => file.name !== fileName)
                    .forEach(file => dataTransfer.items.add(file));

                input.files = dataTransfer.files;
                
                listItem.remove();
                
                if (listContainer.querySelector('ul') && listContainer.querySelector('ul').children.length === 0) {
                    listContainer.innerHTML = '';
                }
            }
        }

        function displayFileNames(inputId, listId) {
            const input = document.getElementById(inputId);
            const listContainer = document.getElementById(listId);
            listContainer.innerHTML = '';

            if (input.files.length > 0) {
                const ul = document.createElement('ul');
                ul.classList.add('list-group', 'list-group-flush', 'border', 'rounded');

                Array.from(input.files).forEach(file => {
                    const li = document.createElement('li');
                    li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center', 'bg-light', 'py-2');
                    
                    const fileNameContainer = document.createElement('div');
                    fileNameContainer.classList.add('d-flex', 'align-items-center');

                    const fileNameSpan = document.createElement('span');
                    fileNameSpan.classList.add('text-truncate');
                    fileNameSpan.textContent = file.name;

                    const fileSizeSpan = document.createElement('small');
                    fileSizeSpan.classList.add('text-muted', 'ms-3');
                    fileSizeSpan.textContent = `(${formatFileSize(file.size)})`;

                    fileNameContainer.appendChild(fileNameSpan);
                    fileNameContainer.appendChild(fileSizeSpan);
                    li.appendChild(fileNameContainer);
                    
                    const removeButton = document.createElement('button');
                    removeButton.type = 'button';
                    removeButton.classList.add('btn', 'btn-sm', 'btn-danger', 'ms-2');
                    removeButton.innerHTML = '<i class="fas fa-times"></i>'; 
                    removeButton.onclick = function() { removeFile(this); };

                    li.appendChild(removeButton);
                    ul.appendChild(li);
                });

                listContainer.appendChild(ul);
            }
        }

        function getFormData() {
            const form = document.getElementById('vehicle-form');
            const formData = {};

            const fields = [
                'tipo_automovel', 'modelo', 'ano_modelo', 'ano_fabricacao', 'quilometragem',
                'combustivel', 'cambio', 'portas', 'placa', 'categoria', 'motorizacao',
                'tracao', 'consumo_medio', 'potencia', 'potencia_unidade', 'preco',
                'forma_pagamento', 'cidade_localizacao', 'descricao_anuncio', 'status_anuncio',
                'tags', 'consumo_medio_extra'
            ];

            fields.forEach(id => {
                const element = form.elements[id];
                if (element) {
                    formData[id] = element.value;
                }
            });

            const radioFields = ['procedencia', 'termo_solar', 'condicao'];
            radioFields.forEach(name => {
                const checkedRadio = form.querySelector(`input[name="${name}"]:checked`);
                if (checkedRadio) {
                    formData[name] = checkedRadio.value;
                }
            });

            const checkboxes = form.querySelectorAll('input[name="opcional"]:checked');
            formData['opcionais'] = Array.from(checkboxes).map(cb => {
                const labelElement = cb.closest('.form-check').querySelector('.form-check-label');
                return labelElement ? labelElement.textContent.trim() : cb.value;
            });
            
            const isCar = document.getElementById('car-category').classList.contains('active-category');
            formData['tipo_veiculo'] = isCar ? 'Carro' : 'Moto';

            return formData;
        }

        function formatPreviewContent(data) {
            const statusText = data.status_anuncio === 'rascunho' ? 'Ativo' : (data.status_anuncio === 'ativo' ? 'Inativo' : '-');
            const condicaoText = data.condicao === 'novo' ? 'Novo' : (data.condicao === 'usado' ? 'Usado' : '-');
            const procedenciaText = data.procedencia === 'nacional' ? 'Nacional' : (data.procedencia === 'importada' ? 'Importada' : '-');
            const termoSolarText = data.termo_solar === 'sim' ? 'Sim' : (data.termo_solar === 'nao' ? 'Não' : '-');
            const precoFormatado = data.preco ? parseFloat(data.preco).toLocaleString('pt-BR', {minimumFractionDigits: 2, style: 'currency', currency: 'BRL'}) : '-';
            const kmFormatada = data.quilometragem ? parseInt(data.quilometragem).toLocaleString('pt-BR') + ' km' : '-';
            const potenciaFormatada = data.potencia ? data.potencia + ' ' + (data.potencia_unidade.toUpperCase() || '') : '-';


            return `
                <div class="col-md-6">
                    <div class="card h-100 border-start border-4 border-warning bg-light">
                        <div class="card-body">
                            <h5 class="card-title text-primary">Gerais</h5>
                            <p class="card-text mb-1"><strong>Tipo de Veículo:</strong> ${data.tipo_veiculo || '-'}</p>
                            <p class="card-text mb-1"><strong>Marca:</strong> ${data.tipo_automovel || '-'}</p>
                            <p class="card-text mb-1"><strong>Preço:</strong> ${precoFormatado}</p>
                            <p class="card-text mb-1"><strong>Localização:</strong> ${data.cidade_localizacao || '-'}</p>
                            <p class="card-text mb-1"><strong>Status:</strong> ${statusText}</p>
                        </div>
                    </div>
                </div>
                
                <div class="col-md-6">
                    <div class="card h-100 border-start border-4 border-warning bg-light">
                        <div class="card-body">
                            <h5 class="card-title text-primary">Veículo</h5>
                            <p class="card-text mb-1"><strong>Modelo:</strong> ${data.modelo || '-'}</p>
                            <p class="card-text mb-1"><strong>Ano Mod/Fab:</strong> ${data.ano_modelo || '-'} / ${data.ano_fabricacao || '-'}</p>
                            <p class="card-text mb-1"><strong>Quilometragem:</strong> ${kmFormatada}</p>
                            <p class="card-text mb-1"><strong>Placa:</strong> ${data.placa || '-'}</p>
                            <p class="card-text mb-1"><strong>Portas:</strong> ${data.portas || '-'}</p>
                            <p class="card-text mb-1"><strong>Categoria:</strong> ${data.categoria || '-'}</p>
                        </div>
                    </div>
                </div>
                
                <div class="col-md-12">
                    <div class="card border-start border-4 border-warning bg-light">
                        <div class="card-body">
                            <h5 class="card-title text-primary">Técnicos</h5>
                            <div class="row">
                                <div class="col-md-6">
                                    <p class="card-text mb-1"><strong>Câmbio:</strong> ${data.cambio || '-'}</p>
                                    <p class="card-text mb-1"><strong>Combustível:</strong> ${data.combustivel || '-'}</p>
                                    <p class="card-text mb-1"><strong>Potência:</strong> ${potenciaFormatada}</p>
                                    <p class="card-text mb-1"><strong>Motorização:</strong> ${data.motorizacao || '-'}</p>
                                </div>
                                <div class="col-md-6">
                                    <p class="card-text mb-1"><strong>Tração:</strong> ${data.tracao || '-'}</p>
                                    <p class="card-text mb-1"><strong>Consumo Médio:</strong> ${data.consumo_medio || data.consumo_medio_extra || '-'}</p>
                                    <p class="card-text mb-1"><strong>Condição:</strong> ${condicaoText}</p>
                                    <p class="card-text mb-1"><strong>Procedência:</strong> ${procedenciaText}</p>
                                    <p class="card-text mb-1"><strong>Termo Solar:</strong> ${termoSolarText}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-md-12">
                    <div class="card border-start border-4 border-warning bg-light">
                        <div class="card-body">
                            <h5 class="card-title text-primary">Opcionais</h5>
                            <p class="card-text">${data.opcionais && data.opcionais.length > 0 ? data.opcionais.join(' | ') : 'Nenhum opcional selecionado'}</p>
                        </div>
                    </div>
                </div>
                
                <div class="col-md-12">
                    <div class="card border-start border-4 border-warning bg-light">
                        <div class="card-body">
                            <h5 class="card-title text-primary">Descrição e Venda</h5>
                            <p class="card-text"><strong>Descrição:</strong></p>
                            <div class="description-box p-3 bg-white border rounded">
                                ${data.descricao_anuncio || 'Nenhuma descrição fornecida.'}
                            </div>
                            <p class="card-text mt-3 mb-1"><strong>Forma de Pagamento:</strong> ${data.forma_pagamento || '-'}</p>
                            <p class="card-text mb-1"><strong>Tags:</strong> ${data.tags || '-'}</p>
                        </div>
                    </div>
                </div>
            `;
        }

        function previewAd() {
            const data = getFormData();
            const previewHtml = formatPreviewContent(data);
            
            const previewContainer = document.getElementById('preview-content');
            previewContainer.innerHTML = previewHtml;

            showStep('step7');
        }


        document.addEventListener('DOMContentLoaded', () => {
            showStep('step1');
            selectCategory(true); 
        });

        function redirecionarParaHome() {
    // Redireciona o navegador para a página home.html
    window.location.href = "home.html";
}