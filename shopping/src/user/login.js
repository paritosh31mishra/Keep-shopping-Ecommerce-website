import swal from "sweetalert";
import {useState} from 'react';

const Mylogin = () =>{
  let[useremail, pickemail] = useState("");
  let[password, pickpassword] = useState("");

  const login = () =>{
     let url = "http://localhost:1234/account?semail="+useremail+"&spassword="+password;
     fetch(url)
     .then(response => response.json())
     .then(userinfo => {
        if(userinfo.length == 0)
        swal("Error", "invalid Or Not Exists", "warning");
    else {
        localStorage.setItem ("sellerid", userinfo[0].id);
        // here we store login details in the chrome local storage so that we can login
        localStorage.setItem("fullname", userinfo[0].sname);
        window.location.href="http://localhost:3000/#/"
      window.location.reload();// Reload the page(app.js) after login is success
    }
     })

  }
  //
  return(
     <div className="container mt-5">
        <div className="row">
            <div className="col-lg-3"></div>
            <div className="col-lg-6">
                <div className="border p-4 rounded shadow">
                    <h3 className="text-center">  Seller Login </h3>
                    <div className="mb-4">
                        <label>Email id</label>
                        <input type="email"  className="form-control" value={useremail} onChange={obj=> pickemail(obj.target.value)}/> 
                    </div>

                    <div className="mb-3">
                        <label>Password</label>
                        <input type="password" className="form-control" value={password} onChange={obj=> pickpassword(obj.target.value)}/>
                    </div>

                    <div className="text-center">
                        <button className="btn btn-danger" onClick={login}>Login</button>
                    </div>
                </div>
            </div>
        </div>
     </div>
  )
}

export default Mylogin;