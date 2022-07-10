import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { Button, Col, Form } from "react-bootstrap";
import * as Yup from "yup";
import { getAllChilds, getAllParents } from '../../../service/category.service';

import Select from 'react-select';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import { getUserByType } from '../../../service/user.service';
import { getProductByProductId } from '../../../service/product.service';
import { getAllBrands } from "../../../service/brand.service";
// yup 
export const ProductForm = (props) => {
    let [parent_cats, setParentCats] = useState([]);
    let [child_cats, setChildCats] = useState([]);
    let [brand, setBrands] = useState([]);
    let [defOpts, setDefOpts] = useState();
    let [seller, setSeller] = useState([]);


    let product_data = {
        title:  '',
        summary: '',
        description: "",
        category: "",
        price: "",
        discount: {
            discount_type: "percentage",
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

    let [data, setData] = useState(product_data);
    let [product, setProduct] = useState();

    const product_schema = Yup.object().shape({
        title: Yup.string()
            .required('Title is Required'),
        summary: Yup.string(),
        price: Yup.number().required("Price is required"),
        status: Yup.string().required('Status is Required'),
    });


    let populateCats = async () => {
        try {
            let result = await getAllParents();
            setParentCats(result);
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


    

    useEffect(() => {
        populateCats();
        populateBrands();
        getAllSellers();
        
    }, []);

    useEffect(() => {
        formik.setValues(data);
    }, [data]);


    const formik = useFormik({
        initialValues: data,

        validationSchema: product_schema,
        onSubmit: async (values) => {
            props.onFormSubmit(formik.values)
        },
        validateOnMount: false
    });

    return (<>

        <form onSubmit={formik.handleSubmit}>
            <div className='row form-group mb-3'>
                <label htmlFor='title' className='col-sm-3'>
                    Title:
                </label>
                <div className='col-sm-9'>
                    <input
                        id='title'
                        type='text'
                        name='title'
                        onChange={formik.handleChange}
                        value={formik.values?.title}
                        className="form-control form-control-sm"
                    />
                    {formik.errors.title && formik.touched.title ? (
                        <span className="text-danger"><em>{formik.errors.title}</em></span>
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
                        onChange={formik.handleChange}
                        value={formik.values?.summary}
                    ></textarea>
                    {formik.errors.summary && formik.touched.summary ? (
                        <span className="text-danger"><em>{formik.errors.summary}</em></span>
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
                        data={formik.values?.description}
                        onReady={editor => {
                            // You can store the "editor" and use when it is needed.
                            // console.log('Editor is ready to use!', editor);
                        }}
                        onChange={(event, editor) => {
                            const desc_data = editor.getData();
                            formik.setValues({
                                ...formik.values,
                                description: desc_data
                            })
                            // console.log({ event, editor, data });
                        }}
                    />

                    {formik.errors.description && formik.touched.description ? (
                        <span className="text-danger"><em>{formik.errors.description}</em></span>
                    ) : null}
                </div>
            </div>

            <Form.Group className="row form-group mb-3" controlId="parent_id">
                <Form.Label className='col-sm-3'>Category: </Form.Label>
                <Col sm={9}>
                    <Form.Select id="category"
                        name="category"
                        onChange={(e) => {
                            getChildCats(e.target.value)

                            formik.setValues({
                                ...formik.values,
                                category: e.target.value
                            })
                        }}
                        value={formik.values && formik.values.category ? formik.values.category[0]._id : null }
                        size="sm">
                        <option>Select any One</option>
                        {
                            parent_cats && parent_cats.map((o, i) => (
                                <option value={o._id} key={i}>
                                    {o.title}
                                </option>
                            ))
                        }
                    </Form.Select>
                    {formik.errors.category && formik.touched.category ? (
                        <span className="text-danger"><em>{formik.errors.category}</em></span>
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
                            formik.setValues({
                                ...formik.values,
                                category: e.target.value
                            })
                        }}
                        value={formik.values && formik.values.category ? formik.values.category[0]._id : null }
                        size="sm">
                        <option>Select any One</option>
                        {
                            child_cats && child_cats.map((o,i) => (
                                <option value={o._id} key={i}>
                                    {o.title}
                                </option>
                            ))
                        }
                    </Form.Select>
                    {formik.errors.category && formik.touched.category ? (
                        <span className="text-danger"><em>{formik.errors.category}</em></span>
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
                        onChange={formik.handleChange}
                        value={formik.values?.price}
                        className="form-control form-control-sm"
                    />
                    {formik.errors.price && formik.touched.price ? (
                        <span className="text-danger"><em>{formik.errors.price}</em></span>
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
                        value={formik.values?.discount?.discount_type}
                        onChange={(e) => {
                            let discount_type = e.target.value;
                            formik.setValues({
                                ...formik.values,
                                discount: {
                                    ...formik.values.discount,
                                    discount_type: discount_type
                                }
                            })
                        }}
                    >
                        <option value="percentage">Percent</option>
                        <option value="amount">Flat</option>
                    </select>
                    {formik.errors.discount && formik.touched.discount.discount_type ? (
                        <span className="text-danger"><em>{formik.errors.discount.discount_type}</em></span>
                    ) : null}
                </div>
                <div className='col-sm-7'>
                    <input
                        id='discount'
                        type='number'
                        name='discount.discount_value'
                        min="1"
                        onChange={formik.handleChange}
                        value={formik.values?.discount?.discount_value}
                        className="form-control form-control-sm"
                    />
                    {formik.errors.discount && formik.touched.discount.discount_value ? (
                        <span className="text-danger"><em>{formik.errors.discount.discount_value}</em></span>
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

                            formik.setValues({
                                ...formik.values,
                                brands: selected_opts.value
                            })
                        }}
                        isMulti={false}
                        options={brand}
                    />


                    {formik.errors.brands && formik.touched.brands ? (
                        <span className="text-danger"><em>{formik.errors.brands}</em></span>
                    ) : null}

                </Col>
            </Form.Group>

            <Form.Group className="row form-group mb-3" controlId="seller">
                <Form.Label className='col-sm-3'>Seller: </Form.Label>
                <Col sm={9}>
                    <Form.Select id="seller"
                        name="seller"
                        onChange={formik.handleChange}
                        value={formik.values?.seller}
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
                    {formik.errors.seller && formik.touched.seller ? (
                        <span className="text-danger"><em>{formik.errors.seller}</em></span>
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
                        onChange={formik.handleChange}
                        value={formik.values?.stock}
                        className="form-control form-control-sm"
                    />
                    {formik.errors.stock && formik.touched.stock ? (
                        <span className="text-danger"><em>{formik.errors.stock}</em></span>
                    ) : null}
                </div>
            </div>

            <Form.Group className="row form-group mb-3" controlId="status">
                <Form.Label className='col-sm-3'>Status: </Form.Label>
                <Col sm={9}>
                    <Form.Select id="status"
                        name="status"
                        onChange={formik.handleChange}
                        value={formik.values?.status}
                        size="sm">
                        <option>Select any One</option>
                        <option value="active">Active</option>
                        <option value="inactive">InActive</option>
                    </Form.Select>
                    {formik.errors.status && formik.touched.status ? (
                        <span className="text-danger"><em>{formik.errors.status}</em></span>
                    ) : null}

                </Col>
            </Form.Group>

            <Form.Group className="row form-group mb-3" controlId="image">
                <Form.Label className='col-sm-3'>Image: </Form.Label>
                <Col sm={9}>
                    <Form.Control type="file" size="sm" name="image[]" multiple required={formik.values?.images ? false : true} onChange={(event) => {
                        formik.values.image = Object.keys(event.currentTarget.files).map((o) => event.currentTarget.files[o]);
                        // validate
                    }} />
                    {formik.errors.image && formik.touched.image ? (
                        <div>{formik.errors.image}</div>
                    ) : null}
                </Col>
            </Form.Group>
            
            <div className='form-group row mb-3'>
            {
                product?.images  && product.images.map((o,i) => (
                    <div key={i} className="col-sm-2">
                        <img src={process.env.REACT_APP_IMAGE_URL+"/product/"+o} className="img img-fluid"/>
                        <button className='btn text-danger' onClick={(e) => {
                            e.preventDefault()
                            let images = product.images;
                            images.splice(i, 1)
                            formik.setValues({
                                ...formik.values,
                                images: images
                            })
                        }}>Remove</button>
                    </div>
                ))
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

    </>)
}