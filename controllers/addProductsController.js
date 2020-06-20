const multer = require('multer');
const sharp = require('sharp');

const amazonProductModel = require("./../models/amazonProductModel");
const catchAsync = require("./../utils/catchAsync");

// const multerStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'public/img/amazon')
//   },
//   filename: (req, file, cb) => {
//     const ext = file.mimetype.split("/")[1];
//     cb(null, `product-${req.body.productBy}-${Date.now()}.${ext}`)
//   }
// })

const multerStorage = multer.memoryStorage()

const multerFilter = (req, file, cb) => {
  if(file.mimetype.startsWith('image')){
    cb(null, true)
  }else {
    cb('Upload only images', false)
  }
}

const uploadImages = multer({
  storage: multerStorage,
  fileFilter: multerFilter
})

exports.uploadProductImage = uploadImages.single('imageCover');

exports.resizeImage = (req, res, next) => {
  if(!req.file) return next()
  req.file.filename = `product-${req.body.productBy}-${Date.now()}.jpeg`
  sharp(req.file.buffer).resize(1200, 1500).toFormat('jpeg').jpeg({quality: 90}).toFile(`public/img/amazon/${req.file.filename}`)
  next();
}
// 61ks5m0z9oL._UL1280_
exports.addProduct = catchAsync(async (req, res) => {
    if(req.file) req.body.imageCover =  req.file.filename;
    const product = await amazonProductModel[req.params.product].create(req.body);
    res.status(201).json({
      status: "Success",
      data: {
        product: product,
      },
    });
  });