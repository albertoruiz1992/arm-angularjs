var app = angular.module("first-try",['ngSanitize']);
var count = 0;

app.directive("albHeader", function() {
    return{
        template : "<h1>This is header created by a custom angular directive</h1>"
    };
});

app.filter('myFilter', function(){
    return function(x){
        console.log(x);
        console.log(x.includes('a'));
        if(x.includes('a')){
            return x;
        }
        return false;
    }
});

app.controller("controller",function($scope, $http, $sce){
    $scope.names=['alberto','cris','jorge'];
    $scope.message1 = 'hola lola';
    $scope.ngmodelclasses = ["ng-empty","ng-not-empty","ng-touched","ng-untouched","ng-valid","ng-invalid","ng-dirty","ng-pending","ng-pristine"];
    $scope.message3 = "This is the message loaded for the very first time";
    $scope.namesCountries = [
        {name:'Jani',country:'Norway'},
        {name:'Carl',country:'Sweden'},
        {name:'Margareth',country:'England'},
        {name:'Hege',country:'Norway'},
        {name:'Joe',country:'Denmark'},
        {name:'Gustav',country:'Sweden'},
        {name:'Birgit',country:'Denmark'},
        {name:'Mary',country:'England'},
        {name:'Kai',country:'Norway'}
      ];
    $scope.orderReverse = false;
    $scope.orderValue = 'name';
    $scope.search = {name:'', country:''};
    $scope.cars = {
        car01 : {brand: "Ford", model: "Mustang", color: "yellow"},
        car02 : {brand: "Chevrolet", model: "Camaro", color: "black"},
        car03 : {brand: "Kia", model: "Ceed", color: "white"}
    };

    $scope.changeName = function(){
        $scope.message3 = "New message after clicking the button: " + count
        count ++;
    }

    $scope.resetCounter = function(){
        count = 0;
        $scope.message3 = "New message after clicking the button: " + count
    }

    $scope.orderTable = function(orderValue){
        if(orderValue == $scope.orderValue){
            $scope.orderReverse = !$scope.orderReverse;
        }else{
            $scope.orderReverse = false;
            $scope.orderValue = orderValue;
        }
    }

    $scope.addFilter = function(){
        if($scope.orderValue == 'name'){
            $scope.search.name = $scope.searchWord;
            $scope.search.country = '';
        }else{
            $scope.search.name = '';
            $scope.search.country = $scope.searchWord;
        }
    }

    $http.get("sample-page.html").then(function(response){
        $scope.loadedContent = $sce.trustAsHtml(response.data);
        console.log('Everything went correctly');
    }, function(){
        console.log('There\'s have been an error. The page couldnt be loaded.');
    });

    $http.get("customers.php").then(function(response){
        console.log(response);
        $scope.customers = response.data.records;
    }, function(){
        console.log('There\'s have been an error. Customers data couldnt be loaded.');
    });
    

});
