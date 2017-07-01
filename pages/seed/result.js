app.controller('seed.result', function ($scope, $rootScope, utilService) {

    d3.csv('data/seed.csv', function (data) {
        $scope.$apply(function () {
            $scope.seedData = data;
        });
    });

    d3.csv('data/monitoring.csv', function (data) {
        $scope.$apply(function () {
            $scope.monitoringData = data;
        });
    });

    d3.csv('data/name.csv', function (data) {
        $scope.$apply(function () {
            $scope.nameData = data;
        });
    });


    $scope.data = {};
    $scope.seedChange = function (seed) {
        var arr = seed.name.split(' ');
        $scope.data.seedTempName = arr[0] + ' ' + arr[1] + ' - ' + seed.ref;
        $scope.data.Ke = seed.Ke;
        $scope.data.Cw = seed.Cw;
        $scope.data.Ch = seed.Ch;
        $scope.data.Cq = seed.Cq;
    }

    $scope.$on('seed.found', function (event, data) {
        $scope.data = data;
    })

    $scope.calculate = function () {

        if (!$scope.data.Ke || !$scope.data.Cw || !$scope.data.Ch || !$scope.data.Cq ) {
            $rootScope.modalMessage = 'Please check Ke, Cw, Ch and Cq fileds.'
            $('#myModal').modal('show')
            return false;
        }

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

        if ($scope.selectedMonitoringData  === undefined) {
            $rootScope.modalMessage = 'No data. Please find the seed first.'
            $('#myModal').modal('show')
            return false;
        }

        $scope.data.monitoringDateList = [];
        $scope.data.viability = {'p90': 0, 'p80': 0};

        var diff = Math.round((0.9 - 0.8) / ($scope.selectedMonitoringData.monitoringCount - 1) * 10000) / 10000;
        var item = {
            percent: 0.990 * 100,
            date: $scope.data.inventoryDate,
            power: Number($scope.data.inventoryPower)
        }
        $scope.data.monitoringDateList.push(item);
        var baseNormSInv = NormSInv(0.990);

        for (var i = 0; i < $scope.selectedMonitoringData.monitoringCount; i++) {
            var percent = Math.round((0.9 - (diff * i)) * 1000) / 1000;
            var normSInv = Math.round(NormSInv(percent) * 1000) / 1000;
            var daysFactor = Math.round((baseNormSInv - normSInv) * 1000) / 1000;
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
            var percent = 0.1 * i;
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

        for (var i = 0; i < $scope.data.monitoringDateList.length; i++) {
            $scope.seed.dates.push($scope.data.monitoringDateList[i].date);
            $scope.seed.powers.push($scope.data.monitoringDateList[i].power);
            var date = new Date('2017.01.01').getTime();
            var x = new Date($scope.data.monitoringDateList[i].date).getTime();
            var y = $scope.data.monitoringDateList[i].power;
            var color;
            if (y <= $scope.data.viability.p90 && y >= $scope.data.viability.p80) {
                color = 'red';
            } else {
                color = Highcharts.getOptions().colors[0];
            }
            $scope.seed.scaled.push({x: x, y: y, color: color});
        }
        renderSeedChart();
        $scope.isReady = true;
    }

    $scope.chartConfig = {
        chart: {
            type: 'spline'
        },
        credits: {enabled: false},
        title: {
            text: ''
        },
        xAxis: {
            type: 'datetime',
            title: {
                text: 'Year'
            }
        },
        yAxis: {
            title: {
                text: 'Viability(%)'
            },
            min: 0
        },

        legend: {
            enabled: false
        },
        tooltip: {
            formatter: function () {
                return  '<b>' + this.series.name +'</b><br/>' +
                    this.y + ' % in ' + Highcharts.dateFormat('%Y', new Date(this.x));
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
                    enabled: true,
                    fillColor: '#FFFFFF',
                    lineWidth: 1,
                    lineColor: null // inherit from series
                }
            }
        },
        exporting: {
            // filename: $rootScope.lotNo + ' Seed_Viability' + '-' + $scope.data.name2 + '_' + $scope.data.name3  + '-' + utilService.formatDate(new Date)
            filename: ''
        }
    }

    function renderSeedChart() {
        $scope.chartConfig.series = [{
            name: 'Viability',
            data: $scope.seed.scaled
        }];
        var name = $scope.data.lotNo + ' Seed_Viability' + '-' + $scope.data.name2 + '_' + $scope.data.name3  + '-' + utilService.formatDate(new Date)
        $scope.chartConfig.title.text = name;
        $scope.chartConfig.exporting.filename = name;
    }

    function getDays(percent) {
        var baseNormSInv = NormSInv(0.990);
        var normSInv = Math.round(NormSInv(percent) * 1000) / 1000;
        var daysFactor = Math.round((baseNormSInv - normSInv) * 1000) / 1000;
        var days = Math.round($scope.data.sigmaDay * daysFactor);
        return days;
    }

    function addDays(baseDate, numberOfDaysToAdd) {
        var someDate = new Date(baseDate);
        someDate.setDate(someDate.getDate() + numberOfDaysToAdd);
        var dd = someDate.getDate();
        var mm = someDate.getMonth() + 1;
        var y = someDate.getFullYear();
        var someFormattedDate = y + '.' + zeroPad(mm, 2) + '.' + zeroPad(dd, 2);
        return someFormattedDate
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

        if ((p < 0) || (p > 1)) {
            alert("NormSInv: Argument out of range.");
            retVal = 0;
        }
        else if (p < p_low) {
            q = Math.sqrt(-2 * Math.log(p));
            retVal = (((((c1 * q + c2) * q + c3) * q + c4) * q + c5) * q + c6) / ((((d1 * q + d2) * q + d3) * q + d4) * q + 1);
        }
        else if (p <= p_high) {
            q = p - 0.5;
            r = q * q;
            retVal = (((((a1 * r + a2) * r + a3) * r + a4) * r + a5) * r + a6) * q / (((((b1 * r + b2) * r + b3) * r + b4) * r + b5) * r + 1);
        }
        else {
            q = Math.sqrt(-2 * Math.log(1 - p));
            retVal = -(((((c1 * q + c2) * q + c3) * q + c4) * q + c5) * q + c6) / ((((d1 * q + d2) * q + d3) * q + d4) * q + 1);
        }

        return retVal;
    }

    $scope.save = function () {
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

        var csvData = '입고 종자 정보';
        csvData = csvData + '\n' + '종정보,' + '"Oryza sativa var. japonica (Ellis et al., 1992)"';
        csvData = csvData + '\n' + '수분함량,' + '5.2';
        csvData = csvData + '\n\n' + '[ 결과 ]';
        csvData = csvData + '\n' + 'Ke,' + '8.2736';

        var BOM = "\uFEFF";
        csvData = BOM + csvData;
        var blob = new Blob([csvData], {type: "text/csv;charset=utf-8"});
        saveAs(blob, "myFile.csv");
    }

    $scope.exportJsonToCsv = function () {

        if (!$scope.data.monitoringDateList) {
            $rootScope.modalMessage = 'No data. Please find and calculate.'
            $('#myModal').modal('show')
            return false;
        }


        for (var i = 0; i < $scope.data.monitoringDateList.length; i++) {
            $scope.data.monitoringDateList[i].index = i;
            delete $scope.data.monitoringDateList[i].$$hashKey;
        }
        $scope.data.monitoringDateList.splice(Number($scope.selectedMonitoringData.monitoringCount) + 1, 7);
        var json = $scope.data.monitoringDateList;
        var fields = Object.keys(json[0]);
        var replacer = function (key, value) {
            return value === null ? '' : value
        };
        var csv = json.map(function (row) {
            return fields.map(function (fieldName) {
                return JSON.stringify(row[fieldName], replacer)
            }).join(',');
        });
        csv.unshift(fields.join(',')); // add header column
        csv = csv.join('\r\n');
        var blob = new Blob([csv], {type: "text/csv;charset=utf-8"});
        // filename: 'Seed_Viability' + '-' + $scope.data.name2 + '_' + $scope.data.name3  + '-' + formatDate(new Date)
        saveAs(blob, $scope.data.lotNo + ' Monitoring_date' + '-' + $scope.data.name2 + '_' + $scope.data.name3 + '-' + utilService.formatDate(new Date) + '.csv');
    }

})
