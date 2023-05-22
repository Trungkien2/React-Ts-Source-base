import { MainView, ArticleView, ArticleDetailView } from "./views";
// import { createBrowserRouter } from "react-router-dom";

const routes = [
  {
    path: "/",
    element: <MainView />,
    authenticated: true,
  },
  {
    path: "/article",
    element: <ArticleView />,
    authenticated: true,
  },
  {
    path: "/article/:slug",
    element: <ArticleDetailView />,
    authenticated: true,
  },
];

export default routes;
