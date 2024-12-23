<script lang="ts">

import {useNotesStore} from "~/store/notes-store";
import {NoteCard} from "#components";

export default defineComponent({
  components: {
    NoteCard
  },
  setup() {
    const notesStore = useNotesStore();
    const noteId = reactive({id: null as null | number})
    return {
      notesStore,
      noteId
    }
  },
  data() {
    return {
      isTriggeredCreateWindow: false as boolean,
      isTriggeredAgreementDeleteNoteWindow: false as boolean,
    }
  },
  methods: {
    openDeleteNoteWindow(id: number) {
      this.isTriggeredAgreementDeleteNoteWindow = true;
      this.noteId.id = id;
    }
  }
})
</script>

<template>
  <div class="main-block">
    <div class="main-block__buttons-style">
      <button  class="main-block__button-create" @click="isTriggeredCreateWindow = true">Создать заметку</button>
    </div>
    <div class="main-block__notes" v-if="notesStore.notes.length > 0">
      <NoteCard v-for="note in notesStore.notes" :key="note.id" :note="note" @triggered-delete-window="openDeleteNoteWindow"></NoteCard>
    </div>
  </div>
  <CreateNoteWindow v-if="isTriggeredCreateWindow" @close="isTriggeredCreateWindow = false"></CreateNoteWindow>
  <AgreementDeleteNoteWindow v-if="isTriggeredAgreementDeleteNoteWindow"
  @close-deleteWindow="isTriggeredAgreementDeleteNoteWindow = false" :id="noteId.id"></AgreementDeleteNoteWindow>
</template>

<style scoped>

  .main-block {
    padding: 40px 80px;
    box-sizing: border-box;
  }

  .main-block__buttons-style {
    display: flex;
  }

  .main-block__button-create {
    margin-right: 0;
    margin-left: auto;
    border: none;
    background-color: #0069B4;
    color: #fff;
    height: 40px;
    padding-left: 20px;
    padding-right: 20px;
    border-radius: 4px;
  }

  .main-block__notes {
    margin-top: 20px;
  }

</style>