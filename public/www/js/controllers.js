angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})


.controller('SettingsCtrl', function($scope, SettingsSvc) {



  $scope.cycleLength = '';
  $scope.cycleLengthArray = [22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34];
  $scope.userCycleLengthArray = [];

  $scope.testArray = function() {
    console.log($scope.userCycleLengthArray);
  }


  $scope.setPhase = function(i) {
    if (i < ($scope.cycleLength - 14)/2) {
      return 1;
    } else if (i === $scope.cycleLength - 14) {
      return 'ovDay';
    } else if (i < ($scope.cycleLength - 14)) {
      return 2;
    } else if (i < ($scope.cycleLength - 7)) {
      return 3;
    } else {
      return 4;
    }

  }

  $scope.createDay = function(i) {
    var dayObj = {
      index: i,
      phase: $scope.setPhase(i),
      data: 'do something here to grab daydata from backend'
    }
    return dayObj;
  }

  $scope.changedCycleLength = function(val) {
      $scope.userCycleLengthArray = [];
      $scope.cycleLength = val;
      for (var i = 1; i <= val; i++) {
        $scope.userCycleLengthArray.push($scope.createDay(i)); //$scope.userCycleLengthArray.push(createDay(i))
      }
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

.controller('CalendarCtrl', function($scope, CalendarSvc) {

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
