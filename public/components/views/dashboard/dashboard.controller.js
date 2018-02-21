angular
.module('app')
.component("dashboard", {
    templateUrl: "./components/views/dashboard/dashboard.html",
    controller: Controller });

function Controller (ContactService, $scope, $state) {

    const self = this;
    self.contacts = {};
    self.user = null;

    self.$onInit = function () {
        initController();
    }

    ContactService.GetAll().then(function (contacts) {
        self.contacts = contacts;
    })
    .catch('cannot get contacts');

}
 
 // angular
    //     .module('app')
    //     .component("home", {
    //         templateUrl: "./components/pages/home/home.html",
    //     controller: Controller });
    
    // function Controller (UserService, ContactService) {
    //     var vm = this;

        // vm.contacts = []; 
        // vm.user = null;

        // this.$onInit = function () {
        //     initController();
        // }
        
        // function initController () {

        //     UserService.GetCurrent().then(function (user) {
        //         vm.user = user;
        //     });

        //     ContactService.GetAll().then(function (contacts) {
        //         vm.contacts.push(contacts);
        //     })
        //     .catch('cannot get contacts');
        // }

    // }