CREATE TABLE user (
    uuid VARCHAR(60) NOT NULL UNIQUE,
    title ENUM('Mr','Ms','Mrs') NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT,
    nick_name TEXT NOT NULL,
    day_of_birth DATE NOT NULL,
    gender ENUM('M','F') NOT NULL,
    height FLOAT,
    oauth_version VARCHAR(5) DEFAULT '2.0',
    token VARCHAR(255),
    country CHAR(2) NOT NULL,
    medical_hist JSON NOT NULL,
    schedule JSON NOT NULL,
    PRIMARY KEY (uuid)
);
