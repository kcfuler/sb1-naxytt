import React, { useState, useEffect, useRef } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import VideoPost from './VideoPost';
import { useInView } from 'react-intersection-observer';

const INITIAL_POSTS = [
  {
    id: 1,
    username: '@dancingqueen',
    description: 'Check out this new dance! 💃 #dance #viral',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-girl-in-neon-sign-1232-large.mp4',
    likes: 1234,
    comments: 88,
    shares: 45
  },
  {
    id: 2,
    username: '@foodlover',
    description: 'Making my favorite pasta! 🍝 #cooking #food',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-serving-dinner-442-large.mp4',
    likes: 2341,
    comments: 156,
    shares: 67
  },
  {
    id: 3,
    username: '@travelbug',
    description: 'Beautiful sunset in Bali 🌅 #travel #bali',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-waves-in-the-water-1164-large.mp4',
    likes: 5678,
    comments: 234,
    shares: 89
  },
  {
    id: 4,
    username: '@fitnessguru',
    description: 'Morning workout routine 💪 #fitness #health',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-woman-doing-arm-exercises-1327-large.mp4',
    likes: 3456,
    comments: 178,
    shares: 56
  }
];

function VideoFeed() {
  const [posts, setPosts] = useState(INITIAL_POSTS);
  const [loading, setLoading] = useState(false);
  const parentRef = useRef<HTMLDivElement>(null);
  const { ref: loaderRef, inView } = useInView();

  const rowVirtualizer = useVirtualizer({
    count: posts.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => window.innerHeight,
    overscan: 2,
  });

  const generateMorePosts = () => {
    const lastId = posts[posts.length - 1].id;
    return INITIAL_POSTS.map(post => ({
      ...post,
      id: lastId + post.id,
      username: `${post.username}_${lastId}`,
    }));
  };

  useEffect(() => {
    if (inView && !loading) {
      setLoading(true);
      setTimeout(() => {
        setPosts(prevPosts => [...prevPosts, ...generateMorePosts()]);
        setLoading(false);
      }, 1000);
    }
  }, [inView]);

  return (
    <div 
      ref={parentRef} 
      className="h-full overflow-y-auto"
      style={{
        contain: 'strict',
      }}
    >
      <div
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
          width: '100%',
          position: 'relative',
        }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualItem) => (
          <div
            key={posts[virtualItem.index].id}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100vh',
              transform: `translateY(${virtualItem.start}px)`,
            }}
          >
            <VideoPost 
              post={posts[virtualItem.index]}
              isVisible={virtualItem.index === rowVirtualizer.getVirtualItems()[1]?.index}
            />
          </div>
        ))}
      </div>
      <div ref={loaderRef} className="h-0" />
      {loading && (
        <div className="flex justify-center items-center h-20 text-white">
          Loading more videos...
        </div>
      )}
    </div>
  );
}

export default VideoFeed;