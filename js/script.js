  
// clock
(function(){
  // 圆 = 360 度, 360度 分成 60 分钟 or 秒 (360/60 = 6度 === 1秒 or 分钟)
  const deg = 6
  const hr = document.querySelector('.hr')
  const mn = document.querySelector('.mn')
  const sc = document.querySelector('.sc')
  
  function getTime(){
    let day = new Date()
    //  360 / 12 小时 = 30度 === 1小时
    let hh = day.getHours() * 30
    let mm = day.getMinutes() * deg
    let ss = day.getSeconds() * deg
    // 小时 的角度 受 分钟影响
    // n小时的度数 + (n分钟 / 12小时) = 目前小时的 角度
    hr.style.transform = `rotate(${hh + ( mm / 12 )}deg)`
    mn.style.transform = `rotate(${mm}deg)`
    sc.style.transform = `rotate(${ss}deg)`
  }
  getTime()
  setInterval(getTime,1000)
})();


// timer
let n
let sec
function setTimer(){
  let time = document.querySelector('.timer .current-time')
  let tt = document.querySelector('.tt')
  let dot = document.querySelector('.timer .dot')

  sec = localStorage.getItem('timer') || 1
  n = setInterval(function(){
    let h = mkData(Math.floor(sec / 60 / 60))
    let m = mkData(Math.floor(sec / 60 % 60))
    let s = mkData(Math.floor(sec % 60))

    time.innerHTML = `${h}:${m}:${s}` 
    sec++
    // animate stroke
    tt.style.strokeDashoffset = 1508 - (sec * (1508 / 3600))

  },1000)
  function mkData(val){
    return val < 10? '0'+val : val
  }
}

// buttons (開始 終了)
(function(){
  const start = document.querySelector('.buttons .start')
  const stop = document.querySelector('.buttons .stop')
  start.addEventListener('click',function() {
    this.innerHTML = this.innerHTML === '休憩' ? "開始":"休憩" 
    this.style.transform = 'translateX(-80px)'
    this.nextElementSibling.style.transform = 'translateX(80px)'
    this.nextElementSibling.style.opacity = 1
    // this.innerHTML = '休憩'

    document.querySelector('.clock').style.display = 'none'
    document.querySelector('.timer').style.display = 'flex'
    setTimer()
  })
  stop.addEventListener('click',function(){
    this.style.transform = 'translateX(0)'
    this.style.opacity = 0
    this.previousElementSibling.style.transform = 'translateX(0)'

    document.querySelector('.clock').style.display = 'flex'
    document.querySelector('.timer').style.display = 'none'
    // stop timer
    localStorage.setItem('timer',sec)
    clearInterval(n)
  })
})();


// game animate
(function(){
  const cv = document.querySelector('#canvas1')
  const ctx = cv.getContext('2d')
  let gameSpeed = 0.3

  const CANVAS_WIDTH = cv.width = 2000
  const CANVAS_HEIGHT = cv.height = 222 

  const layer_width = 2232
  const layer_height = 222

  const layer = new Image()
  layer.src = '../assets/layer.png'

  const char = new Image()
  char.src = '../assets/char.png'

  const spriteWidth = 32
  const spriteHeight = 32
  let frameX = 0
  let gameFrame = 0
  const loopWait = 13
  let position = 0

  window.addEventListener('load',()=> {
    function animate(){
      // reset cv
      ctx.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT)
    
      if (position < -layer_width) position = 0
      ctx.drawImage(layer,position,0,layer_width,layer_height)
      ctx.drawImage(layer,position + layer_width,0,layer_width,layer_height)
      position-= gameSpeed
    
      ctx.drawImage(char,frameX * spriteWidth,2 *spriteHeight,spriteWidth,spriteHeight,150,85,104,104)  
      if (gameFrame % loopWait === 0) {
        if (frameX > 2) frameX = 0
        else frameX++
      }
      gameFrame++  
    
    
      requestAnimationFrame(animate)
    }
    animate()
  })
})();


