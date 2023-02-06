-- creates seed data to populate tables --
USE company_db;

-- populates department table --
INSERT INTO department (name)
    VALUES
        ("headquarters"),
        ("design"),
        ("production"),
        ("marketing"),
        ("sales");


-- populates role table --
INSERT INTO role (title,salary,department_id)
    VALUES 
        ("ceo",250000,1),
        ("coo",200000,1),
        ("cfo",200000,1),
        ("creative director",150000,2),
        ("senior designer",110000,2),
        ("junior designer",95000,2),
        ("pattner maker",75000,2),
        ("production manager",80000,3),
        ("production assistant",70000,3),
        ("seamstress", 68000,3),
        ("marketing director",97000,4),
        ("social-media director",90000,4),
        ("advertisement manager",85000,4),
        ("sales manager",92000,5),
        ("sales associate",75000,5);


-- populates employee table --
INSERT INTO employee (first_name,last_name, role_id)
    VALUES
        ("MARIAH","CAREY",3),
        ("LUIS","DIAZ",5),
        ("JANE","DOE",10),
        ("SAM","SMITH",13),
        ("REBECCA","BLACK",12),
        ("JOHN","DOE",15);