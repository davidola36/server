// JavaScript Document
var app = angular.module("myApp", ['ngFileUpload', 'toastr']);

app.controller("myCtrl1", function ($scope, $http, Upload, toastr) {

	var EndPoint = 'http://'+window.location.host;
	console.log(EndPoint)
	
	$scope.submit = function () {

		Upload.upload({
			url: 'api/submitdetails',
			method: 'post',
			data: $scope.form
		}).then(function (resp) {
			if (resp.data.success == true) {
				toastr.success('file uploaded, redirecting to the homepage ...', 'Success!');
				setTimeout(function () { window.location.href = Endpoint + '/photosplash'; }, 3000);

			}
			else {
				toastr.error('submission failed', 'Error!');
			}

		});

	}

	$scope.getUser = (function () {

		$http.get(EndPoint + '/api/alluser')
			.then(function (resp) {
				console.log(resp.data)
				$scope.users = resp.data;
			})

	})()



});


