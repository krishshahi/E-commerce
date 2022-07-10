import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { Button, Col, Form } from "react-bootstrap";
import * as Yup from "yup";
// yup 
export const UserForm = (props) => {
    let user_data = {
        name: '',
        email: '',
        role: '',
        image: '',
        status: ''
    };


    const user_schema = Yup.object().shape({
        name: Yup.string()
          .required('Title is Required'),
        email: Yup.string().email()
          .required('Title is Required'),
        status: Yup.string().required('Status is Required'),
      });

    let [data, setData] = useState(user_data);

    useEffect(() => {
        if(!props.user) return;
        setData(props.user)
        formik.setValues(props.user);
    }, [props.user])

    const formik = useFormik({
        initialValues: data,
        
        validationSchema: user_schema,

        onSubmit: async (values) => {
            // values: date => date, string 
            if(typeof(values.role_id) === 'object') {
                values.role_id = values.role_id._id;
            }
            props.onFormSubmit(values)
        },  
    });

    return (<>

        <form onSubmit={formik.handleSubmit}>
            <div className='row form-group mb-3'>
                <label htmlFor='name' className='col-sm-3'>
                    Name:
                </label>
                <div className='col-sm-9'>
                    <input
                        id='name'
                        type='text'
                        name='name'
                        onChange={formik.handleChange}
                        value={formik.values.name}
                        className="form-control form-control-sm"
                    />
                    {formik.errors.name && formik.touched.name ? (
                        <span className="text-danger"><em>{formik.errors.name}</em></span>
                    ) : null}
                </div>
            </div>


            <div className='row form-group mb-3'>
                <label htmlFor='email' className='col-sm-3'>
                    Email:
                </label>
                <div className='col-sm-9'>
                    <input
                        id='email'
                        type='email'
                        name='email'
                        onChange={formik.handleChange}
                        value={formik.values.email}
                        className="form-control form-control-sm"
                    />
                    {formik.errors.email && formik.touched.email ? (
                        <span className="text-danger"><em>{formik.errors.email}</em></span>
                    ) : null}
                </div>
            </div>


            <Form.Group className="row form-group mb-3" controlId="role">
                <Form.Label className='col-sm-3'>Role: </Form.Label>
                <Col sm={9}>
                    <Form.Select id="role" 
                        name="role"
                        onChange={formik.handleChange}
                        value={formik.values.role}
                        size="sm">
                        <option>Select any One</option>
                        <option value="6252444efcff4d747f1d07bb">Admin</option>
                        <option value="6252445ffcff4d747f1d07bc">Seller</option>
                        <option value="62524472fcff4d747f1d07bd">Customer</option>
                    </Form.Select>
                    {formik.errors.role && formik.touched.role ? (
                        <span className="text-danger"><em>{formik.errors.role}</em></span>
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
                        User Create
                    </Button>
                </Col>
            </Form.Group>
        </form>

    </>)
}