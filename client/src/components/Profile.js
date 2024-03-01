import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

const Profile = () => {
  const [randomUser, setRandomUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("/api/user/getRandomUser");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
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
          style={{
            width: "70%",
            height: "70%",
          }}
        >
          <Card.Img variant="top" src={randomUser.profileImg} />
          <Card.Body>
            <Card.Title>
              {`${randomUser.user.Name} ${randomUser.user.Surname}`}
            </Card.Title>
            <Card.Text>{randomUser.user.Bio}</Card.Text>
            <Button variant="primary">Go somewhere</Button>
          </Card.Body>
        </Card>
      )}
    </div>
  );
};

export default Profile;
