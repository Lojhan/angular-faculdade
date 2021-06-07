export class Post {
    _id: number;
    title: string;
    subtitle: string;
    text: string;

    constructor(
        id: number = 0,
        title: string,
        subtitle: string,
        text: string,
    ){
        this._id = id;
        this.title = title;
        this.subtitle = subtitle;
        this.text = text;
    }

    createObject(){
        return {
            title: this.title,
            subtitle: this.subtitle,
            text: this.text,
        }
    }
  }
  