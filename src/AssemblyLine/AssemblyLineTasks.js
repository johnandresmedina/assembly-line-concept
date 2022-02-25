import { Fragment } from 'react';
import Stack from '@mui/material/Stack';

import Task from './Task';

function AssemblyLineTasks({ tasks, handleTaskClick }) {
  return (
    <Stack spacing={2} minWidth='200px'>
      {tasks.map(({ id: taskId, name: taskName }) => (
        <Fragment key={taskId}>
          <Task
            onClick={event => handleTaskClick(event, { taskId, taskName })}
            onContextMenu={event => handleTaskClick(event, { taskId, taskName })}>
            {taskName}
          </Task>
        </Fragment>
      ))}
    </Stack>
  );
}

export default AssemblyLineTasks;
