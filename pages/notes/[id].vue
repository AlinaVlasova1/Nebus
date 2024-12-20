<script lang="ts">

export default defineComponent({
  data() {
    return {
      id: useRoute().params.id,
    }
  }
})
</script>

<template>
  <div class="note-card">Edit {{id}}</div>
</template>

<style scoped>

</style>