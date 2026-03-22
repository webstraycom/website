import * as React from 'react';

const IS_SERVER = typeof window === 'undefined';

export function useMediaQuery(query, { defaultValue = false, initializeWithValue = true } = {}) {
  const getMatches = (query) => {
    if (IS_SERVER) {
      return defaultValue;
    }
    return window.matchMedia(query).matches;
  };

  const [matches, setMatches] = React.useState(() => {
    if (initializeWithValue) {
      return getMatches(query);
    }
    return defaultValue;
  });

  React.useEffect(() => {
    const matchMedia = window.matchMedia(query);

    const handleChange = () => {
      setMatches(matchMedia.matches);
    };

    handleChange();

    matchMedia.addEventListener('change', handleChange);

    return () => {
      matchMedia.removeEventListener('change', handleChange);
    };
  }, [query]);

  return matches;
}
