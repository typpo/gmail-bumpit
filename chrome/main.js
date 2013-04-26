$(function() {
  var HashChanged = function() {
    var hash = location.hash;
    var match = hash.match(/^#inbox\/(.+)$/g);
    if (match) {
      // threaded view

      var $morebtn = $('.Ykrj7b:last').parent();
      if ($morebtn.length < 1) {
        console.log('page still loading. retrying...');
        setTimeout(HashChanged, 300);
        return;
      }

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
        console.log('message_id', message_id);
      });

      $morebtn.parent()
        .append('<div id="bump_later" class="T-I J-J5-Ji ar7 nf T-I-ax7 L3"><span>Bump Later</span></div>')
        .on('click', function() {
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
          $dialog.append('<p><strong>When do you want to bump this email?</strong></p>')
            .append('<form>')
              .append('<p><label><input type="radio" name="bump_when"> Tomorrow</label>')
              .append('<p><label><input type="radio" name="bump_when"> in 2 days</label>')
              .append('<p><label><input type="radio" name="bump_when"> in 5 days</label>')
              .append('<p><label><input type="radio" name="bump_when" checked> in 1 week</label>')
              .append('<p><label><input type="radio" name="bump_when"> in 2 weeks</label>')
              .append('<p><label><input type="radio" name="bump_when"> in 1 month</label>')
              .append('<p><label><input type="radio" name="bump_when"> in <input type="text" style="width:2em"/> <select><option>days</option><option selected>weeks</option><option>months</option></select>')
              .append('<p><button>Submit</button><button>Cancel</button>');

          $dialog.appendTo('body');

          var cancelDialog = function() {
            $mask.remove();
            $dialog.remove();
          }

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
        });
    }
  }

  $(window).on('hashchange', HashChanged);
  setTimeout(HashChanged, 450);   // initial detection
});
