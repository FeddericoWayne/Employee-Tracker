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


// function to update an employee role
function updateRole() {

    const employeeArray = [];

    const roleArray = [];
    
    // makes a mysql query to the database for current employees' names
    db.query("SELECT employee.first_name, employee.last_name FROM employee",(err,results)=>{

        // loops over results and pushes each employee full name into array
        for (result of results) {
            let fullName = `${result.first_name} ${result.last_name}`;

            employeeArray.push(fullName);
            

        };

        // makes a mysql query to the database for all current role titles
        db.query('SELECT role.title FROM role',(err,results)=> {


            // loops over results and pushes each title into array
            for (result of results) {

                let roleTitle = result.title;
                roleArray.push(roleTitle);

            };

            // makes inquirer gather info on employee and role to be upated
            inquirer
            .prompt([
                {
                    type: "checkbox",
                    name: "name",
                    message: "Please select the employee for whom you'd like to update role:",
                    choices: employeeArray
                },
                {
                    type: "checkbox",
                    name: "role",
                    message: "Please select new role for the selected employee:",
                    choices: roleArray
                }
            ])
            .then((data)=>{ 

                // if user selects more than one employee or role
                if (data.name.length !== 1 || data.role.length !== 1) {
                    error.viewErrMultiple();
                    return;
                };

                // assigns employee and updated role to variables
                const employeeFName = data.name[0].split(" ")[0];
                const employeeLName = data.name[0].split(" ")[1];
                const updatedRole = data.role[0];
                
                // mysql query to locate role id 
                db.query(`SELECT id FROM role WHERE title = "${updatedRole}"`,(err,results)=>{

                    // catches and displays error and takes user back to main menu
                    if (err) {
                        console.log(err);
                        next.menu();
                    };

                    if (!err) {

                        // assigns role id to variable
                        const newRoleId = results[0].id;

                        // mysql query to update role of selected employee
                        db.query(`UPDATE employee SET role_id = ${newRoleId} WHERE first_name = "${employeeFName}" AND last_name = "${employeeLName}";`,(err,results)=>{

                            // catches and displays error and takes use back to main menu
                            if (err) {
                                console.log(err);
                                return;
                            };

                            if (!err) {
                                // alerts user employee role has been updated
                                console.log("\nEmployee Role Updated!\n");
                                // takes user back to main menu
                                next.menu();
                            };
                        })
                    };

                })

            })

        })
    })
    
};

// function to update an employee's manager
function updateManager() {

    const employeeArray = [];
    
    // makes a mysql query to the database for current employees' names
    db.query("SELECT employee.first_name, employee.last_name FROM employee",(err,results)=>{

        // loops over results and pushes each employee full name into array
        for (result of results) {
            let fullName = `${result.first_name} ${result.last_name}`;

            employeeArray.push(fullName);
            

        };

        // makes inquirer gather employee and new manager info
        inquirer
        .prompt([
            {
                type: "checkbox",
                name: "name",
                message: "Please select the employee whose manager you'd like to update:",
                choices: employeeArray
            },
            {
                type: "checkbox",
                name: "manager",
                message: "Please assign the selected employee with the new manager. To set manager as none, press enter:",
                choices: employeeArray
            }
        ])
        .then((data)=>{

            // if user selects more than one employee or manager
            if (data.name.length !== 1 || data.manager.length >1) {
                error.viewErrMultiple();
                return;
            };

            if (data.manager.length === 0) {

                const emFName = data.name[0].split(" ")[0];
                const emLName = data.name[0].split(" ")[1];

                // mysql query to update employee manager
                db.query(`UPDATE employee SET manager_id = NULL WHERE first_name = "${emFName}" AND last_name = "${emLName}"`,(err,results)=>{

                    // catches and displays error and takes user back to main menu
                    if (err) {
                        console.log(err);
                        next.menu();
                    };

                    if (!err) {
                        // alerts user employee manager has been updated
                        console.log("\n Employee Manager Updated!\n");
                        // takes user back to main menu
                        next.menu();
                        
                    };
                })

                return;
            };

            // assigns employee and mananger name info to variables
            const emFName = data.name[0].split(" ")[0];
            const emLName = data.name[0].split(" ")[1];
            const mFName = data.manager[0].split(" ")[0];
            const mLName = data.manager[0].split(" ")[1];

            // mysql query to locate manager's employee id
            db.query(`SELECT id FROM employee WHERE first_name = "${mFName}" AND last_name = "${mLName}"`,(err,results)=>{
                
                // catches and displays error and takes user back to main menu
                if (err) {
                    console.log(err);
                    next.menu();
                };

                if (!err) {
                    // assigns manager id to variable
                    const mId = results[0].id;

                    // mysql query to update employee manager
                    db.query(`UPDATE employee SET manager_id = ${mId} WHERE first_name = "${emFName}" AND last_name = "${emLName}"`,(err,results)=>{

                        // catches and displays error and takes user back to main menu
                        if (err) {
                            console.log(err);
                            next.menu();
                        };

                        if (!err) {
                            // alerts user employee manager has been updated
                            console.log("\n Employee Manager Updated!\n");
                            // takes user back to main menu
                            next.menu();
                        };
                    })
                };
            })

        })

    })

}; 


// exports update functions
exports.updateRole = updateRole;
exports.updateManager = updateManager;
