import React,{useState,useContext,useEffect,useRef} from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useCookies } from "react-cookie";

import createAdminContext from "../../../../Context/Admin/createAdminContext";

import Loading from "../../../Utils/Loading";

function AddProducts() {

  const submitRef = useRef();

  const navigate = useNavigate();
  const [cookie] = useCookies(["adminToken"]);

  const {loadingState, addProduct,getAllCategories,categoriesState} = useContext(createAdminContext);

  useEffect(()=>{
    if(!cookie.adminToken){
      navigate("/")
    }
    if(cookie.adminToken){
      getAllCategories();
    }
    // eslint-disable-next-line
  },[]);

  //  //! OnChange Data Handler...
  const [addProductState,setAddProductState] = useState({name:"",category:"",short_description:"",long_description:"",unit:"",price:"",discountedPrice:"",stock:""});
  const dataChangeHandler = (e)=>{
    setAddProductState({...addProductState,[e.target.name]:e.target.value});
  }
  //  //! OnChange Files Handler...
  const [addProductImagesState,setAddProductImagesState] = useState([]);
  const imageDataChangeHandler = (e)=>{
    setAddProductImagesState(e.target.files);
  }

  //  //! Submit form by Ref...
  const submitFormByRef = ()=>{
    submitRef.current.click()
  }

  //  //! Validate Data...
  const checkFieldsData = (e)=>{
    if(e.name.length < 2){
      toast.info("Name must be 2 char long")
      return false
    }
    if(e.category.length < 2){
      toast.info("Category must be 2 char long")
      return false
    }
    if(e.short_description.length < 10){
      toast.info("Description must be 10 char long")
      return false
    }
    if(e.unit.length < 1){
      toast.info("Unit is required")
      return false
    }
    if(e.price.length < 1){
      toast.info("Product Price is required")
      return false
    }
    if(e.stock.length < 1){
      toast.info("Product Stock is required")
      return false
    }
    return true;
  }

  //  //! Upload Button...
  const addProductFunc = async(e)=>{
    e.preventDefault();

    const conf = await checkFieldsData(addProductState)
    
    if(conf){
      if(addProductImagesState.length < 1){
        toast.info("Product Image is required")
        return;
      }
      // Create a new FormData object
      const formData = new FormData();
      // Append the product data to the formData object
      formData.append("name", addProductState.name);
      formData.append("category", addProductState.category);
      formData.append("short_description", addProductState.short_description);
      formData.append("long_description", addProductState.long_description);
      formData.append("unit", addProductState.unit);
      formData.append("price", addProductState.price);
      formData.append("discountedPrice", addProductState.discountedPrice);
      formData.append("stock", addProductState.stock);
      // Append the images to the formData object
      for (let i = 0; i < addProductImagesState.length; i++) {
        formData.append("images", addProductImagesState[i]);
      }
      
      await addProduct(formData);
      e.target.reset()
    }
  }


  const [changeSelectCategoriesState,setChangeSelectCategoriesState] = useState("");
  const selectCategories = (e)=>{
    setChangeSelectCategoriesState(e.target.value);
  }

  return (
    <>
      <div className="">
        <div className="shadow-md w-full bg-white p-5">
          <div className="flex flex-wrap justify-between">
            <h1 className="text-2xl text-gray-600 font-bold">Add Product</h1>
            <div className="">
              <button onClick={submitFormByRef} className='px-3 py-2 rounded-sm bg-blue-700 hover:bg-blue-600 text-white flex justify-center items-center'>
                {loadingState?<Loading/>:"Add"}
              </button>
            </div>
          </div>
        </div>
        <div className="p-5 overflow-y-scroll">
          <div className="flex justify-center items-center">
            <form encType="multipart/form-data" onSubmit={addProductFunc}>
              <div className="flex flex-col my-3">
                <label htmlFor="name" className="mb-2">Product Name</label>
                <input type="text" name="name" id="name" onChange={dataChangeHandler} className="outline-none border focus:ring-1 focus:ring-red-400 px-3 py-2 rounded-sm md:w-[25rem]"/>
              </div>
              <div className="flex flex-col my-3">
                <label htmlFor="category" className="mb-2">Category</label>
                <select onChange={selectCategories} name="selectFields" style={{ width: 120 }}>
                  {categoriesState!==undefined ? categoriesState.map((e,i)=>{
                    return <option value={e} key={i}>{e}</option>
                  }):""}
                </select>
                <input type="text" name="category" id="category" onChange={dataChangeHandler} defaultValue={changeSelectCategoriesState} className="mt-2 outline-none border focus:ring-1 focus:ring-red-400 px-3 py-2 rounded-sm md:w-[25rem]"/>
              </div>
              <div className="flex flex-col my-3">
                <label htmlFor="short_description" className="mb-2">Short Description</label>
                <textarea name="short_description" id="short_description" onChange={dataChangeHandler} className="outline-none border focus:ring-1 focus:ring-red-400 px-3 py-2 rounded-sm md:w-[25rem] min-h-[10vh] max-h-[20vh]"/>
              </div>
              <div className="flex flex-col my-3">
                <label htmlFor="unit" className="mb-2">Unit</label>
                <input type="text" name="unit" id="unit" onChange={dataChangeHandler} className="outline-none border focus:ring-1 focus:ring-red-400 px-3 py-2 rounded-sm md:w-[25rem]"/>
              </div>
              <div className="flex flex-col my-3">
                <label htmlFor="price" className="mb-1">MRP</label>
                <p className="text-sm mb-1 text-center md:text-left text-gray-700 font-extralight">Price + GST included</p>
                <input type="number" name="price" id="price" onChange={dataChangeHandler} className="outline-none border focus:ring-1 focus:ring-red-400 px-3 py-2 rounded-sm md:w-[25rem]"/>
              </div>
              <div className="flex flex-col my-3">
                <label htmlFor="discountedPrice" className="mb-2">Discounted %</label>
                <input type="number" name="discountedPrice" id="discountedPrice" onChange={dataChangeHandler} className="outline-none border focus:ring-1 focus:ring-red-400 px-3 py-2 rounded-sm md:w-[25rem]"/>
              </div>
              <div className="flex flex-col my-3">
                <label htmlFor="stock" className="mb-2">Stock</label>
                <input type="number" name="stock" id="stock" onChange={dataChangeHandler} className="outline-none border focus:ring-1 focus:ring-red-400 px-3 py-2 rounded-sm md:w-[25rem]"/>
              </div>
              <div className="flex flex-col my-3">
                <label htmlFor="images" className="mb-2">Images</label>
                <div className="my-2 ">
                  <input type="file" name="images" id="images" onChange={imageDataChangeHandler} accept="image/png,image/jpeg,image/jpg" multiple min={3} className="outline-none border focus:ring-1 focus:ring-red-400 px-3 py-2 rounded-sm md:w-[25rem]"/>
                  <p className="text-sm my-2 text-center md:text-left text-gray-700 font-extralight">You can select multiple files</p>
                </div>
              </div>
              <button ref={submitRef} type="submit" className="hidden">Add</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddProducts;


