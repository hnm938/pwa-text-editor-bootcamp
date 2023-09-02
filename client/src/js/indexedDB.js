// Open or create an IndexedDB database
const dbPromise = indexedDB.open("MyDatabase", 1);

// Define the database schema (object stores)
dbPromise.onupgradeneeded = (event) => {
  const db = event.target.result;

  // Create an object store for notes
  if (!db.objectStoreNames.contains("notes")) {
    db.createObjectStore("notes", { keyPath: "id" });
  }
};

// Function to save a note to IndexedDB
function saveNoteToIndexedDB(note) {
  return dbPromise.then((db) => {
    const transaction = db.transaction("notes", "readwrite");
    const store = transaction.objectStore("notes");
    return store.add(note);
  });
}

// Function to retrieve all notes from IndexedDB
function getNotesFromIndexedDB() {
  return dbPromise.then((db) => {
    const transaction = db.transaction("notes", "readonly");
    const store = transaction.objectStore("notes");
    return store.getAll();
  });
}

// Function to delete a note from IndexedDB
function deleteNoteFromIndexedDB(noteId) {
  return dbPromise.then((db) => {
    const transaction = db.transaction("notes", "readwrite");
    const store = transaction.objectStore("notes");
    return store.delete(noteId);
  });
}

// Export the IndexedDB functions
export { saveNoteToIndexedDB, getNotesFromIndexedDB, deleteNoteFromIndexedDB };
