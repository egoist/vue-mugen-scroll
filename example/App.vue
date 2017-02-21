<template>
  <div id="app">
    <github></github>
    <h1>vue-mugen-scroll</h1>
    <h2>Infinite scroll component for Vue.js</h2>
    <div class="wrap" ref="scrollContainer">
      <div class="users" v-if="users.length > 0">
        <div class="user" v-for="user in users">
          <img class="avatar" :src="user.avatar_url" height="40" alt="">
          <h2>{{ user.login }}</h2>
        </div>
      </div>
      <mugen-scroll
        :handler="fetchUsers"
        :should-handle="!loading"
        scroll-container="scrollContainer">
        loading <span class="loading dots"></span>
      </mugen-scroll>
    </div>

    <div class="count">loaded {{ count }} time{{ count > 1 ? 's' : '' }}</div>
  </div>
</template>

<script>
  import http from 'axios'

  import MugenScroll from '../src'
  import Github from './Github.vue'

  export default {
    name: 'app',
    data() {
      return {
        users: [], count: 0, loading: false
      }
    },
    methods: {
      async fetchUsers() {
        this.loading = true
        const result = await http.get('https://api.github.com/users', {
          params: {
            since: (this.users.length > 0 && this.users[this.users.length - 1].id) || null
          }
        }).then(res => res.data)
        this.users = [...this.users, ...result]
        this.count++
        this.loading = false
      }
    },
    components: {
      MugenScroll,
      Github
    }
  }
</script>

<style src="text-spinners/spinners.css"></style>
<style>
  body {
    margin: 0;
    text-align: center;
    font-family: -apple-system, BlinkMacSystemFont,
               'avenir next', avenir,
               helvetica, 'helvetica neue',
               Ubuntu,
               'segoe ui', arial,
               sans-serif;
  }
  .users {
    background-color: #f0f0f0;
    .user {
      display: flex;
      align-items: center;
      padding: 10px;
      border-bottom: 1px solid #e2e2e2;
      .avatar {
        margin-right: 10px;
      }
    }
  }
  .mugen-scroll {
    padding: 10px;
    font-size: 18px;
    background-color: #f0f0f0;
  }
  .count {
    position: fixed;
    bottom: 10px;
    right: 10px;
    font-size: 18px;
  }
  .wrap {
    max-width: 400px;
    height: 300px;
    margin: 0 auto;
    overflow-y: auto;
  }
</style>
