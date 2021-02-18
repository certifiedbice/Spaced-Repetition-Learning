BEGIN;

TRUNCATE
  "word",
  "language",
  "user";

INSERT INTO "user" ("id", "username", "name", "password")
VALUES
  (
    1,
    'admin',
    'Dunder Mifflin Admin',
    -- password = "pass"
    '$2a$10$fCWkaGbt7ZErxaxclioLteLUgg4Q3Rp09WW0s/wSLxDKYsaGYUpjG'
  );

INSERT INTO "language" ("id", "name", "user_id")
VALUES
  (1, 'French', 1);

INSERT INTO "word" ("id", "language_id", "original", "translation", "next")
VALUES
  (1, 1, 'Merde', 'Shit', 2),
  (2, 1, 'Va te faire foutre', 'Kiss my ass', 3),
  (3, 1, 'Putain', 'Whore', 4),
  (4, 1, 'Salaud', 'Bastard', 5),
  (5, 1, 'Zut', 'Damn', 6),
  (6, 1, 'Salope', 'Slut', 7),
  (7, 1, 'Br&#535l;e en l&apos;enfer', 'Burn In Hell', 8),
  (8, 1, 'Ta Gueule', 'Shut Up', 9),
  (9, 1, 'Enculer', 'Ass Fuck', null);

UPDATE "language" SET head = 1 WHERE id = 1;

-- because we explicitly set the id fields
-- update the sequencer for future automatic id setting
SELECT setval('word_id_seq', (SELECT MAX(id) from "word"));
SELECT setval('language_id_seq', (SELECT MAX(id) from "language"));
SELECT setval('user_id_seq', (SELECT MAX(id) from "user"));

COMMIT;
