const opcoesPorCategoria = {
            'conta': ["Esqueci minha senha", "Alterar e-mail", "Excluir minha conta", "Histórico de atividades", "Problema no login"],
            'produtos': ["Acompanhar minha venda", "Como comprar", "Agendar visita", "Taxas e financiamento", "Documentação"],
            'outras': [] 
        };

        let isAnimating = false;

        function selectOption(clickedCard, categoria) {
            if (isAnimating || clickedCard.classList.contains('selected')) return;

            const specArea = document.getElementById('specification-area');
            const isAlreadyOpen = specArea.classList.contains('show');

            if (isAlreadyOpen) {
                isAnimating = true; 
                specArea.classList.remove('show');
                setTimeout(() => {
                    atualizarVisualCard(clickedCard);
                    atualizarTags(categoria);
                    specArea.classList.add('show');
                    isAnimating = false; 
                }, 500); 
            } else {
                atualizarVisualCard(clickedCard);
                atualizarTags(categoria);
                specArea.classList.add('show');
                setTimeout(() => {
                    specArea.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 100);
            }
        }

        function atualizarVisualCard(cardParaSelecionar) {
            const allCards = document.querySelectorAll('.option-card');
            allCards.forEach(card => card.classList.remove('selected'));
            cardParaSelecionar.classList.add('selected');
        }

        function atualizarTags(categoria) {
            const container = document.getElementById('tags-container');
            const label = document.getElementById('tags-label');
            container.innerHTML = '';

            const novasTags = opcoesPorCategoria[categoria];

            if (!novasTags || novasTags.length === 0) {
                label.style.display = 'none';
                return;
            }

            label.style.display = 'block';
            novasTags.forEach(texto => {
                const btn = document.createElement('button');
                btn.className = 'tag-option';
                btn.innerText = texto;
                btn.onclick = function() { toggleTag(this) };
                container.appendChild(btn);
            });
        }

        function toggleTag(tagElement) {
            tagElement.classList.toggle('active');
        }

        function enviarSolicitacao() {
            const textarea = document.querySelector('textarea');
            // Simulação de envio
            alert("Sua solicitação foi enviada com sucesso! Em breve entraremos em contato.");

            // Reset
            textarea.value = '';
            document.querySelectorAll('.tag-option.active').forEach(tag => tag.classList.remove('active'));
            document.getElementById('specification-area').classList.remove('show');
            document.querySelectorAll('.option-card.selected').forEach(card => card.classList.remove('selected'));
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }