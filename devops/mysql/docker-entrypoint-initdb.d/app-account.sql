CREATE USER 'service_account'@'%' IDENTIFIED BY 'localPassword'; 

CREATE DATABASE service_account;
GRANT ALL PRIVILEGES ON service_account.* TO 'service_account'@'%';
FLUSH PRIVILEGES;


