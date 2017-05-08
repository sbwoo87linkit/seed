var app = angular.module('myApp', []);

app.directive('autoComplete', function($timeout) {
    return function(scope, iElement, iAttrs) {
        iElement.autocomplete({
            source: scope[iAttrs.uiItems],
            select: function() {
                $timeout(function() {
                    iElement.trigger('input');
                }, 0);
            }
        });
    };
});

app.controller('MainController', function ($scope, $http, $q, $filter, filterFilter, $log, $timeout) {


    $scope.names = ["alfred", "john", "bill", "charlie", "robert", "alban", "oscar", "marie", "celine", "brad", "drew", "rebecca", "michel", "francis", "jean", "paul", "pierre", "nicolas",  "gerard", "louis", "albert", "edouard", "benoit", "guillaume", "nicolas", "joseph"];

    $scope.keywords = [ 'seed', 'germination', 'ecology', 'longevity', 'viability', 'physiology'];

    $scope.selection = [];

    // todo : assign when species is defined.
    $scope.keywords.unshift('angolense');
    $scope.selection.unshift('angolense');

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
        $scope.keywords.push(keyword);
        $scope.selection.push(keyword);
        $scope.keyword = '';
    }

    $scope.site = {name:'Google Scholar Search'}






    $scope.search = function() {

        // 구글학술검색
        // https://scholar.google.co.kr/scholar?hl=en&q=angolense+seed+&btnG=&as_sdt=1%2C5&as_sdtp=
        // https://scholar.google.com/scholar?q=angolense+seed

        // 구글검색
        // https://www.google.com/search?num=100&newwindow=1&rlz=1C5CHFA_enKR703KR703&q=angolense+seed+&oq=angolense+seed+&gs_l=serp.3...86653.86653.0.87836.1.1.0.0.0.0.125.125.0j1.1.0....0...1.2.64.serp..0.0.0.9am17vqh_do
        // https://www.google.com/search?q=angolense+seed

        // 구글이미지검색
        // https://www.google.com/search?q=angolense+seed&tbm=isch

        var site = $scope.site.name;

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



        // window.open(url, '_blank', 'location=yes,height=570,width=520,scrollbars=yes,status=yes');
        window.open(url, '_blank', 'location=yes,scrollbars=yes,status=yes');

        // https://www.google.com/search?newwindow=1&hl=en&biw=1440&bih=763&site=webhp&tbm=isch&sa=1&q=%EA%B5%AC%EA%B8%80+%EC%9D%B4%EB%AF%B8%EC%A7%80+%EA%B2%80%EC%83%89&oq=%EA%B5%AC%EA%B8%80+%EC%9D%B4%EB%AF%B8&gs_l=img.3.0.0l10.4569.15865.0.16874.15.15.0.0.0.0.285.1474.1j10j1.12.0....0...1.1j4.64.img..4.10.1086.0..35i39k1j0i67k1.rD0rl5Ck95U
    }










    $('#sandbox-container input').datepicker({});

    $scope.varNames = {'': '-', 'subsp.': 'subsp.', 'var.': 'var.', 'for.': 'for.', 'cv.': 'cv.'};

    // $scope.dataTemp = {
    //     "key1": "val1",
    //     "key2": "val2",
    //     "key3": "val3"
    //
    // };

    $scope.varNameChanged = function () {
        // console.log('changed : ', $scope.data.name4);
        if (!$scope.data.name4) {
            $scope.isVarEmpty = true;
        } else {
            $scope.isVarEmpty = false;
        }
        $scope.data.name5 = '';

    }


    // $scope.varNames = ['', 'subsp.', 'var.', 'for.', 'cv.'];
    //
    // $scope.varNameChanged = function () {
    //     console.log('changed : ', $scope.data.name4);
    //     if (!$scope.data.name4) {
    //         $scope.isVarEmpty = true;
    //     } else {
    //         $scope.isVarEmpty = false;
    //     }
    //     $scope.data.name5 = '';
    //
    // }

    // //Entandrophragma angolense,"Tompsett, 1992",4.6,2.21,0.033,0.000478
    /*
    "name1": "NO-NAME",
    "name2": "Oryza",
    "name3": "sativa",
    "name4": "var.",
    "name5": "japonica"

     "name1": "",
     "name2": "Entandrophragma",
     "name3": "angolense",
     "name4": "",
     "name5": "",
    */


    $scope.data = {
        "name1": "",
        "name2": "Entandrophragma",
        "name3": "angolense",
        // "name2": "",
        // "name3": "",
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

        // Find Genus name
        // Khaya

        var filteredItems = $scope.nameData.filter(function (item) {
            return item.Genus === arrNames[0];
        })

        // console.log(filteredItems[0].Family);
        // // Family:"MELIACEAE"
        if (filteredItems.length > 0) {
            $scope.data.name1 = filteredItems[0].Family;
        } else {
            $scope.data.name1 = '';
        }
    }

    $scope.findSeed = function () {
        // console.log('findSeed()');
        var name = ($scope.data.name2 + ' ' + $scope.data.name3 + ' ' + $scope.data.name4 + ' ' + $scope.data.name5).trim();
        // console.log(name);
        $scope.mySeed = null;
        for (var i=0; i < $scope.seedData.length;i++) {
            if (name === $scope.seedData[i].name) {
                $scope.mySeed = $scope.seedData[i];
            }
        }
    }

    //
    // $scope.calculate2 = function () {
    //
    //     //--- form validatation
    //
    //     if (!$scope.data.name2) {
    //         $scope.modalMessage = '속명을 입력해 주세요.'
    //         $('#myModal').modal('show')
    //         return;
    //     }
    //
    //     if (!$scope.data.name3) {
    //         $scope.modalMessage = '종소명을 입력해 주세요.'
    //         $('#myModal').modal('show')
    //         return;
    //     }
    //
    //     if ($scope.data.name4 && !$scope.data.name5) {
    //         $scope.modalMessage = '변종소명을 입력해 주세요.'
    //         $('#myModal').modal('show')
    //         return;
    //     }
    //
    //     if (!$scope.data.waterValue || !!isNaN($scope.data.waterValue)) {
    //         $scope.modalMessage = '수분함량에 Numeric 값을 입력해 주세요.'
    //         $('#myModal').modal('show')
    //         return;
    //     }
    //
    //     if (!$scope.data.inventoryCondition || !!isNaN($scope.data.inventoryCondition)) {
    //         $scope.modalMessage = '저장조건에 Numeric 값을 입력해 주세요.'
    //         $('#myModal').modal('show')
    //         return;
    //     }
    //
    //     if (!$scope.data.weight || !!isNaN($scope.data.weight)) {
    //         $scope.modalMessage = '중량에 Numeric 값을 입력해 주세요.'
    //         $('#myModal').modal('show')
    //         return;
    //     }
    //
    //     if (!$scope.data.kiloLipWeight || !!isNaN($scope.data.kiloLipWeight)) {
    //         $scope.modalMessage = '1000립중에 Numeric 값을 입력해 주세요.'
    //         $('#myModal').modal('show')
    //         return;
    //     }
    //
    //     if (!$scope.data.lipCount || !!isNaN($scope.data.lipCount)) {
    //         $scope.modalMessage = '올바른 중량과 1000립중 값을 입력해 주세요.'
    //         $('#myModal').modal('show')
    //         return;
    //     }
    //
    //     var searchName = $scope.data.name2 + " " + $scope.data.name3 + " " + $scope.data.name4 + " " + $scope.data.name5;
    //     searchName = searchName.trim();
    //     // console.log(searchName.toLowerCase())
    //     // console.log($scope.seedData);
    //
    //     var searchResults = $scope.seedData.filter(function (item) {
    //         return item.name == searchName
    //     })
    //
    //     if (searchResults.length > 0) {
    //         console.log(searchResults[0])
    //         // $scope.searchStatus = "Data found"
    //         $scope.data.Ke = searchResults[0].Ke
    //         $scope.data.Cw = searchResults[0].Cw
    //         $scope.data.Ch = searchResults[0].Ch
    //         $scope.data.Cq = searchResults[0].Cq
    //         $scope.data.refDoc = searchResults[0].ref
    //     } else {
    //         console.log("Data not found")
    //         $scope.data.name1 = "NO-NAME";
    //         $scope.data.name2 = "Entandrophragma";
    //         $scope.data.name3 = "angolense";
    //         $scope.data.name4 = "";
    //         $scope.data.name5 = "";
    //         $scope.data.refDoc = "Tompsett, 1992"
    //
    //         $scope.isVarEmpty = true;
    //
    //         // 대체 Value
    //         $scope.data.Ke = 4.6;
    //         $scope.data.Cw = 2.21;
    //         $scope.data.Ch = 0.033;
    //         $scope.data.Cq = 0.000478;
    //     }
    //
    //     $scope.seedName = $scope.data.name2 + " " + $scope.data.name3 + " " + $scope.data.name4 + " " + $scope.data.name5 + " (" + $scope.data.refDoc + ")";
    //
    //     // console.log($scope.data.resultWaterValue)
    //     //
    //     // var logSigma = $scope.data.Ke - ( $scope.data.Cw * Math.log10($scope.data.resultWaterValue) ) - $scope.data.Ch * (-20) - $scope.data.Cq * (-20 * -20)
    //     // ie에서 Math.log10 오류가 있어 Math.log(f)/Math.log(10)로 대체
    //     var logSigma = $scope.data.Ke - ( $scope.data.Cw * Math.log($scope.data.waterValue) / Math.log(10) ) - $scope.data.Ch * (-20) - $scope.data.Cq * (-20 * -20)
    //
    //     console.log("logSigma : ", logSigma)
    //     $scope.data.sigmaDay = Math.round(Math.pow(10, logSigma))
    //     console.log("$scope.data.sigmaDay : ", $scope.data.sigmaDay)
    //     $scope.data.sigmaYear = Math.round($scope.data.sigmaDay / 365)
    //     // console.log("$scope.data.sigmaYear : ", $scope.data.sigmaYear)
    //     $scope.data.p90Day = Math.round($scope.data.sigmaDay * (2.3 - 1.3))
    //     // console.log("$scope.data.p90Day : ", $scope.data.p90Day)
    //     $scope.data.p90Year = Math.round($scope.data.p90Day / 365)
    //     $scope.data.p85Day = Math.round($scope.data.sigmaDay * (2.3 - 1.0))
    //     // console.log("$scope.data.p85Day : ", $scope.data.p85Day)
    //     $scope.data.p85Year = Math.round($scope.data.p85Day / 365)
    //     $scope.data.p80Day = Math.round($scope.data.sigmaDay * (2.3 - 0.8))
    //     // console.log("$scope.data.p80Day : ", $scope.data.p80Day)
    //     $scope.data.p80Year = Math.round($scope.data.p80Day / 365)
    //     // console.log($scope.data.inventoryDate)
    //     $scope.data.p90_P85 = addDays($scope.data.inventoryDate, $scope.data.p90Day) + " ~ " + addDays($scope.data.inventoryDate, $scope.data.p85Day)
    //     // console.log("$scope.data.p90_P85 : ", $scope.data.p90_P85)
    //     $scope.data.p85_P80 = addDays($scope.data.inventoryDate, $scope.data.p85Day) + " ~ " + addDays($scope.data.inventoryDate, $scope.data.p80Day)
    //     // console.log("$scope.data.p85_P80 : ", $scope.data.p85_P80)
    //     $scope.data.monitoringDay = $scope.data.p80Day - $scope.data.p90Day
    //     // console.log("$scope.data.monitoringDays : ", $scope.data.monitoringDays)
    //     // console.log("$scope.data.lipCount : ", $scope.data.lipCount)
    //
    //     for (var i = $scope.monitoringData.length - 1; i >= 0; i--) {
    //         // console.log("입고립수 : ", $scope.monitoringData[i].입고립)
    //         // console.log(i, $scope.monitoringData[i].입고립수, Number($scope.monitoringData[i].입고립수), $scope.data.lipCount)
    //         if (Number($scope.monitoringData[i].inventoryLipCount) <= $scope.data.lipCount) {
    //             // console.log("==== founded ", $scope.monitoringData[i].입고립수)
    //             $scope.selectedMonitoringData = $scope.monitoringData[i];
    //             break
    //         }
    //     }
    //
    //     // 입고립수 inventoryLipCount
    //     // 모니터링사용립수 monitoringUseLipCount
    //     // 발아검정립수 sproutTestLipCount
    //     // 반복수 : repeatCount
    //     // 모니터링횟수 : monitoringCount
    //
    //     $scope.data.testLipCount = $scope.selectedMonitoringData.monitoringUseLipCount;
    //     $scope.data.monitoringCondition = $scope.selectedMonitoringData.sproutTestLipCount + '립 ' + $scope.selectedMonitoringData.repeatCount + '반복 ' + $scope.selectedMonitoringData.monitoringCount + '회';
    //
    //     var interval = $scope.data.monitoringDay / ($scope.selectedMonitoringData.monitoringCount - 1 );
    //     console.log('$scope.data.p90Day : ', $scope.data.p90Day)
    //     var baseDate = addDays($scope.data.inventoryDate, $scope.data.p90Day)
    //     // console.log(baseDate)
    //     // baseDate = "2615.03.15"
    //
    //     $scope.data.monitoringDateList = []
    //     $scope.data.monitoringDateList.push( { date : baseDate, power : 99, percent : 99 } )
    //     $scope.data.monitoringDate = baseDate;
    //     for (var i = 0; i < $scope.selectedMonitoringData.monitoringCount - 1; i++) {
    //         // console.log("i : ", i, addDays(baseDate, interval * (i + 1) ))
    //         $scope.data.monitoringDate = $scope.data.monitoringDate + "\n" + addDays(baseDate, interval * (i + 1))
    //         $scope.data.monitoringDateList.push( { date : addDays(baseDate, interval * (i + 1)), power : 99, percent : 99 } )
    //         //if ()
    //     }
    //     console.log($scope.data.monitoringDateList)
    //
    //     renderSeedChart();
    //
    // }
    //
    // $scope.calculate1 = function () {
    //
    //     //--- form validatation
    //
    //     if (!$scope.data.name2) {
    //         $scope.modalMessage = '속명을 입력해 주세요.'
    //         $('#myModal').modal('show')
    //         return;
    //     }
    //
    //     if (!$scope.data.name3) {
    //         $scope.modalMessage = '종소명을 입력해 주세요.'
    //         $('#myModal').modal('show')
    //         return;
    //     }
    //
    //     if ($scope.data.name4 && !$scope.data.name5) {
    //         $scope.modalMessage = '변종소명을 입력해 주세요.'
    //         $('#myModal').modal('show')
    //         return;
    //     }
    //
    //     if (!$scope.data.waterValue || !!isNaN($scope.data.waterValue)) {
    //         $scope.modalMessage = '수분함량에 Numeric 값을 입력해 주세요.'
    //         $('#myModal').modal('show')
    //         return;
    //     }
    //
    //     if (!$scope.data.inventoryCondition || !!isNaN($scope.data.inventoryCondition)) {
    //         $scope.modalMessage = '저장조건에 Numeric 값을 입력해 주세요.'
    //         $('#myModal').modal('show')
    //         return;
    //     }
    //
    //     if (!$scope.data.weight || !!isNaN($scope.data.weight)) {
    //         $scope.modalMessage = '중량에 Numeric 값을 입력해 주세요.'
    //         $('#myModal').modal('show')
    //         return;
    //     }
    //
    //     if (!$scope.data.kiloLipWeight || !!isNaN($scope.data.kiloLipWeight)) {
    //         $scope.modalMessage = '1000립중에 Numeric 값을 입력해 주세요.'
    //         $('#myModal').modal('show')
    //         return;
    //     }
    //
    //     if (!$scope.data.lipCount || !!isNaN($scope.data.lipCount)) {
    //         $scope.modalMessage = '올바른 중량과 1000립중 값을 입력해 주세요.'
    //         $('#myModal').modal('show')
    //         return;
    //     }
    //
    //     var searchName = $scope.data.name2 + " " + $scope.data.name3 + " " + $scope.data.name4 + " " + $scope.data.name5;
    //     searchName = searchName.trim();
    //     // console.log(searchName.toLowerCase())
    //     // console.log($scope.seedData);
    //
    //     var searchResults = $scope.seedData.filter(function (item) {
    //         return item.name == searchName
    //     })
    //
    //     if (searchResults.length > 0) {
    //         console.log(searchResults[0])
    //         // $scope.searchStatus = "Data found"
    //         $scope.data.Ke = searchResults[0].Ke
    //         $scope.data.Cw = searchResults[0].Cw
    //         $scope.data.Ch = searchResults[0].Ch
    //         $scope.data.Cq = searchResults[0].Cq
    //         $scope.data.refDoc = searchResults[0].ref
    //     } else {
    //         console.log("Data not found")
    //         $scope.data.name1 = "NO-NAME";
    //         $scope.data.name2 = "Entandrophragma";
    //         $scope.data.name3 = "angolense";
    //         $scope.data.name4 = "";
    //         $scope.data.name5 = "";
    //         $scope.data.refDoc = "Tompsett, 1992"
    //
    //         $scope.isVarEmpty = true;
    //
    //         // 대체 Value
    //         $scope.data.Ke = 4.6;
    //         $scope.data.Cw = 2.21;
    //         $scope.data.Ch = 0.033;
    //         $scope.data.Cq = 0.000478;
    //     }
    //
    //     $scope.seed = $scope.data.name2 + " " + $scope.data.name3 + " " + $scope.data.name4 + " " + $scope.data.name5 + " (" + $scope.data.refDoc + ")";
    //
    //     // console.log($scope.data.resultWaterValue)
    //     //
    //     // var logSigma = $scope.data.Ke - ( $scope.data.Cw * Math.log10($scope.data.resultWaterValue) ) - $scope.data.Ch * (-20) - $scope.data.Cq * (-20 * -20)
    //     // ie에서 Math.log10 오류가 있어 Math.log(f)/Math.log(10)로 대체
    //     var logSigma = $scope.data.Ke - ( $scope.data.Cw * Math.log($scope.data.waterValue) / Math.log(10) ) - $scope.data.Ch * (-20) - $scope.data.Cq * (-20 * -20)
    //
    //     console.log("logSigma : ", logSigma)
    //     $scope.data.sigmaDay = Math.round(Math.pow(10, logSigma))
    //     $scope.data.sigmaDay = 4891;
    //     //
    //     // console.log("$scope.data.sigmaDay : ", $scope.data.sigmaDay)
    //     // $scope.data.sigmaYear = Math.round($scope.data.sigmaDay / 365)
    //     // // console.log("$scope.data.sigmaYear : ", $scope.data.sigmaYear)
    //     // $scope.data.p90Day = Math.round($scope.data.sigmaDay * (2.3 - 1.3))
    //     // // console.log("$scope.data.p90Day : ", $scope.data.p90Day)
    //     // $scope.data.p90Year = Math.round($scope.data.p90Day / 365)
    //     // $scope.data.p85Day = Math.round($scope.data.sigmaDay * (2.3 - 1.0))
    //     // // console.log("$scope.data.p85Day : ", $scope.data.p85Day)
    //     // $scope.data.p85Year = Math.round($scope.data.p85Day / 365)
    //     // $scope.data.p80Day = Math.round($scope.data.sigmaDay * (2.3 - 0.8))
    //     // // console.log("$scope.data.p80Day : ", $scope.data.p80Day)
    //     // $scope.data.p80Year = Math.round($scope.data.p80Day / 365)
    //     // // console.log($scope.data.inventoryDate)
    //     // $scope.data.p90_P85 = addDays($scope.data.inventoryDate, $scope.data.p90Day) + " ~ " + addDays($scope.data.inventoryDate, $scope.data.p85Day)
    //     // // console.log("$scope.data.p90_P85 : ", $scope.data.p90_P85)
    //     // $scope.data.p85_P80 = addDays($scope.data.inventoryDate, $scope.data.p85Day) + " ~ " + addDays($scope.data.inventoryDate, $scope.data.p80Day)
    //     // // console.log("$scope.data.p85_P80 : ", $scope.data.p85_P80)
    //     // $scope.data.monitoringDay = $scope.data.p80Day - $scope.data.p90Day
    //     // // console.log("$scope.data.monitoringDays : ", $scope.data.monitoringDays)
    //     // // console.log("$scope.data.lipCount : ", $scope.data.lipCount)
    //     //
    //     for (var i = $scope.monitoringData.length - 1; i >= 0; i--) {
    //         // console.log("입고립수 : ", $scope.monitoringData[i].입고립)
    //         // console.log(i, $scope.monitoringData[i].입고립수, Number($scope.monitoringData[i].입고립수), $scope.data.lipCount)
    //         if (Number($scope.monitoringData[i].inventoryLipCount) <= $scope.data.lipCount) {
    //             // console.log("==== founded ", $scope.monitoringData[i].입고립수)
    //             $scope.selectedMonitoringData = $scope.monitoringData[i];
    //             break
    //         }
    //     }
    //     console.log('monitoringCount :', $scope.selectedMonitoringData.monitoringCount);
    //
    //     $scope.data.monitoringDateList = [];
    //     var diff = (0.9 - 0.8) / ($scope.selectedMonitoringData.monitoringCount - 1);
    //     console.log('diff : ', diff)
    //     // 활력확율 powerPercent	활력변환 powerTrans	날짜계산용 dateCalc	모니터링 monitroingDays	모니터링일(X) monitoringDate	에상활력(Y) expectedPower
    //     var item = {
    //         percent: 0.990 * 100,
    //         date : $scope.data.inventoryDate,
    //         power: Number($scope.data.inventoryPower)
    //     }
    //     $scope.data.monitoringDateList.push(item);
    //     var baseNormSInv = NormSInv(0.990)
    //
    //     for (var i = 0; i < $scope.selectedMonitoringData.monitoringCount; i++) {
    //         // console.log(i)
    //
    //         var percent = 0.9 - (diff * i);
    //         var normSInv = NormSInv(percent);
    //         var daysFactor = baseNormSInv - normSInv;
    //         var days = $scope.data.sigmaDay * daysFactor;
    //         console.log('days', days)
    //
    //         console.log(percent, normSInv)
    //         item = {
    //             percent: percent * 100,
    //             date: addDays($scope.data.inventoryDate, days),
    //             power: Math.round($scope.data.inventoryPower * percent * 100) / 100
    //         }
    //         $scope.data.monitoringDateList.push(item);
    //
    //     }
    //
    //     for (var i = 7; i > 0; i--) {
    //         // console.log(i)
    //         // item = {
    //         //     percent: i * 10
    //         // }
    //         // $scope.data.monitoringDateList.push(item);
    //
    //         var percent = 0.1  * i;
    //         var normSInv = NormSInv(percent);
    //         var daysFactor = baseNormSInv - normSInv;
    //         var days = $scope.data.sigmaDay * daysFactor;
    //         console.log('days', days)
    //
    //         console.log(percent, normSInv)
    //         item = {
    //             percent: percent * 100,
    //             date: addDays($scope.data.inventoryDate, days),
    //             power: Math.round($scope.data.inventoryPower * percent * 100) / 100
    //         }
    //         $scope.data.monitoringDateList.push(item);
    //
    //
    //     }
    //
    //
    //
    //
    //
    //
    //
    //
    //     console.log($scope.data.monitoringDateList)
    //
    //
    //     //
    //     // // 입고립수 inventoryLipCount
    //     // // 모니터링사용립수 monitoringUseLipCount
    //     // // 발아검정립수 sproutTestLipCount
    //     // // 반복수 : repeatCount
    //     // // 모니터링횟수 : monitoringCount
    //     //
    //     // $scope.data.testLipCount = $scope.selectedMonitoringData.monitoringUseLipCount;
    //     // $scope.data.monitoringCondition = $scope.selectedMonitoringData.sproutTestLipCount + '립 ' + $scope.selectedMonitoringData.repeatCount + '반복 ' + $scope.selectedMonitoringData.monitoringCount + '회';
    //     //
    //     // var interval = $scope.data.monitoringDay / ($scope.selectedMonitoringData.monitoringCount - 1 );
    //     // console.log('$scope.data.p90Day : ', $scope.data.p90Day)
    //     // var baseDate = addDays($scope.data.inventoryDate, $scope.data.p90Day)
    //     // // console.log(baseDate)
    //     // // baseDate = "2615.03.15"
    //     //
    //     // $scope.data.monitoringDateList = []
    //     // $scope.data.monitoringDateList.push( { date : baseDate, power : 99, percent : 99 } )
    //     // $scope.data.monitoringDate = baseDate;
    //     // for (var i = 0; i < $scope.selectedMonitoringData.monitoringCount - 1; i++) {
    //     //     // console.log("i : ", i, addDays(baseDate, interval * (i + 1) ))
    //     //     $scope.data.monitoringDate = $scope.data.monitoringDate + "\n" + addDays(baseDate, interval * (i + 1))
    //     //     $scope.data.monitoringDateList.push( { date : addDays(baseDate, interval * (i + 1)), power : 99, percent : 99 } )
    //     // }
    //
    //
    //
    //     $scope.seed = {};
    //     $scope.seed.dates = []
    //     $scope.seed.powers = []
    //
    //
    //     for(var i = 0; i < $scope.data.monitoringDateList.length; i++) {
    //         // console.log("i", i);
    //         $scope.seed.dates.push($scope.data.monitoringDateList[i].date);
    //         $scope.seed.powers.push($scope.data.monitoringDateList[i].power);
    //     }
    //
    //
    //
    //     console.log($scope.seed.dates);
    //     console.log($scope.seed.powers);
    //
    //
    //
    //     renderSeedChart();
    //
    // }

    $scope.calculate = function () {

        //--- form validatation

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
            // console.log("Data not found")
            $scope.data.name1 = "NO-NAME";
            $scope.data.name2 = "Entandrophragma";
            $scope.data.name3 = "angolense";
            $scope.data.name4 = "";
            $scope.data.name5 = "";
            $scope.data.refDoc = "Tompsett, 1992"

            $scope.isVarEmpty = true;

            // 대체 Value
            $scope.data.Ke = 4.6;
            $scope.data.Cw = 2.21;
            $scope.data.Ch = 0.033;
            $scope.data.Cq = 0.000478;
        }

        $scope.seedName = $scope.data.name2 + " " + $scope.data.name3 + " " + $scope.data.name4 + " " + $scope.data.name5 + " (" + $scope.data.refDoc + ")";

        // console.log($scope.data.resultWaterValue)
        //
        // var logSigma = $scope.data.Ke - ( $scope.data.Cw * Math.log10($scope.data.resultWaterValue) ) - $scope.data.Ch * (-20) - $scope.data.Cq * (-20 * -20)
        // ie에서 Math.log10 오류가 있어 Math.log(f)/Math.log(10)로 대체
        var logSigma = $scope.data.Ke - ( $scope.data.Cw * Math.log($scope.data.waterValue) / Math.log(10) ) - $scope.data.Ch * (-20) - $scope.data.Cq * (-20 * -20)
        // console.log("logSigma : ", logSigma)
        $scope.data.sigmaDay = Math.round(Math.pow(10, logSigma))
        // $scope.data.sigmaDay = 4891;
        //
        // console.log("$scope.data.sigmaDay : ", $scope.data.sigmaDay)




        $scope.data.sigmaYear = Math.round($scope.data.sigmaDay / 365)
        // // console.log("$scope.data.sigmaYear : ", $scope.data.sigmaYear)
        // $scope.data.p90Day = Math.round($scope.data.sigmaDay * (2.3 - 1.3))
        $scope.data.p90Day = Math.round(getDays(0.9));
        // // console.log("$scope.data.p90Day : ", $scope.data.p90Day)
        $scope.data.p90Year = Math.round($scope.data.p90Day / 365)
        $scope.data.p85Day = Math.round(getDays(0.85));
        // // console.log("$scope.data.p85Day : ", $scope.data.p85Day)
        $scope.data.p85Year = Math.round($scope.data.p85Day / 365)
        $scope.data.p80Day = Math.round(getDays(0.8));
        // // console.log("$scope.data.p80Day : ", $scope.data.p80Day)
        $scope.data.p80Year = Math.round($scope.data.p80Day / 365)
        // // console.log($scope.data.inventoryDate)
        $scope.data.p90_P85 = addDays($scope.data.inventoryDate, $scope.data.p90Day) + " ~ " + addDays($scope.data.inventoryDate, $scope.data.p85Day)
        // // console.log("$scope.data.p90_P85 : ", $scope.data.p90_P85)
        $scope.data.p85_P80 = addDays($scope.data.inventoryDate, $scope.data.p85Day) + " ~ " + addDays($scope.data.inventoryDate, $scope.data.p80Day)
        // // console.log("$scope.data.p85_P80 : ", $scope.data.p85_P80)
        $scope.data.monitoringDay = $scope.data.p80Day - $scope.data.p90Day
        // // console.log("$scope.data.monitoringDays : ", $scope.data.monitoringDays)
        // // console.log("$scope.data.lipCount : ", $scope.data.lipCount)
        //
        for (var i = $scope.monitoringData.length - 1; i >= 0; i--) {
            // console.log("입고립수 : ", $scope.monitoringData[i].입고립)
            // console.log(i, $scope.monitoringData[i].입고립수, Number($scope.monitoringData[i].입고립수), $scope.data.lipCount)
            if (Number($scope.monitoringData[i].inventoryLipCount) <= $scope.data.lipCount) {
                // console.log("==== founded ", $scope.monitoringData[i].입고립수)
                $scope.selectedMonitoringData = $scope.monitoringData[i];
                break
            }
        }
        // console.log('monitoringCount :', $scope.selectedMonitoringData.monitoringCount);

        $scope.data.monitoringDateList = [];
        $scope.data.viability = {'p90' : 0, 'p80':0 };
        var diff = Math.round((0.9 - 0.8) / ($scope.selectedMonitoringData.monitoringCount - 1) * 10000) / 10000;
        // console.log('diff : ', diff)
        // 활력확율 powerPercent	활력변환 powerTrans	날짜계산용 dateCalc	모니터링 monitroingDays	모니터링일(X) monitoringDate	에상활력(Y) expectedPower
        var item = {
            percent: 0.990 * 100,
            date : $scope.data.inventoryDate,
            power: Number($scope.data.inventoryPower)
        }
        $scope.data.monitoringDateList.push(item);
        var baseNormSInv = NormSInv(0.990);

        for (var i = 0; i < $scope.selectedMonitoringData.monitoringCount; i++) {
            // console.log(i)

            var percent = Math.round( (0.9 - (diff * i)) *  1000) / 1000;
            var normSInv = Math.round(NormSInv(percent) * 1000) / 1000;
            var daysFactor = Math.round( (baseNormSInv - normSInv) *1000) / 1000;
            var days = Math.round($scope.data.sigmaDay * daysFactor);
            // console.log('days', days)

            // console.log(percent, normSInv)
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
            // console.log(i)
            // item = {
            //     percent: i * 10
            // }
            // $scope.data.monitoringDateList.push(item);

            var percent = 0.1  * i;
            var normSInv = NormSInv(percent);
            var daysFactor = baseNormSInv - normSInv;
            var days = $scope.data.sigmaDay * daysFactor;
            // console.log('days', days)

            // console.log(percent, normSInv)
            item = {
                percent: Math.round(percent * 100 * 10) / 10,
                date: addDays($scope.data.inventoryDate, days),
                power: Math.round($scope.data.inventoryPower * percent * 100) / 100
            }
            $scope.data.monitoringDateList.push(item);


        }








        // console.log($scope.data.monitoringDateList)


        //
        // // 입고립수 inventoryLipCount
        // // 모니터링사용립수 monitoringUseLipCount
        // // 발아검정립수 sproutTestLipCount
        // // 반복수 : repeatCount
        // // 모니터링횟수 : monitoringCount
        //
        $scope.data.testLipCount = $scope.selectedMonitoringData.monitoringUseLipCount;
        $scope.data.monitoringCondition = $scope.selectedMonitoringData.sproutTestLipCount + '립 ' + $scope.selectedMonitoringData.repeatCount + '반복 ' + $scope.selectedMonitoringData.monitoringCount + '회';
        //
        // var interval = $scope.data.monitoringDay / ($scope.selectedMonitoringData.monitoringCount - 1 );
        // console.log('$scope.data.p90Day : ', $scope.data.p90Day)
        // var baseDate = addDays($scope.data.inventoryDate, $scope.data.p90Day)
        // // console.log(baseDate)
        // // baseDate = "2615.03.15"
        //
        // $scope.data.monitoringDateList = []
        // $scope.data.monitoringDateList.push( { date : baseDate, power : 99, percent : 99 } )
        // $scope.data.monitoringDate = baseDate;
        // for (var i = 0; i < $scope.selectedMonitoringData.monitoringCount - 1; i++) {
        //     // console.log("i : ", i, addDays(baseDate, interval * (i + 1) ))
        //     $scope.data.monitoringDate = $scope.data.monitoringDate + "\n" + addDays(baseDate, interval * (i + 1))
        //     $scope.data.monitoringDateList.push( { date : addDays(baseDate, interval * (i + 1)), power : 99, percent : 99 } )
        // }



        $scope.seed = [];
        $scope.seed.dates = []
        $scope.seed.powers = []
        $scope.seed.scaled = []


        //new Date('2017.01.01').getTime()

        for(var i = 0; i < $scope.data.monitoringDateList.length; i++) {
            // console.log("i", i);
            $scope.seed.dates.push($scope.data.monitoringDateList[i].date);
            $scope.seed.powers.push($scope.data.monitoringDateList[i].power);
            var date = new Date('2017.01.01').getTime();
            // $scope.seed.scaled.push([ new Date($scope.data.monitoringDateList[i].date).getTime(), $scope.data.monitoringDateList[i].power]);
            var x= new Date($scope.data.monitoringDateList[i].date).getTime();
            var y= $scope.data.monitoringDateList[i].power;
            var color;
            if (y <= $scope.data.viability.p90 && y >= $scope.data.viability.p80) {
                color = 'red';
            } else {
                color = Highcharts.getOptions().colors[0];
            }
            $scope.seed.scaled.push({ x: x, y: y, color: color});
            // $scope.seed.scaled.push({ x: x, y: y, borderColor: color});
        }

        //
        // console.log($scope.seed.scaled)

        // data: [
        //     [Date.UTC(1965, 9, 21), 0],
        // console.log($scope.seed.dates);
        // console.log($scope.seed.powers);



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

        console.log('seed chart...')

        // console.log($scope.seed);
        // console.log('$scope.data.viability.p90', $scope.data.viability.p90);
        // console.log('$scope.data.viability.p80', $scope.data.viability.p80);

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
                // formatter: function() {
                //     // console.log('tooltip', this.point.color.stops[1][1])
                //     var tooltip;
                //     if (this.key == 'last') {
                //         tooltip = '<b>Final result is </b> ' + this.y;
                //     }
                //     else {
                //         tooltip =  '';
                //     }
                //     // %A, %b %e, %Y, %H:%M
                //     tooltip =  '<span style="color:' + this.series.color + '">' + 'Date' + '</span>: <b>' + Highcharts.dateFormat('%Y.%m.%d', new Date(this.x + 3600000 * 24)) + '</b><br/>';
                //     // tooltip =  '<span style="color:' + this.series.color + '">' + 'Date' + '</span>: <b>' + Highcharts.dateFormat('%A, %b %e, %Y, %H:%M', new Date(this.x + 13600000)) + '</b><br/>';
                //     tooltip = tooltip + '<span style="color:' + this.series.color + '">' + this.series.name + '</span>: <b>' + this.y + '</b><br/>'
                //     return tooltip;
                // },
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

            // plotOptions: {
            //     series: {
            //         marker: {
            //
            //             fillColor: '#FFFFFF',
            //             // fillColor: {
            //             //     formatter: function () {
            //             //         if (true) {
            //             //             return 'red'
            //             //         } else {
            //             //             return 'green'
            //             //         }
            //             //     }
            //             // },
            //             lineWidth: 2,
            //             // lineColor: 'red', // inherit from series
            //             // lineColor: (this.y <= $scope.data.viability.p90 && this.y >= $scope.data.viability.p80) ? 'red' : 'blue'
            //             // lineColor: {
            //             //     formatter: function () {
            //             //         if (true) {
            //             //             return 'red';
            //             //         } else {
            //             //             return 'green;'
            //             //         }
            //             //     }
            //             // }
            //
            //             // lineColor: (this.y <= $scope.data.viability.p90 && this.y >= $scope.data.viability.p80) ? 'red' : 'blue'
            //             lineColor: {
            //                 formatter: function () {
            //                     console.log(this);
            //                     // if (this.y > 50) {
            //                     //     return 'red';
            //                     // } else {
            //                     //     return 'green;'
            //                     // }
            //                     return 'red';
            //                 }
            //             }
            //         }
            //     },
            //     spline: {
            //         marker: {
            //             enabled: true
            //         }
            //     }
            // },

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
                // Define the data points. All series have a dummy year
                // of 1970/71 in order to be compared on the same x axis. Note
                // that in JavaScript, months start at 0 for January, 1 for February etc.
                //data: [
                //    [Date.UTC(2017, 0, 1), 60],
                //    [Date.UTC(2030, 11, 29), 54],
                //    [Date.UTC(2031, 9, 23), 53.33],
                //    ...
                //]
                // 위와 같이 하시면 실제로는 아래와 같습니다.
                // data: [[1483196400000,60],[1924700400000,54] ... ]
                data: $scope.seed.scaled
            }],
            exporting: {
                filename: 'Seed_Viability' + '-' + $scope.data.name2 + '_' + $scope.data.name3  + '-' + formatDate(new Date)
            }
        });
    }

    function renderSeedChart2() {
        Highcharts.chart('container_seed', {

            credits : { enabled: false},

            title: {
                text: 'Seed_Viability' + '-' + $scope.data.name2 + '_' + $scope.data.name3  + '-' + formatDate(new Date),
                style: {
                    fontWeight: 'bold',
                    fontSize: "24px"
                }
            },

            // subtitle: {
            //     text: 'Source: thesolarfoundation.com'
            // },

            xAxis: {
                categories: $scope.seed.dates
            },

            yAxis: {
                title: {
                    text: 'Viability(%)'
                }
            },
            legend: {
                enabled: false,
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle'
            },

            // plotOptions: {
            //     series: {
            //         pointStart: 2010
            //     }
            // },

            series: [{
                name: 'Viability',
                data: $scope.seed.powers
            }],


            exporting: {
                filename: 'Seed_Viability' + '-' + $scope.data.name2 + '_' + $scope.data.name3  + '-' + formatDate(new Date)
            }


        });
    }

    function renderOilChart() {

        // console.log($scope.waterValue)

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
                // minPadding: 10,
                // maxPadding: 10,
                tickInterval: 10,
                type: 'linear',
                title: {
                    text: '건조 상대습도'
                },
                categories: $scope.oilWaters.humidity,
                // minorGridLineWidth: 0,
                // minorTickLength: 0,

                // plotLines: [{
                //     color: 'green',
                //     // dashStyle: 'shortdash',
                //     width: 2,
                //     value: 10
                // }],

                // plotBands: [{
                //     color: '#FCFFC5',
                //     from: 1,
                //     to: 2
                // }],
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


                // labels: {
                //     step: 1
                // }
            },

            yAxis: {
                title: {
                    text: '수분함량'
                },
                // plotLines: [{
                //     value: $scope.data.resultWaterValue,
                //     color: 'green',
                //     dashStyle: 'shortdash',
                //     width: 2,
                //     label: {
                //         text: '수분함량: ' + $scope.data.resultWaterValue,
                //         align: 'center'
                //     }
                // }]
            },
            legend: {
                enabled: false,
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle'
            },

            // tooltip: {
            //     // crosshairs: [true,true],
            //     crosshairs: [{
            //         width: 1,
            //         dashStyle: 'solid',
            //         color: 'red'
            //     }, {
            //         width: 1,
            //         dashStyle: 'solid',
            //         color: 'red'
            //     }],
            // },
            //
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

            // plotOptions: {
            //     line: {
            //         dataLabels: {
            //             enabled: true
            //         },
            //         // enableMouseTracking: false
            //     }
            // },

            plotOptions: {
                series: {
                    marker: {
                        fillColor: '#FFFFFF',
                        lineWidth: 2,
                        lineColor: null // inherit from series
                    }
                }
            },



            // series: [{
            //     name: '수분함량',
            //     data: $scope.oilWaters.water
            // }],
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

    function renderOilChart2() {

        // console.log($scope.waterValue)

        Highcharts.chart('container_oil', {

            chart: {
                height: 300,
                type: 'line'
            },
            credits : { enabled: false},
            title: {
                text: 'Seed_moisture_isotherm' + '-' + $scope.data.name2 + '_' + $scope.data.name3  + '-' + formatDate(new Date)
            },

            // subtitle: {
            //     text: 'Source: thesolarfoundation.com'
            // },

            xAxis: {
                title: {
                    text: '건조 상대습도'
                },
                categories: $scope.oilWaters.humidity,
                plotLines: [{
                    color: 'green',
                    dashStyle: 'shortdash',
                    width: 2,
                    value: 0.5
                }]

                // plotBands: [{
                //     color: '#FCFFC5',
                //     from: 1,
                //     to: 2
                // }],
                // plotLines: [{
                //     color: '#FF0000',
                //     width: 2,
                //     value: 1,
                //     label: {
                //         text: 'default',
                //         verticalAlign: 'middle',
                //         textAlign: 'center',
                //     }
                // }]

            },

            yAxis: {
                title: {
                    text: '수분함량'
                },
                plotLines: [{
                    value: $scope.data.resultWaterValue,
                    color: 'green',
                    dashStyle: 'shortdash',
                    width: 2,
                    label: {
                        text: '수분함량: ' + $scope.data.resultWaterValue,
                        align: 'center'
                    }
                }]
            },
            legend: {
                enabled: false,
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle'
            },

            tooltip: {
                // crosshairs: [true,true],
                crosshairs: [true, {
                    width: 1.5,
                    dashStyle: 'solid',
                    color: 'red'
                }],
            },


            // plotOptions: {
            //     series: {
            //         pointStart: 2010
            //     }
            // },

            series: [{
                name: '수분함량',
                data: $scope.oilWaters.water
            }],

            exporting: {
                filename: 'Seed_moisture_isotherm' + '-' + $scope.data.name2 + '_' + $scope.data.name3  + '-' + formatDate(new Date)
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