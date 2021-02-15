$(document).ready(function () {
  $("#Search").click(function (data) {

    var appNotSelected = $('.select option:selected[value=" "]').length > 0;
    var optionText =     $("#Application option:selected").text();
    var userFilled =     $.trim($('.input')[0].value);
    //console.log(appNotSelected);
    //console.log(userFilled);
    //When enter just the user name will get the authority for user and all authority for all applications
    if((userFilled !== '')&& (appNotSelected===true)){
      if ($('#result td').text().trim() === ""){
        //console.log(userFilled);
        $.ajax({
          type: "GET",
          dataType: "json",
          url: "getOperators.json",
          success: function (data) {
            // console.log(userFilled);
            //  console.log(data);
            let operatorAuth;
            for (var i = 0; i < data.data.operator.userName.length; i++) {
              if (userFilled === data.data.operator.userName) {
                operatorAuth = [];
                for (var r = 0; r < data.data.authorities.length; r++) {
                  var key = r;
                  var val = data.data.authorities[r];

                  operatorAuth.push(data.data.authorities[r]);
                //  console.log(operatorAuth);

                }

              }
            }
            //console.log(operatorAuth);

            $.ajax({
              type: "GET",
              dataType: "json",
              url: "getApplicationauthorities.json",
              success: function (data) {
                let applicationAuth = [];

                for (var r = 0; r < data.data.authority.length; r++) {
                  var key = r;

                  var val = data.data.authority[r].roleName;


                  applicationAuth.push(val);
                  // applicationAuth.push(role);

                }
                //console.log(applicationAuth);
                var all = union(operatorAuth, applicationAuth);

                // console.log(all);
                for (var operator = 0; operator < all.length; operator++) {
                  var app = '';
                  app += '<tr >';
                  app += '<td>' + all[operator] + '</td>';
                  app += '<td>' + '  ' + '</td>';
                  app += '<td>' + '  ' + '</td>';
                  app += '</tr>';
                  $('#result').append(app);
                  $('#result').show();
                }
                var table = $("table tbody");
                table.find('tr').each(function (i) {
                  var $tds = $(this).find('td'),
                      ejpRole = $tds.eq(0).text(),
                      userRole = $tds.eq(1).text(),
                      appRole = $tds.eq(2).text();

                  for (var filter = 0; filter < applicationAuth.length; filter++) {
                    if (ejpRole === applicationAuth[filter]) {
                      $tds.eq(1).replaceWith('<td>' + 'true' + '</td>');
                      //console.log(ejpRole);
                    }
                  }
                 for(var opertFilter=0;opertFilter<operatorAuth.length;opertFilter++){
                   if(ejpRole===operatorAuth[opertFilter]){
                     $tds.eq(2).replaceWith('<td>' + 'true' + '</td>');
                   }
                 }

                });

              }
            });

          }
        });

      }


    }else {
      //When choices just from drop down list will show just the authority for application
      if((userFilled === '')&&(appNotSelected===false)){
        if ($('#result td').text().trim() === ""){
          $.ajax({
            type: "GET",
            dataType: "json",
            url: "getApplicationauthorities.json",
            success :function (data){
              //console.log(optionText);
              if(optionText===data.data.application.name){
               // console.log(data.data.application);
                for(var iii=0;iii<data.data.authority.length;iii++){
                  var app='';
                  app+='<tr>';
                  app+='<td>'+ data.data.authority[iii].roleName+'</td>';
                  app+='<td>' + ' true ' + '</td>';
                  app+='<td>' + ' ' + '</td>';
                  app+='</tr>';
                  $('#result').append(app);
                  $('#result').show();
                }

              }else{
                alert("The application authority not found");
              }
            }
          });
        }


      } else{
        //When  enter user name && application name will show all authority for user and application
        if((userFilled !== '')&&(appNotSelected===false)){
          if ($('#result td').text().trim() === ""){
            $.ajax({
              type: "GET",
              dataType: "json",
              url: "getApplicationauthorities.json",
              success :function (data){
                let application_Auth = [];
                  for (var Auth = 0; Auth < data.data.authority.length; Auth++) {
                    var key = Auth;
                    var val = data.data.authority[Auth].roleName;

                    application_Auth.push(val);

                  }

                $.ajax({
                  type: "GET",
                  dataType: "json",
                  url: "getOperators.json",
                  success: function (data) {
                    // console.log(userFilled);
                    //  console.log(data);
                    let operator_Auth;
                    for (var i = 0; i < data.data.operator.userName.length; i++) {
                      if (userFilled === data.data.operator.userName) {
                        operator_Auth = [];
                        for (var Opera_Auth = 0; Opera_Auth < data.data.authorities.length; Opera_Auth++) {
                          var key = Opera_Auth;
                          var val = data.data.authorities[Opera_Auth];

                          operator_Auth.push(val);

                        }
                        var Auth =union(application_Auth,operator_Auth);
                        // console.log(all);

                      }
                    }
                    for (var operators = 0; operators < Auth.length; operators++) {
                      //console.log(data.data.authority[index].roleName);
                      //console.log(operatorAuth);

                      var app = '';
                      app += '<tr>';
                      app += '<td>' + Auth[operators] + '</td>';
                      app += '<td>' + '  ' + '</td>';
                      app += '<td>' + ' ' + '</td>';
                      app += '</tr>';
                      $('#result').append(app);
                      $('#result').show();


                    }
                    var table = $("table tbody");
                    table.find('tr').each(function (i) {
                      var $tds = $(this).find('td'),
                          ejpRole = $tds.eq(0).text(),
                          userRole = $tds.eq(1).text(),
                          appRole = $tds.eq(2).text();

                      for (var filter = 0; filter < application_Auth.length; filter++) {
                        if (ejpRole === application_Auth[filter]) {
                          $tds.eq(1).replaceWith('<td>' + 'true' + '</td>');
                          //console.log(ejpRole);
                        }
                      }
                      for(var opertFilter=0;opertFilter<operator_Auth.length;opertFilter++){
                        if(ejpRole===operator_Auth[opertFilter]){
                          $tds.eq(2).replaceWith('<td>' + 'true' + '</td>');
                        }
                      }

                    });
                  }
                });
              }
            });

          }}}

    }

  });
  });

function union(arra1, arra2) {

  if ((arra1 == null) || (arra2==null))
    return void 0;

  const obj = {};

  for (var i = arra1.length-1; i >= 0; -- i)
    obj[arra1[i]] = arra1[i];

  for (var i = arra2.length-1; i >= 0; -- i)
    obj[arra2[i]] = arra2[i];

  const res = [];

  for (const n in obj)
  {

    if (obj.hasOwnProperty(n))
      res.push(obj[n]);
  }

  return res;
}

