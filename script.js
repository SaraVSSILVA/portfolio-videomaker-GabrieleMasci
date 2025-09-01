let idiomaAtual = 'it';
let traducoes = {};

function aplicarTraducoes() {
  document.querySelectorAll('[data-translate-key]').forEach(elem => {
    if (elem.classList.contains('footer-tagline')) return;
    const key = elem.getAttribute('data-translate-key');
    // Se for o parágrafo que contém o destaque
    if (key === 'sobreTexto4') {
      const span = elem.querySelector('.destaque');
      if (span && traducoes[key]) {
        span.textContent = traducoes[key];
      }
    } else if (elem.tagName === 'BUTTON' && traducoes[key]) {
      elem.textContent = traducoes[key];
    } else if (traducoes[key]) {
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
    const span = langToggleBtn.querySelector('span[data-translate-key="langBtn"]');
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
  window.addEventListener('scroll', function() {}, { passive: true });
  window.addEventListener('touchstart', function() {}, { passive: true });
  window.addEventListener('touchmove', function() {}, { passive: true });

  // Hamburger menu toggle
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.querySelector('.nav-menu');
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      navToggle.classList.toggle('open');
    });
    // Fecha o menu ao clicar em um link
    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        navToggle.classList.remove('open');
      });
    });
  }

  const langToggleBtn = document.getElementById('langToggle');
  if (langToggleBtn) {
    langToggleBtn.addEventListener('click', () => {
      idiomaAtual = idiomaAtual === 'it' ? 'pt' : 'it';
      carregarTraducoes(idiomaAtual);
    });
    const btnText = idiomaAtual === 'it' ? 'IT/PT' : 'PT/IT';
    const span = langToggleBtn.querySelector('span[data-translate-key="langBtn"]');
    if (span) span.textContent = btnText;
  }
  carregarTraducoes(idiomaAtual);

  const tabs = document.querySelectorAll('.portfolio-tab');
  const panels = document.querySelectorAll('.portfolio-panel');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      panels.forEach(panel => panel.style.display = 'none');
      const tabName = tab.getAttribute('data-tab');
      const panel = document.getElementById('tab-' + tabName);
      if (panel) panel.style.display = 'block';
    });
  });
});