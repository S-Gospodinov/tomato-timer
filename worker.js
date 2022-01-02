function workerFN() {
    self.onmessage = function(e) {
      switch(e.data.name) {
        case "notification" : 
          console.log("Notification:");
          var notification = new Notification("Hi there!");
        break;
        default:
          console.error("Unknown message:", e.data.name);
      }
    }


}

workerFN();