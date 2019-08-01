class UI {
  constructor() {
    this.post = document.querySelector("#posts");
    this.card = document.querySelector("#post-card");
    this.titleInput = document.querySelector("#title");
    this.bodyInput = document.querySelector("#body");
    this.idInput = document.querySelector("#id");
    this.postSubmit = document.querySelector(".post-submit");
    this.postUpdate = document.querySelector(".post-update");
    this.cancelPostUpdate = document.querySelector(".cancel-post-update");
    this.alertBox = document.querySelector(".alert");
    this.forState = "add";
  }

  showAlert(msg, color) {
    // reset bg color
    ui.alertBox.style.background = "";
    // add msg as text
    ui.alertBox.innerHTML = `<p>${msg.toUpperCase()}</p>`;
    // slide into view
    ui.alertBox.style.top = "0%";
    // change bg color
    if (color) ui.alertBox.style.background = color;
    // slide out of view
    setTimeout(() => {
      ui.alertBox.style.top = "-10%";
    }, 2000);
  }

  showPosts(posts) {
    let output = "";
    posts.forEach(post => {
      output += `
        <div class="card mb-3">
          <div class="card-body">
            <h4 class="card-title">${post.title}</h4>
            <p class="card-text">${post.body}</p>
            <a href="#" class="edit card-link" data-id="${post.id}">
                <i class="fa fa-pencil"></i>
            </a>
            &nbsp;&nbsp;
            <a href="#" class="delete card-link" data-id="${post.id}">
                <i class="fa fa-remove"></i>
            </a>
          </div>
        </div>
    `;
    });
    this.post.innerHTML = output;

    // clear input values
    this.titleInput.value = "";
    this.bodyInput.value = "";
  }

  showEdit(data) {
    this.titleInput.value = data.title;
    this.bodyInput.value = data.body;
    this.idInput.value = data.id;
    this.postSubmit.style.display = "none";
    this.postUpdate.style.display = "block";
    this.cancelPostUpdate.style.display = "block";
  }

  clearEditState(data) {
    this.titleInput.value = "";
    this.bodyInput.value = "";
    this.idInput.value = "";
    this.postSubmit.style.display = "block";
    this.postUpdate.style.display = "none";
    this.cancelPostUpdate.style.display = "none";
  }
}

export const ui = new UI();
