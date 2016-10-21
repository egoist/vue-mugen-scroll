'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var throttle = _interopDefault(require('lodash.throttle'));

/**
* forked from https://github.com/camwiegert/in-view/blob/master/src/viewport.js
* Check whether an element is in the viewport by
* more than offset px.
*/
var inViewport = function (element, ref) {
  if ( ref === void 0 ) ref = {};
  var offset = ref.offset; if ( offset === void 0 ) offset = {};

  var ref$1 = element.getBoundingClientRect();
  var top = ref$1.top;
  var right = ref$1.right;
  var bottom = ref$1.bottom;
  var left = ref$1.left;

  var intersection = {
    t: bottom,
    r: window.innerWidth - left,
    b: window.innerHeight - top,
    l: right
  };

  return intersection.t >= (offset.top || 0) &&
    intersection.r >= (offset.right || 0) &&
    intersection.b >= (offset.bottom || 0) &&
    intersection.l >= (offset.left || 0)
};

var triggers = ['scroll', 'resize', 'load'];

var MugenScroll = {
  name: 'mugen-scroll',
  props: {
    handler: {
      type: Function,
      required: true
    },
    shouldHandle: {
      type: Boolean,
      default: true
    }
  },
  mounted: function mounted() {
    this.checkInView(this.$refs.scroll, this.handler, this.shouldHandle);
  },
  methods: {
    checkInView: function checkInView() {
      var this$1 = this;

      var check = throttle(function () {
        var inView = inViewport(this$1.$refs.scroll);
        if (this$1.shouldHandle && inView) {
          this$1.handler();
        }
      }, 100);

      triggers.forEach(function (event) { return window.addEventListener(event, check); });
    }
  },
  render: function render(h) {
    return h('div', {
      staticClass: 'mugen-scroll',
      ref: 'scroll'
    }, this.$slots.default)
  }
};

module.exports = MugenScroll;
