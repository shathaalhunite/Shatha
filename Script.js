function enableSearch() {
  var userNotFilled = $.trim($('.input')[0].value) === '';
  var appNotSelected = $('.select option:selected[value=" "]').length > 0;
  $("#Search").attr("disabled", userNotFilled && appNotSelected )
}
$(document).ready(function() {
  $('.input').on('input', enableSearch);
  $('.select').on('change', enableSearch)
  enableSearch();
})
//Make function to do the request
 function on_submit(){
  //Assign the request object to variable
  var myRequest=new XMLHttpRequest();
  myRequest.onreadystatechange=function (){
    /*
    Ready state => The status of the request
    [0] Request not initialized
    [1] Server connection establish
    [2] Request Received
    [3] Processing Request
    [4] Request is finished and response is ready
    Status =>> Response status code
    [200] OK
     */
    if(this.readyState===4 && this.status===200){
    //console.log(this.responseText);

      //Convert Response text to JS object
      var myObj=JSON.parse(this.responseText),
        myText="";
      //console.log(myObj);
      for (var i=0;i<myObj.length;i++){
        // console.log(myObject[i].username);
        myText += myObj[i].id+"<br>";
        // console.log(myText);
      }}};
myRequest.open("GET","searchUserName.json",true);
myRequest.send();
}
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


