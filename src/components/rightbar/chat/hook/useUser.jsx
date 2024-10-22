import useAxios from "../../../../hooks/useAxios.jsx";

import {useEffect, useState} from "react";

const useUser = () => {
    const {data, error, loading, refetch} = useAxios({
        url: 'http://localhost:8080/api/users/inquiry',
        method: "GET",
    });

    const [user, setUser] = useState(null);

    useEffect(() => {
         if (data) {
             // 서버에서 받은 유저 데이터 정보를 상태로 설정하기
             setUser(data);
         }
         if (error) {
             console.error("유저 정보 가져오기 실패 :  ", error);
         }
    }, [data, error]);
    return {user, loading, refetch};
}

export default useUser();