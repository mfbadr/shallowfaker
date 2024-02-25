 
// Setup function runs once at the beginning
const everyEmoji = ["✌","😂","😝","😁","😱","👉","🙌","🍻","🔥","🌈","☀","🎈","🌹","💄","🎀","⚽","🎾","🏁","😡","👿","🐻","🐶","🐬","🐟","🍀","👀","🚗","🍎","💝","💙","👌","❤","😍","😉","😓","😳","💪","💩","🍸","🔑","💖","🌟","🎉","🌺","🎶","👠","🏈","⚾","🏆","👽","💀","🐵","🐮","🐩","🐎","💣","👃","👂","🍓","💘","💜","👊","💋","😘","😜","😵","🙏","👋","🚽","💃","💎","🚀","🌙","🎁","⛄","🌊","⛵","🏀","🎱","💰","👶","👸","🐰","🐷","🐍","🐫","🔫","👄","🚲","🍉","💛","💚"];
let video;
let facemesh;
let audio;
let faces = []; 
let leftEyeEmoji = {};
let leftEyeActive;
let rightEyeEmoji = {};
let rightEyeActive;
let mouthEmoji = {};
let mouthAcitve;
let eyebrowEmoji = {};
let eyebrowActive;
let faceActive;
let faceEmoji = {};
let emojiSize = 20;
let showVideo;

function preload(){
  facemesh = ml5.facemesh();
}

function gotFace(results){
  faces = results;
}

var go = false;
function ready(){
  go = true;
}


function makeOneSelect(label, target, options, x, y, defaultValue, active){
  const labelElement = createP(label);
  labelElement.position(10, y);
  labelElement.style('color', 'white');
  labelElement.style('background-color', 'black');
  active.position(x-10, y + 20);
  target.position(10 + x, y + 20);
  options.forEach((e) => target.option(e));
  target.selected(defaultValue);
}
function setUpSelects(){
  fill(0)
  console.log('setting up selects')
  


  const selectOffset = 95;
  // Left Eye Emoji Select
  // const leftEyeEmojiLabel = createP('Left Eye');
  // leftEyeEmojiLabel.position(10, 10);
  // leftEyeEmojiLabel.style('color', 'white');
  // leftEyeEmojiLabel.style('background-color', 'black');

  // leftEyeEmoji = createSelect();
  // leftEyeEmoji.position(selectOffset, 30);
  // everyEmoji.forEach((e) => leftEyeEmoji.option(e));
  // leftEyeEmoji.selected('👁');

  leftEyeEmoji = createSelect();
  leftEyeActive = createCheckbox('', true);
  makeOneSelect('Left Eye', leftEyeEmoji, everyEmoji, selectOffset, 30, '👁', leftEyeActive)

  rightEyeEmoji = createSelect();
  rightEyeActive = createCheckbox('', true);
  makeOneSelect('Right Eye', rightEyeEmoji, everyEmoji, selectOffset, 80, '👁', rightEyeActive)

  mouthEmoji = createSelect();
  mouthAcitve = createCheckbox('', true);
  makeOneSelect('Mouth', mouthEmoji, everyEmoji, selectOffset, 130,  '👄', mouthAcitve)

  eyebrowEmoji = createSelect();
  eyebrowActive = createCheckbox('', true);
  makeOneSelect('Eyebrow', eyebrowEmoji, everyEmoji, selectOffset, 180,  '✨', eyebrowActive)

  faceEmoji = createSelect();
  faceActive = createCheckbox('', true);
  makeOneSelect('Face', faceEmoji, everyEmoji, selectOffset, 230,  '👩', faceActive)


  const showVideoLabel = createP('Show Video');
  showVideoLabel.position(10, 260);
  showVideoLabel.style('color', 'white');
  showVideoLabel.style('background-color', 'black');
  showVideo = createCheckbox('', true);
  showVideo.position(selectOffset - 10, 280);

  emojiSize = createSlider(5, 100, 20, 1);
  emojiSize.position(10, 330);
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  video = createCapture(VIDEO, ready);
  setUpSelects(); 
  video.hide();
  facemesh.detectStart(video, gotFace)
}

function draw() {
  const radius = 10;
  if(!go){
    return;
  }
  loadPixels();
  background(0);

  if(showVideo.checked()){
    image(video, 0, 0, windowWidth, windowHeight, 0, 0, video.width, video.height, CENTER)
  }
  for (let face of faces) {
  //   face.keypoints.forEach((kp,i) => {
  //     const x = kp.x * (windowWidth/video.width);
  //     const y = kp.y * (windowHeight/video.height);
  //     console.log(`color at ${x}, ${y} is ${get(x, y)}`)
  //     const colorAtTarget = get(x, y);
  //     fill(colorAtTarget)
  //     const zScaled = map(kp.z, 0, 100, .5, 1)
  //     rect(x, y, 25 * zScaled)
  //   })


  textSize(emojiSize.value());


  if(faceActive.checked()){
    makeFeature(faceEmoji.selected(), face.keypoints)
  }

  if(leftEyeActive.checked()){
    makeFeature(leftEyeEmoji.selected(), face.leftEye)

  }
  if(rightEyeActive.checked()){
    makeFeature(rightEyeEmoji.selected(), face.rightEye)
  }
  if(mouthAcitve.checked()){

    makeFeature(mouthEmoji.selected(), face.lips)
  } 
  if(eyebrowActive.checked()) {
    makeFeature(eyebrowEmoji.selected(), face.leftEyebrow)
    makeFeature(eyebrowEmoji.selected(), face.rightEyebrow)
  }  
      function makeFeature(emoji, feature){
        feature.forEach((p) => {
          const x = p.x * (windowWidth/video.width);
          const y = p.y * (windowHeight/video.height);
        text(emoji, x, y)
      })
    }
  }
}



