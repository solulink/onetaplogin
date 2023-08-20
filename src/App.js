import { useEffect, useState } from 'react';
import './App.css';
import googleOneTap from "google-one-tap"
import axios from 'axios';


const options = {
  client_id: "160707844309-e7s4djsi8p0troroa47vla30ojs01qlt.apps.googleusercontent.com",
  auto_select: false,
  cancel_on_tap_outside: false,
  context: "signin",
};

function App() {

  const [loginData, setLoginData] = useState(
    localStorage.getItem("loginData")
    ? JSON.parse(localStorage.getItem("loginData"))
    :null
  );
    useEffect(()=>{
      if(!loginData){
        googleOneTap(options, async(response) => {
          console.log(response.credential);
          const res = await axios.post("http://localhost:5000/api/google-login", 
          {
            token: response.credential
          });

          const data = await res.data;
          console.log(res);
          setLoginData(data);
          localStorage.setItem("loginData", JSON.stringify(data));
        })
      }
    },[loginData])

    const handleLogout = () => {
      localStorage.removeItem("loginData");
      setLoginData(null);
    }
  return (
    <div className="App">
      <header className="App-header">
        Implement Google OneTap
      <div>
        {loginData ? (
          <div>
          <h3>
            You "{loginData.name}" logged in as {loginData.email}
          </h3>
          <img src={loginData.picture} alt="user pic"/>
          <button onClick={handleLogout}> Logout</button>
          </div>
        ) : (
          <div>Not logged in</div>
        )}
      </div>
      </header>
    </div>
  );
}

export default App;
