export class AboutController {
  constructor($scope) {
    'ngInject';
    this.awesomeThings = [
      {
        'title': 'AngularJS',
        'url': 'https://angularjs.org/',
        'description': 'HTML enhanced for web apps!',
        'logo': 'angular.png'
      },
      {
        'title': 'Node.js',
        'url': 'https://nodejs.org/',
        'description': "Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine. Node.js' package ecosystem, npm, is the largest ecosystem of open source libraries in the world.",
        'logo': 'nodejs.png'
      },
      {
        'title': 'Express.js',
        'url': 'http://expressjs.com/',
        'description': 'Fast, unopinionated, minimalist web framework for Node.js',
        'logo': 'Expressjs.png'
      },
      {
        'title': 'BrowserSync',
        'url': 'http://browsersync.io/',
        'description': 'Time-saving synchronised browser testing.',
        'logo': 'browsersync.png'
      },
      {
        'title': 'GulpJS',
        'url': 'http://gulpjs.com/',
        'description': 'The streaming build system.',
        'logo': 'gulp.png'
      },
      {
        'title': 'Karma',
        'url': 'http://karma-runner.github.io/',
        'description': 'Spectacular Test Runner for JavaScript.',
        'logo': 'karma.png'
      },
      {
        'title': 'Bootstrap',
        'url': 'http://getbootstrap.com/',
        'description': 'Bootstrap is the most popular HTML, CSS, and JS framework for developing responsive, mobile first projects on the web.',
        'logo': 'bootstrap.png'
      },
      {
        'title': 'Angular UI Bootstrap',
        'url': 'http://angular-ui.github.io/bootstrap/',
        'description': 'Bootstrap components written in pure AngularJS by the AngularUI Team.',
        'logo': 'ui-bootstrap.png'
      },
      {
        'title': 'Less',
        'url': 'http://lesscss.org/',
        'description': 'Less extends the CSS language, adding features that allow variables, mixins, functions and many other techniques.',
        'logo': 'less.png'
      },
      {
        'title': 'ES6 (Babel formerly 6to5)',
        'url': 'https://babeljs.io/',
        'description': 'Turns ES6+ code into vanilla ES5, so you can use next generation features today.',
        'logo': 'babel.png'
      }
    ];
    this.aboutItems = [
      {
        title: 'Автор',
        value: 'Музика Вячеслав'
      },
      {
        title: 'Тема',
        value: 'Лікувальні води України'
      },
      {
        title: 'Група',
        value: 'TM-32'
      },
      {
        title: 'Університет',
        value: 'НТУУ "КПІ"'
      },
      {
        title: 'Дипломний керівник',
        value: 'Шульженко Олег Феодосійович'
      }
    ];
  }
}
