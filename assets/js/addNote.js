const submitBtn = document.querySelector("#submit");
const form = document.querySelector("#form");

submitBtn.addEventListener("click", function (e) {
  e.preventDefault();

  const formData = Object.fromEntries(new FormData(form).entries());
  if (formData.text && formData.title) {
    console.log("Can Submit");
  }
});
