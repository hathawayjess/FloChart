angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})


.controller('SettingsCtrl', function($scope, SettingsSvc) {



  $scope.cycleLength = 28;
  $scope.currentDay = 1;
  $scope.cycleLengthArray = [22, 23, 24, 25, 26, 27, 28, 29,
                             30, 31, 32, 33, 34, 35, 36, 37,
                             38, 39];
  $scope.currentDayArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
                            11, 12, 13, 14, 15, 16, 17, 18,
                            19, 20, 21, 22, 23, 24, 25, 26,
                            27, 28, 29, 30, 31, 32, 33, 34,
                            35, 36, 37, 38, 39];
  $scope.userCycleLengthArray = [];


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
  console.log($scope.currentDay)
}
$scope.setCycleLength = function(val) {
  $scope.cycleLength = val;
  console.log($scope.cycleLength);
}

$scope.setCurrentDayTrue = function(i) {

    if (i === $scope.currentDay) {
    return true;
  } else {
    return false;
  }

}

  $scope.createDay = function(i) {
    var dayObj = {
      index: i,
      phase: $scope.setPhase(i),
      data: 'do something here to grab daydata from backend',
      current: $scope.setCurrentDayTrue(i)
    }
    return dayObj;
  }

  $scope.changedCycleLength = function(val) {

    $scope.userCycleLengthArray = [];
    for (var i = 1; i <= val; i++) {
      $scope.userCycleLengthArray.push($scope.createDay(i)); //$scope.userCycleLengthArray.push(createDay(i))
    }
    console.log($scope.userCycleLengthArray)
    return $scope.userCycleLengthArray;

  }



  $scope.postData = function(userCycleLengthArray) {
    console.log(userCycleLengthArray);
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
    $scope.openModal = function() {
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
    $scope.getData = function() {
      CalendarSvc.getCycleData()
        .then(function(response) {
          $scope.cycleData = response;
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
