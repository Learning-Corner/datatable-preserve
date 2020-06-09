/*!
 Buttons for DataTables 1.6.2
 ©2016-2020 SpryMedia Ltd - datatables.net/license
*/
(function (d) {
  'function' === typeof define && define.amd
    ? define(['jquery', 'datatables.net'], function (v) {
        return d(v, window, document);
      })
    : 'object' === typeof exports
    ? (module.exports = function (v, u) {
        v || (v = window);
        (u && u.fn.dataTable) || (u = require('datatables.net')(v, u).$);
        return d(u, v, v.document);
      })
    : d(jQuery, window, document);
})(function (d, v, u, n) {
  function y(a, b, c) {
    d.fn.animate
      ? a.stop().fadeIn(b, c)
      : (a.css('display', 'block'), c && c.call(a));
  }
  function z(a, b, c) {
    d.fn.animate
      ? a.stop().fadeOut(b, c)
      : (a.css('display', 'none'), c && c.call(a));
  }
  function B(a, b) {
    a = new m.Api(a);
    b = b ? b : a.init().buttons || m.defaults.buttons;
    return new r(a, b).container();
  }
  var m = d.fn.dataTable,
    E = 0,
    F = 0,
    q = m.ext.buttons,
    r = function (a, b) {
      if (!(this instanceof r))
        return function (b) {
          return new r(b, a).container();
        };
      'undefined' === typeof b && (b = {});
      !0 === b && (b = {});
      d.isArray(b) && (b = { buttons: b });
      this.c = d.extend(!0, {}, r.defaults, b);
      b.buttons && (this.c.buttons = b.buttons);
      this.s = {
        dt: new m.Api(a),
        buttons: [],
        listenKeys: '',
        namespace: 'dtb' + E++,
      };
      this.dom = {
        container: d('<' + this.c.dom.container.tag + '/>').addClass(
          this.c.dom.container.className
        ),
      };
      this._constructor();
    };
  d.extend(r.prototype, {
    action: function (a, b) {
      a = this._nodeToButton(a);
      if (b === n) return a.conf.action;
      a.conf.action = b;
      return this;
    },
    active: function (a, b) {
      var c = this._nodeToButton(a);
      a = this.c.dom.button.active;
      c = d(c.node);
      if (b === n) return c.hasClass(a);
      c.toggleClass(a, b === n ? !0 : b);
      return this;
    },
    add: function (a, b) {
      var c = this.s.buttons;
      if ('string' === typeof b) {
        b = b.split('-');
        var e = this.s;
        c = 0;
        for (var d = b.length - 1; c < d; c++) e = e.buttons[1 * b[c]];
        c = e.buttons;
        b = 1 * b[b.length - 1];
      }
      this._expandButton(c, a, e !== n, b);
      this._draw();
      return this;
    },
    container: function () {
      return this.dom.container;
    },
    disable: function (a) {
      a = this._nodeToButton(a);
      d(a.node).addClass(this.c.dom.button.disabled).attr('disabled', !0);
      return this;
    },
    destroy: function () {
      d('body').off('keyup.' + this.s.namespace);
      var a = this.s.buttons.slice(),
        b;
      var c = 0;
      for (b = a.length; c < b; c++) this.remove(a[c].node);
      this.dom.container.remove();
      a = this.s.dt.settings()[0];
      c = 0;
      for (b = a.length; c < b; c++)
        if (a.inst === this) {
          a.splice(c, 1);
          break;
        }
      return this;
    },
    enable: function (a, b) {
      if (!1 === b) return this.disable(a);
      a = this._nodeToButton(a);
      d(a.node).removeClass(this.c.dom.button.disabled).removeAttr('disabled');
      return this;
    },
    name: function () {
      return this.c.name;
    },
    node: function (a) {
      if (!a) return this.dom.container;
      a = this._nodeToButton(a);
      return d(a.node);
    },
    processing: function (a, b) {
      var c = this.s.dt,
        e = this._nodeToButton(a);
      if (b === n) return d(e.node).hasClass('processing');
      d(e.node).toggleClass('processing', b);
      d(c.table().node()).triggerHandler('buttons-processing.dt', [
        b,
        c.button(a),
        c,
        d(a),
        e.conf,
      ]);
      return this;
    },
    remove: function (a) {
      var b = this._nodeToButton(a),
        c = this._nodeToHost(a),
        e = this.s.dt;
      if (b.buttons.length)
        for (var g = b.buttons.length - 1; 0 <= g; g--)
          this.remove(b.buttons[g].node);
      b.conf.destroy && b.conf.destroy.call(e.button(a), e, d(a), b.conf);
      this._removeKey(b.conf);
      d(b.node).remove();
      a = d.inArray(b, c);
      c.splice(a, 1);
      return this;
    },
    text: function (a, b) {
      var c = this._nodeToButton(a);
      a = this.c.dom.collection.buttonLiner;
      a = c.inCollection && a && a.tag ? a.tag : this.c.dom.buttonLiner.tag;
      var e = this.s.dt,
        g = d(c.node),
        f = function (a) {
          return 'function' === typeof a ? a(e, g, c.conf) : a;
        };
      if (b === n) return f(c.conf.text);
      c.conf.text = b;
      a ? g.children(a).html(f(b)) : g.html(f(b));
      return this;
    },
    _constructor: function () {
      var a = this,
        b = this.s.dt,
        c = b.settings()[0],
        e = this.c.buttons;
      c._buttons || (c._buttons = []);
      c._buttons.push({ inst: this, name: this.c.name });
      for (var g = 0, f = e.length; g < f; g++) this.add(e[g]);
      b.on('destroy', function (b, e) {
        e === c && a.destroy();
      });
      d('body').on('keyup.' + this.s.namespace, function (b) {
        if (!u.activeElement || u.activeElement === u.body) {
          var c = String.fromCharCode(b.keyCode).toLowerCase();
          -1 !== a.s.listenKeys.toLowerCase().indexOf(c) && a._keypress(c, b);
        }
      });
    },
    _addKey: function (a) {
      a.key &&
        (this.s.listenKeys += d.isPlainObject(a.key) ? a.key.key : a.key);
    },
    _draw: function (a, b) {
      a || ((a = this.dom.container), (b = this.s.buttons));
      a.children().detach();
      for (var c = 0, e = b.length; c < e; c++)
        a.append(b[c].inserter),
          a.append(' '),
          b[c].buttons &&
            b[c].buttons.length &&
            this._draw(b[c].collection, b[c].buttons);
    },
    _expandButton: function (a, b, c, e) {
      var g = this.s.dt,
        f = 0;
      b = d.isArray(b) ? b : [b];
      for (var k = 0, h = b.length; k < h; k++) {
        var t = this._resolveExtends(b[k]);
        if (t)
          if (d.isArray(t)) this._expandButton(a, t, c, e);
          else {
            var l = this._buildButton(t, c);
            l &&
              (e !== n && null !== e ? (a.splice(e, 0, l), e++) : a.push(l),
              l.conf.buttons &&
                ((l.collection = d('<' + this.c.dom.collection.tag + '/>')),
                (l.conf._collection = l.collection),
                this._expandButton(l.buttons, l.conf.buttons, !0, e)),
              t.init && t.init.call(g.button(l.node), g, d(l.node), t),
              f++);
          }
      }
    },
    _buildButton: function (a, b) {
      var c = this.c.dom.button,
        e = this.c.dom.buttonLiner,
        g = this.c.dom.collection,
        f = this.s.dt,
        k = function (b) {
          return 'function' === typeof b ? b(f, l, a) : b;
        };
      b && g.button && (c = g.button);
      b && g.buttonLiner && (e = g.buttonLiner);
      if (a.available && !a.available(f, a)) return !1;
      var h = function (a, b, c, e) {
        e.action.call(b.button(c), a, b, c, e);
        d(b.table().node()).triggerHandler('buttons-action.dt', [
          b.button(c),
          b,
          c,
          e,
        ]);
      };
      g = a.tag || c.tag;
      var t = a.clickBlurs === n ? !0 : a.clickBlurs,
        l = d('<' + g + '/>')
          .addClass(c.className)
          .attr('tabindex', this.s.dt.settings()[0].iTabIndex)
          .attr('aria-controls', this.s.dt.table().node().id)
          .on('click.dtb', function (b) {
            b.preventDefault();
            !l.hasClass(c.disabled) && a.action && h(b, f, l, a);
            t && l.trigger('blur');
          })
          .on('keyup.dtb', function (b) {
            13 === b.keyCode &&
              !l.hasClass(c.disabled) &&
              a.action &&
              h(b, f, l, a);
          });
      'a' === g.toLowerCase() && l.attr('href', '#');
      'button' === g.toLowerCase() && l.attr('type', 'button');
      e.tag
        ? ((g = d('<' + e.tag + '/>')
            .html(k(a.text))
            .addClass(e.className)),
          'a' === e.tag.toLowerCase() && g.attr('href', '#'),
          l.append(g))
        : l.html(k(a.text));
      !1 === a.enabled && l.addClass(c.disabled);
      a.className && l.addClass(a.className);
      a.titleAttr && l.attr('title', k(a.titleAttr));
      a.attr && l.attr(a.attr);
      a.namespace || (a.namespace = '.dt-button-' + F++);
      e =
        (e = this.c.dom.buttonContainer) && e.tag
          ? d('<' + e.tag + '/>')
              .addClass(e.className)
              .append(l)
          : l;
      this._addKey(a);
      this.c.buttonCreated && (e = this.c.buttonCreated(a, e));
      return {
        conf: a,
        node: l.get(0),
        inserter: e,
        buttons: [],
        inCollection: b,
        collection: null,
      };
    },
    _nodeToButton: function (a, b) {
      b || (b = this.s.buttons);
      for (var c = 0, e = b.length; c < e; c++) {
        if (b[c].node === a) return b[c];
        if (b[c].buttons.length) {
          var d = this._nodeToButton(a, b[c].buttons);
          if (d) return d;
        }
      }
    },
    _nodeToHost: function (a, b) {
      b || (b = this.s.buttons);
      for (var c = 0, e = b.length; c < e; c++) {
        if (b[c].node === a) return b;
        if (b[c].buttons.length) {
          var d = this._nodeToHost(a, b[c].buttons);
          if (d) return d;
        }
      }
    },
    _keypress: function (a, b) {
      if (!b._buttonsHandled) {
        var c = function (e) {
          for (var g = 0, f = e.length; g < f; g++) {
            var k = e[g].conf,
              h = e[g].node;
            k.key &&
              (k.key === a
                ? ((b._buttonsHandled = !0), d(h).click())
                : !d.isPlainObject(k.key) ||
                  k.key.key !== a ||
                  (k.key.shiftKey && !b.shiftKey) ||
                  (k.key.altKey && !b.altKey) ||
                  (k.key.ctrlKey && !b.ctrlKey) ||
                  (k.key.metaKey && !b.metaKey) ||
                  ((b._buttonsHandled = !0), d(h).click()));
            e[g].buttons.length && c(e[g].buttons);
          }
        };
        c(this.s.buttons);
      }
    },
    _removeKey: function (a) {
      if (a.key) {
        var b = d.isPlainObject(a.key) ? a.key.key : a.key;
        a = this.s.listenKeys.split('');
        b = d.inArray(b, a);
        a.splice(b, 1);
        this.s.listenKeys = a.join('');
      }
    },
    _resolveExtends: function (a) {
      var b = this.s.dt,
        c,
        e = function (c) {
          for (var e = 0; !d.isPlainObject(c) && !d.isArray(c); ) {
            if (c === n) return;
            if ('function' === typeof c) {
              if (((c = c(b, a)), !c)) return !1;
            } else if ('string' === typeof c) {
              if (!q[c]) throw 'Unknown button type: ' + c;
              c = q[c];
            }
            e++;
            if (30 < e) throw 'Buttons: Too many iterations';
          }
          return d.isArray(c) ? c : d.extend({}, c);
        };
      for (a = e(a); a && a.extend; ) {
        if (!q[a.extend])
          throw 'Cannot extend unknown button type: ' + a.extend;
        var g = e(q[a.extend]);
        if (d.isArray(g)) return g;
        if (!g) return !1;
        var f = g.className;
        a = d.extend({}, g, a);
        f && a.className !== f && (a.className = f + ' ' + a.className);
        var k = a.postfixButtons;
        if (k) {
          a.buttons || (a.buttons = []);
          f = 0;
          for (c = k.length; f < c; f++) a.buttons.push(k[f]);
          a.postfixButtons = null;
        }
        if ((k = a.prefixButtons)) {
          a.buttons || (a.buttons = []);
          f = 0;
          for (c = k.length; f < c; f++) a.buttons.splice(f, 0, k[f]);
          a.prefixButtons = null;
        }
        a.extend = g.extend;
      }
      return a;
    },
    _popover: function (a, b, c) {
      var e = this.c,
        g = d.extend(
          {
            align: 'button-left',
            autoClose: !1,
            background: !0,
            backgroundClassName: 'dt-button-background',
            contentClassName: e.dom.collection.className,
            collectionLayout: '',
            collectionTitle: '',
            dropup: !1,
            fade: 400,
            rightAlignClassName: 'dt-button-right',
            tag: e.dom.collection.tag,
          },
          c
        ),
        f = b.node(),
        k = function () {
          z(d('.dt-button-collection'), g.fade, function () {
            d(this).detach();
          });
          d(
            b.buttons('[aria-haspopup="true"][aria-expanded="true"]').nodes()
          ).attr('aria-expanded', 'false');
          d('div.dt-button-background').off('click.dtb-collection');
          r.background(!1, g.backgroundClassName, g.fade, f);
          d('body').off('.dtb-collection');
          b.off('buttons-action.b-internal');
        };
      !1 === a && k();
      c = d(b.buttons('[aria-haspopup="true"][aria-expanded="true"]').nodes());
      c.length && ((f = c.eq(0)), k());
      c = d('<div/>')
        .addClass('dt-button-collection')
        .addClass(g.collectionLayout)
        .css('display', 'none');
      a = d(a).addClass(g.contentClassName).attr('role', 'menu').appendTo(c);
      f.attr('aria-expanded', 'true');
      f.parents('body')[0] !== u.body && (f = u.body.lastChild);
      g.collectionTitle &&
        c.prepend(
          '<div class="dt-button-collection-title">' +
            g.collectionTitle +
            '</div>'
        );
      y(c.insertAfter(f));
      var h = d(b.table().container());
      e = c.css('position');
      'dt-container' === g.align &&
        ((f = f.parent()), c.css('width', h.width()));
      if ('absolute' === e) {
        e = f.position();
        c.css({ top: e.top + f.outerHeight(), left: e.left });
        var t = c.outerHeight();
        c.outerWidth();
        var l = h.offset().top + h.height();
        l = e.top + f.outerHeight() + t - l;
        var p = e.top - t,
          w = h.offset().top;
        e = e.top - t - 5;
        (l > w - p || g.dropup) && -e < w && c.css('top', e);
        e = h.offset().left;
        h = h.width();
        h = e + h;
        t = c.offset().left;
        l = c.width();
        l = t + l;
        p = f.offset().left;
        w = f.outerWidth();
        w = p + w;
        p = 0;
        c.hasClass(g.rightAlignClassName) || 'button-right' === g.align
          ? ((p = w - l),
            e > t + p &&
              ((e -= t + p), (h -= l + p), (p = e > h ? p + h : p + e)))
          : ((p = e - t),
            h < l + p &&
              ((e -= t + p), (h -= l + p), (p = e > h ? p + h : p + e)));
        c.css('left', c.position().left + p);
      } else
        (e = c.height() / 2),
          e > d(v).height() / 2 && (e = d(v).height() / 2),
          c.css('marginTop', -1 * e);
      g.background && r.background(!0, g.backgroundClassName, g.fade, f);
      d('div.dt-button-background').on('click.dtb-collection', function () {});
      d('body')
        .on('click.dtb-collection', function (b) {
          var c = d.fn.addBack ? 'addBack' : 'andSelf';
          d(b.target).parents()[c]().filter(a).length || k();
        })
        .on('keyup.dtb-collection', function (a) {
          27 === a.keyCode && k();
        });
      g.autoClose &&
        setTimeout(function () {
          b.on('buttons-action.b-internal', function (a, b, c, e) {
            e[0] !== f[0] && k();
          });
        }, 0);
      d(c).trigger('buttons-popover.dt');
    },
  });
  r.background = function (a, b, c, e) {
    c === n && (c = 400);
    e || (e = u.body);
    a
      ? y(d('<div/>').addClass(b).css('display', 'none').insertAfter(e), c)
      : z(d('div.' + b), c, function () {
          d(this).removeClass(b).remove();
        });
  };
  r.instanceSelector = function (a, b) {
    if (a === n || null === a)
      return d.map(b, function (a) {
        return a.inst;
      });
    var c = [],
      e = d.map(b, function (a) {
        return a.name;
      }),
      g = function (a) {
        if (d.isArray(a)) for (var f = 0, h = a.length; f < h; f++) g(a[f]);
        else
          'string' === typeof a
            ? -1 !== a.indexOf(',')
              ? g(a.split(','))
              : ((a = d.inArray(d.trim(a), e)), -1 !== a && c.push(b[a].inst))
            : 'number' === typeof a && c.push(b[a].inst);
      };
    g(a);
    return c;
  };
  r.buttonSelector = function (a, b) {
    for (
      var c = [],
        e = function (a, b, c) {
          for (var d, g, f = 0, h = b.length; f < h; f++)
            if ((d = b[f]))
              (g = c !== n ? c + f : f + ''),
                a.push({ node: d.node, name: d.conf.name, idx: g }),
                d.buttons && e(a, d.buttons, g + '-');
        },
        g = function (a, b) {
          var f,
            k = [];
          e(k, b.s.buttons);
          var h = d.map(k, function (a) {
            return a.node;
          });
          if (d.isArray(a) || a instanceof d)
            for (h = 0, f = a.length; h < f; h++) g(a[h], b);
          else if (null === a || a === n || '*' === a)
            for (h = 0, f = k.length; h < f; h++)
              c.push({ inst: b, node: k[h].node });
          else if ('number' === typeof a)
            c.push({ inst: b, node: b.s.buttons[a].node });
          else if ('string' === typeof a)
            if (-1 !== a.indexOf(','))
              for (k = a.split(','), h = 0, f = k.length; h < f; h++)
                g(d.trim(k[h]), b);
            else if (a.match(/^\d+(\-\d+)*$/))
              (h = d.map(k, function (a) {
                return a.idx;
              })),
                c.push({ inst: b, node: k[d.inArray(a, h)].node });
            else if (-1 !== a.indexOf(':name'))
              for (a = a.replace(':name', ''), h = 0, f = k.length; h < f; h++)
                k[h].name === a && c.push({ inst: b, node: k[h].node });
            else
              d(h)
                .filter(a)
                .each(function () {
                  c.push({ inst: b, node: this });
                });
          else
            'object' === typeof a &&
              a.nodeName &&
              ((k = d.inArray(a, h)),
              -1 !== k && c.push({ inst: b, node: h[k] }));
        },
        f = 0,
        k = a.length;
      f < k;
      f++
    )
      g(b, a[f]);
    return c;
  };
  r.defaults = {
    buttons: ['copy', 'excel', 'csv', 'pdf', 'print'],
    name: 'main',
    tabIndex: 0,
    dom: {
      container: { tag: 'div', className: 'dt-buttons' },
      collection: { tag: 'div', className: '' },
      button: {
        tag: 'ActiveXObject' in v ? 'a' : 'button',
        className: 'dt-button',
        active: 'active',
        disabled: 'disabled',
      },
      buttonLiner: { tag: 'span', className: '' },
    },
  };
  r.version = '1.6.2';
  d.extend(q, {
    collection: {
      text: function (a) {
        return a.i18n('buttons.collection', 'Collection');
      },
      className: 'buttons-collection',
      init: function (a, b, c) {
        b.attr('aria-expanded', !1);
      },
      action: function (a, b, c, e) {
        a.stopPropagation();
        e._collection.parents('body').length
          ? this.popover(!1, e)
          : this.popover(e._collection, e);
      },
      attr: { 'aria-haspopup': !0 },
    },
    copy: function (a, b) {
      if (q.copyHtml5) return 'copyHtml5';
      if (q.copyFlash && q.copyFlash.available(a, b)) return 'copyFlash';
    },
    csv: function (a, b) {
      if (q.csvHtml5 && q.csvHtml5.available(a, b)) return 'csvHtml5';
      if (q.csvFlash && q.csvFlash.available(a, b)) return 'csvFlash';
    },
    excel: function (a, b) {
      if (q.excelHtml5 && q.excelHtml5.available(a, b)) return 'excelHtml5';
      if (q.excelFlash && q.excelFlash.available(a, b)) return 'excelFlash';
    },
    pdf: function (a, b) {
      if (q.pdfHtml5 && q.pdfHtml5.available(a, b)) return 'pdfHtml5';
      if (q.pdfFlash && q.pdfFlash.available(a, b)) return 'pdfFlash';
    },
    pageLength: function (a) {
      a = a.settings()[0].aLengthMenu;
      var b = d.isArray(a[0]) ? a[0] : a,
        c = d.isArray(a[0]) ? a[1] : a;
      return {
        extend: 'collection',
        text: function (a) {
          return a.i18n(
            'buttons.pageLength',
            { '-1': 'Show all rows', _: 'Show %d rows' },
            a.page.len()
          );
        },
        className: 'buttons-page-length',
        autoClose: !0,
        buttons: d.map(b, function (a, b) {
          return {
            text: c[b],
            className: 'button-page-length',
            action: function (b, c) {
              c.page.len(a).draw();
            },
            init: function (b, c, e) {
              var d = this;
              c = function () {
                d.active(b.page.len() === a);
              };
              b.on('length.dt' + e.namespace, c);
              c();
            },
            destroy: function (a, b, c) {
              a.off('length.dt' + c.namespace);
            },
          };
        }),
        init: function (a, b, c) {
          var e = this;
          a.on('length.dt' + c.namespace, function () {
            e.text(c.text);
          });
        },
        destroy: function (a, b, c) {
          a.off('length.dt' + c.namespace);
        },
      };
    },
  });
  m.Api.register('buttons()', function (a, b) {
    b === n && ((b = a), (a = n));
    this.selector.buttonGroup = a;
    var c = this.iterator(
      !0,
      'table',
      function (c) {
        if (c._buttons)
          return r.buttonSelector(r.instanceSelector(a, c._buttons), b);
      },
      !0
    );
    c._groupSelector = a;
    return c;
  });
  m.Api.register('button()', function (a, b) {
    a = this.buttons(a, b);
    1 < a.length && a.splice(1, a.length);
    return a;
  });
  m.Api.registerPlural('buttons().active()', 'button().active()', function (a) {
    return a === n
      ? this.map(function (a) {
          return a.inst.active(a.node);
        })
      : this.each(function (b) {
          b.inst.active(b.node, a);
        });
  });
  m.Api.registerPlural('buttons().action()', 'button().action()', function (a) {
    return a === n
      ? this.map(function (a) {
          return a.inst.action(a.node);
        })
      : this.each(function (b) {
          b.inst.action(b.node, a);
        });
  });
  m.Api.register(['buttons().enable()', 'button().enable()'], function (a) {
    return this.each(function (b) {
      b.inst.enable(b.node, a);
    });
  });
  m.Api.register(['buttons().disable()', 'button().disable()'], function () {
    return this.each(function (a) {
      a.inst.disable(a.node);
    });
  });
  m.Api.registerPlural('buttons().nodes()', 'button().node()', function () {
    var a = d();
    d(
      this.each(function (b) {
        a = a.add(b.inst.node(b.node));
      })
    );
    return a;
  });
  m.Api.registerPlural(
    'buttons().processing()',
    'button().processing()',
    function (a) {
      return a === n
        ? this.map(function (a) {
            return a.inst.processing(a.node);
          })
        : this.each(function (b) {
            b.inst.processing(b.node, a);
          });
    }
  );
  m.Api.registerPlural('buttons().text()', 'button().text()', function (a) {
    return a === n
      ? this.map(function (a) {
          return a.inst.text(a.node);
        })
      : this.each(function (b) {
          b.inst.text(b.node, a);
        });
  });
  m.Api.registerPlural(
    'buttons().trigger()',
    'button().trigger()',
    function () {
      return this.each(function (a) {
        a.inst.node(a.node).trigger('click');
      });
    }
  );
  m.Api.register('button().popover()', function (a, b) {
    return this.map(function (c) {
      return c.inst._popover(a, this.button(this[0].node), b);
    });
  });
  m.Api.register('buttons().containers()', function () {
    var a = d(),
      b = this._groupSelector;
    this.iterator(!0, 'table', function (c) {
      if (c._buttons) {
        c = r.instanceSelector(b, c._buttons);
        for (var e = 0, d = c.length; e < d; e++) a = a.add(c[e].container());
      }
    });
    return a;
  });
  m.Api.register('buttons().container()', function () {
    return this.containers().eq(0);
  });
  m.Api.register('button().add()', function (a, b) {
    var c = this.context;
    c.length &&
      ((c = r.instanceSelector(this._groupSelector, c[0]._buttons)),
      c.length && c[0].add(b, a));
    return this.button(this._groupSelector, a);
  });
  m.Api.register('buttons().destroy()', function () {
    this.pluck('inst')
      .unique()
      .each(function (a) {
        a.destroy();
      });
    return this;
  });
  m.Api.registerPlural('buttons().remove()', 'buttons().remove()', function () {
    this.each(function (a) {
      a.inst.remove(a.node);
    });
    return this;
  });
  var x;
  m.Api.register('buttons.info()', function (a, b, c) {
    var e = this;
    if (!1 === a)
      return (
        this.off('destroy.btn-info'),
        z(d('#datatables_buttons_info'), 400, function () {
          d(this).remove();
        }),
        clearTimeout(x),
        (x = null),
        this
      );
    x && clearTimeout(x);
    d('#datatables_buttons_info').length &&
      d('#datatables_buttons_info').remove();
    a = a ? '<h2>' + a + '</h2>' : '';
    y(
      d('<div id="datatables_buttons_info" class="dt-button-info"/>')
        .html(a)
        .append(d('<div/>')['string' === typeof b ? 'html' : 'append'](b))
        .css('display', 'none')
        .appendTo('body')
    );
    c !== n &&
      0 !== c &&
      (x = setTimeout(function () {
        e.buttons.info(!1);
      }, c));
    this.on('destroy.btn-info', function () {
      e.buttons.info(!1);
    });
    return this;
  });
  m.Api.register('buttons.exportData()', function (a) {
    if (this.context.length) return G(new m.Api(this.context[0]), a);
  });
  m.Api.register('buttons.exportInfo()', function (a) {
    a || (a = {});
    var b = a;
    var c =
      '*' === b.filename &&
      '*' !== b.title &&
      b.title !== n &&
      null !== b.title &&
      '' !== b.title
        ? b.title
        : b.filename;
    'function' === typeof c && (c = c());
    c === n || null === c
      ? (c = null)
      : (-1 !== c.indexOf('*') &&
          (c = d.trim(c.replace('*', d('head > title').text()))),
        (c = c.replace(/[^a-zA-Z0-9_\u00A1-\uFFFF\.,\-_ !\(\)]/g, '')),
        (b = A(b.extension)) || (b = ''),
        (c += b));
    b = A(a.title);
    b =
      null === b
        ? null
        : -1 !== b.indexOf('*')
        ? b.replace('*', d('head > title').text() || 'Exported data')
        : b;
    return {
      filename: c,
      title: b,
      messageTop: C(this, a.message || a.messageTop, 'top'),
      messageBottom: C(this, a.messageBottom, 'bottom'),
    };
  });
  var A = function (a) {
      return null === a || a === n ? null : 'function' === typeof a ? a() : a;
    },
    C = function (a, b, c) {
      b = A(b);
      if (null === b) return null;
      a = d('caption', a.table().container()).eq(0);
      return '*' === b
        ? a.css('caption-side') !== c
          ? null
          : a.length
          ? a.text()
          : ''
        : b;
    },
    D = d('<textarea/>')[0],
    G = function (a, b) {
      var c = d.extend(
          !0,
          {},
          {
            rows: null,
            columns: '',
            modifier: { search: 'applied', order: 'applied' },
            orthogonal: 'display',
            stripHtml: !0,
            stripNewlines: !0,
            decodeEntities: !0,
            trim: !0,
            format: {
              header: function (a) {
                return e(a);
              },
              footer: function (a) {
                return e(a);
              },
              body: function (a) {
                return e(a);
              },
            },
            customizeData: null,
          },
          b
        ),
        e = function (a) {
          if ('string' !== typeof a) return a;
          a = a.replace(
            /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
            ''
          );
          a = a.replace(/<!\-\-.*?\-\->/g, '');
          c.stripHtml && (a = a.replace(/<[^>]*>/g, ''));
          c.trim && (a = a.replace(/^\s+|\s+$/g, ''));
          c.stripNewlines && (a = a.replace(/\n/g, ' '));
          c.decodeEntities && ((D.innerHTML = a), (a = D.value));
          return a;
        };
      b = a
        .columns(c.columns)
        .indexes()
        .map(function (b) {
          var d = a.column(b).header();
          return c.format.header(d.innerHTML, b, d);
        })
        .toArray();
      var g = a.table().footer()
          ? a
              .columns(c.columns)
              .indexes()
              .map(function (b) {
                var d = a.column(b).footer();
                return c.format.footer(d ? d.innerHTML : '', b, d);
              })
              .toArray()
          : null,
        f = d.extend({}, c.modifier);
      a.select &&
        'function' === typeof a.select.info &&
        f.selected === n &&
        a.rows(c.rows, d.extend({ selected: !0 }, f)).any() &&
        d.extend(f, { selected: !0 });
      f = a.rows(c.rows, f).indexes().toArray();
      var k = a.cells(f, c.columns);
      f = k.render(c.orthogonal).toArray();
      k = k.nodes().toArray();
      for (
        var h = b.length, m = [], l = 0, p = 0, r = 0 < h ? f.length / h : 0;
        p < r;
        p++
      ) {
        for (var q = [h], u = 0; u < h; u++)
          (q[u] = c.format.body(f[l], p, u, k[l])), l++;
        m[p] = q;
      }
      b = { header: b, footer: g, body: m };
      c.customizeData && c.customizeData(b);
      return b;
    };
  d.fn.dataTable.Buttons = r;
  d.fn.DataTable.Buttons = r;
  d(u).on('init.dt plugin-init.dt', function (a, b) {
    'dt' === a.namespace &&
      (a = b.oInit.buttons || m.defaults.buttons) &&
      !b._buttons &&
      new r(b, a).container();
  });
  m.ext.feature.push({ fnInit: B, cFeature: 'B' });
  m.ext.features && m.ext.features.register('buttons', B);
  return r;
});
