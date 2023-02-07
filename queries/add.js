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

// function to add a new department
function addDepartment() {

    // makes inquire gather new department info
    inquirer
    .prompt([
        {
            type: "input",
            name: "name",
            message: "Please enter the name of the department you'd like to add:"
        }
    ])
    .then((data) => {
        // makes mysql query with new department name
        const newDepartmentName= data.name.toLowerCase();

        // if user did not enter any department
        if (data.name.trim() === "") {
            error.viewNullErr(); 
            return;
        };

        // mysql query to retrieve existing departments to eliminate duplicate entries
        db.query("SELECT department.name FROM department",(err,results)=>{

            const resultString = JSON.stringify(results)
            if (resultString.includes(newDepartmentName)) {
                // function to alert user that data already exists
                error.viewDuplicateErr();
                return;
            };

            db.query(`INSERT INTO department (name) VALUES ("${newDepartmentName}")`,(err,results)=>{

                // catches and displays error
                if (err) {
                    console.log(err);
                    // takes user back to main menu
                    next.menu();
                };
    
                if (!err) {
                    // alerts user the new department has been added
                    console.log("\nNew Department Added!\n");
                    // takes user back to main menu
                    next.menu();
                }
            });
        });

    });

};

// function to add a role
function addRole() {

    const departmentArray = [];

    // makes a mysql query to the database for current roles
    db.query("SELECT name FROM department",(err,results)=>{


        // loops over results and pushes each title to array
        for (result of results) {
            
            // loops over results and pushes department names into array
            let departmentName = result.name;
            departmentArray.push(departmentName);

        }

        // makes inquirer gather info on new role
        inquirer
        .prompt([
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
                choices: departmentArray
            }
        
        ])
        .then((data)=>{

            // if user enters a non-number for salary
            if (isNaN(data.salary)) {
                console.log("\nPlease enter a number for salary!\n");
                next.menu();
                return;
            };


            // if user selects more than one department for the new role
            if (data.department.length === 0 || data.department.length >1) {
                error.viewErrMultiple();
                return;
            };

            // if user enters nothing for new role name
            if (data.title.trim() === "" || data.salary.trim() === "") {
                error.viewNullErr();
                return;
            };

            // makes mysql query with new role name
            const newRoleName = data.title.toLowerCase();
            const newRoleSalary = data.salary;
            const newRoleDepartment = data.department[0].toLowerCase();

            // mysql query to retrieve existing roles in each department
            db.query("SELECT role.title AS role, department.name AS department FROM role JOIN department ON role.department_id = department.id;",(err,results)=>{
                
                // eliminates duplicate entries
                for (result of results) {

                    // loops through results for matching roles in each department
                    if (newRoleName === result.role && newRoleDepartment === result.department) {

                        // if matched for both role and department
                        error.viewDuplicateErr();
                        return;
                    };

                };

                db.query(`SELECT id FROM department WHERE name = "${data.department}"`,(err,results)=>{

                    // catches and displays error and takes use back to main menu
                    if (err) {
                        console.log(err);
                        next.menu();
                    };
        
                    if (!err) {
                        // assigns department id number to variable for query
                        const departmentId = results[0].id
                        // mysql query to insert new role
                        db.query(`INSERT INTO role (title, salary, department_id) VALUES ("${newRoleName}",${newRoleSalary},"${departmentId}")`);
        
                            // catches and displays error and takes user back to main menu
                            if (err) {
                                console.log(err);
                                next.menu();
                            };
        
                            if (!err) {
                                // alerts user the new role has been added
                                console.log("\nNew Role Added!\n");
                                // takes user back to main menu
                                next.menu();
                            };
                    };
        
                });


            })
            

            
        })
    });
    

};

// function to add an employee
function addEmployee() {

    const roleArray = [];

    const employeeArray =[];

    // makes a mysql query to the database for all current role titles
    db.query('SELECT role.title FROM role',(err,results)=> {


        // loops over results and pushes each title into array
        for (result of results) {

            let roleTitle = result.title;
            roleArray.push(roleTitle);
 
        };
        // makes a mysql query to the database for current employees' names
        db.query("SELECT employee.first_name, employee.last_name FROM employee",(err,results)=>{

            // loops over results and pushes each employee full name into array
            for (result of results) {
                let fullName = `${result.first_name} ${result.last_name}`;

                employeeArray.push(fullName);
                

            }

            // makes inquirer gather info on new employee
            inquirer
            .prompt([
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
                    choices: roleArray
                },
                {
                    type: "checkbox",
                    name: "manager",
                    message: "Please select the new employe's manager. If none, press enter to proceed:",
                    choices: employeeArray
                }
            ])
            .then((data)=>{

                // if user enters nothing for first or last name
                if (data.first.trim()==="" || data.last.trim()==="") {
                    error.viewNullErr();
                    return;
                };

                // assigns new employee's first and last name to variables
                const newEmployeeFName = data.first.toUpperCase().replaceAll(" ","");
                const newEmployeeLName = data.last.toUpperCase().replaceAll(" ","");

                if (data.role.length === 0 || data.role.length > 1) {
                    error.viewErrMultiple();
                    return;
                };

                // mysql query to retrieve role id
                db.query(`SELECT id FROM role WHERE title = "${data.role}"`,(err,results)=>{

                    // catches and displays error and takes user back to main menu
                    if (err) {
                        console.log(err);
                        next.menu();
                    };

                    if (!err && data.manager.length > 1) {
                        error.viewErrMultiple();
                        return;
                    };

                    if (!err && data.manager.length !==0) {

                        // retrieves role id from inquirer data
                        const newEmployeeRoleId = results[0].id;

                        // mysql query to retrieve manager's employee id
                        db.query(`SELECT id FROM employee WHERE first_name = "${data.manager[0].split(" ")[0]}" AND last_name = "${data.manager[0].split(" ")[1]}"`,(err,results)=>{
                
                            // catches and displays error and takes user back to main menu
                            if (err) {
                                console.log(err);
                                next.menu();
                            };

                            if (!err) {
                                const newEmployeeManagerId = results[0].id;

                                // mysql query to add new employee
                                db.query(`INSERT INTO employee (first_name,last_name,role_id,manager_id) VALUES ("${newEmployeeFName}","${newEmployeeLName}",${newEmployeeRoleId},${newEmployeeManagerId});`,(err,results)=>{
                                    
                                    // catches and displays error and takes user back to main menu
                                    if (err) {
                                        console.log(err);
                                        next.menu();
                                    };

                                    if (!err) {
                                        // alerts user the new employee has been added
                                        console.log("\nNew Employee Added!\n");
                                        // takes user back to main menu
                                        next.menu();
                                    };
                                })
                            };

                        });
                    };

                    // if no manager is selected
                    if (!err && data.manager.length === 0) {

                        // retrieves role id from inquirer data
                        const newEmployeeRoleId = results[0].id;

                        // mysql query to add new employee
                        db.query(`INSERT INTO employee (first_name,last_name,role_id) VALUES ("${newEmployeeFName}","${newEmployeeLName}",${newEmployeeRoleId});`,(err,results)=>{
                                    
                            // catches and displays error and takes user back to main menu
                            if (err) {
                                console.log(err);
                                next.menu();
                            };

                            if (!err) {
                                // alerts user the new employee has been added
                                console.log("\nNew Employee Added!\n");
                                // takes user back to main menu
                                next.menu();
                            };
                        })
                    }
                });

            })

        })

    })

    
};

// exports add functions
exports.addDepartment = addDepartment;
exports.addRole =  addRole;
exports.addEmployee = addEmployee;
