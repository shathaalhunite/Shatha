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