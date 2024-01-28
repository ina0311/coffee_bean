<script setup lang="ts">
</script>

<template>
  <header class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <router-link class="navbar-item" to="/">
      </router-link>
    </div>
    <div class="navbar-menu">
      <div class="navbar-start">
        <router-link class="navbar-item" to="/">
          Home
        </router-link>
      </div>
      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <router-link class="button is-primary" to="/sign-up">
              <strong>Sign up</strong>
            </router-link>
            <router-link class="button is-light" to="/sign-in">
              Sign in
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped lang="stylus">
</style>
