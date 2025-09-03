# Portfólio Videomaker - Gabriele Masci

Site de portfólio profissional para o videomaker e operador EVS Gabriele Masci, com foco em apresentação de trabalhos, serviços, contato e atuação internacional.

## Funcionalidades

- Página inicial com apresentação
- Seção Sobre com informações detalhadas
- Portfólio dinâmico: vídeos, imagens e destaques dos principais trabalhos
- Serviços oferecidos, com cards expansíveis
- Página de contato com formulário e redes sociais
- Layout responsivo (menu hamburger, navegação fluida)
- Alternância de idioma (PT/IT)
- Imagens otimizadas (WebP, AVIF)
- Ícones sociais em SVG
- Pronto para expansão: múltiplos vídeos e serviços podem ser adicionados facilmente
- Integração com Sanity para gerenciamento de conteúdo (opcional)

## Tecnologias Utilizadas

- HTML5
- CSS3
- JavaScript
- Sanity (opcional, para conteúdo dinâmico)

## Estrutura do Projeto

```
├── index.html
├── contato.html
├── style.css
├── script.js
├── assets/
│   ├── Background.webp
│   ├── Edição.webp
│   ├── Filmagens.webp
│   ├── drone.avif
│   └── Sobre.webp
├── lang/
│   ├── pt.json
│   └── it.json
├── lib/
│   ├── queries.js
│   └── sanity.js
```

## Como executar

1. Clone o repositório
2. Abra o arquivo `index.html` em seu navegador
3. Para editar textos, traduções ou imagens, altere os arquivos correspondentes
4. Para usar Sanity, configure o backend e ajuste os arquivos em `lib/`

## Expansão e Personalização

- Para adicionar novos vídeos ou serviços, basta incluir os dados no backend (Sanity), editar diretamente no Sanity Studio ou atualizar o HTML/JSON
- O site está preparado para receber múltiplos itens automaticamente
- Para novos idiomas, adicione arquivos em `lang/`
- Layout e componentes são facilmente adaptáveis

## Sobre o desenvolvimento

Desenvolvido por Sara Silva, com foco em performance, acessibilidade e experiência do usuário. Otimizações de rede, cache, imagens e navegação garantem o melhor resultado para o cliente.

---

## Licença

Este software é de propriedade exclusiva de Gabriele Masci. Todos os direitos de uso e distribuição são reservados ao proprietário. Nenhuma parte deste código pode ser copiada, distribuída ou utilizada sem permissão expressa.

Copyright © 2025 Gabriele Masci. Todos os direitos reservados.

**Desenvolvido por Sara Silva**
