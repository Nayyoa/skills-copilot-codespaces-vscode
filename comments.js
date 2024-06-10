// Create web server
const express = require('express');
const app = express();
const port = 3000;

// Import module
const comments = require('./comments');

// Get all comments
app.get('/comments', (req, res) => {
    res.json(comments.getComments());
});

// Get comment by id
app.get('/comments/:id', (req, res) => {
    const comment = comments.getCommentById(req.params.id);
    if (comment) {
        res.json(comment);
    } else {
        res.status(404).end();
    }
});

// Add new comment
app.post('/comments', (req, res) => {
    const comment = comments.addComment(req.body);
    res.json(comment);
});

// Update comment
app.put('/comments/:id', (req, res) => {
    const comment = comments.updateComment(req.params.id, req.body);
    if (comment) {
        res.json(comment);
    } else {
        res.status(404).end();
    }
});

// Delete comment
app.delete('/comments/:id', (req, res) => {
    if (comments.deleteComment(req.params.id)) {
        res.status(204).end();
    } else {
        res.status(404).end();
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

// Path: comments.js
// Create comments
let comments = [
    {
        id: '1',