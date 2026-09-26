export function replaceHtmlSymbols(value) {
    return value.replaceAll('<', '&lt;').replaceAll('>', '&gt;')
}
