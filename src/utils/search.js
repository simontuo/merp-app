export function getQuery(components) {
    let query = {}
    for (let index in components) {
        if (components[index].searchComponent) {
            query[index] = components[index].value;
        }
    }

    return query
}