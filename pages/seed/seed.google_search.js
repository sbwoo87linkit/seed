app.controller('seed.google_search', function ($scope, $rootScope) {

    function initKeywords() {
        $scope.keywords = [ 'seed', 'germination', 'ecology', 'longevity', 'viability', 'physiology'];
        $scope.selection = [];
    }
    initKeywords();

    function buildKeywords(data) {
        initKeywords();
        $scope.data = data;
        // 찾은 이름으로 구글검색을 구성

        // $scope.initSearchKeywords($scope.data.name2)
        $scope.keywords.unshift($scope.data.name2);
        $scope.selection.unshift($scope.data.name2);

        if ($scope.data.name3) {
            $scope.keywords.unshift($scope.data.name3);
            $scope.selection.unshift($scope.data.name3);
        }

    }

    $scope.$on('seed.found', function (event, data) {
        buildKeywords(data);
    });

    $scope.$on('seed.changed', function (event, data) {
        buildKeywords(data);
    });


    $scope.keywordChecked = function(item) {
        var idx = $scope.selection.indexOf(item);
        if (idx > -1) {
            $scope.selection.splice(idx, 1);
        }
        else {
            $scope.selection.push(item);
        }
    };

    $scope.addKeyword = function (keyword) {
        if ($scope.keywords.indexOf(keyword) === -1) {
            $scope.keywords.push(keyword);
            $scope.selection.push(keyword);
        }
        $scope.keyword = '';
    }

    $scope.site = {};
    $scope.site.name = 'Google Scholar Search'
    $scope.search = function() {

        console.log($scope.selection);
        if ($scope.selection.length < 1) {
            $rootScope.modalMessage = 'Please select keywords.'
            $('#myModal').modal('show')
            return;
        }


        var prefix = '';
        switch($scope.site.name) {
            case 'Google Scholar Search':
                prefix = 'https://scholar.google.com/scholar?q=';
                break;
            case 'Google Search':
                prefix = 'https://www.google.com/search?q=';
                break;
            case 'Google Image Search':
                prefix = 'https://www.google.com/search?tbm=isch&q=';
                break;
        }
        var q = $scope.selection.join('+');
        var url = prefix + q;
        window.open(url, '_blank', 'location=yes,scrollbars=yes,status=yes');
    }


})
