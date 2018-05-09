-- DROP TABLE questions;

CREATE TABLE questions (
  question VARCHAR(300) NOT NULL,
  answer1 VARCHAR(300) NOT NULL,
  answer2 VARCHAR(300) NOT NULL,
  answer3 VARCHAR(300) NOT NULL,
  answer4 VARCHAR(300) NOT NULL,
  correctAnswer INT NOT NULL,
  geom geometry);

-- Example of question
-- INSERT INTO QUESTIONS ("question", "answer1", "answer2", "answer3", "answer4", "correctanswer", "geom") VALUES ('Who is this statue of?', 'Churchill', 'Gandhi', 'Mr Bean', 'Napoleon', 1, ST_GEOMFROMTEXT('POINT(-0.116298 51.510549)', 4326));

--DROP TABLE answers;

CREATE TABLE answers (
  question VARCHAR(300) NOT NULL,
  submittedAnswer INT NOT NULL,
  deviceUUID VARCHAR(100) NOT NULL);