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
       DATABASE: FULL 35 QUESTIONS & PROGRESSION
       ============================================================================== */
const MASTER_DATABASE = {
  islands: [
    {
      id: 1,
      name: "เกาะแห่งพืชพรรณและปฐพี",
      bossName: "ร่างจำแลง : ปีศาจปฐพีแปรปรวน",
      questions: [
        {
          q: "ดินที่มีค่า pH ต่ำกว่า 7 จัดเป็นดินประเภทใดในทางเกษตร?",
          options: [
            "A) ดินด่าง",
            "B) ดินกรด (เปรี้ยว)",
            "C) ดินเค็ม",
            "D) ดินทราย",
          ],
          correct: 1,
          exp: "ดินที่มีค่า pH < 7 คือดินกรด (ดินเปรี้ยว)",
        },
        {
          q: "ดินที่เหมาะสมกับการปลูกพืชทั่วไปส่วนใหญ่ควรมีค่า pH ช่วงใด?",
          options: [
            "A) 3.0 - 4.5",
            "B) 6.0 - 7.0",
            "C) 8.5 - 10.0",
            "D) 1.0 - 2.0",
          ],
          correct: 1,
          exp: "ช่วง pH 6.0 - 7.0 แร่ธาตุจะละลายให้พืชดูดซึมได้สมดุลที่สุด",
        },
        {
          q: "หากดินมีสภาพเป็นกรดจัด ควรใช้วัสดุใดในการปรับปรุงดิน?",
          options: [
            "A) ปุ๋ยเคมีเข้มข้น",
            "B) ขี้เถ้าเปียก",
            "C) ปูนขาว (โดโลไมท์)",
            "D) ผงกำมะถัน",
          ],
          correct: 2,
          exp: "ปูนขาวหรือโดโลไมท์มีคุณสมบัติเป็นด่าง ช่วยลดความเป็นกรดได้ดี",
        },
        {
          q: "องค์ประกอบของดินสมบูรณ์ ควรมีสัดส่วนของ 'อินทรียวัตถุ' กี่เปอร์เซ็นต์?",
          options: ["A) 45%", "B) 25%", "C) 5%", "D) 50%"],
          correct: 2,
          exp: "ดินอุดมคติประกอบด้วย: แร่ธาตุ 45%, น้ำ 25%, อากาศ 25%, อินทรียวัตถุ 5%",
        },
        {
          q: "ดินชนิดใดอุ้มน้ำได้ดีมาก แต่น้ำและอากาศถ่ายเทได้ยากที่สุด?",
          options: ["A) ดินทราย", "B) ดินร่วน", "C) ดินเหนียว", "D) ดินลูกรัง"],
          correct: 2,
          exp: "ดินเหนียวเนื้อละเอียด แน่น อุ้มน้ำสูงแต่ระบายอากาศแย่",
        },
        {
          q: "หากต้องการเพิ่มความโปร่งและการระบายน้ำในดินเหนียว ควรผสมสิ่งใด?",
          options: [
            "A) แกลบดิบและทรายหยาบ",
            "B) โคลนตม",
            "C) น้ำตาล",
            "D) ปูนซีเมนต์",
          ],
          correct: 0,
          exp: "แกลบและทรายช่วยสร้างช่องว่างอากาศในดินเหนียว",
        },
        {
          q: "ช่วงเวลารดน้ำต้นไม้ที่เหมาะสมที่สุดเพื่อลดการระเหยและกันเชื้อรา?",
          options: [
            "A) เช้าตรู่ (06:00 - 08:00 น.)",
            "B) เที่ยงตรง",
            "C) บ่ายแดดจัด",
            "D) กลางดึก",
          ],
          correct: 0,
          exp: "รดน้ำเช้าตรู่ พืชสังเคราะห์แสงได้เต็มที่และใบแห้งไว ไม่ขังจนเกิดรา",
        },
        {
          q: "การไถบ่มดินหรือตากดินก่อนปลูกมีประโยชน์หลักอย่างไร?",
          options: [
            "A) ให้ดินแห้งสนิท",
            "B) ฆ่าเชื้อโรคในดินและกระตุ้นจุลินทรีย์",
            "C) ทำลายเมล็ดพันธุ์",
            "D) เปลี่ยนสีดิน",
          ],
          correct: 1,
          exp: "การตากดินช่วยกำจัดเชื้อราและไข่แมลงศัตรูพืชในดิน",
        },
        {
          q: "ในเนื้อดินร่วนอุดมคติ มีสัดส่วนของ 'แร่ธาตุอนินทรีย์' ประมาณเท่าใด?",
          options: ["A) 10%", "B) 25%", "C) 45%", "D) 80%"],
          correct: 2,
          exp: "แร่ธาตุอนินทรีย์คิดเป็น 45% ของดินที่สมบูรณ์",
        },
        {
          q: "กระดาษลิตมัสวัดดินเปลี่ยนเป็นสีแดงเข้ม แสดงว่าดินเป็นอย่างไร?",
          options: ["A) กรดแก่", "B) เป็นกลาง", "C) ด่างแก่", "D) ชื้นสมบูรณ์"],
          correct: 0,
          exp: "สีแดงเข้มบ่งบอกถึงสภาพความเป็นกรดรุนแรง",
        },
      ],
    },
    {
      id: 2,
      name: "เกาะแห่งฤดูกาล",
      bossName: "ร่างจำแลง : ปีศาจสภาพอากาศวิปริต",
      questions: [
        {
          q: "พืชตระกูลใดเหมาะสำหรับปลูกบำรุงดินในช่วงพักแปลงระหว่างฤดู?",
          options: [
            "A) พืชหัว",
            "B) พืชตระกูลถั่ว",
            "C) ไม้ยืนต้น",
            "D) หญ้าคา",
          ],
          correct: 1,
          exp: "พืชตระกูลถั่วมีปมรากช่วยตรึงไนโตรเจนบำรุงดิน",
        },
        {
          q: "ในฤดูร้อนที่มีสภาพแห้งแล้ง ควรเลือกปลูกพืชทนแล้งชนิดใด?",
          options: [
            "A) ข้าวโพดและมันสำปะหลัง",
            "B) ผักกาดหอม",
            "C) สตรอว์เบอร์รี",
            "D) บัวบก",
          ],
          correct: 0,
          exp: "มันสำปะหลังและข้าวโพดมีรากลึก ทนแล้งและใช้น้ำน้อย",
        },
        {
          q: "พืชประเภทใดต้องการอากาศหนาวเย็นในการเจริญเติบโต?",
          options: [
            "A) อ้อย",
            "B) มะพร้าว",
            "C) สตรอว์เบอร์รีและกะหล่ำ",
            "D) กระบองเพชร",
          ],
          correct: 2,
          exp: "พืชเมืองหนาวต้องการความเย็นเพื่อกระตุ้นการสร้างตาดอก",
        },
        {
          q: "ปัญหาสำคัญที่สุดของการทำเกษตรในฤดูฝนชุกคืออะไร?",
          options: [
            "A) ขาดแสงแดด",
            "B) โรครากเน่าและเชื้อราระบาด",
            "C) ดินแตกระแหง",
            "D) หน้าดินร้อนจัด",
          ],
          correct: 1,
          exp: "น้ำขังทำให้รากขาดอากาศ และความชื้นสูงเอื้อต่อเชื้อรา",
        },
        {
          q: "การคลุมหน้าดินด้วยฟางข้าวในฤดูร้อนมีประโยชน์เพื่ออะไร?",
          options: [
            "A) ดักแมลง",
            "B) รักษาความชื้นและลดความร้อนหน้าดิน",
            "C) กันน้ำท่วม",
            "D) เร่งสีใบ",
          ],
          correct: 1,
          exp: "ฟางช่วยบังแดดไม่ให้น้ำระเหยออกจากหน้าดิน",
        },
        {
          q: "ผักกินใบชนิดใดเน่าเปื่อยง่ายที่สุดเมื่อโดนฝนตกชุกต่อเนื่อง?",
          options: ["A) มันเทศ", "B) ผักชีและต้นหอม", "C) ตะไคร้", "D) ข่า"],
          correct: 1,
          exp: "ผักชีและต้นหอมใบบอบบาง ช้ำและเน่าง่ายมากในฤดูฝน",
        },
        {
          q: "การปลูกพืชหมุนเวียนสลับฤดูกาลมีประโยชน์สูงสุดในเรื่องใด?",
          options: [
            "A) ตัดวงจรโรคและแมลงในดิน",
            "B) กันพายุ",
            "C) เร่งให้พืชกลายพันธุ์",
            "D) เพิ่มพื้นที่ดิน",
          ],
          correct: 0,
          exp: "ช่วยตัดวงจรชีวิตของแมลงและโรคพืชประจำถิ่น",
        },
        {
          q: "พืชทนแล้งมีลักษณะเด่นทางสรีรวิทยาอย่างไร?",
          options: [
            "A) ใบกว้างบาง",
            "B) ใบลดรูป มีไขเคลือบหนา และรากลึก",
            "C) ลำต้นกลวง",
            "D) รากสั้นอยู่ผิวดิน",
          ],
          correct: 1,
          exp: "เคลือบไขลดคายน้ำและมีรากลึกช่วยหาน้ำใต้ดิน",
        },
        {
          q: "ช่วงปลายฝนต้นหนาว เหมาะกับการเตรียมแปลงปลูกพืชกลุ่มใด?",
          options: [
            "A) ข้าวนาปรัง",
            "B) ผักสลัดและพืชเมืองหนาว",
            "C) พืชชอบน้ำท่วม",
            "D) ยางพารา",
          ],
          correct: 1,
          exp: "ความชื้นเริ่มลด อากาศเย็น เหมาะกับผักสลัดเมืองหนาว",
        },
        {
          q: "การยกร่องแปลงให้สูงขึ้น มีความสำคัญสูงสุดในฤดูกาลใด?",
          options: ["A) ฤดูหนาว", "B) ฤดูแล้ง", "C) ฤดูฝน", "D) ฤดูเก็บเกี่ยว"],
          correct: 2,
          exp: "การยกร่องสูงช่วยระบายน้ำขัง ป้องกันรากเน่าในฤดูฝน",
        },
      ],
    },
    {
      id: 3,
      name: "เกาะแห่งศัตรูพืชและโรคพืช",
      bossName: "ร่างจำแลง : ปีศาจศัตรูพืชกลืนกิน",
      questions: [
        {
          q: "แมลงชนิดใดจัดเป็น 'แมลงตัวห้ำ' ช่วยกินเพลี้ยอ่อน?",
          options: [
            "A) แมลงเต่าทอง",
            "B) หนอนใยผัก",
            "C) เพลี้ยกระโดด",
            "D) แมลงหวี่ขาว",
          ],
          correct: 0,
          exp: "แมลงเต่าทองกินเพลี้ยอ่อนเป็นอาหารหลักตามธรรมชาติ",
        },
        {
          q: "อาการใบหงิกงอ มียางเหนียวและเกิดราดำ มักเกิดจากศัตรูพืชกลุ่มใด?",
          options: [
            "A) ฝูงหนูนา",
            "B) เพลี้ยอ่อนและแมลงปากดูด",
            "C) นกพิราบ",
            "D) ไส้เดือนดิน",
          ],
          correct: 1,
          exp: "แมลงปากดูดจะดูดน้ำเลี้ยงและถ่ายมูลหวานจนเกิดราดำ",
        },
        {
          q: "โรค 'รากเน่าโคนเน่า' ระบาดได้ดีที่สุดในสภาพแวดล้อมแบบใด?",
          options: [
            "A) ดินแฉะน้ำขังความชื้นสูง",
            "B) แดดจัดดินแห้ง",
            "C) หนาวแห้งแล้ง",
            "D) แปลงลมโปร่ง",
          ],
          correct: 0,
          exp: "เชื้อรากลุ่ม Phytophthora เจริญเติบโตได้ดีเยี่ยมในน้ำขัง",
        },
        {
          q: "วิธีป้องกันหนูกัดแทะผลผลิตในยุ้งฉางโดยไม่ใช้สารเคมีอันตราย?",
          options: [
            "A) ฉีดยาฆ่าหญ้า",
            "B) ปิดอุดรอยรั่ว ทำความสะอาด และใช้กับดักกล",
            "C) ขังน้ำในพื้น",
            "D) ปลูกหญ้ารก",
          ],
          correct: 1,
          exp: "สุขอนามัยและการปิดช่องทางเข้าช่วยกันหนูได้ยั่งยืน",
        },
        {
          q: "วัชพืชสร้างความเสียหายให้พืชหลักในแปลงเกษตรอย่างไร?",
          options: [
            "A) แย่งอาหาร แสงแดด น้ำ และสะสมโรค",
            "B) ดินแน่นเกินไป",
            "C) เร่งให้พืชโตผิดปกติ",
            "D) ดูดพิษลงดิน",
          ],
          correct: 0,
          exp: "วัชพืชแย่งอาหาร น้ำ และแสงแดดของพืชหลักทั้งหมด",
        },
        {
          q: "'ตัวเบียน' (Parasitoid) ควบคุมประชากรหนอนศัตรูพืชอย่างไร?",
          options: [
            "A) แย่งกินใบ",
            "B) วางไข่ในตัวหนอนเพื่อให้ตัวอ่อนกินจากภายใน",
            "C) กัดรากพืช",
            "D) ย่อยใบไม้แห้ง",
          ],
          correct: 1,
          exp: "แตนเบียนฝังไข่ในหนอนและตัวอ่อนจะกินหนอนจนตาย",
        },
        {
          q: "สารสกัดสมุนไพรธรรมชาติยอดนิยมที่ใช้ขับไล่หนอนและแมลงคือ?",
          options: [
            "A) น้ำเชื่อม",
            "B) น้ำหมักสะเดาและน้ำส้มควันไม้",
            "C) น้ำมันพืช",
            "D) น้ำปูนใส",
          ],
          correct: 1,
          exp: "สะเดามีสารอะซาดิแรคตินทำให้หนอนเบื่ออาหารและไม่ลอกคราบ",
        },
        {
          q: "แผล 'วงกลมสีน้ำตาลซ้อนกันคล้ายเป้าตาวัว' เป็นสัญญาณของโรคใด?",
          options: [
            "A) พืชขาดน้ำ",
            "B) โรคเชื้อรา (ใบจุดอัลเทอร์นาเรีย)",
            "C) สัตว์กัดแทะ",
            "D) ดินเค็มจัด",
          ],
          correct: 1,
          exp: "รอยแผลวงซ้อนเกิดจากการขยายตัวของเชื้อราบนใบ",
        },
        {
          q: "วิธีกำจัดวัชพืชและเมล็ดวัชพืชก่อนเตรียมแปลงโดยไม่ใช้สารเคมี?",
          options: [
            "A) โรยเกลือ",
            "B) ไถตากดินและคลุมพลาสติกอบความร้อน",
            "C) ปล่อยน้ำท่วม",
            "D) ใส่ปุ๋ยเข้มข้น",
          ],
          correct: 1,
          exp: "การอบความร้อนใต้พลาสติกช่วยทำลายเมล็ดวัชพืชในดิน",
        },
        {
          q: "ไส้เดือนฝอยศัตรูพืชเข้าทำลายส่วนใดจนเกิดอาการ 'ปมราก'?",
          options: ["A) ดอกไม้", "B) ยอดอ่อน", "C) ระบบราก", "D) เกสร"],
          correct: 2,
          exp: "ไส้เดือนฝอยชอนไชเซลล์รากจนปูดพอง ส่งผลให้ดูดอาหารไม่ได้",
        },
        {
          q: "การปลูกต้นดาวเรืองแซมรอบแปลงผัก ช่วยเรื่องใด?",
          options: [
            "A) รากยับยั้งไส้เดือนฝอยและกลิ่นไล่แมลง",
            "B) บังเงาแดด",
            "C) ดึงดูดหนู",
            "D) เพิ่มกรด",
          ],
          correct: 0,
          exp: "รากดาวเรืองหลั่งสารที่เป็นพิษต่อไส้เดือนฝอยศัตรูพืช",
        },
        {
          q: "โรคใบด่าง (Mosaic Virus) มีแมลงชนิดใดเป็นพาหะนำโรคสำคัญ?",
          options: [
            "A) แมลงปอ",
            "B) เพลี้ยอ่อนและแมลงหวี่ขาว",
            "C) หนอนกระทู้",
            "D) มดดำ",
          ],
          correct: 1,
          exp: "แมลงปากดูดจะนำพาเชื้อไวรัสไปสู่ต้นสมบูรณ์",
        },
        {
          q: "ในแปลงนาข้าวระยะต้นกล้า ศัตรูพืชชนิดใดกัดกินต้นกล้าใต้น้ำ?",
          options: ["A) ตั๊กแตน", "B) หอยเชอรี่", "C) ด้วงเต่า", "D) ปลวก"],
          correct: 1,
          exp: "หอยเชอรี่กินต้นข้าวอ่อนรวดเร็วมากในสภาพน้ำท่วมขัง",
        },
        {
          q: "การตัดแต่งกิ่งทรงพุ่มให้โปร่งช่วยป้องกันโรคพืชได้อย่างไร?",
          options: [
            "A) ลดความชื้นสะสม ให้แดดส่องและลมผ่าน",
            "B) ทำให้รากใหญ่",
            "C) ล่อแมลง",
            "D) ช่วยให้อุ้มน้ำ",
          ],
          correct: 0,
          exp: "ความโปร่งลดความชื้นทำให้สปอร์เชื้อราไม่งอก",
        },
        {
          q: "กับดักฟีโรโมน (Pheromone Trap) ใช้ประโยชน์หลักอย่างไร?",
          options: [
            "A) ทำลายวัชพืช",
            "B) ล่อดักจับแมลงตัวเต็มวัยเพื่อตัดวงจรผสมพันธุ์",
            "C) ไล่นก",
            "D) เร่งผลสุก",
          ],
          correct: 1,
          exp: "ล่อผีเสื้อตัวเต็มวัยมาติดกับดักเพื่อตัดวงจรขยายพันธุ์",
        },
      ],
    },
  ],
};

/* ==============================================================================
       SUPER MEGA ENGINE CONTROLLER (STATE, MINIGAMES & RENDERING)
       ============================================================================== */
class TerraQuestSuperEngine {
  constructor() {
    this.canvas = document.getElementById("gameCanvas");
    this.ctx = this.canvas.getContext("2d");
    this.ctx.imageSmoothingEnabled = false;

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
        name: "Holy Chapel",
        nameTh: "วิหารศักดิ์สิทธิ์",
        subtitle: "Starting Sanctum & Altar of Origin",
        theme: "sanctum",
        color: "#4facfe",
        width: 1800,
        mapX: 65, mapY: 280,
        altars: ["Holy Chapel Altar (แท่นบูชาศักดิ์สิทธิ์)"],
        npcs: ["Vendetta (แม่มดสาว)", "Target Dummy"],
        poi: ["Weapon Enhancing Worktable (โต๊ะตีบวก)"],
        equipment: ["Witch's Blade (ดาบแม่มด)", "Heroic Ring (แหวนวีรชน)"],
        spells: ["Witch's Gun", "Darting Lightning"],
        items: ["Sanctuary Potion", "Power Fragment x1"],
        boss: "-",
        connections: ["abandoned_village"],
        entities: [
          {
            type: "npc", id: "vendetta", x: 350, y: 392, width: 32, height: 48,
            name: "Vendetta", icon: "🧙‍♀️", gender: "farmer_f",
            dialogue: [
              "ยินดีต้อนรับสู่ Holy Chapel... วิหารแห่งเดียวที่ยังคงความบริสุทธิ์ไว้ได้",
              "ดินแดนภายนอกกำลังลุกไหม้ด้วยความบ้าคลั่งของศาสนจักรและเหล่าปีศาจ",
              "หากเจ้าพร้อม จงก้าวผ่านประตูบานขวา เข้าสู่ Abandoned Village เพื่อเริ่มต้นการเดินทาง!",
              "อย่าลืมกด [M] เพื่อเปิดดูโครงข่ายแผนที่โลกแห่งรัตติกาลได้ตลอดเวลา"
            ]
          },
          {
            type: "altar", id: "altar_holy", x: 750, y: 380, width: 44, height: 60,
            name: "Holy Chapel Altar", icon: "🕯️"
          },
          {
            type: "item", id: "item_witch_blade", x: 1100, y: 405, width: 28, height: 28,
            name: "Witch's Blade", icon: "⚔️", desc: "ดาบเวทมนตร์ของแม่มด เพิ่มพลังโจมตีธาตุ"
          },
          {
            type: "portal", id: "portal_to_village", targetRoom: "abandoned_village", spawnX: 80,
            x: 1650, y: 350, width: 50, height: 90, name: "🚪 สู่ Abandoned Village", icon: "🚪"
          }
        ]
      },

      "abandoned_village": {
        id: "abandoned_village",
        name: "Abandoned Village",
        nameTh: "หมู่บ้านร้าง",
        subtitle: "Ruined District & Underground Caves",
        theme: "ruins",
        color: "#2ec4b6",
        width: 2600,
        mapX: 160, mapY: 280,
        altars: ["Under the Village", "Small Village Path"],
        npcs: ["Lost Villager (ชาวบ้านผู้รอดชีวิต)", "Incubator Ruins"],
        poi: ["Monster Cave", "Incubator", "Old Well"],
        equipment: ["Bone Club", "Witch's Claymore"],
        spells: ["Ground Thorns"],
        items: ["Witch's Velocity", "Power Fragment x2"],
        boss: "Amaglista (ปีศาจเงามืด)",
        connections: ["holy_chapel", "drawbridge"],
        entities: [
          {
            type: "portal", id: "portal_to_chapel", targetRoom: "holy_chapel", spawnX: 1550,
            x: 40, y: 350, width: 50, height: 90, name: "🚪 กลับ Holy Chapel", icon: "🚪"
          },
          {
            type: "npc", id: "villager", x: 500, y: 392, width: 32, height: 48,
            name: "ชาวบ้านผู้รอดชีวิต", icon: "👨‍🌾",
            dialogue: [
              "หมู่บ้านนี้ถูกทำลายจนหมดสิ้น... ดินในแปลงเพาะปลูกเน่าเปื่อยเป็นกรดรุนแรง",
              "หากต้องการฟื้นฟูดิน ต้องปรับค่า pH ให้อยู่ในช่วง 6.0 - 7.0 เท่านั้น!",
              "ข้างหน้านี้มีแปลงทดลองฟื้นฟูดินอยู่ ลองช่วยตรวจสอบทีนะ"
            ]
          },
          {
            type: "minigame_soil", id: "soil_patch", x: 1000, y: 400, width: 48, height: 40,
            name: "แปลงทดสอบดินกรด", icon: "🧪"
          },
          {
            type: "altar", id: "altar_village", x: 1500, y: 380, width: 44, height: 60,
            name: "Village Altar", icon: "🕯️"
          },
          {
            type: "item", id: "item_claymore", x: 1900, y: 405, width: 28, height: 28,
            name: "Witch's Claymore", icon: "🗡️", desc: "ดาบยักษ์ฟาดทำลายล้าง"
          },
          {
            type: "portal", id: "portal_to_drawbridge", targetRoom: "drawbridge", spawnX: 80,
            x: 2450, y: 350, width: 50, height: 90, name: "🚪 สู่ Drawbridge", icon: "🚪"
          }
        ]
      },

      "drawbridge": {
        id: "drawbridge",
        name: "Drawbridge",
        nameTh: "ป้อมสะพานชัก",
        subtitle: "Foreboding Entrance - Bridge District",
        theme: "storm",
        color: "#e71d36",
        width: 2600,
        mapX: 160, mapY: 130,
        altars: ["Bridge Entrance", "Bridge Refuge"],
        npcs: ["Old Watchman (คนเฝ้าสะพาน)"],
        poi: ["Dead Hand Victim", "Bridge Mechanism"],
        equipment: ["Witch's Claymore", "Arming Sword", "Skull Rapier"],
        spells: ["Ball Lightning", "Fireball"],
        items: ["Witch's Brew", "Power Fragment x1"],
        boss: "Giant Beast (อสูรเฝ้าสะพาน)",
        connections: ["abandoned_village", "rodenia_chapel", "buried_church"],
        entities: [
          {
            type: "portal", id: "portal_to_village", targetRoom: "abandoned_village", spawnX: 2350,
            x: 40, y: 350, width: 50, height: 90, name: "🚪 ลงสู่ Abandoned Village", icon: "🚪"
          },
          {
            type: "npc", id: "watchman", x: 600, y: 392, width: 32, height: 48,
            name: "คนเฝ้าสะพาน", icon: "🛡️",
            dialogue: [
              "พายุโหมกระหน่ำสะพานชักแห่งนี้มานานนับปี...",
              "สะพานนี้แยกทางออกเป็นสองสาย: ทางซ้ายบนไป Rodenia Chapel และทางขวาไป Buried Church!",
              "ระวังอสูรที่ซ่อนตัวอยู่ใต้สายฟ้าด้วยล่ะ!"
            ]
          },
          {
            type: "altar", id: "altar_bridge", x: 1200, y: 380, width: 44, height: 60,
            name: "Bridge Refuge Altar", icon: "🕯️"
          },
          {
            type: "minigame_season", id: "season_patch", x: 1500, y: 400, width: 48, height: 40,
            name: "🌾 แปลงทดลองรับมือภัยแล้ง", icon: "🌾"
          },
          {
            type: "portal", id: "portal_to_rodenia", targetRoom: "rodenia_chapel", spawnX: 80,
            x: 1800, y: 350, width: 50, height: 90, name: "🚪 สู่ Rodenia Chapel", icon: "🚪"
          },
          {
            type: "portal", id: "portal_to_buried", targetRoom: "buried_church", spawnX: 80,
            x: 2450, y: 350, width: 50, height: 90, name: "🚪 สู่ Buried Church", icon: "🚪"
          }
        ]
      },

      "rodenia_chapel": {
        id: "rodenia_chapel",
        name: "Rodenia Chapel",
        nameTh: "วิหารโรเดเนีย",
        subtitle: "Parish Church of the Sick",
        theme: "chapel",
        color: "#9b5de5",
        width: 2200,
        mapX: 265, mapY: 155,
        altars: ["Rodenia Chapel Altar", "Priest's Chamber"],
        npcs: ["Sister Beatrice (นักบวชหญิง)", "2 x Public Use Victims"],
        poi: ["Bloody Confessional", "Fallen Chandelier"],
        equipment: ["Vengeful Ring", "Meat Cleaver", "Fire Rod"],
        spells: ["Crimson Flare"],
        items: ["Crimson Ring", "Power Fragment x1"],
        boss: "Corrupted Priest (นักบวชนอกรีต)",
        connections: ["drawbridge", "buried_church"],
        entities: [
          {
            type: "portal", id: "portal_to_drawbridge", targetRoom: "drawbridge", spawnX: 1700,
            x: 40, y: 350, width: 50, height: 90, name: "🚪 กลับ Drawbridge", icon: "🚪"
          },
          {
            type: "npc", id: "sister_beatrice", x: 600, y: 392, width: 32, height: 48,
            name: "Sister Beatrice", icon: "🧕", gender: "farmer_f",
            dialogue: [
              "วิหารโรเดเนียเคยเป็นที่พักพิงของผู้ป่วย... บัดนี้แปดเปื้อนไปด้วยคำสาปโลหิต",
              "หากเจ้าตามหาแหวน Vengeful Ring มันถูกผนึกไว้ในวิหารใต้ดินข้างหน้านี้แล้ว"
            ]
          },
          {
            type: "altar", id: "altar_rodenia", x: 1100, y: 380, width: 44, height: 60,
            name: "Rodenia Altar", icon: "🕯️"
          },
          {
            type: "minigame_sort", id: "sort_patch", x: 1300, y: 400, width: 48, height: 40,
            name: "🔀 แท่นจัดลำดับขั้นตอนเตรียมดิน", icon: "🔀"
          },
          {
            type: "item", id: "item_crimson_ring", x: 1500, y: 405, width: 28, height: 28,
            name: "Crimson Ring", icon: "💍", desc: "แหวนโลหิต เพิ่มพลังฟื้นฟูชีพ"
          },
          {
            type: "portal", id: "portal_to_buried", targetRoom: "buried_church", spawnX: 100,
            x: 2050, y: 350, width: 50, height: 90, name: "🚪 สู่ Buried Church", icon: "🚪"
          }
        ]
      },

      "buried_church": {
        id: "buried_church",
        name: "Buried Church",
        nameTh: "วิหารใต้ดินและคุกโบราณ",
        subtitle: "Underground Church Area & Dungeon Prison",
        theme: "catacombs",
        color: "#f15bb5",
        width: 2800,
        mapX: 370, mapY: 200,
        altars: ["Buried Chapel", "Chapel Parlors", "Prison Cell"],
        npcs: ["Captured Witch (แม่มดที่ถูกคุมขัง)", "Heretic Scholar"],
        poi: ["Underground Prison", "Torture Chamber"],
        equipment: ["Zweihander", "Royal Spear", "Heretic Crest"],
        spells: ["Light Wall", "Inquisitor's Shotgun", "Exploding Cross"],
        items: ["2 x Power Fragment", "Prison Iron Key"],
        boss: "Candle-Service Inquisitor (หัวหน้าผู้ไต่สวน)",
        connections: ["drawbridge", "rodenia_chapel", "ghost_town", "sewers"],
        entities: [
          {
            type: "portal", id: "portal_to_rodenia", targetRoom: "rodenia_chapel", spawnX: 1950,
            x: 40, y: 350, width: 50, height: 90, name: "🚪 สู่ Rodenia Chapel", icon: "🚪"
          },
          {
            type: "npc", id: "captured_witch", x: 600, y: 392, width: 32, height: 48,
            name: "Captured Witch", icon: "🧙‍♀️", gender: "farmer_f",
            dialogue: [
              "ขอบคุณที่ลงมาช่วยข้า... ทางแยกข้างหน้าสำคัญยิ่ง!",
              "ทางบนจะนำไปสู่ Ghost Town เมืองรัตติกาลอันตระการตา",
              "ส่วนทางล่างจะดิ่งลงสู่ Sewers ท่อระบายน้ำโบราณที่นำไปสู่หุบเหว Canyon!"
            ]
          },
          {
            type: "altar", id: "altar_buried", x: 1200, y: 380, width: 44, height: 60,
            name: "Buried Chapel Altar", icon: "🕯️"
          },
          {
            type: "minigame_pest", id: "pest_patch", x: 1600, y: 400, width: 48, height: 40,
            name: "🐛 แปลงทดสอบชีววิธีปราบศัตรูพืช", icon: "🐛"
          },
          {
            type: "portal", id: "portal_to_ghost_town", targetRoom: "ghost_town", spawnX: 80,
            x: 2000, y: 350, width: 50, height: 90, name: "🚪 ขึ้นสู่ Ghost Town", icon: "🚪"
          },
          {
            type: "portal", id: "portal_to_sewers", targetRoom: "sewers", spawnX: 80,
            x: 2650, y: 350, width: 50, height: 90, name: "🚪 ลงสู่ Sewers", icon: "🚪"
          }
        ]
      },

      "ghost_town": {
        id: "ghost_town",
        name: "Ghost Town",
        nameTh: "เมืองรัตติกาล",
        subtitle: "Nightless City Babylon & Witch's Alley",
        theme: "city",
        color: "#00bbf9",
        width: 2500,
        mapX: 475, mapY: 150,
        altars: ["Town Bridge", "Slum Altar", "Witch's House"],
        npcs: ["Illusive Merchant (พ่อค้าเร่)", "Blacksmith (ช่างตีเหล็ก)"],
        poi: ["Witch's House", "Abandoned Tavern"],
        equipment: ["Mortified Flesh", "Assassin Dagger"],
        spells: ["Witch's Prayer", "Shadow Step"],
        items: ["Iron Maiden Charm", "Power Fragment x1"],
        boss: "Nightless Stalker (นักล่าแห่งรัตติกาล)",
        connections: ["buried_church", "pilgrimage"],
        entities: [
          {
            type: "portal", id: "portal_to_buried", targetRoom: "buried_church", spawnX: 1900,
            x: 40, y: 350, width: 50, height: 90, name: "🚪 กลับ Buried Church", icon: "🚪"
          },
          {
            type: "npc", id: "merchant", x: 700, y: 392, width: 32, height: 48,
            name: "พ่อค้าเร่รัตติกาล", icon: "🧳",
            dialogue: [
              "ยินดีต้อนรับสู่ Ghost Town นครที่ไม่เคยหลับใหล!",
              "หากเจ้ามุ่งหน้าต่อไปทางขวา เจ้าจะพบกับ Pilgrimage เส้นทางแสวงบุญลอยฟ้า",
              "ซึ่งเชื่อมต่อไปยัง White Cathedral มหาวิหารสีขาวบนยอดฟ้า!"
            ]
          },
          {
            type: "altar", id: "altar_town", x: 1100, y: 380, width: 44, height: 60,
            name: "Town Bridge Altar", icon: "🕯️"
          },
          {
            type: "minigame_jigsaw", id: "jigsaw_patch", x: 1500, y: 400, width: 48, height: 40,
            name: "🧩 ปริศนาจับคู่ปัญหาเกษตร", icon: "🧩"
          },
          {
            type: "item", id: "item_assassin", x: 1800, y: 405, width: 28, height: 28,
            name: "Assassin Dagger", icon: "🗡️", desc: "มีดลอบสังหาร เพิ่มคริติคอล"
          },
          {
            type: "portal", id: "portal_to_pilgrimage", targetRoom: "pilgrimage", spawnX: 80,
            x: 2350, y: 350, width: 50, height: 90, name: "🚪 สู่ Pilgrimage", icon: "🚪"
          }
        ]
      },

      "sewers": {
        id: "sewers",
        name: "Sewers",
        nameTh: "ท่อระบายน้ำใต้พิภพ",
        subtitle: "Abandoned Lower Layer & Deep Drain",
        theme: "sewer",
        color: "#00f5d4",
        width: 2500,
        mapX: 475, mapY: 280,
        altars: ["Sewers Haven", "Deep Drain Altar"],
        npcs: ["Outcast Ratkin (มนุษย์หนู)"],
        poi: ["Submerged Cemetery", "Drainage Canal"],
        equipment: ["Poison Dagger", "Toxico Shield"],
        spells: ["Toxic Mist", "Acid Surge"],
        items: ["Power Fragment x1", "Rusty Valve Key"],
        boss: "Nightmare Weaver (แมงมุมกลืนวิญญาณ)",
        connections: ["buried_church", "canyon", "pilgrimage"],
        entities: [
          {
            type: "portal", id: "portal_to_buried", targetRoom: "buried_church", spawnX: 2550,
            x: 40, y: 350, width: 50, height: 90, name: "🚪 กลับ Buried Church", icon: "🚪"
          },
          {
            type: "npc", id: "ratkin", x: 650, y: 392, width: 32, height: 48,
            name: "Outcast Ratkin", icon: "🐀",
            dialogue: [
              "กี๊ซซซ... ที่นี่ช่างมืดมิดและเต็มไปด้วยน้ำพิษ",
              "ทางขวาบนทะลุขึ้นไป Pilgrimage ได้ ส่วนทางล่างจะพาเจ้าดิ่งสู่ Sunken Canyon!"
            ]
          },
          {
            type: "altar", id: "altar_sewers", x: 1250, y: 380, width: 44, height: 60,
            name: "Sewers Haven Altar", icon: "🕯️"
          },
          {
            type: "minigame_speed", id: "speed_patch", x: 1550, y: 400, width: 48, height: 40,
            name: "⚡ ซุ้มทดสอบความเร็ว Speed Blitz", icon: "⚡"
          },
          {
            type: "portal", id: "portal_to_canyon", targetRoom: "canyon", spawnX: 80,
            x: 1850, y: 350, width: 50, height: 90, name: "🚪 ดิ่งสู่ Sunken Canyon", icon: "🚪"
          },
          {
            type: "portal", id: "portal_to_pilgrimage", targetRoom: "pilgrimage", spawnX: 100,
            x: 2350, y: 350, width: 50, height: 90, name: "🚪 ขึ้นสู่ Pilgrimage", icon: "🚪"
          }
        ]
      },

      "pilgrimage": {
        id: "pilgrimage",
        name: "Pilgrimage",
        nameTh: "ทางแสวงบุญลอยฟ้า",
        subtitle: "Elevated Pilgrims Path & Grand Courtyard",
        theme: "skywalk",
        color: "#fee440",
        width: 3000,
        mapX: 590, mapY: 215,
        altars: ["Wild Altar", "Courtyard Haven"],
        npcs: ["Fallen Paladin (อัศวินผู้หลงทาง)"],
        poi: ["Statue of the Saint", "Broken Bell Tower"],
        equipment: ["Church Longsword", "Shepherd's Staff"],
        spells: ["Church Rifle", "Sacred Burst"],
        items: ["2 x Power Fragment", "Magic Chunk"],
        boss: "Possessed Paladin (พาลาดินต้องสาป)",
        connections: ["ghost_town", "sewers", "white_cathedral", "canyon", "laboratory", "lunar_gallery"],
        entities: [
          {
            type: "portal", id: "portal_to_ghost", targetRoom: "ghost_town", spawnX: 2250,
            x: 40, y: 350, width: 50, height: 90, name: "🚪 สู่ Ghost Town", icon: "🚪"
          },
          {
            type: "npc", id: "paladin", x: 700, y: 392, width: 32, height: 48,
            name: "Fallen Paladin", icon: "⚔️",
            dialogue: [
              "ข้าเคยสาบานว่าจะปกป้อง White Cathedral... บัดนี้มันถูกกลืนกินโดยแสงเทียม",
              "เส้นทางข้างหน้าแยกออกไปได้ถึง 4 เขต: White Cathedral ด้านบน, Laboratory และ Canyon ด้านล่าง, และ Lunar Gallery ลึกลับ!"
            ]
          },
          {
            type: "altar", id: "altar_pilgrim", x: 1300, y: 380, width: 44, height: 60,
            name: "Courtyard Haven Altar", icon: "🕯️"
          },
          {
            type: "portal", id: "portal_to_cathedral", targetRoom: "white_cathedral", spawnX: 80,
            x: 1900, y: 350, width: 50, height: 90, name: "🚪 ขึ้นสู่ White Cathedral", icon: "🚪"
          },
          {
            type: "portal", id: "portal_to_lab", targetRoom: "laboratory", spawnX: 80,
            x: 2400, y: 350, width: 50, height: 90, name: "🚪 ลงสู่ Laboratory", icon: "🚪"
          },
          {
            type: "portal", id: "portal_to_lunar", targetRoom: "lunar_gallery", spawnX: 80,
            x: 2850, y: 350, width: 50, height: 90, name: "🚪 สู่ Lunar Gallery", icon: "🚪"
          }
        ]
      },

      "canyon": {
        id: "canyon",
        name: "Sunken Canyon",
        nameTh: "หุบเขาอเวจี",
        subtitle: "Sinking Canyon Area & Jungle Bed",
        theme: "canyon",
        color: "#ff70a6",
        width: 2400,
        mapX: 590, mapY: 370,
        altars: ["Jungle Valley", "Abyss Bed"],
        npcs: ["Hermit of the Deep (ฤๅษีใต้หุบเหว)"],
        poi: ["Ancient Grotto", "Crystal Vein"],
        equipment: ["Tombstone", "Lightning Edge", "Speed Crest Ring"],
        spells: ["Earth Tremor"],
        items: ["Sage's Mark", "Pino Kpao", "4 x Power Fragment", "Power Chunk"],
        boss: "Ancient Golem (โกเลมศิลาโบราณ)",
        connections: ["sewers", "laboratory", "pilgrimage"],
        entities: [
          {
            type: "portal", id: "portal_to_sewers", targetRoom: "sewers", spawnX: 1750,
            x: 40, y: 350, width: 50, height: 90, name: "🚪 กลับ Sewers", icon: "🚪"
          },
          {
            type: "npc", id: "hermit", x: 600, y: 392, width: 32, height: 48,
            name: "ฤๅษีใต้หุบเหว", icon: "🧘",
            dialogue: [
              "ใต้ก้นหุบเหวนี้ มีห้องทดลองลับ Laboratory ซ่อนอยู่...",
              "พวกมันทำการทดลองที่ฝ่าฝืนกฎธรรมชาติ จงระวังหมอกพิษและสิ่งมีชีวิตดัดแปลง!"
            ]
          },
          {
            type: "altar", id: "altar_canyon", x: 1200, y: 380, width: 44, height: 60,
            name: "Jungle Valley Altar", icon: "🕯️"
          },
          {
            type: "item", id: "item_lightning_edge", x: 1650, y: 405, width: 28, height: 28,
            name: "Lightning Edge", icon: "⚡", desc: "ดาบสายฟ้า ฟันรวดเร็วทะลุเกราะ"
          },
          {
            type: "portal", id: "portal_to_lab", targetRoom: "laboratory", spawnX: 80,
            x: 2250, y: 350, width: 50, height: 90, name: "🚪 สู่ Laboratory", icon: "🚪"
          }
        ]
      },

      "laboratory": {
        id: "laboratory",
        name: "Laboratory",
        nameTh: "ห้องทดลองลับ",
        subtitle: "Underground Research Facility & Specimen Room",
        theme: "lab",
        color: "#70d6ff",
        width: 2400,
        mapX: 690, mapY: 370,
        altars: ["Prayer Room", "Incubator Lab"],
        npcs: ["Mad Alchemist (นักเล่นแร่แปรธาตุวิปลาส)"],
        poi: ["Stasis Pods", "Alchemy Cauldron"],
        equipment: ["Magic Seal", "Syringe Spear"],
        spells: ["Cursed Fog", "Gene Overload"],
        items: ["Wriggling Black Key", "2 x Power Fragment", "Power Chunk"],
        boss: "Chimera Homunculus (สิ่งมีชีวิตดัดแปลง)",
        connections: ["canyon", "pilgrimage"],
        entities: [
          {
            type: "portal", id: "portal_to_canyon", targetRoom: "canyon", spawnX: 2150,
            x: 40, y: 350, width: 50, height: 90, name: "🚪 สู่ Sunken Canyon", icon: "🚪"
          },
          {
            type: "npc", id: "alchemist", x: 650, y: 392, width: 32, height: 48,
            name: "Mad Alchemist", icon: "🧪",
            dialogue: [
              "ฮ่าๆๆ! กุญแจ Wriggling Black Key อยู่ที่นี่แล้ว!",
              "มันคือกุญแจที่เปิดทางเชื่อมต่อเข้าสู่ White Cathedral และ Lunar Gallery!"
            ]
          },
          {
            type: "altar", id: "altar_lab", x: 1200, y: 380, width: 44, height: 60,
            name: "Prayer Room Altar", icon: "🕯️"
          },
          {
            type: "item", id: "item_black_key", x: 1700, y: 405, width: 28, height: 28,
            name: "Wriggling Black Key", icon: "🗝️", desc: "กุญแจทมิฬดิ้นได้ ใช้ปลดล็อกประตูโบราณ"
          },
          {
            type: "portal", id: "portal_to_pilgrimage", targetRoom: "pilgrimage", spawnX: 2300,
            x: 2250, y: 350, width: 50, height: 90, name: "🚪 ขึ้นสู่ Pilgrimage", icon: "🚪"
          }
        ]
      },

      "white_cathedral": {
        id: "white_cathedral",
        name: "White Cathedral",
        nameTh: "มหาวิหารสีขาว",
        subtitle: "White Cathedral Garden & Sacred Rooftops",
        theme: "cathedral",
        color: "#ffffff",
        width: 2800,
        mapX: 690, mapY: 110,
        altars: ["Small Path", "Cathedral Roof", "Grand Altar"],
        npcs: ["High Priestess (หัวหน้านักบวชหญิง)", "Captive Maiden"],
        poi: ["Grand Choir", "Sunken Mausoleum", "Holy Scriptorium"],
        equipment: ["Clarity Ring", "Accuser Greatsword"],
        spells: ["Judgement Beam", "Holy Aura"],
        items: ["3 x Power Fragment", "4 x Power Chunk", "2 x Magic Chunk", "Magic Rock", "Rooftop Room Key"],
        boss: "Arch Inquisitor & Seraph (หัวหน้าศาสนจักร)",
        connections: ["pilgrimage", "lunar_gallery"],
        entities: [
          {
            type: "portal", id: "portal_to_pilgrimage", targetRoom: "pilgrimage", spawnX: 1800,
            x: 40, y: 350, width: 50, height: 90, name: "🚪 กลับ Pilgrimage", icon: "🚪"
          },
          {
            type: "npc", id: "priestess", x: 600, y: 392, width: 32, height: 48,
            name: "High Priestess", icon: "👑", gender: "farmer_f",
            dialogue: [
              "ผู้กล้า... เจ้ามาถึงจุดสูงสุดของ White Cathedral แล้ว",
              "ประตูบอสข้างหน้านี้ คือที่สถิตของปีศาจปฐพีแปรปรวนและหัวหน้าผู้ไต่สวน!",
              "หากเจ้าพร้อม จงก้าวเข้าสู่ประตูบอสเพื่อประลองปัญญาครั้งสุดท้าย!"
            ]
          },
          {
            type: "altar", id: "altar_cathedral", x: 1200, y: 380, width: 44, height: 60,
            name: "Grand Altar of Light", icon: "🕯️"
          },
          {
            type: "portal", id: "portal_boss", x: 1900, y: 350, width: 60, height: 90,
            name: "🌀 ประตูศึกบอส (Boss Battle)", icon: "🌀"
          },
          {
            type: "portal", id: "portal_to_lunar", targetRoom: "lunar_gallery", spawnX: 80,
            x: 2650, y: 350, width: 50, height: 90, name: "🚪 สู่ Lunar Gallery", icon: "🚪"
          }
        ]
      },

      "lunar_gallery": {
        id: "lunar_gallery",
        name: "Lunar Gallery",
        nameTh: "หอศิลป์จันทรา",
        subtitle: "Lunar Gallery & Unknown Mystical Lake",
        theme: "lunar",
        color: "#c77dff",
        width: 2500,
        mapX: 790, mapY: 245,
        altars: ["Gallery Entrance", "Gallery Roof", "Lake Shore"],
        npcs: ["The Moon Witch (แม่มดแห่งจันทรา)"],
        poi: ["Lunar Mirror", "Starlit Terrace", "Sunken Moon Shrine"],
        equipment: ["Giant Gadget", "Fool's Crest", "Saint's Crest", "Steel Ring"],
        spells: ["Heaven's Gate", "Lunar Eclipse", "Astral Comet"],
        items: ["Power Fragment", "Power Chunk", "2 x Magic Chunk", "Power Rock", "Lunar Key"],
        boss: "Lunar God's Avatar (ร่างอวตารเทวะจันทรา)",
        connections: ["white_cathedral", "pilgrimage"],
        entities: [
          {
            type: "portal", id: "portal_to_pilgrimage", targetRoom: "pilgrimage", spawnX: 2750,
            x: 40, y: 350, width: 50, height: 90, name: "🚪 สู่ Pilgrimage", icon: "🚪"
          },
          {
            type: "npc", id: "moon_witch", x: 650, y: 392, width: 32, height: 48,
            name: "The Moon Witch", icon: "🌙", gender: "farmer_f",
            dialogue: [
              "ยินดีต้อนรับสู่ Lunar Gallery... แดนสนธยาใต้แสงจันทร์นิรันดร์",
              "เจ้าได้เดินทางสำรวจครบทั้ง 12 เขตแห่งโลกนี้แล้ว ช่างเป็นวีรบุรุษที่แท้จริง!",
              "จงรับ Lunar Key และพลังแห่งจันทรา เพื่อนำไปปราบความมืดมิดทั้งปวง!"
            ]
          },
          {
            type: "altar", id: "altar_lunar", x: 1250, y: 380, width: 44, height: 60,
            name: "Lunar Gallery Altar", icon: "🕯️"
          },
          {
            type: "item", id: "item_lunar_key", x: 1700, y: 405, width: 28, height: 28,
            name: "Lunar Key", icon: "🗝️", desc: "กุญแจจันทราศักดิ์สิทธิ์ ปลดล็อกพลังเวทสูงสุด"
          },
          {
            type: "portal", id: "portal_to_cathedral", targetRoom: "white_cathedral", spawnX: 2550,
            x: 2350, y: 350, width: 50, height: 90, name: "🚪 สู่ White Cathedral", icon: "🚪"
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
      const modalChar = document.getElementById("modal-char-creation");
      if (modalChar) modalChar.classList.add("hidden");
      this.showNotification(`📍 เข้าสู่: ${room.name} - ${room.nameTh}`, "#4facfe");
    }
  }

  showNotification(text, color = "#ffdf6d") {
    this.notification = { text, color };
    this.notificationTimer = 180;
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
        if (e.code === "KeyM") {
          this.toggleMapUI();
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

    this.canvas.addEventListener("mousemove", (e) => {
      if (this.gameState === "MAP") {
        this.handleMapMouseMove(e);
      }
    });

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

       if (isHero && this.gameState === "PLAYING") {
         ctx.fillStyle = "#fee440";
         ctx.font = "bold 12px 'Chakra Petch'";
         ctx.textAlign = "center";
         ctx.fillText("👑 " + (this.player.name || "ผู้กล้า"), x + width / 2, y - 10);
       }
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
     if (isHero && this.gameState === "PLAYING") {
       ctx.fillStyle = "#fee440";
       ctx.font = "bold 12px 'Chakra Petch'";
       ctx.textAlign = "center";
       ctx.fillText("👑 " + (this.player.name || "ผู้กล้า"), x + width / 2, y - 10);
     }
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
    // If we have saved NPC appearances for this save slot, load and preserve them exactly!
    if (savedAppearances && Object.keys(savedAppearances).length > 0) {
      this.npcAppearances = { ...savedAppearances };
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
    // Exactly 7 costumes in the game
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

    // Shuffle NPCs and Costumes to give all 7 costumes to 7 distinct NPCs (1 per NPC)
    const shuffledNpcs = [...allNpcIds].sort(() => Math.random() - 0.5);
    const shuffledCostumes = [...costumes].sort(() => Math.random() - 0.5);

    this.npcAppearances = {};

    shuffledNpcs.forEach((npcId, idx) => {
      if (idx < shuffledCostumes.length) {
        // Every one of the 7 costumes is assigned to exactly 1 distinct NPC!
        this.npcAppearances[npcId] = {
          costume: shuffledCostumes[idx],
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
        // Remaining NPCs wear completely randomized combinations from the wardrobe
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
      ctx.font = "bold 13px 'Chakra Petch'";
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
    ctx.font = "bold 10px 'Chakra Petch'";
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
          this.sound.playCorrect();
          this.spawnParticles(ent.x + 22 - this.cameraX, ent.y + 20, "#fee440");
          this.showNotification(`🕯️ พักผ่อนที่ ${ent.name} - ฟื้นฟูพลังและบันทึกจุดเกิดแล้ว!`, "#fee440");
        } else if (ent.type === "item") {
          this.sound.playCoin();
          this.inventory.push({ id: ent.id, name: ent.name, icon: ent.icon, desc: ent.desc });
          this.spawnParticles(ent.x + 14 - this.cameraX, ent.y + 14, "#00f5d4");
          this.showNotification(`✨ ได้รับไอเทม: ${ent.name} (${ent.desc || ""})!`, "#00f5d4");
          this.entities = this.entities.filter(e => e !== ent);
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

  startBossBattle() {
    this.gameState = "BOSS_QUIZ";
    this.currentQuestionIdx = 0;
    this.bossHp = 100;
    document.getElementById("modal-boss-quiz").classList.remove("hidden");
    document.getElementById("boss-name-label").innerText =
      MASTER_DATABASE.islands[this.currentIslandIndex].bossName;
    document.getElementById("boss-hp-fill").style.width = "100%";
    document.getElementById("boss-hp-ghost").style.width = "100%";
    this.loadQuestion();
  }

  loadQuestion() {
    const island = MASTER_DATABASE.islands[this.currentIslandIndex];
    const q = island.questions[this.currentQuestionIdx];
    document.getElementById("quiz-question-index").innerText =
      `ข้อที่ ${this.currentQuestionIdx + 1} / ${island.questions.length}`;
    document.getElementById("quiz-question-text").innerText = q.q;
    document.getElementById("quiz-feedback-box").classList.add("hidden");

    const buttons = document.querySelectorAll(".choice-btn");
    buttons.forEach((btn, idx) => {
      btn.className = "choice-btn";
      btn.querySelector(".choice-label").innerText = q.options[idx];
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
    const island = MASTER_DATABASE.islands[this.currentIslandIndex];
    const q = island.questions[this.currentQuestionIdx];
    const buttons = document.querySelectorAll(".choice-btn");
    buttons.forEach((btn) => (btn.disabled = true));

    const fb = document.getElementById("quiz-feedback-box");
    const exp = document.getElementById("feedback-explanation");
    fb.classList.remove("hidden");

    if (choiceIdx === q.correct) {
      this.sound.playCorrect();
      this.bossCombo++;
      const comboBonus = this.bossCombo > 1 ? ` (🔥 Combo x${this.bossCombo}!)` : "";
      this.totalScore += this.bossCombo;
      if (buttons[choiceIdx]) buttons[choiceIdx].classList.add("correct-glow");
      fb.style.borderColor = "var(--hp-green)";
      exp.innerHTML = `<b style="color:var(--hp-green)">ถูกต้อง!${comboBonus}</b> ${q.exp}`;
      
      const dmg = (100 / island.questions.length) * (1 + (this.bossCombo - 1) * 0.2);
      this.bossHp = Math.max(0, this.bossHp - dmg);
      document.getElementById("boss-hp-fill").style.width = `${this.bossHp}%`;
      setTimeout(() => {
        document.getElementById("boss-hp-ghost").style.width =
          `${this.bossHp}%`;
      }, 200);
      this.spawnParticles(500, 200, "#2ec4b6");
      this.showToastFeedback(`💥 โจมตีบอสสำเร็จ! ${comboBonus}`, "success");
    } else {
      this.sound.playWrong();
      this.bossCombo = 0;
      if (buttons[choiceIdx]) buttons[choiceIdx].classList.add("wrong-glow");
      if (buttons[q.correct]) buttons[q.correct].classList.add("correct-glow");
      fb.style.borderColor = "var(--danger-crimson)";
      exp.innerHTML = `<b style="color:var(--danger-crimson)">ยังไม่ถูกต้อง!</b> ${q.exp}`;
      this.spawnParticles(500, 200, "#e71d36");
      this.showToastFeedback("⚠️ ตอบผิด! คอมโบลดเหลือ 0", "danger");
    }

    setTimeout(() => {
      this.currentQuestionIdx++;
      if (this.currentQuestionIdx < island.questions.length) {
        this.loadQuestion();
      } else {
        this.finishIsland();
      }
    }, 2200);
  }

  finishIsland() {
    document.getElementById("modal-boss-quiz").classList.add("hidden");
    if (this.currentIslandIndex < MASTER_DATABASE.islands.length - 1) {
      this.currentIslandIndex++;
      const next = MASTER_DATABASE.islands[this.currentIslandIndex];
      document.getElementById("hud-island-name").innerText = next.name;
      document.getElementById("hud-quest-text").innerText =
        "สำรวจเกาะและช่วยเหลือชาวบ้าน";
      this.loadRoom("holy_chapel");
      this.gameState = "PLAYING";
    } else {
      // Game Complete -> Show End Credits
      this.showEndCredits();
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

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

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

  drawThematicBackground(theme) {
    const ctx = this.ctx;
    const w = this.canvas.width;
    const h = this.canvas.height;

    if (theme === "sanctum") {
      // Holy Chapel: Deep midnight blue with holy light beam and stained glass
      ctx.fillStyle = "#0c1022";
      ctx.fillRect(0, 0, w, h);
      
      // Gothic arched pillars
      ctx.fillStyle = "#16203b";
      for (let i = 0; i < 8; i++) {
        const px = i * 220 - (this.cameraX * 0.2) % 220;
        ctx.fillRect(px, 40, 36, 400);
        ctx.beginPath();
        ctx.arc(px + 18, 50, 40, Math.PI, 0);
        ctx.fill();
      }

      // Holy light beam
      const beamGrad = ctx.createLinearGradient(150, 0, 350, 500);
      beamGrad.addColorStop(0, "rgba(255, 240, 180, 0.25)");
      beamGrad.addColorStop(1, "rgba(255, 240, 180, 0)");
      ctx.fillStyle = beamGrad;
      ctx.beginPath();
      ctx.moveTo(100, 0);
      ctx.lineTo(260, 0);
      ctx.lineTo(460, 540);
      ctx.lineTo(200, 540);
      ctx.fill();

    } else if (theme === "ruins") {
      // Abandoned Village: Ruined stone walls, foggy twilight
      ctx.fillStyle = "#12181c";
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = "#1d2830";
      for (let i = 0; i < 6; i++) {
        const rx = i * 280 - (this.cameraX * 0.25) % 280;
        ctx.fillRect(rx, 220, 120, 220);
        ctx.fillStyle = "#141c22";
        ctx.fillRect(rx + 20, 260, 30, 40);
        ctx.fillStyle = "#1d2830";
      }

    } else if (theme === "storm") {
      // Drawbridge: Lightning, dark stormy clouds, iron chains
      ctx.fillStyle = "#0d131a";
      ctx.fillRect(0, 0, w, h);
      
      // Thunder flash
      if (Math.random() < 0.03) {
        ctx.fillStyle = "rgba(200, 230, 255, 0.15)";
        ctx.fillRect(0, 0, w, h);
      }

      // Fortress battlements
      ctx.fillStyle = "#1c2530";
      for (let i = 0; i < 10; i++) {
        const bx = i * 160 - (this.cameraX * 0.2) % 160;
        ctx.fillRect(bx, 180, 80, 260);
      }

    } else if (theme === "chapel") {
      // Rodenia Chapel: Crimson tainted stained glass & velvet shadow
      ctx.fillStyle = "#1b0d18";
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = "#2e1428";
      for (let i = 0; i < 7; i++) {
        const cx = i * 200 - (this.cameraX * 0.2) % 200;
        ctx.fillRect(cx, 80, 50, 360);
      }

    } else if (theme === "catacombs") {
      // Buried Church: Underground vaulted arches, dungeon cages
      ctx.fillStyle = "#0f0c14";
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = "#221b2c";
      for (let i = 0; i < 8; i++) {
        const cx = i * 180 - (this.cameraX * 0.15) % 180;
        ctx.fillRect(cx, 120, 40, 320);
      }

    } else if (theme === "city") {
      // Ghost Town: Victorian street lamps, city skyline
      ctx.fillStyle = "#0c1524";
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = "#18263e";
      for (let i = 0; i < 8; i++) {
        const tx = i * 180 - (this.cameraX * 0.25) % 180;
        ctx.fillRect(tx, 140 + (i % 3) * 30, 110, 300);
      }

    } else if (theme === "sewer") {
      // Sewers: Green toxic glow, dripping mossy pipes
      ctx.fillStyle = "#091714";
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = "#132d26";
      for (let i = 0; i < 9; i++) {
        const sx = i * 150 - (this.cameraX * 0.2) % 150;
        ctx.fillRect(sx, 60, 60, 380);
      }

    } else if (theme === "skywalk") {
      // Pilgrimage: Floating clouds, celestial stone ramparts
      ctx.fillStyle = "#1a2238";
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = "rgba(255, 255, 255, 0.08)";
      for (let i = 0; i < 5; i++) {
        const cx = i * 300 - (this.cameraX * 0.1) % 300;
        ctx.beginPath();
        ctx.arc(cx + 80, 200, 70, 0, Math.PI * 2);
        ctx.arc(cx + 140, 180, 90, 0, Math.PI * 2);
        ctx.arc(cx + 200, 200, 70, 0, Math.PI * 2);
        ctx.fill();
      }

    } else if (theme === "canyon") {
      // Sunken Canyon: Deep purple-red cliffs & crystal formations
      ctx.fillStyle = "#1a0f1c";
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = "#2c1730";
      ctx.beginPath();
      ctx.moveTo(0, 440);
      for (let i = 0; i < 12; i++) {
        const qx = i * 120 - (this.cameraX * 0.2) % 120;
        ctx.lineTo(qx, 180 + (i % 2 === 0 ? 60 : -40));
      }
      ctx.lineTo(w, 440);
      ctx.fill();

    } else if (theme === "lab") {
      // Laboratory: Scientific green tanks & conduits
      ctx.fillStyle = "#0a1820";
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = "#112e3b";
      for (let i = 0; i < 7; i++) {
        const lx = i * 200 - (this.cameraX * 0.2) % 200;
        ctx.fillRect(lx, 100, 70, 340);
        ctx.fillStyle = "rgba(0, 245, 212, 0.15)";
        ctx.fillRect(lx + 10, 140, 50, 180);
        ctx.fillStyle = "#112e3b";
      }

    } else if (theme === "cathedral") {
      // White Cathedral: White marble arches, radiant sacred glow
      ctx.fillStyle = "#182030";
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = "#e2e8f0";
      for (let i = 0; i < 6; i++) {
        const mx = i * 240 - (this.cameraX * 0.2) % 240;
        ctx.fillRect(mx, 50, 40, 390);
        ctx.beginPath();
        ctx.arc(mx + 20, 60, 50, Math.PI, 0);
        ctx.stroke();
      }

    } else if (theme === "lunar") {
      // Lunar Gallery: Radiant giant moon & starry void
      ctx.fillStyle = "#090d1f";
      ctx.fillRect(0, 0, w, h);

      // Giant Moon
      const moonGrad = ctx.createRadialGradient(720, 120, 10, 720, 120, 80);
      moonGrad.addColorStop(0, "#ffffff");
      moonGrad.addColorStop(0.7, "#c77dff");
      moonGrad.addColorStop(1, "rgba(199, 125, 255, 0)");
      ctx.fillStyle = moonGrad;
      ctx.beginPath();
      ctx.arc(720, 120, 80, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  drawThematicGround(theme) {
    const ctx = this.ctx;
    const gx = 0 - this.cameraX;

    if (theme === "sanctum" || theme === "cathedral") {
      ctx.fillStyle = "#2c3e50";
      ctx.fillRect(gx, this.groundY, this.worldWidth, 100);
      ctx.fillStyle = "#bdc3c7";
      ctx.fillRect(gx, this.groundY, this.worldWidth, 10);
    } else if (theme === "sewer") {
      ctx.fillStyle = "#1b2d24";
      ctx.fillRect(gx, this.groundY, this.worldWidth, 100);
      ctx.fillStyle = "#00f5d4";
      ctx.fillRect(gx, this.groundY, this.worldWidth, 6);
    } else if (theme === "lunar") {
      ctx.fillStyle = "#1e1638";
      ctx.fillRect(gx, this.groundY, this.worldWidth, 100);
      ctx.fillStyle = "#9b5de5";
      ctx.fillRect(gx, this.groundY, this.worldWidth, 8);
    } else {
      ctx.fillStyle = "#3e2312";
      ctx.fillRect(gx, this.groundY, this.worldWidth, 100);
      ctx.fillStyle = "#2d6a4f";
      ctx.fillRect(gx, this.groundY, this.worldWidth, 12);
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
        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 13px 'Chakra Petch'";
        ctx.textAlign = "center";
        ctx.fillText(ent.name, rx + ent.width / 2, ent.y - 12);

      } else if (ent.type === "altar") {
        // Sacred Altar with candle flame
        ctx.fillStyle = "#4a5568";
        ctx.fillRect(rx, ent.y + 20, ent.width, ent.height - 20);
        ctx.fillStyle = "#ffd166";
        ctx.fillRect(rx + 8, ent.y + 10, ent.width - 16, 10);
        
        // Animated candle flame
        const flameBob = Math.sin((this.player.frameCount || 0) * 0.15) * 3;
        ctx.fillStyle = "#ff9f1c";
        ctx.beginPath();
        ctx.arc(rx + ent.width / 2, ent.y + 6 + flameBob, 6, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = "#fee440";
        ctx.font = "bold 12px 'Chakra Petch'";
        ctx.textAlign = "center";
        ctx.fillText("🕯️ " + ent.name, rx + ent.width / 2, ent.y - 8);

      } else if (ent.type === "item") {
        // Floating relic chest / item
        const itemBob = Math.sin((this.player.frameCount || 0) * 0.1) * 4;
        ctx.fillStyle = "#00f5d4";
        ctx.fillRect(rx, ent.y + itemBob, ent.width, ent.height);
        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = 2;
        ctx.strokeRect(rx, ent.y + itemBob, ent.width, ent.height);

        ctx.fillStyle = "#00f5d4";
        ctx.font = "bold 12px 'Chakra Petch'";
        ctx.textAlign = "center";
        ctx.fillText(ent.icon + " " + ent.name, rx + ent.width / 2, ent.y - 8 + itemBob);

      } else if (ent.type === "portal") {
        // Gothic Arch Portal
        const isBoss = (ent.id === "portal_boss");
        ctx.fillStyle = isBoss ? "#e71d36" : "#2a5298";
        ctx.fillRect(rx, ent.y, ent.width, ent.height);
        ctx.strokeStyle = isBoss ? "#ffd166" : "#4facfe";
        ctx.lineWidth = 3;
        ctx.strokeRect(rx, ent.y, ent.width, ent.height);

        ctx.fillStyle = isBoss ? "#ffd166" : "#70d6ff";
        ctx.font = "bold 13px 'Chakra Petch'";
        ctx.textAlign = "center";
        ctx.fillText(ent.name, rx + ent.width / 2, ent.y - 12);

      } else if (ent.type.startsWith("minigame")) {
        ctx.fillStyle = "#8d5b4c";
        ctx.fillRect(rx, ent.y, ent.width, ent.height);
        ctx.fillStyle = "#ffdf6d";
        ctx.font = "bold 12px 'Chakra Petch'";
        ctx.textAlign = "center";
        ctx.fillText(ent.name, rx + ent.width / 2, ent.y - 10);
      }

      // Interaction prompt
      const dist = Math.abs((this.player.x + this.player.width / 2) - (ent.x + ent.width / 2));
      if (dist < 65) {
        ctx.fillStyle = "#ffdf6d";
        ctx.font = "bold 14px 'Chakra Petch'";
        ctx.textAlign = "center";
        ctx.fillText("💬 กด [E]", rx + ent.width / 2, ent.y - 28);
      }
    }
  }

  drawNotificationBanner() {
    if (!this.notification) return;
    const ctx = this.ctx;
    ctx.save();
    ctx.fillStyle = "rgba(10, 15, 30, 0.88)";
    ctx.strokeStyle = this.notification.color || "#4facfe";
    ctx.lineWidth = 2;
    ctx.fillRect(200, 20, 560, 42);
    ctx.strokeRect(200, 20, 560, 42);

    ctx.fillStyle = this.notification.color || "#ffffff";
    ctx.font = "bold 15px 'Chakra Petch'";
    ctx.textAlign = "center";
    ctx.fillText(this.notification.text, 480, 46);
    ctx.restore();
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
    } else if (this.gameState === "PLAYING") {
      this.gameState = "MAP";
      this.selectedMapRoomId = this.currentRoomId;
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
    }
  }

  handleMapMouseMove(e) {
    const rect = this.canvas.getBoundingClientRect();
    const scaleX = this.canvas.width / rect.width;
    const scaleY = this.canvas.height / rect.height;
    const mouseX = (e.clientX - rect.left) * scaleX;
    const mouseY = (e.clientY - rect.top) * scaleY;

    for (let key in this.WORLD_MAP) {
      const room = this.WORLD_MAP[key];
      if (
        mouseX >= room.mapX - 42 && mouseX <= room.mapX + 42 &&
        mouseY >= room.mapY - 22 && mouseY <= room.mapY + 22
      ) {
        if (this.selectedMapRoomId !== key) {
          this.selectedMapRoomId = key;
        }
        break;
      }
    }
  }

  handleMapClick(e) {
    const rect = this.canvas.getBoundingClientRect();
    const scaleX = this.canvas.width / rect.width;
    const scaleY = this.canvas.height / rect.height;
    const mouseX = (e.clientX - rect.left) * scaleX;
    const mouseY = (e.clientY - rect.top) * scaleY;

    // Check fast travel button click on sidebar
    if (mouseX >= 650 && mouseX <= 930 && mouseY >= 440 && mouseY <= 480) {
      this.fastTravelToSelectedRoom();
      return;
    }

    // Check node clicks
    for (let key in this.WORLD_MAP) {
      const room = this.WORLD_MAP[key];
      if (
        mouseX >= room.mapX - 42 && mouseX <= room.mapX + 42 &&
        mouseY >= room.mapY - 22 && mouseY <= room.mapY + 22
      ) {
        this.selectedMapRoomId = key;
        if (this.sound) this.sound.playJump();
        break;
      }
    }
  }

  fastTravelToSelectedRoom() {
    const targetRoomId = this.selectedMapRoomId || this.currentRoomId;
    if (!this.roomsDiscovered[targetRoomId]) {
      this.showNotification("⚠️ ไม่สามารถวาร์ปได้: ยังไม่ได้สำรวจพื้นที่นี้!", "#ff5555");
      return;
    }
    this.sound.playCorrect();
    this.loadRoom(targetRoomId, 120);
    this.toggleMapUI();
    this.showNotification(`⚡ วาร์ปมายัง: ${this.WORLD_MAP[targetRoomId].name}!`, "#00f5d4");
  }

  drawMapUI() {
    const ctx = this.ctx;
    const cw = this.canvas.width;
    const ch = this.canvas.height;

    // Dark high-tech / gothic blueprint backdrop
    ctx.fillStyle = "rgba(7, 11, 22, 0.94)";
    ctx.fillRect(0, 0, cw, ch);

    // Subtle coordinate grid
    ctx.strokeStyle = "rgba(30, 50, 85, 0.35)";
    ctx.lineWidth = 1;
    for (let x = 0; x < cw; x += 40) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, ch); ctx.stroke();
    }
    for (let y = 0; y < ch; y += 40) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(cw, y); ctx.stroke();
    }

    // Main Title Header
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 20px 'Chakra Petch'";
    ctx.textAlign = "left";
    ctx.fillText("🗺️ WITCH'S NIGHT WORLD MAP / แผนที่โลกแห่งรัตติกาล", 24, 34);

    ctx.fillStyle = "#4facfe";
    ctx.font = "12px 'Chakra Petch'";
    ctx.fillText("Metroidvania Interconnected Exploration Network • 12 Zones", 26, 52);

    // Connecting Circuit Pathways between nodes
    for (let key in this.WORLD_MAP) {
      const room = this.WORLD_MAP[key];
      if (room.connections) {
        for (let targetKey of room.connections) {
          const target = this.WORLD_MAP[targetKey];
          if (!target) continue;

          const isDisc = this.roomsDiscovered[key] && this.roomsDiscovered[targetKey];
          ctx.beginPath();
          ctx.strokeStyle = isDisc ? "rgba(79, 172, 254, 0.75)" : "rgba(60, 75, 100, 0.4)";
          ctx.lineWidth = isDisc ? 3 : 1.5;
          ctx.moveTo(room.mapX, room.mapY);
          
          // Orthogonal/smooth path
          const midX = (room.mapX + target.mapX) / 2;
          ctx.lineTo(midX, room.mapY);
          ctx.lineTo(midX, target.mapY);
          ctx.lineTo(target.mapX, target.mapY);
          ctx.stroke();

          // Junction dot
          ctx.fillStyle = isDisc ? "#00f5d4" : "#4a5568";
          ctx.beginPath();
          ctx.arc(midX, room.mapY, 3, 0, Math.PI * 2);
          ctx.arc(midX, target.mapY, 3, 0, Math.PI * 2);
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

      const nw = 84;
      const nh = 46;
      const nx = room.mapX - nw / 2;
      const ny = room.mapY - nh / 2;

      // Node Box
      ctx.fillStyle = isDiscovered ? (isCurrent ? "#162f4f" : "#111d33") : "#0b121e";
      ctx.fillRect(nx, ny, nw, nh);

      // Node Border
      if (isCurrent) {
        const pulse = (Math.sin(this.mapAnimTimer * 4) + 1) * 0.5;
        ctx.strokeStyle = `rgba(254, 228, 64, ${0.7 + pulse * 0.3})`;
        ctx.lineWidth = 3;
      } else if (isSelected) {
        ctx.strokeStyle = "#00f5d4";
        ctx.lineWidth = 2.5;
      } else {
        ctx.strokeStyle = isDiscovered ? (room.color || "#4facfe") : "#2a3b53";
        ctx.lineWidth = 1.5;
      }
      ctx.strokeRect(nx, ny, nw, nh);

      // Node Header Bar
      ctx.fillStyle = isDiscovered ? (room.color || "#4facfe") : "#2a3b53";
      ctx.fillRect(nx, ny, nw, 5);

      // Room Title
      ctx.fillStyle = isDiscovered ? (isCurrent ? "#fee440" : "#ffffff") : "#5a6b82";
      ctx.font = "bold 10px 'Chakra Petch'";
      ctx.textAlign = "center";
      ctx.fillText(isDiscovered ? room.name : "???", room.mapX, room.mapY - 2);

      // Room Thai Title
      ctx.fillStyle = isDiscovered ? "#94a3b8" : "#3e4c5e";
      ctx.font = "9px 'Chakra Petch'";
      ctx.fillText(isDiscovered ? room.nameTh : "???", room.mapX, room.mapY + 10);

      // Badges (Altar, Equip, Items, Boss)
      if (isDiscovered) {
        let badgeStr = "";
        if (room.altars && room.altars.length) badgeStr += "🕯️";
        if (room.equipment && room.equipment.length) badgeStr += "⚔️";
        if (room.items && room.items.length) badgeStr += "📦";
        if (room.boss && room.boss !== "-") badgeStr += "💀";
        ctx.font = "8px 'Chakra Petch'";
        ctx.fillText(badgeStr, room.mapX, room.mapY + 19);
      }

      // Player Location Pin
      if (isCurrent) {
        ctx.fillStyle = "#fee440";
        ctx.font = "bold 11px 'Chakra Petch'";
        ctx.fillText("📍 YOU", room.mapX, ny - 6);
      }
    }

    // RIGHT PANEL: AREA INSPECTION CARD (แผงตรวจสอบข้อมูลพื้นที่)
    const selRoom = this.WORLD_MAP[this.selectedMapRoomId || this.currentRoomId];
    if (selRoom) {
      const isDiscovered = this.roomsDiscovered[selRoom.id];
      const px = 640;
      const py = 20;
      const pw = 300;
      const ph = 500;

      ctx.fillStyle = "rgba(13, 20, 36, 0.95)";
      ctx.strokeStyle = selRoom.color || "#4facfe";
      ctx.lineWidth = 2;
      ctx.fillRect(px, py, pw, ph);
      ctx.strokeRect(px, py, pw, ph);

      // Header Bar
      ctx.fillStyle = selRoom.color || "#4facfe";
      ctx.fillRect(px, py, pw, 32);

      ctx.fillStyle = "#000000";
      ctx.font = "bold 15px 'Chakra Petch'";
      ctx.textAlign = "left";
      ctx.fillText(selRoom.name + " (" + selRoom.nameTh + ")", px + 12, py + 22);

      if (isDiscovered) {
        ctx.fillStyle = "#94a3b8";
        ctx.font = "11px 'Chakra Petch'";
        ctx.fillText(selRoom.subtitle, px + 12, py + 52);

        let curY = py + 74;

        // Section: Altars
        ctx.fillStyle = "#fee440";
        ctx.font = "bold 12px 'Chakra Petch'";
        ctx.fillText("🕯️ Altars / จุดเซฟ:", px + 12, curY);
        curY += 16;
        ctx.fillStyle = "#cbd5e1";
        ctx.font = "11px 'Chakra Petch'";
        selRoom.altars.forEach(a => { ctx.fillText("• " + a, px + 20, curY); curY += 14; });

        // Section: NPCs
        curY += 4;
        ctx.fillStyle = "#4facfe";
        ctx.font = "bold 12px 'Chakra Petch'";
        ctx.fillText("👤 Inhabitants / ผู้พำนัก:", px + 12, curY);
        curY += 16;
        ctx.fillStyle = "#cbd5e1";
        ctx.font = "11px 'Chakra Petch'";
        selRoom.npcs.forEach(n => { ctx.fillText("• " + n, px + 20, curY); curY += 14; });

        // Section: Equipment & Spells
        curY += 4;
        ctx.fillStyle = "#e71d36";
        ctx.font = "bold 12px 'Chakra Petch'";
        ctx.fillText("⚔️ Equipment & Spells:", px + 12, curY);
        curY += 16;
        ctx.fillStyle = "#cbd5e1";
        ctx.font = "11px 'Chakra Petch'";
        const allEquip = [...(selRoom.equipment || []), ...(selRoom.spells || [])];
        allEquip.slice(0, 4).forEach(e => { ctx.fillText("• " + e, px + 20, curY); curY += 14; });

        // Section: Key Items
        curY += 4;
        ctx.fillStyle = "#00f5d4";
        ctx.font = "bold 12px 'Chakra Petch'";
        ctx.fillText("📦 Relics & Key Items:", px + 12, curY);
        curY += 16;
        ctx.fillStyle = "#cbd5e1";
        ctx.font = "11px 'Chakra Petch'";
        selRoom.items.slice(0, 3).forEach(it => { ctx.fillText("• " + it, px + 20, curY); curY += 14; });

        // Section: Boss
        curY += 4;
        ctx.fillStyle = "#ff70a6";
        ctx.font = "bold 12px 'Chakra Petch'";
        ctx.fillText("💀 Boss / บอสประจำโซน:", px + 12, curY);
        curY += 16;
        ctx.fillStyle = "#f87171";
        ctx.font = "11px 'Chakra Petch'";
        ctx.fillText("• " + selRoom.boss, px + 20, curY);

        // Fast Travel Button
        const btnY = py + ph - 48;
        ctx.fillStyle = "linear-gradient(180deg, #1e3c72, #2a5298)";
        ctx.fillStyle = "#2a5298";
        ctx.fillRect(px + 16, btnY, pw - 32, 34);
        ctx.strokeStyle = "#00f5d4";
        ctx.lineWidth = 1.5;
        ctx.strokeRect(px + 16, btnY, pw - 32, 34);

        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 13px 'Chakra Petch'";
        ctx.textAlign = "center";
        ctx.fillText("⚡ วาร์ปด่วน [T / คลิกที่นี่]", px + pw / 2, btnY + 22);

      } else {
        ctx.fillStyle = "#64748b";
        ctx.font = "14px 'Chakra Petch'";
        ctx.textAlign = "center";
        ctx.fillText("ยังไม่ได้สำรวจพื้นที่นี้", px + pw / 2, py + ph / 2);
      }
    }

    // BOTTOM LEGEND BAR
    ctx.fillStyle = "rgba(10, 15, 30, 0.88)";
    ctx.fillRect(16, ch - 38, 608, 30);
    ctx.strokeStyle = "#1e3255";
    ctx.strokeRect(16, ch - 38, 608, 30);

    ctx.font = "11px 'Chakra Petch'";
    ctx.textAlign = "left";
    ctx.fillStyle = "#94a3b8";
    ctx.fillText("📍 ตำแหน่งคุณ | 🕯️ แท่นเซฟ | ⚔️ อุปกรณ์ | 📦 ไอเทม | 💀 บอส | [M/Esc] ปิด | [T/Enter] วาร์ป", 26, ch - 19);
  }
}

window.TerraQuestSuperEngine = TerraQuestSuperEngine;
