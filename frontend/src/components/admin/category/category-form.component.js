import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { Button, Col, Form } from "react-bootstrap";
import * as Yup from "yup";
import { getAllParents } from '../../../service/category.service';
import {getAllBrands} from "../../../service/brand.service";

import Select from 'react-select';

// yup 
export const CategoryForm = (props) => {
    let [parent_cats, setParentCats] = useState([]);
    let [brand, setBrands] = useState([]);

    let [defOpts, setDefOpts] = useState();

    let category_data = {
        title: '',
        summary: '',
        image: '',
        status: '',
        parent_id: '',
        brands: []
    };
    let [data, setData] = useState(category_data);


    const category_schema = Yup.object().shape({
        title: Yup.string()
          .required('Title is Required'),
        summary: Yup.string(),
        status: Yup.string().required('Status is Required'),
    });

    
    let populateCats = async () => {
        try {
            let result = await getAllParents();
            setParentCats(result);
        } catch(error) {
            //
            console.log("Error: ", error);
        }
    }

    let populateBrands = async () => {
        try {
            let result = await getAllBrands();
            let brands = result.result.map((o, i) => 
                {
                    return { value: o._id, label: o.title }
                }
            );
            setBrands(brands)
            // setBrands(result.result);
        } catch(error) {
            //
            console.log("Error: ", error);
        }
    }




    useEffect(() => {
        populateCats();
        populateBrands();
    }, []);

    useEffect(() => {
        if(!props.category) return;
        
        setData(props.category)

        let selOpts = props.category.brands.map((o) => {
            return {
                value: o._id,
                label: o.title
            }
        })
        setDefOpts(selOpts);
        formik.setValues(props.category);
    }, [props.category])

    const formik = useFormik({
        initialValues: data,
        
        validationSchema: category_schema,

        onSubmit: async (values) => {
            // console.log("Final : ", values);
            props.onFormSubmit(values)
        },  
    });

    console.log(formik.values.image)
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
                        value={formik.values.title}
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
                    style={{"resize": "none"}}
                    onChange={formik.handleChange}
                    value={formik.values.summary}
                    ></textarea>
                    {formik.errors.summary && formik.touched.summary ? (
                        <span className="text-danger"><em>{formik.errors.summary}</em></span>
                    ) : null}
                </div>
            </div>

            

            <Form.Group className="row form-group mb-3" controlId="parent_id">
                <Form.Label className='col-sm-3'>Sub Category of: </Form.Label>
                <Col sm={9}>
                    <Form.Select id="parent_id" 
                        name="parent_id"
                        onChange={formik.handleChange}
                        value={formik.values.parent_id._id}
                        size="sm">
                        <option>Select any One</option>
                        {
                            parent_cats ? 
                            parent_cats.map((o, i) => (
                                <option key={i} value={o._id}>{o.title}</option>
                            )) 
                            : <></>
                        }
                    </Form.Select>
                    {formik.errors.parent_id && formik.touched.parent_id ? (
                        <span className="text-danger"><em>{formik.errors.parent_id}</em></span>
                    ) : null}
                   
                </Col>
            </Form.Group>

            <Form.Group className="row form-group mb-3" controlId="brand">
                <Form.Label className='col-sm-3'>Brands: </Form.Label>
                <Col sm={9}>
                    
                    <Select
                        value={defOpts}
                        onChange={(selected_opts) => {
                            setDefOpts(selected_opts);
                            let brand_id = null;
                            if(selected_opts.length > 0) {
                                brand_id = selected_opts.map((o) => o.value);
                            }
                            
                            formik.setValues({
                                ...formik.values,
                                brands: brand_id
                            })
                        }}
                        isMulti={true}
                        options={brand}
                    />
                    
                    
                    {formik.errors.brands && formik.touched.brands ? (
                        <span className="text-danger"><em>{formik.errors.brands}</em></span>
                    ) : null}
                   
                </Col>
            </Form.Group>

            <Form.Group className="row form-group mb-3" controlId="status">
                <Form.Label className='col-sm-3'>Status: </Form.Label>
                <Col sm={9}>
                    <Form.Select id="status" 
                        name="status"
                        onChange={formik.handleChange}
                        value={formik.values.status}
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
                    <Form.Control type="file" size="sm" name="image[]" multiple required={formik.values.image  ? false : true} onChange={(event) => {
                        formik.values.image = event.currentTarget.files[0]
                        // validate
                    }} />
                    {formik.errors.image && formik.touched.image ? (
                        <div>{formik.errors.image}</div>
                    ) : null}
                </Col>
            </Form.Group>

            <Form.Group className="row form-group mb-3">
                <Col sm={9} className="offset-sm-3">
                    <Button type="reset" className="btn btn-sm btn-danger" style={{"marginRight": "20px"}}>
                        <i className='fa fa-trash'></i>&nbsp;
                        Cancel
                    </Button>
                    <Button type="submit" className="btn btn-sm btn-success">
                        <i className='fa fa-paper-plane'></i>&nbsp;
                        Category Update
                    </Button>
                </Col>
            </Form.Group>
        </form>

    </>)
}