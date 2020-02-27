// form setter and reset
$(function () {
  var newUser;

//  REGISTER
  (function () {
    var $dialog = $('#registerPopup');
    var $form = $('form', $dialog);
    var $palaceErrors = $('.place-errors', $form);

    $form.data('formValidator', $form.validate());
    
    $('button.register', $form).on('click', function () {
      if ($form.valid()) {
        $dialog.addClass('loading');

        var data = $form.serializeObject();
        $.ajax({
          type: 'POST',
          url: window.location.origin + '/api/Users/Register',
          contentType: "application/json",
          dataType: 'json',
          data: JSON.stringify(data),
          success: function (response) {
            $dialog.removeClass('loading');
            newUser = response;
            $('#loginPopupCode').modal('show');
          },
          error: function (e) {
            $dialog.removeClass('loading');
            var json = e.responseJSON;
            if (json && json.message) {
              $palaceErrors.text(json.message).removeClass('hide');
            } else {
              $palaceErrors.text(e.statusText).removeClass('hide');
            }
          }
        });
      }
    });

    $(document).on('show.bs.modal', '#registerPopup', function () {
      $('#loginPopup').modal('hide');
      $('#loginPopupCode').modal('hide');
      $dialog.removeClass('loading');
      formReset($form);
    });

  })();

  // ACTIVE CODE
  (function () {
    var user;
    var $dialog = $('#loginPopupCode');
    var $form = $('form', $dialog);
    var $palaceErrors = $('.place-errors', $form);

    $form.data('formValidator', $form.validate());

    $('button.login', $form).on('click', function () {
      if ($form.valid()) {
        $dialog.addClass('loading');

        var data = $form.serializeObject();
        $.ajax({
          type: 'POST',
          url: window.location.origin + '/api/Users/Login',
          contentType: "application/json",
          dataType: 'json',
          data: JSON.stringify(data),
          success: function () {
            $dialog.removeClass('loading');
            location.reload();
          },
          error: function (e) {
            $dialog.removeClass('loading');
            var json = e.responseJSON;
            if (json && json.message) {
              $palaceErrors.text(json.message).removeClass('hide');
            } else {
              $palaceErrors.text(e.statusText).removeClass('hide');
            }
          }
        });
      }
    });

    $(document).on('show.bs.modal', '#loginPopupCode', function () {
      $('#registerPopup').modal('hide');

      $dialog.removeClass('loading');
      formReset($form);
      if (newUser) {
        user = $.extend({}, newUser);
        formSetData($form, user);
        if (user.firstName) {
          $palaceErrors
            .text('A message that contains an access code has sent to your email. The code is valid for 24 hours.')
            .removeClass('hide');
        } else if (user.message) {
          $palaceErrors
            .text(user.message)
            .removeClass('hide');
        }

        newUser = null;
      }
    });

  })();

  // LOGIN
  (function () {
    var $dialog = $('#loginPopup');
    var $form = $('form', $dialog);
    var $palaceErrors = $('.place-errors', $form);

    $form.data('formValidator', $form.validate());

    $('button.login', $form).on('click', function () {
      if ($form.valid()) {
        $dialog.addClass('loading');

        var data = $form.serializeObject();
        $.ajax({
          type: 'POST',
          url: window.location.origin + '/api/Users/GeneratePassword',
          contentType: "application/json",
          // dataType: 'json',
          data: JSON.stringify(data),
          success: function () {
            $dialog.removeClass('loading');
            newUser = data;
            $('#loginPopupCode').modal('show');
          },
          error: function (e) {
            $dialog.removeClass('loading');
            var json = e.responseJSON;
            if (json && json.message) {
              if (json.message == 'AlreadyGenerated') {
                newUser = $.extend({}, data, {message: json.message});
                $('#loginPopupCode').modal('show');
              } else {
                $palaceErrors.text(json.message).removeClass('hide');
              }
            } else {
              $palaceErrors.text(e.statusText).removeClass('hide');
            }
          }
        });
      }
    });

    $(document).on('show.bs.modal', '#loginPopup', function () {
      $('#registerPopup').modal('hide');

      $dialog.removeClass('loading');
      formReset($form);
    });

  })();

  $('body').delegate('[logout]', 'click', function () {
    $.ajax({
      type: 'POST',
      url: window.location.origin + '/api/Users/Logout',
      success: function () {
        location.reload();
      },
      error: function (e) {
        var json = e.responseJSON;
        if (json && json.message) {
          alert(json.message);
        } else {
          alert(e.statusText);
        }
      }
    });
    return false;
  })

});



