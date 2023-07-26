USE DATABASE servicesconin



CREATE TABLE users(
    id int (20) NOT NULL AUTO_INCREMNT PRIMARY KEY,
    username VARCHAR (70),
    password  VARCHAR(70),
    fullname VARCHAR(145),
    Email VARCHAR(245)
    


);

CREATE TABLE courses(

    id int not null auto_increment primary key,
    nombre_curso VARCHAR (200),
    decripcion TEXT,
    maestro VARCHAR (200),
    duracion VARCHAR (200),
    user_id int,
    created_at timestamp not null DEAFULT current_timestamp,
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users (id)

);