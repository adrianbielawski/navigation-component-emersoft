import Navigation from './navigation'

const navigation = Navigation([
    {title: 'Visual language', url: '#'},
    {title: 'Components', children: [
        {title: 'Action', url: '#'},
        {title: 'Another action', url: '#'},
        {title: 'Something else here', url: '#'},
    ]},
    {title: 'Components 1', url: '#'},
    {title: 'Components 2', url: '#'},
    {title: 'Components 3', url: '#'},
    {title: 'Components 4', children: [
        {title: 'Action', url: '#'},
        {title: 'Another action', url: '#'},
        {title: 'Something else here', url: '#'},
    ]},
    {title: 'Components 5', url: '#'},
    {title: 'Components 6', url: '#'},
])

const container = document.querySelector('#container')
container.appendChild(navigation)
