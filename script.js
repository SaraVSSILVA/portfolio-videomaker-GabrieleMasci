document.addEventListener('DOMContentLoaded', () => {
  let idiomaAtual = 'pt';

  // Objeto com todas as traduções
  const traducoes = {
    pt: {
      "homeTitle": "Bem-vindo ao universo de Seu Nome",
      "homeSubtitle": "Videomaker e artista visual",
      "sobreTitulo": "Sobre",
      "sobreTexto": "[Texto sobre a artista]",
      "portfolioTitulo": "Portfólio",
      "vendaTitulo": "Conteúdos à Venda",
      "navHome": "Home",
      "navSobre": "Sobre",
      "navPortfolio": "Portfólio",
      "navVenda": "Conteúdos à Venda",
      "navContato": "Contato",
      "contatoTitulo": "Fale Comigo",
      "contatoDescricao": "Se você tem um projeto em mente, gostaria de colaborar ou apenas quer trocar uma ideia sobre vídeo e arte, sinta-se à vontade para entrar em contato.",
      "formTitulo": "Envie-me uma Mensagem",
      "labelNome": "Nome Completo",
      "placeholderNome": "Seu nome",
      "labelEmail": "Seu Email",
      "placeholderEmail": "seu.email@example.com",
      "labelAssunto": "Assunto",
      "placeholderAssunto": "Assunto da mensagem",
      "labelMensagem": "Mensagem",
      "placeholderMensagem": "Sua mensagem...",
      "btnEnviar": "Enviar Mensagem",
      "contatoInfoTitulo": "Outras Formas de Contato",
      "infoEmail": "Email:",
      "infoInstagram": "Instagram:",
      "infoWhatsApp": "WhatsApp:",
      "linkFaleDireto": "Fale direto",
      "copyright": "Feito com 🧡 por Stephanie Aveldano - 2025",
      "voltarTopo": "⬆️ Voltar ao topo"
    },
    it: {
      "homeTitle": "Benvenuto nell'universo di Tuo Nome",
      "homeSubtitle": "Videomaker e artista visuale",
      "sobreTitulo": "Chi sono",
      "sobreTexto": "[Testo sull'artista]",
      "portfolioTitulo": "Portfolio",
      "vendaTitulo": "Contenuti in vendita",
      "navHome": "Home",
      "navSobre": "Chi sono",
      "navPortfolio": "Portfolio",
      "navVenda": "Contenuti in vendita",
      "navContato": "Contatti",
      "contatoTitulo": "Contattami",
      "contatoDescricao": "Se hai un progetto in mente, vuoi collaborare o semplicemente scambiare idee su video e arte, sentiti libero di contattarmi.",
      "formTitulo": "Inviami un Messaggio",
      "labelNome": "Nome e Cognome",
      "placeholderNome": "Il tuo nome",
      "labelEmail": "La tua email",
      "placeholderEmail": "la.tua.email@example.com",
      "labelAssunto": "Oggetto",
      "placeholderAssunto": "Oggetto del messaggio",
      "labelMensagem": "Messaggio",
      "placeholderMensagem": "Il tuo messaggio...",
      "btnEnviar": "Invia Messaggio",
      "contatoInfoTitulo": "Altri Contatti",
      "infoEmail": "Email:",
      "infoInstagram": "Instagram:",
      "infoWhatsApp": "WhatsApp:",
      "linkFaleDireto": "Parla direttamente",
      "copyright": "Fatto con 🧡 da Stephanie Aveldano - 2025",
      "voltarTopo": "⬆️ Torna su"
    }
  };

  function aplicarTraducoes(idioma) {
    const dados = traducoes[idioma];
    if (!dados) return;

    // Traduzindo todos os elementos com data-translate-key
    document.querySelectorAll('[data-translate-key]').forEach(elem => {
      const key = elem.getAttribute('data-translate-key');
      if (dados[key]) {
        elem.textContent = dados[key];
      }
    });

    // Traduzindo placeholders
    document.querySelectorAll('[data-translate-placeholder]').forEach(elem => {
      const key = elem.getAttribute('data-translate-placeholder');
      if (dados[key]) {
        elem.placeholder = dados[key];
      }
    });
  }

  // Lógica do botão de troca de idioma
  const langToggleBtn = document.getElementById('langToggle');
  if (langToggleBtn) {
    langToggleBtn.addEventListener('click', () => {
      idiomaAtual = idiomaAtual === 'pt' ? 'it' : 'pt';
      aplicarTraducoes(idiomaAtual);
    });
  }

  // Carrega idioma padrão ao iniciar
  aplicarTraducoes(idiomaAtual);

  // Lógica do Menu Hambúrguer (só executa se os elementos existirem)
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const navbarMenu = document.getElementById('navbarMenu');

  if (hamburgerBtn && navbarMenu) {
    hamburgerBtn.addEventListener('click', () => {
      hamburgerBtn.classList.toggle('active');
      navbarMenu.classList.toggle('active');
    });

    navbarMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        if (navbarMenu.classList.contains('active')) {
          hamburgerBtn.classList.remove('active');
          navbarMenu.classList.remove('active');
        }
      });
    });
  }

  // Lógica do Formulário de orçamento (só executa se o formulário existir)
  const formOrcamento = document.getElementById('formOrcamento');
  if (formOrcamento) {
    formOrcamento.addEventListener('submit', function (e) {
      e.preventDefault();
      const nome = formOrcamento.nome.value.trim();
      const email = formOrcamento.email.value.trim();
      const servico = formOrcamento.servico.value.trim();
      const mensagem = formOrcamento.mensagem.value.trim();

      const textoMsg = `Olá, meu nome é ${nome}.\nServiço desejado: ${servico}\nMensagem: ${mensagem}\nE-mail para contato: ${email}`;

      document.getElementById('formMsg').innerHTML = `
        <b>Como deseja enviar?</b><br>
        <a href='mailto:SEUEMAIL?subject=Orçamento&body=${encodeURIComponent(textoMsg)}' target='_blank' style='margin-right:10px;'>Enviar por E-mail</a>
        <a href='https://wa.me/SEUNUMERO?text=${encodeURIComponent(textoMsg)}' target='_blank'>Enviar por WhatsApp</a>
      `;
      formOrcamento.reset();
    });
  }
});