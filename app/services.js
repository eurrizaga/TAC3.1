(function(){
  var app = angular.module('services', []);
  //Servicios
  
  //app.value('user', getUser());
  
  app.factory('subjectData', ['$http', function($http){
    var data = [];
    return{
      addSubject: function(subject){
        var request = $http({
          method: "post",
          url: "app/sujetos/db.php",
          data: {
              op: 'a',
              lastname: subject.lastname,
              firstname: subject.firstname,
              dni: subject.dni,
              birthdate: subject.birthdate
          },
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        })
        .then(function (data) {
            return data;
        });
        return request;
      },
      editSubject: function(subject){
        var request = $http({
            method: "post",
            url: "app/sujetos/db.php",
            data: {
              op: 'm',
              id: subject.id,
              lastname: subject.lastname,
              firstname: subject.firstname,
              dni: subject.dni,
              birthdate: subject.birthdate  
            },
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
          }
          )
          .then(function (data) {
              return data;
          });
          return request;
      },
      deleteSubject: function(subject){
        var request = $http({
            method: "post",
            url: "app/sujetos/db.php",
            data: {
              op: 'b',
              id: subject.id
            },
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
          })
          .then(function (data) {
              return data;
          });
        return request;
      },
      getList: function(){
        var request = $http.get('app/sujetos/db.php');
        request.then(function(data) {
              return (data.data);
          });
        return request;
      }
    }
  }]);

})();