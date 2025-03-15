export abstract class BaseModel {
    id:string;
    createdAt: Date;
    updatedAt: Date;
    constructor(id:string) {
        this.id = id;
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }

    abstract save():void;
}