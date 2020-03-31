var inquirer = require("inquirer");
var fs = require("fs");
var api = require("./utils/api");

function init() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "title",
        message: "What Is Your Project Title?"
      },
      {
        type: "input",
        name: "description",
        message: "Description of Project"
      },
      {
        type: "input",
        name: "gitName",
        message: "What Is Your GitHub UserName?"
      },
      {
        type: "input",
        name: "installation",
        message: "What command do we use to install?"
      },
      {
        type: "input",
        name: "usage",
        message: "Provide instructions and examples for use."
      },
      {
        type: "list",
        name: "license",
        message: "Which License are you using?",
        choices: ["MIT", "APACHE 2.0", "GPL 3.0", "BSD 3", "None"]
      },
      {
        type: "input",
        name: "contributing",
        message:
          "What do developers need to know about contributing to the repo?"
      },
      {
        type: "input",
        name: "tests",
        message: "What commands can users run to test this?"
      },
      {
        type: "input",
        name: "twitter",
        message: "What is your Twitter account name?"
      }
    ])
    .then(function(data) {
      api.getUser(data.gitName).then(function(res) {
        var somfin = ` # ${data.title}

## Description
${data.description}

## Table of Contents

* [Installation](#installation)
* [Usage](#usage)
* [Contributing](#contributing)
* [License](#license)
* [Tests](#tests)
* [Twitter](#twitter)
* [Questions](#questions)

## Installation
${data.installation}

## Usage
${data.usage}

## Contributing
${data.contributing}

## License
${data.license}
[![License](https://img.shields.io/badge/License-${data.license}-blue.svg)](https://github.com/${data.gitName}/${data.title})

## Tests
${data.tests}

## Follow on Twitter
[![Twitter Follow](https://img.shields.io/twitter/follow/${data.twitter}?label=Follow&style=for-the-badge)](https://twitter.com/${data.twitter})

## Questions
<img src="${res.data.avatar_url}" height="150px" width="150px">

If you have any questions, contact: ${res.data.email}
Or contact them through their GitHub: [${data.gitName}](${res.data.html_url})
            `;
        fs.writeFile("Profile.MD", somfin, function(err) {});
      });
    });
}

init();
