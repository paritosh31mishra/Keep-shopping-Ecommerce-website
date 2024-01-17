import {Link} from "react-router-dom";

const SellerHeader = () =>{
    return(
        <div className="container mt-4">
    <div className="row">
        <div className="col-lg-3">
            <h1 className="text-danger"> <i className="fa fa-shopping-bag"></i>Seller app</h1>
        </div>
        <div className="col-lg-9 text-end">
            <div className="btn-group">
                <Link className="btn btn-danger" to="/"><i className="fa fa-home" ></i> Dashboard </Link>
                <Link className="btn btn-info" to="/productlist"><i className="fa fa-table" ></i> All Items </Link>
                <Link className="btn btn-primary" to="/newproduct"><i className="fa fa-plus" ></i> Add Item </Link>
                <Link className="btn btn-success" to="/order"><i className="fa fa-phone" ></i> Order List </Link>
                <button className="btn btn-warning" onClick={logout}> Welcome - {localStorage.getItem("fullname") } Logout <i className="fa fa-power-off"></i>  </button>
            </div>
        </div>
        </div>
    </div>
    )
}

export default SellerHeader;

const logout = () =>{
    localStorage.clear();
    window.location.href="http://localhost:3000/#/"; // it will go to dashboard
    window.location.reload(); // it will reload the app. js(window) file
    
    //other method - window.location.href="http://localhost:3000/#/";
}