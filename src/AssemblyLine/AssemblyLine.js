import { Fragment, useReducer } from 'react';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';

import AssemblyLineInput from './AssemblyLineInput';
import Task from './Task';
import { initializeState, reducer } from './reducer';

function AssemblyLine({ stages }) {
  const [state, dispatch] = useReducer(reducer, stages, initializeState);
  const { stagesLanes } = state;

  const handleInputEnter = itemName => {
    dispatch({ type: 'add-task', payload: itemName });
  };

  return (
    <Grid sx={{ flexGrow: 1 }} container spacing={2}>
      <Grid item xs={12}>
        <Grid container direction='column' spacing={0} width='50%' m='0 auto'>
          <h1>Assembly line</h1>
          <AssemblyLineInput handleSave={handleInputEnter} />
        </Grid>
        <Grid container justifyContent='space-evenly' spacing={0} width='50%' m='0 auto'>
          {stagesLanes.map(({ name: stageName, tasks }) => (
            <Grid key={stageName} item>
              {stageName}

              <Stack spacing={2}>
                {tasks.map(({ id, name }) => (
                  <Fragment key={id}>
                    <Task>{name}</Task>
                  </Fragment>
                ))}
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
}

export default AssemblyLine;
