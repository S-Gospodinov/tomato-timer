function workerFN() {
    self.onmessage = function(e) {
      switch(e.data.name) {
        case "notification" : 
          console.log("Notification:");
          var options = {
            body: 'Do you like my body?',
            vibrate: [200, 100, 200]
          }
          var notification = new Notification("Hi there!", options);
        break;
        default:
          console.error("Unknown message:", e.data.name);
      }
    }


}

workerFN();