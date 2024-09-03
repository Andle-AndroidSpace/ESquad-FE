import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // 로그인 처리
  const login = async (username, password) => {
    try {
      const response = await axios.post('/loginProc', {
        username,
        password,
      });

      if (response.status === 200) {
        setUser({ username });
        return true;
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
    return false;
  };

  // 로그아웃 처리 (아직 없음)
  const logout = async () => {
    try {
      await axios.post('/logout');
      setUser(null);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  // 현재 사용자 정보를 불러오는 함수
  const fetchUserProfile = async () => {
    try {
      const response = await axios.get('/profile');
      if (response.status === 200) {
        setUser({ username: response.data });
      }
    } catch (error) {
      console.error('Failed to fetch user profile:', error);
      setUser(null);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  return (
      <AuthContext.Provider value={{ user, login, logout }}>
        {children}
      </AuthContext.Provider>
  );
};
