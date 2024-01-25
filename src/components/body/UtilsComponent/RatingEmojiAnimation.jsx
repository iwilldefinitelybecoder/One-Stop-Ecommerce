import React from 'react';
import { useSpring, animated,config } from 'react-spring';

const RatingEmojianimation = ({ rating }) => {
  const { transform } = useSpring({config:config.wobbly});
    rating = Math.ceil(rating)
  return (
    <animated.div style={{ transform }}>
      {rating === 0 ? (
        <span role="img" aria-label="No Data">
          🚫
        </span>
      ) : rating === 1 ? (
        <span role="img" aria-label="Sad">
          😢
        </span>
      ) : rating === 2 ? (
        <span role="img" aria-label="Unsatisfied">
          😐
        </span>
      ) : rating === 3 ? (
        <span role="img" aria-label="Neutral">
          😐
        </span>
      ) : rating === 4 ? (
        <span role="img" aria-label="Medium Happy">
          😊
        </span>
      ) : rating === 5 ? (
        <span role="img" aria-label="Full Happy">
          😄
        </span>
      ) : null}
    </animated.div>
  );
};

export default RatingEmojianimation;
