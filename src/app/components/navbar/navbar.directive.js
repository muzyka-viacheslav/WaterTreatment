export function NavbarDirective() {
  'ngInject';

  let directive = {
    restrict: 'E',
    templateUrl: 'app/components/navbar/navbar.html',
    scope: {
        creationDate: '='
    },
    controller: NavbarController,
    controllerAs: 'vm',
    bindToController: true
  };

  return directive;
}

class NavbarController {
  constructor ($state, $scope, api) {
    'ngInject';
    this.$state = $state;
    this.$scope = $scope;
    this.api = api;
    this.user = {};
    this.loginError = false;
    this.user.login = localStorage.getItem('waterTreatmentLogin');
    this.user.password = localStorage.getItem('waterTreatmentPassword');
    if (this.user.login && this.user.password) {
      this.login();
    }
  }
  login() {
    this.api
      .get('login', {
        login: this.user.login,
        password: this.user.password
      })
      .then(response => {
        this.user = response.data;
        this.$scope.$root.authenticated = true;
        $("#loginModal").modal('hide');
        this.loginError = false;
        localStorage.setItem('waterTreatmentLogin', this.user.login);
        localStorage.setItem('waterTreatmentPassword', this.user.password);
      }, () => {
        this.$scope.$root.authenticated = false;
        this.user = {};
        this.loginError = true;
      });
  }

  logout() {
    this.$scope.$root.authenticated = false;
    this.user = {};
    this.$state.go('home');
    localStorage.removeItem('waterTreatmentLogin');
    localStorage.removeItem('waterTreatmentPassword');
  }
}
