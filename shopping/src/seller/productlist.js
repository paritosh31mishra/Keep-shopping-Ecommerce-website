import {useState, useEffect} from "react";
import swal from "sweetalert";

const Productlist = () =>{
    let[allproduct, updateProduct] = useState([]);

    const getProduct = () =>{
        let url = "http://localhost:1234/productlist?sellerid="+localStorage.getItem("sellerid");
        fetch(url)
        .then(response=>response.json())
        .then(productarray => {
            updateProduct(productarray);
        })
      
    }

   useEffect(()=>{
    getProduct();
   }, [1]);

   const delitem = (name, id) =>{
   
      let url = "http://localhost:1234/productlist/"+id;
     
      let postdata = {method: "DELETE"}
      fetch(url, postdata)
      .then(response => response.json())
      .then(data => {
       
        swal(name +" Deleted Successfully !!", "", "success");
        getProduct();// reload
      })
   }

   return(
    <div className="container mt-5">
        <div className="row">
            <div className="col-lg-12">
                <h1 className="text-center text-primary mb-4"><i className="fa fa-table"></i> Manage Product :  {allproduct.length} </h1>
                
                <table className="table table-bordered table-hover">
                               <thead>
                                <tr className="text-center">
                                 <th>Product</th>
                                 <th>Quantity</th>
                                 <th>Price</th>
                                 <th>Total</th>
                                 <th>Photo</th>
                                 <th>Delete</th>
                                 </tr>
                               </thead>
     
                               <tbody>
                                {
                                   allproduct.map((item, index1) =>{
                                        return(
                                            <tr key={index1} className="text-center">
                                            <td> {item.name} </td>
                                            <td> {item.totalqty} </td>
                                            <td> {item.price } </td>
                                            <td> {parseInt(item.price) * parseInt(item.totalqty)} </td>
                                            <td> 
                                              <img src={item.photo}  height="30" width="50"/>     
                                            </td>
                                            <td >
                                                <i className="fa fa-trash text-danger fa-lg" onClick={delitem.bind(this, item.name, item.id)}></i>
                                            </td>
                                            </tr>
                                        )
                                        
                                    })
                                }
                               </tbody>
                           </table>
            </div>
        </div>
    </div>
   )
}

export default Productlist;