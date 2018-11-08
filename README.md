# myPlace
# LIVE EXAMPLE (hosted on a Digital Ocean Droplet) : http://165.227.170.174:3000/
* You may already be logged in depending on the activty that I did last (I'm using redux persist to keep the login state for now). If not, register or login with username : Greg , password : password When you see the login dissappear from the navbar, you're in my profile. Take a look around and add/remove queries to see different results.
* Note: this wont work if you're on a restricted network of some kind (like a school network).
  The UI works perfectly on phones, but the Groups seem very slow to load on mobile for some reason (will fix).
# A place where you can find your place.
Welcome to myPlace! This is a place where you can find your place! 
It's called myplace and not your place because when you are in myPlace this place is your place! 
So when you are here, you will feel like this is "my" place (My as in you when you are considering this to be your own).
You can customize your experience here and find what ti is that interests and drives you.
 
# This is my personal project. It will be updated soon.
I have ideas about how the profile system is going to work out but I don't want to add them yet.

The basic idea of this app will be a personal profile that is composed of your queries.
Machine learning will the be used on the queries to find similar queries to your aggregate queries.
I'm not trying to build a search engine, this is different.


The other part that i'm going to add is what will make this really unique and has almost nothing to do with questions, but will have something to do with aggregating your profile data. I purposefully did not add it in here yet, because I want to design it fully before I add the components of it. It's nothing mindblowing or anything, it's just not really out in the mainstream right now (this may be because there is no immediate commercial need for it).
I really want people to find clusters of information that are completely outside of the scope of their current knowledge base, but would somehow be related to something that they may like.

I still suck pretty bad so this will probably take a while lol (but I get just a little (sometimes a lot) better everyday), although it seems like I learn something new literally everyday when i'm working on this.

Teh cool part of this, is that I'm going to design it so that it will be just as useful with one person as it will be with many people.

Thanks for stopping by!

-Greg.

# Instructions
* git clone or download https://github.com/greg-han/myplace.git and then  cd to `myplace` and `myplace/client` then `npm install` in both directories. You may need to install more dependencies (as I did when my hard drive got wiped on accident).
I may configure it to automatically install them, but it would only apply to my OS, and I think learning Docker would be better and easier. Before making a docker container however, I want to host this on a server.
* cd to myplace and yarn start (now using concurrently to start the server and client in one action).
* There are two DB options right now, one in the cloud, and one locally. Just comment/uncomment them to choose.
  If running locally, install mongodb, then `sudo mongod`, after that, `mongo` then in the mongo terminal `use myplace` after
  you create this db, comment out the one in the cloud and uncomment the local one. Change the port to whatever port your       running mongo server is running on (You can find it in the terminal that you are running `mongod` from).
* Until I get this hosted, if you actually want to run this you will need to install the full version of elasticsearch and set it up to start/stop in terminal. Oncd you've installed elastic search (and make sure you have started it with `sudo systemctl start elasticsearch.service`!), make sure you have Python3 installed. Then, install elastic search in python with `pip3 install elasticsearch`. 
  cd to `myplace` and extract the csv file from `380000-lyrics-from-metrolyrics.zip` into myplace then run `python3 csvLoader.py`. Open the python file, and change `lyrics.csv` to `transcripts.csv` and `index=music` to `index=myplace`.
  Then run `python3 csvLoader.py` again. I'll probably configure this thing to automatically load whatever datasets are in the project at any given moment.
* Username : You should notice a username in the redux store. This is persistent throughout the program (with redux) and can be used for     w/e. Mosty for `findOne` CRUD operations throught the different components.
* Login: user the temporary account username : Greg, and pasword : password to log in !
  You will notice a different UI experience depending on whether you are logged in or not (Persistent Redux state throughout the program).
* Logout : Go to your profile page and logout. This Logout button will only appear if you are logged in.
* Search: After logging in, Go to the search page and type a query. It will be saved to your profile.
* Remove Query: click on the x on the right of your query term in your profile to delete that query from your profile.
* Groups: Add Remove Groups using the dropwdown menu in the search page. For now, there are only 2 groups (TED and Music).
   Over time, more groups will be added. Ideally, the groups should be added 
UPDATE: You will now see music results as well with song artist and lyrics (Using this dataset https://www.kaggle.com/gyani95/380000-lyrics-from-metrolyrics ). The search engine goes through the song lyrics.
Ideally, I would like to have lyrics from very specific genres (Will be added soon), but i'm glad to have run across this dataset anyways.
* Remove Group: click on the x to the right of your group term in your profile to delete that group from your profile. Your Groups page will reflect your change and will only render groups that are in your profile.

## At the moment, you can use this as a tool to browse your kaggle datasets.
Have a kaggle CSV? OR any csv at all? Message me and i'll add it to the program and make some kind of card with the metadata.
