import {useState} from "react";
import swal from 'sweetalert';
import { json } from "react-router-dom";

const NewProduct = () =>{
    let [name, pickname] = useState("");
    let [price, pickprice] = useState("");
    let [details, pickdetails] = useState("");
    let [photo, pickphoto] = useState("");
    let [totalqty, pickqty] = useState("");

    const saveitem = () =>{
        let temp = localStorage.getItem("sellerid");
       
       let newitem =
        {
            name: name,
            price: price,
            photo: photo,
            details: details,
            sellerid: temp,
            totalqty: totalqty
        }

        let postdata = {
            headers: {'Content-type': 'application/json'},
            method: "POST",
            body: JSON.stringify(newitem)
        }

        let url = "http://localhost:1234/productlist";
        fetch(url, postdata)
        .then(response => response.json())
        .then(data => {
            swal(name+ " Added Successfully !!", "", "success");
            window.location.href = "http://localhost:3000/#/productlist";
        })
    }

    return(
    <div className="container  mt-4 p-4">
        <div className="row">
            <h3 className="text-center mb-4"> New Product </h3>
            <div className="col-lg-3"></div>

            <div className="col-lg-6 shadow p-4 rounded">
                <h3 className=" text-success mb-3 text-center">Product Details</h3>
                <div className="mb-3">
                    <label><b>Name</b></label>
                    <input type="text" className="form-control"  placeholder="Enter Product Name" value={name} onChange={obj=> pickname(obj.target.value)}/>
                </div>
 
               <div className="mb-3">
                     <label><b>Price</b></label>
                     <input type="number"  className="form-control" placeholder="Enter Product price" value={price} onChange={obj=> pickprice(obj.target.value)}/>
                </div>

                <div className="mb-3">
                     <label><b>Quantity</b></label>
                     <input type="number"  className="form-control" placeholder="Enter product Quantity" value={totalqty} onChange={obj=> pickqty(obj.target.value)}/>
                </div>

               <div className="mb-3">
                   <label><b>Photo</b></label>
                   <input type="text" className="form-control"  placeholder="Enter image url" value={photo} onChange={obj=> pickphoto(obj.target.value)}/>
               </div>

                <div className="mb-3">
                   <label><b>Details</b></label>
                   <textarea className="form-control" value={details} onChange={obj=> pickdetails(obj.target.value)}>    </textarea>
                </div>

                <div className="mb-3 text-center">
                   <button className="btn btn-danger " onClick={saveitem}>Save</button>
                </div>
              </div>

              <div className="col-lg-3"></div>
            </div>
        </div>
    )
}

export default NewProduct;