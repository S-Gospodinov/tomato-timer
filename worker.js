function workerFN() {
    self.onmessage = function(e) {
      switch(e.data.name) {
        case "notification" : 
          console.log("Notification:");
          var options = {
            body: 'Buzz! Buzz!',
          icon: '../images/touch/chrome-touch-icon-192x192.png',
          vibrate: [200, 100, 200, 100, 200, 100, 200],
          tag: 'vibration-sample'
          }
          var notification = new Notification("Hi there!", options);
        break;
        default:
          console.error("Unknown message:", e.data.name);
      }
    }


}

workerFN();