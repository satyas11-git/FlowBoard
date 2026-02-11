import { useNavigate } from 'react-router-dom';

const Navbar = ({ userName, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    onLogout();
    navigate('/login');
  };

  return (
  <nav className="backdrop-blur-lg bg-white/20 border border-white/30 shadow-lg rounded-xl px-8 py-4 flex items-center justify-between text-white mb-8">
  <h1 className="text-2xl font-bold tracking-wide">FlowBoard</h1>
  <div className="flex items-center gap-6">
    <span className="text-white/90 whitespace-nowrap">
      Welcome, {userName}
    </span>

    <button
      onClick={handleLogout}
      className="bg-white text-red-500 font-semibold px-4 py-2 rounded-lg hover:bg-red-100 transition"
    >
      Logout
    </button>
  </div>

</nav>

  );
};

export default Navbar;
