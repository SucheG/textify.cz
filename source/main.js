(function () {
  function selectorToArray(selector, parent) {
    parent = parent || document;
    return Array.prototype.slice.call(parent.querySelectorAll(selector), 0);
  }

  function setClass(els, cls, value) {
    // value: undefined - toggle, true - add, false - remove
    els = Array.isArray(els) ? els : [els];
    els.forEach(function (el) {
      if (value === undefined) {
        el.classList.toggle(cls);
      } else {
        value ? el.classList.add(cls) : el.classList.remove(cls);
      }
    });
  }

  var tags = selectorToArray('.tags.is-hover');
  tags.forEach(function (el) {
    var child = selectorToArray('.tag', el)[0];
    el.addEventListener('click', function (ev) {
      tags.forEach(function (el2) {
        if (el !== el2) {
          var child2 = selectorToArray('.tag', el2)[0];
          setClass(el2, 'selected', 0);
          setClass(child2, 'is-link', 0);
        }
      });
      setClass(el, 'selected');
      setClass(child, 'is-link');
    });
  });


  var textAreas = selectorToArray('textarea');
  var start = selectorToArray('.start')[0];

  console.log(3);

  var RxList = {
    'obsahujici-cisla': /\S*\d+\S*/g,
    'telefon': /\+?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{3,6}/g,
    'email': /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/ig,
    'url-adresy': /(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?/ig,
    // 'slova-zacinajici-na': 1,
    // 'slova-koncici-na': 1,
    // 'slova-obsahujici': 1,
  };

  start.addEventListener('click', function (ev) {
    applyrx(get(), getrx());
  });

  function getrx() {
    // returns rx to apply
    var selected = selectorToArray('.tags.selected')[0];
    return RxList[selected.id];
  }

  function applyrx(text, rx) {
    if (text && rx) {
      var values = text.match(rx);
      if (Array.isArray(values)) {
        set(values.join('\n'));
      }
    } else {
      alert('Zadejte vstupní text')
    }
  }

  function get() {
    // get string from input
    return textAreas[0].value;
  }

  function set(value) {
    // set result
    textAreas[1].value = value;
  }
})();