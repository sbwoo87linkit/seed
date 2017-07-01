app.controller('seed.info', function ($scope, $rootScope) {

    $scope.family = [];
    d3.csv('data/family.csv', function (data) {
        $scope.$apply(function () {

            for(var i=0; i < data.length; i++) {
                $scope.family.push(data[i].Family)
            }
        });
    });

    $scope.genus = [];
    d3.csv('data/genus.csv', function (data) {
        $scope.$apply(function () {

            for(var i=0; i < data.length; i++) {
                $scope.genus.push(data[i].Genus)
            }
        });
    });


    d3.csv('data/seed.csv', function (data) {
        $scope.$apply(function () {
            $scope.seedData = data;
        });
    });

    d3.csv('data/exception_genus.csv', function (data) {
        $scope.$apply(function () {
            $scope.exception_genus = data;
            // console.log($scope.exception_genus)
        });
    });

    d3.csv('data/exception_family.csv', function (data) {
        $scope.$apply(function () {
            $scope.exception_family = data;
            // console.log($scope.exception_genus)
        });
    });

    $scope.message = 'No data';
    // $rootScope.app = {lotNo : 'A123'};
    $scope.data = {
        "name1": "GRAMINEAE",
        "name2": "Entandrophragma",
        "name3": "angolense",
        "name4": "",
        "name5": "",

        "lotNo": "A123",

        "waterValue": 5.2,
        "inventoryCondition": -20,

        "inventoryDate": "2017.01.01",
        "weight": 1000,
        "kiloLipWeight": 27.5,
        "lipCount": 0,

        "inventoryPower": 60
    }


    $scope.findSpecies = function () {

        if (!$scope.data.name1) {
            $rootScope.modalMessage = 'Family field is required.';
            $('#myModal').modal('show');
            return;
        }

        if (!$scope.data.name2) {
            $rootScope.modalMessage = 'Genus field is required.';
            $('#myModal').modal('show');
            return;
        }

        if (!$scope.data.name3) {
            $rootScope.modalMessage = 'Epithet field is required.'
            $('#myModal').modal('show')
            return;
        }

        if ($scope.data.name4 && !$scope.data.name5) {
            $rootScope.modalMessage = 'Variance Epithet field is required.'
            $('#myModal').modal('show')
            return;
        }

        var searchName = $scope.data.name2 + " " + $scope.data.name3 + " " + $scope.data.name4 + " " + $scope.data.name5;
        searchName = searchName.trim();
        var searchResults = $scope.seedData.filter(function (item) {
            return item.name == searchName
        });

        var seedName = "";

        if (searchResults.length > 0) {
            $scope.message = 'Found';
            $scope.data.Ke = searchResults[0].Ke;
            $scope.data.Cw = searchResults[0].Cw;
            $scope.data.Ch = searchResults[0].Ch;
            $scope.data.Cq = searchResults[0].Cq;
            $scope.data.refDoc = searchResults[0].ref
            seedName = $scope.data.name2 + " " + $scope.data.name3 + "-" + $scope.data.refDoc;
        } else {

            // genus 예외처리
            searchResults = $scope.exception_genus.filter(function (item) {
                return item.Genus == $scope.data.name2
            });

            if (searchResults.length > 0) {
                $scope.message = 'Genus alternative';
                $scope.data.name2 = searchResults[0].Genus;
                $scope.data.Ke = searchResults[0].Ke;
                $scope.data.Cw = searchResults[0].Cw;
                $scope.data.Ch = searchResults[0].Ch;
                $scope.data.Cq = searchResults[0].Cq;
                $scope.data.refDoc = searchResults[0].ref
                seedName = $scope.data.refDoc;
            } else {

                // family 예외 처리
                searchResults = $scope.exception_family.filter(function (item) {
                    // console.log(item)
                    return item.Family == $scope.data.name1
                });
                console.log(searchResults)

                if (searchResults.length > 0) {
                    $scope.message = 'Family alternative';
                    // $scope.data.name2 = searchResults[0].Family;
                    // $scope.data.name3 = "";
                    // $scope.data.name4 = "";
                    // $scope.data.name5 = "";
                    $scope.data.Ke = searchResults[0].Ke;
                    $scope.data.Cw = searchResults[0].Cw;
                    $scope.data.Ch = searchResults[0].Ch;
                    $scope.data.Cq = searchResults[0].Cq;
                    $scope.data.refDoc = searchResults[0].ref
                    seedName = $scope.data.refDoc;
                } else {

                    // 최종 constant 처리

                    $scope.message = 'Constant alternative';
                    // $scope.data.name2 = "Entandrophragma";
                    // $scope.data.name3 = "angolense";
                    // $scope.data.name4 = "";
                    // $scope.data.name5 = "";
                    $scope.data.refDoc = "Entandrophragma angolense(Tompsett, 1992)";

                    $scope.data.Ke = 4.6;
                    $scope.data.Cw = 2.21;
                    $scope.data.Ch = 0.033;
                    $scope.data.Cq = 0.000478;
                    seedName = $scope.data.refDoc;
                }
            }
        }
        // var seedName = $scope.data.name2;
        // if ($scope.data.name3) seedName = seedName + ' ' + $scope.data.name3;
        // if ($scope.data.name4) seedName = seedName + ' ' + $scope.data.name4 + ' ' + $scope.data.name5;
        $scope.data.seedName = seedName;
        $rootScope.$broadcast('seed.found', $scope.data)
    }

    $scope.startsWith = function(state, viewValue) {
        return state.substr(0, viewValue.length).toLowerCase() == viewValue.toLowerCase();
    }

    $('#sandbox-container input').datepicker({});
    $scope.varNames = {'subsp.': 'subsp.', 'var.': 'var.', 'for.': 'for.', 'cv.': 'cv.'};
    $scope.varNameChanged = function () {
        if (!$scope.data.name4) {
            $scope.isVarEmpty = true;
        } else {
            $scope.isVarEmpty = false;
        }
        // $scope.data.name5 = '';
    }

    $scope.seedChanged = function (item) {
        if (item === null) return;
        var fullName = item.name.trim();
        var arrNames = fullName.split(' ');

        $scope.data.name2 = arrNames[0];
        $scope.data.name3 = arrNames[1];
        if (arrNames.length > 2) {
            $scope.data.name4 = arrNames[2];
            $scope.data.name5 = arrNames[3];
        } else {
            $scope.data.name4 = '';
            $scope.data.name5 = '';
        }

        var filteredItems = $scope.nameData.filter(function (item) {
            return item.Genus === arrNames[0];
        })

        if (filteredItems.length > 0) {
            $scope.data.name1 = filteredItems[0].Family;
        } else {
            $scope.data.name1 = '';
        }
    }

    $scope.findSeed = function () {
        var name = ($scope.data.name2 + ' ' + $scope.data.name3 + ' ' + $scope.data.name4 + ' ' + $scope.data.name5).trim();
        $scope.mySeed = null;
        for (var i=0; i < $scope.seedData.length;i++) {
            if (name === $scope.seedData[i].name) {
                $scope.mySeed = $scope.seedData[i];
            }
        }
    }

    $scope.calculateLipCount = function () {
        $scope.data.lipCount = Math.round($scope.data.weight / $scope.data.kiloLipWeight * 1000);
    }

    $scope.calculateLipCount()
})
