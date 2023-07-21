const noNotes = document.querySelector(".null__notes");
const noteBox = document.querySelector(".cards__box");

const generateNotes = function (notes) {
  noteBox.innerHTML = "";
  notes.forEach((note) => {
    html = `
    <div class="card__item">
          <div class="card__title">
            <h4>${note.title}</h4>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="card__icon card__delete"
              viewBox="0 0 512 512"
              onclick="deleteNote(${note.id})"
            >
              <path
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="32"
                d="M368 368L144 144M368 144L144 368"
              />
            </svg>
          </div>
          <p class="card__text">
          ${note.text}
          </p>
        </div>
    `;
    noteBox.innerHTML += html;
  });
};

const setLocalStorage = (notes) =>
  localStorage.setItem("notes", JSON.stringify(notes));

const getLocalStorage = () => JSON.parse(localStorage.getItem("notes"));

const init = function () {
  const hasLocalStorage = getLocalStorage();
  noNotes.style.display = hasLocalStorage ? "none" : "block";

  const notes = hasLocalStorage ? hasLocalStorage : [];
  if (notes.length > 0) {
    generateNotes(notes);
  } else {
    noteBox.innerHTML = "";
  }
};

const deleteNote = function (id) {
  const notes = getLocalStorage();
  const updatedNotes = notes.filter((note) => note.id !== id);
  localStorage.removeItem("notes");
  if (updatedNotes.length > 0) {
    setLocalStorage(updatedNotes);
  }
  init();
};

document.addEventListener("DOMContentLoaded", init);
