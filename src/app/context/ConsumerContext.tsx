"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

interface ConsumerInfo {
  id?: string;
  email?: string;
  name?: string;
}

interface ConsumerContextType {
  isLogged: boolean;
  authToken: string;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  consumerInfo: ConsumerInfo;
  setConsumerInfo: React.Dispatch<React.SetStateAction<ConsumerInfo>>;
  setIsLogged: (isLogged: boolean) => void;
}

const ConsumerContext = createContext<ConsumerContextType>({
  isLogged: false,
  authToken: "",
  isLoading: false,
  setIsLoading: () => {},
  consumerInfo: {},
  setConsumerInfo: () => {},
  setIsLogged: () => {},
});

export const ConsumerProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isLogged, setIsLogged] = useState(false);
  const [consumerInfo, setConsumerInfo] = useState<ConsumerInfo>({});
  const [isLoading, setIsLoading] = useState(true);
  const [authToken, setAuthToken] = useState("");

  useEffect(() => {
    const savedConsumer = localStorage.getItem("savedConsumer");

    if (savedConsumer) {
      const parsedData = JSON.parse(savedConsumer);
      setConsumerInfo(parsedData);
      setAuthToken(parsedData.authToken || "");
      setIsLogged(parsedData.isLogged || false);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (isLogged) {
      localStorage.setItem(
        "savedConsumer",
        JSON.stringify({ ...consumerInfo, isLogged })
      );
    }
  }, [isLogged, consumerInfo]);

  const contextValue: ConsumerContextType = {
    consumerInfo,
    setConsumerInfo,
    isLogged,
    setIsLogged,
    isLoading,
    setIsLoading,
    authToken,
  };

  return (
    <ConsumerContext.Provider value={contextValue}>
      {children}
    </ConsumerContext.Provider>
  );
};

export const useConsumer = () => useContext(ConsumerContext);
