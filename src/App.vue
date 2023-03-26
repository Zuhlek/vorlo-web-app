<script>
  import SideBar from '@/components/sidebar/SideBar.vue'
  export default {
    components: { SideBar }
  }
</script>

<template>
  <SideBar>

  </SideBar>
  <div>
    <router-view>

    </router-view>
  </div>
</template>
