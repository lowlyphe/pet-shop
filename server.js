const express = require('express');
const cors = require('cors');
const pg = require('pg');

const app = express();
const PORT = 3000;
const corsOptions = {
    origin: '*'
}

app.use(express.static('client'))

const pool = new pg.Pool({
    database: 'petshop'
});

app.use(cors());
app.use(express.json());

// get all pets
app.get('/api/pets', (req,res) => {
    pool.query('SELECT * FROM pets').then((data) => {
        res.send(data.rows)
    })
})

//get pets at id
app.get('/api/pets/:id', (req,res) => {
    const id = req.params.id;
    pool.query('SELECT * FROM pets WHERE id = $1', [id]).then((data) => {
        res.status(200).type('application/json').send(data.rows);
    })
})

//create pet
app.post('/api/pets', (req,res) => {
    const pet = req.body;
    const { name, age, kind, owner } = pet ;
    const text = 'INSERT INTO pets(name, age, kind, owner) VALUES($1, $2, $3, $4) RETURNING *'
    const values = [name, age, kind, owner];
    if (!name || !age || !kind || !owner) {
        res.status(400).type('text/plain').send('Bad Request')
    } else {
        pool.query(text, values).then((data) => {
            res.type('application/json').send(data.rows[0]);          
        
        }).catch(e => {
            console.log(e.stack)
            res.status(500).type('text/plain').send('Internal Server Error')
        })
            
    }
    console.log(name, age, kind)
    
})

// update pet @ id
app.patch('/api/pets/:id', (req,res) => {
    const id = req.params.id;
    const pet = req.body;
    console.log(pet)
    const { name, age, kind, owner } = pet
    const text = `UPDATE pets SET name = COALESCE($1, name),
                    age = COALESCE($2, age),
                        kind = COALESCE($3, kind),
                            owner = COALESCE($4, owner)
                            WHERE id = $5
                                RETURNING *`
    const values = [name, age, kind, owner, id];
 


    pool.query(text, values).then((data) => {
        res.status(200).send(data.rows[0])
    }).catch(e => {
        console.log(e.stack);
    })
})

// delete pet @ id
app.delete('/api/pets/:id', (req,res) => {
    const id = req.params.id;
    pool.query("DELETE FROM pets where id = $1 RETURNING *", [id]).then((data) => {
        res.status(200).type('application/json').send(data.rows[0])
        console.log(data)
    });

});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})