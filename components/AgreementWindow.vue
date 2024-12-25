<script lang="ts">

export default defineComponent({
  name: "AgreementWindow",
  methods: {
    removeChanges() {
      this.$emit('removeChanges');
      this.$emit('closeWindow');
    }
  }
})
</script>

<template>
  <div class="window">
    <div class="window__inner">
      <button class="window__button-close" @click="$emit('closeWindow')">
        <img class="window__icon-close" src="public/icon/cross.svg" alt="cross">
      </button>
      <h1 class="window__title">Вы уверены, что хотите отменить редактирование?</h1>
      <button class="window__button-delete" @click="removeChanges()">Да</button>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap');

.window {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 99;
  background-color: rgba(10, 31, 56, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.window__inner {
  background: rgb(95, 134, 181);
  width: 780px;
  height: 200px;
  border-radius: 40px;
  padding: 40px;
}

.window__button-close {
  background: rgb(95, 134, 181);
  border: none;
  display: block;
  margin-right: 0;
  margin-left: auto;
}

.window__title {
  color: white;
  font-family: "Montserrat", serif;
  text-align: center;
}

.window__button-delete {
  padding: 15px;
  border: none;
  background-color: #0069B4;
  color: white;
  border-radius: 4px;;
  margin-left: auto;
  margin-right: auto;
  display: block;
}


</style>