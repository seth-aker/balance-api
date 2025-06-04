DROP TRIGGER on_update_user;
DROP TRIGGER on_update_transaction;
DROP TRIGGER on_update_accounts;

CREATE OR REPLACE TRIGGER on_update_user BEFORE
    UPDATE OF firstName,lastName,email,colorPreference ON users
    FOR EACH ROW
BEGIN
    :NEW.updatedAt := CURRENT_TIMESTAMP;
END;

CREATE OR REPLACE TRIGGER on_update_transaction BEFORE
    UPDATE OF amountCents,description,type,paid ON transactions
    FOR EACH ROW
BEGIN
    :NEW.updatedAt := CURRENT_TIMESTAMP;
END;

CREATE OR REPLACE TRIGGER on_update_accounts BEFORE
    UPDATE OF accountName,accountBalaceCents ON accounts
    FOR EACH ROW
BEGIN
    :NEW.updatedAt := CURRENT_TIMESTAMP;
END;
