export function parseRelations(properties: any) {
    if (!properties) return [];
    const relations: { name: string, relations: any }[] = [];
    const entries = Object.entries(properties) as [
        string,
        { type: string; relation: { id: string }[] }
    ][];

    for (const [key, value] of entries) {
        if (value.type === "relation") {
            relations.push({
                name: key,
                relations: value.relation,
            });
        }
    }
    return relations;
}