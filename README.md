# Tema Admin AngularJs
Tema padrão para aplicações com admin com Spring e AngularJs

Características
---

* REST API com Spring Boot
* Página de Login
* Dashboard
* Crud Usuários (busca, paginação e cadastro em modal)

Plugins
---

* AngularJs
* Jquery
* Bootstrap 3
* CKEditor
* ChartJs
* Animate CSS
* Noty
* Bower
* Lodash

Install
---

Baixar o tema
```sh
git clone https://github.com/brunobrasilweb/adminThemeApi.git
```

Instalar os plugins
```sh
cd project\src\main\resources\static
bower install
```

Configurar conexão com banco de dados em application.properties

Rodar Spring Boot Rest API http://localhost:8080/
```sh
$ cd adminTheme/adminThemeApi
$ mvnw spring-boot:run
```

TODO
---

* Salvar a senha criptografada do usuário;
* Correção para limpar o formulário de cadastro (por enquanto ta com Jquery);
* Login com autenticação;
* Edição do usuário;
* Loading único;