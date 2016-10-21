# vue-mugen-scroll

[![NPM version](https://img.shields.io/npm/v/vue-mugen-scroll.svg?style=flat-square)](https://npmjs.com/package/vue-mugen-scroll) [![NPM downloads](https://img.shields.io/npm/dm/vue-mugen-scroll.svg?style=flat-square)](https://npmjs.com/package/vue-mugen-scroll) [![Build Status](https://img.shields.io/circleci/project/egoist/vue-mugen-scroll/master.svg?style=flat-square)](https://circleci.com/gh/egoist/vue-mugen-scroll)

## Feature

- Small, only weighs 2kb
- Insanely easy to use, it's just a component with a couple props

## Install

```bash
$ npm install --save vue-mugen-scroll
```

## Usage

```vue
<template>
  <div id="app">
    <div class="list">you list of items</div>
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
</script>
```

## API

### props

#### handler

Type: `function`<br>
Required: `true`

The handler function to run after you scroll to the bottom of the list. It will also be invoked on page loaded and the `mugen-scroll` component is visible in viewport.

#### shouldHandle

Type: `boolean`<br>
Default: `true`

Add an addtional condition to check if it should invoke the handler function, for example you don't want it to be invoked again as it's loading.

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## License

[MIT](https://egoist.mit-license.org/) © [EGOIST](https://github.com/egoist)
