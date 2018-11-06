# Front End
This is the front end created with Create-React-App.
I simply used a proxy in conjunction with CRA to make this full stack app.
## Some Points
* All of the routing is done on the front end using React-Router. This means that there are almost no GET requests.
  most requests are POST requests, and the server mostly hadles the database updates/queries. There is one "in" for the app,     and that is App.js. This is the page that index.html points to in the initialization of the server. It basically points to     App.js, and React takes it from there.
* Redux-persist is used to check if the user is logged in. All state is stored with Redux, so this means that it is technically   in the browser. Redux-persits ensures that the logged-in state does not change when the browser is refreshed.
  I may move this to the database to rely on one less library, but it seems to be working fine.
