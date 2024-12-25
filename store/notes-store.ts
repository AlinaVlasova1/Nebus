import {defineStore} from "pinia";
import type {INote} from "~/models/note-models";

export const useNotesStore = defineStore('notesStore', {
    state: () => ({
           notes: [] as INote[],
    }),
    getters: {
        getNoteBuId: (state) => {
            return (id: number) => state.notes.find((note) => note.id === id);
        }
    },
    actions: {
        addNewNote (note: INote) {
            this.notes.push(note);
        },
        deleteNote (id: number) {
            this.notes = this.notes.filter((note) => note.id !== id);
        },
        changeNote (note: INote) {
            this.notes = this.notes.map((el) => {
                if (el.id === note.id) {
                    el = note;
                }
                return el;
            });
        }
    }
})