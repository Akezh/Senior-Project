import React from "react";

export const useInterval = (callback: any, delay: any) => {
  const intervalRef = React.useRef(null);
  const savedCallback = React.useRef(callback);

  React.useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  React.useEffect(() => {
    const tick = () => savedCallback.current();
    if (typeof delay === "number") {
      (intervalRef as any).current = window.setInterval(tick, delay);
      return () => window.clearInterval((intervalRef as any).current);
    }
  }, [delay]);

  return intervalRef;
};
