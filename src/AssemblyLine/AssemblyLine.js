import { Fragment, useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function AssemblyLine({ stages }) {
  const [stagesLanes, setStagesLanes] = useState([]);

  // creates the stages lanes
  useEffect(() => {
    stages.forEach((stage) => {
      // setting initial tasks to have the simple structure to render
      setStagesLanes((lanes) => [
        ...lanes,
        { name: stage, tasks: [{ id: 1 }, { id: 2 }, { id: 3 }] },
      ]);
    });
  }, [stages]);

  return (
    <>
      <h1>Assembly line</h1>
      <Grid sx={{ flexGrow: 1 }} container spacing={2}>
        <Grid item xs={12}>
          <Grid container justifyContent="space-evenly" spacing={0}>
            {stagesLanes.map(({ name: stageName, tasks }) => (
              <Grid key={stageName} item>
                {stageName}

                <Stack spacing={2}>
                  {tasks.map(({ id }) => (
                    <Fragment key={id}>
                      <Item>{`Item ${id}`}</Item>
                    </Fragment>
                  ))}
                </Stack>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default AssemblyLine;
