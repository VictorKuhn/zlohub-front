
# ZloHub - Frontend

Este é o repositório do frontend do **ZloHub**, uma aplicação ReactJS responsável pela interface visual e interações do usuário. A aplicação foi desenvolvida para conectar cuidadores e responsáveis por pessoas dependentes, facilitando a criação de vagas, candidaturas e gerenciamento de perfis. Este serviço consome APIs fornecidas pelo backend do ZloHub e pelo microserviço de autenticação ZloLogin.

---

## Descrição do Projeto

O frontend do ZloHub é responsável por:
- Prover uma interface amigável e responsiva para os usuários.
- Consumir e interagir com as APIs do backend e microserviços.
  - **Microserviço de Autenticação** (ZloLogin): Gerencia autenticação e autorização via tokens JWT.
  - **Backend do HubZlo**: Gerencia operações como criação de vagas, candidaturas e perfis de cuidadores.
  - **Aplicação Externa para Responsáveis**: Gerencia informações relacionadas aos responsáveis.

Além disso, a aplicação inclui mecanismos de validação no frontend para reduzir erros no envio de dados e melhorar a experiência do usuário.

---

## Estrutura do Projeto

A estrutura do projeto é organizada de forma clara para facilitar a manutenção e escalabilidade:

```plaintext
src
├── components          # Componentes reutilizáveis da interface
├── pages               # Páginas principais do aplicativo (rotas)
├── styles              # Arquivos CSS para estilização
├── App.jsx             # Componente principal da aplicação
├── App.test.jsx        # Testes unitários do componente App
├── index.js            # Ponto de entrada da aplicação
└── reportWebVitals.js  # Métricas de desempenho
```

### Principais Arquivos e Diretórios
- **`components/`**: Contém componentes reutilizáveis como cabeçalhos, botões e formulários.
- **`pages/`**: Contém as páginas principais, como `Home`, `Login`, `Cadastro`, e `Vagas`.
- **`styles/`**: Contém os arquivos CSS para manter uma separação de responsabilidades na estilização.
- **`App.jsx`**: Componente raiz que organiza as rotas e estrutura básica da aplicação.
- **`App.test.jsx`**: Contém os testes do componente principal para garantir a estabilidade do projeto.

---

## Pré-requisitos

Antes de rodar o projeto, certifique-se de ter as seguintes ferramentas instaladas:

- **Node.js** (versão 16 ou superior): Para executar o ambiente de desenvolvimento ReactJS.
- **NPM** ou **Yarn**: Para gerenciar pacotes e dependências.

Além disso, certifique-se de configurar os backends relacionados:

- **Configuração do Microserviço de Login**: [Clique aqui](https://github.com/VictorKuhn/zloLogin/wiki/Configuracao-do-Ambiente)
- **Configuração do Backend do HubZlo**: [Clique aqui](https://github.com/VictorKuhn/zloHubBackend/wiki/Configuracao-do-Ambiente)

---

## Configuração do Ambiente Local

### 1. Clonar o Repositório
```bash
git clone https://github.com/seu-usuario/zlohub-frontend.git
cd zlohub-frontend
```

### 2. Instalar Dependências
```bash
npm install
```

### 3. Rodar o Projeto
Inicie o servidor de desenvolvimento:
```bash
npm start
```

O aplicativo estará disponível em: [http://localhost:3000](http://localhost:3000).

---

## Scripts Disponíveis

No diretório do projeto, os seguintes scripts podem ser executados:

### `npm start`
Inicia o servidor de desenvolvimento.

### `npm test`
Executa os testes unitários.

### `npm run build`
Cria uma versão otimizada da aplicação para produção no diretório `build/`.

### `npm run eject`
Remove a configuração padrão do React para personalizações avançadas (use com cautela).

---

## Segurança e Validações

### Validação de Sessão
A aplicação realiza validações constantes do token JWT fornecido pelo microserviço de autenticação. Caso o token seja inválido ou manipulado, o usuário será desconectado automaticamente.

### Validações no Frontend
Os formulários de cadastro possuem validações no frontend para evitar o envio de dados incorretos ao backend, garantindo que apenas dados consistentes sejam processados.

---

## Contribuição

Contribuições são bem-vindas! Caso encontre algum problema ou tenha sugestões, sinta-se à vontade para abrir uma issue ou enviar um pull request.
