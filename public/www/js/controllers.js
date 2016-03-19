angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.factory('calendarFactory', function() {

})
.controller('SettingsCtrl', function($scope, SettingsSvc) {

  // $scope.postData = function(data) {
  //   SettingsSvc.postCycleData(data)
  //   .then function(response) {
  //     console.log('did this work?');
  //   }
  // }

  $scope.cycleLength = '';
  $scope.cycleLengthArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
                            13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23,
                            24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34];
  $scope.userCycleLengthArray = [];

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
      data: 'do something here to grab data from backend'
    }
    return dayObj;
  }

  $scope.changedCycleLength = function(val) {
      $scope.userCycleLengthArray = [];
      $scope.cycleLength = val;
      for (var i = 1; i <= val; i++) {
        $scope.userCycleLengthArray.push($scope.createDay(i)); //$scope.userCycleLengthArray.push(createDay(i))
      }

      console.log($scope.userCycleLengthArray);
  }


})

.controller('CalendarCtrl', function($scope) {
    $scope.cycleLength = 'askjhjahe'
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
