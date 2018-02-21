angular.module('app').component("login", {
    templateUrl: "./components/views/login/login.html",
    controller: function ($scope,  $window, $state,LoginService) {
        var self = this;
        self.user = {};

        // function setAlertMess(mess) {
        //     self.showmessalert = true;
        //     self.message = mess;
        //     self.user = {};
        // }

        this.Login = function () {
            LoginService.login(self.user).then(function (response) {
                console.log(response.data === "ok")
                if(response.data === "ok"){
                    $window.sessionStorage.setItem('user', angular.toJson(self.user));
                    $state.go('dashboard');
                }else{
                    alert('Try again, not logged in');
                }
            }, function (error) {
                throw(error);
            });
            console.log(self.user);
        }

        this.$onInit = function () {
           
        }

    }
})