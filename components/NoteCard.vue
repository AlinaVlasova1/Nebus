<script lang="ts">

export default defineComponent({
  name: "NoteCard",
  props: ['note']
})
</script>

<template>
  <div class="note-card" >
    <div class="note-card__inner">
      <div>
        <h1 class="note-card__title">{{note.title}}</h1>
        <div v-for="(todo, index) in note.toDo">
          <span v-if="(index + 1) < 4">{{index+1}}.  {{todo.description}}</span>
        </div>
      </div>
      <button class="note__button-delete" @click="">
        <img class="window__trash_bin" src="public/icon/trash_bin.svg" alt="trash_bin">
      </button>
    </div>
  </div>
</template>

<style scoped>

  .note-card {
    background-color: rgb(95, 134, 181);
    color: white;
    display: inline-block;
    width: 100%;
    margin-top: 20px;
    border-radius: 10px;
  }

  .note-card__inner {
    margin: 20px;
    display: flex;
  }

  .note-card__title {
    font-family: "Montserrat", serif;
  }

  .note__button-delete {
    background-color: rgb(95, 134, 181);
    border: none;
    margin-left: auto;
    margin-right: 0;
  }
</style>