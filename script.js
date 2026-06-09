const buttonclick = document.querySelector("#click");
const buttondontclick = document.querySelector("#dont-click");

buttonclick.addEventListener("click", function () {
  alert("You clicked the button! 🎉");
});

buttondontclick.addEventListener("click", function () {
  alert("You didn't click the button! 😢");
});