import {defineStore} from "pinia";
import type {INote} from "~/models/note-models";

export const useNotesStore = defineStore('notesStore', {
    state: () => {
        return {
           notes: [] as INote[],
        };
    },
})