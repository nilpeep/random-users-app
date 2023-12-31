import mailSvg from "../../assets/mail.svg";
import manSvg from "../../assets/man.svg";
import womanSvg from "../../assets/woman.svg";
import manAgeSvg from "../../assets/growing-up-man.svg";
import womanAgeSvg from "../../assets/growing-up-woman.svg";
import mapSvg from "../../assets/map.svg";
import phoneSvg from "../../assets/phone.svg";
import padlockSvg from "../../assets/padlock.svg";
import cwSvg from "../../assets/cw.svg";
import bird from "../../assets/bird.jpg";
import axios from "axios";
import { useState, useEffect } from "react";

const defaultImage = "https://randomuser.me/api/portraits/men/75.jpg";

export default function Card() {
  const [activeUser, setActiveUser] = useState(null);
  const [savedUsers, setSavedUsers] = useState([]);

  const [activeInfo, setActiveInfo] = useState(null);
  const [title, setTitle] = useState("name");

  const saveUser = (newUser) => {
    console.log(savedUsers);
    setSavedUsers((prevSavedUsers) => [newUser, ...prevSavedUsers]);
  };

  const getRandomUser = async () => {
    try {
      const url = "https://randomuser.me/api/";
      const res = await axios.get(url);
      console.log(res.data.results[0]);
      setActiveUser(res.data.results[0]);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getRandomUser();
  }, []);

  useEffect(() => {
    if (activeUser) {
      setActiveInfo(`${activeUser.name?.first} ${activeUser.name?.last}`);
    }
    setTitle("name");
  }, [activeUser]);

  const handleDisplay = (value, title) => {
    setActiveInfo(value);
    setTitle(title);
  };

  return (
    <main>
      <div className="block bcg-orange">
        {/* <img src={bird} alt="cw" id="cw" /> */}
      </div>
      <div className="block">
        <div className="container">
          <img
            src={activeUser?.picture?.large}
            alt="random user"
            className="user-img"
          />
          <p className="user-title">My {title} is</p>
          <p className="user-value">{activeInfo}</p>
          <div className="values-list">
            <button
              onMouseOver={() =>
                handleDisplay(
                  `${activeUser.name.first} ${activeUser.name.last}`,
                  "name"
                )
              }
              className="icon"
              data-label="name"
            >
              <img src={womanSvg} alt="user" id="iconImg" />
            </button>
            <button
              onMouseOver={() => handleDisplay(activeUser.email, "email")}
              className="icon"
              data-label="email"
            >
              <img src={mailSvg} alt="mail" id="iconImg" />
            </button>
            <button
              onMouseOver={() => handleDisplay(activeUser.dob?.age, "age")}
              className="icon"
              data-label="age"
            >
              <img src={womanAgeSvg} alt="age" id="iconImg" />
            </button>
            <button
              onMouseOver={() =>
                handleDisplay(
                  `${activeUser.location.street.name}, ${activeUser.location.city}`,
                  "street"
                )
              }
              className="icon"
              data-label="street"
            >
              <img src={mapSvg} alt="map" id="iconImg" />
            </button>
            <button
              onMouseOver={() =>
                handleDisplay(activeUser.phone, "phone number")
              }
              className="icon"
              data-label="phone"
            >
              <img src={phoneSvg} alt="phone" id="iconImg" />
            </button>
            <button
              onMouseOver={() =>
                handleDisplay(activeUser.login.password, "password")
              }
              className="icon"
              data-label="password"
            >
              <img src={padlockSvg} alt="lock" id="iconImg" />
            </button>
          </div>
          <div className="btn-group">
            <button className="btn" type="button" onClick={getRandomUser}>
              new user
            </button>
            <button
              onClick={() => saveUser(activeUser)}
              className="btn"
              type="button"
            >
              add user
            </button>
          </div>

          <table className="table">
            <thead>
              <tr className="head-tr">
                <th className="th">Firstname</th>
                <th className="th">Email</th>
                <th className="th">Phone</th>
                <th className="th">Age</th>
              </tr>
            </thead>
            <tbody>
              {savedUsers.map((user) => {
                return (
                  <tr key={user.id.value}>
                    <td className="body-tr">
                      {user.name?.first} {user.name?.last}
                    </td>
                    <td className="body-tr">{user.email}</td>
                    <td className="body-tr">{user.phone}</td>
                    <td className="body-tr">{user.dob.age}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}></div>
    </main>
  );
}
