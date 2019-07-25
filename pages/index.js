import fetch from 'isomorphic-fetch';
import Error from 'next/error';
import StoryList from '../components/StoryList';

const Index = ({ stories }) => {
  if (stories.length === 0) {
    return <Error statusCode={503} />;
  }

  return (
    <div>
      <h1>HackerNews Clone</h1>
      <StoryList stories={stories} />
    </div>
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
