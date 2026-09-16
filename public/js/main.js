/* ==============================================================================
       AUDIO SYNTHESIZER ENGINE (8-BIT SFX & BGM CHIPTUNE SYNTH)
       ============================================================================== */
class RetroSoundEngine {
  constructor() {
    this.ctx = null;
    this.masterGain = null;
    this.sfxGain = null;
    this.bgmGain = null;
    this.masterVol = 1.0;
    this.sfxVol = 0.8;
    this.bgmVol = 0.6;
    this.bgmInterval = null;
    this.bgmPlaying = false;
  }
  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContext();

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.masterVol, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);

      this.sfxGain = this.ctx.createGain();
      this.sfxGain.gain.setValueAtTime(this.sfxVol, this.ctx.currentTime);
      this.sfxGain.connect(this.masterGain);

      this.bgmGain = this.ctx.createGain();
      this.bgmGain.gain.setValueAtTime(this.bgmVol, this.ctx.currentTime);
      this.bgmGain.connect(this.masterGain);
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  setVolumes(master, bgm, sfx) {
    this.masterVol = Math.max(0, Math.min(1, master));
    this.bgmVol = Math.max(0, Math.min(1, bgm));
    this.sfxVol = Math.max(0, Math.min(1, sfx));
    if (this.ctx) {
      const now = this.ctx.currentTime;
      if (this.masterGain) this.masterGain.gain.setValueAtTime(this.masterVol, now);
      if (this.bgmGain) this.bgmGain.gain.setValueAtTime(this.bgmVol, now);
      if (this.sfxGain) this.sfxGain.gain.setValueAtTime(this.sfxVol, now);
    }
  }

  setMasterVolume(vol) {
    this.masterVol = Math.max(0, Math.min(1, vol));
    if (this.ctx && this.masterGain) {
      this.masterGain.gain.setValueAtTime(this.masterVol, this.ctx.currentTime);
    }
  }

  setBgmVolume(vol) {
    this.bgmVol = Math.max(0, Math.min(1, vol));
    if (this.ctx && this.bgmGain) {
      this.bgmGain.gain.setValueAtTime(this.bgmVol, this.ctx.currentTime);
    }
  }

  setSfxVolume(vol) {
    this.sfxVol = Math.max(0, Math.min(1, vol));
    if (this.ctx && this.sfxGain) {
      this.sfxGain.gain.setValueAtTime(this.sfxVol, this.ctx.currentTime);
    }
  }

  playJump() {
    this.init();
    if (this.sfxVol <= 0 || this.masterVol <= 0) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = "square";
    osc.frequency.setValueAtTime(150, now);
    osc.frequency.exponentialRampToValueAtTime(450, now + 0.15);
    gain.gain.setValueAtTime(0.1, now);
    gain.gain.linearRampToValueAtTime(0.01, now + 0.15);
    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start();
    osc.stop(now + 0.15);
  }

  playCorrect() {
    this.init();
    if (this.sfxVol <= 0 || this.masterVol <= 0) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(440, now);
    osc.frequency.setValueAtTime(660, now + 0.1);
    osc.frequency.setValueAtTime(880, now + 0.2);
    gain.gain.setValueAtTime(0.15, now);
    gain.gain.linearRampToValueAtTime(0.01, now + 0.35);
    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start();
    osc.stop(now + 0.35);
  }

  playWrong() {
    this.init();
    if (this.sfxVol <= 0 || this.masterVol <= 0) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(180, now);
    osc.frequency.setValueAtTime(120, now + 0.15);
    gain.gain.setValueAtTime(0.2, now);
    gain.gain.linearRampToValueAtTime(0.01, now + 0.3);
    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start();
    osc.stop(now + 0.3);
  }

  playShoot() {
    this.init();
    if (this.sfxVol <= 0 || this.masterVol <= 0) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = "square";
    osc.frequency.setValueAtTime(880, now);
    osc.frequency.exponentialRampToValueAtTime(110, now + 0.1);
    gain.gain.setValueAtTime(0.05, now);
    gain.gain.linearRampToValueAtTime(0.01, now + 0.1);
    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start();
    osc.stop(now + 0.1);
  }

  playCoin() {
    this.init();
    if (this.sfxVol <= 0 || this.masterVol <= 0) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(988, now);
    osc.frequency.setValueAtTime(1318.5, now + 0.1);
    gain.gain.setValueAtTime(0.1, now);
    gain.gain.linearRampToValueAtTime(0.01, now + 0.3);
    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start();
    osc.stop(now + 0.3);
  }

  playVictory() {
    this.init();
    if (this.sfxVol <= 0 || this.masterVol <= 0) return;
    const now = this.ctx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6 (Triumphant victory fanfare)
    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(freq, now + idx * 0.1);
      gain.gain.setValueAtTime(0.18, now + idx * 0.1);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.1 + 0.35);
      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(now + idx * 0.1);
      osc.stop(now + idx * 0.1 + 0.36);
    });
  }

  startBGM() {
    if (this.bgmPlaying) return;
    this.init();
    this.bgmPlaying = true;

    const melody = [
      261.63, 329.63, 392.00, 523.25,
      392.00, 329.63, 392.00, 440.00,
      349.23, 440.00, 523.25, 659.25,
      523.25, 440.00, 392.00, 329.63,
      293.66, 349.23, 440.00, 523.25,
      440.00, 349.23, 329.63, 293.66,
      261.63, 329.63, 392.00, 440.00,
      392.00, 329.63, 293.66, 261.63
    ];

    const bass = [
      130.81, 130.81, 130.81, 130.81,
      130.81, 130.81, 130.81, 130.81,
      174.61, 174.61, 174.61, 174.61,
      174.61, 174.61, 174.61, 174.61,
      146.83, 146.83, 146.83, 146.83,
      146.83, 146.83, 146.83, 146.83,
      196.00, 196.00, 196.00, 196.00,
      130.81, 130.81, 130.81, 130.81
    ];

    let noteIdx = 0;
    this.bgmInterval = setInterval(() => {
      if (!this.bgmPlaying || !this.ctx || this.bgmVol <= 0 || this.masterVol <= 0) {
        noteIdx = (noteIdx + 1) % melody.length;
        return;
      }
      const now = this.ctx.currentTime;

      // Melody note
      const mFreq = melody[noteIdx];
      const mOsc = this.ctx.createOscillator();
      const mGain = this.ctx.createGain();
      mOsc.type = "triangle";
      mOsc.frequency.setValueAtTime(mFreq, now);
      mGain.gain.setValueAtTime(0.04, now);
      mGain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
      mOsc.connect(mGain);
      mGain.connect(this.bgmGain);
      mOsc.start(now);
      mOsc.stop(now + 0.24);

      // Bass note
      if (noteIdx % 2 === 0) {
        const bFreq = bass[noteIdx];
        const bOsc = this.ctx.createOscillator();
        const bGain = this.ctx.createGain();
        bOsc.type = "sine";
        bOsc.frequency.setValueAtTime(bFreq, now);
        bGain.gain.setValueAtTime(0.05, now);
        bGain.gain.exponentialRampToValueAtTime(0.001, now + 0.44);
        bOsc.connect(bGain);
        bGain.connect(this.bgmGain);
        bOsc.start(now);
        bOsc.stop(now + 0.46);
      }

      noteIdx = (noteIdx + 1) % melody.length;
    }, 260);
  }

  stopBGM() {
    this.bgmPlaying = false;
    if (this.bgmInterval) {
      clearInterval(this.bgmInterval);
      this.bgmInterval = null;
    }
  }
}

/* ==============================================================================
       DATABASE: 12 SKY ISLANDS STAGE-SPECIFIC KNOWLEDGE & BOSS QUESTIONS
       ============================================================================== */
const MASTER_DATABASE = {
  // Stage-Specific Knowledge Trials (3-4 tailored questions per Sky Island Altar)
  roomTrials: {
    "holy_chapel": {
      title: "แท่นพฤกษาเวหา (Genesis Sky Altar)",
      topic: "การเพาะเมล็ดพันธุ์และการปลูกพืชไร้ดินแอโรโปนิกส์",
      desc: "บททดสอบว่าด้วยศาสตร์แห่งการกำเนิดต้นกล้า การควบคุมความชื้น และเทคโนโลยีพ่นละอองหมอกสารอาหารสู่ราก",
      questions: [
        {
          q: "การเพาะต้นกล้าในระบบแอโรโปนิกส์ (Aeroponics) พืชได้รับธาตุอาหารอย่างไร?",
          options: [
            "A) แช่รากในน้ำขังตลอดเวลา",
            "B) ฉีดพ่นละอองหมอกสารละลายธาตุอาหารตรงสู่ราก",
            "C) ฝังรากลงในดินเหนียว",
            "D) รดน้ำทางใบเท่านั้น"
          ],
          correct: 1,
          exp: "ระบบแอโรโปนิกส์ใช้วิธีพ่นละอองหมอกสารอาหารสู่รากที่แขวนลอยในอากาศ รากจึงได้รับออกซิเจนสูงสุด"
        },
        {
          q: "ปัจจัยสำคัญที่สุดในการกระตุ้นให้เมล็ดพันธุ์เริ่มงอก (Germination) คืออะไร?",
          options: [
            "A) ปุ๋ยเคมีเข้มข้น",
            "B) แดดจัดตลอด 24 ชั่วโมง",
            "C) ความชื้น อุณหภูมิพอเหมาะ และออกซิเจน",
            "D) สารกำจัดวัชพืช"
          ],
          correct: 2,
          exp: "เมล็ดต้องการน้ำ/ความชื้นเพื่อกระตุ้นเอนไซม์ อุณหภูมิที่พอดี และออกซิเจนในการหายใจ"
        },
        {
          q: "ในระยะต้นกล้าอ่อน การได้รับแสงสว่างที่เพียงพอและเหมาะสมช่วยป้องกันสิ่งใด?",
          options: [
            "A) ป้องกันต้นกล้ายืดตัวผอมสูงและอ่อนแอ",
            "B) ป้องกันไม่ให้รากงอก",
            "C) ทำให้ใบเปลี่ยนเป็นสีน้ำตาล",
            "D) เร่งให้เมล็ดเน่า"
          ],
          correct: 0,
          exp: "หากต้นกล้าขาดแสงจะเกิดอาการยืดตัวหาแสง (Etiolation) ลำต้นจะผอมสูง ล้มง่าย และไม่แข็งแรง"
        }
      ]
    },

    "abandoned_village": {
      title: "แท่นปุ๋ยหมักชีวภาพเวหา (Bio-Compost Altar)",
      topic: "การปรับปรุงโครงสร้างดิน ค่าความเป็นกรด-ด่าง (pH) และฮิวมัส",
      desc: "บททดสอบว่าด้วยการฟื้นฟูดินเสื่อมโทรม การแก้ดินกรดด้วยปูนขาว/โดโลไมท์ และสัดส่วนดินร่วนสมบูรณ์",
      questions: [
        {
          q: "ดินที่เหมาะสมกับการปลูกพืชทั่วไปส่วนใหญ่ควรมีค่า pH อยู่ในช่วงใด?",
          options: [
            "A) pH 3.0 - 4.5 (กรดจัด)",
            "B) pH 6.0 - 7.0 (กรดอ่อนถึงกลาง)",
            "C) pH 8.5 - 10.0 (ด่างจัด)",
            "D) pH 1.0 - 2.0 (กรดรุนแรง)"
          ],
          correct: 1,
          exp: "ช่วง pH 6.0 - 7.0 ธาตุอาหารหลักและรองในดินจะละลายให้พืชดูดซึมไปใช้ได้อย่างสมดุลที่สุด"
        },
        {
          q: "หากดินในแปลงมีสภาพเป็นกรดจัด (ดินเปรี้ยว pH < 5.5) ควรใช้วัสดุใดปรับปรุงดิน?",
          options: [
            "A) ปุ๋ยเคมีไนโตรเจนสูง",
            "B) น้ำส้มสายชู",
            "C) ปูนขาว หรือ โดโลไมท์",
            "D) ผงกำมะถัน"
          ],
          correct: 2,
          exp: "ปูนขาวและโดโลไมท์มีคุณสมบัติเป็นด่าง ช่วยเพิ่มค่า pH และเติมธาตุแคลเซียม-แมกนีเซียมให้ดิน"
        },
        {
          q: "ในเนื้อดินร่วนอุดมคติที่สมบูรณ์ ควรมีสัดส่วนของ 'อินทรียวัตถุ' (ฮิวมัส) กี่เปอร์เซ็นต์?",
          options: ["A) 45%", "B) 25%", "C) 5%", "D) 50%"],
          correct: 2,
          exp: "ดินอุดมคติประกอบด้วย: แร่ธาตุ 45%, น้ำ 25%, อากาศ 25%, และอินทรียวัตถุ 5%"
        }
      ]
    },

    "drawbridge": {
      title: "แท่นน้ำตกเวหา (Sky Cascade Altar)",
      topic: "การจัดการน้ำในฤดูแล้ง พืชทนแล้ง และการคลุมดิน",
      desc: "บททดสอบว่าด้วยการเลือกพืชทนแล้งรากลึก การให้น้ำอย่างมีประสิทธิภาพ และการรักษาความชื้นหน้าดิน",
      questions: [
        {
          q: "ในฤดูร้อนแล้งขาดแคลนน้ำ ควรเลือกปลูกพืชทนแล้งรากลึกชนิดใด?",
          options: [
            "A) ข้าวโพด และ มันสำปะหลัง",
            "B) ผักกาดหอม และ สลัดแก้ว",
            "C) สตรอว์เบอร์รี",
            "D) บัวบก"
          ],
          correct: 0,
          exp: "ข้าวโพดและมันสำปะหลังมีระบบรากหยั่งลึก ลำต้นและใบมีไขเคลือบ ทนแล้งและใช้น้ำน้อย"
        },
        {
          q: "การคลุมหน้าดินด้วยฟางข้าวหรือหญ้าแห้ง (Mulching) มีประโยชน์หลักอย่างไรในฤดูแล้ง?",
          options: [
            "A) ดักจับแมลงศัตรูพืช",
            "B) รักษาความชื้นในดินและลดการระเหยของน้ำ",
            "C) เร่งให้ดินเค็ม",
            "D) ป้องกันแสงแดดไม่ให้ต้นไม้โต"
          ],
          correct: 1,
          exp: "วัสดุคลุมดินช่วยบังแดดไม่ให้น้ำระเหยออกจากหน้าดิน ช่วยลดการใช้น้ำรดได้ถึง 50%"
        },
        {
          q: "ช่วงเวลารดน้ำต้นไม้ที่เหมาะสมที่สุดเพื่อลดการระเหยและป้องกันโรคเชื้อราคือช่วงใด?",
          options: [
            "A) เช้าตรู่ (06:00 - 08:00 น.)",
            "B) เที่ยงตรงแดดจัด",
            "C) บ่ายสองโมง",
            "D) กลางดึกน้ำขัง"
          ],
          correct: 0,
          exp: "รดน้ำเช้าตรู่ พืชจะดูดซึมไปสังเคราะห์แสงได้ทันที และใบแห้งไว ไม่เกิดความชื้นสะสมจนเกิดรา"
        }
      ]
    },

    "rodenia_chapel": {
      title: "แท่นสกัดสมุนไพรเวหา (Sky Herbarium Altar)",
      topic: "ขั้นตอนการเตรียมแปลงดิน และสมุนไพรอารักขาพืช",
      desc: "บททดสอบว่าด้วยการไถตากดินฆ่าเชื้อโรค การจัดลำดับขั้นตอนเตรียมดิน และสารสกัดสมุนไพรไล่แมลง",
      questions: [
        {
          q: "ขั้นตอนแรกสุดที่ถูกต้องในการเตรียมแปลงดินก่อนปลูกพืชคือข้อใด?",
          options: [
            "A) หว่านเมล็ดทันที",
            "B) ไถดะตากดิน 7-14 วัน เพื่อกำจัดวัชพืชและเชื้อโรค",
            "C) ใส่ปุ๋ยเคมีเข้มข้น",
            "D) รดน้ำจนท่วมขัง"
          ],
          correct: 1,
          exp: "การไถตากดินรับแสงแดดช่วยทำลายสปอร์เชื้อรา ไข่แมลง และเมล็ดวัชพืชที่ตกค้างในดิน"
        },
        {
          q: "สารสกัดจากพืชสมุนไพร 'สะเดา' (Neem) มีสารใดช่วยยับยั้งการเจริญเติบโตของหนอน?",
          options: [
            "A) สารคาเฟอีน",
            "B) สารอะซาดิแรคติน (Azadirachtin)",
            "C) สารแทนนิน",
            "D) กรดซิตริก"
          ],
          correct: 1,
          exp: "Azadirachtin ในสะเดาทำให้หนอนเบื่ออาหาร ไม่ลอกคราบ และยับยั้งการขยายพันธุ์อย่างปลอดภัย"
        },
        {
          q: "การปลูกต้น 'ดาวเรือง' แซมรอบแปลงผักมีประโยชน์หลักอย่างไร?",
          options: [
            "A) รากหลั่งสารยับยั้งไส้เดือนฝอยศัตรูพืชในดิน",
            "B) บังเงาแดดให้แปลงมืด",
            "C) ดึงดูดหนูนา",
            "D) ทำให้ดินกลายเป็นกรด"
          ],
          correct: 0,
          exp: "รากดาวเรืองหลั่งสารอัลฟาเทอร์ทิเอนิล ซึ่งเป็นพิษต่อไส้เดือนฝอยรากปมในดิน"
        }
      ]
    },

    "buried_church": {
      title: "แท่นจุลินทรีย์ใต้เกาะ (Rhizosphere Altar)",
      topic: "ชีววิทยาของระบบราก ไมคอร์ไรซา และชีววิธีปราบศัตรูพืช",
      desc: "บททดสอบว่าด้วยเครือข่ายรากพืช จุลินทรีย์ดินที่มีประโยชน์ และการใช้แมลงตัวห้ำตัวเบียน",
      questions: [
        {
          q: "'ชีววิธี' (Biological Control) ในการควบคุมเพลี้ยอ่อนในแปลงพืชคือวิธีใด?",
          options: [
            "A) ฉีดยาฆ่าแมลงเข้มข้นทุกวัน",
            "B) ปล่อยแมลงเต่าทอง (ตัวห้ำ) มาช่วยกินเพลี้ยอ่อน",
            "C) โรยเกลือรอบแปลง",
            "D) จุดไฟรมควันทั้งแปลง"
          ],
          correct: 1,
          exp: "แมลงเต่าทองเป็นแมลงตัวห้ำตามธรรมชาติ กินเพลี้ยอ่อนเป็นอาหารได้วันละหลายสิบตัว"
        },
        {
          q: "เชื้อรา 'ไมคอร์ไรซา' (Mycorrhizae) ที่อาศัยร่วมกับรากพืชมีประโยชน์อย่างไร?",
          options: [
            "A) กัดกินรากพืชจนเน่า",
            "B) ช่วยขยายเครือข่ายรากดูดซึมฟอสฟอรัสและน้ำให้พืช",
            "C) แย่งอาหารของพืช",
            "D) ทำให้พืชใบเหลือง"
          ],
          correct: 1,
          exp: "ไมคอร์ไรซาเป็นเชื้อราดีที่ช่วยเพิ่มพื้นที่ผิวรากในการดูดซึมฟอสฟอรัสและน้ำ แลกกับน้ำตาลจากพืช"
        },
        {
          q: "โรค 'รากเน่าโคนเน่า' ในดิน เกิดขึ้นได้ง่ายที่สุดในสภาพแวดล้อมแบบใด?",
          options: [
            "A) ดินแน่นทึบ น้ำท่วมขัง และมีความชื้นสูงสะสม",
            "B) แดดจัดดินแห้งโปร่ง",
            "C) แปลงลมพัดผ่านสะดวก",
            "D) ดินทรายระบายน้ำเร็ว"
          ],
          correct: 0,
          exp: "น้ำขังทำให้รากขาดอากาศหายใจ และความชื้นสูงเอื้อต่อการแพร่พันธุ์ของเชื้อรา Phytophthora"
        }
      ]
    },

    "ghost_town": {
      title: "แท่นโซลาร์เซลล์เวหา (Solar AgriTech Altar)",
      topic: "นวัตกรรมเกษตรอัจฉริยะ การปลูกพืชแนวตั้ง และเซนเซอร์ IoT",
      desc: "บททดสอบว่าด้วยเกษตรแม่นยำ การควบคุมสภาพแวดล้อมในโรงเรือน และการใช้โดรนการเกษตร",
      questions: [
        {
          q: "ประโยชน์สูงสุดของระบบ 'การปลูกพืชแนวตั้ง' (Vertical Farming) คืออะไร?",
          options: [
            "A) ใช้พื้นที่น้อย เพิ่มผลผลิตต่อตารางเมตร และคุมสภาพแวดล้อมได้",
            "B) ต้องใช้สารเคมีเพิ่มขึ้น 10 เท่า",
            "C) ปลูกได้เฉพาะไม้ยืนต้นขนาดใหญ่",
            "D) ทำให้พืชสังเคราะห์แสงไม่ได้"
          ],
          correct: 0,
          exp: "Vertical Farming ซ้อนแปลงปลูกเป็นชั้นๆ ในแนวดิ่ง ประหยัดพื้นที่ถึง 90% และควบคุมแสงน้ำได้แม่นยำ"
        },
        {
          q: "เซนเซอร์ IoT ในระบบเกษตรแม่นยำ (Precision Farming) นิยมใช้วัดค่าใดในแปลงปลูก?",
          options: [
            "A) ความชื้นในดิน อุณหภูมิ และค่าความเค็ม/ปุ๋ย (EC)",
            "B) จำนวนผู้เข้าชมแปลง",
            "C) ความเร็วของรถแทรกเตอร์",
            "D) สีของกระถางต้นไม้"
          ],
          correct: 0,
          exp: "เซนเซอร์ IoT วัดความชื้น ค่า pH และ EC เพื่อส่งข้อมูลให้ระบบให้น้ำและปุ๋ยอัตโนมัติตามความต้องการจริง"
        },
        {
          q: "การนำ 'โดรนการเกษตร' มาใช้พ่นสารชีวภาพมีข้อดีเด่นอย่างไร?",
          options: [
            "A) พ่นได้แม่นยำ รวดเร็ว และลดการสัมผัสสารของผู้ปฏิบัติงาน",
            "B) ใช้พลังงานมากกว่าเครื่องยนต์ 10 เท่า",
            "C) ทำให้พืชหยุดเจริญเติบโต",
            "D) พ่นได้เฉพาะเวลากลางคืนเท่านั้น"
          ],
          correct: 0,
          exp: "โดรนช่วยกระจายละอองสารได้อย่างสม่ำเสมอ ประหยัดเวลา ลดการเหยียบย่ำแปลง และปลอดภัยต่อเกษตรกร"
        }
      ]
    },

    "sewers": {
      title: "แท่นบึงบัวลอยฟ้า (Celestial Aquaponics Altar)",
      topic: "ระบบอควาโปนิกส์ วงจรสารอาหารมูลปลา และการบำบัดน้ำ",
      desc: "บททดสอบว่าด้วยการทำเกษตรแบบพึ่งพา การเลี้ยงปลาคู่กับปลูกผัก และการใช้น้ำหมุนเวียน",
      questions: [
        {
          q: "ในระบบอควาโปนิกส์ (Aquaponics) พืชได้รับธาตุอาหารไนโตรเจนจากกระบวนการใด?",
          options: [
            "A) แบคทีเรียเปลี่ยนแอมโมเนียจากมูลปลาเป็นไนเตรตให้พืชดูดซึม",
            "B) ใส่ปุ๋ยยูเรียเคมีลงในบ่อปลา",
            "C) ปลากัดกินใบพืชโดยตรง",
            "D) น้ำฝนกรดจากฟ้า"
          ],
          correct: 0,
          exp: "แบคทีเรียไนตริฟายอิ้งจะย่อยสลายแอมโมเนียในมูลปลาให้กลายเป็นไนเตรต ซึ่งเป็นปุ๋ยชั้นดีของพืช"
        },
        {
          q: "ข้อดีสำคัญที่สุดของระบบเกษตรอควาโปนิกส์เมื่อเทียบกับการปลูกพืชลงดินทั่วไปคืออะไร?",
          options: [
            "A) ประหยัดน้ำได้ถึง 90% ด้วยระบบน้ำหมุนเวียนแบบปิด",
            "B) ไม่ต้องใช้ไฟฟ้าเลย",
            "C) ปลูกได้เฉพาะพืชทะเลทราย",
            "D) ผลผลิตมีรสเค็ม"
          ],
          correct: 0,
          exp: "น้ำที่พืชกรองแล้วจะไหลวนกลับไปให้ปลา จึงสูญเสียน้ำเฉพาะที่พืชดูดไปใช้และระเหยเพียงเล็กน้อย"
        },
        {
          q: "พืชน้ำ เช่น ต้นกก ผักตบชวา ในบึงบำบัดน้ำ ทำหน้าที่หลักอย่างไรในระบบนิเวศ?",
          options: [
            "A) ดูดซับของเสีย โลหะหนัก ดักตะกอน และเติมออกซิเจนให้แหล่งน้ำ",
            "B) ปล่อยสารพิษลงสู่น้ำ",
            "C) ทำให้น้ำเน่าเสียเร็วขึ้น",
            "D) แย่งอาหารสัตว์น้ำทั้งหมด"
          ],
          correct: 0,
          exp: "รากพืชน้ำเป็นแหล่งอาศัยของจุลินทรีย์ดี ช่วยดูดซับสารอินทรีย์ส่วนเกินและกรองน้ำให้ใสสะอาด"
        }
      ]
    },

    "pilgrimage": {
      title: "แท่นบูชาพระแม่โพสพเวหา (Skyward Terraces Altar)",
      topic: "การทำนาขั้นบันได การชะลอการพังทลายของดิน และฝายชะลอน้ำ",
      desc: "บททดสอบว่าด้วยภูมิปัญญาการจัดการน้ำบนพื้นที่สูง การลดการชะล้างหน้าดิน และระบบนิเวศนาข้าว",
      questions: [
        {
          q: "วัตถุประสงค์หลักของการทำแปลงเกษตรแบบ 'นาขั้นบันได' บนพื้นที่ลาดชันคืออะไร?",
          options: [
            "A) ชะลอความเร็วของน้ำ ลดการชะล้างพังทลายของหน้าดิน",
            "B) ทำให้เดินขึ้นเขายากขึ้น",
            "C) เพิ่มความแห้งแล้งให้ดิน",
            "D) เพื่อความสวยงามเพียงอย่างเดียว"
          ],
          correct: 0,
          exp: "คันดินของนาขั้นบันไดช่วยกักเก็บน้ำฝน ชะลอความเร็วของน้ำที่ไหลบ่า และป้องกันหน้าดินถูกชะล้าง"
        },
        {
          q: "ศัตรูพืชสำคัญที่กัดกินต้นกล้าข้าวในระยะปักดำช่วงน้ำขังอย่างรวดเร็วคือสิ่งใด?",
          options: ["A) ตั๊กแตนตำข้าว", "B) หอยเชอรี่", "C) ด้วงเต่า", "D) แมลงปอ"],
          correct: 1,
          exp: "หอยเชอรี่เป็นศัตรูพืชร้ายแรงในระยะกล้าข้าว กินต้นข้าวอ่อนใต้น้ำได้อย่างรวดเร็วในสภาพน้ำขัง"
        },
        {
          q: "การสร้าง 'ฝายชะลอน้ำ' (Check Dam) บนยอดเขามีประโยชน์ต่อพื้นที่เกษตรอย่างไร?",
          options: [
            "A) ดักตะกอนดิน ชะลอน้ำหลาก และเพิ่มความชุ่มชื้นให้ดินต้นน้ำ",
            "B) ทำให้น้ำท่วมเมือง",
            "C) กักเก็บน้ำไว้ไม่ให้ไหลลงสู่ข้างล่างเลย",
            "D) ทำลายป่าไม้"
          ],
          correct: 0,
          exp: "ฝายชะลอน้ำช่วยดักตะกอนดินอุดมสมบูรณ์ ชะลอความเร็วน้ำ และช่วยให้น้ำซึมลงสู่ชั้นดินใต้ดินอย่างยั่งยืน"
        }
      ]
    },

    "canyon": {
      title: "แท่นใต้ต้นเบาบับเวหา (Savanna Agroforestry Altar)",
      topic: "ศาสตร์วนเกษตร (Agroforestry) และการปลูกหญ้าแฝกยึดดิน",
      desc: "บททดสอบว่าด้วยการปลูกป่าร่วมกับพืชเกษตร การสร้างแนวกำแพงรากหญ้าแฝก และพืชทนแล้ง",
      questions: [
        {
          q: "'วนเกษตร' (Agroforestry) มีหลักการสำคัญอย่างไร?",
          options: [
            "A) การตัดต้นไม้ใหญ่ทั้งหมดเพื่อปลูกพืชเชิงเดี่ยว",
            "B) การปลูกไม้ยืนต้นร่วมกับพืชเกษตรและปศุสัตว์อย่างเกื้อกูลกัน",
            "C) การทำเกษตรในร่มที่ไม่โดนแดด",
            "D) การปลูกเฉพาะพืชน้ำ"
          ],
          correct: 1,
          exp: "วนเกษตรเลียนแบบโครงสร้างป่าธรรมชาติ ไม้ยืนต้นให้ร่มเงา บังลม และร่วงหล่นเป็นปุ๋ยแก่พืชชั้นล่าง"
        },
        {
          q: "คุณสมบัติเด่นของ 'หญ้าแฝก' ที่พระบาทสมเด็จพระเจ้าอยู่หัว ร.9 พระราชทานแนวคิดคืออะไร?",
          options: [
            "A) รากหยั่งลึกเป็นแนวกำแพงธรรมชาติ ป้องกันดินพังทลายและอุ้มน้ำ",
            "B) เป็นวัชพืชที่ทำลายพืชอื่น",
            "C) มีใบกินเป็นอาหารหลัก",
            "D) รากตื้นแผ่ผิวดิน"
          ],
          correct: 0,
          exp: "รากหญ้าแฝกหยั่งลึกในแนวดิ่งถึง 3-5 เมตร สานกันแน่นเหมือนกำแพงใต้ดิน ช่วยยึดหน้าดินและกักเก็บน้ำ"
        },
        {
          q: "ไม้ยืนต้นทรงพุ่มสูงในระบบวนเกษตรช่วยพืชชั้นล่างในสภาพอากาศแห้งแล้งอย่างไร?",
          options: [
            "A) กรองแสงแดดแรงจัด ลดการคายน้ำ และใบร่วงกลายเป็นฮิวมัส",
            "B) แย่งแสงแดดจนพืชล่างตาย",
            "C) ดูดน้ำจากพืชล่าง",
            "D) ปล่อยความร้อนลงสู่ดิน"
          ],
          correct: 0,
          exp: "เรือนยอดไม้ใหญ่ช่วยลดอุณหภูมิผิวแปลง ลดการระเหยน้ำ และรากไม้ลึกช่วยดึงแร่ธาตุขึ้นมาสู่ผิวดิน"
        }
      ]
    },

    "laboratory": {
      title: "แท่นอนุรักษ์พันธุกรรมพืชเวหา (Global Sky Seed Vault Altar)",
      topic: "พันธุศาสตร์พืช การเพาะเลี้ยงเนื้อเยื่อ และคลังเมล็ดพันธุ์",
      desc: "บททดสอบว่าด้วยการอนุรักษ์พันธุกรรมพืช การขยายพันธุ์ปลอดโรค และความหลากหลายทางชีวภาพ",
      questions: [
        {
          q: "การเก็บรักษาเมล็ดพันธุ์ใน 'คลังเมล็ดพันธุ์' (Seed Vault) ต้องควบคุมสภาวะอย่างไร?",
          options: [
            "A) อุณหภูมิติดลบ (-18°C) และมีความชื้นสัมพัทธ์ต่ำมาก",
            "B) แช่ในน้ำร้อนตลอดเวลา",
            "C) วางกลางแจ้งแดดจัด",
            "D) เก็บในที่ชื้นแฉะ"
          ],
          correct: 0,
          exp: "ความเย็นจัดและความแห้งจะชะลอกระบวนการเมตาบอลิซึมของเมล็ด ทำให้เมล็ดคงความมีชีวิตได้นานนับร้อยปี"
        },
        {
          q: "ประโยชน์หลักของการเพาะเลี้ยงเนื้อเยื่อพืช (Plant Tissue Culture) คืออะไร?",
          options: [
            "A) ขยายพันธุ์พืชปลอดโรคได้ปริมาณมหาศาลในระยะเวลาสั้น",
            "B) ทำให้พืชกลายพันธุ์เป็นวัชพืช",
            "C) ปลูกได้เฉพาะพืชไม่มีใบ",
            "D) ต้องใช้พื้นที่ขนาดใหญ่กว่าแปลงดิน"
          ],
          correct: 0,
          exp: "การเพาะเลี้ยงเนื้อเยื่อในสภาพปลอดเชื้อช่วยเพิ่มจำนวนต้นกล้าที่แข็งแรง ปลอดโรค และมีลักษณะตรงตามพันธุ์"
        },
        {
          q: "เหตุใดการรักษา 'ความหลากหลายทางพันธุกรรมพืช' จึงสำคัญต่อความมั่นคงทางอาหาร?",
          options: [
            "A) ช่วยให้มีสายพันธุ์ต้านทานโรคใหม่และทนสภาพอากาศสุดขั้วในอนาคต",
            "B) เพื่อให้พืชมีสีเดียวเหมือนกันหมด",
            "C) ลดจำนวนสายพันธุ์พืชในธรรมชาติ",
            "D) ทำให้พืชไม่ต้องการปุ๋ยและน้ำ"
          ],
          correct: 0,
          exp: "ความหลากหลายทางพันธุกรรมเป็นคลังยีนสำคัญ เมื่อเกิดโรคระบาดใหม่หรือภัยแล้ง จะมียีนต้านทานที่นำมาปรับปรุงพันธุ์ได้"
        }
      ]
    },

    "white_cathedral": {
      title: "แท่นมหากสิกรรมแห่งแสง (Sanctuary Altar)",
      topic: "การประมวลองค์ความรู้เกษตรกรรมครบวงจร สู่ความอุดมสมบูรณ์",
      desc: "บททดสอบก่อนเข้าสู่ประตูบอส ประมวลความรู้เรื่องดิน น้ำ ฤดูกาล ชีววิธี วนเกษตร และเทคโนโลยีเกษตร",
      questions: [
        {
          q: "การทำเกษตรอินทรีย์ผสมผสานอย่างยั่งยืนส่งผลดีที่สุดต่อระบบนิเวศอย่างไร?",
          options: [
            "A) ฟื้นฟูความอุดมสมบูรณ์ของดิน ปลอดสารพิษ และเพิ่มความหลากหลายทางชีวภาพ",
            "B) ดินเสื่อมสภาพเร็วขึ้น",
            "C) ผลผลิตปนเปื้อนสารเคมี",
            "D) กำจัดสิ่งมีชีวิตในดินทั้งหมด"
          ],
          correct: 0,
          exp: "เกษตรอินทรีย์ไม่ใช้สารเคมีสังเคราะห์ ฟื้นคืนจุลินทรีย์ในดิน และสร้างระบบนิเวศที่พึ่งพาตนเองได้"
        },
        {
          q: "การปรับปรุงดินด้วย 'ปุ๋ยพืชสด' (เช่น ปลูกถั่วพร้า/ปอเทืองแล้วไถกลบ) เพิ่มธาตุอาหารหลักใด?",
          options: ["A) ธาตุไนโตรเจน (N)", "B) สารปรอท", "C) ก๊าซมีเทน", "D) เกลือโซเดียม"],
          correct: 0,
          exp: "พืชตระกูลถั่วมีปมรากไรโซเบียมช่วยตรึงไนโตรเจนจากอากาศ เมื่อไถกลบจะปลดปล่อยไนโตรเจนอินทรีย์สู่ดิน"
        },
        {
          q: "การจัดการศัตรูพืชแบบผสมผสาน (IPM) ยึดหลักการใดเป็นอันดับแรก?",
          options: [
            "A) ใช้เขตกรรม ชีววิธี และสมุนไพรก่อนการใช้สารเคมีเป็นทางเลือกสุดท้าย",
            "B) ฉีดยาฆ่าแมลงเข้มข้นทันทีที่เห็นแมลง 1 ตัว",
            "C) เผาแปลงเกษตรทิ้ง",
            "D) ละทิ้งแปลงเกษตร"
          ],
          correct: 0,
          exp: "IPM เน้นการป้องกัน การใช้ตัวห้ำตัวเบียน สมุนไพร และวิธีธรรมชาติ เพื่อควบคุมศัตรูพืชให้อยู่ในระดับที่ไม่เสียหาย"
        }
      ]
    },

    "lunar_gallery": {
      title: "แท่นพฤกษาใต้แสงจันทร์ (Celestial Tree Altar)",
      topic: "เกษตรกรรมยั่งยืนนิรันดร์และสมดุลแห่งธรรมชาติ",
      desc: "บททดสอบแห่งปราชญ์สูงสุด ว่าด้วยการหมุนเวียนธาตุอาหารและการอนุรักษ์สิ่งแวดล้อม",
      questions: [
        {
          q: "องค์ประกอบสำคัญที่สุดของเกษตรกรรมยั่งยืนคือข้อใด?",
          options: [
            "A) การรักษาสมดุลระหว่างดิน น้ำ พืช สัตว์ และสิ่งแวดล้อมเพื่อคนรุ่นหลัง",
            "B) การตักตวงผลประโยชน์ระยะสั้นโดยไม่คำนึงถึงดิน",
            "C) การใช้สารเคมีปริมาณสูงสุด",
            "D) การถางป่าสร้างแปลงขนาดใหญ่"
          ],
          correct: 0,
          exp: "เกษตรยั่งยืนคือการผลิตอาหารที่มีคุณภาพ ควบคู่กับการอนุรักษ์ทรัพยากรธรรมชาติและฟื้นฟูดินเพื่ออนาคต"
        },
        {
          q: "การหมุนเวียนของเสียในแปลงเกษตรมาใช้ใหม่ (Zero Waste Agriculture) สอดคล้องกับแนวคิดใด?",
          options: [
            "A) เศรษฐกิจหมุนเวียน (Circular Agriculture)",
            "B) การทำลายสิ่งแวดล้อม",
            "C) การเผาตอซังข้าว",
            "D) การทิ้งเศษพืชลงแม่น้ำ"
          ],
          correct: 0,
          exp: "การนำมูลสัตว์ เศษพืช และน้ำทิ้งมาหมักเป็นปุ๋ยและก๊าซชีวภาพ ช่วยลดต้นทุนและไม่ก่อให้เกิดมลภาวะ"
        },
        {
          q: "จุลินทรีย์ที่มีประโยชน์ในดิน (Beneficial Microorganisms) ทำหน้าที่หลักอย่างไร?",
          options: [
            "A) ย่อยสลายอินทรียวัตถุ ปลดปล่อยธาตุอาหาร และยับยั้งเชื้อก่อโรค",
            "B) ทำให้ดินเน่าเสีย",
            "C) แย่งอาหารพืช",
            "D) กัดกินลำต้นพืช"
          ],
          correct: 0,
          exp: "จุลินทรีย์ดินช่วยย่อยซากพืชซากสัตว์เป็นฮิวมัส สร้างฮอร์โมนกระตุ้นราก และช่วยป้องกันเชื้อราก่อโรคในดิน"
        }
      ]
    }
  },

  // 10 Comprehensive Master Questions for the Grand Boss Battle in White Cathedral
  bossQuestions: [
    {
      q: "ดินที่มีค่า pH ต่ำกว่า 5.5 จัดเป็นดินประเภทใด และควรใช้วัสดุใดในการปรับปรุงดิน?",
      options: [
        "A) ดินด่าง — ใส่ปูนขาว",
        "B) ดินกรด (เปรี้ยว) — ใส่ปูนขาวหรือโดโลไมท์",
        "C) ดินเค็ม — ใส่เกลือสมุทร",
        "D) ดินทราย — ใส่น้ำตาล"
      ],
      correct: 1,
      exp: "ดิน pH < 5.5 คือดินกรดจัด ปูนขาวและโดโลไมท์มีฤทธิ์เป็นด่าง ช่วยยกระดับ pH ให้อยู่ในช่วง 6.0 - 7.0"
    },
    {
      q: "ในฤดูร้อนแล้งขาดแคลนน้ำ ควรเลือกปลูกพืชและมีวิธีดูแลหน้าดินอย่างไร?",
      options: [
        "A) ปลูกสลัดใบและปล่อยหน้าดินโล่ง",
        "B) ปลูกพืชทนแล้งรากลึก (ข้าวโพด/มันสำปะหลัง) และคลุมดินด้วยฟาง",
        "C) รดน้ำตอนเที่ยงวันแดดจัด",
        "D) ขุดลอกหน้าดินทิ้ง"
      ],
      correct: 1,
      exp: "ข้าวโพดและมันสำปะหลังมีรากลึกทนแล้ง และฟางคลุมดินช่วยลดการระเหยของน้ำได้มากกว่า 50%"
    },
    {
      q: "การควบคุมเพลี้ยอ่อนด้วย 'ชีววิธี' (Biological Control) ควรใช้วิธีใด?",
      options: [
        "A) ปล่อยแมลงเต่าทอง (ตัวห้ำ) และฉีดสารสกัดสะเดา",
        "B) ฉีดยาฆ่าหญ้า",
        "C) รมควันแปลงด้วยสารเคมีอันตราย",
        "D) ปล่อยหนูนา"
      ],
      correct: 0,
      exp: "แมลงเต่าทองกินเพลี้ยอ่อนเป็นอาหาร และสารสกัดสะเดามี Azadirachtin ช่วยยับยั้งการเจริญเติบโตของหนอน"
    },
    {
      q: "ขั้นตอนแรกสุดของการเตรียมแปลงปลูกพืชที่ถูกต้องคือข้อใด?",
      options: [
        "A) ใส่ปุ๋ยเคมีเข้มข้นทันที",
        "B) ไถดะตากดิน 7-14 วัน เพื่อกำจัดวัชพืชและตัดวงจรโรคพืช",
        "C) หว่านเมล็ดในดินแน่นทึบ",
        "D) รดน้ำจนแฉะท่วมขัง"
      ],
      correct: 1,
      exp: "การไถดะตากดินช่วยให้แสงแดดฆ่าเชื้อรา ไข่แมลง และเมล็ดวัชพืชที่ซ่อนอยู่ในดิน"
    },
    {
      q: "ในระบบ 'อควาโปนิกส์' (Aquaponics) พืชได้รับธาตุอาหารไนโตรเจนจากสิ่งใด?",
      options: [
        "A) แบคทีเรียเปลี่ยนแอมโมเนียในมูลปลาเป็นไนเตรต",
        "B) ปลากัดกินรากพืช",
        "C) ปุ๋ยเคมีเข้มข้นที่เทลงในบ่อปลา",
        "D) น้ำฝนจากเมฆ"
      ],
      correct: 0,
      exp: "แบคทีเรียย่อยสลายของเสียจากปลาให้กลายเป็นไนเตรต ซึ่งเป็นปุ๋ยธรรมชาติที่พืชดูดซึมไปใช้ได้ทันที"
    },
    {
      q: "วัตถุประสงค์หลักของการทำแปลงเกษตรแบบ 'นาขั้นบันได' บนพื้นที่ลาดชันคืออะไร?",
      options: [
        "A) ชะลอความเร็วของน้ำ ลดการชะล้างพังทลายของหน้าดิน",
        "B) ทำให้ดินแห้งเร็วขึ้น",
        "C) เพิ่มความลาดชันของภูเขา",
        "D) ลดปริมาณออกซิเจนในดิน"
      ],
      correct: 0,
      exp: "คันนาขั้นบันไดช่วยกักเก็บน้ำฝนบนภูเขา ชะลอน้ำหลาก และป้องกันการสูญเสียหน้าดินที่อุดมสมบูรณ์"
    },
    {
      q: "คุณสมบัติเด่นของ 'หญ้าแฝก' ในการอนุรักษ์ดินและน้ำตามแนวพระราชดำริคืออะไร?",
      options: [
        "A) รากหยั่งลึกสานเป็นกำแพงใต้ดิน ยึดหน้าดินไม่ให้พังทลายและกักเก็บน้ำ",
        "B) เป็นวัชพืชแย่งอาหาร",
        "C) มีใบกินเป็นผลไม้",
        "D) รากตื้นแผ่กว้างผิวดิน"
      ],
      correct: 0,
      exp: "รากหญ้าแฝกหยั่งลึกในแนวดิ่ง 3-5 เมตร สานแน่นเป็นแนวกำแพงธรรมชาติ ป้องกันดินถล่มและอุ้มน้ำใต้ดิน"
    },
    {
      q: "ประโยชน์สูงสุดของเทคโนโลยี 'เกษตรแม่นยำ' (Precision Agriculture) และ IoT คืออะไร?",
      options: [
        "A) ตรวจวัดความชื้นและธาตุอาหาร เพื่อจ่ายน้ำและปุ๋ยได้ตรงจุดและประหยัด",
        "B) ใช้สารเคมีเพิ่มขึ้น 10 เท่า",
        "C) ทำให้ไม่ต้องดูแลแปลงพืชเลย",
        "D) เปลี่ยนสีของผลไม้"
      ],
      correct: 0,
      exp: "เซนเซอร์ IoT ช่วยวัดความต้องการของพืชแบบ Real-time ทำให้ให้น้ำและปุ๋ยอย่างคุ้มค่า ลดต้นทุนและผลกระทบต่อสิ่งแวดล้อม"
    },
    {
      q: "การเก็บรักษาเมล็ดพันธุ์ใน 'คลังเมล็ดพันธุ์' (Seed Vault) ต้องควบคุมสภาวะอย่างไร?",
      options: [
        "A) อุณหภูมิติดลบ (-18°C) และความชื้นสัมพัทธ์ต่ำมาก",
        "B) วางกลางแจ้งแดดจัด",
        "C) แช่ในน้ำร้อนตลอดเวลา",
        "D) เก็บในดินเหนียวเปียก"
      ],
      correct: 0,
      exp: "อุณหภูมิติดลบและความแห้งช่วยชะลอการเสื่อมสภาพของเซลล์ ทำให้เมล็ดคงอัตราการงอกได้นานนับร้อยปี"
    },
    {
      q: "'วนเกษตร' (Agroforestry) ช่วยสร้างความมั่นคงและความยั่งยืนให้แก่ระบบเกษตรอย่างไร?",
      options: [
        "A) ปลูกไม้ยืนต้นร่วมกับพืชเกษตร ให้ร่มเงา รักษาความชื้น และลดความเสี่ยงทางเศรษฐกิจ",
        "B) ตัดต้นไม้ทั้งหมดเพื่อทำพืชเชิงเดี่ยว",
        "C) ใช้ยาฆ่าแมลงปริมาณสูง",
        "D) ปลูกพืชชนิดเดียวทั้งฟาร์ม"
      ],
      correct: 0,
      exp: "วนเกษตรสร้างความหลากหลายทางชีวภาพ มีผลผลิตเก็บเกี่ยวได้ตลอดทั้งปี และช่วยรักษาความอุดมสมบูรณ์ของระบบนิเวศ"
    }
  ],

  // 4 Major Regional Sectors
  islands: [
    {
      id: 1,
      name: "หมู่เกาะฟื้นฟูดินและปฐมภูมิ (Soil & Genesis Archipelago)",
      bossName: "ร่างจำแลง : ปีศาจปฐพีแปรปรวน (Disrupted Soil Demon)",
      questions: []
    }
  ]
};

/* ==============================================================================
       SUPER MEGA ENGINE CONTROLLER (STATE, MINIGAMES & RENDERING)
       ============================================================================== */
class TerraQuestSuperEngine {
  constructor() {
    this.canvas = document.getElementById("gameCanvas");
    const dpr = window.devicePixelRatio || 1;
    this.canvas.width = 960 * dpr;
    this.canvas.height = 540 * dpr;
    this.canvas.style.width = "960px";
    this.canvas.style.height = "540px";
    this.ctx = this.canvas.getContext("2d");
    this.ctx.scale(dpr, dpr);
    this.ctx.imageSmoothingEnabled = true;
    this.ctx.imageSmoothingQuality = "high";

    this.sound = new RetroSoundEngine();
    
    this.bgImage = new window.Image();
    this.bgImage.src = "/images/village_bg.jpg";

    this.player = {
      name: "ผู้กล้า",
      gender: "farmer_m",
      x: 150,
      y: 392,
      vx: 0,
      vy: 0,
      dx: 0,
      dy: 0,
      width: 32,
      height: 48,
      speed: 4.5,
      jumpPower: 12,
      isGrounded: true,
      facingRight: true,
      state: 'idle',
      frameCount: 0,
      custom: {
        hat: "none",
        hairStyle: "short",
        hairColor: "#e17055",
        shirt: "overalls",
        shirtColor: "#2a5298",
        pants: "jeans",
        pantsColor: "#1a252c",
        costume: "none"
      }
    };

    this.tempName = "";
    this.namingLang = "TH"; // "TH" or "EN"
    this.namingStage = "TYPING"; // "TYPING" or "CONFIRMING"
    this.gridRow = 0;
    this.gridCol = 0;

    this.gravity = 0.65;
    this.groundY = 440;
    this.currentIslandIndex = 0;
    this.gameState = "MAIN_MENU";
    this.currentSaveSlot = 1;
    this.cameraX = 0;
    this.worldWidth = 2400;
    this.currentRoomId = "holy_chapel";
    this.roomsDiscovered = { "holy_chapel": true };
    this.selectedMapRoomId = "holy_chapel";
    this.showMapSidebar = false; // Toggleable side inspection card
    this.mapPanX = 0;
    this.mapPanY = 0;
    this.isDraggingMap = false;
    this.mapDragStartX = 0;
    this.mapDragStartY = 0;
    this.lastMapClickTime = 0;
    this.lastMapClickNode = null;
    this.inventory = [];
    this.npcAppearances = {};
    this.notification = null;
    this.notificationTimer = 0;
    this.mapAnimTimer = 0;

    this.currentQuestionIdx = 0;
    this.quizTimer = 20;
    this.quizInterval = null;
    this.totalScore = 0;
    this.bossHp = 100;

    this.particles = [];
    this.selectedCrops = [];
    this.selectedPests = [];

    // pH Mixer Lab state
    this.mixerPh = 4.2;

    // Nursery Seedling Lab Simulator state
    this.nurserySim = { active: false, timer: 30, growth: 0, moisture: 50, temp: 50, light: 50, loop: null, mistLoop: null };

    // Crop Planting Grid state
    this.cropSlots = [null, null];
    this.selectedCropItem = null;

    // Knowledge Jigsaw state
    this.jigsawSelectedProblem = null;
    this.jigsawMatched = 0;
    this.jigsawTimer = 30;
    this.jigsawInterval = null;

    // Sort It Right state
    this.sortItems = [];

    // Speed Quiz Blitz state
    this.speedQuizQuestions = [];
    this.speedQuizIdx = 0;
    this.speedCombo = 0;
    this.speedCorrect = 0;
    this.speedTimer = 5;
    this.speedInterval = null;

    // Boss combo system
    this.bossCombo = 0;

    // Minigame result callback
    this.minigameResultCallback = null;

    // Main Menu chase animation state
    this.menuChase = {
      heroX: 200,
      heroY: 392,
      demonX: 50,
      demonY: 360,
      direction: 1,
      heroSpeed: 3.2,
      demonSpeed: 2.6,
      frameCount: 0,
      panicTimer: 0,
      dustParticles: [],
      stars: []
    };
    // Pre-generate menu stars
    for (let i = 0; i < 50; i++) {
      this.menuChase.stars.push({
        x: Math.random() * 960,
        y: Math.random() * 300,
        size: Math.random() * 2 + 1,
        twinkleSpeed: 0.02 + Math.random() * 0.04
      });
    }

    this.defineWorldMap();
    this.loadRoom(this.currentRoomId);
    
    // Settings state & persistence
    this.settings = {
      masterVol: 100,
      bgmVol: 60,
      sfxVol: 80,
      scanlines: true,
      particles: true,
      vignette: true
    };
    this.loadSettings();
    this.applySettings();

    this.keys = {};
    this.initEvents();
    this.gameLoop();
  }

  /* ===== SETTINGS: Load, Save, Apply ===== */
  loadSettings() {
    try {
      const saved = localStorage.getItem("harvest_frontier_settings");
      if (saved) {
        this.settings = { ...this.settings, ...JSON.parse(saved) };
      }
    } catch (e) {
      console.warn("Could not load settings from localStorage", e);
    }
  }

  saveSettings() {
    try {
      localStorage.setItem("harvest_frontier_settings", JSON.stringify(this.settings));
      this.showNotification("💾 บันทึกการตั้งค่าเรียบร้อยแล้ว!", "#00f5d4");
    } catch (e) {
      console.warn("Could not save settings to localStorage", e);
    }
  }

  applySettings() {
    this.sound.setVolumes(
      this.settings.masterVol / 100,
      this.settings.bgmVol / 100,
      this.settings.sfxVol / 100
    );

    if (this.settings.bgmVol > 0 && this.settings.masterVol > 0) {
      this.sound.startBGM();
    } else {
      this.sound.stopBGM();
    }

    const scanlineEl = document.getElementById("scanline-overlay");
    if (scanlineEl) {
      scanlineEl.style.display = this.settings.scanlines ? "block" : "none";
    }

    const sMaster = document.getElementById("slider-vol-master");
    const vMaster = document.getElementById("val-vol-master");
    if (sMaster && vMaster) {
      sMaster.value = this.settings.masterVol;
      vMaster.innerText = this.settings.masterVol + "%";
    }

    const sBgm = document.getElementById("slider-vol-bgm");
    const vBgm = document.getElementById("val-vol-bgm");
    if (sBgm && vBgm) {
      sBgm.value = this.settings.bgmVol;
      vBgm.innerText = this.settings.bgmVol + "%";
    }

    const sSfx = document.getElementById("slider-vol-sfx");
    const vSfx = document.getElementById("val-vol-sfx");
    if (sSfx && vSfx) {
      sSfx.value = this.settings.sfxVol;
      vSfx.innerText = this.settings.sfxVol + "%";
    }

    const tScan = document.getElementById("toggle-scanlines");
    if (tScan) tScan.checked = !!this.settings.scanlines;

    const tPart = document.getElementById("toggle-particles");
    if (tPart) tPart.checked = !!this.settings.particles;

    const tVig = document.getElementById("toggle-vignette");
    if (tVig) tVig.checked = !!this.settings.vignette;
  }

  toggleSettings() {
    const modal = document.getElementById("modal-settings");
    if (modal) {
      const isOpening = modal.classList.contains("hidden");
      if (isOpening) {
        this.sound.playCoin();
        this.applySettings();
        modal.classList.remove("hidden");
      } else {
        this.sound.playShoot();
        modal.classList.add("hidden");
      }
    }
  }

  defineWorldMap() {
    this.WORLD_MAP = {
      "holy_chapel": {
        id: "holy_chapel",
        name: "Sky Nursery Zone",
        nameTh: "เขตเรือนเพาะชำลอยฟ้า",
        shortNameTh: "เรือนเพาะชำ",
        shortNameEn: "Sky Nursery",
        icon: "🌱",
        subtitle: "Floating Genesis Sanctuary & Seed Aeroponics",
        theme: "sanctum",
        color: "#52b788",
        width: 1800,
        mapX: 80, mapY: 270,
        altars: ["แท่นพฤกษาเวหา (Genesis Sky Altar)"],
        npcs: ["พฤกษากร Vendetta (ผู้ดูแลเรือนเพาะชำเวหา)", "หุ่นฟางซ้อมการเกษตร"],
        poi: ["โต๊ะปรุงสูตรสารอาหารพืชไร้ดิน (Aeroponic Table)"],
        equipment: ["เคียวเก็บเกี่ยวอินทรีย์เวหา (Sky Sickle)", "แหวนพิทักษ์เกาะลอยฟ้า (Sky Ring)"],
        spells: ["ละอองเร่งราก (Root Surge)", "ลำแสงสังเคราะห์แสงเวหา (Solar Beam)"],
        items: ["น้ำหมักจุลินทรีย์เข้มข้น", "ผลึกธาตุอาหารเวหา x1"],
        boss: "-",
        connections: ["abandoned_village"],
        entities: [
          {
            type: "npc", id: "vendetta", x: 350, y: 392, width: 32, height: 48,
            name: "พฤกษากร Vendetta", icon: "👩‍🌾", gender: "farmer_f",
            dialogue: [
              "ยินดีต้อนรับสู่ 'เกาะเรือนเพาะชำลอยฟ้า'... แหล่งกำเนิดเมล็ดพันธุ์อินทรีย์แห่งหมู่เกาะเวหา!",
              "หมู่เกาะลอยฟ้าการเกษตรแห่งนี้กำลังเผชิญวิกฤตดินเสื่อมโทรม ศัตรูพืชระบาด และภัยแล้ง",
              "ก่อนออกเดินทางข้ามสะพาน ลองแวะไปที่ 'ห้องเพาะกล้าลอยฟ้า' ทางขวามือดูสิ",
              "การฝึกเพาะกล้าแบบระบบปิดที่นั่น จะทำให้เจ้าเข้าใจความลับของการกำเนิดต้นไม้!"
            ]
          },
          {
            type: "minigame_nursery", id: "nursery_lab", x: 550, y: 400, width: 48, height: 40,
            name: "ห้องเพาะกล้าลอยฟ้า", icon: "🌱"
          },
          {
            type: "altar", id: "altar_holy", x: 900, y: 380, width: 44, height: 60,
            name: "แท่นพฤกษาเวหา", icon: "🌱"
          },
          {
            type: "item", id: "item_witch_blade", x: 1250, y: 405, width: 28, height: 28,
            name: "เคียวเก็บเกี่ยวอินทรีย์เวหา", icon: "🌾", desc: "เคียวโบราณ เพิ่มประสิทธิภาพการเก็บเกี่ยวบนเกาะลอยฟ้า"
          },
          {
            type: "portal", id: "portal_to_village", targetRoom: "abandoned_village", spawnX: 80,
            x: 1650, y: 350, width: 50, height: 90, name: "🚪 สู่ เขตทุ่งกสิกรรมฟื้นฟู", icon: "🚪"
          }
        ]
      },

      "abandoned_village": {
        id: "abandoned_village",
        name: "Restored Farmland Zone",
        nameTh: "เขตทุ่งกสิกรรมฟื้นฟูดิน",
        shortNameTh: "ทุ่งฟื้นฟูดิน",
        shortNameEn: "Farmland",
        icon: "🧪",
        subtitle: "Floating Organic Farm & Soil Remediation Lab",
        theme: "ruins",
        color: "#2ec4b6",
        width: 2600,
        mapX: 200, mapY: 270,
        altars: ["แท่นปุ๋ยหมักชีวภาพเวหา", "ทางเดินแปลงเกษตรลอยฟ้า"],
        npcs: ["ชาวบ้านผู้ฟื้นฟูดินบนเกาะ", "ซากกังหันลมลอยฟ้า"],
        poi: ["บ่อหมักปุ๋ยอินทรีย์", "แปลงเพาะทดลอง", "บ่อน้ำกักเก็บเมฆ"],
        equipment: ["จอบพรวนดินด้ามเหล็ก", "เคียวใหญ่ตัดหญ้าคลุมดิน"],
        spells: ["หนามรากพืชตรึงไนโตรเจน"],
        items: ["ฮิวมัสบำรุงดินเข้มข้น", "ผลึกธาตุอาหาร x2"],
        boss: "ปีศาจดินกรดเน่าเปื่อย (Acid Soil Fiend)",
        connections: ["holy_chapel", "drawbridge"],
        entities: [
          {
            type: "portal", id: "portal_to_chapel", targetRoom: "holy_chapel", spawnX: 1550,
            x: 40, y: 350, width: 50, height: 90, name: "🚪 กลับ เขตเรือนเพาะชำ", icon: "🚪"
          },
          {
            type: "npc", id: "villager", x: 500, y: 392, width: 32, height: 48,
            name: "ชาวบ้านผู้ฟื้นฟูดิน", icon: "👨‍🌾",
            dialogue: [
              "เกาะลอยฟ้าแห่งนี้เคยอุดมสมบูรณ์มาก่อน แต่ดินกลายเป็นกรดจัดจนพืชผลรากเน่าเสียหาย...",
              "หากต้องการฟื้นฟูดินบนเกาะ ต้องปรับค่า pH ให้อยู่ในช่วง 6.0 - 7.0 ด้วยปูนขาวหรือโดโลไมท์!",
              "ข้างหน้านี้มีแปลงทดลองฟื้นฟูดินอยู่ ลองช่วยใช้ห้องทดลองปรับดินทีนะ"
            ]
          },
          {
            type: "minigame_soil", id: "soil_patch", x: 1000, y: 400, width: 48, height: 40,
            name: "แปลงทดสอบดินกรด", icon: "🧪"
          },
          {
            type: "altar", id: "altar_village", x: 1500, y: 380, width: 44, height: 60,
            name: "แท่นปุ๋ยหมักชีวภาพเวหา", icon: "🌿"
          },
          {
            type: "item", id: "item_claymore", x: 1900, y: 405, width: 28, height: 28,
            name: "จอบพรวนดินด้ามเหล็ก", icon: "⛏️", desc: "จอบคุณภาพสูง พรวนดินให้ร่วนซุยระบายน้ำดี"
          },
          {
            type: "portal", id: "portal_to_drawbridge", targetRoom: "drawbridge", spawnX: 80,
            x: 2450, y: 350, width: 50, height: 90, name: "🚪 สู่ เขตสวนผลไม้และน้ำตกเวหา", icon: "🚪"
          }
        ]
      },

      "drawbridge": {
        id: "drawbridge",
        name: "Sky Orchard & Waterfalls",
        nameTh: "เขตสวนผลไม้และน้ำตก",
        shortNameTh: "สวนผลไม้น้ำตก",
        shortNameEn: "Sky Orchard",
        icon: "💧",
        subtitle: "Cascading Waterfalls & Fruit Orchard",
        theme: "storm",
        color: "#f77f00",
        width: 2600,
        mapX: 200, mapY: 130,
        altars: ["แท่นน้ำตกเวหา", "ศาลาพักร่มเงาสวนส้มลอยฟ้า"],
        npcs: ["วิศวกรชลประทานเวหา"],
        poi: ["กังหันผันน้ำตกเวหา", "ประตูระบายน้ำฝนเกาะลอยฟ้า"],
        equipment: ["มีดตัดแต่งกิ่งผลไม้", "กระบอกสเปรย์น้ำแร่"],
        spells: ["ละอองฝนเทียม", "เกราะป้องกันลมพายุเวหา"],
        items: ["น้ำแร่บริสุทธิ์บำรุงพืช", "ผลึกธาตุอาหาร x1"],
        boss: "อสูรภัยแล้งเผาผลาญ (Drought Behemoth)",
        connections: ["abandoned_village", "rodenia_chapel", "buried_church"],
        entities: [
          {
            type: "portal", id: "portal_to_village", targetRoom: "abandoned_village", spawnX: 2350,
            x: 40, y: 350, width: 50, height: 90, name: "🚪 กลับ เขตทุ่งกสิกรรมฟื้นฟู", icon: "🚪"
          },
          {
            type: "npc", id: "watchman", x: 600, y: 392, width: 32, height: 48,
            name: "วิศวกรชลประทานเวหา", icon: "👷‍♂️",
            dialogue: [
              "เกาะสวนผลไม้ลอยฟ้าแห่งนี้เผชิญภัยแล้งจัด น้ำตกเวหาเริ่มเหือดแห้ง...",
              "สะพานเวหาแยกออกเป็น 2 สาย: ทางบนไป 'เกาะพฤกษศาสตร์สมุนไพร' และทางขวาไป 'เกาะห้องทดลองรากพืชใต้เกาะ'!",
              "อย่าลืมช่วยเลือกปลูกพืชทนแล้งรากลึก เช่น ข้าวโพดและมันสำปะหลังที่แปลงข้างหน้านะ!"
            ]
          },
          {
            type: "altar", id: "altar_bridge", x: 1200, y: 380, width: 44, height: 60,
            name: "แท่นน้ำตกเวหา", icon: "💧"
          },
          {
            type: "minigame_season", id: "season_patch", x: 1500, y: 400, width: 48, height: 40,
            name: "🌾 แปลงทดลองรับมือภัยแล้ง", icon: "🌾"
          },
          {
            type: "portal", id: "portal_to_rodenia", targetRoom: "rodenia_chapel", spawnX: 80,
            x: 1800, y: 350, width: 50, height: 90, name: "🚪 สู่ เขตสมุนไพรลอยฟ้า", icon: "🚪"
          },
          {
            type: "portal", id: "portal_to_buried", targetRoom: "buried_church", spawnX: 80,
            x: 2450, y: 350, width: 50, height: 90, name: "🚪 สู่ เขตรากพืชใต้พิภพ", icon: "🚪"
          }
        ]
      },

      "rodenia_chapel": {
        id: "rodenia_chapel",
        name: "Floating Botanical Sanctuary",
        nameTh: "เขตพฤกษศาสตร์สมุนไพร",
        shortNameTh: "พฤกษาสมุนไพร",
        shortNameEn: "Botanical",
        icon: "🌿",
        subtitle: "Sky Herbal Conservatory & Organic Pest Protection",
        theme: "chapel",
        color: "#9b5de5",
        width: 2200,
        mapX: 330, mapY: 130,
        altars: ["แท่นสกัดสมุนไพรเวหา", "ห้องอบแห้งใบสะเดาลอยฟ้า"],
        npcs: ["Sister Beatrice (นักพฤกษศาสตร์สมุนไพร)"],
        poi: ["แปลงลาเวนเดอร์และสะเดาลอยฟ้า", "หม้อต้มสารสกัดชีวภาพ"],
        equipment: ["มีดเก็บสมุนไพรประณีต", "คทาสารสกัดสะเดา"],
        spells: ["ไอระเหยสะเดาไล่แมลง"],
        items: ["สารสกัดสะเดาเข้มข้น", "ผลึกธาตุอาหาร x1"],
        boss: "ปีศาจเชื้อราและเพลี้ยไฟ (Mold & Blight Lord)",
        connections: ["drawbridge", "buried_church"],
        entities: [
          {
            type: "portal", id: "portal_to_drawbridge", targetRoom: "drawbridge", spawnX: 1700,
            x: 40, y: 350, width: 50, height: 90, name: "🚪 กลับ เขตสวนผลไม้", icon: "🚪"
          },
          {
            type: "npc", id: "sister_beatrice", x: 600, y: 392, width: 32, height: 48,
            name: "Sister Beatrice", icon: "🧕", gender: "farmer_f",
            dialogue: [
              "เกาะพฤกษศาสตร์ลอยฟ้าแห่งนี้ รวบรวมพืชสมุนไพรไล่แมลงและพืชบำรุงดินกว่าร้อยชนิดท่ามกลางสายหมอก!",
              "การเตรียมดินก่อนปลูกพืชจำเป็นต้องทำตามลำดับขั้นตอนที่ถูกต้อง เพื่อตัดวงจรโรคพืช",
              "ลองทดสอบจัดเรียงขั้นตอนการเตรียมดินที่แท่นข้างหน้านี้ดูสิ!"
            ]
          },
          {
            type: "altar", id: "altar_rodenia", x: 1100, y: 380, width: 44, height: 60,
            name: "แท่นสกัดสมุนไพรเวหา", icon: "🌿"
          },
          {
            type: "minigame_sort", id: "sort_patch", x: 1300, y: 400, width: 48, height: 40,
            name: "🔀 แท่นจัดลำดับขั้นตอนเตรียมดิน", icon: "🔀"
          },
          {
            type: "item", id: "item_crimson_ring", x: 1500, y: 405, width: 28, height: 28,
            name: "แหวนพฤกษารักษา", icon: "💍", desc: "แหวนสมุนไพร เพิ่มอัตราการฟื้นฟูพลังชีวิต"
          },
          {
            type: "portal", id: "portal_to_buried", targetRoom: "buried_church", spawnX: 100,
            x: 2050, y: 350, width: 50, height: 90, name: "🚪 สู่ เขตรากพืชใต้พิภพ", icon: "🚪"
          }
        ]
      },

      "buried_church": {
        id: "buried_church",
        name: "Sub-Rhizosphere Caverns",
        nameTh: "เขตห้องทดลองรากพืช",
        shortNameTh: "รากพืชใต้พิภพ",
        shortNameEn: "Rhizosphere",
        icon: "🍄",
        subtitle: "Floating Island Caverns & Bio-Compost Research",
        theme: "catacombs",
        color: "#8338ec",
        width: 2800,
        mapX: 330, mapY: 390,
        altars: ["แท่นจุลินทรีย์ใต้เกาะ", "อุโมงค์รากพืชห้อยเวหา"],
        npcs: ["นักจุลชีววิทยาการเกษตร (Captured Witch)", "นักวิจัยรากพืช"],
        poi: ["รังตัวห้ำแมลงเต่าทอง", "ชั้นหินรากพืชห้อยกลางเวหา"],
        equipment: ["พลั่วขุดรากพืช", "โคมไฟเรืองแสงสปอร์"],
        spells: ["เครือข่ายรากพืชไมคอร์ไรซา", "เกราะป้องกันชีววิธี"],
        items: ["2 x ผลึกธาตุอาหาร", "กุญแจห้องวิจัยชีวภาพ"],
        boss: "พญาหนอนศัตรูพืชยักษ์ (Giant Pest Devourer)",
        connections: ["drawbridge", "rodenia_chapel", "ghost_town", "sewers"],
        entities: [
          {
            type: "portal", id: "portal_to_rodenia", targetRoom: "rodenia_chapel", spawnX: 1950,
            x: 40, y: 350, width: 50, height: 90, name: "🚪 สู่ เขตสมุนไพร", icon: "🚪"
          },
          {
            type: "npc", id: "captured_witch", x: 600, y: 392, width: 32, height: 48,
            name: "นักจุลชีววิทยา", icon: "🔬", gender: "farmer_f",
            dialogue: [
              "ใต้ฐานของเกาะลอยฟ้าแห่งนี้ คือโลกของระบบรากที่ยึดเกาะกับก้อนหินลอยฟ้าและจุลินทรีย์นับล้าน!",
              "เราต้องปกป้องแปลงมะเขือเทศลอยฟ้าข้างหน้านี้ด้วยชีววิธีธรรมชาติ เช่น ปล่อยแมลงเต่าทองและฉีดน้ำหมักสะเดา",
              "ทางบนจะขึ้นสู่ 'เกาะนครเกษตรอัจฉริยะ' ส่วนทางล่างจะลงสู่ 'เกาะบึงน้ำอควาโปนิกส์'!"
            ]
          },
          {
            type: "altar", id: "altar_buried", x: 1200, y: 380, width: 44, height: 60,
            name: "แท่นจุลินทรีย์ใต้เกาะ", icon: "🍄"
          },
          {
            type: "minigame_pest", id: "pest_patch", x: 1600, y: 400, width: 48, height: 40,
            name: "🐛 แปลงทดสอบชีววิธีปราบศัตรูพืช", icon: "🐛"
          },
          {
            type: "portal", id: "portal_to_ghost_town", targetRoom: "ghost_town", spawnX: 80,
            x: 2000, y: 350, width: 50, height: 90, name: "🚪 ขึ้นสู่ เขตเกษตรอัจฉริยะ", icon: "🚪"
          },
          {
            type: "portal", id: "portal_to_sewers", targetRoom: "sewers", spawnX: 80,
            x: 2650, y: 350, width: 50, height: 90, name: "🚪 ลงสู่ เขตบึงน้ำอควาโปนิกส์", icon: "🚪"
          }
        ]
      },

      "ghost_town": {
        id: "ghost_town",
        name: "Solar AgriTech Sky City",
        nameTh: "เขตนครเกษตรอัจฉริยะ",
        shortNameTh: "เกษตรอัจฉริยะ",
        shortNameEn: "AgriTech City",
        icon: "☀️",
        subtitle: "Vertical Aeroponics & Solar Drone Sky Metropolis",
        theme: "city",
        color: "#00bbf9",
        width: 2500,
        mapX: 470, mapY: 130,
        altars: ["แท่นโซลาร์เซลล์เวหา", "หอควบคุมโดรนเกษตรอัจฉริยะ"],
        npcs: ["พ่อค้าเทคโนโลยีเกษตร (Illusive Merchant)", "วิศวกรโดรนการเกษตร"],
        poi: ["หอคอยปลูกพืชแนวตั้งลอยฟ้า", "สถานีตรวจวัดสภาพอากาศเวหา"],
        equipment: ["แท็บเล็ตเซนเซอร์ IoT", "มีดเลเซอร์ตัดแต่งกิ่ง"],
        spells: ["โดรนพ่นสารชีวภาพ", "เซนเซอร์ตรวจจับความชื้น"],
        items: ["ชิปประมวลผลเกษตรแม่นยำ", "ผลึกธาตุอาหาร x1"],
        boss: "ไวรัสคอมพิวเตอร์ควบคุมระบบน้ำ (Corrupted AI Irrigator)",
        connections: ["buried_church", "pilgrimage"],
        entities: [
          {
            type: "portal", id: "portal_to_buried", targetRoom: "buried_church", spawnX: 1900,
            x: 40, y: 350, width: 50, height: 90, name: "🚪 กลับ เขตรากพืช", icon: "🚪"
          },
          {
            type: "npc", id: "merchant", x: 700, y: 392, width: 32, height: 48,
            name: "พ่อค้า AgriTech", icon: "🤖",
            dialogue: [
              "ยินดีต้อนรับสู่นครเกษตรอัจฉริยะลอยฟ้า! เราใช้พลังงานแสงอาทิตย์บนยอดเมฆและโดรนดูแลพืชแนวตั้ง",
              "หากเจ้าต้องการทดสอบความสามารถในการวิเคราะห์ปัญหา ลองเล่นมินิเกมจับคู่ปัญหาเกษตรดูสิ!",
              "ทางขวาจะนำเจ้าขึ้นสู่ 'เกาะนาขั้นบันไดเสียดฟ้า' อันตระการตา!"
            ]
          },
          {
            type: "altar", id: "altar_town", x: 1100, y: 380, width: 44, height: 60,
            name: "แท่นโซลาร์เซลล์เวหา", icon: "☀️"
          },
          {
            type: "minigame_jigsaw", id: "jigsaw_patch", x: 1500, y: 400, width: 48, height: 40,
            name: "🧩 ปริศนาจับคู่ปัญหาเกษตร", icon: "🧩"
          },
          {
            type: "item", id: "item_assassin", x: 1800, y: 405, width: 28, height: 28,
            name: "มีดเซนเซอร์ความแม่นยำ", icon: "🔪", desc: "มีดเก็บเกี่ยวอัจฉริยะ ตรวจวัดความหวานของผลไม้"
          },
          {
            type: "portal", id: "portal_to_pilgrimage", targetRoom: "pilgrimage", spawnX: 80,
            x: 2350, y: 350, width: 50, height: 90, name: "🚪 สู่ เขตนาขั้นบันไดเสียดฟ้า", icon: "🚪"
          }
        ]
      },

      "sewers": {
        id: "sewers",
        name: "Celestial Aquaponics Wetland",
        nameTh: "เขตบึงน้ำอควาโปนิกส์",
        shortNameTh: "บึงอควาโปนิกส์",
        shortNameEn: "Aquaponics",
        icon: "🪷",
        subtitle: "Floating Wetland Reserve & Freshwater Symbiosis",
        theme: "sewer",
        color: "#00f5d4",
        width: 2500,
        mapX: 470, mapY: 270,
        altars: ["แท่นบึงบัวลอยฟ้าบำบัดน้ำ", "กังหันเติมออกซิเจนเวหา"],
        npcs: ["ผู้พิทักษ์ระบบนิเวศน้ำ (Outcast Ratkin)"],
        poi: ["แปลงผักน้ำอควาโปนิกส์ลอยฟ้า", "บ่อเลี้ยงปลานิลชีวภาพ"],
        equipment: ["ฉมวกเก็บสาหร่าย", "เกราะใยพืชน้ำ"],
        spells: ["คลื่นน้ำบริสุทธิ์", "ละอองฟองออกซิเจน"],
        items: ["ปุ๋ยชีวภาพมูลปลา", "กุญแจวาล์วน้ำโบราณ"],
        boss: "พญาปลากลายพันธุ์ปนเปื้อน (Toxic Fishfiend)",
        connections: ["buried_church", "canyon", "pilgrimage"],
        entities: [
          {
            type: "portal", id: "portal_to_buried", targetRoom: "buried_church", spawnX: 2550,
            x: 40, y: 350, width: 50, height: 90, name: "🚪 กลับ เขตรากพืช", icon: "🚪"
          },
          {
            type: "npc", id: "ratkin", x: 650, y: 392, width: 32, height: 48,
            name: "ผู้พิทักษ์น้ำเวหา", icon: "🐟",
            dialogue: [
              "ที่นี่คือเกาะบึงน้ำลอยฟ้าอควาโปนิกส์ เลี้ยงปลาควบคู่กับการปลูกผักกลางเวหา โดยใช้น้ำวนเวียนไม่ทิ้งสูญเปล่า!",
              "ลองทดสอบความรู้เกษตรแบบเร็วทันใจที่ซุ้ม Speed Blitz ข้างหน้านี้สิ!",
              "ทางขวาบนทะลุขึ้นไปเกาะนาขั้นบันไดเสียดฟ้า และทางล่างจะพาเจ้าลงสู่เกาะสะวันนาลอยฟ้า!"
            ]
          },
          {
            type: "altar", id: "altar_sewers", x: 1250, y: 380, width: 44, height: 60,
            name: "แท่นบึงบัวลอยฟ้าบำบัดน้ำ", icon: "🪷"
          },
          {
            type: "minigame_speed", id: "speed_patch", x: 1550, y: 400, width: 48, height: 40,
            name: "⚡ ซุ้มทดสอบความเร็ว Speed Blitz", icon: "⚡"
          },
          {
            type: "portal", id: "portal_to_canyon", targetRoom: "canyon", spawnX: 80,
            x: 1850, y: 350, width: 50, height: 90, name: "🚪 สู่ เขตสะวันนาลอยฟ้า", icon: "🚪"
          },
          {
            type: "portal", id: "portal_to_pilgrimage", targetRoom: "pilgrimage", spawnX: 100,
            x: 2350, y: 350, width: 50, height: 90, name: "🚪 ขึ้นสู่ เขตนาขั้นบันได", icon: "🚪"
          }
        ]
      },

      "canyon": {
        id: "canyon",
        name: "Floating Savanna & Agroforestry",
        nameTh: "เขตสะวันนาพืชทนแล้ง",
        shortNameTh: "สะวันนาวนเกษตร",
        shortNameEn: "Agroforestry",
        icon: "🌳",
        subtitle: "Drought-Resistant Floating Plateau & Agroforestry",
        theme: "canyon",
        color: "#fb5607",
        width: 2400,
        mapX: 470, mapY: 410,
        altars: ["แท่นใต้ต้นเบาบับเวหา", "โอเอซิสกลางเกาะลอยฟ้า"],
        npcs: ["ปราชญ์วนเกษตร (Hermit of the Forest)"],
        poi: ["ดงกระบองเพชรกินผลลอยฟ้า", "แปลงทดลองแก้วมังกร"],
        equipment: ["เคียวด้ามไม้เบาบับ", "แหวนกักเก็บน้ำในดิน"],
        spells: ["คลื่นรากหญ้าแฝกยึดดิน"],
        items: ["เมล็ดพันธุ์พืชทนแล้งยอดเยี่ยม", "ผลึกธาตุอาหาร x4"],
        boss: "โกเลมศิลาดินดานแตกระแหง (Cracked Earth Golem)",
        connections: ["sewers", "laboratory", "pilgrimage"],
        entities: [
          {
            type: "portal", id: "portal_to_sewers", targetRoom: "sewers", spawnX: 1750,
            x: 40, y: 350, width: 50, height: 90, name: "🚪 กลับ เขตบึงน้ำอควาโปนิกส์", icon: "🚪"
          },
          {
            type: "npc", id: "hermit", x: 600, y: 392, width: 32, height: 48,
            name: "ปราชญ์วนเกษตร", icon: "🧘‍♂️",
            dialogue: [
              "บนเกาะสะวันนาลอยฟ้าที่แห้งแล้ง วนเกษตร (Agroforestry) คือคำตอบ! ปลูกไม้ยืนต้นให้ร่มเงาควบคู่กับพืชทนแล้ง",
              "หญ้าแฝกช่วยยึดขอบหน้าผาของเกาะลอยฟ้าไม่ให้พังทลาย และรากไม้ใหญ่ช่วยดึงความชื้นจากเมฆขึ้นมาสู่พืชผิวดิน!"
            ]
          },
          {
            type: "altar", id: "altar_canyon", x: 1200, y: 380, width: 44, height: 60,
            name: "แท่นใต้ต้นเบาบับเวหา", icon: "🌳"
          },
          {
            type: "item", id: "item_lightning_edge", x: 1650, y: 405, width: 28, height: 28,
            name: "เคียวตัดแต่งกิ่งวนเกษตร", icon: "🌿", desc: "เคียวตัดแต่งกิ่งไม้ให้แสงส่องถึงแปลงพืชชั้นล่าง"
          },
          {
            type: "portal", id: "portal_to_lab", targetRoom: "laboratory", spawnX: 80,
            x: 2250, y: 350, width: 50, height: 90, name: "🚪 สู่ เขตคลังเมล็ดพันธุ์เวหา", icon: "🚪"
          }
        ]
      },

      "pilgrimage": {
        id: "pilgrimage",
        name: "Skyward Rice Terrace",
        nameTh: "เขตนาขั้นบันไดเสียดฟ้า",
        shortNameTh: "นาขั้นบันได",
        shortNameEn: "Rice Terraces",
        icon: "🌾",
        subtitle: "Highland Floating Paddys & Cloud Water Harvesting",
        theme: "skywalk",
        color: "#fee440",
        width: 3000,
        mapX: 610, mapY: 200,
        altars: ["แท่นบูชาพระแม่โพสพเวหา", "ศาลาชมทุ่งรวงทองลอยฟ้า"],
        npcs: ["อัศวินชาวนาเวหา (Fallen Farmer Paladin)"],
        poi: ["หุ่นไล่กากลางเมฆ", "ระบบฝายชะลอน้ำฝนบนยอดเกาะ"],
        equipment: ["คทาฟางข้าวแห่งความอุดม", "เคียวทองคำ"],
        spells: ["พายุรวงข้าวทองคำ", "พรแห่งพระแม่โพสพ"],
        items: ["2 x ผลึกธาตุอาหาร", "เมล็ดพันธุ์ข้าวหอมมะลิบริสุทธิ์"],
        boss: "ปีศาจตั๊กแตนกลืนกินรวงข้าว (Locust Swarm King)",
        connections: ["ghost_town", "sewers", "white_cathedral", "canyon", "laboratory", "lunar_gallery"],
        entities: [
          {
            type: "portal", id: "portal_to_ghost", targetRoom: "ghost_town", spawnX: 2250,
            x: 40, y: 350, width: 50, height: 90, name: "🚪 สู่ เขตเกษตรอัจฉริยะ", icon: "🚪"
          },
          {
            type: "npc", id: "paladin", x: 700, y: 392, width: 32, height: 48,
            name: "อัศวินชาวนาเวหา", icon: "🌾",
            dialogue: [
              "เกาะนาขั้นบันไดเสียดฟ้านี้ใช้ภูมิปัญญาดักจับละอองเมฆมาหล่อเลี้ยงต้นข้าวบนความสูงเสียดฟ้า!",
              "สะพานเวหาเบื้องหน้าเชื่อมต่อไปยัง 4 เกาะสำคัญ: เกาะทุ่งรวงทองด้านบน, เกาะคลังเมล็ดพันธุ์โลกด้านล่าง, และเกาะพฤกษาจันทรา!"
            ]
          },
          {
            type: "altar", id: "altar_pilgrim", x: 1300, y: 380, width: 44, height: 60,
            name: "แท่นบูชาพระแม่โพสพเวหา", icon: "🌾"
          },
          {
            type: "portal", id: "portal_to_cathedral", targetRoom: "white_cathedral", spawnX: 80,
            x: 1900, y: 350, width: 50, height: 90, name: "🚪 ขึ้นสู่ เขตทุ่งรวงทองแห่งสวรรค์", icon: "🚪"
          },
          {
            type: "portal", id: "portal_to_lab", targetRoom: "laboratory", spawnX: 80,
            x: 2400, y: 350, width: 50, height: 90, name: "🚪 ลงสู่ เขตคลังเมล็ดพันธุ์เวหา", icon: "🚪"
          },
          {
            type: "portal", id: "portal_to_lunar", targetRoom: "lunar_gallery", spawnX: 80,
            x: 2850, y: 350, width: 50, height: 90, name: "🚪 สู่ เขตพฤกษาจันทราลอยฟ้า", icon: "🚪"
          }
        ]
      },

      "laboratory": {
        id: "laboratory",
        name: "Global Sky Seed Vault",
        nameTh: "เขตคลังเมล็ดพันธุ์เวหา",
        shortNameTh: "คลังเมล็ดพันธุ์",
        shortNameEn: "Seed Vault",
        icon: "🧬",
        subtitle: "Crop Genetics & Floating Cryogenic Ark",
        theme: "lab",
        color: "#38b000",
        width: 2400,
        mapX: 610, mapY: 370,
        altars: ["แท่นอนุรักษ์พันธุกรรมพืชเวหา", "ห้องเพาะเลี้ยงเนื้อเยื่อลอยฟ้า"],
        npcs: ["ดร. อัลเคมิสต์ นักปรับปรุงพันธุ์พืช"],
        poi: ["ตู้แช่แข็งเมล็ดพันธุ์ไครโอเจนิก", "แปลงขยายพันธุ์ปลอดโรค"],
        equipment: ["เข็มฉีดสารอาหารพืช", "กล้องจุลทรรศน์ตรวจสอบสปอร์"],
        spells: ["รังสีเร่งการงอกของเมล็ด", "เกราะป้องกันโรคพืช"],
        items: ["กุญแจคลังเมล็ดพันธุ์ทองคำ", "ผลึกธาตุอาหาร x2"],
        boss: "สิ่งมีชีวิตดัดแปลงพันธุกรรมหลุดรอด (Mutated Crop Chimera)",
        connections: ["canyon", "pilgrimage"],
        entities: [
          {
            type: "portal", id: "portal_to_canyon", targetRoom: "canyon", spawnX: 2150,
            x: 40, y: 350, width: 50, height: 90, name: "🚪 สู่ เขตสะวันนาลอยฟ้า", icon: "🚪"
          },
          {
            type: "npc", id: "alchemist", x: 650, y: 392, width: 32, height: 48,
            name: "ดร. นักปรับปรุงพันธุ์พืช", icon: "🧬",
            dialogue: [
              "เกาะคลังเมล็ดพันธุ์เวหาแห่งนี้เก็บรวบรวมสายพันธุ์พืชทนทานสภาพอากาศสุดขั้วจากทั่วโลกไว้บนชั้นบรรยากาศที่เย็นบริสุทธิ์!",
              "ความหลากหลายทางพันธุกรรมคือความมั่นคงทางอาหารของมนุษยชาติในอนาคต!"
            ]
          },
          {
            type: "altar", id: "altar_lab", x: 1200, y: 380, width: 44, height: 60,
            name: "แท่นอนุรักษ์พันธุกรรมพืชเวหา", icon: "🧪"
          },
          {
            type: "item", id: "item_black_key", x: 1700, y: 405, width: 28, height: 28,
            name: "กุญแจคลังเมล็ดพันธุ์ทองคำ", icon: "🗝️", desc: "กุญแจเปิดสู่เกาะทุ่งรวงทองแห่งสวรรค์"
          },
          {
            type: "portal", id: "portal_to_pilgrimage", targetRoom: "pilgrimage", spawnX: 2300,
            x: 2250, y: 350, width: 50, height: 90, name: "🚪 ขึ้นสู่ เขตนาขั้นบันได", icon: "🚪"
          }
        ]
      },

      "white_cathedral": {
        id: "white_cathedral",
        name: "Golden Harvest Sky Sanctuary",
        nameTh: "เขตทุ่งรวงทองแห่งสวรรค์",
        shortNameTh: "ทุ่งรวงทอง",
        shortNameEn: "Golden Harvest",
        icon: "👑",
        subtitle: "Summit of Golden Wheat Fields & Grand Sky Mill",
        theme: "cathedral",
        color: "#ffd166",
        width: 2800,
        mapX: 750, mapY: 150,
        altars: ["แท่นมหากสิกรรมแห่งแสง", "หอกังหันลมยักษ์เสียดฟ้า"],
        npcs: ["High Priestess (ผู้พิทักษ์ฤดูกาลเก็บเกี่ยว)"],
        poi: ["ทุ่งข้าวสาลีสีทองลอยฟ้ากว้างใหญ่", "ลานเฉลิมฉลองเทศกาลเก็บเกี่ยวเวหา"],
        equipment: ["แหวนสติปัญญาเกษตรกร", "เคียวทองคำแห่งแสงสว่าง"],
        spells: ["ลำแสงแดดอบอุ่นบำรุงรวงข้าว", "ออร่าพืชผลบริสุทธิ์"],
        items: ["3 x ผลึกธาตุอาหารสูงสุด", "กุญแจสวนรุกขชาติจันทรา"],
        boss: "ร่างจำแลง : ปีศาจปฐพีแปรปรวน (Disrupted Soil Demon)",
        connections: ["pilgrimage", "lunar_gallery"],
        entities: [
          {
            type: "portal", id: "portal_to_pilgrimage", targetRoom: "pilgrimage", spawnX: 1800,
            x: 40, y: 350, width: 50, height: 90, name: "🚪 กลับ เขตนาขั้นบันได", icon: "🚪"
          },
          {
            type: "npc", id: "priestess", x: 600, y: 392, width: 32, height: 48,
            name: "High Priestess", icon: "👑", gender: "farmer_f",
            dialogue: [
              "ผู้กล้า... เจ้าได้เดินทางข้าม 12 เกาะลอยฟ้าและเรียนรู้ศาสตร์แห่งการปรับปรุงดิน การจัดการน้ำ ชีววิธี และวนเกษตรมาจนครบถ้วนแล้ว",
              "ประตูบอสข้างหน้านี้ คือบททดสอบประลองปัญญาครั้งสุดท้าย เพื่อฟื้นคืนความอุดมสมบูรณ์ให้แก่หมู่เกาะลอยฟ้าทั้งหมด!",
              "หากเจ้าพร้อม จงก้าวเข้าสู่ประตูบอสเพื่อนำความรู้ทั้งหมดมาพิทักษ์ผืนดินลอยฟ้า!"
            ]
          },
          {
            type: "altar", id: "altar_cathedral", x: 1200, y: 380, width: 44, height: 60,
            name: "แท่นมหากสิกรรมแห่งแสง", icon: "✨"
          },
          {
            type: "portal", id: "portal_boss", x: 1900, y: 350, width: 60, height: 90,
            name: "🌀 ประตูศึกประลองปัญญาบอส (Boss Battle)", icon: "🌀"
          },
          {
            type: "portal", id: "portal_to_lunar", targetRoom: "lunar_gallery", spawnX: 80,
            x: 2650, y: 350, width: 50, height: 90, name: "🚪 สู่ เขตพฤกษาจันทราลอยฟ้า", icon: "🚪"
          }
        ]
      },

      "lunar_gallery": {
        id: "lunar_gallery",
        name: "Celestial Tree of Life",
        nameTh: "เขตพฤกษาจันทรานิรันดร์",
        shortNameTh: "พฤกษาจันทรา",
        shortNameEn: "Tree of Life",
        icon: "🌙",
        subtitle: "Mystical Arboretum of the Cosmic World Tree",
        theme: "lunar",
        color: "#c77dff",
        width: 2500,
        mapX: 860, mapY: 270,
        altars: ["แท่นพฤกษาใต้แสงจันทร์", "ริมสระน้ำประกายดาวลอยฟ้า"],
        npcs: ["The Moon Witch (เทพีผู้พิทักษ์ความอุดมสมบูรณ์)"],
        poi: ["ต้นไม้แห่งชีวิตเรืองแสงลอยฟ้า", "ระเบียงพืชพรรณดวงดาว"],
        equipment: ["มงกุฎพฤกษาจันทรา", "แหวนพิทักษ์ธรรมชาติ"],
        spells: ["ประตูสวรรค์แห่งความงอกงาม", "ประกายแสงจันทราบำบัด"],
        items: ["ผลึกพลังธรรมชาติสูงสุด", "กุญแจจันทรานิรันดร์"],
        boss: "ร่างอวตารเทวะแห่งความอุดมสมบูรณ์",
        connections: ["white_cathedral", "pilgrimage"],
        entities: [
          {
            type: "portal", id: "portal_to_pilgrimage", targetRoom: "pilgrimage", spawnX: 2750,
            x: 40, y: 350, width: 50, height: 90, name: "🚪 สู่ เขตนาขั้นบันได", icon: "🚪"
          },
          {
            type: "npc", id: "moon_witch", x: 650, y: 392, width: 32, height: 48,
            name: "The Moon Witch", icon: "🌙", gender: "farmer_f",
            dialogue: [
              "ยินดีต้อนรับสู่เกาะพฤกษาจันทราลอยฟ้า... ดินแดนที่พืชพรรณเติบโตอย่างบริสุทธิ์ใต้แสงจันทร์และดวงดาว",
              "เจ้าได้เดินทางสำรวจครบทั้ง 12 เกาะลอยฟ้าการเกษตรนี้แล้ว ความรู้ของเจ้าจะเปลี่ยนแปลงอนาคต!",
              "จงรับพลังแห่งความอุดมสมบูรณ์นี้ไปสร้างสรรค์แปลงเกษตรที่ยั่งยืนสืบไป!"
            ]
          },
          {
            type: "altar", id: "altar_lunar", x: 1250, y: 380, width: 44, height: 60,
            name: "แท่นพฤกษาใต้แสงจันทร์", icon: "🌳"
          },
          {
            type: "item", id: "item_lunar_key", x: 1700, y: 405, width: 28, height: 28,
            name: "กุญแจจันทรานิรันดร์", icon: "🗝️", desc: "กุญแจแห่งความอุดมสมบูรณ์สูงสุด"
          },
          {
            type: "portal", id: "portal_to_cathedral", targetRoom: "white_cathedral", spawnX: 2550,
            x: 2350, y: 350, width: 50, height: 90, name: "🚪 สู่ เขตทุ่งรวงทอง", icon: "🚪"
          }
        ]
      }
    };
  }

  loadRoom(roomId, spawnX = 150) {
    if (!this.WORLD_MAP[roomId]) return;
    this.currentRoomId = roomId;
    this.roomsDiscovered[roomId] = true;
    this.selectedMapRoomId = roomId;
    
    const room = this.WORLD_MAP[roomId];
    this.worldWidth = room.width;
    this.entities = room.entities;
    this.applyNpcAppearances();
    this.player.x = spawnX;
    this.player.y = this.groundY - this.player.height;
    this.player.vx = 0;
    this.player.vy = 0;
    this.player.dx = 0;
    this.player.dy = 0;
    this.player.isGrounded = true;
    this.cameraX = Math.max(0, Math.min(this.player.x - 480, this.worldWidth - 960));

    // Update HUD labels
    const hudIsland = document.getElementById("hud-island-name");
    if (hudIsland) hudIsland.innerText = `${room.name} (${room.nameTh})`;

    // Only show HUD when actually playing (not on menu or naming screen)
    if (this.gameState === "PLAYING") {
      const hudTop = document.getElementById("hud-top");
      if (hudTop) hudTop.classList.remove("hidden");
      const hudBottom = document.getElementById("hud-bottom-right");
      if (hudBottom) hudBottom.classList.remove("hidden");
      const modalChar = document.getElementById("modal-char-creation");
      if (modalChar) modalChar.classList.add("hidden");
      this.showNotification(`📍 เข้าสู่: ${room.name} - ${room.nameTh}`, "#4facfe");
    }
  }

  showNotification(text, color = "#00f5d4") {
    this.notification = { text, color };
    this.notificationTimer = 180;

    const banner = document.getElementById("hud-notification-banner");
    const bannerText = document.getElementById("hud-notification-text");
    if (banner && bannerText) {
      bannerText.textContent = text;
      banner.style.borderColor = color;
      bannerText.style.color = color;
      banner.style.boxShadow = `0 4px 20px rgba(0, 0, 0, 0.9), 0 0 16px ${color}55`;
      banner.classList.remove("hidden");

      if (this.notifHtmlTimer) clearTimeout(this.notifHtmlTimer);
      this.notifHtmlTimer = setTimeout(() => {
        banner.classList.add("hidden");
      }, 3800);
    }
  }

  initEvents() {
    window.addEventListener("keydown", (e) => {
      this.keys[e.code] = true;

      if (this.gameState === "MAIN_MENU") {
        if (e.code === "Enter" || e.code === "Space") {
          this.startFromMenu();
        }
        return;
      }

      if (this.gameState === "CHAR_NAMING") {
        this.handleNamingKeyboard(e);
        return;
      }

      if (this.gameState === "MAP") {
        if (e.code === "KeyM" || e.code === "Escape") {
          this.toggleMapUI();
          return;
        }
        if (e.code === "Tab" || e.code === "KeyI") {
          e.preventDefault();
          this.showMapSidebar = !this.showMapSidebar;
          if (this.sound) this.sound.playJump();
          return;
        }
        if (e.code === "KeyR") {
          this.mapPanX = 0;
          this.mapPanY = 0;
          if (this.sound) this.sound.playCoin();
          return;
        }
        if (e.code === "KeyT" || e.code === "Enter" || e.code === "Space") {
          this.fastTravelToSelectedRoom();
          return;
        }
        this.handleMapKeyboardNav(e);
        return;
      }

      if (e.code === "KeyO") {
        this.toggleSettings();
        return;
      }

      if (e.code === "Escape") {
        const modalSet = document.getElementById("modal-settings");
        if (modalSet && !modalSet.classList.contains("hidden")) {
          this.toggleSettings();
          return;
        }
        if (this.gameState === "MAP") {
          this.toggleMapUI();
          return;
        }
      }

      if (e.code === "KeyE") {
        if (this.gameState === "PLAYING") this.handleInteraction();
        else if (this.gameState === "DIALOGUE") this.closeDialogue();
      }
      if (e.code === "KeyB") this.toggleCodex();
      if (e.code === "KeyM") this.toggleMapUI();
    });
    window.addEventListener("keyup", (e) => {
      this.keys[e.code] = false;
    });

    this.canvas.addEventListener("mousedown", (e) => {
      if (this.gameState === "MAP") {
        this.handleMapMouseDown(e);
      }
    });

    window.addEventListener("mouseup", (e) => {
      if (this.gameState === "MAP") {
        this.handleMapMouseUp(e);
      }
    });

    this.canvas.addEventListener("mousemove", (e) => {
      if (this.gameState === "MAP") {
        this.handleMapMouseMove(e);
      }
    });

    this.canvas.addEventListener("wheel", (e) => {
      if (this.gameState === "MAP") {
        this.handleMapWheel(e);
      }
    }, { passive: false });

    this.canvas.addEventListener("click", (e) => {
      if (this.gameState === "MAP") {
        this.handleMapClick(e);
      }
    });

    const btnOpenMap = document.getElementById("btn-open-map");
    if (btnOpenMap) {
      btnOpenMap.addEventListener("click", () => this.toggleMapUI());
    }

    const btnOpenCodex = document.getElementById("btn-open-codex");
    if (btnOpenCodex) {
      btnOpenCodex.addEventListener("click", () => this.toggleCodex());
    }
    const btnCloseCodex = document.getElementById("btn-close-codex");
    if (btnCloseCodex) {
      btnCloseCodex.addEventListener("click", () => this.toggleCodex());
    }
    const dialogueBox = document.getElementById("dialogue-box");
    if (dialogueBox) {
      dialogueBox.addEventListener("click", () => this.closeDialogue());
    }
    const btnRestartGame = document.getElementById("btn-restart-game");
    if (btnRestartGame) {
      btnRestartGame.addEventListener("click", () => window.location.reload());
    }

    // MAIN MENU & SAVE SLOTS buttons
    const btnMenuStart = document.getElementById("btn-menu-start");
    if (btnMenuStart) {
      btnMenuStart.addEventListener("click", () => this.startFromMenu());
    }
    const btnMenuSettings = document.getElementById("btn-menu-settings");
    if (btnMenuSettings) {
      btnMenuSettings.addEventListener("click", () => this.toggleSettings());
    }
    const btnOpenSettings = document.getElementById("btn-open-settings");
    if (btnOpenSettings) {
      btnOpenSettings.addEventListener("click", () => this.toggleSettings());
    }
    const btnHudMenu = document.getElementById("btn-hud-menu");
    if (btnHudMenu) {
      btnHudMenu.addEventListener("click", () => this.returnToMainMenu());
    }
    const btnCloseSaveSlotsX = document.getElementById("btn-close-save-slots-x");
    if (btnCloseSaveSlotsX) {
      btnCloseSaveSlotsX.addEventListener("click", () => this.closeSaveSlotsModal());
    }
    const btnBackFromSaveSlots = document.getElementById("btn-back-from-save-slots");
    if (btnBackFromSaveSlots) {
      btnBackFromSaveSlots.addEventListener("click", () => this.closeSaveSlotsModal());
    }
    const btnMenuExit = document.getElementById("btn-menu-exit");
    if (btnMenuExit) {
      btnMenuExit.addEventListener("click", () => {
        window.location.href = "/";
      });
    }

    // SETTINGS MODAL CONTROLS
    const btnCloseSettingsX = document.getElementById("btn-close-settings-x");
    if (btnCloseSettingsX) {
      btnCloseSettingsX.addEventListener("click", () => this.toggleSettings());
    }
    const btnSaveSettings = document.getElementById("btn-save-settings");
    if (btnSaveSettings) {
      btnSaveSettings.addEventListener("click", () => {
        this.saveSettings();
        this.toggleSettings();
      });
    }
    const btnResetSettings = document.getElementById("btn-reset-settings");
    if (btnResetSettings) {
      btnResetSettings.addEventListener("click", () => {
        this.settings = {
          masterVol: 100,
          bgmVol: 60,
          sfxVol: 80,
          scanlines: true,
          particles: true,
          vignette: true
        };
        this.applySettings();
        this.saveSettings();
        this.sound.playCorrect();
      });
    }
    const btnTestSfx = document.getElementById("btn-test-sfx");
    if (btnTestSfx) {
      btnTestSfx.addEventListener("click", () => this.sound.playCoin());
    }

    // Audio Sliders
    const sMaster = document.getElementById("slider-vol-master");
    if (sMaster) {
      sMaster.addEventListener("input", (e) => {
        this.settings.masterVol = parseInt(e.target.value);
        this.applySettings();
      });
    }
    const sBgm = document.getElementById("slider-vol-bgm");
    if (sBgm) {
      sBgm.addEventListener("input", (e) => {
        this.settings.bgmVol = parseInt(e.target.value);
        this.applySettings();
      });
    }
    const sSfx = document.getElementById("slider-vol-sfx");
    if (sSfx) {
      sSfx.addEventListener("input", (e) => {
        this.settings.sfxVol = parseInt(e.target.value);
        this.applySettings();
      });
    }

    // Effect Toggles
    const tScan = document.getElementById("toggle-scanlines");
    if (tScan) {
      tScan.addEventListener("change", (e) => {
        this.settings.scanlines = e.target.checked;
        this.applySettings();
      });
    }
    const tPart = document.getElementById("toggle-particles");
    if (tPart) {
      tPart.addEventListener("change", (e) => {
        this.settings.particles = e.target.checked;
        this.applySettings();
      });
    }
    const tVig = document.getElementById("toggle-vignette");
    if (tVig) {
      tVig.addEventListener("change", (e) => {
        this.settings.vignette = e.target.checked;
        this.applySettings();
      });
    }

    // Knowledge Card OK Button
    const btnKcOk = document.getElementById("btn-kc-ok");
    if (btnKcOk) {
      btnKcOk.addEventListener("click", () => {
        document.getElementById("modal-knowledge-card").classList.add("hidden");
        if (typeof this.knowledgeCardCallback === "function") {
          const cb = this.knowledgeCardCallback;
          this.knowledgeCardCallback = null;
          cb();
        }
      });
    }

    // Minigame Result Continue Button
    const btnMrContinue = document.getElementById("btn-mr-continue");
    if (btnMrContinue) {
      btnMrContinue.addEventListener("click", () => {
        document.getElementById("modal-minigame-result").classList.add("hidden");
        if (typeof this.minigameResultCallback === "function") {
          const cb = this.minigameResultCallback;
          this.minigameResultCallback = null;
          cb();
        } else {
          this.gameState = "PLAYING";
        }
      });
    }

    // Minigame 1: pH Mixer Lab
    document.querySelectorAll(".mixer-material-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const mat = btn.dataset.material;
        if (mat === "lime") {
          this.mixerPh = Math.min(9.0, this.mixerPh + 0.5);
          this.sound.playCoin();
        } else if (mat === "dolomite") {
          this.mixerPh = Math.min(9.0, this.mixerPh + 0.3);
          this.sound.playCoin();
        } else if (mat === "sulfur") {
          this.mixerPh = Math.max(3.0, this.mixerPh - 0.4);
          this.sound.playCoin();
        }
        this.updateMixerLabVisual();
      });
    });

    const btnSubmitSoil = document.getElementById("btn-submit-soil");
    if (btnSubmitSoil) {
      btnSubmitSoil.addEventListener("click", () => {
        if (this.mixerPh >= 6.0 && this.mixerPh <= 7.0) {
          this.sound.playCorrect();
          document.getElementById("modal-minigame-soil").classList.add("hidden");
          const stars = (this.mixerPh >= 6.3 && this.mixerPh <= 6.7) ? 3 : 2;
          this.showMinigameResult({
            title: "🎉 ปรับปรุงดินสำเร็จ!",
            subtitle: `คุณปรับค่า pH ได้ ${this.mixerPh.toFixed(1)} ซึ่งอยู่ในเกณฑ์สมบูรณ์แบบ`,
            stars: stars,
            knowledgeText: "ปูนขาว (Lime) และโดโลไมท์ ช่วยลดความเป็นกรดในดิน เพิ่มแคลเซียมและแมกนีเซียม ทำให้ดินกลับมามีค่า pH 6.0 - 7.0 เหมาะแก่การเพาะปลูกพืชทุกชนิด!",
            onContinue: () => {
              document.getElementById("hud-quest-text").innerText = "มุ่งหน้าสู่วิหารปีศาจปฐพี";
              this.showToastFeedback("✨ สำเร็จ! ค่า pH ดินสมบูรณ์แล้ว", "success");
              this.gameState = "PLAYING";
            }
          });
        } else {
          this.sound.playWrong();
          this.showToastFeedback("❌ ค่า pH ยังไม่เหมาะสม! ต้องอยู่ในช่วง 6.0 - 7.0", "danger");
        }
      });
    }

    // Minigame 2: Season Crop Selection & Planting Grid
    document.querySelectorAll(".crop-item").forEach((item) => {
      item.addEventListener("click", () => {
        document.querySelectorAll(".crop-item").forEach((ci) => ci.classList.remove("selected"));
        item.classList.add("selected");
        this.selectedCropItem = item.dataset.crop;
        this.sound.playCoin();
      });
    });

    document.querySelectorAll(".crop-field-slot").forEach((slot) => {
      slot.addEventListener("click", () => {
        const slotIdx = parseInt(slot.dataset.slot);
        if (this.selectedCropItem) {
          this.cropSlots[slotIdx] = this.selectedCropItem;
          const icons = { corn: "🌽 ข้าวโพด", lettuce: "🥬 ผักกาด", cassava: "🥔 มันสำปะหลัง", strawberry: "🍓 สตรอว์เบอร์รี" };
          const iconEl = document.getElementById(`crop-slot-icon-${slotIdx}`);
          if (iconEl) iconEl.innerText = icons[this.selectedCropItem] || "";
          slot.classList.add("planted");
          this.sound.playCoin();
        }
      });
    });

    const btnSubmitSeason = document.getElementById("btn-submit-season");
    if (btnSubmitSeason) {
      btnSubmitSeason.addEventListener("click", () => {
        const hasCorn = this.cropSlots.includes("corn");
        const hasCassava = this.cropSlots.includes("cassava");
        if (hasCorn && hasCassava) {
          this.sound.playCorrect();
          document.getElementById("modal-minigame-season").classList.add("hidden");
          this.showMinigameResult({
            title: "🎉 จัดสรรพืชทนแล้งสำเร็จ!",
            subtitle: "แปลงของคุณรอดพ้นจากวิกฤตภัยแล้งแล้ว",
            stars: 3,
            knowledgeText: "ข้าวโพดและมันสำปะหลัง มีระบบรากที่หยั่งลึกและใช้น้ำน้อยมาก จึงทนทานต่อสภาพอากาศร้อนแล้งได้ดีเยี่ยม ต่างจากผักใบหรือผลไม้ที่ต้องการน้ำสม่ำเสมอ!",
            onContinue: () => {
              document.getElementById("hud-quest-text").innerText = "มุ่งหน้าสู่วิหารปีศาจดินฟ้าอากาศ";
              this.showToastFeedback("🌾 ปลูกพืชทนแล้งสำเร็จ!", "success");
              this.gameState = "PLAYING";
            }
          });
        } else {
          this.sound.playWrong();
          this.showToastFeedback("❌ ยังไม่ถูกต้อง! ต้องเลือกพืชทนแล้ง 2 ชนิด (ข้าวโพด และ มันสำปะหลัง)", "danger");
        }
      });
    }

    // Minigame 3: Pest Remedy Selection (Bug Defender)
    document.querySelectorAll(".bug-weapon-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const pest = btn.dataset.pest;
        if (this.selectedPests.includes(pest)) {
          this.selectedPests = this.selectedPests.filter((p) => p !== pest);
          btn.classList.remove("active");
        } else {
          if (this.selectedPests.length < 2) {
            this.selectedPests.push(pest);
            btn.classList.add("active");
          }
        }
        this.sound.playCoin();
      });
    });

    const btnSubmitPest = document.getElementById("btn-submit-pest");
    if (btnSubmitPest) {
      btnSubmitPest.addEventListener("click", () => {
        if (
          this.selectedPests.includes("ladybug") &&
          this.selectedPests.includes("neem") &&
          !this.selectedPests.includes("chemical") &&
          !this.selectedPests.includes("salt")
        ) {
          this.sound.playCorrect();
          document.getElementById("modal-minigame-pest").classList.add("hidden");
          this.showMinigameResult({
            title: "🎉 ชีววิธีพิทักษ์แปลงสำเร็จ!",
            subtitle: "กำจัดศัตรูพืชได้อย่างปลอดภัย ไร้สารเคมีตกค้าง",
            stars: 3,
            knowledgeText: "การใช้แมลงเต่าทอง (ตัวห้ำ) ช่วยควบคุมประชากรเพลี้ยอ่อนตามธรรมชาติ และน้ำหมักสะเดาเป็นสารขับไล่หนอนที่ไม่เป็นพิษต่อดินและสิ่งแวดล้อม!",
            onContinue: () => {
              document.getElementById("hud-quest-text").innerText = "มุ่งหน้าสู่วิหารปีศาจศัตรูพืช";
              this.showToastFeedback("🐛 ปกป้องแปลงสำเร็จด้วยชีววิธี!", "success");
              this.gameState = "PLAYING";
            }
          });
        } else {
          this.sound.playWrong();
          this.showToastFeedback("❌ วิธีนี้ยังไม่ปลอดภัย! เลือกชีววิธีธรรมชาติ 2 อย่าง (แมลงเต่าทอง & น้ำหมักสะเดา)", "danger");
        }
      });
    }

    // Minigame 5: Sort It Right Submit Button
    const btnSubmitSort = document.getElementById("btn-submit-sort");
    if (btnSubmitSort) {
      btnSubmitSort.addEventListener("click", () => {
        this.checkSortItRight();
      });
    }

    // Minigame 6: Speed Quiz Blitz Buttons
    const btnSpeedTrue = document.getElementById("btn-speed-true");
    if (btnSpeedTrue) {
      btnSpeedTrue.addEventListener("click", () => this.handleSpeedQuizAnswer(true));
    }
    const btnSpeedFalse = document.getElementById("btn-speed-false");
    if (btnSpeedFalse) {
      btnSpeedFalse.addEventListener("click", () => this.handleSpeedQuizAnswer(false));
    }

    // Quiz choice clicks
    document.querySelectorAll(".choice-btn").forEach((btn) => {
      btn.addEventListener("click", () =>
        this.submitAnswer(parseInt(btn.dataset.index)),
      );
    });

    // Altar Knowledge Trial Modal Buttons
    const btnCloseAltarTrial = document.getElementById("btn-close-altar-trial");
    if (btnCloseAltarTrial) {
      btnCloseAltarTrial.addEventListener("click", () => {
        const modal = document.getElementById("modal-altar-trial");
        if (modal) modal.classList.add("hidden");
      });
    }
    const btnAltarRest = document.getElementById("btn-altar-rest");
    if (btnAltarRest) {
      btnAltarRest.addEventListener("click", () => this.handleAltarRest());
    }
    const btnAltarStartQuiz = document.getElementById("btn-altar-start-quiz");
    if (btnAltarStartQuiz) {
      btnAltarStartQuiz.addEventListener("click", () => this.startAltarQuiz());
    }

    const btnConfirmYes = document.getElementById("btn-confirm-yes");
    if (btnConfirmYes) {
      btnConfirmYes.addEventListener("click", () => {
        this.confirmSelection = "YES";
        this.player.name = this.tempName.trim() || "ผู้กล้า";
        document.getElementById("hud-player-name").innerText = this.player.name;
        this.startCustomizationScene();
      });
    }
    const btnConfirmNo = document.getElementById("btn-confirm-no");
    if (btnConfirmNo) {
      btnConfirmNo.addEventListener("click", () => {
        this.namingStage = "TYPING";
        document.getElementById("undertale-confirm-box").classList.add("hidden");
        this.sound.playWrong();
      });
    }
  }

  /* ===== NAMING: DYNAMIC KEYBOARD (THAI & ENGLISH) ===== */
  renderNamingKeyboard() {
    const container = document.getElementById("undertale-keyboard-container");
    if (!container) return;
    container.innerHTML = "";

    const isThai = (this.namingLang === "TH");
    const grid = isThai ? [
      ["ก", "ข", "ฃ", "ค", "ฅ", "ฆ", "ง", "จ", "ฉ", "ช", "ซ"],
      ["ฌ", "ญ", "ฎ", "ฏ", "ฐ", "ฑ", "ฒ", "ณ", "ด", "ต", "ถ"],
      ["ท", "ธ", "น", "บ", "ป", "ผ", "ฝ", "พ", "ฟ", "ภ", "ม"],
      ["ย", "ร", "ล", "ว", "ศ", "ษ", "ส", "ห", "ฬ", "อ", "ฮ"],
      ["ะ", "า", "ิ", "ี", "ึ", "ื", "ุ", "ู", "เ", "แ", "โ"],
      ["ใ", "ไ", "็", "่", "้", "๊", "๋", "์", "ั", "ำ", "ๆ"],
      ["GENDER", "LANG", "BACKSPACE", "DONE"]
    ] : [
      ["A", "B", "C", "D", "E", "F", "G"],
      ["H", "I", "J", "K", "L", "M", "N"],
      ["O", "P", "Q", "R", "S", "T", "U"],
      ["V", "W", "X", "Y", "Z"],
      ["a", "b", "c", "d", "e", "f", "g"],
      ["h", "i", "j", "k", "l", "m", "n"],
      ["o", "p", "q", "r", "s", "t", "u"],
      ["v", "w", "x", "y", "z"],
      ["GENDER", "LANG", "BACKSPACE", "DONE"]
    ];

    this.currentNamingGrid = grid;

    if (this.gridRow >= grid.length) this.gridRow = 0;
    if (this.gridCol >= grid[this.gridRow].length) this.gridCol = 0;

    grid.forEach((row, rIdx) => {
      const isCmd = (rIdx === grid.length - 1);
      const rowDiv = document.createElement("div");
      rowDiv.className = isCmd ? "cmd-row" : "ut-row";

      row.forEach((keyVal, cIdx) => {
        if (!keyVal) return;
        const keySpan = document.createElement("span");
        keySpan.id = `ut-r${rIdx}c${cIdx}`;
        keySpan.className = isCmd ? "ut-key cmd-key" : "ut-key";
        if (rIdx === this.gridRow && cIdx === this.gridCol) {
          keySpan.classList.add("active");
        }

        if (keyVal === "GENDER") {
          keySpan.innerText = this.player.gender === "farmer_m" ? "♂️ ชาย (Boy)" : "♀️ หญิง (Girl)";
        } else if (keyVal === "LANG") {
          keySpan.innerText = isThai ? "🌐 ภาษา: ไทย" : "🌐 Lang: ENG";
        } else if (keyVal === "BACKSPACE") {
          keySpan.innerText = "⌫ ลบ (Bksp)";
        } else if (keyVal === "DONE") {
          keySpan.innerText = "✔ ตกลง (Done)";
        } else {
          keySpan.innerText = keyVal;
        }

        keySpan.addEventListener("click", () => {
          this.gridRow = rIdx;
          this.gridCol = cIdx;
          this.updateNamingKeyActive();
          this.handleNamingKeyAction(keyVal);
        });

        rowDiv.appendChild(keySpan);
      });

      container.appendChild(rowDiv);
    });

    const display = document.getElementById("player-name-display");
    if (display) display.innerText = this.tempName;
  }

  updateNamingKeyActive() {
    document.querySelectorAll(".ut-key").forEach((el) => el.classList.remove("active"));
    const el = document.getElementById(`ut-r${this.gridRow}c${this.gridCol}`);
    if (el) el.classList.add("active");
  }

  handleNamingKeyAction(val) {
    if (val === "GENDER") {
      this.player.gender = this.player.gender === "farmer_m" ? "farmer_f" : "farmer_m";
      this.sound.playShoot();
      this.renderNamingKeyboard();
    } else if (val === "LANG") {
      this.namingLang = (this.namingLang === "TH") ? "EN" : "TH";
      this.sound.playShoot();
      this.gridRow = 0;
      this.gridCol = 0;
      this.renderNamingKeyboard();
    } else if (val === "BACKSPACE") {
      this.tempName = this.tempName.slice(0, -1);
      this.sound.playShoot();
      const display = document.getElementById("player-name-display");
      if (display) display.innerText = this.tempName;
    } else if (val === "DONE") {
      if (this.tempName.trim().length > 0) {
        this.namingStage = "CONFIRMING";
        const confirmBox = document.getElementById("undertale-confirm-box");
        if (confirmBox) confirmBox.classList.remove("hidden");
        this.confirmSelection = "YES";
        this.sound.playJump();
      }
    } else {
      if (this.tempName.length < 14) {
        this.tempName += val;
        this.sound.playShoot();
        const display = document.getElementById("player-name-display");
        if (display) display.innerText = this.tempName;
      }
    }
  }

  handleNamingKeyboard(e) {
    const code = e.code;
    const key = e.key;

    if (this.namingStage === "TYPING") {
      const grid = this.currentNamingGrid || [
        ["A", "B", "C", "D", "E", "F", "G"],
        ["H", "I", "J", "K", "L", "M", "N"],
        ["O", "P", "Q", "R", "S", "T", "U"],
        ["V", "W", "X", "Y", "Z"],
        ["a", "b", "c", "d", "e", "f", "g"],
        ["h", "i", "j", "k", "l", "m", "n"],
        ["o", "p", "q", "r", "s", "t", "u"],
        ["v", "w", "x", "y", "z"],
        ["GENDER", "LANG", "BACKSPACE", "DONE"]
      ];

      let r = this.gridRow !== undefined ? this.gridRow : 0;
      let c = this.gridCol !== undefined ? this.gridCol : 0;
      let moved = false;

      if (key.startsWith("Arrow") || ["KeyW", "KeyA", "KeyS", "KeyD", "KeyX", "KeyZ", "Space"].includes(code)) {
        e.preventDefault();
      }

      // Move Up
      if (code === "KeyW" || code === "ArrowUp" || key === "ArrowUp") {
        r--;
        moved = true;
      }
      // Move Down
      else if (code === "KeyS" || code === "ArrowDown" || key === "ArrowDown") {
        r++;
        moved = true;
      }
      // Move Left
      else if (code === "KeyA" || code === "ArrowLeft" || key === "ArrowLeft") {
        c--;
        moved = true;
      }
      // Move Right
      else if (code === "KeyD" || code === "ArrowRight" || key === "ArrowRight") {
        c++;
        moved = true;
      }

      if (moved) {
        if (r < 0) r = grid.length - 1;
        if (r >= grid.length) r = 0;

        const maxCol = grid[r].length - 1;
        if (c < 0) c = maxCol;
        if (c > maxCol) c = maxCol;

        this.gridRow = r;
        this.gridCol = c;
        this.updateNamingKeyActive();
        this.sound.playShoot();
        return;
      }

      // Confirm / Select with X, ENTER, Z, or Space
      if (
        code === "KeyX" ||
        code === "Enter" ||
        code === "NumpadEnter" ||
        key === "x" ||
        key === "X" ||
        key === "Enter" ||
        code === "KeyZ" ||
        code === "Space"
      ) {
        const val = grid[r] && grid[r][c];
        if (val) this.handleNamingKeyAction(val);
        return;
      }

      // Backspace key on physical keyboard
      if (code === "Backspace" || key === "Backspace") {
        this.handleNamingKeyAction("BACKSPACE");
        return;
      }

      // Note: Direct keyboard typing is disabled as requested
    } else if (this.namingStage === "CONFIRMING") {
      if (
        code === "KeyA" ||
        code === "KeyD" ||
        key === "ArrowLeft" ||
        key === "ArrowRight" ||
        code === "ArrowLeft" ||
        code === "ArrowRight"
      ) {
        this.confirmSelection = this.confirmSelection === "YES" ? "NO" : "YES";
        if (this.confirmSelection === "YES") {
          document.getElementById("btn-confirm-yes").classList.add("active");
          document.getElementById("btn-confirm-no").classList.remove("active");
        } else {
          document.getElementById("btn-confirm-no").classList.add("active");
          document.getElementById("btn-confirm-yes").classList.remove("active");
        }
        this.sound.playShoot();
      } else if (
        code === "KeyX" ||
        code === "Enter" ||
        code === "NumpadEnter" ||
        key === "x" ||
        key === "X" ||
        key === "Enter" ||
        code === "KeyZ" ||
        code === "Space"
      ) {
        if (this.confirmSelection === "YES") {
          this.player.name = this.tempName.trim() || "ผู้กล้า";
          document.getElementById("hud-player-name").innerText = this.player.name;
          this.startCustomizationScene();
        } else {
          this.namingStage = "TYPING";
          document.getElementById("undertale-confirm-box").classList.add("hidden");
          this.sound.playWrong();
        }
      } else if (code === "Escape" || code === "KeyC") {
        this.namingStage = "TYPING";
        document.getElementById("undertale-confirm-box").classList.add("hidden");
        this.sound.playWrong();
      }
    }
  }

  // Update Player Movement & State
  updateMovement() {
    let isMoving = false;
    
    if (this.keys["ArrowLeft"] || this.keys["KeyA"]) {
      this.player.dx = -this.player.speed;
      this.player.facingRight = false;
      isMoving = true;
    } else if (this.keys["ArrowRight"] || this.keys["KeyD"]) {
      this.player.dx = this.player.speed;
      this.player.facingRight = true;
      isMoving = true;
    } else {
      this.player.dx = 0;
    }
    
    if (isMoving) {
       this.player.state = this.keys["ShiftLeft"] ? 'run' : 'walk';
       if (this.keys["ShiftLeft"]) this.player.dx *= 1.5;
    } else {
       this.player.state = 'idle';
    }

    this.player.frameCount = (this.player.frameCount || 0) + 1;
    
    // NPC Wandering AI
    for (let ent of this.entities) {
      if (ent.type === "npc") {
        ent.frameCount = (ent.frameCount || 0) + 1;
        ent.wanderTimer = (ent.wanderTimer || 0) - 1;
        
        if (ent.wanderTimer <= 0) {
          if (Math.random() > 0.5) {
            ent.state = 'idle';
            ent.dx = 0;
            ent.wanderTimer = 60 + Math.random() * 100;
          } else {
            ent.state = 'walk';
            ent.facingRight = Math.random() > 0.5;
            ent.dx = ent.facingRight ? 1 : -1;
            ent.wanderTimer = 40 + Math.random() * 60;
          }
        }
        
        if (ent.state === 'walk') {
           ent.x += ent.dx;
           if (ent.x < 0) { ent.x = 0; ent.dx = 1; ent.facingRight = true; }
           if (ent.x > this.worldWidth) { ent.x = this.worldWidth; ent.dx = -1; ent.facingRight = false; }
        }
      }
    }
  }

  drawProceduralSprite(ctx, x, y, width, height, gender, state, frameCount, facingRight, isHero = false, customOptions = null) {
     ctx.save();
     ctx.translate(x + width/2, y + height);
     if (!facingRight) ctx.scale(-1, 1);
     
     const isF = (gender && typeof gender === "string" && gender.includes("f"));
     const bob = (state === 'walk' || state === 'run') ? Math.abs(Math.sin(frameCount * 0.2)) * 4 : 0;
     const legSwing = (state === 'walk' || state === 'run') ? Math.sin(frameCount * 0.2) * 6 : 0;
     
     const custom = customOptions || (isHero && this.player && this.player.custom ? this.player.custom : {
       hat: "none",
       hairStyle: isF ? "long" : "short",
       hairColor: isF ? "#d63031" : "#e17055",
       shirt: "overalls",
       shirtColor: isF ? "#ff6b6b" : "#2a5298",
       pants: isF ? "skirt" : "jeans",
       pantsColor: "#1a252c",
       costume: "none"
     });

     // Shadow
     ctx.fillStyle = "rgba(0,0,0,0.35)";
     ctx.beginPath();
     ctx.ellipse(0, 0, 14, 5, 0, 0, Math.PI*2);
     ctx.fill();
     
     ctx.translate(0, -bob);

     // ==========================================
     // FULL BODY COSTUMES (OVERRIDE NORMAL CLOTHES)
     // ==========================================
     if (custom.costume && custom.costume !== "none") {
       const cost = custom.costume;

       // 1. BANANA COSTUME
       if (cost === "banana") {
         // Yellow Feet
         ctx.fillStyle = "#ffeaa7";
         ctx.fillRect(-5 + legSwing, -6, 3, 4);
         ctx.fillRect(2 - legSwing, -6, 3, 4);
         ctx.fillStyle = "#ffd000";
         ctx.fillRect(-7 + legSwing, -2, 6, 3);
         ctx.fillRect(1 - legSwing, -2, 6, 3);

         // Giant Curved Banana Body
         ctx.fillStyle = "#ffcc00";
         ctx.beginPath();
         ctx.moveTo(0, -62);
         ctx.quadraticCurveTo(20, -32, 15, 0);
         ctx.quadraticCurveTo(0, 5, -15, 0);
         ctx.quadraticCurveTo(-22, -32, 0, -62);
         ctx.fill();

         // Banana 3D Ridge
         ctx.strokeStyle = "#e6b800";
         ctx.lineWidth = 2;
         ctx.beginPath();
         ctx.moveTo(0, -62);
         ctx.quadraticCurveTo(9, -28, 4, 0);
         ctx.stroke();

         // Green Stem on top
         ctx.fillStyle = "#2d6a4f";
         ctx.fillRect(-3, -65, 6, 5);
         ctx.fillStyle = "#1b4332";
         ctx.fillRect(-2, -67, 4, 3);

         // Peeking Face Hole
         ctx.fillStyle = "#1e1b18";
         ctx.beginPath();
         ctx.ellipse(0, -32, 8, 9, 0, 0, Math.PI * 2);
         ctx.fill();
         ctx.fillStyle = "#ffeaa7";
         ctx.beginPath();
         ctx.ellipse(0, -32, 7, 8, 0, 0, Math.PI * 2);
         ctx.fill();

         // Face features
         ctx.fillStyle = "#1e1b18";
         ctx.fillRect(-4, -34, 2, 2);
         ctx.fillRect(2, -34, 2, 2);
         ctx.fillStyle = "#ffffff";
         ctx.fillRect(-4, -34, 1, 1);
         ctx.fillRect(2, -34, 1, 1);
         ctx.fillStyle = "rgba(255, 107, 107, 0.5)";
         ctx.fillRect(-5, -31, 2, 1);
         ctx.fillRect(3, -31, 2, 1);
         ctx.fillStyle = "#e76f51";
         ctx.fillRect(-2, -30, 4, 1);
       }
       // 2. KIRITO (BLACK SWORDSMAN)
       else if (cost === "kirito") {
         // Dual Swords on Back
         ctx.fillStyle = "#27272a";
         ctx.fillRect(-16, -46, 3, 30);
         ctx.fillStyle = "#71717a";
         ctx.fillRect(-18, -40, 7, 2);
         ctx.fillStyle = "#00f5d4";
         ctx.fillRect(13, -46, 3, 30);
         ctx.fillStyle = "#2dd4bf";
         ctx.fillRect(11, -40, 7, 2);

         // Long Coat tails
         ctx.fillStyle = "#18181b";
         ctx.fillRect(-11, -18, 22, 14);
         ctx.fillStyle = "#e4e4e7";
         ctx.fillRect(-11, -5, 22, 1.5);
         ctx.fillRect(-2, -18, 4, 14);

         // Legs & Boots
         ctx.fillStyle = "#09090b";
         ctx.fillRect(-6 + legSwing, -10, 4, 9);
         ctx.fillRect(2 - legSwing, -10, 4, 9);
         ctx.fillStyle = "#27272a";
         ctx.fillRect(-7 + legSwing, -3, 6, 3);
         ctx.fillRect(1 - legSwing, -3, 6, 3);

         // Coat Body & Chest Straps
         ctx.fillStyle = "#18181b";
         ctx.fillRect(-10, -26, 20, 15);
         ctx.fillStyle = "#e4e4e7";
         ctx.fillRect(-10, -25, 20, 2);
         ctx.fillRect(-8, -26, 3, 14);
         ctx.fillRect(5, -26, 3, 14);

         // Arms & Gloves
         ctx.fillStyle = "#18181b";
         ctx.fillRect(-14, -26, 4, 12);
         ctx.fillRect(10, -26, 4, 12);
         ctx.fillStyle = "#09090b";
         ctx.fillRect(-14, -14, 4, 3);
         ctx.fillRect(10, -14, 4, 3);

         // Head
         ctx.fillStyle = "#ffeaa7";
         ctx.fillRect(-8, -42, 16, 16);

         // Spiky Raven Black Hair
         ctx.fillStyle = "#09090b";
         ctx.fillRect(-9, -44, 18, 6);
         ctx.fillRect(-11, -42, 4, 12);
         ctx.fillRect(7, -42, 4, 12);
         ctx.beginPath();
         ctx.moveTo(-9, -44); ctx.lineTo(-5, -49); ctx.lineTo(-2, -44);
         ctx.moveTo(-2, -44); ctx.lineTo(1, -50); ctx.lineTo(4, -44);
         ctx.moveTo(4, -44); ctx.lineTo(8, -48); ctx.lineTo(10, -44);
         ctx.fill();

         // Eyes
         ctx.fillStyle = "#18181b";
         ctx.fillRect(0, -35, 2, 2);
         ctx.fillRect(5, -35, 2, 2);
         ctx.fillStyle = "#ffffff";
         ctx.fillRect(0, -35, 1, 1);
         ctx.fillRect(5, -35, 1, 1);
       }
       // 3. NARUTO (SAGE NINJA)
       else if (cost === "naruto") {
         // Pants & Bandage & Sandals
         ctx.fillStyle = "#f97316";
         ctx.fillRect(-6 + legSwing, -10, 4, 6);
         ctx.fillRect(2 - legSwing, -10, 4, 6);
         ctx.fillStyle = "#ffffff";
         ctx.fillRect(2 - legSwing, -7, 4, 3);
         ctx.fillStyle = "#1e40af";
         ctx.fillRect(-6 + legSwing, -3, 5, 3);
         ctx.fillRect(2 - legSwing, -3, 5, 3);

         // Orange & Blue Jumpsuit
         ctx.fillStyle = "#f97316";
         ctx.fillRect(-10, -26, 20, 16);
         ctx.fillStyle = "#1e3a8a";
         ctx.fillRect(-10, -26, 20, 4);
         ctx.fillRect(-10, -26, 4, 12);
         ctx.fillRect(6, -26, 4, 12);
         // Uzumaki Spiral
         ctx.fillStyle = "#ef4444";
         ctx.beginPath();
         ctx.arc(0, -17, 3, 0, Math.PI * 2);
         ctx.fill();
         ctx.strokeStyle = "#ffffff";
         ctx.lineWidth = 1;
         ctx.stroke();

         // Orange Arms
         ctx.fillStyle = "#f97316";
         ctx.fillRect(-14, -26, 4, 12);
         ctx.fillRect(10, -26, 4, 12);
         ctx.fillStyle = "#ffeaa7";
         ctx.fillRect(-14, -14, 4, 3);
         ctx.fillRect(10, -14, 4, 3);

         // Head
         ctx.fillStyle = "#ffeaa7";
         ctx.fillRect(-8, -42, 16, 16);

         // Spiky Blonde Hair
         ctx.fillStyle = "#facc15";
         ctx.fillRect(-9, -44, 18, 6);
         ctx.fillRect(-10, -42, 4, 8);
         ctx.fillRect(6, -42, 4, 8);
         ctx.beginPath();
         ctx.moveTo(-9, -44); ctx.lineTo(-6, -51); ctx.lineTo(-3, -44);
         ctx.moveTo(-3, -44); ctx.lineTo(0, -52); ctx.lineTo(3, -44);
         ctx.moveTo(3, -44); ctx.lineTo(7, -50); ctx.lineTo(9, -44);
         ctx.fill();

         // Leaf Headband
         ctx.fillStyle = "#1e3a8a";
         ctx.fillRect(-9, -41, 18, 5);
         ctx.fillStyle = "#cbd5e1";
         ctx.fillRect(-4, -41, 8, 4);
         ctx.fillStyle = "#1e293b";
         ctx.fillRect(-1, -39, 2, 2);

         // Whiskers
         ctx.fillStyle = "#b45309";
         ctx.fillRect(-5, -34, 3, 1);
         ctx.fillRect(-5, -32, 3, 1);
         ctx.fillRect(4, -34, 3, 1);
         ctx.fillRect(4, -32, 3, 1);

         // Blue Eyes
         ctx.fillStyle = "#0284c7";
         ctx.fillRect(0, -36, 2, 2);
         ctx.fillRect(5, -36, 2, 2);
       }
       // 4. LUFFY (STRAW HAT CAPTAIN)
       else if (cost === "luffy") {
         // Bermuda Shorts & Sandals
         ctx.fillStyle = "#2563eb";
         ctx.fillRect(-6 + legSwing, -10, 4, 5);
         ctx.fillRect(2 - legSwing, -10, 4, 5);
         ctx.fillStyle = "#f8fafc";
         ctx.fillRect(-7 + legSwing, -5, 6, 2);
         ctx.fillRect(1 - legSwing, -5, 6, 2);
         ctx.fillStyle = "#ffeaa7";
         ctx.fillRect(-5 + legSwing, -3, 3, 2);
         ctx.fillRect(2 - legSwing, -3, 3, 2);
         ctx.fillStyle = "#78350f";
         ctx.fillRect(-6 + legSwing, -1, 5, 1.5);
         ctx.fillRect(1 - legSwing, -1, 5, 1.5);

         // Yellow Sash
         ctx.fillStyle = "#eab308";
         ctx.fillRect(-10, -13, 20, 3);
         ctx.fillRect(-8, -10, 4, 6);

         // Open Red Vest & Bare Chest with X-Scar
         ctx.fillStyle = "#ffeaa7";
         ctx.fillRect(-6, -26, 12, 13);
         ctx.fillStyle = "#dc2626";
         ctx.fillRect(-10, -26, 4, 14);
         ctx.fillRect(6, -26, 4, 14);
         ctx.strokeStyle = "#991b1b";
         ctx.lineWidth = 1.5;
         ctx.beginPath();
         ctx.moveTo(-3, -24); ctx.lineTo(3, -18);
         ctx.moveTo(3, -24); ctx.lineTo(-3, -18);
         ctx.stroke();

         // Bare Arms
         ctx.fillStyle = "#ffeaa7";
         ctx.fillRect(-14, -26, 4, 14);
         ctx.fillRect(10, -26, 4, 14);

         // Head
         ctx.fillStyle = "#ffeaa7";
         ctx.fillRect(-8, -42, 16, 16);

         // Messy Black Hair
         ctx.fillStyle = "#18181b";
         ctx.fillRect(-9, -43, 18, 5);
         ctx.fillRect(-10, -41, 4, 8);
         ctx.fillRect(6, -41, 4, 8);

         // Straw Hat
         ctx.fillStyle = "#fde047";
         ctx.fillRect(-16, -45, 32, 4);
         ctx.fillRect(-10, -52, 20, 8);
         ctx.fillStyle = "#dc2626";
         ctx.fillRect(-10, -46, 20, 2);

         // Face features
         ctx.fillStyle = "#18181b";
         ctx.fillRect(0, -36, 2, 2);
         ctx.fillRect(5, -36, 2, 2);
         ctx.fillStyle = "#7f1d1d";
         ctx.fillRect(0, -33, 2, 1);
         ctx.fillStyle = "#ffffff";
         ctx.fillRect(-2, -31, 6, 2);
       }
       // 5. GOKU (SUPER SAIYAN)
       else if (cost === "goku") {
         // Blue Boots with red/yellow accents
         ctx.fillStyle = "#1e3a8a";
         ctx.fillRect(-7 + legSwing, -10, 5, 9);
         ctx.fillRect(2 - legSwing, -10, 5, 9);
         ctx.fillStyle = "#eab308";
         ctx.fillRect(-7 + legSwing, -6, 5, 2);
         ctx.fillRect(2 - legSwing, -6, 5, 2);
         ctx.fillStyle = "#dc2626";
         ctx.fillRect(-7 + legSwing, -1, 5, 1.5);
         ctx.fillRect(2 - legSwing, -1, 5, 1.5);

         // Orange Gi Pants & Blue Belt
         ctx.fillStyle = "#ea580c";
         ctx.fillRect(-6 + legSwing, -14, 4, 6);
         ctx.fillRect(2 - legSwing, -14, 4, 6);
         ctx.fillStyle = "#1e3a8a";
         ctx.fillRect(-10, -14, 20, 3);
         ctx.fillRect(-6, -11, 4, 6);

         // Orange Gi Top & Blue Undershirt
         ctx.fillStyle = "#ea580c";
         ctx.fillRect(-10, -26, 20, 13);
         ctx.fillStyle = "#1e3a8a";
         ctx.fillRect(-4, -26, 8, 8);
         ctx.fillStyle = "#ffeaa7";
         ctx.fillRect(-2, -26, 4, 4);

         // Muscular Arms with Blue Wristbands
         ctx.fillStyle = "#ffeaa7";
         ctx.fillRect(-14, -26, 4, 10);
         ctx.fillRect(10, -26, 4, 10);
         ctx.fillStyle = "#1e3a8a";
         ctx.fillRect(-14, -16, 4, 4);
         ctx.fillRect(10, -16, 4, 4);
         ctx.fillStyle = "#ffeaa7";
         ctx.fillRect(-14, -12, 4, 2);
         ctx.fillRect(10, -12, 4, 2);

         // Head
         ctx.fillStyle = "#ffeaa7";
         ctx.fillRect(-8, -42, 16, 16);

         // Giant Super Saiyan Hair
         ctx.fillStyle = "#fef08a";
         ctx.beginPath();
         ctx.moveTo(-12, -40); ctx.lineTo(-18, -55); ctx.lineTo(-8, -48);
         ctx.lineTo(-4, -60); ctx.lineTo(0, -48);
         ctx.lineTo(8, -62); ctx.lineTo(10, -48);
         ctx.lineTo(18, -54); ctx.lineTo(12, -40);
         ctx.fill();
         ctx.fillStyle = "#facc15";
         ctx.fillRect(-9, -44, 18, 6);

         // Teal Saiyan Eyes
         ctx.fillStyle = "#06b6d4";
         ctx.fillRect(0, -36, 2, 2);
         ctx.fillRect(5, -36, 2, 2);

         // Golden Aura
         ctx.fillStyle = "rgba(254, 240, 138, 0.7)";
         for (let i = 0; i < 4; i++) {
           const ax = Math.sin(frameCount * 0.2 + i * 2) * 18;
           const ay = -40 + Math.cos(frameCount * 0.2 + i * 3) * 20;
           ctx.fillRect(ax, ay, 2, 2);
         }
       }
       // 6. DINO / GODZILLA MASCOT
       else if (cost === "dino") {
         // Tail behind
         ctx.fillStyle = "#15803d";
         ctx.beginPath();
         ctx.moveTo(-10, -14); ctx.lineTo(-24, -8); ctx.lineTo(-10, -2);
         ctx.fill();
         ctx.fillStyle = "#eab308";
         ctx.fillRect(-22, -10, 3, 3);

         // Green Legs & Claws
         ctx.fillStyle = "#22c55e";
         ctx.fillRect(-7 + legSwing, -10, 5, 9);
         ctx.fillRect(2 - legSwing, -10, 5, 9);
         ctx.fillStyle = "#ffffff";
         ctx.fillRect(-8 + legSwing, -2, 7, 2);
         ctx.fillRect(1 - legSwing, -2, 7, 2);

         // Green Body & Belly
         ctx.fillStyle = "#22c55e";
         ctx.fillRect(-11, -26, 22, 16);
         ctx.fillStyle = "#86efac";
         ctx.beginPath();
         ctx.ellipse(0, -18, 6, 7, 0, 0, Math.PI * 2);
         ctx.fill();

         // Spikes
         ctx.fillStyle = "#eab308";
         ctx.fillRect(-13, -24, 3, 3);
         ctx.fillRect(-13, -18, 3, 3);
         ctx.fillRect(-13, -12, 3, 3);

         // Arms
         ctx.fillStyle = "#22c55e";
         ctx.fillRect(-15, -24, 4, 10);
         ctx.fillRect(11, -24, 4, 10);
         ctx.fillStyle = "#ffffff";
         ctx.fillRect(-15, -14, 4, 2);
         ctx.fillRect(11, -14, 4, 2);

         // Dino Head Hood
         ctx.fillStyle = "#16a34a";
         ctx.fillRect(-11, -48, 22, 22);
         ctx.fillStyle = "#eab308";
         ctx.fillRect(-2, -52, 4, 4);

         // Open Jaws & Face inside
         ctx.fillStyle = "#18181b";
         ctx.fillRect(-7, -42, 14, 12);
         ctx.fillStyle = "#ffeaa7";
         ctx.fillRect(-6, -41, 12, 10);
         ctx.fillStyle = "#ffffff";
         for (let i = 0; i < 4; i++) {
           ctx.fillRect(-6 + i * 3, -42, 2, 2);
           ctx.fillRect(-6 + i * 3, -32, 2, 2);
         }

         // Googly Eyes
         ctx.fillStyle = "#ffffff";
         ctx.fillRect(-8, -48, 4, 4);
         ctx.fillRect(4, -48, 4, 4);
         ctx.fillStyle = "#000000";
         ctx.fillRect(-7, -47, 2, 2);
         ctx.fillRect(5, -47, 2, 2);

         // Eyes inside
         ctx.fillStyle = "#2d3436";
         ctx.fillRect(-2, -37, 2, 2);
         ctx.fillRect(2, -37, 2, 2);
       }
       // 7. CYBER MECHA BOT
       else if (cost === "cyber") {
         // Armored Legs & Thrusters
         ctx.fillStyle = "#1e293b";
         ctx.fillRect(-7 + legSwing, -12, 5, 11);
         ctx.fillRect(2 - legSwing, -12, 5, 11);
         ctx.fillStyle = "#3b82f6";
         ctx.fillRect(-8 + legSwing, -3, 7, 3);
         ctx.fillRect(1 - legSwing, -3, 7, 3);
         ctx.fillStyle = "#06b6d4";
         ctx.fillRect(-6 + legSwing, 0, 3, 1.5);
         ctx.fillRect(3 - legSwing, 0, 3, 1.5);

         // Mecha Chassis & Power Core
         ctx.fillStyle = "#1e293b";
         ctx.fillRect(-12, -28, 24, 17);
         ctx.fillStyle = "#3b82f6";
         ctx.fillRect(-10, -26, 20, 13);
         ctx.fillStyle = "#06b6d4";
         ctx.beginPath();
         ctx.arc(0, -20, 4, 0, Math.PI * 2);
         ctx.fill();
         ctx.fillStyle = "#ffffff";
         ctx.beginPath();
         ctx.arc(0, -20, 1.5, 0, Math.PI * 2);
         ctx.fill();

         // Shoulders & Arms
         ctx.fillStyle = "#475569";
         ctx.fillRect(-16, -28, 5, 6);
         ctx.fillRect(11, -28, 5, 6);
         ctx.fillStyle = "#3b82f6";
         ctx.fillRect(-15, -22, 4, 10);
         ctx.fillRect(11, -22, 4, 10);
         ctx.fillStyle = "#06b6d4";
         ctx.fillRect(-15, -12, 4, 3);
         ctx.fillRect(11, -12, 4, 3);

         // Mecha Helmet with Visor
         ctx.fillStyle = "#1e293b";
         ctx.fillRect(-10, -46, 20, 18);
         ctx.fillStyle = "#3b82f6";
         ctx.fillRect(-9, -47, 18, 4);
         ctx.fillStyle = "#ef4444";
         ctx.fillRect(-1, -52, 2, 6);

         // Glowing Cyan Visor
         ctx.fillStyle = "#06b6d4";
         ctx.fillRect(-7, -40, 14, 5);
         ctx.fillStyle = "#ffffff";
         ctx.fillRect(-5, -39, 10, 1.5);
       }

       ctx.restore();

       // Floating hero nametag rendered crisp in HTML DOM by updateFloatingTags()
       return;
     }

     // ==========================================
     // STANDARD PIECE-BY-PIECE CLOTHING
     // ==========================================

     const skinColor = custom.skinColor || "#ffeaa7";

     // Cloak / Cape
     if (isHero) {
       ctx.fillStyle = isF ? "#8338ec" : "#3a86ff";
       const capeWave = Math.sin(frameCount * 0.15) * 3;
       ctx.beginPath();
       ctx.moveTo(-10, -26);
       ctx.lineTo(-18 + capeWave, -6);
       ctx.lineTo(-6, -6);
       ctx.fill();
     }

     // --- PANTS & LEGS ---
     const pColor = custom.pantsColor || "#1a252c";
     if (custom.pants === "shorts") {
       ctx.fillStyle = pColor;
       ctx.fillRect(-6 + legSwing, -10, 4, 4);
       ctx.fillRect(2 - legSwing, -10, 4, 4);
       ctx.fillStyle = skinColor;
       ctx.fillRect(-6 + legSwing, -6, 4, 4);
       ctx.fillRect(2 - legSwing, -6, 4, 4);
       ctx.fillStyle = "#8b5a2b";
       ctx.fillRect(-7 + legSwing, -2, 6, 2);
       ctx.fillRect(1 - legSwing, -2, 6, 2);
     } else if (custom.pants === "skirt") {
       ctx.fillStyle = pColor;
       ctx.beginPath();
       ctx.moveTo(-10, -14);
       ctx.lineTo(10, -14);
       ctx.lineTo(12, -7);
       ctx.lineTo(-12, -7);
       ctx.closePath();
       ctx.fill();
       ctx.fillStyle = skinColor;
       ctx.fillRect(-5 + legSwing, -7, 3, 5);
       ctx.fillRect(2 - legSwing, -7, 3, 5);
       ctx.fillStyle = "#4a0e17";
       ctx.fillRect(-6 + legSwing, -2, 5, 2);
       ctx.fillRect(1 - legSwing, -2, 5, 2);
     } else if (custom.pants === "cargo") {
       ctx.fillStyle = pColor;
       ctx.fillRect(-7 + legSwing, -10, 5, 9);
       ctx.fillRect(2 - legSwing, -10, 5, 9);
       ctx.fillStyle = "rgba(0,0,0,0.2)";
       ctx.fillRect(-8 + legSwing, -7, 2, 4);
       ctx.fillRect(6 - legSwing, -7, 2, 4);
       ctx.fillStyle = "#2d3436";
       ctx.fillRect(-8 + legSwing, -2, 7, 2);
       ctx.fillRect(1 - legSwing, -2, 7, 2);
     } else {
       ctx.fillStyle = pColor;
       ctx.fillRect(-6 + legSwing, -10, 4, 9);
       ctx.fillRect(2 - legSwing, -10, 4, 9);
       ctx.fillStyle = "#8b5a2b";
       ctx.fillRect(-7 + legSwing, -2, 6, 2);
       ctx.fillRect(1 - legSwing, -2, 6, 2);
     }

     // --- BODY / SHIRT ---
     const sColor = custom.shirtColor || "#2a5298";
     ctx.fillStyle = sColor;
     ctx.fillRect(-10, -26, 20, 15);

     if (custom.shirt === "overalls") {
       ctx.fillStyle = pColor;
       ctx.fillRect(-8, -26, 3, 14);
       ctx.fillRect(5, -26, 3, 14);
       ctx.fillRect(-10, -16, 20, 4);
       ctx.fillStyle = "#ffd166";
       ctx.fillRect(-8, -20, 3, 2);
       ctx.fillRect(5, -20, 3, 2);
     } else if (custom.shirt === "plaid") {
       ctx.fillStyle = "rgba(255,255,255,0.25)";
       ctx.fillRect(-10, -22, 20, 2);
       ctx.fillRect(-10, -17, 20, 2);
       ctx.fillRect(-4, -26, 2, 14);
       ctx.fillRect(2, -26, 2, 14);
     } else if (custom.shirt === "armor") {
       ctx.fillStyle = "#54330f";
       ctx.fillRect(-8, -24, 16, 11);
       ctx.fillStyle = "#ffd166";
       ctx.fillRect(-2, -22, 4, 4);
     } else if (custom.shirt === "vest") {
       ctx.fillStyle = "#ffffff";
       ctx.fillRect(-5, -26, 10, 14);
       ctx.fillStyle = sColor;
       ctx.fillRect(-10, -26, 5, 14);
       ctx.fillRect(5, -26, 5, 14);
     } else if (custom.shirt === "tunic") {
       ctx.fillStyle = sColor;
       ctx.fillRect(-11, -12, 22, 3);
       ctx.fillStyle = "#ffd166";
       ctx.fillRect(-11, -10, 22, 1);
     }
     
     // Belt & Gold buckle
     ctx.fillStyle = "#3e2723";
     ctx.fillRect(-10, -14, 20, 3);
     ctx.fillStyle = "#ffd166";
     ctx.fillRect(-3, -14, 6, 3);

     // --- ARMS ---
     ctx.fillStyle = (custom.shirt === "vest") ? skinColor : sColor;
     ctx.fillRect(-14, -26, 4, 12);
     ctx.fillRect(10, -26, 4, 12);
     ctx.fillStyle = skinColor;
     ctx.fillRect(-14, -14, 4, 3);
     ctx.fillRect(10, -14, 4, 3);
     
     // --- HEAD BASE ---
     ctx.fillStyle = skinColor;
     ctx.fillRect(-8, -42, 16, 16);
     
     // --- HAIRSTYLES (20 STYLES) ---
     const hColor = custom.hairColor || "#e17055";
     ctx.fillStyle = hColor;
     const hStyle = custom.hairStyle || "short";

     if (hStyle === "bald") {
       // Shiny bald head with specular gleam
       ctx.fillStyle = "rgba(255,255,255,0.4)";
       ctx.fillRect(-4, -41, 4, 2);
     } else if (hStyle === "buzz") {
       ctx.fillStyle = hColor;
       ctx.fillRect(-8, -43, 16, 3);
       ctx.fillRect(-9, -42, 2, 6);
       ctx.fillRect(7, -42, 2, 6);
     } else if (hStyle === "long") {
       ctx.fillRect(-9, -44, 18, 6);
       ctx.fillRect(-11, -42, 5, 18);
       ctx.fillRect(6, -42, 5, 18);
     } else if (hStyle === "spiky") {
       ctx.fillRect(-9, -44, 18, 5);
       ctx.fillRect(-10, -42, 4, 10);
       ctx.beginPath();
       ctx.moveTo(-9, -44); ctx.lineTo(-6, -50); ctx.lineTo(-3, -44);
       ctx.moveTo(-3, -44); ctx.lineTo(0, -52); ctx.lineTo(3, -44);
       ctx.moveTo(3, -44); ctx.lineTo(6, -50); ctx.lineTo(9, -44);
       ctx.fill();
     } else if (hStyle === "ponytail") {
       ctx.fillRect(-9, -44, 18, 6);
       ctx.fillRect(-10, -42, 4, 10);
       ctx.fillRect(-14, -46, 6, 15);
       ctx.fillRect(-16, -38, 4, 9);
     } else if (hStyle === "bob") {
       ctx.fillRect(-9, -44, 18, 7);
       ctx.fillRect(-11, -42, 4, 14);
       ctx.fillRect(7, -42, 4, 14);
     } else if (hStyle === "bun") {
       ctx.fillRect(-9, -44, 18, 6);
       ctx.fillRect(-10, -42, 4, 10);
       ctx.fillRect(-4, -49, 8, 6);
       ctx.fillStyle = "#ffd166";
       ctx.fillRect(-1, -47, 2, 2);
     } else if (hStyle === "twintail") {
       ctx.fillRect(-9, -44, 18, 6);
       ctx.fillRect(-10, -42, 4, 10);
       // Left & right high pigtails
       ctx.fillRect(-14, -44, 5, 16);
       ctx.fillRect(9, -44, 5, 16);
       // Ribbon ties
       ctx.fillStyle = "#ff4d6d";
       ctx.fillRect(-13, -42, 3, 2);
       ctx.fillRect(10, -42, 3, 2);
     } else if (hStyle === "afro") {
       ctx.beginPath();
       ctx.ellipse(0, -42, 14, 12, 0, 0, Math.PI * 2);
       ctx.fill();
     } else if (hStyle === "undercut") {
       ctx.fillRect(-6, -46, 15, 6);
       ctx.fillRect(-8, -44, 4, 4);
       ctx.fillStyle = "rgba(0,0,0,0.3)";
       ctx.fillRect(-9, -40, 2, 8); // shaved side
     } else if (hStyle === "wavy") {
       ctx.fillRect(-9, -44, 18, 6);
       ctx.fillRect(-11, -42, 4, 8);
       ctx.fillRect(-12, -34, 4, 8);
       ctx.fillRect(7, -42, 4, 8);
       ctx.fillRect(8, -34, 4, 8);
     } else if (hStyle === "mohawk") {
       ctx.fillRect(-3, -52, 6, 14);
       ctx.fillStyle = "rgba(0,0,0,0.3)";
       ctx.fillRect(-8, -41, 5, 8);
       ctx.fillRect(3, -41, 5, 8);
     } else if (hStyle === "sidebraid") {
       ctx.fillRect(-9, -44, 18, 6);
       ctx.fillRect(-10, -42, 4, 8);
       ctx.fillRect(6, -42, 5, 20); // braid draping
       ctx.fillStyle = "#ffd166";
       ctx.fillRect(7, -26, 3, 2); // hair band
     } else if (hStyle === "hime") {
       ctx.fillRect(-9, -44, 18, 7);
       ctx.fillRect(-10, -38, 4, 10); // straight bangs
       ctx.fillRect(6, -38, 4, 10);
       ctx.fillRect(-12, -42, 4, 22); // long back locks
       ctx.fillRect(8, -42, 4, 22);
     } else if (hStyle === "emo") {
       ctx.fillRect(-9, -44, 18, 6);
       ctx.fillRect(-10, -42, 4, 12);
       ctx.fillRect(-2, -40, 8, 10); // covering one eye
     } else if (hStyle === "ultra") {
       ctx.fillRect(-9, -44, 18, 6);
       ctx.fillRect(-12, -42, 5, 36); // reaches near floor
       ctx.fillRect(7, -42, 5, 36);
     } else if (hStyle === "odango") {
       ctx.fillRect(-9, -44, 18, 6);
       ctx.fillRect(-10, -42, 4, 10);
       // Double round buns on sides
       ctx.fillRect(-11, -49, 6, 6);
       ctx.fillRect(5, -49, 6, 6);
       ctx.fillStyle = "#ffd166";
       ctx.fillRect(-9, -46, 2, 2);
       ctx.fillRect(7, -46, 2, 2);
     } else if (hStyle === "slick") {
       ctx.fillRect(-9, -45, 18, 6);
       ctx.fillRect(-10, -42, 3, 10);
       ctx.fillRect(7, -42, 3, 10);
       ctx.fillStyle = "rgba(0,0,0,0.15)";
       ctx.fillRect(-6, -44, 12, 2);
     } else if (hStyle === "messy") {
       ctx.fillRect(-9, -44, 18, 6);
       ctx.fillRect(-11, -42, 4, 12);
       ctx.fillRect(7, -42, 4, 12);
       ctx.beginPath();
       ctx.moveTo(-9, -44); ctx.lineTo(-12, -48); ctx.lineTo(-6, -44);
       ctx.moveTo(-2, -44); ctx.lineTo(1, -49); ctx.lineTo(5, -44);
       ctx.moveTo(6, -44); ctx.lineTo(11, -47); ctx.lineTo(9, -44);
       ctx.fill();
     } else {
       // Default short
       ctx.fillRect(-9, -44, 18, 6);
       ctx.fillRect(-10, -42, 4, 11);
     }

     // --- HATS & ACCESSORIES (14 STYLES) ---
     const hat = custom.hat || "none";
     if (hat === "straw") {
       ctx.fillStyle = "#e9c46a";
       ctx.fillRect(-16, -45, 32, 4);
       ctx.fillRect(-10, -52, 20, 8);
       ctx.fillStyle = "#2a9d8f";
       ctx.fillRect(-10, -46, 20, 2);
     } else if (hat === "bandana") {
       ctx.fillStyle = "#e63946";
       ctx.fillRect(-9, -43, 18, 4);
       ctx.fillRect(-13, -41, 4, 6);
       ctx.fillRect(-15, -37, 3, 5);
     } else if (hat === "crown") {
       ctx.fillStyle = "#2d6a4f";
       ctx.fillRect(-9, -41, 18, 2);
       ctx.fillStyle = "#ff4d6d"; ctx.fillRect(-7, -43, 3, 3);
       ctx.fillStyle = "#ffd166"; ctx.fillRect(-2, -43, 3, 3);
       ctx.fillStyle = "#00f5d4"; ctx.fillRect(3, -43, 3, 3);
       ctx.fillStyle = "#fff"; ctx.fillRect(7, -42, 2, 2);
     } else if (hat === "beret") {
       ctx.fillStyle = "#6d597a";
       ctx.beginPath();
       ctx.ellipse(0, -46, 12, 5, -0.2, 0, Math.PI * 2);
       ctx.fill();
       ctx.fillRect(-1, -52, 2, 3);
     } else if (hat === "circlet") {
       ctx.fillStyle = "#ffd166";
       ctx.fillRect(-8, -40, 16, 3);
       ctx.fillStyle = "#00f5d4";
       ctx.fillRect(-1, -41, 3, 3);
     } else if (hat === "witch") {
       ctx.fillStyle = "#4a154b";
       ctx.fillRect(-15, -45, 30, 4); // brim
       ctx.beginPath();
       ctx.moveTo(-10, -45); ctx.lineTo(4, -62); ctx.lineTo(8, -45);
       ctx.fill();
       ctx.fillStyle = "#ffd166";
       ctx.fillRect(-4, -47, 8, 3); // star buckle
     } else if (hat === "knight") {
       ctx.fillStyle = "#71717a";
       ctx.fillRect(-9, -48, 18, 14);
       ctx.fillStyle = "#18181b";
       ctx.fillRect(-6, -42, 12, 3); // visor slit
       ctx.fillStyle = "#ef4444";
       ctx.fillRect(-2, -54, 4, 7); // plume feather
     } else if (hat === "king") {
       ctx.fillStyle = "#ffd166";
       ctx.beginPath();
       ctx.moveTo(-9, -44); ctx.lineTo(-9, -52); ctx.lineTo(-4, -46);
       ctx.lineTo(0, -54); ctx.lineTo(4, -46); ctx.lineTo(9, -52); ctx.lineTo(9, -44);
       ctx.fill();
       ctx.fillStyle = "#ef4444"; ctx.fillRect(-1, -48, 2, 2); // ruby
       ctx.fillStyle = "#10b981"; ctx.fillRect(-7, -47, 2, 2); // emerald
       ctx.fillStyle = "#10b981"; ctx.fillRect(5, -47, 2, 2);
     } else if (hat === "cowboy") {
       ctx.fillStyle = "#78350f";
       ctx.fillRect(-15, -44, 30, 3); // upturned brim
       ctx.fillRect(-15, -47, 3, 4);
       ctx.fillRect(12, -47, 3, 4);
       ctx.fillRect(-8, -52, 16, 9);
       ctx.fillStyle = "#3e2723";
       ctx.fillRect(-8, -46, 16, 2);
     } else if (hat === "catears") {
       ctx.fillStyle = hColor;
       ctx.beginPath();
       ctx.moveTo(-8, -44); ctx.lineTo(-6, -52); ctx.lineTo(-2, -44);
       ctx.moveTo(2, -44); ctx.lineTo(6, -52); ctx.lineTo(8, -44);
       ctx.fill();
       ctx.fillStyle = "#ec4899"; // pink inner ear
       ctx.fillRect(-6, -48, 2, 3);
       ctx.fillRect(4, -48, 2, 3);
     } else if (hat === "pirate") {
       ctx.fillStyle = "#18181b";
       ctx.beginPath();
       ctx.moveTo(-15, -44); ctx.lineTo(0, -53); ctx.lineTo(15, -44); ctx.lineTo(0, -47);
       ctx.fill();
       ctx.fillStyle = "#ffd166"; ctx.fillRect(-1, -50, 2, 2); // skull badge
     } else if (hat === "glasses") {
       ctx.fillStyle = "#0f172a";
       ctx.fillRect(-7, -37, 6, 4);
       ctx.fillRect(1, -37, 6, 4);
       ctx.fillRect(-1, -36, 2, 2);
       ctx.fillStyle = "#38bdf8"; // specular line
       ctx.fillRect(-6, -37, 2, 1);
       ctx.fillRect(2, -37, 2, 1);
     } else if (hat === "santa") {
       ctx.fillStyle = "#dc2626";
       ctx.beginPath();
       ctx.moveTo(-9, -45); ctx.lineTo(12, -56); ctx.lineTo(8, -45);
       ctx.fill();
       ctx.fillStyle = "#ffffff";
       ctx.fillRect(-10, -46, 20, 3); // white fur band
       ctx.beginPath();
       ctx.arc(13, -56, 3, 0, Math.PI * 2); // pom-pom
       ctx.fill();
     }

     // --- EYES & EXPRESSION ---
     if (hat !== "glasses" && hStyle !== "emo") {
       ctx.fillStyle = "#2d3436";
       ctx.fillRect(0, -35, 2, 2);
       ctx.fillRect(5, -35, 2, 2);
       ctx.fillStyle = "#ffffff";
       ctx.fillRect(0, -35, 1, 1);
       ctx.fillRect(5, -35, 1, 1);
     } else if (hStyle === "emo") {
       // Only other eye visible
       ctx.fillStyle = "#2d3436";
       ctx.fillRect(5, -35, 2, 2);
       ctx.fillStyle = "#ffffff";
       ctx.fillRect(5, -35, 1, 1);
     }
     ctx.fillStyle = "rgba(255, 107, 107, 0.4)";
     ctx.fillRect(-2, -32, 2, 1);
     ctx.fillRect(6, -32, 2, 1);
     
     ctx.restore();

     // Hero floating name indicator (only in active gameplay)
     // Floating hero nametag rendered crisp in HTML DOM by updateFloatingTags()
  }

  /* ===== CHARACTER CUSTOMIZATION SCENE ===== */
  startCustomizationScene() {
    this.sound.playCoin();
    const charModal = document.getElementById("modal-char-creation");
    if (charModal) charModal.classList.add("hidden");

    this.gameState = "CHAR_CUSTOMIZE";
    this.customizeScene = {
      heroX: -60,
      heroY: 340,
      targetX: 240,
      fadeAlpha: 1.0,
      spotlightRadius: 0,
      frameCount: 0,
      facingRight: true,
      stage: "WALK_IN"
    };

    const overlay = document.getElementById("customization-ui-overlay");
    if (overlay) {
      overlay.classList.remove("hidden");
      overlay.style.opacity = "0";
    }

    this.initCustomizationEvents();
  }

  initCustomizationEvents() {
    if (this.customizationEventsInitialized) return;
    this.customizationEventsInitialized = true;

    // Tabs
    const tabs = ["head", "body", "bottom", "costume"];
    tabs.forEach(t => {
      const btn = document.getElementById(`tab-custom-${t}`);
      if (btn) {
        btn.addEventListener("click", () => {
          this.sound.playShoot();
          tabs.forEach(other => {
            const ob = document.getElementById(`tab-custom-${other}`);
            const op = document.getElementById(`pane-custom-${other}`);
            if (ob) ob.classList.remove("active");
            if (op) op.classList.add("hidden");
          });
          btn.classList.add("active");
          const targetPane = document.getElementById(`pane-custom-${t}`);
          if (targetPane) targetPane.classList.remove("hidden");
        });
      }
    });

    // Helper: Remove costume when choosing regular clothes
    const clearCostumeIfAny = () => {
      if (this.player.custom.costume !== "none") {
        this.player.custom.costume = "none";
        document.querySelectorAll("#grid-opt-costume .custom-opt-btn").forEach(b => {
          b.classList.toggle("active", b.dataset.costume === "none");
        });
      }
    };

    // Hat Options
    document.querySelectorAll("#grid-opt-hat .custom-opt-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        clearCostumeIfAny();
        document.querySelectorAll("#grid-opt-hat .custom-opt-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        this.player.custom.hat = btn.dataset.hat;
        this.sound.playCoin();
      });
    });

    // Hair Options
    document.querySelectorAll("#grid-opt-hair .custom-opt-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        clearCostumeIfAny();
        document.querySelectorAll("#grid-opt-hair .custom-opt-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        this.player.custom.hairStyle = btn.dataset.hair;
        this.sound.playCoin();
      });
    });

    // Hair Color Presets
    document.querySelectorAll("#grid-color-hair .custom-color-swatch").forEach(btn => {
      btn.addEventListener("click", () => {
        clearCostumeIfAny();
        document.querySelectorAll("#grid-color-hair .custom-color-swatch").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        this.player.custom.hairColor = btn.dataset.color;
        const picker = document.getElementById("hair-color-picker");
        if (picker) picker.value = btn.dataset.color;
        this.sound.playShoot();
      });
    });

    // Hair Color Wheel Picker Input
    const hairPicker = document.getElementById("hair-color-picker");
    if (hairPicker) {
      hairPicker.addEventListener("input", (e) => {
        clearCostumeIfAny();
        this.player.custom.hairColor = e.target.value;
        document.querySelectorAll("#grid-color-hair .custom-color-swatch").forEach(b => {
          b.classList.toggle("active", b.dataset.color === e.target.value);
        });
      });
    }

    // Skin Color Presets
    document.querySelectorAll("#grid-color-skin .custom-color-swatch").forEach(btn => {
      btn.addEventListener("click", () => {
        document.querySelectorAll("#grid-color-skin .custom-color-swatch").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        this.player.custom.skinColor = btn.dataset.color;
        const picker = document.getElementById("skin-color-picker");
        if (picker) picker.value = btn.dataset.color;
        this.sound.playShoot();
      });
    });

    // Skin Color Wheel Picker Input
    const skinPicker = document.getElementById("skin-color-picker");
    if (skinPicker) {
      skinPicker.addEventListener("input", (e) => {
        this.player.custom.skinColor = e.target.value;
        document.querySelectorAll("#grid-color-skin .custom-color-swatch").forEach(b => {
          b.classList.toggle("active", b.dataset.color === e.target.value);
        });
      });
    }

    // Shirt Options
    document.querySelectorAll("#grid-opt-shirt .custom-opt-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        clearCostumeIfAny();
        document.querySelectorAll("#grid-opt-shirt .custom-opt-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        this.player.custom.shirt = btn.dataset.shirt;
        this.sound.playCoin();
      });
    });

    // Shirt Colors
    document.querySelectorAll("#grid-color-shirt .custom-color-swatch").forEach(btn => {
      btn.addEventListener("click", () => {
        clearCostumeIfAny();
        document.querySelectorAll("#grid-color-shirt .custom-color-swatch").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        this.player.custom.shirtColor = btn.dataset.color;
        const picker = document.getElementById("shirt-color-picker");
        if (picker) picker.value = btn.dataset.color;
        this.sound.playShoot();
      });
    });

    // Shirt Color Wheel Picker Input
    const shirtPicker = document.getElementById("shirt-color-picker");
    if (shirtPicker) {
      shirtPicker.addEventListener("input", (e) => {
        clearCostumeIfAny();
        this.player.custom.shirtColor = e.target.value;
        document.querySelectorAll("#grid-color-shirt .custom-color-swatch").forEach(b => {
          b.classList.toggle("active", b.dataset.color === e.target.value);
        });
      });
    }

    // Pants Options
    document.querySelectorAll("#grid-opt-pants .custom-opt-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        clearCostumeIfAny();
        document.querySelectorAll("#grid-opt-pants .custom-opt-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        this.player.custom.pants = btn.dataset.pants;
        this.sound.playCoin();
      });
    });

    // Pants Colors
    document.querySelectorAll("#grid-color-pants .custom-color-swatch").forEach(btn => {
      btn.addEventListener("click", () => {
        clearCostumeIfAny();
        document.querySelectorAll("#grid-color-pants .custom-color-swatch").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        this.player.custom.pantsColor = btn.dataset.color;
        this.sound.playShoot();
      });
    });

    // Costume Options (Full Set)
    document.querySelectorAll("#grid-opt-costume .custom-opt-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        document.querySelectorAll("#grid-opt-costume .custom-opt-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        this.player.custom.costume = btn.dataset.costume;
        this.sound.playCoin();
      });
    });

    // Turn around button
    const btnTurn = document.getElementById("btn-custom-turn");
    if (btnTurn) {
      btnTurn.addEventListener("click", () => {
        if (this.customizeScene) {
          this.customizeScene.facingRight = !this.customizeScene.facingRight;
          this.player.facingRight = this.customizeScene.facingRight;
        }
        this.sound.playShoot();
      });
    }

    // Randomize button
    const btnRandom = document.getElementById("btn-custom-random");
    if (btnRandom) {
      btnRandom.addEventListener("click", () => {
        this.randomizeCustomization();
        this.sound.playCoin();
      });
    }

    // Confirm button -> Start Game
    const btnConfirm = document.getElementById("btn-custom-confirm");
    if (btnConfirm) {
      btnConfirm.addEventListener("click", () => {
        this.finishCustomizationAndPlay();
      });
    }
  }

  randomizeCustomization() {
    const isCostume = Math.random() < 0.35;
    const costumes = ["banana", "kirito", "naruto", "luffy", "goku", "dino", "cyber"];

    if (isCostume) {
      this.player.custom.costume = costumes[Math.floor(Math.random() * costumes.length)];
    } else {
      this.player.custom.costume = "none";
      const hats = ["none", "straw", "bandana", "crown", "beret", "circlet", "witch", "knight", "king", "cowboy", "catears", "pirate", "glasses", "santa"];
      const hairs = ["short", "long", "spiky", "ponytail", "bob", "bun", "twintail", "afro", "undercut", "wavy", "mohawk", "sidebraid", "hime", "buzz", "bald", "emo", "ultra", "odango", "slick", "messy"];
      const hairColors = ["#e17055", "#2d3436", "#ffd166", "#ff4d6d", "#00f5d4", "#9d4edd", "#ff758f", "#52b788", "#f8f9fa", "#2563eb"];
      const skinColors = ["#ffeaa7", "#ffdfba", "#e0a96d", "#b87333", "#6b4226", "#d0e1fd", "#86efac", "#fca5a5"];
      const shirts = ["overalls", "plaid", "tunic", "armor", "vest"];
      const shirtColors = ["#2a5298", "#2d6a4f", "#d90429", "#6b21a8", "#e85d04", "#212529", "#f8f9fa"];
      const pants = ["jeans", "shorts", "cargo", "skirt"];
      const pantsColors = ["#1a252c", "#0f172a", "#8b5a2b", "#386641", "#e2e8f0", "#780000"];

      this.player.custom.hat = hats[Math.floor(Math.random() * hats.length)];
      this.player.custom.hairStyle = hairs[Math.floor(Math.random() * hairs.length)];
      this.player.custom.hairColor = hairColors[Math.floor(Math.random() * hairColors.length)];
      this.player.custom.skinColor = skinColors[Math.floor(Math.random() * skinColors.length)];
      this.player.custom.shirt = shirts[Math.floor(Math.random() * shirts.length)];
      this.player.custom.shirtColor = shirtColors[Math.floor(Math.random() * shirtColors.length)];
      this.player.custom.pants = pants[Math.floor(Math.random() * pants.length)];
      this.player.custom.pantsColor = pantsColors[Math.floor(Math.random() * pantsColors.length)];
    }

    this.syncCustomizationUI();
  }

  syncCustomizationUI() {
    document.querySelectorAll("#grid-opt-hat .custom-opt-btn").forEach(b => {
      b.classList.toggle("active", b.dataset.hat === this.player.custom.hat);
    });
    document.querySelectorAll("#grid-opt-hair .custom-opt-btn").forEach(b => {
      b.classList.toggle("active", b.dataset.hair === this.player.custom.hairStyle);
    });
    document.querySelectorAll("#grid-color-hair .custom-color-swatch").forEach(b => {
      b.classList.toggle("active", b.dataset.color === this.player.custom.hairColor);
    });
    const hairPicker = document.getElementById("hair-color-picker");
    if (hairPicker && this.player.custom.hairColor) {
      hairPicker.value = this.player.custom.hairColor;
    }

    document.querySelectorAll("#grid-color-skin .custom-color-swatch").forEach(b => {
      b.classList.toggle("active", b.dataset.color === this.player.custom.skinColor);
    });
    const skinPicker = document.getElementById("skin-color-picker");
    if (skinPicker && this.player.custom.skinColor) {
      skinPicker.value = this.player.custom.skinColor;
    }

    document.querySelectorAll("#grid-opt-shirt .custom-opt-btn").forEach(b => {
      b.classList.toggle("active", b.dataset.shirt === this.player.custom.shirt);
    });
    document.querySelectorAll("#grid-color-shirt .custom-color-swatch").forEach(b => {
      b.classList.toggle("active", b.dataset.color === this.player.custom.shirtColor);
    });
    const shirtPicker = document.getElementById("shirt-color-picker");
    if (shirtPicker && this.player.custom.shirtColor) {
      shirtPicker.value = this.player.custom.shirtColor;
    }

    document.querySelectorAll("#grid-opt-pants .custom-opt-btn").forEach(b => {
      b.classList.toggle("active", b.dataset.pants === this.player.custom.pants);
    });
    document.querySelectorAll("#grid-color-pants .custom-color-swatch").forEach(b => {
      b.classList.toggle("active", b.dataset.color === this.player.custom.pantsColor);
    });
    document.querySelectorAll("#grid-opt-costume .custom-opt-btn").forEach(b => {
      b.classList.toggle("active", b.dataset.costume === (this.player.custom.costume || "none"));
    });
  }

  /* ===== SAVE SLOTS SYSTEM (3 SLOTS) ===== */
  openSaveSlotsModal() {
    this.sound.playCoin();
    this.renderSaveSlots();
    const modal = document.getElementById("modal-save-slots");
    if (modal) modal.classList.remove("hidden");
  }

  closeSaveSlotsModal() {
    this.sound.playShoot();
    const modal = document.getElementById("modal-save-slots");
    if (modal) modal.classList.add("hidden");
  }

  renderSaveSlots() {
    const container = document.getElementById("save-slots-container");
    if (!container) return;
    container.innerHTML = "";

    for (let i = 1; i <= 3; i++) {
      let slotData = null;
      try {
        const raw = localStorage.getItem("harvest_frontier_save_slot_" + i);
        if (raw) slotData = JSON.parse(raw);
      } catch (e) {}

      const card = document.createElement("div");
      card.className = "save-slot-card" + (slotData ? " occupied" : "");

      if (!slotData) {
        card.innerHTML = `
          <div class="save-slot-header">
            <span class="save-slot-title">📁 ช่องเซฟ ${i} (SLOT ${i})</span>
            <span class="save-slot-badge">ว่าง (EMPTY)</span>
          </div>
          <div class="save-slot-body">
            <div class="save-slot-empty-content">
              <div class="save-slot-empty-icon">🌱</div>
              <div style="font-weight: bold; color: #94a3b8; font-size: 13px;">ช่องว่าง</div>
              <div style="font-size: 11px; margin-top: 4px;">ยังไม่มีข้อมูลการผจญภัย</div>
            </div>
          </div>
          <div class="save-slot-actions">
            <button class="btn-slot-start" data-slot="${i}">➕ เล่นเกมใหม่ (New Game)</button>
          </div>
        `;
      } else {
        const dateStr = slotData.updatedAt
          ? new Date(slotData.updatedAt).toLocaleString("th-TH", {
              dateStyle: "short",
              timeStyle: "short",
            })
          : "-";
        const heroName = (slotData.player && slotData.player.name) || "ผู้กล้า";
        const locationName = slotData.currentRoomName || "วิหารศักดิ์สิทธิ์";
        const score = slotData.totalScore || 0;

        card.innerHTML = `
          <div class="save-slot-header">
            <span class="save-slot-title">📁 ช่องเซฟ ${i} (SLOT ${i})</span>
            <span class="save-slot-badge">มีข้อมูล (ACTIVE)</span>
          </div>
          <div class="save-slot-body">
            <div class="save-slot-hero-name">👑 ${heroName}</div>
            <div class="save-slot-detail-row">
              <span>📍 สถานที่:</span>
              <span style="color: var(--mana-cyan); font-weight: bold;">${locationName}</span>
            </div>
            <div class="save-slot-detail-row">
              <span>⭐ คะแนน:</span>
              <span style="color: var(--gold-highlight); font-weight: bold;">${score} แต้ม</span>
            </div>
            <div class="save-slot-detail-row">
              <span>🕒 บันทึกล่าสุด:</span>
              <span style="color: #94a3b8;">${dateStr}</span>
            </div>
          </div>
          <div class="save-slot-actions">
            <button class="btn-slot-continue" data-slot="${i}">▶️ เล่นต่อ</button>
            <button class="btn-slot-delete" data-slot="${i}" title="ลบข้อมูลเซฟนี้">🗑️</button>
          </div>
        `;
      }

      container.appendChild(card);
    }

    // Attach click events
    container.querySelectorAll(".btn-slot-start").forEach((btn) => {
      btn.addEventListener("click", () => {
        const slotId = parseInt(btn.dataset.slot);
        this.startNewGameInSlot(slotId);
      });
    });

    container.querySelectorAll(".btn-slot-continue").forEach((btn) => {
      btn.addEventListener("click", () => {
        const slotId = parseInt(btn.dataset.slot);
        this.continueGameInSlot(slotId);
      });
    });

    container.querySelectorAll(".btn-slot-delete").forEach((btn) => {
      btn.addEventListener("click", () => {
        const slotId = parseInt(btn.dataset.slot);
        if (confirm(`คุณต้องการลบข้อมูลการผจญภัยใน "ช่องเซฟที่ ${slotId}" ใช่หรือไม่?`)) {
          this.deleteSaveSlot(slotId);
        }
      });
    });
  }

  startNewGameInSlot(slotId) {
    this.currentSaveSlot = slotId;
    this.closeSaveSlotsModal();

    // Randomize all NPCs across the world for this new save slot
    this.randomizeAllNpcAppearances();

    const menuOverlay = document.getElementById("main-menu-overlay");
    if (menuOverlay) menuOverlay.classList.add("hidden");

    const charModal = document.getElementById("modal-char-creation");
    if (charModal) charModal.classList.remove("hidden");

    this.tempName = "";
    this.namingStage = "TYPING";
    this.gridRow = 0;
    this.gridCol = 0;
    this.renderNamingKeyboard();
    this.gameState = "CHAR_NAMING";
  }

  continueGameInSlot(slotId) {
    this.currentSaveSlot = slotId;
    let slotData = null;
    try {
      const raw = localStorage.getItem("harvest_frontier_save_slot_" + slotId);
      if (raw) slotData = JSON.parse(raw);
    } catch (e) {}

    if (!slotData) {
      this.startNewGameInSlot(slotId);
      return;
    }

    // Restore NPC Appearances (or roll new if missing)
    this.randomizeAllNpcAppearances(slotData.npcAppearances);

    // Restore Player Profile & Customization
    if (slotData.player) {
      this.player.name = slotData.player.name || "ผู้กล้า";
      this.player.gender = slotData.player.gender || "farmer_m";
      if (slotData.player.custom) {
        this.player.custom = { ...this.player.custom, ...slotData.player.custom };
      }
    }
    this.totalScore = slotData.totalScore || 0;
    this.inventory = slotData.inventory || [];
    this.roomsDiscovered = slotData.roomsDiscovered || { holy_chapel: true };
    this.currentRoomId = slotData.currentRoomId || "holy_chapel";
    if (slotData.bossHp !== undefined) this.bossHp = slotData.bossHp;

    // Update HUD
    const hudName = document.getElementById("hud-player-name");
    if (hudName) hudName.innerText = this.player.name;

    this.closeSaveSlotsModal();

    const menuOverlay = document.getElementById("main-menu-overlay");
    if (menuOverlay) menuOverlay.classList.add("hidden");

    const hudTop = document.getElementById("hud-top");
      if (hudTop) hudTop.classList.remove("hidden");
      const hudBottom = document.getElementById("hud-bottom-right");
      if (hudBottom) hudBottom.classList.remove("hidden");

    this.sound.playCoin();
    this.sound.startBGM();
    this.gameState = "PLAYING";
    this.loadRoom(this.currentRoomId, 150);
    this.showNotification(
      `✨ ยินดีต้อนรับกลับ ผู้กล้า ${this.player.name}! (ช่องเซฟ ${slotId})`,
      "#00f5d4"
    );
  }

  /* ===== RANDOMIZE ALL NPC APPEARANCES ===== */
  randomizeAllNpcAppearances(savedAppearances = null) {
    // If we have saved NPC appearances for this save slot, load and preserve them!
    if (savedAppearances && Object.keys(savedAppearances).length > 0) {
      this.npcAppearances = { ...savedAppearances };
      // Sanitize: ensure only AT MOST 1 NPC wears a special costume in the entire game
      const costumeNpcIds = Object.keys(this.npcAppearances).filter(
        id => this.npcAppearances[id] && this.npcAppearances[id].costume && this.npcAppearances[id].costume !== "none"
      );
      if (costumeNpcIds.length > 1) {
        // Keep only 1 random costume NPC, revert the others to regular clothes
        const luckyId = costumeNpcIds[Math.floor(Math.random() * costumeNpcIds.length)];
        costumeNpcIds.forEach(id => {
          if (id !== luckyId) {
            this.npcAppearances[id].costume = "none";
          }
        });
      }
      this.applyNpcAppearances();
      return;
    }

    const hats = [
      "none", "straw", "bandana", "crown", "beret", "circlet",
      "witch", "knight", "king", "cowboy", "catears", "pirate", "glasses", "santa"
    ];
    const hairs = [
      "short", "long", "spiky", "ponytail", "bob", "bun",
      "twintail", "afro", "undercut", "wavy", "mohawk", "sidebraid",
      "hime", "buzz", "bald", "emo", "ultra", "odango", "slick", "messy"
    ];
    const hairColors = [
      "#e17055", "#2d3436", "#ffd166", "#ff4d6d", "#00f5d4", "#9d4edd",
      "#ff758f", "#52b788", "#f8f9fa", "#2563eb", "#d63031", "#e67e22",
      "#f1c40f", "#8e44ad", "#1abc9c", "#e84393", "#0984e3"
    ];
    const skinColors = [
      "#ffeaa7", "#ffdfba", "#e0a96d", "#b87333",
      "#6b4226", "#d0e1fd", "#86efac", "#fca5a5"
    ];
    const shirts = ["overalls", "plaid", "tunic", "armor", "vest"];
    const shirtColors = [
      "#2a5298", "#2d6a4f", "#d90429", "#6b21a8", "#e85d04",
      "#212529", "#f8f9fa", "#b5179e", "#4361ee", "#7209b7", "#3a0ca3", "#4cc9f0"
    ];
    const pants = ["jeans", "shorts", "cargo", "skirt"];
    const pantsColors = [
      "#1a252c", "#0f172a", "#8b5a2b", "#386641",
      "#e2e8f0", "#780000", "#2b2d42", "#4a4e69"
    ];
    // Exactly 7 special costumes in the game
    const costumes = ["banana", "kirito", "naruto", "luffy", "goku", "dino", "cyber"];

    // Collect all NPC IDs across all rooms
    const allNpcIds = [];
    for (const roomId in this.WORLD_MAP) {
      const room = this.WORLD_MAP[roomId];
      if (room && room.entities) {
        for (const ent of room.entities) {
          if (ent.type === "npc") {
            allNpcIds.push(ent.id);
          }
        }
      }
    }

    // Pick EXACTLY 1 random costume for EXACTLY 1 random NPC in the whole game!
    const shuffledNpcs = [...allNpcIds].sort(() => Math.random() - 0.5);
    const chosenCostume = costumes[Math.floor(Math.random() * costumes.length)];
    const luckyNpcId = shuffledNpcs.length > 0 ? shuffledNpcs[0] : null;

    this.npcAppearances = {};

    shuffledNpcs.forEach((npcId) => {
      if (npcId === luckyNpcId) {
        // Only this single lucky NPC gets the special costume in the entire game!
        this.npcAppearances[npcId] = {
          costume: chosenCostume,
          hat: "none",
          hairStyle: "short",
          hairColor: "#2d3436",
          skinColor: skinColors[Math.floor(Math.random() * skinColors.length)],
          shirt: "overalls",
          shirtColor: "#2a5298",
          pants: "jeans",
          pantsColor: "#1a252c"
        };
      } else {
        // All other NPCs wear regular randomized clothing
        this.npcAppearances[npcId] = {
          costume: "none",
          hat: hats[Math.floor(Math.random() * hats.length)],
          hairStyle: hairs[Math.floor(Math.random() * hairs.length)],
          hairColor: hairColors[Math.floor(Math.random() * hairColors.length)],
          skinColor: skinColors[Math.floor(Math.random() * skinColors.length)],
          shirt: shirts[Math.floor(Math.random() * shirts.length)],
          shirtColor: shirtColors[Math.floor(Math.random() * shirtColors.length)],
          pants: pants[Math.floor(Math.random() * pants.length)],
          pantsColor: pantsColors[Math.floor(Math.random() * pantsColors.length)]
        };
      }
    });

    this.applyNpcAppearances();
  }

  applyNpcAppearances() {
    if (!this.npcAppearances) return;
    for (const roomId in this.WORLD_MAP) {
      const room = this.WORLD_MAP[roomId];
      if (room && room.entities) {
        for (const ent of room.entities) {
          if (ent.type === "npc" && this.npcAppearances[ent.id]) {
            ent.custom = this.npcAppearances[ent.id];
          }
        }
      }
    }
  }

  saveCurrentSlot() {
    if (!this.currentSaveSlot) this.currentSaveSlot = 1;
    const room = this.WORLD_MAP[this.currentRoomId];
    const roomName = room ? `${room.name} (${room.nameTh})` : "วิหารศักดิ์สิทธิ์";

    const slotData = {
      slotId: this.currentSaveSlot,
      updatedAt: new Date().toISOString(),
      currentRoomId: this.currentRoomId,
      currentRoomName: roomName,
      totalScore: this.totalScore || 0,
      roomsDiscovered: this.roomsDiscovered,
      inventory: this.inventory || [],
      bossHp: this.bossHp,
      npcAppearances: this.npcAppearances || {},
      player: {
        name: this.player.name,
        gender: this.player.gender,
        custom: { ...this.player.custom }
      }
    };

    try {
      localStorage.setItem(
        "harvest_frontier_save_slot_" + this.currentSaveSlot,
        JSON.stringify(slotData)
      );
    } catch (e) {
      console.warn("Could not save slot", e);
    }
  }

  saveGameSlot(slotId = null) {
    if (slotId) this.currentSaveSlot = slotId;
    this.saveCurrentSlot();
  }

  deleteSaveSlot(slotId) {
    try {
      localStorage.removeItem("harvest_frontier_save_slot_" + slotId);
      if (this.currentSaveSlot === slotId) {
        this.npcAppearances = {};
      }
      this.sound.playWrong();
      this.renderSaveSlots();
      this.showNotification(`🗑️ ลบข้อมูลในช่องเซฟที่ ${slotId} เรียบร้อยแล้ว`, "#ff4d6d");
    } catch (e) {
      console.warn("Could not delete slot", e);
    }
  }

  returnToMainMenu() {
    this.saveCurrentSlot();
    this.sound.playShoot();
    this.gameState = "MAIN_MENU";

    // Hide all game overlays and modals
    const hudTop = document.getElementById("hud-top");
      if (hudTop) hudTop.classList.add("hidden");
      const hudBottom = document.getElementById("hud-bottom-right");
      if (hudBottom) hudBottom.classList.add("hidden");

    const charModal = document.getElementById("modal-char-creation");
    if (charModal) charModal.classList.add("hidden");

    const customOverlay = document.getElementById("customization-ui-overlay");
    if (customOverlay) {
      customOverlay.classList.add("hidden");
      customOverlay.style.opacity = "0";
    }

    const setModal = document.getElementById("modal-settings");
    if (setModal) setModal.classList.add("hidden");

    const saveModal = document.getElementById("modal-save-slots");
    if (saveModal) saveModal.classList.add("hidden");

    const codexModal = document.getElementById("modal-codex");
    if (codexModal) codexModal.classList.add("hidden");

    const dialogueBox = document.getElementById("dialogue-box");
    if (dialogueBox) dialogueBox.classList.add("hidden");

    // Show main menu overlay
    const menuOverlay = document.getElementById("main-menu-overlay");
    if (menuOverlay) menuOverlay.classList.remove("hidden");

    // Reset menu chase animation
    this.menuChase.heroX = 200;
    this.menuChase.demonX = 50;
    this.menuChase.direction = 1;
    this.menuChase.panicTimer = 0;
  }

  updateCustomizationScene() {
    const cs = this.customizeScene;
    if (!cs) return;
    cs.frameCount++;

    if (cs.stage === "WALK_IN") {
      if (cs.fadeAlpha > 0) cs.fadeAlpha -= 0.03;
      cs.heroX += 3.5;
      if (cs.heroX >= cs.targetX) {
        cs.heroX = cs.targetX;
        cs.stage = "CUSTOMIZING";
        this.sound.playCoin();
        const overlay = document.getElementById("customization-ui-overlay");
        if (overlay) {
          overlay.classList.remove("hidden");
          overlay.style.opacity = "1";
        }
      }
    }
  }

  drawCustomizationScene() {
    const ctx = this.ctx;
    const w = 960, h = 540;
    const cs = this.customizeScene;

    // Background
    const grad = ctx.createLinearGradient(0, 0, 0, h);
    grad.addColorStop(0, "#0a0818");
    grad.addColorStop(0.5, "#15102a");
    grad.addColorStop(1, "#23183d");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // Floor
    ctx.fillStyle = "#1e140d";
    ctx.fillRect(0, 390, w, 150);
    ctx.strokeStyle = "#382314";
    ctx.lineWidth = 2;
    for (let i = 0; i < 6; i++) {
      ctx.beginPath();
      ctx.moveTo(0, 405 + i * 22);
      ctx.lineTo(w, 405 + i * 22);
      ctx.stroke();
    }
    ctx.fillStyle = "#c9a100";
    ctx.fillRect(0, 388, w, 3);

    // Spotlight on Pedestal
    const spotX = cs.targetX + 16;
    const spotY = 388;
    const spotGrad = ctx.createRadialGradient(spotX, spotY, 10, spotX, spotY, 160);
    spotGrad.addColorStop(0, "rgba(255, 223, 109, 0.35)");
    spotGrad.addColorStop(0.5, "rgba(255, 223, 109, 0.15)");
    spotGrad.addColorStop(1, "rgba(255, 223, 109, 0)");
    ctx.fillStyle = spotGrad;
    ctx.beginPath();
    ctx.ellipse(spotX, spotY, 150, 45, 0, 0, Math.PI * 2);
    ctx.fill();

    // Pedestal rug
    ctx.fillStyle = "#780000";
    ctx.beginPath();
    ctx.ellipse(spotX, spotY, 70, 18, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#ffd166";
    ctx.lineWidth = 2;
    ctx.stroke();

    // Floating sparkle dust particles
    ctx.fillStyle = "rgba(255, 223, 109, 0.8)";
    for (let i = 0; i < 15; i++) {
      const px = spotX + Math.sin(cs.frameCount * 0.04 + i) * 60;
      const py = 260 + ((cs.frameCount * 0.8 + i * 25) % 130);
      const pSize = (Math.sin(cs.frameCount * 0.1 + i) + 1.5) * 1.5;
      ctx.fillRect(px, py, pSize, pSize);
    }

    // Hero Character
    const state = (cs.stage === "WALK_IN") ? "walk" : "idle";
    this.drawProceduralSprite(
      ctx,
      cs.heroX,
      cs.heroY,
      32,
      48,
      this.player.gender,
      state,
      cs.frameCount,
      cs.facingRight,
      true
    );

    // Hero name badge in dressing room
    if (cs.stage === "CUSTOMIZING") {
      ctx.save();
      const tagY = cs.heroY - 14;
      const nameStr = "👑 " + (this.player.name || "ผู้กล้า");
      ctx.font = "bold 13px 'Prompt', 'Kanit', 'Chakra Petch', sans-serif";
      const textWidth = ctx.measureText(nameStr).width;
      
      // Badge background box
      ctx.fillStyle = "rgba(10, 15, 28, 0.85)";
      ctx.fillRect(spotX - textWidth / 2 - 10, tagY - 14, textWidth + 20, 20);
      ctx.strokeStyle = "#ffd166";
      ctx.lineWidth = 1.5;
      ctx.strokeRect(spotX - textWidth / 2 - 10, tagY - 14, textWidth + 20, 20);

      // Badge text
      ctx.fillStyle = "#ffd166";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(nameStr, spotX, tagY - 3);
      ctx.restore();
    }

    // Fade overlay
    if (cs.fadeAlpha > 0) {
      ctx.fillStyle = `rgba(0, 0, 0, ${Math.max(0, cs.fadeAlpha)})`;
      ctx.fillRect(0, 0, w, h);
    }
  }

  finishCustomizationAndPlay() {
    this.sound.playCoin();
    const overlay = document.getElementById("customization-ui-overlay");
    if (overlay) overlay.classList.add("hidden");

    document.getElementById("hud-top").classList.remove("hidden");
    const hudBottom = document.getElementById("hud-bottom-right");
    if (hudBottom) hudBottom.classList.remove("hidden");
    this.gameState = "PLAYING";
    this.loadRoom("holy_chapel");

    // Auto save newly created character into selected slot
    this.saveCurrentSlot();

    const room = this.WORLD_MAP["holy_chapel"];
    if (room) {
      this.showNotification(`📍 เข้าสู่: ${room.name} - ${room.nameTh} (บันทึกช่องที่ ${this.currentSaveSlot})`, "#4facfe");
    }
  }

  /* ===== MAIN MENU: Start Game -> Show Save Slots ===== */
  startFromMenu() {
    this.openSaveSlotsModal();
  }

  /* ===== MAIN MENU: Update chase animation ===== */
  updateMenuChase() {
    const mc = this.menuChase;
    mc.frameCount++;

    // Move characters
    mc.heroX += mc.heroSpeed * mc.direction;
    mc.demonX += mc.demonSpeed * mc.direction;

    // Boundary check: reverse direction at edges
    if (mc.direction > 0 && mc.heroX > 860) {
      mc.direction = -1;
      mc.panicTimer = 20;
    } else if (mc.direction < 0 && mc.heroX < 60) {
      mc.direction = 1;
      mc.panicTimer = 20;
    }

    // Keep demon from overlapping hero too much
    const gap = Math.abs(mc.heroX - mc.demonX);
    if (gap < 80) {
      mc.demonSpeed = mc.heroSpeed * 0.7;
    } else if (gap > 200) {
      mc.demonSpeed = mc.heroSpeed * 1.1;
    } else {
      mc.demonSpeed = mc.heroSpeed * 0.85;
    }

    if (mc.panicTimer > 0) mc.panicTimer--;

    // Spawn dust particles
    if (this.settings && this.settings.particles && mc.frameCount % 4 === 0) {
      const heroTrailX = mc.direction > 0 ? mc.heroX - 5 : mc.heroX + 37;
      mc.dustParticles.push({
        x: heroTrailX, y: 408 + Math.random() * 10,
        vx: -mc.direction * (1.5 + Math.random()), vy: -Math.random() * 2,
        life: 20, color: "rgba(180,160,120,0.6)", size: 2 + Math.random() * 2
      });
      const demonTrailX = mc.direction > 0 ? mc.demonX - 10 : mc.demonX + 58;
      mc.dustParticles.push({
        x: demonTrailX, y: 410 + Math.random() * 10,
        vx: -mc.direction * (1 + Math.random()), vy: -Math.random() * 3,
        life: 25, color: "rgba(107,33,168,0.5)", size: 3 + Math.random() * 3
      });
    }

    // Update dust particles
    for (let i = mc.dustParticles.length - 1; i >= 0; i--) {
      const p = mc.dustParticles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.life--;
      if (p.life <= 0) mc.dustParticles.splice(i, 1);
    }
  }

  /* ===== MAIN MENU: Draw the chase scene ===== */
  drawMenuScene() {
    const ctx = this.ctx;
    const w = 960, h = 540;
    const mc = this.menuChase;

    // === BACKGROUND: Dark purple-blue gradient sky ===
    const skyGrad = ctx.createLinearGradient(0, 0, 0, h);
    skyGrad.addColorStop(0, "#050815");
    skyGrad.addColorStop(0.35, "#0d1030");
    skyGrad.addColorStop(0.65, "#1a0e3a");
    skyGrad.addColorStop(1, "#2d1550");
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, w, h);

    // === STARS ===
    for (const star of mc.stars) {
      const brightness = 0.3 + Math.sin(mc.frameCount * star.twinkleSpeed) * 0.4;
      ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0.1, brightness)})`;
      ctx.fillRect(star.x, star.y, star.size, star.size);
    }

    // === MOON (top-right) ===
    const moonGrad = ctx.createRadialGradient(800, 80, 5, 800, 80, 50);
    moonGrad.addColorStop(0, "rgba(255,255,240,0.9)");
    moonGrad.addColorStop(0.5, "rgba(200,180,255,0.4)");
    moonGrad.addColorStop(1, "rgba(200,180,255,0)");
    ctx.fillStyle = moonGrad;
    ctx.beginPath();
    ctx.arc(800, 80, 50, 0, Math.PI * 2);
    ctx.fill();

    // Moon inner
    ctx.fillStyle = "rgba(230,225,255,0.9)";
    ctx.beginPath();
    ctx.arc(800, 80, 28, 0, Math.PI * 2);
    ctx.fill();

    // === DISTANT MOUNTAINS / HILLS ===
    ctx.fillStyle = "#120a24";
    ctx.beginPath();
    ctx.moveTo(0, 380);
    ctx.lineTo(100, 300); ctx.lineTo(200, 340); ctx.lineTo(320, 280);
    ctx.lineTo(450, 320); ctx.lineTo(550, 270); ctx.lineTo(680, 310);
    ctx.lineTo(800, 260); ctx.lineTo(900, 300); ctx.lineTo(960, 340);
    ctx.lineTo(960, 420); ctx.lineTo(0, 420);
    ctx.fill();

    // Closer hills
    ctx.fillStyle = "#1a0e30";
    ctx.beginPath();
    ctx.moveTo(0, 400);
    ctx.lineTo(120, 360); ctx.lineTo(250, 380); ctx.lineTo(400, 350);
    ctx.lineTo(520, 370); ctx.lineTo(650, 340); ctx.lineTo(780, 365);
    ctx.lineTo(900, 350); ctx.lineTo(960, 370);
    ctx.lineTo(960, 420); ctx.lineTo(0, 420);
    ctx.fill();

    // === GROUND ===
    ctx.fillStyle = "#1c0f28";
    ctx.fillRect(0, 420, w, 120);
    // Ground top grass line
    ctx.fillStyle = "#2d6a4f";
    ctx.fillRect(0, 420, w, 6);
    // Dirt line
    ctx.fillStyle = "#3e2312";
    ctx.fillRect(0, 426, w, 4);

    // === GRASS TUFTS ===
    ctx.fillStyle = "#1e5e3a";
    for (let i = 0; i < 20; i++) {
      const gx = (i * 53 + 20) % w;
      ctx.fillRect(gx, 416, 4, 6);
      ctx.fillRect(gx + 8, 417, 3, 5);
    }

    // === DUST PARTICLES ===
    for (const p of mc.dustParticles) {
      const alpha = p.life / 25;
      ctx.fillStyle = p.color.replace(/[\d.]+\)$/, (alpha * 0.6) + ")");
      ctx.fillRect(p.x, p.y, p.size, p.size);
    }

    // === DRAW DEMON (behind if chasing to the right, otherwise in front) ===
    if (mc.direction > 0) {
      this.drawDemonSprite(ctx, mc.demonX, mc.demonY, 48, 72, "run", mc.frameCount, true);
      this.drawProceduralSprite(ctx, mc.heroX, mc.heroY, 32, 48, "farmer_m", "run", mc.frameCount, true, true);
    } else {
      this.drawProceduralSprite(ctx, mc.heroX, mc.heroY, 32, 48, "farmer_m", "run", mc.frameCount, false, true);
      this.drawDemonSprite(ctx, mc.demonX, mc.demonY, 48, 72, "run", mc.frameCount, false);
    }

    // === PANIC INDICATOR above hero ===
    if (mc.panicTimer > 0 || mc.frameCount % 80 < 40) {
      const exBob = Math.sin(mc.frameCount * 0.4) * 4;
      ctx.fillStyle = "#ff5555";
      ctx.font = "bold 16px 'Press Start 2P'";
      ctx.textAlign = "center";
      ctx.fillText("!", mc.heroX + 16, mc.heroY - 18 + exBob);
    }

    // === EVIL AURA around demon ===
    const auraAlpha = 0.15 + Math.sin(mc.frameCount * 0.08) * 0.1;
    const auraGrad = ctx.createRadialGradient(
      mc.demonX + 24, mc.demonY + 36, 10,
      mc.demonX + 24, mc.demonY + 36, 70
    );
    auraGrad.addColorStop(0, `rgba(107, 33, 168, ${auraAlpha})`);
    auraGrad.addColorStop(1, "rgba(107, 33, 168, 0)");
    ctx.fillStyle = auraGrad;
    ctx.beginPath();
    ctx.arc(mc.demonX + 24, mc.demonY + 36, 70, 0, Math.PI * 2);
    ctx.fill();

    // === DARK VIGNETTE overlay ===
    if (this.settings && this.settings.vignette) {
      const vGrad = ctx.createRadialGradient(480, 270, 200, 480, 270, 520);
      vGrad.addColorStop(0, "rgba(0,0,0,0)");
      vGrad.addColorStop(1, "rgba(0,0,0,0.5)");
      ctx.fillStyle = vGrad;
      ctx.fillRect(0, 0, w, h);
    }
  }

  /* ===== DEMON SPRITE: Procedural pixel-art boss ===== */
  drawDemonSprite(ctx, x, y, width, height, state, frameCount, facingRight) {
    ctx.save();
    ctx.translate(x + width / 2, y + height);
    if (!facingRight) ctx.scale(-1, 1);

    const bob = (state === "run") ? Math.abs(Math.sin(frameCount * 0.2)) * 5 : 0;
    const legSwing = (state === "run") ? Math.sin(frameCount * 0.2) * 7 : 0;

    // Shadow
    ctx.fillStyle = "rgba(60,0,80,0.5)";
    ctx.beginPath();
    ctx.ellipse(0, 0, 20, 6, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.translate(0, -bob);

    // === Cape (flowing behind) ===
    ctx.fillStyle = "#12002a";
    const capeWave = Math.sin(frameCount * 0.12) * 5;
    ctx.beginPath();
    ctx.moveTo(-12, -32);
    ctx.lineTo(-26 + capeWave, -8);
    ctx.lineTo(-22 + capeWave, 2);
    ctx.lineTo(-6, -8);
    ctx.closePath();
    ctx.fill();
    // Cape inner highlight
    ctx.fillStyle = "#2d0060";
    ctx.beginPath();
    ctx.moveTo(-10, -28);
    ctx.lineTo(-20 + capeWave, -8);
    ctx.lineTo(-16 + capeWave, -2);
    ctx.lineTo(-6, -12);
    ctx.closePath();
    ctx.fill();

    // === Legs ===
    ctx.fillStyle = "#1a0a2e";
    ctx.fillRect(-7 + legSwing, -12, 5, 12);
    ctx.fillStyle = "#2d1550";
    ctx.fillRect(3 - legSwing, -12, 5, 12);

    // === Heavy Boots ===
    ctx.fillStyle = "#0d0d0d";
    ctx.fillRect(-8 + legSwing, -3, 7, 3);
    ctx.fillRect(2 - legSwing, -3, 7, 3);
    // Boot spikes
    ctx.fillStyle = "#6b21a8";
    ctx.fillRect(-9 + legSwing, -5, 2, 3);
    ctx.fillRect(8 - legSwing, -5, 2, 3);

    // === Body / Heavy Armor ===
    ctx.fillStyle = "#2d1550";
    ctx.fillRect(-13, -36, 26, 24);
    // Armor border trim top
    ctx.fillStyle = "#6b21a8";
    ctx.fillRect(-13, -36, 26, 3);
    // Armor border trim bottom
    ctx.fillRect(-13, -15, 26, 3);
    // Center gem on chest
    ctx.fillStyle = "#c084fc";
    ctx.fillRect(-3, -28, 6, 6);
    ctx.fillStyle = "#e9d5ff";
    ctx.fillRect(-1, -26, 2, 2); // gem highlight

    // === Belt ===
    ctx.fillStyle = "#0d0d0d";
    ctx.fillRect(-13, -15, 26, 4);
    ctx.fillStyle = "#7c3aed";
    ctx.fillRect(-4, -15, 8, 4); // belt buckle

    // === Shoulder Pads (big, spiky) ===
    // Left shoulder
    ctx.fillStyle = "#3b0764";
    ctx.fillRect(-19, -38, 8, 10);
    ctx.fillStyle = "#6b21a8";
    ctx.fillRect(-19, -42, 4, 6); // left spike
    ctx.fillStyle = "#c084fc";
    ctx.fillRect(-19, -44, 3, 3); // spike tip glow
    // Right shoulder
    ctx.fillStyle = "#3b0764";
    ctx.fillRect(11, -38, 8, 10);
    ctx.fillStyle = "#6b21a8";
    ctx.fillRect(15, -42, 4, 6); // right spike
    ctx.fillStyle = "#c084fc";
    ctx.fillRect(16, -44, 3, 3); // spike tip glow

    // === Arms ===
    ctx.fillStyle = "#2d1550";
    ctx.fillRect(-19, -34, 6, 14);
    ctx.fillRect(13, -34, 6, 14);
    // Gauntlets
    ctx.fillStyle = "#0d0d0d";
    ctx.fillRect(-19, -22, 6, 5);
    ctx.fillRect(13, -22, 6, 5);
    // Gauntlet accent
    ctx.fillStyle = "#4c1d95";
    ctx.fillRect(-19, -22, 6, 2);
    ctx.fillRect(13, -22, 6, 2);

    // === Head ===
    ctx.fillStyle = "#3a1a5e";
    ctx.fillRect(-9, -52, 18, 16);

    // === Horned Helmet ===
    ctx.fillStyle = "#1a002e";
    ctx.fillRect(-11, -56, 22, 8);
    // Helmet visor slit
    ctx.fillStyle = "#0d001a";
    ctx.fillRect(-7, -52, 14, 3);

    // Left Horn
    ctx.fillStyle = "#4c1d95";
    ctx.fillRect(-15, -62, 4, 12);
    ctx.fillRect(-17, -66, 4, 6);
    ctx.fillStyle = "#7c3aed";
    ctx.fillRect(-17, -68, 3, 4);
    ctx.fillStyle = "#c084fc";
    ctx.fillRect(-17, -70, 3, 3); // horn tip glow

    // Right Horn
    ctx.fillStyle = "#4c1d95";
    ctx.fillRect(11, -62, 4, 12);
    ctx.fillRect(13, -66, 4, 6);
    ctx.fillStyle = "#7c3aed";
    ctx.fillRect(14, -68, 3, 4);
    ctx.fillStyle = "#c084fc";
    ctx.fillRect(14, -70, 3, 3); // horn tip glow

    // === Eyes (Glowing Red) ===
    ctx.fillStyle = "#ff0000";
    ctx.fillRect(-5, -48, 3, 3);
    ctx.fillRect(2, -48, 3, 3);
    // Eye glow aura
    ctx.fillStyle = "rgba(255, 0, 0, 0.25)";
    ctx.beginPath();
    ctx.arc(-3, -47, 6, 0, Math.PI * 2);
    ctx.arc(4, -47, 6, 0, Math.PI * 2);
    ctx.fill();
    // Eye white dots
    ctx.fillStyle = "#ff6666";
    ctx.fillRect(-4, -49, 1, 1);
    ctx.fillRect(3, -49, 1, 1);

    // === Mouth (Evil grin) ===
    ctx.fillStyle = "#660000";
    ctx.fillRect(-4, -42, 8, 2);
    ctx.fillStyle = "#ff3333";
    ctx.fillRect(-2, -42, 1, 2);
    ctx.fillRect(1, -42, 1, 2);

    ctx.restore();

    // === NAME TAG above demon ===
    ctx.fillStyle = "#c084fc";
    ctx.font = "bold 10px 'Prompt', 'Kanit', 'Chakra Petch', sans-serif";
    ctx.textAlign = "center";
    const tagBob = Math.sin(frameCount * 0.1) * 2;
    ctx.fillText("\ud83d\udc80 \u0e1b\u0e35\u0e28\u0e32\u0e08\u0e41\u0e2b\u0e48\u0e07\u0e04\u0e27\u0e32\u0e21\u0e44\u0e21\u0e48\u0e23\u0e39\u0e49", x + width / 2, y - 10 + tagBob);
  }

  handleInteraction() {
    for (let ent of this.entities) {
      const dist = Math.abs(
        this.player.x + this.player.width / 2 - (ent.x + ent.width / 2),
      );
      if (dist < 65) {
        if (ent.type === "portal") {
          if (ent.id === "portal_boss") {
            this.startBossBattle();
          } else if (ent.targetRoom) {
            this.sound.playCoin();
            this.loadRoom(ent.targetRoom, ent.spawnX);
          }
        } else if (ent.type === "altar") {
          this.openAltarTrial(ent);
        } else if (ent.type === "item") {
          this.sound.playCoin();
          this.inventory.push({ id: ent.id, name: ent.name, icon: ent.icon, desc: ent.desc });
          this.spawnParticles(ent.x + 14 - this.cameraX, ent.y + 14, "#00f5d4");
          this.showNotification(`✨ ได้รับไอเทม: ${ent.name} (${ent.desc || ""})!`, "#00f5d4");
          this.entities = this.entities.filter(e => e !== ent);
        } else if (ent.type === "minigame_nursery") {
          this.showKnowledgeCard({
            icon: "🌱",
            title: "ศาสตร์แห่งการเพาะเมล็ดพันธุ์และต้นกล้า",
            category: "การเพาะเมล็ดและเรือนเพาะชำ",
            facts: [
              "เมล็ดพันธุ์ต้องการ <b>ความชื้น (น้ำ)</b> เพื่อกระตุ้นเอนไซม์ภายในให้เริ่มกระบวนการงอก",
              "<b>อุณหภูมิ</b> ที่พอเหมาะ (25-30°C) ช่วยให้เซลล์เมล็ดแบ่งตัวเจริญเติบโตเร็ว ร้อนจัดหรือหนาวจัดเกินจะหยุดงอก",
              "ระยะต้นกล้า ต้องมี <b>แสงเพียงพอ</b> เพื่อป้องกัน Etiolation (ต้นกล้ายืดตัวผอมสูงอ่อนแอ)",
              "ระบบ <b>แอโรโปนิกส์ (Aeroponics)</b> เพาะกล้าโดยพ่นละอองสารอาหารตรงสู่ราก ทำให้ได้รับออกซิเจนสูงสุด"
            ],
            onStart: () => this.startNurseryLab()
          });
        } else if (ent.type === "minigame_soil") {
          this.showKnowledgeCard({
            icon: "🧪",
            title: "ศาสตร์แห่งการปรับปรุงดิน (Soil pH)",
            category: "การจัดการดินและปุ๋ย",
            facts: [
              "ค่า pH ที่เหมาะสมของดินสำหรับการเพาะปลูกพืชส่วนใหญ่อยู่ที่ <b>6.0 - 7.0</b>",
              "ดินที่มีค่า pH ต่ำกว่า 5.5 ถือเป็น <b>ดินกรด (ดินเปรี้ยว)</b> พืชจะดูดซึมธาตุอาหารไม่ได้และรากเน่า",
              "การแก้ดินกรดทำได้โดยการใส่ <b>ปูนขาว (Lime)</b> หรือ <b>โดโลไมท์</b> เพื่อปรับเพิ่มค่า pH ให้สมดุล",
              "หากดินเป็นด่างเกินไป สามารถใช้ <b>กำมะถันผง (Sulfur)</b> หรืออินทรียวัตถุเพื่อลดค่า pH ได้"
            ],
            onStart: () => this.startMixerLab()
          });
        } else if (ent.type === "minigame_season") {
          this.showKnowledgeCard({
            icon: "☀️",
            title: "การเลือกพืชทนแล้งตามฤดูกาล",
            category: "สภาพอากาศและการวางแผนเพาะปลูก",
            facts: [
              "ในฤดูร้อนและช่วงฝนทิ้งช่วง ดินจะสูญเสียความชื้นอย่างรวดเร็ว",
              "<b>ข้าวโพด</b> และ <b>มันสำปะหลัง</b> เป็นพืชทนแล้งที่มีระบบรากหยั่งลึก หาน้ำได้ดีในดินแห้ง",
              "พืชผักใบ เช่น ผักกาดหอม หรือผลไม้อย่างสตรอว์เบอร์รี ต้องการน้ำมากและสม่ำเสมอ ไม่เหมาะกับฤดูแล้งจัด",
              "การคลุมดินด้วยฟางข้าวช่วยรักษาความชื้นในดินช่วงหน้าแล้งได้ถึง 50%"
            ],
            onStart: () => this.startCropPlanting()
          });
        } else if (ent.type === "minigame_pest") {
          this.showKnowledgeCard({
            icon: "🐛",
            title: "ศาสตร์แห่งชีววิธีและการป้องกันศัตรูพืช",
            category: "การอารักขาพืชและสมุนไพร",
            facts: [
              "<b>ชีววิธี (Biological Control)</b> คือการใช้สิ่งมีชีวิตควบคุมศัตรูพืช เช่น ใช้ <b>แมลงเต่าทอง (ตัวห้ำ)</b> กินเพลี้ยอ่อน",
              "<b>สารสกัดสะเดา (Neem Extract)</b> มีสาร Azadirachtin ช่วยยับยั้งการเจริญเติบโตของหนอนและขับไล่แมลงอย่างปลอดภัย",
              "การใช้สารเคมีเข้มข้นจะทำลายแมลงตัวดี จุลินทรีย์ในดิน และก่อให้เกิดสารพิษตกค้าง",
              "การโรยเกลือทำลายโครงสร้างดิน ทำให้ดินเค็มและพืชเหี่ยวเฉาตาย"
            ],
            onStart: () => this.startBugDefender()
          });
        } else if (ent.type === "minigame_jigsaw") {
          this.showKnowledgeCard({
            icon: "🧩",
            title: "การวิเคราะห์และแก้ไขปัญหาทางการเกษตร",
            category: "การแก้ปัญหาแบบองค์รวม",
            facts: [
              "ปัญหาดินกรด -> แก้ด้วย ปูนขาว/โดโลไมท์",
              "ปัญหาเพลี้ยระบาด -> แก้ด้วย น้ำหมักสะเดาและตัวห้ำ",
              "ปัญหาหน้าแล้ง -> แก้ด้วย ระบบน้ำหยดและคลุมฟาง",
              "ปัญหาดินแน่นแข็ง -> แก้ด้วย ปลูกพืชตระกูลถั่วบำรุงดิน"
            ],
            onStart: () => this.startKnowledgeJigsaw()
          });
        } else if (ent.type === "minigame_sort") {
          this.showKnowledgeCard({
            icon: "🔀",
            title: "ขั้นตอนการเตรียมแปลงปลูกพืชที่ถูกต้อง",
            category: "ทักษะการปฏิบัติงานเกษตร",
            facts: [
              "ขั้นตอนที่ 1: ไถดะตากดิน 7-14 วัน เพื่อกำจัดวัชพืชและไข่แมลงศัตรูพืช",
              "ขั้นตอนที่ 2: ตรวจวัดค่า pH และความอุดมสมบูรณ์ของดิน",
              "ขั้นตอนที่ 3: ใส่อินทรียวัตถุ ปุ๋ยหมัก/ปุ๋ยคอก และปูนปรับสภาพดิน",
              "ขั้นตอนที่ 4: ยกร่องแปลงปลูกและคลุมแปลงเพื่อรักษาหน้าดิน"
            ],
            onStart: () => this.startSortItRight()
          });
        } else if (ent.type === "minigame_speed") {
          this.showKnowledgeCard({
            icon: "⚡",
            title: "Speed Quiz Blitz : ทดสอบความไวและความรู้!",
            category: "ทบทวนความรู้รอบตัว",
            facts: [
              "ตอบคำถามถูก-ผิดภายในเวลา 5 วินาทีต่อข้อ",
              "ทำคอมโบต่อเนื่องเพื่อรับคะแนนพิเศษ!",
              "ทดสอบสัญชาตญาณและความเข้าใจในการเกษตรยั่งยืน"
            ],
            onStart: () => this.startSpeedQuizBlitz()
          });
        } else {
          this.openDialogue(ent.name, ent.dialogue, ent.icon);
        }
        break;
      }
    }
  }

  /* ===== TOAST FEEDBACK SYSTEM ===== */
  showToastFeedback(message, type = "success") {
    let toast = document.getElementById("ingame-feedback-toast");
    if (!toast) {
      toast = document.createElement("div");
      toast.id = "ingame-feedback-toast";
      toast.className = "ingame-feedback-toast";
      document.body.appendChild(toast);
    }
    toast.className = `ingame-feedback-toast ${type}`;
    toast.innerText = message;
    toast.classList.remove("hidden");
    toast.style.opacity = "1";

    if (this.toastTimeout) clearTimeout(this.toastTimeout);
    this.toastTimeout = setTimeout(() => {
      toast.style.opacity = "0";
      setTimeout(() => toast.classList.add("hidden"), 300);
    }, 2800);
  }

  /* ===== KNOWLEDGE CARD SYSTEM ===== */
  showKnowledgeCard(opts) {
    this.gameState = "MINIGAME";
    this.knowledgeCardCallback = opts.onStart || null;

    const modal = document.getElementById("modal-knowledge-card");
    if (!modal) return;

    const iconEl = document.getElementById("kc-icon");
    if (iconEl) iconEl.innerText = opts.icon || "📖";

    const titleEl = document.getElementById("kc-title");
    if (titleEl) titleEl.innerText = opts.title || "ความรู้ใหม่!";

    const catEl = document.getElementById("kc-category");
    if (catEl) catEl.innerText = opts.category || "เกษตรกรรม";

    const bodyEl = document.getElementById("kc-body");
    if (bodyEl) {
      bodyEl.innerHTML = (opts.facts || [])
        .map((fact) => `<div class="kc-fact">${fact}</div>`)
        .join("");
    }

    modal.classList.remove("hidden");
    this.sound.playCoin();
  }

  /* ===== MINIGAME RESULT OVERLAY ===== */
  showMinigameResult(opts) {
    this.minigameResultCallback = opts.onContinue || null;
    const modal = document.getElementById("modal-minigame-result");
    if (!modal) return;

    const titleEl = document.getElementById("mr-title");
    if (titleEl) titleEl.innerText = opts.title || "🎉 สำเร็จ!";

    const subtitleEl = document.getElementById("mr-subtitle");
    if (subtitleEl) subtitleEl.innerText = opts.subtitle || "คุณผ่านมินิเกมแล้ว";

    const starsEl = document.getElementById("mr-stars");
    if (starsEl) {
      const starCount = opts.stars || 3;
      let starsHtml = "";
      for (let i = 1; i <= 3; i++) {
        if (i <= starCount) {
          starsHtml += `<span class="mr-star lit glow">⭐</span>`;
        } else {
          starsHtml += `<span class="mr-star dim">⭐</span>`;
        }
      }
      starsEl.innerHTML = starsHtml;
    }

    const knowEl = document.getElementById("mr-knowledge-text");
    if (knowEl) knowEl.innerText = opts.knowledgeText || "";

    modal.classList.remove("hidden");
    this.sound.playVictory();
  }

  /* ===== MINIGAME 0: NURSERY SEEDLING LAB (Simulator) ===== */
  startNurseryLab() {
    this.nurserySim = {
      active: true,
      timer: 30,
      growth: 0,
      moisture: 50,
      temp: 50,
      light: 50,
      loop: null,
      mistLoop: null
    };
    
    // Bind buttons
    const btnWater = document.getElementById("btn-nursery-water");
    const btnHeat = document.getElementById("btn-nursery-heat");
    const btnLight = document.getElementById("btn-nursery-light");
    
    // Clear old listeners if any
    if (btnWater) {
      const newBtnWater = btnWater.cloneNode(true);
      btnWater.parentNode.replaceChild(newBtnWater, btnWater);
      newBtnWater.addEventListener("click", () => {
        if(!this.nurserySim.active) return;
        this.nurserySim.moisture = Math.min(100, this.nurserySim.moisture + 15);
        this.sound.playCoin();
        this.updateNurserySimVisual();
      });
    }
    if (btnHeat) {
      const newBtnHeat = btnHeat.cloneNode(true);
      btnHeat.parentNode.replaceChild(newBtnHeat, btnHeat);
      newBtnHeat.addEventListener("click", () => {
        if(!this.nurserySim.active) return;
        this.nurserySim.temp = Math.min(100, this.nurserySim.temp + 15);
        this.sound.playCoin();
        this.updateNurserySimVisual();
      });
    }
    if (btnLight) {
      const newBtnLight = btnLight.cloneNode(true);
      btnLight.parentNode.replaceChild(newBtnLight, btnLight);
      newBtnLight.addEventListener("click", () => {
        if(!this.nurserySim.active) return;
        this.nurserySim.light = Math.min(100, this.nurserySim.light + 15);
        this.sound.playCoin();
        this.updateNurserySimVisual();
      });
    }

    // Clear old mist bubbles
    document.querySelectorAll(".mist-bubble").forEach(el => el.remove());

    const modal = document.getElementById("modal-minigame-nursery");
    if (modal) modal.classList.remove("hidden");

    this.updateNurserySimVisual();

    // Start loops
    this.nurserySim.loop = setInterval(() => this.nurserySimTick(), 1000);
    this.nurserySim.mistLoop = setInterval(() => this.spawnNurseryMist(), 2000);
  }

  nurserySimTick() {
    if (!this.nurserySim.active) return;

    this.nurserySim.timer--;
    
    // Decrease gauges naturally
    this.nurserySim.moisture = Math.max(0, this.nurserySim.moisture - 6);
    this.nurserySim.temp = Math.max(0, this.nurserySim.temp - 5);
    this.nurserySim.light = Math.max(0, this.nurserySim.light - 8);

    // Check if in optimal zone (30 to 70)
    const mOk = this.nurserySim.moisture >= 30 && this.nurserySim.moisture <= 70;
    const tOk = this.nurserySim.temp >= 30 && this.nurserySim.temp <= 70;
    const lOk = this.nurserySim.light >= 30 && this.nurserySim.light <= 70;

    const warningEl = document.getElementById("nursery-sim-warning");
    if (warningEl) {
      if (!lOk && this.nurserySim.light < 30) {
        warningEl.innerText = "⚠️ ระวัง: ขาดแสงทำให้ต้นกล้ายืดตัว (Etiolation)!";
        warningEl.classList.remove("hidden");
      } else if (!mOk) {
        warningEl.innerText = this.nurserySim.moisture < 30 ? "⚠️ ระวัง: ดินแห้ง เอนไซม์หยุดทำงาน!" : "⚠️ ระวัง: น้ำท่วมขัง รากเน่า!";
        warningEl.classList.remove("hidden");
      } else if (!tOk) {
        warningEl.innerText = this.nurserySim.temp < 30 ? "⚠️ ระวัง: อุณหภูมิต่ำ เซลล์ไม่แบ่งตัว!" : "⚠️ ระวัง: ร้อนเกินไป โปรตีนเสียสภาพ!";
        warningEl.classList.remove("hidden");
      } else {
        warningEl.classList.add("hidden");
      }
    }

    if (this.nurserySim.timer <= 0) {
      // Time up
      if (this.nurserySim.growth >= 100) {
        this.endNurserySim(true);
      } else {
        this.endNurserySim(false);
      }
    }

    this.updateNurserySimVisual();
  }

  spawnNurseryMist() {
    if (!this.nurserySim.active) return;
    const playArea = document.getElementById("nursery-play-area");
    if (!playArea) return;

    const mist = document.createElement("div");
    mist.className = "mist-bubble";
    mist.innerText = "🫧";
    mist.style.left = Math.floor(Math.random() * 80) + 10 + "%"; // 10% to 90%
    
    // Add hover event to catch
    mist.addEventListener("mouseenter", () => {
      if (!this.nurserySim.active) return;
      mist.remove();
      this.sound.playCoin();
      // Only grow if conditions are somewhat ok
      const mOk = this.nurserySim.moisture >= 30 && this.nurserySim.moisture <= 70;
      const tOk = this.nurserySim.temp >= 30 && this.nurserySim.temp <= 70;
      const lOk = this.nurserySim.light >= 30 && this.nurserySim.light <= 70;
      
      if (mOk && tOk && lOk) {
        this.nurserySim.growth = Math.min(100, this.nurserySim.growth + 10);
      } else {
        this.nurserySim.growth = Math.min(100, this.nurserySim.growth + 3);
      }
      this.updateNurserySimVisual();

      if (this.nurserySim.growth >= 100) {
        this.endNurserySim(true);
      }
    });

    playArea.appendChild(mist);
    
    // Remove after animation (3s)
    setTimeout(() => {
      if (mist.parentNode) mist.remove();
    }, 3000);
  }

  updateNurserySimVisual() {
    if(!this.nurserySim) return;
    const sim = this.nurserySim;
    
    const timerEl = document.getElementById("nursery-sim-timer");
    if(timerEl) timerEl.innerText = `⏳ ${sim.timer}s`;
    
    const growthEl = document.getElementById("nursery-sim-growth");
    if(growthEl) growthEl.style.width = `${sim.growth}%`;
    
    const setGauge = (id, val) => {
      const el = document.getElementById(id);
      if (el) {
        el.style.width = `${val}%`;
        el.style.backgroundColor = (val >= 30 && val <= 70) ? "#2ec4b6" : "#e71d36";
      }
    };
    
    setGauge("nursery-gauge-moisture", sim.moisture);
    setGauge("nursery-gauge-temp", sim.temp);
    setGauge("nursery-gauge-light", sim.light);

    const sprite = document.querySelector(".seedling-sprite");
    if (sprite) {
      if (sim.growth < 30) sprite.innerText = "🫘";
      else if (sim.growth < 70) sprite.innerText = "🌱";
      else sprite.innerText = "🪴";
    }
  }

  endNurserySim(win) {
    this.nurserySim.active = false;
    clearInterval(this.nurserySim.loop);
    clearInterval(this.nurserySim.mistLoop);

    document.getElementById("modal-minigame-nursery").classList.add("hidden");

    if (win) {
      this.showMinigameResult({
        title: "🎉 เพาะกล้าสำเร็จ!",
        subtitle: "เมล็ดพันธุ์งอกออกมาเป็นต้นกล้าแข็งแรงด้วย Aeroponics",
        stars: 3,
        knowledgeText: "เยี่ยมมาก! เจ้าสามารถรักษาสมดุลความชื้น อุณหภูมิ และแสงได้พอดี \n\nป้องกันปัญหา Etiolation (ต้นยืด) ได้สำเร็จ และการเก็บละอองหมอก (Aeroponics Mist) ช่วยให้รากได้รับสารอาหารพร้อมออกซิเจนอย่างเต็มที่!",
        onContinue: () => {
          document.getElementById("hud-quest-text").innerText = "สำรวจเกาะเรือนเพาะชำ ทดสอบที่แท่นพฤกษาเวหา";
          this.showToastFeedback("🌱 เพาะกล้าอัจฉริยะสำเร็จ!", "success");
          this.gameState = "PLAYING";
        }
      });
    } else {
      this.sound.playWrong();
      this.showToastFeedback("🥀 ต้นกล้าอ่อนแอเกินไป... หมดเวลาแล้ว ลองใหม่อีกครั้ง", "danger");
      this.gameState = "PLAYING";
    }
  }

  /* ===== MINIGAME 1: pH MIXER LAB ===== */
  startMixerLab() {
    this.mixerPh = 4.2;
    this.updateMixerLabVisual();
    const modal = document.getElementById("modal-minigame-soil");
    if (modal) modal.classList.remove("hidden");
  }

  updateMixerLabVisual() {
    const phValDisplay = document.getElementById("ph-val-display");
    const statusText = document.getElementById("soil-status-text");
    const liquid = document.getElementById("mixer-liquid");

    if (phValDisplay) phValDisplay.innerText = this.mixerPh.toFixed(1);

    const heightPct = Math.min(85, Math.max(25, 20 + (this.mixerPh - 3.0) * 10));
    if (liquid) liquid.style.height = `${heightPct}%`;

    if (this.mixerPh < 5.0) {
      if (statusText) statusText.innerText = "ดินเป็นกรดจัด! (พืชใบเหลือง รากเน่า)";
      if (phValDisplay) phValDisplay.style.color = "#ff5555";
      if (liquid) liquid.style.background = "linear-gradient(180deg, rgba(204,68,68,0.5), rgba(204,68,68,0.85))";
    } else if (this.mixerPh < 6.0) {
      if (statusText) statusText.innerText = "ดินกรดอ่อน (พืชโตช้า ขาดธาตุอาหาร)";
      if (phValDisplay) phValDisplay.style.color = "#ffdf6d";
      if (liquid) liquid.style.background = "linear-gradient(180deg, rgba(212,155,40,0.5), rgba(212,155,40,0.85))";
    } else if (this.mixerPh <= 7.0) {
      if (statusText) statusText.innerText = "ดินสมบูรณ์แบบ! (พืชเจริญเติบโตดีเยี่ยม)";
      if (phValDisplay) phValDisplay.style.color = "#2ec4b6";
      if (liquid) liquid.style.background = "linear-gradient(180deg, rgba(46,196,182,0.5), rgba(46,196,182,0.85))";
    } else if (this.mixerPh <= 8.0) {
      if (statusText) statusText.innerText = "ดินเริ่มเป็นด่าง (พืชดูดซึมธาตุเหล็กยาก)";
      if (phValDisplay) phValDisplay.style.color = "#5390d9";
      if (liquid) liquid.style.background = "linear-gradient(180deg, rgba(83,144,217,0.5), rgba(83,144,217,0.85))";
    } else {
      if (statusText) statusText.innerText = "ดินเป็นด่างจัด/เค็ม! (พืชเหี่ยวเฉา)";
      if (phValDisplay) phValDisplay.style.color = "#bbbbbb";
      if (liquid) liquid.style.background = "linear-gradient(180deg, rgba(136,136,136,0.5), rgba(136,136,136,0.85))";
    }
  }

  /* ===== MINIGAME 2: CROP PLANTING GRID ===== */
  startCropPlanting() {
    this.cropSlots = [null, null];
    this.selectedCropItem = null;
    document.querySelectorAll(".crop-item").forEach((ci) => ci.classList.remove("selected"));
    document.querySelectorAll(".crop-field-slot").forEach((slot) => {
      slot.classList.remove("planted");
      const idx = slot.dataset.slot;
      const iconEl = document.getElementById(`crop-slot-icon-${idx}`);
      if (iconEl) iconEl.innerText = "";
    });
    const modal = document.getElementById("modal-minigame-season");
    if (modal) modal.classList.remove("hidden");
  }

  /* ===== MINIGAME 3: BUG DEFENDER ===== */
  startBugDefender() {
    this.selectedPests = [];
    document.querySelectorAll(".bug-weapon-btn").forEach((btn) => btn.classList.remove("active"));
    const modal = document.getElementById("modal-minigame-pest");
    if (modal) modal.classList.remove("hidden");
  }

  /* ===== MINIGAME 4: KNOWLEDGE JIGSAW ===== */
  startKnowledgeJigsaw() {
    this.jigsawPairs = [
      { id: 1, prob: "ดินเป็นกรดจัด (pH < 5.0)", sol: "โรยปูนขาว/โดโลไมท์" },
      { id: 2, prob: "เพลี้ยแป้งระบาดหนัก", sol: "ใช้น้ำหมักสะเดา & แมลงช้างปีกใส" },
      { id: 3, prob: "ขาดแคลนน้ำช่วงหน้าแล้ง", sol: "ทำระบบน้ำหยด & คลุมฟางข้าว" },
      { id: 4, prob: "ดินแน่นแข็ง ขาดอินทรียวัตถุ", sol: "ปลูกพืชตระกูลถั่วบำรุงดิน" }
    ];
    this.jigsawSelectedProblem = null;
    this.jigsawMatched = 0;
    this.jigsawTimer = 30;

    const probContainer = document.getElementById("jigsaw-problems");
    const solContainer = document.getElementById("jigsaw-solutions");
    if (probContainer && solContainer) {
      probContainer.innerHTML = "";
      solContainer.innerHTML = "";

      const shuffledProbs = [...this.jigsawPairs].sort(() => Math.random() - 0.5);
      const shuffledSols = [...this.jigsawPairs].sort(() => Math.random() - 0.5);

      shuffledProbs.forEach((item) => {
        const div = document.createElement("div");
        div.className = "jigsaw-item prob-item";
        div.dataset.id = item.id;
        div.innerText = item.prob;
        div.addEventListener("click", () => this.handleJigsawProblemClick(div, item.id));
        probContainer.appendChild(div);
      });

      shuffledSols.forEach((item) => {
        const div = document.createElement("div");
        div.className = "jigsaw-item sol-item";
        div.dataset.id = item.id;
        div.innerText = item.sol;
        div.addEventListener("click", () => this.handleJigsawSolutionClick(div, item.id));
        solContainer.appendChild(div);
      });
    }

    const scoreEl = document.getElementById("jigsaw-score");
    if (scoreEl) scoreEl.innerText = "คะแนน: 0 / 4";

    const timerEl = document.getElementById("jigsaw-timer");
    if (timerEl) timerEl.innerText = "⏳ 30";

    const modal = document.getElementById("modal-minigame-jigsaw");
    if (modal) modal.classList.remove("hidden");

    if (this.jigsawInterval) clearInterval(this.jigsawInterval);
    this.jigsawInterval = setInterval(() => {
      this.jigsawTimer--;
      if (timerEl) timerEl.innerText = `⏳ ${this.jigsawTimer}`;
      if (this.jigsawTimer <= 0) {
        clearInterval(this.jigsawInterval);
        if (this.jigsawMatched < 4) {
          this.sound.playWrong();
          this.showToastFeedback("⏳ หมดเวลา! ลองใหม่อีกครั้ง", "danger");
          document.getElementById("modal-minigame-jigsaw").classList.add("hidden");
          this.gameState = "PLAYING";
        }
      }
    }, 1000);
  }

  handleJigsawProblemClick(el, id) {
    if (el.classList.contains("matched")) return;
    document.querySelectorAll(".prob-item").forEach((item) => item.classList.remove("selected"));
    el.classList.add("selected");
    this.jigsawSelectedProblem = id;
    this.sound.playCoin();
  }

  handleJigsawSolutionClick(el, id) {
    if (el.classList.contains("matched")) return;
    if (!this.jigsawSelectedProblem) {
      this.showToastFeedback("กรุณาเลือกปัญหาด้านซ้ายก่อน!", "danger");
      return;
    }

    if (this.jigsawSelectedProblem === id) {
      this.sound.playCorrect();
      const probEl = document.querySelector(`.prob-item[data-id="${id}"]`);
      if (probEl) {
        probEl.classList.remove("selected");
        probEl.classList.add("matched");
      }
      el.classList.add("matched");
      this.jigsawMatched++;
      this.jigsawSelectedProblem = null;

      const scoreEl = document.getElementById("jigsaw-score");
      if (scoreEl) scoreEl.innerText = `คะแนน: ${this.jigsawMatched} / 4`;

      if (this.jigsawMatched >= 4) {
        clearInterval(this.jigsawInterval);
        setTimeout(() => {
          document.getElementById("modal-minigame-jigsaw").classList.add("hidden");
          this.showMinigameResult({
            title: "🎉 จับคู่ปัญหาสำเร็จครบถ้วน!",
            subtitle: "คุณมีความเข้าใจหลักการเกษตรยั่งยืนยอดเยี่ยม",
            stars: 3,
            knowledgeText: "การจับคู่ปัญหาและวิธีแก้ไขที่ตรงจุด คือหัวใจสำคัญของการทำเกษตรอินทรีย์และการบริหารจัดการแปลงเพาะปลูกอย่างยั่งยืน!",
            onContinue: () => {
              this.showToastFeedback("✨ ผ่านมินิเกมจับคู่ปัญหาแล้ว!", "success");
              this.gameState = "PLAYING";
            }
          });
        }, 500);
      }
    } else {
      this.sound.playWrong();
      this.showToastFeedback("❌ ยังไม่ตรงกัน ลองใหม่อีกครั้ง!", "danger");
    }
  }

  /* ===== MINIGAME 5: SORT IT RIGHT ===== */
  startSortItRight() {
    this.sortSteps = [
      { id: 1, text: "1. ไถดะตากดิน 7-14 วัน เพื่อกำจัดเชื้อโรคและวัชพืช" },
      { id: 2, text: "2. ตรวจวัดค่า pH และความอุดมสมบูรณ์ของดิน" },
      { id: 3, text: "3. ใส่อินทรียวัตถุ ปุ๋ยคอก และปูนขาวปรับสภาพดิน" },
      { id: 4, text: "4. ยกร่องแปลงปลูกและคลุมแปลงรักษาหน้าดิน" }
    ];
    this.sortCurrentOrder = [3, 1, 4, 2]; // Shuffled initial order
    this.renderSortList();
    const modal = document.getElementById("modal-minigame-sort");
    if (modal) modal.classList.remove("hidden");
  }

  renderSortList() {
    const listEl = document.getElementById("sort-list");
    if (!listEl) return;
    listEl.innerHTML = "";

    this.sortCurrentOrder.forEach((stepId, index) => {
      const stepData = this.sortSteps.find((s) => s.id === stepId);
      const row = document.createElement("div");
      row.className = "sort-item-row";
      row.innerHTML = `
        <span class="sort-step-badge">ลำดับที่ ${index + 1}</span>
        <span class="sort-step-text">${stepData.text.replace(/^[0-9]\.\s*/, "")}</span>
        <div class="sort-step-controls">
          <button class="sort-btn-arrow" ${index === 0 ? "disabled" : ""} data-dir="up" data-idx="${index}">⬆️</button>
          <button class="sort-btn-arrow" ${index === this.sortCurrentOrder.length - 1 ? "disabled" : ""} data-dir="down" data-idx="${index}">⬇️</button>
        </div>
      `;

      row.querySelectorAll(".sort-btn-arrow").forEach((btn) => {
        btn.addEventListener("click", () => {
          const idx = parseInt(btn.dataset.idx);
          const dir = btn.dataset.dir;
          if (dir === "up" && idx > 0) {
            const temp = this.sortCurrentOrder[idx];
            this.sortCurrentOrder[idx] = this.sortCurrentOrder[idx - 1];
            this.sortCurrentOrder[idx - 1] = temp;
          } else if (dir === "down" && idx < this.sortCurrentOrder.length - 1) {
            const temp = this.sortCurrentOrder[idx];
            this.sortCurrentOrder[idx] = this.sortCurrentOrder[idx + 1];
            this.sortCurrentOrder[idx + 1] = temp;
          }
          this.sound.playCoin();
          this.renderSortList();
        });
      });

      listEl.appendChild(row);
    });
  }

  checkSortItRight() {
    const isCorrect = this.sortCurrentOrder.every((val, idx) => val === idx + 1);
    if (isCorrect) {
      this.sound.playCorrect();
      document.getElementById("modal-minigame-sort").classList.add("hidden");
      this.showMinigameResult({
        title: "🎉 เรียงลำดับขั้นตอนได้ถูกต้อง!",
        subtitle: "คุณมีความรู้ด้านการเตรียมดินระดับมืออาชีพ",
        stars: 3,
        knowledgeText: "การตากดิน -> วัด pH -> ใส่ปุ๋ย/ปูนขาว -> ยกร่องคลุมดิน เป็นขั้นตอนมาตรฐานที่จะช่วยให้พืชโตไวและไร้โรคระบาดรบกวน!",
        onContinue: () => {
          this.showToastFeedback("✨ สำเร็จ! แปลงพร้อมปลูกแล้ว", "success");
          this.gameState = "PLAYING";
        }
      });
    } else {
      this.sound.playWrong();
      this.showToastFeedback("❌ ลำดับยังไม่ถูกต้อง! ลองทบทวนขั้นตอนแล้วจัดใหม่", "danger");
    }
  }

  /* ===== MINIGAME 6: SPEED QUIZ BLITZ ===== */
  startSpeedQuizBlitz() {
    this.speedQuizQuestions = [
      { q: "ค่า pH 6.5 เหมาะสมกับการเจริญเติบโตของพืชส่วนใหญ่", ans: true },
      { q: "ควรฉีดพ่นสารเคมีเข้มข้นทุกวันเพื่อกำจัดแมลงให้สิ้นซาก", ans: false },
      { q: "พืชตระกูลถั่วมีปมรากที่ช่วยตรึงไนโตรเจนลงสู่ดินได้", ans: true },
      { q: "การเผาตอซังข้าวช่วยเพิ่มแร่ธาตุและอินทรียวัตถุให้ดินดีขึ้น", ans: false },
      { q: "การใช้แมลงเต่าทองกินเพลี้ยอ่อน จัดเป็นแนวทางชีววิธี", ans: true }
    ];
    this.speedQuizIdx = 0;
    this.speedCombo = 0;
    this.speedCorrect = 0;
    this.loadSpeedQuizQuestion();
    const modal = document.getElementById("modal-minigame-speed");
    if (modal) modal.classList.remove("hidden");
  }

  loadSpeedQuizQuestion() {
    if (this.speedQuizIdx >= this.speedQuizQuestions.length) {
      if (this.speedInterval) clearInterval(this.speedInterval);
      document.getElementById("modal-minigame-speed").classList.add("hidden");
      const stars = this.speedCorrect >= 4 ? 3 : 2;
      this.showMinigameResult({
        title: "🎉 จบ Speed Quiz Blitz!",
        subtitle: `คุณตอบถูก ${this.speedCorrect} จาก ${this.speedQuizQuestions.length} ข้อ (คอมโบสูงสุด: ${this.speedCombo})`,
        stars: stars,
        knowledgeText: "สัญชาตญาณและความรู้ที่แม่นยำจะช่วยให้ตัดสินใจดูแลแปลงเกษตรได้อย่างรวดเร็วและปลอดภัย!",
        onContinue: () => {
          this.showToastFeedback("⚡ พิชิต Speed Quiz Blitz เรียบร้อย!", "success");
          this.gameState = "PLAYING";
        }
      });
      return;
    }

    const curr = this.speedQuizQuestions[this.speedQuizIdx];
    const stmtEl = document.getElementById("speed-statement");
    if (stmtEl) stmtEl.innerText = `${this.speedQuizIdx + 1}. "${curr.q}"`;

    const comboEl = document.getElementById("speed-combo");
    if (comboEl) comboEl.innerText = `🔥 Combo: ${this.speedCombo}`;

    const progressEl = document.getElementById("speed-progress");
    if (progressEl) progressEl.innerText = `คำถาม ${this.speedQuizIdx + 1} / ${this.speedQuizQuestions.length}`;

    this.speedTimer = 5;
    const timerEl = document.getElementById("speed-timer");
    if (timerEl) timerEl.innerText = `⏳ ${this.speedTimer}s`;

    if (this.speedInterval) clearInterval(this.speedInterval);
    this.speedInterval = setInterval(() => {
      this.speedTimer--;
      if (timerEl) timerEl.innerText = `⏳ ${this.speedTimer}s`;
      if (this.speedTimer <= 0) {
        clearInterval(this.speedInterval);
        this.handleSpeedQuizAnswer(null); // Time out
      }
    }, 1000);
  }

  handleSpeedQuizAnswer(isTrue) {
    if (this.speedInterval) clearInterval(this.speedInterval);
    const curr = this.speedQuizQuestions[this.speedQuizIdx];

    if (isTrue === curr.ans) {
      this.sound.playCorrect();
      this.speedCombo++;
      this.speedCorrect++;
      this.showToastFeedback(`✅ ถูกต้อง! คอมโบ x${this.speedCombo}`, "success");
    } else {
      this.sound.playWrong();
      this.speedCombo = 0;
      this.showToastFeedback(isTrue === null ? "⏳ หมดเวลา!" : "❌ ผิด!", "danger");
    }

    this.speedQuizIdx++;
    setTimeout(() => {
      this.loadSpeedQuizQuestion();
    }, 600);
  }

  openDialogue(speaker, text, icon) {
    this.gameState = "DIALOGUE";
    this.dialogueLines = Array.isArray(text) ? text : [text];
    this.dialogueIndex = 0;
    
    document.getElementById("dialogue-portrait-icon").innerText = icon || "💬";
    document.getElementById("dialogue-speaker-name").innerText = speaker;
    document.getElementById("dialogue-text-stream").innerText = this.dialogueLines[this.dialogueIndex];
    document.getElementById("dialogue-box").classList.remove("hidden");
  }

  closeDialogue() {
    this.dialogueIndex++;
    if (this.dialogueIndex < this.dialogueLines.length) {
      document.getElementById("dialogue-text-stream").innerText = this.dialogueLines[this.dialogueIndex];
    } else {
      document.getElementById("dialogue-box").classList.add("hidden");
      this.gameState = "PLAYING";
    }
  }

  toggleCodex() {
    const m = document.getElementById("modal-codex");
    if (m) m.classList.toggle("hidden");
  }

  openAltarTrial(altar) {
    this.activeAltar = altar;
    const room = this.WORLD_MAP[this.currentRoomId] || {};
    const qData = MASTER_DATABASE.roomTrials[this.currentRoomId] || {
      title: altar.name,
      topic: room.subtitle || "บททดสอบปัญญาเกษตร",
      desc: `แท่นศักดิ์สิทธิ์ประจำ ${room.nameTh || "เกาะลอยฟ้า"} บันทึกภูมิปัญญาเกษตรกรรมอันล้ำค่าเอาไว้...`,
      questions: MASTER_DATABASE.bossQuestions.slice(0, 3)
    };

    const modal = document.getElementById("modal-altar-trial");
    if (modal) {
      document.getElementById("altar-trial-title").innerText = `🌱 ${altar.name}`;
      document.getElementById("altar-trial-icon").innerText = altar.icon || "🌱";
      document.getElementById("altar-trial-name").innerText = altar.name;
      document.getElementById("altar-trial-topic").innerText = `หัวข้อ: ${qData.topic}`;
      document.getElementById("altar-trial-desc").innerHTML = qData.desc;
      modal.classList.remove("hidden");
      this.sound.playCorrect();
    }
  }

  handleAltarRest() {
    const modal = document.getElementById("modal-altar-trial");
    if (modal) modal.classList.add("hidden");
    this.sound.playCorrect();
    this.spawnParticles(this.player.x + 16 - this.cameraX, this.player.y + 20, "#fee440");
    this.showToastFeedback(`🕯️ พักผ่อนที่ ${this.activeAltar?.name || "แท่นศักดิ์สิทธิ์"} - เซฟจุดเกิดเรียบร้อย!`, "success");
    this.saveCurrentSlot();
  }

  startAltarQuiz() {
    const modal = document.getElementById("modal-altar-trial");
    if (modal) modal.classList.add("hidden");

    const qData = MASTER_DATABASE.roomTrials[this.currentRoomId] || {
      title: this.activeAltar?.name || "แท่นศักดิ์สิทธิ์",
      topic: "บททดสอบปัญญาประจำเกาะ",
      questions: MASTER_DATABASE.bossQuestions.slice(0, 3)
    };

    this.gameState = "BOSS_QUIZ";
    this.currentQuestionIdx = 0;
    this.bossHp = 100;
    this.activeQuizQuestions = qData.questions;
    this.isBossBattleMode = false;
    this.currentQuizTopic = qData.topic;
    this.altarQuizScore = 0;

    document.getElementById("modal-boss-quiz").classList.remove("hidden");
    document.getElementById("boss-name-label").innerText = `บททดสอบปัญญา : ${qData.title}`;
    document.getElementById("boss-hp-fill").style.width = "100%";
    document.getElementById("boss-hp-ghost").style.width = "100%";
    this.loadQuestion();
  }

  startBossBattle() {
    this.gameState = "BOSS_QUIZ";
    this.currentQuestionIdx = 0;
    this.bossHp = 100;
    this.activeQuizQuestions = MASTER_DATABASE.bossQuestions;
    this.isBossBattleMode = true;
    this.bossCombo = 0;

    document.getElementById("modal-boss-quiz").classList.remove("hidden");
    document.getElementById("boss-name-label").innerText =
      "ร่างจำแลง : ปีศาจปฐพีแปรปรวน (Disrupted Soil Demon)";
    document.getElementById("boss-hp-fill").style.width = "100%";
    document.getElementById("boss-hp-ghost").style.width = "100%";
    this.loadQuestion();
  }

  loadQuestion() {
    const questions = this.activeQuizQuestions || MASTER_DATABASE.bossQuestions;
    const q = questions[this.currentQuestionIdx];
    if (!q) {
      this.finishQuizSession();
      return;
    }
    document.getElementById("quiz-question-index").innerText =
      `ข้อที่ ${this.currentQuestionIdx + 1} / ${questions.length}`;
    document.getElementById("quiz-question-text").innerText = q.q;
    document.getElementById("quiz-feedback-box").classList.add("hidden");

    const buttons = document.querySelectorAll(".choice-btn");
    buttons.forEach((btn, idx) => {
      btn.className = "choice-btn";
      btn.querySelector(".choice-label").innerText = q.options[idx] || "";
      btn.disabled = false;
    });

    this.quizTimer = 20;
    document.getElementById("quiz-timer-counter").innerText =
      `⏳ ${this.quizTimer} วินาที`;
    clearInterval(this.quizInterval);
    this.quizInterval = setInterval(() => {
      this.quizTimer--;
      document.getElementById("quiz-timer-counter").innerText =
        `⏳ ${this.quizTimer} วินาที`;
      if (this.quizTimer <= 0) {
        clearInterval(this.quizInterval);
        this.submitAnswer(-1);
      }
    }, 1000);
  }

  submitAnswer(choiceIdx) {
    clearInterval(this.quizInterval);
    const questions = this.activeQuizQuestions || MASTER_DATABASE.bossQuestions;
    const q = questions[this.currentQuestionIdx];
    if (!q) return;
    const buttons = document.querySelectorAll(".choice-btn");
    buttons.forEach((btn) => (btn.disabled = true));

    const fb = document.getElementById("quiz-feedback-box");
    const exp = document.getElementById("feedback-explanation");
    fb.classList.remove("hidden");

    if (choiceIdx === q.correct) {
      this.sound.playCorrect();
      this.bossCombo++;
      if (this.isBossBattleMode) this.totalScore += this.bossCombo;
      else this.altarQuizScore = (this.altarQuizScore || 0) + 1;

      const comboBonus = this.bossCombo > 1 ? ` (🔥 Combo x${this.bossCombo}!)` : "";
      if (buttons[choiceIdx]) buttons[choiceIdx].classList.add("correct-glow");
      fb.style.borderColor = "var(--hp-green)";
      exp.innerHTML = `<b style="color:var(--hp-green)">ถูกต้อง!${comboBonus}</b> ${q.exp}`;
      
      const dmg = (100 / questions.length) * (1 + (this.bossCombo - 1) * 0.2);
      this.bossHp = Math.max(0, this.bossHp - dmg);
      document.getElementById("boss-hp-fill").style.width = `${this.bossHp}%`;
      setTimeout(() => {
        document.getElementById("boss-hp-ghost").style.width =
          `${this.bossHp}%`;
      }, 200);
      this.spawnParticles(500, 200, "#2ec4b6");
      this.showToastFeedback(this.isBossBattleMode ? `💥 โจมตีบอสสำเร็จ! ${comboBonus}` : `✨ ถูกต้อง! ได้รับคะแนนปัญญา`, "success");
    } else {
      this.sound.playWrong();
      this.bossCombo = 0;
      if (buttons[choiceIdx]) buttons[choiceIdx].classList.add("wrong-glow");
      if (buttons[q.correct]) buttons[q.correct].classList.add("correct-glow");
      fb.style.borderColor = "var(--danger-crimson)";
      exp.innerHTML = `<b style="color:var(--danger-crimson)">ยังไม่ถูกต้อง!</b> ${q.exp}`;
      this.spawnParticles(500, 200, "#e71d36");
      this.showToastFeedback("⚠️ ตอบผิด! ดูคำอธิบายความรู้ด้านล่าง", "danger");
    }

    setTimeout(() => {
      this.currentQuestionIdx++;
      if (this.currentQuestionIdx < questions.length) {
        this.loadQuestion();
      } else {
        this.finishQuizSession();
      }
    }, 2200);
  }

  finishQuizSession() {
    document.getElementById("modal-boss-quiz").classList.add("hidden");
    if (this.isBossBattleMode) {
      this.showEndCredits();
    } else {
      const score = this.altarQuizScore || 0;
      const total = this.activeQuizQuestions ? this.activeQuizQuestions.length : 3;
      const stars = score === total ? 3 : (score >= 2 ? 2 : 1);
      this.sound.playVictory();
      this.showMinigameResult({
        title: score >= 2 ? "🎉 ผ่านบททดสอบปัญญาประจำเกาะ!" : "🌱 พยายามได้ดี!",
        subtitle: `คุณทำคะแนนได้ ${score} / ${total} ข้อ สำหรับ ${this.WORLD_MAP[this.currentRoomId]?.nameTh || "เกาะลอยฟ้า"}`,
        stars: stars,
        knowledgeText: `หัวข้อ: ${this.currentQuizTopic || "เกษตรกรรมยั่งยืน"} — คุณสามารถเปิด 'มหาบันทึกปัญญา (กด B)' เพื่อทบทวนความรู้ได้ตลอดเวลา!`,
        onContinue: () => {
          this.showToastFeedback("⭐ บันทึกความรู้ลงมหาบันทึกปัญญาแล้ว!", "success");
          this.gameState = "PLAYING";
        }
      });
    }
  }

  showEndCredits() {
    this.gameState = "CREDITS";
    const creditsOverlay = document.getElementById("end-credits-overlay");
    if (creditsOverlay) {
      creditsOverlay.classList.remove("hidden");
    }
    
    // Save completion & final score to database
    fetch("/api/scores", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        score: this.totalScore || 35,
        island_completed: 1,
        island_id: 1
      })
    }).then(res => res.json()).then(data => {
      document.getElementById("credits-saving-text").innerText = "บันทึกข้อมูลการผจญภัยลงฐานข้อมูลเรียบร้อยแล้ว!";
      document.getElementById("btn-return-home").classList.remove("hidden");
    }).catch(err => {
      console.error("Failed to record endgame score:", err);
      document.getElementById("credits-saving-text").innerText = "เกิดข้อผิดพลาดในการบันทึกคะแนน";
      document.getElementById("credits-saving-text").style.color = "#ef4444";
      document.getElementById("btn-return-home").classList.remove("hidden");
    });
  }

  spawnParticles(x, y, color) {
    if (this.settings && !this.settings.particles) return;
    for (let i = 0; i < 20; i++) {
      this.particles.push({
        x: x,
        y: y,
        vx: (Math.random() - 0.5) * 8,
        vy: (Math.random() - 0.5) * 8,
        life: 30,
        color: color,
      });
    }
  }

  update() {
    this.mapAnimTimer = (this.mapAnimTimer || 0) + 0.05;
    if (this.notificationTimer > 0) {
      this.notificationTimer--;
      if (this.notificationTimer <= 0) this.notification = null;
    }

    for (let i = this.particles.length - 1; i >= 0; i--) {
      let p = this.particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.life--;
      if (p.life <= 0) this.particles.splice(i, 1);
    }

    if (this.gameState === "MAIN_MENU") {
      this.updateMenuChase();
      return;
    }

    if (this.gameState === "CHAR_CUSTOMIZE") {
      this.updateCustomizationScene();
      return;
    }

    if (this.gameState !== "PLAYING") return;

    this.updateMovement(); // call the new movement & AI logic
    this.player.vx = this.player.dx; // map dx to vx for the physics engine

    if (
      (this.keys["Space"] || this.keys["ArrowUp"] || this.keys["KeyW"]) &&
      this.player.isGrounded
    ) {
      this.player.vy = this.player.jumpPower * -1;
      this.player.isGrounded = false;
      this.sound.playJump();
    }

    this.player.vy += this.gravity;
    this.player.x += this.player.vx;
    this.player.y += this.player.vy;

    if (this.player.y + this.player.height >= this.groundY) {
      this.player.y = this.groundY - this.player.height;
      this.player.vy = 0;
      this.player.isGrounded = true;
    }

    if (this.player.x < 0) this.player.x = 0;
    if (this.player.x > this.worldWidth - this.player.width)
      this.player.x = this.worldWidth - this.player.width;

    this.cameraX = this.player.x - 480; // 960/2 = 480 (centered)
    if (this.cameraX < 0) this.cameraX = 0;
    if (this.cameraX > this.worldWidth - 960)
      this.cameraX = this.worldWidth - 960;
  }


  updateFloatingTags() {
    const container = document.getElementById("floating-tags-container");
    if (!container) return;

    if (this.gameState !== "PLAYING") {
      if (container.innerHTML !== "") container.innerHTML = "";
      return;
    }

    let html = "";

    // 1. Hero floating nametag
    const prx = this.player.x - this.cameraX;
    const heroScreenX = ((prx + this.player.width / 2) / 960) * 100;
    const heroScreenY = ((this.player.y - 6) / 540) * 100;
    html += `<div class="floating-nametag tag-hero" style="left:${heroScreenX.toFixed(2)}%;top:${heroScreenY.toFixed(2)}%;">👑 ${this.player.name || "ผู้กล้า"}</div>`;

    // 2. Entities floating nametags
    for (let ent of this.entities) {
      const rx = ent.x - this.cameraX;
      if (rx < -80 || rx > 1040) continue;

      const screenX = ((rx + ent.width / 2) / 960) * 100;

      if (ent.type === "npc") {
        const screenY = ((ent.y - 8) / 540) * 100;
        html += `<div class="floating-nametag tag-npc" style="left:${screenX.toFixed(2)}%;top:${screenY.toFixed(2)}%;">${ent.name}</div>`;
      } else if (ent.type === "altar") {
        const screenY = ((ent.y + 6) / 540) * 100;
        html += `<div class="floating-nametag tag-altar" style="left:${screenX.toFixed(2)}%;top:${screenY.toFixed(2)}%;">${ent.icon || "🌱"} ${ent.name}</div>`;
      } else if (ent.type === "item") {
        const itemBob = Math.sin((this.player.frameCount || 0) * 0.1) * 4;
        const screenY = ((ent.y - 6 + itemBob) / 540) * 100;
        html += `<div class="floating-nametag tag-item" style="left:${screenX.toFixed(2)}%;top:${screenY.toFixed(2)}%;">${ent.icon || "📦"} ${ent.name}</div>`;
      } else if (ent.type === "portal") {
        const isBoss = (ent.id === "portal_boss");
        const screenY = ((ent.y - 8) / 540) * 100;
        html += `<div class="floating-nametag ${isBoss ? 'tag-boss-portal' : 'tag-portal'}" style="left:${screenX.toFixed(2)}%;top:${screenY.toFixed(2)}%;">${ent.name}</div>`;
      } else if (ent.type.startsWith("minigame")) {
        const screenY = ((ent.y - 6) / 540) * 100;
        html += `<div class="floating-nametag tag-minigame" style="left:${screenX.toFixed(2)}%;top:${screenY.toFixed(2)}%;">${ent.icon || "🌱"} ${ent.name}</div>`;
      }

      // Interaction prompt [E]
      const dist = Math.abs((this.player.x + this.player.width / 2) - (ent.x + ent.width / 2));
      if (dist < 65) {
        const promptY = ((ent.y - 28) / 540) * 100;
        html += `<div class="floating-nametag tag-prompt" style="left:${screenX.toFixed(2)}%;top:${promptY.toFixed(2)}%;">💬 กด [E]</div>`;
      }
    }

    container.innerHTML = html;
  }

  draw() {
    this.ctx.clearRect(0, 0, 960, 540);
    this.updateFloatingTags();

    if (this.gameState === "MAIN_MENU") {
      this.drawMenuScene();
      return;
    }

    if (this.gameState === "CHAR_CUSTOMIZE") {
      this.drawCustomizationScene();
      return;
    }

    const room = this.WORLD_MAP[this.currentRoomId] || {};
    const theme = room.theme || "sanctum";

    // Dynamic Thematic Background
    this.drawThematicBackground(theme);

    // Ground Floor
    this.drawThematicGround(theme);

    // Entities (NPCs, Altars, Items, Portals, Minigames)
    this.drawEntities();

    // Player
    const prx = this.player.x - this.cameraX;
    this.drawProceduralSprite(
      this.ctx, prx, this.player.y, this.player.width, this.player.height, 
      this.player.gender || "farmer_m", this.player.state || 'idle', 
      this.player.frameCount || 0, this.player.facingRight !== false,
      true // isHero
    );

    // Particles
    for (let p of this.particles) {
      this.ctx.fillStyle = p.color;
      this.ctx.fillRect(p.x, p.y, 4, 4);
    }

    // On-screen notification banner
    this.drawNotificationBanner();
  }

  drawFloatingIsland(ctx, x, y, width, height, opts = {}) {
    ctx.save();
    
    // Hanging roots and underside crags of distant floating island
    ctx.fillStyle = opts.stoneColor || "#4a3525";
    ctx.beginPath();
    ctx.moveTo(x, y + 8);
    ctx.lineTo(x + width, y + 8);
    ctx.lineTo(x + width * 0.88, y + height * 0.6);
    ctx.lineTo(x + width * 0.55, y + height);
    ctx.lineTo(x + width * 0.42, y + height * 0.85);
    ctx.lineTo(x + width * 0.22, y + height * 0.95);
    ctx.lineTo(x + width * 0.06, y + height * 0.5);
    ctx.closePath();
    ctx.fill();

    // Dark rock underside shadow
    ctx.fillStyle = opts.darkStoneColor || "#312217";
    ctx.beginPath();
    ctx.moveTo(x + width * 0.42, y + 8);
    ctx.lineTo(x + width * 0.72, y + 8);
    ctx.lineTo(x + width * 0.55, y + height);
    ctx.closePath();
    ctx.fill();

    // Dangling Root Vines
    ctx.strokeStyle = opts.vineColor || "#2d6a4f";
    ctx.lineWidth = 1.5;
    const vCount = opts.vineCount || 3;
    for (let v = 0; v < vCount; v++) {
      const vx = x + width * (0.2 + v * (0.6 / vCount));
      const vh = height + 6 + (v % 2) * 10;
      ctx.beginPath();
      ctx.moveTo(vx, y + height * 0.4);
      ctx.quadraticCurveTo(vx + Math.sin(v * 2) * 4, y + height * 0.75, vx, y + vh);
      ctx.stroke();
    }

    // Sky Waterfall cascading off the floating island into the clouds
    if (opts.hasWaterfall) {
      ctx.fillStyle = "rgba(144, 224, 239, 0.85)";
      ctx.fillRect(x + width * 0.18, y + 4, 8, height + 35);
      ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
      ctx.fillRect(x + width * 0.18 + 1, y + height + 30, 6, 4);
    }

    // Island Top Soil & Turf
    ctx.fillStyle = opts.soilColor || "#5a3a22";
    ctx.fillRect(x, y + 2, width, 8);
    ctx.fillStyle = opts.grassColor || "#52b788";
    ctx.fillRect(x - 2, y - 2, width + 4, 6);

    // Island Features (Windmill, Tree, Greenhouse)
    const frame = this.player ? (this.player.frameCount || 0) : 0;
    if (opts.feature === "windmill") {
      const mx = x + width * 0.5;
      ctx.fillStyle = "#8a5a36";
      ctx.fillRect(mx - 5, y - 24, 10, 24);
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 1.5;
      const sailAng = frame * 0.04;
      for (let s = 0; s < 4; s++) {
        const a = sailAng + s * Math.PI / 2;
        ctx.beginPath();
        ctx.moveTo(mx, y - 20);
        ctx.lineTo(mx + Math.cos(a) * 16, y - 20 + Math.sin(a) * 16);
        ctx.stroke();
      }
    } else if (opts.feature === "tree") {
      const tx = x + width * 0.45;
      ctx.fillStyle = "#5c4033";
      ctx.fillRect(tx - 3, y - 16, 6, 16);
      ctx.fillStyle = opts.foliageColor || "#2d6a4f";
      ctx.beginPath();
      ctx.arc(tx, y - 20, 12, 0, Math.PI * 2);
      ctx.fill();
      if (opts.hasFruit) {
        ctx.fillStyle = "#e63946";
        ctx.beginPath();
        ctx.arc(tx - 3, y - 22, 2.5, 0, Math.PI * 2);
        ctx.arc(tx + 4, y - 18, 2.5, 0, Math.PI * 2);
        ctx.fill();
      }
    } else if (opts.feature === "greenhouse") {
      const gx = x + width * 0.3;
      ctx.fillStyle = "rgba(216, 243, 220, 0.65)";
      ctx.strokeStyle = "#40916c";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(gx + 14, y, 14, Math.PI, 0);
      ctx.fill();
      ctx.stroke();
    }

    ctx.restore();
  }

  drawThematicBackground(theme) {
    const ctx = this.ctx;
    const w = 960;
    const h = 540;
    const gy = this.groundY; // 440 (exact anchor for ground continuity)
    const frame = this.player ? (this.player.frameCount || 0) : 0;

    if (theme === "sanctum") {
      // 1. Sky Nursery Island (เกาะเรือนเพาะชำลอยฟ้า)
      const skyGrad = ctx.createLinearGradient(0, 0, 0, gy);
      skyGrad.addColorStop(0, "#70c1b3");
      skyGrad.addColorStop(0.5, "#d8f3dc");
      skyGrad.addColorStop(1, "#b7e4c7");
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, w, h);

      // Distant Floating Sky Pods (Upper sky)
      this.drawFloatingIsland(ctx, 80 - (this.cameraX * 0.05) % 400, 120, 120, 40, { feature: "greenhouse", grassColor: "#70e000" });
      this.drawFloatingIsland(ctx, 420 - (this.cameraX * 0.05) % 500, 140, 140, 50, { feature: "tree", hasFruit: true });
      this.drawFloatingIsland(ctx, 760 - (this.cameraX * 0.05) % 600, 110, 110, 38, { feature: "greenhouse" });

      // Greenhouse Grand Glass Arches (Seamlessly anchored from top down to groundY)
      ctx.strokeStyle = "rgba(45, 106, 79, 0.35)";
      ctx.lineWidth = 4;
      for (let i = 0; i < 7; i++) {
        const gx = i * 200 - (this.cameraX * 0.15) % 200;
        ctx.beginPath();
        ctx.moveTo(gx, gy);
        ctx.lineTo(gx, 100);
        ctx.quadraticCurveTo(gx + 100, 20, gx + 200, 100);
        ctx.lineTo(gx + 200, gy);
        ctx.stroke();
      }

      // Sunbeams streaming from ceiling down into the soil
      const sunbeam = ctx.createLinearGradient(120, 0, 350, gy);
      sunbeam.addColorStop(0, "rgba(255, 255, 200, 0.3)");
      sunbeam.addColorStop(1, "rgba(255, 255, 200, 0.02)");
      ctx.fillStyle = sunbeam;
      ctx.beginPath();
      ctx.moveTo(100, 0); ctx.lineTo(260, 0); ctx.lineTo(480, gy); ctx.lineTo(220, gy);
      ctx.fill();

      // Nursery Planter Benches along the back horizon (Anchored directly to groundY)
      for (let i = 0; i < 6; i++) {
        const px = i * 220 + 30 - (this.cameraX * 0.25) % 220;
        ctx.fillStyle = "#6c584c";
        ctx.fillRect(px, gy - 26, 120, 26);
        ctx.fillStyle = "#52b788";
        for (let s = 0; s < 5; s++) {
          ctx.beginPath();
          ctx.arc(px + 15 + s * 22, gy - 28, 8, 0, Math.PI * 2);
          ctx.fill();
        }
      }

    } else if (theme === "ruins") {
      // 2. Restored Farmland Island (เกาะทุ่งกสิกรรมฟื้นฟูดิน)
      const skyGrad = ctx.createLinearGradient(0, 0, 0, gy);
      skyGrad.addColorStop(0, "#48cae4");
      skyGrad.addColorStop(0.6, "#caf0f8");
      skyGrad.addColorStop(1, "#b7e4c7");
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, w, h);

      // Drifting clouds in upper sky
      ctx.fillStyle = "rgba(255, 255, 255, 0.85)";
      for (let i = 0; i < 4; i++) {
        const cx = i * 320 - (this.cameraX * 0.05 + frame * 0.1) % 320;
        ctx.beginPath();
        ctx.arc(cx + 60, 60, 28, 0, Math.PI * 2);
        ctx.arc(cx + 90, 50, 36, 0, Math.PI * 2);
        ctx.arc(cx + 120, 60, 28, 0, Math.PI * 2);
        ctx.fill();
      }

      // Distant Floating Sky Islands (Upper-mid sky)
      this.drawFloatingIsland(ctx, 100 - (this.cameraX * 0.08) % 500, 130, 160, 50, { feature: "windmill", hasWaterfall: true });
      this.drawFloatingIsland(ctx, 500 - (this.cameraX * 0.08) % 600, 150, 180, 55, { feature: "tree", foliageColor: "#52b788" });

      // Hot Air Balloon in background sky
      const bx = (frame * 0.3 - this.cameraX * 0.04) % (w + 200) - 100;
      ctx.fillStyle = "#f77f00";
      ctx.beginPath();
      ctx.arc(bx + 50, 90, 18, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#eae2b7";
      ctx.fillRect(bx + 45, 110, 10, 8);

      // Rolling Farmland Hills Backdrop (Connecting seamlessly down to groundY)
      ctx.fillStyle = "#74c69d";
      ctx.beginPath();
      ctx.moveTo(0, gy);
      for (let x = 0; x <= w; x += 30) {
        const hillH = 40 + Math.sin((x + this.cameraX * 0.15) * 0.008) * 25;
        ctx.lineTo(x, gy - hillH);
      }
      ctx.lineTo(w, gy);
      ctx.fill();

      // Red Barn on the backdrop hill (Anchored to the hill slope)
      const barnX = 350 - (this.cameraX * 0.18) % 700;
      ctx.fillStyle = "#b93c3c";
      ctx.fillRect(barnX, gy - 75, 75, 55);
      ctx.fillStyle = "#f8f9fa";
      ctx.beginPath();
      ctx.moveTo(barnX - 5, gy - 75); ctx.lineTo(barnX + 37, gy - 105); ctx.lineTo(barnX + 80, gy - 75);
      ctx.fill();
      ctx.fillStyle = "#ced4da";
      ctx.fillRect(barnX + 80, gy - 95, 22, 75);

      // Wooden Farm Fences (Firmly planted directly in groundY)
      for (let i = 0; i < 14; i++) {
        const fx = i * 90 - (this.cameraX * 0.3) % 90;
        ctx.fillStyle = "#9c6644";
        ctx.fillRect(fx, gy - 32, 6, 32);
        ctx.fillRect(fx - 10, gy - 26, 100, 5);
        ctx.fillRect(fx - 10, gy - 12, 100, 5);
      }

    } else if (theme === "storm") {
      // 3. Sky Orchard & Waterfalls (เกาะสวนผลไม้และน้ำตกเวหา)
      const skyGrad = ctx.createLinearGradient(0, 0, 0, gy);
      skyGrad.addColorStop(0, "#f39a59");
      skyGrad.addColorStop(0.5, "#fdba74");
      skyGrad.addColorStop(1, "#bbf7d0");
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, w, h);

      // Distant Orchard Islets with Cascading Waterfalls
      this.drawFloatingIsland(ctx, 60 - (this.cameraX * 0.08) % 450, 110, 150, 48, { feature: "tree", hasFruit: true, hasWaterfall: true });
      this.drawFloatingIsland(ctx, 400 - (this.cameraX * 0.08) % 550, 135, 170, 55, { feature: "tree", hasFruit: true, hasWaterfall: true });
      this.drawFloatingIsland(ctx, 740 - (this.cameraX * 0.08) % 650, 100, 140, 45, { feature: "tree", hasFruit: true });

      // Translucent Rainbow Mist in sky
      ctx.strokeStyle = "rgba(255, 200, 220, 0.4)";
      ctx.lineWidth = 8;
      ctx.beginPath();
      ctx.arc(w * 0.65, 240, 160, Math.PI * 1.1, Math.PI * 1.9);
      ctx.stroke();

      // Backdrop Orchard Hills (Flowing smoothly into groundY)
      ctx.fillStyle = "#52b788";
      ctx.beginPath();
      ctx.moveTo(0, gy);
      for (let x = 0; x <= w; x += 30) {
        const hillH = 35 + Math.sin((x + this.cameraX * 0.15) * 0.007) * 20;
        ctx.lineTo(x, gy - hillH);
      }
      ctx.lineTo(w, gy);
      ctx.fill();

      // Orchard Fruit Trees (Rooted directly in groundY)
      for (let i = 0; i < 7; i++) {
        const tx = i * 160 + 50 - (this.cameraX * 0.25) % 160;
        ctx.fillStyle = "#5c4033";
        ctx.fillRect(tx + 22, gy - 65, 12, 65);
        ctx.fillStyle = "#2d6a4f";
        ctx.beginPath();
        ctx.arc(tx + 28, gy - 75, 34, 0, Math.PI * 2);
        ctx.fill();
        // Red Apples on tree
        ctx.fillStyle = "#e63946";
        ctx.beginPath();
        ctx.arc(tx + 18, gy - 85, 4.5, 0, Math.PI * 2);
        ctx.arc(tx + 40, gy - 78, 4.5, 0, Math.PI * 2);
        ctx.arc(tx + 26, gy - 65, 4.5, 0, Math.PI * 2);
        ctx.fill();
      }

      // Flowing Irrigation Canal Stream along the backdrop (Seated right at groundY)
      ctx.fillStyle = "rgba(72, 202, 228, 0.55)";
      ctx.fillRect(0, gy - 14, w, 14);
      ctx.fillStyle = "#caf0f8";
      for (let i = 0; i < 8; i++) {
        const rx = (i * 140 + frame * 1.5 - this.cameraX * 0.3) % w;
        ctx.fillRect(rx, gy - 10 + (i % 2) * 4, 30, 2);
      }

    } else if (theme === "chapel") {
      // 4. Floating Botanical Sanctuary (เกาะพฤกษศาสตร์สมุนไพรลอยฟ้า)
      const skyGrad = ctx.createLinearGradient(0, 0, 0, gy);
      skyGrad.addColorStop(0, "#9d4edd");
      skyGrad.addColorStop(0.5, "#e0aaff");
      skyGrad.addColorStop(1, "#d8f3dc");
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, w, h);

      // Distant Lavender Floating Terraces
      this.drawFloatingIsland(ctx, 90 - (this.cameraX * 0.08) % 480, 120, 160, 50, { grassColor: "#9d4edd", feature: "tree", foliageColor: "#7209b7" });
      this.drawFloatingIsland(ctx, 500 - (this.cameraX * 0.08) % 600, 140, 180, 55, { grassColor: "#9d4edd", hasWaterfall: true });

      // Floating Pollen Dust in breeze
      ctx.fillStyle = "#fee440";
      for (let i = 0; i < 16; i++) {
        const px = (i * 63 + frame * 0.4) % w;
        const py = 80 + (i * 37 + Math.sin(frame * 0.05 + i) * 15) % 220;
        ctx.fillRect(px, py, 2.5, 2.5);
      }

      // Backdrop Herb Slopes (Connecting smoothly to groundY)
      ctx.fillStyle = "#8338ec";
      ctx.beginPath();
      ctx.moveTo(0, gy);
      for (let x = 0; x <= w; x += 30) {
        const hillH = 30 + Math.sin((x + this.cameraX * 0.16) * 0.008) * 18;
        ctx.lineTo(x, gy - hillH);
      }
      ctx.lineTo(w, gy);
      ctx.fill();

      // Blooming Lavender Beds & Trellises (Rooted firmly in groundY)
      for (let i = 0; i < 16; i++) {
        const lx = i * 75 - (this.cameraX * 0.26) % 75;
        ctx.fillStyle = "#5a189a";
        ctx.fillRect(lx, gy - 38, 22, 38);
        ctx.fillStyle = "#c77dff";
        ctx.fillRect(lx + 3, gy - 48, 16, 14);
      }

    } else if (theme === "catacombs") {
      // 5. Sub-Island Rhizosphere (เกาะห้องทดลองรากพืชใต้พิภพ)
      ctx.fillStyle = "#180e08";
      ctx.fillRect(0, 0, w, h);

      // Open Chasm in center showing the open sky below the floating island
      const abyssGrad = ctx.createLinearGradient(0, 180, 0, gy);
      abyssGrad.addColorStop(0, "#180e08");
      abyssGrad.addColorStop(0.6, "#1d3557");
      abyssGrad.addColorStop(1, "#457b9d");
      ctx.fillStyle = abyssGrad;
      ctx.fillRect(0, 160, w, gy - 160);

      // Giant Living Roots vaulting down from ceiling into groundY
      ctx.strokeStyle = "#bc6c25";
      ctx.lineWidth = 6;
      for (let i = 0; i < 6; i++) {
        const rx = i * 200 - (this.cameraX * 0.18) % 200;
        ctx.beginPath();
        ctx.moveTo(rx, 0);
        ctx.bezierCurveTo(rx + 50, 120, rx - 40, 260, rx + 20, gy);
        ctx.stroke();
      }

      // Bioluminescent Giant Mushrooms (Sprouting directly from groundY)
      for (let i = 0; i < 9; i++) {
        const mx = i * 130 + 35 - (this.cameraX * 0.28) % 130;
        ctx.fillStyle = (i % 2 === 0) ? "#2ec4b6" : "#00f5d4";
        ctx.beginPath();
        ctx.arc(mx, gy - 20, 14, Math.PI, 0);
        ctx.fill();
        ctx.fillStyle = "#f8f9fa";
        ctx.fillRect(mx - 3, gy - 20, 6, 20);
      }

    } else if (theme === "city") {
      // 6. Solar AgriTech Sky City (เกาะนครเกษตรอัจฉริยะลอยฟ้า)
      const skyGrad = ctx.createLinearGradient(0, 0, 0, gy);
      skyGrad.addColorStop(0, "#03045e");
      skyGrad.addColorStop(0.5, "#0077b6");
      skyGrad.addColorStop(1, "#48cae4");
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, w, h);

      // Distant Floating City Platforms
      this.drawFloatingIsland(ctx, 100 - (this.cameraX * 0.08) % 500, 120, 160, 50, { grassColor: "#00f5d4" });
      this.drawFloatingIsland(ctx, 480 - (this.cameraX * 0.08) % 600, 145, 190, 60, { grassColor: "#00f5d4" });

      // Delivery Drones in sky
      for (let d = 0; d < 3; d++) {
        const dx = (frame * 0.8 + d * 300 - this.cameraX * 0.12) % (w + 100) - 50;
        ctx.fillStyle = "#00f5d4";
        ctx.fillRect(dx, 70 + d * 22, 14, 5);
        ctx.fillRect(dx + 4, 66 + d * 22, 6, 4);
      }

      // Vertical Hydroponic Towers (Foundations seated firmly on groundY)
      for (let i = 0; i < 6; i++) {
        const tx = i * 190 + 20 - (this.cameraX * 0.22) % 190;
        ctx.fillStyle = "#0f1f38";
        ctx.fillRect(tx, gy - 260, 75, 260);
        ctx.fillStyle = (i % 2 === 0) ? "rgba(181, 23, 158, 0.75)" : "rgba(76, 201, 240, 0.75)";
        for (let j = 0; j < 5; j++) {
          ctx.fillRect(tx + 8, gy - 240 + j * 44, 59, 22);
        }
      }

      // Angled IoT Solar Panels (Anchored directly to groundY)
      for (let i = 0; i < 7; i++) {
        const sx = i * 170 + 60 - (this.cameraX * 0.28) % 170;
        ctx.fillStyle = "#1d3557";
        ctx.beginPath();
        ctx.moveTo(sx, gy); ctx.lineTo(sx + 35, gy - 30); ctx.lineTo(sx + 75, gy - 30); ctx.lineTo(sx + 40, gy);
        ctx.fill();
      }

    } else if (theme === "sewer") {
      // 7. Celestial Aquaponics Island (เกาะบึงน้ำลอยฟ้าอควาโปนิกส์)
      const skyGrad = ctx.createLinearGradient(0, 0, 0, gy);
      skyGrad.addColorStop(0, "#1b4332");
      skyGrad.addColorStop(0.5, "#40916c");
      skyGrad.addColorStop(1, "#95d5b2");
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, w, h);

      // Distant Floating Wetland Reserves
      this.drawFloatingIsland(ctx, 70 - (this.cameraX * 0.08) % 450, 120, 150, 50, { hasWaterfall: true });
      this.drawFloatingIsland(ctx, 440 - (this.cameraX * 0.08) % 550, 140, 170, 55, { feature: "tree" });

      // Aquaponics Water Lake Backdrop (Seamlessly touching groundY)
      ctx.fillStyle = "rgba(46, 196, 182, 0.6)";
      ctx.fillRect(0, gy - 35, w, 35);

      // Tall Cattails & Reeds (Rooted directly in groundY)
      for (let i = 0; i < 18; i++) {
        const rx = i * 60 - (this.cameraX * 0.25) % 60;
        ctx.fillStyle = "#2d6a4f";
        ctx.fillRect(rx, gy - 65, 4, 65);
        ctx.fillStyle = "#6f4e37";
        ctx.fillRect(rx - 2, gy - 55, 8, 22);
      }

      // Blooming Lotus Water Lilies (Sitting on water level above groundY)
      for (let i = 0; i < 8; i++) {
        const lx = i * 140 + 25 - (this.cameraX * 0.28) % 140;
        ctx.fillStyle = "#38b000";
        ctx.beginPath();
        ctx.arc(lx, gy - 16, 12, 0, Math.PI * 1.8);
        ctx.fill();
        ctx.fillStyle = "#ff70a6";
        ctx.beginPath();
        ctx.arc(lx + 4, gy - 20, 6, 0, Math.PI * 2);
        ctx.fill();
      }

    } else if (theme === "skywalk") {
      // 8. Skyward Terrace Rice Island (เกาะนาขั้นบันไดเสียดฟ้า)
      const skyGrad = ctx.createLinearGradient(0, 0, 0, gy);
      skyGrad.addColorStop(0, "#1d3557");
      skyGrad.addColorStop(0.5, "#457b9d");
      skyGrad.addColorStop(1, "#a8dadc");
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, w, h);

      // Distant Terraced Floating Paddy Steps (Ascending in the clouds)
      for (let i = 0; i < 4; i++) {
        const ty = 100 + i * 40;
        const tx = i * 120 - (this.cameraX * 0.08) % 400;
        this.drawFloatingIsland(ctx, tx, ty, 200, 42, { grassColor: (i % 2 === 0) ? "#52b788" : "#95d5b2", hasWaterfall: true });
      }

      // Backdrop Rice Terrace Ridges (Stepping down right into groundY)
      for (let i = 0; i < 3; i++) {
        const ry = gy - 70 + i * 25;
        ctx.fillStyle = (i % 2 === 0) ? "#40916c" : "#52b788";
        ctx.beginPath();
        ctx.moveTo(0, ry);
        for (let x = 0; x <= w; x += 40) {
          ctx.lineTo(x, ry + Math.sin((x + this.cameraX * 0.15) * 0.01) * 8);
        }
        ctx.lineTo(w, gy);
        ctx.lineTo(0, gy);
        ctx.fill();
      }

      // Wooden Scarecrow with Straw Hat (Standing firmly planted in groundY)
      const scx = 420 - (this.cameraX * 0.3) % 700;
      ctx.fillStyle = "#8d5b4c";
      ctx.fillRect(scx, gy - 70, 6, 70);
      ctx.fillRect(scx - 20, gy - 55, 46, 6);
      ctx.fillStyle = "#e9c46a";
      ctx.beginPath();
      ctx.arc(scx + 3, gy - 75, 10, 0, Math.PI * 2);
      ctx.fill();

    } else if (theme === "canyon") {
      // 9. Floating Savanna & Agroforestry (เกาะสะวันนาลอยฟ้าพืชทนแล้ง)
      const skyGrad = ctx.createLinearGradient(0, 0, 0, gy);
      skyGrad.addColorStop(0, "#f77f00");
      skyGrad.addColorStop(0.5, "#fcbf49");
      skyGrad.addColorStop(1, "#e9d8a6");
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, w, h);

      // Distant Red Sandstone Floating Mesas
      this.drawFloatingIsland(ctx, 110 - (this.cameraX * 0.08) % 500, 130, 180, 55, { stoneColor: "#804e28", grassColor: "#dda15e" });
      this.drawFloatingIsland(ctx, 520 - (this.cameraX * 0.08) % 600, 120, 160, 50, { stoneColor: "#804e28", grassColor: "#dda15e" });

      // Terracotta Savanna Backdrop Hills (Flowing into groundY)
      ctx.fillStyle = "#bc6c25";
      ctx.beginPath();
      ctx.moveTo(0, gy);
      for (let x = 0; x <= w; x += 30) {
        const hillH = 35 + Math.sin((x + this.cameraX * 0.15) * 0.007) * 22;
        ctx.lineTo(x, gy - hillH);
      }
      ctx.lineTo(w, gy);
      ctx.fill();

      // Giant Umbrella Acacia Trees (Rooted directly in groundY)
      for (let i = 0; i < 4; i++) {
        const ax = i * 280 + 70 - (this.cameraX * 0.22) % 280;
        ctx.fillStyle = "#6f4e37";
        ctx.fillRect(ax + 20, gy - 95, 16, 95);
        ctx.fillStyle = "#588157";
        ctx.beginPath();
        ctx.ellipse(ax + 28, gy - 100, 65, 20, 0, 0, Math.PI * 2);
        ctx.fill();
      }

      // Cacti & Dragon Fruit bushes along the ground (Anchored to groundY)
      for (let i = 0; i < 8; i++) {
        const cx = i * 150 + 20 - (this.cameraX * 0.28) % 150;
        ctx.fillStyle = "#2d6a4f";
        ctx.fillRect(cx, gy - 40, 12, 40);
        ctx.fillRect(cx - 8, gy - 30, 10, 8);
        ctx.fillRect(cx + 10, gy - 24, 10, 8);
      }

    } else if (theme === "lab") {
      // 10. Global Sky Seed Vault (เกาะคลังพันธุกรรมเมล็ดพันธุ์เวหา)
      const skyGrad = ctx.createLinearGradient(0, 0, 0, gy);
      skyGrad.addColorStop(0, "#081c15");
      skyGrad.addColorStop(0.6, "#1b4332");
      skyGrad.addColorStop(1, "#2d6a4f");
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, w, h);

      // Distant Floating Seed Vault Modules
      this.drawFloatingIsland(ctx, 120 - (this.cameraX * 0.08) % 500, 120, 160, 50, { grassColor: "#00f5d4" });
      this.drawFloatingIsland(ctx, 500 - (this.cameraX * 0.08) % 600, 140, 170, 55, { grassColor: "#00f5d4" });

      // Cryogenic Seed Preservation Columns (Standing firmly on groundY)
      for (let i = 0; i < 8; i++) {
        const cx = i * 150 + 10 - (this.cameraX * 0.22) % 150;
        ctx.fillStyle = "#092f23";
        ctx.fillRect(cx, gy - 240, 50, 240);
        ctx.fillStyle = "rgba(46, 196, 182, 0.4)";
        ctx.fillRect(cx + 6, gy - 220, 38, 200);
        ctx.fillStyle = "#fee440";
        for (let k = 0; k < 4; k++) {
          ctx.beginPath();
          ctx.arc(cx + 25, gy - 190 + k * 45 + Math.sin(frame * 0.1 + k) * 4, 3.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }

    } else if (theme === "cathedral") {
      // 11. Golden Harvest Sky Sanctuary (เกาะทุ่งรวงทองแห่งสวรรค์)
      const skyGrad = ctx.createLinearGradient(0, 0, 0, gy);
      skyGrad.addColorStop(0, "#ffb703");
      skyGrad.addColorStop(0.5, "#fb8500");
      skyGrad.addColorStop(1, "#ffe49e");
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, w, h);

      // Distant Golden Wheat Floating Islands
      this.drawFloatingIsland(ctx, 80 - (this.cameraX * 0.08) % 450, 120, 160, 50, { grassColor: "#e9c46a", feature: "windmill", hasWaterfall: true });
      this.drawFloatingIsland(ctx, 460 - (this.cameraX * 0.08) % 550, 140, 180, 55, { grassColor: "#e9c46a", hasWaterfall: true });

      // Golden Sunburst Rays from above
      const sunburst = ctx.createRadialGradient(w / 2, 100, 20, w / 2, 100, 300);
      sunburst.addColorStop(0, "rgba(255, 255, 230, 0.6)");
      sunburst.addColorStop(1, "rgba(255, 220, 100, 0)");
      ctx.fillStyle = sunburst;
      ctx.fillRect(0, 0, w, h);

      // Grand Windmill in backdrop (Standing on the wheat ridge)
      const wx = 650 - (this.cameraX * 0.18) % w;
      ctx.fillStyle = "#8a5a36";
      ctx.beginPath();
      ctx.moveTo(wx + 20, gy - 180); ctx.lineTo(wx + 55, gy - 180); ctx.lineTo(wx + 70, gy); ctx.lineTo(wx + 5, gy);
      ctx.fill();
      const sailAng = frame * 0.03;
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 3;
      for (let s = 0; s < 4; s++) {
        const a = sailAng + (s * Math.PI) / 2;
        ctx.beginPath();
        ctx.moveTo(wx + 37, gy - 180);
        ctx.lineTo(wx + 37 + Math.cos(a) * 60, gy - 180 + Math.sin(a) * 60);
        ctx.stroke();
      }

      // Swaying Golden Wheat Ocean (Rooted seamlessly from gy - 55 down to groundY)
      ctx.fillStyle = "#e9c46a";
      for (let i = 0; i < 45; i++) {
        const whx = i * 25 - (this.cameraX * 0.3) % 25;
        const sway = Math.sin(frame * 0.08 + i) * 6;
        ctx.fillRect(whx + sway, gy - 45, 4, 45);
        ctx.beginPath();
        ctx.arc(whx + sway + 2, gy - 48, 5, 0, Math.PI * 2);
        ctx.fill();
      }

    } else if (theme === "lunar") {
      // 12. Celestial Tree of Life Island (เกาะพฤกษาจันทราลอยฟ้า)
      ctx.fillStyle = "#0c1328";
      ctx.fillRect(0, 0, w, h);

      // Cosmic Starry sky
      ctx.fillStyle = "#ffffff";
      for (let i = 0; i < 35; i++) {
        const sx = (i * 97 + frame * 0.05) % w;
        const sy = (i * 61) % 240;
        ctx.fillRect(sx, sy, 2, 2);
      }

      // Distant Starlit Floating Islands
      this.drawFloatingIsland(ctx, 100 - (this.cameraX * 0.08) % 500, 130, 160, 50, { grassColor: "#7209b7", stoneColor: "#221b3a" });
      this.drawFloatingIsland(ctx, 500 - (this.cameraX * 0.08) % 600, 150, 180, 55, { grassColor: "#7209b7", stoneColor: "#221b3a" });

      // Luminous Giant Moon
      const moonGrad = ctx.createRadialGradient(720, 100, 10, 720, 100, 75);
      moonGrad.addColorStop(0, "#ffffff");
      moonGrad.addColorStop(0.6, "#c77dff");
      moonGrad.addColorStop(1, "rgba(199, 125, 255, 0)");
      ctx.fillStyle = moonGrad;
      ctx.beginPath();
      ctx.arc(720, 100, 75, 0, Math.PI * 2);
      ctx.fill();

      // Giant Tree of Life Trunk & Luminous Canopy (Rooted firmly in groundY)
      const treeX = 380 - (this.cameraX * 0.18) % w;
      ctx.fillStyle = "#4a2810";
      ctx.beginPath();
      ctx.moveTo(treeX - 25, gy); ctx.lineTo(treeX - 12, gy - 160); ctx.lineTo(treeX + 12, gy - 160); ctx.lineTo(treeX + 25, gy);
      ctx.fill();
      // Luminous celestial canopy
      ctx.fillStyle = "#7209b7";
      ctx.beginPath();
      ctx.arc(treeX, gy - 180, 110, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#4cc9f0";
      ctx.beginPath();
      ctx.arc(treeX, gy - 180, 80, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  drawThematicGround(theme) {
    const ctx = this.ctx;
    const gx = 0 - this.cameraX;
    const gy = this.groundY; // 440
    const ww = this.worldWidth;
    const frame = this.player ? (this.player.frameCount || 0) : 0;

    // 1. Soft Horizon Shadow (blends background seamlessly into ground)
    const blendGrad = ctx.createLinearGradient(0, gy - 12, 0, gy + 8);
    blendGrad.addColorStop(0, "rgba(0,0,0,0)");
    blendGrad.addColorStop(1, "rgba(0,0,0,0.22)");
    ctx.fillStyle = blendGrad;
    ctx.fillRect(gx, gy - 12, ww, 20);

    // 2. Main Ground Soil Core (Topsoil -> Humus -> Subsoil -> Rock)
    // Deep Humus Soil
    ctx.fillStyle = "#3a2012";
    ctx.fillRect(gx, gy + 12, ww, 40);

    // Subsoil & Bedrock Stratum
    ctx.fillStyle = "#2c170b";
    ctx.fillRect(gx, gy + 52, ww, 30);

    // Island Underside Jagged Cliff Edge & Crags
    ctx.fillStyle = "#1b0d06";
    ctx.beginPath();
    ctx.moveTo(gx, gy + 72);
    for (let x = 0; x <= ww; x += 35) {
      const cragH = 72 + Math.sin(x * 0.04) * 14 + Math.cos(x * 0.08) * 8;
      ctx.lineTo(gx + x, gy + cragH);
    }
    ctx.lineTo(gx + ww, gy + 100);
    ctx.lineTo(gx, gy + 100);
    ctx.fill();

    // 3. Dangling Roots and Vines swaying into the open sky beneath the island
    ctx.strokeStyle = (theme === "city" || theme === "lab") ? "rgba(76, 201, 240, 0.45)" : "#40916c";
    ctx.lineWidth = 2;
    for (let x = 20; x < ww; x += 60) {
      const sway = Math.sin(frame * 0.04 + x * 0.5) * 5;
      const vlen = 20 + (x % 7) * 4;
      ctx.beginPath();
      ctx.moveTo(gx + x, gy + 70);
      ctx.quadraticCurveTo(gx + x + sway, gy + 70 + vlen * 0.5, gx + x + sway * 1.2, gy + 70 + vlen);
      ctx.stroke();
    }

    // 4. Cloud Sea Mist under the Floating Island bottom
    ctx.fillStyle = "rgba(255, 255, 255, 0.35)";
    for (let x = 0; x < ww; x += 140) {
      const cx = gx + x + Math.sin(frame * 0.02 + x) * 10;
      ctx.beginPath();
      ctx.arc(cx, gy + 96, 30, 0, Math.PI * 2);
      ctx.fill();
    }

    // 5. Thematic Top Turf Layer (Anchored right at groundY = 440)
    if (theme === "sanctum") {
      // Greenhouse Polished Wood Deck & Grass Borders
      ctx.fillStyle = "#7f4f24";
      ctx.fillRect(gx, gy, ww, 14);
      ctx.fillStyle = "#936639";
      ctx.fillRect(gx, gy, ww, 3);
      // Grass fringes in gaps
      ctx.fillStyle = "#52b788";
      for (let x = 10; x < ww; x += 40) {
        ctx.fillRect(gx + x, gy - 3, 15, 3);
      }
    } else if (theme === "city") {
      // Smart Agri Solar Pavement with Neon Bio-Tracers
      ctx.fillStyle = "#1b263b";
      ctx.fillRect(gx, gy, ww, 14);
      ctx.fillStyle = "#00f5d4";
      ctx.fillRect(gx, gy, ww, 3);
      // Circuit neon nodes
      ctx.fillStyle = "#70e000";
      for (let x = 25; x < ww; x += 80) {
        ctx.fillRect(gx + x, gy - 2, 8, 4);
      }
    } else if (theme === "cathedral") {
      // Golden Wheat Field Turf
      ctx.fillStyle = "#d4a373";
      ctx.fillRect(gx, gy, ww, 14);
      ctx.fillStyle = "#e9c46a";
      ctx.fillRect(gx, gy - 2, ww, 5);
      // Golden Wheat Sprouts
      ctx.fillStyle = "#f4a261";
      for (let x = 10; x < ww; x += 25) {
        const sw = Math.sin(frame * 0.08 + x) * 2;
        ctx.fillRect(gx + x + sw, gy - 6, 2, 6);
        ctx.fillRect(gx + x + sw - 1, gy - 8, 4, 3);
      }
    } else if (theme === "canyon") {
      // Terracotta Savanna Earth & Red Clay Turf
      ctx.fillStyle = "#9a031e";
      ctx.fillRect(gx, gy, ww, 14);
      ctx.fillStyle = "#e36414";
      ctx.fillRect(gx, gy - 2, ww, 5);
      // Savanna dry grass tufts
      ctx.fillStyle = "#dda15e";
      for (let x = 15; x < ww; x += 35) {
        ctx.fillRect(gx + x, gy - 5, 2, 5);
        ctx.fillRect(gx + x + 3, gy - 4, 2, 4);
      }
    } else if (theme === "catacombs") {
      // Dark Root Humus & Bioluminescent Moss
      ctx.fillStyle = "#2d1810";
      ctx.fillRect(gx, gy, ww, 14);
      ctx.fillStyle = "#2ec4b6";
      ctx.fillRect(gx, gy, ww, 3);
      // Tiny glowing spore dots
      ctx.fillStyle = "#00f5d4";
      for (let x = 20; x < ww; x += 45) {
        ctx.fillRect(gx + x, gy - 2, 3, 3);
      }
    } else if (theme === "lab") {
      // High-Tech Cleanroom Floor with Biosafety Edge
      ctx.fillStyle = "#092f23";
      ctx.fillRect(gx, gy, ww, 14);
      ctx.fillStyle = "#52b788";
      ctx.fillRect(gx, gy, ww, 3);
      ctx.fillStyle = "#fee440";
      for (let x = 30; x < ww; x += 90) {
        ctx.fillRect(gx + x, gy - 1, 12, 3);
      }
    } else {
      // Lush Organic Green Grass Turf (Default Farmland, Orchard, Herb, Rice Terraces)
      ctx.fillStyle = "#2d6a4f";
      ctx.fillRect(gx, gy, ww, 14);
      ctx.fillStyle = "#52b788";
      ctx.fillRect(gx, gy - 2, ww, 5);

      // Natural Swaying Grass Blades & Wild Flowers
      ctx.fillStyle = "#70e000";
      for (let x = 12; x < ww; x += 22) {
        const sw = Math.sin(frame * 0.07 + x) * 2;
        ctx.fillRect(gx + x + sw, gy - 5, 2, 5);
        ctx.fillRect(gx + x + 3 + sw, gy - 4, 2, 4);
      }

      // Small wildflowers (Daisy, Poppy, Lavender)
      for (let x = 28; x < ww; x += 75) {
        const fColor = (x % 3 === 0) ? "#ff70a6" : ((x % 3 === 1) ? "#fee440" : "#ffffff");
        ctx.fillStyle = fColor;
        ctx.fillRect(gx + x, gy - 7, 3, 3);
      }
    }
  }

  drawEntities() {
    const ctx = this.ctx;

    for (let ent of this.entities) {
      const rx = ent.x - this.cameraX;

      if (ent.type === "npc") {
        this.drawProceduralSprite(
          ctx, rx, ent.y, ent.width, ent.height, 
          ent.gender || "farmer_m", ent.state || 'idle', 
          ent.frameCount || 0, ent.facingRight !== false,
          false,
          ent.custom
        );
        // NPC nametag rendered crisp in HTML DOM by updateFloatingTags()

      } else if (ent.type === "altar") {
        // Sacred Harvest Altar / Bio Shrine with wheat wreath and warm glowing lamp
        ctx.fillStyle = "#8d5b4c";
        ctx.fillRect(rx, ent.y + 15, ent.width, ent.height - 15);
        ctx.fillStyle = "#52b788";
        ctx.fillRect(rx - 4, ent.y + 10, ent.width + 8, 8);
        
        // Warm glowing bio lamp / flame
        const flameBob = Math.sin((this.player.frameCount || 0) * 0.15) * 3;
        ctx.fillStyle = "#ffb703";
        ctx.beginPath();
        ctx.arc(rx + ent.width / 2, ent.y + 4 + flameBob, 7, 0, Math.PI * 2);
        ctx.fill();

        // Altar nametag rendered crisp in HTML DOM by updateFloatingTags()

      } else if (ent.type === "item") {
        // Floating organic seed box / farming tool crate
        const itemBob = Math.sin((this.player.frameCount || 0) * 0.1) * 4;
        ctx.fillStyle = "#bc6c25";
        ctx.fillRect(rx, ent.y + itemBob, ent.width, ent.height);
        ctx.strokeStyle = "#dda15e";
        ctx.lineWidth = 2;
        ctx.strokeRect(rx, ent.y + itemBob, ent.width, ent.height);

        // Item nametag rendered crisp in HTML DOM by updateFloatingTags()

      } else if (ent.type === "portal") {
        // Rustic Farm Archway / Farm Gate with vines
        const isBoss = (ent.id === "portal_boss");
        ctx.fillStyle = isBoss ? "#b93c3c" : "#386641";
        ctx.fillRect(rx, ent.y, ent.width, ent.height);
        ctx.strokeStyle = isBoss ? "#ffd166" : "#a7c957";
        ctx.lineWidth = 3;
        ctx.strokeRect(rx, ent.y, ent.width, ent.height);

        // Vine leaves decoration on arch
        ctx.fillStyle = "#52b788";
        ctx.beginPath();
        ctx.arc(rx + 6, ent.y + 10, 6, 0, Math.PI * 2);
        ctx.arc(rx + ent.width - 6, ent.y + 10, 6, 0, Math.PI * 2);
        ctx.arc(rx + ent.width / 2, ent.y + 4, 7, 0, Math.PI * 2);
        ctx.fill();

        // Portal nametag rendered crisp in HTML DOM by updateFloatingTags()

      } else if (ent.type.startsWith("minigame")) {
        // Agricultural interactive soil/crop testing plot
        ctx.fillStyle = "#6b4f35";
        ctx.fillRect(rx, ent.y, ent.width, ent.height);
        ctx.fillStyle = "#52b788";
        ctx.fillRect(rx, ent.y, ent.width, 6);
        // Minigame nametag rendered crisp in HTML DOM by updateFloatingTags()
      }

      // Interaction prompt
      const dist = Math.abs((this.player.x + this.player.width / 2) - (ent.x + ent.width / 2));
      if (dist < 65) {
        // Prompt rendered crisp in HTML DOM by updateFloatingTags()
      }
    }
  }

  drawNotificationBanner() {
    // Handled by 100% vector-crisp HTML DOM in #hud-notification-banner
    return;
  }

  gameLoop() {
    this.update();
    this.draw();
    if (this.gameState === "MAP") {
      this.drawMapUI();
    }
    requestAnimationFrame(() => this.gameLoop());
  }

  toggleMapUI() {
    if (this.gameState === "MAP") {
      this.gameState = "PLAYING";
      const hudTop = document.getElementById("hud-top");
      if (hudTop) hudTop.classList.remove("hidden");
      const hudBottom = document.getElementById("hud-bottom-right");
      if (hudBottom) hudBottom.classList.remove("hidden");
    } else if (this.gameState === "PLAYING") {
      this.gameState = "MAP";
      this.selectedMapRoomId = this.currentRoomId;
      const hudTop = document.getElementById("hud-top");
      if (hudTop) hudTop.classList.add("hidden");
      const hudBottom = document.getElementById("hud-bottom-right");
      if (hudBottom) hudBottom.classList.add("hidden");
      if (this.sound) this.sound.playCoin();
    }
  }

  handleMapKeyboardNav(e) {
    const roomKeys = Object.keys(this.WORLD_MAP);
    const currIdx = roomKeys.indexOf(this.selectedMapRoomId || this.currentRoomId);
    if (e.code === "ArrowRight" || e.code === "KeyD") {
      const nextIdx = (currIdx + 1) % roomKeys.length;
      this.selectedMapRoomId = roomKeys[nextIdx];
      if (this.sound) this.sound.playJump();
    } else if (e.code === "ArrowLeft" || e.code === "KeyA") {
      const prevIdx = (currIdx - 1 + roomKeys.length) % roomKeys.length;
      this.selectedMapRoomId = roomKeys[prevIdx];
      if (this.sound) this.sound.playJump();
    } else if (e.code === "ArrowUp" || e.code === "KeyW") {
      const prevIdx = (currIdx - 2 + roomKeys.length) % roomKeys.length;
      this.selectedMapRoomId = roomKeys[prevIdx];
      if (this.sound) this.sound.playJump();
    } else if (e.code === "ArrowDown" || e.code === "KeyS") {
      const nextIdx = (currIdx + 2) % roomKeys.length;
      this.selectedMapRoomId = roomKeys[nextIdx];
      if (this.sound) this.sound.playJump();
    }
  }

  handleMapMouseDown(e) {
    const rect = this.canvas.getBoundingClientRect();
    const scaleX = 960 / rect.width;
    const scaleY = 540 / rect.height;
    const mouseX = (e.clientX - rect.left) * scaleX;
    const mouseY = (e.clientY - rect.top) * scaleY;
    const cw = 960;

    // Top Header Buttons
    // 1. Reset View [Key R]
    if (mouseX >= cw - 320 && mouseX <= cw - 210 && mouseY >= 12 && mouseY <= 38) {
      this.mapPanX = 0;
      this.mapPanY = 0;
      if (this.sound) this.sound.playCoin();
      return;
    }
    // 2. Toggle Sidebar [Tab]
    if (mouseX >= cw - 200 && mouseX <= cw - 90 && mouseY >= 12 && mouseY <= 38) {
      this.showMapSidebar = !this.showMapSidebar;
      if (this.sound) this.sound.playJump();
      return;
    }
    // 3. Close Map [Esc/M]
    if (mouseX >= cw - 80 && mouseX <= cw - 12 && mouseY >= 12 && mouseY <= 38) {
      this.toggleMapUI();
      return;
    }

    // If Sidebar is open, check interactions on the Sidebar
    if (this.showMapSidebar) {
      const pw = 280;
      const ph = 460;
      const px = cw - pw - 16;
      const py = 46;

      // Sidebar Close Button [X]
      if (mouseX >= px + pw - 32 && mouseX <= px + pw - 6 && mouseY >= py + 6 && mouseY <= py + 32) {
        this.showMapSidebar = false;
        if (this.sound) this.sound.playShoot();
        return;
      }

      // Fast Travel button inside sidebar
      if (mouseX >= px + 16 && mouseX <= px + pw - 16 && mouseY >= py + ph - 48 && mouseY <= py + ph - 12) {
        this.fastTravelToSelectedRoom();
        return;
      }

      // If clicked inside sidebar body (not buttons), consume click without dragging
      if (mouseX >= px && mouseX <= px + pw && mouseY >= py && mouseY <= py + ph) {
        return;
      }
    }

    // Check click on Map Nodes
    const panX = this.mapPanX || 0;
    const panY = this.mapPanY || 0;
    for (let key in this.WORLD_MAP) {
      const room = this.WORLD_MAP[key];
      const nodeX = room.mapX + panX;
      const nodeY = room.mapY + panY;
      if (
        mouseX >= nodeX - 47 && mouseX <= nodeX + 47 &&
        mouseY >= nodeY - 24 && mouseY <= nodeY + 24
      ) {
        const now = Date.now();
        if (this.selectedMapRoomId === key && (now - this.lastMapClickTime) < 450) {
          this.fastTravelToSelectedRoom();
        } else {
          this.selectedMapRoomId = key;
          this.showMapSidebar = true;
          if (this.sound) this.sound.playJump();
        }
        this.lastMapClickTime = now;
        this.lastMapClickNode = key;
        return;
      }
    }

    // Otherwise, start dragging the map
    this.isDraggingMap = true;
    this.mapDragStartX = mouseX - (this.mapPanX || 0);
    this.mapDragStartY = mouseY - (this.mapPanY || 0);
  }

  handleMapMouseMove(e) {
    const rect = this.canvas.getBoundingClientRect();
    const scaleX = 960 / rect.width;
    const scaleY = 540 / rect.height;
    const mouseX = (e.clientX - rect.left) * scaleX;
    const mouseY = (e.clientY - rect.top) * scaleY;

    if (this.isDraggingMap) {
      this.mapPanX = Math.max(-280, Math.min(280, mouseX - this.mapDragStartX));
      this.mapPanY = Math.max(-160, Math.min(160, mouseY - this.mapDragStartY));
      return;
    }

    // Check node hover
    const panX = this.mapPanX || 0;
    const panY = this.mapPanY || 0;
    for (let key in this.WORLD_MAP) {
      const room = this.WORLD_MAP[key];
      const nodeX = room.mapX + panX;
      const nodeY = room.mapY + panY;
      if (
        mouseX >= nodeX - 47 && mouseX <= nodeX + 47 &&
        mouseY >= nodeY - 24 && mouseY <= nodeY + 24
      ) {
        if (this.selectedMapRoomId !== key) {
          this.selectedMapRoomId = key;
        }
        break;
      }
    }
  }

  handleMapMouseUp(e) {
    this.isDraggingMap = false;
  }

  handleMapWheel(e) {
    if (this.gameState !== "MAP") return;
    e.preventDefault();
    this.mapPanX = Math.max(-280, Math.min(280, (this.mapPanX || 0) - e.deltaX * 0.4));
    this.mapPanY = Math.max(-160, Math.min(160, (this.mapPanY || 0) - e.deltaY * 0.4));
  }

  handleMapClick(e) {
    // Handled in handleMapMouseDown for responsiveness
  }

  fastTravelToSelectedRoom() {
    const targetRoomId = this.selectedMapRoomId || this.currentRoomId;
    const room = this.WORLD_MAP[targetRoomId];
    if (!this.roomsDiscovered[targetRoomId]) {
      this.showNotification("⚠️ ไม่สามารถวาร์ปได้: ยังไม่ได้สำรวจพื้นที่นี้!", "#ff5555");
      return;
    }
    this.sound.playCorrect();
    this.loadRoom(targetRoomId, 120);
    this.toggleMapUI();
    this.showNotification(`⚡ วาร์ปมายัง: ${room ? (room.nameTh || room.name) : "เกาะลอยฟ้า"}!`, "#00f5d4");
  }

  drawMapUI() {
    const ctx = this.ctx;
    const cw = 960;
    const ch = 540;
    const panX = this.mapPanX || 0;
    const panY = this.mapPanY || 0;

    // Dark high-tech blueprint / starry sky backdrop
    ctx.fillStyle = "rgba(7, 12, 24, 0.96)";
    ctx.fillRect(0, 0, cw, ch);

    // Subtle coordinate grid with panning
    ctx.strokeStyle = "rgba(35, 55, 95, 0.35)";
    ctx.lineWidth = 1;
    const startX = ((panX % 40) + 40) % 40;
    for (let x = startX; x < cw; x += 40) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, ch); ctx.stroke();
    }
    const startY = ((panY % 40) + 40) % 40;
    for (let y = startY; y < ch; y += 40) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(cw, y); ctx.stroke();
    }

    // Circuit Pathways between nodes (drawn with pan offset)
    for (let key in this.WORLD_MAP) {
      const room = this.WORLD_MAP[key];
      if (room.connections) {
        for (let targetKey of room.connections) {
          const target = this.WORLD_MAP[targetKey];
          if (!target) continue;

          const isDisc = this.roomsDiscovered[key] && this.roomsDiscovered[targetKey];
          const rx = room.mapX + panX;
          const ry = room.mapY + panY;
          const tx = target.mapX + panX;
          const ty = target.mapY + panY;

          ctx.beginPath();
          ctx.strokeStyle = isDisc ? "rgba(79, 172, 254, 0.75)" : "rgba(60, 75, 100, 0.35)";
          ctx.lineWidth = isDisc ? 3 : 1.5;
          ctx.moveTo(rx, ry);
          
          const midX = (rx + tx) / 2;
          ctx.lineTo(midX, ry);
          ctx.lineTo(midX, ty);
          ctx.lineTo(tx, ty);
          ctx.stroke();

          // Junction energy dot
          ctx.fillStyle = isDisc ? "#00f5d4" : "#4a5568";
          ctx.beginPath();
          ctx.arc(midX, ry, 3, 0, Math.PI * 2);
          ctx.arc(midX, ty, 3, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }

    // Draw Room Nodes
    for (let key in this.WORLD_MAP) {
      const room = this.WORLD_MAP[key];
      const isCurrent = (key === this.currentRoomId);
      const isSelected = (key === this.selectedMapRoomId);
      const isDiscovered = this.roomsDiscovered[key];

      const nw = 94;
      const nh = 48;
      const nx = room.mapX + panX - nw / 2;
      const ny = room.mapY + panY - nh / 2;

      // Node Box Backdrop
      ctx.fillStyle = isDiscovered ? (isCurrent ? "#16325c" : "#0f1c33") : "#0a111e";
      ctx.fillRect(nx, ny, nw, nh);

      // Node Border
      if (isCurrent) {
        const pulse = (Math.sin(this.mapAnimTimer * 4) + 1) * 0.5;
        ctx.strokeStyle = `rgba(254, 228, 64, ${0.8 + pulse * 0.2})`;
        ctx.lineWidth = 3;
      } else if (isSelected) {
        ctx.strokeStyle = "#00f5d4";
        ctx.lineWidth = 2.5;
      } else {
        ctx.strokeStyle = isDiscovered ? (room.color || "#4facfe") : "#253348";
        ctx.lineWidth = 1.5;
      }
      ctx.strokeRect(nx, ny, nw, nh);

      // Node Header Accent Bar
      ctx.fillStyle = isDiscovered ? (room.color || "#4facfe") : "#253348";
      ctx.fillRect(nx, ny, nw, 4);

      // Line 1: Icon + Short Thai Name (Fits inside 94px)
      ctx.fillStyle = isDiscovered ? (isCurrent ? "#fee440" : "#ffffff") : "#64748b";
      ctx.font = "bold 11px 'Prompt', 'Kanit', 'Chakra Petch', sans-serif";
      ctx.textAlign = "center";
      const icon = room.icon || "🌱";
      const labelTh = room.shortNameTh || room.nameTh || "เขตลึกลับ";
      ctx.fillText(`${icon} ${labelTh}`, room.mapX + panX, ny + 17);

      // Line 2: Short English Name
      ctx.fillStyle = isDiscovered ? "#38bdf8" : "#3e4c5e";
      ctx.font = "9px 'Prompt', 'Kanit', 'Chakra Petch', sans-serif";
      const labelEn = room.shortNameEn || room.name || "Unknown Zone";
      ctx.fillText(labelEn, room.mapX + panX, ny + 29);

      // Line 3: Feature Badges (Altars, Items, Boss)
      if (isDiscovered) {
        let badgeStr = "";
        if (room.altars && room.altars.length) badgeStr += "🕯️";
        if (room.equipment && room.equipment.length) badgeStr += "⚔️";
        if (room.items && room.items.length) badgeStr += "📦";
        if (room.boss && room.boss !== "-") badgeStr += "💀";
        ctx.font = "8px 'Prompt', 'Kanit', 'Chakra Petch', sans-serif";
        ctx.fillText(badgeStr, room.mapX + panX, ny + 41);
      }

      // Player Location Pin
      if (isCurrent) {
        ctx.fillStyle = "#fee440";
        ctx.font = "bold 11px 'Prompt', 'Kanit', 'Chakra Petch', sans-serif";
        ctx.fillText("📍 YOU", room.mapX + panX, ny - 6);
      }
    }

    // RIGHT PANEL: AREA INSPECTION CARD (แผงตรวจสอบข้อมูลพื้นที่)
    // Only rendered if this.showMapSidebar is true!
    if (this.showMapSidebar) {
      const selRoom = this.WORLD_MAP[this.selectedMapRoomId || this.currentRoomId];
      if (selRoom) {
        const isDiscovered = this.roomsDiscovered[selRoom.id];
        const pw = 280;
        const ph = 460;
        const px = cw - pw - 16;
        const py = 46;

        // Frosted glass card backdrop
        ctx.fillStyle = "rgba(11, 19, 36, 0.94)";
        ctx.strokeStyle = selRoom.color || "#00f5d4";
        ctx.lineWidth = 2;
        ctx.fillRect(px, py, pw, ph);
        ctx.strokeRect(px, py, pw, ph);

        // Header Bar
        ctx.fillStyle = selRoom.color || "#4facfe";
        ctx.fillRect(px, py, pw, 44);

        // Header Title (Separate English & Thai lines to avoid any overflow)
        ctx.fillStyle = "#000000";
        ctx.font = "bold 12px 'Prompt', 'Kanit', 'Chakra Petch', sans-serif";
        ctx.textAlign = "left";
        ctx.fillText(selRoom.name, px + 12, py + 18);

        ctx.fillStyle = "#1e293b";
        ctx.font = "bold 11px 'Prompt', 'Kanit', 'Chakra Petch', sans-serif";
        ctx.fillText(selRoom.nameTh, px + 12, py + 34);

        // Close [X] Button on Header
        ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
        ctx.fillRect(px + pw - 28, py + 8, 22, 22);
        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 13px 'Prompt', 'Kanit', 'Chakra Petch', sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("✕", px + pw - 17, py + 23);

        if (isDiscovered) {
          ctx.fillStyle = "#94a3b8";
          ctx.font = "10px 'Prompt', 'Kanit', 'Chakra Petch', sans-serif";
          ctx.textAlign = "left";
          ctx.fillText(selRoom.subtitle, px + 12, py + 62);

          let curY = py + 84;

          // Section: Altars
          ctx.fillStyle = "#fee440";
          ctx.font = "bold 11px 'Prompt', 'Kanit', 'Chakra Petch', sans-serif";
          ctx.fillText("🕯️ จุดเซฟ / แท่นบูชา:", px + 12, curY);
          curY += 15;
          ctx.fillStyle = "#cbd5e1";
          ctx.font = "10px 'Prompt', 'Kanit', 'Chakra Petch', sans-serif";
          (selRoom.altars || []).forEach(a => { ctx.fillText("• " + a, px + 18, curY); curY += 13; });

          // Section: NPCs
          curY += 4;
          ctx.fillStyle = "#4facfe";
          ctx.font = "bold 11px 'Prompt', 'Kanit', 'Chakra Petch', sans-serif";
          ctx.fillText("👤 ผู้พำนัก / NPC:", px + 12, curY);
          curY += 15;
          ctx.fillStyle = "#cbd5e1";
          ctx.font = "10px 'Prompt', 'Kanit', 'Chakra Petch', sans-serif";
          (selRoom.npcs || []).forEach(n => { ctx.fillText("• " + n, px + 18, curY); curY += 13; });

          // Section: Equipment & Spells
          curY += 4;
          ctx.fillStyle = "#e71d36";
          ctx.font = "bold 11px 'Prompt', 'Kanit', 'Chakra Petch', sans-serif";
          ctx.fillText("⚔️ อุปกรณ์ & ทักษะ:", px + 12, curY);
          curY += 15;
          ctx.fillStyle = "#cbd5e1";
          ctx.font = "10px 'Prompt', 'Kanit', 'Chakra Petch', sans-serif";
          const allEquip = [...(selRoom.equipment || []), ...(selRoom.spells || [])];
          allEquip.slice(0, 3).forEach(e => { ctx.fillText("• " + e, px + 18, curY); curY += 13; });

          // Section: Key Items
          curY += 4;
          ctx.fillStyle = "#00f5d4";
          ctx.font = "bold 11px 'Prompt', 'Kanit', 'Chakra Petch', sans-serif";
          ctx.fillText("📦 ไอเทม & เมล็ดพันธุ์:", px + 12, curY);
          curY += 15;
          ctx.fillStyle = "#cbd5e1";
          ctx.font = "10px 'Prompt', 'Kanit', 'Chakra Petch', sans-serif";
          (selRoom.items || []).slice(0, 2).forEach(it => { ctx.fillText("• " + it, px + 18, curY); curY += 13; });

          // Section: Boss
          curY += 4;
          ctx.fillStyle = "#ff70a6";
          ctx.font = "bold 11px 'Prompt', 'Kanit', 'Chakra Petch', sans-serif";
          ctx.fillText("💀 บอสประจำโซน:", px + 12, curY);
          curY += 15;
          ctx.fillStyle = "#f87171";
          ctx.font = "10px 'Prompt', 'Kanit', 'Chakra Petch', sans-serif";
          ctx.fillText("• " + (selRoom.boss || "-"), px + 18, curY);

          // Fast Travel Button
          const btnY = py + ph - 44;
          ctx.fillStyle = "linear-gradient(180deg, #1e3c72, #2a5298)";
          ctx.fillStyle = "#2a5298";
          ctx.fillRect(px + 16, btnY, pw - 32, 32);
          ctx.strokeStyle = "#00f5d4";
          ctx.lineWidth = 1.5;
          ctx.strokeRect(px + 16, btnY, pw - 32, 32);

          ctx.fillStyle = "#ffffff";
          ctx.font = "bold 12px 'Prompt', 'Kanit', 'Chakra Petch', sans-serif";
          ctx.textAlign = "center";
          ctx.fillText("⚡ วาร์ปด่วน [T / ดับเบิลคลิก]", px + pw / 2, btnY + 20);

        } else {
          ctx.fillStyle = "#64748b";
          ctx.font = "14px 'Prompt', 'Kanit', 'Chakra Petch', sans-serif";
          ctx.textAlign = "center";
          ctx.fillText("ยังไม่ได้สำรวจพื้นที่นี้", px + pw / 2, py + ph / 2);
        }
      }
    }

    // TOP HEADER BAR & CONTROLS
    // Header Title
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 18px 'Prompt', 'Kanit', 'Chakra Petch', sans-serif";
    ctx.textAlign = "left";
    ctx.fillText("🗺️ เกาะที่ 1: เกาะแห่งพืชพรรณ (ISLAND 1: FLORA)", 20, 28);

    ctx.fillStyle = "#52b788";
    ctx.font = "11px 'Prompt', 'Kanit', 'Chakra Petch', sans-serif";
    ctx.fillText("แผนที่ด่าน (Sub-Map) • 12 เขตพื้นที่กสิกรรม (12 Eco-Zones)", 22, 42);

    // Top Right Buttons:
    // 1. Reset View [Key R]
    ctx.fillStyle = "rgba(20, 32, 55, 0.85)";
    ctx.fillRect(cw - 320, 12, 105, 26);
    ctx.strokeStyle = "#4facfe";
    ctx.lineWidth = 1;
    ctx.strokeRect(cw - 320, 12, 105, 26);
    ctx.fillStyle = "#94a3b8";
    ctx.font = "11px 'Prompt', 'Kanit', 'Chakra Petch', sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("🔄 รีเซ็ตมุม [R]", cw - 268, 29);

    // 2. Toggle Sidebar [Tab]
    ctx.fillStyle = this.showMapSidebar ? "rgba(42, 82, 152, 0.9)" : "rgba(20, 32, 55, 0.85)";
    ctx.fillRect(cw - 205, 12, 110, 26);
    ctx.strokeStyle = this.showMapSidebar ? "#fee440" : "#00f5d4";
    ctx.strokeRect(cw - 205, 12, 110, 26);
    ctx.fillStyle = this.showMapSidebar ? "#fee440" : "#00f5d4";
    ctx.font = "bold 11px 'Prompt', 'Kanit', 'Chakra Petch', sans-serif";
    ctx.fillText(this.showMapSidebar ? "✕ ซ่อนข้อมูล [Tab]" : "📖 ข้อมูลเกาะ [Tab]", cw - 150, 29);

    // 3. Close Map [Esc/M]
    ctx.fillStyle = "rgba(60, 20, 30, 0.85)";
    ctx.fillRect(cw - 85, 12, 70, 26);
    ctx.strokeStyle = "#e71d36";
    ctx.strokeRect(cw - 85, 12, 70, 26);
    ctx.fillStyle = "#ff8597";
    ctx.font = "bold 11px 'Prompt', 'Kanit', 'Chakra Petch', sans-serif";
    ctx.fillText("✕ ปิด [Esc]", cw - 50, 29);

    // BOTTOM LEGEND BAR
    ctx.fillStyle = "rgba(9, 15, 28, 0.92)";
    ctx.fillRect(16, ch - 36, cw - 32, 28);
    ctx.strokeStyle = "#2d6a4f";
    ctx.lineWidth = 1;
    ctx.strokeRect(16, ch - 36, cw - 32, 28);

    ctx.font = "11px 'Prompt', 'Kanit', 'Chakra Petch', sans-serif";
    ctx.textAlign = "left";
    ctx.fillStyle = "#94a3b8";
    ctx.fillText("📍 คุณอยู่ที่นี่ | 🖱️ ลากเมาส์เลื่อนแมพ | 🔍 หมุนล้อเลื่อนมุมมอง | [WASD/ลูกศร] เลือกเกาะ | [Tab] ซ่อน/แสดงข้อมูล | [T/ดับเบิลคลิก] วาร์ป | [M/Esc] ปิด", 24, ch - 18);
  }
}

window.TerraQuestSuperEngine = TerraQuestSuperEngine;
