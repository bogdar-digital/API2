-- creating the database
CREATE DATABASE crudenodejsmysql;

-- using the database
use crudenodejsmysql;

-- creating a table
CREATE TABLE customer (
  id INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(50) NOT NULL,
  adress VARCHAR(100) NOT NULL,
  email VARCHAR(50) NOT NULL,
  phone VARCHAR(15) NOT NULL
);

create table crudenodejsmysql.user (
	id int(11) unsigned auto_increment not null,
    username varchar(45) not null,
	email varchar(120) not null,
    password varchar(120) not null,
    primary key(id)
);

delete from crudenodejsmysql.customer where id > 0;

ALTER TABLE crudenodejsmysql.customer ADD id_user INT(11) unsigned not null;

alter table crudenodejsmysql.customer
    add constraint user_customer_id_fk
        foreign key (id_user) references crudenodejsmysql.user (id)
            on update cascade;