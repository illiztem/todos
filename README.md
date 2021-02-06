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

### Step 3: Setup server IP ADDRESS
Open a terminal and get IP ADDRESS by running the following command:
- Linux: ifconfig
- Windows: ipconfig

Then follow the next steps:
1. Go to `client/src folder` 
2. Open `config.js` file
3. Update the line 2 ip object property with your own IP ADDRESS

#### Download the client dependences
Open a terminal and go to the `project's root folder` run the following commands:
 1. cd client 
 2. npm install
 
## Starting the server
* Need to complete the steps **`1, 2 and 3`**
* To start the nodejs server run the command **`node index.js`**

## Starting the client
* Need to complete the steps **`1, 2 and 3`**
* To start the nodejs server run the command **`npm start`**
