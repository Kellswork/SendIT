
# SendIT

SendIT is a courier service that helps users deliver parcels to different destinations. SendIT provides courier quotes on weight categories.

### Required Features

- Users can create an account and login.
- Users can create a parcel delivery.
- Users can change the destination of a parcel delivery order.
- Users can cancel a parcel delivery order.
- Users can see the details of a delivery order.
- Admin can change the status and present location of a parcel delivery order.

### Optional Features

- The application should display a Google Map with Markers showing the pickup location and the destination.
- The application should display computed travel distance and journey duration between the pickup location and the destination.
- User gets real-time email notification when Admin changes the status of their parcel.
- User gets real-time email notification when Admin changes the present loaction of their parcel.

## TECHNOLOGIES

### Client Side:

The frontend was implmented using:

- [HTML]() A standard markup language for creating websites.
- [CSS]() This describes how HTML elements are to be displayed on screen.
- [JAVASCRIPT]() A programing language of html and the web.

### Backend
The backend was implemented using:

- [Node](https://nodejs.org/en/) Node Js is a Javascript runtime built on Chrome's V8 JavaScript engine
- [Express]() Express is a minimal and flexible Node.js web application framework
- [PostgreSQL]() POSTGRESQL: The world's most advanced open source relational database

## INSTALLATION
- Install Node js
- Clone the repository `https://github.com/Kellswork/SendIT.git`
- Navigate to the location of the folder
- Run `npm install` to install dependencies
- Run `npm start` to get the app started on your local machine

## TESTING 
### Server Side
To run tests for the server side

- Navigate to the location of the folder in your terminal
- Run `npm run test` to run app tests
- Run `npm run coverage` to run test coverage with [istanbul]() on the app

The UI templates for this app can be viewed on Github pages with this link [SendIT](https://kellswork.github.io/SendIT/)

## License
MIT (c) 2018 Kelechi Ogbonna
