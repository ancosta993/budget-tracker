# Budget Tracker Starter Code

## Description
This application follows the Progressive Web Application rules. This is an attempt to create a Progressive Web Application. The front and backend of the project was cloned from [this repo](). This repo adds service worker and indexDB to make the static HTML pages render offline and handle submited data offline. Finally, this project also added the manifest for mobile applications.

## Table of Content
**[Description](#description)**

**[Tools](#tools)**

**[Installation](#installation)**


## Tools
The browser tools used for the offline functionalities inludes: Service-Worker, IndexedDB and mainfest.

### Service-Worker

Serves the static application files, including: HTML, JS, and CSS files.  
- If there is connection loss during the usage, the application will not shut down and will be served from the service worker.  
- The next time the user visits the site offline, the service worker will serve the pages. 
- Once the connection is established, the service worker will hand over the serving to the Express.js.

### IndexedDB

- IndexedDB is used to handle posting user data. 
- If there is no connection to the database, any user submitted data through the POST request will be saved in the browser cache. 
- These data are added in key value pair. 
- The user data is saved in the browser until the connection is establihed.
- When the connection is established, the user is notifed that the data is saved in the database.

### manifest

- For mobile or even desktops, this app offers an option to download the app. Note: this is not exactly downloading. Rather, it saves a shortcut to the local machine.
- This shorcut allows thes same offline and online funcitionality to the user. 

## Installation
The app can be used by visitin the deployed link provided at the beginning. Once the user visits the link, they can download it by pressing on the downloade button on the left hand side of the URI search box in their browser. 
