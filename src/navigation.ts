import { ItemType, Item } from './item'

const Navigation = (items: ItemType[]) : HTMLUListElement => {
    const list = document.createElement('ul')
    list.className = 'navigation'
    for (let item of items) {
        const li = Item(item)
        list.appendChild(li)
    }
    return list
}

export default Navigation
