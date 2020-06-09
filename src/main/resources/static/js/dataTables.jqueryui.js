/*!
 DataTables jQuery UI integration
 ©2011-2014 SpryMedia Ltd - datatables.net/license
*/
var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.findInternal = function (a, b, c) {
  a instanceof String && (a = String(a));
  for (var d = a.length, e = 0; e < d; e++) {
    var l = a[e];
    if (b.call(c, l, e, a)) return { i: e, v: l };
  }
  return { i: -1, v: void 0 };
};
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.SIMPLE_FROUND_POLYFILL = !1;
$jscomp.defineProperty =
  $jscomp.ASSUME_ES5 || 'function' == typeof Object.defineProperties
    ? Object.defineProperty
    : function (a, b, c) {
        a != Array.prototype && a != Object.prototype && (a[b] = c.value);
      };
$jscomp.getGlobal = function (a) {
  a = [
    'object' == typeof window && window,
    'object' == typeof self && self,
    'object' == typeof global && global,
    a,
  ];
  for (var b = 0; b < a.length; ++b) {
    var c = a[b];
    if (c && c.Math == Math) return c;
  }
  throw Error('Cannot find global object');
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.polyfill = function (a, b, c, d) {
  if (b) {
    c = $jscomp.global;
    a = a.split('.');
    for (d = 0; d < a.length - 1; d++) {
      var e = a[d];
      e in c || (c[e] = {});
      c = c[e];
    }
    a = a[a.length - 1];
    d = c[a];
    b = b(d);
    b != d &&
      null != b &&
      $jscomp.defineProperty(c, a, {
        configurable: !0,
        writable: !0,
        value: b,
      });
  }
};
$jscomp.polyfill(
  'Array.prototype.find',
  function (a) {
    return a
      ? a
      : function (a, c) {
          return $jscomp.findInternal(this, a, c).v;
        };
  },
  'es6',
  'es3'
);
(function (a) {
  'function' === typeof define && define.amd
    ? define(['jquery', 'datatables.net'], function (b) {
        return a(b, window, document);
      })
    : 'object' === typeof exports
    ? (module.exports = function (b, c) {
        b || (b = window);
        (c && c.fn.dataTable) || (c = require('datatables.net')(b, c).$);
        return a(c, b, b.document);
      })
    : a(jQuery, window, document);
})(function (a, b, c, d) {
  b = a.fn.dataTable;
  a.extend(!0, b.defaults, {
    dom:
      '<"fg-toolbar ui-toolbar ui-widget-header ui-helper-clearfix ui-corner-tl ui-corner-tr"lfr>t<"fg-toolbar ui-toolbar ui-widget-header ui-helper-clearfix ui-corner-bl ui-corner-br"ip>',
    renderer: 'jqueryui',
  });
  a.extend(b.ext.classes, {
    sWrapper: 'dataTables_wrapper dt-jqueryui',
    sPageButton: 'fg-button ui-button ui-state-default',
    sPageButtonActive: 'ui-state-disabled',
    sPageButtonDisabled: 'ui-state-disabled',
    sPaging:
      'dataTables_paginate fg-buttonset ui-buttonset fg-buttonset-multi ui-buttonset-multi paging_',
    sSortAsc: 'ui-state-default sorting_asc',
    sSortDesc: 'ui-state-default sorting_desc',
    sSortable: 'ui-state-default sorting',
    sSortableAsc: 'ui-state-default sorting_asc_disabled',
    sSortableDesc: 'ui-state-default sorting_desc_disabled',
    sSortableNone: 'ui-state-default sorting_disabled',
    sSortIcon: 'DataTables_sort_icon',
    sScrollHead: 'dataTables_scrollHead ui-state-default',
    sScrollFoot: 'dataTables_scrollFoot ui-state-default',
    sHeaderTH: 'ui-state-default',
    sFooterTH: 'ui-state-default',
  });
  b.ext.renderer.header.jqueryui = function (b, c, d, f) {
    var e = 'css_right ui-icon ui-icon-caret-2-n-s',
      g = -1 !== a.inArray('asc', d.asSorting),
      h = -1 !== a.inArray('desc', d.asSorting);
    d.bSortable && (g || h)
      ? g && !h
        ? (e = 'css_right ui-icon ui-icon-caret-1-n')
        : !g && h && (e = 'css_right ui-icon ui-icon-caret-1-s')
      : (e = '');
    a('<div/>')
      .addClass('DataTables_sort_wrapper')
      .append(c.contents())
      .append(a('<span/>').addClass(f.sSortIcon + ' ' + e))
      .appendTo(c);
    a(b.nTable).on('order.dt', function (a, g, h, k) {
      b === g &&
        ((a = d.idx),
        c
          .removeClass(f.sSortAsc + ' ' + f.sSortDesc)
          .addClass(
            'asc' == k[a]
              ? f.sSortAsc
              : 'desc' == k[a]
              ? f.sSortDesc
              : d.sSortingClass
          ),
        c
          .find('span.' + f.sSortIcon)
          .removeClass(
            'css_right ui-icon ui-icon-triangle-1-n css_right ui-icon ui-icon-triangle-1-s css_right ui-icon ui-icon-caret-2-n-s css_right ui-icon ui-icon-caret-1-n css_right ui-icon ui-icon-caret-1-s'
          )
          .addClass(
            'asc' == k[a]
              ? 'css_right ui-icon ui-icon-triangle-1-n'
              : 'desc' == k[a]
              ? 'css_right ui-icon ui-icon-triangle-1-s'
              : e
          ));
    });
  };
  b.TableTools &&
    a.extend(!0, b.TableTools.classes, {
      container: 'DTTT_container ui-buttonset ui-buttonset-multi',
      buttons: { normal: 'DTTT_button ui-button ui-state-default' },
      collection: {
        container: 'DTTT_collection ui-buttonset ui-buttonset-multi',
      },
    });
  return b;
});
