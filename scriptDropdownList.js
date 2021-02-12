
$(document).ready(function() {
    $.ajax({
        type:"GET",
        url: "select_List.json",
        success: function(data)
        {
            for(var i =0; i<data.length;i++){
                //console.log(data[i].name);
                $("#Application").append($('<option></option>').attr('value', data[i].code).text(data[i].name));
            }

        }
    });
})