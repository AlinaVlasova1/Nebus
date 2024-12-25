export interface INote {
    id: number;
    title: string;
    toDo: IToDo[]
}

export interface IToDo {
    id: number;
    isCompleted: boolean;
    description: string;
}