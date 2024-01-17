import { useState, useEffect } from "react";
import swal  from "sweetalert";
import ReactPaginate from "react-paginate";
const Myhome = () => {
  let [allproduct, updateproduct] = useState([]);

  const getProduct = () => {
    fetch("http://localhost:1234/productlist")
      .then((response) => response.json())
      .then((productarray) => {
        updateproduct(productarray.reverse());
      });
  };

  useEffect(() => {
    getProduct();
  }, [1]);

  const addtoCart = async (productinfo) => {
    productinfo["qty"] = 1;
    let url = "http://localhost:1234/cartlist";
    let postdata = {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify(productinfo),
    };
//  await is used before fetch because only server can give message like fail, success etc, javascript should not give any error or message. sometime when server is busy to solve another query javascript itself give error or messages to user. only server can give message javascript should not give any message to user. it restrict javascript to give any response. keep waiting until server not give any response.
// await will make your function await until server not give 
// async make your function eligible to catch response from the server. means it make your function as promise function because nature of promise function to capture the response
    await fetch(url, postdata)
      .then((response) => response.json())
      .then((servers) => {
        swal(productinfo.name + "", "  Added in your cart...", "success");
      })
      .catch(err => {
       swal(productinfo.name + "",  "  Already Added in your cart...", "error");
      });
  };

  let[keyword, updatekeyword] = useState("");
   
  const PER_PAGE = 4;
  const [currentPage, setCurrentPage] = useState(0);
  function handlePageClick({ selected: selectedPage}) {
    setCurrentPage(selectedPage)
  }
   const offset = currentPage * PER_PAGE;
   const pageCount = Math.ceil(allproduct.length / PER_PAGE);


  return (
    <section>
      <div id="banner"> </div>
     
      <div className="container mt-4">
        <div className="row mb-4">
          <div className="col-lg-4"></div>
          <div className="col-lg-4">
           <input type="text" className="form-control" placeholder="Search..." onChange={obj=> updatekeyword(obj.target.value)}/>
          </div>
          <div className="col-lg-4"></div>
        </div>
        <div className="row">
     {
          allproduct.slice(offset, offset + PER_PAGE).map((product, index) => {

          if(product.name.toLowerCase().includes(keyword.toLowerCase()))
          {
            // it cheks what user type in search box include in the product or not
            return (
              <div className="col-lg-3 mb-4" key={index}>
                <div className="p-3 text-center shadow">
                  <h4 className="text-info mb-3"> {product.name} </h4>
                  <img
                    src={product.photo}
                    className="rounded"
                    height="140"
                    width="100%"
                  />
                  <p className="mt-3"> {product.details} </p>
                  <p className="m-3">Rs. {product.price} </p>
                  <p className="text-center">
                    <button
                      className="btn btn-danger"
                      onClick={addtoCart.bind(this, product)}
                    >
                      <i className="fa fa-shopping-cart"></i>Add to cart
                    </button>
                  </p>
                </div>
              </div>
            );
          }
       })
      }
        </div>
      </div>

     <div className="mb-4 mt-4">
        <ReactPaginate
          previousLabel = {"Previous"}
          nextLabel = {"Next"}
          breakLabel = {"..."}
          pageCount = {pageCount}
          marginPagesDisplayed = {2}
          pageRangeDisplayed={3}
          onPageChange = {handlePageClick}
          containerClassName= {" pagination  justify-content-center " }
          pageClassName= {"page-item"}
          pageLinkClassName= {"page-link"}
          previousClassName= {"page-item"}
          previousLinkClassName = {"page-link"}
          nextClassName = {"page-item"}
          nextLinkClassName= {"page-link"}
          breakClassName= {"page-item"}
          breakLinkClassName = {"page-link"}
          activeClassName= {"active primary"}

          />
     </div>

     <footer className="bg-primary p-5 mt-5 text-white text-center">
      <p>  React Shopping Web Application. Backend With Json Server for API </p>
     </footer>
    </section>
  );
};
export default Myhome;
