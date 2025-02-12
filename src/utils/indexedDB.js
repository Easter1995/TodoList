const DB_NAME = 'TodoDB';
const STORE_NAME = 'lists';

let db;

function openDB() {
    return new Promise((resolve, reject) => {
        if (db) return resolve(db);
        
        const request = indexedDB.open(DB_NAME, 1);
        
        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
            }
        };
        
        request.onsuccess = (event) => {
            db = event.target.result;
            resolve(db);
        };
        
        request.onerror = (event) => reject(event.target.error);
    });
}

export async function addData(lists) {
    const db = await openDB();
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    
    await store.clear();  // 清空存储
    lists = JSON.parse(lists)
    lists.forEach(list => store.put(list));
    
    return tx.complete;
}

export async function getAllData() {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, 'readonly');
        const store = tx.objectStore(STORE_NAME);
        const request = store.getAll();
        
        request.onsuccess = () => resolve(request.result);
        request.onerror = (event) => reject(event.target.error);
    });
}
