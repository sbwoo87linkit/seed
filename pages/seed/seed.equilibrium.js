app.controller('seed.equilibrium', function ($scope, $rootScope, utilService) {

    // console.log('seed.equilibrium')

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
        // console.log('equilibrium', data.seedName, $scope.data)
        $scope.data.seedName = data.seedName;
        console.log($scope.data.seedName)

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
        // console.log($scope.oilWaters);

        renderOilChart();



    }

    function renderOilChart() {


        Highcharts.chart('container_oil', {

            chart: {
                height: 300,
                type: 'line'
            },
            credits : { enabled: false},
            title: {
                text: 'Seed moisture isotherm('
                + $scope.data.dryTemperature
                + '°C) '
                + ($scope.data.seedName ? $scope.data.seedName : '')
                + '-'
                + utilService.formatDate(new Date)
            },

            subtitle: {
                text: null
            },

            xAxis: {
                tickInterval: 10,
                type: 'linear',
                title: {
                    text: 'Equilibrium RH(%)'
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
                    text: 'Moisture content(%)'
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
                    tooltip =  '<span style="color:' + this.series.color + '">' + 'Equilibrium RH(%)' + '</span>: <b>' + this.x + '</b><br/>';
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
                filename: 'Seed moisture isotherm('
                + $scope.data.dryTemperature
                + '°C) '
                + $scope.data.name2
                + ' '
                + $scope.data.name3
                + '-'
                + utilService.formatDate(new Date)
            }

        });
    }

})
