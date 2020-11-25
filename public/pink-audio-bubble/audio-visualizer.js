class AudioVisualizer {
  constructor(props) {
    const {size, draw} = props;
    this.size = size;
    this.draw = draw;

    this.source = null;
    this.id = 0;
    this.ac = new (window.AudioContext || window.webkitAudioContext)();
    this.analyser = this.ac.createAnalyser();
    // 当执行快速傅里叶变换（Fast Fourier Transfor (FFT)）时，这些（信号）样本被用来获取频域数据。
    this.analyser.fftsize = this.size * 2;

    // an AudioNode that represents a change in volume.
    this.gainNode = this.ac.createGain();
    // Allows us to connect the output of this node to be input into another node, either as audio data or as the value of an AudioParam.
    this.gainNode.connect(this.ac.destination);

    this.analyser.connect(this.gainNode);

    this.xhr = new XMLHttpRequest;

    this.fixBug();
    this.visualizer();
  }

  fixBug() {
    // 解决 Chrome 66之后高版本中AudioContext被强行suspend的问题
    if(typeof AudioContext != "undefined" || typeof webkitAudioContext != "undefined") {
      const resumeAudio = function() {
        if(typeof this.ac == "undefined" || this.ac == null) return;
        if(this.ac.state == "suspended") this.ac.resume();
        document.removeEventListener("click", resumeAudio);
      };
      document.addEventListener("click", resumeAudio);
    }
  }

  /********** load -> decode -> paly **********/

  load(url, callback) {
    // Aborts the request if it has already been sent.
    this.xhr.abort();
    this.xhr.open("GET", url);
    this.xhr.responseType = "arraybuffer";
    const self = this;
    this.xhr.onload = () => {
      callback(self.xhr.response);
    }
    this.xhr.send();
  }

  decode(arraybuffer, callback) {
    // ArrayBuffer is loaded from XMLHttpRequest and FileReader
    this.ac.decodeAudioData(arraybuffer).then((buffer) => {
      callback(buffer);
    }).catch((err) => {
      console.log(err);
    })
  }

  play(path) {
    let n = ++this.id;
    const self = this;
    self.source && self.source[self.source.stop ? "stop" : "noteOff"]();
    if (path instanceof ArrayBuffer) {
      self.decode(path, (buffer) => {
        if (n !== self.id) return ;
        this.inputBufferSource(buffer);
      })
    } else {
      self.load(path, (arraybuffer) => {
        if (n !== this.id) return ;
        self.decode(arraybuffer, (buffer) => {
          if (n !== self.id) return ;
          this.inputBufferSource(buffer);
        })
      })
    }
  }
  
  inputBufferSource(buffer) {
    const self = this;
    const bufferSource = this.ac.createBufferSource();
    bufferSource.buffer = buffer;
    bufferSource.loop = true;
    bufferSource.connect(self.analyser);
    bufferSource[bufferSource.start ? "start" : "nodeOn"](0);
    self.source = bufferSource;
  }

  changeVolume(percent) {
    this.gainNode.gain.value = percent * percent;
  }

  visualizer() {
    const self = this;
    const arr = new Uint8Array(self.analyser.frequencyBinCount);
    requestAnimationFrame = window.requestAnimationFrame ||
      window.webkitrequestAnimationFrame ||
      window.mozrequestAnimationFrame; // 兼容
    function fn() {
      self.analyser.getByteFrequencyData(arr);
      if (Array.isArray(self.draw)) {
        self.draw.map(item => {
          item(arr);
        })
      } else {
        self.draw(arr);
      }
      requestAnimationFrame(fn);
    }
    requestAnimationFrame(fn);
  }
}
