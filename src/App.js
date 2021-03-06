import './App.css';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import SchedList from './components/SchedList';
import Semester from './components/Semester';
import StudentList from './components/StudentList';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Login from './components/Login';

function App() {
  return (
    <div className="App">
      <AppBar position="static" color="default">
        <Toolbar>
           <Typography variant="h6" color="inherit">
            Course Registration
           </Typography>
        </Toolbar>
      </AppBar>
      <BrowserRouter>
       <Switch>
        <Route exact path='/' component={Login} />
		<Route exact path='/semester' component={Semester} />
        <Route path='/schedule' component={SchedList} />
		<Route path="/student" component={StudentList} />
       </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;