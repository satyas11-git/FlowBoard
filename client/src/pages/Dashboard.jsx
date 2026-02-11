import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import TaskCard from '../components/TaskCard';
import TaskModal from '../components/TaskModal';
import { authService } from '../services/authService';
import { taskService } from '../services/taskService';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    loadUserProfile();
    loadTasks();
  }, []);

  useEffect(() => {
    loadTasks();
  }, [statusFilter, searchTerm]);

  const loadUserProfile = async () => {
    try {
      const response = await authService.getProfile();
      if (response.success) {
        setUser(response.data.user);
      }
    } catch (error) {
      console.error('Failed to load profile:', error);
      if (error.response?.status === 401) {
        navigate('/login');
      }
    }
  };

  const loadTasks = async () => {
    try {
      setLoading(true);
      const response = await taskService.getTasks(
        statusFilter || null,
        searchTerm
      );
      if (response.success) {
        setTasks(response.data.tasks);
      }
    } catch (error) {
      console.error('Failed to load tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = () => {
    setEditingTask(null);
    setModalOpen(true);
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setModalOpen(true);
  };

  const handleSaveTask = async (taskData) => {
    try {
      if (editingTask) {
        await taskService.updateTask(
          editingTask._id,
          taskData.title,
          taskData.description,
          taskData.status
        );
      } else {
        await taskService.createTask(
          taskData.title,
          taskData.description,
          taskData.status
        );
      }
      loadTasks();
    } catch (error) {
      console.error('Failed to save task:', error);
      alert('Failed to save task. Please try again.');
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (!window.confirm('Are you sure you want to delete this task?')) {
      return;
    }
    try {
      await taskService.deleteTask(taskId);
      loadTasks();
    } catch (error) {
      console.error('Failed to delete task:', error);
      alert('Failed to delete task. Please try again.');
    }
  };

  const handleLogout = () => {
    // Handled by Navbar component
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e) => {
    setStatusFilter(e.target.value);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-6">
      <Navbar
        userName={user?.name || 'User'}
        onLogout={handleLogout}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white">Welcome back, {user?.name || 'User'}! 👋</h2>
          <p className="text-white/80">Manage your tasks efficiently</p>
        </div>

        {/* Filters and Search */}
        {/* <div className="bg-white rounded-lg shadow-md p-6 mb-6"> */}
<div className="backdrop-blur-lg bg-white/20 border border-white/30 shadow-lg rounded-xl p-4 flex justify-between items-center text-white mb-8">

          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search tasks..."
                value={searchTerm}
                onChange={handleSearch}
                className="px-4 py-2 rounded-lg bg-white text-gray-800 border border-white/40 focus:outline-none focus:ring-2 focus:ring-indigo-300"
              />
            </div>
            <div className="md:w-48">
              <select
                value={statusFilter}
                onChange={handleFilterChange}
                className="px-4 py-2 rounded-lg bg-white text-gray-800 placeholder-gray-400 border border-white/40 focus:outline-none focus:ring-2 focus:ring-indigo-300"
              >
                <option value="">All Status</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            <button
              onClick={handleCreateTask}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium transition duration-200 whitespace-nowrap"
            >
              + New Task
            </button>
          </div>
        </div>

        {/* Tasks Grid */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Loading tasks...</p>
          </div>
        ) : tasks.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <p className="text-gray-600 text-lg">
              {searchTerm || statusFilter
                ? 'No tasks found matching your criteria.'
                : "You don't have any tasks yet. Create your first task!"}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onEdit={handleEditTask}
                onDelete={handleDeleteTask}
              />
            ))}
          </div>
        )}
      </div>

      {/* Task Modal */}
      <TaskModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditingTask(null);
        }}
        onSave={handleSaveTask}
        task={editingTask}
      />
    </div>
  );
};

export default Dashboard;
