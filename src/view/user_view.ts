import User from "../models/User"

export default {
	render(user: User) {
		return {
			id: user.id,
			name: user.name,
			telephone: user.telephone,
			email: user.email,
			senha: user.senha
		}
	},

	renderMany(users: User[]) {
		return users.map(user => this.render(user))
	}
}