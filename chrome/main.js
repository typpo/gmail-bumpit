$(function() {
  var HashChanged = function() {
    var hash = location.hash;
    var match = hash.match(/^#inbox\/(.+)$/g);
    if (match) {
      console.log('threaded view');
      // threaded view

      var $morebtn = $('.Ykrj7b:last').parent();
      if ($morebtn.length < 1) {
        console.log('failed?');
        setTimeout(HashChanged, 300);
        return;
      }

      if (typeof GLOBALS !== 'undefined') {
        var gmail_ik = GLOBALS[9];
        console.log('ik', gmail_ik);
      }
      console.log(document.getElementById(':oz'));

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

          var $mask = $('<div>').css({
            'position': 'fixed',
            'left': 0,
            'top': 0,
            'width': '100%',
            'height': '100%',
            'z-index': 9998,
            'background-color': '#000',
            'opacity': .7
          }).appendTo('body').on('click', function() {
            $mask.remove();
            $dialog.remove();
          });
        });
    }
  }

  $(window).on('hashchange', HashChanged);
  setTimeout(HashChanged, 450);   // initial detection
});
