// Abas do portfólio
document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('.portfolio-tab');
  const panels = document.querySelectorAll('.portfolio-panel');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      panels.forEach(panel => {
        panel.style.display = 'none';
      });
      const target = tab.getAttribute('data-tab');
      document.getElementById('tab-' + target).style.display = 'block';
    });
  });
});
document.addEventListener('DOMContentLoaded', () => {
  let idiomaAtual = 'pt';
  let traducoes = {};

  function aplicarTraducoes() {
    document.querySelectorAll('[data-translate-key]').forEach(elem => {
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

  const langToggleBtn = document.getElementById('langToggle');
  if (langToggleBtn) {
    langToggleBtn.addEventListener('click', () => {
      idiomaAtual = idiomaAtual === 'pt' ? 'it' : 'pt';
      carregarTraducoes(idiomaAtual);
    });
  }

  carregarTraducoes(idiomaAtual);
});