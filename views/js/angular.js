// JavaScript Document
var app = angular.module("myApp", []);
app.controller("myCtrl", function($scope){
	$scope.Json = JSON.parse(localStorage.getItem("Json"));
	// adding votes
	$scope.addVote = function (index){
		console.log(index);
		$scope.vote = parseInt($scope.Json[index].vote);
		console.log($scope.vote);
		$scope.vote++;
		$scope.Json[index].vote = $scope.vote
		localStorage.setItem("Json", JSON.stringify($scope.Json));
				
	}
	$scope.Json.sort(function(a,b){return b.vote -a.vote});

});
app.controller("myCtrl2", function($scope){
	$scope.Json = JSON.parse(localStorage.getItem("Json"));
	// adding votes
	$scope.addVote = function (index){
		console.log(index);
		$scope.vote = parseInt($scope.Json[index].vote);
		console.log($scope.vote);
		$scope.vote++;
		$scope.Json[index].vote = $scope.vote
		localStorage.setItem("Json", JSON.stringify($scope.Json));
				
	}
	$scope.Json.sort(function(a,b){return b.date -a.date});

});