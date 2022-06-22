# Inteli - Instituto de Tecnologia e Liderança

<p align="center">
<a href= "https://www.inteli.edu.br/"><img src="https://www.inteli.edu.br/wp-content/uploads/2021/08/20172028/marca_1-2.png" alt="Inteli - Instituto de Tecnologia e Liderança" border="0"></a>
</p>
<br>

# Yamaha Planning System

## Turma 3 - Grupo 1
## Grupo Kando
<div align="center">
<img src="https://wallpaperaccess.com/full/1766861.jpg">
<a href="https://wallpaperaccess.com/yamaha-logo" target="_blank">Fonte: Wallpaperaccess </a>
</div>

## 🚀 Integrantes:
- <a href="https://www.linkedin.com/in/felipe-saadi/">Felipe Saadi</a>
- <a href="https://www.linkedin.com/in/">Fernando Paiva</a>
- <a href="https://www.linkedin.com/in/gabriel-pascoli-73733b200/">Gabriel Pascoli</a>
- <a href="https://www.linkedin.com/in/iago-tavares-b10244149">Iago Tavares</a>
- <a href="https://www.linkedin.com/in/mateussda/">Mateus Almeida</a>
- <a href="https://www.linkedin.com/in/">Rodrigo Martins</a>
- <a href="https://www.linkedin.com/in/">Vinicius Santos</a>
<br>

## 🏍 Descrição

Yamaha Planning System é uma aplicação web de gestão de capacidade ("capacity planning") dos recursos humanos nos projetos da Yamaha.
<br><br>
Seu principal objetivo é facilitar o processo de análise de disponibilidade de horas dos recursos humanos da Yamaha para projetos e otimizar a alocação dos funcionários em projetos existentes. O sistema Web pode ser utilizado por um gerente para cadastrar funções, funcionários, projetos e alocações. Também pode ser usado para visualizar de forma analítica a situação atual da empresa, em relação aos projetos e as alocação de funcionários, para assim embasar a tomada de decisões.
<br><br>


## 📂 Estrutura de pastas

⬛ Raiz<br>
<br>
◼ documentos<br>
  &emsp;◾ WAD - Grupo 1 Kando - Documento Aplicação Web.pdf<br>
◼ src<br>
  &emsp;◾ controllers (pasta com os arquivos de controllers - C do MVC)<br>
  &emsp;◾ data (banco de dados)<br>
  &emsp;◾ public<br>
    &emsp;&emsp;◾ images (imagens usadas no frontend)<br>
    &emsp;&emsp;◾ javascripts (scripts usados no frontend)<br>
    &emsp;&emsp;◾ stylesheets (css usados no frontend)<br>
  &emsp;◾ routes (pasta com os arquivos de rotas da aplicação)<br>
  &emsp;◾ views (pasta com os arquivos EJS da aplicação - V do MVC)<br>
  <br>
  <br>
  &emsp;◾ eslintrc.json (arquivo de configuração do eslint)<br>
  &emsp;◾ prettierrc.json (arquivo de configuração do prettier)<br>
  &emsp;◾ app.js (arquivo de configuração do express)<br>
  &emsp;◾ package-lock.json (arquivo de configuração do npm)<br>
  &emsp;◾ package.json (arquivo de configuração do npm)<br>

##  🧑‍💻 Instalação

Para instalar o servidor localmente em seu computador, primeiro clone o repositório em sua máquina. Também é necessário ter o `npm` instalado. Após essas configurações, siga os passos abaixo:

1. Abra a pasta `src` deste projeto no VSCode ou na sua IDE preferida.
2. Se estiver usando MacOS ou Linux:
    - Abra o terminal e digite: `npm install`
    - Após, digite no terminal: `npm run serverstart`
3. Se estiver usando Windows:
    - Abra o prompt de comando padrão do windows (`cmd`, não use o Powershell) e digite: `npm install`
    - Após, digite no terminal: `node app.js`
4. Se tudo der certo, a aplicação deve rodar na URL `localhost:8080`. Acesse preferencialmente usando o navegador Google Chrome.

## 💻 Configuração para desenvolvimento

### Prettier e ESLint

O projeto já contém arquivos de configuração para o formatador Prettier (melhora a apresentação do código) e linter ESLint (melhora a qualidade de código). Para usar essas ferramentas, recomendamos baixar as extensões do [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) e do [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) para o VSCode e seguir as instruções de instalação nas respectivas páginas.

### Seeds

Disponibilizamos alguns arquivos de "seed" para popular o banco de dados com algumas informações de teste. Para usá-los, siga os passos abaixo:

1. Instale o `sequelize-cli` no terminal com `npm install -g sequelize-cli`
2. Rode o comando `npx sequelize-cli db:seed:all` na pasta `src`

## 🗃 Histórico de lançamentos (versões)

- 6.0 - 20/06/2020
  - Preenchimento do README.md
  - Revisão dos itens preenchidos previamente no WAD
- 5.0 - 11/06/2020
  - Preenchimento dos itens 7 e 8 do WAD
- 4.0 - 30/05/2022
  - Preenchimento dos itens 4 e 6 do WAD
  - Conclusão do desenvolvimento do backend
- 3.0 - 18/05/2022
  - Preenchimento do item 5 do WAD
  - Conclusão do desenvolvimento do frontend
  - Início do desenvolvimento do backend
- 2.0 - 02/05/2022
  - Preenchimento dos itens 1 a 3 do WAD
  - Início do desenvolvimento do frontend
- 1.0 - 26/04/2022
  - Projeto iniciado

## 🎯 Exemplos de uso

O Yamaha Planning System pode ser usado pela Yamaha para gerenciar seus funcionários, especificamente para a alocação de capacidade horária disponível de trabalho dos funcionários nos diversos projetos existentes.

Para tanto, o sistema permite o cadastro e a manipulação de informações sobre funções, projetos, funcionários e horas de trabalho mensais alocadas.

Também é possível visualizar a média de horas mensais alocadas para cada função, através de uma tabela. A carga horária alocada e disponível também pode ser vista através de um gráfico.

O [Manual do Usuário]() elaborado por nós descreve de forma detalhada como realizar esssas operações.

## 📋 Licença

<p xmlns:cc="http://creativecommons.org/ns#" xmlns:dct="http://purl.org/dc/terms/"><a property="dct:title" rel="cc:attributionURL" href="https://github.com/2022M2T3/Projeto1">Yamaha Planning System</a> by <span property="cc:attributionName">INTELI, Felipe Saadi, Fernando Paiva, Gabriel Pascoli, Iago Tavares, Mateus Almeida, Rodrigo Martins, Vinicius Santos</span> is licensed under <a href="http://creativecommons.org/licenses/by-sa/4.0/?ref=chooser-v1" target="_blank" rel="license noopener noreferrer" style="display:inline-block;">Attribution-ShareAlike 4.0 International<img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/cc.svg?ref=chooser-v1"><img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/by.svg?ref=chooser-v1"><img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/sa.svg?ref=chooser-v1"></a></p>


## 📚 Referências

  - [Site oficial da Yamaha Motors do Brasil](https://www3.yamaha-motor.com.br/)

