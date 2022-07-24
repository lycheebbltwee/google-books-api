export const addToNode = (grandParent, nodeType, nodeContent) => {
    const node = document.createElement(nodeType);
    const textNode = document.createTextNode(nodeContent);
    node.appendChild(textNode);
    grandParent.lastChild.appendChild(node);
};

export const addImage = (grandParent, link, title) => {
    const img = document.createElement("img");
    img.src = link;
    img.alt = title;
    grandParent.lastChild.appendChild(img);
};

export const createWrapper = (parent, name) => {
    const div = document.createElement("div");
    parent.appendChild(div);
    div.className = name;
    div.id = name;
};

export const clearNode = (parentNode) => {
    const div = parentNode;
    while (div.firstChild) {
        div.removeChild(div.firstChild);
    }
};