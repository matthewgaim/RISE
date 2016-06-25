var app = angular.module('app.controllers', ["firebase"]);

app.controller('cameraTabDefaultPageCtrl', function($scope,$cordovaCamera,$firebaseObject,$firebaseArray) {
  var ref = new Firebase("https://project-498244156619960010.firebaseio.com/");
  $scope.firebaseRef = $firebaseArray(ref);
  var likeStatus = false;
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
           alert("Error");
       });
   }
   $scope.post = function(){
     if($scope.price > 0 && $scope.clothing_name.length > 0 && $scope.imgURI.length > 0){
       var theTime = moment().format('MMMM Do YYYY, h:mm a');
       $scope.firebaseRef.$add({
         name:$scope.clothing_name,
         price:$scope.price,
         description:$scope.description,
         img:$scope.imgURI,
         likes:0,
         time:theTime
       });
       swal("Uploaded!", "You've succesfully uploaded your clothing!", "success");
     }else{
       swal("Incomplete!", "Take a picture and fill in all the forms.", "error");
    }
   }

   $scope.payment = function(price,name){
     swal('Uploaded!', "You've succesfully bought the " + name + " for $" + price, 'success');
   };

   $scope.like = function(item){
     if(!likeStatus){
       console.log(item);
       var id = item.$id;
       console.log(id);
       likes = item.likes + 1;
       ref.child(id).update({likes:likes});
       likeStatus = true;
     }
     else{
       console.log(item);
       var id = item.$id;
       console.log(id);
       likes = item.likes - 1;
       ref.child(id).update({likes:likes});
       likeStatus = false;
     }
   }

});

app.controller('cartTabDefaultPageCtrl', function($scope) {
});

app.controller('cloudTabDefaultPageCtrl', function($scope,$ionicPopover) {
  var ref = new Firebase("https://project-498244156619960010.firebaseio.com/");
  $scope.firebaseRef = $firebaseArray(ref);
  $ionicPopover.fromTemplateUrl('templates/popover.html', {
    scope: $scope,
  }).then(function(popover) {
    $scope.popover = popover;
  });

  $scope.createUser = function(){
    var email = $scope.email;
    var password = $scope.password;
    firebase.auth().createUserWithEmailAndPassword(email,password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      alert(errorCode);
      var errorMessage = error.message;
      alert(errorMessage);
      // ...
    });
  }
  $scope.signIn = function(){
    var email = $scope.email;
    var password = $scope.password;
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
      var errorCode = error.code;
      console.log(errorCode);
      var errorMessage = error.message;
      console.log(errorMessage);
      swal("Error", "Invalid Email / Password", "error");
      // ...
    });
  }
});
