require('dotenv').config();
const dotenv=require('dotenv');
const inquirer = require('inquirer');
const mysql = require('mysql2');
const questions = require('./assets/questions');

// Connect to the employees_db
const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: process.env.DB_PASSWORD,
      database: 'employees_db'
    },
);


// View the data on a table with the table name passed in
const viewAllTable = (table) => {
    db.query(`SELECT * FROM ${table}`, (err, results) => {

        if (err) console.log(err);

        console.log('\n');
        console.table(results);
        console.log('\n');

        return askForCategory();
    });
}


// Add a department to database
const addDepartment = () => {
    inquirer
        .prompt(addDepartmentQuestions)
        .then((addDepartmentAnswer) => {

            const deptName = addDepartmentAnswer.name;

            db.query('INSERT INTO department (name) VALUES (?)', deptName, (err, results) => {

                if (err) console.log(err);

                console.log(`Added ${deptName} to the database.`);

                return askForCategory();
            });
        });
}



// Ask the user for what action they want to take with departments
const AskForDepartmentAction = () => {
    inquirer
        .prompt(departmentQuestions)
        .then((departmentAnswer) => {

            switch(departmentAnswer.action) {

                case "View All Departments":
                    return viewAllTable('department');

                case "Add A Department":
                    return addDepartment();
            }
        });
}

// Takes a message, property name, and object array of names to create a list question
const constructListQuestion = (message, name, objArray) => {
    let list = [];

    objArray.forEach(i => list.push(i.name));

    const question = {
        type: "list",
        message: message,
        name: name,
        choices: list
    }

    return question;
}

// Add a role to database
const addRole = () => {
    db.query('SELECT name FROM department', (err, results) => {

        addRoleQuestions.push(constructListQuestion("Choose a department for this role", "department", results));

        inquirer
            .prompt(addRoleQuestions)
            .then((addRoleAnswers) => {

                const title = addRoleAnswers.title;
                const salary = addRoleAnswers.salary;
                const department = addRoleAnswers.department;

                db.query('SELECT id FROM department WHERE name = ?', department, (err, results) => {

                    if (err) console.log(err);

                    const department_id = results[0].id;

                    db.query('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)', [title, salary, department_id], (err, results) => {                    

                        if (err) console.log(err);

                        console.log(`Added ${title} to the database.`);

                        return askForCategory();
                    });    
                })
            });
    })
}

//the user for what action they want to take with roles
const AskForRoleAction = () => {
    inquirer
        .prompt(roleQuestions)
        .then((roleAnswer) => {

            switch(roleAnswer.action) {

                case "View All Roles":
                    return viewAllTable('role');

                case "Add A Role":
                    return addRole();
            }
});

}
