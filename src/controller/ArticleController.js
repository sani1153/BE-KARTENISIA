const articles = require('../models/ArticleModels');

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
    getArticles
}