-- Create the legacy database
DO $$ 
BEGIN 
  IF NOT EXISTS (SELECT 1 FROM pg_database WHERE datname = 'legacy') THEN
    CREATE DATABASE "legacy";
  END IF;
END $$;

-- Create the persona table
CREATE TABLE IF NOT EXISTS personas (
    id UUID PRIMARY KEY,
    persona_description TEXT,
    persona_title VARCHAR(255)
);

-- Create the task table
CREATE TABLE IF NOT EXISTS tasks (
    id UUID PRIMARY KEY,
    task_name VARCHAR(255),
    task_description TEXT,
    created_at TIMESTAMP
);

-- Create the users table
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY,
    username VARCHAR(255) UNIQUE,
    password TEXT,
    email VARCHAR(255) UNIQUE,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    persona_id UUID NULL,
    FOREIGN KEY (persona_id) REFERENCES personas (id)
);

-- Create the user_profile table
CREATE TABLE IF NOT EXISTS user_profiles (
    id UUID PRIMARY KEY,
    name VARCHAR(255),
    date_of_birth DATE,
    phone_number VARCHAR(20), 
    age INT,
    onboarding_response JSONB, 
    user_id UUID UNIQUE,
    FOREIGN KEY (user_id) REFERENCES users (id)
);

-- Create the subtask table
CREATE TABLE IF NOT EXISTS subtasks (
    id UUID PRIMARY KEY,
    task_name VARCHAR(255),
    task_description TEXT,
    created_at TIMESTAMP,
    task_id UUID,
    FOREIGN KEY (task_id) REFERENCES tasks (id)
);

-- Create the files table connected to the s3 bucket
CREATE TABLE IF NOT EXISTS files (
    id UUID PRIMARY KEY,
    file_name VARCHAR(255),
    file_description TEXT,
    file_path VARCHAR(255),
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    user_id UUID,
    FOREIGN KEY (user_id) REFERENCES users (id)
);

-- Create the progress table
CREATE TABLE IF NOT EXISTS progress (
    id UUID PRIMARY KEY,
    completed BOOLEAN,
    user_id UUID,
    task_id UUID,
    FOREIGN KEY (user_id) REFERENCES users (id),
    FOREIGN KEY (task_id) REFERENCES tasks (id)
);

-- Create the persona_task table
CREATE TABLE IF NOT EXISTS persona_tasks (
    id UUID PRIMARY KEY,
    persona_id UUID,
    task_id UUID,
    FOREIGN KEY (persona_id) REFERENCES personas (id),
    FOREIGN KEY (task_id) REFERENCES tasks (id)
);