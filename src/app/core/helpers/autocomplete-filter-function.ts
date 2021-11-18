function removeAccent(str: string): string {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

export const autocompleteFilterFunction = function (array: any[], attr: string, search: string) {
    const filterValue = removeAccent(search.toLowerCase());
    return array.filter(option => removeAccent(option[attr].toLowerCase()).includes(filterValue));
}