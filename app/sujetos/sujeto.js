'use strict';
angular.module('myApp.Sujeto', ['ngRoute','directives', 'services'])

  .config(['$routeProvider', function($routeProvider){
    $routeProvider.when('/app/sujetos/', 
      {
        templateUrl: 'app/sujetos/sujeto.html',
        controller: 'SujetoCtrl'
      }
    );
  }])
  .controller('SujetoCtrl', function($scope, subjectData){
    $scope.isSelected = false;
    $scope.selectedSubject = null;

    $scope.addNew = function(){
      $scope.isSelected = true;
    }
    $scope.editSubject = function(subject){
      $scope.subject = [];
      $scope.subject.id = subject.id;
      $scope.subject.lastname = subject.lastname;
      $scope.subject.firstname = subject.firstname;
      $scope.subject.dni = subject.dni;
      document.getElementById("datepicker").value = $scope.changeDate(subject.birthdate);
      $scope.isSelected = true;
    }
    $scope.changeDate = function(date){
      var aux;
      if (date.indexOf("/") === -1){
        aux = date.split("-");
        return aux[1] + "/" + aux[2] +"/" +aux[0];
      }
      else{
        aux = date.split("/");
        return aux[2]+ "-" + aux[0] + "-" + aux[1];
      }

    }
    $scope.deleteSubject = function(subject){
      var myDataPromise;
      var r = confirm("¿Está seguro que desea eliminar a " + subject.lastname + " " + subject.firstname + "?");
      if (r){
        myDataPromise = subjectData.deleteSubject(subject);
        myDataPromise.then(function(result){
          $scope.listSubjects();
        });
      }
    }
    $scope.goBack = function(){
      $scope.isSelected = false;
      $scope.subject.id = "";
      $scope.subject.lastname = "";
      $scope.subject.firstname = "";
      $scope.subject.dni = "";
      $scope.subject.birthdate = "";
      document.getElementById("datepicker").value = "";
    }
    $scope.saveChanges = function(){
      var aux = document.getElementById('datepicker').value;
      $scope.subject.birthdate = $scope.changeDate(aux);
      
      var myDataPromise;
      if ($scope.subject.id){
        myDataPromise = subjectData.editSubject($scope.subject);
      }
      else{
        myDataPromise = subjectData.addSubject($scope.subject);  
      }

      myDataPromise.then(function(result) {
        $scope.listSubjects();
        $scope.goBack();
      });
      $scope.subject = null;
    }
    $scope.listSubjects = function(){
      var myDataPromise = subjectData.getList().then(function(result) {  // PROMISE
         $scope.subjectList = result.data;
         console.log($scope.subjectList);
      });
    }
    $scope.listSubjects();
    
    
  });