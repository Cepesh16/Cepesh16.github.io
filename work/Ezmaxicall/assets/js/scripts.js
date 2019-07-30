$(document).ready(function () {

  $.fn.editable.defaults.mode = 'inline';
  $('#company-name').editable({
    type: 'text',
    toggle: 'manual',
    url: 'success.json'
  });


  $('.change-company-name').click(function (e) {
    e.stopPropagation();
    $('#company-name').editable('toggle');
    $('.change-company-name').hide();
  });


  $('#company-name').on('hidden', function () {
    $('.change-company-name').show();
  });
});
























