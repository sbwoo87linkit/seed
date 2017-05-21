var app = angular.module('myApp', ['ngAnimate', 'ngSanitize', 'ui.bootstrap', 'ui.router']);

app.config(function($stateProvider, $urlRouterProvider) {
    var introState = {
        name: 'intro',
        url: '/intro',
        templateUrl: 'pages/intro/intro.html',
        controller: 'intro'
    }

    var seedState = {
        name: 'seed',
        url: '/seed',
        views: {
            '': {
                templateUrl: 'pages/seed/seed.html',
                controller: 'seed',
            },
            'info@seed': {
                templateUrl: 'pages/seed/seed.info.html',
                controller: 'seed.info',
            },
            'equilibrium@seed': {
                templateUrl: 'pages/seed/seed.equilibrium.html',
                controller: 'seed.equilibrium',
            },
            'result@seed': {
                templateUrl: 'pages/seed/seed.result.html',
                controller: 'seed.result',
            },
            'google_search@seed': {
                templateUrl: 'pages/seed/seed.google_search.html',
                controller: 'seed.google_search',
            },
        }
    }

    var aboutState = {
        name: 'about',
        url: '/about',
        template: '<h1>about</h1>',
        // controller: 'seed'
    }

    $urlRouterProvider.otherwise('/seed');

    $stateProvider.state(seedState);
    $stateProvider.state(introState);
    $stateProvider.state(aboutState);

})

app.run(function ($state, $stateParams, $window, $rootScope, $transitions) {

    // $rootScope.$state = $state;
    // $rootScope.$stateParams = $stateParams;


    $transitions.onStart( { to: 'seed' }, function(trans) {
        var organization = $window.localStorage.getItem('organization');
        // console.log('organization', organization)

        if (!organization) {
            console.log('transition to intro')
            return $state.target("intro");
        }
    })
})





app.controller('MainController', function ($scope, $http, $q, $filter, filterFilter, $log, $timeout, $window) {



})