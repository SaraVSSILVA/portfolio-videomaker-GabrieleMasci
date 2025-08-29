document.addEventListener('DOMContentLoaded', () => {
  let idiomaAtual = 'pt';

  // Objeto com todas as traduções
  const traducoes = {
    pt: {
      "homeTitle": "Gabriele Masci",
      "homeSubtitle": "Videomaker e artista visual",
      "sobreTitulo": "Sobre",
  "sobreTexto": "Olá, eu sou o Gabriele, Videomaker e Operador EVS no setor televisivo. Sou italiano e passo o meu ano entre o Brasil e a Itália. A minha experiência me permite permear diversos ambientes realizando um trabalho de qualidade, desde conteúdos de viagens e imóveis (Airbnb, Booking, venda e aluguel), até o setor televisivo de esportes. Também sou operador certificado de drones. Produzo conteúdos em vídeo de alta qualidade, tanto tradicionais quanto dinâmicos, adaptáveis a diferentes necessidades de produção.",
      "portfolioTitulo": "Portfólio",
  "servicosTitulo": "Serviços",
      "navHome": "Home",
      "navSobre": "Sobre",
      "navPortfolio": "Portfólio",
  "navServicos": "Serviços",
      "navContato": "Contato",
      "contatoTitulo": "Fale Comigo",
      "contatoDescricao": "Se você tem um projeto em mente, gostaria de colaborar ou apenas quer trocar uma ideia sobre vídeo e arte, sinta-se à vontade para entrar em contato.",
      "formTitulo": "Envie-me uma Mensagem",
  "addCarrinho": "Adicionar ao carrinho",
  "emBreve": "Em breve",
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
      "copyright": "Gabriele Masci - 2025",
      "voltarTopo": "⬆️ Voltar ao topo"
    },
    it: {
      "homeTitle": "Benvenuto nell'universo di Tuo Nome",
      "homeSubtitle": "Videomaker e artista visuale",
      "sobreTitulo": "Chi sono",
  "sobreTexto": "Ciao, sono Gabriele, Videomaker e Operatore EVS nel settore televisivo. Sono italiano e passo l'anno tra il Brasile e l'Italia. La mia esperienza mi permette di lavorare in diversi ambienti, realizzando lavori di qualità: dai contenuti di viaggio e immobiliari (Airbnb, Booking, vendita e affitto) fino al settore televisivo sportivo. Sono anche operatore certificato di droni. Produco video di alta qualità, sia tradizionali che dinamici, adattabili a diverse esigenze di produzione.",
      "portfolioTitulo": "Portfolio",
  "servicosTitulo": "Servizi",
      "navHome": "Home",
      "navSobre": "Chi sono",
      "navPortfolio": "Portfolio",
  "navServicos": "Servizi",
      "navContato": "Contatti",
      "contatoTitulo": "Contattami",
  "addCarrinho": "Aggiungi al carrello",
  "emBreve": "Presto disponibile",
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
      "copyright": " Gabriele Masci - 2025",
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