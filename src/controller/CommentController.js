// controllers/commentController.js

const Comment = require('../models/CommentModels');

// Membuat komentar baru
const createComment = async (req, res) => {
  try {
    const { comment, user_id } = req.body;
    const newComment = await Comment.create({ comment, user_id });
    res.status(201).json(newComment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Terjadi kesalahan dalam membuat komentar' });
  }
};

// Menampilkan semua komentar
const getAllComments = async (req, res) => {
  try {
    const comments = await Comment.findAll();
    res.json(comments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Terjadi kesalahan dalam mengambil komentar' });
  }
};

// Menampilkan komentar berdasarkan ID
const getCommentById = async (req, res) => {
    try {
      const { id } = req.params;
      const comment = await Comment.findByPk(id);
      if (!comment) {
        res.status(404).json({ message: 'Komentar tidak ditemukan' });
        return;
      }
      res.json(comment);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Terjadi kesalahan dalam mengambil komentar' });
    }
  }

// Menampilkan komentar terbaru
const getLatestComments = async (req, res) => {
  try {
    const latestComments = await Comment.findAll({
      order: [['createdAt', 'DESC']]
    });
    res.json(latestComments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Terjadi kesalahan dalam mengambil komentar terbaru' });
  }
};

// Menampilkan komentar populer
const getPopularComments = async (req, res) => {
  try {
    const popularComments = await Comment.findAll({
      order: [['likes_count', 'DESC']]
    });
    res.json(popularComments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Terjadi kesalahan dalam mengambil komentar populer' });
  }
};

// Menampilkan komentar terlama
const getOldestComments = async (req, res) => {
  try {
    const oldestComments = await Comment.findAll({
      order: [['createdAt', 'ASC']]
    });
    res.json(oldestComments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Terjadi kesalahan dalam mengambil komentar terlama' });
  }
};

const deleteComment = async (req, res) => {
    try {
      const { id } = req.params;
      const deletedComment = await Comment.destroy({ where: { comment_id: id } });
      if (!deletedComment) {
        res.status(404).json({ message: 'Komentar tidak ditemukan' });
        return;
      }
      res.json({ message: 'Komentar berhasil dihapus' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Terjadi kesalahan dalam menghapus komentar' });
    }
  }

module.exports = {
    createComment,
    getAllComments,
    getLatestComments,
    getPopularComments,
    getOldestComments,
    deleteComment,
    getCommentById,
}