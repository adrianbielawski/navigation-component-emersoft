interface ItemWithUrl {
    title: string,
    url: string,
    children?: never,
}

interface ItemWithChildren {
    title: string,
    url?: never,
    children: ItemWithUrl[],
}

export type ItemType = ItemWithUrl | ItemWithChildren

export const Item = (item: ItemType) : HTMLLIElement => {
    const li = document.createElement('li')
    if ((item as ItemWithUrl).url !== undefined) {
        const link = document.createElement('a')
        link.href = (item as ItemWithUrl).url
        link.innerText = item.title
        li.appendChild(link)
    }
    else {
        const title = document.createElement('span')
        title.innerText = item.title
        li.appendChild(title)

        const children = document.createElement('ul')
        for (let child of item.children) {
            const childLi = Item(child)
            children.appendChild(childLi)
        }
        li.appendChild(children)
    }
    return li
}
