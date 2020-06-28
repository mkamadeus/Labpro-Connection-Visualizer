import { useContext } from 'react';
import { SelectedNodeContext } from '../context/SelectedNodeContext';
import { SuspectContext } from '../context/SuspectContext';

const useSuspectInfo = () => {
  const { suspectMap, suspectMapDispatcher } = useContext(SuspectContext);
  const { selectedNode } = useContext(SelectedNodeContext);

  const isSelectedSuspected = () => {
    return !!suspectMap![selectedNode!.id];
  };

  const suspectButtonAction = () => {
    if (isSelectedSuspected()) {
      suspectMapDispatcher!({
        type: 'REMOVE_SUSPECT',
        id: selectedNode?.id,
      });
    } else {
      suspectMapDispatcher!({
        type: 'ADD_SUSPECT',
        id: selectedNode?.id,
        suspect: selectedNode,
      });
    }
  };

  return {
    selectedNode,
    isSelectedSuspected,
    suspectButtonAction,
  };
};

export default useSuspectInfo;
