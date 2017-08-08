const escape = require('sqlstring').escape

module.exports = function sqlTag(queryParts, ...values) {
	return queryParts.reduce((query, queryPart, i) => {
			const valueExists = i < values.length
			const text = query + queryPart

			return valueExists ? text + jsonCapableEscape(values[i]) : text
		}, '')
}

const jsonCapableEscape = str => escape(isObject(str) ? JSON.stringify(str) : str)
const isObject = str => str && typeof str === 'object'
