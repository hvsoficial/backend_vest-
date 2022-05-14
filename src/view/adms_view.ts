import Adm from "../models/Adm"

export default {
	render(adm: Adm) {
		return {
			id: adm.id,
			name: adm.name,
            email: adm.email,
            senha: adm.senha
		}
	},

	renderMany(adms: Adm[]) {
		return adms.map(adm => this.render(adm))
	}
}