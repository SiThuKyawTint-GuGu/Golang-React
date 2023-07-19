
import "react-toastify/dist/ReactToastify.css";
// import { ToastContainer, toast } from "react-toastify";
// import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { useState } from "react";
// import axios from 'axios';
// import { toBeChecked } from '@testing-library/jest-dom/dist/matchers';


const Home = () => {
    const [toggle, setToggle] = useState(false);
    const [name, setName] = useState(null);
    const [pawrent, setPawrent] = useState(null);
    const [phone, setPhone] = useState(null);
    const [city, setCity] = useState(null);
    const [status, setStatus] = useState(null);
    const [breed, setBreed] = useState(null);
    const [address, setAddress] = useState(null);
    const [township, setTownship] = useState(null);
    const [data, setData] = useState([]);
    const [show, setShow] = useState(false);
    const [open, setOpen] = useState(false);
    const [Id, setId] = useState(null);


    const handletoggle = () => {
        setToggle(!toggle)
    }

    const handlesave = () => {
        let randomid = parseFloat((Math.random() * 100).toFixed(0));
        let obj = {
            id: randomid,
            name: name,
            pawrent: pawrent,
            phone: phone,
            city: city,
            status: status,
            breed: breed,
            address: address,
            township : township,
        }
        setData([...data, obj]);
        console.log(obj);
    }

    const handledelete = (id) => {
       setData(data.filter(i => i.id !== id))
    }

    const handleedit = (id) => {
        const item = data.find(i => i.id === id)
        setName(item.name)
        setPawrent(item.pawrent)
        setPhone(item.phone)
        setCity(item.city)
        setStatus(item.status)
        setBreed(item.breed)
        setAddress(item.address)
        setTownship(item.township);
        setId(item.id);
        setOpen(!open)
    }

    const handleupdate = (id) => {
        const UpdateData = data.map(i => {
            if (i.id === id) {
                return {
                    id: id,
                    name: name,
                    pawrent: pawrent,
                    phone: phone,
                    city: city,
                    status: status,
                    breed: breed,
                    address: address,
                    township: township,
                }
            }
            return i
        })
        setData(UpdateData)
        setOpen(!open)
    }

    return (
        <>
            <div className="container-fluid bg">
                <div className="row p-2">
                    <div className="col-1">
                        <img src="image/logo(2).png" alt="" />
                    </div>
                    <div className="col-11">
                        <div className='float-end'>
                            <div className='d-flex me-4'>
                                <div>
                                    <img src="image/Notifications.png" className='me-4 pe-3 mt-3' alt="" />
                                </div>
                                <div className='d-flex'>
                                    <div>
                                        <img src="image/user image.png" className='mt-2 me-3' alt="" />
                                    </div>
                                    <div>
                                        <h6 className='other-font-one mt-3'>Lisa</h6>
                                        <h6 className='other-font-two'>Operator</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container-fluid mt-4 pt-3 position-relative">
                <div className="row">
                    <div className="col-12">
                        <h6 className='heading ms-2'>Patient List</h6>
                    </div>
                    <div className="col-12 ">
                        <div className="row ">
                            <div className="col-3 ">
                                <div className='search-box position-relative'>
                                    <input type="text" className='input-search mt-1 ms-2' placeholder='Search table' />
                                    <img src="image/search.png" className='search-btn' alt="" />
                                </div>
                            </div>
                            <div className="col-9">
                                <button onClick={()=>handletoggle()} className='add-btn float-end me-4 ' ><img src="image/add.png" className='me-2 ms-2' alt="" /> Add new patient</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="row">
                            <div className="col-1">
                                <select name="" id="" className='select-form-one ms-2 mt-3'>
                                    <option value="">Status All</option>
                                </select>
                            </div>
                            <div className="col-1">
                                <select name="" id="" className='select-form-one ms-4 mt-3'>
                                    <option value="">Breed All</option>
                                </select>
                            </div>
                            <div className='col-10'>
                                <h6 className='float-end normal-font me-4 mt-3'>Rows per pages: <select name="" className='input-form-two' id="">
                                    <option value="normal">N</option>
                                    <option value="all">All</option>
                                </select></h6>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row mt-3">
                    <div className="col-12">
                        <table className='table'>
                            <thead>
                                <tr>
                                    <th><input type="checkbox" name="" id="" /></th>
                                    <th>ID</th>
                                    <th>Pet Name</th>
                                    <th>Status</th>
                                    <th>Pawrent</th>
                                    <th>Breed</th>
                                    <th>Contact Phone No.</th>
                                    <th>Address</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data.map(item => {
                                        return (
                                            <tr className="position-relative" >
                                                <td><input type="checkbox" name="" id="" /></td>
                                                <td>{ item.id}</td>
                                                <td>{ item.name}</td>
                                                <td>{item.status} </td>
                                                <td>{ item.breed}</td>
                                                <td>{item.phone }</td>
                                                <td>{item.address }</td>
                                                <td>
                                                    <button onClick={()=>handleedit(item.id)} className="btn btn-outline-success btn-sm">Update</button>
                                                    <button onClick={()=>handledelete(item.id)} className="btn btn-outline-danger btn-sm ms-2">Delete</button>
                                                </td>
                                            </tr>
                                        )
                                    })
                              }
                            </tbody>
                        </table>
                    </div>
                </div>

                {
                    toggle  ? <div className="col-5 offset-3 bg-white shadow-lg rounded-2 add-box">
                        <div className="row">
                            <div className="col-12 mt-4 ">
                                <img src="image/output-onlinepngtools.png" className='float-end close-image me-4' alt="" />
                            </div>
                            <div className="col-12 mt-2">
                                <h6 className='text-center mb-0 add-header'>Add new patient</h6>
                                <p className='text-center add-sub mt-1'>Enter new patient information below</p>
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-6 ">
                                <div className='box-position'>
                                    <div>
                                        <label htmlFor="" className='d-block label-name '>Pet Name</label>
                                        <input onChange={(e)=>setName(e.target.value)}  type="text" className='label-form d-block' />
                                    </div>
                                    <div className='mt-3'>
                                        <label htmlFor="" className='d-block label-name '>Pawrent</label>
                                        <input onChange={(e) => setPawrent(e.target.value)} type="text" className='label-form d-block' />
                                    </div>
                                    <div className='mt-3'>
                                        <label htmlFor="" className='d-block label-name '>Contact Phone No.</label>
                                        <input onChange={(e) => setPhone(e.target.value)} type="text" className='label-form d-block' />
                                    </div>
                                    <div className='mt-3'>
                                        <label htmlFor="" className='d-block label-name '>City</label>
                                        <select onChange={(e) => setCity(e.target.value)} name="" id="" className='label-select-form d-block'>
                                            <option value="">please choose city</option>
                                            <option value="yangon">Yangon</option>
                                            <option value="mandalay">Mandalay</option>
                                            <option value="naypyitaw">Nay Pyi Taw</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="col-6 ">
                                <div className='text-center box-position-two'>
                                    <div className=''>
                                        <label htmlFor="" className='d-block label-name '>Status</label>
                                        <select onChange={(e) => setStatus(e.target.value)} name="" id="" className='label-select-form d-block'>
                                            <option value="">please choose status</option>
                                            <option value="food-allergy">Food Allergy</option>
                                            <option value="picky-eater">Picky Eater</option>
                                        </select>
                                    </div>
                                    <div className='mt-3'>
                                        <label htmlFor="" className='d-block label-name '>Breed</label>
                                        <select onChange={(e) => setBreed(e.target.value)} name="" id="" className='label-select-form d-block'>
                                            <option value="">please choose status</option>
                                            <option value="begale">Beagle</option>
                                            <option value="spaniel">Spaniel</option>
                                            <option value="golden-retriver">Golden Retriever</option>
                                        </select>
                                    </div>
                                    <div className='mt-3'>
                                        <label htmlFor="" className='d-block label-name '>Address</label>
                                        <input onChange={(e) => setAddress(e.target.value)} type="text" className='label-form d-block' />
                                    </div>
                                    <div className='mt-3'>
                                        <label htmlFor="" className='d-block label-name '>Township</label>
                                        <select onChange={(e) => setTownship(e.target.value)} name="" id="" className='label-select-form d-block'>
                                            <option value="">please choose township</option>
                                            <option value="hlaing">Hlaing</option>
                                            <option value="sankyaung">San Kyaung</option>
                                            <option value="kamaryut">Ka Mar Yut</option>
                                            <option value="mingalardon">Mingalardon</option>
                                            <option value="htauk-kyant">Htauk-Kyant</option>
                                            <option value="hlegu">Hlegu</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="row justify-content-center my-4">
                            <div className="col-12">
                                <div className='text-center'>
                                    <button onClick={()=>handlesave()} className='save-btn'>Save</button>
                                    <button className='cancel-btn ms-2'>Cancel</button>
                                </div>
                            </div>
                        </div>
                    </div> : '' 
               }

                {
                    open === true ?   <div className="col-5 offset-3 bg-white shadow-lg rounded-2 add-box">
                    <div className="row">
                        <div className="col-12 mt-4 ">
                            <img src="image/output-onlinepngtools.png" className='float-end close-image me-4' alt="" />
                        </div>
                        <div className="col-12 mt-2">
                            <h6 className='text-center mb-0 add-header'>Update patient</h6>
                            <p className='text-center add-sub mt-1'>Enter new patient information below</p>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-6 ">
                            <div className='box-position'>
                                <div>
                                    <label htmlFor="" className='d-block label-name '>Pet Name</label>
                                        <input onChange={(e) => setName(e.target.value)} value={name}    type="text" className='label-form d-block' />
                                </div>
                                <div className='mt-3'>
                                    <label htmlFor="" className='d-block label-name '>Pawrent</label>
                                        <input onChange={(e) => setPawrent(e.target.value)} value={pawrent} type="text" className='label-form d-block' />
                                </div>
                                <div className='mt-3'>
                                    <label htmlFor="" className='d-block label-name '>Contact Phone No.</label>
                                        <input onChange={(e) => setPhone(e.target.value)} value={phone} type="text" className='label-form d-block' />
                                </div>
                                <div className='mt-3'>
                                    <label htmlFor="" className='d-block label-name '>City</label>
                                        <select onChange={(e) => setCity(e.target.value)} value={city} name="" id="" className='label-select-form d-block ' >
                                        <option value="">please choose city</option>
                                        <option value="yangon">Yangon</option>
                                        <option value="mandalay">Mandalay</option>
                                        <option value="naypyitaw">Nay Pyi Taw</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="col-6 ">
                            <div className='text-center box-position-two'>
                                <div className=''>
                                    <label htmlFor="" className='d-block label-name '>Status</label>
                                        <select onChange={(e) => setStatus(e.target.value)} value={status} name="" id="" className='label-select-form d-block'>
                                        <option value="">please choose status</option>
                                        <option value="food-allergy">Food Allergy</option>
                                        <option value="picky-eater">Picky Eater</option>
                                    </select>
                                </div>
                                <div className='mt-3'>
                                    <label htmlFor="" className='d-block label-name '>Breed</label>
                                        <select onChange={(e) => setBreed(e.target.value)} value={breed} name="" id="" className='label-select-form d-block'  >
                                        <option value="">please choose status</option>
                                        <option value="begale">Beagle</option>
                                        <option value="spaniel">Spaniel</option>
                                        <option value="golden-retriver">Golden Retriever</option>
                                    </select>
                                </div>

                                <div className='mt-3'>
                                    <label htmlFor="" className='d-block label-name '>Address</label>
                                        <input onChange={(e) => setAddress(e.target.value)} value={address} type="text" className='label-form d-block' />
                                </div>

                                <div className='mt-3'>
                                    <label htmlFor="" className='d-block label-name '>Township</label>
                                        <select onChange={(e) => setTownship(e.target.value)} value={township} name="" id="" className='label-select-form d-block'>
                                        <option value="">please choose township</option>
                                        <option value="hlaing">Hlaing</option>
                                        <option value="sankyaung">San Kyaung</option>
                                        <option value="kamaryut">Ka Mar Yut</option>
                                        <option value="mingalardon">Mingalardon</option>
                                        <option value="htauk-kyant">Htauk-Kyant</option>
                                        <option value="hlegu">Hlegu</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row justify-content-center my-4">
                        <div className="col-12">
                            <div className='text-center'>
                                <button onClick={()=>handleupdate(Id)} className='update-btn'>Update</button>
                                <button className='cancel-btn ms-2' >Cancel</button>
                            </div>
                        </div>
                    </div>
                </div> : ''
              }
                {/* <ToastContainer position={toast.POSITION.BOTTOM_LEFT} /> */}
            </div >
        </>
    )
}

export default Home