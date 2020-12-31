const b = document.querySelector("button");
     let clicked = false;
     let chunks = [];
     let ac;
     let osc;
     let dest;
     let mediaRecorder;
     console.log(b.click);

     function init() {
       ac = new AudioContext();
       osc = ac.createOscillator();
       dest = ac.createMediaStreamDestination();
       mediaRecorder = new MediaRecorder(dest.stream);
       osc.connect(dest);

       mediaRecorder.ondataavailable = function(evt) {
         // push each chunk (blobs) in an array
         chunks.push(evt.data);
       };

       mediaRecorder.onstop = function(evt) {
         // Make blob out of our blobs, and open it.
         let blob = new Blob(chunks, { 'type' : 'audio/ogg; codecs=opus' });
         let audioTag = document.createElement('audio');
         document.querySelector("audio").src = URL.createObjectURL(blob);
       };
     }

     b.addEventListener("click", function(e) {
       if(!ac) {
           init();
       }

       if (!clicked) {
           mediaRecorder.start();
           osc.start(0);
           e.target.innerHTML = "Stop recording";
           clicked = true;
         } else {
           mediaRecorder.requestData();
           mediaRecorder.stop();
           osc.stop(0);
           e.target.disabled = true;
         }
     });