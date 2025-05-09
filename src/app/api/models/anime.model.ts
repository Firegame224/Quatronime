import { BaseModel } from "./basemodel";

export class Anime extends BaseModel {
    title: string;
    imageUrl: string;
    source: string;
    ranking: number;
    type : string;
    episodes : number;
    popularity : number;
    members : number;
    favorites : number;
    score : number;
    status : string;
    aired : string;
    trailer : string;
    synopsis : string;

    constructor(id:string , title : string , imageUrl : string, popularity :number, ranking : number, source : string, type : string, episodes : number, status : string, aired : string, trailer : string, synopsis : string , members : number, favorites : number, score : number) {
        super(id);
        this.title = title;
        this.imageUrl = imageUrl;
        this.source = source;
        this.ranking = ranking;
        this.type = type;
        this.episodes = episodes;
        this.popularity = popularity;
        this.members = members;
        this.favorites = favorites;
        this.score = score;
        this.status = status;
        this.aired = aired;
        this.trailer = trailer;
        this.synopsis = synopsis;
    }

    save(): void {
        console.log("Anime Berhasil disimpan");
    }
}
