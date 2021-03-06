# Todos

## Configuration

### Step 1: Install Node js
* You must execute the `sudo apt-get install nodejs` command in a terminal (*Only for linux*)
* Or download it [here](https://nodejs.org/es/download/)

### Step 2: Install project dependencies
#### Download the server dependences
Open a terminal and go to the `project's root folder` run the following commands:
 1. cd server 
 2. npm install
 
#### Download the client dependences
Open a terminal and go to the `project's root folder` run the following commands:
 1. cd client 
 2. npm install

### Step 3: Setup server IP ADDRESS
Open a terminal and get IP ADDRESS by running the following command:
- Linux: ifconfig
- Windows: ipconfig

Then follow the next steps:
1. Go to `client/src folder` 
2. Open `config.js` file
3. Update the line 2 ip object property with your own IP ADDRESS

### Step 4: Importing DB
1. Go to `server folder`
2. Open `db.sql` file
3. Import `db.sql` file in your DBMS of preference

> If import doesn't works copy the content of the file and paste it on a SQL Script 

## Starting the server
1. Need to complete the steps **`1, 2, 3 and 4`**
2. Go to `server folder`
3. To start the nodejs server run the command **`node index.js`**

## Starting the client
1. Need to complete the steps **`1, 2, 3 and 4`**
2. Go to `client folder`
3. To generate the react client run the command **`npm run build`**
4. Install SERVE, open a terminal and execute: npm install -g serve
5. To start the react client run the command **`serve -s build`**
6. Open a browser and go to your IP ADDRESS (*obtained in STEP 3*) and PORT 5000, in example `192.168.1.118:5000`
