import mailSvg from "../../assets/mail.svg";
import manSvg from "../../assets/man.svg";
import womanSvg from "../../assets/woman.svg";
import manAgeSvg from "../../assets/growing-up-man.svg";
import womanAgeSvg from "../../assets/growing-up-woman.svg";
import mapSvg from "../../assets/map.svg";
import phoneSvg from "../../assets/phone.svg";
import padlockSvg from "../../assets/padlock.svg";
import cwSvg from "../../assets/cw.svg";
import axios from "axios";
import { useState, useEffect } from "react";

const defaultImage = "https://randomuser.me/api/portraits/men/75.jpg";

export default function Card() {
  const [user, setUser] = useState(null);

  const [activeInfo, setActiveInfo] = useState(null);
  const [title, setTitle] = useState("name");

  const getRandomUser = async () => {
    try {
      const url = "https://randomuser.me/api/";
      const res = await axios.get(url);
      setUser(res.data.results[0]);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getRandomUser();
  }, []);

  useEffect(() => {
    if (user) {
      setActiveInfo(`${user.name?.first} ${user.name?.last}`);
    }
    setTitle("name");
  }, [user]);

  const handleDisplay = (value, title) => {
    setActiveInfo(value);
    setTitle(title);
  };

  return (
    <main>
      <div className="block bcg-orange">
        <img src={cwSvg} alt="cw" id="cw" />
      </div>
      <div className="block">
        <div className="container">
          <img
            src={user?.picture?.large}
            alt="random user"
            className="user-img"
          />
          <p className="user-title">My {title} is</p>
          <p className="user-value">{activeInfo}</p>
          <div className="values-list">
            <button
              onMouseOver={() =>
                handleDisplay(`${user.name.first} ${user.name.last}`, "name")
              }
              className="icon"
              data-label="name"
            >
              <img src={womanSvg} alt="user" id="iconImg" />
            </button>
            <button
              onMouseOver={() => handleDisplay(user.email, "email")}
              className="icon"
              data-label="email"
            >
              <img src={mailSvg} alt="mail" id="iconImg" />
            </button>
            <button
              onMouseOver={() => handleDisplay(user.dob?.age, "age")}
              className="icon"
              data-label="age"
            >
              <img src={womanAgeSvg} alt="age" id="iconImg" />
            </button>
            <button
              onMouseOver={() =>
                handleDisplay(
                  `${user.location.street.name}, ${user.location.city}`,
                  "street"
                )
              }
              className="icon"
              data-label="street"
            >
              <img src={mapSvg} alt="map" id="iconImg" />
            </button>
            <button className="icon" data-label="phone">
              <img src={phoneSvg} alt="phone" id="iconImg" />
            </button>
            <button className="icon" data-label="password">
              <img src={padlockSvg} alt="lock" id="iconImg" />
            </button>
          </div>
          <div className="btn-group">
            <button className="btn" type="button" onClick={getRandomUser}>
              new user
            </button>
            <button className="btn" type="button">
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
              <tr className="body-tr"></tr>
            </tbody>
          </table>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}></div>
    </main>
  );
}
