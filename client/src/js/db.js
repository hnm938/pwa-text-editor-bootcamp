const DB_NAME = "NotepadDatabase"; // Use your database name
const DB_VERSION = 1; // Use your database version

// Function to open or create an IndexedDB database
function openDatabase() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onsuccess = (event) => {
      const db = event.target.result;
      resolve(db);
    };

    request.onerror = (event) => {
      reject(event.target.error);
    };

    request.onupgradeneeded = (event) => {
      const db = event.target.result;

      // Create an object store for notes
      if (!db.objectStoreNames.contains("notes")) {
        db.createObjectStore("notes", { keyPath: "id", autoIncrement: true });
      }
    };
  });
}

// Function to save input content to IndexedDB
function saveInputToIndexedDB(content) {
  return openDatabase().then((db) => {
    return new Promise((resolve, reject) => {
      const transaction = db.transaction("notes", "readwrite");
      const store = transaction.objectStore("notes");

      // Create a new note object or update the existing one
      const note = {
        content: content,
        timestamp: Date.now(),
        id: 1,
      };

      const request = store.put(note);

      request.onsuccess = (event) => {
        resolve("Input saved successfully to IndexedDB");
      };

      request.onerror = (event) => {
        reject(event.target.error);
      };
    });
  });
}

export { saveInputToIndexedDB };
