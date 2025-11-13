import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import './App.css';

// Componente Dashboard principal
function Dashboard() {
  const { user, logout } = useAuth();

  return (
    <div className="dashboard-container">
      {/* Header */}
      <div className="dashboard-header">
        <h1 className="user-welcome">¡Bienvenido, {user?.name || 'Inversor'}! 🎉</h1>
        <p className="user-subtitle">Tu herramienta confiable para calcular inversiones en CDT</p>
        <div className="user-info">
          <strong>Email:</strong> {user?.email}
        </div>
      </div>

      {/* Contenido principal */}
      <div className="dashboard-content">
        {/* Sección de características */}
        <section className="features-section">
          <h2 className="section-title">¿Por qué elegir nuestro Calculador de CDT?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">📈</div>
              <h3>Cálculos Precisos</h3>
              <p>Obtén proyecciones exactas de tus ganancias con tasas de interés actualizadas del mercado financiero.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>Resultados Inmediatos</h3>
              <p>Simula diferentes escenarios de inversión y recibe resultados al instante sin complicaciones.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">🛡️</div>
              <h3>Inversiones Seguras</h3>
              <p>Los CDT son una de las formas más seguras de hacer crecer tu dinero a largo plazo.</p>
            </div>
          </div>
        </section>

        {/* Sección del calculador */}
        <section className="calculator-section">
          <h2>Calculador de CDT</h2>
          <p>
            Próximamente podrás calcular tu inversión en Certificados de Depósito a Término. 
            Ingresa el monto, plazo y tasa de interés para ver tus ganancias proyectadas.
          </p>
          <button className="calculator-btn">
            🚀 Próximamente - Iniciar Cálculo
          </button>
        </section>

        {/* Información adicional */}
        <section className="features-section">
          <h2 className="section-title">Beneficios de Invertir en CDT</h2>
          <div className="features-grid">
            <div className="feature-card">
              <h3>💰 Rentabilidad Garantizada</h3>
              <p>Conoce de antemano exactamente cuánto ganarás al final del plazo de tu inversión.</p>
            </div>
            
            <div className="feature-card">
              <h3>📅 Flexibilidad de Plazos</h3>
              <p>Elige plazos desde 30 días hasta varios años según tus objetivos financieros.</p>
            </div>
            
            <div className="feature-card">
              <h3>🏦 Respaldo Bancario</h3>
              <p>Tus inversiones están protegidas por instituciones financieras reguladas.</p>
            </div>
          </div>
        </section>

        {/* Botón de logout */}
        <div className="logout-section">
          <button onClick={logout} className="logout-btn">
            Cerrar Sesión
          </button>
        </div>
      </div>
    </div>
  );
}

// Componentes de Login/Register CORREGIDOS
function LoginForm({ isActive, onSwitchToRegister }) {
  const { login, loading } = useAuth();
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    const result = await login(credentials.email, credentials.password);
    
    if (!result.success) {
      setError(result.error);
    }
  };

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className={`form-wrapper ${isActive ? 'active' : 'slide-left'}`}>
      <div className="auth-form">
        <h2>Iniciar Sesión</h2>
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Correo Electrónico</label>
            <input
              type="email"
              id="email"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              placeholder="tu@email.com"
              required
              disabled={loading}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
              disabled={loading}
            />
          </div>
          
          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? '🔄 Iniciando Sesión...' : '🚀 Ingresar al Calculador'}
          </button>
        </form>
        
        <div className="toggle-container">
          <p className="toggle-text">¿No tienes una cuenta?</p>
          <button 
            type="button"
            onClick={onSwitchToRegister}
            className="toggle-btn"
          >
            Regístrate aquí
          </button>
        </div>
      </div>
    </div>
  );
}

function RegisterForm({ isActive, onSwitchToLogin }) {
  const { register, loading } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    const result = await register(formData.email, formData.password, formData.name);
    
    if (!result.success) {
      setError(result.error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className={`form-wrapper ${isActive ? 'active' : ''}`}>
      <div className="auth-form">
        <h2>Crear Cuenta</h2>
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Nombre Completo</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Tu nombre completo"
              required
              disabled={loading}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Correo Electrónico</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="tu@email.com"
              required
              disabled={loading}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
              disabled={loading}
            />
          </div>
          
          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? '🔄 Creando Cuenta...' : '✨ Crear Cuenta'}
          </button>
        </form>
        
        <div className="toggle-container">
          <p className="toggle-text">¿Ya tienes una cuenta?</p>
          <button 
            type="button"
            onClick={onSwitchToLogin}
            className="toggle-btn"
          >
            Inicia sesión aquí
          </button>
        </div>
      </div>
    </div>
  );
}

function AuthInterface() {
  const [currentForm, setCurrentForm] = useState('login');
  const [isTransitioning, setIsTransitioning] = useState(false);

  const switchToRegister = () => {
    if (currentForm === 'login' && !isTransitioning) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentForm('register');
        setIsTransitioning(false);
      }, 300);
    }
  };

  const switchToLogin = () => {
    if (currentForm === 'register' && !isTransitioning) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentForm('login');
        setIsTransitioning(false);
      }, 300);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-left">
        <h1>Calculador de CDT</h1>
        <p>
          {currentForm === 'login' 
            ? 'Ingresa para acceder a tu calculador de inversiones'
            : 'Únete y comienza a planificar tu futuro financiero'
          }
        </p>
      </div>
      
      <div className="auth-right">
        <div className="forms-container">
          <LoginForm 
            isActive={currentForm === 'login'}
            onSwitchToRegister={switchToRegister}
          />
          <RegisterForm 
            isActive={currentForm === 'register'}
            onSwitchToLogin={switchToLogin}
          />
        </div>
      </div>
    </div>
  );
}

function AppContent() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="App">
        <div className="loading-container">
          <p>🔄 Cargando calculador de CDT...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <div className="App-header">
        {isAuthenticated ? <Dashboard /> : <AuthInterface />}
      </div>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;