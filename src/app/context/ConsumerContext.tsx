"use client";
import { createContext, useContext, useEffect, useState } from "react";

const ConsumerContext = createContext({
  isLogged: false,
  authToken: "",
  isLoading: false,
  setIsLoading: null,
  consumerInfo: {}
});

export const ConsumerProvider = ({
  children
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [isLogged, setIsLogged] = useState(false);
  const [consumerInfo, setConsumerInfo] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedConsumer = localStorage.getItem("savedConsumer");

    if (savedConsumer) {
      const parsedData = JSON.parse(savedConsumer);

      setConsumerInfo(parsedData);
    }
  }, []);

  useEffect(() => {
    if (consumerInfo?.id) {
      setIsLogged(true);
    } else {
      setIsLogged(false);
    }
  }, [consumerInfo]);

  return (
    <ConsumerContext.Provider
      value={{ consumerInfo, isLogged, isLoading, setIsLogged, setIsLoading }}
    >
      {children}
    </ConsumerContext.Provider>
  );
};

export const useConsumer = () => useContext(ConsumerContext);
