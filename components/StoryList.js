import NProgress from 'nprogress';
import Router from 'next/router';
import Story from './Story';

Router.onRouteChangeStart = () => NProgress.start();
Router.onRouteChangeComplete = () => NProgress.done();

const StoryList = ({ stories }) => (
  <div className="story-list">
    {
      stories.map(story => (
        <Story key={story.id} story={story} />
      ))
    }
  </div>
);

export default StoryList;
