import autoAnimate from "@formkit/auto-animate";
// simple animated list, powered by auto-animate
export class AnimatedList {
    #list: ListItem[];
    #element: HTMLElement;
    constructor(element: HTMLElement) {
        this.#list = [];
        this.#element = element;
        autoAnimate(this.#element);
    }
    add(item: string) {
        this.#list.push(new ListItem(item));
        this.#rebuild();
    }
    remove(index: number) {
        this.#list.splice(index, 1);
        this.#rebuild();
    }
    set(index: number, item: string) {
        this.#list[index].item = item;
        this.#rebuild();
    }
    move(from: number, to: number) {
        const [item] = this.#list.splice(from, 1);
        this.#list.splice(to, 0, item);
        this.#rebuild();
    }
    setCompleted(index: number, completed: boolean) {
        this.#list[index].completed = completed;
        this.#rebuild();
    }
    toggleCompleted(index: number) {
        this.#list[index].completed = !this.#list[index].completed;
        this.#rebuild();
    }
    removeByHash(hash: string) {
        const index = this.#list.findIndex(item => item.hash === hash);
        if (index !== -1) {
            this.#list.splice(index, 1);
            this.#rebuild();
        }
    }
    #rebuild() {
        // removed
        for (const child of Array.from(this.#element.children)) {
            if (!this.#list.find(item => item.hash === child.id)) {
                this.#element.removeChild(child);
            }
        }
        // added/moved/changed
        for (const item of this.#list) {
            const existing = document.getElementById(item.hash);
            if (existing) {
                if (existing.textContent !== item.item) {
                    existing.textContent = item.item;
                }
                if (existing.classList.contains("completed") !== item.completed) {
                    existing.classList.toggle("completed");
                }
                this.#element.appendChild(existing)
            } else {
                let ele = item.createElement();
                ele.onclick = (e) => {
                    e.preventDefault();
                    if (e.shiftKey) {
                        this.removeByHash(ele.id);
                    } else {
                        this.toggleCompleted(this.#list.findIndex(i => i.hash === ele.id));
                    }
                    
                }
                this.#element.appendChild(ele);
            }
        }
        
    }
}


export class ListItem {
    #item: string;
    #hash: string;
    completed: boolean;
    constructor(item: string) {
        this.#item = item;
        this.#hash = calcHash();
        this.completed = false;
    }
    get item() {
        return this.#item;
    }
    get hash() {
        return this.#hash;
    }
    set item(value: string) {
        this.#item = value;
    }

    createElement() {
        const element = document.createElement("li");
        element.textContent = this.#item;
        element.id = this.#hash;
        if (this.completed) {
            element.classList.add("completed");
        }
        element.classList.add("list-item");
        return element;
    }
}


function calcHash(): string {
    return Math.random().toString(36).slice(2);
}