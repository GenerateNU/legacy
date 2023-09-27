DO $$ 
BEGIN 
  IF NOT EXISTS (SELECT 1 FROM pg_database WHERE datname = 'legacy') THEN
    CREATE DATABASE "legacy";
  END IF;
END $$;

CREATE TABLE IF NOT EXISTS users
(
    user_id UUID PRIMARY KEY,
    username VARCHAR(255) UNIQUE,
    password TEXT,
    email VARCHAR(255) UNIQUE,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    persona_id UUID,
    FOREIGN KEY (persona_id) REFERENCES Persona(persona_id)
);


CREATE TABLE IF NOT EXISTS user_profile
(
    profile_id UUID PRIMARY KEY,
    user_id UUID UNIQUE,
    name VARCHAR(255),
    date_of_birth DATE,
    phone_number VARCHAR(20), 
    age INT,
    onboarding_response JSONB, 
    FOREIGN KEY (user_id) REFERENCES users (user_id)
);

CREATE TABLE IF NOT EXISTS task (
    task_id UUID PRIMARY KEY,
    task_name VARCHAR(255),
    task_description TEXT,
    created_at TIMESTAMP,
    progress BOOLEAN,
);

CREATE TABLE IF NOT EXISTS subtask (
    sub_task_id UUID PRIMARY KEY,
    task_id UUID,
    task_name VARCHAR(255),
    task_description TEXT,
    created_at TIMESTAMP,
    progress BOOLEAN,
    FOREIGN KEY (task_id) REFERENCES task (task_id)
);

CREATE TABLE IF NOT EXISTS persona (
    persona_id UUID PRIMARY KEY,
    persona_description TEXT,
    persona_title VARCHAR(255),
);

CREATE TABLE IF NOT EXISTS persona_task (
    persona_id UUID,
    task_id UUID,
    PRIMARY KEY (persona_id, task_id),
    FOREIGN KEY (persona_id) REFERENCES persona (persona_id),
    FOREIGN KEY (task_id) REFERENCES task (task_id)
);

-- Files Table connected to the s3 bucket
CREATE TABLE IF NOT EXISTS files (
    file_id UUID PRIMARY KEY,
    file_name VARCHAR(255),
    file_description TEXT,
    file_path VARCHAR(255),
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    user_id UUID,
    FOREIGN KEY (user_id) REFERENCES users (user_id)
);

-- Progress Table
CREATE TABLE IF NOT EXISTS progress (
    progress_id UUID PRIMARY KEY,
    user_id UUID,
    task_id UUID,
    FOREIGN KEY (user_id) REFERENCES users (user_id)
    FOREIGN KEY (task_id) REFERENCES task (task_id)
); 