CREATE TABLE questions (
  question VARCHAR(300) NOT NULL,
  answer1 VARCHAR(300) NOT NULL,
  answer2 VARCHAR(300) NOT NULL,
  answer3 VARCHAR(300) NOT NULL,
  answer4 VARCHAR(300) NOT NULL,
  correctAnswer INT NOT NULL);

SELECT AddGeometryColumn('public', 'questions', 'geom', 48, 'geometry', 2);


  