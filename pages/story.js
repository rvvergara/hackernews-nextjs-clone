import fetch from 'isomorphic-fetch';
import Error from 'next/error';
import Layout from '../components/Layout';
import CommentList from '../components/CommentList';

const Story = ({ story }) => {
  if (!story) {
    return <Error statusCode={503} />;
  }
  const {
    title, url, points, comments, comments_count, time_ago,
  } = story;
  return (
    <Layout title={title}>
      <main>
        <h1 className="story-title">
          <a href={url}>{title}</a>
        </h1>
        <div className="story-details">
          <strong>
            {points}
            {' '}
            points
          </strong>
          <strong>
            {comments_count}
            {' '}
            comments
          </strong>
          <strong>
            { time_ago }
          </strong>
          {
            story.comments.length > 0 ? <CommentList comments={story.comments} /> : <div>No comments</div>
          }
        </div>
      </main>
      <style jsx>
        {`
        main {
          padding: 1em;
        }
        .story-title {
          font-size: 1.2rem;
          margin: 0;
          font-weight: 300;
          padding-bottom: 0.5em;
        }
        .story-title a {
          color: #333;
          text-decoration: none;
        }
        .story-title a:hover {
          text-decoration: underline;
        }
        .story-details {
          font-size: 0.8rem;
          padding-bottom: 1em;
          border-bottom: 1px solid rgba(0,0,0,0.1);
          margin-bottom: 1em;
        }
        .story-details strong {
          margin-right: 1em;
        }
        .story-details a {
          color: #f60;
        }
      `}

      </style>
    </Layout>
  );
};

Story.getInitialProps = async ({ query }) => {
  let story;
  const { id } = query;
  const res = await fetch(`https://node-hnapi.herokuapp.com/item/${id}`);
  try {
    story = await res.json();
  } catch (err) {
    story = null;
  }

  return { story };
};

export default Story;
