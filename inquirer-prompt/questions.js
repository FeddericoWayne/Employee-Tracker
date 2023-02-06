const data = require("../util/data-retrieve");


// inquirer question array for main menu
const menu = [
    {
        type: "checkbox",
        name: "menu",
        message: "What would you like to do?",
        choices: ["View All Departments","View All Roles","View All Employees","View Employees by Manager","View Employees by Department","View Roles by Department","View Total Utilized Budget by Department","Add a Department","Add a Role","Add an Employee","Update an Employee Role","Update Employee Manager","Delete a Department","Delete a Role","Delete an Employee","Exit"]
    }
];

// inquirer question array for adding a new department
const newDepartment = [
    {
        type: "input",
        name: "name",
        message: "Please enter the name of the department you'd like to add:"
    }
];

// inquirer question array for adding a new role
const newRole = [
    {
        type: "input",
        name: "title",
        message: "Please enter the title of the new role:"
    },
    {
        type: "input",
        name: "salary",
        message: "Please enter the salary of the new role:"
    },
    {
        type: "checkbox",
        name: "department",
        message: "Please select the department of the new role:",
        choices: data.getCurrentDepartments()
    }

];

// inquirer question array for adding a new employee
const newEmployee = [
    {
        type: "input",
        name: "first",
        message: "Please enter the new employee's first name:"
    },
    {
        type: "input",
        name: "last",
        message: "Please enter the new employee's last name:"
    },
    {
        type: "checkbox",
        name: "role",
        message: "Please select the new employee's job title:",
        choices: data.getCurrentRoles()
    },
    {
        type: "checkbox",
        name: "manager",
        message: "Please select the new employe's manager. If none, press enter to proceed:",
        choices: data.getCurrentEmployees()
    }
];

// inquirer question array for department deletion
const delDepartment = [
    {
        type: "checkbox",
        name: "name",
        message: "Please select which department you'd like to delete:",
        choices: data.getCurrentDepartments()
    }
];

// inquirer question array for role deletion
const delRole =[
    {
        type: "checkbox",
        name: "title",
        message: "Please select which role you'd like to delete:",
        choices: data.getCurrentRoles()
    }
];

// inquirer question array for employee deletion
const delEmployee = [
    {
        type: "checkbox",
        name: "name",
        message: "Please select which employee you'd like to delete:",
        choices: data.getFullName()
    }
]

// inquirer question array for employee role update
const uDRole = [
    {
        type: "checkbox",
        name: "name",
        message: "Please select the employee for whom you'd like to update role:",
        choices: data.getCurrentEmployees()
    },
    {
        type: "checkbox",
        name: "role",
        message: "Please select new role for the selected employee:",
        choices: data.getCurrentRoles()
    }
];

// inquirer question array for updating employee manager
const uDManager = [
    {
        type: "checkbox",
        name: "name",
        message: "Please select the employee whose manager you'd like to update:",
        choices: data.getCurrentEmployees()
    },
    {
        type: "checkbox",
        name: "manager",
        message: "Please assign the selected employee with the new manager:",
        choices: data.getCurrentEmployees()
    }
];

// inquirer question array for viewing employees by manager
const viewByManager = [
    {
        type: "checkbox",
        name: "manager",
        message: "Please select the manager whose subordinate employees you'd like to view:",
        choices: data.getCurrentEmployees()
    }
];

// inquirer question array for viewing roles by department
const rolesByDepartment = [
    {
        type: "checkbox",
        name: "department",
        message: "Please select the department whose roles you'd like to view:",
        choices: data.getCurrentDepartments()
    }
];

// inquirer question array for viewing employees by department
const employeesByDepartment = [
    {
        type: "checkbox",
        name: "department",
        message: "Please select the department whose employees you'd like to view:",
        choices: data.getCurrentDepartments()
    }
];



// exports inquirer prompts
module.exports = {
    menu,
    newDepartment,
    newEmployee,
    newRole,
    delDepartment,
    delRole,
    delEmployee,
    uDRole,
    uDManager,
    viewByManager,
    rolesByDepartment,
    employeesByDepartment, 
}