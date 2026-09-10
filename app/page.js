import Link from "next/link";
import Image from "next/image";
import styles from "../styles/landing.module.css";
import Navbar from "../components/landing/Navbar";
import ParticlesCanvas from "../components/landing/ParticlesCanvas";
import { AnimatedCounter, Reveal } from "../components/landing/Animations";
import HeroButtons from "../components/landing/HeroButtons";

export default function Home() {
  return (
    <>
      <Navbar />

      <section className={styles.hero} id="hero">
        <div className={styles.heroBg}>
          <Image 
            src="/images/hero_bg.png" 
            alt="Harvest Frontier Landscape" 
            fill 
            style={{ objectFit: 'cover' }}
            priority
          />
        </div>
        <ParticlesCanvas />

        <div className={styles.heroContent}>
          <div className={styles.heroBadge}>🎮 เกมการเรียนรู้เกษตรกรรม</div>
          <h1 className={styles.heroTitle}>
            ผจญภัยสู่โลก<br />
            <span className={styles.highlight}>เกษตรกรรม</span>
            <span className={styles.highlightGreen}>แห่งอนาคต</span>
          </h1>
          <p className={styles.heroDesc}>
            เรียนรู้ความรู้ด้านเกษตรกรรมผ่านการผจญภัยอันน่าตื่นเต้น
            ต่อสู้กับบอสแห่งความไม่รู้ พิชิต 3 เกาะ เก็บสะสมความรู้ไปด้วยกัน!
          </p>
          <HeroButtons />
        </div>

        <div className={styles.scrollIndicator}>
          <div className={styles.scrollMouse}></div>
          <span>เลื่อนลง</span>
        </div>
      </section>

      <section className={styles.section} id="about">
        <div className={styles.sectionInner}>
          <Reveal>
            <span className={styles.sectionLabel}>เกี่ยวกับเกม</span>
            <h2 className={styles.sectionTitle}>เกมที่ช่วยให้คุณ<br/>เรียนรู้เกษตรกรรมอย่างสนุก</h2>
            <p className={styles.sectionDesc}>
              Harvest Frontier คือเกมผจญภัยแนว RPG ที่ออกแบบมาเพื่อให้ผู้เล่นได้เรียนรู้ความรู้ด้านเกษตรกรรมไปพร้อมๆ กับความสนุก
              ผ่านการสำรวจเกาะ ตอบคำถาม และต่อสู้กับบอส
            </p>
          </Reveal>

          <div className={styles.aboutGrid}>
            <Reveal type="revealLeft">
              <div className={styles.aboutImage}>
                <Image 
                  src="/images/hero_bg.png" 
                  alt="Harvest Frontier Gameplay" 
                  width={600} 
                  height={400} 
                  style={{ width: '100%', height: 'auto' }} 
                />
              </div>
            </Reveal>
            
            <Reveal type="revealRight">
              <div className={styles.aboutText}>
                <h3>🌱 เรียนรู้ผ่านการผจญภัย</h3>
                <p>
                  สำรวจ 3 เกาะลึกลับ แต่ละเกาะเต็มไปด้วยความรู้ด้านเกษตรกรรมที่แตกต่างกัน
                  ตั้งแต่พื้นฐานการเพาะปลูก ไปจนถึงการจัดการศัตรูพืช
                </p>
                <p>
                  ทุกครั้งที่เจอ NPC คุณจะได้รับความรู้ใหม่ และเมื่อเจอบอส
                  คุณต้องใช้ความรู้ที่สะสมมาตอบคำถามเพื่อเอาชนะ!
                </p>

                <div className={styles.aboutStats}>
                  <div className={styles.statItem}>
                    <AnimatedCounter target={3} />
                    <span className={styles.statLabel}>เกาะผจญภัย</span>
                  </div>
                  <div className={styles.statItem}>
                    <AnimatedCounter target={60} suffix="+" />
                    <span className={styles.statLabel}>คำถามท้าทาย</span>
                  </div>
                  <div className={styles.statItem}>
                    <AnimatedCounter target={100} suffix="%" />
                    <span className={styles.statLabel}>สนุกสนาน</span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.featuresSection}`} id="features">
        <div className={styles.sectionInner}>
          <Reveal>
            <div style={{ textAlign: "center" }}>
              <span className={styles.sectionLabel}>จุดเด่นของเกม</span>
              <h2 className={styles.sectionTitle}>ทำไมต้อง Harvest Frontier?</h2>
              <p className={styles.sectionDesc} style={{ margin: "0 auto" }}>
                เกมที่ออกแบบมาเพื่อให้ความรู้เกษตรกรรมเป็นเรื่องสนุก ด้วยฟีเจอร์หลากหลาย
              </p>
            </div>
          </Reveal>

          <div className={styles.featuresGrid}>
            <Reveal delayClass="delay1">
              <div className={styles.featureCard}>
                <div className={styles.featureIcon}>
                  <Image src="/images/feature_explore.png" alt="สำรวจเกาะ" width={80} height={80} />
                </div>
                <h3>🗺️ สำรวจ 3 เกาะ</h3>
                <p>
                  ผจญภัยไปในเกาะเกษตรกรรม เกาะพืชพรรณ และเกาะฤดูกาล
                  แต่ละเกาะมีเนื้อเรื่องและความรู้เฉพาะตัว
                </p>
              </div>
            </Reveal>

            <Reveal delayClass="delay2">
              <div className={styles.featureCard}>
                <div className={styles.featureIcon}>
                  <Image src="/images/feature_learn.png" alt="เรียนรู้ความรู้" width={80} height={80} />
                </div>
                <h3>📚 สะสมความรู้</h3>
                <p>
                  รวบรวมความรู้ด้านเกษตรลงในสมุดบันทึก
                  จากการพูดคุยกับ NPC และการผจญภัยในแต่ละพื้นที่
                </p>
              </div>
            </Reveal>

            <Reveal delayClass="delay3">
              <div className={styles.featureCard}>
                <div className={styles.featureIcon}>
                  <Image src="/images/feature_challenge.png" alt="ต่อสู้กับบอส" width={80} height={80} />
                </div>
                <h3>⚔️ ท้าทายบอส</h3>
                <p>
                  ปราบบอส "ปีศาจแห่งความไม่รู้" ด้วยการตอบคำถามเกษตรกรรม
                  ยิ่งตอบถูกมาก ยิ่งได้ถ้วยรางวัลสูง!
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.ctaSection}`} id="cta">
        <Reveal>
          <div className={styles.ctaBox}>
            <h2>พร้อมที่จะเริ่มผจญภัยหรือยัง? 🌾</h2>
            <p>สมัครสมาชิกฟรี แล้วเริ่มต้นการเดินทางสู่โลกเกษตรกรรมแห่งอนาคต</p>
            <Link href="/auth/register" className={styles.btnCta}>
              ✨ เริ่มต้นใช้งานเลย
            </Link>
          </div>
        </Reveal>
      </section>

      <footer className={styles.landingFooter}>
        <p>© 2026 <Link href="/">Harvest Frontier</Link> — เกมเรียนรู้เกษตรกรรมแห่งอนาคต 🌾</p>
      </footer>
    </>
  );
}
