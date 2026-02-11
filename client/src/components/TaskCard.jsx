const TaskCard = ({ task, onEdit, onDelete }) => {
  return (
<div className="backdrop-blur-lg bg-white/25 border border-white/30 shadow-lg rounded-2xl p-5 flex flex-col justify-between hover:shadow-xl transition duration-200">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-semibold text-gray-900">{task.title}</h3>
        <span
          className={`text-xs px-3 py-1 rounded-full font-medium ${
            task.status === 'completed'
              ? 'bg-green-100 text-green-700'
              : 'bg-yellow-100 text-yellow-700'
          }`}
        >
          {task.status}
        </span>
      </div>
      {task.description && (
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
  {task.description || 'No description provided.'}
</p>
      )}
      <div className="flex justify-end gap-3 mt-auto">
        <button
          onClick={() => onEdit(task)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition duration-200"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(task._id)}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition duration-200"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
