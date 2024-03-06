import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { handleInteraction } from "../handlers/InteractionHandlers";
import CardBody from "react-bootstrap/esm/CardBody";
import CardTitle from "react-bootstrap/esm/CardTitle";

const Profile = (props) => {
  const [randomUser, setRandomUser] = useState(null);

  const fetchUserData = async () => {
    try {
      const response = await fetch("/api/user/getRandomUser", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        },
      });

      const userData = await response.json();
      if (userData) {
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
      } else setRandomUser(null);
    } catch (error) {
      console.error("Error fetching random user:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div
      className="d-grid align-self-center w-75 h-75"
      style={{ justifySelf: "center" }}
    >
      <Card
        bg={randomUser ? undefined : "secondary"}
        className="w-100 h-100"
        style={{ overflow: "auto" }}
      >
        {randomUser ? (
          <>
            <Card.Img
              variant="top"
              src={randomUser.profileImg}
              style={{ maxHeight: "60%", objectFit: "cover" }}
            />
            <div
              className="d-grid h-100"
              style={{ gridTemplateRows: "0.5fr 2fr 1fr", maxHeight: "40%" }}
            >
              <CardTitle className="d-flex justify-content-center align-items-center mb-0">{`${randomUser.user.Name} ${randomUser.user.Surname}`}</CardTitle>
              <CardBody className="d-flex align-items-center overflow-scroll">
                {/* {randomUser.user.Bio} */}
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequatliquip ex ea commodo
                consequatnsequat.
              </CardBody>
              <div className="d-flex w-100 justify-content-between p-3">
                <Button
                  variant="primary"
                  size="lg"
                  className="w-25"
                  onClick={() =>
                    handleInteraction({
                      interaction: "dislike",
                      currentUser: props.currentUser,
                      randomUser: randomUser,
                      fetchUserData: fetchUserData,
                      fetchMatches: props.fetchMatches,
                    })
                  }
                >
                  NOPE
                </Button>
                <Button
                  variant="primary"
                  size="lg"
                  className="w-25"
                  onClick={() =>
                    handleInteraction({
                      interaction: "like",
                      currentUser: props.currentUser,
                      randomUser: randomUser,
                      fetchUserData: fetchUserData,
                      fetchMatches: props.fetchMatches,
                    })
                  }
                >
                  YES
                </Button>
              </div>
            </div>
          </>
        ) : (
          <Card.Body className="h-100">
            <Card.Text className="text-white">
              THERE ARE NO MORE USERS
            </Card.Text>
          </Card.Body>
        )}
      </Card>
    </div>
  );
};

export default Profile;
