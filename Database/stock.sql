CREATE TABLE `stock` (   
`id` mediumint unsigned NOT NULL AUTO_INCREMENT,   
`product_name` varchar(255) DEFAULT NULL,   
`stock_left` bit(32) DEFAULT NULL,   
`category` varchar(255) DEFAULT NULL,   
PRIMARY KEY (`id`) ) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO stock(product_name, stock_left, category)  values ("ยาดี", 20, "ยา");