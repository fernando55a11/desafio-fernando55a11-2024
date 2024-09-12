class RecintosZoo {
    constructor() {
        this.recintos = [
            { numero: 1, espacoTotal: 10, espacoLivre: 10, biomas: ["savana"], animais: [] },
            { numero: 2, espacoTotal: 5, espacoLivre: 5, biomas: ["floresta"], animais: [] },
            { numero: 3, espacoTotal: 7, espacoLivre: 7, biomas: ["floresta"], animais: [] },
            { numero: 4, espacoTotal: 8, espacoLivre: 8, biomas: ["pantano"], animais: [] }
        ];

        this.animaisValidos = {
            "MACACO": { biomas: ["floresta"], espaco: 2 },
            "CROCODILO": { biomas: ["pantano"], espaco: 3 },
            "HIPOPOTAMO": { biomas: ["savana", "rio"], espaco: 6 },
            "LEAO": { biomas: ["savana"], espaco: 5 }
        };
    }

    analisaRecintos(animal, quantidade) {
        if (!this.animaisValidos[animal]) {
            return { erro: "Animal inválido", recintosViaveis: null };
        }

        if (quantidade <= 0) {
            return { erro: "Quantidade inválida", recintosViaveis: null };
        }

        const { biomas: biomasAnimal, espaco: espacoAnimal } = this.animaisValidos[animal];
        const espacoNecessario = espacoAnimal * quantidade;

        const recintosViaveis = this.recintos
            .filter(recinto => {
                return biomasAnimal.some(b => recinto.biomas.includes(b)) && recinto.espacoLivre >= espacoNecessario;
            })
            .map(recinto => {
                const espacoLivreAposAdicao = recinto.espacoLivre - espacoNecessario;
                return {
                    numero: recinto.numero,
                    espacoLivreAposAdicao: espacoLivreAposAdicao,
                    descricao: `Recinto ${recinto.numero} (espaço livre: ${espacoLivreAposAdicao} total: ${recinto.espacoTotal})`
                };
            })
            .sort((a, b) => b.espacoLivreAposAdicao - a.espacoLivreAposAdicao || a.numero - b.numero)
            .map(item => item.descricao);

        if (recintosViaveis.length === 0) {
            return { erro: "Não há recinto viável", recintosViaveis: null };
        }

        return { erro: null, recintosViaveis };
    }
}

export { RecintosZoo };