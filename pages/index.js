import fetch from 'isomorphic-fetch';
import Error from 'next/error';
import Layout from '../components/Layout';
import StoryList from '../components/StoryList';

const Index = ({ stories }) => {
  if (stories.length === 0) {
    return <Error statusCode={503} />;
  }
  return (
    <Layout
      title="HackerNews Clone"
      description="A HackerNews clone built using NextJS"
    >
      <StoryList stories={stories} />
    </Layout>
  );
};

Index.getInitialProps = async () => {
  let stories;
  const res = await fetch('https://node-hnapi.herokuapp.com/news?page=1');
  try {
    stories = await res.json();
    return { stories };
  } catch (err) {
    console.log('Error: ', err);
    stories = [];
  }
  return { stories };
};

export default Index;
