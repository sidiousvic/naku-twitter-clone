import { http } from "./http";
import { ui } from "./ui";

// SELECTORS
// post submit button
let submitButton = document.querySelector(".post-submit");

// LISTENERS
// get posts on DOM load
document.addEventListener("DOMContentLoaded", getPosts);
// on post button submit
submitButton.addEventListener("click", submitPost);
// on delete button click
document.querySelector("#posts").addEventListener("click", deletePost);

// get posts from db.json
function getPosts() {
  http
    .get("http://localhost:3000/posts")
    .then(data => ui.showPosts(data))
    .then(() => console.log("UI posts loaded!"))
    .catch(err => console.log(err));
}

function submitPost() {
  let title = document.querySelector("#title").value;
  let body = document.querySelector("#body").value;
  if (!title || !body) {
    ui.showAlert("タイトルと本文を記入してください", "orangered");
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

async function deletePost(e) {
  e.preventDefault();
  let deleteLink = e.target.parentElement;
  let id = deleteLink.dataset.id;
  if (deleteLink.classList.contains("delete")) console.log(id);
  http
    .delete(`http://localhost:3000/posts/${id}`)
    .then(data => {
      ui.showAlert("投稿は削除されました", "limegreen");
      getPosts();
    })
    .catch(err => console.log(err));
}
