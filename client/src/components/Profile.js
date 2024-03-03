import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { handleInteraction } from "../handlers/InteractionHandlers";

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
      }else setRandomUser(null);
    } catch (error) {
      console.error("Error fetching random user:", error);
    }
  };

  useEffect(() => {
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
      <Card
        className={
          randomUser ? "text-center" : "text-center justify-content-center"
        }
        bg={randomUser ? undefined : "secondary"}
        style={{
          width: "70%",
          height: "70%",
        }}
      >
        {randomUser ? (
          <>
            <Card.Img
              variant="top"
              src={randomUser.profileImg}
              style={{ width: "auto", height: "60%", objectFit: "cover" }}
            />
            <Card.Body
              className="d-grid gap-2"
              style={{
                gridTemplateRows: "75% 25%",
                alignContent: "space-evenly",
              }}
            >
              <div className="d-flex flex-column">
                <Card.Title className="d-flex align-items-center justify-content-center h-25 text-center m-0">
                  {`${randomUser.user.Name} ${randomUser.user.Surname}`}
                </Card.Title>
                <Card.Text className="d-flex align-items-center justify-content-center h-75">
                  {randomUser.user.Bio}
                </Card.Text>
              </div>
              <div className="d-flex flex-row justify-content-between align-items-center h-100">
                <Button
                  variant="primary"
                  size="lg"
                  style={{ width: "30%", height: "100%", padding: 0 }}
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
                  NEVER
                </Button>
                <Button
                  variant="primary"
                  size="lg"
                  style={{ width: "30%", height: "100%", padding: 0 }}
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
                  YAASS
                </Button>
              </div>
            </Card.Body>
          </>
        ) : (
          <Card.Text className="text-white">THERE ARE NO MORE USERS</Card.Text>
        )}
      </Card>
    </div>
  );
};

export default Profile;
