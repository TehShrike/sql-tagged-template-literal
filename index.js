const escape = require(`sqlstring`).escape

module.exports = function sqlTag(queryParts, ...values) {
	return queryParts.reduce((query, queryPart, i) => {
		const valueExists = i < values.length
		const text = query + queryPart
		if (!valueExists) {
			return text
		}
		if (text.endsWith(`$`)) {
			return text.slice(0, -1) + values[i]
		}
		return text + smarterEscape(values[i])
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
