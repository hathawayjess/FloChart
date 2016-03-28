angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {
  AmCharts.makeChart("chartdiv",
    {
      "type": "serial",
      "categoryField": "category",
      "plotAreaBorderColor": "#FFFFFF",
      "colors": [
        "#EEAA88",
        "#B1C19F",
        "#B0DE09",
        "#0D8ECF",
        "#2A0CD0",
        "#CD0D74",
        "#CC0000",
        "#00CC00",
        "#0000CC",
        "#DDDDDD",
        "#999999",
        "#333333",
        "#990000"
      ],
      "startDuration": 1,
      "color": "7B7B6C",
      "handDrawScatter": 0,
      "handDrawThickness": 0,
      "theme": "light",
      "categoryAxis": {
        "autoRotateCount": 0,
        "gridPosition": "start",
        "labelFrequency": 2,
        "titleFontSize": 0
      },
      "trendLines": [],
      "graphs": [
        {
          "balloonText": "[[title]] of [[category]]:[[value]]",
          "columnWidth": 0,
          "id": "AmGraph-1",
          "lineThickness": 2,
          "title": "Estrogen",
          "type": "smoothedLine",
          "valueField": "column-1"
        },
        {
          "balloonText": "[[title]] of [[category]]:[[value]]",
          "fixedColumnWidth": -1,
          "id": "AmGraph-2",
          "lineThickness": 2,
          "title": "Progesterone",
          "type": "smoothedLine",
          "valueField": "column-2"
        }
      ],
      "guides": [],
      "valueAxes": [
        {
          "axisTitleOffset": 20,
          "id": "ValueAxis-1",
          "axisAlpha": 0,
          "labelsEnabled": false,
          "minVerticalGap": 33,
          "tickLength": 11,
          "title": "Hormone Level"
        },
        {
          "id": "ValueAxis-2",
          "position": "bottom",
          "title": "Day of Cycle"
        }
      ],
      "allLabels": [],
      "balloon": {},
      "legend": {
        "enabled": true,
        "useGraphSettings": true
      },
      "titles": [
        {
          "id": "Title-1",
          "size": 15,
          "text": "Hormonal Cycle"
        }
      ],
      "dataProvider": [
        {
          "category": "1",
          "column-1": "100",
          "column-2": "50"
        },
        {
          "category": "2",
          "column-1": "110",
          "column-2": "50"
        },
        {
          "category": "3",
          "column-1": "120",
          "column-2": "50"
        },
        {
          "category": "4",
          "column-1": "150",
          "column-2": "50"
        },
        {
          "category": "5",
          "column-1": "300",
          "column-2": "50"
        },
        {
          "category": "6",
          "column-1": "200",
          "column-2": "50"
        },
        {
          "category": "7",
          "column-1": "300",
          "column-2": "50"
        },
        {
          "category": "8",
          "column-1": "400",
          "column-2": "50"
        },
        {
          "category": "9",
          "column-1": "500",
          "column-2": "50"
        },
        {
          "category": "10",
          "column-1": "600",
          "column-2": "50"
        },
        {
          "category": "11",
          "column-1": "700",
          "column-2": "50"
        },
        {
          "category": "12",
          "column-1": "800",
          "column-2": "50"
        },
        {
          "category": "13",
          "column-1": "1000",
          "column-2": "50"
        },
        {
          "category": "14",
          "column-1": "1200",
          "column-2": "50"
        },
        {
          "category": "15",
          "column-1": "1000",
          "column-2": "200"
        },
        {
          "category": "16",
          "column-1": "800",
          "column-2": "400"
        },
        {
          "category": "17",
          "column-1": "700",
          "column-2": "600"
        },
        {
          "category": "18",
          "column-1": "600",
          "column-2": "800"
        },
        {
          "category": "19",
          "column-1": "500",
          "column-2": "1000"
        },
        {
          "category": "20",
          "column-1": "600",
          "column-2": "1200"
        },
        {
          "category": "21",
          "column-1": "700",
          "column-2": "1000"
        },
        {
          "category": "22",
          "column-1": "600",
          "column-2": "800"
        },
        {
          "category": "23",
          "column-1": "500",
          "column-2": "600"
        },
        {
          "category": "24",
          "column-1": "400",
          "column-2": "400"
        },
        {
          "category": "25",
          "column-1": "300",
          "column-2": "200"
        },
        {
          "category": "26",
          "column-1": "200",
          "column-2": null
        },
        {
          "category": "27",
          "column-1": "100",
          "column-2": null
        },
        {
          "category": "28",
          "column-1": "100",
          "column-2": "100"
        }
      ]
    }
  );
})


.controller('SettingsCtrl', function($scope, SettingsSvc) {

  $scope.getDayData = function() {
    SettingsSvc.getDayData()
      .then(function(response) {
        $scope.dayData = response;
        console.log($scope.dayData)
      })
  }

  $scope.getDayData();


  $scope.cycleLength = '';
  $scope.currentDay = '';
  $scope.cycleLengthArray = [22, 23, 24, 25, 26, 27, 28, 29,
    30, 31, 32, 33, 34
  ];
  $scope.currentDayArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
    11, 12, 13, 14, 15, 16, 17, 18,
    19, 20, 21, 22, 23, 24, 25, 26,
    27, 28, 29, 30, 31, 32, 33, 34
  ];
  $scope.userCycleLengthArray = [];
  $scope.today = new Date();


  $scope.setPhase = function(i) {
    if (i < ($scope.cycleLength - 14) / 2) {
      return 1;
    } else if (i === ($scope.cycleLength - 14)) {
      return 'ovDay';
    } else if (i < ($scope.cycleLength - 14)) {
      return 2;
    } else if (i < ($scope.cycleLength - 7)) {
      return 3;
    } else {
      return 4;
    }

  }

  $scope.setCurrentDay = function(val) {
    $scope.currentDay = val;
  }
  $scope.setCycleLength = function(val) {
    $scope.cycleLength = val;
  }

  $scope.setCurrentDayTrue = function(i) {

    if (i === $scope.currentDay) {
      return true;
    } else {
      return false;
    }

  }



  $scope.setDayData = function(i) {
    $scope.cycleMinus = ($scope.cycleLength - 14);
    $scope.userFullArray = [];

    for (var i = 0; i < $scope.cycleLength; i++) {
      $scope.userFullArray.push(i);
    }

    $scope.userFullArray.splice($scope.cycleMinus, 14, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34);
    return $scope.userFullArray;
  }

  $scope.setDayData2 = function(i) {
    $scope.setDayData(i)
    return $scope.userFullArray[i]

  }


  $scope.createDay = function(i) {
    var dayObj = {
      _id: i,
      index: i,
      phase: $scope.setPhase(i),
      data: $scope.dayData[$scope.setDayData2(i)],
      current: $scope.setCurrentDayTrue(i),
      date: $scope.today.getDate()
    }
    return dayObj;

  }

  $scope.changedCycleLength = function(val) {

    $scope.userCycleLengthArray = [];
    for (var i = 1; i <= val; i++) {
      $scope.userCycleLengthArray.push($scope.createDay(i));
    }
    return $scope.userCycleLengthArray;

  }

  //http get once json is moved to the backend

  $scope.postData = function(userCycleLengthArray) {

    SettingsSvc.postCycleData(userCycleLengthArray)
      .success(function() {
        console.log('Success!');
      }).error(function() {
        console.log('Error!');
      })

  }

})


.controller('CalendarCtrl', function($scope, CalendarSvc, $ionicModal) {


  $ionicModal.fromTemplateUrl('../templates/modal-template.html', {
    scope: $scope,
    animation: 'scale-in'
  }).then(function(modal) {
    $scope.modal = modal;
  });
  $scope.openModal = function(data) {
    $scope.modal.days = data
    $scope.modal.show();
  };
  $scope.closeModal = function() {
    $scope.modal.hide();
  };
  //Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });
  // Execute action on hide modal
  $scope.$on('modal.hidden', function() {
    // Execute action
  });
  // Execute action on remove modal
  $scope.$on('modal.removed', function() {
    // Execute action
  });

  $scope.$on('$ionicView.enter', function() {

    $scope.today = (new Date()).getDate();


    $scope.getData = function() {
      CalendarSvc.getCycleData()
        .then(function(response) {
          $scope.cycleData = response;

          for (var i = 0; i < $scope.cycleData.length; i++) {
            $scope.current = $scope.cycleData[i].current;
            $scope.date = $scope.cycleData[i].date;

            if ($scope.current === true && $scope.date < $scope.today) {
              $scope.cycleData[i].current = false;
              i = i + ($scope.today - $scope.date);
              $scope.cycleData[i].current = true;
            }

          }

        })
    }


    $scope.getData();

  })



})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
