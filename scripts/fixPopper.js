import {readFileSync as read, writeFileSync as write} from 'fs'

const main = () => {
    const pkgPath = './node_modules/@popperjs/core/package.json'
    let popper = JSON.parse(read(pkgPath, 'utf8'))
    popper['type'] = 'module' 
    write(pkgPath, JSON.stringify(popper))
}

main()