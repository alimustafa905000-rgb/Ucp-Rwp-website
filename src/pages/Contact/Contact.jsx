import { useRef, useState } from 'react';
import { useReveal } from '../../hooks/useScrollEffects';
import styles from './Contact.module.css';

export default function Contact() {
  useReveal();
  const formRef = useRef(null);
  const [charCount, setCharCount] = useState(0);

  function handleMessageInput(e) {
    let value = e.target.value;
    if (value.length > 500) {
      value = value.slice(0, 500);
      e.target.value = value;
    }
    setCharCount(value.length);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const form = formRef.current;
    const name = form.elements['name'].value.trim();
    const email = form.elements['email'].value.trim();
    const message = form.elements['message'].value.trim();

    if (!name || !email || !message) {
      alert('Please fill in all required fields (Name, Email, Message).');
      return;
    }

    const subject = form.elements['subject'].value;
    const body =
      `Name: ${name}\nEmail: ${email}\nPhone: ${form.elements['phone'].value}\n` +
      `City: ${form.elements['city'].value}\nInterest: ${form.elements['interest'].value}\nMessage:\n${message}`;

    window.location.href = `mailto:syedashahnoor1412@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    alert('Your email client will open with a pre-filled message. Please review and send.');
  }

  return (
    <div className={styles['page-wrapper']}>
      <section className={styles.hero}>
        {/* <div className={styles['blob-1']}></div>
        <div className={styles['blob-2']}></div>
        <div className={styles['blob-3']}></div> */}
        <div className={styles['hero-inner']}>
          <div className={styles.eyebrow}>
            <span className={styles.icon}>✉️</span> GET IN TOUCH
          </div>
          <h1>Contact Us</h1>
          <p>Get in touch with UCP Rawalpindi for admissions, program details, and all academic inquiries.</p>
        </div>
      </section>

      <div className={styles['contact-body']}>
        <div className={styles['contact-inner']}>
          <div className={`${styles['form-card']} reveal reveal-up`}>
            <h2>Send Us a Message</h2>
            <form ref={formRef} onSubmit={handleSubmit} noValidate>
              <div className={styles['form-row']}>
                <div className={styles['form-group']}>
                  <label>Full Name <span>*</span></label>
                  <input type="text" name="name" placeholder="Your full name" required />
                </div>
                <div className={styles['form-group']}>
                  <label>Email <span>*</span></label>
                  <input type="email" name="email" placeholder="you@example.com" required />
                </div>
              </div>
              <div className={styles['form-row']}>
                <div className={styles['form-group']}>
                  <label>Phone</label>
                  <input type="tel" name="phone" placeholder="+1 (555) 000-0000" />
                </div>
                <div className={styles['form-group']}>
                  <label>City</label>
                  <input type="text" name="city" placeholder="Your city" />
                </div>
              </div>
              <div className={styles['form-row']}>
                <div className={`${styles['form-group']} ${styles.full}`}>
                  <label>Academic Interest</label>
                  <select name="interest" defaultValue="">
                    <option value="" disabled>Select a program area</option>
                    <option>Computer Science</option>
                    <option>Business Administration</option>
                    <option>Engineering</option>
                    <option>Social Sciences</option>
                    <option>Arts &amp; Design</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>
              <div className={styles['form-row']}>
                <div className={`${styles['form-group']} ${styles.full}`}>
                  <label>Message <span>*</span></label>
                  <textarea name="message" placeholder="Tell us how we can help..." onInput={handleMessageInput} required></textarea>
                  <div className={styles['char-note']}><span>{charCount}</span> / 500 characters</div>
                </div>
              </div>
              <input type="hidden" name="subject" value="New Contact Form Submission from UCP Website" readOnly />
              <button type="submit" className={styles['btn-send']}>Send Message ✉️</button>
            </form>
          </div>

          <div className={styles['info-stack']}>
            <div className={`${styles['info-card']} reveal reveal-right`} style={{ transitionDelay: '0.1s' }}>
              <div className={`${styles['info-icon']} ${styles['icon-blue-bg']}`}>📍</div>
              <h3>University Address</h3>
              <p>D-464 6th road Rawalpindi, Pakistan, <br />46000</p>
            </div>
            <div className={`${styles['info-card']} reveal reveal-right`} style={{ transitionDelay: '0.2s' }}>
              <div className={`${styles['info-icon']} ${styles['icon-red-bg']}`}>📞</div>
              <h3>Phone &amp; Email</h3>
              <p>(051) 4421672<br />syedashahnoor1412@gmail.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
