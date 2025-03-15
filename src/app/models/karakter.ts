import { BaseModel } from "./basemodel";


export class Karakter extends BaseModel {
    name: string | null;
    imageUrl: string | null;
    role: string | null;
    cover: string | null;
    
    constructor(id:string,name:string, imageUrl:string, role:string, cover:string) {
        super(id);
        this.name = name;
        this.imageUrl = imageUrl;
        this.role = role;
        this.cover = cover;
    }

    save(): void {
        console.log("Karakter berhasil disimpan");
    }
}