DROP TABLE IF EXISTS pets;
DROP TABLE IF EXISTS owners;

CREATE TABLE owners (
    id serial,
    name text NOT NULL,
    address text,
    phone text NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE pets (
    id serial,
    name text NOT NULL,
    age integer,
    kind text,
    owner integer NOT NULL,
        FOREIGN KEY(owner)
            REFERENCES owners(id)
);

