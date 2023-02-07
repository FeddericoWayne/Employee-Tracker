// imports mysql2 package
const mysql = require('mysql2');
// imports console.table package
const ctable = require('console.table');
//imports inquirer for prompts
const inquirer= require('inquirer');
// imports the module that takes the user back to main menu
const next = require('../queries/next');
// imports error functions
const error = require('./error');
// imports dotenv package
require('dotenv').config();



// creates connection to database
const db = mysql.createConnection(

    // authorization info
    {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DATABASE
    }
);




// function to display all departments
function viewDepartments() {

    // query to display all departments
    db.query('SELECT department.id AS department_id, department.name AS department_name FROM department ORDER BY department_id',(err,results)=>{

        // catches and displays error
        if (err) {
            console.log(err);
            // takes user back to main menu
            next.menu();
        };

        if (!err) {
            // header for department table
            console.log("\nViewing All Departments:\n");
            // displays departments
            console.table(results);
            // takes user back to main menu
            next.menu();
        };

    });

};

// funcgtion to display all roles
function viewRoles() {

    // query to display all departments
    db.query('SELECT role.id AS job_id, role.title AS job_title, department.name AS department, role.salary FROM role JOIN department ON role.department_id = department.id ORDER BY department, job_id;',(err,results)=>{
        
        // catches and displays error
        if (err) {
            console.log(err);
            // takes user back to main menu
            next.menu();
        };

        if (!err) {
            // header for role table
            console.log("\nViewing All Roles:\n");
            // displays roles
            console.table(results);
            // takes user back to main menu
            next.menu();
        };

    })


};

// function to view all employees
function viewEmployees() {

    // query to format and display all employees
    db.query("SELECT e.id, e.first_name, e.last_name, IFNULL(role.title,'') AS job_title, IFNULL(department.name,'') AS department, IFNULL(role.salary,'') AS salary, IFNULL(m.first_name,'') AS manager_first_name, IFNULL(m.last_name,'') AS manager_last_name FROM employee e LEFT JOIN employee m ON e.manager_id = m.id LEFT JOIN role ON e.role_id = role.id LEFT JOIN department on role.department_id = department.id ORDER BY id;",(err,results)=>{
        
        // catches and displays error
        if (err) {
            console.log(err);
            // takes user back to main menu
            next.menu()
        };

        if (!err) {
            // header for employee table
            console.log("\nViewing All Employees:\n");
            // displays employees
            console.table(results);
            // takes user back to main menu
            next.menu();
        };

    })

};

// function to view employees by manager
function viewEmployeeByManager() {
    
    const employeeArray = [];
    
    // makes a mysql query to the database for current employees' names
    db.query("SELECT employee.first_name, employee.last_name FROM employee",(err,results)=>{

        // loops over results and pushes each employee full name into array
        for (result of results) {
            let fullName = `${result.first_name} ${result.last_name}`;

            employeeArray.push(fullName);
            
        };

        // makes inquirer ask which manager the user wants to view the employees of
        inquirer
        .prompt([
            {
                type: "checkbox",
                name: "manager",
                message: "Please select the manager whose subordinate employees you'd like to view:",
                choices: employeeArray
            }
        ])
        .then((data)=>{

            // if user selects more than one manager
            if (data.manager.length !==1) {
                error.viewErrMultiple();
                return;
            };

            // assigns manager name info to variable
            const managerFullName = data.manager[0];
            const managerFName = data.manager[0].split(" ")[0];
            const managerLName = data.manager[0].split(" ")[1];

            // mysql query to locate manager
            db.query(`SELECT id FROM employee WHERE first_name = "${managerFName}" AND last_name = "${managerLName}"`,(err,results)=>{

                // catches and displays error and takes user back to main menu
                if (err) {
                    console.log(err);
                    next.menu();
                };

                if (!err) {
                    // assigns manager employee id to variable
                    const managerId = results[0].id;

                    // mysql query to display selected manager's subordinates
                    //'SELECT e.id, e.first_name, e.last_name, role.title AS job_title, department.name AS department, role.salary AS salary, m.first_name AS manager_first_name, m.last_name AS manager_last_name FROM employee e JOIN employee m ON e.manager_id = m.id JOIN role ON e.role_id = role.id JOIN department on role.department_id = department.id;'
                    db.query(`SELECT employee.id, employee.first_name, employee.last_name, role.title AS job_title, department.name AS department, role.salary AS salary FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id WHERE employee.manager_id = ${managerId} ORDER BY id;`,(err,results)=>{

                        // catches and displays error and takes user back to main menu
                        if (err) {
                            console.log(err);
                            next.menu();
                        };

                        if (!err) {
                        // header for table
                        console.log(`\nViewing Subordinate Employees of Manager ${managerFullName}:\n`);
                        // displays resulting table
                        console.table(results);
                        // takes user back to main menu
                        next.menu();
                        };
                    })
                };
            })

        })
    });

    
};

// function to view roles by department
function viewRolesByDepartment() {

    const departmentArray = [];

    // makes a mysql query to the database for current roles
    db.query("SELECT name FROM department",(err,results)=>{


        // loops over results and pushes each title to array
        for (result of results) {
            
            // loops over results and pushes department names into array
            let departmentName = result.name;
            departmentArray.push(departmentName);

        };

        // make inquirer ask which department the user wants to view roles of
        inquirer
        .prompt([
            {
                type: "checkbox",
                name: "department",
                message: "Please select the department whose roles you'd like to view:",
                choices: departmentArray
            }
        ]) 
        .then((data)=>{

            // if user selects more than one department
            if (data.department.length !== 1) {
                error.viewErrMultiple();
                return;
            };

            // assigns selected department to variable
            const selectedDep = data.department[0];

            // mysql query to locate department id
            db.query(`SELECT id FROM department WHERE name = "${selectedDep}"`,(err,results)=>{

                // catches and displays error and takes user back to main menu
                if (err) {
                    console.log(err);
                    next.menu();
                };

                if (!err) {
                    // assigns department id to variable
                    const selectedDepId = results[0].id;

                    // mysql query to display all roles within selected department
                    db.query(`SELECT id AS role_id, title AS job_title, salary FROM role WHERE department_id = ${selectedDepId} ORDER BY id`,(err,results)=>{

                        // header for table
                        console.log(`\nViewing All Roles from the ${selectedDep} Department:\n`);
                        // displays table
                        console.table(results);
                        // takes user back to main menu
                        next.menu();
                    })

                };

            })

        })
    });
    
};

// function to display employees by department
function viewEmployeesByDepartment() {

    const departmentArray = [];

    // makes a mysql query to the database for current roles
    db.query("SELECT name FROM department",(err,results)=>{


        // loops over results and pushes each title to array
        for (result of results) {
            
            // loops over results and pushes department names into array
            let departmentName = result.name;
            departmentArray.push(departmentName);

        };

        // makes inquirer ask which department the user wants to view employees of
        inquirer
        .prompt([
            {
                type: "checkbox",
                name: "department",
                message: "Please select the department whose employees you'd like to view:",
                choices: departmentArray
            }
        ])
        .then((data)=>{
            
            // if user selects more than one department
            if (data.department.length !== 1) {
                error.viewErrMultiple();
                return;
            };

            // assigns selected department to variable
            const selectedDepartment = data.department[0];
            // mysql query to locate department id
            db.query(`SELECT id FROM department WHERE name = "${selectedDepartment}"`,(err,results)=>{

                // catches and displays error and takes user back to main menu
                if (err) {
                    console.log(err);
                    next.menu();
                };

                if (!err) {
                    // assigns department id to variable
                    const depId = results[0].id;
                    // mysql query to locate role_ids of selected department
                    db.query(`SELECT id FROM role WHERE department_id = ${depId}`,(err,results)=>{

                        if (results.length === 0) {
                            error.viewEmptyErr();
                            return;
                        };
                        
                        // catches and displays error and takes user back to main menu
                        if (err) {
                            console.log(err);
                            next.menu();
                        };

                        if (!err) {

                            const roleId = [];
                            // loops through results and pushes each role id to array
                            for (result of results) {
                                const currentRoleId = result.id;
                                roleId.push(currentRoleId);
                            }
                            
                            // forms parameter for mysql query
                            const roleIdParams = roleId.toString().replaceAll("[","").replaceAll("]","");

                            // mysql query to display employees in selected department
                            db.query(`SELECT e.id, e.first_name, e.last_name, role.title AS job_title, department.name AS department, role.salary AS salary, IFNULL(m.first_name,'') AS manager_first_name, IFNULL(m.last_name,'') AS manager_last_name FROM employee e LEFT JOIN employee m ON e.manager_id = m.id JOIN role ON e.role_id = role.id JOIN department on role.department_id = department.id WHERE e.role_id IN (${roleIdParams}) ORDER BY e.id`,(err,results)=>{
                                
                                // catches and displays error and takes user back to main menu
                                if (err) {
                                    console.log(err);
                                    next.menu();
                                };

                                if (!err) {
                                    // table header
                                    console.log(`\nViewing All Employees from the ${selectedDepartment} Department:\n`)
                                    // displays resulting table
                                    console.table(results)
                                    // takes user back to main menu
                                    next.menu();
                                };
                            })
                        };
                    })
                };
            })
        })

    })

    
};

// function to display total utilized budget by department
function viewTotalBudget() {

    
    // mysql query to display sum of each department
    db.query("SELECT department.name AS department, COALESCE(SUM(s.salary),0) AS total_utilized_budget FROM role r LEFT JOIN department ON r.department_id = department.id LEFT JOIN employee ON r.id = employee.role_id LEFT JOIN role s ON employee.role_id = s.id GROUP BY department ORDER BY total_utilized_budget DESC, department;",(err,results)=> {
        
        // catches and displays error and takes user back to main menu
        if (err) {
            console.log(err);
            next.menu();
        };

        if (!err) {
            // table header
            console.log("\nViewing Total Utilized Budget by Department:\n")
            // displays resulting table
            console.table(results);
            // takes user back to main menu
            next.menu();
        };
    })

}; 


// exports view functions
exports.viewDepartments = viewDepartments;
exports.viewRoles = viewRoles;
exports.viewEmployees = viewEmployees;
exports.viewEmployeeByManager = viewEmployeeByManager;
exports.viewRolesByDepartment = viewRolesByDepartment;
exports.viewEmployeesByDepartment = viewEmployeesByDepartment;
exports.viewTotalBudget = viewTotalBudget;

