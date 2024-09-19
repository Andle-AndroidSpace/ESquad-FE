import { useState, useEffect } from 'react';
import axios from 'axios';

const useAxios = ({ url, method = 'GET', body = null, headers = {} }) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchData = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('jwt');
            const authHeaders = token ? { ...headers, Authorization: `Bearer ${token}` } : headers;
            const response = await axios({
                url,
                method,
                headers: authHeaders,
                data: body,
            });
            setData(response.data);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    // GET 요청일 때만 자동으로 데이터를 불러옴
    useEffect(() => {
        if (method === 'GET' && url) {
            fetchData();
        }
    }, [url, method]); // url이나 method가 변경될 때만 실행

    return { data, error, loading, refetch: fetchData };
};

export default useAxios;
