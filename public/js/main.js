// ====================================================
// Game Setup & Initial State
// ====================================================
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 960;
canvas.height = 540;

const mainMenuUI = document.getElementById('main-menu-ui');
const btnStart = document.getElementById('btn-start');
const hudUI = document.getElementById('hud-ui');
const zoneSelectUI = document.getElementById('zone-select-ui');
const settingsUI = document.getElementById('settings-ui');

// เพิ่มโหมด ESCAPE_MODE สำหรับวิ่งหนี
let isPlaying = false;
let gameState = 'MENU'; // MENU, PLAYING, ZONE_SELECT, DIALOG, PAUSED, QUIZ_MODE, GAME_OVER_VICTORY, ESCAPE_MODE

// ====================================================
// ตัวแปรดำเนินเนื้อเรื่อง (Story Progression)
// ====================================================
let currentIsland = 1; // 1 ถึง 4
let totalCorrectAnswers = 0; // สะสมแต้มทั้งเกม
let isDialogShowing = false;
let hasCollectedKnowledge = false;
let isPlayingEscape = false;

// ====================================================
// ระบบสองภาษา (Bilingual System - Localization)
// ====================================================
let currentLanguage = 'th'; // 'th' or 'en'
let activeSpeaker = null; // 'player', 'npc', 'boss'
let activeDialogText = '';
let dialogQueue = [];
let onDialogFinished = null;

const translations = {
    th: {
        gameTitle: "ไร่แดนขอบฟ้า",
        gameSubtitle: "ศึกปัญญาผู้กลืนกินความเขลา",
        btnStart: "เริ่มเกม",
        btnSettings: "ตั้งค่า",
        btnCredits: "ผู้จัดทำ",
        lblBgm: "ระดับเสียงเพลง",
        lblSfx: "ระดับเสียงเอฟเฟกต์",
        btnMute: "ปิดเสียง",
        btnBack: "ย้อนกลับ",
        btnJournal: "สมุดบันทึก (B)",
        btnSettingsHud: "⚙️ ตั้งค่า",
        journalTitle: "📖 สมุดบันทึกไร่แดนขอบฟ้า",
        journalEmpty: "สมุดยังว่างเปล่า... ออกสำรวจเพื่อเก็บความรู้สิ!",
        dialogContinue: "[ กด E เพื่อไปต่อ ]",
        trophyText: "ถ้วยรางวัล",
        endingCongrat: "🏆 ขอแสดงความยินดี 🏆",
        endingRestored: "คุณนำปัญญากลับคืนสู่หมู่บ้านสำเร็จ!",
        endingScore: "คำตอบที่ถูก",
        endingPercent: "คิดเป็น",
        endingSave: "กำลังบันทึกข้อมูล...",
        btnRestart: "เล่นอีกครั้ง",
        txtQNum: "ข้อที่",
        txtTimer: "เวลา",
        txtFeedbackCorrect: "ถูกต้อง!",
        txtFeedbackWrong: "ผิด!",
        txtAlertIsland: "เข้าสู่เกาะที่",
        txtAlertNotReady: "ยังไม่ถึงเวลาเดินทาง! ต้องเรียนรู้และช่วยหมู่บ้านบนเกาะนี้ก่อน!",
        txtNewKnowledge: "บันทึกความรู้ใหม่ลงในสมุดบันทึกแล้ว! (กด B เพื่ออ่าน)",

        // บทสนทนา และข้อมูลความรู้ในสมุด
        npc_island1: "ยินดีต้อนรับสู่พิธีบรรลุนิติภาวะเกษตรกรอายุ 15 ปี! ก่อนเดินทาง เจ้าต้องเรียนรู้ข้อมูลพื้นฐานของดินและเวลาเพาะปลูกก่อนนะ เดินไปที่แสงสีฟ้าตรงนั้นแล้วกด E สำรวจดูสิ!",
        kp_island1: "ดินดีคือหัวใจของการเพาะปลูก! ดินร่วนผสมปุ๋ยคอกระบายน้ำดี เหมาะที่สุด ส่วนเวลาเพาะปลูกต้องเลือกให้สอดคล้องกับพืชแต่ละชนิด และดินทั่วไปควรมีค่า pH อยู่ระหว่าง 5.5 - 7.0 (เป็นกรดอ่อน ๆ ถึงกลาง)",
        demon_appear: "ฮ่า ๆ ๆ! เจ้าพวกมนุษย์ผู้เขลา! ข้าคือปีศาจแห่งปัญญา! ข้าจะกินความรู้ของพวกเจ้า และกลืนกินทุกคนที่ตอบคำถามการเกษตรไม่ได้!",
        npc_island1_escape: "แย่แล้ว! รีบวิ่งหนีไปเกาะพืชพรรณผ่านประตูมิติทางขวาสุดเร็วเข้า! ใช้ความรู้ที่เพิ่งเรียนมาช่วยชาวบ้านที่นั่น!",

        npc_island2: "เกาะพืชพรรณนี้โดนคำสาปดินเปรี้ยว พืชเน่าตายหมด จงค้นหาวิธีแก้แล้วช่วยเราด้วย! ลองเดินไปหาจุดแสงความรู้ด้านขวาดูนะ",
        kp_island2: "วิธีแก้ดินเปรี้ยว (ดินกรดจัด): ให้ใส่ 'ปูนขาว' เพื่อปรับสภาพดินให้เป็นกลางมากขึ้น และหลีกเลี่ยงปุ๋ยเคมีที่เป็นกรด",
        kp_island2_dialog: "คุณได้รับความรู้แล้ว! ชาวบ้านได้ปูนขาวไปฟื้นฟูดินจนพืชเริ่มโต! แต่ปีศาจแห่งปัญญาตามมาแล้ว! ไปประจันหน้ากับมันกันเถอะ!",
        demon_island2: "เจ้าคิดว่าจะรอดพ้นงื้อมือข้าไปได้งั้นรึ? ตอบคำถามเรื่องดินและการเพาะปลูกของข้ามา 20 ข้อซะดี ๆ!!",
        demon_defeat_island2: "หนอยแน่ะ! แกตอบคำถามเรื่องดินได้หมดงั้นรึ?! ฝากไว้ก่อนเถอะ! (ปีศาจล่าถอยไป)",
        npc_island2_escape: "สุดยอดเลย! เจ้าช่วยฟื้นฟูเกาะและไล่มันไปได้ชั่วคราว รีบตามมันไปเกาะฤดูกาลผ่านประตูมิติทางขวาเลย!",

        npc_island3: "ที่นี่เกาะฤดูกาล พายุฝนกระหน่ำหนัก น้ำท่วมแปลงผักหมดแล้ว! เจ้าต้องหาพืชที่ชอบน้ำและทนน้ำท่วมขังเพื่อปลูกในฤดูฝน ลองหาข้อมูลตรงแสงความรู้นะ!",
        kp_island3: "การเพาะปลูกตามฤดูกาล: 'ข้าว' เป็นพืชที่ต้องการน้ำมากและทนน้ำท่วมขังได้ดีที่สุดในฤดูฝน เหมาะปลูกเพื่อหนีภัยน้ำท่วม",
        kp_island3_dialog: "ชาวบ้านหันมาปลูกข้าวรอดจากภัยน้ำท่วมสำเร็จ! แต่ปีศาจแห่งปัญญาโผล่มาอีกแล้ว! เตรียมสู้!",
        demon_island3: "เจ้าเด็กรู้ดี! มาตอบคำถามเรื่องฤดูกาลและการเพาะปลูกของข้าอีก 20 ข้อ! ครั้งนี้ไม่ง่ายแน่!",
        demon_defeat_island3: "เป็นไปไม่ได้! สมองของข้าพ่ายแพ้เด็กอายุ 15 ปีงั้นรึ?! อ๊ากกก! (ปีศาจหนีไปเกาะสุดท้าย)",
        npc_island3_escape: "เก่งมาก! ตามมันไปที่เกาะสุดท้าย 'เกาะแห่งศัตรูพืช' เพื่อจัดการมันอย่างเด็ดขาดเถอะ!",

        npc_island4: "เกาะสุดท้ายนี้โดนฝูงแมลงและโรคพืชระบาดอย่างหนัก! หมู่บ้านกำลังล่มสลาย รีบหาความรู้เรื่องการปราบศัตรูพืชแบบชีวภาพเร็วเข้า!",
        kp_island4: "การควบคุมชีววิธี: ใช้แมลงศัตรูธรรมชาติ เช่น 'แมลงเต่าทอง' กำจัด 'เพลี้ยแป้ง' และหลีกเลี่ยงสารเคมีเพื่อรักษาสมดุลทางนิเวศวิทยา",
        kp_island4_dialog: "เราปล่อยแมลงเต่าทองช่วยปราบเพลี้ยแป้งสำเร็จ! ความสมดุลกลับคืนมาแล้ว ได้เวลาปิดบัญชีกับปีศาจแห่งปัญญา!!",
        demon_island4: "นี่คือจุดจบของเจ้า! ข้าจะทดสอบเจ้าเรื่องศัตรูพืช โรคพืช และวัชพืช! 20 ข้อนี้จะเป็นสุสานของเจ้า!!",
        demon_defeat_island4: "อ๊ากกกก! พลังแห่งความรอบรู้เอาชนะความเขลาของข้าได้โดยสมบูรณ์! ข้าสลายไปแล้ว...!",

        creditsText: "สร้างสรรค์โดย: Senior Full-Stack Game Developer"
    },
    en: {
        gameTitle: "Harvest Frontier Game",
        gameSubtitle: "Battle of the Ignorance Devourer",
        btnStart: "START GAME",
        btnSettings: "SETTINGS",
        btnCredits: "CREDITS",
        lblBgm: "BGM VOLUME",
        lblSfx: "SFX VOLUME",
        btnMute: "MUTE AUDIO",
        btnBack: "BACK",
        btnJournal: "Journal (B)",
        btnSettingsHud: "⚙️ SETTINGS",
        journalTitle: "📖 Harvest Frontier Journal",
        journalEmpty: "No entries yet... Explore to gather knowledge!",
        dialogContinue: "[ Press E to continue ]",
        trophyText: "Trophy",
        endingCongrat: "🏆 CONGRATULATIONS 🏆",
        endingRestored: "You successfully restored wisdom to the village!",
        endingScore: "Correct Answers",
        endingPercent: "Percentage",
        endingSave: "Saving score...",
        btnRestart: "Play Again",
        txtQNum: "Q.",
        txtTimer: "Time",
        txtFeedbackCorrect: "Correct!",
        txtFeedbackWrong: "Wrong!",
        txtAlertIsland: "Entering Island",
        txtAlertNotReady: "Not ready to travel! You must learn and help the village on this island first!",
        txtNewKnowledge: "New knowledge added to journal! (Press B to read)",

        // Dialogue and Knowledge
        npc_island1: "Welcome to the age 15 agricultural rite of passage! Before we begin, you must learn the basics of soil and cultivation. Walk over to that blue light and press E to inspect it!",
        kp_island1: "Good soil is the heart of farming! Loam mixed with manure drains well and is best. Cultivation timing must suit each crop, and normal soil pH should be 5.5 - 7.0 (slightly acidic to neutral).",
        demon_appear: "Ha ha ha! Foolish humans! I am the Wisdom Demon! I shall devour your knowledge and consume anyone who cannot answer my agricultural questions!",
        npc_island1_escape: "Oh no! Hurry, escape to the Vegetation Island through the portal on the far right! Use your knowledge to help the villagers there!",

        npc_island2: "This Vegetation Island is cursed with acidic soil. All crops are rotting and dying. Find a solution and help us! Go search for the knowledge light on the right.",
        kp_island2: "Fixing acidic soil (highly acidic): Apply 'lime' to raise pH and make it more neutral. Avoid using acidic chemical fertilizers.",
        kp_island2_dialog: "You have gained knowledge! The villagers used lime to restore the soil and crops are growing! But the Wisdom Demon has followed us. Go fight it!",
        demon_island2: "Do you think you can escape me? Answer my 20 questions about soil and planting, or prepare to be eaten!!",
        demon_defeat_island2: "Curse you! You answered all the soil questions correctly?! I will be back! (The demon retreats)",
        npc_island2_escape: "Amazing! You restored the island and chased it away for now. Follow it to the Season Island through the portal on the right!",

        npc_island3: "This is Season Island. It is plagued by constant storms and floods! You must find crops that tolerate flooding and love water for the rainy season. Find info at the light!",
        kp_island3: "Seasonal farming: 'Rice' requires a lot of water and tolerates flooding best in the rainy season. It is ideal for flood-prone periods.",
        kp_island3_dialog: "The villagers grew rice and saved their crops from the flood! But the Wisdom Demon has appeared again! Prepare to fight!",
        demon_island3: "You knowledgeable kid! Answer 20 questions about seasons and farming! It won't be easy this time!",
        demon_defeat_island3: "Impossible! My mind defeated by a 15-year-old?! Argh! (The demon flees to the final island)",
        npc_island3_escape: "Great job! Follow it to the final island, the 'Pest Island', to defeat it once and for all!",

        npc_island4: "This final island is severely infested by insect pests and plant diseases! The village is collapsing. Quickly find knowledge on biological pest control!",
        kp_island4: "Biological control: Use natural enemy insects like 'ladybugs' to eliminate 'mealybugs' and avoid chemical pesticides to maintain ecological balance.",
        kp_island4_dialog: "We successfully released ladybugs to control mealybugs! Balance is restored. Time to settle the score with the Wisdom Demon!!",
        demon_island4: "This is your end! I will test you on pests, plant diseases, and weeds! These 20 questions will be your grave!!",
        demon_defeat_island4: "Arghhh! The power of wisdom has completely conquered my ignorance! I am dissolving...!",

        creditsText: "Created by: Senior Full-Stack Game Developer"
    }
};

function setLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('harvest_frontier_lang', lang);

    const t = translations[lang];

    document.getElementById('game-title').innerText = t.gameTitle;
    document.getElementById('game-subtitle').innerText = t.gameSubtitle;
    document.getElementById('btn-start').innerText = t.btnStart;

    document.getElementById('settings-title').innerText = t.btnSettings;
    document.getElementById('lbl-bgm').innerText = t.lblBgm;
    document.getElementById('lbl-sfx').innerText = t.lblSfx;
    document.getElementById('lbl-language').innerText = lang === 'th' ? 'ภาษา' : 'LANGUAGE';
    document.getElementById('btn-mute').innerText = t.btnMute;
    document.getElementById('btn-close-settings').innerText = t.btnBack;
    document.getElementById('btn-menu-settings').innerText = t.btnSettings;
    document.getElementById('btn-credits').innerText = t.btnCredits;

    document.getElementById('btn-journal').innerText = t.btnJournal;
    document.getElementById('btn-settings').innerText = t.btnSettingsHud;

    document.querySelector('.journal-title').innerText = t.journalTitle;
    updateJournalUI();

    document.querySelector('#game-over-ui h2').innerText = t.endingCongrat;
    document.querySelector('#game-over-ui p').innerText = t.endingRestored;
    document.getElementById('btn-restart').innerText = t.btnRestart;

    // อัปเดตข้อความบนปุ่มหลักของดรอปดาวน์
    const btnToggle = document.getElementById('btn-lang-toggle');
    if (btnToggle) {
        btnToggle.innerText = (lang === 'th' ? 'ไทย' : 'EN') + ' ▼';
    }

    // ตั้งคลาส active สำหรับปุ่มตัวเลือกภาษา
    const optTh = document.getElementById('btn-lang-th');
    const optEn = document.getElementById('btn-lang-en');
    if (optTh && optEn) {
        if (lang === 'th') {
            optTh.classList.add('active');
            optEn.classList.remove('active');
        } else {
            optEn.classList.add('active');
            optTh.classList.remove('active');
        }
    }
}

// ====================================================
// ระบบสมุดบันทึก (Encyclopedia / Journal)
// ====================================================
const journalUI = document.getElementById('journal-ui');
const journalContent = document.getElementById('journal-content');
const btnJournal = document.getElementById('btn-journal');
const btnCloseJournal = document.getElementById('btn-close-journal');
let journalEntries = []; // บันทึกเป็นคีย์ 'kp_island1', 'kp_island2'

function toggleJournal() {
    if (gameState === 'PLAYING') {
        gameState = 'PAUSED';
        updateJournalUI();
        journalUI.classList.remove('hidden');
    } else if (!journalUI.classList.contains('hidden')) {
        journalUI.classList.add('hidden');
        if (gameState === 'PAUSED') {
            gameState = 'PLAYING';
            lastTime = 0; // กันเฟรมกระโดด
        }
    }
}

function addJournalEntry(key) {
    if (!journalEntries.includes(key)) {
        journalEntries.push(key);
        keys.right = false;
        keys.left = false;
        alert(translations[currentLanguage].txtNewKnowledge);
    }
}

function updateJournalUI() {
    const t = translations[currentLanguage];
    if (journalEntries.length === 0) {
        journalContent.innerHTML = `<p class="journal-empty">${t.journalEmpty}</p>`;
    } else {
        journalContent.innerHTML = '';
        journalEntries.forEach(key => {
            const p = document.createElement('p');
            p.className = 'journal-entry';
            p.innerText = t[key];
            journalContent.appendChild(p);
        });
    }
}

btnJournal.addEventListener('click', toggleJournal);
btnCloseJournal.addEventListener('click', toggleJournal);

// ====================================================
// ระบบจุดสำรวจความรู้ (Knowledge Point)
// ====================================================
class KnowledgePoint {
    constructor(x, y, key) {
        this.x = x;
        this.y = y;
        this.key = key; // คีย์แปลภาษา เช่น 'kp_island1'
        this.width = 40;
        this.height = 40;
        this.active = true;
    }

    draw(ctx, cameraX) {
        if (!this.active) return;
        ctx.save();
        ctx.fillStyle = '#00BCD4'; // สีฟ้าเรืองแสง
        ctx.globalAlpha = 0.5 + Math.sin(Date.now() / 150) * 0.5; // กระพริบ
        ctx.beginPath();
        ctx.arc(this.x - cameraX + this.width / 2, this.y + this.height / 2, 20, 0, Math.PI * 2);
        ctx.fill();

        ctx.globalAlpha = 1.0;
        ctx.fillStyle = '#fff';
        ctx.font = '10px "Press Start 2P"';
        ctx.textAlign = 'center';
        ctx.fillText('🔍 [E]', this.x - cameraX + this.width / 2, this.y - 10);
        ctx.restore();
    }
}

let knowledgePoints = [];

function setupKnowledgeForIsland() {
    knowledgePoints = [];
    hasCollectedKnowledge = false;
    boss.y = 9999; // ซ่อนบอส

    // วางจุดสำรวจตามเกาะ
    if (currentIsland === 1) {
        knowledgePoints.push(new KnowledgePoint(600, 380, "kp_island1"));
    } else if (currentIsland === 2) {
        knowledgePoints.push(new KnowledgePoint(600, 380, "kp_island2"));
    } else if (currentIsland === 3) {
        knowledgePoints.push(new KnowledgePoint(600, 380, "kp_island3"));
    } else if (currentIsland === 4) {
        knowledgePoints.push(new KnowledgePoint(600, 380, "kp_island4"));
    }
}

// ====================================================
// ระบบจัดการ Boss Quiz
// ====================================================
let quizData = [];
let currentIslandQuestions = [];
let questionsAnsweredInThisIsland = 0;
let quizTimer = 15;
let quizInterval = null;
let isAnswered = false;

const quizUI = document.getElementById('quiz-ui');
const quizQuestion = document.getElementById('quiz-question');
const quizTimerUI = document.getElementById('quiz-timer');
const quizFeedback = document.getElementById('quiz-feedback');
const quizBtns = document.querySelectorAll('.quiz-btn');

function fetchQuestions() {
    fetch('data/questions.json')
        .then(res => res.json())
        .then(data => quizData = data)
        .catch(err => console.error("โหลดข้อมูลล้มเหลว:", err));
}
fetchQuestions();

function startQuiz() {
    gameState = 'QUIZ_MODE';
    keys.right = false; keys.left = false; keys.space = false;
    questionsAnsweredInThisIsland = 0;

    // กรองคำถามสำหรับแต่ละเกาะ
    const category = currentIsland === 2 ? 'soil' : (currentIsland === 3 ? 'seasons' : 'pests');
    const islandQuestions = quizData.filter(q => q.category === category);

    // สับการ์ดคำถามแบบสุ่ม (Shuffle)
    currentIslandQuestions = [...islandQuestions];
    for (let i = currentIslandQuestions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [currentIslandQuestions[i], currentIslandQuestions[j]] = [currentIslandQuestions[j], currentIslandQuestions[i]];
    }

    quizUI.classList.remove('hidden');
    showQuestion();
}

function showQuestion() {
    if (questionsAnsweredInThisIsland >= 20 || currentIslandQuestions.length === 0) {
        endQuiz();
        return;
    }

    isAnswered = false;
    const q = currentIslandQuestions[questionsAnsweredInThisIsland];

    quizUI.dataset.correctIndex = q.answer;

    const questionText = q.question[currentLanguage] || q.question;
    const choices = q.choices[currentLanguage] || q.choices;
    const explanationText = q.explanation[currentLanguage] || q.explanation;

    quizUI.dataset.explanation = explanationText;

    const qNumText = translations[currentLanguage].txtQNum;
    quizQuestion.innerText = `${qNumText} ${questionsAnsweredInThisIsland + 1}/20: ${questionText}`;
    quizFeedback.innerText = "";

    quizBtns.forEach((btn, index) => {
        btn.innerText = choices[index];
        btn.style.backgroundColor = "";
        btn.onclick = () => selectAnswer(index);
    });

    quizTimer = 15;
    const timerText = translations[currentLanguage].txtTimer;
    quizTimerUI.innerText = `${timerText}: ${quizTimer}s`;
    clearInterval(quizInterval);
    quizInterval = setInterval(() => {
        quizTimer--;
        quizTimerUI.innerText = `${timerText}: ${quizTimer}s`;
        if (quizTimer <= 0) {
            clearInterval(quizInterval);
            selectAnswer(-1);
        }
    }, 1000);
}

function selectAnswer(selectedIndex) {
    if (isAnswered) return;
    isAnswered = true;
    clearInterval(quizInterval);

    const correctIndex = parseInt(quizUI.dataset.correctIndex);
    const explanation = quizUI.dataset.explanation;
    const feedbackCorrect = translations[currentLanguage].txtFeedbackCorrect;
    const feedbackWrong = translations[currentLanguage].txtFeedbackWrong;

    quizBtns.forEach((btn, idx) => {
        if (idx === correctIndex) btn.style.backgroundColor = "#4CAF50";
        else if (idx === selectedIndex) btn.style.backgroundColor = "#F44336";
    });

    if (selectedIndex === correctIndex) {
        totalCorrectAnswers++;
        quizFeedback.innerText = feedbackCorrect;
        quizFeedback.style.color = "#4CAF50";
    } else {
        quizFeedback.innerText = `${feedbackWrong} ${explanation}`;
        quizFeedback.style.color = "#F44336";
    }

    setTimeout(() => {
        questionsAnsweredInThisIsland++;
        showQuestion();
    }, 2000);
}

function endQuiz() {
    quizUI.classList.add('hidden');
    boss.y = 9999; // กำจัดบอส

    let defeatText = '';
    if (currentIsland === 2) defeatText = translations[currentLanguage].demon_defeat_island2;
    else if (currentIsland === 3) defeatText = translations[currentLanguage].demon_defeat_island3;
    else if (currentIsland === 4) defeatText = translations[currentLanguage].demon_defeat_island4;

    keys.right = false; keys.left = false; keys.space = false;

    if (currentIsland === 4) {
        dialogQueue = [
            { speaker: 'boss', text: defeatText }
        ];
        onDialogFinished = () => {
            endGameVictory();
        };
        showNextDialog();
    } else {
        let escapeNpcText = '';
        if (currentIsland === 2) escapeNpcText = translations[currentLanguage].npc_island2_escape;
        else if (currentIsland === 3) escapeNpcText = translations[currentLanguage].npc_island3_escape;

        dialogQueue = [
            { speaker: 'boss', text: defeatText },
            { speaker: 'npc', text: escapeNpcText }
        ];
        onDialogFinished = () => {
            startEscapeMode();
        };
        showNextDialog();
    }
}

// ====================================================
// ระบบหลบหนี (Escape Sequence)
// ====================================================
function startEscapeMode() {
    gameState = 'ESCAPE_MODE';
    document.getElementById('escape-overlay').classList.remove('hidden');
}

// ====================================================
// ระบบฉากจบ (Ending & Trophy)
// ====================================================
const gameOverUI = document.getElementById('game-over-ui');

function endGameVictory() {
    gameState = 'GAME_OVER_VICTORY';
    keys.right = false; keys.left = false; keys.space = false;

    // เกาะ 2,3,4 มีควิซรวม 60 ข้อ
    const totalQuestions = 60;
    const percent = Math.floor((totalCorrectAnswers / totalQuestions) * 100);
    let trophy = "Bronze";

    if (percent >= 90) trophy = "Gold";
    else if (percent >= 70) trophy = "Silver";
    else if (percent >= 50) trophy = "Bronze";
    else trophy = "None";

    let displayTrophy = trophy;
    if (currentLanguage === 'th') {
        if (trophy === 'Gold') displayTrophy = 'ถ้วยทอง';
        else if (trophy === 'Silver') displayTrophy = 'ถ้วยเงิน';
        else if (trophy === 'Bronze') displayTrophy = 'ถ้วยทองแดง';
        else displayTrophy = 'ไม่มี';
    }

    const t = translations[currentLanguage];
    document.getElementById('ending-score').innerHTML = `${t.endingScore}: <span style="color: #4CAF50; font-size: 20px;">${totalCorrectAnswers} / ${totalQuestions}</span>`;
    document.getElementById('ending-percent').innerHTML = `${t.endingPercent}: <span style="color: #03A9F4; font-size: 20px;">${percent}%</span>`;
    document.getElementById('ending-trophy').innerText = `${t.trophyText}: ${displayTrophy}`;

    document.getElementById('ending-message').innerText = t.endingSave;
    gameOverUI.classList.remove('hidden');

    if (trophy !== "None") {
        saveScore("Hero", totalCorrectAnswers, trophy);
    } else {
        document.getElementById('ending-message').innerText = currentLanguage === 'th' ? "อย่าเพิ่งท้อนะ กลับไปทบทวนความรู้ในสมุดแล้วลองใหม่ดู!" : "Don't give up! Review your journal and try again!";
    }
}

function saveScore(playerName, score, trophy) {
    fetch('/api/save-game', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ player_name: playerName, score: score, trophy: trophy })
    })
        .then(res => res.json())
        .then(data => {
            document.getElementById('ending-message').innerText = "✅ " + data.message;
        })
        .catch(err => {
            console.error("Save error:", err);
            document.getElementById('ending-message').innerText = currentLanguage === 'th' ? "❌ เกิดข้อผิดพลาดในการบันทึก" : "❌ Error saving progress";
        });
}

document.getElementById('btn-restart').addEventListener('click', () => {
    window.location.reload();
});

// ====================================================
// ระบบจัดการภาพฉากหลัง (Image Loading)
// ====================================================
const bgImage = new Image();
bgImage.src = 'assets/images/bg.jpg';

bgImage.onload = () => {
    setupKnowledgeForIsland(); // วางจุดสำรวจความรู้เริ่มต้น
    requestAnimationFrame(gameLoop);
    bgImage.onload = null; // ป้องกันการเริ่ม Game Loop ซ้ำซ้อนเมื่อโหลดภาพพื้นที่ถัดไป
};

// ====================================================
// ระบบ Dialog & Speech Bubbles บนหัว (Floating Dialog)
// ====================================================
function wrapText(context, text, maxWidth) {
    const lines = [];
    let currentLine = '';

    const isThai = /[\u0e00-\u0e7f]/.test(text);

    if (isThai) {
        for (let i = 0; i < text.length; i++) {
            const char = text[i];
            const testLine = currentLine + char;
            const metrics = context.measureText(testLine);
            if (metrics.width > maxWidth && i > 0) {
                lines.push(currentLine);
                currentLine = char;
            } else {
                currentLine = testLine;
            }
        }
        if (currentLine) {
            lines.push(currentLine);
        }
    } else {
        const words = text.split(' ');
        for (let i = 0; i < words.length; i++) {
            const word = words[i];
            const testLine = currentLine ? currentLine + ' ' + word : word;
            const metrics = context.measureText(testLine);
            if (metrics.width > maxWidth && i > 0) {
                lines.push(currentLine);
                currentLine = word;
            } else {
                currentLine = testLine;
            }
        }
        if (currentLine) {
            lines.push(currentLine);
        }
    }
    return lines;
}

function drawSpeechBubble(text, speakerX, speakerY) {
    ctx.save();
    ctx.font = '10px "Press Start 2P"';

    const maxBubbleWidth = 280;
    const lines = wrapText(ctx, text, maxBubbleWidth - 20);
    const lineHeight = 14;

    // เพิ่มความสูงของกรอบเพื่อเว้นช่องไฟให้กับปุ่มกดไปต่อ [E]
    const bubbleHeight = lines.length * lineHeight + 32;
    const bubbleWidth = maxBubbleWidth;

    let bubbleX = speakerX;
    if (bubbleX - bubbleWidth / 2 < 10) {
        bubbleX = bubbleWidth / 2 + 10;
    }
    if (bubbleX + bubbleWidth / 2 > canvas.width - 10) {
        bubbleX = canvas.width - bubbleWidth / 2 - 10;
    }

    const bubbleY = speakerY - bubbleHeight - 25; // วาดกล่องอยู่เหนือหัวตัวละคร 25px

    // วาดกรอบกล่องคำพูด
    ctx.fillStyle = 'rgba(0, 0, 0, 0.9)';
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 3;

    ctx.beginPath();
    ctx.roundRect(bubbleX - bubbleWidth / 2, bubbleY, bubbleWidth, bubbleHeight, 8);
    ctx.fill();
    ctx.stroke();

    // วาดหางชี้กล่องคำพูดลงหาตัวละคร
    ctx.beginPath();
    ctx.moveTo(speakerX - 10, bubbleY + bubbleHeight);
    ctx.lineTo(speakerX, speakerY - 5);
    ctx.lineTo(speakerX + 10, bubbleY + bubbleHeight);
    ctx.closePath();
    ctx.fillStyle = 'rgba(0, 0, 0, 0.9)';
    ctx.fill();

    // วาดเส้นขอบหางชี้
    ctx.beginPath();
    ctx.moveTo(speakerX - 10, bubbleY + bubbleHeight);
    ctx.lineTo(speakerX, speakerY - 5);
    ctx.lineTo(speakerX + 10, bubbleY + bubbleHeight);
    ctx.strokeStyle = '#fff';
    ctx.stroke();

    // ทับเส้นขอบด้านล่างของกรอบด้วยสีดำที่ตำแหน่งหางเชื่อมต่อ
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.9)';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(speakerX - 8, bubbleY + bubbleHeight);
    ctx.lineTo(speakerX + 8, bubbleY + bubbleHeight);
    ctx.stroke();

    // พิมพ์ข้อความบทสนทนา
    ctx.fillStyle = '#fff';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    lines.forEach((line, index) => {
        ctx.fillText(line, bubbleX - bubbleWidth / 2 + 10, bubbleY + 10 + index * lineHeight);
    });

    // พิมพ์ข้อความเตือนการกด E ไปต่อ
    ctx.fillStyle = '#FFEB3B';
    ctx.font = '8px "Press Start 2P"';
    ctx.textAlign = 'right';
    const eText = currentLanguage === 'th' ? '[ E ไปต่อ ]' : '[ E Continue ]';
    ctx.fillText(eText, bubbleX + bubbleWidth / 2 - 10, bubbleY + bubbleHeight - 14);

    ctx.restore();
}

function showNextDialog() {
    if (dialogQueue.length === 0) {
        isDialogShowing = false;
        activeSpeaker = null;
        activeDialogText = '';

        if (gameState === 'DIALOG') {
            if (currentIsland === 1 && hasCollectedKnowledge && !isPlayingEscape) {
                isPlayingEscape = true;
                startEscapeMode();
            } else {
                gameState = 'PLAYING';
                if (onDialogFinished) {
                    const callback = onDialogFinished;
                    onDialogFinished = null;
                    callback();
                }
            }
        }
        return;
    }

    const next = dialogQueue.shift();
    activeSpeaker = next.speaker;
    activeDialogText = next.text;
    isDialogShowing = true;
    gameState = 'DIALOG';
}

// ====================================================
// คลาส Character (Procedural Animation)
// ====================================================
class Character {
    constructor(x, y, width, height, color, isPlayer = false) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.isPlayer = isPlayer;

        this.vx = 0;
        this.vy = 0;
        this.speed = isPlayer ? 500 : 80;
        this.maxSpeed = isPlayer ? 300 : 80;
        this.gravity = 2000;
        this.jumpPower = -700;
        this.friction = 0.8;

        this.grounded = false;
        this.facingRight = true;
        this.state = 'IDLE';

        this.animTimer = 0;
        this.startX = x;
        this.patrolRange = 150;
        this.aiTimer = 0;
        this.name = isPlayer ? "Hero" : "NPC";
        this.nameId = isPlayer ? "player" : ""; // 'player', 'npc', 'boss'
    }

    getName() {
        if (currentLanguage === 'th') {
            if (this.isPlayer) return "ผู้กล้า";
            if (this.nameId === 'npc') return "จิตวิญญาณแห่งดิน";
            if (this.nameId === 'boss') return "ปีศาจแห่งปัญญา";
        } else {
            if (this.isPlayer) return "Hero";
            if (this.nameId === 'npc') return "Earth Spirit";
            if (this.nameId === 'boss') return "Wisdom Demon";
        }
        return this.name;
    }

    update(dt) {
        this.animTimer += dt;

        if (!this.isPlayer) {
            if (gameState === 'DIALOG' || gameState === 'ESCAPE_MODE' || this.speed === 0) {
                this.state = 'IDLE';
                this.vx = 0;
            } else {
                this.aiTimer -= dt;
                if (this.aiTimer <= 0) {
                    const r = Math.random();
                    if (r < 0.4) {
                        this.state = 'IDLE';
                        this.vx = 0;
                        this.aiTimer = 1 + Math.random() * 2;
                    } else if (r < 0.7) {
                        this.state = 'WALK';
                        this.vx = -this.speed;
                        this.facingRight = false;
                        this.aiTimer = 1 + Math.random() * 2;
                    } else {
                        this.state = 'WALK';
                        this.vx = this.speed;
                        this.facingRight = true;
                        this.aiTimer = 1 + Math.random() * 2;
                    }
                }

                if (this.x < this.startX - this.patrolRange) {
                    this.x = this.startX - this.patrolRange;
                    this.state = 'WALK';
                    this.vx = this.speed;
                    this.facingRight = true;
                    this.aiTimer = 2;
                } else if (this.x > this.startX + this.patrolRange) {
                    this.x = this.startX + this.patrolRange;
                    this.state = 'WALK';
                    this.vx = -this.speed;
                    this.facingRight = false;
                    this.aiTimer = 2;
                }
            }
        } else {
            if (this.vx > this.maxSpeed) this.vx = this.maxSpeed;
            if (this.vx < -this.maxSpeed) this.vx = -this.maxSpeed;

            if (this.grounded) {
                if (Math.abs(this.vx) > 10) this.state = 'WALK';
                else this.state = 'IDLE';
            } else {
                this.state = 'JUMP';
            }
        }

        this.x += this.vx * dt;
        this.vy += this.gravity * dt;
        this.y += this.vy * dt;

        const groundLevel = 450;
        if (this.y + this.height > groundLevel) {
            this.y = groundLevel - this.height;
            this.vy = 0;
            this.grounded = true;
        } else {
            this.grounded = false;
        }
    }

    draw(ctx, cameraX) {
        ctx.save();
        const centerX = (this.x - cameraX) + this.width / 2;
        const centerY = this.y + this.height;

        ctx.translate(centerX, centerY);

        // วาดชื่อตัวละครบนหัว (มีเส้นขอบสีดำให้อ่านง่าย)
        if (this.y < 9000) {
            ctx.fillStyle = '#fff';
            ctx.font = '8px "Press Start 2P"';
            ctx.textAlign = 'center';
            ctx.strokeStyle = '#000';
            ctx.lineWidth = 2;
            ctx.strokeText(this.getName(), 0, -this.height - 15);
            ctx.fillText(this.getName(), 0, -this.height - 15);
        }

        if (!this.facingRight) ctx.scale(-1, 1);

        let scaleX = 1;
        let scaleY = 1;
        let rot = 0;

        if (this.state === 'IDLE') {
            scaleY = 1 + Math.sin(this.animTimer * 5) * 0.03;
        } else if (this.state === 'WALK') {
            scaleY = 1 + Math.abs(Math.sin(this.animTimer * 15)) * 0.1;
            rot = Math.sin(this.animTimer * 15) * 0.15;
        } else if (this.state === 'JUMP') {
            scaleY = 1.2;
            scaleX = 0.85;
            if (this.vy > 0) {
                scaleY = 0.95;
                scaleX = 1.05;
            }
        }

        ctx.scale(scaleX, scaleY);
        ctx.rotate(rot);

        ctx.fillStyle = this.color;
        ctx.fillRect(-this.width / 2, -this.height, this.width, this.height);

        ctx.fillStyle = '#000';
        ctx.fillRect(this.width / 4, -this.height + 15, 6, 8);
        ctx.fillStyle = this.isPlayer ? '#2196F3' : '#FF5722';
        ctx.fillRect(-this.width / 2, -this.height + 25, this.width, 10);

        ctx.restore();
    }
}

const player = new Character(100, 200, 50, 60, '#4CAF50', true);
player.nameId = 'player';

const npc = new Character(400, 200, 50, 60, '#FFC107', false);
npc.name = "จิตวิญญาณแห่งดิน";
npc.nameId = 'npc';

const boss = new Character(800, 200, 70, 80, '#E91E63', false);
boss.name = "ปีศาจแห่งปัญญา";
boss.nameId = 'boss';
boss.speed = 0;
boss.y = 9999; // ซ่อนไว้ก่อน

// ====================================================
// ระบบ Input Controls & Story Flow
// ====================================================
const keys = { right: false, left: false, space: false };

window.addEventListener('keydown', (e) => {
    // โหมดวิ่งหนียังเดินได้
    if (gameState !== 'PLAYING' && gameState !== 'DIALOG' && gameState !== 'ESCAPE_MODE') {
        if (e.code === 'KeyB') toggleJournal();
        return;
    }

    if (e.code === 'KeyB') toggleJournal();
    if (e.code === 'ArrowRight' || e.code === 'KeyD') keys.right = true;
    if (e.code === 'ArrowLeft' || e.code === 'KeyA') keys.left = true;

    if (e.code === 'Space' || e.code === 'ArrowUp' || e.code === 'KeyW') {
        if (player.grounded && (gameState === 'PLAYING' || gameState === 'ESCAPE_MODE')) {
            player.vy = player.jumpPower;
            player.grounded = false;
        }
    }

    if (e.code === 'KeyE') {
        if (isDialogShowing) {
            // โชว์ไดอะล็อกถัดไปแทน
            showNextDialog();
            return;
        }

        // คุยกับ NPC เพื่อเล่าเนื้อเรื่อง
        const distNPC = Math.abs(player.x - npc.x);
        if (distNPC < 100 && gameState === 'PLAYING') {
            keys.right = false; keys.left = false; keys.space = false;

            player.facingRight = player.x < npc.x;
            npc.facingRight = !player.facingRight;

            let npcText = '';
            if (currentIsland === 1) npcText = translations[currentLanguage].npc_island1;
            else if (currentIsland === 2) npcText = translations[currentLanguage].npc_island2;
            else if (currentIsland === 3) npcText = translations[currentLanguage].npc_island3;
            else if (currentIsland === 4) npcText = translations[currentLanguage].npc_island4;

            dialogQueue = [
                { speaker: 'npc', text: npcText }
            ];
            showNextDialog();
            return;
        }

        // สำรวจจุดความรู้ (Knowledge Point)
        knowledgePoints.forEach(kp => {
            if (kp.active && Math.abs(player.x - kp.x) < 50 && gameState === 'PLAYING') {
                kp.active = false;
                hasCollectedKnowledge = true;
                addJournalEntry(kp.key);

                keys.right = false; keys.left = false; keys.space = false;

                if (currentIsland === 1) {
                    dialogQueue = [
                        { speaker: 'player', text: translations[currentLanguage].kp_island1 },
                        { speaker: 'boss', text: translations[currentLanguage].demon_appear },
                        { speaker: 'npc', text: translations[currentLanguage].npc_island1_escape }
                    ];
                } else {
                    dialogQueue = [
                        { speaker: 'player', text: translations[currentLanguage][`kp_island${currentIsland}`] },
                        { speaker: 'player', text: translations[currentLanguage][`kp_island${currentIsland}_dialog`] }
                    ];
                    boss.y = 370; // บอสโผล่
                }
                showNextDialog();
            }
        });

        // คุยกับบอสเพื่อสู้
        const distBoss = Math.abs(player.x - boss.x);
        if (distBoss < 120 && boss.y < 9000 && gameState === 'PLAYING') {
            keys.right = false; keys.left = false; keys.space = false;

            let bossIntroText = '';
            if (currentIsland === 2) bossIntroText = translations[currentLanguage].demon_island2;
            else if (currentIsland === 3) bossIntroText = translations[currentLanguage].demon_island3;
            else if (currentIsland === 4) bossIntroText = translations[currentLanguage].demon_island4;

            dialogQueue = [
                { speaker: 'boss', text: bossIntroText }
            ];

            onDialogFinished = () => {
                startQuiz();
            };

            showNextDialog();
        }
    }
});

window.addEventListener('keyup', (e) => {
    if (e.code === 'ArrowRight' || e.code === 'KeyD') keys.right = false;
    if (e.code === 'ArrowLeft' || e.code === 'KeyA') keys.left = false;
});

btnStart.addEventListener('click', () => {
    mainMenuUI.classList.add('hidden');
    hudUI.classList.remove('hidden');
    isPlaying = true;
    gameState = 'PLAYING';
    isPlayingEscape = false;
});

// ====================================================
// ระบบกล้อง (Camera) และ อัปเดตตรรกะ (Update)
// ====================================================
let cameraX = 0;

function update(dt) {
    if (gameState !== 'PLAYING' && gameState !== 'ESCAPE_MODE') return;

    npc.update(dt);
    if (boss.y < 9000) boss.update(dt);

    if (keys.right) {
        player.vx += player.speed * dt;
        player.facingRight = true;
    } else if (keys.left) {
        player.vx -= player.speed * dt;
        player.facingRight = false;
    } else {
        player.vx *= Math.pow(player.friction, dt * 60);
    }
    player.update(dt);

    const levelWidth = bgImage.width || canvas.width;
    if (player.x < 0) { player.x = 0; player.vx = 0; }

    // ชนขอบแมพเพื่อเปลี่ยนเกาะ
    if (player.x >= levelWidth - player.width) {
        if (gameState === 'ESCAPE_MODE') {
            // หนีรอด เปลี่ยนเกาะ
            player.x = 50;
            currentIsland++;
            isPlayingEscape = false;

            // สลับภาพพื้นหลังตามเกาะ
            if (currentIsland === 2) bgImage.src = 'assets/images/bg_mountain.png';
            else if (currentIsland === 3) bgImage.src = 'assets/images/bg_river.png';
            else if (currentIsland === 4) bgImage.src = 'assets/images/bg_pest.png';

            setupKnowledgeForIsland();
            document.getElementById('escape-overlay').classList.add('hidden');
            gameState = 'PLAYING';
            keys.right = false;
            keys.left = false;
            alert(`${translations[currentLanguage].txtAlertIsland} ${currentIsland}`);
        } else {
            // ไม่ได้หนี บังคับถอย (ผลักกลับมา 100px และรีเซ็ตปุ่มเพื่อป้องกัน alert วนลูป)
            player.x = levelWidth - player.width - 100;
            player.vx = 0;
            keys.right = false;
            keys.left = false;
            alert(translations[currentLanguage].txtAlertNotReady);
        }
    }

    cameraX = player.x - (canvas.width / 2) + (player.width / 2);
    if (cameraX < 0) cameraX = 0;
    const maxCameraX = Math.max(0, bgImage.width - canvas.width);
    if (cameraX > maxCameraX) cameraX = maxCameraX;
}

// ====================================================
// ระบบการเรนเดอร์ตกแต่ง (Visual Polish)
// ====================================================
function drawDropShadow(x, y, width) {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
    ctx.beginPath();
    ctx.ellipse(x + width / 2, y, width / 2.5, width / 8, 0, 0, Math.PI * 2);
    ctx.fill();
}

function draw() {
    ctx.imageSmoothingEnabled = false;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let shakeOffset = 0;
    if (gameState === 'ESCAPE_MODE') {
        shakeOffset = (Math.random() - 0.5) * 10; // เขย่ากล้องแนวนอน
    }

    if (bgImage.complete && bgImage.width > 0 && bgImage.height > 0) {
        ctx.drawImage(bgImage, -(cameraX + shakeOffset), 0, bgImage.width, canvas.height);
    }

    const adjCameraX = cameraX + shakeOffset;

    // วาดเงา
    drawDropShadow(npc.x - adjCameraX, npc.y + npc.height, npc.width);
    if (boss.y < 9000) drawDropShadow(boss.x - adjCameraX, boss.y + boss.height, boss.width);
    drawDropShadow(player.x - adjCameraX, player.y + player.height, player.width);

    // วาดจุดความรู้
    knowledgePoints.forEach(kp => kp.draw(ctx, adjCameraX));

    // วาดตัวละคร
    npc.draw(ctx, adjCameraX);
    if (boss.y < 9000) boss.draw(ctx, adjCameraX);
    player.draw(ctx, adjCameraX);

    // ไอคอนเป้าหมายคุย [E] หรือต่อสู้ [E]
    const dist = Math.abs(player.x - npc.x);
    if (dist < 100 && gameState === 'PLAYING') {
        ctx.fillStyle = '#fff';
        ctx.font = '12px "Press Start 2P"';
        ctx.textAlign = 'center';
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 2;
        const talkText = currentLanguage === 'th' ? '[E] คุย' : '[E] Talk';
        ctx.strokeText(talkText, (npc.x + npc.width / 2) - adjCameraX, npc.y - 30 + Math.sin(Date.now() / 200) * 5);
        ctx.fillText(talkText, (npc.x + npc.width / 2) - adjCameraX, npc.y - 30 + Math.sin(Date.now() / 200) * 5);
    }

    const distBoss = Math.abs(player.x - boss.x);
    if (distBoss < 120 && boss.y < 9000 && gameState === 'PLAYING') {
        ctx.fillStyle = '#E91E63';
        ctx.font = '12px "Press Start 2P"';
        ctx.textAlign = 'center';
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 2;
        const fightText = currentLanguage === 'th' ? '[E] ต่อสู้' : '[E] Fight';
        ctx.strokeText(fightText, (boss.x + boss.width / 2) - adjCameraX, boss.y - 30 + Math.sin(Date.now() / 200) * 5);
        ctx.fillText(fightText, (boss.x + boss.width / 2) - adjCameraX, boss.y - 30 + Math.sin(Date.now() / 200) * 5);
    }

    // วาดกล่องคำพูดสนทนาด้านบนหัว
    if (gameState === 'DIALOG' && activeSpeaker && activeDialogText) {
        let speakerChar = null;
        if (activeSpeaker === 'player') speakerChar = player;
        else if (activeSpeaker === 'npc') speakerChar = npc;
        else if (activeSpeaker === 'boss') speakerChar = boss;

        if (speakerChar) {
            const sx = (speakerChar.x - adjCameraX) + speakerChar.width / 2;
            const sy = speakerChar.y;
            drawSpeechBubble(activeDialogText, sx, sy);
        }
    }
}

// ====================================================
// Game Loop
// ====================================================
let lastTime = 0;

function gameLoop(timestamp) {
    if (isPlaying && gameState !== 'GAME_OVER_VICTORY') {
        if (!lastTime) lastTime = timestamp;
        let dt = (timestamp - lastTime) / 1000;
        if (dt > 0.1) dt = 0.1;
        lastTime = timestamp;

        update(dt);
        draw();
    } else if (gameState !== 'GAME_OVER_VICTORY') {
        lastTime = 0;
    }
    requestAnimationFrame(gameLoop);
}

// ====================================================
// Settings / UI Buttons Event Listeners
// ====================================================
document.getElementById('btn-settings').addEventListener('click', () => {
    if (gameState === 'PLAYING' || gameState === 'ESCAPE_MODE') {
        gameState = 'PAUSED';
        keys.right = false; keys.left = false; keys.space = false;
    }
    settingsUI.classList.remove('hidden');
});

document.getElementById('btn-menu-settings').addEventListener('click', () => {
    settingsUI.classList.remove('hidden');
});

document.getElementById('btn-close-settings').addEventListener('click', () => {
    settingsUI.classList.add('hidden');
    if (gameState === 'PAUSED') {
        gameState = document.getElementById('escape-overlay').classList.contains('hidden') ? 'PLAYING' : 'ESCAPE_MODE';
        lastTime = 0;
    }
});

document.getElementById('btn-credits').onclick = () => {
    alert(translations[currentLanguage].creditsText);
};

// ควบคุมระบบดรอปดาวน์สลับภาษา (Slide down / Slide up)
const btnLangToggle = document.getElementById('btn-lang-toggle');
const langDropdownMenu = document.getElementById('lang-dropdown-menu');

btnLangToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    langDropdownMenu.classList.toggle('show');
});

document.getElementById('btn-lang-th').addEventListener('click', (e) => {
    e.stopPropagation();
    setLanguage('th');
    langDropdownMenu.classList.remove('show');
});

document.getElementById('btn-lang-en').addEventListener('click', (e) => {
    e.stopPropagation();
    setLanguage('en');
    langDropdownMenu.classList.remove('show');
});

// คลิกนอกพื้นที่ดรอปดาวน์ให้พับสไลด์กลับขึ้นไป
document.addEventListener('click', () => {
    if (langDropdownMenu && langDropdownMenu.classList.contains('show')) {
        langDropdownMenu.classList.remove('show');
    }
});

// โหลดระดับภาษาเริ่มต้นที่เก็บไว้ หรือตั้งเริ่มต้นเป็นภาษาไทย
setLanguage(localStorage.getItem('harvest_frontier_lang') || 'th');
