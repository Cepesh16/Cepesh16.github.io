$(document).ready(function () {
  $('.tag-input').tagsinput({
    confirmKeys: [13, 44, 32]
  });

  $('.phone-input').each(function () {
    $(this).tagsinput('input').on('input', function () {
      $(this).val($(this).val().replace(/[^0-9+]/, ''));
    });
  });

  $.fn.editable.defaults.mode = 'inline';
  $('#company-name').editable({
    type: 'text',
    toggle: 'manual',
    url: 'success.json'
  });

  $('#make-editable').on('change', function () {
    if ($(this).is(":checked")) {
      $('.text-edit').editable({
        type: 'text',
        url: 'success.json'
      });
    } else {
      $('.text-edit').editable('destroy');
    }
  });

  $('.change-company-name').click(function (e) {
    e.stopPropagation();
    $('#company-name').editable('toggle');
    $('.change-company-name').hide();
  });

  $('.change-password').click(function (e) {
    e.preventDefault();
    $('.password-form').show();
    $('.password-row').hide();
  });

  $('#company-name').on('hidden', function () {
    $('.change-company-name').show();
  });

  $('.add-form').each(function () {
    new AddForm($(this));
  });

  $('.password-form').each(function () {
    new PasswordForm($(this));
  });

  $('[data-tooltip="tooltip"]').tooltip({
    container: 'body'
  });

  $("#docModal").on("show.bs.modal", function (e) {
    var link = $(e.relatedTarget);
    $(this).find(".modal-body").load(link.attr("href"));
  });

  $('body').on('click', '.edit-item', function () {
    new EditForm($(this));
  });

  $('.country-select').on('change', function () {
    var country_id = $(this).val();
    var regions_select = $('#' + $(this).attr('data-regions'));
  });

  $('body').on('click', '.del-item', function () {
    $that = $(this);
    confirm("Delete item", "Are you sure?", "Cancel", "Delete", function () {
      var loader_html = '<div class="loader"></div>';
      var item_element = $that.parents($that.attr('data-parent'));
      var url = $that.attr('data-url');
      var loader;
      $.ajax({
        url: url,
        type: 'get',
        cache: false,
        beforeSend: function () {
          loader = $(loader_html).insertBefore(item_element);
        },
        success: function (obj) {
          if (obj.error) {
            loader.remove();
            setMessagae('error', obj.message, item_element);
          } else {
            loader.remove();
            setMessagae('success', obj.message, item_element, 2000);
            item_element.remove()
          }
        },
        error: function (jqXHR, textStatus, errorThrown) {
          var message = jqXHR.responseText;
          loader.remove();
          setMessagae('error', message, item_element, 2000);
        }
      })
    })
  });

  init_city('add_city', 'add_city');

  $('.agreement-form input').on("change", function () {
    var checked = true;
    $('.agreement-form input[type=checkbox]').each(function () {
      if (!$(this).is(':checked')) {
        checked = false;
      }
    });
    if (checked) {
      $('.agreement-form button').prop("disabled", false);
    } else {
      $('.agreement-form button').prop("disabled", true);
    }

  });

});

function setEvents($element) {
  $element.find('[data-tooltip="tooltip"]').tooltip({
    container: 'body'
  });
  $element.find('.tag-input').tagsinput({
    confirmKeys: [13, 44, 32]
  });
  $element.find('.country-select').on('change', function () {
    var country_id = $(this).val();
    var regions_select = $('#' + $(this).attr('data-regions'));
  });

  $element.find('.phone-input').each(function () {
    $(this).tagsinput('input').on('input', function () {
      $(this).val($(this).val().replace(/[^0-9+]/, ''));
    });
  });

  if ($('#edit_city').length) {
    setTimeout(function () {
      init_city('edit_city', 'edit_country');
    }, 300)
  }
}

(function ($) {
  $.fn['overwrite'] = function (target) {
    $(target).replaceWith(this);
    return this;
  }
}(jQuery));


function PasswordForm(form) {
  this.form = form;
  this.form_action = form.attr('action');
  this.form_method = form.attr('method');
  this.loader = '<div class="loader"></div>';
  this.init();
}

PasswordForm.prototype.submit = function () {
  var caller = this;
  var loader;
  $.ajax({
    url: caller.form_action,
    type: caller.form_method,
    data: caller.form.serialize(),
    cache: false,
    beforeSend: function () {
      loader = $(caller.loader).insertBefore(caller.form);
    },
    success: function (obj) {
      if (obj.error) {
        loader.remove();
        setMessagae('error', obj.message, caller.form, 2000);
        $('.tooltip').remove();
        caller.events();
      } else {
        loader.remove();
        setMessagae('success', obj.message, caller.form, 2000);
        caller.form.hide();
        $('.password-row').show();
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      var message = jqXHR.responseText;
      loader.remove();
      setMessagae('error', message, caller.form, 2000);
    }
  })
};

PasswordForm.prototype.events = function () {
  var caller = this;
  caller.form.find('.btn-default').on('click', function () {
    caller.form.trigger('reset');
    caller.form.hide();
    $('.password-row').show();
  });
  caller.form.validate({ // initialize plugin
    ignore: [],
    errorElement: "span",
    rules: {
      password: "required",
      rpassword: {required: true, equalTo: "#password"}
    },
    highlight: function (element) {
      $(element).parents('.field-holder').removeClass('has-success').addClass('has-error');
    },
    unhighlight: function (element) {
      $(element).parents('.field-holder').removeClass('has-error').addClass('has-success');

    },
    submitHandler: function (form) {
      caller.submit();
    }
  });

};

PasswordForm.prototype.init = function () {
  this.events();
};

function AddForm(form) {
  this.form = form;
  this.form_action = form.attr('action');
  this.form_method = form.attr('method');
  this.loader = '<div class="loader"></div>';
  this.init();
}

AddForm.prototype.submit = function () {
  var caller = this;
  var loader;
  $.ajax({
    url: caller.form_action,
    type: caller.form_method,
    data: caller.form.serialize(),
    cache: false,
    beforeSend: function () {
      loader = $(caller.loader).insertBefore(caller.form);
    },
    success: function (obj) {
      if (obj.error) {
        loader.remove();
        setMessagae('error', obj.message, caller.form, 2000);
        $('.tooltip').remove();
        caller.form = $(obj.html).overwrite(caller.form);
        setEvents(caller.form);
        caller.events();
      } else {
        loader.remove();
        setMessagae('success', obj.message, caller.form, 2000);
        var element = $(obj.html).insertAfter(caller.form);
        setEvents(element);
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      var message = jqXHR.responseText;
      loader.remove();
      setMessagae('error', message, caller.form, 2000);
    }
  })
};

AddForm.prototype.events = function () {
  var caller = this;
  caller.form.validate({ // initialize plugin
    ignore: [],
    errorElement: "span",
    rules: {
      first_name: "required",
      last_name: "required",
      login: "required",
      company_name: "required",
      address: "required",
      country: "required",
      state: "required",
      city: "required",
      zip: "required",
      phone: "required",
      email: {required: true},
      username: "required"
    },
    highlight: function (element) {
      $(element).parents('.field-holder').removeClass('has-success').addClass('has-error');
    },
    unhighlight: function (element) {
      $(element).parents('.field-holder').removeClass('has-error').addClass('has-success');

    },
    submitHandler: function (form) {
      caller.submit();
    }
  });

};

AddForm.prototype.init = function () {
  this.events();
};


function setMessagae(type, msg_text, before_element, delete_after) {
  var message;
  switch (type) {
    case 'success':
      message = '<div class="alert alert-dismissible alert-success"> <button type="button" class="close" data-dismiss="alert">×</button>' + msg_text + '</div>';
      break;
    case 'error':
      message = '<div class="alert alert-dismissible alert-danger"> <button type="button" class="close" data-dismiss="alert">×</button>' + msg_text + '</div>';
      break;
    default :
      message = '<div class="alert alert-dismissible alert-success"> <button type="button" class="close" data-dismiss="alert">×</button>' + msg_text + '</div>';
      break;
  }

  message = $(message).insertBefore(before_element);
  if (delete_after) {
    setTimeout(function () {
      message.fadeOut(300, function () {
        $(this).remove();
      });
    }, delete_after)
  }
}

function confirm(heading, question, cancelButtonTxt, okButtonTxt, callback) {

  var confirmModal =
    $('<div class="modal fade">' +
      '<div class="modal-dialog">' +
      '<div class="modal-content">' +
      '<div class="modal-header">' +
      '<a class="close" data-dismiss="modal" >&times;</a>' +
      '<h4 class="modal-title" >' + heading + '</h4>' +
      '</div>' +

      '<div class="modal-body">' +
      '<p>' + question + '</p>' +
      '</div>' +

      '<div class="modal-footer">' +
      '<span class="btn" data-dismiss="modal">' +
      cancelButtonTxt +
      '</span>' +
      '<span id="okButton" class="btn btn-primary">' +
      okButtonTxt +
      '</span>' +
      '</div>' +
      '</div>' +
      '</div>' +
      '</div>');

  confirmModal.find('#okButton').click(function (event) {
    callback();
    confirmModal.modal('hide');
  });

  confirmModal.modal('show');
}


function EditForm(element) {
  this.element = element;
  this.form = '';
  this.form_url = element.attr('data-form-url');
  this.edited_item = element.parents(element.attr('data-item-class'));
  this.loader = '<div class="loader"></div>';
  this.loadForm();
}

EditForm.prototype.submit = function () {
  var caller = this;
  var loader;
  $.ajax({
    url: caller.form.attr('action'),
    type: caller.form.attr('method'),
    data: caller.form.serialize(),
    cache: false,
    beforeSend: function () {
      loader = $(caller.loader).insertBefore(caller.form);
    },
    success: function (obj) {
      if (obj.error) {
        loader.remove();
        setMessagae('error', obj.message, caller.form, 2000);
        $('.tooltip').remove();
        caller.form = $(obj.html).overwrite(caller.form);
        setEvents(caller.form);
        caller.defaultEvents();
      } else {
        loader.remove();
        setMessagae('success', obj.message, caller.form, 2000);
        var element = $(obj.html).overwrite(caller.edited_item);
        setEvents(element);
        caller.form.remove();
        $('.tooltip').remove();
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      var message = jqXHR.responseText;
      loader.remove();
      setMessagae('error', message, caller.form, 2000);
    }
  })
};

EditForm.prototype.loadForm = function () {
  var caller = this,
    loader;
  $.ajax({
    url: caller.form_url,
    type: 'GET',
    cache: false,
    beforeSend: function () {
      loader = $(caller.loader).prependTo(caller.edited_item);
    },
    success: function (obj) {
      caller.form = $(obj.html);
      caller.form = caller.form.insertBefore(caller.edited_item);
      caller.edited_item.hide();
      setEvents(caller.form);
      loader.remove();
      caller.defaultEvents();
    },
    complete: function () {
      caller.element.removeClass('clicked');
    },
    error: function (jqXHR, textStatus, errorThrown) {
      var message = jqXHR.responseText;
      setMessagae('error', message, loader, 2000);
      loader.remove();
    }
  });
};

EditForm.prototype.removeForm = function () {
  this.edited_item.show();
  this.form.remove();
  $('.tooltip').remove();
};

EditForm.prototype.defaultEvents = function () {
  var caller = this;
  caller.form.find('.close-form').on('click', function () {
    caller.removeForm();
  });
  caller.form.validate({ // initialize plugin
    ignore: [],
    errorElement: "span",
    rules: {
      first_name: "required",
      last_name: "required",
      login: "required",
      company_name: "required",
      address: "required",
      country: "required",
      state: "required",
      city: "required",
      zip: "required",
      phone: "required",
      email: {required: true},
      username: "required"
    },
    highlight: function (element) {
      $(element).parents('.field-holder').removeClass('has-success').addClass('has-error');
    },
    unhighlight: function (element) {
      $(element).parents('.field-holder').removeClass('has-error').addClass('has-success');

    },
    submitHandler: function (form) {
      caller.submit();
    }
  });
};

function init_city(input_id, country_id) {
  var input = document.getElementById(input_id);
  var options = {
    types: ['(cities)'],
    componentRestrictions: {country: 'US'}
  };

  var autocomplete = new google.maps.places.Autocomplete(input, options);

  document.getElementById(country_id).addEventListener(
    'change', setAutocompleteCountry);

  function setAutocompleteCountry() {
    var country = document.getElementById(country_id).value;
    autocomplete.setComponentRestrictions({'country': country});
  }

  google.maps.event.addDomListener(input, 'keydown', function (e) {
    if (e.keyCode == 13) {
      e.preventDefault();
    }
  });
  google.maps.event.addListener(autocomplete, 'place_changed', function () {
    $(input).trigger('change');
    var place = autocomplete.getPlace();
    $('body').append(JSON.stringify(place));
  });
}