$(document).ready(function ()  {
  $.getJSON('select_List.json', function (data) {
    $.each(data, function (key, value) {
      $("#Application").append($('<option></option>').attr('value', value.Application).text(value.name));
    });
  });
});
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

$(document).ready(function(){
  // $.ajaxSetup({ cache: false });
  $('#Search').keyup(function(){
    $('#result').html('');
    $('#Application').val('');
    var searchField = $('#Search').val();
    var expression = new RegExp(searchField, "i");
    $.getJSON('select_List.json', function(data) {
      $.each(data, function(key, value){
        if (value.name.search(expression) === searchField)
        {
          $('#result').append('<li> '+value.name+'</li>');
        }
      });
    });
  });

  $('#result').on('click', 'li', function() {
    var click_text = $(this).text().split('|');
    $('#search').val($.trim(click_text[0]));
    $("#result").html('');
  });
});
