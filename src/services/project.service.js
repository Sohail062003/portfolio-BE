const { projectSchema } = require("../models");

class ProjectService {

    static async createProject(projectData) {
        try {
            const data =  await projectSchema.create(projectData);
            return data;
        } catch (error) {
            throw error;
        }
    }

    static async getAllProjects() {
        try {
            // newest projects first
            const projects = await projectSchema.find().sort({ createdAt: -1 });
            return projects;
        } catch (error) {
            throw error;
        }
    }
}


module.exports = ProjectService;