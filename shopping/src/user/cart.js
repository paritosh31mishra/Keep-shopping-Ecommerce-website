import {useState, useEffect} from "react";
import { json } from "react-router-dom";
import swal from "sweetalert";



const Mycart = () => {
    let [allproduct, updateproduct] = useState([]);
  
    const getProduct = () => {
      fetch("http://localhost:1234/cartlist")
        .then((response) => response.json())
        .then((productarray) => {
          updateproduct(productarray);
        });
    };
  
    useEffect(() => {
      getProduct();
    }, [1]);

    const changeQty = async(product, action) =>{
        let flag = 0;
          if(action == "A")
          {
           
            if(product.qty+1 <= product["totalqty"])
            {
                flag = 1;
                product["qty"] = product.qty+1;
            }
            else
            alert("Availability:   "+ product["totalqty"]);
          }
          if(action == "B")
          {
              flag = 1;
              product["qty"] = product.qty-1;
          }
          
        
            if(product.qty > 0 && flag == 1)
            {
                let url = " http://localhost:1234/cartlist/"+ product.id;
                let postdata = {
                   headers: {"Content-type" : "application/json"},
                    method: "PUT",
                    body: JSON.stringify(product)
                }
    
                await fetch(url, postdata)
                .then(response => response.json)
                .then(productdata =>{
                    swal(product.name, "Quantity updated in Cart !", "success");
                    getProduct(); //reload the list with updated value
                })
                .catch(error =>{
                    swal("Error", "while Updating quantity", "error");
                })
            }
            if(product.qty <= 0){
                delitem(product.id, product.name)
            }
           
    }

    const delitem = async (id, name) =>{
      let url = " http://localhost:1234/cartlist/"+ id;
      let postdata = { method: "DELETE"};
     await fetch(url,postdata)
      .then(response => response.json)
      .then(data => {
        swal(name+ "", "Deleted Successfully !!", "success");
        getProduct(); // reload the list with updated value
      })
    }

     let total = 0;
     let[fullname, pickname] = useState("");
     let[mobile, pickmobile] = useState("");
     let[email, pickemail] = useState("");
     let[address, pickaddress] = useState("");

     // for validation 
     let [nameerror, updateNameerror] = useState("");
     let [mobileerror, updateMobileerror] = useState("");
     let [emailerror, updateEmailerror] = useState("");
     let [addresserror, updateAddresserror] = useState("");

     const save = () =>{
        let formstatus = true;
       
        // name check
             if(fullname ==  "")
             {
                updateNameerror("Invalid Name !");
                formstatus = false;
             }
              else {
                updateNameerror("");
              }

              //mobile no check
              var mpattern = /^[0]?[6789]\d{9}$/
              if( ! mpattern.test(mobile)) // if not matching
             {
                updateMobileerror("Invalid mobile no !");
                formstatus = false;
             }
              else {
                updateMobileerror("");
              }
                 
       // email check
       var epattern = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
       if( ! epattern.test(email) )
       {
          updateEmailerror("Invalid Email id !");
          formstatus = false;
       }
        else {
          updateEmailerror("");
        }


        // address check
       if(address  == "")
       {
          updateAddresserror("Invalid  Delivery Address !");
          formstatus = false;
       }
        else {
          updateAddresserror("");
        }

        // cartlist length check
          if(allproduct.length == 0){
            formstatus = false;
          }

              if(formstatus === true){
                let orderdata = {
                    customername : fullname,
                    mobile: mobile,
                    email: email,
                    address: address,
                    itemlist: allproduct
                }

                let url = " http://localhost:1234/orderlist/";
                let postdata = {
                headers: {'Content-type': 'application/json'},
                    method: "POST",
                    body: JSON.stringify(orderdata)
                }

                fetch(url, postdata)
                .then(response => response.json())
                .then(responsedata => {
                    swal("Order Id:" + responsedata.id, "Received Successfully !!", "success");
                    pickname("");
                    pickmobile("");
                    pickemail("");
                    pickaddress("");
                    updateproduct([]);
                    
                })
        }
        else{
            swal("Input Error", "Please Enter Customer Details", "warning");
        }
     }

    return(
        <div className="container mt-4">
            <div className="row">
                <div className="col-lg-4 pt-5">
                    <div className="card border-0 shadow-lg">
                   <div className="card-header">Enter Customer Details</div> 
                   <div className="card-body">
                    <div className="mb-3">
                        <label>Customer Name</label>
                        <input type="text" className="form-control" onChange={obj=> pickname(obj.target.value)} value={fullname} />
                        <small className="text-danger"> {nameerror} </small>
                        </div>

                        <div className="mb-3">
                        <label>Mobile number</label>
                        <input type="number" className="form-control" value={mobile} onChange={obj=> pickmobile(obj.target.value)}/>
                        <small className="text-danger"> {mobileerror} </small>
                        </div>
                      
                        <div className="mb-3">
                        <label>Email-Id</label>
                        <input type="email" className="form-control" value={email} onChange={obj=> pickemail(obj.target.value)}/>
                        <small className="text-danger"> {emailerror} </small>
                        </div>

                        <div className="mb-3">
                        <label>Delivery Address</label>
                       <textarea className="form-control" value={address} onChange={obj => pickaddress(obj.target.value)}> </textarea>
                       <small className="text-danger"> {addresserror} </small>
                       
                    </div>
                   </div>
                   <div className="card-footer text-center">
                    <button className="btn btn-danger" onClick={save}>Place Order</button>
                   </div>
                   </div>
                </div>
                <div className="col-lg-8">
                    <h3 className="text-center">
                        Items in Cart : {allproduct.length}
                    </h3>

                    <table className="table table-bordered shadow">
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Total</th>
                                <th>Photo</th>
                                <th className="text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                 allproduct.map((product, index)=>{
                                    total = total + product.price * product.qty;
                                   return(
                                    <tr key={index}>
                                        <td>{product.name} </td>
                                        <td>{product.price}</td>
                                        <td className="input-group"> 
                                        <button className="btn btn-info btn-sm" onClick={changeQty.bind(this, product, "A")}> <i className="fa fa-plus"></i></button>
                                        <input type="text" className="form-control" value={product.qty} readOnly size= "1"/>
                                        <button className="btn btn-warning  btn-sm" onClick={changeQty.bind(this, product, "B")}><i className="fa fa-minus" ></i></button>
                                         </td>
                                        <td>{ product.qty * product.price}</td>
                                        <td><img src={product.photo}  height="50" width="50" /></td>

                                        <td className="text-center">
                                            <i className="fa fa-2x fa-trash fa-lg text-danger" onClick={delitem.bind(this, product.id, product.name)}></i>
                                        </td>

                                    </tr>
                                 
                                   )
                                 })
                                }
                                 <tr>
                                 <td colspan="6" className="text-center text-danger fs-3">Total Amount - {total} </td>
                                 </tr>
                           
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
  
}

export default Mycart;