# myPlace
## A place where you can find your place.
Welcome to myPlace! This is a place where you can find your place! 
It's called myplace and not your place because when you are in myPlace this place is your place! 
So when you are here, you will feel like this is "my" place (My as in you when you are considering this to be your own).
You can customize your experience here and find what ti is that interests and drives you.

# This is my personal project. It will be updated soon.
I have ideas about how the profile system is going to work out but I don't want to add them yet.

The basic idea of this app will be a personal profile that is composed of your queries.
Machine learning will the be used on the queries to find similar queries to your aggregate queries.
I'm not trying to build a search engine, this is different.


The other part that i'm going to add is what will make this really unique and has almost nothign to do with questions, but will 
have something to do with aggregating your profile data. I purposefully did not add it in here yet, because I want to design it fully
before I add the components of it. It's nothing mindblowing or anything, it's just not really out in the mainstream right now.
Probably because it doesn't have much of a commercial purpose. I can't see how it would work with a commerical purpose because that would mean that some sites get
priority over others, and that would mean that you wouldn't get the full experience that you should. Maybe if it ever has more than one user (me) then it can generate something
just from the fact that it will point something somewhere but I doubt it and I don't really care because that's not the point.

I still suck pretty bad so this will probably take a while lol (but i get just a little (sometimes a lot) better everyday), although it seems like I learn something new literally everyday when i'm working on this.

Teh cool part of this, is that i'm going to design it so that it will be just as useful with one person as it will be with many people.

Thanks for stopping by!
-Greg.

# Instructions
* git clone or download https://github.com/greg-han/myplace.git and then  cd to `myplace` and `myplace/client` then `npm install` in both directories.
* cd to `myplace` and `npm start` to start the node server
* then cd to `myplace/client` and `npm start` to start the react app.
* There are two DB options right now, one in the cloud, and one locally. Just comment/uncomment them to choose.
  If running locally, install mongodb, then `sudo mongod`, after that, `mongo` then in the mongo terminal `use myplace` after
  you create this db, comment out the one in the cloud and uncomment the local one. Change the port to whatever port your       running mongo server is running on (You can find it in the terminal that you are running `mongod` from).
* Username : You should notice a username in the redux store. This is persistent throughout the program (with redux) and can be used for     w/e. Mosty for `findOne` CRUD operations throught the different components.
* Login: user the temporary account username : Greg, and pasword : password to log in !
  You will notice a different UI experience depending on whether you are logged in or not (Persistent Redux state throughout the program).
* Logout : Go to your profile page and logout. This Logout button will only appear if you are logged in.
* Search: After logging in, Go to the search page and type a query. It will be saved to your profile.
* Remove Query: click on the x on the right of your query term in your profile to delete that query from your profile.
* Groups: For now, simply navigate to the groups page and you will see a few TED Talks matched to your queries. (Using elasticsearch's full-text functionality including fuzzy search). Tweak your queries to watch it change! Much more coming soon. (Maybe in the next 2 days or so).
