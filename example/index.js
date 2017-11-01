import Aimer from 'aimer'
import 'aimer/dist/aimer.css'

import Demo from './Demo.vue'

const aimer = new Aimer({
  title: 'vue-mugen-scroll',
  twitter: '_egoistlily',
  github: 'egoist/vue-mugen-scroll'
})

aimer.add({
  title: 'Default',
  component: Demo,
  example: `<template>
  <div id="app">
    <div class="list">your list of items</div>
    <!-- add the component right after your list -->
    <mugen-scroll :handler="fetchData" :should-handle="!loading">
      loading...
    </mugen-scroll>
  </div>
</template>

<script>
  import MugenScroll from 'vue-mugen-scroll'

  export default {
    data() {
      // do not run handler when it's loading
      return {loading: false}
    },
    methods: {
      fetchData() {
        this.loading = true
        // ... the code you wanna run to fetch data
        this.loading = false
      }
    },
    components: {MugenScroll}
  }
</script>`.trim()
})

aimer.add({
  title: 'Scrollable container',
  component: {
    render() {
      return <Demo scrollableContainer={true} />
    }
  },
  example: `<template>
  <div class="wrap"
    <!-- the container is scrollable here -->
    style="height: 200px; overflow: auto;"
    <!-- add the ref -->
    ref="wrap">
    <div class="list"><!-- your list --></div>
    <mugen-scroll
      <!-- pass the ref id -->
      scroll-container="wrap">
      Loading...
    </mugen-scroll>
  </div>
</template>`.trim()
})

aimer.start('#app')
