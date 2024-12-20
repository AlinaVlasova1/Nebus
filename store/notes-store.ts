import {defineStore} from "pinia";
import type {INote} from "~/models/note-models";

export const useNotesStore = defineStore('notesStore', {
    state: () => ({
           notes: [] as INote[],
    }),
    getters: {},
    actions: {
        addNewNote (note: INote) {
            this.notes.push(note);
        },
        deleteNote (id: number) {
            this.notes = this.notes.filter((note) => note.id !== id);
        }
    }
})