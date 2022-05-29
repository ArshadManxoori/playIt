import './App.css';
import Signup from './Components/Signup';
import Login from './Components/Login';
import Feed from './Components/Feed';
import { BrowserRouter , Switch, Route} from 'react-router-dom';
import { AuthProvider } from './Context/AuthContext';
import PrivateRoute from './Components/PrivateRoute'
import Profile from './Components/Profile';  

function App() {
  return (
    <>
    <BrowserRouter>
      <AuthProvider>
        {/* switch se ek baar me ek hi rout chlega */}
        <Switch>
        {/* ye dono niche ke component as a children pass ho rhe hai */}
          <Route path="/login" component={Login}/>
          <Route path="/signup" component={Signup}/>
          <PrivateRoute path="/profile/:id" component={Profile}/> {/* /profile/:id -> /Profile ke baad kuch bhi aye to ye Profile waala component chlega*/}
          <PrivateRoute path="/" component={Feed}/>  {/* feed pe hum to direct refresh krke bhi jaa skte hai, isiliye hum private rout ka use krenge */}
        </Switch>
        
      </AuthProvider>
    </BrowserRouter>
    </>
  );
}

export default App;

//when we do npm run start it will show black screen then we have to write 'http://localhost:3000/login'