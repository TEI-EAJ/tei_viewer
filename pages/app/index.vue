<template>
  <div></div>
</template>
<script>
  export default {
    created(){
      const url = process.env.BASE_URL + this.$route.hash.replace("#", "").replace(":/", "://")
      location.href = url
    }
  }
</script>