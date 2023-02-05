// imports mysql2 package
const mysql = require('mysql2');
// imports console.table package
const ctable = require('console.table');
//imports inquirer for prompts
const inquirer= require('inquirer');
// imports questions for inquirer
const questions = require('./inquirer-prompt/questions');



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

// function to handle recursive main menu inquirer prompt
function next() {
    inquirer
    .prompt(questions.menu)
    .then((data)=>{

        if (data.menu.length !== 1) {
            // function that alerts user to select only one option
            viewErrMultiple();
            
        }

        if (data.menu[0] === "View All Departments" && data.menu.length === 1) {
            // function that displays all departments
            viewDepartments();

        };

        if (data.menu[0] === "View All Roles" && data.menu.length === 1) {
            // function that displays all roles 
            viewRoles();

        };

        if (data.menu[0] === "View All Employees" && data.menu.length === 1) {
            // function that displays all employees
            viewEmployees();
        };

        if (data.menu[0] === "Add a Department" && data.menu.length === 1) {
            // function that adds new department to database
            addDepartment();
        };

        if (data.menu[0] === "Add a Role" && data.menu.length === 1) {
            // function that adds new role to database
            addRole();
        }

        if (data.menu[0] === "Add an Employee" && data.menu.length === 1) {
            // function that adds a new employee to the database
            addEmployee();
        };

        if (data.menu[0] === "Delete a Department" && data.menu.length === 1) {
            // functio to delete department
            deleteDepartment();
        };

        if (data.menu[0] === "Delete a Role" && data.menu.length === 1) {
            // function to delete a role
            deleteRole();
        };

        if (data.menu[0] === "Delete an Employee" && data.menu.length === 1) {
            //function to delete an employee
            deleteEmployee();
        };

        if (data.menu[0] === "Update an Employee Role" && data.menu.length === 1) {
            // function that updates an employee's role
            updateRole();
        };

        if (data.menu[0] === "Update Employee Manager" && data.menu.length === 1)  {
            // function that updates an employee's manager
            updateManager();
        };

        if (data.menu[0] === "View Employees by Manager" && data.menu.length === 1) {
            // function that allows user to view subordinate employees of specific managers
            viewEmployeeByManager();
        };

        if (data.menu[0] === "View Roles by Department" && data.menu.length === 1) {
            // function that allows user to view all roles in a specified department
            viewRolesByDepartment();
        };

        if (data.menu[0] === "View Employees by Department" && data.menu.length === 1) {
            // function that allows user to view all employees inside a specified departrment
            viewEmployeesByDepartment();
        };

        if (data.menu[0] === "View Total Utilized Budget by Department" && data.menu.length === 1) {
            // function that allows user to view total utilized budget of a specified department
            viewTotalBudget();
        };

        if (data.menu[0] === "Exit" && data.menu.length === 1) {
            // exits the app
            process.exit();
        };




    })
};

// function to alert user that more than one option was selected
function viewErrMultiple() {
    // alert
    console.log("\nPlease select only one option to proceed!\n");
    // takes user back to main menu
    next();
}

// function to display all departments
function viewDepartments() {

    // query to display all departments
    db.query('SELECT department.id AS department_id, department.name AS department_name FROM department ORDER BY department_id',(err,results)=>{

        // catches and displays error
        if (err) {
            console.log(err);
            // takes user back to main menu
            next();
        };

        if (!err) {
            // header for department table
            console.log("\nViewing All Departments:\n");
            // displays departments
            console.table(results);
            // takes user back to main menu
            next();
        };

    });

}

// funcgtion to display all roles
function viewRoles() {

    // query to display all departments
    db.query('SELECT role.id AS job_id, role.title AS job_title, department.name AS department, role.salary FROM role JOIN department ON role.department_id = department.id ORDER BY department, job_id;',(err,results)=>{
        
        // catches and displays error
        if (err) {
            console.log(err);
            // takes user back to main menu
            next;
        };

        if (!err) {
            console.log(err);
            // header for role table
            console.log("\nViewing All Roles:\n");
            // displays roles
            console.table(results);
            // takes user back to main menu
            next();
        };

    })


};

// function to view all employees
function viewEmployees() {

    // query to format and display all employees
    db.query('SELECT e.id, e.first_name, e.last_name, role.title AS job_title, department.name AS department, role.salary AS salary, m.first_name AS manager_first_name, m.last_name AS manager_last_name FROM employee e JOIN employee m ON e.manager_id = m.id JOIN role ON e.role_id = role.id JOIN department on role.department_id = department.id ORDER BY id;',(err,results)=>{
        
        // catches and displays error
        if (err) {
            console.log(err);
            // takes user back to main menu
            next()
        };

        if (!err) {
            // header for employee table
            console.log("\nViewing All Employees:\n");
            // displays employees
            console.table(results);
            // takes user back to main menu
            next();
        };

    })

};

// function to add a new department
function addDepartment() {

    // makes inquire gather new department info
    inquirer
    .prompt(questions.newDepartment)
    .then((data) => {
        // makes mysql query with new department name
        const newDepartmentName= data.name.toLowerCase();
        db.query(`INSERT INTO department (name) VALUES ("${newDepartmentName}")`,(err,results)=>{

            // catches and displays error
            if (err) {
                console.log(err);
                // takes user back to main menu
                next();
            };

            if (!err) {
                // alerts user the new department has been added
                console.log("\nNew Department Added!\n");
                // takes user back to main menu
                next();
            }
        });

    });

};

// function to add a role
function addRole() {

    // makes inquirer gather info on new role
    inquirer
    .prompt(questions.newRole)
    .then((data)=>{

        // if user enters a non-number for salary
        if (isNaN(data.salary)) {
            console.log("\nPlease enter a number for salary!\n");
            next();
            return;
        };

        // makes mysql query with new role name
        const newRoleName = data.title.toLowerCase();
        const newRoleSalary = data.salary;
        
        db.query(`SELECT id FROM department WHERE name = "${data.department}"`,(err,results)=>{

            // catches and displays error and takes use back to main menu
            if (err) {
                console.log(err);
                next();
            };

            if (!err) {
                // assigns department id number to variable for query
                const departmentId = results[0].id
                // mysql query to insert new role
                db.query(`INSERT INTO role (title, salary, department_id) VALUES ("${newRoleName}",${newRoleSalary},"${departmentId}")`);

                    // catches and displays error and takes user back to main menu
                    if (err) {
                        console.log(err);
                        next();
                    };

                    if (!err) {
                    // alerts user the new role has been added
                    console.log("\nNew Role Added!\n");
                    // takes user back to main menu
                    next();
                    };
            };

        })
        
    })

};

// function to add an employee
function addEmployee() {

    // makes inquirer gather info on new employee
    inquirer
    .prompt(questions.newEmployee)
    .then((data)=>{

        // assigns new employee's first and last name to variables
        const newEmployeeFName = data.first.toUpperCase().replaceAll(" ","");
        const newEmployeeLName = data.last.toUpperCase().replaceAll(" ","");

        // mysql query to retrieve role id
        db.query(`SELECT id FROM role WHERE title = "${data.role}"`,(err,results)=>{

            // catches and displays error and takes user back to main menu
            if (err) {
                console.log(err);
                next();
            };

            if (!err) {
                // retrieves role id from inquirer data
                const newEmployeeRoleId = results[0].id;

                // mysql query to retrieve manager's employee id
                db.query(`SELECT id FROM employee WHERE first_name = "${data.manager[0].split(" ")[0]}" AND last_name = "${data.manager[0].split(" ")[1]}"`,(err,results)=>{
        
                    // catches and displays error and takes user back to main menu
                    if (err) {
                        console.log(err);
                        next();
                    };

                    if (!err) {
                        const newEmployeeManagerId = results[0].id;

                        // mysql query to add new employee
                        db.query(`INSERT INTO employee (first_name,last_name,role_id,manager_id) VALUES ("${newEmployeeFName}","${newEmployeeLName}",${newEmployeeRoleId},${newEmployeeManagerId});`,(err,results)=>{
                            
                            // catches and displays error and takes user back to main menu
                            if (err) {
                                console.log(err);
                                next();
                            };

                            if (!err) {
                                // alerts user the new employee has been added
                                console.log("\nNew Employee Added!\n");
                                // takes user back to main menu
                                next();
                            };
                        })
                    };

                });
            };
        });

    })
};

// function to delete a department
function deleteDepartment() {
    
    // makes inquirer ask which department to delete
    inquirer
    .prompt(questions.delDepartment)
    .then((data)=>{

        // if user selects more than one department
        if (data.name.length !== 1) {
            viewErrMultiple();
            return;
        };

        // assigns name of the department to be deleted to a variable
        const deletedDepartment = data.name[0];

        // mysql query to delete selcted department
        db.query(`DELETE FROM department WHERE name = "${deletedDepartment}"`,(err,results)=>{

            // catches and displays error and takes user back to main menu
            if (err) {
                console.log(err);
                next();
            };

            if (!err) {
                // alerts user the department has been deleted
                console.log("\nDepartment Deleted!\n");
                // takes user back to main menu
                next();
            };
        })

    })
};

// function to delete a role
function deleteRole() {

    // makes inquirer ask which role to delete
    inquirer
    .prompt(questions.delRole)
    .then((data)=>{

        // if user selects more than one role 
        if (data.title.length !== 1) {
            viewErrMultiple();
            return;
        };

        // assigns the role to be deleted to a variable
        const deletedRole = data.title[0];
        // mysql query to delete role
        db.query(`DELETE FROM role WHERE title = "${deletedRole}"`,(err,results)=>{

            // catches and displays error and takes user back to main menu
            if (err) {
                console.log(err);
                next();
            };

            if (!err) {
                // alerts user the role has been deleted
                console.log("\nRole Deleted!\n");
                // takes user back to main menu
                next();
            };
        });

    })
};

// function to delete an employee
function deleteEmployee() {
    
    // makes inquirer ask which employee to delete
    inquirer
    .prompt(questions.delEmployee)
    .then((data)=>{

        // if user selects more than one employee
        if (data.name.length !==1) {
            viewErrMultiple();
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
                next();
            };

            if (!err) {
                // alerts user the employee has been deleted
                console.log("\nEmployee Deleted!\n")
                // takes user back to main menu
                next();
            };
        })

    })
};

// function to update an employee role
function updateRole() {

    // makes inquirer gather info on employee and role to be upated
    inquirer
    .prompt(questions.uDRole)
    .then((data)=>{ 

        // if user selects more than one employee or role
        if (data.name.length !== 1 || data.role.length !== 1) {
            viewErrMultiple();
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
                next();
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
                        next();
                    };
                })
            };

        })

    })
};

// function to update an employee's manager
function updateManager() {

    // makes inquirer gather employee and new manager info
    inquirer
    .prompt(questions.uDManager)
    .then((data)=>{

        // if user selects more than one employee or manager
        if (data.name.length !== 1 || data.manager.length !== 1) {
            viewErrMultiple();
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
                next();
            };

            if (!err) {
                // assigns manager id to variable
                const mId = results[0].id;

                // mysql query to update employee manager
                db.query(`UPDATE employee SET manager_id = ${mId} WHERE first_name = "${emFName}" AND last_name = "${emLName}"`,(err,results)=>{

                    // catches and displays error and takes user back to main menu
                    if (err) {
                        console.log(err);
                        next();
                    };

                    if (!err) {
                        // alerts user employee manager has been updated
                        console.log("\n Employee Manager Updated!\n");
                        // takes user back to main menu
                        next();
                    };
                })
            };
        })

    })
};

// function to view employees by manager
function viewEmployeeByManager() {
    
    // makes inquirer ask which manager the user wants to view the employees of
    inquirer
    .prompt(questions.viewByManager)
    .then((data)=>{

        // if user selects more than one manager
        if (data.manager.length !==1) {
            viewErrMultiple();
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
                next();
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
                        next();
                    };

                    if (!err) {
                    // header for table
                    console.log(`\nViewing Subordinate Employees of Manager ${managerFullName}:\n`);
                    // displays resulting table
                    console.table(results);
                    // takes user back to main menu
                    next();
                    };
                })
            };
        })

    })
};

// function to view roles by department
function viewRolesByDepartment() {

    // make inquirer ask which department the user wants to view roles of
    inquirer
    .prompt(questions.rolesByDepartment) 
    .then((data)=>{

        // if user selects more than one department
        if (data.department.length !== 1) {
            viewErrMultiple();
            return;
        };

        // assigns selected department to variable
        const selectedDep = data.department[0];

        // mysql query to locate department id
        db.query(`SELECT id FROM department WHERE name = "${selectedDep}"`,(err,results)=>{

            // catches and displays error and takes user back to main menu
            if (err) {
                console.log(err);
                next();
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
                    next();
                })

            };

        })


    })
};

// function to display employees by department
function viewEmployeesByDepartment() {

    // makes inquirer ask which department the user wants to view employees of
    inquirer
    .prompt(questions.employeesByDepartment)
    .then((data)=>{
        
        // if user selects more than one department
        if (data.department.length !== 1) {
            viewErrMultiple();
            return;
        };

        // assigns selected department to variable
        const selectedDepartment = data.department[0];
        // mysql query to locate department id
        db.query(`SELECT id FROM department WHERE name = "${selectedDepartment}"`,(err,results)=>{

            // catches and displays error and takes user back to main menu
            if (err) {
                console.log(err);
                next();
            };

            if (!err) {
                // assigns department id to variable
                const depId = results[0].id;
                // mysql query to locate role_ids of selected department
                db.query(`SELECT id FROM role WHERE department_id = ${depId}`,(err,results)=>{
                    
                    // catches and displays error and takes user back to main menu
                    if (err) {
                        console.log(err);
                        next();
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
                        db.query(`SELECT e.id, e.first_name, e.last_name, role.title AS job_title, department.name AS department, role.salary AS salary, m.first_name AS manager_first_name, m.last_name AS manager_last_name FROM employee e JOIN employee m ON e.manager_id = m.id JOIN role ON e.role_id = role.id JOIN department on role.department_id = department.id WHERE e.role_id IN (${roleIdParams}) ORDER BY e.id`,(err,results)=>{
                            
                            // catches and displays error and takes user back to main menu
                            if (err) {
                                console.log(err);
                                next();
                            };

                            if (!err) {
                                // table header
                                console.log(`\nViewing All Employees from the ${selectedDepartment} Department:\n`)
                                // displays resulting table
                                console.table(results)
                                // takes user back to main menu
                                next();
                            };
                        })
                    };
                })
            };
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
            next();
        };

        if (!err) {
            // table header
            console.log("\nViewing Total Utilized Budget by Department:\n")
            // displays resulting table
            console.table(results);
            // takes user back to main menu
            next();
        };
    })

};

// TODO: elimiate duplicate entries for role and department

// TODO: fix bug on getCurrentRoles, getCurrentEmployees, getCurrentDepartments




// exports query functions
module.exports = {
    viewErrMultiple,
    viewDepartments,
    viewRoles,
    viewEmployees,
    addDepartment,
    addRole,
    addEmployee,
    deleteDepartment,
    deleteRole,
    deleteEmployee,
    updateRole,
    updateManager,
    viewEmployeeByManager,
    viewRolesByDepartment,
    viewEmployeesByDepartment,
    viewTotalBudget
};