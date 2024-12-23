<script lang="ts">

import {useNotesStore} from "~/store/notes-store";
import type {INote, IToDo} from "~/models/note-models";
import {deepClone} from "@vue/devtools-shared";

export default defineComponent({
  setup() {
    const notesStore = useNotesStore();
    const id = Number(useRoute().params.id);
    const noteObj = reactive({note: deepClone(notesStore.getNoteBuId(id))}) ;
    const originalNote: INote | undefined  = deepClone(notesStore.getNoteBuId(id));
    return {
      notesStore,
      id,
      noteObj,
      originalNote
    }
  },
  data() {
    return {
      isTriggeredWindow: false as boolean,
      noteChangeArray: [] as INote[],
      todosChangeArray: [] as IToDo[][]
    }
  },
  methods: {
    saveNote() {
      if (this.noteObj.note) {
        this.notesStore.changeNote(this.noteObj.note);
        this.$router.push({ path: `/` });
      }
    },
    removeChangesNote() {
      if (this.noteObj.note && this.originalNote) {
        this.noteObj.note = structuredClone(toRaw(this.originalNote));
        this.noteChangeArray = [];
        this.todosChangeArray = [];
      }
    },
    deleteToDo(id: number) {
      this.noteObj.note?.toDo.filter((el) => el.id !== id);
      if (this.noteObj.note) {
        this.noteChangeArray.push(structuredClone(toRaw(this.noteObj.note)));
        this.todosChangeArray.push(structuredClone(toRaw(this.noteObj.note?.toDo)));
      }
    },
    addToDoInNote() {
      if (this.noteObj.note) {
        this.noteObj.note.toDo.push({description: '', id: this.noteObj.note.toDo.length + 1, isCompleted: false});
        this.noteChangeArray.push(structuredClone(toRaw(this.noteObj.note)));
        this.todosChangeArray.push(structuredClone(toRaw(this.noteObj.note?.toDo)));
      }
    },
    removeChangeNote() {
      this.noteChangeArray.pop();
      if (this.noteChangeArray.length === 0) {
        this.noteObj.note = deepClone(this.originalNote);
        this.noteChangeArray = [];
      } else {
        this.noteObj.note = structuredClone(structuredClone(toRaw(this.noteChangeArray[this.noteChangeArray.length - 1])));
      }
    },
    repeatCanceledChangeWithToDo() {
      if (this.noteObj.note && this.todosChangeArray.length !== 0) {
        this.noteObj.note.toDo = structuredClone(toRaw((this.todosChangeArray[this.todosChangeArray.length - 1])));
        this.todosChangeArray.pop();
      }
    },
    changeNote() {
      if (this.noteObj.note) {
        this.noteChangeArray.push(structuredClone(toRaw(this.noteObj.note)));
        this.todosChangeArray.push(structuredClone(toRaw(this.noteObj.note?.toDo)));
      }
    }
  }
})
</script>

<template>
  <div class="note-page">
    <div class="note-page__container">
      <h1 class="note-page__title">Редактирование заметки</h1>
      <div class="note-page__title-block" v-if="noteObj.note?.title">
        <div>
          <span class="note-page__label">Заголовок заметки</span>
          <input class="note-page__title-note" v-model="noteObj.note.title" >
        </div>
      </div>
      <div class="note-page__todo" v-for="(todo, index) in noteObj.note?.toDo" :key="index">
        <input class="note-page__checkbox"
               type="checkbox"
               v-model="todo.isCompleted"
               @click="todo.isCompleted = !todo.isCompleted;changeNote()">
        <textarea class="note-page__textarea"
                  @blur="changeNote()"
                  v-model="todo.description"></textarea>
        <button class="note-page__button-delete" @click="deleteToDo(todo.id)">
          <img class="note-page__trash_bin" src="public/icon/trash_bin.svg" alt="trash_bin">
        </button>
      </div>
      <button class="note-page__button-add-todo" @click="addToDoInNote()">Добавить пункт в ToDo</button>
      <div class="note-page__buttons">
        <button class="note-page__button-save" @click="saveNote()">Сохранить</button>
        <button class="note-page__button-remove-change"
                @click="removeChangeNote()"
                :disabled="noteChangeArray.length === 0">Отменить внесенное изменение</button>
        <button class="note-page__button-remove-all-changes" @click="isTriggeredWindow = true">Отменить редактирование</button>
        <button class="note-page__button-repeat-change"
                @click="repeatCanceledChangeWithToDo()"
                :disabled="todosChangeArray.length ===0">Повторить отмененное изменение с ToDo</button>

      </div>
    </div>
  </div>
  <AgreementWindow v-if="isTriggeredWindow"
                   @remove-changes="removeChangesNote()"
                   @close-window="isTriggeredWindow = false"></AgreementWindow>
</template>

<style>

  html, body {
    height: 100%;
    margin: 0;
  }

  #__nuxt {
    height: 100%;
  }

  .note-page {
    height: 100%;
    background-color: rgb(95, 134, 181);
    display: block;
  }

  .note-page__container {
    padding-top: 40px;
    margin-right: auto;
    margin-left: auto;
    width: 60%;
  }

  .note-page__todo {
    display: flex;
    margin-left: 180px;
    margin-bottom: 10px;
  }

  .note-page__checkbox {
    border: none;
    border-radius: 10px;
    height: 20px;
    width: 20px;
    margin-right: 10px;
  }

  .note-page__textarea {
    border: none;
    border-radius: 4px;
    width: 100%;
    height: 50px;
    padding: 10px;
  }

  .note-page__button-save {
    border: none;
    background-color: #0069B4;
    color: #fff;
    height: 40px;
    padding-left: 20px;
    padding-right: 20px;
    border-radius: 4px;
    display: block;
    margin-top: 30px;
  }

  .note-page__label {
    color: white;
    font-family: "Montserrat", serif;
    font-size: 18px;
    margin-bottom: 3px;
    display: block;
  }

  .note-page__title-block {
    display: flex;
    margin-left: 214px;
    margin-bottom: 40px;
    margin-top: 40px;
  }

  .note-page__title-note {
    font-family: "Montserrat", serif;
    color: black;
    border: none;
    border-radius: 4px;
    padding: 10px;
  }

  .note-page__title {
    font-family: "Montserrat", serif;
    color: white;
    text-align: center;
  }

  .note-page__button-remove-change {
    border: none;
    background-color: #f6fc0a;
    color: black;
    height: 40px;
    padding-left: 20px;
    padding-right: 20px;
    border-radius: 4px;
    display: block;
    margin-top: 30px;
  }

  .note-page__button-remove-all-changes {
    border: none;
    background-color: #b40000;
    color: black;
    height: 40px;
    padding-left: 20px;
    padding-right: 20px;
    border-radius: 4px;
    display: block;
    margin-top: 30px;
  }

  .note-page__button-repeat-change {
    border: none;
    background-color: #d95406;
    color: black;
    height: 40px;
    padding-left: 20px;
    padding-right: 20px;
    border-radius: 4px;
    display: block;
    margin-top: 30px;
  }

  .note-page__buttons {
    display: flex;
    justify-content: space-evenly;
  }

  .note-page__button-delete {
    background-color: rgb(95, 134, 181);
    border: none;
    margin-right: 0;
  }

  .note-page__button-add-todo {
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
    margin-left: 214px;
  }

  @media (1378px <= width < 1499px) {

    .note-page__buttons {
      display: block;
      margin-left: 214px;
    }
  }

  @media (741px <= width <= 1378px) {

    .note-page__title-block {
      margin-left: 34px;
    }

    .note-page__todo {
      margin-left: 0;
    }

    .note-page__button-add-todo {
      margin-left: 34px;
    }

    .note-page__buttons {
      display: block;
      margin-left: 34px;
    }
  }

  @media (643px <= width <= 741px) {

    .note-page__title {
      text-align: left;
      margin-left: 34px;
    }

    .note-page__title-block {
      margin-left: 34px;
    }

    .note-page__todo {
      margin-left: 0;
    }

    .note-page__button-add-todo {
      margin-left: 34px;
    }

    .note-page__buttons {
      display: block;
      margin-left: 34px;
    }
  }

  @media (443px <= width <= 643px) {

    .note-page__container {
      width: 80%;
    }

    .note-page__title {
      text-align: left;
      margin-left: 34px;
    }

    .note-page__title-block {
      margin-left: 34px;
    }

    .note-page__todo {
      margin-left: 0;
    }

    .note-page__button-add-todo {
      margin-left: 34px;
    }

    .note-page__buttons {
      display: block;
      margin-left: 34px;
    }
  }

  @media (0 <= width <= 443px) {

    .note-page__container {
      width: 90%;
    }

    .note-page__title {
      text-align: left;
      margin-left: 34px;
    }

    .note-page__title-block {
      margin-left: 34px;
    }

    .note-page__todo {
      margin-left: 0;
    }

    .note-page__button-add-todo {
      margin-left: 34px;
    }

    .note-page__buttons {
      display: block;
      margin-left: 34px;
    }
  }
</style>