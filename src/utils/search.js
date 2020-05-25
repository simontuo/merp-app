export function getQuery(components) {
    let query = {}
    for (let index in components) {
        if (typeof components[index] === 'object' && components[index].hasOwnProperty('searchComponent') && components[index].searchComponent) {
            query[index] = components[index].value;
        }
    }

    return query
}