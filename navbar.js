document.addEventListener("DOMContentLoaded", function () {
  const header = document.querySelector("header.navbar-container");

  window.addEventListener("scroll", function () {
    if (window.scrollY > 100) {
      header.classList.add("bg-scroll");
    } else {
      header.classList.remove("bg-scroll");
    }
  });
});
