let idiomaAtual = 'pt';
let traducoes = {};

function aplicarTraducoes() {
  document.querySelectorAll('[data-translate-key]').forEach(elem => {
    if (elem.classList.contains('footer-tagline')) return;
    const key = elem.getAttribute('data-translate-key');
    if (traducoes[key]) {
      elem.textContent = traducoes[key];
    }
  });
  document.querySelectorAll('[data-translate-placeholder]').forEach(elem => {
    const key = elem.getAttribute('data-translate-placeholder');
    if (traducoes[key]) {
      elem.placeholder = traducoes[key];
    }
  });
  const langToggleBtn = document.getElementById('langToggle');
  if (langToggleBtn) {
    const btnText = idiomaAtual === 'pt' ? 'PT/IT' : 'IT/PT';
    langToggleBtn.textContent = btnText;
  }
  console.log('Idioma aplicado:', idiomaAtual);
}

async function carregarTraducoes(idioma) {
  try {
    const response = await fetch(`lang/${idioma}.json`);
    if (!response.ok) throw new Error('Erro ao carregar traduções');
    traducoes = await response.json();
    aplicarTraducoes();
  } catch (e) {
    console.error('Falha ao carregar traduções:', e);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // Tradução
  const langToggleBtn = document.getElementById('langToggle');
  if (langToggleBtn) {
    langToggleBtn.addEventListener('click', () => {
      idiomaAtual = idiomaAtual === 'pt' ? 'it' : 'pt';
      carregarTraducoes(idiomaAtual);
    });
    // Inicializa o texto do botão corretamente
    const btnText = idiomaAtual === 'pt' ? 'PT/IT' : 'IT/PT';
    langToggleBtn.textContent = btnText;
  }
  carregarTraducoes(idiomaAtual);

  // Portfólio Tabs
  const tabs = document.querySelectorAll('.portfolio-tab');
  const panels = document.querySelectorAll('.portfolio-panel');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Remove active de todos os tabs
      tabs.forEach(t => t.classList.remove('active'));
      // Adiciona active ao tab clicado
      tab.classList.add('active');
      // Esconde todos os painéis
      panels.forEach(panel => panel.style.display = 'none');
      // Mostra o painel correspondente
      const tabName = tab.getAttribute('data-tab');
      const panel = document.getElementById('tab-' + tabName);
      if (panel) panel.style.display = 'block';
    });
  });
});