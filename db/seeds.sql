INSERT INTO department (id, name)
VALUES  (1, "Finance"),
        (2, "Marketing"),
        (3, "Engineering");

INSERT INTO role (id, title, salary, department_id)
VALUES  (1, "Accountant", 100000, 1),
        (2, "Data Analyst", 120000, 1),
        (3, "Finance Lead", 140000, 1),
        (4, "Photo Editor", 60000, 2),
        (5, "Graphic Designer", 80000, 2),
        (6, "Creative Director", 120000, 2),
        (7, "Intern", 40000, 3),
        (8, "Full-stack Developer", 100000, 3),
        (9, "Senior Engineer", 130000, 3);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES  (3, "Alex", "Klingler", 3, NULL),
        (1, "Graham", "Mullins", 1, 3),
        (2, "Zachary", "Mckinley", 2, 3),
        (7, "Cesar", "Hernandez", 6, NULL),
        (4, "Anton", "Gress", 4, 7),
        (5, "Keri", "Svenson", 4, 7),
        (6, "Noah", "Protolii", 5, 7),
        (10, "Josh", "Ramos", 9, NULL),
        (8, "William", "Johnson", 7, 10),
        (9, "Carolyn", "Humphrey", 8, 10); 