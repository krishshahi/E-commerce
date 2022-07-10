import { AdminBreadCrumb } from "../breadcrumb";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { uploader } from "../../../service/axios.service";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Form, Col, Button } from "react-bootstrap";
import Select from 'react-select';


import { getAllParents, getAllChilds } from "../../../service/category.service";
import { getUserByType } from '../../../service/user.service';
import { getProductByProductId } from '../../../service/product.service';
import { getAllBrands } from "../../../service/brand.service";

let product_data = {
    title:  '',
    summary: '',
    description: "",
    category: "",
    price: "",
    discount: {
        discount_type: "",
        discount_value: ""
    },
    stock: '',
    image: [],
    is_featured: false,
    age_restricted: false,
    seller: '',
    status: '',
    brands: []
};

export const ProductEdit = () => {
    let params = useParams();
    let navigate = useNavigate();

    let [data, setData] = useState();
    let [errors, setErrors] = useState(product_data);

    let [parent_cats, setParentCats] = useState();
    let [child_cats, setChildCats] = useState();
    let [brand, setBrands] = useState();
    let [seller, setSeller] =useState()

    let [defOpts ,setDefOpts] = useState()
    let [def_cat, setDefCat] = useState();
    let [image, setImage] = useState([]);

    let populateCats = async () => {
        try {
            let result = await getAllParents();
            let opts = result.map((o, i) => (
                {
                    label: o.title,
                    value: o._id
                }
            ))
            setParentCats(opts);
        } catch (error) {
            //
            console.log("Error: ", error);
        }
    }

    let getChildCats = async (parent_id) => {
        try {
            let child_cats = await getAllChilds(parent_id);
            if(child_cats){
                setChildCats(child_cats)
            }
        } catch(error) {
            //
        }
    }

    let populateBrands = async () => {
        try {
            let result = await getAllBrands();
            let brands = result.result.map((o, i) => {
                return { value: o._id, label: o.title }
            }
            );
            setBrands(brands)
            // setBrands(result.result);
        } catch (error) {
            //
            console.log("Error: ", error);
        }
    }

    let getAllSellers = async () => {
        try{
            let all_users = await getUserByType('seller');
            
            if(all_users.result) {
                setSeller(all_users.result);
            }
        } catch(error) {
            console.log("error: ", error);
        }
    }

    const getProductById = async () => {
        try{
            let result = await getProductByProductId(params.id);

            let selOpts = {
                label: result.result.brands.title,
                value: result.result.brands._id
            }
            setDefCat({
                label: result.result.category[0].title, 
                value: result.result.category[0]._id
            })
            setImage(result.result.images);
            setDefOpts(selOpts);

            setData(result.result);
        } catch(error) {
            console.log("Error: ", error);
        }
    }

    useEffect(() => {
        document.title = "Product Update From";
        populateCats();
        populateBrands();
        getAllSellers();
    }, []);

    useEffect(() => {
        getProductById();
    },[params.id])

    const handleSubmit = async (e) => { 
        e.preventDefault();
        try {
            let result = await getProductByProductId(params.id);
            let product = result.result;

            let image = [];
        
            if(data.image) {    
                Object.keys(data.image).map((file_index, i) => {
                    image.push(data.image[file_index])
                })
                delete data.image;
            }

            console.log(product);
            product = {
                ...product, 
                ...data
            }
            if(typeof (product.brands) === 'object') {
                product.brands= product.brands._id;
            }

            if(typeof (product.discount) === 'object') {
                product.discount_type= product.discount.discount_type;
                product.discount_value= product.discount.discount_value;
            }

            if(typeof (product.category) === 'object') {
                product.category= product.category[0]._id;
            }
            delete product.discount;

            //console.log(product);
            let response = await uploader("/product/" + product._id, "put", product, 'image', image, true);
            if (response.status) {
                toast.success(response.msg);
                navigate("/admin/product")
            }
        } catch (e) {
            // TODO: Error 
            console.error("Exception: ", e);
            toast.error(e);
        }
    };

    const handleChange = (e) => { 

        let {name, value} = e.target;
        setData({
            ...data, 
            [name]: value
        })
    }

    return (
        <>
            <AdminBreadCrumb
                page_title="Product Update"
            />
            <form onSubmit={handleSubmit}>
                <div className='row form-group mb-3'>
                    <label htmlFor='title' className='col-sm-3'>
                        Title:
                    </label>
                    <div className='col-sm-9'>
                        <input
                            id='title'
                            type='text'
                            name='title'
                            onChange={handleChange}
                            value={data?.title}
                            className="form-control form-control-sm"
                        />
                        {errors?.title ? (
                            <span className="text-danger"><em>{errors?.title}</em></span>
                        ) : null}
                    </div>
                </div>

                <div className='row form-group mb-3'>
                    <label htmlFor='summary' className='col-sm-3'>
                        Summary:
                    </label>
                    <div className='col-sm-9'>
                        <textarea className='form-control form-control-sm'
                            name='summary'
                            rows={4}
                            style={{ "resize": "none" }}
                            onChange={handleChange}
                            value={data?.summary}
                        ></textarea>
                        {errors?.summary ? (
                            <span className="text-danger"><em>{errors?.summary}</em></span>
                        ) : null}
                    </div>
                </div>

                <div className='row form-group mb-3'>
                    <label htmlFor='description' className='col-sm-3'>
                        Description:
                    </label>
                    <div className='col-sm-9'>
                        <CKEditor
                            editor={ClassicEditor}
                            data={data?.description}
                            onReady={editor => {
                                // You can store the "editor" and use when it is needed.
                                // console.log('Editor is ready to use!', editor);
                            }}
                            onChange={(event, editor) => {
                                const desc_data = editor.getData();
                                setData({
                                    ...data,
                                    description: desc_data
                                })
                                // console.log({ event, editor, data });
                            }}
                        />

                        {errors?.description ? (
                            <span className="text-danger"><em>{errors?.description}</em></span>
                        ) : null}
                    </div>
                </div>

                <Form.Group className="row form-group mb-3" controlId="parent_id">
                    <Form.Label className='col-sm-3'>Category: </Form.Label>
                    <Col sm={9}>
                        <Select id="category"
                            className="form-control-sm"
                            name="category"
                            onChange={(e) => {
                                // console.log("Sele: ", e)
                                getChildCats(e.value)
                                setData({
                                    ...data,
                                    category: e.value
                                })
                            }}
                            options={parent_cats}
                            defaultValue={def_cat}
                            >
                        </Select>
                        {errors?.category ? (
                            <span className="text-danger"><em>{errors?.category}</em></span>
                        ) : null}

                    </Col>
                </Form.Group>

                <Form.Group className="row form-group mb-3" controlId="parent_id">
                    <Form.Label className='col-sm-3'>Sub Category: </Form.Label>
                    <Col sm={9}>
                        <Form.Select id="sub_category"
                            name="sub_category"
                            onChange={(e) => {
                                getChildCats(e.target.value)
                                setData({
                                    ...data,
                                    category: e.target.value
                                })
                            }}
                            value={data && data.category ? data.category[0]._id : null}
                            size="sm">
                            <option>Select any One</option>
                            {
                                child_cats && child_cats.map((o, i) => (
                                    <option value={o._id} key={i}>
                                        {o.title}
                                    </option>
                                ))
                            }
                        </Form.Select>
                        {errors?.category ? (
                            <span className="text-danger"><em>{errors?.category}</em></span>
                        ) : null}

                    </Col>
                </Form.Group>


                <div className='row form-group mb-3'>
                    <label htmlFor='price' className='col-sm-3'>
                        Price:
                    </label>
                    <div className='col-sm-9'>
                        <input
                            id='price'
                            type='number'
                            name='price'
                            min="1"
                            onChange={handleChange}
                            value={data?.price}
                            className="form-control form-control-sm"
                        />
                        {errors?.price ? (
                            <span className="text-danger"><em>{errors?.price}</em></span>
                        ) : null}
                    </div>
                </div>

                <div className='row form-group mb-3'>
                    <label htmlFor='discount' className='col-sm-3'>
                        Discount:
                    </label>
                    <div className='col-sm-2'>
                        <select name={'discount.discount_type'}
                            className="form-control form-control-sm"
                            value={data?.discount?.discount_type}
                            onChange={(e) => {
                                let discount_type = e.target.value;
                                setData({
                                    ...data,
                                    discount: {
                                        ...data.discount,
                                        discount_type: discount_type
                                    }
                                })
                            }}
                        >
                            <option value="percentage">Percent</option>
                            <option value="amount">Flat</option>
                        </select>
                        {errors?.discount.discount_type ? (
                            <span className="text-danger"><em>{errors?.discount.discount_type}</em></span>
                        ) : null}
                    </div>
                    <div className='col-sm-7'>
                        <input
                            id='discount'
                            type='number'
                            name='discount.discount_value'
                            min="1"
                            onChange={handleChange}
                            defaultValue={data?.discount?.discount_value}
                            className="form-control form-control-sm"
                        />
                        {errors?.discount.discount_value ? (
                            <span className="text-danger"><em>{errors?.discount.discount_value}</em></span>
                        ) : null}
                    </div>
                </div>

                <Form.Group className="row form-group mb-3" controlId="brand">
                    <Form.Label className='col-sm-3'>Brands: </Form.Label>
                    <Col sm={9}>

                        <Select
                            value={defOpts}
                            onChange={(selected_opts) => {
                                setDefOpts(selected_opts);
                                let brand_id = null;
                                if (selected_opts.length > 0) {
                                    brand_id = selected_opts.map((o) => o.value);
                                }

                                setData({
                                    ...data,
                                    brands: brand_id
                                })
                            }}
                            isMulti={false}
                            options={brand}
                        />


                        {errors?.brands ? (
                            <span className="text-danger"><em>{errors?.brands}</em></span>
                        ) : null}

                    </Col>
                </Form.Group>

                <Form.Group className="row form-group mb-3" controlId="seller">
                    <Form.Label className='col-sm-3'>Seller: </Form.Label>
                    <Col sm={9}>
                        <Form.Select id="seller"
                            name="seller"
                            onChange={handleChange}
                            value={data?.seller}
                            size="sm">
                            <option>Select any One</option>
                            {
                                seller && seller.map((o, i) => (
                                    <option value={o._id} key={i}>
                                        {o.name}
                                    </option>
                                ))
                            }
                        </Form.Select>
                        {errors?.seller ? (
                            <span className="text-danger"><em>{errors?.seller}</em></span>
                        ) : null}

                    </Col>
                </Form.Group>

                <div className='row form-group mb-3'>
                    <label htmlFor='stock' className='col-sm-3'>
                        Stock:
                    </label>
                    <div className='col-sm-9'>
                        <input
                            id='stock'
                            type='number'
                            name='stock'
                            onChange={handleChange}
                            value={data?.stock}
                            className="form-control form-control-sm"
                        />
                        {errors?.stock ? (
                            <span className="text-danger"><em>{errors?.stock}</em></span>
                        ) : null}
                    </div>
                </div>

                <Form.Group className="row form-group mb-3" controlId="status">
                    <Form.Label className='col-sm-3'>Status: </Form.Label>
                    <Col sm={9}>
                        <Form.Select id="status"
                            name="status"
                            onChange={handleChange}
                            value={data?.status}
                            size="sm">
                            <option>Select any One</option>
                            <option value="active">Active</option>
                            <option value="inactive">InActive</option>
                        </Form.Select>
                        {errors?.status ? (
                            <span className="text-danger"><em>{errors?.status}</em></span>
                        ) : null}

                    </Col>
                </Form.Group>

                <Form.Group className="row form-group mb-3" controlId="image">
                    <Form.Label className='col-sm-3'>Image: </Form.Label>
                    <Col sm={9}>
                        <Form.Control type="file" size="sm" name="image[]" multiple required={image ? false : true} onChange={(event) => {
                            data.image = event.currentTarget.files
                            setData({
                                ...data,
                                image: data.image
                            })
                        }} />
                        {errors?.image ? (
                            <div>{errors?.image}</div>
                        ) : null}
                    </Col>
                </Form.Group>

                <div className='form-group row mb-3'>
                    {
                        image && image.map((o, i) => <ImageView o={o} key={i} />)
                    }
                </div>

                <Form.Group className="row form-group mb-3">
                    <Col sm={9} className="offset-sm-3">
                        <Button type="reset" className="btn btn-sm btn-danger" style={{ "marginRight": "20px" }}>
                            <i className='fa fa-trash'></i>&nbsp;
                            Cancel
                        </Button>
                        <Button type="submit" className="btn btn-sm btn-success">
                            <i className='fa fa-paper-plane'></i>&nbsp;
                            Product Update
                        </Button>
                    </Col>
                </Form.Group>
            </form>
        </>
    );
}

const ImageView = ({o}) => {
    return (
        <div className="col-sm-2">
        <img src={process.env.REACT_APP_IMAGE_URL+"/product/"+o} className="img img-fluid"/>
        </div>
    )
}