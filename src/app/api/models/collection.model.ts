import { BaseModel } from "./basemodel";

export class Collection extends BaseModel {
    userId: string;
    animeId: number;
    constructor(id: string, userId: string, animeId: number) {
        super(id);
        this.userId = userId;
        this.animeId = animeId;
    }
    save(): void {
        console.log("Favorites berhasil disimpan");
    }
}