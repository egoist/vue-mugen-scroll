<template>
  <div id="app">
    <div class="users" v-if="users.length > 0">
      <div class="user" v-for="user in users">
        <img class="avatar" :src="user.avatar_url" height="40" alt="">
        <h2>{{ user.login }}</h2>
      </div>
    </div>
    <mugen-scroll :handler="fetchUsers" :shouldHandle="!loading">
      loading...
    </mugen-scroll>
    <div class="count">loaded {{ count }} time{{ count > 1 ? 's' : '' }}</div>
  </div>
</template>

<script>
  import http from 'axios'

  import MugenScroll from '../src'

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
      MugenScroll
    }
  }
</script>

<style>
  body {
    margin: 0;
  }
  .users {
    max-width: 400px;
    margin: 0 auto;
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
    text-align: center;
    font-size: 18px;
  }
  .count {
    position: fixed;
    bottom: 10px;
    right: 10px;
    font-size: 18px;
  }
</style>
