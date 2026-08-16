//Landing page+animations...
var textWrapper = document.querySelector('.ml16');
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
var beginBtn=document.querySelector('.begin-btn')
anime.timeline({loop: false})
  .add({
    targets: '.ml16 .letter',
    translateY: [-100,0],
    easing: "easeOutExpo",
    duration: 1400,
    delay: (el, i) => 30 * i,
    complete: function(){
      beginBtn.classList.remove('hidden');
      beginBtn.classList.add('visible');
    }
  }
);
const overlay=document.querySelector('.to-main');
const landingPage=document.querySelector('#landing-page');
const main=document.querySelector('#main');
const gridLines=document.querySelector('#grid-lines')
beginBtn.addEventListener('click',()=>{
  overlay.style.pointerEvents='auto';
  overlay.classList.remove('exit');
  overlay.classList.add('active');

  setTimeout(()=>{
    landingPage.classList.add('invisible');
    main.classList.remove('invisible');

    overlay.classList.remove('active');
    overlay.classList.add('exit');
  },950)

  setTimeout(()=>{
    gridLines.classList.add('reveal');
  },1100);

  setTimeout(()=>{
    overlay.style.pointerEvents='none';
    createGrid();
              
  }, 1550);

  

});
//Main page -commented out for experimention v1
/*const artCanvas = document.getElementById('art-canvas');
let isDrawingState = false;
let currentActiveColor = '#D14949';
let currentZoom=1.0;

function buildCanvas(cols = 34, rows = 34) {
    artCanvas.innerHTML = '';
    
    const maxWidth = window.innerWidth * 0.7;
    const maxHeight = window.innerHeight * 0.7;
    
    const sizeFromWidth = Math.floor(maxWidth / cols);
    const sizeFromHeight = Math.floor(maxHeight / rows);
    const basePixelSize = Math.min(sizeFromWidth, sizeFromHeight, 40);
    const pixelSize=Math.max(2, Math.floor(basePixelSize*currentZoom))
    artCanvas.style.gridTemplateColumns = `repeat(${cols}, ${pixelSize}px)`;
    artCanvas.style.gridTemplateRows = `repeat(${rows}, ${pixelSize}px)`;
    
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const pixel = document.createElement('div');
        pixel.classList.add('art-pixel');
            
        if ((r + c) % 2 === 0) {
          pixel.classList.add('bg-dark');
        } else {
            pixel.classList.add('bg-light');
        }
            
        pixel.addEventListener('mousedown', (e) => {
          e.preventDefault();
          isDrawingState = true;
          pixel.style.backgroundColor = currentActiveColor;
        });
            
        pixel.addEventListener('mouseenter', () => {
          if (isDrawingState) {
            pixel.style.backgroundColor = currentActiveColor;
          }
        });
            
        artCanvas.appendChild(pixel);
      }
    }
}

window.addEventListener('mouseup', () => {
    isDrawingState = false;
});

window.addEventListener('wheel',(e)=>{
  if (e.ctrlKey){
    e.preventDefault();

    if (e.deltaY<0){
    currentZoom=Math.min(3.0,currentZoom+0.1);} 
    else {
    currentZoom=Math.max(0.3,currentZoom-0.1);}
    buildCanvas();
  }
  
}, {passive:false});

buildCanvas();*/
//IF ERROR, CHECK FOR SPELLINGS!!!!!! english too complex
const artCanvas=document.getElementById('art-canvas');
const canvasWrap=document.querySelector('.canvas-wrap');
let isDrawingState=false;
let currentActiveColor='#ffffff';
let currentZoom=1.0;
let currentCols=34;
let currentRows=34;

function createGrid(cols=34,rows=34){
  artCanvas.innerHTML='';
  currentCols=cols;
  currentRows=rows;

  for (let r=0; r<rows; r++){
    for(let c=0; c<cols;c++){
      const pixel=document.createElement('div');
      pixel.classList.add('art-pixel');

      if ((r + c) % 2 === 0) {
        pixel.classList.add('bg-dark');
      } else {
        pixel.classList.add('bg-light');
      }
            
      pixel.addEventListener('mousedown', (e) => {
        e.preventDefault();
        isDrawingState = true;
        pixel.style.backgroundColor = currentActiveColor;
      });
            
      pixel.addEventListener('mouseenter', () => {
        if (isDrawingState) {
        pixel.style.backgroundColor = currentActiveColor;
        }
      });
            
      artCanvas.appendChild(pixel);
    }
  }
  updateGridScale();
}

function updateGridScale(){
  const maxWidth=window.innerWidth*0.7;
  const maxHeight=window.innerHeight*0.7
  const sizeFromWidth = Math.floor(maxWidth / currentCols);
  const sizeFromHeight = Math.floor(maxHeight / currentRows);
  const basePixelSize = Math.min(sizeFromWidth, sizeFromHeight, 40);
  const pixelSize=Math.max(2, Math.floor(basePixelSize*currentZoom))
  artCanvas.style.gridTemplateColumns = `repeat(${currentCols}, ${pixelSize}px)`;
  artCanvas.style.gridTemplateRows = `repeat(${currentRows}, ${pixelSize}px)`;
}

window.addEventListener('mouseup',()=>{
  isDrawingState=false;
});

canvasWrap.addEventListener('wheel',(e)=>{
  if (e.ctrlKey){
    e.preventDefault();
    if (e.deltaY<0){
      currentZoom=Math.min(3.0,currentZoom+0.05);
    } else {
      currentZoom=Math.max(0.3,currentZoom-0.05);
    }
    updateGridScale();
  }
}, {passive: false});
createGrid();

//random color palette
const swatchGrid=document.querySelector('.swatch-grid');
const rollBtn=document.querySelector('.roll-btn');
const minBtn=document.querySelector('.min-btn');
const paletteWindow=document.querySelector('.palette-window');


const paletteTypes=['monochrome', 'triangle','analogous', 'complementary', 'retro' ];
function getPalette(count){
  const type=paletteTypes[Math.floor(Math.random()*paletteTypes.length)];
  const baseHue=Math.floor(Math.random()*360);
  const colors=[];

  //debug
  //console.log(type);

  for (let i=0; i<count; i++){
    let h=baseHue;
    let s=70;
    let l=50;
    if(type==='monochrome'){
      s=40+(i*8);
      l=20+(i*(60/count));
    } else if (type==='analogous'){
      h=(baseHue+(i*20))%360;
      s=75;
      l=45+(i*3);
    } else if (type==='complementary'){
      let half=Math.ceil(count/2);
      if (i<half){
        h=baseHue;
        s=80;
        l=75-(i*(45/half));
      } else{
        h= (baseHue+180)%360;
        s=85;
        let rem=count-half;
        let idx=i-half;
        l=70-(idx*(40/rem));
      }
    } else if (type==='retro'){
      let step=i*65;
      h=(baseHue+step)%360;
      s=38+(i*4);
      if (i===0){
        l=88;
        s=20;
      } else if (i===1){
        l=65;
      } else if (i===2){
        l=48;
      } else if (i===3){
        l=32;
      } else{
        l=18;
      }


    } else if (type==='triangle'){
      let step=count/3;
      if (i<step){
        h=baseHue;
        s=80;
        l=75-(i*20);
      } else if (i<step*2){
        let idx=i-Math.floor(step);
        h=(baseHue+120+(idx*15))%360;
        s=80;
        
        l=68-(idx*22);
      } else{
        let idx=i-Math.floor(step*2);
        h=(baseHue+240+(idx*15))%360;
        s=75;
        
        l=55-(idx*22);

      }
    }
    colors.push(`hsl(${h},${s}%,${l}%)`);
  }
  return colors;
}

const noBtn=document.querySelector('.count-btn');
const pMenu=document.querySelector('.count-menu')
const countOpt=document.querySelectorAll('.count-opt')

/*function generatePalette(){
  swatchGrid.innerHTML='';
  const maxColorBoxes=5;
  const colorListArray=getPalette(maxColorBoxes);
  renderColorList(colorListArray);
}*/

let maxColorBoxes=5;

function renderColorList(colorListArray){
  swatchGrid.innerHTML='';
  colorListArray.forEach((hexValue, index)=>{
    const swatch=document.createElement('div');
    currentActiveColor=hexValue;
    swatch.classList.add('color-swatch');
    swatch.style.backgroundColor = hexValue;

    if (index === 0) {
    swatch.classList.add('active-brush');
    currentActiveColor = hexValue;
  }

  swatch.addEventListener('click', () => {
    document.querySelectorAll('.color-swatch').forEach(s => {
      s.classList.remove('active-brush');
    });
    swatch.classList.add('active-brush');
    currentActiveColor = hexValue;
  });

  swatchGrid.appendChild(swatch);
  });

  
}

minBtn.addEventListener('click', () => {
    paletteWindow.classList.toggle('minimized');
});

rollBtn.addEventListener('click',()=>{
  const coloredPixels=document.querySelectorAll('.art-pixel[style*="background-color"]');
  if (coloredPixels.length>0){
    const allPixels=document.querySelectorAll('.art-pixel');
    allPixels.forEach(pixel=>{
      pixel.style.backgroundColor='';
    });
  }
  generatePalette();
}); 

function generatePalette(){
  swatchGrid.innerHTML='';
  const colorListArray= getPalette(maxColorBoxes);
  renderColorList(colorListArray);

}

noBtn.addEventListener('click',(e)=>{
  e.stopPropagation();
  pMenu.classList.toggle('hidden');
});

countOpt.forEach(opt=>{
  opt.addEventListener('click',()=>{
    maxColorBoxes=parseInt(opt.textContent);
    noBtn.textContent=maxColorBoxes;
    pMenu.classList.add('hidden');
    generatePalette();
  });
});

window.addEventListener('click',()=>{
  if (pMenu){
    pMenu.classList.add('hidden');
  }
});

generatePalette();