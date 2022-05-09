DROP TABLE IF EXISTS quiz_take CASCADE;
DROP TABLE IF EXISTS quiz_result CASCADE;


CREATE TABLE quiz_take (
  id SERIAL PRIMARY KEY NOT NULL,
  quiz_id INTEGER REFERENCES quiz(id) ON DELETE CASCADE,
  quiz_answers_id INTEGER REFERENCES quiz_answers(id) ON DELETE CASCADE
);

CREATE TABLE quiz_result (
  id SERIAL PRIMARY KEY NOT NULL,
  taker_id INTEGER REFERENCES users(id),
  quiz_take_id INTEGER REFERENCES quiz_take(id),
  score INTEGER,
  url text NOT NULL
);
