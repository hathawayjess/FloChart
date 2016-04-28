angular.module('flochart.services', [])

.service('SettingsSvc', function($http) {

  this.postCycleData = function(userCycleLengthArray) {
    return $http({
      method: 'POST',
      url: '/data/',
      data: userCycleLengthArray
    }).success(function(response) {
      return response.data;
    })
  }

  this.getDayData = function() {
    return $http({
      method: 'GET',
      url: '/daydata/'
    }).then(function(response, $scope) {
      return response.data;
    })
  }

})

.service('CalendarSvc', function($http) {

  this.getCycleData = function() {
    return $http({
      method: 'GET',
      url: '/data/'
    }).then(function(response) {
      return response.data;
    })
  }

  this.postMoodData = function(moodData) {
    return $http({
      method: 'POST',
      url: '/mooddata/',
      data: moodData
    }).success(function(response) {
      return response.data;
    })
  }
})

.service('GraphSvc', function($http) {
  this.getMoodData = function() {
    return $http({
      method: 'GET',
      url: '/mooddata/'
    }).then(function(response) {
      return response.data;
    })
  }
})

