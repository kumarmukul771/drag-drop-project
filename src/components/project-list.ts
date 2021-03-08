import { autobind } from "../decorators/autobind";
import { DragTarget } from "../models/drag-drop";
import { Project, ProjectStatus } from "../models/project";
import { projectList } from "../state/project-state";
import Component from "./base-component";
import { ProjectItem } from "./project-item";

// ProjectList class
export class ProjectList
  extends Component<HTMLDivElement, HTMLElement>
  implements DragTarget {
  assignedProjects: Project[];

  constructor(private type: "active" | "finished") {
    super("project-list", "app", `${type}-projects`, false);

    this.assignedProjects = [];

    this.configure();
    this.renderContent();
  }

  @autobind
  dragOverHandler(event: DragEvent) {
    if (event.dataTransfer && event.dataTransfer.types[0] === "text/plain") {
      // Because default behaviour of javascript in drag and drop is to not allow drop
      event.preventDefault();
      const listEl = this.element.querySelector("ul")!;
      listEl.classList.add("droppable");
    }
  }

  @autobind
  dropHandler(event: DragEvent) {
    const prjId = event.dataTransfer!.getData("text/plain");
    projectList.moveProject(
      prjId,
      this.type === "active" ? ProjectStatus.ACTIVE : ProjectStatus.FINISHED
    );
  }

  @autobind
  dragLeaveHandler(_: DragEvent) {
    const listEl = this.element.querySelector("ul")!;
    listEl.classList.remove("droppable");
  }

  configure() {
    this.element.addEventListener("dragover", this.dragOverHandler);
    this.element.addEventListener("dragleave", this.dragLeaveHandler);
    this.element.addEventListener("drop", this.dropHandler);
    projectList.addListener((projects: Project[]) => {
      const relevantProject = projects.filter((prj) => {
        if (this.type == "active") {
          return prj.projectStatus === ProjectStatus.ACTIVE;
        }
        return prj.projectStatus === ProjectStatus.FINISHED;
      });
      this.assignedProjects = relevantProject;
      this.renderProjects();
    });
  }

  private renderProjects() {
    const listEl = document.getElementById(
      `${this.type}-projects-list`
    )! as HTMLUListElement;
    listEl.innerHTML = "";
    for (const prjItem of this.assignedProjects) {
      new ProjectItem(`${this.type}-projects-list`, prjItem);
    }
  }

  renderContent() {
    const listId = `${this.type}-projects-list`;
    this.element.querySelector("ul")!.id = listId;
    this.element.querySelector(
      "h2"
    )!.textContent = `${this.type.toUpperCase()} PROJECTS`;
  }
}
