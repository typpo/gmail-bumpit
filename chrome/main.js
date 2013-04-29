$(function() {
  var HashChanged = function() {
    var hash = location.hash;
    var match = hash.match(/^#inbox\/(.+)$/g);
    if (match) {
      // We're in a threaded view

      // Make sure the page has loaded
      var $morebtn = $('.Ykrj7b:last').parent();
      if ($morebtn.length < 1) {
        setTimeout(HashChanged, 300);
        return;
      }

      // Various helper functions

      var getMessageInfo = function(callback) {
        var gmail_globals = [];
        var $globals_include = $('#hist_state').next();
        if ($globals_include.prop('tagName') === 'SCRIPT') {
          (function() {
            // shame on me
            try{
              eval($globals_include.text());
            } catch(ex) {}
            gmail_globals = GLOBALS;
          })();
        }

        var gmail_ik = gmail_globals[9];
        var gmail_th = $('.ii:not(.undefined):last').attr('class').match(/m([^ ]+)/)[1];

        var details_url = document.location.host + document.location.pathname
              + '?ui=2&ik=' + gmail_ik + '&view=om&th=' + gmail_th;
        $.get(details_url, function(data) {
          var message_id = data.match(/Message-ID: <([^>]+)/)[1];
          var subject_matches = data.match(/Subject: (.+)/);
          var subject = '';
          if (subject_matches && subject_matches.length > 1) {
            subject = subject_matches[1];
          }
          console.log('message_id', message_id);
          console.log('subject', subject);
          callback(message_id, subject);
        });
      }

      // Build DOM
      $morebtn.parent()
        .append('<div id="bump_later" class="T-I J-J5-Ji ar7 nf T-I-ax7 L3"><span>Bump Later</span></div>')
        .on('click', function() {
          // Show dialog
          var $dialog = $('<div>').css({
            'position': 'fixed',
            'left': '50%',
            'top': '20%',
            'width': 400,
            'margin-left': -200,
            'height': 400,
            'z-index': 9999,
            'background-color': '#404040',
            'border': '1px #ccc solid',
            'color': '#eee',
            'padding': '15px'
          });
          $dialog.append('<p><strong>Return this email to your inbox...</strong></p>')
            .append('<form>')
              .append('<p><label><input type="radio" name="bump_when"> tomorrow</label>')
              .append('<p><label><input type="radio" name="bump_when"> in 2 days</label>')
              .append('<p><label><input type="radio" name="bump_when"> in 5 days</label>')
              .append('<p><label><input type="radio" name="bump_when" checked> in 1 week</label>')
              .append('<p><label><input type="radio" name="bump_when"> in 2 weeks</label>')
              .append('<p><label><input type="radio" name="bump_when"> in 1 month</label>')
              .append('<p><label><input type="radio" name="bump_when"> in <input type="text" style="width:2em"/> <select><option>days</option><option selected>weeks</option><option>months</option></select>')

          $button_container = $('<p>');
          $submit_button = $('<button>Submit</button>');
          $cancel_button = $('<button>Cancel</button>');
          $button_container.append($submit_button).append($cancel_button).appendTo($dialog);
          $dialog.appendTo('body');

          // Background mask
          var $mask = $('<div>').css({
            'position': 'fixed',
            'left': 0,
            'top': 0,
            'width': '100%',
            'height': '100%',
            'z-index': 9998,
            'background-color': '#000',
            'opacity': .7
          }).appendTo('body').on('click', cancelDialog);

          var cancelDialog = function() {
            $mask.remove();
            $dialog.remove();
          }

          // Bind cancel
          $cancel_button.on('click', cancelDialog);

          // Bind message submission
          $submit_button.on('click', function() {
            $submit_button.attr('disabled', '');
            getMessageInfo(function(m_id, subject) {
              $.post('http://localhost:6900/schedule', {
                'm_id': m_id,
                'subj': subject,
              }, function(data) {
                console.log(data);
              });

              cancelDialog();
            });
          });
        });  // end onclick
    }
  }

  $(window).on('hashchange', HashChanged);
  setTimeout(HashChanged, 450);   // initial detection
});
