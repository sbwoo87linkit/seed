app.controller('seed', function ($scope, $state, $window) {

    /**
     * 기관명 Splash 페이지. local storage에 저장
     */
    $scope.organization = $window.localStorage.getItem('organization');


    $scope.deleteOrganization = function () {
        $window.localStorage.removeItem('organization')
        $state.go('intro')
    }

})
