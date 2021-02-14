$(document).ready(function () {
  $("#Search").click(function (data) {

    var appNotSelected = $('.select option:selected[value=" "]').length > 0;
    var optionText = $("#Application option:selected").text();
    var userFilled = $.trim($('.input')[0].value);
    //console.log(appNotSelected);
    //console.log(userFilled);
    //When enter just the user name will get the authority for user and all authority for all applications
    if((userFilled !== '')&& (appNotSelected===true)){
      if ($('#result td').text().trim() === ""){
        //console.log(userFilled);
        $.ajax({
          type: "GET",
          dataType: "json",
          url: "getApplicationauthorities.json",
          success :function (data){
            for (var index=0;index<data.data.authority.length;index++){
              var app='';
              app+='<tr>';
              app+='<td>'+ data.data.authority[index].roleName+'</td>';
              app+='<td>' + ' true ' + '</td>';
              app+='<td>' + ' ' + '</td>';
              app+='</tr>';
              $('#result').append(app);
              $('#result').show();
            }


          }

        });
        $.ajax({
          type: "GET",
          dataType: "json",
          url: "getOperators.json",
          success: function (data) {
            // console.log(userFilled);
            //  console.log(data);
            for(var i =0; i<data.data.operator.userName.length;i++){

              //console.log(data.data.operator.userName);
              if(userFilled===data.data.operator.userName){
                //console.log(data.data.authorities);

                var app='';
                app+='<tr>';
                app+='<td>'+data.data.authorities[i]+'</td>';
                app+='<td>' + ' ' + '</td>';
                app+='<td>' + ' true ' + '</td>';
                app+='</tr>';
                $('#result').append(app);
                $('#result').show();
              }
            }

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
              console.log(optionText);
              if(optionText===data.data.application.name){
                console.log(data.data.application);
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
                if(optionText===data.data.application.name){
                  for (var iiii=0;iiii<data.data.authority.length;iiii++){
                    var app='';
                    app+='<tr>';
                    app+='<td>'+ data.data.authority[iiii].roleName+'</td>';
                    app+='<td>' + ' true ' + '</td>';
                    app+='<td>' + ' ' + '</td>';
                    app+='</tr>';
                    $('#result').append(app);
                    $('#result').show();

                  }
                }

              }
            });
            $.ajax({
              type: "GET",
              dataType: "json",
              url: "getOperators.json",
              success: function (data) {
                // console.log(userFilled);
                //  console.log(data);
                for(var i =0; i<data.data.operator.userName.length;i++){
                  //console.log(data.data.operator.userName);
                  if(userFilled===data.data.operator.userName){
                    //console.log(data.data.authorities);
                    var app='';
                    app+='<tr>';
                    app+='<td>'+data.data.authorities[i]+'</td>';
                    app+='<td>' + ' ' + '</td>';
                    app+='<td>' + ' true ' + '</td>';
                    app+='</tr>';
                    $('#result').append(app);
                    $('#result').show();
                  }}}
            });
          }}}

    }

  });
  });


