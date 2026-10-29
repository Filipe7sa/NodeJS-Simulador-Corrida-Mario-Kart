const player1 = {
    NOME: "Mario",
    VELOCIDADE: 4,
    MANOBRABILIDADE: 3,
    PODER: 3,
    PONTOS: 0
};

const player2 = {
    NOME: "Luigi",
    VELOCIDADE: 3,
    MANOBRABILIDADE: 4,
    PODER: 4,
    PONTOS: 0
};

// Função para jogar os dados de 1 a 6
// assync faz com que a função aguarde ser chamada.
async function rollDice(){
    // floor arredonda o valor gerado pelo random. 
    return Math.floor(Math.random() * 6) + 1;
}

async function getRandomBlock(){
    let random = Math.random();
    let result;

    switch (true) {
        case random < 0.33:
            result = "RETA";
            break;
        case random < 0.66:
            result = "CURVA";
            break;
        default:
            result = "CONFRONTO";
    }

    return result;
}

async function getRandomBoost(){
    let random = Math.random();

    return (random < 0.5 ? 0 : 1);
    
}

async function getRandomBomb(){
    let random = Math.random();

    return (random < 0.5 ? 0 : 1);
}

async function logRollResult(characterName, block, diceResult, attribute){
    console.log(`${characterName} 🎲 rolou um dado de ${block} ${diceResult} + ${attribute} = ${diceResult + attribute}`);    
}

async function playRaceEngine(character1, character2){
    for(let round = 1; round <= 10; round++){
        console.log(`🏁 Rodada ${round}`);

        //sortear block
        let block = await getRandomBlock();
        console.log(`Bloco ${block}`);

        // Rolar dados
        let diceResult1 = await rollDice();
        let diceResult2 = await rollDice();

        // Teste de habilitade
        let totalTestSkill1 = 0;
        let totalTestSkill2 = 0;

        if(block === "RETA"){
            totalTestSkill1 = diceResult1 + character1.VELOCIDADE;
            totalTestSkill2 = diceResult2 + character2.VELOCIDADE;

            await logRollResult(
                character1.NOME,
                "Velocidade",
                diceResult1,
                character1.VELOCIDADE
            );
            await logRollResult(
                character2.NOME,
                "Velocidade",
                diceResult2,
                character2.VELOCIDADE
            );
            
        }
        if(block === "CURVA"){
            totalTestSkill1 = diceResult1 + character1.MANOBRABILIDADE;
            totalTestSkill2 = diceResult2 + character2.MANOBRABILIDADE;

            await logRollResult(
                character1.NOME,
                "Manobrabilidade",
                diceResult1,
                character1.MANOBRABILIDADE
            );
            await logRollResult(
                character2.NOME,
                "Manobrabilidade",
                diceResult2,
                character2.MANOBRABILIDADE
            );
        }
        if(block === "CONFRONTO"){
            let powerResulut1 = diceResult1 + character1.PODER;
            let powerResulut2 = diceResult2 + character2.PODER;
            let boostResult = await getRandomBoost();
            let bombResult = await getRandomBomb();

            console.log(`${character1.NOME} confrontou com ${character2.NOME} 🥊`);

            await logRollResult(
                character1.NOME,
                "Poder",
                diceResult1,
                character1.PODER
            );
            await logRollResult(
                character2.NOME,
                "Poder",
                diceResult2,
                character2.PODER
            );
           
            if(powerResulut1 > powerResulut2 && character2.PONTOS > 0){

                if(bombResult > 0 && character2.PONTOS > 1){
                    console.log(`${character1.NOME} venceu o confronto! ${character2.NOME} perdeu dois pontos 💣`);
                    character2.PONTOS -= 2;
                } else{
                    console.log(`${character1.NOME} venceu o confronto! ${character2.NOME} perdeu um ponto 🐢`);
                    character2.PONTOS--;
                }

                if (boostResult > 0){
                    console.log(`${character1.NOME} encontrou um boost 🍄 e ganhou um ponto!`);
                    character1.PONTOS++;
                }           
            }

            if(powerResulut2 > powerResulut1 && character1.PONTOS > 0){

                if(bombResult > 0 && character1.PONTOS > 1){
                    console.log(`${character2.NOME} venceu o confronto! ${character1.NOME} perdeu dois pontos 💣`);
                    character1.PONTOS-= 2;
                } else{
                    console.log(`${character2.NOME} venceu o confronto! ${character1.NOME} perdeu um ponto 🐢`);
                    character1.PONTOS--;
                }
                
                if (boostResult > 0){
                    console.log(`${character2.NOME} encontrou um boost 🍄 e ganhou um ponto!`);
                    character2.PONTOS++;
                }  
            }
            
            //if ternario
            console.log(
                powerResulut1 === powerResulut2 
                ? "Confronto empatado! Nenhum ponto foi perdido"
                : ""
            );        
        }

        //Verificando o vencedor da rodada
        if(totalTestSkill1 > totalTestSkill2){
            console.log(`${character1.NOME} marcou um ponto!`);
            character1.PONTOS++;
        }else if(totalTestSkill2 > totalTestSkill1){
            console.log(`${character2.NOME} marcou um ponto!`);
            character2.PONTOS++;
        }

        console.log("----------------------------------")
    } 

}

async function declareWinner(character1, character2) {
    console.log("Resultado final:");
    console.log(`${character1.NOME}: ${character1.PONTOS} ponto(s)`);
    console.log(`${character2.NOME}: ${character2.PONTOS} ponto(s)`);

    if(character1.PONTOS > character2.PONTOS)
        console.log(`${character1.NOME} venceu a corrida! Parabéns! 🏆`);
    else if(character2.PONTOS > character1.PONTOS)
        console.log(`${character2.NOME} venceu a corrida! Parabéns! 🏆`);
    else
        console.log("A corrida terminou em empate!");
    
}

(async function main(){
    console.log(
        `🏁🚨 Corrida entre ${player1.NOME} e ${player2.NOME} começando...\n`
    )

    await playRaceEngine(player1, player2);
    await declareWinner(player1, player2);
})();

