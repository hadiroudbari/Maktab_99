const noNotes = document.querySelector(".null__notes");
const noteBox = document.querySelector(".cards__box");
const tagList = document.querySelector(".tags__list");

const generateNotes = function (notes) {
  noteBox.innerHTML = "";
  notes.forEach((note) => {
    html = `
    <div class="card__item">
          <div class="card__title">
            <h4>${note.title}</h4>

            <a 
            onclick="selectedNote(${note.id})"
            href="./add.html"
            >
              <svg
              xmlns="http://www.w3.org/2000/svg"
              class="card__icon card__edit"
              viewBox="0 0 512 512"
              
              >
              <path
                d="M384 224v184a40 40 0 01-40 40H104a40 40 0 01-40-40V168a40 40 0 0140-40h167.48"
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="32"
              />
              <path
                d="M459.94 53.25a16.06 16.06 0 00-23.22-.56L424.35 65a8 8 0 000 11.31l11.34 11.32a8 8 0 0011.34 0l12.06-12c6.1-6.09 6.67-16.01.85-22.38zM399.34 90L218.82 270.2a9 9 0 00-2.31 3.93L208.16 299a3.91 3.91 0 004.86 4.86l24.85-8.35a9 9 0 003.93-2.31L422 112.66a9 9 0 000-12.66l-9.95-10a9 9 0 00-12.71 0z"
              />
            </svg>
          </a>

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

const generateTags = function (notes) {
  tagList.innerHTML = `
    <li class="tags__item active">
      <a class="tags__link" href="">#all</a>
    </li>
  `;
  tagArr = [];
  notes.forEach((note) => {
    if (!tagArr.includes(note.tag) && note.tag) {
      tagArr.push(note.tag);
    }
  });

  tagArr.forEach((note) => {
    html = `
    <li onclick="showTags('${note}')" class="tags__item">
      <a class="tags__link" href="#">${note}</a>
    </li>
    `;

    tagList.innerHTML += html;
  });
};

const showTags = function (noteTag) {
  const notes = getLocalStorage();
  const notesTag = notes.filter((note) => note.tag === noteTag);

  generateNotes(notesTag);
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
    generateTags(notes);
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

const selectedNote = function (id) {
  const notes = getLocalStorage();
  const selectedNote = notes.find((note) => note.id === id);

  localStorage.setItem("selectedNote", JSON.stringify(selectedNote));
};
