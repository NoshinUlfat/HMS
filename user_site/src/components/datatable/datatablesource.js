import axios from "axios";
import React, { useEffect, useState } from 'react';


// function getUserData({ name }) {
//   let responseDataTemp = [];  // Calculates output
//   useEffect(() => {
//     axios.get("/roomAllotments")   
//                     .then(res => {
//                         // object destructuring
//                         const room = res.data[0].preferredRoomNo;
//                         console.log("IN ",res.data[0]," ",room)
//                         responseDataTemp.push(room);

                        
//                     });
//   });
//           // Calculates output
// }


 //let responseData = [];
// async function getUserData() {
//   let responseDataTemp = [];
// 	try {
// 		const response = await axios.get("/roomAllotments")   
//                     .then(res => {
//                         // object destructuring
//                         const room = res.data[0].preferredRoomNo;
//                         console.log("IN ",res.data[0]," ",room)
//                         responseDataTemp.push(room);

                        
//                     });

//                     console.log("INcdsdcsds ",responseDataTemp[0])
//                     dataCopy(responseDataTemp)
// 	}
// 	catch (error) {
// 		console.log(error);
// 	}
//   return null;
// }

// function dataCopy (data){
//   responseData = data;
// }

// let response = getUserData()
// console.log("Fsdsd  ",responseData[0]);

// console.log("AAABBBBBBBBBBBBB")
// console.log(responseData[0]);
// console.log("AAA")


// let responseData = null;

// let AuthUser = function() {
//   return axios.get("/roomAllotments").then(token => { return token } )
// }

// let userToken = AuthUser()
// console.log(userToken) // Promise { <pending> }

// userToken.then(function(result) {
//    console.log("DO ",result) // "Some User token"
//    responseData = result.data;
// })

// console.log("DcdcdO ",responseData) 



// let AuthUser = function() {
//   return axios.get("/roomAllotments")
// }

// let userToken =  AuthUser()
// console.log("dfgvdg ",userToken) // your data



export const userColumns = [
    // { field: "id", headerName: "ID", width: 70 },
    {
      field: "username",
      headerName: "Name",
      width: 230,
      renderCell: (params) => {
        return (
          <div className="cellWithImg">
            <img className="cellImg" src={params.row.img} alt="avatar" />
            {params.row.username}
          </div>
        );
      },
    },
    {
      field: 'SID',
      headerName: "SID",
      width: 100,
    },
  
    {
      field: "LT",
      headerName: "LT",
      width: 100,
    },
  ];
  
  //temporary data
  export const userRows = [
    {
      id: 1,
      SID: 1705088,
      username: "Snow",
      img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      status: "active",
      email: "1snow@gmail.com",
      LT: "1-2",
    },
    {
      id: 2,
      SID: 1705088,
      username: "Jamie Lannister",
      img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      email: "2snow@gmail.com",
      status: "passive",
      LT: "1-2",
    },
    {
      id: 3,
      SID: 1705088,
      username: "Lannister",
      img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      email: "3snow@gmail.com",
      status: "pending",
      LT: '1-2',
    },
    {
      id: 4,
      SID: 1705088,
      username: "Stark",
      img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      email: "4snow@gmail.com",
      status: "active",
      LT: '1-2',
    },
    {
      id: 5,
      SID: 1705088,
      username: "Targaryen",
      img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      email: "5snow@gmail.com",
      status: "passive",
      LT: '1-2',
    },
    {
      id: 6,
      SID: 1705088,
      username: "Melisandre",
      img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      email: "6snow@gmail.com",
      status: "active",
      LT: '1-2',
    },
    {
      id: 7,
      SID: 1705088,
      username: "Clifford",
      img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      email: "7snow@gmail.com",
      status: "passive",
      LT: '1-2',
    },
    {
      id: 8,
      SID: 1705088,
      username: "Frances",
      img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      email: "8snow@gmail.com",
      status: "active",
      LT: '1-2',
    },
    {
      id: 9,
      SID: 1705088,
      username: "Roxie",
      img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      email: "snow@gmail.com",
      status: "pending",
      LT: '1-2',
    },
    {
      id: 10,
      SID: 1705088,
      username: "Roxie",
      img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      email: "snow@gmail.com",
      status: "active",
      LT: '1-2',
    },
  ];



