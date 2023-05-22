import { Router } from "../util";

import userApi from "./userApi";
import authApi from "./AuthApi";
import articleApi from "./ArticleApi";

const UserApi = new userApi(Router.USERS);
const AuthApi = new authApi(Router.AUTH);
const Article = new articleApi(Router.ARTICLE);

export { UserApi, AuthApi, Article };
