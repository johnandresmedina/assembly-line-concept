import { useReducer } from 'react';
import Grid from '@mui/material/Grid';

import AssemblyLineInput from './AssemblyLineInput';
import { initializeState, reducer } from './reducer';
import { LEFT_CLICK_TYPE, RIGHT_CLICK_TYPE } from './constans';
import AssemblyLineTasks from './AssemblyLineTasks';

function AssemblyLine({ stages }) {
  const [state, dispatch] = useReducer(reducer, stages, initializeState);
  const { stagesLanes } = state;

  const handleInputEnter = itemName => {
    dispatch({ type: 'add-task', payload: itemName });
  };

  const handleTaskClick = (event, payload) => {
    event.preventDefault();

    const eventType = event.type;
    if (eventType === LEFT_CLICK_TYPE) {
      dispatch({ type: 'move-task-forward', payload });
    } else if (eventType === RIGHT_CLICK_TYPE) {
      dispatch({ type: 'move-task-backward', payload });
    }
  };

  return (
    <>
      <Grid container direction='column' spacing={0} width='50%' m='20px auto'>
        <h1>Assembly line</h1>
        <AssemblyLineInput handleSave={handleInputEnter} />
      </Grid>
      <Grid container justifyContent='space-evenly' spacing={0} width='50%' m='0 auto'>
        {stagesLanes.map(({ name: stageName, tasks }) => (
          <Grid key={stageName} item data-testid={`stage-${stageName}`}>
            <h4>{stageName}</h4>
            <AssemblyLineTasks tasks={tasks} handleTaskClick={handleTaskClick} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default AssemblyLine;
