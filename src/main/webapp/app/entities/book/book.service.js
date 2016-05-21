(function() {
    'use strict';
    angular
        .module('mygatewayappApp')
        .factory('Book', Book);

    Book.$inject = ['$resource', 'DateUtils'];

    function Book ($resource, DateUtils) {
        var resourceUrl =  'mymicroserviceapp/' + 'api/books/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    if (data) {
                        data = angular.fromJson(data);
                        data.publishDate = DateUtils.convertLocalDateFromServer(data.publishDate);
                    }
                    return data;
                }
            },
            'update': {
                method: 'PUT',
                transformRequest: function (data) {
                    data.publishDate = DateUtils.convertLocalDateToServer(data.publishDate);
                    return angular.toJson(data);
                }
            },
            'save': {
                method: 'POST',
                transformRequest: function (data) {
                    data.publishDate = DateUtils.convertLocalDateToServer(data.publishDate);
                    return angular.toJson(data);
                }
            }
        });
    }
})();
