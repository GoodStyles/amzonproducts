const amazonProductModel = require("./../models/amazonProductModel");
const catchAsync = require("./../utils/catchAsync");

// 61ks5m0z9oL._UL1280_
exports.addProduct = catchAsync(async (req, res) => {
    const product = await amazonProductModel[req.params.product].create(req.body);
    res.status(201).json({
      status: "Success",
      data: {
        product: product,
      },
    });
  });