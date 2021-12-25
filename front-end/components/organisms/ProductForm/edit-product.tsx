import { useCallback, useEffect, useState } from 'react';
import cx from 'classnames';
import { useRouter } from 'next/router';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { setSignUp } from '../../../services/auth';
import { addProduct, getProductById, updateProduct} from '../../../services/product';
import { toast } from 'react-toastify';

const AddProductSchema = yup.object().shape({
  name: yup.string().required(),
  quantity: yup.number().required().positive().integer(),
  price: yup.number().required().positive().integer(),
});

export default function EditProductForm() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('')
  const [price, setPrice] = useState('')

  console.log('query edit >', router.query)
  const { id } = router.query as any

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(AddProductSchema)
  });

  const getProduct = useCallback(async () => {
    const data: any = await getProductById(id)
    console.log('data >>', data.data)
    setName(data.data.name)
    setQuantity(data.data.quantity)
    setPrice(data.data.price)
    register('name', data.data.name)
    register('quantity', data.data.quantity)
    register('price', data.data.price)
  }, [getProductById(id)])

  useEffect(() => {
    getProduct()
  }, [])



  const className = {
    label: cx('form-label text-lg fw-medium color-palette-1 mb-10'),
  };

  const onSubmit = async (data: any) => {
    console.log('data >>', data)
    const response = await updateProduct(data, id);
    if (response.error) {
      toast.error(response.message);
    } else {
      toast.success('Edit product Berhasil');
      router.push('/');
    }
  };
  return (
    <>
      <h2 className="text-4xl fw-bold color-palette-1 mb-10">Edit Product</h2>
      <p className="text-lg color-palette-1 m-0">Daftar dan bergabung dengan kami</p>
      <div className="pt-50">
        <label className={className.label}>Product Name</label>
        <input
          type="text"
          className="form-control rounded-pill text-lg"
          aria-describedby="name"
          placeholder="Enter your name"
          value={name}
          {...register("name")}
          onChange={(event) => setName(event.target.value)}
          required
        />
        {errors.name && <div className="invalid-feedback">
          {errors.name.message}
        </div>}
      </div>
      <div className="pt-30">
        <label className={className.label}>Quantity</label>
        <input
          type="number"
          className="form-control rounded-pill text-lg"
          aria-describedby="quantity"
          placeholder="Enter your quantity"
          {...register('quantity')}
          value={quantity}
          onChange={(event) => setQuantity(event.target.value)}
        />
        {errors.quantity && <div className="invalid-feedback">
          {errors.quantity.message}
        </div>}
      </div>
      <div className="pt-30">
        <label className={className.label}>price</label>
        <input
          type="number"
          className="form-control rounded-pill text-lg"
          aria-describedby="price"
          placeholder="Enter your quantity"
          {...register('price')}
          value={price}
          onChange={(event) => setPrice(event.target.value)}
        />
        {errors.price && <div className="invalid-feedback">
          {errors.price.message}
        </div>}
      </div>
      <div className="button-group d-flex flex-column mx-auto pt-50">
        <button
          type="button"
          className="btn btn-sign-up fw-medium text-lg text-white rounded-pill mb-16"
          onClick={handleSubmit(onSubmit)}
        >
          Continue
        </button>
      </div>
    </>
  );
}
