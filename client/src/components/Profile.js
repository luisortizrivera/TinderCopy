import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

const Profile = () => {
  const [randomUser, setRandomUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("/api/user/getRandomUser", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
          },
        });

        const userData = await response.json();
        const imageResponse = await fetch(
          "/api/user/getUserImage/" + userData._id
        );
        if (!imageResponse.ok) {
          throw new Error(`HTTP error! status: ${imageResponse.status}`);
        }
        const base64Image = await imageResponse.text();
        const imageUrl = "data:image/jpeg;base64," + base64Image;
        setRandomUser({
          user: userData,
          profileImg: imageUrl,
        });
      } catch (error) {
        console.error("Error fetching random user:", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div
      className="profileCard"
      style={{
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {randomUser && (
        <Card
          className="text-center"
          style={{
            width: "70%",
            height: "70%",
          }}
        >
          <Card.Img
            variant="top"
            src={randomUser.profileImg}
            style={{ width: "auto", height: "60%", objectFit: "cover" }}
          />
          <Card.Body className="d-grid gap-2">
            <Card.Title>
              {`${randomUser.user.Name} ${randomUser.user.Surname}`}
            </Card.Title>
            <Card.Text>{randomUser.user.Bio}</Card.Text>
            <div className="d-flex flex-row justify-content-between align-items-center">
              <Button
                variant="primary"
                size="lg"
                style={{ width: "30%", height: "60%", padding: 0}}
              >
                NEVER
              </Button>
              <Button
                variant="primary"
                size="lg"
                style={{ width: "30%", height: "60%", padding: 0 }}
              >
                YAASS
              </Button>
            </div>
          </Card.Body>
        </Card>
      )}
    </div>
  );
};

export default Profile;
