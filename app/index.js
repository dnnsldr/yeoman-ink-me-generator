'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');
var inquirer = require("inquirer");


var InkMeGenerator = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');
  },

  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    //this.log(yosay('A Riester Ink Email Generator'));
    this.log(yosay('A ' + chalk.bold.red('Riester') + ' Ink Email Generator'));

   var prompts = [{
      type: 'list',
      name: 'inkTemplate',
      message: 'Which Ink email template would you like to use?',
      choices: [
        'Basic',
        'Hero',
        'Sidebar',
        'Sidebar Hero',
        'Order Confirmation',
        'Shipping Confirmation',
        'Shopify Order Confirmation',
        'Shopify Shipping Confirmation'
      ],
    },{
      type: 'input',
      name: 'projectName',
      message: 'What is the name of your project? (ex. Your-Project-Name)',
      default: 'Dolly',
      validate: function (value) {
        // Trim input value and check if it's not empty
        if (!value.replace(/^\s+/g, '').replace(/\s+$/g, '')) {
          return 'Please provide a project name...';
        }
        return true;
      }
    },{
      type: 'input',
      name: 'ftpHost',
      message: 'Hosted Images Domain URL? (ex. mydomain.com ...no http:// and no trailing slash)',
      default: '',
      validate: function (value) {
        // Trim input value
        var domain = value.replace(/^\s+/g, '').replace(/\s+$/g, '');
        // Check if domain isn't empty
        if (!domain) {
          return 'Please provide a domain...';
        }
         //Check if domain is valid
        if (!domain.match(/^([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/)) {
          return 'Please provide a valid domain...';
        }
          return true;
      }
    },{
      type: 'input',
      name: 'ftpFolder',
      message: 'What is the folder path on the above server? (ex. public_html/my/folder/path/to/images/). You can create this folder here if it is not created yet.',
      default: 'httpdocs/assets/images/grunt-test/',
      validate: function (value) {
        // Trim input value and check if it's not empty
        if (!value.replace(/^\s+/g, '').replace(/\s+$/g, '')) {
          return 'Please provide a folder path...';
        }
        return true;
      }
      },{
      type: 'input',
      name: 'publicFolder',
      message: 'What is the public path to the images folder? (ex. my/folder/path/to/images/).',
      default: 'assets/images/grunt-test/',
      validate: function (value) {
        // Trim input value and check if it's not empty
        if (!value.replace(/^\s+/g, '').replace(/\s+$/g, '')) {
          return 'Please provide a public url folder path...';
        }
        return true;
      }
    },{
      type: 'input',
      name: 'ftpUsername',
      message: 'What is the FTP username?',
      default: '',
      validate: function (value) {
        // Trim input value and check if it's not empty
        if (!value.replace(/^\s+/g, '').replace(/\s+$/g, '')) {
          return 'Please provide a username...';
        }
        return true;
      }
    },{
      type: 'input',
      name: 'ftpPassword',
      message: 'What is the FTP password?',
      default: '',
      validate: function (value) {
        // Trim input value and check if it's not empty
        if (!value.replace(/^\s+/g, '').replace(/\s+$/g, '')) {
          return 'Please provide a password...';
        }
        return true;
      }
    },{
      type: 'confirm',
      name: 'litmus',
      message: 'Will you be using Litmus for Email testing?',
      default: true
    },{
      when: function( response ) {
        return response.litmus;
      },
        type: 'input',
        name: 'litmusDomain',
        message: 'What is your litmus API Name? (Litmus account url. yourcompany name can be found in Account Settings > Profile > Subdomain for API)',
        default: ''
    },{
       when: function( props ) {
        return props.litmus;
      },
        type: 'input',
        name: 'litmusUser',
        message: 'What is your litmus user?',
        //remove when live
        default: '',
        validate: function (value) {
          // Trim input value and check if it's not empty
          if (!value.replace(/^\s+/g, '').replace(/\s+$/g, '')) {
            return 'Please provide a litmus user...';
          }
          return true;
        }
    },{
        when: function( props ) {
          return props.litmus;
        },
        type: 'password',
        name: 'litmusPassword',
        message: 'What is your litmus password?',
        //remove when live
        default: '',
        validate: function (value) {
          // Trim input value and check if it's not empty
         // if (!value.replace(/^\s+/g, '').replace(/\s+$/g, '')) {
         //   return 'Please provide a litmus password...';
         // }
          return true;
        }
    },{
        when: function( props ) {
          return props.litmus;
      },
        type: 'checkbox',
        name: 'litmusClients',
        message: 'Which clients would you like to test?',
        choices: [
          new inquirer.Separator("Mobile devices:"),
          {
            name: "Android 2.3",
            value:'"android22"',
            checked: true
          },{
            name: "Android 4.2",
            value:'"android4"',
            checked: true
          },{
            name: "Gmail App (Android)",
            value:'"androidgmailapp"',
            checked: true
          },{
            name: "iPhone 4s",
            value:'"iphone4"',
            checked: true
          },{
            name: "iPhone 5",
            value:'"iphone5"',
            checked: true
          },{
            name: "iPhone 5s",
            value:'"iphone5s"',
            checked: true
          },{
            name: "iPad (Retina)",
            value:'"ipad"',
            checked: true
          },{
            name: "iPad mini",
            value:'"ipadmini"',
            checked: true
          },{
            name: "Windows Phone 8",
            value:'"windowsphone8"',
            checked: true
          },
          new inquirer.Separator("Web based clients:"),
          {
            name: "AOL Mail (Explorer)",
            value:'"aolonline"',
            checked: true
          },{
            name: "AOL Mail (Firefox)",
            value:'"ffaolonline"',
            checked: true
          },{
            name: "AOL Mail (Chrome)",
            value:'"chromeaolonline"',
            checked: true
          },{
            name: "Gmail (Explorer)",
            value:'"gmailnew"',
            checked: true
          },{
            name: "Gmail (Firefox)",
            value:'"ffgmailnew"',
            checked: true
          },{
            name: "Gmail (Chrome)",
            value:'"chromegmailnew"',
            checked: true
          },{
            name: "Outlook.com (Explorer)",
            value:'"outlookcom"',
            checked: true
          },{
            name: "Outlook.com (Firefox)",
            value:'"ffoutlookcom"',
            checked: true
          },{
            name: "Outlook.com (Chrome)",
            value:'"chromeoutlookcom"',
            checked: true
          },{
            name: "Yahoo! Mail (Explorer)",
            value:'"yahoo"',
            checked: true
          },{
            name: "Yahoo! Mail (Firefox)",
            value:'"ffyahoo"',
            checked: true
          },{
            name: "Yahoo! Mail (Chrome)",
            value:'"chromeyahoo"',
            checked: true
          },
          new inquirer.Separator("Desktop clients:"),
          {
            name: "Lotus Notes 8",
            value:'"notes8"',
            checked: true
          },{
            name: "Lotus Notes 8.5",
            value:'"notes85"',
            checked: true
          },{
            name: "Outlook 2000",
            value:'"ol2000"',
            checked: true
          },{
            name: "Outlook 2002",
            value:'"ol2002"',
            checked: true
          },{
            name: "Outlook 2003",
            value:'"ol2003"',
            checked: true
          },{
            name: "Outlook 2007",
            value:'"ol2007"',
            checked: true
          },{
            name: "Outlook 2010",
            value:'"ol2010"',
            checked: true
          },{
            name: "Outlook 2011 (Mac)",
            value:'"ol2011"',
            checked: true
          },{
            name: "Outlook 2013",
            value:'"ol2013"',
            checked: true
          },{
            name: "Thunderbird latest",
            value:'"thunderbirdlatest"',
            checked: true
          },{
            name: "Thunderbird latest",
            value:'"thunderbirdlatest"',
            checked: true
          },{
            name: "Apple Mail 5",
            value:'"appmail5"',
            checked: true
          },{
            name: "Apple Mail 6",
            value:'"appmail6"',
            checked: true
          }
        ],
        validate: function( answer ) {
          if ( answer.length < 1 ) {
            return "You must choose at least one email client.";
          }
          return true;
        }

    //were all done
    }];

    this.prompt(prompts, function (props) {
      this.inkTemplate = props.inkTemplate.toLowerCase().replace(' ', '-');
      this.projectName = props.projectName;
      this.ftpHost = props.ftpHost;
      this.ftpFolder = props.ftpFolder;
      this.publicFolder = props.publicFolder;
      this.ftpUsername = props.ftpUsername;
      this.ftpPassword = props.ftpPassword;
      this.litmus = props.litmus;
      this.litmusDomain = props.litmusDomain;
      this.litmusUser = props.litmusUser;
      this.litmusPassword = props.litmusPassword;
      this.litmusClients = props.litmusClients;
      done();
    }.bind(this));
  },

  writing: {
    app: function () {
      
      //copy over dependencies
      this.template('_package.json', 'package.json');
      this.src.copy('_bower.json', 'bower.json');

      //make our asset directory
      this.mkdir('assets/css');
      this.mkdir('assets/images');
      
      //copy the template chosen
      this.copy('ink/' + this.inkTemplate + '/index.html', 'index.html');
      this.copy('ink/' + this.inkTemplate + '/style.css', 'assets/css/style.css');
      
      
      //get all the grunt files
      if (this.litmus) {
        this.template('grunt/aliases-litmus.yaml', 'grunt/aliases.yaml');
        this.template('grunt/concurrent-litmus.js', 'grunt/concurrent.js');
        this.template('grunt/litmus.js', 'grunt/litmus.js');
      } else {
        this.template('grunt/aliases.yaml', 'grunt/aliases.yaml');
        this.template('grunt/concurrent.js', 'grunt/concurrent.js');
      }
      this.template('grunt/premailer.js', 'grunt/premailer.js');
      this.template('grunt/processhtml.js', 'grunt/processhtml.js');
      this.template('grunt/uncss.js', 'grunt/uncss.js');
      this.template('grunt/watch.js', 'grunt/watch.js');
      this.template('grunt/replace.js', 'grunt/replace.js');
      this.template('grunt/imagemin.js', 'grunt/imagemin.js');
      this.template('grunt/ftpUploadTask.js', 'grunt/ftpUploadTask.js');
      this.src.copy('gruntfile.js', 'gruntfile.js');

    
    },

    projectfiles: function () {
      
      //copy project files
      this.src.copy('editorconfig', '.editorconfig');
      this.src.copy('jshintrc', '.jshintrc');
      this.src.copy('README.md', 'README.md');
      this.src.copy('gitignore', '.gitignore');
      
    }
  },

  end: function () {
    var fs = require('fs');
    this.installDependencies({
      callback: function () {
        var projectDir = process.cwd();
        fs.createReadStream(projectDir + '/bower_components/ink/css/ink.css').pipe(fs.createWriteStream(projectDir+'/assets/css/ink.css'));
      }
    });
    
  }
});

module.exports = InkMeGenerator;
