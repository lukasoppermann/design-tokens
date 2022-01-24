const acceptedTypes = ['color', 'dimension', 'font', 'custom-radius', 'custom-stroke', 'custom-fontStyle', 'custom-shadow', 'custom-gradient']

module.exports = (token) => acceptedTypes.includes(token.type)
