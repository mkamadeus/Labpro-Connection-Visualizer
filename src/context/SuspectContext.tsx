import React from 'react';
import { CitizenData } from '../api/citizen';

// SuspectContext Definition
type SuspectContextProps = {
  data: Set<CitizenData>;
  addCitizenData: (c: CitizenData) => void;
};

const SuspectContext = React.createContext<Partial<SuspectContextProps>>({});

export default SuspectContext;
