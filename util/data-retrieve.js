// TODO: write codes to retrieve current department, role, and employee data and export
const mysql = require('mysql2');
// establishes connection to database
const db = mysql.createConnection(
    {
        host: "localhost",
        user: "root",
        password: "FeddericoWayne",
        database: "company_db"
    } 
);


// function to retrieve current roles from database
function getCurrentRoles() {

    const roleArray = [];

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




module.exports = {
    getCurrentDepartments,
    getCurrentEmployees,
    getCurrentRoles,
    getFullName
}