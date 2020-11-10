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
    if (item.url !== undefined) {
        const link = document.createElement('a')
        link.href = item.url
        link.innerText = item.title
        li.appendChild(link)
    }
    else {
        li.className = 'group'
        let active = false

        const title = document.createElement('span')
        title.innerText = item.title

        const chevron = document.createElement('i')
        chevron.classList.add('fas', 'fa-chevron-down')
        title.appendChild(chevron)

        li.appendChild(title)

        const children = document.createElement('ul')
        for (let child of item.children) {
            const childLi = Item(child)
            children.appendChild(childLi)
        }
        li.appendChild(children)

        li.addEventListener('click', (e) => {
            e.stopPropagation()

            active = !active

            children.style.maxWidth = `${li.clientWidth}px`
            li.parentElement.querySelectorAll('.active').forEach(c => {
                c.classList.remove('active')
                const chevron = c.querySelector('i')
                chevron.classList.remove('fa-chevron-up')
                chevron.classList.add('fa-chevron-down')
            })
            li.classList.toggle('active', active)
            chevron.classList.toggle('fa-chevron-up', active)
            chevron.classList.toggle('fa-chevron-down', !active)

            const hide = () => {
                active = false
                li.classList.remove('active')
                chevron.classList.remove('fa-chevron-up')
                chevron.classList.add('fa-chevron-down')
                document.removeEventListener('click', hide)
            }
            document.addEventListener('click', hide)
        })
    }
    return li
}
