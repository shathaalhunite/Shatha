$(document).ready(function () {
  $("#Search").click(function (data) {
    var appSelected = $('.select option:selected[value=" "]').length > 0;
    var applicationCode = $("#Application option:selected").val();
    var userId = $.trim($('.input')[0].value);
    // console.log(applicationCode);
    // console.log(userFilled);
    // console.log(data);
    function callAjax(url) {
      return $.ajax({
        url: url,
        type: "GET",
        dataType: "json",
        success:function (data){
          return data;
        },
        error: function(xhr){
          var errorMessage = xhr.status + ': ' + xhr.statusText
          $("div#errMsg").css("color", "red");
          $("div#errMsg").html('Error - ' + errorMessage);
        }

      });
    }
    function getOpertorauth() {
      callAjax("getOperators.json").done(function (data){

        //check if the  user already exist in LDAP
        var app=Object.keys(data.data.authorities).map(key => { return  '<tr >'+ '<td>' + data.data.authorities[key] + '</td>' + '<td>' + '  ' + '</td>' + '<td class="has-role">' + '</td>' + '</tr>';
        });

        $('#result').empty();
        $('#result').append('<tr style="color: #2f9a8c">'+ '<th>Ejb role name</th>'+ '<th>Application Roles</th>' + '<th>User Roles</th>' + '</tr>' + app);
        $('#result').show();
      });
    }
    function getApplicationauth() {
      callAjax("getApplicationauthorities.json").done(function (data) {
        //check if the application has authority in database and already exist
        var app = '';
        if (applicationCode === data.data.application.code) {
          var app=Object.keys(data.data.authority).map(key =>{ return '<tr>' + '<td>' + data.data.authority[key].roleName + '</td>' + '<td class="has-role">' + '</td>' + '<td>' + ' ' + '</td>' + '</tr>'; });

          $('#result').empty();
          $('#result').append('<tr style="color: #2f9a8c">'+ '<th>Ejb role name</th>'+ '<th>Application Roles</th>' + '<th>User Roles</th>' + '</tr>' + app);
          $('#result').show();
        } else {
          //show error if the application not found in database
          $("div#errMsg").css("color", "red");
          $("div#errMsg").html("The application doesn't have authority or not found in data base ");
        }

      });

    }
    function getAll(){
      $.when(callAjax('getApplicationauthorities.json') ,callAjax('getOperators.json') ).done(function( application , opertor ) {
           //console.log(Application);
          //console.log(Opertor);
        let applicationAuth = [];
        if (applicationCode === application[0].data.application.code) {
          //Get the data to put it in first array
          for (var Auth = 0; Auth < application[0].data.authority.length; Auth++) {
            var key = Auth;
            var val = application[0].data.authority[Auth].roleName;
            applicationAuth.push(val);
          }
        }
        let operatorAuth;
        for (var i = 0; i < opertor[0].data.operator.userName.length; i++) {
          if (userId === opertor[0].data.operator.userName) {
            operatorAuth = [];
            //Get the data to put it in second array
            for (var operaAuth = 0; operaAuth < opertor[0].data.authorities.length; operaAuth++) {
              var key = operaAuth;
              var val = opertor[0].data.authorities[operaAuth];
              operatorAuth.push(val);
            }
            //Merge the two array in one and not repeat the same ejb role
            var unionAuth = union(applicationAuth, operatorAuth);

          }
        }
        var app = Object.keys(unionAuth)
            .map(k => {
              let isAppRole = !!unionAuth[k].isAppRole;
              let isOperatorRoles = !!unionAuth[k].isOperatorRoles;
              return '<tr><td>' + k + '</td>'+'<td class="' + (isAppRole ? "has-role" : "not-role") + '">' + '</td>' +'<td class="' + (isOperatorRoles ? "has-role" : "not-role") + '">' + '</td>'+'</tr>';
            });
        $('#result').empty();
        $('#result').append('<tr style="color: #2f9a8c">'+ '<th>Ejb role name</th>'+    '<th>Application Roles</th>'   + '<th>User Roles</th>' + '</tr>' + app);
        $('#result').show();
      });
    }

    //When enter just the user name will get the authority for user and all authority for all applications
    if ((userId !== '') && (appSelected === true)) {
      //check if the table has data or not
        getOpertorauth();
    } else {
      //When choices just from drop down list will show just the authority for application
      if ((userId === '') && (appSelected === false)) {
          getApplicationauth();
      } else {
        //When  enter user name && application name will show all authority for user and application
        if ((userId !== '') && (appSelected === false)) {
           getAll();
        }
      }
    }
  });
});
//this function to union two array in one array without repeat
function union(applications, operatorRoles) {

  if ((applications == null) || (operatorRoles==null)) {
    return {};
  }
  const obj = {};
  for (var i = applications.length-1; i >= 0; -- i) {
    const roleName = applications[i];
    obj[roleName] = {roleName: roleName, isAppRole: true}
  }

  for (var i = operatorRoles.length-1; i >= 0; -- i) {
    const roleName = operatorRoles[i];
    let currentObj = obj[roleName]
    if (currentObj) {
      currentObj.isOperatorRoles = true
    } else {
      obj[roleName] = {roleName: roleName, isOperatorRoles: true}
    }
  }
  return obj;
}
