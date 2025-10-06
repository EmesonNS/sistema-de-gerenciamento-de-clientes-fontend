# Sistema de Gerenciamento de Clientes (Frontend)

> Este é o frontend do Sistema de Gerenciamento de Clientes, uma aplicação web desenvolvida com React para interagir com uma API backend, permitindo a gestão completa de clientes.

---

## Sumário

* Sobre o Projeto
* Backend
* Tecnologias
* Estrutura do Projeto
* Variaveis de Ambiente
* Requisitos
* Funcinalidades
* Instalação e Configuração
* Como Executar
* Interface do Sistema
* Contribuição

---

## Sobre o Projeto

Este é o repositório do Frontend para o Sistema de Gerenciamento de Clientes. A aplicação foi desenvolvida com React e tem como objetivo fornecer uma interface de usuário rica e interativa para consumir a API RESTful do backend. Através desta interface, um usuário autenticado pode realizar operações de CRUD (Create, Read, Update, Delete) para gerenciar clientes.

---

## Backend

Esta aplicação frontend consome dados de uma API RESTful. O projeto backend correspondente pode ser encontrado no seguinte repositório:

  * **Repositório do Backend:** [EmesonNS/sistema-de-gerenciamento-de-clientes-backend](https://github.com/EmesonNS/sistema-de-gerenciamento-de-clientes-backend)

Para que a aplicação frontend funcione corretamente, é **essencial** que o servidor backend esteja em execução. Por favor, siga as instruções no `README.md` do repositório do backend para configurá-lo e executá-lo.

---

## Tecnologias

  * **JavaScript (React)**
  * **CSS**
  * **HTML**

---

## Estrutura do Projeto

```
sistema_gerenciamento_clientes-frontend/
├─ public/              # Arquivos publicos do react
│  └─ assets/           # Imagens utilizadas no projeto
├─ src/                 # Pasta prinicipal do projeto contendo todos os componentes, pages e lógica de segurança
|  ├─ components/       # CardCliente, ClienteForm, PrivateRoute...
|  ├─ contexts/         # AuthContext
|  ├─ pages/            # Dashboard, Login, NovoCliente, EditarCliente
│  └─ services/         # api, auth
├─ App.js               # Chamada principal das rotas
└─ ...                  # Arquivos padrões do react
```

---

## Variaveis de Ambiente

A aplicação precisa saber o endereço da API do backend. Crie um arquivo chamado .env na raiz do projeto e adicione a seguinte variável:
```
REACT_APP_URL_BACKEND=http://localhost:8080/api/v1
```
  **Nota:** É fundamental que a variável de ambiente tenha o exato nome REACT_APP_URL_BACKEND.

---

## Requisitos

Antes de começar, você precisará ter as seguintes ferramentas instaladas em sua máquina:

  * [Node.js](https://nodejs.org/en/)
  * [Git](https://git-scm.com/)

---

## Funcionalidades

  * Autenticação de usuários (Login).
  * Listagem de clientes.
  * Cadastro de novos clientes.
  * Edição de informações de clientes existentes.
  * Exclusão de clientes.
  * Dashboard com um resumo do status dos clientes.

---

## Instalação e Configuração

Siga os passos abaixo para configurar e executar o projeto localmente:

1.  **Clone o repositório:**

    ```bash
    git clone https://github.com/EmesonNS/sistema-de-gerenciamento-de-clientes-fontend.git
    ```

2.  **Acesse o diretório do projeto:**

    ```bash
    cd sistema-de-gerenciamento-de-clientes-fontend
    ```

3.  **Instale as dependências:**

    ```bash
    npm install
    ```

---

## Como Executar

Após a instalação das dependências, você pode executar a aplicação em modo de desenvolvimento:

```bash
npm start
```

Isso iniciará o servidor de desenvolvimento. Abra seu navegador e acesse [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000) para ver a aplicação em funcionamento. A página será recarregada automaticamente se você fizer alterações no código.

---

## Interface do Sistema

### Tela de Login
<table>
 <thead>
  <tr>
   <th>Login</th>
   <th>Login Erro</th>
  </tr>
 </thead>
 <tbody>
  <tr>
   <td aling="center"><img src="/screenshot/Tela de login.png" wigth="200"</td>
   <td aling="center"><img src="/screenshot/Tela de login erro.png" wigth="200"</td>
  </tr>
 </tbody>
</table>

---

### Tela Principal
<table>
 <thead>
  <tr>
   <th>Dashboard</th>
   <th>Cards</th>
  </tr>
 </thead>
 <tbody>
  <tr>
   <td aling="center"><img src="/screenshot/Tela Inicial.png" wigth="200"</td>
   <td aling="center"><img src="/screenshot/Cards.png" wigth="200"</td>
  </tr>
 </tbody>
</table>

---

### Formulário

<table>
 <thead>
  <tr>
   <th>Formulário</th>
   <th>Formulário Erro</th>
  </tr>
 </thead>
 <tbody>
  <tr>
   <td aling="center"><img src="/screenshot/Formulario.png" wigth="200"</td>
   <td aling="center"><img src="/screenshot/Formulario erro.png" wigth="200"</td>
  </tr>
 </tbody>
</table>

---

## Contribuição

1. Faça um fork do projeto
2. Crie uma branch com sua feature (`git checkout -b minha-feature`)
3. Faça o commit (`git commit -m 'Adiciona nova feature'`)
4. Envie (`git push origin minha-feature`)
5. Abra um Pull Request

---
