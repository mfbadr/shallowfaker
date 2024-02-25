 
// Setup function runs once at the beginning
const everyEmoji = ["✌","😂","😝","😁","😱","👉","🙌","🍻","🔥","🌈","☀","🎈","🌹","💄","🎀","⚽","🎾","🏁","😡","👿","🐻","🐶","🐬","🐟","🍀","👀","🚗","🍎","💝","💙","👌","❤","😍","😉","😓","😳","💪","💩","🍸","🔑","💖","🌟","🎉","🌺","🎶","👠","🏈","⚾","🏆","👽","💀","🐵","🐮","🐩","🐎","💣","👃","👂","🍓","💘","💜","👊","💋","😘","😜","😵","🙏","👋","🚽","💃","💎","🚀","🌙","🎁","⛄","🌊","⛵","🏀","🎱","💰","👶","👸","🐰","🐷","🐍","🐫","🔫","👄","🚲","🍉","💛","💚"];
let video;
let facemesh;
let audio;
let faces = []; 

let mic;

let leftEyeEmoji = '👁';
let rightEyeEmoji = '👁';
let mouthEmoji = '👄';
let eyebrowEmoji = '✨';
let faceEmoji = '👩';

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

function setUpSelects(){
  fill(0)
  console.log('setting up selects')
  

  const selectOffset = 95;
  // Left Eye Emoji Select
  const leftEyeEmojiLabel = createP('Left Eye');
  leftEyeEmojiLabel.position(10, 10);
  leftEyeEmojiLabel.style('color', 'white');
  leftEyeEmojiLabel.style('background-color', 'black');

  leftEyeEmoji = createSelect();
  leftEyeEmoji.position(selectOffset, 30);
  everyEmoji.forEach((e) => leftEyeEmoji.option(e));
  leftEyeEmoji.selected('👁');


  // Right Eye Emoji Select
  const rightEyeEmojiLabel = createP('Right Eye');
  rightEyeEmojiLabel.position(10, 60);
  rightEyeEmojiLabel.style('color', 'white');
  rightEyeEmojiLabel.style('background-color', 'black');
  rightEyeEmoji = createSelect();
  rightEyeEmoji.position(selectOffset, 80);
  everyEmoji.forEach((e) => rightEyeEmoji.option(e));
  rightEyeEmoji.selected('👁');

  // Mouth Emoji Select
  const mouthEmojiLabel = createP('Mouth');
  mouthEmojiLabel.position(10, 110);
  mouthEmojiLabel.style('color', 'white');
  mouthEmojiLabel.style('background-color', 'black');
  mouthEmoji = createSelect();
  mouthEmoji.position(selectOffset, 130);
  everyEmoji.forEach((e) => mouthEmoji.option(e));
  mouthEmoji.selected('👄');

  // Eyebrow Emoji Select
  const eyebrowEmojiLabel = createP('Eyebrow');
  eyebrowEmojiLabel.position(10, 160);
  eyebrowEmojiLabel.style('color', 'white');
  eyebrowEmojiLabel.style('background-color', 'black');
  eyebrowEmoji = createSelect();
  eyebrowEmoji.position(selectOffset, 180);
  everyEmoji.forEach((e) => eyebrowEmoji.option(e));
  eyebrowEmoji.selected('✨');

  // Face Emoji Select
  const faceEmojiLabel = createP('Face');
  faceEmojiLabel.position(10, 210);
  faceEmojiLabel.style('color', 'white');
  faceEmojiLabel.style('background-color', 'black');
  faceEmoji = createSelect();
  faceEmoji.position(selectOffset, 230);
  everyEmoji.forEach((e) => faceEmoji.option(e));
  faceEmoji.selected('👩');

  const showVideoLabel = createP('Show Video');
  showVideoLabel.position(10, 260);
  showVideoLabel.style('color', 'white');
  showVideoLabel.style('background-color', 'black');
  showVideo = createSelect();
  showVideo.position(selectOffset, 280);
  showVideo.option('Yes');
  showVideo.option('No');
  showVideo.selected('Yes');

  emojiSize = createSlider(10, 100, 20, 1);
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

  if(showVideo.selected() === 'Yes'){
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


    makeFeature(faceEmoji.selected(), face.keypoints)

    makeFeature(rightEyeEmoji.selected(), face.rightEye)
    makeFeature(leftEyeEmoji.selected(), face.leftEye)
    makeFeature(mouthEmoji.selected(), face.lips)
    makeFeature(eyebrowEmoji.selected(), face.leftEyebrow)
    makeFeature(eyebrowEmoji.selected(), face.rightEyebrow)

      function makeFeature(emoji, feature){
        feature.forEach((p) => {
          const x = p.x * (windowWidth/video.width);
          const y = p.y * (windowHeight/video.height);
        text(emoji, x, y)
      })
    }
  }
}



