import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router";
import App from './App.jsx'
import { PostPage } from './components/PostPage.jsx';
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/posts/:postid",
    element: <PostPage />
  },
]);


createRoot(document.getElementById("root")).render(
    <RouterProvider router={router} />
);
