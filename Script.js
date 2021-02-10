function enableSearch() {
  var userNotFilled = $.trim($('.input')[0].value) === '';
  var appNotSelected = $('.select option:selected[value=" "]').length > 0;
  $("#Search").attr("disabled", userNotFilled && appNotSelected )
}
$(document).ready(function() {
  $('.input').on('input', enableSearch);
  $('.select').on('change', enableSearch)
  enableSearch();
});

/*
//The function call JSON.file and retrieve the applications
$(document).ready(function () {
  //Assign the request object to variable
  var myRequest=new XMLHttpRequest();
  myRequest.onreadystatechange=function (){
    //console.log(this.responseText);
    if(this.readyState===4 && this.status===200){
      var object =JSON.parse(this.responseText);
      //console.log(object.Application.length);
      for(var i =0; i<object.Application.length;i++){
        $("#Application").append($('<option></option>').attr('value', object.Application[i].code).text(object.Application[i].name));
      }
    }
  };
  myRequest.open("GET","searchUserName.json",true);
  myRequest.send();
});
*/

//Make function to do the request

/*
function on_submit() {
 //Assign the request object to variable
 // var myRequest=new XMLHttpRequest();

 myRequest.onreadystatechange=function (){

   Ready state => The status of the request
   [0] Request not initialized
   [1] Server connection establish
   [2] Request Received
   [3] Processing Request
   [4] Request is finished and response is ready
   Status =>> Response status code
   [200] OK

   if(this.readyState===4 && this.status===200){
    // console.log(this.responseText);
     //Convert Response text to JS object
     var myObj=JSON.parse(this.responseText);
     console.log(myObj.userName);
     for(let i =0; i<myObj.userName.length; i++){
       // console.log(myObj.username);
      // myText += myObj[i].id+"<br>";

       // console.log(myText);
     }}};
 myRequest.open("GET","searchUserName.json",true);
 myRequest.send();


}
*/

$(document).ready(function () {
  $("#Search").click(function (data) {
    var validate = Validate();
    //$("#message").html(validate);
    var userFilled = $.trim($('.input')[0].value);
    if (validate.length === 0) {
      $.ajax({
        type: "GET",
        dataType: "json",
        url: "searchUserName.json",
        success: function (data) {
          //console.log(userFilled);
          for(var i =0; i<data.userName.length;i++){
            //console.log(data.userName[i].username);
            if(userFilled===data.userName[i].username){
              //console.log(data.userName[i].username);


            }

          }




        }
      });
    }
  });
  function Validate() {
    var errorMessage = "";
    if ($.trim($('.input')[0].value)==='') {
      errorMessage += "► put user name ";
    }
    return errorMessage;
  }
  });



$(document).ready(function() {
  $.ajax({
    type:"GET",
    url: "searchUserName.json",
    success: function(data)
    {
      console.log(data.Application);
      for(var i =0; i<data.Application.length;i++){
        $("#Application").append($('<option></option>').attr('value', data.Application[i].code).text(data.Application[i].name));
      }

    }
  });
})
