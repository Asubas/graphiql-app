// 'use client';

// import { createContext, useState, useEffect, useContext } from 'react';

// export interface UserContextType {
//   isLogined: boolean;
//   userName: string | null;
//   toggleLoginState: () => void;
// }

// const UserContext = createContext<UserContextType | undefined>(undefined);

// export const useUser = () => {
//   const context = useContext(UserContext);
//   if (!context) {
//     throw new Error('useUser must be used within a UserProvider');
//   }
//   return context;
// };

// export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [isLogined, setIsLogined] = useState<boolean>(false);
//   const [userName, setUserName] = useState<string | null>(null);

//   useEffect(() => {
//     const storedLoginState = localStorage.getItem('isLogined') === 'true';
//     const storedUserName = localStorage.getItem('userName');
//     setIsLogined(storedLoginState);
//     setUserName(storedUserName);
//   }, []);

//   const toggleLoginState = () => {
//     const newLoginState = !isLogined;
//     setIsLogined(newLoginState);

//     if (newLoginState) {
//       const name = 'Test User';
//       localStorage.setItem('isLogined', 'true');
//       localStorage.setItem('userName', name);
//       setUserName(name);
//     } else {
//       localStorage.setItem('isLogined', 'false');
//       localStorage.removeItem('userName');
//       setUserName(null);
//     }
//   };

//   return (
//     <UserContext.Provider value={{ isLogined, userName, toggleLoginState }}>
//       {children}
//     </UserContext.Provider>
//   );
// };

// export { UserContext };
