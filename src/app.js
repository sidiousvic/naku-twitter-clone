import { http } from "./http";
import { ui } from "./ui";

// SELECTORS
// post submit button
let submitButton = document.querySelector(".post-submit");
let deletePostButton = document.querySelector;

// LISTENERS
// get posts on DOM load
document.addEventListener("DOMContentLoaded", getPosts);
// on post button submit
submitButton.addEventListener("click", submitPost);

// get posts from db.json
function getPosts() {
  http
    .get("http://localhost:3000/posts")
    .then(data => ui.showPosts(data))
    .catch(err => console.log(err));
}

function submitPost() {
  let title = document.querySelector("#title").value;
  let body = document.querySelector("#body").value;
  if (!title || !body) {
    ui.showAlert("Please fill both title and body");
    return;
  }
  const data = { title, body };

  http
    .post("http://localhost:3000/posts", data)
    .then(data => {
      getPosts();
    })
    .catch(err => console.log(err));
}
