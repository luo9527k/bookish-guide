let bigEye = document.getElementById('bigEye');
let eyeball = document.getElementById('eyeball');
let eyeFilter = document.getElementById('eyeFilter');
let eyeballChart = echarts.init(eyeball);
let leftRotSize = 0;
let ballSize = 0;
let ballColor = 'transparent'
let rotTimer;
let sleepTimer;
let isSleep = true; // 是否处于休眠状态
// 画眼球
function getEyeballChart() {
    eyeballChart.setOption({
        series: [
            {
                type: 'gauge',
                radius: '-20%',
                clockwise: false,
                startAngle: `${0 + leftRotSize * 5}`,
                endAngle: `${270 + leftRotSize * 5}`,
                splitNumber: 3,
                detail: false,
                axisLine: {
                    show: false,
                },
                axisTick: false,
                splitLine: {
                    show: true,
                    length: ballSize,
                    lineStyle: {
                        shadowBlur: 20,
                        shadowColor: ballColor,
                        shadowOffsetY: '0',
                        color: ballColor,
                        width: 4,
                    }
                },
                axisLabel: false
            },
            {
                type: 'gauge',
                radius: '-20%',
                clockwise: false,
                startAngle: `${45 + leftRotSize * 5}`,
                endAngle: `${315 + leftRotSize * 5}`,
                splitNumber: 3,
                detail: false,
                axisLine: {
                    show: false,
                },
                axisTick: false,
                splitLine: {
                    show: true,
                    length: ballSize,
                    lineStyle: {
                        shadowBlur: 20,
                        shadowColor: ballColor,
                        shadowOffsetY: '0',
                        color: ballColor,
                        width: 4,
                    }
                },
                axisLabel: false
            }
        ]
    })
}

// 休眠
function toSleep() {
    isSleep = true;
    clearInterval(rotTimer);
    rotTimer = setInterval(() => {
        getEyeballChart()
        if (ballSize > 0) {
            ballSize -= 0.1;
        } else {
            bigEye.className = 'eyeSocket eyeSocketSleeping'
        }
        leftRotSize === 360 ? (leftRotSize = 0) : (leftRotSize += 0.1);
    }, 10);
    document.body.removeEventListener('mousemove', focusOnMouse);
    bigEye.style.transform = `rotateY(0deg) rotateX(0deg)`;
    eyeball.style.transform = `translate(0px, 0px)`;
}

// 唤醒
function clickToWeakup() {
    isSleep = false;
    eyeFilter.style.opacity = '1'
    eyeFilter.className = bigEye.className = 'eyeSocket eyeSocketLooking'
    setAngry();
    clearInterval(rotTimer);
    rotTimer = setInterval(() => {
        getEyeballChart();
        ballSize <= 50 && (ballSize += 1);
        leftRotSize === 360 ? (leftRotSize = 0) : (leftRotSize += 0.5);
    }, 10);
}

bigEye.addEventListener('click', () => {
    if (!isSleep) return;
    clickToWeakup();
})
bigEye.addEventListener('webkitAnimationEnd', () => {
    new Promise(res => {
        clearInterval(rotTimer);
        rotTimer = setInterval(() => {
            getEyeballChart()
            ballSize > 0 && (ballSize -= 0.5);
            leftRotSize === 360 ? (leftRotSize = 0) : (leftRotSize += 0.1);
            if (ballSize === 0) {
                clearInterval(rotTimer);

                res();
            }
        }, 10);
    }).then(() => {
        eyeFilter.style.opacity = '0'
        eyeFilter.className = bigEye.className = 'eyeSocket';
        setNormal();
        document.body.addEventListener('mousemove', focusOnMouse);
        rotTimer = setInterval(() => {
            getEyeballChart()
            ballSize <= 12 && (ballSize += 0.1);
            leftRotSize === 360 ? (leftRotSize = 0) : (leftRotSize += 0.1);
        }, 10);
    })
})

// 生气模式
function setAngry() {
    document.body.style.setProperty('--c-eyeSocket', 'rgb(255,187,255)')
    document.body.style.setProperty('--c-eyeSocket-outer', 'rgb(238,85,135)')
    document.body.style.setProperty('--c-eyeSocket-outer-shadow', 'rgb(255, 60, 86)')
    document.body.style.setProperty('--c-eyeSocket-inner', 'rgb(208,14,74)')
    ballColor = 'rgb(208,14,74)';
}
// 常态模式
function setNormal() {
    document.body.style.setProperty('--c-eyeSocket', 'rgb(41, 104, 217)')
    document.body.style.setProperty('--c-eyeSocket-outer', '#02ffff')
    document.body.style.setProperty('--c-eyeSocket-outer-shadow', 'transparent')
    document.body.style.setProperty('--c-eyeSocket-inner', 'rgb(35, 22, 140)')
    ballColor = 'rgb(0,238,255)';
}

// 关注鼠标
function focusOnMouse(e) {
    // 视口尺寸
    let clientWidth = document.body.clientWidth;
    let clientHeight = document.body.clientHeight;
    // 原点，即bigEye中心位置，页面中心
    let origin = [clientWidth / 2, clientHeight / 2];
    // 鼠标坐标
    let mouseCoords = [e.clientX - origin[0], origin[1] - e.clientY];
    let eyeXDeg = mouseCoords[1] / clientHeight * 80;
    let eyeYDeg = mouseCoords[0] / clientWidth * 60;
    bigEye.style.transform = `rotateY(${eyeYDeg}deg) rotateX(${eyeXDeg}deg)`;
    eyeball.style.transform = `translate(${eyeYDeg / 1.5}px, ${-eyeXDeg / 1.5}px)`;
    // 设置休眠
    if (sleepTimer) clearTimeout(sleepTimer);
    sleepTimer = setTimeout(() => {
        toSleep();
    }, 30000);
}