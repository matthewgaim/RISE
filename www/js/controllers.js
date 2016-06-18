angular.module('app.controllers', ["firebase"])



.controller('cameraTabDefaultPageCtrl', function($scope,$cordovaCamera,$firebaseObject,$firebaseArray) {
  var ref = new Firebase("https://project-498244156619960010.firebaseio.com/");
  $scope.firebaseRef = $firebaseArray(ref);
  $scope.takePicture = function() {
       var options = {
           quality : 75,
           destinationType : Camera.DestinationType.DATA_URL,
           sourceType : Camera.PictureSourceType.CAMERA,
           allowEdit : true,
           encodingType: Camera.EncodingType.JPEG,
           targetWidth: 300,
           targetHeight: 300,
           popoverOptions: CameraPopoverOptions,
           saveToPhotoAlbum: false
       };

       $cordovaCamera.getPicture(options).then(function(imageData) {
           $scope.imgURI = "data:image/jpeg;base64," + imageData;
           image = $scope.imgURI;
           alert(image);
       }, function(err) {
           // An error occured. Show a message to the user
           alert("Error");
       });
   }
   $scope.post = function(){
     $scope.firebaseRef.$add({
       name:$scope.clothing_name,
       price:$scope.price,
       description:$scope.description,
       img:$scope.imgURI,
       likes:0,
     });
   }

})

.controller('cartTabDefaultPageCtrl', function($scope) {
})

.controller('cloudTabDefaultPageCtrl', function($scope) {

});
