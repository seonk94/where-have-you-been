/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';


interface Props {
  children: React.ReactNode
}
interface ContextType {
  userId: number | null;
}

export const UserContext = createContext<ContextType>({ userId : null}); 

function UserProvider({ children } : Props) {
  const [userId, setUserId] = useState<number | null>(null);
  const history = useHistory();

  useEffect(() => {
    window.Kakao.API.request({
      url : '/v2/user/me'
    })
      .then((res: { id: number, connected_at: string}) => {
        setUserId(res.id);
      })
      .catch((err: any) => {
        if (history.location.pathname !== '/login') {
          alert('로그인이필요합니다.');
          history.push('/login');
        }
      });
  }, []);

  return (
    <UserContext.Provider value={{
      userId : userId
    }}>
      {children}
    </UserContext.Provider>
  );
}
export default UserProvider;