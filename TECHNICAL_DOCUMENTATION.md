# Documentação Técnica - Portfólio Videomaker Gabriele Masci

## Visão Geral

Este projeto é um site de portfólio profissional, responsivo e expansível, desenvolvido para o videomaker Gabriele Masci. O objetivo é apresentar vídeos, serviços, informações e contato, com possibilidade de expansão futura via CMS (Sanity).

---

## Estrutura de Pastas

```
portfolio-videomaker-GabrieleMasci/
├── index.html                # Página principal
├── contato.html              # Página de contato
├── style.css                 # Estilos globais e responsivos
├── script.js                 # Lógica de interação e renderização
├── assets/                   # Imagens e mídias do site
│   ├── Background.webp
│   ├── drone.avif
│   ├── Edição.webp
│   ├── Filmagens.webp
│   └── Sobre.webp
├── lang/                     # Traduções PT/IT
│   ├── pt.json
│   └── it.json
├── lib/                      # Integração com Sanity
│   ├── queries.js
│   └── sanity.js
```

---

## HTML

- **index.html**: Estrutura principal, seções Home, Sobre, Portfólio, Serviços, Footer.
- **Templates**: Uso de `<template>` para cards dinâmicos de portfólio e serviços.
- **Acessibilidade**: Uso de roles, aria-labels e navegação por teclado.

## CSS

- **style.css**: Estilos globais, responsividade, gradientes, cards, navbar fixa, animações.
- **Classes especiais**: `.destaque` para textos em gradiente, `.portfolio-contrib` para contribuição em itálico e dourado.
- **Grid**: Cards de portfólio e serviços usam grid responsivo.

## JavaScript

- **script.js**: Renderização dinâmica dos cards a partir de dados (JSON ou Sanity), alternância de idioma, navegação responsiva.
- **Templates**: Clonagem de `<template>` para cada item do portfólio/serviço.
- **Sanity**: Funções em `lib/sanity.js` e `lib/queries.js` para buscar dados dinâmicos.

---

## Internacionalização

- **lang/pt.json** e **lang/it.json**: Textos traduzidos para português e italiano.
- **Alternância**: Botão de idioma alterna textos e navegação.

---

## Expansão de Conteúdo

- **Vídeos e Serviços**: O site está pronto para receber múltiplos itens. Basta adicionar no backend (Sanity) ou atualizar os arquivos JSON/HTML.
- **Sanity Schema**: Defina campos como arrays de objetos para vídeos e serviços. Exemplo:

```js
{
  name: 'videos',
  type: 'array',
  of: [{
    type: 'object',
    fields: [
      { name: 'title', type: 'string' },
      { name: 'videoId', type: 'string' },
      { name: 'thumbnailUrl', type: 'url' },
      { name: 'description', type: 'text' },
      { name: 'contrib', type: 'string' }
    ]
  }]
}
```

- **Frontend**: O JS percorre todos os itens e renderiza automaticamente.

---

## Como Adicionar Novos Itens

1. **Via Sanity**: Adicione vídeos/serviços no Studio, eles aparecerão automaticamente no site.
2. **Via JSON/HTML**: Atualize os arquivos de dados ou o HTML conforme a estrutura dos templates.
3. **Imagens**: Adicione na pasta `assets/` e referencie nos dados.

---

## Responsividade

- Layout adaptado para desktop, tablet e mobile.
- Navbar fixa no topo.
- Menu hamburger em telas pequenas.
- Grid de cards se ajusta ao tamanho da tela.

---

## Acessibilidade

- Uso de roles, aria-labels, navegação por teclado.
- Contraste de cores e fontes legíveis.

---

## Integração com Sanity

- **lib/sanity.js**: Configuração do cliente Sanity.
- **lib/queries.js**: Consultas para buscar vídeos, serviços, textos.
- **Expansão**: Para novos campos, basta atualizar o schema e as queries.

---

## Boas Práticas para Expansão

- Sempre usar arrays para vídeos e serviços.
- Manter templates genéricos e dinâmicos.
- Separar dados de apresentação (usar JSON ou CMS).
- Documentar novos campos e funcionalidades.

---

## Licença

Este software é de propriedade exclusiva de Gabriele Masci. Todos os direitos de uso e distribuição são reservados ao proprietário.

---

## Contato do Desenvolvedor

Sara Silva

---

## Observações Finais

- O projeto está pronto para crescer: basta adicionar novos itens no backend ou nos arquivos de dados.
- Para novas funcionalidades, siga o padrão de templates e grids já existente.
- Para dúvidas técnicas, consulte este guia ou entre em contato com o desenvolvedor.
