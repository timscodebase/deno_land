import sqlite3

# Connect to SQLite3 database (or create it if it doesn't exist)
conn = sqlite3.connect('todos.db')
cursor = conn.cursor()

# Create the todos table
cursor.execute('''
CREATE TABLE IF NOT EXISTS todos (
    id TEXT PRIMARY KEY NOT NULL,
    name TEXT NOT NULL,
    done INTEGER NOT NULL,
    timestamp TEXT NOT NULL
)
''')

print('Todos table created successfully!')

# Commit the changes and close the connection
conn.commit()
conn.close()