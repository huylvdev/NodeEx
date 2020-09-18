const router = require('express').Router();

const Post = require('../models/post');
// import { CutSignOfVietNamese } from '../helper/StringHelper';

async function bodauTiengViet(str) {
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/ /g, "-");
    str = str.replace(/\./g, "-");
    return str;
}

router.post('/post', async (req, res) => {

    let slug = await bodauTiengViet(req.body.title)
    var post = new Post({
        title: req.body.title,
        slug: slug,
        content: req.body.content,
        tag: req.body.tag,
        category: req.body.category,
        image: req.body.image,
        description: req.body.description,
    });
    post.save().then((post) => {
        res.send(post);
    }, (e) => {
        res.status(400).send(e);
    });
});



router.delete('/post/delete/:title', (req, res) => {
    var query = { userID: req.params.title };
    Post.findOneAndRemove(query,
        (e, raw) => {
            if (e) {
                res.status(400).send('Invalid username supplied');
            }
            res.send(raw);
        });
});

router.get('/postby/:title', (req, res) => {
    var title = req.params.title;

    Post.find({ title: title }).then((post) => {
        res.send(post);
    }, (e) => {
        res.status(400).send(e);
    });
});


router.get('/post/:page/:pagesize', async (req, res) => {
    let page = parseInt(req.params.page)
    let pagesize = parseInt(req.params.pagesize)

    let dev = await Post.find({})
        .select(['title', 'category', 'image', 'description', 'slug',])
        .skip(page * pagesize)
        .limit(pagesize)
    res.send(dev)
});

router.get('/getbyid/:id', async (req, res) => {
    var id = req.params.id;
    let dev = await Post.find({ _id: id })

    res.send(dev)
});

router.get('/getbycate/:category', async (req, res) => {
    var id = req.params.category;
 
    let dev = await Post.find({
        category: { $all: [id] }
    })
    console.log('huydev', dev)
    res.send(dev)
});

module.exports = router;