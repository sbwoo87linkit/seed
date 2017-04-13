var app = angular.module('myApp', ['ui-rangeSlider']);

app.controller('MainController', function ($scope, $http, $q, $filter, filterFilter, $log) {


    $('#sandbox-container input').datepicker({});

    $scope.varNames = ['', 'cv.', 'subsp.', 'var.'];

    $scope.varNameChanged = function () {
        console.log('changed : ', $scope.data.name4);
        if (!$scope.data.name4) {
            $scope.isVarEmpty = true;
        } else {
            $scope.isVarEmpty = false;
        }
        $scope.data.name5 = '';

    }

    $scope.data = {
        "name1": "NO-NAME",
        "name2": "Oryza",
        "name3": "sativa",
        "name4": "var.",
        "name5": "japonica",

        "waterValue": 5.2,
        "inventoryCondition": -20,

        "inventoryDate": "2017.03.14",
        "weight": 1000,
        "kiloLipWeight": 27.5,
        "lipCount": 0,

        "inventoryPower": 99,

        "groundValue": 2.2,
        "dryTemperature": 15,
        "dryHumidity": 15,
        "resultWaterValue": 0,
    }

    d3.csv('data/seed.csv', function (data) {
        // console.log(data)
        $scope.seedData = data;
    });

    d3.csv('data/monitoring.csv', function (data) {
        // console.log(data)
        $scope.monitoringData = data;
    });

    $scope.calculateLipCount = function () {
        // console.log("lip calculate")
        //중량/1000립중*1000
        $scope.data.lipCount = Math.round($scope.data.weight / $scope.data.kiloLipWeight * 1000);

    }

    $scope.calculateLipCount()

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
            return item.식물종 == searchName
        })

        if (searchResults.length > 0) {
            console.log(searchResults[0])
            // $scope.searchStatus = "Data found"
            $scope.data.Ke = searchResults[0].Ke
            $scope.data.Cw = searchResults[0].Cw
            $scope.data.Ch = searchResults[0].Ch
            $scope.data.Cq = searchResults[0].Cq
            $scope.data.refDoc = searchResults[0].참고문헌
        } else {
            console.log("Data not found")
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

        $scope.seed = $scope.data.name2 + " " + $scope.data.name3 + " " + $scope.data.name4 + " " + $scope.data.name5 + " (" + $scope.data.refDoc + ")";

        // console.log($scope.data.resultWaterValue)
        //
        // var logSigma = $scope.data.Ke - ( $scope.data.Cw * Math.log10($scope.data.resultWaterValue) ) - $scope.data.Ch * (-20) - $scope.data.Cq * (-20 * -20)
        // ie에서 Math.log10 오류가 있어 Math.log(f)/Math.log(10)로 대체
        var logSigma = $scope.data.Ke - ( $scope.data.Cw * Math.log($scope.data.waterValue)/Math.log(10) ) - $scope.data.Ch * (-20) - $scope.data.Cq * (-20 * -20)
        // console.log("logSigma : ", logSigma)
        $scope.data.sigmaDay = Math.round( Math.pow(10, logSigma))
        // console.log("$scope.data.sigmaDay : ", $scope.data.sigmaDay)
        $scope.data.sigmaYear = Math.round($scope.data.sigmaDay / 365)
        // console.log("$scope.data.sigmaYear : ", $scope.data.sigmaYear)
        $scope.data.p90Day = Math.round( $scope.data.sigmaDay * (2.3 - 1.3))
        // console.log("$scope.data.p90Day : ", $scope.data.p90Day)
        $scope.data.p90Year = Math.round($scope.data.p90Day/365)
        $scope.data.p85Day = Math.round($scope.data.sigmaDay * (2.3 - 1.0))
        // console.log("$scope.data.p85Day : ", $scope.data.p85Day)
        $scope.data.p85Year = Math.round($scope.data.p85Day/365)
        $scope.data.p80Day = Math.round($scope.data.sigmaDay * (2.3 - 0.8))
        // console.log("$scope.data.p80Day : ", $scope.data.p80Day)
        $scope.data.p80Year = Math.round($scope.data.p80Day/365)
        // console.log($scope.data.inventoryDate)
        $scope.data.p90_P85 = addDays($scope.data.inventoryDate, $scope.data.p90Day) + " ~ " + addDays($scope.data.inventoryDate, $scope.data.p85Day)
        // console.log("$scope.data.p90_P85 : ", $scope.data.p90_P85)
        $scope.data.p85_P80 = addDays($scope.data.inventoryDate, $scope.data.p85Day) + " ~ " + addDays($scope.data.inventoryDate, $scope.data.p80Day)
        // console.log("$scope.data.p85_P80 : ", $scope.data.p85_P80)
        $scope.data.monitoringDay = $scope.data.p80Day - $scope.data.p90Day
        // console.log("$scope.data.monitoringDays : ", $scope.data.monitoringDays)
        // console.log("$scope.data.lipCount : ", $scope.data.lipCount)

        for(var i = $scope.monitoringData.length - 1; i >= 0; i--) {
            // console.log("입고립수 : ", $scope.monitoringData[i].입고립)
            // console.log(i, $scope.monitoringData[i].입고립수, Number($scope.monitoringData[i].입고립수), $scope.data.lipCount)
            if (Number($scope.monitoringData[i].입고립수) <= $scope.data.lipCount) {
                // console.log("==== founded ", $scope.monitoringData[i].입고립수)
                $scope.selectedMonitoringData = $scope.monitoringData[i];
                break
            }
        }

        $scope.data.testLipCount = $scope.selectedMonitoringData.모니터링사용립수;
        $scope.data.monitoringCondition = $scope.selectedMonitoringData.발아검정립수 + '립 ' + $scope.selectedMonitoringData.반복수 + '반복 ' + $scope.selectedMonitoringData.모니터링횟수 + '회';

        var interval = $scope.data.monitoringDay / ($scope.selectedMonitoringData.모니터링횟수 - 1 );
        console.log('$scope.data.p90Day : ', $scope.data.p90Day)
        var baseDate = addDays($scope.data.inventoryDate, $scope.data.p90Day)
        // console.log(baseDate)
        // baseDate = "2615.03.15"

        $scope.data.monitoringDate = baseDate;
        for (var i=0; i < $scope.selectedMonitoringData.모니터링횟수 - 1; i++) {
            // console.log("i : ", i, addDays(baseDate, interval * (i + 1) ))
            $scope.data.monitoringDate = $scope.data.monitoringDate + "\n" + addDays(baseDate, interval * (i + 1) )
        }

        // $scope.save();

    }

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

        var Me = ((1-$scope.data.groundValue/100) * Math.sqrt(-440 * Math.log(1-$scope.data.dryHumidity/100))) / (1.1 + ($scope.data.dryTemperature/90) )
        // console.log(Me)
        $scope.data.resultWaterValue = Math.round( 100 * Me / ( 100 + Me) * 100) / 100
    }

    $scope.calculateWaterValue()

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
        var someFormattedDate = y + '.'+ mm + '.'+ dd;
        // console.log(someFormattedDate)
        return someFormattedDate
    }

    $scope.save = function () {
        console.log('save')
        var out = "입고종자 정보";
        out = out + "\n" + "-----";
        out = out + "\n" + "종정보 : " + $scope.data.name2 + " " + $scope.data.name3 + " " + $scope.data.name4 + " " + $scope.data.name5 + " (" + $scope.data.refDoc + ")";
        out = out + "\n" + "수분함량 : " + $scope.data.waterValue + ", 저장조건 : " + $scope.data.inventoryCondition;
        out = out + "\n" + "입고일 : " + $scope.data.inventoryDate +  ", 중량 : " + $scope.data.weight + ", 1000립중 : " + $scope.data.kiloLipWeight + ", 립수 : " + $scope.data.lipCount;
        out = out + "\n" + "입고활력 : " + $scope.data.inventoryPower

        out = out + "\n";
        out = out + "\n" + "지질함량에 따른 수분함량 계산";
        out = out + "\n" + "-----";
        out = out + "\n" + "지질함량 : " + $scope.data.groundValue +  ", 건조온도 : " + $scope.data.dryTemperature + ", 건조 상대습도 : " + $scope.data.dryHumidity + ", 수분함량 : " + $scope.data.resultWaterValue;

        out = out + "\n";
        out = out + "\n" + "결과";
        out = out + "\n" + "-----";
        out = out + "\n" + "수명공식계수 : " + $scope.seed;
        out = out + "\n" + "Ke : " + $scope.data.Ke +  ", Cw : " + $scope.data.Cw + ", Ch : " + $scope.data.Ch + ", Cq : " + $scope.data.Cq;
        out = out + "\n" + "Sigma(Day) : " + $scope.data.sigmaDay +  ", P90(Day) : " + $scope.data.p90Day + ", P85(Day) : " + $scope.data.p85Day + ", P80(Day) : " + $scope.data.p80Day;
        out = out + "\n" + "Sigma(Year) : " + $scope.data.sigmaYear +  ", P90(Year) : " + $scope.data.p90Year + ", P85(Year) : " + $scope.data.p85Year + ", P80(Year) : " + $scope.data.p80Day;
        out = out + "\n" + "P90-P85 : " + $scope.data.p90_P85 +  ", P85-P80 : " + $scope.data.p85_P80;
        out = out + "\n" + "모니터링 기간day : " + $scope.data.monitoringDay +  ", 권장 검정립수 : " + $scope.data.testLipCount + ", 권장 모니터링 조건 : " + $scope.data.monitoringCondition;
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

        var blob = new Blob([csvData], { type: "text/csv;charset=utf-8" });
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
});