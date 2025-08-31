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
    const span = langToggleBtn.querySelector('span[data-translate-key=\"langBtn\"]');
    if (span) span.textContent = btnText;
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
  const langToggleBtn = document.getElementById('langToggle');
  if (langToggleBtn) {
    langToggleBtn.addEventListener('click', () => {
      idiomaAtual = idiomaAtual === 'pt' ? 'it' : 'pt';
      console.log('Botão clicado, novo idioma:', idiomaAtual);
      carregarTraducoes(idiomaAtual);
    });
  }
  carregarTraducoes(idiomaAtual);
});