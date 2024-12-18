
window.onload = function(){
  const calender = document.querySelector('.calender-day')
  calender.style.opacity = '1'
  calender.style.transform = 'translateY(0px)'
}

const cal = [
  {
    month:1,
    days:31
  },
  {
    month:2,
    days:28
  },
  {
    month:3,
    days:31
  },
  {
    month:4,
    days:30
  },
  {
    month:5,
    days:31
  },
  {
    month:6,
    days:30
  },
  {
    month:7,
    days:31
  },
  {
    month:8,
    days:31
  },
  {
    month:9,
    days:30
  },
  {
    month:10,
    days:31
  },
  {
    month:11,
    days:30
  },
  {
    month:12,
    days:31
  }
]
// get year
const date = new Date()

const months = []
// loop calender
cal.forEach((ele,index) => {
  const days = []
  for (let i = 1; i <= ele.days; i++) {
    days.push(`
    <a href="#" class="rect">
      <span class="info">
        <i class="date">${date.getFullYear()}-${ele.month}-${i}</i>
        <i class="time">0 hr</i>
      </span>
    </a>
      `)
  }

  months.push(`
    <li>
    <h5>${index + 1}月</h5>
    <div class="month-box">
    ${days.join('')}
    </div>
    </li>
      `)
})
const content = document.querySelector('.content')
content.innerHTML = `<ul>${months.join('')}</ul>`