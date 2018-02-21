    angular
        .module('app')
        .component("home", {
            templateUrl: "./components/pages/home/home.html",
        controller: Controller });
    
    function Controller (ContactService, $scope, $state) {

        var self = this;
        self.contact = {};

        this.submitForm = function (form) {
            if (form) {
                saveContact(self.contact);
            } else {
                // setAlertMess("please, check your data")
                throw ('error while submitting contact');
            }
        }

        function saveContact(contact) {
            ContactService.Create(contact).then(function (response) {
                console.log(response)
                var message;
                response.data !== "" ? message = "contact is saved" : message = "error";
                // setAlertMess(mess)
                console.log(message);
                self.contact = {};
            }, function (error) {
                // setAlertMess("error!!!user exist in db")
                throw ('error!!!contact already exists in db');
                self.contact = {};
                self.status = 'Unable to load customer data: ' + error.message;
            });
        }
        // var contact = $scope.contact;

        // $scope.submit = function (contact) {

        //     if (contact) {

        //         submitContact(contact);
    
        //     } else {
    
        //         throw('Cannot submit an empty contact'); 
    
        //     }
        // }

        // function submitContact (contact) {

        //     ContactService.Create(contact)

        //         .then(function (data) {
        //             return data;
        //         })

        //         .catch('There\'s been an error while submitting contact');

        // }
    }
