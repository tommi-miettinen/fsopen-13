

CREATE TABLE IF NOT EXISTS blogs (
    id SERIAL PRIMARY KEY,
    author VARCHAR NOT NULL,
    url VARCHAR NOT NULL,
    title VARCHAR NOT NULL,
    likes INTEGER DEFAULT 0
);

INSERT INTO blogs (author, url, title, likes)
VALUES ('Dan Abramov', 'https://danabramov.com', 'On let vs const', 0),
       ('Laurenz Albe', 'https://laurenzalbe.com', 'Gaps in sequences in PostgreSQL', 0);
