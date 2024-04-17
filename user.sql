CREATE TABLE users (
	id int NOT NULL AUTO_INCREMENT,
	status bit(1) NOT NULL DEFAULT 0,
	level int NOT NULL,
	account varchar(30) NOT NULL,
	account_name varchar(30) NOT NULL,
	password varchar(255) NOT NULL,
	email varchar(255) NOT NULL,
	create_time datetime NOT NULL,
	update_time datetime NOT NULL,
	PRIMARY KEY (`id`),
	UNIQUE KEY (`account_name`)
);
