var body = $('body');

/*var saveInputLogin;
var saveInputPassword;*/
// var saveInputCheckboxBal;
// var saveInputCheckboxReport;

body.on('click', '#btn__AddEmployee', function() {
	var inputLogin = $.trim($('#input__Login').val());
	var inputPassword = $.trim($('#input__Password').val());
	// var chbBal = $('#chb__Bal').val();
	// var chbReport = $('#chb__Report').val();
	// сохраняем значение checkbox
  const stateChbBal = $('#chb__Bal').prop('checked');
  const stateChbReport = $('#chb__Report').prop('checked');
	// проверяем заполнение полей login и password
	if ( inputLogin.length > 0 && inputPassword.length > 0 ) {

		$( '#table__Employee tbody').append(`
			<tr>
				<td>
					<input class="input__name form-control d-inline input-width bg-transparent border-none" type="text" data-saved="yes" value="`+ inputLogin +`" disabled>
				</td>
				<td>
					<input class="input__password form-control d-inline input-width bg-transparent border-none" type="password" value="`+ inputPassword +`" disabled>
				</td>
				<td>
					<input class="input__chbBal" type="checkbox" ${stateChbBal ? 'checked="checked"' : ''} disabled>
				</td>
				<td>
					<input class="input__chbReport" ${stateChbReport ? 'checked="checked"' : ''} type="checkbox" disabled>
				</td>
				<td>
					<div class="btn__panelEdit btn-group">
						<button class="btn__editName mr-2"><i class="fas fa-edit"></i></button>
						<button class="btn__deleteRow" data-toggle="modal" data-target="#deleteRowModal"><i class="fas fa-trash"></i></button>

					</div>
					<div class="btn__panelChange btn-group d-none">
						<button class="btn__saveChanges mr-2"><i class="fas fa-save"></i></button>
						<button class="btn__cancelEdit"><i class="fas fa-window-close"></i></button>
					</div>
				</td>
			</tr>
		` );

	// не заполнены login и passwrod
	} else if (inputLogin.length < 1 && inputPassword.length < 1) {
		alert(`Please, fill "Login" and "Password"`);
		$('#input__Login').focus();

	} else {
		// не заполнен login
		if (inputLogin.length > 0) {
		
			$('#input__Password').focus();
			alert(`Please, fill "Password"`);
		
		// не заполнен password
		} else if (inputPassword.length > 0) {
		
			$('#input__Login').focus();
			alert(`Please, fill "Login"`);
		} else {
			alert('Error');
		}
	}

})


// КНОПКИ save, edit, cancel...
	var inputNameValueSave;
	var inputPasswordValueSave;
	var inputCheckboxBalSave;
	var inputCheckboxReportSave;

	var currentRow;

body.on('click', '.btn__editName', function(e) {
	e.stopPropagation();
  
  var item = $(this).parent().parent().parent();
	var inputName = item.find('.input__name');
	var inputPassword = item.find('.input__password');
	var inputCbhBal = item.find('.input__chbBal');
	var inputChbReport = item.find('.input__chbReport');
		
  var btnPanelEdit = item.find('.btn__panelEdit');
  var btnPanelChange = item.find('.btn__panelChange');


  inputNameValueSave = inputName.val();
  inputPasswordValueSave = inputPassword.val();

  inputCheckboxBalSave = inputCbhBal.prop('checked');
  inputCheckboxReportSave = inputChbReport.prop('checked');

  inputName.prop('disabled', false);
  inputPassword.prop('disabled', false);
  inputCbhBal.prop('disabled', false);
  inputChbReport.prop('disabled', false);
  
	inputName.focus();

	inputName.removeClass('bg-transparent');
	inputPassword.removeClass('bg-transparent');
	inputName.removeClass('border-none');
	inputPassword.removeClass('border-none');
	
	
	btnPanelEdit.addClass('d-none');
	btnPanelChange.removeClass('d-none');

})

body.on('click', '.btn__saveChanges', function(e) {
	e.stopPropagation(); 

  var item = $(this).parent().parent().parent();
	var inputName = item.find('.input__name');
	var inputPassword = item.find('.input__password');
	var inputCbhBal = item.find('.input__chbBal');
	var inputChbReport = item.find('.input__chbReport');
		
  var btnPanelEdit = item.find('.btn__panelEdit');
  var btnPanelChange = item.find('.btn__panelChange');


  inputName.attr('data-saved', 'yes');
  // inputCheckbox.attr('disabled', true);

	btnPanelEdit.removeClass('d-none');
	btnPanelChange.addClass('d-none');

	inputName.addClass('bg-transparent');
	inputName.addClass('border-0');
	inputPassword.addClass('bg-transparent');
	inputPassword.addClass('border-0');	

	var inputNameValue = inputName.val();
	var inputPasswordValue = inputPassword.val();
	var inputCbhBalValue = inputCbhBal.prop('checked');
	var inputChbReportValue = inputChbReport.prop('checked');

	inputName.val(inputNameValue);
	inputPassword.val(inputPasswordValue);
	inputCbhBal.prop('checked', inputCbhBalValue);
	inputChbReport.prop('checked', inputChbReportValue);
/*	inputCbhBal.val(inputCbhBalValue);
	inputChbReport.val(inputChbReportValue);*/

  inputName.prop('disabled', true);
  inputPassword.prop('disabled', true);
  inputCbhBal.prop('disabled', true);
  inputChbReport.prop('disabled', true);
})

body.on('click', '.btn__cancelEdit', function(e) {
	e.stopPropagation();

  var item = $(this).parent().parent().parent();
	var inputName = item.find('.input__name');
	var inputPassword = item.find('.input__password');
	var inputCbhBal = item.find('.input__chbBal');
	var inputChbReport = item.find('.input__chbReport');
		
  var btnPanelEdit = item.find('.btn__panelEdit');
  var btnPanelChange = item.find('.btn__panelChange');

  if (inputName.attr('data-saved') === 'no') {
		item.closest('tr').remove();
  }

  inputName.val(inputNameValueSave);
  inputPassword.val(inputPasswordValueSave);
	inputCbhBal.prop('checked', inputCheckboxBalSave);
	inputChbReport.prop('checked', inputCheckboxReportSave);



	btnPanelEdit.removeClass('d-none');
	btnPanelChange.addClass('d-none');

	inputName.addClass('bg-transparent');
	inputName.addClass('border-0');
	inputPassword.addClass('bg-transparent');
	inputPassword.addClass('border-0');	
  
  inputName.prop('disabled', true);
  inputPassword.prop('disabled', true);
  inputCbhBal.prop('disabled', true);
  inputChbReport.prop('disabled', true);

})

body.on('click', '.btn__deleteRow', function() {
	// e.stopPropagation();

	var item = $(this);
  currentRow = item.closest('tr');

/*  if (inputName.attr('data-saved') === 'no') {
		item.closest('tr').remove();
  }*/

	// $('#tableDiscountPlanForStore tbody tr').remove();
})

body.on('click', '#btnModalYesDelete', function(e) {
	e.stopPropagation();

	currentRow.remove();


	// $('#tableDiscountPlanForStore tbody tr').remove();
})

/*body.on('click', '#btnModalCancelDelete', function(e) {
	e.stopPropagation();


})*/

