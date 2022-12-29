const escape = require(`sqlstring`).escape

module.exports = function sqlTag(queryParts, ...values) {
	return queryParts.reduce((query, queryPart, i) => {
		const valueExists = i < values.length
		const text = query + queryPart

		return valueExists ? text + smarterEscape(values[i]) : text
	}, ``)
}

const smarterEscape = (value, addParensToArrays) => {
	if (Array.isArray(value)) {
		let result = value.map(element => smarterEscape(element, true)).join(`, `)
		if (addParensToArrays) {
			result = `(` + result + `)`
		}
		return result
	} else if (isObject(value)) {
		return escape(JSON.stringify(value))
	}

	return escape(value)
}

const isObject = str => str && typeof str === `object`
