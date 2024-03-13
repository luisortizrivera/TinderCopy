import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "../Styles/RegisterPage.css";
import imageCompression from "browser-image-compression";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
export default function ProfileSetting({
  form,
  handleChange,
  isBasicDataFilled,
  setIsBasicDataFilled,
  handleMainSubmission,
  validated,
}) {
  const handleGoBack = () => {
    setIsBasicDataFilled(false);
  };
  const [profileImg, setProfileImg] = useState(null);

  async function handleImageUpload(event) {
    const imageFile = event.target.files[0];
    if (imageFile) {
      console.log("originalFile instanceof Blob", imageFile instanceof Blob); // true
      console.log(`originalFile size ${imageFile.size / 1024 / 1024} MB`);

      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 400,
        useWebWorker: true,
      };
      try {
        const compressedFile = await imageCompression(imageFile, options);
        console.log(
          "compressedFile instanceof Blob",
          compressedFile instanceof Blob
        );
        console.log(
          `compressedFile size ${compressedFile.size / 1024 / 1024} MB`
        );
        const reader = new FileReader();
        reader.readAsDataURL(compressedFile);
        reader.onloadend = function () {
          const base64String = reader.result;
          console.log(base64String);
          setProfileImg(base64String);
          handleChange({
            target: {
              name: "profileImg",
              value: base64String,
            },
          });
        };
      } catch (error) {
        console.log(error);
      }
    } else setProfileImg(null);
  }

  return (
    <div
      className={`profileSettingFields disappear-transition ${
        isBasicDataFilled ? "show" : "hide"
      }`}
    >
      <h2 className="h2 mb-3 text-white text-center">
        Please Add a Profile Picture and a brief description of yourself
      </h2>

      <Form
        validated={validated}
        id="profileSettingsForm"
        noValidate
        onSubmit={handleMainSubmission}
      >
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label className="text-white">
            Input a profile picture (max 1MB)
          </Form.Label>
          <Form.Control
            type="file"
            name="profileImg"
            required
            onChange={handleImageUpload}
          />
        </Form.Group>
        {profileImg && (
          <Container
            className={`d-flex align-items-center justify-content-center  ${
              profileImg ? "show" : "hide"
            }`}
          >
            <Row>
              <Col xs={6} md={4}>
                <Image src={profileImg} rounded width={200} height={200} />
              </Col>
            </Row>
          </Container>
        )}
        <Form.Group className="mb-3" controlId="bio-textarea">
          <Form.Label className="text-white">
            Brief description of yourself ({300 - form.bio.length} left)
          </Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            maxLength={300}
            onChange={handleChange}
            name="bio"
            required
          />
          <Form.Text className="text-white">
            Maximum of 300 characters
          </Form.Text>
        </Form.Group>
      </Form>
      <Button
        className="btn btn-primary py-2 mt-1 w-100"
        type="submit"
        form="profileSettingsForm"
        data-testid="resgister-profile-submit-button"
      >
        Submit
      </Button>
      <Button
        className="btn btn-primary py-2 mt-1 w-100"
        onClick={handleGoBack}
      >
        Go back to registering
      </Button>
    </div>
  );
}
