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

// function to delete a department
function deleteDepartment() {


    const departmentArray = [];

    // makes a mysql query to the database for current departments
    db.query("SELECT name FROM department",(err,results)=>{


        // loops over results and pushes each title to array
        for (result of results) {
            
            // loops over results and pushes department names into array
            let departmentName = result.name;
            departmentArray.push(departmentName);

        };

        // makes inquirer ask which department to delete
        inquirer
        .prompt([
            {
                type: "checkbox",
                name: "name",
                message: "Please select which department you'd like to delete:",
                choices: departmentArray
            }
        ])
        .then((data)=>{

            // if user selects more than one department
            if (data.name.length !== 1) {
                error.viewErrMultiple();
                return;
            };

            // assigns name of the department to be deleted to a variable
            const deletedDepartment = data.name[0];

            // mysql query to delete selcted department
            db.query(`DELETE FROM department WHERE name = "${deletedDepartment}"`,(err,results)=>{

                // catches and displays error and takes user back to main menu
                if (err) {
                    console.log(err);
                    next.menu();
                };

                if (!err) {
                    // alerts user the department has been deleted
                    console.log("\nDepartment Deleted!\n");
                    // takes user back to main menu
                    next.menu();
                };
            })

        })


    })

    

    

};


// function to delete a role
function deleteRole() {

    const roleArray = [];

    // makes a mysql query to the database for all current role titles
    db.query('SELECT role.title FROM role',(err,results)=> {


        // loops over results and pushes each title into array
        for (result of results) {

            let roleTitle = result.title;
            roleArray.push(roleTitle);
 
        };

        // makes inquirer ask which role to delete
        inquirer
        .prompt([
            {
                type: "checkbox",
                name: "title",
                message: "Please select which role you'd like to delete:",
                choices: roleArray
            }
        ])
        .then((data)=>{

            // if user selects more than one role 
            if (data.title.length !== 1) {
                error.viewErrMultiple();
                return;
            };

            // assigns the role to be deleted to a variable
            const deletedRole = data.title[0];
            // mysql query to delete role
            db.query(`DELETE FROM role WHERE title = "${deletedRole}"`,(err,results)=>{

                // catches and displays error and takes user back to main menu
                if (err) {
                    console.log(err);
                    next.menu();
                };

                if (!err) {
                    // alerts user the role has been deleted
                    console.log("\nRole Deleted!\n");
                    // takes user back to main menu
                    next.menu();
                };
            });

        })
    })

};

// function to delete an employee
function deleteEmployee() {
    
    const employeeArray = [];
    
    // makes a mysql query to the database for current employees' names
    db.query("SELECT employee.first_name, employee.last_name FROM employee",(err,results)=>{

        // loops over results and pushes each employee full name into array
        for (result of results) {
            let fullName = `${result.first_name} ${result.last_name}`;

            employeeArray.push(fullName);
            

        };

        // makes inquirer ask which employee to delete
        inquirer
        .prompt([
            {
                type: "checkbox",
                name: "name",
                message: "Please select which employee you'd like to delete:",
                choices: employeeArray
            }
        ])
        .then((data)=>{

            // if user selects more than one employee
            if (data.name.length !==1) {
                error.viewErrMultiple();
                return;
            };

            // using methods to get first and last name of employee to be deleted
            const fullName = data.name[0];
            const fName = fullName.split(" ")[0];
            const lName = fullName.split(" ")[1];

            // mysql query to delete employee
            db.query(`DELETE FROM employee WHERE first_name = "${fName}" AND last_name = "${lName}";`, (err,results)=>{

                // catches and display error and takes user back to main menu
                if (err) {
                    console.log(err);
                    next.menu();
                };

                if (!err) {
                    // alerts user the employee has been deleted
                    console.log("\nEmployee Deleted!\n")
                    // takes user back to main menu
                    next.menu();
                };
            })

        })
    });
    
};

// exports delete functions
exports.deleteDepartment = deleteDepartment;
exports.deleteEmployee = deleteEmployee;
exports.deleteRole = deleteRole;
