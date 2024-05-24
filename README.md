# Clube de Futebol

O projeto Clube de Futebol foi desenvolvido ao final do módulo de Back-end no curso da Trybe. Neste projeto, foi criada uma API com dados de classificação de times de futebol, apresentando informações sobre partidas em andamento e finalizadas, com a possibilidade de login. Na aplicação, como demonstrado no GIF, foram implementados filtros para times mandantes e visitantes, assim como é possível filtrar partidas finalizadas e em andamento.

Este projeto foi elaborado com a arquitetura Model, Service e Controller, utilizando programação orientada a objetos (POO) e a linguagem TypeScript. Todo o Back-end foi desenvolvido por mim, enquanto o Front-end já estava implementado no projeto.


![Demonstração do Projeto](gitFC.gif)

## Tecnologias Utilizadas

- Docker
- Node.js
- Express
- MySQL
- Sequelize
- TypeScript
- Testes: Mocha, Chai, Sinon

## Dependências Necessárias

Para rodar o projeto em seu computador, é necessário ter o Docker e o Docker Compose instalados, ou o Node.js na versão igual ou superior à 16.14.0 LTS.

### Docker

O Docker torna a execução do projeto mais fácil. Para começar:

1. Baixe o Docker clicando [aqui](https://www.docker.com/products/docker-desktop/), e escolha o seu sistema operacional.
2. Instale o Docker Compose, se necessário. Você pode encontrar instruções [aqui](https://docs.docker.com/compose/install/standalone/).

Siga os passos em 'Rodando a Aplicação' abaixo para iniciar o projeto.

<details>
  <summary>Para usar a versão 16.14.0 LTS ou superior do Node.js:</summary>

  - Gerencie as versões do Node.js e utilize a versão correta. Você pode instalar o nvm seguindo [este link](https://github.com/nvm-sh/nvm#installing-and-updating).
  - Execute os comandos abaixo para instalar e usar a versão correta do Node.js:
    - `nvm install 16.14 --lts`
    - `nvm use 16.14`
    - `nvm alias default 16.14`
</details>

## Rodando a Aplicação 

Para rodar a aplicação, siga estes passos:

1. Clone o repositório usando o link SSH.

    * `git clone <link-ssh-do-repositório>`

2. Entre na pasta do projeto:
    * `cd pasta-do-repositório`

3. Instale as dependências (se necessário):
    * `npm install`

4. Inicie com Docker na raiz do projeto:

    * `npm run compose:up`


* **No back-end, representado por um comando lsof, que vai procurar aplicações ativas na porta definida (por padrão, no caso 3001);**
* **No front-end, representado por um comando lsof, que vai procurar aplicações ativas na porta definida (por padrão, no caso 3000).**

### Removendo os Containers e Imagens

Para remover os containers:

*   `npm run compose:down`


Para remover as imagens:

*   `docker images` - para listar as imagens
*   `docker rmi <image_id>` - para remover por ID


## Rodando os Testes 

Todos os testes estão na pasta `app/backend/src/tests/change.me.test.ts`. Para executá-los, siga estes passos:

1. Entre no contêiner de Back-end:

*   `docker exec -it app_backend sh`


2. No terminal do contêiner, execute:

| Comando               | Resultado                                           |
|-----------------------|-----------------------------------------------------|
| `npm run test`        | Executa todos os testes no terminal                |
| `npm run test:coverage`| Executa todos os testes e mostra a cobertura       |







