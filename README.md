################# CSE 591 Adaptive Web - Assignment 1 ###################


This assignment has two parts: AW_Assign1_Web, AW_Assign1_Ext.

- AW_Assign1_Ext is the folder with the source code required to install the chrome browser plugin.

- Please open chrome browser and go to "Manage Extensions" in the browser settings. 
  
Alternatively, this can be opened by typing "chrome://extensions" in the search bar.

- Click on "Load unpacked extension" at the very top of the page.

- Select the "AW_Assign1_Ext" folder located in the submission folder.

- Once the plugin is done installing, click on the plugin to be automatically re-directed to the "Login" page.

- The Login page can also be accessed on "https://tkunderu.herokuapp.com/".

- Please Login using one of the default usernames (aaa, bbb, ccc) and password (123).

- The profile page contains the User Info, User Activity and User Actions.

- The bottom of the page answers the question "Why I've chosen to log these actions?".

- The "Stack overflow" button at the top re-directs you to the Stack overflow java page.

- All activity performed in this page will be recorded and displayed on the User Profile page.

- The User profile page can be manually refreshed or done using the "Reload Actions" button at the bottom of the page.


The current folder, AW_Assign1_Web contains the source code for the web page.


******** This part isn't required but follow these instructions to check the web page locally ********

- Home page for the web page is located in AW_Assign1_Web/views/profile.ejs

- Install mongodbb on the system.

- Launch the db on port 27017.

- Install nodejs.

- Navigate to the project folder and launch server using the command "node server.js".

- For the extension to record logs locally, all xmlhttprequests must be routed to "http://localhost:8080/logActions".
  
These changes are currently commented and can be uncommented in the file AW_Assign1_Ext/src/bg/background.js.

- Now the extension would be able to log actions both on the web page online and locally.
