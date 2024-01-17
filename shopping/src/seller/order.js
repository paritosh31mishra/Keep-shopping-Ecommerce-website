import {useState, useEffect} from "react";
 
const Myorder = () =>{
   
    let [orderlist, updateOrder] = useState([]);
    const getOrder = () =>{
        fetch("http://localhost:1234/orderlist")
        .then(response => response.json())
        .then(data => {
            updateOrder(data.reverse());
            // recent order will come at top
        })
    }

    useEffect(()=>{
        getOrder();
    }, [1])

  return(
    <div className="container mt-5">
        <div className="row">
            <div className="col-lg-12 text-center mb-4">
                <h1 className="text-info" id="orderlist">
                      
                 </h1>
            </div>
        </div>

        {
         
             orderlist.map((order,index) =>{
                let flag = 0;
                order.itemlist.map((it, index) =>{
                     if(localStorage.getItem("sellerid") == it.sellerid)
                        flag = 1;
                    
                })
                
               
                if(flag == 1)
                {
                return(
                   
                    <div className="row mb-5 p-4 shadow-lg" key={index}>
                        <div className="col-lg-3 text-primary">  Customer Name: <b>{order.customername}</b> </div> 
                        <div className="col-lg-3 text-danger">Mobile no. : {order.mobile} 
                         </div> 
                        <div className="col-lg-3 text-success">E-mail: {order.email} </div> 
                         <div className="col-lg-3 text-secondary">Deliver To : {order.address} </div>    
                        
                        <div className="col-lg-12 mt-4"> 
                           <table className="table table-bordered table-hover">
                               <thead>
                                <tr>
                                 <th>Product</th>
                                 <th>Quantity</th>
                                 <th>Price</th>
                                 <th>Total</th>
                                 <th>Photo</th>
                                 </tr>
                               </thead>
     
                               <tbody>
                                {
                                    order.itemlist.map((item, index1) =>{
                                        if(localStorage.getItem("sellerid") == item.sellerid)
                                    {
                                        return(
                                            <tr key={index1}>
                                            <td> {item.name} </td>
                                            <td> {item.qty} </td>
                                            <td> {item.price} </td>
                                            <td> {item.qty * item.price} </td>
                                            <td> 
                                              <img src={item.photo}  height="30" width="50"/>     
                                            </td>
                                            </tr>
                                        )
                                        } 
                                    })
                                }
                               </tbody>
                           </table>
                        </div>
                     </div>

                    
                )
            }
             })
        }
    </div>
  )
}

export default Myorder;