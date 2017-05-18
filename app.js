var app = angular.module('myApp', ['ngAnimate', 'ngSanitize', 'ui.bootstrap', 'ui.router']);

app.config(function($stateProvider, $urlRouterProvider) {
    // var helloState = {
    //     name: 'hello',
    //     url: '/hello',
    //     template: '<h3>hello world!</h3>'
    // }
    //
    // var aboutState = {
    //     name: 'about',
    //     url: '/about',
    //     template: '<h3>Its the UI-Router hello world app!</h3>'
    // }

    var introState = {
        name: 'intro',
        url: '/intro',
        templateUrl: 'pages/intro/index.html',
        controller: 'intro'
    }

    var seedState = {
        name: 'seed',
        url: '/seed',
        templateUrl: 'pages/seed/index.html',
        controller: 'seed'
    }

    $urlRouterProvider.otherwise('/seed');

    // $stateProvider.state(helloState);
    // $stateProvider.state(aboutState);
    $stateProvider.state(seedState);
    $stateProvider.state(introState);

})

app.controller('intro', function ($scope) {
    console.log('intro');
})

app.controller('seed', function ($scope, $state) {
    console.log('seed');
    var organization = $window.localStorage.getItem('organization');

    if (!organization) {
        $state.go('intro')
    }
})


app.controller('MainController', function ($scope, $http, $q, $filter, filterFilter, $log, $timeout, $window) {


    $scope.app = {}
    $scope.data = {
        "name1": "",
        "name2": "Entandrophragma",
        "name3": "angolense",
        "name4": "",
        "name5": "",

        "waterValue": 5.2,
        "inventoryCondition": -20,

        "inventoryDate": "2017.01.01",
        "weight": 1000,
        "kiloLipWeight": 27.5,
        "lipCount": 0,

        "inventoryPower": 60, //99

        "groundValue": 2.2,
        "dryTemperature": 15,
        "dryHumidity": 15,
        "resultWaterValue": 0,
    }


    $scope.findSpecies = function () {
        console.log('find species')
    }

    $scope.startsWith = function(state, viewValue) {
        return state.substr(0, viewValue.length).toLowerCase() == viewValue.toLowerCase();
    }



    var _selected;

    $scope.selected = undefined;
    $scope.states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Dakota', 'North Carolina', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];
    // Any function returning a promise object can be used to load values asynchronously
    $scope.getLocation = function(val) {
        return $http.get('//maps.googleapis.com/maps/api/geocode/json', {
            params: {
                address: val,
                sensor: false
            }
        }).then(function(response){
            return response.data.results.map(function(item){
                return item.formatted_address;
            });
        });
    };

    $scope.ngModelOptionsSelected = function(value) {
        if (arguments.length) {
            _selected = value;
        } else {
            return _selected;
        }
    };

    $scope.modelOptions = {
        debounce: {
            default: 500,
            blur: 250
        },
        getterSetter: true
    };

    $scope.statesWithFlags = [{'name':'Alabama','flag':'5/5c/Flag_of_Alabama.svg/45px-Flag_of_Alabama.svg.png'},{'name':'Alaska','flag':'e/e6/Flag_of_Alaska.svg/43px-Flag_of_Alaska.svg.png'},{'name':'Arizona','flag':'9/9d/Flag_of_Arizona.svg/45px-Flag_of_Arizona.svg.png'},{'name':'Arkansas','flag':'9/9d/Flag_of_Arkansas.svg/45px-Flag_of_Arkansas.svg.png'},{'name':'California','flag':'0/01/Flag_of_California.svg/45px-Flag_of_California.svg.png'},{'name':'Colorado','flag':'4/46/Flag_of_Colorado.svg/45px-Flag_of_Colorado.svg.png'},{'name':'Connecticut','flag':'9/96/Flag_of_Connecticut.svg/39px-Flag_of_Connecticut.svg.png'},{'name':'Delaware','flag':'c/c6/Flag_of_Delaware.svg/45px-Flag_of_Delaware.svg.png'},{'name':'Florida','flag':'f/f7/Flag_of_Florida.svg/45px-Flag_of_Florida.svg.png'},{'name':'Georgia','flag':'5/54/Flag_of_Georgia_%28U.S._state%29.svg/46px-Flag_of_Georgia_%28U.S._state%29.svg.png'},{'name':'Hawaii','flag':'e/ef/Flag_of_Hawaii.svg/46px-Flag_of_Hawaii.svg.png'},{'name':'Idaho','flag':'a/a4/Flag_of_Idaho.svg/38px-Flag_of_Idaho.svg.png'},{'name':'Illinois','flag':'0/01/Flag_of_Illinois.svg/46px-Flag_of_Illinois.svg.png'},{'name':'Indiana','flag':'a/ac/Flag_of_Indiana.svg/45px-Flag_of_Indiana.svg.png'},{'name':'Iowa','flag':'a/aa/Flag_of_Iowa.svg/44px-Flag_of_Iowa.svg.png'},{'name':'Kansas','flag':'d/da/Flag_of_Kansas.svg/46px-Flag_of_Kansas.svg.png'},{'name':'Kentucky','flag':'8/8d/Flag_of_Kentucky.svg/46px-Flag_of_Kentucky.svg.png'},{'name':'Louisiana','flag':'e/e0/Flag_of_Louisiana.svg/46px-Flag_of_Louisiana.svg.png'},{'name':'Maine','flag':'3/35/Flag_of_Maine.svg/45px-Flag_of_Maine.svg.png'},{'name':'Maryland','flag':'a/a0/Flag_of_Maryland.svg/45px-Flag_of_Maryland.svg.png'},{'name':'Massachusetts','flag':'f/f2/Flag_of_Massachusetts.svg/46px-Flag_of_Massachusetts.svg.png'},{'name':'Michigan','flag':'b/b5/Flag_of_Michigan.svg/45px-Flag_of_Michigan.svg.png'},{'name':'Minnesota','flag':'b/b9/Flag_of_Minnesota.svg/46px-Flag_of_Minnesota.svg.png'},{'name':'Mississippi','flag':'4/42/Flag_of_Mississippi.svg/45px-Flag_of_Mississippi.svg.png'},{'name':'Missouri','flag':'5/5a/Flag_of_Missouri.svg/46px-Flag_of_Missouri.svg.png'},{'name':'Montana','flag':'c/cb/Flag_of_Montana.svg/45px-Flag_of_Montana.svg.png'},{'name':'Nebraska','flag':'4/4d/Flag_of_Nebraska.svg/46px-Flag_of_Nebraska.svg.png'},{'name':'Nevada','flag':'f/f1/Flag_of_Nevada.svg/45px-Flag_of_Nevada.svg.png'},{'name':'New Hampshire','flag':'2/28/Flag_of_New_Hampshire.svg/45px-Flag_of_New_Hampshire.svg.png'},{'name':'New Jersey','flag':'9/92/Flag_of_New_Jersey.svg/45px-Flag_of_New_Jersey.svg.png'},{'name':'New Mexico','flag':'c/c3/Flag_of_New_Mexico.svg/45px-Flag_of_New_Mexico.svg.png'},{'name':'New York','flag':'1/1a/Flag_of_New_York.svg/46px-Flag_of_New_York.svg.png'},{'name':'North Carolina','flag':'b/bb/Flag_of_North_Carolina.svg/45px-Flag_of_North_Carolina.svg.png'},{'name':'North Dakota','flag':'e/ee/Flag_of_North_Dakota.svg/38px-Flag_of_North_Dakota.svg.png'},{'name':'Ohio','flag':'4/4c/Flag_of_Ohio.svg/46px-Flag_of_Ohio.svg.png'},{'name':'Oklahoma','flag':'6/6e/Flag_of_Oklahoma.svg/45px-Flag_of_Oklahoma.svg.png'},{'name':'Oregon','flag':'b/b9/Flag_of_Oregon.svg/46px-Flag_of_Oregon.svg.png'},{'name':'Pennsylvania','flag':'f/f7/Flag_of_Pennsylvania.svg/45px-Flag_of_Pennsylvania.svg.png'},{'name':'Rhode Island','flag':'f/f3/Flag_of_Rhode_Island.svg/32px-Flag_of_Rhode_Island.svg.png'},{'name':'South Carolina','flag':'6/69/Flag_of_South_Carolina.svg/45px-Flag_of_South_Carolina.svg.png'},{'name':'South Dakota','flag':'1/1a/Flag_of_South_Dakota.svg/46px-Flag_of_South_Dakota.svg.png'},{'name':'Tennessee','flag':'9/9e/Flag_of_Tennessee.svg/46px-Flag_of_Tennessee.svg.png'},{'name':'Texas','flag':'f/f7/Flag_of_Texas.svg/45px-Flag_of_Texas.svg.png'},{'name':'Utah','flag':'f/f6/Flag_of_Utah.svg/45px-Flag_of_Utah.svg.png'},{'name':'Vermont','flag':'4/49/Flag_of_Vermont.svg/46px-Flag_of_Vermont.svg.png'},{'name':'Virginia','flag':'4/47/Flag_of_Virginia.svg/44px-Flag_of_Virginia.svg.png'},{'name':'Washington','flag':'5/54/Flag_of_Washington.svg/46px-Flag_of_Washington.svg.png'},{'name':'West Virginia','flag':'2/22/Flag_of_West_Virginia.svg/46px-Flag_of_West_Virginia.svg.png'},{'name':'Wisconsin','flag':'2/22/Flag_of_Wisconsin.svg/45px-Flag_of_Wisconsin.svg.png'},{'name':'Wyoming','flag':'b/bc/Flag_of_Wyoming.svg/43px-Flag_of_Wyoming.svg.png'}];








    $('#sandbox-container input').datepicker({});


    vm = this;
    vm.isLoaded = false;
    vm.values = [{
        'key': 22,
        'value': 'Kevin'
    }, {
        'key': 24,
        'value': 'Fiona'
    }];
    vm.selected;


    /**
     * 기관명 Splash 페이지. local storage에 저장
     */
    $scope.organization = $window.localStorage.getItem('organization');

    $scope.saveOrganization = function (newOrganization) {
        $window.localStorage.setItem('organization', newOrganization);
        $scope.organization = newOrganization;
    }

    $scope.deleteOrganization = function () {
        $window.localStorage.removeItem('organization')
        $scope.organization = null;
    }


    $scope.initSearchKeywords = function (seed) {
        $scope.keywords = [ 'seed', 'germination', 'ecology', 'longevity', 'viability', 'physiology'];
        $scope.selection = [];


        $scope.keywords.unshift(seed);
        $scope.selection.unshift(seed);
    }

    $scope.toggleSelection = function toggleSelection(item) {
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

    $scope.varNames = {'': '-', 'subsp.': 'subsp.', 'var.': 'var.', 'for.': 'for.', 'cv.': 'cv.'};

    $scope.varNameChanged = function () {
        if (!$scope.data.name4) {
            $scope.isVarEmpty = true;
        } else {
            $scope.isVarEmpty = false;
        }
        $scope.data.name5 = '';
    }


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

    d3.csv('data/monitoring.csv', function (data) {
        // console.log(data)
        $scope.monitoringData = data;
    });

    // non-angular context에서는 $scope.$apply 하여 Model 변경을 추적해야 함.
    d3.csv('data/oil.csv', function (data) {
        $scope.$apply(function () {
            $scope.oilData = data;
        });
    });

    d3.csv('data/name.csv', function (data) {
        $scope.$apply(function () {
            $scope.nameData = data;
        });
    });

    d3.csv('data/exception_genus.csv', function (data) {
        $scope.$apply(function () {
            $scope.exception_genus = data;
            console.log($scope.exception_genus)
        });
    });

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

    $scope.calculate = function () {
        if (!$scope.data.name2) {
            $scope.modalMessage = '속명을 입력해 주세요.'
            $('#myModal').modal('show')
            return;
        }

        if (!$scope.data.name3) {
            $scope.modalMessage = '종소명을 입력해 주세요.'
            $('#myModal').modal('show')
            return;
        }

        if ($scope.data.name4 && !$scope.data.name5) {
            $scope.modalMessage = '변종소명을 입력해 주세요.'
            $('#myModal').modal('show')
            return;
        }

        if (!$scope.data.waterValue || !!isNaN($scope.data.waterValue)) {
            $scope.modalMessage = '수분함량에 Numeric 값을 입력해 주세요.'
            $('#myModal').modal('show')
            return;
        }

        if (!$scope.data.inventoryCondition || !!isNaN($scope.data.inventoryCondition)) {
            $scope.modalMessage = '저장조건에 Numeric 값을 입력해 주세요.'
            $('#myModal').modal('show')
            return;
        }

        if (!$scope.data.weight || !!isNaN($scope.data.weight)) {
            $scope.modalMessage = '중량에 Numeric 값을 입력해 주세요.'
            $('#myModal').modal('show')
            return;
        }

        if (!$scope.data.kiloLipWeight || !!isNaN($scope.data.kiloLipWeight)) {
            $scope.modalMessage = '1000립중에 Numeric 값을 입력해 주세요.'
            $('#myModal').modal('show')
            return;
        }

        if (!$scope.data.lipCount || !!isNaN($scope.data.lipCount)) {
            $scope.modalMessage = '올바른 중량과 1000립중 값을 입력해 주세요.'
            $('#myModal').modal('show')
            return;
        }

        var searchName = $scope.data.name2 + " " + $scope.data.name3 + " " + $scope.data.name4 + " " + $scope.data.name5;
        searchName = searchName.trim();
        // console.log(searchName.toLowerCase())
        // console.log($scope.seedData);

        var searchResults = $scope.seedData.filter(function (item) {
            return item.name == searchName
        })

        if (searchResults.length > 0) {
            // console.log(searchResults[0])
            // $scope.searchStatus = "Data found"
            $scope.data.Ke = searchResults[0].Ke
            $scope.data.Cw = searchResults[0].Cw
            $scope.data.Ch = searchResults[0].Ch
            $scope.data.Cq = searchResults[0].Cq
            $scope.data.refDoc = searchResults[0].ref
        } else {

            $scope.isVarEmpty = true;

            // $scope.data.name1 = "";

            // Alternative Value
            $scope.data.name2 = "Entandrophragma";
            $scope.data.name3 = "angolense";
            $scope.data.name4 = "";
            $scope.data.name5 = "";
            $scope.data.refDoc = "Tompsett, 1992"

            $scope.data.Ke = 4.6;
            $scope.data.Cw = 2.21;
            $scope.data.Ch = 0.033;
            $scope.data.Cq = 0.000478;
        }

        // 찾은 이름으로 구글검색을 구성
        $scope.initSearchKeywords($scope.data.name2)

        $scope.seedName = $scope.data.name2 + " " + $scope.data.name3 + " " + $scope.data.name4 + " " + $scope.data.name5 + " (" + $scope.data.refDoc + ")";
        var logSigma = $scope.data.Ke - ( $scope.data.Cw * Math.log($scope.data.waterValue) / Math.log(10) ) - $scope.data.Ch * (-20) - $scope.data.Cq * (-20 * -20)
        $scope.data.sigmaDay = Math.round(Math.pow(10, logSigma))

        $scope.data.sigmaYear = Math.round($scope.data.sigmaDay / 365)
        $scope.data.p90Day = Math.round(getDays(0.9));
        $scope.data.p90Year = Math.round($scope.data.p90Day / 365)
        $scope.data.p85Day = Math.round(getDays(0.85));
        $scope.data.p85Year = Math.round($scope.data.p85Day / 365)
        $scope.data.p80Day = Math.round(getDays(0.8));
        $scope.data.p80Year = Math.round($scope.data.p80Day / 365)
        $scope.data.p90_P85 = addDays($scope.data.inventoryDate, $scope.data.p90Day) + " ~ " + addDays($scope.data.inventoryDate, $scope.data.p85Day)
        $scope.data.p85_P80 = addDays($scope.data.inventoryDate, $scope.data.p85Day) + " ~ " + addDays($scope.data.inventoryDate, $scope.data.p80Day)
        $scope.data.monitoringDay = $scope.data.p80Day - $scope.data.p90Day
        for (var i = $scope.monitoringData.length - 1; i >= 0; i--) {
            if (Number($scope.monitoringData[i].inventoryLipCount) <= $scope.data.lipCount) {
                $scope.selectedMonitoringData = $scope.monitoringData[i];
                break
            }
        }
        $scope.data.monitoringDateList = [];
        $scope.data.viability = {'p90' : 0, 'p80':0 };
        var diff = Math.round((0.9 - 0.8) / ($scope.selectedMonitoringData.monitoringCount - 1) * 10000) / 10000;
        var item = {
            percent: 0.990 * 100,
            date : $scope.data.inventoryDate,
            power: Number($scope.data.inventoryPower)
        }
        $scope.data.monitoringDateList.push(item);
        var baseNormSInv = NormSInv(0.990);

        for (var i = 0; i < $scope.selectedMonitoringData.monitoringCount; i++) {
            var percent = Math.round( (0.9 - (diff * i)) *  1000) / 1000;
            var normSInv = Math.round(NormSInv(percent) * 1000) / 1000;
            var daysFactor = Math.round( (baseNormSInv - normSInv) *1000) / 1000;
            var days = Math.round($scope.data.sigmaDay * daysFactor);
            item = {
                powerPercent: percent,
                normSInv: normSInv,
                daysFactor: daysFactor,
                days: days,
                percent: Math.round(percent * 100 * 10) / 10,
                date: addDays($scope.data.inventoryDate, days),
                power: Math.round($scope.data.inventoryPower * percent * 100) / 100
            }
            $scope.data.monitoringDateList.push(item);
            if (item.percent === 90) {
                $scope.data.viability.p90 = item.power;
            }
            if (item.percent === 80) {
                $scope.data.viability.p80 = item.power;
            }
        }

        for (var i = 7; i > 0; i--) {
            var percent = 0.1  * i;
            var normSInv = NormSInv(percent);
            var daysFactor = baseNormSInv - normSInv;
            var days = $scope.data.sigmaDay * daysFactor;
            item = {
                percent: Math.round(percent * 100 * 10) / 10,
                date: addDays($scope.data.inventoryDate, days),
                power: Math.round($scope.data.inventoryPower * percent * 100) / 100
            }
            $scope.data.monitoringDateList.push(item);
        }

        $scope.data.testLipCount = $scope.selectedMonitoringData.monitoringUseLipCount;
        $scope.data.monitoringCondition = $scope.selectedMonitoringData.sproutTestLipCount + '립 ' + $scope.selectedMonitoringData.repeatCount + '반복 ' + $scope.selectedMonitoringData.monitoringCount + '회';

        $scope.seed = [];
        $scope.seed.dates = []
        $scope.seed.powers = []
        $scope.seed.scaled = []

        for(var i = 0; i < $scope.data.monitoringDateList.length; i++) {
            $scope.seed.dates.push($scope.data.monitoringDateList[i].date);
            $scope.seed.powers.push($scope.data.monitoringDateList[i].power);
            var date = new Date('2017.01.01').getTime();
            var x= new Date($scope.data.monitoringDateList[i].date).getTime();
            var y= $scope.data.monitoringDateList[i].power;
            var color;
            if (y <= $scope.data.viability.p90 && y >= $scope.data.viability.p80) {
                color = 'red';
            } else {
                color = Highcharts.getOptions().colors[0];
            }
            $scope.seed.scaled.push({ x: x, y: y, color: color});
        }
        renderSeedChart();
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

    $scope.calculateWaterValue = function () {

        if (!$scope.data.groundValue || !!isNaN($scope.data.groundValue)) {
            $scope.modalMessage = '지질함량에 Numeric 값을 입력해 주세요.'
            $('#myModal').modal('show')
            return;
        }

        if (!$scope.data.dryTemperature || !!isNaN($scope.data.dryTemperature)) {
            $scope.modalMessage = '건조온도에 Numeric 값을 입력해 주세요.'
            $('#myModal').modal('show')
            return;
        }

        if (!$scope.data.dryHumidity || !!isNaN($scope.data.dryHumidity)) {
            $scope.modalMessage = '건조 상대습도에 Numeric 값을 입력해 주세요.'
            $('#myModal').modal('show')
            return;
        }

        //5.94623587748127
        //100×((1−J4÷100)×SQRT((−440×LN(1−0.15))))÷(1.1+(15÷90))÷(100+((1−J4÷100)×SQRT((−440×LN(1−0.15))))÷(1.1+(15÷90)))
        //100×   ((1−J4÷100)×SQRT((−440×LN(1−0.15))))÷(1.1+(15÷90))÷(100+((1−J4÷100)×SQRT((−440×LN(1−0.15))))÷(1.1+(15÷90)))

        var Me = ((1 - $scope.data.groundValue / 100) * Math.sqrt(-440 * Math.log(1 - $scope.data.dryHumidity / 100))) / (1.1 + ($scope.data.dryTemperature / 90) )
        // console.log(Me)
        $scope.data.resultWaterValue = Math.round(100 * Me / ( 100 + Me) * 100) / 100;


        // $scope.oilWaters = {
        //     humidity : [10, 15, 20, 30, 40, 50, 60, 70, 80],
        //     water : [],
        //     all: []
        // }

        $scope.oilWaters = {
            humidity : [10, 20, 30, 40, 50, 60, 70, 80],
            water : [],
            all: []
        }

        $scope.oilWaters.humidity.push($scope.data.dryHumidity);

        $scope.oilWaters.humidity.sort(function(a, b) {
            return a - b;
        });




        for (var i=0; i < $scope.oilWaters.humidity.length; i ++) {
            var Me = ((1 - $scope.data.groundValue / 100) * Math.sqrt(-440 * Math.log(1 - ($scope.oilWaters.humidity[i]) / 100))) / (1.1 + ($scope.data.dryTemperature / 90) )
            var waterValue = Math.round(100 * Me / ( 100 + Me) * 100) / 100;

            $scope.oilWaters.water.push(waterValue);
            if ($scope.oilWaters.humidity[i] === $scope.data.dryHumidity) {
                $scope.oilWaters.all.push({x: $scope.oilWaters.humidity[i], y: waterValue, color: 'red'});
            } else {
                $scope.oilWaters.all.push([$scope.oilWaters.humidity[i], waterValue]);
            }
            // $scope.oilWaters.all.push([$scope.oilWaters.humidity[i], waterValue]);
        }
        console.log($scope.oilWaters);

        renderOilChart();



    }

    // $scope.calculateWaterValue()

    function getDays(percent) {
        // var diff = (0.9 - 0.8) / ($scope.selectedMonitoringData.monitoringCount - 1);
        // var percent = value - (diff * i);


        var baseNormSInv = NormSInv(0.990);
        // var percent = Math.round( (0.9 - (diff * i)) *  1000) / 1000;
        var normSInv = Math.round(NormSInv(percent) * 1000) / 1000;
        var daysFactor = Math.round( (baseNormSInv - normSInv) *1000) / 1000;
        var days = Math.round($scope.data.sigmaDay * daysFactor);



        // var normSInv = NormSInv(percent);
        // var daysFactor = baseNormSInv - normSInv;
        // var days = $scope.data.sigmaDay * daysFactor;
        return days;

    }

    function renderSeedChart(){

        Highcharts.chart('container_seed', {
            chart: {
                type: 'spline'
            },

            credits : { enabled: false},

            title: {
                text: 'Seed_Viability' + '-' + $scope.data.name2 + '_' + $scope.data.name3  + '-' + formatDate(new Date),
                style: {
                    fontWeight: 'bold',
                    fontSize: "24px"
                }
            },

            xAxis: {
                type: 'datetime',
                title: {
                    text: 'Date'
                }
            },

            yAxis: {
                title: {
                    text: 'Viability(%)'
                },
                min: 0
            },

            legend: {
                enabled: false,
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle'
            },

            tooltip : {
                crosshairs: [{
                    width: 1,
                    dashStyle: 'solid',
                    color: 'red'
                }, {
                    width: 1,
                    dashStyle: 'solid',
                    color: 'red'
                }],
            },
            plotOptions: {
                series: {
                    marker: {
                        fillColor: '#FFFFFF',
                        lineWidth: 2,
                        lineColor: null // inherit from series
                    }
                }
            },

            series: [{
                name: 'Viability',
                data: $scope.seed.scaled
            }],
            exporting: {
                filename: 'Seed_Viability' + '-' + $scope.data.name2 + '_' + $scope.data.name3  + '-' + formatDate(new Date)
            }
        });
    }

    function renderOilChart() {

        Highcharts.chart('container_oil', {

            chart: {
                height: 300,
                type: 'line'
            },
            credits : { enabled: false},
            title: {
                text: 'Seed moisture isotherm(' + $scope.data.dryTemperature + '°C) ' + $scope.data.name2 + ' ' + $scope.data.name3  + '-' + formatDate(new Date)
            },

            subtitle: {
                text: null
            },

            xAxis: {
                tickInterval: 10,
                type: 'linear',
                title: {
                    text: '건조 상대습도'
                },
                categories: $scope.oilWaters.humidity,
                plotLines: [{
                    color: '#FF0000',
                    width: 2,
                    value: 1,
                    label: {
                        text: 'default',
                        verticalAlign: 'middle',
                        textAlign: 'center',
                    }
                }],
            },

            yAxis: {
                title: {
                    text: '수분함량'
                },
            },
            legend: {
                enabled: false,
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle'
            },
            tooltip : {
                formatter: function() {
                    var tooltip;
                    if (this.key == 'last') {
                        tooltip = '<b>Final result is </b> ' + this.y;
                    }
                    else {
                        tooltip =  '';
                    }
                    tooltip =  '<span style="color:' + this.series.color + '">' + '건조상대 습도' + '</span>: <b>' + this.x + '</b><br/>';
                    tooltip = tooltip + '<span style="color:' + this.series.color + '">' + this.series.name + '</span>: <b>' + this.y + '</b><br/>'
                    return tooltip;
                },
                crosshairs: [{
                    width: 1,
                    dashStyle: 'solid',
                    color: 'red'
                }, {
                    width: 1,
                    dashStyle: 'solid',
                    color: 'red'
                }],
            },
            plotOptions: {
                series: {
                    marker: {
                        fillColor: '#FFFFFF',
                        lineWidth: 2,
                        lineColor: null // inherit from series
                    }
                }
            },
            series: [{
                name: '수분함량',
                data: $scope.oilWaters.all
            }
            ],
            exporting: {
                filename: 'Seed moisture isotherm(' + $scope.data.dryTemperature + '°C) '  + $scope.data.name2 + ' ' + $scope.data.name3  + '-' + formatDate(new Date)
            }

        });
    }

    function addDays(baseDate, numberOfDaysToAdd) {
        // console.log(baseDate)
        var someDate = new Date(baseDate);
        // console.log(someDate)
        // var numberOfDaysToAdd = 6;
        someDate.setDate(someDate.getDate() + numberOfDaysToAdd);
        // Formatting to dd/mm/yyyy :

        var dd = someDate.getDate();
        var mm = someDate.getMonth() + 1;
        var y = someDate.getFullYear();

        // var someFormattedDate = dd + '/'+ mm + '/'+ y;
        var someFormattedDate = y + '.' + zeroPad(mm, 2) + '.' + zeroPad(dd, 2);
        // console.log(someFormattedDate)
        return someFormattedDate
    }

    function formatDate(date) {
        return date.getFullYear() + '.' + (Number(date.getMonth())+1) + '.' + date.getDate()
    }

    function zeroPad(num, places) {
        var zero = places - num.toString().length + 1;
        return Array(+(zero > 0 && zero)).join("0") + num;
    }

    function NormSInv(p) {
        var a1 = -39.6968302866538, a2 = 220.946098424521, a3 = -275.928510446969;
        var a4 = 138.357751867269, a5 = -30.6647980661472, a6 = 2.50662827745924;
        var b1 = -54.4760987982241, b2 = 161.585836858041, b3 = -155.698979859887;
        var b4 = 66.8013118877197, b5 = -13.2806815528857, c1 = -7.78489400243029E-03;
        var c2 = -0.322396458041136, c3 = -2.40075827716184, c4 = -2.54973253934373;
        var c5 = 4.37466414146497, c6 = 2.93816398269878, d1 = 7.78469570904146E-03;
        var d2 = 0.32246712907004, d3 = 2.445134137143, d4 = 3.75440866190742;
        var p_low = 0.02425, p_high = 1 - p_low;
        var q, r;
        var retVal;

        if ((p < 0) || (p > 1))
        {
            alert("NormSInv: Argument out of range.");
            retVal = 0;
        }
        else if (p < p_low)
        {
            q = Math.sqrt(-2 * Math.log(p));
            retVal = (((((c1 * q + c2) * q + c3) * q + c4) * q + c5) * q + c6) / ((((d1 * q + d2) * q + d3) * q + d4) * q + 1);
        }
        else if (p <= p_high)
        {
            q = p - 0.5;
            r = q * q;
            retVal = (((((a1 * r + a2) * r + a3) * r + a4) * r + a5) * r + a6) * q / (((((b1 * r + b2) * r + b3) * r + b4) * r + b5) * r + 1);
        }
        else
        {
            q = Math.sqrt(-2 * Math.log(1 - p));
            retVal = -(((((c1 * q + c2) * q + c3) * q + c4) * q + c5) * q + c6) / ((((d1 * q + d2) * q + d3) * q + d4) * q + 1);
        }

        return retVal;
    }

    $scope.save = function () {
        console.log('save')
        var out = "입고종자 정보";
        out = out + "\n" + "-----";
        out = out + "\n" + "종정보 : " + $scope.data.name2 + " " + $scope.data.name3 + " " + $scope.data.name4 + " " + $scope.data.name5 + " (" + $scope.data.refDoc + ")";
        out = out + "\n" + "수분함량 : " + $scope.data.waterValue + ", 저장조건 : " + $scope.data.inventoryCondition;
        out = out + "\n" + "입고일 : " + $scope.data.inventoryDate + ", 중량 : " + $scope.data.weight + ", 1000립중 : " + $scope.data.kiloLipWeight + ", 립수 : " + $scope.data.lipCount;
        out = out + "\n" + "입고활력 : " + $scope.data.inventoryPower

        out = out + "\n";
        out = out + "\n" + "지질함량에 따른 수분함량 계산";
        out = out + "\n" + "-----";
        out = out + "\n" + "지질함량 : " + $scope.data.groundValue + ", 건조온도 : " + $scope.data.dryTemperature + ", 건조 상대습도 : " + $scope.data.dryHumidity + ", 수분함량 : " + $scope.data.resultWaterValue;

        out = out + "\n";
        out = out + "\n" + "결과";
        out = out + "\n" + "-----";
        out = out + "\n" + "수명공식계수 : " + $scope.seed;
        out = out + "\n" + "Ke : " + $scope.data.Ke + ", Cw : " + $scope.data.Cw + ", Ch : " + $scope.data.Ch + ", Cq : " + $scope.data.Cq;
        out = out + "\n" + "Sigma(Day) : " + $scope.data.sigmaDay + ", P90(Day) : " + $scope.data.p90Day + ", P85(Day) : " + $scope.data.p85Day + ", P80(Day) : " + $scope.data.p80Day;
        out = out + "\n" + "Sigma(Year) : " + $scope.data.sigmaYear + ", P90(Year) : " + $scope.data.p90Year + ", P85(Year) : " + $scope.data.p85Year + ", P80(Year) : " + $scope.data.p80Day;
        out = out + "\n" + "P90-P85 : " + $scope.data.p90_P85 + ", P85-P80 : " + $scope.data.p85_P80;
        out = out + "\n" + "모니터링 기간day : " + $scope.data.monitoringDay + ", 권장 검정립수 : " + $scope.data.testLipCount + ", 권장 모니터링 조건 : " + $scope.data.monitoringCondition;
        out = out + "\n" + "권장 모니터링일 : ";
        out = out + '\n- ' + $scope.data.monitoringDate.split('\n').join('\n- ');

        // var blob = new Blob([out], {type: "text/plain;charset=utf-8"});
        // saveAs(blob, "result.txt");

        var csvData = '입고 종자 정보';
        csvData = csvData + '\n' + '종정보,' + '"Oryza sativa var. japonica (Ellis et al., 1992)"';
        csvData = csvData + '\n' + '수분함량,' + '5.2';
        csvData = csvData + '\n\n' + '[ 결과 ]';
        csvData = csvData + '\n' + 'Ke,' + '8.2736';

        var BOM = "\uFEFF";
        csvData = BOM + csvData;
        console.log(csvData);
        // csvData = csvData + 'title,"지질함량에 따른 수분함량 계산"';

        var blob = new Blob([csvData], {type: "text/csv;charset=utf-8"});
        saveAs(blob, "myFile.csv");

        // var csvData = '';
        // var BOM = "\uFEFF";
        // csvData = BOM + 'title,"지질함량에 따른 수분함량 계산"' + '\n';
        // csvData = csvData + 'Cq, 0.12, Ch, 0.15';
        //
        //
        //
        // var blob = new Blob([csvData], { type: "text/csv;charset=utf-8" });
        // saveAs(blob, "myFile.csv");


    }

    $scope.exportJsonToCsv = function () {
        for(var i=0; i < $scope.data.monitoringDateList.length; i++) {
            $scope.data.monitoringDateList[i].index = i;
            delete $scope.data.monitoringDateList[i].$$hashKey;
        }
        $scope.data.monitoringDateList.splice(Number($scope.selectedMonitoringData.monitoringCount) + 1, 7);
        console.log($scope.data.monitoringDateList);

        var json = $scope.data.monitoringDateList;
        var fields = Object.keys(json[0]);
        var replacer = function(key, value) { return value === null ? '' : value };
        var csv = json.map(function(row){
            return fields.map(function(fieldName){
                return JSON.stringify(row[fieldName], replacer)
            }).join(',');
        });
        csv.unshift(fields.join(',')); // add header column

        console.log(csv.join('\r\n'));
        csv = csv.join('\r\n');
        var blob = new Blob([csv], {type: "text/csv;charset=utf-8"});
        // filename: 'Seed_Viability' + '-' + $scope.data.name2 + '_' + $scope.data.name3  + '-' + formatDate(new Date)
        saveAs(blob, 'Monitoring_date' + '-' + $scope.data.name2 + '_' + $scope.data.name3  + '-' + formatDate(new Date) + '.csv');
    }



})