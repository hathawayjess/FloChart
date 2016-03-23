angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})


.controller('SettingsCtrl', function($scope, SettingsSvc) {



  $scope.cycleLength = '';
  $scope.currentDay = '';
  $scope.cycleLengthArray = [22, 23, 24, 25, 26, 27, 28, 29,
    30, 31, 32, 33, 34];
  $scope.currentDayArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
    11, 12, 13, 14, 15, 16, 17, 18,
    19, 20, 21, 22, 23, 24, 25, 26,
    27, 28, 29, 30, 31, 32, 33, 34 ];
  $scope.userCycleLengthArray = [];
  $scope.today = new Date();

  $scope.dayData = {
    1: 'test1',
    2: 'test2',
    3: 'test3',
    4: 'test4',
    5: 'test5',
    6: 'test6',
    7: 'test7',
    8: 'test8',
    9: 'test9',
    10: 'test10',
    11: 'test11',
    12: 'test12',
    13: 'test13',
    14: 'test14',
    15: 'test15',
    16: 'test16',
    17: 'test17',
    18: 'test18',
    19: 'test19',
    20: 'test20',
    21: 'test21',
    22: 'test22',
    23: 'test23',
    24: 'test24',
    25: 'test25',
    26: 'test26',
    27: 'test27',
    28: 'test28',
    29: 'test29',
    30: 'test30',
    31: 'test31',
    32: 'test32',
    33: 'test33',
    34: 'test34'
  }

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


// $scope.setFinalWeekData = function(i) {
//   $scope.finalWeeks = ($scope.cycleLength - 14);
//   $scope.p = [];
//
//   for (var t = $scope.cycleLength; t > $scope.finalWeeks; t--) {
//     $scope.p.push(t);
//   }
//
//
//
//       console.log($scope.p);
// }

  $scope.createDay = function(i) {
    var dayObj = {
      _id: i,
      index: i,
      phase: $scope.setPhase(i),
      data: $scope.dayData[i], //not finished
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
