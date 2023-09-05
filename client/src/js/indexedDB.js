// Open or create an IndexedDB database
const dbPromise = new Promise((resolve, reject) => {
  const request = indexedDB.open("NotepadDatabase", 1);

  request.onerror = (event) => {
    reject(event.target.error);
  };

  request.onupgradeneeded = (event) => {
    const db = event.target.result;

    // Create an object store for notes
    if (!db.objectStoreNames.contains("notes")) {
      db.createObjectStore("notes", { keyPath: "id" });
    }
  };

  request.onsuccess = (event) => {
    resolve(event.target.result);
  };
});

// Function to save a note to IndexedDB
const saveNoteToIndexedDB = (note) => {
  return dbPromise.then((db) => {
    const transaction = db.transaction("notes", "readwrite");
    const store = transaction.objectStore("notes");
    return store.add(note);
  });
}

function getNotesFromIndexedDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("NotepadDatabase", 1);

    request.onerror = (event) => {
      reject(event.target.error);
    };

    request.onsuccess = (event) => {
      const db = event.target.result;
      const transaction = db.transaction("notes", "readonly");
      const store = transaction.objectStore("notes");

      const notes = [];

      transaction.oncomplete = () => {
        resolve(notes);
      };

      const cursor = store.openCursor();

      cursor.onerror = (event) => {
        reject(event.target.error);
      };

      cursor.onsuccess = (event) => {
        const cursor = event.target.result;
        if (cursor) {
          notes.push(cursor.value);
          cursor.continue();
        }
      };
    };
  });
}
// Function to delete a note from IndexedDB
const deleteNoteFromIndexedDB = (noteId) => {
  return dbPromise.then((db) => {
    const transaction = db.transaction("notes", "readwrite");
    const store = transaction.objectStore("notes");
    return store.delete(noteId);
  });
}

export { saveNoteToIndexedDB, getNotesFromIndexedDB, deleteNoteFromIndexedDB };
