export const something = "...";
export default class Component {
    constructor(templateId, hostId, elementId, insertAtStart) {
        this.templateElement = document.getElementById(templateId);
        this.hostElement = document.getElementById(hostId);
        const importedNode = document.importNode(this.templateElement.content, true);
        this.element = importedNode.firstElementChild;
        this.element.id = elementId;
        this.attach(insertAtStart);
    }
    attach(insertAtBeginning) {
        this.hostElement.insertAdjacentElement(insertAtBeginning === true ? "afterbegin" : "beforeend", this.element);
    }
}
//# sourceMappingURL=base-component.js.map