import React, { useState, useEffect } from 'react';
import { Mail, Github, Linkedin, ExternalLink, Download, Menu, X, Play } from 'lucide-react';

const Portfolio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const projects = [
    {
      title: "Sales Forecasting",
      description: "Complete customer churn prediction with Streamlit. Interactive visualizations for business insights.",
      tech: ["Python", "Streamlit", "ML"],
      github: "https://github.com/digantadatta45/end-to-end-sales-forecasting",
      demo: "https://end-to-end-sales-forecasting-2qobgstqybppqnxipg9ei8.streamlit.app/",
      image: "/projects/sales.png"
    },
    {
      title: "Data Cleaning & EDA",
      description: "Interactive dashboard for data cleaning and exploratory analysis with comprehensive visualizations.",
      tech: ["Python", "Pandas", "EDA"],
      github: "https://github.com/digantadatta45/data-cleaning-eda-streamlit",
      demo: "https://data-cleaning-eda-app-ad7mntnab8wv7hojmwrxuz.streamlit.app/",
      image: "/projects/eda.png"
    },
    {
      title: "Customer Churn",
      description: "End-to-end ML pipeline with feature engineering and model evaluation for customer retention.",
      tech: ["Python", "ML", "Streamlit"],
      github: "https://github.com/digantadatta45/end-to-end-customer-churn-prediction",
      demo: "https://end-to-end-customer-churn-prediction-hxxtveotkuepfrvnucfayn.streamlit.app/",
      image: "/projects/churn.png"
    },
    {
      title: "House Price Prediction",
      description: "Real-time prediction system with model insights and feature importance analysis.",
      tech: ["Python", "Regression"],
      github: "https://github.com/digantadatta45/house-price-predictions",
      demo: "https://house-price-predictions-affkauvvmucwpfugdyaowm.streamlit.app/",
      image: "/projects/house.png"
    },
    {
      title: "Heart Disease Prediction",
      description: "Healthcare analytics system for patient risk assessment with interactive interface.",
      tech: ["Healthcare ML"],
      github: "https://github.com/digantadatta45/heart-disease-streamlit",
      demo: "https://heart-disease-app-shohanw3ab49cnfwrjnu6u.streamlit.app/",
      image: "/projects/heart.png"
    },
    {
      title: "Breast Cancer Classification",
      description: "Logistic regression model with metrics, confusion matrix, and S-curve visualizations.",
      tech: ["Logistic Regression"],
      github: "https://github.com/digantadatta45/Breast-cancer-logistic-regression",
      demo: "https://breast-cancer-logistic-regression-wqeznareva59awg6nhxbtn.streamlit.app/",
      image: "/projects/cancer.png"
    }
  ];

  const skills = ["Python", "Machine Learning", "Data Analysis", "Streamlit", "Pandas", "NumPy", "Scikit-learn", "EDA", "FastAPI", "SQL"];

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'projects', 'services', 'contact'];
      const scrollPosition = window.scrollY + 100;
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el && scrollPosition >= el.offsetTop && scrollPosition < el.offsetTop + el.offsetHeight) {
          setActiveSection(section);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch('https://formsubmit.co/ajax/digantadatta45@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ ...formData, _subject: `Portfolio Contact from ${formData.name}` })
      });
      const data = await res.json();
      if (data.success) {
        alert('✅ Message sent! I will get back to you soon.');
        setFormData({ name: '', email: '', message: '' });
      }
    } catch {
      alert('⚠️ Error sending message. Please email digantadatta45@gmail.com directly');
    } finally {
      setIsSubmitting(false);
    }
  };

  const downloadCV = () => {
    const cv = `DIGANTA DATTA - Data Scientist & ML Engineer
digantadatta45@gmail.com | github.com/digantadatta45 | linkedin.com/in/diganta-datta-b56340386

SKILLS: Python, Machine Learning, Data Analysis, Streamlit, Pandas, NumPy, Scikit-learn, SQL, FastAPI

PROJECTS:
1. Sales Forecasting - https://end-to-end-sales-forecasting.streamlit.app/
2. Data Cleaning & EDA - https://data-cleaning-eda-streamlit.streamlit.app/
3. Customer Churn - https://end-to-end-customer-churn-prediction.streamlit.app/
4. House Price Prediction - https://house-price-predictions.streamlit.app/
5. Heart Disease - https://heart-disease-streamlit.streamlit.app/
6. Breast Cancer - https://breast-cancer-logistic-regression.streamlit.app/`;
    const blob = new Blob([cv], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Diganta_Datta_CV.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <nav className="fixed top-0 w-full bg-black/90 backdrop-blur-xl z-50 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="text-2xl font-bold"><span className="text-white">Diganta</span><span className="text-blue-400"> Datta</span></div>
            <div className="hidden md:flex space-x-8">
              {['home', 'about', 'projects', 'services', 'contact'].map(item => (
                <button key={item} onClick={() => scrollToSection(item)} className={`capitalize text-sm font-medium ${activeSection === item ? 'text-white' : 'text-gray-400 hover:text-white'}`}>{item}</button>
              ))}
            </div>
            <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>{isMenuOpen ? <X /> : <Menu />}</button>
          </div>
          {isMenuOpen && <div className="md:hidden py-4 space-y-4 border-t border-gray-800">{['home', 'about', 'projects', 'services', 'contact'].map(item => <button key={item} onClick={() => scrollToSection(item)} className="block w-full text-left capitalize text-gray-400 hover:text-white">{item}</button>)}</div>}
        </div>
      </nav>

      <section id="home" className="min-h-screen flex items-center px-4 pt-20">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 order-2 md:order-1">
            <p className="text-blue-400 font-medium">Hello, I'm</p>
            <h1 className="text-5xl md:text-6xl font-bold">Diganta Datta</h1>
            <h2 className="text-2xl md:text-3xl text-gray-400">Data Scientist & ML Engineer</h2>
            <p className="text-lg text-gray-400">Transforming data into insights through ML and interactive dashboards.</p>
            <div className="flex flex-wrap gap-4">
              <button onClick={() => scrollToSection('contact')} className="px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg">Get In Touch</button>
              <button onClick={downloadCV} className="flex items-center gap-2 px-6 py-3 border border-gray-700 hover:border-blue-400 rounded-lg"><Download className="w-5 h-5" />Download CV</button>
            </div>
            <div className="flex gap-4">
              <a href="https://github.com/digantadatta45" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center border border-gray-700 hover:border-blue-400 rounded-lg"><Github className="w-5 h-5" /></a>
              <a href="https://www.linkedin.com/in/diganta-datta-b56340386/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center border border-gray-700 hover:border-blue-400 rounded-lg"><Linkedin className="w-5 h-5" /></a>
              <a href="mailto:digantadatta45@gmail.com" className="w-10 h-10 flex items-center justify-center border border-gray-700 hover:border-blue-400 rounded-lg"><Mail className="w-5 h-5" /></a>
            </div>
          </div>
          <div className="order-1 md:order-2 flex justify-center">
            <div className="relative"><div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl blur-3xl opacity-20"></div>
            <img src="/profile.jpeg" alt="Diganta Datta" className="relative w-80 h-80 object-cover rounded-2xl border border-gray-800" /></div>
          </div>
        </div>
      </section>

      <section id="about" className="py-20 px-4 bg-gray-900/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">About <span className="text-blue-400">Me</span></h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <p className="text-gray-400">Passionate Data Scientist building end-to-end ML solutions. Specialized in Python, ML algorithms, and interactive dashboards with Streamlit.</p>
              <p className="text-gray-400">Currently learning FastAPI and advanced SQL to expand backend development capabilities.</p>
            </div>
            <div><h3 className="text-2xl font-bold mb-6">Skills</h3><div className="flex flex-wrap gap-3">{skills.map((s, i) => <span key={i} className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm hover:border-blue-400">{s}</span>)}</div></div>
          </div>
        </div>
      </section>

      <section id="projects" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">Featured <span className="text-blue-400">Projects</span></h2>
          <p className="text-center text-gray-400 mb-12">Interactive ML applications on Streamlit</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((p, i) => (
              <div key={i} className="group bg-gray-900 rounded-xl overflow-hidden border border-gray-800 hover:border-blue-400 transition-all">
                <div className="relative h-48 overflow-hidden"><img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent"></div></div>
                <div className="p-6 space-y-4">
                  <h3 className="text-xl font-bold group-hover:text-blue-400">{p.title}</h3>
                  <p className="text-gray-400 text-sm line-clamp-3">{p.description}</p>
                  <div className="flex flex-wrap gap-2">{p.tech.map((t, j) => <span key={j} className="px-3 py-1 bg-gray-800 rounded-full text-xs">{t}</span>)}</div>
                  <div className="flex gap-4">
                    <a href={p.demo} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300"><Play className="w-4 h-4" />Live Demo</a>
                    <a href={p.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-gray-400 hover:text-white"><Github className="w-4 h-4" />Code</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="py-20 px-4 bg-gray-900/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">My <span className="text-blue-400">Services</span></h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-8 hover:border-blue-400">
              <h3 className="text-2xl font-bold mb-4">Data Cleaning to ML</h3>
              <p className="text-gray-400 mb-6">End-to-end service from raw data to deployed ML models with Streamlit dashboards.</p>
              <a href="https://www.fiverr.com/s/2KBBdRk" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg">View on Fiverr <ExternalLink className="w-4 h-4" /></a>
            </div>
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-8 hover:border-blue-400">
              <h3 className="text-2xl font-bold mb-4">Data Cleaning to EDA</h3>
              <p className="text-gray-400 mb-6">Professional data analysis with comprehensive visualizations and insights.</p>
              <a href="https://www.fiverr.com/s/Q7ooj8p" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg">View on Fiverr <ExternalLink className="w-4 h-4" /></a>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">Get In <span className="text-blue-400">Touch</span></h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div className="flex items-center gap-4"><div className="w-12 h-12 flex items-center justify-center bg-gray-900 border border-gray-800 rounded-lg"><Mail className="w-5 h-5" /></div><div><p className="text-xs text-gray-500">Email</p><p className="text-sm">digantadatta45@gmail.com</p></div></div>
              <div className="flex items-center gap-4"><div className="w-12 h-12 flex items-center justify-center bg-gray-900 border border-gray-800 rounded-lg"><Github className="w-5 h-5" /></div><div><p className="text-xs text-gray-500">GitHub</p><p className="text-sm">github.com/digantadatta45</p></div></div>
            </div>
            <div className="space-y-6">
              <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg focus:border-blue-400 focus:outline-none" placeholder="Your Name" />
              <input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg focus:border-blue-400 focus:outline-none" placeholder="Your Email" />
              <textarea value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} rows="5" className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg focus:border-blue-400 focus:outline-none resize-none" placeholder="Your Message" />
              <button onClick={handleSubmit} disabled={isSubmitting || !formData.name || !formData.email || !formData.message} className="w-full px-6 py-4 bg-blue-500 hover:bg-blue-600 rounded-lg font-semibold disabled:opacity-50">{isSubmitting ? 'Sending...' : 'Send Message'}</button>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-8 px-4 border-t border-gray-800 text-center text-gray-500">
        <p>© 2025 Diganta Datta. Built with React & Tailwind CSS</p>
      </footer>
    </div>
  );
};


export default Portfolio;
