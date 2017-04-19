import throttle from 'throttleit'
import inViewport from './in-viewport'

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
          this.handler()
        }
      }

      // checkInView right after this component is mounted
      if (this.handleOnMount) {
        execute()
      }

      this._scrollContainer = this.scrollContainer ?
        this.$parent.$refs[this.scrollContainer] :
        window

      // add event listeners
      this.check = throttle(execute, 200)
      triggers.forEach(event => this._scrollContainer.addEventListener(event, this.check))
    }
  },
  render(h) {
    console.log(this)
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
