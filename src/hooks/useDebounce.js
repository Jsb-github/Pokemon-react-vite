import React, { useEffect, useState } from "react";

export const useDebounce = (value, delay) => {
  // State and setters for debounced value

  const [debouncedValue, setDebounceValue] = useState(value);

  useEffect(() => {
    // Update debounced value after delay
    const handler = setTimeout(() => {
      setDebounceValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};
