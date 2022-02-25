import Grid from '@mui/material/Grid';

import './App.css';
import AssemblyLine from './AssemblyLine/AssemblyLine';

function App() {
  return (
    <Grid sx={{ flexGrow: 1 }} container spacing={2}>
      <Grid item xs={12}>
        <AssemblyLine stages={['Idea', 'Development', 'Testing', 'Deployment']} />
      </Grid>
    </Grid>
  );
}

export default App;
