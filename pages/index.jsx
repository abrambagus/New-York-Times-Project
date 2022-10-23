import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import styles from '../styles/Home.module.css';
import { API_URL, API_KEY } from '../config/index';
import { setNews, newsSelector } from '../slices/newsSlices';

export default function Home({ data }) {
  const dispatch = useDispatch();
  const newsState = useSelector(newsSelector);
  const router = useRouter();

  useEffect(() => {
    if (data.results.length !== 0) {
      dispatch(setNews(data.results));
    }
  }, [dispatch]);

  const onClickNewsDetail = (news) => {
    router.push(`/detail/${encodeURI(news.id)}`, undefined, { shallow: true });
  };

  return (
    <div>
      <Head>
        <title>New York Times Project</title>
      </Head>

      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link href="/">
            <a className="navbar-brand pe-auto">New York Times Project</a>
          </Link>
        </div>
      </nav>

      <main className={styles.main}>
        {newsState.newsList.map((news) => (
          // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
          <div
            className="card mb-3"
            style={{ width: '500px', cursor: 'pointer' }}
            key={news.id}
            onClick={() => onClickNewsDetail(news)}
          >
            <Image
              width={350}
              height={350}
              src={news.media[0]?.['media-metadata'][2]?.url}
              alt="Card image cap"
            />
            <div className="card-body">
              <h5 className="card-title">{news.title}</h5>
              <p className="card-text">{news.abstract}</p>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}

export async function getServerSideProps() {
  const response = await axios.get(
    `${API_URL}/viewed/7.json?api-key=${API_KEY}`
  );

  return {
    props: {
      data: response.data,
    },
  };
}
