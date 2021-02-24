# one-cgiar-front

This is the front end project to the web platform called Submission Tool, the objective of this web platform is submit scientific initiatives. *This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.0.2.*


## Getting Started and Installing
These instructions will provide you with a copy of the working project on your local machine for development and testing purposes.

First, clone the repo into your computer.
```bash
git clone https://github.com/AllianceBioversityCIAT/onecgiar-submission-tool.git
```
Open your terminal, move to the project folder and install the dependencies.
```bash
cd onecgiar-submission-tool/one-cgiar-front
npm install
```
In the root of **one-cgiar-front** create a file and call it: **proxy.conf.json** next, add the next code lines:
```
{
    "/api": {
        "target": "http://localhost:3000/api",
        "secure": false,
        "logLevel": "debug",
        "pathRewrite": {
            "^/api": ""
        },
        "changeOrigin": true
    }
}
```
Once done, run:
```bash
npm start
```
Open [http://localhost:4200](http://localhost:4200) in your browser. This should open up the Demo App.

**Note:** *Please be sure that the installation of the back end will be successful to interact with the entirely platform*

## Deploy

Please, open the **FortiClient VPN** and log in with your CGIAR access credentials. After that, open **PuTTY** and fill the next information:

```bash
Host Name (or IP address): tstnodejs01.cgiard.org
Port: 22
Connection type: SSH
```

and click in open button.

After that, you would see something like this:
[login PuTTY](https://www.screencast.com/t/jeie6FoZh). *Contact someone related to the project to provide you the access credentials*

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
