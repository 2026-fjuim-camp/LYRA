export default class Utils {
    static toSnakeCase(str: string): string {
        return str
            .replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`)
            .toLowerCase()
            .replace(/\s+/g, '_')
            .replace(/_+/g, '_')
            .replace(/(^_|_$)/g, '');
    };
}