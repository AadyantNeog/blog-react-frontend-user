import { createRoot } from 'react-dom/client'
import { Navigate } from 'react-router-dom';
import { createBrowserRouter, RouterProvider } from "react-router";
import { AllPosts } from './components/AllPosts.jsx';
import { PostPage } from './components/PostPage.jsx';
import { SignUpForm } from './components/SignUpForm.jsx';
import { LoginForm } from './components/LoginForm.jsx';
import { PostForm } from './components/PostForm.jsx';
import { ProfilePage } from './components/ProfilePage.jsx';
import './styles.css';
const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" />
  },
  {
    path: "/post",
    element: <PostForm />
  },
  {
    path: "/posts",
    element: <AllPosts />,
  },
  {
    path: "/posts/:postid",
    element: <PostPage />
  },
  {
    path: "/profile",
    element: <ProfilePage />
  },
  {
    path: "/signup",
    element: <SignUpForm />
  },
  {
    path: "/login",
    element: <LoginForm />
  }
]);


createRoot(document.getElementById("root")).render(
    <RouterProvider router={router} />
);
