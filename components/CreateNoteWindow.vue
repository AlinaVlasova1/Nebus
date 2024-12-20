<script lang="ts">

import {useNotesStore} from "~/store/notes-store";
import type {IToDo} from "~/models/note-models";

export default defineComponent({
  name: "CreateNoteWindow",
  setup() {
    const notesStore = useNotesStore();
    return {
      notesStore
    }
  },
  data() {
    return {
      noteName: '' as string,
      toDosArray: [{
        description: '',
        isCompleted: false,
        id: 1}] as IToDo[]
    }
  },
  methods: {
    deleteElement(id: number) {
      this.toDosArray = [...this.toDosArray.filter((el) => el.id !== id)];
    },
    createNewNote() {
      console.log('createNewNote');
      const note = {
        id: this.notesStore.notes.length + 1,
        title: this.noteName,
        toDo: [...this.toDosArray]
      }
      this.notesStore.addNewNote(note);
      this.$emit('close');
      console.log('this.notesStore.notes', this.notesStore.notes);
    }
  }
})
</script>

<template>
  <div class="window">
    <div class="window__inner">
      <button class="window__button-close" @click="$emit('close')">
        <img class="window__icon-close" src="public/icon/cross.svg" alt="cross">
      </button>
      <h1 class="window__title">Создание заметки</h1>
      <form class="window__form">
        <div class="window__field">
          <label class="window__label" for="title">Имя заметки</label>
          <input class="window__input" v-model="noteName"  placeholder="Введите имя заметки" required>
        </div>
        <span class="window__text">ToDo:</span>
        <div class="window__field" v-for="(toDo, i) in toDosArray">
          <label class="window__label" for="toDo">Описание ToDo</label>
          <div class="window__todo-description">
            <textarea class="window__textarea" v-model="toDosArray[i].description"  placeholder="Введите имя ToDo" required></textarea>
            <button class="window__button-delete" @click="deleteElement(toDosArray[i].id)">
              <img class="window__trash_bin" src="public/icon/trash_bin.svg" alt="trash_bin">
            </button>
          </div>
        </div>
      </form>
      <div class="window__buttons">
        <button class="window__button-add"
                @click="toDosArray.push({description: '', id: toDosArray.length + 1, isCompleted: false})">Добавить еще ToDo</button>
        <button class="window__button-create" @click="createNewNote()">Создать заметку</button>
      </div>
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
    height: 672px;
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


  .window__label {
    display: block;
    color: white;
    font-family: "Montserrat", serif;
    font-size: 18px;
    margin-bottom: 3px;
  }

  .window__input {
    font-family: "Montserrat", serif;
    border-radius: 4px;
    border: none;
    height: 30px;
    padding-left: 10px;
    width: 80%;
  }

  .window__text {
    color: white;
    font-family: "Montserrat", serif;
    font-size: 30px;
    margin-top: 40px;
    margin-bottom: 15px;
    display: block;
  }

  .window__todo-description {
    display: flex;
  }

  .window__textarea {
    font-family: "Montserrat", serif;
    width: 100%;
    border-radius: 4px;
    padding: 10px;
  }

  .window__button-delete {
    margin-left: 10px;
    background: rgb(95, 134, 181);
    border: none;
  }

  .window__buttons {
    display: flex;
  }

  .window__button-add {
    font-family: "Montserrat", serif;
    height: 40px;
    font-weight: 500;
    border: none;
    border-radius: 4px;
    padding-left: 10px;
    padding-right: 10px;
    margin-top: 20px;
    background-color: #0069B4;
    color: #fff;
  }

  .window__button-create {
    font-family: "Montserrat", serif;
    height: 40px;
    font-weight: 500;
    border: none;
    border-radius: 4px;
    padding-left: 10px;
    padding-right: 10px;
    margin-top: 20px;
    background-color: #0d8901;
    color: #fff;
    margin-left: auto;
    margin-right: 0;
  }
</style>