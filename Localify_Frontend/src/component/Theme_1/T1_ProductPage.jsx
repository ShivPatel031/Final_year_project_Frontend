import { useEffect, useState } from 'react';
import ProductDetails from './ProductDetails';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const T1_ProductPage = () => {
  const [productData,setProductData] = useState(null);
  const {id} = useParams(); 
  console.log(id);

  useEffect(()=>{
    async function fetchData()
    {
      try {
        const response = await axios.get(`http://${import.meta.env.VITE_BACKEND_ROUTE}/api/products/${id}`);
        if(response.status == 200) setProductData(response.data.product)

      } catch (error) {
        console.log(error);
      }
      
    }

    fetchData();
  },[])

  return productData ?(
    <div>
      <ProductDetails product={productData} />
    </div>
  ) : (<h2>Lodaing...</h2>);
};

export default T1_ProductPage;