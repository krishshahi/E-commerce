import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { Button, Col, Form } from "react-bootstrap";
import * as Yup from "yup";
// yup 
export const BrandForm = (props) => {
    let brand_data = {
        title: '',
        image: '',
        status: ''
    };


    const brand_schema = Yup.object().shape({
        title: Yup.string()
          .required('Title is Required'),
        
          status: Yup.string().required('Status is Required'),
      });

    let [data, setData] = useState(brand_data);

    useEffect(() => {
        if(!props.brand) return;
        setData(props.brand)
        formik.setValues(props.brand);
    }, [props.brand])

    const formik = useFormik({
        initialValues: data,
        
        validationSchema: brand_schema,

        onSubmit: async (values) => {
            props.onFormSubmit(values)
        },  
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
                        value={formik.values.title}
                        className="form-control form-control-sm"
                    />
                    {formik.errors.title && formik.touched.title ? (
                        <span className="text-danger"><em>{formik.errors.title}</em></span>
                    ) : null}
                </div>
            </div>

            

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
                        Brand Update
                    </Button>
                </Col>
            </Form.Group>
        </form>

    </>)
}