How to set everything up:

Step 1:
Download emps_UI_CLEAN, employee_payroll.sql and emps_API_CLEAN

Step 2:
Using a software like VSCode, open the emps_UI_CLEAN folder and do npm install.
Repeat this for emps_API_CLEAN to get all the packages installed.

If this command returns an error, it means you need to install Node.js and NPM.
Follow this link to install these two pieces of software, then restart your computer / device
before continuing.

https://nodejs.org/en/download

Step 3:
If you already have a database and have set it up, skip this step.
Otherwise, you'll need to download a database like MariaDB or mySQL in order to continue
The following commands should work when using MariaDB 10.11.

These commands work for making said user:

CREATE USER 'userName'@'localhost' IDENTIFIED BY 'password here';

CREATE USER 'userName'@'%' IDENTIFIED BY 'same password here';

CREATE DATABASE emps_services;

GRANT ALL PRIVILEGES ON emps_services.* TO 'userName'@'localhost' WITH GRANT OPTION;
        
GRANT ALL PRIVILEGES ON emps_services.* TO 'userName'@'%' WITH GRANT OPTION;
        
This command works on windows in the command prompt:

"{filepath to mysql.exe}" -u {username} -p {database name} < "{filepath to the .sql file}"

You will then be prompted to enter a password, doing so will load the .sql file into the
specified database.

Step 4:
In emps_API_CLEAN, there should be a file called "mySQLconnect.js", open this file and
put your database information where prompted

If you want to change the https port, open and edit the .env file also located in
emps_API_CLEAN

Step 5:
For emps_API_CLEAN, you will start the API server using "node api_server.js"
For emps_UI_CLEAN, you will start the react frontend using "npm start"
The database should work if you've configured your "mySQLconnect.js" file properly in the API server

Step 6:
Everything should run now. If there are any issues, go back through and ensure that you didn't skip
a step or miss something.
