export var ProjectStatus;
(function (ProjectStatus) {
    ProjectStatus[ProjectStatus["ACTIVE"] = 0] = "ACTIVE";
    ProjectStatus[ProjectStatus["FINISHED"] = 1] = "FINISHED";
})(ProjectStatus || (ProjectStatus = {}));
export class Project {
    constructor(id, title, description, numOfPeople, projectStatus) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.numOfPeople = numOfPeople;
        this.projectStatus = projectStatus;
    }
}
//# sourceMappingURL=project.js.map