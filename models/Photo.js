module.exports = (bookshelf) => {
	return bookshelf.model('Photo', {
		tableName: 'photo',
	});
}
