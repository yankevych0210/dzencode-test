-- ============================================================
-- Inventory SPA Database Schema
-- Compatible with MySQL Workbench
-- ============================================================

CREATE DATABASE IF NOT EXISTS inventory_db
  DEFAULT CHARACTER SET utf8mb4
  DEFAULT COLLATE utf8mb4_unicode_ci;

USE inventory_db;

-- ------------------------------------------------------------
-- Table: orders
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS orders (
  id          INT UNSIGNED    NOT NULL AUTO_INCREMENT,
  title       VARCHAR(255)    NOT NULL,
  description TEXT,
  date        DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
  created_at  DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at  DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
) ENGINE=InnoDB;

-- ------------------------------------------------------------
-- Table: product_types
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS product_types (
  id    INT UNSIGNED NOT NULL AUTO_INCREMENT,
  name  VARCHAR(100) NOT NULL UNIQUE,
  PRIMARY KEY (id)
) ENGINE=InnoDB;

-- ------------------------------------------------------------
-- Table: products
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS products (
  id              INT UNSIGNED    NOT NULL AUTO_INCREMENT,
  serial_number   VARCHAR(100)    NOT NULL UNIQUE,
  is_new          TINYINT(1)      NOT NULL DEFAULT 1 COMMENT '1=new, 0=used',
  photo           VARCHAR(500),
  title           VARCHAR(255)    NOT NULL,
  type_id         INT UNSIGNED    NOT NULL,
  specification   TEXT,
  guarantee_start DATETIME,
  guarantee_end   DATETIME,
  order_id        INT UNSIGNED,
  date            DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
  created_at      DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at      DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  INDEX idx_order_id (order_id),
  INDEX idx_type_id (type_id),
  CONSTRAINT fk_product_order
    FOREIGN KEY (order_id) REFERENCES orders (id)
    ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT fk_product_type
    FOREIGN KEY (type_id) REFERENCES product_types (id)
    ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB;

-- ------------------------------------------------------------
-- Table: prices
-- (Each product can have multiple prices in different currencies)
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS prices (
  id          INT UNSIGNED    NOT NULL AUTO_INCREMENT,
  product_id  INT UNSIGNED    NOT NULL,
  value       DECIMAL(12,2)   NOT NULL,
  symbol      CHAR(3)         NOT NULL COMMENT 'USD, UAH, EUR, etc.',
  is_default  TINYINT(1)      NOT NULL DEFAULT 0,
  PRIMARY KEY (id),
  INDEX idx_product_id (product_id),
  CONSTRAINT fk_price_product
    FOREIGN KEY (product_id) REFERENCES products (id)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;

-- ------------------------------------------------------------
-- Seed data
-- ------------------------------------------------------------
INSERT INTO product_types (name) VALUES ('Monitors'), ('Laptops'), ('Phones');

INSERT INTO orders (title, description, date) VALUES
  ('Довге назва прихода 1', 'First order', '2017-06-29 12:09:33'),
  ('Довге назва прихода 2', 'Second order', '2017-09-06 12:09:33'),
  ('Довге назва прихода 3', 'Third order', '2017-06-06 12:09:33');

INSERT INTO products (serial_number, is_new, title, type_id, specification, guarantee_start, guarantee_end, order_id, date) VALUES
  ('12.3456789', 1, 'Gigabyte Technology X58-USB3 (Socket 1366)', 1, 'Spec 1', '2017-06-04', '2025-08-06', 1, '2017-06-29 12:09:33'),
  ('12.3456790', 0, 'Gigabyte Technology X58-USB3 (Socket 1366)', 1, 'Spec 2', '2017-06-04', '2025-08-06', 1, '2017-09-06 12:09:33'),
  ('12.3456791', 1, 'Gigabyte Technology X58-USB3 (Socket 1366)', 2, 'Spec 3', '2017-06-04', '2025-08-06', 2, '2017-06-29 12:09:33'),
  ('12.3456792', 0, 'Gigabyte Technology X58-USB3 (Socket 1366)', 3, 'Spec 4', '2017-06-04', '2025-08-06', 2, '2017-09-06 12:09:33'),
  ('12.3456793', 1, 'Gigabyte Technology X58-USB3 (Socket 1366)', 1, 'Spec 5', '2017-06-04', '2025-08-06', 3, '2017-06-29 12:09:33'),
  ('12.3456794', 0, 'Gigabyte Technology X58-USB3 (Socket 1366)', 2, 'Spec 6', '2017-06-04', '2025-08-06', 3, '2017-09-06 12:09:33');

INSERT INTO prices (product_id, value, symbol, is_default) VALUES
  (1, 100.00, 'USD', 0), (1, 2500.00, 'UAH', 1),
  (2, 50.00,  'USD', 0), (2, 1300.00, 'UAH', 1),
  (3, 300.00, 'USD', 0), (3, 7800.00, 'UAH', 1),
  (4, 200.00, 'USD', 0), (4, 5200.00, 'UAH', 1),
  (5, 250.00, 'USD', 0), (5, 6500.00, 'UAH', 1),
  (6, 150.00, 'USD', 0), (6, 3900.00, 'UAH', 1);
