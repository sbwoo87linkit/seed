app.controller('seed.equilibrium', function ($scope, $rootScope, utilService) {

    $scope.data = {
        "groundValue": 2.2,
        "dryTemperature": 15,
        "dryHumidity": 15,
        "resultWaterValue": 0,
    }

    d3.csv('data/oil.csv', function (data) {
        $scope.$apply(function () {
            $scope.oilData = data;
            $scope.data.groundValue = $scope.oilData[0].oil;

        });
    });

    $scope.$on('seed.found', function (event, data) {
        $scope.data.seedName = data.seedName;
    })


    $scope.calculateWaterValue = function () {

        if (!$scope.data.groundValue || !!isNaN($scope.data.groundValue)) {
            $rootScope.modalMessage = 'Oil content field is required.(Type: Numeric)'
            $('#myModal').modal('show')
            return;
        }

        if (!$scope.data.dryTemperature || !!isNaN($scope.data.dryTemperature)) {
            $rootScope.modalMessage = 'Drying Temp is required.(Type: Numeric)'
            $('#myModal').modal('show')
            return;
        }

        if (!$scope.data.dryHumidity || !!isNaN($scope.data.dryHumidity)) {
            $rootScope.modalMessage = 'Equilibrium RH. is required.(Type: Numeric)'
            $('#myModal').modal('show')
            return;
        }

        $scope.oilWaters = null;
        var Me = ((1 - $scope.data.groundValue / 100) * Math.sqrt(-440 * Math.log(1 - (+$scope.data.dryHumidity / 100)))) / (1.1 + ($scope.data.dryTemperature / 90) )
        $scope.data.resultWaterValue = Math.round(100 * Me / ( 100 + Me) * 100) / 100;

        $scope.oilWaters = {
            humidity: [10, 20, 30, 40, 50, 60, 70, 80],
            water: [],
            all: []
        }

        $scope.oilWaters.humidity.push($scope.data.dryHumidity);

        $scope.oilWaters.humidity.sort(function (a, b) {
            return a - b;
        });

        function onlyUnique(value, index, self) {
            return self.indexOf(value) === index;
        }

        // usage example:
        //var a = ['a', 1, 'a', 2, '1'];
        $scope.oilWaters.humidity = $scope.oilWaters.humidity.filter(onlyUnique); // returns ['a', 1, 2, '1']


        for (var i = 0; i < $scope.oilWaters.humidity.length; i++) {
            var Me = ((1 - $scope.data.groundValue / 100) * Math.sqrt(-440 * Math.log(1 - ($scope.oilWaters.humidity[i]) / 100))) / (1.1 + ($scope.data.dryTemperature / 90) )
            var waterValue = Math.round(100 * Me / ( 100 + Me) * 100) / 100;

            $scope.oilWaters.water.push(waterValue);

            console.log(JSON.stringify($scope.oilWaters.humidity))

            if ($scope.oilWaters.humidity[i] === $scope.data.dryHumidity) {
                $scope.oilWaters.all.push({x: Number($scope.oilWaters.humidity[i]), y: waterValue, color: 'red'});
            } else {
                $scope.oilWaters.all.push([Number($scope.oilWaters.humidity[i]), waterValue]);
            }
        }

        renderOilChart();

        $scope.isReady = true;

    }

    $scope.chartConfig = {
        chart: {
            type: 'line'
        },
        credits: {enabled: false},
        title: {
            text: 'Seed moisture isotherm'
        },
        xAxis: {
            // type: 'linear',
            title: {
                text: 'Equilibrium RH(%)'
            }
        },

        yAxis: {
            title: {
                text: 'Moisture content(%)'
            }
        },
        legend: {
            enabled: false
        },
        tooltip: {
            formatter: function () {
                var tooltip;
                // if (this.key == 'last') {
                //     tooltip = '<b>Final result is </b> ' + this.y;
                // }
                // else {
                //     tooltip =  '';
                // }
                tooltip = '<span style="color:' + this.series.color + '">' + 'Equilibrium RH(%)' + '</span>: <b>' + this.x + '</b><br/>';
                tooltip = tooltip + '<span style="color:' + this.series.color + '">' + this.series.name + '(%)</span>: <b>' + this.y + '</b><br/>'
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
                    enabled: true,
                    fillColor: '#FFFFFF',
                    lineWidth: 1,
                    lineColor: null // inherit from series

                }
            }
        },
        exporting: {
            filename: $rootScope.app.lotNo + ' Seed moisture isotherm('
            + $scope.data.dryTemperature
            + '°C) '
            + $scope.data.name2
            + ' '
            + $scope.data.name3
            + '-'
            + utilService.formatDate(new Date)
        }
    }


    function renderOilChart() {

        $scope.oilWaters.humidity = [10, 20, 30, 40, 50, 60, 70, 80]

        // $scope.oilWaters.all = [[10,5.1],{"x":14,"y":6.04,"color":"red"},[20,7.25],[30,9],[40,10.58],[50,12.12],[60,13.68],[70,15.37],[80,17.36]]

        // console.log(JSON.stringify($scope.oilWaters.humidity))
        // console.log(JSON.stringify($scope.oilWaters.all))


        $scope.chartConfig.series = [
            {
                name: '수분함량',
                data: $scope.oilWaters.all
            }
        ];

        // $scope.chartConfig.xAxis.categories = $scope.oilWaters.humidity;
        var name =             $rootScope.app.lotNo + ' Seed moisture isotherm('
            + $scope.data.dryTemperature
            + '°C) '
            + ($scope.data.seedName ? $scope.data.seedName : '')
            + '-'
            + utilService.formatDate(new Date)

        $scope.chartConfig.title.text = name;
        $scope.chartConfig.exporting.filename = name;

    }


});
