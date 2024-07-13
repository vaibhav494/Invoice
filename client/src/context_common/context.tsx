import React, { createContext, useState, ReactNode, useContext } from 'react';

interface CommonContextType {
  sname: string[];
  setSname: (value: string[]) => void;
}

const CommonContext = createContext<CommonContextType | undefined>(undefined);

export const CommonProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [sname, setSname] = useState<string[]>([]);

  return (
    <CommonContext.Provider value={{ sname, setSname }}>
      {children}
    </CommonContext.Provider>
  );
};

export const useCommonContext = (): CommonContextType => {
  const context = useContext(CommonContext);
  if (!context) {
    throw new Error('useCommonContext must be used within a CommonProvider');
  }
  return context;
};
