import { useState, useEffect } from 'react';

const LoadingDelay = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 750);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return {
    isLoading,
  };
};

export default LoadingDelay;
