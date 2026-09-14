# 📖 Menu recolhível responsivo em Vue

> Guia prático e reutilizável para criar menus laterais que se adaptam
> ao desktop e ao mobile.

---

## 1. 🎯 Objetivo do padrão

Um menu recolhível é uma área de navegação que muda sua apresentação para
aproveitar melhor o espaço disponível na tela.

No `desktop`, ele normalmente permanece visível e pode alternar entre:

- modo expandido: ícones e textos;
- modo recolhido: somente ícones.

No `mobile`, o menu geralmente começa fechado e aparece como um painel lateral
temporário quando a pessoa usa o botão ☰.

A intenção não é apenas estética. Esse padrão permite que a aplicação continue
fácil de navegar em telas grandes, pequenas e intermediárias.

> 💡 Este documento explica o padrão de forma genérica. Os nomes dos componentes
> podem mudar em cada projeto; as responsabilidades e o fluxo permanecem.

---
---

## 2. 🧩 Componentes e responsabilidades

Para criar esse padrão, precisamos separar a interface em responsabilidades simples.

| Elemento | Responsabilidade |
|---|---|
| Componente de layout | Guarda os estados e decide o comportamento do menu. |
| Botão ☰ | Informa que a pessoa quer abrir, fechar ou recolher o menu. |
| Componente do menu | Exibe os links e reage ao estado recebido. |
| Backdrop | Escurece o conteúdo no mobile e permite fechar o painel ao clicar fora. |
| CSS | Define a aparência de cada estado e a adaptação entre os tamanhos de tela. |

O componente de layout é o ponto central porque ele conhece a estrutura geral da
página: topo, menu, conteúdo e rodapé.

O botão e o menu não devem decidir sozinhos como a aplicação inteira ficará.
Eles apenas comunicam uma intenção ou recebem uma informação.

#### 🔑 Regra prática: 
O componente que organiza visualmente as áreas da tela deve
 controlar o estado que altera essas áreas.
 
 ---
 ---

## 3. 🔑 Estados do menu

Um mesmo botão ☰ pode ter comportamentos diferentes conforme o tamanho da tela.
Por isso, não é uma boa ideia representar tudo com uma única variável.

O padrão mais claro usa dois estados independentes:

| Estado | Tipo de tela | Significado |
|---|---|---|
| `isDesktopMenuCollapsed` | Desktop | Define se o menu está expandido ou recolhido em ícones. |
| `isMobileMenuOpen` | Mobile | Define se o painel lateral está aberto ou fechado. |

Exemplo:

```ts
const isDesktopMenuCollapsed = ref(false)
const isMobileMenuOpen = ref(false)
```

Os dois estados começam como false, mas possuem sentidos diferentes:

- isDesktopMenuCollapsed = false: menu desktop expandido;
- isDesktopMenuCollapsed = true: menu desktop recolhido;
- isMobileMenuOpen = false: painel mobile fechado;
- isMobileMenuOpen = true: painel mobile aberto.

#### ❓ Por que não usar apenas isMenuOpen?

Porque no desktop o menu não precisa abrir ou fechar: ele continua visível,apenas muda de largura. 

Já no mobile ele precisa entrar e sair da tela.

São comportamentos diferentes e devem ter estados diferentes.

---
---

## 4. ☰ Evento do botão

O botão ☰ não deve alterar diretamente o menu de outro componente.

Ele apenas comunica que foi acionado.

No componente que contém o botão:

```ts
const emit = defineEmits<{
    toggleMenu: []
}>()
```

No botão

```html
<button type="button" aria-label="Alternar menu" @click="emit('toggleMenu')">
	<i class="bi bi-list" aria-hidden="true"></i>
</button>
```

#### 🔑 O botão expressa uma intenção:

> “a pessoa quer alternar o menu”
>
> Ele não precisa conhecer as regras de desktop, mobile, CSS ou navegação

---
---

## 5. 📱 Decisão por tamanho de tela

O componente que controla o layout precisa saber se está no modo desktop ou mobile.

Podemos consultar isso com `window.matchMedia()`:

```ts
const mobileBreakpoint = window.matchMedia('(max-width: 991.98px)')
```

A expressão retorna true quando a largura atual da tela é de até 991.98px.

Esse valor combina com o breakpoint lg do Bootstrap:

Tela	Largura	Modo
Mobile e tablet	até 991.98px	menu como painel lateral
Desktop	992px ou mais	menu fixo e recolhível

Com essa informação, a função do botão decide qual estado alterar:

```ts
function toggleMenu() {
    if (mobileBreakpoint.matches) {
        isMobileMenuOpen.value = !isMobileMenuOpen.value

        return
    }

    isDesktopMenuCollapsed.value = !isDesktopMenuCollapsed.value
}
```

---
---

## 6. 🔄 Comunicação entre componentes Vue

A comunicação segue dois sentidos diferentes:

```text
Filho → pai: evento emitido com emit()
Pai → filho: dado enviado com prop
```

O botão envia um evento para o componente que controla o layout.

Depois que o estado é atualizado, esse componente envia a informação necessária
para o menu por meio de uma prop.

No componente pai:

```html
<AppMenu :is-open="isMobileMenuOpen" />
```

A sintaxe `:is-open` envia o valor da variável `isMobileMenuOpen` para a prop isOpen do componente AppMenu

No componente do menu:

```ts
const props = defineProps<{
    isOpen: boolean
}>()
```

Agora o menu pode saber se deve aparecer aberto ou fechado, mas não altera o
estado diretamente.

#### 🔑 Essa comunicação em uma única direção torna o código previsível:
- o pai controla o estado
- o filho recebe e apresenta a informação.

Sobre ref

No script, um ref é acessado pela propriedade .value:

```ts
isMobileMenuOpen.value = true
```
No template, o Vue acessa .value automaticamente:

```html
<AppMenu :is-open="isMobileMenuOpen" />
```

Por isso, .value é necessário no JavaScript/TypeScript, mas não no HTML do
componente

---
---

## 7. 🎨 Classes dinâmicas

O JavaScript não deve alterar estilos diretamente, como largura, posição ou cor.

A responsabilidade do JavaScript é alterar o estado;
 
O Vue transforma esse estado em classes CSS; 

O CSS define a aparência.

No componente de layout, podemos aplicar uma classe quando o menu desktop está
recolhido:

```html
<div class="app-layout" :class="{'app-layout--menu-collapsed':isDesktopMenuCollapsed}">
```

Quando isDesktopMenuCollapsed for true, o Vue gera:

```html
<nav class="app-menu":class="{'app-menu--open': props.isOpen}">
```

Quando for **false**, a classe adicional não existe.

No menu mobile, o mesmo princípio pode ser usado:

```html
<nav class="app-menu":class="{'app-menu--open':props.isOpen}">
```

| Estado            | Classe aplicada              | Efeito definido no CSS               |
| ----------------- | ---------------------------- | ------------------------------------ |
| Desktop recolhido | `app-layout--menu-collapsed` | reduz a largura e oculta textos      |
| Mobile aberto     | `app-menu--open`             | desloca o painel para dentro da tela |

>💡 O Vue não “desenha” o menu recolhido. 
>
>Ele apenas adiciona ou remove classes.
>
>O CSS é quem determina o resultado visual de cada classe.

---
---

## 8. 🧱 CSS do menu desktop

No desktop, o menu continua visível. A mudança ocorre na largura: ele deixa de
mostrar textos e passa a exibir apenas ícones.

Variáveis CSS evitam repetir valores em vários seletores:

```css
:root {
    --layout-sidebar-width: 16rem;
    --layout-sidebar-collapsed-width: 4.5rem;
}
```

> 🔑 Variáveis CSS sempre começam com dois hífens: --.
>
> Elas podem ser reutilizadas com var(...).

O layout usa a variável para definir a coluna lateral:

```css
.app-top-bar,
.app-layout__workspace {
    grid-template-columns: var(--layout-sidebar-width) minmax(0, 1fr);
}
```

Quando o Vue adiciona a classe de menu recolhido, o CSS substitui somente o
valor da variável:

```css
.app-layout--menu-collapsed {
    --layout-sidebar-width: var(--layout-sidebar-collapsed-width);
}
```

Como o topo e a área de trabalho usam a mesma variável, ambos permanecem
alinhados automaticamente.

Para ocultar os textos e manter os ícones centralizados:

```css
.app-layout--menu-collapsed .app-menu__label {
    display: none;
}

.app-layout--menu-collapsed .app-menu__item {
    justify-content: center;
}
```

>💡 A classe não altera cada componente individualmente. 
>
>Ela redefine uma variável no contêiner do layout, e os elementos internos se adaptam a ela.
>
>Esse é um padrão simples, escalável e fácil de manter.

---
---

## 9. 📲 CSS do menu mobile

No mobile, o menu não deve ocupar espaço permanente na tela. Ele se torna um
painel lateral temporário, que aparece sobre o conteúdo.

Essa mudança fica dentro de uma *media query*:

```css
@media (max-width: 991.98px) {
    .app-menu {
        display: block;
        position: fixed;
        top: var(--layout-top-bar-height);
        bottom: 0;
        left: 0;
        width: min(18rem, 85vw);
        transform: translateX(-100%);
        transition: transform 0.2s ease;
    }

    .app-menu--open {
        transform: translateX(0);
    }
}
```

| Regra                     | Função                                                                    |
| ------------------------- | ------------------------------------------------------------------------- |
| `position: fixed`         | mantém o painel preso à janela, sobre o conteúdo                          |
| `top` e `bottom`          | faz o painel ocupar a altura abaixo da barra superior                     |
| `width: min(18rem, 85vw)` | limita a largura em telas grandes e evita ocupar toda a tela em celulares |
| `translateX(-100%)`       | deixa o painel totalmente fora da tela, à esquerda                        |
| `translateX(0)`           | traz o painel para sua posição visível                                    |
| `transition`              | cria o movimento suave entre fechado e aberto                             |

>💡 O menu não é removido do HTML quando está fechado. 
>
>Ele apenas fica fora da área visível da tela. 
>
>Isso permite que a transição de abertura funcione.

---
---

## 10. 🌑 Backdrop e camadas

Quando o menu mobile abre, o conteúdo ao fundo continua visível. O *backdrop* é
a camada semitransparente que fica entre o conteúdo e o menu.

Ele possui duas funções:

- indicar que o foco atual está no menu;
- permitir o fechamento ao clicar fora do painel.

No componente de layout:

```html
<button
    v-if="isMobileMenuOpen"
    class="app-menu-backdrop"
    type="button"
    aria-label="Fechar menu"
    @click="isMobileMenuOpen = false"
/>
```
v-if cria o elemento somente enquanto o menu estiver aberto. Ao fechar o
menu, o backdrop deixa de existir no HTML.

No CSS:

```css
.app-menu-backdrop {
    position: fixed;
    top: var(--layout-top-bar-height);
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 900;
    border: 0;
    background: rgb(0 0 0 / 25%);
}

.app-menu {
    z-index: 1000;
}
```

A ordem das camadas é:

1. AppContent e AppFooter — z-index: auto
2. app-menu-backdrop      — z-index: 900
3. app-menu               — z-index: 1000

>⚠️ O menu precisa ter z-index maior que o backdrop. 
>
>Caso contrário, a camada escura ficará sobre o painel e impedirá a pessoa de usar os links.

>💡 O top do backdrop começa abaixo da barra superior. 
>
>Assim, o botão ☰ continua acessível mesmo enquanto o menu está aberto.

---
---

## 11. ♿ Acessibilidade e experiência de uso

O botão ☰ deve ser um elemento `button`, e não uma `div` ou um ícone clicável.
Isso permite que ele seja usado por teclado e interpretado corretamente por
leitores de tela.

Exemplo:

```html
<button type="button" class="menu-toggle-button" aria-label="Alternar menu principal" aria-controls="main-navigation" @click="toggleMenu">
    <i class="bi bi-list" aria-hidden="true"></i>
</button>
```

| Atributo             | Função                                                 |
| -------------------- | ------------------------------------------------------ |
| `type="button"`      | evita que o botão envie um formulário por acidente     |
| `aria-label`         | fornece uma descrição para leitores de tela            |
| `aria-controls`      | informa qual elemento é controlado pelo botão          |
| `aria-hidden="true"` | evita que o ícone decorativo seja anunciado duas vezes |

O menu correspondente precisa ter o mesmo id informado em aria-controls:

```html
<nav id="main-navigation" class="app-menu">
    <!-- links do menu -->
</nav>
```

Também é importante manter um foco visível. Não remova o outline do botão
sem oferecer outro indicador visual equivalente.

>⚠️ Um ícone sozinho não explica sua função para todas as pessoas. 
>
>O aria-label transforma o botão ☰ em um controle compreensível.

> 💡 Como evolução futura, o menu mobile pode fechar quando a pessoa pressiona
a tecla Esc e pode mover o foco para o primeiro link ao abrir.

---
---

## 12. ⚠️ Erros comuns

### Usar um único estado para desktop e mobile

```ts
const isMenuOpen = ref(false)
```
Esse nome parece suficiente, mas mistura dois comportamentos diferentes:
recolher uma barra fixa no desktop e abrir um painel no mobile.

Melhor: usar estados independentes para cada comportamento.

Ocultar o painel mobile com  `display: none`

```css
.app-menu {
    display: none;
}
```

Quando o elemento está com display: none, ele não consegue executar uma
transição de entrada ou saída.

Melhor: manter o painel disponível e movê-lo para fora da tela:

```css
.app-menu {
    transform: translateX(-100%);
}

.app-menu--open {
    transform: translateX(0);
}
```

Alterar estilos diretamente no JavaScript

```ts
menuElement.style.width = '4.5rem'
```

Isso mistura regra de interface com regra de comportamento, dificulta a
manutenção e espalha valores visuais pelo código.

Melhor: alterar um estado, aplicar uma classe dinâmica e deixar o CSS
definir a aparência.

Deixar o backdrop acima do menu

```css
.app-menu-backdrop {
    z-index: 1000;
}

.app-menu {
    z-index: 900;
}
```

Nesse caso, a camada escura bloqueia os cliques nos links do menu.

Melhor: o menu deve ter um z-index maior que o backdrop.

Usar valores diferentes para o breakpoint

Se o JavaScript usa 991.98px, mas o CSS usa outro valor, os dois podem entrar
em modos diferentes ao mesmo tempo.

>🔑 Defina um breakpoint único e use o mesmo valor no CSS e no `window.matchMedia()`.

---
---

## 13. ✅ Roteiro para construir do zero

Siga esta ordem ao criar um menu recolhível em um novo projeto Vue:

1. Defina o breakpoint que separa desktop e mobile.
2. Monte o layout estático: topo, menu, conteúdo e rodapé.
3. Crie os dois estados com `ref()`:
   - estado de menu recolhido no desktop;
   - estado de menu aberto no mobile.
4. Crie a função única que verifica a tela e alterna o estado correto.
5. Conecte o botão ☰ ao componente que controla o layout usando `emit`.
6. Envie o estado mobile ao componente de menu usando uma `prop`.
7. Crie as classes dinâmicas no template.
8. Implemente primeiro o CSS do menu desktop recolhido.
9. Implemente a `media query` e o painel lateral mobile.
10. Adicione o `backdrop` e teste o fechamento ao clicar fora.
11. Inclua atributos de acessibilidade no botão e no menu.
12. Teste o comportamento nos dois modos de tela.

> 💡 Construa primeiro a estrutura visual estática. 
>
> Depois acrescente os estados e, por último, as animações e os detalhes visuais. 
>
> Tentar fazer tudo ao mesmo tempo costuma dificultar a identificação de erros.

---
---

## 14. 📋 Checklist final

Antes de considerar o menu pronto, valide:

- [ ] O botão ☰ funciona em desktop e mobile.
- [ ] No desktop, o menu alterna entre expandido e recolhido.
- [ ] No desktop, os ícones continuam visíveis e os textos são ocultados.
- [ ] O topo e o menu lateral permanecem alinhados após o recolhimento.
- [ ] No mobile, o menu inicia fechado.
- [ ] No mobile, o painel desliza pela lateral sem deslocar o conteúdo.
- [ ] O painel possui largura adequada em telas pequenas.
- [ ] O `backdrop` aparece somente quando o menu mobile está aberto.
- [ ] Clicar no `backdrop` fecha o menu.
- [ ] O menu fica acima do `backdrop`.
- [ ] A barra superior permanece acessível no mobile.
- [ ] O botão possui `type="button"` e `aria-label`.
- [ ] O menu pode ser usado por teclado.
- [ ] O breakpoint usado no CSS é o mesmo usado no JavaScript.
- [ ] O comportamento foi testado em larguras desktop e mobile.

> ✅ Se todos os itens estiverem corretos, o padrão está pronto para ser
> reutilizado e adaptado a outros projetos Vue.

















































































