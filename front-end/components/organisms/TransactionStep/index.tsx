/* eslint-disable @next/next/no-img-element */
import { useCallback, useEffect, useState } from 'react';
import { getProducts, getProductSearch } from '../../../services/product'
import cx from 'classnames';


export default function TransactionStep() {
  const [productList, setProductList] = useState([])
  const [name, setName] = useState("")

  const className = {
    label: cx('form-label text-lg fw-medium color-palette-1 mb-10'),
  };

  const getProductList = useCallback(async () => {
    const data: any = await getProducts();
    setProductList(data.data);
  }, [getProducts])

  useEffect(() => {
    getProductList();
  }, [])

  const onSearch = async () => {
    console.log('onSearch berjalan')
    if(name !== ""){
      const res : any = await getProductSearch(name)
      setProductList(res.data.data)
    } else {
      getProductList()
    }
  }

  return (
    <section id="feature" className="feature pt-50 pb-50">
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
                    onChange={(event)=> setName(event.target.value)}
                  />
                </div>
                <div className="col-lg-4">
                  <button type="button" className="btn btn-feature fw-medium text-lg text-white rounded-pill" onClick={onSearch}>Search</button>
                </div>
              </div>
            </form>
          </div>
        </section>
        <div className="row gap-lg-0 gap-4">
          { productList && productList.map((item: any) => (
            // eslint-disable-next-line react/jsx-key
            <div className="col-lg-2" key={item.id}>
              <div className="card feature-card border-0 mb-5">
                <img src='/no-picture.png' alt="icon step" className="mb-30" width={80} height={80} />
                <p className="fw-semibold text-2xl mb-2 color-palette-1">{item.name}</p>
                <p className="text-lg color-palette-1 mb-0">Rp. {item.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
