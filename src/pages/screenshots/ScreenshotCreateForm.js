import React, { useRef, useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

import Upload from "../../assets/upload.png";

import styles from "../../css/ServerAddEdit.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../css/Button.module.css";
import Asset from "../../components/Asset";
import { Alert, Image } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";

function ScreenshotCreateForm() {

    const [errors, setErrors] = useState({});

    const [screenshotData, setScreenshotData] = useState({
        title: "",
        description: "",
        image: "",
    });
    const { title, description, image } = screenshotData;

    const imageInput = useRef(null);
    const history = useHistory();

    const handleChange = (event) => {
        setScreenshotData({
            ...screenshotData,
            [event.target.name]: event.target.value,
        });
    };

    const handleChangeImage = (event) => {
        if (event.target.files.length) {
            URL.revokeObjectURL(image);
            setScreenshotData({
                ...screenshotData,
                image: URL.createObjectURL(event.target.files[0]),
            });
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();

        formData.append('title', title);
        formData.append('description', description);
        formData.append('image', imageInput.current.files[0]);

        try {
            const { data } = await axiosReq.post('/screenshots/', formData);
            history.push(`/screenshots/${data.id}`);
        } catch (err) {
            console.log(err);
            if (err.response?.status !== 401) {
                setErrors(err.response?.data);
            }
        }
    };

    const textFields = (
        <div className="text-center">
            <Form.Group>
                <Form.Label className={styles.Label}>Title</Form.Label>
                <Form.Control type="text" name="title" value={title} onChange={handleChange} />
            </Form.Group>
            {errors.title?.map((message, idx) => (
                <Alert key={idx} variant="warning">{message}</Alert>
            ))}
            <Form.Group>
                <Form.Label className={styles.Label}>Description</Form.Label>
                <Form.Control type="text" name="description" value={description} onChange={handleChange} />
            </Form.Group>
            {errors.description?.map((message, idx) => (
                <Alert key={idx} variant="warning">{message}</Alert>
            ))}

            <Button className={btnStyles.Button} onClick={() => history.goBack()}>cancel</Button>
            <Button className={btnStyles.Button} type="submit">create</Button>
        </div>
    );

    return (
        <Form onSubmit={handleSubmit}>
            <Row>
                <Col className="py-2 p-0 p-md-2" md={7} lg={8}>
                    <Container className={`${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center`}>
                        <Form.Group className="text-center">
                            {image ? (
                                <>
                                    <figure>
                                        <Image className={appStyles.Image} src={image} rounded />
                                    </figure>
                                    <div>
                                        <Form.Label className={`${btnStyles.Button} ${btnStyles.Blue} btn`} htmlFor="image-upload" >Change Image</Form.Label>
                                    </div>
                                </>
                            ) : (
                                <Form.Label className="d-flex justify-content-center" htmlFor="image-upload" >
                                    <Asset src={Upload} message="Click or tap to upload" />
                                </Form.Label>
                            )};

                            <Form.File id="image-upload" accept="image/*" onChange={handleChangeImage} ref={imageInput} />
                        </Form.Group>
                        {errors?.image?.map((message, idx) => (
                            <Alert variant="warning" key={idx}>{message}</Alert>
                        ))}
                    </Container>
                </Col>
                <Col md={5} lg={4} className="d-none d-md-block p-0 p-md-2">
                    <Container className={appStyles.Content}>{textFields}</Container>
                </Col>
            </Row>
        </Form >
    );
}

export default ScreenshotCreateForm;