DROP TABLE IF EXISTS quiz CASCADE;
DROP TABLE IF EXISTS quiz_question CASCADE;
DROP TABLE IF EXISTS quiz_answers CASCADE;

CREATE TABLE quiz (
  id SERIAL PRIMARY KEY NOT NULL,
  creator_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  public BOOLEAN NOT NULL DEFAULT TRUE,
  title VARCHAR(50) NOT NULL,
  description TEXT NOT NULL
);

CREATE TABLE quiz_question (
  id SERIAL PRIMARY KEY NOT NULL,
  quiz_id INTEGER REFERENCES quiz(id) ON DELETE CASCADE,
  question TEXT NOT NULL
);

CREATE TABLE quiz_answers (
  id SERIAL PRIMARY KEY NOT NULL,
  quiz_id INTEGER REFERENCES quiz(id) ON DELETE CASCADE,
  quiz_question_id INTEGER REFERENCES quiz_question(id) ON DELETE CASCADE,
  answer TEXT NOT NULL,
  correct BOOLEAN NOT NULL,
  answer_index TEXT NOT NULL
);

