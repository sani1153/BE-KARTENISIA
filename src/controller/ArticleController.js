const articles = require('../models/ArticleModels');
const { Op } = require("sequelize");

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

const getArticles = async (req, res) => {
    console.log(req)
    try {
        let articlesData;
        // Mengambil data artikel
        if(req.query.category){
            articlesData = await articles.findAll({
                where: {
                    category: req.query.category
                }
        
            });
        }else{
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

const getArticlesByTittle = async (req, res) => {
    try {
        const searchTerm = req.query.q; // Mendapatkan query pencarian dari request
        console.log(searchTerm)
        console.log(req.query)
        const article = await articles.findAll({
            where: {
                // Menentukan kondisi pencarian, misalnya judul mengandung searchTerm
                title: {
                    [Op.like]: `%${searchTerm}%`
                }
            }
        });

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

// const getArticlesById  = async (req, res) => {
//     console.log(req)
//     try {
//         let articlesData;
//         // Mengambil data artikel
//         if(req.query.article_id){
//             articlesData = await articles.findAll({
//                 where: {
//                     article_id: req.query.article_id
//                 }
        
//             });
//         }else{
//             articlesData = await articles.findAll()
//         }

//         res.json({
//             message: 'Get Article Success',
//             data: articlesData // Mengirim data artikel sebagai respons
//         });

//     } catch (error) {
//         res.status(500).json({
//             message: "Server Error",
//             serverMessage : error
//         })
//     }
// }

const getArticlesById = async (req, res) => {
    try {
      const { id } = req.params;
      const article = await articles.findByPk(id);
      if (!article) {
        res.status(404).json({ message: 'Artikel tidak ditemukan' });
        return;
      }
      res.json(article);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Terjadi kesalahan dalam mengambil Artikel' });
    }
  }

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
  
      res.json(article);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Terjadi kesalahan dalam mengambil Artikel berdasarkan tanggal' });
    }
  };
  
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
  
      res.json(article);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Terjadi kesalahan dalam mengambil Artikel berdasarkan tanggal dan kategori' });
    }
  };

  const getRandomArticle = async (req, res) => {
    try {
      // Mendapatkan jumlah total artikel dalam basis data Anda
      const totalArticles = await articles.count(); // Ganti Article dengan model Anda
      
      // Menghasilkan ID acak antara 1 dan jumlah total artikel
      const randomId = Math.floor(Math.random() * totalArticles) + 1;
      
      // Mengambil artikel dengan ID acak yang dihasilkan
      const article = await articles.findByPk(randomId); // Ganti Article dengan model Anda

      if (!article) {
        return { error: 'Artikel tidak ditemukan' };
      }
      res.json(article);


    } catch (error) {
      console.error('Terjadi kesalahan:', error);
      return { error: 'Terjadi kesalahan dalam mengambil artikel' };
    }
  };
  
  // Penggunaan fungsi getRandomArticle
  // getRandomArticle().then(article => {
  //   console.log(article);
  //   // Lakukan sesuatu dengan artikel yang didapatkan
  // });
  
// function backfillArticle(req, res, next){
//     articles.bulkCreate([{
//         title: "Article 1",
//         urlImage: "https://i.ytimg.com/vi/QWB-yrCBw9Y/hqdefault.jpg",
//         description: "Ini Berita Pertama"
//     },
//     {
//         title: "Article 2",
//         urlImage: "https://t3n.de/news/wp-content/uploads/2022/12/EQE-e1672242194293.jpg",
//         description: "Ini Berita Kedua"
//     },
//     {
//         title: "Article 3"
//         urlImage: "https://cdn.mos.cms.futurecdn.net/c3RwNWN8XeDGfgrBXGaR4f-1200-80.jpg",
//         description: "Ini berita ketiga"
//     }])
//         .then(()=> res.json({message: "Successfully backfilled in"}))
//         .catch(err=> {
//             console.error(err);
//             res.status(500).json({
//                 error: err
//             })
//         });
//   }


module.exports = {
    addArticle, 
    getArticles,
    getArticlesByTittle,
    getArticlesById,
    getArticlesByDate,
    getArticlesByDateAndCategory,
    getRandomArticle
}