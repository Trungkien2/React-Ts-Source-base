export interface Iuser {
  username?: string;
  email: string;
  token?: string;
  password?: string;
  bio?: string;
}

export interface IUarticle {
  title: string;
  description: string;
  body: string;
  tagList: [string];
}

export interface Icomment {
  body: string;
}
