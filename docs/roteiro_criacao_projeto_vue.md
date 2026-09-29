# 📖 Como construir e entender este projeto Vue

> Um guia prático para entender como a aplicação atual foi organizada e como
> recriar cada parte do zero.

## 🎯 Pergunta central do guia

> **Se eu fosse construir esta parte do zero, por onde começo e por quê?**

Cada tópico responderá essa pergunta usando os arquivos reais deste projeto.

## 🧩 Premissas

Este guia parte das seguintes condições:

- o ambiente de desenvolvimento já está configurado e pronto para uso;
- o foco é somente a aplicação frontend em Vue.js;
- não será desenvolvido backend;
- a estrutura de pastas, arquivos, componentes, páginas e códigos deste projeto
  será usada como exemplo;
- cada parte do código será explicada pelo que faz, por que existe e onde se
  encaixa na aplicação.

## 🧭 Ordem de estudo

1. Visão geral da estrutura atual do projeto.
2. Ponto de entrada da aplicação.
3. Componente raiz.
4. Layout e seus componentes.
5. CSS do layout e responsividade.
6. Rotas, páginas e navegação.
7. Menu configurável e submenus.
8. Tipagens e contratos de dados.
9. Comunicação HTTP, Axios e services.
10. Tela de produtos e fluxo completo dos dados.

---

# 1. 🔍 Visão geral da estrutura atual do projeto

Antes de ler qualquer código, precisamos enxergar a aplicação como um conjunto de
partes com responsabilidades diferentes.

Não é necessário decorar todos os arquivos. O importante é saber:

- onde cada tipo de código fica;
- qual problema aquele grupo de arquivos resolve;
- qual é o caminho percorrido desde a abertura da aplicação até a exibição dos dados.

## 🗂️ Estrutura principal

```text
src/
│
├── assets/
│   └── styles/
│       └── app-layout.css
│
├── components/
│   ├── layout/
│   │   ├── AppLayout.vue
│   │   ├── AppTopBar.vue
│   │   ├── AppMenu.vue
│   │   ├── AppMenuItem.vue
│   │   ├── AppContent.vue
│   │   ├── AppFooter.vue
│   │   ├── TopBarSistema.vue
│   │   └── TopBarUsuario.vue
│   │
│   └── mensagem/
│       └── MensagemProduto.vue
│
├── config/
│   └── menu.ts
│
├── constants/
│   └── constants.ts
│
├── infra/
│   └── http/
│       ├── HttpClient.ts
│       └── AxiosHttpClient.ts
│
├── interfaces/
│   └── arquivos de tipagem
│
├── router/
│   └── index.ts
│
├── services/
│   └── ProductService.ts
│
├── views/
│   ├── LayoutPreviewView.vue
│   └── ProdutoListagemView.vue
│
├── App.vue
└── main.ts
```

## 🧩 Responsabilidade de cada área

| Área             | Responsabilidade                                                          |
| ---------------- | ------------------------------------------------------------------------- |
| `main.ts`        | Inicia a aplicação Vue no navegador.                                      |
| `App.vue`        | É o componente raiz; conecta a aplicação ao layout principal.             |
| `components/`    | Guarda partes reutilizáveis da interface, como menu, topo e rodapé.       |
| `views/`         | Guarda páginas completas associadas a rotas, como a listagem de produtos. |
| `router/`        | Define qual página será exibida para cada URL.                            |
| `interfaces/`    | Define os formatos esperados dos dados com TypeScript.                    |
| `services/`      | Concentra regras para buscar e preparar dados, como produtos.             |
| `infra/http/`    | Cuida da comunicação técnica com APIs por HTTP.                           |
| `config/`        | Guarda configurações estruturadas, como os itens do menu.                 |
| `constants/`     | Guarda valores fixos reutilizados em mais de um ponto.                    |
| `assets/styles/` | Guarda estilos globais, como as regras do layout.                         |

## 🔄 Caminho geral da aplicação

```text
Pessoa abre uma URL no navegador
        ↓
main.ts inicia o Vue
        ↓
App.vue é carregado
        ↓
AppLayout.vue monta a estrutura visual fixa
        ↓
AppContent.vue contém o RouterView
        ↓
router/index.ts escolhe a View da URL atual
        ↓
A View exibe a página correspondente
        ↓
Quando a página precisa de dados: View → Service → HTTP → API
```
> 💡
> 
> A separação existe para evitar que um único arquivo concentre layout,
navegação, regras de negócio, chamadas HTTP e tratamento de dados ao mesmo
tempo.


# 2. 🚀 Ponto de entrada da aplicação: `main.ts`

## Antes do `main.ts`: `index.html`

O navegador abre primeiro o arquivo `index.html`.

Ele não contém toda a interface do sistema. 

Sua função é oferecer o ponto onde a aplicação Vue será exibida e informar qual arquivo deve iniciar o Vue.

### Partes importantes

```html
<div id="app"></div>

<script type="module" src="/src/main.ts"></script>
```

| Código                                               | Responsabilidade                                     |
| ---------------------------------------------------- | ---------------------------------------------------- |
| `<div id="app"></div>`                               | Espaço da página onde o Vue renderizará a aplicação. |
| `<script type="module" src="/src/main.ts"></script>` | Carrega o arquivo que inicia a aplicação Vue.        |

### Fluxo inicial
```
Navegador abre index.html
↓
Carrega src/main.ts
↓
O Vue é iniciado
↓
A aplicação é exibida dentro de <div id="app"></div>
```

index.html não cria o menu, as páginas ou os produtos. 

Ele apenas inicia esse fluxo.

O arquivo `main.ts` é executado quando a aplicação Vue é aberta no navegador.

Ele não cria a tela de produtos, o menu ou o layout.

Sua responsabilidade é preparar a aplicação e conectá-la ao elemento HTML onde o Vue será renderizado.

## 🎯 Por onde começar

Ao criar uma aplicação Vue com Vite, o `main.ts` já é criado pelo template.

A primeira pergunta é:

> Qual componente representa a aplicação inteira?

Neste projeto, a resposta é `App.vue`.

```ts
import App from './App.vue'
```
> 💡 
>
> Esse import traz o componente raiz para que o Vue consiga usá-lo como ponto inicial da interface.

## 🧩 Código atual

```ts
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import './assets/styles/app-layout.css'

import { createApp } from 'vue'
import { router } from './router'
import App from './App.vue'

const app = createApp(App)

app.use(router)

app.mount('#app')
```

## 🔄 Fluxo de inicialização

```
Navegador abre a aplicação
        ↓
main.ts é executado
        ↓
createApp(App) cria a aplicação Vue
        ↓
app.use(router) registra as rotas
        ↓
app.mount('#app') exibe a aplicação no HTML
```

Guarde essa idéia

> 💡
> 
> Agora, antes de explicar cada linha, guarde esta ideia:
>
> - `main.ts` é o **inicializador**;
> - `App.vue` é o **componente raiz**;
> - `router` permite trocar páginas sem recarregar o navegador;
> - `#app` é o local do `index.html` onde o Vue aparece.

## 🎨 Imports globais de estilo e comportamento

```ts
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import './assets/styles/app-layout.css'
```
Esses imports são feitos uma única vez no main.ts porque seus efeitos precisam
estar disponíveis para toda a aplicação.

| Import                    | O que disponibiliza                                                               | Por que está no `main.ts`                                                               |
| ------------------------- | --------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| `bootstrap.min.css`       | Classes visuais do Bootstrap, como `container`, `row`, `btn` e `d-flex`.          | Todas as páginas e componentes podem usar essas classes.                                |
| `bootstrap-icons.css`     | Ícones com classes como `bi bi-house` e `bi bi-box-seam`.                         | O menu e outros componentes podem usar ícones sem importar um arquivo em cada um deles. |
| `bootstrap.bundle.min.js` | Comportamentos JavaScript do Bootstrap, como modal, dropdown, collapse e tooltip. | Permite usar componentes interativos do Bootstrap quando necessário.                    |
| `app-layout.css`          | Regras próprias do projeto: grid, menu, cabeçalho, rodapé e responsividade.       | O layout é compartilhado por toda a aplicação.                                          |

> 🔑 Um import de CSS não cria uma tela. 
>
>Ele apenas torna regras de estilo disponíveis para os elementos que usam as respectivas classes.


## 📌 Por que não importar o Bootstrap em cada componente?

Se AppMenu.vue, ProdutoListagemView.vue e outros componentes importassem o
Bootstrap individualmente, o projeto teria repetição e ficaria mais difícil de
manter.

O main.ts é um lugar adequado para estilos realmente globais:

```
main.ts
   ↓
Bootstrap e estilos globais são carregados uma vez
   ↓
Todos os componentes podem utilizar essas regras
```
Já estilos exclusivos de um componente podem ficar no próprio arquivo .vue,
dentro de uma seção `<style>`.

## 🏗️ Criando a aplicação Vue

```ts
import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)
```

A função `createApp()` cria uma instância da aplicação Vue.

Neste projeto, ela recebe App, que é o componente raiz:

```
App.vue
   ↓
createApp(App)
   ↓
Instância da aplicação armazenada em app

```
A variável app representa a aplicação já criada, mas ainda não exibida no
navegador.

## 🔍 Entendendo cada parte
import { createApp } from 'vue'

createApp é uma função fornecida pelo próprio Vue.

As chaves indicam que estamos importando uma exportação nomeada da biblioteca:

```ts
import { createApp } from 'vue'
```
Ela é diferente de um componente criado por nós.

```ts
import App from './App.vue'
```

Esse import traz o arquivo App.vue.

O caminho ./ significa “na mesma pasta do arquivo atual”. Como main.ts e
App.vue estão dentro de src, o caminho é:

```
src/
├── main.ts
└── App.vue
```

App.vue é o componente que ficará no topo da árvore de componentes.

```ts
const app = createApp(App)
```
Aqui o Vue recebe o componente raiz e cria a aplicação:
```ts
const app = createApp(App)
```
A variável recebe o nome app por convenção, mas poderia ter outro nome:
```ts
const aplicacao = createApp(App)
```

O comportamento seria o mesmo.

> 🔑 Criar a aplicação não significa mostrá-la na tela. 
>
>Para isso, ainda falta registrar recursos, como o router, e montar a aplicação no elemento #app.

## 🧭 Registrando o router

```ts
import { router } from './router'

app.use(router)

```
O router é responsável por associar uma URL a uma página Vue.

No projeto atual:

```
URL: /
        ↓
LayoutPreviewView.vue

URL: /produtos
        ↓
ProdutoListagemView.vue
```
O arquivo src/router/index.ts contém essas associações.

## 🔌 O que faz app.use(router)

`app.use()` registra um recurso na aplicação Vue.

Neste caso, ele registra o Vue Router para que os componentes possam usar
recursos como:

- `<RouterView />`, que exibe a página correspondente à URL;
- `<RouterLink />`, que navega sem recarregar a página inteira;
- `useRouter()`e useRoute(), quando um componente precisa controlar ou ler a rota atual.

```
const app = createApp(App)
        ↓
app.use(router)
        ↓
A aplicação passa a reconhecer rotas e recursos do Vue Router
```

> 🔑 O router deve ser registrado antes de montar a aplicação. 
>
> Caso contrário,componentes como `RouterView` e `RouterLink` não saberiam qual router utilizar.

## 📌 Por que o router não fica dentro de App.vue?

Porque App.vue usa a navegação, mas não deve criar nem configurar esse recurso.

A divisão de responsabilidades é:

```
main.ts
└── cria a aplicação e registra o router

router/index.ts
  └── define as URLs e as páginas

App.vue e componentes
  └── utilizam os recursos de navegação já registrados
```

## 📌 Montando a aplicação no HTML

```ts
app.mount('#app')
```

`mount()` conecta a aplicação Vue a um elemento existente no arquivo index.html.

O seletor #app significa: **procure o elemento que possui id="app”**.

No index.html, existe um ponto de montagem semelhante a este:

```html
<div id="app"></div>
```
**index.html** possui:

```
<div id="app"></div>
        ↓
main.ts executa:
app.mount('#app')
        ↓
Vue renderiza App.vue dentro dessa div
        ↓
App.vue renderiza os demais componentes
```

## 🔍 O que o Vue substitui?

Depois de `app.mount('#app')`, o Vue controla o conteúdo interno dela.

```html
<div id="app">
    <!-- interface criada pelo Vue -->
</div>
```

> 🔑 O Vue não substitui o index.html inteiro. 
>
> Ele controla somente o elemento indicado no `mount()` e tudo que for renderizado dentro dele.

## ✅ Resumo do main.ts
1. Carrega estilos globais e recursos do Bootstrap.
2. Importa o componente raiz: App.vue.
3. Cria a aplicação: createApp(App).
4. Registra o router: app.use(router).
5. Exibe a aplicação no HTML: app.mount('#app').

---

# 3. 🏠 Componente raiz: `App.vue`

```html
<template>
    <AppLayout />
</template>

<script setup lang="ts">
    import AppLayout from '@/components/layout/AppLayout.vue';
</script>
```
`App.vue` é o componente raiz da interface.

No `main.ts`, o Vue recebe este componente:

```ts
const app = createApp(App)
```
Depois que a aplicação é montada no elemento #app, o Vue renderiza o conteúdo de `App.vue`.

## 📋 Responsabilidade neste projeto

Neste projeto, App.vue não possui menu, cabeçalho, rodapé, rotas ou regras de produtos.

Ele tem uma responsabilidade simples:

``` 
App.vue
    ↓
renderiza AppLayout.vue
    ↓
AppLayout organiza toda a estrutura visual da aplicação
```
Essa escolha é boa porque evita transformar App.vue em um arquivo grande que concentra responsabilidades demais

## 🔍 Entendendo o código

**Import do componente**

```ts
import AppLayout from '@/components/layout/AppLayout.vue';
```

Essa linha traz o componente AppLayout.vue para dentro de App.vue.

O símbolo `@` é um atalho para a pasta src.

Portanto, este caminho:

`@/components/layout/AppLayout.vue`

Significa:

`src/components/layout/AppLayout.vue`

Renderização no template

```html
<template>
    <AppLayout />
</template>
```

O bloco `<template>` descreve o HTML que o componente renderiza.

`<AppLayout />` usa o componente que foi importado no bloco `<script setup>`.

```
App.vue
    ↓
<AppLayout />
    ↓
AppLayout.vue é renderizado
```

## 🧱 Por onde começar esta parte

Para chegar ao App.vue atual, primeiro precisamos ter criado `AppLayout.vue`.

```
1. Criar AppLayout.vue
        ↓
2. Importar AppLayout em App.vue
        ↓
3. Renderizar <AppLayout />
```
> 💡
> 
> App.vue é a porta de entrada da interface. 
>
> Ele delega a construção visual para AppLayout.vue.

---

# 4. 🖥️ Layout principal: `AppLayout.vue`

## 📋 Responsabilidade

O `AppLayout.vue` organiza a estrutura visual comum da aplicação.

Ele define onde ficam:
- topo;
- menu;
- área principal de conteúdo;
- rodapé.

Ele não precisa conter toda a implementação dessas partes. 

Sua função é reunir os componentes responsáveis por cada uma delas.

## ⚙️ Componentes utilizados

```ts
import AppContent from './AppContent.vue'
import AppFooter from './AppFooter.vue'
import AppMenu from './AppMenu.vue'
import AppTopBar from './AppTopBar.vue'
```
O ./ significa que os arquivos estão na mesma pasta de AppLayout.vue: `src/components/layout/`

| Componente   | Responsabilidade                                    |
| ------------ | --------------------------------------------------- |
| `AppTopBar`  | Representa o topo da aplicação.                     |
| `AppMenu`    | Representa o menu de navegação.                     |
| `AppContent` | Representa a área onde a página atual será exibida. |
| `AppFooter`  | Representa o rodapé.                                |

> 💡
> 
> AppLayout.vue importa esses componentes porque ele decide onde cada um aparecerá na estrutura geral da tela.

## 📐 Início da estrutura visual

No início do `<template>`, temos:

```html
<div class="app-layout" :class="{ 'app-layout--menu-collapsed': isDesktopMenuCollapsed }" >
    <AppTopBar @toggle-menu="toggleMenu" />
```
A `<div class="app-layout">` é o contêiner principal de todo o layout.

Dentro dela, o primeiro componente exibido é:

```html
<AppTopBar />
```
> 💡
> 
> Ele representa o topo da aplicação.
> 
> O trecho `:class` e o evento `@toggle-menu` estão relacionados ao comportamento de recolher ou abrir o menu. 

A estrutura inicial:

```
AppLayout
└── AppTopBar
```

## 🖥️ Área de trabalho do layout

Depois do topo, o `AppLayout` organiza o menu e a coluna principal:

```html
<div class="app-layout__workspace">
    <AppMenu :is-open="isMobileMenuOpen" @navigate="closeMobileMenu" />
    <div class="app-layout__main-column">
        <AppContent />
        <AppFooter />
    </div>
</div>
```
A estrutura é:

```
AppLayout
├── AppTopBar
└── Área de trabalho
    ├── AppMenu
    └── Coluna principal
        ├── AppContent
        └── AppFooter
```

| Componente   | Função dentro do layout |
| ------------ | ----------------------- |
| `AppMenu`    | Exibe o menu lateral.   |
| `AppContent` | Exibe a página atual.   |
| `AppFooter`  | Exibe o rodapé.         |

> 💡
> 
> A div com a classe app-layout__main-column agrupa o conteúdo e o rodapé na mesma coluna, à direita do menu.
> 
> Os trechos `:is-open`e `@navigate` tratam o comportamento do menu em telas menores. 

## 🖐️ Fundo de fechamento do menu mobile

Entre o topo e a área de trabalho existe este botão:

```html
<button 
    v-if="isMobileMenuOpen"  @click="closeMobileMenu" class="app-menu-backdrop" type="button" aria-label="Fechar menu" >
</button>
```

Esse botão é o fundo escurecido que aparece atrás do menu quando ele é aberto em telas menores.

Ele não possui texto porque sua função é apenas permitir que a pessoa clique fora do menu para fechá-lo.

| Trecho                      | Responsabilidade                                        |
| --------------------------- | ------------------------------------------------------- |
| `v-if="isMobileMenuOpen"`   | Exibe o fundo somente quando o menu mobile está aberto. |
| `@click="closeMobileMenu"`  | Fecha o menu quando o fundo é clicado.                  |
| `class="app-menu-backdrop"` | Aplica o estilo visual do fundo.                        |

> ⚠️ Atenção
>
> A variável `isMobileMenuOpen` e a função `closeMobileMenu` serão explicadas na parte de lógica do AppLayout.vue.

## 🧠 Lógica do layout

No início do bloco `<script setup>`, existe este import:

```ts
import { ref } from 'vue'
```

A `ref` é uma função do Vue usada para criar valores que podem mudar enquanto a aplicação está sendo usada.

No `AppLayout.vue`, ela será usada para controlar, por exemplo:

- se o menu mobile está aberto;
- se o menu desktop está recolhido.

Quando um desses valores muda, o Vue atualiza a interface que depende dele.

## 🏷️ Identificação de tela mobile

```ts
const mobileBreakpoint = window.matchMedia('(max-width: 991.98px)')
```

Essa linha pergunta ao navegador se a tela atual possui, no máximo, `991.98px` de largura.

Quando a condição for verdadeira, o projeto considera que está no modo `mobile`.

O resultado fica guardado em `mobileBreakpoint`. 

Depois, o código consulta:

```ts
mobileBreakpoint.matches
```
- `true`: a tela está no modo mobile;
- `false`: a tela está no modo desktop.

O mesmo limite é usado no arquivo `app-layout.css` (src/assets/styles), dentro de:
```css
@media (max-width: 991.98px)
```

## ☰ Estados do menu

```ts
const isMobileMenuOpen = ref(false)
const isDesktopMenuCollapsed = ref(false)
```

Essas duas variáveis guardam o estado do menu.

| Variável                 | Responsabilidade                         | Valor inicial |
| ------------------------ | ---------------------------------------- | ------------- |
| `isMobileMenuOpen`       | Indica se o menu mobile está aberto.     | `false`       |
| `isDesktopMenuCollapsed` | Indica se o menu desktop está recolhido. | `false`       |

Os dois estados são separados porque o menu se comporta de forma diferente em cada tipo de tela:

- no mobile, ele abre e fecha sobre o conteúdo;
- no desktop, ele permanece visível, mas pode ser recolhido.

## ✏️ Função para alterar o menu

```ts
function toggleMenu() {
    if (mobileBreakpoint.matches) {
        isMobileMenuOpen.value = !isMobileMenuOpen.value
        return
    }

    isDesktopMenuCollapsed.value = !isDesktopMenuCollapsed.value
}
```
Essa função é chamada quando a pessoa clica no botão de menu do topo.

Primeiro, ela verifica se a tela está no modo mobile:

```ts
if (mobileBreakpoint.matches)
```

Se estiver no mobile, ela abre ou fecha o menu sobre o conteúdo:
```ts
isMobileMenuOpen.value = !isMobileMenuOpen.value
```
Se estiver no desktop, ela recolhe ou restaura o menu lateral:
```ts
isDesktopMenuCollapsed.value = !isDesktopMenuCollapsed.value
```
O `!` inverte o valor atual:

- `false → true`
- `true  → false`

Em variáveis criadas com ref, o valor é acessado e alterado por meio de `.value` dentro do código TypeScript.

## ❌ Função para fechar o menu mobile

```ts
function closeMobileMenu() {
    if (mobileBreakpoint.matches) {
        isMobileMenuOpen.value = false
    }
}
```
Essa função fecha o menu somente quando a tela está no modo mobile.

Ela é usada em dois momentos:

- quando a pessoa clica no fundo escurecido atrás do menu;
- quando a pessoa navega para uma página pelo menu.

> 💡
> 
> No desktop, ela não faz nada.
>
> O menu lateral não funciona como um painel que abre e fecha sobre o conteúdo.

## 🔀 Fluxo do menu no `AppLayout.vue`

O `AppLayout.vue` concentra o estado e as funções que controlam o menu.

```
Pessoa clica no botão do topo
             ↓
AppTopBar emite o evento `toggle-menu`
             ↓
AppLayout executa `toggleMenu()`
             ↓
O estado do menu é alterado
             ↓
O Vue atualiza as classes e os componentes do template
             ↓
O CSS exibe, oculta ou recolhe o menu
```

## 🏁 Conclusão

>`AppLayout.vue` não contém o conteúdo detalhado do topo, menu ou rodapé.
>
>Ele atua como o organizador da estrutura e do comportamento geral do layout
>
> Conecta os componentes visuais e controlando o estado do menu.

## 💬 Comunicação entre componentes: evento `toggle-menu`

O botão que abre, fecha ou recolhe o menu está dentro de `TopBarSistema.vue`.

Porém, o estado e a função que controlam o menu pertencem ao `AppLayout.vue`.

Como os componentes estão em níveis diferentes, o evento precisa subir pela árvore de componentes:

```text
TopBarSistema
    ↓
AppTopBar
    ↓
AppLayout
```
### 1. Evento iniciado em TopBarSistema.vue

O clique acontece no botão:

```html
<button
    class="top-bar-system__menu-button" type="button" aria-label="Abrir ou recolher menu" @click="handleMenuButtonClick" >
```
> 💡
>
> `@click` é um evento nativo do botão HTML.

Quando acontece o clique, a função handleMenuButtonClick() é executada:

```ts
const emit = defineEmits(['toggle-menu'])

function handleMenuButtonClick() {
    emit('toggle-menu')
}
```
O `defineEmits()` declara que o componente pode emitir um evento chamado toggle-menu.

A função `emit('toggle-menu')` envia esse aviso ao pai direto do TopBarSistema, que é o AppTopBar.

### 2. Evento recebido e repassado por AppTopBar.vue

O AppTopBar importa e renderiza o TopBarSistema:

```ts
import TopBarSistema from './TopBarSistema.vue'
```
```html
<TopBarSistema @toggle-menu="handleToggleMenu" />
```
O trecho acima significa:

> 💡
>
> Quando TopBarSistema emitir o evento toggle-menu, execute a função handleToggleMenu().

A função recebe esse aviso e o repassa para o componente pai:

```ts
const emit = defineEmits(['toggle-menu'])

function handleToggleMenu() {
    emit('toggle-menu')
}
```

### 3. Evento tratado em AppLayout.vue

O AppLayout importa e renderiza o AppTopBar:

```ts
import AppTopBar from './AppTopBar.vue'
```
```html
<AppTopBar @toggle-menu="toggleMenu" />
```
Esse trecho significa:

> 💡
>
> Quando AppTopBar emitir toggle-menu, execute a função toggleMenu().

A função `toggleMenu()` é executada no AppLayout porque é nele que estão os estados do menu:

```ts
const isMobileMenuOpen = ref(false)
const isDesktopMenuCollapsed = ref(false)
```

### 4. Fluxo Completo
```
Pessoa clica no botão
                ↓
TopBarSistema executa handleMenuButtonClick()
                ↓
TopBarSistema emite toggle-menu
                ↓
AppTopBar recebe o evento e o repassa
                ↓
AppLayout recebe o evento
                ↓
AppLayout executa toggleMenu()
                ↓
O estado do menu é alterado
```

### 5. Regra importante
> 📌
> Eventos emitidos por componentes Vue chegam somente ao pai direto.
> 
> Por isso, quando um evento precisa alcançar um componente mais acima
> 
> Cada componente intermediário precisa escutar e repassar esse evento.

## ⚙️Componente de topo: `AppTopBar.vue`

O `AppTopBar.vue` representa toda a faixa superior da aplicação.

Ele é composto por duas partes menores:

```ts
import TopBarSistema from './TopBarSistema.vue'
import TopBarUsuario from './TopBarUsuario.vue'
```
| Componente      | Responsabilidade                             |
| --------------- | -------------------------------------------- |
| `TopBarUsuario` | Exibe a área com o usuário.                  |
| `TopBarSistema` | Exibe o título do sistema e o botão do menu. |

Assim como no `AppLayout.vue`, o AppTopBar.vue organiza componentes menores
sem concentrar todo o conteúdo do topo em um único arquivo.

### Estrutura do topo

```html
<header class="app-top-bar">
    <TopBarUsuario />

    <TopBarSistema @toggle-menu="handleToggleMenu" />
</header>
```
A tag `<header>` identifica semanticamente a área de cabeçalho da página.

Dentro dela, o topo é dividido em duas áreas:
```
AppTopBar
├── TopBarUsuario
└── TopBarSistema
```
TopBarUsuario exibe a área do usuário.

TopBarSistema exibe o título e possui o botão que solicita a abertura ou o recolhimento do menu.

O trecho `@toggle-menu="handleToggleMenu"` trata a comunicação entre `TopBarSistema` e `AppTopBar`.

### Comunicação do botão de menu

O `TopBarSistema` contém o botão de menu, mas o estado do menu pertence ao
`AppLayout.vue`.

Por isso, quando o botão é clicado, a informação precisa subir pela árvore de componentes:

```text
TopBarSistema
    ↓ 
emite `toggle-menu`

AppTopBar
    ↓ 
repassa `toggle-menu`

AppLayout
    ↓ 
executa `toggleMenu()`
```

No AppTopBar.vue, isso é feito com:

```ts
const emit = defineEmits(['toggle-menu'])

function handleToggleMenu() {
    emit('toggle-menu')
}
```
A `defineEmits()` declara que esse componente pode emitir o evento `toggle-menu`.

A função `handleToggleMenu()` apenas repassa esse evento para o componente pai,que é o `AppLayout.vue`.

O `AppTopBar.vue` não abre nem fecha o menu diretamente. 

Ele só transporta o aviso de que o botão foi clicado.

O evento que esta sendo criado em ToBarSistema.vue vai ter o seguinte fluxo:

```
TopBarSistema emite
        ↓
AppTopBar escuta e repassa
        ↓
AppLayout escuta e executa a ação
```

É o mesmo aviso, com o mesmo nome atravessando os niveis

```
TopBarSistema emite: "toggle-menu"
↓
AppTopBar recebe o aviso e o repassa
↓
AppLayout recebe o aviso e executa a função toggleMenu()
```

## 📝 Resumo geral: inicialização, componentes e comunicação

>💡
>
>Este resumo apresenta conceitos reutilizáveis em projetos Vue. 
>
>Os nomes e trechos de código são deste projeto, mas a lógica se aplica a outras aplicações.

### Inicialização da aplicação

Em um projeto Vue criado com Vite, o navegador começa pelo `index.html`, que carrega o arquivo de entrada da aplicação:

```text
index.html
↓
main.ts
↓
App.vue
```
No main.ts, o componente raiz é importado:
```ts
import App from './App.vue'
```
Depois, o Vue cria a aplicação usando esse componente:
```ts
const app = createApp(App)
```
E a aplicação é montada no elemento HTML identificado por #app:
```ts
app.mount('#app')
```
Neste projeto, também há a configuração do router antes da montagem:
```ts
app.use(router)
```
O App.vue é o componente raiz. 

Ele não precisa representar diretamente uma página específica; ele pode apenas organizar qual estrutura será exibida inicialmente.

Neste projeto, ele renderiza o layout principal:
```ts
<template>
    <AppLayout />
</template>

<script setup lang="ts">
    import AppLayout from '@/components/layout/AppLayout.vue'
</script>
```

### Organização por componentes
Componentes são partes visuais reutilizáveis da interface, com responsabilidades bem definidas.

Neste projeto, a estrutura é: 

```
App.vue
└── AppLayout
    ├── AppTopBar
    │   ├── TopBarUsuario
    │   └── TopBarSistema
    ├── AppMenu
    ├── AppContent
    └── AppFooter
```

Um componente pode ser pai, filho ou neto conforme sua posição nessa árvore.

Por exemplo:
- AppLayout é pai de AppTopBar;
- AppTopBar é pai de TopBarSistema;
- TopBarSistema é neto de AppLayout.

Essa organização evita concentrar todo o layout, comportamento e marcação HTML em um único arquivo.

Importar e renderizar um componente

Para usar um componente dentro de outro, normalmente são necessárias duas etapas.

Primeiro, importar:

```ts
import AppTopBar from './AppTopBar.vue'
```
A importação disponibiliza o componente no arquivo atual. Sozinha, ela não o exibe na tela.

Depois, renderizar no `<template>`:
```html
<AppTopBar />
```
A tag `<AppTopBar />` é a que efetivamente cria e exibe esse componente na interface.

No AppLayout.vue, por exemplo:
```ts
import AppContent from './AppContent.vue'
import AppFooter from './AppFooter.vue'
import AppMenu from './AppMenu.vue'
import AppTopBar from './AppTopBar.vue'
```
Depois:
```html
<AppTopBar />
<AppMenu />
<AppContent />
<AppFooter />
```
A mesma regra vale para qualquer projeto Vue: 
- importar deixa o componente disponível
- usar sua tag no template o renderiza

### Responsabilidade e estado dos componentes
A divisão de responsabilidades não significa que somente o componente pai pode ter dados ou funções.

Cada componente pode ter seu próprio comportamento interno. 

Por exemplo, `TopBarSistema` possui a função que reage ao clique do botão:
```ts
function handleMenuButtonClick() {
    emit('toggle-menu')
}
```
Por outro lado, estados que precisam coordenar vários componentes costumam ficar em um pai comum.

Neste projeto, o `AppLayout` controla o estado do menu porque ele afeta o topo, o menu lateral e o fundo de fechamento do menu `mobile`:

Regra prática:

| Situação | Local mais adequado |
| --- | --- |
| Estado usado apenas por um componente | No próprio componente. |
| Estado compartilhado entre pai e filhos | No pai comum. |
| Estado necessário em áreas distantes da aplicação | Pode exigir router, store ou outra estratégia global. |

### Comunicação do pai para o filho: props
O componente pai envia informações ao filho por meio de `props`.

No `AppLayout.vue`, o estado do menu `mobile` é enviado para o `AppMenu`:
```html
<AppMenu :is-open="isMobileMenuOpen" />
```
O `:` significa que `is-open` receberá o valor da variável JavaScript `isMobileMenuOpen`, e não o texto literal `"isMobileMenuOpen"`.

Esse fluxo é sempre de cima para baixo:
```
Pai → filho
```

### Comunicação do filho para o pai: eventos com emit
Quando algo acontece dentro de um componente filho por exemplo, um clique ele pode avisar o pai por meio de um evento emitido.

Neste projeto, o clique começa em `TopBarSistema.vue`:
```html
<button class="top-bar-system__menu-button" type="button" aria-label="Abrir ou recolher menu" @click="handleMenuButtonClick">
```
Aqui, `@click` é um `listener` de evento nativo do HTML

Quando a pessoa clicar neste botão, execute `handleMenuButtonClick()`.

A função emite um evento personalizado:
```ts
const emit = defineEmits(['toggle-menu'])

function handleMenuButtonClick() {
    emit('toggle-menu')
}
```
O `toggle-menu` não é um evento pronto do Vue. É um nome definido pelo projeto para representar o aviso:
> 💡 O botão do menu foi acionado

### O significado de @ nas tags
O `@` é a forma abreviada de `v-on:` e indica que o componente deve escutar um evento.

<span style="color: purple; font-weight: bold;">No botão `HTML`:</span>
```html
<button @click="handleMenuButtonClick">
```
<b><font color="red">Significa:</font></b> Quando ocorrer o evento nativo click, execute `handleMenuButtonClick()`.

<span style="color: purple; font-weight: bold;">  Em um componente `Vue`: <span>
```html
<TopBarSistema @toggle-menu="handleToggleMenu" />
```
    <b><font color="red">Significa:</font></b> Quando `TopBarSistema` emitir o evento personalizado `toggle-menu`, execute `handleToggleMenu()`.

 <span style="color: purple; font-weight: bold;"> No `AppLayout.vue`:</span>

```html
<AppTopBar @toggle-menu="toggleMenu" />
```
<b><font color="red">Significa:</font></b> Quando `AppTopBar` emitir `toggle-menu`, execute `toggleMenu()`.

Portanto, o `@` não cria o evento. 

Ele fica aguardando um evento que pode acontecer e define qual função será executada quando ele ocorrer.

Repassando eventos por vários níveis

Eventos emitidos por componentes Vue chegam somente ao pai direto. 

Eles não sobem automaticamente até o componente raiz.

Neste projeto, o caminho é:

```
TopBarSistema
↓
AppTopBar
↓
AppLayout
```

Em TopBarSistema.vue, o evento é emitido:
```ts
emit('toggle-menu')
```
Em AppTopBar.vue, o evento é escutado:
```html
<TopBarSistema @toggle-menu="handleToggleMenu" />
```

E a função o repassa para o componente pai:
```ts
const emit = defineEmits(['toggle-menu'])

function handleToggleMenu() {
    emit('toggle-menu')
}
```
Por fim, em `AppLayout.vue`, o evento é tratado:
```html
<AppTopBar @toggle-menu="toggleMenu" />
```
```ts
function toggleMenu() {
    // altera o estado do menu
}
```
O fluxo completo:

```
Pessoa clica no botão
            ↓
@click executa handleMenuButtonClick()
            ↓
TopBarSistema emite toggle-menu
            ↓
AppTopBar escuta e repassa toggle-menu
            ↓
AppLayout escuta o evento
            ↓
AppLayout executa toggleMenu()
            ↓
O estado do menu é alterado
            ↓
O Vue atualiza a interface
```
> 📌
>
>O primeiro emit ocorre no componente onde surgiu a interação.
>
>O pai direto renderiza esse componente e escuta o evento usando @nome-do-evento.
>
>Se o pai intermediário precisar levar esse aviso para outro pai acima, ele executa uma função que emite novamente o mesmo evento.
>
>Isso continua até chegar ao componente responsável pelo estado e pela ação final.
>
>Ele precisa chegar ao componente que é dono do estado que deve mudar. Aqui é o AppLayout.
>
>Os componentes não “dependem um do outro para existir”. 
>
>Eles precisam estar conectados na árvore de renderização para esse caminho específico de eventos funcionar. 
>
>TopBarSistema poderia existir em outro lugar; só não enviaria esse evento para este AppLayout se não estivesse renderizado dentro dessa cadeia.

```
Regra geral de comunicação:

Pai → filho: props
Filho → pai direto: emit
Vários níveis acima: cada componente intermediário escuta e repassa o evento
```
> 💡
>
> Essa organização deixa cada componente responsável por sua parte visual
>
>Isso evita que componentes distantes fiquem diretamente dependentes uns dos outros.

# 5. ⚙️ Componente do sistema: `TopBarSistema.vue`

## 📋 Responsabilidade

`TopBarSistema.vue` representa a área principal do topo da aplicação.

Neste projeto, ele exibe:

- o botão que controla o menu;
- o ícone do botão;
- o título do sistema.

Também é nele que começa o aviso de que o botão do menu foi clicado.

Sua estrutura visual é:

```html
<div class="top-bar-system">
    <button class="top-bar-system__menu-button">
        <i class="bi bi-list"></i>
    </button>

    <span class="top-bar-system__title">
        Sistema de Controle de Estoque
    </span>
</div>
```

## 📡 Declaração e emissão do evento

No bloco `<script setup>`, o componente declara o evento que poderá emitir:

```ts
const emit = defineEmits(['toggle-menu'])
```

O defineEmits() é um recurso do Vue usado quando um componente filho precisa avisar algo ao seu pai.

Neste caso, o evento possui o nome:
```
toggle-menu
```
Esse nome foi definido pelo projeto.

Ele representa o aviso de que o botão do menu foi acionado.

A função abaixo é responsável por emitir esse aviso:

```ts
function handleMenuButtonClick() {
    emit('toggle-menu')
}
```
Quando essa função é executada, o `TopBarSistema` envia o evento `toggle-menu` para seu pai direto, que é o `AppTopBar`.

```
TopBarSistema
    ↓
emit('toggle-menu')
    ↓
AppTopBar
```
A declaração com defineEmits() apenas informa que o componente pode emitir esse evento.

O envio acontece efetivamente quando o código executa:

## ▶️ Botão que inicia o evento

O botão do menu é este:

```html
<button  class="top-bar-system__menu-button" type="button" aria-label="Abrir ou recolher menu"  @click="handleMenuButtonClick" >
    <i class="bi bi-list" aria-hidden="true"></i>
</button>
```

| Trecho | Função |
| --- | --- |
| `<button>` | Cria um botão HTML interativo. |
| `class="top-bar-system__menu-button"` | Aplica os estilos definidos para esse botão no projeto. |
| `type="button"` | Define que ele é um botão comum; evita que ele envie um formulário caso esteja dentro de um. |
| `aria-label="Abrir ou recolher menu"` | Descreve a função do botão para tecnologias assistivas, como leitores de tela. |
| `@click="handleMenuButtonClick"` | Quando ocorre um clique, executa a função `handleMenuButtonClick()`. |
| `<i class="bi bi-list">` | Exibe o ícone de lista do Bootstrap Icons. |
| `aria-hidden="true"` | Oculta o ícone do leitor de tela, pois o botão já possui uma descrição clara em `aria-label`. |

O @click liga a parte visual à lógica do componente:

```
Pessoa clica no botão
        ↓
@click chama handleMenuButtonClick()
        ↓
handleMenuButtonClick() executa emit('toggle-menu')
        ↓
o aviso segue para AppTopBar
```

## 🎨 Título e agrupamento visual

O conteúdo do componente fica dentro desta `div`:

```html
<div class="top-bar-system">
    <!-- botão do menu -->
    <!-- título do sistema -->
</div>
```
Ela agrupa os elementos que formam a área principal do topo.

A classe `top-bar-system` é uma classe criada no projeto. 

Ela não pertence ao Bootstrap.

Dentro desse agrupamento, o título é exibido com:

```html
<span class="top-bar-system__title">
    Sistema de Controle de Estoque
</span>
```
A tag `<span>` é usada para representar um pequeno trecho de texto em linha.

A classe `top-bar-system__title` aplica o estilo visual do título, como fonte, tamanho, cor ou espaçamento, conforme definido no CSS do projeto.

A estrutura visual completa é:
```
div.top-bar-system
├── button.top-bar-system__menu-button
│   └── ícone bi-list
└── span.top-bar-system__title
    └── "Sistema de Controle de Estoque"
```
O botão possui comportamento de clique. 

O título apenas apresenta uma informação visual; ele não possui evento ou lógica própria.

## 📝 Resumo geral: componente visual que emite uma ação

`TopBarSistema.vue` é um exemplo de componente filho que possui duas responsabilidades:

1. exibir uma parte visual da interface;
2. avisar o componente pai quando uma ação do usuário acontece.

Neste projeto, ele exibe o botão de menu e o título do sistema:

```html
<div class="top-bar-system">
    <button class="top-bar-system__menu-button" type="button" aria-label="Abrir ou recolher menu" @click="handleMenuButtonClick"  >
        <i class="bi bi-list" aria-hidden="true"></i>
    </button>

    <span class="top-bar-system__title">
        Sistema de Controle de Estoque
    </span>
</div>
```
### Estrutura visual
A div externa agrupa os elementos que pertencem ao mesmo componente visual:
```
TopBarSistema
├── botão de menu
│   └── ícone
└── título
```
As classes como `top-bar-system`, `top-bar-system__menu-button` e `top-bar-system__title` foram criadas para este projeto e recebem estilos pelo CSS.

### Clique em um elemento HTML
O botão usa o evento nativo click:
```html
<button @click="handleMenuButtonClick">
```
O `@click` significa:

> 💡
>
> Quando a pessoa clicar neste botão, execute `handleMenuButtonClick()`.

Além disso:
- `type="button"` define um botão comum, sem envio de formulário;
- `aria-label` explica a finalidade do botão a leitores de tela;
- `aria-hidden="true"` evita que o leitor de tela leia o ícone, pois o botão já possui uma descrição.

```ts
function handleMenuButtonClick() {
    emit('toggle-menu')
}
```
Ela emite um evento personalizado chamado toggle-menu.

Antes de emitir, o componente declara que pode enviar esse evento:
```ts
const emit = defineEmits(['toggle-menu'])
```
A declaração informa a possibilidade de emissão. 

O evento acontece somente quando este código é executado:

```ts
emit('toggle-menu')
```

### Regra geral reutilizável
Quando um componente filho identifica uma ação, mas outro componente 
é responsável pelo estado ou pela decisão final, o filho deve emitir um evento.

```
Filho
        ↓
ocorre uma ação, como clique
        ↓
emite um evento
        ↓
Pai escuta o evento
        ↓
Pai executa a função responsável pela ação final
```
```
TopBarSistema
        ↓
Pessoa clica no botão
        ↓
emit('toggle-menu')
        ↓
AppTopBar e AppLayout recebem o aviso pela cadeia de componentes
        ↓
AppLayout altera o estado do menu
```
>💡
>
>Essa separação é útil porque o componente visual não precisa conhecer toda a regra de funcionamento da aplicação. 
>
>Ele apenas informa o que aconteceu; o componente responsável decide o que fazer.

# 6. 👤 Componente do usuário: `TopBarUsuario.vue`

## 📋 Responsabilidade

`TopBarUsuario.vue` representa a área reservada à identificação do usuário no topo da aplicação.

No estado atual do projeto, ele exibe apenas:

- um ícone de pessoa;
- o texto de exemplo `: user`.

```html
<template>
    <div class="top-bar-user">
        <i class="bi bi-person" aria-hidden="true"></i>

        <span>: user</span>
    </div>
</template>
```
A estrutura visual é
```
TopBarUsuario
├── ícone de pessoa
└── texto ": user"
```
A div com a classe top-bar-user agrupa esses dois elementos e recebe o estilo visual definido pelo projeto.

O ícone é fornecido pelo Bootstrap Icons:
```html
<i class="bi bi-person" aria-hidden="true"></i>
```
- `bi` identifica o uso da biblioteca Bootstrap Icons;
- `bi-person` seleciona o ícone de pessoa;
- `aria-hidden="true"` informa que o ícone é decorativo e não precisa ser lido por leitores de tela.

O texto é exibido com uma tag span:
```html
<span>: user</span>
```
Neste momento, user é apenas um texto fixo usado no mock visual.

Este componente não possui:

- `<script setup>;`
- `props`;
- eventos com emit;
- funções;
- comportamento de clique.

Ele existe apenas para representar visualmente uma área do layout. 

Em uma evolução futura, o texto fixo poderá ser substituído pelo nome do usuário autenticado.

## 📝 Resumo geral: componente visual estático

Um componente Vue não precisa ter lógica, dados ou eventos para ser útil.

`TopBarUsuario.vue` é um componente visual estático: sua responsabilidade atual é apenas exibir uma parte da interface.

```html
<div class="top-bar-user">
    <i class="bi bi-person" aria-hidden="true"></i>
    <span>: user</span>
</div>
```
```
contêiner visual
├── ícone
└── texto
```
### Quando criar um componente estático
É válido criar um componente separado mesmo quando ele `ainda possui apenas HTML`, desde que ele represente uma parte identificável e reutilizável da tela.

Exemplos:
- área de identificação do usuário;
- logotipo;
- rodapé;
- aviso visual;
- cabeçalho de uma seção.
A separação deixa o layout principal mais organizado e permite evoluir aquela área isoladamente depois.

### Evolução futura
Um componente estático pode receber comportamento no futuro sem exigir alteração na estrutura geral do layout.

Neste caso, o texto fixo:
```html
<span>: user</span>
```
poderá ser substituído por dados reais, por exemplo:
```html
<span>: {{ nomeUsuario }}</span>
```
Para isso, o valor poderá vir:
- de uma prop, 
- de um estado local, 
- de um serviço de autenticação ou de um store global

Isso vai depender conforme a necessidade do projeto.

A ideia principal é:
- primeiro: componente visual bem separado
- depois: dados e comportamentos, quando houver necessidade real

# 7. ☰ Menu lateral: `AppMenu.vue`

## 📋 Responsabilidade

`AppMenu.vue` representa o menu lateral da aplicação.

Ele é responsável por:

- exibir as opções de navegação;
- montar cada opção a partir da configuração `MENU`;
- receber do `AppLayout` a informação de que o menu mobile está aberto;
- avisar o `AppLayout` quando uma navegação acontece.

A estrutura geral é:

```text
AppMenu
├── área do usuário
└── lista de itens de navegação
    └── AppMenuItem para cada opção do MENU
```

Diferente de TopBarUsuario.vue, este componente possui comunicação com outros componentes:

```
AppLayout
    ↓ `envia a informação isOpen`
AppMenu
    ↓ `renderiza os itens de navegação`
AppMenuItem
    ↓ `avisa que ocorreu uma navegação`
AppMenu
    ↓ `repassa o aviso navigate`
AppLayout
    ↓ `fecha o menu, quando necessário no mobile`
```
Agora vamos começar pelo bloco `<script setup>`, onde estão os imports, a prop e o evento desse componente.

## 📦 Imports do menu

No início de `AppMenu.vue`, temos:

```ts
import { MENU } from '@/config/menu'
import AppMenuItem from './AppMenuItem.vue'
import TopBarUsuario from './TopBarUsuario.vue'
```
Cada import possui uma função diferente:

| Import | Função |
| --- | --- |
| `MENU` | Traz a configuração com as opções que devem aparecer no menu. |
| `AppMenuItem` | Representa cada item individual de navegação. |
| `TopBarUsuario` | Reutiliza a área de identificação do usuário dentro do menu mobile. |


O `@` em `@/config/menu` representa a pasta src. 

Portanto, o caminho real é: `src/config/menu`

Em vez de escrever as opções diretamente no `AppMenu.vue`, elas foram separadas em uma configuração chamada `MENU`.

Essa decisão é melhor para um menu que crescerá, porque a estrutura dos itens fica centralizada em um único arquivo.

O `AppMenu.vue` não desenha cada item sozinho. Ele usa o componente:
```html
<AppMenuItem />
```
Ele faz a renderização de cada opção do menu. 

## 🎛️ Informação recebida do `AppLayout`: `isOpen`

O `AppMenu` recebe uma `prop` chamada `isOpen`:

```ts
defineProps<{
    isOpen: boolean
}>()
```
Isso significa:
> Para renderizar `AppMenu`, o componente pai deve fornecer uma informação chamada `isOpen`, cujo tipo é `booleano`.
>
> Um valor booleano só pode ser: `true` ou `false`.

Neste projeto, o pai é o `AppLayout.vue`. 

Ele envia essa informação assim:
```ts
<AppMenu :is-open="isMobileMenuOpen" @navigate="closeMobileMenu"/>
```
A relação:

`AppLayout` ──► `isMobileMenuOpen` ──►  `envia como prop` ──► `AppMenu` ──► `isOpen`

No componente pai, o nome é escrito em kebab-case → `:is-open`

No componente filho, a prop é declarada em **camelCase** → `isOpen`

Os dois nomes representam a mesma `prop`

O `:` é importante → `:is-open="isMobileMenuOpen"`

Com `:`, o valor pode mudar entre `true` e `false`, e o `AppMenu` recebe essa atualização automaticamente.

Mais adiante, essa `prop` é usada no template para incluir ou remover a classe visual que abre o `menu mobile`.

## 📢 Evento emitido pelo menu: `navigate`

O `AppMenu` pode emitir um evento chamado `navigate`:

```ts
const emit = defineEmits<{
    navigate: []
}>()
```

Essa é a versão tipada de defineEmits, usada com TypeScript.

Ela declara:

> Este componente pode emitir o evento navigate e esse evento não envia nenhum valor junto.

O `[]` representa uma lista vazia de valores.

Por isso, o envio é feito assim:
```ts
emit('navigate')
```
No código do componente, existe uma função que realiza esse envio:
```ts
function handleNavigation() {
    emit('navigate')
}
```
O `AppMenu` não fecha o menu diretamente. Ele apenas avisa o `AppLayout`:

> Uma navegação foi realizada.

No `AppLayout.vue`, esse aviso é escutado aqui:
```html
<AppMenu :is-open="isMobileMenuOpen" @navigate="closeMobileMenu"/>
```
Quando AppMenu emite navigate, o AppLayout executa `closeMobileMenu()`.

O fluxo é:
```
Pessoa seleciona uma opção do menu
        ↓
AppMenu recebe o aviso do item selecionado
        ↓
AppMenu executa handleNavigation()
        ↓
emit('navigate')
        ↓
AppLayout escuta @navigate
        ↓
closeMobileMenu() fecha o menu, se a tela estiver no modo mobile
```
O nome `navigate` foi escolhido pelo projeto. 

Ele representa a ação de navegar para uma opção do menu

## ☰ Estrutura principal do menu

O menu começa com a tag HTML `<nav>`:

```html
<nav id="main-navigation" class="app-menu" :class="{ 'app-menu--open': isOpen }" aria-label="Menu principal" >
```
A tag `<nav>` tem significado semântico: ela informa que esse bloco contém links ou opções de navegação.

| Trecho | Função |
| --- | --- |
| `id="main-navigation"` | Dá uma identificação única ao menu na página. |
| `class="app-menu"` | Aplica os estilos base do menu lateral. |
| `:class="{ 'app-menu--open': isOpen }"` | Adiciona a classe de menu aberto somente quando `isOpen` for `true`. |
| `aria-label="Menu principal"` | Explica a finalidade dessa navegação para leitores de tela. |

A parte mais importante é → `:class="{ 'app-menu--open': isOpen }"`.

Ela usa a prop `isOpen`, recebida do AppLayout seu comportamento é:
```
isOpen = false
    ↓
classe aplicada: app-menu

isOpen = true
    ↓
classes aplicadas: app-menu app-menu--open
```
> 📌 **I M P O R T A N T E**
>
> O CSS do projeto usa a `classe app-menu--open` para mostrar o menu sobre o conteúdo em telas menores.
>
>Assim, o Vue não precisa alterar o CSS diretamente. 
>
>Ele apenas adiciona ou remove uma classe conforme o valor recebido do componente pai.

## 👤 Área do usuário dentro do menu

No início do conteúdo do menu, existe esta estrutura:

```html
<div class="app-menu__user">
    <TopBarUsuario />
</div>
```
`TopBarUsuario` é o mesmo componente usado no topo desktop.

Aqui ele é reutilizado dentro do menu. 

Isso permite que, em telas menores, a identificação do usuário continue disponível mesmo quando a área esquerda do topo não é exibida.

A div externa possui a classe: `app-menu__user`

Ela representa a área do usuário dentro do menu e recebe estilos próprios, como espaçamento, alinhamento ou borda.

A estrutura é:

```
AppMenu
└── área do usuário
    └── TopBarUsuario
        ├── ícone de pessoa
        └── texto ": user"
```
Esse é um exemplo prático de reutilização de componente: 
- o TopBarUsuario não foi copiado para dentro do menu; 
- ele foi importado e renderizado novamente onde também faz sentido visualmente.

## 📑 Lista de opções do menu

As opções de navegação ficam dentro de uma lista HTML:

```html
<ul class="app-menu__list">
    <AppMenuItem
        v-for="item in MENU"
        :key="item.id"
        :item="item"
        @navigate="handleNavigation"
    />
</ul>
```
A tag `<ul>` representa uma lista não ordenada. 

Ela agrupa os itens de navegação do menu.

A classe `app-menu__list` aplica os estilos visuais da lista.

Repetição com `v-for`
O trecho:
```ts
v-for="item in MENU"
```
significa:
> 📌 Para cada item existente na configuração `MENU`, renderize um componente `AppMenuItem`.

Se `MENU` possuir duas opções:
- HOME
- Listar Produtos

o Vue renderizará dois componentes:
- `AppMenuItem` para `HOME`
- `AppMenuItem` para Listar Produtos

A variável `item` representa uma opção por vez enquanto o Vue percorre a lista `MENU`.
```
MENU
├── primeiro item → item
├── segundo item → item
└── demais itens → item
```
O `AppMenu.vue` não precisa saber se cada item é um link simples, possui submenus ou contém outros detalhes. 

Ele apenas percorre `MENU` e entrega cada item ao componente responsável por renderizá-lo: `AppMenuItem`

### Identificação de cada item: `:key` 🔑

Dentro do `v-for`, temos:

```ts
:key="item.id"
```
> 📌 A key é uma identificação única para cada item que o Vue renderiza.

Por exemplo, se a configuração possuir:

```ts
[
    { id: 'home', label: 'HOME' },
    { id: 'produtos-listar', label: 'Listar Produtos' },
]
```

O Vue identifica cada AppMenuItem assim:
- HOME              →  key: home
- Listar Produtos   →  key: produtos-listar

Isso ajuda o Vue a saber qual componente representa cada item caso a lista seja atualizada, reorganizada ou receba novas opções.

O `:` em:
```ts
:key="item.id"
```
Vai indicar que a chave receberá o valor da propriedade `id` do item atual.

Sem `:`, o valor seria apenas o texto literal `item.id`, o que estaria errado:

```ts
key="item.id"
```
> 📌 Regra prática:
>
> Sempre que usar `v-for` para renderizar componentes ou elementos de uma lista, forneça uma `key` única e estável.

Para menus, IDs definidos na configuração são uma boa escolha de `key`.

## 📦 Dados enviados para cada item: `:item`

Cada `AppMenuItem` recebe o item atual da lista `MENU`:

```ts
:item="item"
```
Isso é uma `prop`.

O `AppMenu.vue` percorre MENU com:
```ts
v-for="item in MENU"
```
Exemplo: se o item atual for:

```ts
{
    id: 'produtos-listar',
    label: 'Listar Produtos',
}
```
O `AppMenuItem` receberá esse mesmo objeto pela prop item.
```
O fluxo é:

MENU
    ↓
AppMenu percorre cada item com v-for
    ↓
:item="item"
    ↓
AppMenuItem recebe os dados desse item
    ↓
AppMenuItem decide como renderizá-lo
```
O `:` indica que a prop recebe o objeto armazenado na variável item.

Sem o `:`, o Vue enviaria o texto literal `item`:

```ts
item="item"
```

## 📢 Evento de navegação recebido do item

Cada `AppMenuItem` pode emitir o evento `navigate`.

O `AppMenu` escuta esse evento aqui:

```html
<AppMenuItem
    v-for="item in MENU"
        :key="item.id"
        :item="item"
        @navigate="handleNavigation"
/>
```
O trecho:
```ts
@navigate="handleNavigation"
```
significa:
>📌 Quando este `AppMenuItem` emitir o evento `navigate`, execute a função `handleNavigation()` do `AppMenu`.

A função apenas repassa o aviso para o pai do `AppMenu`:
```ts
function handleNavigation() {
    emit('navigate')
}
```

O fluxo é:

```
Pessoa seleciona uma opção
        ↓
AppMenuItem emite navigate
        ↓
AppMenu escuta @navigate
        ↓
AppMenu executa handleNavigation()
        ↓
AppMenu emite navigate novamente
        ↓
AppLayout escuta @navigate
        ↓
AppLayout executa closeMobileMenu()
```
O AppMenu atua como uma ponte:
```
AppMenuItem
    ↓ avisa que ocorreu uma navegação
AppMenu
    ↓ repassa o aviso
AppLayout
    ↓ decide fechar o menu mobile
```
Ele não precisa saber qual rota foi selecionada para cumprir sua responsabilidade atual. 

Basta saber que uma navegação aconteceu e avisar o `AppLayout`.

## 📝 Resumo geral: menu criado por configuração

`AppMenu.vue` mostra um padrão útil para menus, listas, cards e tabelas em Vue:

1. os dados ficam em uma configuração;
2. o componente percorre esses dados com `v-for`;
3. um componente menor renderiza cada item;
4. eventos podem subir dessa estrutura até o componente que controla o comportamento geral.

### Estrutura usada

```text
AppLayout
    ↓ envia isOpen e escuta navigate
AppMenu
    ↓ percorre MENU
AppMenuItem
    ↓ representa uma opção individual
```
### Dados centralizados
As opções do menu são importadas de uma configuração:

```ts
import { MENU } from '@/config/menu'
```
Isso evita escrever cada item manualmente no template. 

Para adicionar, remover ou reorganizar opções, a alteração fica concentrada na configuração.

### Lista dinâmica com v-for

```html
<AppMenuItem
    v-for="item in MENU"
        :key="item.id"
        :item="item"
/>
```
O Vue cria um AppMenuItem para cada objeto existente em MENU.
```
MENU
├── item 1 → AppMenuItem
├── item 2 → AppMenuItem
└── item 3 → AppMenuItem
```
Identificação com key
```ts
:key="item.id"
```
A key identifica de forma única cada item renderizado. 

Em listas dinâmicas, ela deve ser estável e exclusiva.

### Dados do pai para o filho
```ts
:item="item"
```
`AppMenu → prop item → AppMenuItem`

O menu também recebe do `AppLayout` a `prop isOpen`:
```ts
<AppMenu :is-open="isMobileMenuOpen" />
```
Essa informação permite que o menu aplique ou remova a classe visual de abertura:
```ts
:class="{ 'app-menu--open': isOpen }"
```

### Eventos do filho para o pai
Quando a pessoa navega, o aviso sobe pela árvore:

```
AppMenuItem
↓ emite navigate
AppMenu
↓ escuta, executa handleNavigation() e repassa navigate
AppLayout
↓ executa closeMobileMenu()
```
> 📌 Esse padrão é útil quando um componente interno informa uma ação, mas a decisão final pertence a um componente mais acima.

### Ideia principal

1. Dados descem por props.
2. Ações sobem por eventos.
3. Componentes pequenos cuidam de partes específicas da interface.

# 8. 🧩 Item de navegação: `AppMenuItem.vue`

## 🎯 Responsabilidade

`AppMenuItem.vue` representa uma única opção do menu.

Ele recebe um objeto `item` e decide como exibi-lo:

- como link para uma rota;
- como grupo que abre e fecha um submenu;
- como item de um nível mais interno do menu.

Ele também pode renderizar outro `AppMenuItem` dentro de si mesmo. Isso permite criar submenus em vários níveis.

```text
AppMenuItem
├── link simples
│   └── navega para uma rota
└── grupo com filhos
    └── AppMenuItem para cada filho
```
### 📥 Propriedades recebidas

O componente recebe duas props:
```ts
const props = withDefaults(
    defineProps<{
        item: MenuItem
        level?: number
    }>(),
    {
        level: 1,
    },
)
```
| Prop | Tipo | Função |
| --- | --- | --- |
| `item` | `MenuItem` | Contém os dados da opção atual do menu. |
| `level` | `number` | Informa em qual nível do menu o item está. |
```ts
<AppMenuItem :item="item" />
```
A prop level é opcional porque possui um valor padrão:
```ts
level: 1
```
Portanto, o primeiro nível do menu começa em 1.

Quando existir um submenu, o componente enviará o próximo nível para o item filho:
```ts
:level="level + 1"
```
Então termos o seguite:
- nível 1 → item principal
- nível 2 → submenu
- nível 3 → sub-submenu

A `withDefaults()` é usado para definir valores padrão para props opcionais.

A variável props é necessária no bloco `<script setup>` porque o código acessa dados como:

──► `props.item` 

No `<template>`, o Vue permite usar diretamente:
- `item`
- `level`

## 🧰 Imports usados pelo componente

No início de `AppMenuItem.vue`, temos:

```ts
import { computed, ref } from 'vue'
import { RouterLink } from 'vue-router'
import type { MenuItem } from '@/interfaces/MenuItem'
```
| Import | Função |
| --- | --- |
| `ref` | Cria um estado que pode mudar, como saber se um grupo está aberto ou fechado. |
| `computed` | Cria um valor calculado a partir de outros dados. |
| `RouterLink` | Cria links internos entre as páginas da aplicação. |
| `MenuItem` | Define o formato esperado para os dados de uma opção do menu. |
```ts
import type { MenuItem } from '@/interfaces/MenuItem'
```
Indica que MenuItem é usado somente pelo TypeScript para validar a estrutura dos dados.

Ele não é um componente nem uma função que será executada no navegador.

Neste caso, ele é usado para garantir que a prop item possua a estrutura correta:
```ts
item: MenuItem
```

## 🔄 Estado de abertura do submenu

Cada `AppMenuItem` possui seu próprio estado para saber se o submenu está aberto:

```ts
const isExpanded = ref(false)
```
O `isExpanded` começa com o valor: `false`.

Isso significa que, inicialmente, o submenu fica fechado.

Quando o valor mudar para true, o submenu será exibido.
- `false` → submenu fechado
- `true`  → submenu aberto

Como `isExpanded` foi criado com `ref`, no bloco `<script setup>` o valor é alterado usando `.value:`
```ts
isExpanded.value = true
```
No template, o Vue permite usar apenas o nome:
```ts
v-if="isExpanded"
```
Cada instância de `AppMenuItem` possui seu próprio `isExpanded`.

Por exemplo:
- Produtos → aberto
- Usuários → fechado
- Relatórios → aberto

Esses estados não interferem uns nos outros, porque cada item do menu é um componente separado.

## 🔍 Identificação de submenu: `hasChildren`

O componente calcula se o item atual possui filhos:

```ts
const hasChildren = computed(() =>
    Boolean(props.item.filhos?.length)
)
```
O `hasChildren` terá sempre um valor booleano:
- `true`  → o item possui ao menos um filho
- `false` → o item não possui filhos

A verificação usa os dados recebidos pela `prop` `item`:
```ts
props.item.filhos
```
Exemplo de item com submenu:
```ts
{
    id: 'produtos',
    titulo: 'Produtos',
    filhos: [
        { id: 'produtos-listar', titulo: 'Listar Produtos' },
        { id: 'produtos-cadastrar', titulo: 'Cadastrar Produto' },
    ],
}
```
Nesse caso:
- props.item.filhos.length → 2
- hasChildren              → true

Exemplo de item sem submenu:
```ts
{
    id: 'home',
    titulo: 'HOME',
    rota: '/',
}
```
Como filhos não existe nesse item, temos:
- hasChildren → false

> 📌 **I M P O R T A N T E**
>
> `props.item.filhos?.length`
>
> O `?.` é o encadeamento opcional (optional chaining):

Ele evita erro quando a propriedade filhos não existir.

A função `Boolean()` transforma o resultado em true ou false.

o `computed()` é usado porque hasChildren é um valor calculado a partir de outra informação. 

Se os dados de `props.item.filhos` mudarem, o Vue recalcula `hasChildren` automaticamente

## 🔁 Função para abrir e fechar um grupo

A função responsável por alternar o submenu é:

```ts
function toggleGroup() {
    isExpanded.value = !isExpanded.value
}
```
Ela altera o estado isExpanded.

O `!` inverte o valor atual:
- `false → true`
- `true  → false`

Portanto:
```
grupo fechado ► isExpanded = false
        ↓
 clique no grupo ► isExpanded = true
        ↓
 submenu é exibido

grupo aberto ► isExpanded = true
        ↓
 clique no grupo ► isExpanded = false
        ↓
 submenu é ocultado
```
Como isExpanded foi criado com ref, a alteração ocorre por meio de: `isExpanded.value`

No template, essa função será ligada ao clique do botão do grupo: `@click="toggleGroup"`

O Vue atualiza a lista de submenus automaticamente porque ela depende do valor de `isExpanded`.

## 🧱 Item da lista e nível do menu

Cada opção do menu é envolvida por uma tag `<li>`:

```html
<li
    class="app-menu__item"
    :class="`app-menu__item--level-${level}`"
>
```
A tag `<li>` representa um item de uma lista. 

Ela é usada porque o AppMenu possui uma lista `<ul>`.

A classe fixa:
```ts
class="app-menu__item"
```
Ela aplica os estilos comuns a todos os itens do menu.

A segunda classe é dinâmica:
```ts
:class="`app-menu__item--level-${level}`"
```
Ela monta uma classe usando o valor da prop level.

Exemplos:
- level = 1 → app-menu__item--level-1
- level = 2 → app-menu__item--level-2
- level = 3 → app-menu__item--level-3

O uso de crases cria uma template string do JavaScript:
```ts
`app-menu__item--level-${level}`
```
O trecho `${level}` é substituído pelo valor atual da variável.

Assim, o CSS pode aplicar estilos diferentes para cada profundidade do menu, por exemplo:
- nível 1 → item principal
- nível 2 → item com recuo
- nível 3 → item com recuo maior

Esse padrão permite que o mesmo AppMenuItem seja reutilizado em todos os níveis, sem criar um componente diferente para cada tipo de submenu.

## 🔗 Item com rota: `RouterLink`

O primeiro cenário verifica se o item possui uma rota:

```html
<RouterLink
    v-if="item.rota"
        class="app-menu__link"
        :to="item.rota"
        @click="notifyNavigation"
>
``` 
O `v-if="item.rota"` significa:

> 📌 Renderize este link somente se o objeto item possuir uma rota.

Exemplo:
```ts
{
    id: 'produtos-listar',
    titulo: 'Listar Produtos',
    rota: '/produtos',
}
```
Como esse item possui:
```ts
rota: '/produtos'
```
Ele será renderizado como um `RouterLink`.

`RouterLink` é o componente do Vue Router usado para navegar entre páginas da própria aplicação.
```ts
:to="item.rota"
```
Ele envia a rota recebida no objeto atual para o link.

Neste exemplo, o resultado é uma navegação para: `/produtos`

O `:` informa que to recebe o valor real de `item.rota`.

O clique também chama: `@click="notifyNavigation"`

A classe `app-menu__link` aplica os estilos visuais desse link.

## 🎨 Ícone e título do item

Dentro do `RouterLink`, o componente exibe o ícone e o título:

```html
<i
    v-if="item.icone"
    :class="['bi', item.icone]"
    aria-hidden="true"
></i>

<span class="app-menu__label">
    {{ item.titulo }}
</span>
```
O ícone só é renderizado quando o item possui a propriedade icone:
```ts
v-if="item.icone"
```
Exemplo:
```ts
{
    titulo: 'Listar Produtos',
    icone: 'bi-box-seam',
}
```
A classe do ícone é montada como uma lista:
```ts
:class="['bi', item.icone]"
```
Nesse exemplo, o resultado será:
```ts
class="bi bi-box-seam"
```
> `bi` identifica a biblioteca Bootstrap Icons;
> `item.icone` informa qual ícone deve ser exibido.

O título é exibido por interpolação:` {{ item.titulo }}`













