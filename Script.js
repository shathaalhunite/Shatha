$(document).ready(function () {
  $("#Search").click(function (data) {
    var appSelected = $('.select option:selected[value=" "]').length > 0;
    var applicationCode = $("#Application option:selected").val();
    var userId = $.trim($('.input')[0].value);
    // console.log(applicationCode);
    // console.log(userFilled);
    //  console.log(data);
    function fetchMe(url) {
      return $.ajax({
        url: url,
        type: "GET",
        dataType: "json"
      });
    }
    function getOpertorauth() {
      fetchMe("getOperators.json").done(function (data){
        //check if the  user already exist in LDAP
        for (var i = 0; i < data.data.authorities.length; i++) {
          let app = '';
          app += '<tr >'+ '<td>' + data.data.authorities[i] + '</td>' + '<td>' + '  ' + '</td>' + '<td>' + ' true ' + '</td>' + '</tr>';
          $('#result').append(app);
          $('#result').show();
        }
      });
    }
    function getApplicationauth() {
      fetchMe("getApplicationauthorities.json").done(function (data) {
        //check if the application has authority in database and already exist
        if (applicationCode === data.data.application.code) {
          for (var iii = 0; iii < data.data.authority.length; iii++) {
            var app = '';
            app += '<tr>' + '<td>' + data.data.authority[iii].roleName + '</td>' + '<td>' + ' true ' + '</td>' + '<td>' + ' ' + '</td>' + '</tr>';

            $('#result').append(app);
            $('#result').show();
          }

        } else {
          //show error if the application not found in database
          $("div#errMsg").css("color", "red");
          $("div#errMsg").html("The application doesn't have authority or not found in data base ");
        }

      });

    }
    function getAll(){
      $.when(fetchMe('getApplicationauthorities.json') ,fetchMe('getOperators.json') ).done(function( Application , Opertor ) {
           //console.log(Application);
          //console.log(Opertor);
        let application_Auth = [];
        if (applicationCode === Application[0].data.application.code) {
          //Get the data to put it in first array
          for (var Auth = 0; Auth < Application[0].data.authority.length; Auth++) {
            var key = Auth;
            var val = Application[0].data.authority[Auth].roleName;
            application_Auth.push(val);
          }
        }
        let operator_Auth;
        for (var i = 0; i < Opertor[0].data.operator.userName.length; i++) {
          if (userId === Opertor[0].data.operator.userName) {
            operator_Auth = [];
            //Get the data to put it in second array
            for (var Opera_Auth = 0; Opera_Auth < Opertor[0].data.authorities.length; Opera_Auth++) {
              var key = Opera_Auth;
              var val = Opertor[0].data.authorities[Opera_Auth];
              operator_Auth.push(val);
            }
            //Merge the two array in one and not repeat the same ejb role
            var unionAuth = union(application_Auth, operator_Auth);

          }
        }
        for (var operators = 0; operators < unionAuth.length; operators++) {
          var app = '';
          app += '<tr>' + '<td>' + unionAuth[operators] + '</td>' + '<td>' + '  ' + '</td>' + '<td>' + ' ' + '</td>' + '</tr>';
          $('#result').append(app);
          $('#result').show();
        }
        //Get the last table to update the second column 'Application Role ' to be true or the third column to 'User Role ' to be true or both of them be true
        var table = $("table tbody");
        table.find('tr').each(function (i) {
          var $tds = $(this).find('td'),
              ejpRole = $tds.eq(0).text();
          //userRole = $tds.eq(1).text(),
          //appRole = $tds.eq(2).text();

          for (var filter = 0; filter < application_Auth.length; filter++) {
            if (ejpRole === application_Auth[filter]) {
              $tds.eq(1).replaceWith('<td>' + 'true' + '</td>');
            }
          }
          for (var opertFilter = 0; opertFilter < operator_Auth.length; opertFilter++) {
            if (ejpRole === operator_Auth[opertFilter]) {
              $tds.eq(2).replaceWith('<td>' + 'true' + '</td>');
            }
          }

        });
      });
    }

    //When enter just the user name will get the authority for user and all authority for all applications
    if ((userId !== '') && (appSelected === true)) {
      //check if the table has data or not
      if ($('#result td').text().trim() === "") {
        getOpertorauth();
      }
    } else {
      //When choices just from drop down list will show just the authority for application
      if ((userId === '') && (appSelected === false)) {
        if ($('#result td').text().trim() === "") {
          getApplicationauth();
        }
      } else {
        //When  enter user name && application name will show all authority for user and application
        if ((userId !== '') && (appSelected === false)) {
          if ($('#result td').text().trim() === "") {
           getAll();
          }
        }
      }
    }
  });
});
//this function to union two array in one array without repeat
      function union(arra1, arra2) {

        if ((arra1 == null) || (arra2 == null))
          return void 0;

        const obj = {};

        for (var i = arra1.length - 1; i >= 0; --i)
          obj[arra1[i]] = arra1[i];

        for (var i = arra2.length - 1; i >= 0; --i)
          obj[arra2[i]] = arra2[i];

        const res = [];

        for (const n in obj) {

          if (obj.hasOwnProperty(n))
            res.push(obj[n]);
        }

        return res;
      }
