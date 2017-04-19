'use strict';

/**
 * From https://github.com/brigade/delayed-scroll-restoration-polyfill, modified.
 */

if (window.history.pushState) {
  (function () {
    var TRY_TO_SCROLL_INTERVAL_MS = 10;

    var originalPushState = window.history.pushState;
    var originalReplaceState = window.history.replaceState;

    // Store current scroll position in current state when navigating away.
    window.history.pushState = function () {
      var newStateOfCurrentPage = Object.assign({}, window.history.state, {
        __scrollX: window.scrollX,
        __scrollY: window.scrollY
      });
      originalReplaceState.call(window.history, newStateOfCurrentPage, '');

      originalPushState.apply(window.history, arguments);
    };

    // Make sure we don't throw away scroll position when calling "replaceState".
    window.history.replaceState = function (state) {
      var newState = Object.assign({}, {
        __scrollX: window.history.state && window.history.state.__scrollX,
        __scrollY: window.history.state && window.history.state.__scrollY
      }, state);

      for (var _len = arguments.length, otherArgs = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        otherArgs[_key - 1] = arguments[_key];
      }

      originalReplaceState.apply(window.history, [newState].concat(otherArgs));
    };

    var timeoutHandle = null;
    var intervalId = null;

    // Try to scroll to the scrollTarget, but only if we can actually scroll
    // there. Otherwise keep trying until we time out, then scroll as far as
    // we can.
    var tryToScrollTo = function tryToScrollTo(scrollTarget) {
      // Stop any previous calls to "tryToScrollTo".
      clearTimeout(timeoutHandle);

      var body = document.body;
      var html = document.documentElement;

      // From http://stackoverflow.com/a/1147768
      var documentWidth = Math.max(body.scrollWidth, body.offsetWidth, html.clientWidth, html.scrollWidth, html.offsetWidth);
      var documentHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);

      if (documentWidth - window.innerWidth >= scrollTarget.x && documentHeight - window.innerHeight >= scrollTarget.y ) {
        window.scrollTo(scrollTarget.x, scrollTarget.y);
        return;
      } else {
        timeoutHandle = setTimeout(function () {
          return tryToScrollTo(scrollTarget);
        }, TRY_TO_SCROLL_INTERVAL_MS);
      }
    };
    var myTryToScrollTo = function myTryToScrollTo(scrollTarget) {
      var body = document.body;
      var html = document.documentElement;

      // From http://stackoverflow.com/a/1147768
      var documentWidth = Math.max(body.scrollWidth, body.offsetWidth, html.clientWidth, html.scrollWidth, html.offsetWidth);
      var documentHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);

      if (window.scrollY != scrollTarget.y) {
        window.scrollTo(scrollTarget.x, scrollTarget.y);
      } else {
        clearInterval(intervalId);
        intervalId = null;
      }
    };
    // Try scrolling to the previous scroll position on popstate
    var onPopState = function onPopState() {
      var state = window.history.state;

      if (state && Number.isFinite(state.__scrollX) && Number.isFinite(state.__scrollY)) {
        intervalId = setInterval(() => {
          myTryToScrollTo({
            x: state.__scrollX,
            y: state.__scrollY,
            latestTimeToTry: Date.now()
          });
        }, TRY_TO_SCROLL_INTERVAL_MS)
      }
    };

    window.addEventListener('popstate', onPopState, true);
  })();
}