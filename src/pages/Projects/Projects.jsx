import styles from './Projects.module.css';

 
const PROJECTS = [
  {
    id: 1,
    title: 'Plant Desease Detection System',
    description: 'Plant Disease Detection System  developed using Deep Learning(EfficientNETB4) and Transfer learning.The System identifies 39 plant disease classes from leaf images through a user-friendly web application,supporting early disease detection and smart agriculture.',
    image: '/images/team/plantdisease-img.jpeg',  // 👈 replace with your local path
    tech: ['Python', 'TensorFlow', 'Deep Learning ','Neural Networks','Agriculture','Computer vision ','EfficientNETB4', 'Transfer Learning'],
    link: 'https://example.com/drone-swarm',
  },
  {
    id: 2,
    title: 'Real‑time Sign Language Recognition Glove',
    description: '"Automated Seating Exam and Timetable Management" using postgresql, react and django. This system automatically generates seating plan and weekly timtable + room allocation',
    image: ' /images/team/exam-img.jpeg',
    tech: ['React ', 'Django', 'Postgresql'],
    link: 'https://example.com/sign-glove',
  },
  {
    id: 3,
    title: 'An End-to-End AI-powered content Detection Platform',
    description: 'Built Detectura, an end-to-end AI-powered content detection platform featuring both Web and Android applications.The platform provides AI text detection, OCR support, confidence scoring, sentence-level analysis, and detailed content insights.',
    image: ' /images/team/detect-img.jpeg',
    tech: ['Nextjs', 'Kotlin', 'FASTAPI', 'REST API','Machine learning'],
    link: 'https://example.com/educhain',
  },
  {
    id: 4,
    title: '2D Space Shooter ',
    description: ' A mission-based 2D  shooter developed in  Unity. Players navigate asteroid fields, manage a 3-hit health system, and destroy a primary target to complete the objective  Build with C# and Prefabs and enhanced with unity assets for 2D art, audio, and VFX. Features include pause menu, speed control, and arcade-style gameplay.',
    image: ' /images/team/shooter.jpeg',
    tech: ['C#', 'Unity Assets', 'Prefab'],
    link: 'https://example.com/neural-translate',
  },
  {
    id: 5,
    title: 'Smart Schedule Automation System',
    description: 'Smart Schedule Automation System is an intelligent timetable management solution that automatically generates conflict-free schedules by optimizing classrooms, instructors, subjects, and time slots, reducing manual effort and improving scheduling efficiency.',
    image: '/images/team/smart-img.jpeg',
    tech: ['Python', 'YOLO', 'OpenCV', 'Flask'],
    link: 'https://example.com/traffic-mgmt',
  },
  {
    id: 6,
    title: 'AI TRIP PLANNER',
    description: 'AI Trip Planner is an intelligent travel planning platform that creates personalized trip itineraries based on users destinations, budgets, interests, and travel dates. It recommends attractions, accommodations, restaurants, and transportation options while optimizing routes to save time and enhance the overall travel experience. ',
    image: '/images/team/aitrip-img.jpeg',
    tech: ['Html and CSS', 'Javascript', 'Python', 'Geminia API','Open Weather API'],
    link: 'https://example.com/health-bot',
  },
  {
    id: 7,
    title: 'Career Guidance System Using AI',
    description: ' The Student Career Guidance System using AI is a web-based platform that helps students choose the right career by analyzing their interests, skills, and academic record. It uses AI (OpenRouter API) to suggest the best-fit careers, along with a roadmap and course/university recommendations, and also tracks student progress. The system is built using React.js, Laravel, and MySQL, and includes an admin panel to manage career data and users.',
    image: '/images/team/careerg-img.jpeg',
    tech: ['React.js', 'LaravelL', 'MYSQL'],
    link: 'https://example.com/mental-chatbot',
  },
  {
    id: 8,
    title: 'CareSphere',
    description: ' Silent Communication System, a web-based healthcare application designed for deaf, mute, and bedridden patients. It helps patients communicate with doctors through predefined communication buttons, voice-to-text, text-to-speech, and text messaging. The system also supports consultation requests, emergency alerts, and medical records. Doctors manage patient consultations and records, while the administrator manages users and system access. ',
    image: '/images/team/silent-img.jpeg',
    tech: ['Html/css/Javascript', 'Bootstrap', '.MYSQL', 'XAMPP', 'VS Code'],
    link: 'https://example.com/blockchain-vote',
  },
  {
    id: 9,
    title: 'Askora',
    description: ' Askora is an AI-powered reading and learning assistant that helps users understand documents more effectively. By analyzing PDFs, books, research papers, and lecture notes, it provides contextual answers, concise summaries, simplified explanations, note generation, and interactive document-based conversations. Powered by Large Language Models (LLMs), Natural Language Processing (NLP), and Retrieval-Augmented Generation (RAG), Askora transforms passive reading into an engaging and personalized learning experience.',
    image: '/public/images/team/askora-img.jpeg',
    tech: ['React', 'Node.js', 'MQTT', 'Python', 'WebSockets'],
    link: 'https://example.com/smart-home',
  },
  {
    id: 10,
    title: 'VogueMe',
    description: ' VogueMe is a modern e-commerce platform for fashion and jewelry that enables users to browse products, manage shopping carts, make secure online payments, and track orders through an intuitive and user-friendly interface..',
    image: '/public/images/team/me-img.jpeg',
    tech: ['Html', 'CSS', 'javascript', 'Nodejs', 'full stack'],
    link: 'https://example.com/recommend-engine',
  },
  {
    id: 11,
    title: 'SaleForge',
    description: ' SaleForge is an AI-powered sales forecasting platform that combines machine learning models with historical sales data and market trends to generate accurate sales predictions. The system helps businesses forecast demand, identify sales patterns, optimize inventory, and support data-driven decision-making through interactive dashboards, analytics, and real-time insights.',
    image: '/public/images/team/forge-img.jpeg',
    tech: ['Unity', 'ARKit', 'ARCore', 'C#', 'Blender'],
    link: 'https://example.com/ar-tryon',
  },
  {
    id: 12,
    title: ' Advanced Plant Disease Detection',
    description: ' Plant Disease Detection is an AI-powered agricultural system that identifies plant diseases from leaf images using deep learning and computer vision. The platform analyzes uploaded images to detect diseases, provides confidence scores, suggests possible treatments, and offers preventive measures, enabling farmers and gardeners to protect crops and improve agricultural productivity..',
    image: '/public/images/team/plant-img.jpeg',
    tech: ['Python', 'Scikit‑learn', 'Prophet', 'Docker', 'Grafana'],
    link: 'https://example.com/predictive-maint',
  },
  {
    id: 13,
    title: 'HRMS',
    description: ' HRMS is a comprehensive Human Resource Management System designed to streamline HR operations, including employee management, attendance tracking, payroll processing, leave management, recruitment, and performance evaluation. The platform provides secure role-based access, real-time reporting, and analytics to improve workforce management and organizational efficiency.',
    image: '/public/images/team/hrms-img.jpeg',
    tech: ['Python', 'Transformers', 'Kafka', 'React', 'D3.js'],
    link: 'https://example.com/sentiment-tool',
  },
  {
    id: 14,
    title: 'Academic Integrity AI Suite',
    description: ' Academic Integrity AI Suite is an AI-powered platform designed to promote honesty and transparency in education. The system detects AI-generated content, identifies plagiarism, analyzes writing authenticity, and provides detailed integrity reports. It assists educators and institutions in evaluating academic submissions while encouraging original work and maintaining high standards of academic integrity.',
    image: '/public/images/team/ai-img.jpeg',
    tech: ['Python', 'Flask', 'React', 'NLP', 'RSS Feeds'],
    link: 'https://example.com/news-aggregator',
  },
  {
    id: 15,
    title: 'Career Enterprises',
    description: 'Career Enterprises is a modern web-based job portal that connects job seekers with employers through an easy-to-use digital platform. It enables users to create professional profiles, search and apply for jobs, upload resumes, and track applications. Employers can post job vacancies, manage candidates, and streamline the recruitment process with an efficient and secure hiring system.',
    image: '/public/images/team/career-img.jpeg',
    tech: ['Python', 'OpenCV', 'MediaPipe', 'YOLO', 'MAVLink'],
    link: 'https://example.com/gesture-drone',
  },
];


export default function Projects() {
  return (
    <div className={styles.page}>
     
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