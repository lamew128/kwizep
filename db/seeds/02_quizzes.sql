INSERT INTO quiz (creator_id,url,public,title,description)
VALUES (3,
        'https://i.imgur.com/A5kze6Z.png',
         true,
        'IQ test',
        'How smart are you?');

INSERT INTO quiz (creator_id,url,public,title,description)
VALUES (3,
        'https://i.imgur.com/FGHr6Hh.png',
         true,
        'Bird Watchers',
        'Can you identify a bird by its footprints');

INSERT INTO quiz (creator_id,url,public,title,description)
VALUES (3,
        'https://i.imgur.com/4d3WG1V.png',
        false,
        'Are you happy?',
        'It depends...');

INSERT INTO quiz (creator_id,url,public,title,description)
VALUES (3,
        'https://i.imgur.com/YdcNxkU.png',
         true,
        'True Crime 101',
        'It is not a crime, it is art.');



INSERT INTO quiz (creator_id,url,public,title,description)
VALUES (3,
       'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJFZ65LwsawfGT8XIQrWoCg-6inXNiMkopHQ&usqp=CAU',
        true,
       'Canada',
       'Oh Canada! 🇨🇦');

INSERT INTO quiz (creator_id,url,public,title,description)
Values (3,
        'https://images.unsplash.com/photo-1628510118714-d2124aea4b8a?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max',
        true,
        'USA',
        'You know everything about america? Find out!');

INSERT INTO quiz (creator_id,url,public,title,description)
Values  (3,
        'https://blogdointercambio.west1.com.br/wp-content/uploads/2019/01/268152-toronto-principais-pontos-turisticos-atracoes-e-custo-de-vida-1024x683.jpg',
        true,
        'TORONTO',
        'How much you know about the 6ix?');

INSERT INTO quiz (creator_id,url,public,title,description)
Values  (3,
        'https://greatpeopleinside.com/wp-content/uploads/2017/05/HR-GR8-technology.jpg',
        false,
        'TECHNOLOGY',
        'Are you a technophile? Lets see!');

INSERT INTO quiz (creator_id,url,public,title,description)
Values  (3,
        'https://d5y9g7a5.rocketcdn.me/wp-content/uploads/2020/06/marvel-a-historia-da-editora-nos-quadrinhos-e-no-cinema-1024x512.jpg',
        false,
        'MARVEL',
        'Love Spider-man and company? Test your knowledge!');

INSERT INTO quiz (creator_id,url,public,title,description)
Values  (3,
        'https://files.tecnoblog.net/wp-content/uploads/2020/06/spotify-dc-comics-warner-700x513.jpg',
        false,
        'GAMES',
        'Are you a gamemanic? See if you know everything about videogames!');

INSERT INTO quiz (creator_id,url,public,title,description)
Values  (3,
        'https://thumbs2.imgbox.com/2d/46/Ba6012x0_t.jpg',
        false,
        'DC',
        'Batman, Superman, and the Justice League!');


INSERT INTO quiz_question (quiz_id, question) VALUES (1,'2 + 2 = ?');
INSERT INTO quiz_question (quiz_id, question) VALUES (1,'4 - 1 = ?');
INSERT INTO quiz_question (quiz_id, question) VALUES (1,'21 + 21 = ?');


INSERT INTO quiz_answers (quiz_id, quiz_question_id,answer,correct,answer_index) VALUES (1,1,1,false,'a');
INSERT INTO quiz_answers (quiz_id, quiz_question_id,answer,correct,answer_index) VALUES (1,1,2,false,'b');
INSERT INTO quiz_answers (quiz_id, quiz_question_id,answer,correct,answer_index) VALUES (1,1,3,false,'c');
INSERT INTO quiz_answers (quiz_id, quiz_question_id,answer,correct,answer_index) VALUES (1,1,4,true,'d');
INSERT INTO quiz_answers (quiz_id, quiz_question_id,answer,correct,answer_index) VALUES (1,2,1,false,'a');
INSERT INTO quiz_answers (quiz_id, quiz_question_id,answer,correct,answer_index) VALUES (1,2,2,false,'b');
INSERT INTO quiz_answers (quiz_id, quiz_question_id,answer,correct,answer_index) VALUES (1,2,3,true,'c');
INSERT INTO quiz_answers (quiz_id, quiz_question_id,answer,correct,answer_index) VALUES (1,2,4,false,'d');
INSERT INTO quiz_answers (quiz_id, quiz_question_id,answer,correct,answer_index) VALUES (1,3,42,true,'a');
INSERT INTO quiz_answers (quiz_id, quiz_question_id,answer,correct,answer_index) VALUES (1,3,69,false,'b');
INSERT INTO quiz_answers (quiz_id, quiz_question_id,answer,correct,answer_index) VALUES (1,3,96,false,'c');
INSERT INTO quiz_answers (quiz_id, quiz_question_id,answer,correct,answer_index) VALUES (1,3,996,false,'d');
