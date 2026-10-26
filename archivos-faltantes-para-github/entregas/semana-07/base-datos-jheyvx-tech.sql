IF DB_ID(N'JheyvxTech') IS NULL CREATE DATABASE JheyvxTech;
GO
USE JheyvxTech;
GO
IF OBJECT_ID('dbo.users','U') IS NULL CREATE TABLE dbo.users (
 id BIGINT IDENTITY(1,1) PRIMARY KEY, name NVARCHAR(100) NOT NULL,
 email NVARCHAR(254) NOT NULL UNIQUE, password_hash NVARCHAR(100) NOT NULL,
 role VARCHAR(20) NOT NULL CHECK(role IN ('owner','manager','staff','customer')),
 active BIT NOT NULL DEFAULT 1, created_at DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME()
);
IF OBJECT_ID('dbo.products','U') IS NULL CREATE TABLE dbo.products (
 id BIGINT IDENTITY(1,1) PRIMARY KEY, sku NVARCHAR(60) NOT NULL UNIQUE,
 name NVARCHAR(140) NOT NULL, category NVARCHAR(60) NOT NULL,
 description NVARCHAR(1600) NOT NULL DEFAULT '', price DECIMAL(18,2) NOT NULL CHECK(price>=0),
 image_url NVARCHAR(1000) NOT NULL DEFAULT '', stock INT NOT NULL DEFAULT 0 CHECK(stock>=0),
 featured BIT NOT NULL DEFAULT 0, active BIT NOT NULL DEFAULT 1,
 created_at DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(), updated_at DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME()
);
IF OBJECT_ID('dbo.orders','U') IS NULL CREATE TABLE dbo.orders (
 id VARCHAR(40) PRIMARY KEY, user_id BIGINT NOT NULL REFERENCES dbo.users(id),
 customer_name NVARCHAR(100) NOT NULL, customer_email NVARCHAR(254) NOT NULL,
 phone NVARCHAR(30) NOT NULL, shipping_address NVARCHAR(250) NOT NULL, district NVARCHAR(100) NOT NULL,
 notes NVARCHAR(500) NOT NULL DEFAULT '', payment_method VARCHAR(30) NOT NULL,
 payment_status VARCHAR(20) NOT NULL DEFAULT 'pending', order_status VARCHAR(20) NOT NULL DEFAULT 'pending',
 total DECIMAL(18,2) NOT NULL, mp_preference_id NVARCHAR(100), mp_payment_id NVARCHAR(100), payment_proof NVARCHAR(1000),
 created_at DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(), updated_at DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME()
);
IF OBJECT_ID('dbo.order_items','U') IS NULL CREATE TABLE dbo.order_items (
 id BIGINT IDENTITY(1,1) PRIMARY KEY, order_id VARCHAR(40) NOT NULL REFERENCES dbo.orders(id) ON DELETE CASCADE,
 product_id BIGINT NULL REFERENCES dbo.products(id), product_name NVARCHAR(140) NOT NULL,
 unit_price DECIMAL(18,2) NOT NULL, quantity INT NOT NULL CHECK(quantity>0), subtotal DECIMAL(18,2) NOT NULL
);
IF NOT EXISTS(SELECT 1 FROM sys.indexes WHERE name='idx_products_active') CREATE INDEX idx_products_active ON dbo.products(active,category);
IF NOT EXISTS(SELECT 1 FROM sys.indexes WHERE name='idx_orders_user') CREATE INDEX idx_orders_user ON dbo.orders(user_id,created_at DESC);
GO
