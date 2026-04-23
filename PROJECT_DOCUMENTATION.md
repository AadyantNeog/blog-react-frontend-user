# Blog Frontend Documentation

## Overview

This frontend is a React + Vite client for `The React Forum`.

It provides the user-facing interface for:

- signup
- login
- viewing all posts
- viewing a single post
- creating posts
- creating comments
- liking and unliking posts on the single post page
- liking and unliking comments on the single post page
- viewing the logged-in user's own posts on a profile page
- logging out

## Tech Stack

- React
- React Router
- Vite
- plain CSS

## Folder Structure

### `src/main.jsx`

Application entry point.

Contains:

- router creation
- route definitions
- app bootstrapping through `createRoot`

Current routes:

- `/login`
- `/signup`
- `/posts`
- `/posts/:postid`
- `/post`
- `/profile`

### `src/styles.css`

Global styling for the whole frontend.

Contains styles for:

- page layout
- mastheads and section headers
- posts and comments
- forms
- buttons and links
- session navigation
- responsive behavior

### `src/utils/auth.js`

Contains auth helper utilities.

Functions:

- `getStoredToken`
- `clearSession`
- `readUserFromToken`

Purpose:

- read JWT token from local storage
- clear token/session data on logout
- decode token payload in the browser so UI can show logged-in user navigation

## Component Documentation

### `src/components/AllPosts.jsx`

All posts page.

Responsibilities:

- fetches all posts from the backend
- shows posts as stacked cards
- shows like counts
- includes navigation and a create-post button

Important note:

- likes are displayed here, but users cannot like/unlike from this page

### `src/components/PostPage.jsx`

Single post page.

Responsibilities:

- fetches one post and its comments
- allows liking/unliking the post
- allows liking/unliking comments
- renders the comment form
- shows the `Back to all posts` link

### `src/components/Post.jsx`

Reusable post display component.

Used for:

- post previews on the all-posts page
- full post display on the single post page
- post previews on the profile page

Supports:

- showing title, author, timestamp, and content
- showing like counts
- optional like button through `showLikeButton`

### `src/components/Comment.jsx`

Reusable comment display component.

Supports:

- comment author and timestamp
- comment content
- comment like count
- optional like/unlike action

### `src/components/SubmitComment.jsx`

Comment creation form.

Responsibilities:

- sends comment text to the backend
- includes the auth token
- updates the current page comment list after success

### `src/components/PostForm.jsx`

Create post page.

Responsibilities:

- submits a new post to the backend
- redirects to the newly created post page
- includes navigation back to all posts

### `src/components/LoginForm.jsx`

Login page.

Responsibilities:

- submits email and password
- stores the JWT token in local storage
- clears older session state before saving the new token
- redirects to `/posts` after success

### `src/components/SignUpForm.jsx`

Signup page.

Responsibilities:

- sends new account data to the backend
- redirects to `/login` after success

### `src/components/ProfilePage.jsx`

Profile page for the logged-in user.

Responsibilities:

- fetches posts from `GET /me/posts`
- shows the current user's username
- lists only that user's posts
- redirects guests to `/login`

### `src/components/SessionNav.jsx`

Shared signed-in navigation.

Responsibilities:

- shows `All posts`
- shows `My profile` for logged-in users
- highlights the active route
- provides the logout button

Variants:

- masthead version for page headers
- inline version for tighter layouts if needed

## Authentication Behavior

### Token Storage

JWT token is stored in:

- `localStorage.token`

### Logged-in UI Behavior

When the token exists:

- protected API calls send `Authorization: Bearer <token>`
- the profile page becomes usable
- logout button is shown
- backend can return `liked_by_user`

### Logout Behavior

Logout is handled in `SessionNav`.

Current logout actions:

- removes the token from local storage
- clears session storage
- redirects the user to `/login`

## Pages and User Flow

### Signup flow

1. user opens `/signup`
2. submits account details
3. app redirects to `/login`

### Login flow

1. user opens `/login`
2. submits email and password
3. app stores token
4. app redirects to `/posts`

### Post creation flow

1. user opens `/post`
2. submits title and content
3. backend creates the post
4. app redirects to `/posts/:postid`

### Comment flow

1. user opens a single post page
2. submits a comment
3. page appends the new comment to local UI state

### Like flow

For posts:

- like/unlike is available only on the single post page

For comments:

- like/unlike is available on the single post page comment list

For all-posts page:

- like counts are visible
- like action is intentionally disabled there

## Data Used By The Frontend

Common post fields used in components:

- `id`
- `title`
- `content`
- `username`
- `created_at`
- `likes_count`
- `liked_by_user`

Common comment fields used in components:

- `id`
- `content`
- `username`
- `created_at`
- `likes_count`
- `liked_by_user`

## Styling Notes

The UI currently uses:

- a serif-heavy editorial layout
- stacked post cards on the all-posts page
- boxed action buttons
- responsive layout for smaller screens

Even though the visual style has an editorial look, the text content has been updated to match a blog/forum product.

## Current Feature Summary

Implemented:

- signup
- login
- logout
- all-posts feed
- single post page
- create post
- comment creation
- post likes
- comment likes
- profile page
- active navigation state

Not yet implemented:

- edit/delete UI
- nested comment replies UI
- profile editing
- who-liked lists
- route guards for every page based on auth state
- toast notifications / polished error handling

## How Frontend Connects To Backend

The frontend currently calls the backend at:

- `http://localhost:3000`

Examples:

- `GET /posts`
- `POST /login`
- `POST /posts`
- `GET /me/posts`
- `POST /posts/:postid/like`
- `POST /posts/:postid/comments/:commentid/like`

## Maintenance Notes

If you add or change features later, update:

- route list in `src/main.jsx`
- this documentation file
- fetch URLs and response handling in relevant components
- backend documentation if API behavior changes
