export function parseRelations(properties: { [key: string]: { type: string, relation: any[] } }) {
    if (!properties) return [];
    const relations = [];
    for (const [key, value] of Object.entries(properties)) {
        if (value?.type === "relation") {
            relations.push({
                name: key,
                relations: value.relation
            });
        }
    }
    return relations;
}