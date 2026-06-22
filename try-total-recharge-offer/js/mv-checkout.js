(function () {
  var STORE = 'https://malevitalhq.com';

  document.addEventListener("DOMContentLoaded", function () {
    var btn = document.getElementById("checkout-link");
    if (!btn) return;

    btn.addEventListener("click", function (e) {
      e.preventDefault();

      var href = btn.getAttribute('href') || '';
      var qs = href.indexOf('?') !== -1 ? href.split('?')[1] : '';
      var p  = new URLSearchParams(qs);
      var variant = p.get('variant');
      var qty     = p.get('qty') || '1';
      var plan    = p.get('plan');

      if (!variant) return;

      var cached = localStorage.getItem('mv_country');
      if (cached) {
        goCart(variant, qty, plan, cached === 'US' ? 'USD' : 'GBP');
      } else {
        fetch('https://ipapi.co/json/')
          .then(function (r) { return r.json(); })
          .then(function (d) {
            localStorage.setItem('mv_country', d.country_code);
            goCart(variant, qty, plan, d.country_code === 'US' ? 'USD' : 'GBP');
          })
          .catch(function () { goCart(variant, qty, plan, 'GBP'); });
      }
    });
  });

  function goCart(variant, qty, plan, currency) {
    var form = document.createElement('form');
    form.method = 'POST';
    form.action = STORE + '/cart/add';
    form.style.display = 'none';

    function field(name, value) {
      var inp = document.createElement('input');
      inp.type = 'hidden'; inp.name = name; inp.value = value;
      form.appendChild(inp);
    }

    field('items[0][id]', variant);
    field('items[0][quantity]', qty);
    field('items[0][properties][__sbee_offer_id]', '6a21e24135e58c6f23614a43');
    if (plan) field('items[0][selling_plan]', plan);
    field('currency', currency);
    field('return_to', '/cart/checkout');

    document.body.appendChild(form);
    form.submit();
  }
})();
