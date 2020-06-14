import React from 'react';
import { CitizenData } from '../api/citizen';

// CitizenContext Definition
type CitizenContextProps = {
  citizen: { [key: string]: CitizenData };
};

const CitizenContext = React.createContext<Partial<CitizenContextProps>>({});

export default CitizenContext;
