const sounds = [
    { name: "첫 시작", file: "첫 시작.mp3" },
    { name: "알람소리", file: "알람소리.mp3" },
    { name: "거리--실험실", file: "거리--실험실.mp3" },
    { name: "에너지1", file: "에너지1.mp3" },
    { name: "에너지2", file: "에너지2.mp3" },
    { name: "에너지3", file: "에너지3.mp3" },
    { name: "궤도변경이후", file: "궤도변경이후.mp3" },
    { name: "치지직", file: "치지직.mp3" },
    { name: "회상-시간이 없어", file: "회상-시간이 없어.mp3" },
    { name: "타임머신 완성", file: "타임머신 완성.mp3" },
    { name: "타임머신 작동-과거도착", file: "타임머신 작동-과거도착.mp3" },
    { name: "쿠쿠루삥뽕", file: "쿠쿠루삥뽕.mp3" },
    { name: "삥뽕", file: "삥뽕.mp3" },
    { name: "쿠쿠루_삥뽕", file: "쿠쿠루_삥뽕.mp3" },
    { name: "쿠쿠루", file: "쿠쿠루.mp3" },
    { name: "내선전화기", file: "내선전화기.mp3" },
    { name: "잔소리", file: "잔소리.mp3" },
    { name: "카드키", file: "카드키.mp3" },
    { name: "연민에호소", file: "연민에호소.mp3" },
    { name: "빙신모자빙의", file: "빙신모자빙의.mp3" },
    { name: "공주님-몰입", file: "공주님-몰입.mp3" },
    { name: "어버이-은혜", file: "어버이-은혜.mp3" },
    { name: "침착해(의사)", file: "침착해(의사).mp3" },
    { name: "짠짜라", file: "짠짜라.mp3" },
    { name: "기억삭제", file: "기억삭제.mp3" },
    { name: "시계탑", file: "시계탑.mp3" },
    { name: "과거-현재(타임머신)", file: "과거-현재(타임머신).mp3" },
    { name: "소행성 충돌 해제", file: "소행성 충돌 해제.mp3" },
    { name: "나레이션 전", file: "나레이션 전.mp3" },
    { name: "나레이션", file: "나레이션.mp3" },
    { name: "전화연결음", file: "전화연결음.mp3" },
    { name: "썸남전화(1)", file: "썸남전화(1).mp3" },
    { name: "썸남전화(2)", file: "썸남전화(2).mp3" },
    { name: "국세라 벨소리", file: "국세라 벨소리.mp3" },
    { name: "커튼콜", file: "커튼콜.mp3" },
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
