import { saveInputToIndexedDB } from "./db";

const editor = document.getElementById("editor");

editor.addEventListener("input", (event) => {
  const content = event.target.value;

  // Save the content to IndexedDB when the user inputs data
  saveInputToIndexedDB(content)
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.error(error);
    });
});

