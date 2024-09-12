class RecintosZoo {
    constructor() {
        this.recintos = [
            { numero: 1, espacoTotal: 10, espacoLivre: 7, biomas: ["savana"], animais: ['MACACO', 'MACACO', 'MACACO'] },
            { numero: 2, espacoTotal: 5, espacoLivre: 5, biomas: ["floresta"], animais: [] },
            { numero: 3, espacoTotal: 7, espacoLivre: 5, biomas: ["savana", "rio"], animais: ['GAZELA'] },
            { numero: 4, espacoTotal: 8, espacoLivre: 8, biomas: ["rio"], animais: [] },
            { numero: 5, espacoTotal: 9, espacoLivre: 6, biomas: ["savana"], animais: ['LEAO'] }
        ];
 
        this.animaisValidos = {
            "LEAO": { biomas: ["savana"], espaco: 3, especie: "carnivoro" },
            "LEOPARDO": { biomas: ["savana"], espaco: 2, especie: "carnivoro" },
            "CROCODILO": { biomas: ["rio"], espaco: 3, especie: "carnivoro" },
            "MACACO": { biomas: ["savana", "floresta"], espaco: 1, especie: "onivoro" },
            "GAZELA": { biomas: ["savana"], espaco: 2, especie: "herbivoro" },
            "HIPOPOTAMO": { biomas: ["savana", "rio"], espaco: 4, especie: "herbivoro" }
        };
    }
 
    podeCarnivoroNoRecinto(recinto) {
        return !recinto.animais.find(animal => this.animaisValidos[animal].especie !== "carnivoro");
    }
 
    temCarnivoroNoRecinto(recinto) {
        return recinto.animais.find(animal => this.animaisValidos[animal].especie === "carnivoro");
    }
 
    temEspeciesDiferentes(recinto, animal) {
        return recinto.animais.find(a => this.animaisValidos[a].especie !== animal.especie);
    }
 
    analisaRecintos(nomeAnimal, quantidade) {
        if (!this.animaisValidos[nomeAnimal]) {
            return { erro: "Animal inválido", recintosViaveis: null };
        }
 
        if (quantidade <= 0) {
            return { erro: "Quantidade inválida", recintosViaveis: null };
        }
 
        const animal = this.animaisValidos[nomeAnimal];
        const espacoNecessario = animal.espaco * quantidade;
 
        const recintosViaveis = this.recintos
            .filter(recinto => {
                if (recinto.espacoLivre <= espacoNecessario) {
                    return false;
                }
 
                if (recinto.biomas.some(bioma => animal.biomas.includes(bioma)) === false) {
                    return false;
                }
 
                if (animal.especie === "carnivoro") {
                    return this.podeCarnivoroNoRecinto(recinto);
                } else {
                    return !this.temCarnivoroNoRecinto(recinto);
                }
            })
            .map(recinto => {
                let espacoLivreAposAdicao = recinto.espacoLivre - espacoNecessario;
 
                if (this.temEspeciesDiferentes(recinto, animal)) {
                    espacoLivreAposAdicao -= 1;
                }
 
                return `Recinto ${recinto.numero} (espaço livre: ${espacoLivreAposAdicao} total: ${recinto.espacoTotal})`;
            });
 
        if (recintosViaveis.length === 0) {
            return { erro: "Não há recinto viável", recintosViaveis: null };
        }
 
        return { erro: null, recintosViaveis };
    }
}
 
export { RecintosZoo };
 
