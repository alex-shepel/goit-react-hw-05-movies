import { useState, useDebugValue } from 'react';

const useToggle = (init = false) => {
  const [state, setState] = useState(init);
  const toggleState = () => setState(state => !state);
  useDebugValue(state);
  return [state, toggleState];
};

export default useToggle;
