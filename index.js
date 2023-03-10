// imports inquirer package
const inquirer = require('inquirer');
// imports banner module
const banner = require('./util/ascii-signature');
// imports view functions module
const view = require('./queries/view');
// imports add function module
const add = require('./queries/add');
// imports delete function module
const deleteData = require('./queries/delete');
// imports update function module
const update = require('./queries/update');
// imports error functions
const error = require('./queries/error');



// makes inquirer start prompt sequence
function startApp() {

    // displays app banner
    banner();

    inquirer.prompt([
        {
            type: "checkbox",
            name: "menu",
            message: "What would you like to do?",
            choices: ["View All Departments","View All Roles","View All Employees","View Employees by Manager","View Employees by Department","View Roles by Department","View Total Utilized Budget by Department","Add a Department","Add a Role","Add an Employee","Update an Employee Role","Update Employee Manager","Delete a Department","Delete a Role","Delete an Employee","Exit"]
        }
    ])
    .then((data) => {

        // if user selects more than one option
        if (data.menu.length !== 1) {
            error.viewErrMultiple();
        }

        // if user selects to view all departments
        if (data.menu[0] === "View All Departments" && data.menu.length === 1) {
            // mysql query to show all departments
            view.viewDepartments();

        };
        // if user selects to view all roles
        if (data.menu[0] === "View All Roles" && data.menu.length === 1) {
            // mysql query to show all roles
            view.viewRoles();

        };
        // if user selects to view all employees
        if (data.menu[0] === "View All Employees" && data.menu.length === 1) {
            // mysql query to show all employees
            view.viewEmployees();

        };
        // if user selects to add a department
        if (data.menu[0] === "Add a Department" && data.menu.length === 1) {
            // mysql query to add the department
            add.addDepartment();
            
        };
        // if user selects to add a role
        if (data.menu[0] === "Add a Role" && data.menu.length === 1) {
            // mysql query to add the role
            add.addRole();
        };
        // if user selects to add an employee
        if (data.menu[0] === "Add an Employee" && data.menu.length === 1) {
            // mysql query to add the employee
            add.addEmployee();
        };

        // if user selects to delete a department
        if (data.menu[0] === "Delete a Department" && data.menu.length === 1) {
            // mysql query to delete the department
            deleteData.deleteDepartment();
        };

        // if user selects to delete a role
        if (data.menu[0] === "Delete a Role" && data.menu.length === 1) {
            //mysql query to delete the role
            deleteData.deleteRole();
        };

        // if user selects to delete an employee
        if (data.menu[0] === "Delete an Employee" && data.menu.length === 1) {
            // mysql query to delete the employee
            deleteData.deleteEmployee();
        };

        // if user selects to update an employee's role
        if (data.menu[0] === "Update an Employee Role" && data.menu.length === 1) {
            // mysql query to update employee role
            update.updateRole();
        };

        // if user selects to update an employee's manager 
        if (data.menu[0] === "Update Employee Manager" && data.menu.length === 1) {
            // mysql query to update manager
            update.updateManager();
        };

        // if user selects to view employees by manager
        if (data.menu[0] === "View Employees by Manager" && data.menu.length === 1) {
            // mysql query to view employees by manager
            view.viewEmployeeByManager();
        };

        // if user selects to view roles by department
        if (data.menu[0] === "View Roles by Department" && data.menu.length === 1) {
            // mysql query to view roles by department
            view.viewRolesByDepartment();
        }

        // if user selects to view employees b y department
        if (data.menu[0] === "View Employees by Department" && data.menu.length === 1) {
            // mysql query to view employees by department
            view.viewEmployeesByDepartment();
        };

        // if user selects to view total utilized budget by department
        if (data.menu[0] === "View Total Utilized Budget by Department" && data.menu.length === 1) {
            // mysql query to view total utilized budget by department
            view.viewTotalBudget();
        };

        // if user selects to exit
        if (data.menu[0] === "Exit" && data.menu.length === 1) {
            // Exits node shell
            process.exit();
        };

    }

    )


}



// calls function to initiate app
startApp()




