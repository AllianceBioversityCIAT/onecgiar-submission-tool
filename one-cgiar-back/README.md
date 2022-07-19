# one-cgiar-back

This is the back end project of the web platform called Submission Tool, the objective of this web platform is submit scientific initiatives.


## Getting Started and Installing
These instructions will provide you with a copy of the working project on your local machine for development and testing purposes.

First, clone the repo into your computer.
```bash
git clone https://github.com/AllianceBioversityCIAT/onecgiar-submission-tool.git
```
Open your terminal, move to the project folder and install the dependencies.
```bash
cd onecgiar-submission-tool/one-cgiar-back
npm install
```
In the root of **one-cgiar-back** folder you have to create the following files:
* **.env** file and add the next code lines: *(Please contact someone of the Submission Tool team to provide you the values of the **clarisa_user** and **clarisa_password**)*
```
PORT=3000
HOST_DB= localhost
clarisa = http://clarisatest.ciat.cgiar.org/api/
clarisa_user = XXXX
clarisa_password = XXXX
```
* **ormconfig.json** file and add the next code lines:*(Before this step make sure you have created the database and provide in this file the correct **username**, **password** and **database** name)*
```
{
    "type": "mysql",
    "host": "localhost",
    "port": 3306,
    "username": "",
    "password": "",
    "database": "",
    "synchronize": false,
    "logging": false,
    "entities": [
       "src/entity/**/*.ts"
    ],
    "migrations": [
       "src/migration/**/*.ts"
    ],
    "subscribers": [
       "src/subscriber/**/*.ts"
    ],
    "cli": {
       "entitiesDir": "src/entity",
       "migrationsDir": "src/migration",
       "subscribersDir": "src/subscriber"
    },
    "extra": {
       "connectionLimit": 15
   }
 }
```
* **nodemon.json** file and add the next code lines for this file: 

```
{
    "watch": [
        "src"
    ],
    "ext": ".ts,.js",
    "ignore": [],
    "exec": "ts-node ./src/index.ts"
}
```
Then, inside of the **src** folder you have to create a folder called **config** and inside of this folder, create a file and call it: **config.ts** next, add the next code lines:
```
export default {
    active_directory: {
        url: 'ldap://xxxxx',
        baseDN: 'DC=xxxx, DC=xx',
        domain: "xxxxx"
    }
};
```

**The element tree should look like this in your code editor: [element tree image](https://www.screencast.com/t/Cz3LqvPSQ)**

**Note:** *Before moving on to the next step, don't forget to connect to the VPN through **FortiClient**. Sign in with your CGIAR credentials.*

Once done, run:
```bash
npm run migrations
npm run start-dev
```
**If everything is satisfactory, you will see something like this in your terminal: [terminal image](https://www.screencast.com/t/UuMkmA1sC)**


## Deploy

Please, open the **FortiClient VPN** and log in with your CGIAR access credentials. After that, open **PuTTY** and fill the next information:

```bash
Host Name (or IP address): tstnodejs01.cgiard.org
Port: 22
Connection type: SSH
```


**you should have something like this: [PuTTY image](https://www.screencast.com/t/bnhEztS8pxQ)**
and then, click in **open** button.

After that, you would see something like this:
[login PuTTY image](https://www.screencast.com/t/jeie6FoZh). *Contact someone related to the project to provide you the access credentials*

once you access to the server, run:
```bash
sudo su
cd ~/../projects/scripts
```

After that, stop the server process:
```bash
forever stopall
```
and then, run the script inside the scripts folder:
```bash
bash upSumissionTool.sh
```

### ¡Good job! this is all that you have to know.

## License

This project uses the following license: [MIT](<https://choosealicense.com/licenses/mit/>)
