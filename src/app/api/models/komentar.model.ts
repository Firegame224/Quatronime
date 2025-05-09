import { BaseModel } from "./basemodel";

export class Komentar extends BaseModel {
    animeId: number;
    userId: string;
    name: string;
    image: string;
    komentar: string;

    constructor (id: string, animeId: number, userId: string, name: string, image: string, komentar: string) {
        super(id);
        this.animeId = animeId;
        this.userId = userId;
        this.name = name;
        this.image = image;
        this.komentar = komentar;
    }

    save(): void {
        console.log("Komentar berhasil disimpan");
    }
}