<div align="center">
  <br>
  <img alt="makesense" src="./frontend/src/assets/Image makesense readme.jpg" width="300px">
  <h1>👨‍💻 An Internal Decision Manager 👨‍💻</h1>
  <strong>By SenseMakers</strong>
  
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/slinkity/slinkity/blob/main/LICENSE.md)
</div>
<br>


<div align="center">
  <img src="https://img.shields.io/badge/linkedin-%230077B5.svg?&style=for-the-badge&logo=linkedin&logoColor=white" />
  <div>
    <a href="https://www.linkedin.com/in/frederico-cassola-08b01a59/">🙋‍♂️Frederico Cassola</a>
    <a href="https://www.linkedin.com/in/charlotte-charrier-81b48215b/">🙋Charlotte Charrier</a>
    <a href="https://www.linkedin.com/in/nicolas-lopes-21441478/">🙋‍♂️Nicolas Lopes</a>
    <a href="https://www.linkedin.com/in/damarn/">🙋‍♂️Damien Arnaud</a>
    <a href="https://www.linkedin.com/in/alarichenrot/">🙋‍♂️Alaric Henrot</a>
  </div>
</div>


### Project Initialization

- In VSCode, install plugins **Prettier - Code formatter** and **ESLint** and configure them
- Clone this repo, enter it
- If you are using `yarn` or `pnpm`, adapt the `config/cli` in `package.json`
- Run command `npm install`
- _NB: To launch the backend server, you'll need an environment file with database credentials. You'll find a template one in `backend/.env.sample`_

### Available Commands

- `migrate` : Run the database migration script
- `dev` : Starts both servers (frontend + backend) in one terminal
- `dev-front` : Starts the React frontend server
- `dev-back` : Starts the Express backend server
- `lint` : Runs validation tools, and refuses unclean code (will be executed on every _commit_)
- `fix` : Fixes linter errors (run it if `lint` growls on your code !)

## FAQ

### Tools

- _Concurrently_ : Allows for several commands to run concurrently in the same CLI
- _Husky_ : Allows to execute specific commands that trigger on _git_ events
- _Vite_ : Alternative to _Create-React-App_, packaging less tools for a more fluid experience
- _ESLint_ : "Quality of code" tool, ensures chosen rules will be enforced
- _Prettier_ : "Quality of code" tool as well, focuses on the styleguide
- _ Airbnb Standard_ : One of the most known "standards", even though it's not officially linked to ES/JS
- _Nodemon_ : Allows to restart the server everytime a .js file is udated
