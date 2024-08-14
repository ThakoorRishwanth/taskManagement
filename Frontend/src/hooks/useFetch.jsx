import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

/**
 * Custom hook to fetch data from an API.
 * @param {string} url - The URL to fetch data from.
 * @param {Object} options - Fetch options (optional).
 * @returns {Object} - Contains data, error, and loading state.
 */
const useFetch = (url, options = {}) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch(url, options);

                if (!response.ok) {
                    throw new Error(`Error: ${response.status} ${response.statusText}`);
                }

                const result = await response.json();
                setData(result);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [url, options]);

    return { data, error, loading };
};

useFetch.propTypes = {
    url: PropTypes.string.isRequired,
    options: PropTypes.object,
};

export default useFetch;
