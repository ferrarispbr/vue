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
> 🔑 A separação existe para evitar que um único arquivo concentre layout,
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
> 💡 Esse import traz o componente raiz para que o Vue consiga usá-lo como ponto
inicial da interface.

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


> 💡 Agora, antes de explicar cada linha, guarde esta ideia:
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
> 🔑 App.vue é a porta de entrada da interface. 
>
> Ele delega a construção visual para AppLayout.vue.

---

# 4. 🖥️ Layout principal: `AppLayout.vue`

## 📋 Responsabilidade

`AppLayout.vue` organiza a estrutura visual comum da aplicação.

Ele define onde ficam:

- topo;
- menu;
- área principal de conteúdo;
- rodapé.

Ele não precisa conter toda a implementação dessas partes. Sua função é reunir os
componentes responsáveis por cada uma delas.

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



















