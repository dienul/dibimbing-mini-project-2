const Products = require("../server/models").Products;

async function getProduct(req, res) {
  try {
    const { merchant } = req;
    const products = await Products.findAll(
      {
        where: {
          merchant_id: merchant.id,
        },
      },
      {
        raw: true,
      }
    );
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json(error);
  }
}

async function addProduct(req, res) {
  try {
    const { merchant } = req;
    const { name, quantity, price } = req.body;
    const product = await Products.create({
      merchant_id: merchant.id,
      name: name,
      quantity: quantity,
      price: price,
    });
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json(error);
  }
}

async function updateProduct(req, res) {
  try {
    const { id } = req.params;
    const { merchant } = req;
    const { name, quantity, price } = req.body;
    const product = await Products.findOne(
      {
        where: {
          id: id,
          merchant_id: merchant.id,
        },
      },
      {
        raw: true,
      }
    );

    let successUpdate = false;
    if (product) {
      const updateProduct = await Products.update(
        {
          name: name ? name : product.name,
          quantity: quantity ? quantity : product.quantity,
          price: price ? price : product.price,
        },
        {
          where: {
            id: id,
            merchant_id: merchant.id,
          },
        }
      );
      const [success] = updateProduct;
      if (success) {
        successUpdate = true;
      } else {
        throw new Error("Update product tidak berhasil");
      }
    } else {
      throw new Error("product tidak ditemukan");
    }

    let dataUpdate = null;
    if (successUpdate) {
      dataUpdate = await Products.findOne(
        {
          attributes: ["name", "quantity", "price"],
          where: {
            id: id,
            merchant_id: merchant.id,
          },
        },
        {
          raw: true,
        }
      );
    }

    res.status(200).json({
      update: "Success",
      data: dataUpdate,
    });
  } catch (error) {
    res.status(500).json(error);
  }
}

async function deleteProduct(req, res) {
  try {
    const { id } = req.params;
    const { merchant } = req;
    const product = await Products.findOne(
      {
        where: {
          id: id,
          merchant_id: merchant.id,
        },
      },
      {
        raw: true,
      }
    );

    let deleteProduct;
    if (product) {
      deleteProduct = await Products.destroy({
        where: {
          id: id,
          merchant_id: merchant.id,
        },
      });
      if(deleteProduct){
      } else {
        throw ({message : "Delete product gagal !!"});
      }
    } else {
      throw ({message : "Product tidak ditemukan!!"});
    }
    res.status(200).json({
      delete : "Success",
      data : product
    })
  } catch (error) {
    res.status(500).json(error);
  }
}

module.exports = {
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct,
};
