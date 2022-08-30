const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');
const jest = require('jest');

// classes
const Employee = require('./lib/Employee');
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');

// HTML dependencies
const genHTML = path.resolve(__dirname, 'dist')
const outputPath = path.join(genHTML, 'index.html');
const render = require('./src/HTML-template.js');

// Create empty arrays for team and id as place holders
const teamArr = [];
const idArr = [];


// starts the application
function startApp() {

    // function to prompt user to add a team manager
    function addManager() {
        console.log("Build your team:");
        inquirer.prompt([
            {
                type: "input",
                name: "managerName",
                message: "Enter the team manager's name:",
                validate: answer => {
                    if (answer !== "") {
                        return true;
                    }
                    return "Please enter the name of the team manager.";
                }
            },
            {
                type: "input",
                name: "managerId",
                message: "Enter the team manager's ID:",
                validate: answer => {
                    if (answer !== "") {
                        return true;
                    }
                    return "Please enter the team manager's ID.";
                }
            },
            {
                type: "input",
                name: "managerEmail",
                message: "Enter the team manager's email:",
                validate: answer => {
                    if (answer !== "") {
                        return true;
                    }
                    return "Please enter a valid email address.";
                }
            },
            {
                type: "input",
                name: "managerOfficeNumber",
                message: "Enter the team manager's office number:",
                validate: answer => {
                    const pass = answer.match(
                        /^[1-9]\d*$/
                    );
                    if (pass) {
                        return true;
                    }
                    return "Please enter a reachable office number.";
                }
            }
        ]).then(answers => {
            const manager = new Manager(answers.managerName, answers.managerId, answers.managerEmail, answers.managerOfficeNumber);
            teamArr.push(manager);
            idArr.push(answers.managerId);
            addTeam();
        });
    }

    // function to continue building team after assigning manager
    function addTeam() {
        inquirer.prompt([
            {
                type: "list",
                name: "memberChoice",
                message: "Assign another role?",
                choices: [
                    "Engineer",
                    "Intern",
                    "Submit Team"
                ]
            }
        ]).then(userChoice => {
            switch (userChoice.memberChoice) {
                case "Engineer":
                    addEngineer();
                    break;
                case "Intern":
                    addIntern();
                    break;
                default:
                    generateHTML();
            }
        });
    }

    // function to add an engineer to team if user chooses
    function addEngineer() {
        inquirer.prompt([
            {
                type: "input",
                name: "engineerName",
                message: "Enter the engineer's name:",
                validate: answer => {
                    if (answer !== "") {
                        return true;
                    }
                    return "Please enter the name of the engineer.";
                }
            },
            {
                type: "input",
                name: "engineerId",
                message: "Enter the engineer's ID:",
                validate: answer => {
                    if (answer !== "") {
                        return true;
                    }
                    return "Please enter the engineer's ID.";
                }
            },
            {
                type: "input",
                name: "engineerEmail",
                message: "Enter the engineer's email:",
                validate: answer => {
                    if (answer !== "") {
                        return true;
                    }
                    return "Please enter a valid email address.";
                }
            },
            {
                type: "input",
                name: "engineerGithub",
                message: "Enter the engineer's GitHub username",
                validate: answer => {
                    if (answer !== "") {
                        return true;
                    }
                    return "Please enter a valid GitHub username.";
                }
            }
        ]).then(answers => {
            const engineer = new Engineer(answers.engineerName, answers.engineerId, answers.engineerEmail, answers.engineerGithub);
            teamArr.push(engineer);
            idArr.push(answers.engineerId);
            addTeam();
        });
    }

    // function to add an intern to team if user chooses
    function addIntern() {
        inquirer.prompt([
            {
                type: "input",
                name: "internName",
                message: "Enter the intern's name:",
                validate: answer => {
                    if (answer !== "") {
                        return true;
                    }
                    return "Please enter the name of the intern.";
                }
            },
            {
                type: "input",
                name: "internId",
                message: "Enter the intern's ID:",
                validate: answer => {
                    if (answer !== "") {
                        return true;
                    }
                    return "Please enter the intern's ID.";
                }
            },
            {
                type: "input",
                name: "internEmail",
                message: "Enter the intern's email:",
                validate: answer => {
                    if (answer !== "") {
                        return true;
                    }
                    return "Please enter a valid email address.";
                }
            },
            {
                type: "input",
                name: "internSchool",
                message: "Enter the intern's school",
                validate: answer => {
                    if (answer !== "") {
                        return true;
                    }
                    return "Please enter a valid school.";
                }
            }

        ]).then(answers => {
            const intern = new Intern(answers.internName, answers.internId, answers.internEmail, answers.internSchool);
            teamArr.push(intern);
            idArr.push(answers.internId);
            addTeam();
        });
    }

    // creates HTML with user input 
    function generateHTML() {

        // generates directory for HTML file if one does not already exist
        if (!fs.existsSync(genHTML)) {
            fs.mkdirSync(genHTML)
        }
        console.log("Creating Team...");
        fs.writeFileSync(outputPath, render(teamArr), "utf-8");
    }

    addManager();
}

startApp();