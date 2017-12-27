import throttle from 'throttleit'
import inViewport from 'element-in-view'

const triggers = ['scroll', 'resize']

const MugenScroll = {
  name: 'mugen-scroll',
  props: {
    handler: {
      type: Function,
      required: true
    },
    shouldHandle: {
      type: Boolean,
      default: true
    },
    threshold: {
      type: Number,
      default: 0
    },
    handleOnMount: {
      type: Boolean,
      default: true
    },
    scrollContainer: {
      type: String
    }
  },
  mounted() {
    this.checkInView()
  },
  methods: {
    checkInView() {
      const execute = () => {
        const inView = inViewport(this.$refs.scroll, {
          threshold: this.threshold
        })
        if (this.shouldHandle && inView) {
          this.handler().then(() => {
            execute();
          });
        }
      }

      // checkInView right after this component is mounted
      if (this.handleOnMount) {
        execute()
      }

      if (this.scrollContainer) {
        let parent = this
        while ((parent = parent.$parent) && !this._scrollContainer) {
          this._scrollContainer = parent.$refs[this.scrollContainer]
        }
        // Ensure it's html element (ref could be component)
        if (this._scrollContainer && this._scrollContainer.$el) {
          this._scrollContainer = this._scrollContainer.$el
        }
      }

      this._scrollContainer = this._scrollContainer || window

      // Add event listeners
      this.check = throttle(execute, 200)
      triggers.forEach(event => this._scrollContainer.addEventListener(event, this.check))
    }
  },
  render(h) {
    return h('div', {
      staticClass: 'mugen-scroll',
      ref: 'scroll'
    }, this.$slots.default)
  },
  beforeDestroy() {
    triggers.forEach(event => this._scrollContainer.removeEventListener(event, this.check))
  }
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.component(MugenScroll.name, MugenScroll)
}

export default MugenScroll
