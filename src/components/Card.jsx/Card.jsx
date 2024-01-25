import mailSvg from "../../assets/mail.svg";
import manSvg from "../../assets/man.svg";
import womanSvg from "../../assets/woman.svg";
import womanAgeSvg from "../../assets/growing-up-woman.svg";
import mapSvg from "../../assets/map.svg";
import phoneSvg from "../../assets/phone.svg";
import padlockSvg from "../../assets/padlock.svg";
import axios from "axios";
import DeleteIcon from "../../assets/delete.svg"
import { useState, useEffect } from "react";
import { toastErrorNotify,toastSuccessNotify } from "../../helper/ToastNotify";
import { Spinner } from "react-bootstrap";
import {Table} from "react-bootstrap";


export default function Card() {


  const [activeUser, setActiveUser] = useState([]);
  const [savedUsers, setSavedUsers] = useState((() => {
    // Uygulama yüklendiğinde localStorage'dan veriyi yükle
    const localData = localStorage.getItem('users');
    return localData ? JSON.parse(localData) : [];
  }));

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
      toastErrorNotify('user could not fetch')
      console.log(err);
    }
  };
  

  useEffect(() => {
    getRandomUser();
    
  }, []);
  
  useEffect(() => {
    // savedUsers state'i her güncellendiğinde localStorage'a kaydet
    localStorage.setItem('users', JSON.stringify(savedUsers));
    console.log(localStorage);
  }, [savedUsers]);

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

  const deleteUser = (selectedIndex) => {
    // Filter methodu ile silinecek kullanıcı haricindeki kullanıcıları yeni bir diziye al
    const updatedUsers = savedUsers.filter((user,index) => index !== selectedIndex);
    
    // Güncellenmiş kullanıcı listesini state'e ve localStorage'a kaydet
    setSavedUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  };
  console.log(savedUsers)

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
              style={{borderRadius:'10px',backgroundColor:title == 'name' ? '#DFFF00' : ''}}
              className="icon"
              data-label="name"
            >
              <img src={activeUser?.gender === 'female' ? womanSvg : manSvg} alt="user" id="iconImg" />
            </button>
            <button
              onMouseOver={() => handleDisplay(activeUser.email, "email")}
              className="icon"
              data-label="email"
              style={{borderRadius:'10px',backgroundColor:title == 'email' ? '#DFFF00' : ''}}
            >
              <img src={mailSvg} alt="mail" id="iconImg" />
            </button>
            <button
              onMouseOver={() => handleDisplay(activeUser?.dob?.age, "age")}
              className="icon"
              data-label="age"
              style={{borderRadius:'10px',backgroundColor:title == 'age' ? '#DFFF00' : ''}}
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
              style={{borderRadius:'10px',backgroundColor:title == 'street' ? '#DFFF00' : ''}}
            >
              <img src={mapSvg} alt="map" id="iconImg" />
            </button>
            <button
              onMouseOver={() =>
                handleDisplay(activeUser?.phone, "phone number")
              }
              className="icon"
              data-label="phone"
              style={{borderRadius:'10px',backgroundColor:title == 'phone number' ? '#DFFF00' : ''}}
            >
              <img src={phoneSvg} alt="phone" id="iconImg" />
            </button>
            <button
              onMouseOver={() =>
                handleDisplay(activeUser.login?.password, "password")
              }
              className="icon"
              data-label="password"
              style={{borderRadius:'10px',backgroundColor:title == 'password' ? '#DFFF00' : ''}}
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
          <th>delete</th>
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
                    <td onClick={() => deleteUser(i)} style={{cursor:'pointer'}} className="deleteItem">
                    <svg xmlns="http://www.w3.org/2000/svg" className="deleteSvg" height="16" width="14" viewBox="0 0 448 512"><path  d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg>
                     
                    </td>
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
