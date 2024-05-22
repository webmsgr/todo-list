import { AnimatedList } from "./AnimatedList";


document.addEventListener("DOMContentLoaded", () => {
  const listElement: HTMLElement = document.querySelector("#list")!!;
  const list = new AnimatedList(listElement);
  // @ts-ignore put the list on the global scope
  window.list = list;
  /*list.add("test 1");
  list.add("test 2");
  list.add("test 3");
  list.add("test completed");
  list.setCompleted(3, true);*/
  const inputBox: HTMLInputElement = document.querySelector("#addItem")!!;
  document.querySelector("#addButton")!!.addEventListener("click", () => {
    if (inputBox.value.trim() === "") return;
    list.add(inputBox.value);
    inputBox.value = "";
  });
  inputBox.onkeydown = (e) => {
    if (inputBox.value.trim() === "") return;
    if (e.key === "Enter") {
      list.add(inputBox.value);
      inputBox.value = "";
    };
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Shift") {
      document.body.classList.add("shift");
    }
  });
  document.addEventListener("keyup", (e) => {
    if (e.key === "Shift") {
      document.body.classList.remove("shift");
    }
  });
});


