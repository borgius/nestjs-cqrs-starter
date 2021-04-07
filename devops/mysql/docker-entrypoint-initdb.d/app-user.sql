CREATE USER 'service_user'@'%' IDENTIFIED BY 'localPassword'; 

CREATE DATABASE service_user;
GRANT ALL PRIVILEGES ON service_user.* TO 'service_user'@'%';
FLUSH PRIVILEGES;


