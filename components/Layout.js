import Link from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/router';

const Layout = ({
  children, title, description, backButton,
}) => {
  const router = useRouter();
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>
      <div className="container">
        <nav>
          {
          backButton && (
            <span
              role="button"
              tabIndex="0"
              className="back-button"
              onClick={() => router.back()}
              onKeyDown={() => router.back()}
            >
              &#x2b05;
            </span>
          )
        }
          <Link href="/">
            <a>
              <span className="main-title">HackerNews Clone</span>
            </a>
          </Link>
        </nav>
        { children }
      </div>
      <style jsx>
        {`
      .container {
        max-width: 800px;
        margin: 0 auto;
        background: #f6f6ef;
      }
      nav {
        background: #f60;
        padding: 1em;
      }
      nav > * {
        display: inline-block;
        color: black;
      }
      nav a {
        text-decoration: none;
      }
      nav .main-title {
        font-weight: bold;
      }
      nav .back-button {
        font-size: 0.9rem;
        padding-right: 1em;
        cursor: pointer;
      }
    `}
      </style>
      <style global jsx>
        {`
      body {
        background: white;
        font-family: Verdana, Geneva, sans-serif;
        margin: 0 auto;
      }
    `}

      </style>
    </div>
  );
};

export default Layout;
