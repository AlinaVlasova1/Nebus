<script lang="ts">

export default defineComponent({
  name: "NoteCard",
  props: ['note'],
  methods: {
    goToNoteEditPage() {
      this.$router.push({ path: `/notes/${this.note.id}` });
    }
  }
})
</script>

<template>
  <div class="note-card">
    <div class="note-card__inner">
      <div class="note-card__description">
        <h1 class="note-card__title">{{note.title}}</h1>
        <div v-for="(todo, index) in note.toDo">
          <span v-if="(index + 1) < 4">{{index+1}}.  {{todo.description}}</span>
        </div>
      </div>
      <div class="note-card__button-container">
        <button class="note__button-edit" @click="goToNoteEditPage()">Редактировать</button>
      </div>
      <button class="note__button-delete" @click="$emit('triggeredDeleteWindow', note.id)">
        <img class="window__trash_bin" src="public/icon/trash_bin.svg" alt="trash_bin">
      </button>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap');

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
    margin-right: 0;
  }

  .note-card__button-container {
    margin-left: auto;
    margin-right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .note__button-edit {
    background-color: #0d8901;
    border: none;
    color: white;
    font-family: "Montserrat", serif;
    font-weight: 500;
    padding: 15px;
    border-radius: 4px;
  }

  @media (380px <= width <= 555px) {

    .note-card__inner {
      display: block;
    }

    .note-card__button-container {
      display: inline-block;
      margin-top: 20px;
    }

    .note__button-delete {
      margin-left: 10px;
      display: inline-block;
      height: 46px;
      margin-top: 20px;
    }

    .window__trash_bin {
      vertical-align: middle;
    }
  }

  @media (0 <= width <= 380px) {

    .note-card__inner {
      display: block;
    }

    .note-card__button-container {
      display: inline-block;
      margin-top: 20px;
      width: 100%;
    }

    .note__button-edit {
      width: 100%;
    }

    .note__button-delete {
      margin-left: 0;
      display: inline-block;
      height: 46px;
      margin-top: 20px;
      width: 100%;
    }

    .window__trash_bin {
      vertical-align: middle;
    }
  }
</style>