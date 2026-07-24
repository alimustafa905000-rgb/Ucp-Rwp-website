import React, { useState, useEffect, useCallback } from "react";
import { projectsService } from "../services";

export default function Projects() {
  // ===== State =====
  const [projects, setProjects] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [currentProject, setCurrentProject] = useState(null);
  const [formData, setFormData] = useState(getEmptyProject());

  // Details view
  const [selectedProject, setSelectedProject] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  // Hero section
  const [hero, setHero] = useState({
    title: "Final Year Projects",
    description: "Discover the groundbreaking work of our final-year students.",
    icon: "🚀",
    badge: "Showcase",
  });

  // ===== Helper: empty project =====
  function getEmptyProject() {
    return {
      title: "",
      description: "",
      imageUrl: "",
      tech: [],
      links: { github: "", demo: "", documentation: "" },
      category: "",
      students: [],
      supervisor: "",
      department: "",
      batch: "",
    };
  }

  // ===== Fetch projects =====
  const fetchProjects = useCallback(async () => {
    setLoading(true);
    try {
      const data = await projectsService.get();
      // ✅ Ensure it's always an array
      setProjects(Array.isArray(data) ? data : []);
      setError(null);
    } catch (err) {
      setError("Failed to load projects.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
    const savedHero = localStorage.getItem("heroSettings");
    if (savedHero) {
      try {
        setHero(JSON.parse(savedHero));
      } catch (e) {}
    }
  }, [fetchProjects]);

  // ===== Hero save =====
  const saveHero = () => {
    localStorage.setItem("heroSettings", JSON.stringify(hero));
    alert("Hero settings saved!");
  };

  // ===== CRUD operations =====
  const handleAdd = () => {
    setModalMode("add");
    setFormData(getEmptyProject());
    setCurrentProject(null);
    setShowModal(true);
  };

  const handleEdit = (project) => {
    setModalMode("edit");
    setCurrentProject(project);
    setFormData({ ...project });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;
    try {
      await projectsService.delete(id);
      setProjects(projects.filter((p) => p.id !== id));
      setError(null);
    } catch (err) {
      setError("Failed to delete project.");
      console.error(err);
    }
  };

  const handleViewDetails = (project) => {
    setSelectedProject(project);
    setShowDetails(true);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: { ...(prev[parent] || {}), [child]: value },
      }));
      return;
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Image upload handler
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({ ...prev, imageUrl: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setFormData((prev) => ({ ...prev, imageUrl: "" }));
  };

  // Technologies management
  const addTech = () => {
    const techInput = document.getElementById("techInput");
    if (techInput) {
      const tech = techInput.value.trim();
      if (tech && !formData.tech.includes(tech)) {
        setFormData((prev) => ({ ...prev, tech: [...prev.tech, tech] }));
        techInput.value = "";
      }
    }
  };

  const removeTech = (tech) => {
    setFormData((prev) => ({
      ...prev,
      tech: prev.tech.filter((t) => t !== tech),
    }));
  };

  // Students management
  const addStudent = () => {
    const studentInput = document.getElementById("studentInput");
    if (studentInput) {
      const student = studentInput.value.trim();
      if (student && !formData.students.includes(student)) {
        setFormData((prev) => ({ ...prev, students: [...prev.students, student] }));
        studentInput.value = "";
      }
    }
  };

  const removeStudent = (student) => {
    setFormData((prev) => ({
      ...prev,
      students: prev.students.filter((s) => s !== student),
    }));
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.description.trim()) {
      alert("Title and Description are required.");
      return;
    }
    try {
      if (modalMode === "add") {
        const newProject = await projectsService.create(formData);
        setProjects([...projects, newProject]);
      } else {
        const updated = await projectsService.update(currentProject.id, formData);
        setProjects(projects.map((p) => (p.id === updated.id ? updated : p)));
      }
      setShowModal(false);
      setError(null);
      fetchProjects();
    } catch (err) {
      setError("Failed to save project.");
      console.error(err);
    }
  };

  // ===== Filter projects =====
  const filteredProjects = projects.filter((p) => {
    const q = searchQuery.toLowerCase();
    return (
      p.title?.toLowerCase().includes(q) ||
      p.description?.toLowerCase().includes(q) ||
      (Array.isArray(p.tech) && p.tech.some((t) => t.toLowerCase().includes(q))) ||
      p.category?.toLowerCase().includes(q)
    );
  });

  // ===== Render =====
  return (
    <div className="p-6 max-w-7xl mx-auto">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {/* Hero Section */}
      <section className="mb-10 bg-gray-50 p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-4">Hero Section Management</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Hero Title</label>
            <input
              type="text"
              value={hero.title}
              onChange={(e) => setHero({ ...hero, title: e.target.value })}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Hero Description</label>
            <input
              type="text"
              value={hero.description}
              onChange={(e) => setHero({ ...hero, description: e.target.value })}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Hero Icon</label>
            <input
              type="text"
              value={hero.icon}
              onChange={(e) => setHero({ ...hero, icon: e.target.value })}
              className="w-full border rounded px-3 py-2"
              placeholder="🚀"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Badge Text</label>
            <input
              type="text"
              value={hero.badge}
              onChange={(e) => setHero({ ...hero, badge: e.target.value })}
              className="w-full border rounded px-3 py-2"
            />
          </div>
        </div>
        <button
          onClick={saveHero}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Save Hero Settings
        </button>
      </section>

      {/* Projects List */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">All Projects</h1>
        <button
          onClick={handleAdd}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          + Add Project
        </button>
      </div>

      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by title, description, tech, category..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full border rounded px-4 py-2"
        />
      </div>

      {loading && <p>Loading projects...</p>}

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tech
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredProjects.length === 0 ? (
              <tr>
                <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                  No projects found.
                </td>
              </tr>
            ) : (
              filteredProjects.map((project) => (
                <tr key={project.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{project.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{project.category || "-"}</td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {(Array.isArray(project.tech) ? project.tech.slice(0, 3) : []).map((t) => (
                        <span
                          key={t}
                          className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                        >
                          {t}
                        </span>
                      ))}
                      {Array.isArray(project.tech) && project.tech.length > 3 && (
                        <span className="text-xs text-gray-500">+{project.tech.length - 3}</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleViewDetails(project)}
                      className="text-indigo-600 hover:text-indigo-900 mr-3"
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleEdit(project)}
                      className="text-yellow-600 hover:text-yellow-900 mr-3"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(project.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal for Add/Edit */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6">
            <h2 className="text-2xl font-bold mb-4">
              {modalMode === "add" ? "Add New Project" : "Edit Project"}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium">Title *</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleFormChange}
                    className="w-full border rounded px-3 py-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Category</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleFormChange}
                    className="w-full border rounded px-3 py-2"
                  >
                    <option value="">Select category</option>
                    <option value="Artificial Intelligence">Artificial Intelligence</option>
                    <option value="Web Development">Web Development</option>
                    <option value="Blockchain">Blockchain</option>
                    <option value="Robotics">Robotics</option>
                    <option value="Data Science">Data Science</option>
                    <option value="Cyber Security">Cyber Security</option>
                  </select>
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium">Description *</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleFormChange}
                  rows="3"
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>

              {/* Image Upload */}
              <div className="mb-4">
                <label className="block text-sm font-medium">Project Image</label>
                <div className="flex items-center space-x-4">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                  {formData.imageUrl && (
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Remove
                    </button>
                  )}
                </div>
                {formData.imageUrl && (
                  <div className="mt-2">
                    <img
                      src={formData.imageUrl}
                      alt="Preview"
                      className="max-h-48 rounded border"
                    />
                  </div>
                )}
              </div>

              {/* Technologies */}
              <div className="mb-4">
                <label className="block text-sm font-medium">Technologies</label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {formData.tech.map((tech) => (
                    <span
                      key={tech}
                      className="bg-gray-200 px-2 py-1 rounded flex items-center gap-1"
                    >
                      {tech}
                      <button
                        type="button"
                        onClick={() => removeTech(tech)}
                        className="text-red-500 hover:text-red-700"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    id="techInput"
                    type="text"
                    placeholder="Add technology"
                    className="border rounded px-3 py-1 flex-1"
                  />
                  <button
                    type="button"
                    onClick={addTech}
                    className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
                  >
                    Add
                  </button>
                </div>
              </div>

              {/* Links */}
              <div className="mb-4">
                <label className="block text-sm font-medium">Project Links</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                  <input
                    type="url"
                    name="links.github"
                    placeholder="GitHub URL"
                    value={formData.links?.github || ""}
                    onChange={handleFormChange}
                    className="border rounded px-3 py-1"
                  />
                  <input
                    type="url"
                    name="links.demo"
                    placeholder="Demo URL"
                    value={formData.links?.demo || ""}
                    onChange={handleFormChange}
                    className="border rounded px-3 py-1"
                  />
                  <input
                    type="url"
                    name="links.documentation"
                    placeholder="Documentation URL"
                    value={formData.links?.documentation || ""}
                    onChange={handleFormChange}
                    className="border rounded px-3 py-1"
                  />
                </div>
              </div>

              {/* Student Information */}
              <div className="mb-4">
                <label className="block text-sm font-medium">Students</label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {formData.students.map((student) => (
                    <span
                      key={student}
                      className="bg-green-100 px-2 py-1 rounded flex items-center gap-1"
                    >
                      {student}
                      <button
                        type="button"
                        onClick={() => removeStudent(student)}
                        className="text-red-500 hover:text-red-700"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    id="studentInput"
                    type="text"
                    placeholder="Add student name"
                    className="border rounded px-3 py-1 flex-1"
                  />
                  <button
                    type="button"
                    onClick={addStudent}
                    className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600"
                  >
                    Add
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium">Supervisor</label>
                  <input
                    type="text"
                    name="supervisor"
                    value={formData.supervisor || ""}
                    onChange={handleFormChange}
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Department</label>
                  <input
                    type="text"
                    name="department"
                    value={formData.department || ""}
                    onChange={handleFormChange}
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Batch</label>
                  <input
                    type="text"
                    name="batch"
                    value={formData.batch || ""}
                    onChange={handleFormChange}
                    className="w-full border rounded px-3 py-2"
                    placeholder="2026"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  {modalMode === "add" ? "Create" : "Update"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Details Modal */}
      {showDetails && selectedProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
            <h2 className="text-2xl font-bold mb-2">{selectedProject.title}</h2>
            <p className="text-gray-600 mb-4">{selectedProject.description}</p>

            {selectedProject.imageUrl && (
              <img
                src={selectedProject.imageUrl}
                alt={selectedProject.title}
                className="max-h-64 rounded mb-4"
              />
            )}

            <div className="mb-2">
              <strong>Category:</strong> {selectedProject.category || "-"}
            </div>
            <div className="mb-2">
              <strong>Technologies:</strong>{" "}
              {(Array.isArray(selectedProject.tech) ? selectedProject.tech.join(", ") : "-")}
            </div>
            <div className="mb-2">
              <strong>Links:</strong>
              <ul className="list-disc ml-5">
                {selectedProject.links?.github && (
                  <li>
                    <a
                      href={selectedProject.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      GitHub
                    </a>
                  </li>
                )}
                {selectedProject.links?.demo && (
                  <li>
                    <a
                      href={selectedProject.links.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Live Demo
                    </a>
                  </li>
                )}
                {selectedProject.links?.documentation && (
                  <li>
                    <a
                      href={selectedProject.links.documentation}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Documentation
                    </a>
                  </li>
                )}
                {!selectedProject.links?.github &&
                  !selectedProject.links?.demo &&
                  !selectedProject.links?.documentation && <li>No links</li>}
              </ul>
            </div>

            <div className="mb-2">
              <strong>Students:</strong>{" "}
              {(Array.isArray(selectedProject.students) ? selectedProject.students.join(", ") : "-")}
            </div>
            <div className="mb-2">
              <strong>Supervisor:</strong> {selectedProject.supervisor || "-"}
            </div>
            <div className="mb-2">
              <strong>Department:</strong> {selectedProject.department || "-"}
            </div>
            <div className="mb-4">
              <strong>Batch:</strong> {selectedProject.batch || "-"}
            </div>

            <button
              onClick={() => setShowDetails(false)}
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}