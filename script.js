﻿const sounds = [
    { name: "1장(1) [결혼식] 욕망의 정점", file: "1장(1) [결혼식] 욕망의 정점.mp3" },
    { name: "1장(2) 기억조작", file: "1장(2) 기억조작.mp3" },
    { name: "1장(3) [M,계] 오르골의 비밀", file: "1장(3) [M,계] 오르골의 비밀.mp3" },
    { name: "1장(4) 비와 바람 소리", file: "1장(4) 비와 바람 소리.mp3" },
    { name: "1장(5) 암전", file: "1장(5) 암전.mp3" },
    { name: "2장(1) [암전] 힘든결정", file: "2장(1) [암전] 힘든결정.mp3" },
    { name: "3장(1) [암전] 의혹", file: "3장(1) [암전] 의혹.mp3" },
    { name: "4장(1) summer overture", file: "4장(1) summer overture.mp3" },
    { name: "4장(2) [암전] 그 집에 얽힌 슬픈 사연", file: "4장(2) [암전] 그 집에 얽힌 슬픈 사연.mp3" },
    { name: "5장(1) [암전] 뒤틀림, 아이 울음 소리", file: "5장(1) [암전] 뒤틀림, 아이 울음 소리.mp3" },
    { name: "5장(2) 아이 울음 소리", file: "5장(2) 아이 울음 소리.mp3" },
    { name: "6장(1) [독백] Arvo Part, Cantus in memoriam Benjamin Britten", file: "6장(1) [독백] Arvo Part, Cantus in memoriam Benjamin Britten.mp3" },
    { name: "7장(1) Sad Cinematic Emotional Intro", file: "7장(1) Sad Cinematic Emotional Intro.mp3" },
    { name: "7장(2) [까마귀]", file: "7장(2) [까마귀].mp3" },
    { name: "7장(3) [아이 울음 소리]", file: "7장(3) [아이 울음 소리].mp3" },
    { name: "커튼콜 곡", file: "커튼콜 곡.mp3" }
];

const soundButtons = document.getElementById('soundButtons');

const audioElements = sounds.map(sound => {
    const audio = new Audio(sound.file);
    audio.loop = false;
    return audio;
});

function toggleSound(index) {
    const button = document.querySelectorAll('.play-button')[index];
    const icon = button.querySelector('i');
    const audio = audioElements[index];

    if (audio.paused) {
        audio.play();
        button.classList.add('playing');
        icon.classList.remove('fa-play');
        icon.classList.add('fa-pause');
        updateTimeline(index);
    } else {
        audio.pause();
        button.classList.remove('playing');
        icon.classList.remove('fa-pause');
        icon.classList.add('fa-play');
    }
}

function updateTimeline(index) {
    const audio = audioElements[index];
    const timelineSlider = document.querySelectorAll('.timeline-slider')[index];
    const timeDisplay = document.querySelectorAll('.time-display')[index];

    audio.addEventListener('timeupdate', () => {
        const currentTime = audio.currentTime;
        const duration = audio.duration;
        const percentage = (currentTime / duration) * 100;
        timelineSlider.value = percentage;
        timeDisplay.textContent = `${formatTime(currentTime)} / ${formatTime(duration)}`;
    });

    timelineSlider.addEventListener('input', () => {
        const time = audio.duration * (timelineSlider.value / 100);
        audio.currentTime = time;
    });
}

function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

function changeVolume(index, volume) {
    const normalizedVolume = volume / 100;  // 0-100 값을 0-1 범위로 정규화
    audioElements[index].volume = normalizedVolume;
    const volumeDisplay = document.querySelectorAll('.volume-display')[index];
    volumeDisplay.textContent = Math.round(volume);  // 반올림된 정수 값 표시
}

sounds.forEach((sound, index) => {
    const button = document.createElement('div');
    button.className = 'sound-button';
    button.innerHTML = `
        <div class="button-group">
            <button class="play-button" onclick="toggleSound(${index})">
                <i class="fas fa-play"></i>
            </button>
            <button class="refresh-button" onclick="refreshSound(${index})">
                <i class="fas fa-sync-alt"></i>
            </button>
        </div>
        <div class="sound-info">
            <span class="sound-name">${sound.name}</span>
    <div class="timeline-container">
        <div class="timeline-marks"></div>
            <div class="timeline">
                <input type="range" min="0" max="100" value="0" class="timeline-slider">
            </div>
                <span class="time-display">0:00 / 0:00</span>
                <button class="add-mark-button">+</button>
            </div>
        </div>
        <div class="volume-control">
            <input type="range" min="0" max="100" step="1" value="100" oninput="changeVolume(${index}, this.value)">
            <span class="volume-display">100</span>
        </div>
    `;
    document.querySelector('.container').appendChild(button);
});

function addTouchSupport() {
    const buttons = document.querySelectorAll('.play-button');
    buttons.forEach(button => {
        button.addEventListener('touchstart', function(e) {
            e.preventDefault();
            this.click();
        });
    });
}

// 모든 버튼이 생성된 후에 이 함수를 호출해야 해
addTouchSupport();


function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
    
    // 다크모드 상태에 따라 메타 태그의 theme-color 변경
    const metaThemeColor = document.body.classList.contains('dark-mode') ? '#121212' : '#ffffff';
    const themeColorMeta = document.querySelector('meta[name="theme-color"]');
    themeColorMeta.setAttribute('content', metaThemeColor);
}


// 페이지 로드 시 다크모드 상태 확인
document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
    }
});

// 단축키 이벤트 리스너
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === 'b') {
        e.preventDefault();
        toggleDarkMode();
    }
});

// 새로고침 함수
function refreshSound(index) {
    const audio = audioElements[index];
    audio.currentTime = 0;
    if (!audio.paused) {
        audio.pause();
        audio.play();
    }
    updateTimeline(index);
}

function addMark(index) {
    const audio = audioElements[index];
    const marksContainer = document.querySelectorAll('.timeline-marks')[index];
    const currentTime = audio.currentTime;
    const duration = audio.duration;
    const percentage = (currentTime / duration) * 100;

    const mark = document.createElement('div');
    mark.className = 'timeline-mark';
    mark.style.left = `${percentage}%`;

    mark.addEventListener('click', (e) => {
        e.stopPropagation();
        removeMark(index, mark);
    });
    marksContainer.appendChild(mark);

    // 마크 정보 저장
    const marks = JSON.parse(localStorage.getItem(`marks-${index}`)) || [];
    marks.push({time: currentTime, position: percentage});
    localStorage.setItem(`marks-${index}`, JSON.stringify(marks));
}

function removeMark(index, markElement) {
    const marksContainer = document.querySelectorAll('.timeline-marks')[index];
    marksContainer.removeChild(markElement);

    // 저장된 마크 정보에서도 제거
    const marks = JSON.parse(localStorage.getItem(`marks-${index}`)) || [];
    const position = parseFloat(markElement.style.left);
    const updatedMarks = marks.filter(mark => Math.abs(mark.position - position) > 0.1);
    localStorage.setItem(`marks-${index}`, JSON.stringify(updatedMarks));
}

function loadMarks(index) {
    const marksContainer = document.querySelectorAll('.timeline-marks')[index];
    const marks = JSON.parse(localStorage.getItem(`marks-${index}`)) || [];
    
    marks.forEach(mark => {
        const markElement = document.createElement('div');
        markElement.className = 'timeline-mark';
        markElement.style.left = `${mark.position}%`;
        markElement.addEventListener('click', (e) => {
            e.stopPropagation();
            removeMark(index, markElement);
        });
        marksContainer.appendChild(markElement);
    });
}

// 페이지 로드 시 저장된 마크 불러오기
document.addEventListener('DOMContentLoaded', () => {
    audioElements.forEach((_, index) => {
        loadMarks(index);
    });

    // 마크 추가 버튼에 이벤트 리스너 연결
    document.querySelectorAll('.add-mark-button').forEach((button, index) => {
        button.addEventListener('click', () => addMark(index));
    });
});
