/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { useCallback, useEffect, useState } from 'react';
import { getProductByMerchant, deleteProduct } from '../../../services/product'
import cx from 'classnames';


export default function ListProducts(props: any) {
  // const { id } = props
  const [productList, setProductList] = useState([])
  const router = useRouter()
  const className = {
    label: cx('form-label text-lg fw-medium color-palette-1 mb-10'),
  };

  const { id } = router.query as any;
  console.log('query 3 >', router.query);

  const getProductList = useCallback(async () => {
    const data: any = await getProductByMerchant(id);
    setProductList(data.data.data);
  }, [getProductByMerchant(id)])


  useEffect(() => {
    getProductList();
  }, [])

  const onEdit = (id : string) => {
    router.push(`/product/edit/${id}`);
  };

  const onDelete = async (id: string) => {
    const res = await deleteProduct(id)
    console.log('res >', res)
    if (!(res.error)) {
      toast.success(`Berhasil dihapus ${res.data.data.name}`);
      getProductList();
    }
  }

  console.log('productList >', productList)

  return (
    <section id="feature" className="product pt-50 pb-50">
      <div className="container-fluid">
        <section className="pb-47" >
          <div className="container ">
            <form action="">
              <div className="row gap-lg-0 gap-4">
                <div className="col-lg-4">
                  {/* <input
                    type="text"
                    className="form-control rounded-pill text-lg"
                    aria-describedby="name"
                    placeholder="Enter your name"
                  /> */}
                </div>
                <div className="col-lg-4">
                  <input
                    type="text"
                    className="form-control rounded-pill text-lg"
                    aria-describedby="name"
                    placeholder="Nama Produk"
                  />
                </div>
                <div className="col-lg-4">
                  <button type="button" className="btn btn-product fw-medium text-lg text-white rounded-pill">Search</button>
                </div>
              </div>
            </form>
          </div>
        </section>
        <div className="row gap-lg-0 gap-4">
          {productList &&
            productList.map((item: any) => (
              // eslint-disable-next-line react/jsx-key
              <div className="col-lg-3" key={item.id}>
                <div className="card feature-card border-0 mb-5">
                  <img src='/no-picture.png' alt="icon step" className="mb-30" width={80} height={80} />
                  <p className="fw-semibold text-2xl mb-2 color-palette-1">{item.name}</p>
                  <p className="text-lg color-palette-1 mb-2">Rp. {item.price}</p>
                  <div className='row'>
                    <div className='col'>
                      <button type="button" className="btn btn-product-width fw-medium text-lg text-white rounded-pill" onClick={()=> onEdit(item.id)}>Edit</button>
                    </div>
                    <div className='col'>
                      <button type="button" className="btn btn-product-width fw-medium text-lg text-white rounded-pill" onClick={() => onDelete(item.id)}>Delete</button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </section>
  );
}
