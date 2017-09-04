// JavaScript Document
var app = angular.module("myApp", ['ngFileUpload']);
// app.controller("myCtrl", function ($scope) {


// });
app.controller("myCtrl1", function ($scope, $http,Upload) {

	var EndPoint = 'http://localhost:5000'


	$scope.submit = function () {
		console.log($scope.form)
		


		Upload.upload({
			url: 'api/submitdetails',
			method: 'post',
			data: $scope.form
		  }).then(function (resp) {
				console.log('hehe')
				console.log(resp)
				//$scope.form.push(resp.data);
				//$scope.form = {};
			})
	


		// $http.post(EndPoint + '/api/submitdetails', $scope.form).then(function (resp) {
		// 	console.log('hehe')
		// 	console.log(resp)
		// 	//$scope.form.push(resp.data);
		// 	//$scope.form = {};
		// })

		// var f = document.getElementById('image')
		// console.log(f.files[0])
		// var file = document.querySelector('input[type=file]').files[0];
		// console.log('hehe')
		// console.log(file)

		// var userdetails = {
		// 	fname: $scope.form.fname,
		// 	lname: $scope.form.lname,
		// 	email: $scope.form.email,
		// 	num: $scope.form.num

		// }

		// $http.post(EndPoint + '/api/submitdetails', userdetails).then(function (resp) {
		// 	console.log('hehe')
		// 	console.log(resp)
		// })

		
	}

	$scope.getUser = (function () {






		$http.get(EndPoint + '/api/alluser')
			.then(function (resp) {


				console.log(resp.data)
				$scope.users = resp.data;


			})

		// myService.showUser().then(function (resp) {
		// 	//console.log('heheh')
		// 	$scope.user = response.data;

	})()





});


