// imports the module that takes the user back to main menu
const next = require('../queries/next');

// function to alert user that more than one option was selected
function viewErrMultiple() {
    // alert
    console.log("\nPlease select one option to proceed!\n");
    // takes user back to main menu
    next.menu();
}

// function to alert user that data entered already exists in database
function viewDuplicateErr() {
    // alert
    console.log("\nData entered already exists!\n");
    // takes user back to main menu
    next.menu();
}

// function to alert user that data is needed
function viewNullErr() {
    // alert
    console.log("\nPlease enter necessary info to proceed!\n");
    // takes user back to main menu
    next.menu();
};

// function to alert user that data does not exist
function viewEmptyErr() {
    // alert
    console.log("\nData not found!\n");
    // takes user back to main menu
    next.menu();
};

// exports error functions
exports.viewErrMultiple = viewErrMultiple;
exports.viewDuplicateErr = viewDuplicateErr;
exports.viewEmptyErr = viewEmptyErr;
exports.viewNullErr = viewNullErr;