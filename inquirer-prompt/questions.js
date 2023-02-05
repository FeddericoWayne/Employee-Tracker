// imports mysql2
const mysql = require('mysql2');

// creates connection to database
const db = mysql.createConnection(

    // authorization info
    {
        host: "localhost",
        user: "root",
        password: "FeddericoWayne",
        database: "company_db"
    }
);

// function to retrieve current roles from database
function getCurrentRoles() {

    let roleArray = [];

    // makes a mysql query to the database for all current role titles
    db.query('SELECT role.title FROM role',(err,results)=> {



        // loops over results and pushes each title into array
        for (result of results) {

            let roleTitle = result.title;
            roleArray.push(roleTitle);
 
        };


    })
    // outputs finished array
    return roleArray;
    
};

// function to retrieve current employees from database
function getCurrentEmployees() {

    const employeeArray = [];
    
    // makes a mysql query to the database for current employees' names
    db.query("SELECT employee.first_name, employee.last_name FROM employee",(err,results)=>{

        // loops over results and pushes each employee full name into array
        for (result of results) {
            let fullName = `${result.first_name} ${result.last_name}`;

            employeeArray.push(fullName);
        }

        
    })

    // outputs finished array
    return employeeArray;
    

};



// function to retrieve current departments from database
function getCurrentDepartments() {

    let departmentArray = [];

    // makes a mysql query to the database for current roles
    db.query("SELECT name FROM department",(err,results)=>{

        // loops over results and pushes each title to array
        for (result of results) {
            
            // loops over results and pushes department names into array
            let departmentName = result.name;
            departmentArray.push(departmentName);

        }

    })
    // outputs finished array
    return departmentArray;
};

// function to retrieve employee full name
function getFullName() {

    let nameArray = [];

    // makes a mysql query to retrieve first and last names of current employees
    db.query("SELECT first_name, last_name FROM employee", (err,results)=>{

        // loops through results and pushes employee full names to array
        for (result of results) {
            // assigns template literal full name to a variable
            const fullName = `${result.first_name} ${result.last_name}`;
            nameArray.push(fullName);
        }
    })
    return nameArray;
};



// inquirer question array for main menu
const menu = [
    {
        type: "checkbox",
        name: "menu",
        message: "What would you like to do?",
        choices: ["View All Departments","View All Roles","View All Employees","Add a Department","Add a Role","Add an Employee","Update an Employee Role","Update Employee Manager","View Employees by Manager","View Employees by Department","View Roles by Department","Delete a Department","Delete a Role","Delete an Employee","View Total Utilized Budget by Department","Exit"]
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
        choices: getCurrentDepartments()
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
        choices: getCurrentRoles()
    },
    {
        type: "checkbox",
        name: "manager",
        message: "Please select the new employe's manager. If none, press enter to proceed:",
        choices: getCurrentEmployees()
    }
];

// inquirer question array for department deletion
const delDepartment = [
    {
        type: "checkbox",
        name: "name",
        message: "Please select which department you'd like to delete:",
        choices: getCurrentDepartments()
    }
];

// inquirer question array for role deletion
const delRole =[
    {
        type: "checkbox",
        name: "title",
        message: "Please select which role you'd like to delete:",
        choices: getCurrentRoles()
    }
];

// inquirer question array for employee deletion
const delEmployee = [
    {
        type: "checkbox",
        name: "name",
        message: "Please select which employee you'd like to delete:",
        choices: getFullName()
    }
]

// inquirer question array for employee role update
const uDRole = [
    {
        type: "checkbox",
        name: "name",
        message: "Please select the employee for whom you'd like to update role:",
        choices: getCurrentEmployees()
    },
    {
        type: "checkbox",
        name: "role",
        message: "Please select new role for the selected employee:",
        choices: getCurrentRoles()
    }
];

// inquirer question array for updating employee manager
const uDManager = [
    {
        type: "checkbox",
        name: "name",
        message: "Please select the employee whose manager you'd like to update:",
        choices: getCurrentEmployees()
    },
    {
        type: "checkbox",
        name: "manager",
        message: "Please assign the selected employee with the new manager:",
        choices: getCurrentEmployees()
    }
];

// inquirer question array for viewing employees by manager
const viewByManager = [
    {
        type: "checkbox",
        name: "manager",
        message: "Please select the manager whose subordinate employees you'd like to view:",
        choices: getCurrentEmployees()
    }
];

// inquirer question array for viewing roles by department
const rolesByDepartment = [
    {
        type: "checkbox",
        name: "department",
        message: "Please select the department whose roles you'd like to view:",
        choices: getCurrentDepartments()
    }
];

// inquirer question array for viewing employees by department
const employeesByDepartment = [
    {
        type: "checkbox",
        name: "department",
        message: "Please select the department whose employees you'd like to view:",
        choices: getCurrentDepartments()
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