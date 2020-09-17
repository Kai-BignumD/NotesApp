document.addEventListener("DOMContentLoaded", function () {
  const notes = JSON.parse(localStorage.getItem("notes"));
  const addBtn = document.getElementById("add");

  if (notes) {
    notes.forEach((note) => {
      addNewNote(note);
    });
  }

  function addNewNote(text) {
    const note = document.createElement("div");
    note.classList.add("note");

    note.innerHTML = `
        <div class="notes">
            <div class="toolbar">
                <button class="edit"><i class="fa fa-edit"></i></button>
                <button class="delete"><i class="fas fa-trash-alt"></i></button>
            </div>
            <div class="main hidden"></div>
            <textarea></textarea>
        </div>
        `;

    const notesEl = note.querySelector(".notes");
    const editBtn = note.querySelector(".edit");
    const deleteBtn = note.querySelector(".delete");
    const main = notesEl.querySelector(".main");
    const textArea = notesEl.querySelector("textarea");
    textArea.value = text;
    main.innerHTML = marked(text);

    editBtn.addEventListener("click", () => {
      main.classList.toggle("hidden");
      textArea.classList.toggle("hidden");
    });

    deleteBtn.addEventListener("click", () => {
      note.remove();
      updateLS();
    });

    textArea.addEventListener("input", (e) => {
      const { value } = e.target;

      main.innerHTML = marked(value);

      updateLS();
    });

    document.body.appendChild(note);
  }

  addBtn.addEventListener("click", () => {
    addNewNote("");
  });

  function updateLS() {
    const notesText = document.querySelectorAll("textarea");
    const notes = [];
    notesText.forEach((note) => {
      notes.push(note.value);
    });

    localStorage.setItem("notes", JSON.stringify(notes));
  }
});
