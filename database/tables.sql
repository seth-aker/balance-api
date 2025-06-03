DROP TABLE IF EXISTS account_users;
DROP TABLE IF EXISTS accounts;
DROP TABLE IF EXISTS transactions;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
    userId VARCHAR2(100) NOT NULL,
    firstName VARCHAR2(100),
    lastName VARCHAR2(100),
    email VARCHAR2(100) NOT NULL UNIQUE,
    colorPreference VARCHAR2(7) DEFAULT 'System',
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT PK_userId PRIMARY KEY (userId)
)

CREATE TABLE transactions (
    transactionID VARCHAR2(100) NOT NULL,
    createdBy VARCHAR2(100) NOT NULL,
    amountCents INTEGER NOT NULL,
    description VARCHAR2(500),
    type VARCHAR2(7) DEFAULT 'Credit',
    paid NUMBER(1) DEFAULT 0,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT FK_createdBy FOREIGN KEY (createdBy) REFERENCES users(userId),
    CONSTRAINT PK_transactionId PRIMARY KEY (transactionID),
    CONSTRAINT BOOL_paid CHECK (paid BETWEEN 0 and 1)
)

CREATE TABLE accounts (
    accountId VARCHAR2(100) NOT NULL,
    accountName VARCHAR2(100),
    accountBalaceCents INTEGER NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT PK_accountId PRIMARY KEY (accountId)
)

CREATE TABLE account_users (
    userId VARCHAR2(100) NOT NULL,
    accountId VARCHAR2(100) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT PK_userId_account_Id PRIMARY KEY (userId, accountId),
    CONSTRAINT FK_userId FOREIGN KEY (userId) REFERENCES users(userId),
    CONSTRAINT FK_accountId FOREIGN KEY (accountId) REFERENCES accounts(accountId)
)

CREATE TABLE account_transactions (
    accountId VARCHAR2(100) NOT NULL,
    transactionId VARCHAR2(100) NOT NULL,
    CONSTRAINT PK_accountId_transactionId PRIMARY KEY (accountId, transactionId),
    CONSTRAINT FK_accountId FOREIGN KEY (accountId) REFERENCES accounts(accountId),
    CONSTRAINT FK_transactionId FOREIGN KEY (transactionId) REFERENCES transactions(transactionId)
)