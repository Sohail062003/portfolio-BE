const ProjectService = require("../services/project.service");

class ProjectController {
    static async createProject(req, res) {
        try {
            const projectData = req.body;
            if (!projectData || !projectData.title || !projectData.description) {
                return res.status(400).json({
                    status: "false",
                    message : "Invalid project data",
                    data: {}
                })
            }
            const project = await ProjectService.createProject(projectData);

            if (!project) {
                return res.status(400).json({
                    status: "false",
                    message : "Project creation failed",
                    data: {}
                })
            }

            return res.status(201).json({
                status: "true",
                message : "Project created successfully",
                data: {project}
            })
            
        } catch (error) {
            console.error("Something went wrong..!", error);
            return res.status(500).json({
                status: "error",
                message : "Internal Server Error",
                data: {}
            })
        }
    }

    static async getAllProjects(req, res) {
        try {
            const projects = await ProjectService.getAllProjects();

            if (!projects) { 
                return res.status(404).status({
                    status: "false",
                    message : "No projects found",
                    data: {}
                })
            }
            return res.status(200).json({
                status: "true",
                message : "Projects fetched successfully",
                data: {projects}
            });
        } catch (error) {
            console.error("Something went wrong..!", error);
            return res.status(500).json({
                status: "error",
                message : "Internal Server Error",
                data: {}
            })
        }
    }
}

module.exports = ProjectController;