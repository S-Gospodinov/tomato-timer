// onmessage = function(e) {
//       switch(e.data.name) {
//         case "notification" : 
//           console.log("Notification:");
//           const options = {
//             body: 'Buzz! Buzz!',
//           icon: '../images/touch/chrome-touch-icon-192x192.png',
//           vibrate: [200, 100, 200, 100, 200, 100, 200],
//           tag: 'vibration-sample'
//           }
//           const notification = new Notification("Hi there!", options);
//         break;
//         default:
//           console.error("Unknown message:", e.data.name);
//       }
//     }


// onmessage = function (e) {
//   console.log("Notification:");
//   const options = {
//     body: 'Buzz! Buzz!',
//     icon: '../images/touch/chrome-touch-icon-192x192.png',
//     vibrate: [200, 100, 200, 100, 200, 100, 200],
//     tag: 'vibration-sample'
//   }
  
//   const notification = new Notification("Hi there!", options);

// }


onmessage = function (e) {
  let seconds = e.data[0];
  let minutes = e.data[1];
  console.log(seconds, minutes);

if(seconds === 0 & minutes ===0) {
  workerResult = 'fin';
  postMessage(workerResult);
}


}