const articles = require('../models/ArticleModels');
const { Op } = require("sequelize");

// POST ARTICLE 
const addArticle = async (req, res) => {
  const { body } = req;
  try {
      const article = {
          title: req.body.title,
          url_image: req.body.url_image,
          description: req.body.description,
          category: req.body.category
      }

      await articles.create(article);

      res.status(201).send({ 
          msg: "Create Article Success",
          data: body 
      });

  } catch (error) {
      res.status(500).json({
          message: "Server Error",
          serverMessage : error
        })
      }
    }

// GET ALL ARTICLE/GET ARTICLE BY CATEGORY
const getArticles = async (req, res) => {
  try {
      let articlesData;
      // Mengambil data artikel
      if(req.query.category){
        articlesData = await articles.findAll({
          where: {
            category: req.query.category
          }}); 
      } else{
          articlesData = await articles.findAll()
      }

      res.json({
          message: 'Get Article Success',
          data: articlesData // Mengirim data artikel sebagai respons
      });

  } catch (error) {
      res.status(500).json({
          message: "Server Error",
          serverMessage : error
        })
      }
    }

// GET ARTICLE BY TITLE
const getArticlesByTitle = async (req, res) => {
  try {
      const searchTerm = req.query.q; // Mendapatkan query pencarian dari request
      const article = await articles.findAll({
          where: {
              // Menentukan kondisi pencarian, misalnya judul mengandung searchTerm
              title: {
                  [Op.like]: `%${searchTerm}%`
                }
              }
            });

      if(!articles || articles.length === 0){
        res.status(404).json({ message: 'Artikel tidak ditemukan' });
        return;
      }

      res.json({
          message: 'Search Success',
          data: article
        });

  } catch (error) {
      res.status(500).json({
          message: "Error searching articles",
          error: error.message
        });
      }
    };

// GET ARTICLE BY ID
const getArticlesById = async (req, res) => {
  try {
    const { id } = req.params;
    const article = await articles.findByPk(id);
    if (!article) {
      res.status(404).json({ message: 'Artikel tidak ditemukan' });
      return;
    }

    res.json({
      message: 'Get Article Success',
      data: article
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Terjadi kesalahan dalam mengambil Artikel' });
  }
}

// GET ARTICLE BY DATE ASC AND DESC
const getArticlesByDate = async (req, res) => {
  try {
    const { order } = req.query; // 'asc' or 'desc'
      
    let article;
    if (order === 'asc') {
      article = await articles.findAll({
        order: [['createdAt', 'ASC']]
      });
    } else {
      article = await articles.findAll({
        order: [['createdAt', 'DESC']]
      });
    }

    res.json({
      message: 'Get Article Success',
      data: article
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Terjadi kesalahan dalam mengambil Artikel berdasarkan tanggal' });
  }
};

// GET ARTICLE BY CATEGORY AND DATE ASC/DESC
const getArticlesByDateAndCategory = async (req, res) => {
  try {
    const { order, category } = req.query; // 'asc' or 'desc', 'health' or 'fashion'
      
    let article;
    if (order === 'asc') {
      article = await articles.findAll({
        where: {
          category: {
            [Op.or]: [category === 'kesehatan' ? 'kesehatan' : null, category === 'fesyen' ? 'fesyen' : null]
          }
        },
        order: [['createdAt', 'ASC']]
      });
    } else {
      article = await articles.findAll({
        where: {
          category: {
            [Op.or]: [category === 'kesehatan' ? 'kesehatan' : null, category === 'fesyen' ? 'fesyen' : null]
          }
        },
        order: [['createdAt', 'DESC']]
      });
    }
  
    res.json({
      message: 'Get Article Success',
      data: article
    });

    } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Terjadi kesalahan dalam mengambil Artikel berdasarkan tanggal dan kategori' });
  }
};

// GET ALL ARTICLE BY RANDOM ID
const getAllRandomArticles = async (req, res) => {
  try {
    // Mendapatkan jumlah total artikel dalam basis data Anda
    const totalArticles = await articles.count(); // Ganti Article dengan model Anda
  
    // Array untuk menyimpan artikel yang akan dikembalikan
    const randomArticles = [];
  
    // Menghasilkan ID acak untuk setiap artikel yang akan diambil
    while (randomArticles.length < totalArticles) {
      const randomId = Math.floor(Math.random() * totalArticles) + 1;
  
      // Mengambil artikel dengan ID acak yang dihasilkan
      const article = await articles.findByPk(randomId); // Ganti Article dengan model Anda
  
      if (article) {
        randomArticles.push(article);
      }
    }
  
    res.json({
      message: 'Get Article Success',
      data: randomArticles
    });
  
    } catch (error) {
      console.error('Terjadi kesalahan:', error);
      return { error: 'Terjadi kesalahan dalam mengambil artikel' };
  }
};

module.exports = {
    addArticle, 
    getArticles,
    getArticlesByTitle,
    getArticlesById,
    getArticlesByDate,
    getArticlesByDateAndCategory,
    getAllRandomArticles
}