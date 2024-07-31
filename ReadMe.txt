Problems:

The entire time I was working on this I didn't realize that my browser zoom
setting was at 75%. I didn't set things up so that everything would shrink
if you zoom out. It's unplayable if you don't set your browser zoom to 75%.

If you get a highscore you need to refresh the 'leaderboard' page to make
it show up.

I plan to fix these issues soon.

Also, I haven't tested this on anything but my computer so I'm not sure if
it works on anything else. I included the sql file that has the leaderboard
data. I'm not sure if you need to do anything else with it to make it work.
You might need to make a .env file in the root of the backend folder. Put
the following code in the .env file with your MySQL password.
HOST=localhost
USER=root
PASSWORD=YOUR_PASSWORD_HERE
DATABASE=fruit_frenzy




Instructions:

Run the 'run.exe' application to quickly setup the game. Alternatively,
open the 'backend' and the 'frontend' folders in a code editor in seperate
windows. After that, run the command 'npm run dev' in the console of both
of the windows. For the frontend, hold the control key and click on the
link in the console after running the command. After doing this, the game
should successfully be up and running. When you are done, make sure to
shut down both of the servers. To do this, go to the console and press 
'control c' and then press 'y' when promted to shut down the server.