export const addToNode = (grandParent, nodeType, name, nodeContent) => {
    const node = document.createElement(nodeType);
    const textNode = document.createTextNode(nodeContent);
    node.className = name;
    node.appendChild(textNode);
    grandParent.lastChild.appendChild(node);
    return node;
};

export const addImage = (grandParent, link, title) => {
    const img = document.createElement("img");
    img.className = "book-item__img";
    img.src = link;
    img.alt = title;
    grandParent.lastChild.appendChild(img);
};

export const createWrapper = (parent, name, id) => {
    const div = document.createElement("div");
    parent.appendChild(div);
    div.className = name;
    div.id = id;
};

export const clearNode = (parentNode) => {
    const div = parentNode;
    while (div.firstChild) {
        div.removeChild(div.firstChild);
    }
};
