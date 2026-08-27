// Mobile nav toggle
document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.nav-toggle');
  var tabs = document.querySelector('.tabs');
  if (toggle && tabs) {
    toggle.addEventListener('click', function () {
      tabs.classList.toggle('open');
    });
  }

  // Contact form -> FormSubmit.co (sends the message straight to the ministry's inbox)
  var form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = form.querySelector('button[type="submit"]');
      var success = document.getElementById('form-success');
      var originalText = btn.textContent;
      btn.textContent = 'Sending…';
      btn.disabled = true;

      fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      })
        .then(function (res) {
          if (res.ok) {
            form.reset();
            if (success) success.style.display = 'block';
            form.querySelectorAll('input,textarea').forEach(function (el) {
              el.style.display = '';
            });
          } else {
            alert('Something went wrong sending your message. Please try WhatsApp or email us directly.');
          }
        })
        .catch(function () {
          alert('Could not send right now — please try WhatsApp or email us directly.');
        })
        .finally(function () {
          btn.textContent = originalText;
          btn.disabled = false;
        });
    });
  }
});
