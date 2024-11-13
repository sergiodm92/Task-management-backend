export class TagHasAssociatedTasksError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'TagHasAssociatedTasksError';
    }
}
