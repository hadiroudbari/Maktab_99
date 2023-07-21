const submitBtn = document.querySelector("#submit");
const form = document.querySelector("#form");

const generateToast = (text, color, duration, callback) => {
  Toastify({
    text: text,
    duration: duration,
    // destination: "https://github.com/apvarun/toastify-js",
    // newWindow: true,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "center", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: color,
    },
    callback: callback,
  }).showToast();
};

const getLocalStorage = () => JSON.parse(localStorage.getItem("notes"));

const setLocalStorage = (notes) =>
  localStorage.setItem("notes", JSON.stringify(notes));

submitBtn.addEventListener("click", function (e) {
  e.preventDefault();

  const formData = Object.fromEntries(new FormData(form).entries());
  if (formData.text && formData.title) {
    formData.id = Date.now();
    const getNotes = getLocalStorage();
    const notes = getNotes ? getNotes : [];
    notes.push(formData);
    setLocalStorage(notes);

    form.reset();
    generateToast(
      "Note added successfully",
      "linear-gradient(to right, #11998e, #38ef7d)",
      1000,
      () => location.assign("./notes.html")
    );
  } else {
    generateToast(
      "Don't leave any empty fields",
      "linear-gradient(to right, #ff416c, #ff4b2b)",
      3000
    );
  }
});
