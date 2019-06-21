/*// <!-- table -->
$(document).ready( function () {
  $('#tableTransaction').DataTable();
} );

$('#tableTransaction').dataTable( {
  "lengthChange": false,
  "bInfo": false,
  "pagingType": 'input',
  dom: `<"row align-items-center"<"col"p>
  <"col pt-2"f><"col"B>>
  <"toolbar">
  rti`,

    buttons: {
      dom: {
        button: {
          className: ''
        }
      },
      buttons: [
      {
          extend: 'collection',
          className: 'btn btn-secondary rounded',
          text: 'Export',
          buttons: [ 'excel', 'pdf' ]
      }
  ]
    }

  
});

$("div.toolbar").html(`
	<div class="row">
		<div class="col-12 text-center mb-3">
			<h4 class="font-weight-bold">Distributor Transaction</h4>
		</div>
		<div class="col-4">
			<span class="font-weight-bold">Activity Date:</span><span>6/12/2019 To 6/19/2019</span>
		</div>
		<div class="col-4">
			<span class="font-weight-bold">Activity Type:</span><span>All</span>
		</div>
		<div class="col-12">
			<span class="font-weight-bold">Dist Code:</span><span>ezmaxi</span>
		</div>
	</div>			`);

$('<button class="btn btn-secondary rounded mr-3"><i class="fas fa-sync-alt"></i></button>').prependTo('div.dt-buttons');


		function filterGlobal () {
    $('#tableTransaction').DataTable().search(
        $('#global_filter').val(),
        // $('#global_regex').prop('checked'),
        // $('#global_smart').prop('checked')
    ).draw();
}

var table = $('#tableTransaction').DataTable();
 
// #myInput is a <input type="text"> element
$('#globalSearch').on( 'keyup', function () {
    table.search( this.value ).draw();
} );


// прячем стандартное поле search 
// $(".dataTables_filter").hide();


/*		function filterColumn ( i ) {
    $('#tableTransaction').DataTable().column( i ).search(
        $('#col'+i+'_filter').val(),
        // $('#col'+i+'_regex').prop('checked'),
        // $('#col'+i+'_smart').prop('checked')
    ).draw();
}*/
 
/*		$(document).ready(function() {
    $('#tableTransaction').DataTable();
 
    // $('input.global_filter').on( 'keyup click', function () {
    //     filterGlobal();
    // } );
 
    $('input.column_filter').on( 'keyup click', function () {
        filterColumn( $(this).parents('div').attr('data-column') );
    } );
} );*/

var body = $('body');
var picker1 = $('#datepickerFrom').datepicker();
var picker2 = $('#datepickerTo').datepicker();

body.on('click', '#btnDatePickerFrom', function() {
	picker1.datepicker('show');

})
body.on('click', '#btnDatePickerTo', function() {
	picker2.datepicker('show');

})

*/