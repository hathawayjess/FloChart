angular.module('starter.controllers', [])

.controller('GraphCtrl', function($scope, GraphSvc) {
  $scope.data = [];
  $scope.options = {
    thickness: 50
  };
  var colors = ["#BBBB88", "#EEDD99", "#B1C19F", "#EEAA88", "#BBBB88"];


  $scope.getMoodData = function() {
    GraphSvc.getMoodData()
      .then(function(response) {
        $scope.moodData = response;

        function alter(response) {
          return {
            complementBrightness: 90,
            label: response._id,
            value: 1,
            color: colors[response.mood]
          }
        }
        $scope.data = response.map(alter);
        console.log($scope.data);
      })
  }

  $scope.getMoodData();



})

.controller('DashCtrl', function($scope) {



})


.controller('SettingsCtrl', function($scope, SettingsSvc, $state) {

  $scope.getDayData = function() {
    SettingsSvc.getDayData()
      .then(function(response) {
        $scope.dayData = response;
        console.log($scope.dayData);
      })
  }

  $scope.getDayData();


  $scope.cycleLength = 28;
  $scope.currentDay = 1;
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


  $scope.postData = function(userCycleLengthArray) {

    SettingsSvc.postCycleData(userCycleLengthArray, $state)
      .success(function() {
        console.log('Success!');
        $state.go('tab.calendar');
      }).error(function() {
        console.log('Error!');
      })

  }



})


.controller('CalendarCtrl', function($scope, CalendarSvc, $ionicModal, $ionicLoading) {

  $ionicLoading.show({
    template: '<ion-spinner icon="circles"></ion-spinner>'
  })


  $scope.today = (new Date()).getDate();


  $scope.getData = function() {
    CalendarSvc.getCycleData()
      .then(function(response) {
        $ionicLoading.hide();
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

  $ionicModal.fromTemplateUrl('../templates/modal-template-day-info.html', {
    id: '1',
    scope: $scope,
    animation: 'scale-in'
  }).then(function(modal) {
    $scope.modal = modal;

  });

  $ionicModal.fromTemplateUrl('../templates/modal-template-phase-info.html', {
    id: '2',
    scope: $scope,
    animation: 'scale-in'
  }).then(function(modal) {
    $scope.modal2 = modal;
  })

  $scope.openModal = function(index, days) {
    if (index === 1) {
      $scope.isActive1 = false;
      $scope.isActive2 = false;
      $scope.isActive3 = false;
      $scope.isActive4 = false;
      $scope.modal.days = days;

      $scope.modal.show();
    } else {
      $scope.modal2.show();
    }
  };
  $scope.closeModal = function(index) {
    if (index === 1) {
      $scope.modal.hide();
    } else {
      $scope.modal2.hide();
    }
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

  $scope.moodNumber = null;

  $scope.setMoodNumber = function(number) {
    $scope.moodNumber = number;
  }

  $scope.postMood = function(day) {
    var moodData = {
      mood: $scope.moodNumber,
      _id: day,
      date: new Date()
    }
    CalendarSvc.postMoodData(moodData)
      .success(function() {
        console.log('Mood Data Success!');
      }).error(function() {
        console.log('Mood Data Error!');
      })
  }



})
