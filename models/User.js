const bcrypt = require('bcrypt');

module.exports = (bookshelf) => {
	return bookshelf.model('User', {
		tableName: 'user',
		albums() {
			return this.hasMany('Album');
		},
		photos() {
			return this.hasMany('Photo');
		},
	}, {
		hashSaltRounds: 10,

		fetchById(id, fetchOptions = {}) {
			return new this({ id }).fetch(fetchOptions);
		},
		async login(email, password) {
			const user = await new this({ email }).fetch({ require: false });

			if (!user) {
				return false;
			}

			const hash = user.get('password');
			const result = await bcrypt.compare(password, hash);

			return (result)
				? user
				: false;
		},
	});
};
