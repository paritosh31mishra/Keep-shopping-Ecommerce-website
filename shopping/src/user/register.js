import {useState} from 'react';
import swal from "sweetalert";
const Myregister = () =>{

    let [sname, pickname] = useState("");
    let [smobile, pickmobile] = useState("");
    let [semail, pickemail] = useState("");
    let [spassword, pickpassword] = useState("");
    let [spincode, pickpincode] = useState("");
    let [saddress, pickaddress] = useState("");

    const save = () =>{
       let url = "http://localhost:1234/account";
       let sellerdata = 
       {
          sname: sname,
          smobile : smobile,
          semail : semail,
          spassword : spassword,
          spincode: spincode,
          saddress : saddress
       } 

       let postdata = 
       {
        headers : {'Content-type' : 'application/json'},
        method: "POST",
        body : JSON.stringify(sellerdata)
       }

       fetch(url, postdata)
       .then(responsedata => responsedata.json())
       .then(data => {
        swal("Account Created Successfully !!", "", "success");
        window.location.href = "http://localhost:3000/#/login";
       })
    }

    return(
                       <div className="container mt-4">
                        <div className="row">
                             <div className="col-lg-3"></div>
                            <div className="col-lg-6">
                                    <div className="p-4 shadow-lg rounded">
                                     <h2 className="text-center">Create New Account</h2>
                                    
                                    <div className='mb-3'>
                                       <label><b>Seller's Name</b> </label>
                                       <input type="text" placeholder="Enter your name" className="form-control"  onChange={obj=> pickname(obj.target.value)} value={sname}/>
                                       </div>

                                       <div className='mb-3'>
                                       <label><b>Seller's Mobile</b> </label>
                                       <input type="number" placeholder="Enter your Mobile" className="form-control" value={smobile} onChange={obj=>pickmobile(obj.target.value)}/>
                                       </div>

                                       <div className='mb-3'>
                                       <label><b>Seller's Email</b> </label>
                                       <input type="email" placeholder="Enter your Email" className="form-control" value={semail} onChange={obj=>pickemail(obj.target.value)}/>
                                       </div>

                                       <div className='mb-3'>
                                       <label><b>Seller's Password</b> </label>
                                       <input type="password" placeholder="Enter your Password" className="form-control" value={spassword} onChange={obj=> pickpassword(obj.target.value)}/>
                                       </div>

                                       <div className='mb-3'>
                                       <label><b>Seller's Pincode</b> </label>
                                       <input type="number" placeholder="Enter your Pincode" className="form-control" value={spincode} onChange={obj=> pickpincode(obj.target.value)}/>
                                       </div>

                                       <div className='mb-3'>
                                       <label><b>Seller's Address </b></label>
                                       <textarea className="form-control" value={saddress} onChange={obj=> pickaddress(obj.target.value)}></textarea>
                                       </div>

                                     <div className="text-center mt-3"> <button className="btn btn-danger" onClick={save}> Register</button></div>
                                      </div>
                            </div>
                            <div className="col-lg-3"></div>
                         </div>
                      </div>
    )
}

export default Myregister;