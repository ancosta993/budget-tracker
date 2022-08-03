// declare db for global score
let db;

// establish a connection request
const request = indexedDB.open('budget_tracker', 1);

// once the db is updated, the onupgradeneeded event will be triggered
request.onupgradeneeded = function(event) {
   // save a reference to the database 
   const db = event.target.result;
   // create an object store and set it to have an auto incrementing primary key of sorts 
   db.createObjectStore('new_budget', { autoIncrement: true });
 };

 // onsuccessful connection
 request.onsuccess = function(event) {
   db = event.target.result; // save for the global scope

   if (navigator.onLine){
      // if browser is online, save the data from cache to server
      uploadBudget();
   }
 }

 request.onerror = function(event) {
   console.log(event.target.errorCode);
 }

// This function will be executed if we attempt to submit a transaction and there's no internet connection
function saveRecord(record) {
   // open a new transaction with the database with read and write permissions 
   console.log('Initiating transaction to the indexedDB')
   const transaction = db.transaction(['new_budget'], 'readwrite');
 
   // access the object store for `new_budget`
   const budgetObjectStore = transaction.objectStore('new_budget');
 
   // add record to your store with add method
   budgetObjectStore.add(record);
 };

 function uploadBudget(){
   // open a transaction on your db
   const transaction = db.transaction(['new_budget'], 'readwrite');

   //access your object store
   const budgetObjectStore = transaction.objectStore('new_budget');

   // get all records from store and set to a variable
   const getAll = budgetObjectStore.getAll();
   // upon a successful .getAll() execution, run this function
   getAll.onsuccess = function() {
      // if there was data in indexedDb's store, let's send it to the api server
      if (getAll.result.length > 0) {
        fetch('/api/transaction', {
          method: 'POST',
          body: JSON.stringify(getAll.result),
          headers: {
            Accept: 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
          }
        })
         .then(response => response.json())
         .then(serverResponse => {
            if(serverResponse.message) {
               throw new Error(serverResponse);
            }
            // open one more transaction
            const transaction = db.transaction(['new_budget'], 'readwrite');
            // access new_budget object store
            const budgetObjectStore = transaction.objectStore('new_budget');
            // clear all items in your store
            budgetObjectStore.clear();

            alert('All saved budget has been submitted!');
         })
         .catch(err => {
            console.log(err);
         });
      }
   }
};

// listen for app coming back online
window.addEventListener('online', uploadBudget);

