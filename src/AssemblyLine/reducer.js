import { v4 as uuidv4 } from 'uuid';

function initializeState(stages) {
  const stagesLanes = stages.map(stage => ({
    name: stage,
    tasks: [],
  }));

  return { stagesLanes };
}

const addTaskToFirstStageLane = (state, taskName) => {
  const [firstStageLane, ...restStagesLanes] = [...state.stagesLanes];
  firstStageLane.tasks = [{ id: uuidv4(), name: taskName }, ...firstStageLane.tasks];

  return { stagesLanes: [firstStageLane, ...restStagesLanes] };
};

const isAllowedToMoveTaskForward = (stagesLanes, taskId) => {
  const foundStageLaneIndex = stagesLanes.findIndex(element =>
    element.tasks.find(task => task.id === taskId),
  );

  return [foundStageLaneIndex < stagesLanes.length - 1, foundStageLaneIndex];
};

const removeTask = (localStagesLanes, index, taskId) => {
  localStagesLanes[index] = {
    ...localStagesLanes[index],
    tasks: localStagesLanes[index].tasks.filter(task => task.id !== taskId),
  };
  return localStagesLanes;
};

const moveTaskForward = (state, { taskId, taskName }) => {
  const [isAllowed, foundIndex] = isAllowedToMoveTaskForward(state.stagesLanes, taskId);

  const localStagesLanes = [...state.stagesLanes];

  // removes the task from it's current stage lane
  removeTask(localStagesLanes, foundIndex, taskId);

  if (isAllowed) {
    // moves the task to it's next stage lane
    const nextIndex = foundIndex + 1;
    localStagesLanes[nextIndex] = {
      ...localStagesLanes[nextIndex],
      tasks: [{ id: taskId, name: taskName }, ...localStagesLanes[nextIndex].tasks],
    };
  }

  return { stagesLanes: localStagesLanes };
};

const isAllowedToMoveTaskBackward = (stagesLanes, taskId) => {
  const foundStageLaneIndex = stagesLanes.findIndex(element =>
    element.tasks.find(task => task.id === taskId),
  );

  return [foundStageLaneIndex > 0, foundStageLaneIndex];
};

const moveTaskBackward = (state, { taskId, taskName }) => {
  const [isAllowed, foundIndex] = isAllowedToMoveTaskBackward(state.stagesLanes, taskId);

  const localStagesLanes = [...state.stagesLanes];

  // removes the task from it's current stage lane
  removeTask(localStagesLanes, foundIndex, taskId);

  if (isAllowed) {
    // moves the task to it's previous stage lane
    const previousIndex = foundIndex - 1;
    localStagesLanes[previousIndex] = {
      ...localStagesLanes[previousIndex],
      tasks: [...localStagesLanes[previousIndex].tasks, { id: taskId, name: taskName }],
    };
  }

  return { stagesLanes: localStagesLanes };
};

function reducer(state, action) {
  switch (action.type) {
    case 'add-task':
      return addTaskToFirstStageLane(state, action.payload);
    case 'move-task-forward':
      return moveTaskForward(state, action.payload);
    case 'move-task-backward':
      return moveTaskBackward(state, action.payload);
    default:
      throw new Error();
  }
}

export { initializeState, reducer };
