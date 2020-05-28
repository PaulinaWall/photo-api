module.exports = (bookshelf) => {
	return bookshelf.model('User', {
		tableName: 'user',
		albums() {
			return this.hasMany('Album');
		},
		photos() {
			return this.hasMany('Photo');
		},
		fetchById(id, fetchOptions = {}) {
			return new this({ id }).fetch(fetchOptions);
		},
	});
};
