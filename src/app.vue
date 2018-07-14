<template>
    <div id="app" class="sf-app-main">
        <!--<v-login></v-login>-->

        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: 'app'
    }
</script>

<style>
    .sf-app-main {
        height: 100%;
    }
</style>