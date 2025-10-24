import { useState, useEffect } from 'react';
import { Plus, LogOut, CheckCircle2, Circle } from 'lucide-react';
import { authService } from '../api/authService';
import { taskService } from '../api/taskService';
import TaskModal from '../components/TaskModal';
import TaskItem from '../components/TaskItem';
import LoginPage from './LoginPage';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const user = authService.getUser();

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      setLoading(true);
      const data = await taskService.getAll();
      setTasks(data);
    } catch (error) {
      console.error('Error cargando las tareas:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveTask = async (taskData) => {
    try {
      if (editingTask) {
        await taskService.update(editingTask.id, taskData);
      } else {
        await taskService.create({ ...taskData, isCompleted: false });
      }
      loadTasks();
      setIsModalOpen(false);
      setEditingTask(null);
    } catch (error) {
      console.error('Error guardando la tarea', error);
    }
  };

  const handleToggleTask = async (task) => {
    try {
      await taskService.update(task.id, { isCompleted: !task.isCompleted });
      loadTasks();
    } catch (error) {
      console.error('Error al actualizar la tarea:', error);
    }
  };

  const handleDeleteTask = async (id) => {
    if (!window.confirm('¿Estás seguro de que quieres eliminar esta tarea?')) return;

    try {
      await taskService.delete(id);
      loadTasks();
    } catch (error) {
      console.error('Error al tratar de eliminar la tarea:', error);
    }
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleNewTask = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    authService.logout();
    navigate('/auth/login');
  };


  const pendingTasks = tasks.filter(task => !task.isCompleted);
  const completedTasks = tasks.filter(task => task.isCompleted);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Mi lista de tareas</h1>
              <p className="text-sm text-gray-600 mt-1">¡Bienvenido, {user?.name}!</p>
            </div>
            <button
              onClick={() => handleLogout()}
              className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition"
            >
              <LogOut className="w-4 h-4" />
              <span className="font-medium">Salir</span>
            </button>
          </div>
        </div>
      </header>

      {/* El contenido principal, solo se accede por logearse */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Boton para añadir una tarea*/}
        <button
          onClick={handleNewTask}
          className="mb-8 flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition shadow-md hover:shadow-lg"
        >
          <Plus className="w-5 h-5" />
          Añadir tarea
        </button>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-blue-600"></div>
            <p className="mt-4 text-gray-600">Cargando tareas...</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {/* Pendientes */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Circle className="w-5 h-5 text-orange-500" />
                <h2 className="text-xl font-bold text-gray-800">
                  Pendientes ({pendingTasks.length})
                </h2>
              </div>
              <div className="space-y-3">
                {pendingTasks.length === 0 ? (
                  <div className="bg-white rounded-lg shadow p-8 text-center">
                    <p className="text-gray-500">No tienes tareas pendientes</p>
                  </div>
                ) : (
                  pendingTasks.map(task => (
                    <TaskItem
                      key={task.id}
                      task={task}
                      onToggle={handleToggleTask}
                      onDelete={handleDeleteTask}
                      onEdit={handleEditTask}
                    />
                  ))
                )}
              </div>
            </div>

            {/* Completadas */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                <h2 className="text-xl font-bold text-gray-800">
                  Completadas ({completedTasks.length})
                </h2>
              </div>
              <div className="space-y-3">
                {completedTasks.length === 0 ? (
                  <div className="bg-white rounded-lg shadow p-8 text-center">
                    <p className="text-gray-500">No hay tareas terminadas</p>
                  </div>
                ) : (
                  completedTasks.map(task => (
                    <TaskItem
                      key={task.id}
                      task={task}
                      onToggle={handleToggleTask}
                      onDelete={handleDeleteTask}
                      onEdit={handleEditTask}
                    />
                  ))
                )}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Modal de tarea */}
      <TaskModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingTask(null);
        }}
        onSave={handleSaveTask}
        task={editingTask}
      />
    </div>
  );
};

export default HomePage;