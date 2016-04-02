angular.module('starter.services', [])

.service('SettingsSvc', function($http) {

  this.postCycleData = function(userCycleLengthArray) {
    return $http({
      method: 'POST',
      url: 'http://localhost:3000/data/',
      data: userCycleLengthArray
    }).success(function(response) {
      return response.data;
    })
  }

  this.getDayData = function() {
    return $http({
      method: 'GET',
      url: 'http://localhost:3000/daydata/'
    }).then(function(response, $scope) {
      return response.data;
    })
  }

})

.service('CalendarSvc', function($http) {

  this.getCycleData = function() {
    return $http({
      method: 'GET',
      url: 'http://localhost:3000/data/'
    }).then(function(response) {
      return response.data;
    })
  }

  this.postMoodData = function(moodData) {
    return $http({
      method: 'POST',
      url: 'http://localhost:3000/mooddata/',
      data: moodData
    }).success(function(response) {
      return response.data;
    })
  }
})

.service('DashSvc', function($http) {
  this.getMoodData = function() {
    return $http({
      method: 'GET',
      url: 'http://localhost:3000/mooddata/'
    }).then(function(response) {
      return response.data;
    })
  }
})
