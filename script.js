import { fetchSanity } from './lib/sanity.js';
import { homeQuery, serviceQuery, portfolioQuery, contactQuery, sobreQuery } from './lib/queries.js';

document.addEventListener('DOMContentLoaded', async () => {
  let idiomaAtual = 'it'; // ou 'pt' se preferir português como padrão
  let traducoes = {};
  let portfolioData = []; 
  let servicosData = [];

  // ------------------ Traduções ------------------
  async function carregarTraducoes(idioma) {
    try {
      const res = await fetch(`lang/${idioma}.json`);
      if (!res.ok) throw new Error('Erro ao carregar traduções');
      traducoes = await res.json();
      aplicarTraducoes();
    } catch (e) {
      console.error('Falha ao carregar traduções:', e);
    }
  }

  function aplicarTraducoes() {
    document.querySelectorAll('[data-translate-key]').forEach(elem => {
      const key = elem.getAttribute('data-translate-key');
      if (traducoes[key]) elem.textContent = traducoes[key];
    });
    document.querySelectorAll('[data-translate-placeholder]').forEach(elem => {
      const key = elem.getAttribute('data-translate-placeholder');
      if (traducoes[key]) elem.placeholder = traducoes[key];
    });
    const span = document.querySelector('#langToggle span[data-translate-key="langBtn"]');
    if (span) span.textContent = idiomaAtual === 'pt' ? 'PT/IT' : 'IT/PT';
  }

  // ------------------ Helpers ------------------
  function extractYouTubeID(url) {
    if (!url) return '';
    const patterns = [
      /youtu\.be\/([^?&]+)/,
      /youtube\.com\/watch\?v=([^?&]+)/,
      /youtube\.com\/embed\/([^?&]+)/,
      /v=([^&]+)/
    ];
    for (const p of patterns) {
      const m = url.match(p);
      if (m && m[1]) return m[1];
    }
    return '';
  }

  function splitDescAndContrib(rawText = '') {
    const re = /([\s\S]*?)(?:Contributo:|Contribuição:)\s*([\s\S]*)/i;
    const m = rawText.match(re);
    if (m) {
      return {
        desc: m[1].trim(),
        contrib: m[2].trim()
      };
    }
    return { desc: rawText.trim(), contrib: '' };
  }

  function stripLabelPrefix(text) {
    return text.replace(/^\s*(?:Descrizione:|Descrição:)\s*/i, '').trim();
  }

  // ------------------ Render Portfólio ------------------
  function renderPortfolio(lang = 'pt') {
    const gridEsportes = document.getElementById('portfolio-grid-esportes');
    const gridViagens = document.getElementById('portfolio-grid-viagens');
    if (!gridEsportes || !gridViagens) return;

    gridEsportes.innerHTML = '';
    gridViagens.innerHTML = '';

    const template = document.getElementById('portfolio-card-template');
    if (!template) return;

    portfolioData.forEach(item => {
      const clone = template.content.cloneNode(true);

      // Thumbnail
      const thumb = clone.querySelector('.thumb');
      if (thumb) {
        thumb.src = item.thumbnailUrl || '';
        thumb.alt = (lang === 'it' ? item.title_it : item.title_pt) || '';
      }

      // Título multilíngue
      const titleEl = clone.querySelector('.portfolio-title');
      if (titleEl) {
        titleEl.textContent = (lang === 'it')
          ? (item.title_it || item.title_pt || '')
          : (item.title_pt || item.title_it || '');
      }

      // Descrição + Contribuição
      const descField = (lang === 'it') 
        ? (item.description_it || item.description_pt) 
        : (item.description_pt || item.description_it);

      const { desc, contrib } = splitDescAndContrib(descField || '');
      const cleanedDesc = stripLabelPrefix(desc);

      const descEl = clone.querySelector('.portfolio-description');
      if (descEl) descEl.textContent = cleanedDesc || '';

      const contribEl = clone.querySelector('.portfolio-contrib');
      if (contribEl) {
        if (contrib) {
          const label = (lang === 'it') ? 'Contributo:' : 'Contribuição:';
          contribEl.textContent = `${label} ${contrib}`.trim();
          contribEl.style.display = '';
        } else {
          contribEl.textContent = '';
          contribEl.style.display = 'none';
        }
      }

      // YouTube facade
      const facade = clone.querySelector('.youtube-facade');
      const videoId = item.videoId || extractYouTubeID(item.videoUrl || '');
      if (facade) {
        facade.setAttribute('data-video', videoId || '');
        facade.addEventListener('click', () => {
          if (!videoId) return;
          const iframe = document.createElement('iframe');
          iframe.width = '100%';
          iframe.height = '220';
          iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
          iframe.title = titleEl.textContent || 'YouTube video';
          iframe.frameBorder = '0';
          iframe.allowFullscreen = true;
          iframe.setAttribute('loading', 'lazy');
          facade.replaceWith(iframe);
        });
      }

      const cat = (item.categoria || '').toLowerCase();
      const container = (cat === 'viagens' || cat === 'viaggi') ? gridViagens : gridEsportes;
      if (container) container.appendChild(clone);
    });
  }

  // ------------------ Render Serviços ------------------
  function renderServicos(lang = 'pt') {
  const servicosGrid = document.getElementById('servicos-grid');
  if (!servicosGrid) return;

  servicosGrid.innerHTML = '';
  const templateSvc = document.getElementById('servico-card-template');
  if (!templateSvc) return;

  servicosData.forEach(item => {
    const clone = templateSvc.content.cloneNode(true);

    // Imagem
    const img = clone.querySelector('.servico-img');
    if (img) img.src = item.image || '';

    // Título
    const title = clone.querySelector('.portfolio-title');
    if (title) {
      title.textContent = (lang === 'it')
        ? (item.title_it || item.title_pt || '')
        : (item.title_pt || item.title_it || '');
    }

    // Descrição
    const desc = clone.querySelector('.portfolio-contrib');
    if (desc) {
      desc.textContent = (lang === 'it')
        ? (item.description_it || item.description_pt || '')
        : (item.description_pt || item.description_it || '');
    }

    // Botão "Solicitar Orçamento"
    const btnOrcamento = clone.querySelector('[data-translate-key="btn_solicitar_orcamento-cta"]');
    if (btnOrcamento && traducoes['btn_solicitar_orcamento-cta']) {
      btnOrcamento.textContent = traducoes['btn_solicitar_orcamento-cta'];
    }

    // Adiciona o clone já traduzido ao DOM
    servicosGrid.appendChild(clone);
  });
}


  // ------------------ Fetch Sanity ------------------
  try {
    const [home, sobre, portfolio, servicos, contact] = await Promise.all([
      fetchSanity(homeQuery),
      fetchSanity(sobreQuery),
      fetchSanity(portfolioQuery),
      fetchSanity(serviceQuery),
      fetchSanity(contactQuery),
    ]);

    portfolioData = Array.isArray(portfolio) ? portfolio : [];
    servicosData = Array.isArray(servicos) ? servicos : [];

    // Sobre
    if (sobre) {
      const sobreImg = document.querySelector('.sobre-photo');
      if (sobreImg && sobre.imagem) sobreImg.src = sobre.imagem;

      const sobreTitulo = document.querySelector('[data-translate-key="sobreTitulo"]');
      if (sobreTitulo) {
        sobreTitulo.textContent = (idiomaAtual === 'it')
          ? (sobre.titulo_it || sobre.titulo_pt || '')
          : (sobre.titulo_pt || sobre.titulo_it || '');
      }

      for (let i = 1; i <= 4; i++) {
        const p = document.querySelector(`[data-translate-key="sobreTexto${i}"]`);
        if (p) {
          p.textContent = (idiomaAtual === 'it')
            ? (sobre[`texto${i}_it`] || sobre[`texto${i}_pt`] || '')
            : (sobre[`texto${i}_pt`] || sobre[`texto${i}_it`] || '');
        }
      }
    }

    // Renderiza conteúdo inicial
    renderPortfolio(idiomaAtual);
    renderServicos(idiomaAtual);

    if (contact) {
      const footerEmail = document.querySelector('.footer-email');
      if (footerEmail) footerEmail.href = `mailto:${contact.email || ''}`;
    }

  } catch (err) {
    console.error('Erro ao carregar dados do Sanity:', err);
  }

  // ------------------ Tabs Portfólio ------------------
  const tabButtons = document.querySelectorAll('.portfolio-tab');
  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      tabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const tabEsportes = document.getElementById('tab-esportes');
      const tabViagens = document.getElementById('tab-viagens');

      if (btn.dataset.tab === 'esportes') {
        if (tabEsportes) tabEsportes.style.display = 'block';
        if (tabViagens) tabViagens.style.display = 'none';
      } else {
        if (tabEsportes) tabEsportes.style.display = 'none';
        if (tabViagens) tabViagens.style.display = 'block';
      }
    });
  });

  // ------------------ Nav & Lang Toggle ------------------
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
      renderPortfolio(idiomaAtual);
      renderServicos(idiomaAtual);
    });
  }

  carregarTraducoes(idiomaAtual);
});
