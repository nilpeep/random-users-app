import mailSvg from "../../assets/mail.svg";
import manSvg from "../../assets/man.svg";
import womanSvg from "../../assets/woman.svg";
import womanAgeSvg from "../../assets/growing-up-woman.svg";
import mapSvg from "../../assets/map.svg";
import phoneSvg from "../../assets/phone.svg";
import padlockSvg from "../../assets/padlock.svg";
import axios from "axios";
import { useState, useEffect } from "react";
import { toastErrorNotify,toastSuccessNotify } from "../../helper/ToastNotify";
import { Spinner } from "react-bootstrap";
import {Table} from "react-bootstrap";


export default function Card() {


  const [activeUser, setActiveUser] = useState([]);
  const [savedUsers, setSavedUsers] = useState([]);

  const [activeInfo, setActiveInfo] = useState('');
  const [title, setTitle] = useState("name");

  
  const saveUser = (newUser) => {
    
      //filter,find veya some ile user varmı kontrolü yapabiliriz, filter tüm eşleşenleri dizi döner, find ilk eşleşeni obje döner, some eşlesen varsa boolean döner
      console.log(newUser)
      const isExist = savedUsers.some((user) => user.name?.first === newUser.name?.first)
  
      if(isExist){
        toastErrorNotify('user already saved')
      }else{
        setSavedUsers([ newUser, ...savedUsers]) 
        toastSuccessNotify('user saved!')
      }
    

    ;
  };

  const getRandomUser = async () => {
    try {
      const url = "https://randomuser.me/api/";
      const res = await axios.get(url);
   
      setActiveUser(res.data.results[0]);
    } catch (err) {
      console.log(err);
    }
  };
  
  console.log(activeInfo)

  useEffect(() => {
    getRandomUser();
    
  }, []);
  
  // useEffect(() =>{
  //   setActiveInfo(`${activeUser?.name?.first} ${activeUser?.name?.last}`);

  // }, [activeUser])

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
          {
            activeUser.picture ?  <img
            src={activeUser?.picture?.large}
            alt="random user"
            className="user-img"
          /> : <Spinner className="spinner"/>
          }
          
          <p className="user-title">My {title} is</p>
          <p className="user-value">{activeInfo === 'undefined undefined' ? '' : activeInfo}</p>
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
              <img src={activeUser?.gender === 'female' ? womanSvg : manSvg} alt="user" id="iconImg" />
            </button>
            <button
              onMouseOver={() => handleDisplay(activeUser.email, "email")}
              className="icon"
              data-label="email"
            >
              <img src={mailSvg} alt="mail" id="iconImg" />
            </button>
            <button
              onMouseOver={() => handleDisplay(activeUser?.dob?.age, "age")}
              className="icon"
              data-label="age"
            >
              <img src={womanAgeSvg} alt="age" id="iconImg" />
            </button>
            <button
              onMouseOver={() =>
                handleDisplay(
                  `${activeUser?.location?.street?.name}, ${activeUser?.location?.city}`,
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
                handleDisplay(activeUser?.phone, "phone number")
              }
              className="icon"
              data-label="phone"
            >
              <img src={phoneSvg} alt="phone" id="iconImg" />
            </button>
            <button
              onMouseOver={() =>
                handleDisplay(activeUser.login?.password, "password")
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

          <div className="table table-responsive">

          <Table striped bordered hover>
      <thead>
        <tr>
          <th>Gender</th>
          <th>Name</th>
          <th>Email</th>
          <th>Tel</th>
          <th>Age</th>
        </tr>
      </thead>
      <tbody>
      {savedUsers.map((user, i) => {
                return (
                  <tr key={i}>
                    <td >
                      <img className="t-img" src={user.gender === 'female' ? womanSvg : manSvg} alt="" />
                    </td>
                    <td>
                      {user.name?.first} {user.name?.last}
                    </td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>{user.dob.age}</td>
                  </tr>
                );
              })}
      </tbody>
    </Table>
          </div>


          
        </div>
      </div>
    </main>
  );
}
