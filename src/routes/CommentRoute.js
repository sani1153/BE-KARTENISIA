const express = require('express');
const router = express.Router();
const Comment = require('../controller/CommentController');

// Membuat komentar baru
router.post('/comments', Comment.createComment);

// Menampilkan semua komentar
router.get('/comments', Comment.getAllComments);

// Menampilkan komentar berdasarkan ID
router.get('/comments/:id', Comment.getCommentById);

// Menghapus komentar berdasarkan ID
router.delete('/comments/:id', Comment.deleteComment);

module.exports = router;
