import React, { useState, useEffect } from "react";

interface useUnmountProps {
  component: React.ReactNode;
}

export default function useUnmount({ component }: useUnmountProps) {
  const [test, setTest] = useState<React.ReactNode | null>(null);

  useEffect(() => {
    setTest(component);
    return () => setTest(null);
  }, []);

  return test;
}
