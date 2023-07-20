import { useCallback, useState } from "react";

const useToggle = (
  initialState = false
): [boolean, (newValue?: boolean) => void] => {
  const [state, setState] = useState<boolean>(initialState);

  const toggle = useCallback(
    (newValue: boolean | undefined): void =>
      setState((state) => (newValue !== undefined ? newValue : !state)),
    []
  );
  return [state, toggle];
};

export default useToggle;
