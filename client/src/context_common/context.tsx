// import React, { createContext, useState, ReactNode, useContext } from 'react';

// interface CommonContextType {
//   full_detail: string[];
//   setFull_detail: (value: string[]) => void;
// }

// const CommonContext = createContext<CommonContextType | undefined>(undefined);

// export const CommonProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
//   const [full_detail, setFull_detail] = useState<string[]>([]);

//   return (
//     <CommonContext.Provider value={{ full_detail, setFull_detail }}>
//       {children}
//     </CommonContext.Provider>
//   );
// };

// export const useCommonContext = (): CommonContextType => {
//   const context = useContext(CommonContext);
//   if (!context) {
//     throw new Error('useCommonContext must be used within a CommonProvider');
//   }
//   return context;
// };
