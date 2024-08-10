import React, { createContext, useContext, useState, useCallback } from 'react';

interface ZIndexContextType {
  zIndices: Record<string, number>;
  highestZIndex: number;
  bringToFront: (id: string) => void;
}

const ZIndexContext = createContext<ZIndexContextType | undefined>(undefined);

export const ZIndexProvider: React.FC = ({ children }) => {
  const [zIndices, setZIndices] = useState<Record<string, number>>({});
  const [highestZIndex, setHighestZIndex] = useState(1);

  const bringToFront = useCallback((id: string) => {
    setHighestZIndex((prevHighest) => {
      setZIndices((prevZIndices) => {
        if (prevZIndices[id] === prevHighest + 1) {
          return prevZIndices;
        }
        return {
          ...prevZIndices,
          [id]: prevHighest + 1,
        };
      });
      return prevHighest + 1;
    });
  }, []);

  return (
    <ZIndexContext.Provider value={{ zIndices, highestZIndex, bringToFront }}>
      {children}
    </ZIndexContext.Provider>
  );
};

export const useZIndex = () => {
  const context = useContext(ZIndexContext);
  if (!context) {
    throw new Error('useZIndex must be used within a ZIndexProvider');
  }
  return context;
};
