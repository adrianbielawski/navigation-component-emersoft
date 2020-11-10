import { ItemType, Item } from './item'

const Navigation = (container: Element, items: ItemType[]) => {
    const list = document.createElement('ul')
    list.className = 'navigation'
    container.appendChild(list)

    const listItems = []
    const widths = []

    for (let item of items) {
        const li = Item(item)
        list.appendChild(li)
        widths.push(li.getBoundingClientRect().width)
        listItems.push(li)
    }

    const showMore = document.createElement('li')
    showMore.className = 'group show-more'

    const showMoreTitle = document.createElement('span')
    showMoreTitle.innerText = 'Show More'
    showMore.appendChild(showMoreTitle)

    const chevron = document.createElement('i')
    chevron.classList.add('fas', 'fa-sort-amount-down-alt')
    showMoreTitle.prepend(chevron)

    const showMoreChildren = document.createElement('ul')
    showMore.appendChild(showMoreChildren)

    let showMoreActive = false

    showMore.addEventListener('click', (e) => {
        e.stopPropagation()

        showMoreActive = !showMoreActive

        const itemsWidth = showMore.offsetLeft - list.offsetLeft;
        showMoreChildren.style.width = `${list.clientWidth - itemsWidth}px`
        showMore.parentElement.querySelectorAll('.active').forEach(c => {
            c.classList.remove('active')
        })
        showMore.classList.toggle('active', showMoreActive)
        chevron.classList.toggle('fa-sort-amount-up-alt', showMoreActive)
        chevron.classList.toggle('fa-sort-amount-down-alt', !showMoreActive)

        const hide = () => {
            showMoreActive = false
            showMore.classList.remove('active')
            chevron.classList.remove('fa-short-amount-up')
            chevron.classList.add('fa-short-amount-down')
            document.removeEventListener('click', hide)
        }
        document.addEventListener('click', hide)
    })

    list.appendChild(showMore)

    const reflow = () => {
        let i = 0
        let itemsWidth = 0

        while (itemsWidth < list.getBoundingClientRect().width && i < items.length) {
            itemsWidth += listItems[i].getBoundingClientRect().width
            i++
        }

        if (i < items.length) {
            while (itemsWidth + showMore.getBoundingClientRect().width > list.getBoundingClientRect().width) {
                itemsWidth -= listItems[i].getBoundingClientRect().width
                i--
            }
        }

        listItems.slice(0, i).forEach(li => {
            list.insertBefore(li, showMore)
        })
        if (i < items.length) {
            listItems.slice(i).forEach(li => {
                showMoreChildren.appendChild(li)
            })
            showMore.classList.add('visible')
        }
    }

    window.addEventListener('resize', reflow)
    document.fonts.ready.then(reflow)
}

export default Navigation
