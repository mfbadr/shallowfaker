 
// Setup function runs once at the beginning
const everyEmoji = ["✌","😂","😝","😁","😱","👉","🙌","🍻","🔥","🌈","☀","🎈","🌹","💄","🎀","⚽","🎾","🏁","😡","👿","🐻","🐶","🐬","🐟","🍀","👀","🚗","🍎","💝","💙","👌","❤","😍","😉","😓","😳","💪","💩","🍸","🔑","💖","🌟","🎉","🌺","🎶","👠","🏈","⚾","🏆","👽","💀","🐵","🐮","🐩","🐎","💣","👃","👂","🍓","💘","💜","👊","💋","😘","😜","😵","🙏","👋","🚽","💃","💎","🚀","🌙","🎁","⛄","🌊","⛵","🏀","🎱","💰","👶","👸","🐰","🐷","🐍","🐫","🔫","👄","🚲","🍉","💛","💚"];
const badEmoji = ["😱","🍻","🔥","🎈","🌹","💄","🎀","😡","👿","😓","😳","💩","🍸","🔑","🌟",,"🎶","👠","👽","💀","💣","😵","🙏","👋","🚽","💎","🚀","🌙","🎱","💰","🐷","🐍","🔫","👄"];
let video;
let facemesh;
let audio;
let faces = []; 
let leftEyeEmoji = '👁';
let leftEyeActive;
let leftEyeSize;

let rightEyeEmoji = '👁';
let rightEyeActive;
let rightEyeSize;

let mouthEmoji = '👄';
let mouthAcitve;
let mouthSize;

let eyebrowEmoji = {};
let eyebrowActive;
let eyebrowSize;

let faceActive;
let faceEmoji = {};
let faceSize;

let noseEmoji = '👃';

let showVideo;


const foodChoices =  ['🍕', '🍔']


let foods = [];

let scores = 0;


function preload(){
  facemesh = ml5.facemesh({
    flipHorizontal: true
  });
}

function gotFace(results){
  faces = results;
}

var go = false;
function ready(){
  go = true;
}


function makeOneSelect(label, target, options, x, y, defaultValue, active, size){
  const labelElement = createP(label);
  labelElement.position(10, y);
  labelElement.style('color', 'white');
  labelElement.style('background-color', 'black');
  size.position(60 + x, y + 20);
  active.position(x-10, y + 20);
  target.position(10 + x, y + 20);
  options.forEach((e) => target.option(e));
  target.selected(defaultValue);
}
function setUpSelects(){
  fill(0)

  const selectOffset = 95;

  leftEyeEmoji = createSelect();
  leftEyeActive = createCheckbox('', true);
  leftEyeSize = createSlider(5, 100, 20, 1);
  makeOneSelect('Left Eye', leftEyeEmoji, everyEmoji, selectOffset, 30, '👁', leftEyeActive, leftEyeSize)

  rightEyeEmoji = createSelect();
  rightEyeActive = createCheckbox('', true);
  rightEyeSize = createSlider(5, 100, 20, 1);
  makeOneSelect('Right Eye', rightEyeEmoji, everyEmoji, selectOffset, 80, '👁', rightEyeActive, rightEyeSize)

  mouthEmoji = createSelect();
  mouthAcitve = createCheckbox('', true);
  mouthSize = createSlider(5, 100, 20, 1);
  makeOneSelect('Mouth', mouthEmoji, everyEmoji, selectOffset, 130,  '👄', mouthAcitve, mouthSize)

  eyebrowEmoji = createSelect();
  eyebrowActive = createCheckbox('', true);
  eyebrowSize = createSlider(5, 100, 20, 1);
  makeOneSelect('Eyebrow', eyebrowEmoji, everyEmoji, selectOffset, 180,  '✨', eyebrowActive, eyebrowSize)

  faceEmoji = createSelect();
  faceActive = createCheckbox('', true);
  faceSize = createSlider(5, 100, 20, 1);
  makeOneSelect('Face', faceEmoji, everyEmoji, selectOffset, 230,  '👩', faceActive, faceSize)

  const showVideoLabel = createP('Show Video');
  showVideoLabel.position(10, 260);
  showVideoLabel.style('color', 'white');
  showVideoLabel.style('background-color', 'black');
  showVideo = createCheckbox('', true);
  showVideo.position(selectOffset - 10, 280);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  video = createCapture(VIDEO, ready);
  video.hide();
  facemesh.detectStart(video, gotFace)
  // setUpSelects(); 

  setInterval(addNewFood, 1500);
}

function addNewFood() {
  const newFood = foodChoices[Math.floor(Math.random() * foodChoices.length)];
  let y = Math.random() * windowHeight;
  
  const lineLength = Math.floor(Math.random() * 50) + 25;

  
  for (let i = 0; i < lineLength; i++) {
    const factor = .5 - Math.random();
    y = y + (factor * 25);
    foods.push({
      y: y,
      x: windowWidth + (i * 10),
      symbol: '❄️'
    })
  }
}


function draw() {
  if(!go){
    return;
  }
  background(0);



  fill(255);
  textSize(32);
  text(`Score: ${scores}`, 10, 30);


  if(scores > 0 && scores % 100 === 0){
    const newEmoji = badEmoji[Math.floor(Math.random() * badEmoji.length)];
    leftEyeEmoji = newEmoji;
    rightEyeEmoji = newEmoji;
  }
  if(scores > 250) {
    mouthEmoji = '🫦';
  }
  if(scores > 500) {
    mouthEmoji = '👅';
  }


  for (let face of faces) {

    function makeFace(){
      textSize(60);
      const nose = face.keypoints[5];
      const leftEye = face.keypoints[362];
      const rightEye = face.keypoints[133];
      const lips = face.keypoints[13];

      makeFeature(noseEmoji, [nose]);
      makeFeature(leftEyeEmoji, [leftEye]);
      makeFeature(rightEyeEmoji, [rightEye]);
      makeFeature(mouthEmoji, [lips]);


      const noseX = nose.x * (windowWidth/video.width);
      const noseY = nose.y * (windowHeight/video.height);


      foods.forEach((food, i) => {
        textSize(35);
        food.x -= 5;
        text(food.symbol, food.x, food.y);

        const distance = dist(food.x, food.y, noseX, noseY);
        if (food.x < 0) {
          foods.splice(i, 1);
        }

        if(distance < 35){
          foods.splice(i, 1);
          scores += 1;
        }
        
        
      })

    }
    // face.keypoints.forEach((kp,i) => {
    //   const x = kp.x * (windowWidth/video.width);
    //   const y = kp.y * (windowHeight/video.height);
    //   // console.log(`color at ${x}, ${y} is ${get(x, y)}`)
    //   const colorAtTarget = get(x, y);
    //   textSize(20);
    //   fill(266)
    //   const zScaled = map(kp.z, 0, 100, .5, 1)
    //   // rect(x, y, 25 * zScaled)
    //   text(i, x, y)
    // })
    makeFace()




    /**
  if(faceActive.checked()){
    textSize(faceSize.value());
    makeFeature(faceEmoji.selected(), face.keypoints)
  }

  if(leftEyeActive.checked()){
    textSize(leftEyeSize.value());
    makeFeature(leftEyeEmoji.selected(), face.leftEye)

  }
  if(rightEyeActive.checked()){
    textSize(rightEyeSize.value());
    makeFeature(rightEyeEmoji.selected(), face.rightEye)
  }
  if(mouthAcitve.checked()){
    textSize(mouthSize.value());
    makeFeature(mouthEmoji.selected(), face.lips)
  } 
  if(eyebrowActive.checked()) {
    textSize(eyebrowSize.value());
    makeFeature(eyebrowEmoji.selected(), face.leftEyebrow)
    makeFeature(eyebrowEmoji.selected(), face.rightEyebrow)
  }  
   */
  function makeFeature(emoji, feature){
    feature.forEach((p) => {
      const x = p.x * (windowWidth/video.width);
      const y = p.y * (windowHeight/video.height);
      text(emoji, x, y)
    })
  }
  }
}



