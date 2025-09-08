import Database from 'better-sqlite3';

export class MovieDatabase {
    private db: Database.Database;

    constructor() {
        this.db = new Database(':memory:');
        this.createTable();
    }

    private createTable(): void {
        const createTableSQL = `
            CREATE TABLE IF NOT EXISTS movies (
                id uuid PRIMARY KEY,
                year INTEGER NOT NULL,
                title TEXT NOT NULL,
                studios TEXT NOT NULL,
                producers TEXT NOT NULL,
                winner BOOLEAN NOT NULL DEFAULT 0)`;

        this.db.exec(createTableSQL);
    }

    getDatabase(): Database.Database {
        return this.db;
    }

    close(): void {
        this.db.close();
    }
}