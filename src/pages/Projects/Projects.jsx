import styles from './Projects.module.css';

// ------- Data (replace image URLs with your own) -------
const PROJECTS = [
  {
    id: 1,
    title: 'Autonomous Drone Swarm for Crop Monitoring',
    description: 'A multi‑agent AI system using deep reinforcement learning to coordinate autonomous drones for precision agriculture, reducing water usage by 30%.',
    image: '/images/projects/drone-swarm.jpg',  // 👈 replace with your local path
    tech: ['Python', 'TensorFlow', 'ROS', 'C++'],
    link: 'https://example.com/drone-swarm',
  },
  {
    id: 2,
    title: 'Real‑time Sign Language Recognition Glove',
    description: 'A wearable glove with flexible sensors that translates American Sign Language into speech and text in real‑time using embedded machine learning.',
    image: '/images/projects/sign-glove.jpg',
    tech: ['TensorFlow Lite', 'Arduino', 'C++', 'Bluetooth'],
    link: 'https://example.com/sign-glove',
  },
  {
    id: 3,
    title: 'EduChain — Blockchain Credential Verification',
    description: 'A decentralized platform for issuing and verifying academic credentials using Ethereum smart contracts, ensuring tamper‑proof records.',
    image: '/images/projects/educhain.jpg',
    tech: ['Solidity', 'React', 'Node.js', 'IPFS'],
    link: 'https://example.com/educhain',
  },
  {
    id: 4,
    title: 'Arabic‑English Simultaneous Neural Translation',
    description: 'A transformer‑based neural machine translation system optimized for low‑resource Arabic dialects, achieving state‑of‑the‑art BLEU scores.',
    image: '/images/projects/neural-translate.jpg',
    tech: ['PyTorch', 'Transformers', 'NLP', 'Hugging Face'],
    link: 'https://example.com/neural-translate',
  },
  {
    id: 5,
    title: 'Smart Traffic Management using Computer Vision',
    description: 'Real‑time traffic flow analysis and adaptive signal control using YOLOv8 and edge computing, reducing congestion by 25% in simulation.',
    image: '/images/projects/traffic-mgmt.jpg',
    tech: ['Python', 'YOLO', 'OpenCV', 'Flask'],
    link: 'https://example.com/traffic-mgmt',
  },
  {
    id: 6,
    title: 'Mental Health Chatbot with Sentiment Analysis',
    description: 'An empathetic AI chatbot that detects emotional state via text and offers coping strategies, built with Rasa and Hugging Face models.',
    image: '/images/projects/health-bot.jpg',
    tech: ['Rasa', 'Transformers', 'Python', 'React'],
    link: 'https://example.com/health-bot',
  },
];

export default function Projects() {
  return (
    <div className={styles.page}>
      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles['hero-inner']}>
          <div className={styles.eyebrow}>
            <span className={styles.icon}>🚀</span> Showcase
          </div>
          <h1 className={styles['hero-title']}>
            Final Year <span className={styles.highlight}>Projects</span>
          </h1>
          <p className={styles['hero-desc']}>
            Discover the groundbreaking work of our final‑year students across AI, robotics, blockchain, and more.
          </p>
        </div>
      </section>

      {/* GRID */}
      <section className={styles.grid}>
        <div className={styles['grid-inner']}>
          <div className={styles['cards-grid']}>
            {PROJECTS.map(project => (
              <div key={project.id} className={styles.card}>
                <div className={styles['card-image-wrap']}>
                  <img
                    src={project.image}
                    alt={project.title}
                    className={styles['card-image']}
                    loading="lazy"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = ''; // or a placeholder image
                      e.target.parentElement.style.background = '#e2e8f0';
                      e.target.parentElement.innerHTML = `<span style="color:#94a3b8;font-size:14px;">No image</span>`;
                    }}
                  />
                </div>
                <div className={styles['card-body']}>
                  <h3 className={styles['card-title']}>{project.title}</h3>
                  <p className={styles['card-desc']}>{project.description}</p>
                  <div className={styles['card-tech']}>
                    {project.tech.map(tech => (
                      <span key={tech} className={styles['tech-pill']}>{tech}</span>
                    ))}
                  </div>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles['card-link']}
                  >
                    View Project →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}