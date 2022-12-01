USE employee_trackerDB;

INSERT INTO department (name)
VALUES ("Sales");
INSERT INTO department (name)
VALUES ("Engineering");
INSERT INTO department (name)
VALUES ("Finance");
INSERT INTO department (name)
VALUES ("Legal");

INSERT INTO role (title, salary, department_id)
VALUES ("Sales Lead", 100000, 1);
INSERT INTO role (title, salary, department_id)
VALUES ("Lead Engineer", 150000, 2);
INSERT INTO role (title, salary, department_id)
VALUES ("Software Engineer", 120000, 2);
INSERT INTO role (title, salary, department_id)
VALUES ("Accountant", 125000, 3);
INSERT INTO role (title, salary, department_id)
VALUES ("Actuary", 115000, 3);
INSERT INTO role (title, salary, department_id)
VALUES ("Legal Team Lead", 250000, 4);
INSERT INTO role (title, salary, department_id)
VALUES ("Lawyer", 190000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Andres", "Perez", 4, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Marcelo", "Jose", 2, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Cecily", "Mae", 3, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Bethany", "Marie", 1, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Wendy", "Cecile", 5, 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Elba", "Perez", 2, 2);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Damian", "Bebe", 6, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Veronica", "Elbita", 7, 4);