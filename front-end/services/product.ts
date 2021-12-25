import callAPI from '../config/api';

const ROOT_API = 'http://localhost:4000';
const API_VERSION = 'api';

export async function getProducts(){
  const url = `${ROOT_API}/${API_VERSION}/product`

  return callAPI({
    url,
    method : 'GET',
  })
}

export async function getProductById(id:string) {
  const url = `${ROOT_API}/${API_VERSION}/product/${id}`
  
  return callAPI({
    url,
    method : 'GET',
    token : true
  })
}

export async function addProduct(data :FormData){
  const url = `${ROOT_API}/${API_VERSION}/product`

  return callAPI({
    url,
    method : 'POST',
    data,
    token : true
  })
}

export async function updateProduct(data: FormData, id : string){
  const url = `${ROOT_API}/${API_VERSION}/product/${id}`

  return callAPI({
    url,
    method: 'PUT',
    data,
    token : true
  })
}

export async function deleteProduct(id:string){
  const url = `${ROOT_API}/${API_VERSION}/product/${id}`

  return callAPI({
    url,
    method: 'DELETE',
    token : true
  })
}

export async function getProductByMerchant(id : string){
  const url = `${ROOT_API}/${API_VERSION}/product/merchant/${id}`

  return callAPI({
    url,
    method: 'GET',
    token : true
  })
}

export async function getProductSearch(name : string){
  const url = `${ROOT_API}/${API_VERSION}/product/search/${name}`

  return callAPI({
    url,
    method: 'GET',
  })
}
