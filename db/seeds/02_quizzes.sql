INSERT INTO quiz (creator_id,url,public,title,description) VALUES (1,'www.google.com',true,'Math Test','To test how smart you are');
INSERT INTO quiz_question (quiz_id, question) VALUES (1,'2+2 = ?');
INSERT INTO quiz_answers (quiz_id, quiz_question_id,answer,correct,answer_index) VALUES (1,1,1,false,'a');
INSERT INTO quiz_answers (quiz_id, quiz_question_id,answer,correct,answer_index) VALUES (1,1,2,false,'b');
INSERT INTO quiz_answers (quiz_id, quiz_question_id,answer,correct,answer_index) VALUES (1,1,3,false,'c');
INSERT INTO quiz_answers (quiz_id, quiz_question_id,answer,correct,answer_index) VALUES (1,1,4,true,'d');
