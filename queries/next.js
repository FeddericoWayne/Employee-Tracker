// imports inquirer for prompts
const inquirer= require('inquirer');
// imports view functions module
const view = require('./view');
// imports add functions module
const add = require('./add');
// imports delete functions module
const deleteData = require('./delete');
// imports update functions module
const update = require('./update');
// imports error functions
const error = require('./error');

// function to handle recursive main menu inquirer prompt
function menu() {

    inquirer
    .prompt([
        {
            type: "checkbox",
            name: "menu",
            message: "What would you like to do?",
            choices: ["View All Departments","View All Roles","View All Employees","View Employees by Manager","View Employees by Department","View Roles by Department","View Total Utilized Budget by Department","Add a Department","Add a Role","Add an Employee","Update an Employee Role","Update Employee Manager","Delete a Department","Delete a Role","Delete an Employee","Exit"]
        }
    ])
    .then((data)=>{

        if (data.menu.length !== 1) {
            // function that alerts user to select only one option
            error.viewErrMultiple();
            
        }
 
        if (data.menu[0] === "View All Departments" && data.menu.length === 1) {
            // function that displays all departments
            view.viewDepartments();

        };

        if (data.menu[0] === "View All Roles" && data.menu.length === 1) {
            // function that displays all roles 
            view.viewRoles();

        };

        if (data.menu[0] === "View All Employees" && data.menu.length === 1) {
            // function that displays all employees
            view.viewEmployees();
        };

        if (data.menu[0] === "Add a Department" && data.menu.length === 1) {
            // function that adds new department to database
            add.addDepartment();
        };

        if (data.menu[0] === "Add a Role" && data.menu.length === 1) {
            // function that adds new role to database
            add.addRole();
        }

        if (data.menu[0] === "Add an Employee" && data.menu.length === 1) {
            // function that adds a new employee to the database
            add.addEmployee();
        };

        if (data.menu[0] === "Delete a Department" && data.menu.length === 1) {
            // functio to delete department
            deleteData.deleteDepartment();
        };

        if (data.menu[0] === "Delete a Role" && data.menu.length === 1) {
            // function to delete a role
            deleteData.deleteRole();
        };

        if (data.menu[0] === "Delete an Employee" && data.menu.length === 1) {
            //function to delete an employee
            deleteData.deleteEmployee();
        };

        if (data.menu[0] === "Update an Employee Role" && data.menu.length === 1) {
            // function that updates an employee's role
            update.updateRole();
        };

        if (data.menu[0] === "Update Employee Manager" && data.menu.length === 1)  {
            // function that updates an employee's manager
            update.updateManager();
        };

        if (data.menu[0] === "View Employees by Manager" && data.menu.length === 1) {
            // function that allows user to view subordinate employees of specific managers
            view.viewEmployeeByManager();
        };

        if (data.menu[0] === "View Roles by Department" && data.menu.length === 1) {
            // function that allows user to view all roles in a specified department
            view.viewRolesByDepartment();
        };

        if (data.menu[0] === "View Employees by Department" && data.menu.length === 1) {
            // function that allows user to view all employees inside a specified departrment
            view.viewEmployeesByDepartment();
        };

        if (data.menu[0] === "View Total Utilized Budget by Department" && data.menu.length === 1) {
            // function that allows user to view total utilized budget of a specified department
            view.viewTotalBudget();
        };

        if (data.menu[0] === "Exit" && data.menu.length === 1) {
            // exits the app
            process.exit();
        };




    })
};


exports.menu = menu;