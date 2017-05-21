app.controller('intro', function ($scope, $window, $state) {
    console.log('intro');

    $scope.organizationName = "(사)한국식물종자연구원"

    $scope.saveOrganization = function (newOrganization) {
        console.log('save')
        $window.localStorage.setItem('organization', newOrganization);
        $scope.organization = newOrganization;
        $state.go('seed')
    }


})
