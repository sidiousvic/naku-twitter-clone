import { http } from "./http";
import { ui } from "./ui";

// SELECTORS
// post submit button
let submitButton = document.querySelector(".post-submit");
let updateButton = document.querySelector(".post-update");
let cancelUpdateButton = document.querySelector(".cancel-post-update");
let posts = document.querySelector("#posts");

// LISTENERS
// get posts on DOM load
document.addEventListener("DOMContentLoaded", getPosts);
// on post button submit
submitButton.addEventListener("click", submitPost);
// on post update button submit
updateButton.addEventListener("click", updatePost);
// on cancel post update button submit
cancelUpdateButton.addEventListener("click", cancelUpdatePost);
// on delete button click
posts.addEventListener("click", deletePost);
// on edit button click
posts.addEventListener("click", editPostOn);

// get posts from db.json
function getPosts() {
  http
    .get("http://localhost:3000/posts")
    .then(data => ui.showPosts(data))
    .then(() => console.log("UI posts loaded!"))
    .catch(err => console.log(err));
}

function submitPost() {
  const title = document.querySelector("#title").value;
  const body = document.querySelector("#body").value;
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

function deletePost(e) {
  const deleteLink = e.target.parentElement;
  const id = deleteLink.dataset.id;
  if (deleteLink.classList.contains("delete")) {
    console.log(id);
    http
      .delete(`http://localhost:3000/posts/${id}`)
      .then(data => {
        ui.showAlert("投稿は削除されました", "limegreen");
        getPosts();
      })
      .catch(err => console.log(err));
  }
  e.preventDefault();
}

function editPostOn(e) {
  const editLink = e.target.parentElement;
  console.log(editLink);
  if (editLink.classList.contains("edit")) {
    const id = editLink.dataset.id;
    const title =
      editLink.previousElementSibling.previousElementSibling.textContent;
    const body = editLink.previousElementSibling.textContent;
    const data = {
      id: id,
      title: title,
      body: body
    };
    console.log(data);
    ui.showEdit(data);
  }
  e.preventDefault();
}

function updatePost(e) {
  const title = document.querySelector("#title").value;
  const body = document.querySelector("#body").value;
  const id = document.querySelector("#id").value;
  if (!title || !body) {
    ui.showAlert("タイトルと本文を記入してください", "orangered");
    return;
  }
  const data = { title, body };
  http
    .put(`http://localhost:3000/posts/${id}`, data)
    .then(data => {
      getPosts();
    })
    .catch(err => console.log(err));
  ui.showAlert("投稿は更新されました!", "limegreen");
  ui.clearEditState();
}

function cancelUpdatePost(e) {
  ui.clearEditState();
}

// 投稿は更新されました post updated
// 投稿は編集されました post deleted
