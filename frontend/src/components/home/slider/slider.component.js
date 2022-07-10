import { Carousel } from "react-bootstrap";
import { useState, useEffect } from "react";

import { getActiveBanners } from "../../../service/banner.service"

export const SliderComponent = () => {
    let [banner, setBanner] = useState();

    let getHomePageBanner = async () => {
        let response = await getActiveBanners();
        if (response.status) {
            setBanner(response.result)
        }
    }

    useEffect(() => {
        getHomePageBanner()
    }, []);
    return (<>
        <Carousel fade>
            {
                banner && banner.map((o, i) => (

                    <Carousel.Item key={i}>
                        <a href={o.link}>
                            <img
                                className="d-block w-100"
                                src={process.env.REACT_APP_IMAGE_URL + "/banner/" + o.image}
                                alt="Third slide"
                            />
                        </a>
                    </Carousel.Item>
                ))
            }
        </Carousel>
    </>)
}