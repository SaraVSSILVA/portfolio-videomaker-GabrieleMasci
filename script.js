document.addEventListener('DOMContentLoaded', function () {
  var tabEsportes = document.getElementById('tab-esportes');
  var tabViagens = document.getElementById('tab-viagens');
  var tabButtons = document.querySelectorAll('.portfolio-tab');

  tabButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      tabButtons.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      if (btn.dataset.tab === 'esportes') {
        tabEsportes.style.display = 'block';
        tabViagens.style.display = 'none';
      } else {
        tabEsportes.style.display = 'none';
        tabViagens.style.display = 'block';
      }
    });
  });
});
document.addEventListener('DOMContentLoaded', function () {
  document
    .querySelectorAll('.youtube-facade')
    .forEach(function (facade) {
      facade.addEventListener(
        'click',
        function (e) {
          var videoId = facade.getAttribute('data-video');
          var iframe = document.createElement('iframe');
          iframe.width = '100%';
          iframe.height = '220';
          iframe.src =
            'https://www.youtube.com/embed/' +
            videoId +
            '?autoplay=1';
          iframe.title = 'YouTube video';
          iframe.frameBorder = '0';
          iframe.allowFullscreen = true;
          iframe.setAttribute('loading', 'lazy');
          facade.replaceWith(iframe);
        },
        { passive: true },
      );
    });
});
let idiomaAtual = 'it';
let traducoes = {};

function aplicarTraducoes() {
  document.querySelectorAll('[data-translate-key]').forEach(elem => {
    if (elem.classList.contains('footer-tagline')) return;
    const key = elem.getAttribute('data-translate-key');
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

  const navToggle = document.getElementById('navToggle');
  const navMenu = document.querySelector('.nav-menu');
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      navToggle.classList.toggle('open');
    });
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