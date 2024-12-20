import {defineStore} from "pinia";
import type {INote} from "~/models/note-models";

export const useNotesStore = defineStore('notesStore', {
    state: () => ({
           notes: [] as INote[],
    }),
    getters: {},
    actions: {
        addNewNote (note: INote) {
            console.log('note', note);
            this.notes.push(note);
        }
    }
})