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

function reducer(state, action) {
  switch (action.type) {
    case 'add-task':
      return addTaskToFirstStageLane(state, action.payload);
    default:
      throw new Error();
  }
}

export { initializeState, reducer };
