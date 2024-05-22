import { AnimatedList } from "./AnimatedList";


document.addEventListener("DOMContentLoaded", () => {
  const listElement: HTMLElement = document.querySelector("#list")!!;
  const list = new AnimatedList(listElement);
  // @ts-ignore put the list on the global scope
  window.list = list;
  list.add("test 1");
  list.add("test 2");
  list.add("test 3");
  list.add("test completed");
  list.setCompleted(3, true);
})


