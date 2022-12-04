// These are my required packages
const mysql = require("mysql2");
const inquirer = require("inquirer");
require('console.table');
const utils = require('util')

// This is my connection to my database
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "employee_trackerDB"
});

// These are the functions that will show the roles, departments, and employees in the database
var showRoles;
var showDepartments;
var showEmployees;

// This is the function that will start the application
connection.connect(function (err) {
  if (err) throw err;
  // This function will show all the roles while retaining the id as its value
  connection.query("SELECT * from role", function (error, res) {
    showRoles = res.map(role => ({ name: role.title, value: role.id }))
  })
  // This function will show all the departments while retaining the id as its value
  connection.query("SELECT * from department", function (error, res) {
    showDepartments = res.map(department => ({ name: department.name, value: department.id }))
  })
  // This function will show all the employees while retaining the id as its value
  connection.query("SELECT * from employee", function (error, res) {
    showEmployees = res.map(employee => ({ name: `${employee.first_name} ${employee.last_name}`, value: employee.id }))
  })
  startPrompt();
});

connection.query = utils.promisify(connection.query)

// This is the initial function that will prompt the user to choose what they would like to do
function startPrompt() {
    inquirer.prompt([
    {
    type: "list",
    message: "What would you like to do?",
    name: "choice",
    choices: [
              "View all employees", 
              "View roles",
              "View departments", 
              "Update employee",
              "Add employee",
              "Add role",
              "Add department"
            ]
    }
    ]).then(function(value) {
        // This is a switch case that will run the corresponding function for the user's choice
        switch (value.choice) {
            case "View all employees":
                viewAllEmployees();
            break;
            case "View roles":
                viewAllRoles();
            break;
            case "View departments":
                viewAllDepartments();
            break;
            case "Add employee":
                addEmployee();
            break;
            case "Update employee":
                updateEmployee();
            break;
            case "Add role":
                addRole();
            break;
            case "Add department":
                addDepartment();
            break;
        }
    })
}

// This is the function that will show all of the employees in a table in the console
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

// This is the function that will show all of the roles in a table in the console
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

// This is the function that will show all of the Departments in a table in the console
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

// This function will add an employee to the database
function addEmployee() {
    inquirer.prompt([
        {
            name: "firstName",
            type: "input",
            message: "First Name: "
        },
        {
            name: "lastName",
            type: "input",
            message: "Last Name: "
        },
        {
            name: "role",
            type: "list",
            message: "Please select the employee's role: ",
            choices: showRoles
        },
        {
            name: "manager",
            type: "list",
            message: "Please select the employee's manager: ",
            choices: showEmployees
        }
    ]).then((answer) => {
        // Here I am inserting the user's answers into the database
        connection.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id)VALUES ("${answer.firstName}", "${answer.lastName}", "${answer.role}", "${answer.manager}");`, (err, res) => {
            if(err) return err;
            console.log("\n Employee Added \n ");
            startPrompt();
        });
    });
}

function updateEmployee() {

}

// This function will add a role to the database
function addRole() {
    inquirer.prompt([
        {
            name: "roleName",
            type: "input",
            message: "Role Name: "
        },
        {
            name: "salary",
            type: "input",
            message: "Salary: "
        },
        {
            name: "dept",
            type: "list",
            message: "Please select the department: ",
            choices: showDepartments
        }
    ]).then((answer) => {
        connection.query(`INSERT INTO role (title, salary, department_id)VALUES ("${answer.roleName}", "${answer.salary}", "${answer.dept}");`, (err, res) => {
            if(err) return err;
            console.log("\n Role Added \n ");
            startPrompt();
        });
    });
}

// This function will add a department to the database
function addDepartment() {
    inquirer.prompt({
            name: "deptName",
            type: "input",
            message: "Department Name: "
        }).then((answer) => {
            connection.query(`INSERT INTO department (name)VALUES ("${answer.deptName}");`, (err, res) => {
                if(err) return err;
                console.log("\n Department Added \n ");
                startPrompt();
            });
    });
}