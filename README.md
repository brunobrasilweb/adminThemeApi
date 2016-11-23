# Admin Theme with Spring Boot and AngularJs

Features
---

* REST API with Spring Boot
* OAuth2 Security
* Login Page
* Page 404
* Profile
* Dashboard
* Complete Crud Users

Plugins
---

* [AngularJs] (https://angularjs.org/)
* [Jquery] (https://jquery.com/)
* [Bootstrap 3] (http://getbootstrap.com/)
* [CKEditor] (https://github.com/lemonde/angular-ckeditor)
* [ChartJs] (https://jtblin.github.io/angular-chart.js/)
* [Animate CSS] (https://daneden.github.io/animate.css/)
* [Noty] (http://ned.im/noty/)
* [Bower] (https://bower.io/)
* [Lodash] (https://lodash.com/)
* [moment] (http://momentjs.com/)
* [Angular Loading Bar] (http://chieffancypants.github.io/angular-loading-bar/)

Install
---

Clone repository git
```sh
git clone https://github.com/brunobrasilweb/adminThemeApi.git
```

downloads plugins
```sh
cd project\src\main\resources\static
bower install
```

Config database in application.properties

Spring boot run http://localhost:8080/
```sh
$ cd adminTheme/adminThemeApi
$ mvn spring-boot:run
```

TODO
---

* Bug refreshing the page when the server was restarted
* Role Crud
* Clear form (At moment using Jquery);
