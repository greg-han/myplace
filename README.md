# myPlace
# SIte is down for now, this project will be ressurrected soon.
## This does not represent my best code anymore, I just cannot post my projects until after I graduate.

* You may already be logged in depending on the activty that I did last (I'm using redux persist to keep the login state for now). If not, register or login with username : Greg , password : password When you see the login dissappear from the navbar, you're in my profile. Take a look around and add/remove queries to see different results.
* Note: this wont work if you're on a restricted network of some kind (like a school network).
  UPDATE: It now works on all devices. Moved some chunks of logic server-sdie.
  
# A place where you can find your place.
Welcome to myPlace! This is a place where you can find your place! 
It's called myplace and not your place because when you are in myPlace this place is your place! 
So when you are here, you will feel like this is "my" place (My as in you when you are considering this to be your own).
You can customize your experience here and find what ti is that interests and drives you.
 
# This is my personal project. It will be updated soon.
I have ideas about how the profile system is going to work out but I don't want to add them yet.
Have you ever discovered a word or a subject that completely changes your life?
Have you ever met someone that has access to the same search engines that you do, but they are able to show you information that enriches your life? Just having knowledge about a few subjects can change your perspective and your life entirely.
The basic idea of this app will be a personal profile that is composed of your queries.
Machine learning will the be used on the queries to find similar queries to your aggregate queries, but outside of your normal "cluster". I want to prevent people from being stuck in an echo chamber or "bubble". Therefore, I have to find a way to bring people clusters of information that may be related to, but outside of their normal field of vision.
I'm not trying to build a search engine, this is different.
Because i'm still in school, and i'm still learning, this will probably take some time and it will be slowly updated as time goes on.
As you can see, the idea is nothing mindblowing or anything, it's just not really out in the mainstream right now (this may be because there is no immediate commercial need for it).
I really want people to find clusters of information that are completely outside of the scope of their current knowledge base, but would somehow be related to something that they may like.

I still suck pretty bad so this will probably take a while lol (but I get just a little (sometimes a lot) better everyday), although it seems like I learn something new literally everyday when i'm working on this.

Teh cool part of this, is that I'm going to design it so that it will be just as useful with one person as it will be with many people.

Thanks for stopping by!

-Greg.
# Instructions
* Login: user the temporary account username : Greg, and pasword : password to log in !
  You will notice a different UI experience depending on whether you are logged in or not (Persistent Redux state throughout the program).
  ![Alt text](/images/login.png?raw=true "login")
  
* Add Query: After logging in, go to the search page and type a query. It will be saved to your profile.
* Add Group: After logging in, go to the search page and select a group from the dropdown menu. It will be saved to your profile.
  ![Alt text](/images/query.png?raw=true "query")
  ![Alt text](/images/dropdown.png?raw=true "dropdown")
  
* Remove Query: click on the x on the right of your query term in your profile to delete that
* Remove Group: click on the x to the right of your group term in your profile to delete that group from your profile. Your  query from your profile.
* Logout : Go to your profile page and logout. This Logout button will only appear if you are logged in.
![Alt text](/images/profilepage.png?raw=true "profile")

* Groups: Navigate to the Groups page to see your results! Groups page will reflect your change and will only render groups that are added to your profile. For now, there are only 2 groups (TED and Music).Over time, more groups will be added. Ideally, the groups should be added 
![Alt text](/images/groups.png?raw=true "groups")

# Installation Instructions
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


## At the moment, you can use this as a tool to browse your kaggle datasets.
Have a kaggle CSV? OR any csv at all? Message me and i'll add it to the program and make some kind of card with the metadata.
