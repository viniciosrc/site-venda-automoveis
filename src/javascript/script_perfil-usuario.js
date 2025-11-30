// Dados dos veículos (simulação de dados)
        let vehicles = [
            {
                id: 1,
                name: "Honda Sedan 2007",
                status: "Em avaliação",
                statusClass: "status-avaliacao",
                year: 2007,
                km: 150000,
                price: 25000,
                image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=200"
            },
            {
                id: 2,
                name: "Honda Sedan 2007",
                status: "Negado",
                statusClass: "status-negado",
                year: 2007,
                km: 180000,
                price: 23000,
                image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=200"
            }
        ];

        let currentEditingVehicle = null;

        // Salvar dados do usuário
        function saveUserData() {
            const name = document.getElementById('userName').value;
            const phone = document.getElementById('userPhone').value;
            const email = document.getElementById('userEmail').value;

            // Aqui você faria a requisição para o backend
            console.log('Salvando dados:', { name, phone, email });

            // Mostrar mensagem de sucesso
            const successMsg = document.getElementById('successMessage');
            successMsg.classList.add('show');
            setTimeout(() => {
                successMsg.classList.remove('show');
            }, 3000);
        }

        // Modal de senha
        function openPasswordModal() {
            document.getElementById('passwordModal').classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function closePasswordModal() {
            document.getElementById('passwordModal').classList.remove('active');
            document.body.style.overflow = 'auto';
            // Limpar campos
            document.getElementById('currentPassword').value = '';
            document.getElementById('newPassword').value = '';
            document.getElementById('confirmPassword').value = '';
        }

        function changePassword() {
            const current = document.getElementById('currentPassword').value;
            const newPass = document.getElementById('newPassword').value;
            const confirm = document.getElementById('confirmPassword').value;

            if (!current || !newPass || !confirm) {
                alert('Por favor, preencha todos os campos');
                return;
            }

            if (newPass !== confirm) {
                alert('As senhas não coincidem');
                return;
            }

            if (newPass.length < 6) {
                alert('A senha deve ter pelo menos 6 caracteres');
                return;
            }

            // Aqui você faria a requisição para o backend
            console.log('Alterando senha...');
            
            closePasswordModal();
            
            const successMsg = document.getElementById('successMessage');
            successMsg.textContent = 'Senha alterada com sucesso!';
            successMsg.classList.add('show');
            setTimeout(() => {
                successMsg.classList.remove('show');
                successMsg.textContent = 'Dados salvos com sucesso!';
            }, 3000);
        }

        // Modal de deletar conta
        function openDeleteModal() {
            document.getElementById('deleteModal').classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function closeDeleteModal() {
            document.getElementById('deleteModal').classList.remove('active');
            document.body.style.overflow = 'auto';
            document.getElementById('deletePassword').value = '';
        }

        function deleteAccount() {
            const password = document.getElementById('deletePassword').value;

            if (!password) {
                alert('Por favor, digite sua senha para confirmar');
                return;
            }

            if (confirm('Tem certeza absoluta que deseja deletar sua conta? Esta ação não pode ser desfeita.')) {
                // Aqui você faria a requisição para o backend
                console.log('Deletando conta...');
                alert('Conta deletada com sucesso. Você será redirecionado para a página inicial.');
                // window.location.href = 'home.html';
            }
        }

        // Editar veículo
        function editVehicle(vehicleId) {
            currentEditingVehicle = vehicles.find(v => v.id === vehicleId);
            
            if (currentEditingVehicle) {
                document.getElementById('vehicleName').value = currentEditingVehicle.name;
                document.getElementById('vehicleYear').value = currentEditingVehicle.year;
                document.getElementById('vehicleKm').value = currentEditingVehicle.km;
                document.getElementById('vehiclePrice').value = currentEditingVehicle.price;
                
                document.getElementById('editVehicleModal').classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        }

        function closeEditVehicleModal() {
            document.getElementById('editVehicleModal').classList.remove('active');
            document.body.style.overflow = 'auto';
            currentEditingVehicle = null;
        }

        function saveVehicleChanges() {
            if (!currentEditingVehicle) return;

            const name = document.getElementById('vehicleName').value;
            const year = document.getElementById('vehicleYear').value;
            const km = document.getElementById('vehicleKm').value;
            const price = document.getElementById('vehiclePrice').value;

            if (!name || !year || !km || !price) {
                alert('Por favor, preencha todos os campos');
                return;
            }

            // Atualizar dados do veículo
            currentEditingVehicle.name = name;
            currentEditingVehicle.year = year;
            currentEditingVehicle.km = km;
            currentEditingVehicle.price = price;

            // Aqui você faria a requisição para o backend
            console.log('Salvando alterações do veículo:', currentEditingVehicle);

            // Recarregar lista de veículos
            renderVehicles();
            
            closeEditVehicleModal();

            const successMsg = document.getElementById('successMessage');
            successMsg.textContent = 'Veículo atualizado com sucesso!';
            successMsg.classList.add('show');
            setTimeout(() => {
                successMsg.classList.remove('show');
                successMsg.textContent = 'Dados salvos com sucesso!';
            }, 3000);
        }

        // Renderizar veículos
        function renderVehicles() {
            const vehiclesList = document.getElementById('vehiclesList');
            
            if (vehicles.length === 0) {
                vehiclesList.innerHTML = '';
                document.querySelector('.no-vehicles').style.display = 'block';
                return;
            }

            document.querySelector('.no-vehicles').style.display = 'none';
            
            vehiclesList.innerHTML = vehicles.map(vehicle => `
                <div class="vehicle-card">
                    <img src="${vehicle.image}" alt="${vehicle.name}" class="vehicle-image">
                    <div class="vehicle-info">
                        <div class="vehicle-name">${vehicle.name}</div>
                        <div class="vehicle-status ${vehicle.statusClass}">${vehicle.status}</div>
                    </div>
                    <button class="btn-edit" onclick="editVehicle(${vehicle.id})">Editar</button>
                </div>
            `).join('');
        }

        // Fechar modais ao clicar fora
        document.querySelectorAll('.modal').forEach(modal => {
            modal.addEventListener('click', function(e) {
                if (e.target === this) {
                    this.classList.remove('active');
                    document.body.style.overflow = 'auto';
                }
            });
        });

        // Máscara de telefone
        document.getElementById('userPhone').addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 13) value = value.slice(0, 13);
            
            if (value.length >= 11) {
                value = value.replace(/^(\d{2})(\d{2})(\d{5})(\d{4}).*/, '+$1 ($2) $3-$4');
            } else if (value.length >= 6) {
                value = value.replace(/^(\d{2})(\d{2})(\d{0,5})/, '+$1 ($2) $3');
            } else if (value.length >= 4) {
                value = value.replace(/^(\d{2})(\d{0,2})/, '+$1 ($2)');
            } else if (value.length >= 2) {
                value = value.replace(/^(\d{0,2})/, '+$1');
            }
            
            e.target.value = value;
        });