import { useEffect } from 'react';
import Head from 'next/head';
import Navbar from '../components/organisms/Navbar';
import TransactionStep from '../components/organisms/TransactionStep';

export default function Home() {
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
      {/* <MainBanner /> */}
      <TransactionStep />
      {/* <FeaturedGame /> */}
      {/* <Reached /> */}
      {/* <Story /> */}
      {/* <Footer /> */}
    </>
  );
}
