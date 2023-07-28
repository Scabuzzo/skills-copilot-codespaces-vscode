// Create web server application

// Import modules
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');

// Import database
const db = require('./db');

// Create web server
const app = express();

// Apply middleware
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());

// Create route
app.get('/comments', (req, res) => {
    db.Comment.find({}, 'title description', (error, comments) => {
        if (error) {
            console.error(error);
        }
        res.send({
            comments: comments
        });
    }).sort({_id: -1});
}
);

app.post('/comments', (req, res) => {
    const dbComment = new db.Comment({
        title: req.body.title,
        description: req.body.description
    });
    dbComment.save((error, comment) => {
        if (error) {
            console.error(error);
        }
        res.send(comment);
    });
}
);

app.get('/comments/:id', (req, res) => {
    db.Comment.findById(req.params.id, 'title description', (error, comment) => {
        if (error) {
            console.error(error);
        }
        res.send(comment);
    });
}
);

app.put('/comments/:id', (req, res) => {
    db.Comment.findById(req.params.id, 'title description', (error, comment) => {
        if (error) {
            console.error(error);
        }
        comment.title = req.body.title;
        comment.description = req.body.description;
        comment.save((error, comment) => {
            if (error) {
                console.error(error);
            }
            res.send(comment);
        });
    });
}
);

app.delete('/comments/:id', (req, res) => {
    db.Comment.remove({
        _id: req.params.id
    }, (error, comment) => {
        if (error) {
            console.error(error);
        }
        res.send({
            success: true
        });
    });
}
);

// Start web server
app.listen(process.env.PORT || 8081);

// Path: package.json
// Add the following to the "scripts" object:
// "start": "node server.js"
// Path: server.js
// Import modules
// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const morgan = require('morgan');
// Create web server
// const app = express();
// Apply middleware
// app.use(morgan('combined'));
// app.use(bodyParser.json());
// app.use(cors());
// Create route
// app.get('/status', (req, res) => {
    