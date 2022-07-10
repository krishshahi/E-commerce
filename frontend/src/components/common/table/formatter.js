import React from "react";
import {Badge} from "react-bootstrap";
import { httpPost } from "../../../service/axios.service";
import { ucFirst } from "../../../utilities/helpers";
export const ImageFormatter = (props) => {

    let img_path = process.env.REACT_APP_IMAGE_URL+"/"+props.type+"/"+props.image;

    return (<>
        <img src={img_path} style={props.customStyle} className="img img-fluid" />
    </>);
}

export const StatusFormatter = (props) => {
    const changeStatus = (status) => {
        // axios 
        let path = props.type+"/"+status+"/"+props.id;
        httpPost(path, {}, true);
        // TODO:
    }
    // https://localhost:3002/api/banner/active/123 => post => 
    // https://localhost:3002/api/banner/inactive/123 => post => 
    return (
       
           props.status === 'active' ? 
           <Badge bg="success" onClick={(e) => {
                changeStatus('inactive');
           }}>{
                ucFirst(props.status)
            }</Badge> 
           : 
           <Badge bg="danger" onClick={() => {
               changeStatus('active');
           }}>{
                ucFirst(props.status)
            }</Badge>
       
    )
}

export const BrandFormatter = (props) => {
    // let brands_txt = props.data.map((o) => o.title);
    return (<>
        {/* <ol> */}
            {
            props.data.map((o,i) => (
                <React.Fragment key={i}>
                    <Badge bg="info" >{o.title}</Badge>
                    <br></br>
                </React.Fragment>
            ))            
            }
        {/* </ol> */}
    </>)
}