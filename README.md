# vue-mugen-scroll [![NPM version](https://img.shields.io/npm/v/vue-mugen-scroll.svg?style=flat-square)](https://npmjs.com/package/vue-mugen-scroll) [![NPM downloads](https://img.shields.io/npm/dm/vue-mugen-scroll.svg?style=flat-square)](https://npmjs.com/package/vue-mugen-scroll) [![Build Status](https://img.shields.io/circleci/project/egoist/vue-mugen-scroll/master.svg?style=flat-square)](https://circleci.com/gh/egoist/vue-mugen-scroll)

**むげん [mugen]** means Infinity in English.

## Features

- Small, only weighs 2kb
- Insanely easy to use, it's just a component with a couple props

## Install

```bash
$ npm install --save vue-mugen-scroll
```

CDN: https://unpkg.com/vue-mugen-scroll/dist/

## Usage

```vue
<template>
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
</script>
```

## API

### props

#### handler

Type: `function`<br>
Required: `true`

The handler function to run after you scroll to the bottom of the list. It will also be invoked on component mounted and the `mugen-scroll` component is visible in viewport.

#### handleOnMount

Type: `boolean`<br>
Default: `true`

Invoke the handler function on component mounted.

#### shouldHandle

Type: `boolean`<br>
Default: `true`

Add an addtional condition to check if it should invoke the handler function, for example you don't want it to be invoked again as it's loading.

#### threshold

Type: `number`<br>
Default: `0`

Set the ratio of the `<mugen-scroll>`'s height and width that needs to be visible for it to be considered in viewport. This defaults to 0, meaning any amount. A threshold of 0.5 or 1 will require that half or all, respectively, of the element's height and width need to be visible. threshold must be a number between 0 and 1

#### scrollContainer

Type: `string`

If the container of your list is scrollable, you can specific the reference ID of the container, so that we can detect the `scroll` event of this element instead of `window`.

```vue
<template>
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
</template>
```

## Development

You can run the example with [vbuild](https://github.com/egoist/vbuild)

```bash
git clone https://github.com/egoist/vue-mugen-scroll.git
cd vue-mugen-scroll
yarn
yarn example
```

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## License

[MIT](https://egoist.mit-license.org/) © [EGOIST](https://github.com/egoist)
