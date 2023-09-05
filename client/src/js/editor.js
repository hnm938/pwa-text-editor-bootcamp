import { saveInputToIndexedDB } from "./db";
import { getNotesFromIndexedDB } from "./indexedDB.js";

const editorTextarea = document.getElementById("editor");

async function loadEditorContent() {
  try {
    const notes = await getNotesFromIndexedDB();

    if (notes && notes.length > 0) {
      editorTextarea.value = notes.map((note) => note.content).join("\n");
    }
  } catch (error) {
    console.error("Error loading editor content from IndexedDB:", error);
  }
}

document.addEventListener("DOMContentLoaded", loadEditorContent);

editor.addEventListener("input", (event) => {
  const content = event.target.value;

  // Save the content to IndexedDB when the user inputs data
  saveInputToIndexedDB(content)
    .then((result) => {
      console.log("Content saved to IndexedDB:", result);
    })
    .catch((error) => {
      console.error("Error saving content to IndexedDB:", error);
    });
});