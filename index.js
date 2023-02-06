// imports inquirer package
const inquirer = require('inquirer');
// imports questions for inquirer prompts
const questions = require('./inquirer-prompt/questions');
// imports mysql query functions
const queries = require('./queries');
// imports banner module
const banner = require('./util/ascii-signature');''



// makes inquirer start prompt sequence
function startApp() {

    // displays app banner
    banner();

    inquirer.prompt(questions.menu)
    .then((data) => {

        // if user selects more than one option
        if (data.menu.length !== 1) {
            queries.viewErrMultiple();
        }

        // if user selects to view all departments
        if (data.menu[0] === "View All Departments" && data.menu.length === 1) {
            // mysql query to show all departments
            queries.viewDepartments();

        };
        // if user selects to view all roles
        if (data.menu[0] === "View All Roles" && data.menu.length === 1) {
            // mysql query to show all roles
            queries.viewRoles();

        };
        // if user selects to view all employees
        if (data.menu[0] === "View All Employees" && data.menu.length === 1) {
            // mysql query to show all employees
            queries.viewEmployees();

        };
        // if user selects to add a department
        if (data.menu[0] === "Add a Department" && data.menu.length === 1) {
            // mysql query to add the department
            queries.addDepartment();
            
        };
        // if user selects to add a role
        if (data.menu[0] === "Add a Role" && data.menu.length === 1) {
            // mysql query to add the role
            queries.addRole();
        };
        // if user selects to add an employee
        if (data.menu[0] === "Add an Employee" && data.menu.length === 1) {
            // mysql query to add the employee
            queries.addEmployee();
        };

        // if user selects to delete a department
        if (data.menu[0] === "Delete a Department" && data.menu.length === 1) {
            // mysql query to delete the department
            queries.deleteDepartment();
        };

        // if user selects to delete a role
        if (data.menu[0] === "Delete a Role" && data.menu.length === 1) {
            //mysql query to delete the role
            queries.deleteRole();
        };

        // if user selects to delete an employee
        if (data.menu[0] === "Delete an Employee" && data.menu.length === 1) {
            // mysql query to delete the employee
            queries.deleteEmployee();
        };

        // if user selects to update an employee's role
        if (data.menu[0] === "Update an Employee Role" && data.menu.length === 1) {
            // mysql query to update employee role
            queries.updateRole();
        };

        // if user selects to update an employee's manager 
        if (data.menu[0] === "Update Employee Manager" && data.menu.length === 1) {
            // mysql query to update manager
            queries.updateManager();
        };

        // if user selects to view employees by manager
        if (data.menu[0] === "View Employees by Manager" && data.menu.length === 1) {
            // mysql query to view employees by manager
            queries.viewEmployeeByManager();
        };

        // if user selects to view roles by department
        if (data.menu[0] === "View Roles by Department" && data.menu.length === 1) {
            // mysql query to view roles by department
            queries.viewRolesByDepartment();
        }

        // if user selects to view employees b y department
        if (data.menu[0] === "View Employees by Department" && data.menu.length === 1) {
            // mysql query to view employees by department
            queries.viewEmployeesByDepartment();
        };

        // if user selects to view total utilized budget by department
        if (data.menu[0] === "View Total Utilized Budget by Department" && data.menu.length === 1) {
            // mysql query to view total utilized budget by department
            queries.viewTotalBudget();
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




