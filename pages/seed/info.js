app.controller('seed.info', function ($scope, $rootScope) {

    /**
     * csv data load
     */

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


    /**
     * scope variable
     * @type {{}}
     */

    $scope.message = 'No data';



    // $scope.app = {}

    $scope.data = {
        "name1": "",
        "name2": "Entandrophragma",
        "name3": "angolense",
        // "name2": "Vigna",
        // "name3": "radiata__",
        "name4": "",
        "name5": "",

        "waterValue": 5.2,
        "inventoryCondition": -20,

        "inventoryDate": "2017.01.01",
        "weight": 1000,
        "kiloLipWeight": 27.5,
        "lipCount": 0,

        "inventoryPower": 60, //99

        // "groundValue": 2.2,
        // "dryTemperature": 15,
        // "dryHumidity": 15,
        // "resultWaterValue": 0,
    }


    $scope.findSpecies = function () {
        // console.log('find species')

        if (!$scope.data.name2) {
            $rootScope.modalMessage = 'Genus field is required.'
            $('#myModal').modal('show')
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

        // console.log(searchName.toLowerCase())
        // console.log($scope.seedData);

        var searchResults = $scope.seedData.filter(function (item) {
            return item.name == searchName
        });

        // console.log('searchResults', searchResults)

        if (searchResults.length > 0) {
            $scope.message = 'Found';
            $scope.data.Ke = searchResults[0].Ke;
            $scope.data.Cw = searchResults[0].Cw;
            $scope.data.Ch = searchResults[0].Ch;
            $scope.data.Cq = searchResults[0].Cq;
            $scope.data.refDoc = searchResults[0].ref
        } else {
            // Genus 예외 테이블에서 Genus를 확인
            searchResults = $scope.exception_genus.filter(function (item) {
                return item.Genus == $scope.data.name2
            });

            if (searchResults.length > 0) {
                $scope.message = 'Genus alternative';
                $scope.data.name2 = searchResults[0].Genus;
                $scope.data.name3 = "";
                $scope.data.name4 = "";
                $scope.data.name5 = "";
                $scope.data.Ke = searchResults[0].Ke;
                $scope.data.Cw = searchResults[0].Cw;
                $scope.data.Ch = searchResults[0].Ch;
                $scope.data.Cq = searchResults[0].Cq;
                $scope.data.refDoc = searchResults[0].ref
            } else {
                console.log('not found');
                // Alternative Value
                $scope.message = 'Constant alternative';
                $scope.data.name2 = "Entandrophragma";
                $scope.data.name3 = "angolense";
                $scope.data.name4 = "";
                $scope.data.name5 = "";
                $scope.data.refDoc = "Tompsett, 1992";

                $scope.data.Ke = 4.6;
                $scope.data.Cw = 2.21;
                $scope.data.Ch = 0.033;
                $scope.data.Cq = 0.000478;
            }


            // $scope.isVarEmpty = true;
            //
            // // $scope.data.name1 = "";
            //




        }

        // $scope.exception_genus

        // console.log()


        var seedName = $scope.data.name2;
        console.log($scope.data.name3)
        if ($scope.data.name3) seedName = seedName + ' ' + $scope.data.name3;
        if ($scope.data.name4) seedName = seedName + ' ' + $scope.data.name4 + ' ' + $scope.data.name5;
        $scope.data.seedName = seedName;
        $rootScope.$broadcast('seed.found', $scope.data)

    }

    // $scope.$on('seed.found', function (event, data) {
    //     console.log('info', data)
    // })


    $scope.startsWith = function(state, viewValue) {
        return state.substr(0, viewValue.length).toLowerCase() == viewValue.toLowerCase();
    }



    // var _selected;
    //
    // $scope.selected = undefined;
    // $scope.states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Dakota', 'North Carolina', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];
    // // Any function returning a promise object can be used to load values asynchronously
    // $scope.getLocation = function(val) {
    //     return $http.get('//maps.googleapis.com/maps/api/geocode/json', {
    //         params: {
    //             address: val,
    //             sensor: false
    //         }
    //     }).then(function(response){
    //         return response.data.results.map(function(item){
    //             return item.formatted_address;
    //         });
    //     });
    // };
    //
    // $scope.ngModelOptionsSelected = function(value) {
    //     if (arguments.length) {
    //         _selected = value;
    //     } else {
    //         return _selected;
    //     }
    // };
    //
    // $scope.modelOptions = {
    //     debounce: {
    //         default: 500,
    //         blur: 250
    //     },
    //     getterSetter: true
    // };
    //
    // $scope.statesWithFlags = [{'name':'Alabama','flag':'5/5c/Flag_of_Alabama.svg/45px-Flag_of_Alabama.svg.png'},{'name':'Alaska','flag':'e/e6/Flag_of_Alaska.svg/43px-Flag_of_Alaska.svg.png'},{'name':'Arizona','flag':'9/9d/Flag_of_Arizona.svg/45px-Flag_of_Arizona.svg.png'},{'name':'Arkansas','flag':'9/9d/Flag_of_Arkansas.svg/45px-Flag_of_Arkansas.svg.png'},{'name':'California','flag':'0/01/Flag_of_California.svg/45px-Flag_of_California.svg.png'},{'name':'Colorado','flag':'4/46/Flag_of_Colorado.svg/45px-Flag_of_Colorado.svg.png'},{'name':'Connecticut','flag':'9/96/Flag_of_Connecticut.svg/39px-Flag_of_Connecticut.svg.png'},{'name':'Delaware','flag':'c/c6/Flag_of_Delaware.svg/45px-Flag_of_Delaware.svg.png'},{'name':'Florida','flag':'f/f7/Flag_of_Florida.svg/45px-Flag_of_Florida.svg.png'},{'name':'Georgia','flag':'5/54/Flag_of_Georgia_%28U.S._state%29.svg/46px-Flag_of_Georgia_%28U.S._state%29.svg.png'},{'name':'Hawaii','flag':'e/ef/Flag_of_Hawaii.svg/46px-Flag_of_Hawaii.svg.png'},{'name':'Idaho','flag':'a/a4/Flag_of_Idaho.svg/38px-Flag_of_Idaho.svg.png'},{'name':'Illinois','flag':'0/01/Flag_of_Illinois.svg/46px-Flag_of_Illinois.svg.png'},{'name':'Indiana','flag':'a/ac/Flag_of_Indiana.svg/45px-Flag_of_Indiana.svg.png'},{'name':'Iowa','flag':'a/aa/Flag_of_Iowa.svg/44px-Flag_of_Iowa.svg.png'},{'name':'Kansas','flag':'d/da/Flag_of_Kansas.svg/46px-Flag_of_Kansas.svg.png'},{'name':'Kentucky','flag':'8/8d/Flag_of_Kentucky.svg/46px-Flag_of_Kentucky.svg.png'},{'name':'Louisiana','flag':'e/e0/Flag_of_Louisiana.svg/46px-Flag_of_Louisiana.svg.png'},{'name':'Maine','flag':'3/35/Flag_of_Maine.svg/45px-Flag_of_Maine.svg.png'},{'name':'Maryland','flag':'a/a0/Flag_of_Maryland.svg/45px-Flag_of_Maryland.svg.png'},{'name':'Massachusetts','flag':'f/f2/Flag_of_Massachusetts.svg/46px-Flag_of_Massachusetts.svg.png'},{'name':'Michigan','flag':'b/b5/Flag_of_Michigan.svg/45px-Flag_of_Michigan.svg.png'},{'name':'Minnesota','flag':'b/b9/Flag_of_Minnesota.svg/46px-Flag_of_Minnesota.svg.png'},{'name':'Mississippi','flag':'4/42/Flag_of_Mississippi.svg/45px-Flag_of_Mississippi.svg.png'},{'name':'Missouri','flag':'5/5a/Flag_of_Missouri.svg/46px-Flag_of_Missouri.svg.png'},{'name':'Montana','flag':'c/cb/Flag_of_Montana.svg/45px-Flag_of_Montana.svg.png'},{'name':'Nebraska','flag':'4/4d/Flag_of_Nebraska.svg/46px-Flag_of_Nebraska.svg.png'},{'name':'Nevada','flag':'f/f1/Flag_of_Nevada.svg/45px-Flag_of_Nevada.svg.png'},{'name':'New Hampshire','flag':'2/28/Flag_of_New_Hampshire.svg/45px-Flag_of_New_Hampshire.svg.png'},{'name':'New Jersey','flag':'9/92/Flag_of_New_Jersey.svg/45px-Flag_of_New_Jersey.svg.png'},{'name':'New Mexico','flag':'c/c3/Flag_of_New_Mexico.svg/45px-Flag_of_New_Mexico.svg.png'},{'name':'New York','flag':'1/1a/Flag_of_New_York.svg/46px-Flag_of_New_York.svg.png'},{'name':'North Carolina','flag':'b/bb/Flag_of_North_Carolina.svg/45px-Flag_of_North_Carolina.svg.png'},{'name':'North Dakota','flag':'e/ee/Flag_of_North_Dakota.svg/38px-Flag_of_North_Dakota.svg.png'},{'name':'Ohio','flag':'4/4c/Flag_of_Ohio.svg/46px-Flag_of_Ohio.svg.png'},{'name':'Oklahoma','flag':'6/6e/Flag_of_Oklahoma.svg/45px-Flag_of_Oklahoma.svg.png'},{'name':'Oregon','flag':'b/b9/Flag_of_Oregon.svg/46px-Flag_of_Oregon.svg.png'},{'name':'Pennsylvania','flag':'f/f7/Flag_of_Pennsylvania.svg/45px-Flag_of_Pennsylvania.svg.png'},{'name':'Rhode Island','flag':'f/f3/Flag_of_Rhode_Island.svg/32px-Flag_of_Rhode_Island.svg.png'},{'name':'South Carolina','flag':'6/69/Flag_of_South_Carolina.svg/45px-Flag_of_South_Carolina.svg.png'},{'name':'South Dakota','flag':'1/1a/Flag_of_South_Dakota.svg/46px-Flag_of_South_Dakota.svg.png'},{'name':'Tennessee','flag':'9/9e/Flag_of_Tennessee.svg/46px-Flag_of_Tennessee.svg.png'},{'name':'Texas','flag':'f/f7/Flag_of_Texas.svg/45px-Flag_of_Texas.svg.png'},{'name':'Utah','flag':'f/f6/Flag_of_Utah.svg/45px-Flag_of_Utah.svg.png'},{'name':'Vermont','flag':'4/49/Flag_of_Vermont.svg/46px-Flag_of_Vermont.svg.png'},{'name':'Virginia','flag':'4/47/Flag_of_Virginia.svg/44px-Flag_of_Virginia.svg.png'},{'name':'Washington','flag':'5/54/Flag_of_Washington.svg/46px-Flag_of_Washington.svg.png'},{'name':'West Virginia','flag':'2/22/Flag_of_West_Virginia.svg/46px-Flag_of_West_Virginia.svg.png'},{'name':'Wisconsin','flag':'2/22/Flag_of_Wisconsin.svg/45px-Flag_of_Wisconsin.svg.png'},{'name':'Wyoming','flag':'b/bc/Flag_of_Wyoming.svg/43px-Flag_of_Wyoming.svg.png'}];
    //







    $('#sandbox-container input').datepicker({});


    // vm = this;
    // vm.isLoaded = false;
    // vm.values = [{
    //     'key': 22,
    //     'value': 'Kevin'
    // }, {
    //     'key': 24,
    //     'value': 'Fiona'
    // }];
    // vm.selected;





    $scope.varNames = {'': '-', 'subsp.': 'subsp.', 'var.': 'var.', 'for.': 'for.', 'cv.': 'cv.'};

    $scope.varNameChanged = function () {
        if (!$scope.data.name4) {
            $scope.isVarEmpty = true;
        } else {
            $scope.isVarEmpty = false;
        }
        $scope.data.name5 = '';
    }


    $scope.seedChanged = function (item) {
        if (item === null) return;
        console.log(item.name.trim());
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
        // console.log("lip calculate")
        //중량/1000립중*1000
        $scope.data.lipCount = Math.round($scope.data.weight / $scope.data.kiloLipWeight * 1000);

        // ------------
        //   TEST
        // ------------
        // $timeout($scope.calculate)

    }

    $scope.calculateLipCount()



})
