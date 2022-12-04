const mysql = require("mysql2");
const inquirer = require("inquirer");
require('console.table');
const utils = require('util')

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "employee_trackerDB"
});

connection.connect(function (err) {
  if (err) throw err;
  startPrompt();
});

connection.query = utils.promisify(connection.query)

function startPrompt() {
    inquirer.prompt([
    {
    type: "list",
    message: "What would you like to do?",
    name: "choice",
    choices: [
              "View All Employees", 
              "View Roles",
              "View Departments", 
              "Update Employee",
              "Add Employee",
              "Add Role",
              "Add Department"
            ]
    }
    ]).then(function(value) {
        switch (value.choice) {
            case "View All Employees":
                viewAllEmployees();
            break;
            case "View Roles":
                viewAllRoles();
            break;
            case "View Departments":
                viewAllDepartments();
            break;
            case "Add Employee":
                addEmployee();
            break;
            case "Update Employee":
                updateEmployee();
            break;
            case "Add Role":
                addRole();
            break;
            case "Add Department":
                addDepartment();
            break;
        }
    })
}

function viewAllEmployees() {
    connection.query('SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name, concat(manager.first_name, " ", manager.last_name) AS manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON manager.id = employee.manager_id').then((result, err) => {
        if (err) {
            console.log(err)
        } else {
            console.table(result)
            startPrompt();
        }
    })
}

function viewAllRoles() {
    connection.query('SELECT role.id, role.title, role.salary, department.name FROM role LEFT JOIN department ON role.department_id = department.id').then((result, err) => {
        if (err) {
            console.log(err)
        } else {
            console.table(result)
            startPrompt();
        }
    })
}

function viewAllDepartments() {
    connection.query('SELECT * FROM department').then((result, err) => {
        if (err) {
            console.log(err)
        } else {
            console.table(result)
            startPrompt();
        }
    })
}

function addEmployee() {
    inquirer.prompt ([
    {
        type: "input",
        name: "first_name",
        message: "What is the employee's first name?",
        validate: function (answer) {
            if (answer.length < 1) {
                return console.log("A valid employee first name is required");
            }
            return true;
        }
    },
    {
        type: "input",
        name: "last",
        message: "What is the employee's last name?",
        validate: function (answer) {
            if (answer.length < 1) {
                return console.log("A valid employee last name is required");
            }
            return true;
        }
    }]).then(result => {
        const first_name = result.first_name;
        const last_name = result.last_name;
        connection.query('SELECT * FROM role').then((result, err) => {
            if (err) {
            console.log(err)
        } else {
            
        }
        })
    })
}

function updateEmployee() {

}

function addRole() {

}

function addDepartment() {
    inquirer.prompt({
            name: "deptName",
            type: "input",
            message: "Department Name: "
        }).then((answer) => {
            connection.query(`INSERT INTO department (name)VALUES ("${answer.deptName}");`, (err, res) => {
                if(err) return err;
                console.log("\n Department Added \n ");
                mainMenu();
            });
        });
}