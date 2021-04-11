const escape = require(`sqlstring`).escape

module.exports = function sqlTag(queryParts, ...values) {
	return queryParts.reduce((query, queryPart, i) => {
		const valueExists = i < values.length
		const text = query + queryPart

		return valueExists ? text + smarterEscape(values[i]) : text
	}, ``)
}

const smarterEscape = value => {
	if (Array.isArray(value)) {
		return value.map(element => smarterEscape(element)).join(`, `)
	} else if (isObject(value)) {
		return escape(JSON.stringify(value))
	}

	return escape(value)
}

const isObject = str => str && typeof str === `object`
