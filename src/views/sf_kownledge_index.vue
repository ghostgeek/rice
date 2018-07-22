<template>
<div id="knowledge_index">
  <sf_kownledge_menu></sf_kownledge_menu>
  <transition name="router-slid" mode="out-in">
    <router-view></router-view>
  </transition>
</div>
</template>


<script>
import sf_kownledge_menu from '../components/sf_kownledge_menu.vue'
export default {
  data() {
    return {

    }
  },
  components: {
    sf_kownledge_menu
  }
}
</script>

<style>
#knowledge_index {
  width: 100%;
  height: 100%;
  background: #f3f3f3;
  padding: 0px 30px 30px 30px;
}
</style>
