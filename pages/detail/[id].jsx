import Head from 'next/head';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { newsSelector, setDetailNews } from '../../slices/newsSlices';

export default function NewsDetail() {
  const router = useRouter();
  const dispatch = useDispatch();
  const newsState = useSelector(newsSelector);
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  useEffect(() => {
    if (newsState.newsList) {
      const findNews = newsState.newsList.find(
        (news) => String(news.id) === router.query.id
      );
      if (findNews) {
        dispatch(setDetailNews(findNews));
      }
    }
  }, [newsState.newsList, router.query.id]);

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

      <main className="p-4 align-items-center">
        <button
          type="button"
          className="btn btn-dark"
          onClick={() => router.back()}
        >
          Back
        </button>

        {newsState.detailNews && (
          <div className="row mx-5">
            <div className="col-12">
              <p className="text-center fs-2">{newsState.detailNews.title}</p>
            </div>

            <div className="col-12">
              <img
                src={newsState.detailNews.media[0]?.['media-metadata'][2]?.url}
                className="rounded mx-auto d-block img-fluid"
                alt="image"
              />
            </div>

            <div className="col-12">
              <small className="text-muted">
                <p className="text-center">
                  {newsState.detailNews.media[0]?.caption}
                </p>
              </small>
            </div>

            <div className="col-12">
              <p className="text-center m-0">
                Published at{' '}
                {new Date(
                  newsState.detailNews.published_date
                ).toLocaleDateString('en-US', options)}{' '}
                Updated at{' '}
                {new Date(newsState.detailNews.updated).toLocaleDateString(
                  'en-US',
                  options
                )}
              </p>
            </div>

            <div className="col-12">
              <p className="text-center">{newsState.detailNews.byline}</p>
            </div>

            <div className="col-12">
              <p className="text-center">{newsState.detailNews.abstract}</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
