function workerFN() {
    function onmessage(e) {
      switch(e.data.name) {
        case "notification" : 
          console.log("Notification:");
          var notification = new Notification("Hi there!");
        break;
        default:
          console.error("Unknown message:", e.data.name);
      }
    }
    self.onconnect = function(e) {
        for(var i=0,l=e.ports.length; i<l; i++) {
          e.ports[i].addEventListener('message', onmessage);
          e.ports[i].start(); // Required when using addEventListener. Otherwise called implicitly by onmessage setter.
        }
    }
  }


workerFN();