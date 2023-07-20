
import { Routes, Route} from "react-router-dom";
import Login from './components/pages/Auth/Login';
import Home from './components/pages/Home';
import Register from './components/pages/Auth/Register';
import Layout from "./components/layout/Layout";
import NoMatch from "./components/layout/NoMatch";

import {  UserProvider } from "./contexts/UserContext";
import Profile from "./components/pages/User/Profile";
import MyPets from "./components/pages/Pet/MyPets";
import RegisterPet from "./components/pages/Pet/RegisterPet";
import EditPet from "./components/pages/Pet/EditPet";
import PetDetails from "./components/pages/Pet/PetDetails";
import MyAdoptions from "./components/pages/Pet/MyAdoptions";

function App() {
  return (
    <> 
     <UserProvider>
      <Routes>
      
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<NoMatch />} />
          </Route>
          <Route path="user" element={<Layout />}>
            <Route path="profile" element={<Profile />} />
            <Route path="*" element={<NoMatch />} />
          </Route>
          <Route path="pets" element={<Layout />}>
            <Route path="mypets" element={<MyPets />} />
            <Route path="myadoptions" element={<MyAdoptions />} />
            <Route path="register" element={<RegisterPet />} />
            <Route path="edit/:id" element={<EditPet   />} />
            <Route path=":id" element={<PetDetails  />} /> 
            <Route path="*" element={<NoMatch />} />
          </Route>
      
      </Routes>
      </UserProvider>
    </>
  )
}

export default App
