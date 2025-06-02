CREATE TABLE users (
    userId varchar(100) NOT NULL UNIQUE,
    firstName varchar(100),
    lastName varchar(100),
    email varchar(100) NOT NULL UNIQUE,
    colorPreference varchar(7) DEFAULT 'System',
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT PK_userId PRIMARY KEY (userId)
)

CREATE TABLE transactions (
    transactionID varchar(100) NOT NULL UNIQUE,
    createdBy varchar(100) NOT NULL,
    amountCents bigint NOT NULL,
    description varchar(500),
    type enum('Credit', 'Debit', 'Cash') DEFAULT 'Credit',
    paid boolean DEFAULT 0,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT FK_createdBy FOREIGN KEY (createdBy) REFERENCES users(userId)
    CONSTRAINT PK_transactionId PRIMARY KEY (transactionID)
)

CREATE TABLE accounts (
    accountId varchar(100) NOT NULL UNIQUE,
    accountName varchar(100),
    accountBalaceCents bigint NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT PK_accountId PRIMARY KEY (accountId)
)

CREATE TABLE account_users (
    userId varchar(100) NOT NULL UNIQUE,
    accountId varchar(100) NOT NULL UNIQUE,
    CONSTRAINT PK_userId_account_Id PRIMARY KEY (userId, accountId),
    CONSTRAINT FK_userId FOREIGN KEY (userId) REFERENCES users(userId),
    CONSTRAINT FK_accountId FOREIGN KEY (accountId) REFERENCES accounts(accountId)
)