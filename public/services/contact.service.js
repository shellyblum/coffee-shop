(function () {
    'use strict';

    angular
        .module('app')
        .factory('ContactService', Service);

    function Service($http, $q) {
        const service = {};
        const url = '/api/contacts';

        service.GetAll = GetAll;
        service.Create = Create;

        return service;

        function GetAll() {
            return $http.get(url).then(handleSuccess, handleError);
        }

        function Create(contact) {
            return $http.post(url, contact).then(handleSuccess, handleError);
        }

        // private functions

        function handleSuccess(res) {
            return res.data;
        }

        function handleError(res) {
            return $q.reject(res.data);
        }
    }

})();
