import { Fragment, useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';

import AssemblyLineInput from './AssemblyLineInput';
import Task from './Task';

function AssemblyLine({ stages }) {
  const [stagesLanes, setStagesLanes] = useState([]);

  // creates the stages lanes
  useEffect(() => {
    stages.forEach(stage => {
      // setting initial tasks to have the simple structure to render
      setStagesLanes(lanes => [...lanes, { name: stage, tasks: [{ id: 1 }, { id: 2 }, { id: 3 }] }]);
    });
  }, [stages]);

  const handleInputEnter = itemName => {
    console.log('Pressing Enter', itemName);
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
                {tasks.map(({ id }) => (
                  <Fragment key={id}>
                    <Task>{`Item ${id}`}</Task>
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
