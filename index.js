const escape = require('sqlstring').escape

module.exports = function sqlTag(queryParts, ...values) {
	return queryParts.reduce((query, queryPart, i) =>
		`${query}${queryPart}${i < values.length ? jsonCapableEscape(values[i]) : ''}`,
		'')
}

function jsonCapableEscape(str) {
	return escape(isObject(str) ? JSON.stringify(str) : str)
}

function isObject(str) {
	return str && typeof str === 'object'
}
