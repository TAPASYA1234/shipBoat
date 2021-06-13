import React, { useState ,useEffect} from 'react';
import axios from 'axios';
import {Row,Col,Button} from 'reactstrap';
import './App.css';
import { FaUserAlt,FaEnvelope,FaCalendarAlt,
  FaMapMarkedAlt,FaLock,FaPhoneSquareAlt } from 'react-icons/fa';



function App() {

  const [users,setUsers] = useState();
  const [change, setChange] = useState(true);
  const [displayInfo,setDisplayInfo] = useState('');
  const [displayTitle,setDisplayTitle] = useState('');
  const [pictureSrc, setPictureSrc] = useState('');

  useEffect(()=>{
  axios.get(`https://randomuser.me/api`).then(res => {
    console.log(res.data.results[0]);
    console.log(res.data);
    setUsers(res.data.results[0]);
    setDisplayInfo(res.data.results[0].name.first + res.data.results[0].name.last);
    setPictureSrc(res.data.results[0].picture.large); 
    setDisplayTitle('Hi, My name is');
   } )
  },[change]);

  const toggleCard = ()=>{
    setChange(!change);
  }

  const displayItem = (event)=>{
    console.log(event.target.fill);
  let displayId = event.target.id;
  let item = event.target.getAttribute('fill');
  switch(displayId){
  case 'personName':
    {
      setDisplayTitle('Hi, My name is');
      setDisplayInfo(users.name.first + users.name.last);
      break;
    }
    case 'personEmail':
      {
        setDisplayTitle('My email address is');
        setDisplayInfo(users.email) ;
    
      break;}
    case 'personBirthday':
        {
          setDisplayTitle('My birthday is');
          setDisplayInfo(users.dob.date.substring(0,9)) ;
        break;}
    case 'personLocation':
        {
          setDisplayTitle('My address is');
          setDisplayInfo(users.location.city + users.location.state +users.location.country) ;
        break; }
    case 'personPhone':
        {
          setDisplayTitle('My phone number is');
          setDisplayInfo(users.cell) ;
        break;}  
    case 'personPassword':
       { 
        setDisplayTitle('My password is'); 
        setDisplayInfo(users.login.password) ;
        break;}
    default:
      {
        users &&
        setDisplayInfo(users.name.first + users.name.last)
      }
        
}
  }


  return (
    <div className='center' >
      <div>
      <h2 className='center'>
        Random User Generator
      </h2>
      </div>
     <Row style={{margin:'auto'}}>
       <Col className="center container"   style={{justifyContent:'center',alignItems:'center'}} lg="6" xs="6" sm="4" >
         <div  className='picture-container' >
          <img src={pictureSrc} className='picture'  />
         </div>
         <Button className="new-button" onClick={toggleCard} >New</Button>
         { displayTitle &&
           <h3  className='displayTitle'>{displayTitle}</h3>
         }

           {displayInfo &&
           <p className='displayInfo'>{displayInfo}</p>}
         <div>
           <ul style={{color:'grey',marginRight:'2rem',display:'flex'}}>
             <div name='userName' style={{marginRight:'2rem'}} >
             <FaUserAlt size={35} id='personName' onMouseOver={(event)=>displayItem(event)}/>
             </div>
             <div  style={{marginRight:'2rem'}}  >
               <FaEnvelope size={35} id='personEmail' 
               className='hover-item'
                onMouseEnter={(event)=>displayItem(event)} />
             </div>
             <div   style={{marginRight:'2rem'}} >
               <FaCalendarAlt size={35} id='personBirthday' onMouseEnter={(event)=>displayItem(event)}/>
             </div>
             <div  style={{marginRight:'2rem'}}  >
               <FaMapMarkedAlt size={35} id='personLocation' onMouseEnter={(event)=>displayItem(event)}/>
             </div>
             <div  style={{marginRight:'2rem'}} >
               <FaPhoneSquareAlt size={35} id='personPhone' onMouseEnter={(event)=>displayItem(event)}/>
             </div>
             <div style={{marginRight:'2rem'}} >
               <FaLock size={35}  id='personPassword'  onMouseEnter={(event)=>displayItem(event)} />
             </div>
           </ul>
         </div>
       
       </Col>
     </Row>
    </div>
  );
}

export default App;
