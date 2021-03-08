export const something = "...";

export default abstract class Component<
  T extends HTMLElement,
  U extends HTMLElement
> {
  templateElement: HTMLTemplateElement;
  hostElement: T;
  element: U;

  constructor(
    templateId: string,
    hostId: string,
    elementId: string,
    insertAtStart: boolean
  ) {
    this.templateElement = document.getElementById(
      templateId
    ) as HTMLTemplateElement;
    this.hostElement = document.getElementById(hostId) as T;

    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );

    this.element = importedNode.firstElementChild as U;
    this.element.id = elementId;
    this.attach(insertAtStart);
  }

  private attach(insertAtBeginning: boolean) {
    this.hostElement.insertAdjacentElement(
      insertAtBeginning === true ? "afterbegin" : "beforeend",
      this.element
    );
  }

  abstract renderContent(): void;
  abstract configure(): void;
}
