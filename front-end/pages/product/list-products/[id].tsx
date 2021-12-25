import { useEffect } from 'react';
import { useRouter } from 'next/router'
import Head from 'next/head';
import Navbar from '../../../components/organisms/Navbar';
import TransactionStep from '../../../components/organisms/TransactionStep';
import ListProducts from '../../../components/organisms/ListProduct';

export default function ListProductsPage() {
  const router = useRouter()
  const { id } = router.query;
  return (
    <>
      <Head>
        <title>StoreGG - Get a New Experience in Gaming</title>
        <meta name="description" content="Kami menyediakan jutaan cara untuk membantu players menjadi pemenang sejati" />
        <meta property="og:title" content="StoreGG - Get a New Experience in Gaming" />
        <meta property="og:description" content="Kami menyediakan jutaan cara untuk membantu players menjadi pemenang sejati" />
        <meta property="og:image" content="https://imageurlkalian" />
        <meta property="og:url" content="https://storegg.com" />
      </Head>
      <Navbar />
      <ListProducts id={id} />
    </>
  )
}