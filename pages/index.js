import fetch from 'isomorphic-fetch';
import Error from 'next/error';
import Link from 'next/link';
import Layout from '../components/Layout';
import StoryList from '../components/StoryList';

const Index = ({ stories, page }) => {
  if (stories.length === 0) {
    return <Error statusCode={503} />;
  }
  return (
    <Layout
      title="HackerNews Clone"
      description="A HackerNews clone built using NextJS"
    >
      <StoryList stories={stories} />
      <footer>
        {page > 1 && (
          <Link href={`/?page=${page - 1}`}>
            <a>Previous Page</a>
          </Link>
        )
      }
        <Link href={`/?page=${page + 1}`}>
          <a>
            Next Page
            {' '}
            {page + 1}
          </a>
        </Link>
      </footer>
      <style jsx>
        {`
        footer {
          padding: 1em;
        }
        footer > * {
          margin-right: 1rem;
        }
        footer a {
          font-weight: bold;
          color: black;
          text-decoration: none;
        }
        footer a:hover {
          text-decoration: underline;
        }
      `}
      </style>
    </Layout>
  );
};

Index.getInitialProps = async ({ query }) => {
  let stories;
  const page = Number(query.page) || 1;
  const res = await fetch(`https://node-hnapi.herokuapp.com/news?page=${page}`);
  try {
    stories = await res.json();
  } catch (err) {
    stories = [];
  }
  return { stories, page };
};

export default Index;
