import { useState, useCallback } from "react";

export default function useFetch(url, options = null) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    setData(null);

    try {
      const response = await fetch(url, options);
      const result = await response.json();

      if (!response.ok) {
        setError(result.message || "Something went wrong"); // Set error message if request fails
      } else {
        setData(result); // Set data if request succeeds
      }
    } catch (error) {
      setError(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, [url, options]);

  return { data, error, loading, fetchData };
}
