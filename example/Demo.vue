<template>
  <div id="app">
    <h1>vue-mugen-scroll</h1>
    <h2>Infinite scroll component for Vue.js</h2>
    <div class="wrap" :class="{'can-scroll': scrollableContainer}" ref="scrollContainer">
      <div class="users" v-if="users.length > 0">
        <div class="user" v-for="user in users">
          <img class="avatar" :src="user.avatar_url" height="40" alt="">
          <h2>{{ user.login }}</h2>
        </div>
      </div>
      <mugen-scroll
        class="you-can-add-custom-class-name"
        :handler="fetchUsers"
        :should-handle="!loading"
        :scroll-container="scrollableContainer && 'scrollContainer'">
        loading <span class="loading dots"></span>
      </mugen-scroll>
    </div>

    <div class="count">loaded {{ count }} time{{ count > 1 ? 's' : '' }}</div>
  </div>
</template>

<script>
  import http from 'axios'

  import MugenScroll from '../src'

  export default {
    name: 'demo',
    props: ['scrollableContainer'],
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
      MugenScroll
    }
  }
</script>

<style src="text-spinners/spinners.css"></style>
<style>
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
    font-size: 18px;
    margin-top: 10px;
  }
  .wrap {
    max-width: 400px;
  }
  .wrap.can-scroll {
    height: 300px;
    overflow-y: auto;
  }
</style>
