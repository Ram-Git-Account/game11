//health, mana, attack, defense, skill, story, rang (max = 5)
// Объект с персонажами и их характеристиками
var characters = {
    'blue_samurai': {'health': 100, 'attack': 15, 'defense': 10, 'magic': 40, 'skill': 5, 'open': 0, 'level':0, 'name':'Синий самурай'},
    'white_dragon': {'health': 120, 'attack': 20, 'defense': 11, 'magic': 80, 'skill': 1, 'open': 0, 'level':0, 'name':'Белый дракон'},
    'cowboy': {'health': 90, 'attack': 17, 'defense': 9, 'magic': 45, 'skill': 6, 'open': 0, 'level':0, 'name':'Ковбой'},
    'lucifer': {'health': 140, 'attack': 23, 'defense': 23, 'magic': 80, 'skill': 13, 'open': 1, 'level':0, 'name':'Дьявол'},
    'ogre_mage': {'health': 100, 'attack': 16, 'defense': 12, 'magic': 50, 'skill': 1, 'open': 0, 'level':0, 'name':'Огр-маг'},
    'ogre': {'health': 110, 'attack': 19, 'defense': 10, 'magic': 30, 'skill': 6, 'open': 0, 'level':0, 'name':'Огр'},
    'pink_dragon': {'health': 110, 'attack': 22, 'defense':11, 'magic': 80, 'skill': 13, 'open': 1, 'level':0, 'name':'Розовый дракон'},
    'pirate': {'health': 80, 'attack': 15, 'defense': 9, 'magic': 40, 'skill': 1, 'open': 0, 'level':0, 'name':'Пират'},
    'zombie': {'health': 98, 'attack': 14, 'defense': 8, 'magic': 25, 'skill': 6, 'open': 0, 'level':0, 'name':'Зомби'},
    'haos': {'health': 150, 'attack': 20, 'defense': 10, 'magic': 60, 'skill': 13, 'open': 1, 'level':0, 'name':'Генерал Хаоса'}
};
function PvEm(){
    
    var mZone = document.querySelector('.PvEmode');
    mZone.style.display = 'none';
    var menuZone = document.querySelector('.vs-zone');
    menuZone.style.display = 'inline-flex';
    
}
var noninvis=false;
var choose_pl=false;
var choose_en=false;
var player_health = 0;
var player_attack = 0;
var player_defense =0;
var player_magic = 0;
var player_skill = 0;
var player_open =0;
var player_level= 0;
var player_name=0;
var enemy_health = 0;
var enemy_attack = 0;
var enemy_defense = 0;
var enemy_magic = 0;
var enemy_skill = 0;
var enemy_open = 0;
var enemy_level= 0;
var enemy_name= 0;
// Функция для выбора персонажа
function chooseCharacter_player(characterName) {
    player_health = characters[characterName]['health'];
    player_attack = characters[characterName]['attack'];
    player_defense = characters[characterName]['defense'];
    player_magic = characters[characterName]['magic'];
    player_skill = characters[characterName]['skill'];
    player_open = characters[characterName]['open'];
    player_level= characters[characterName]['level'];
    player_name= characters[characterName]['name'];
    yourStatElement = document.querySelector('.your-stat');
    choose_pl=true;
    yourStatElement.textContent = `${player_name}\n
    Здоровье: ${player_health}\n
    Мана: ${player_magic}\n
    Атака: ${player_attack}\n
    Защита: ${player_defense}`;
    var blueSamuraiImage = document.querySelector('.blue-port');
    blueSamuraiImage.src = ('img/'+characterName+'.jpeg');
    if (choose_en && choose_pl && true){
    var battleZone = document.querySelector('.battle-zone');
    battleZone.style.display = 'inline';
    var menuZone = document.querySelector('.vs-zone');
    menuZone.style.display = 'none';
    }
}
function chooseCharacter_enemy(characterName) {
    enemy_health = characters[characterName]['health'];
    enemy_attack = characters[characterName]['attack'];
    enemy_defense = characters[characterName]['defense'];
    enemy_magic = characters[characterName]['magic'];
    enemy_skill = characters[characterName]['skill'];
    enemy_open = characters[characterName]['open'];
    enemy_level= characters[characterName]['level'];
    enemy_name= characters[characterName]['name'];
    enemyStatElement = document.querySelector('.en-stat');
    enemyStatElement.textContent = `${enemy_name} \n   
    Здоровье: ${enemy_health}\n
    Мана: ${enemy_magic}\n
    Атака: ${enemy_attack}\n
    Защита: ${enemy_defense}`;
    var choose_en=true;
    var redSamuraiImage = document.querySelector('.red-port');
    redSamuraiImage.src = ('img/'+characterName+'.jpeg');
    if (choose_en && choose_pl && true){
        var battleZone = document.querySelector('.battle-zone');
        battleZone.style.display = 'inline';
        var menuZone = document.querySelector('.vs-zone');
        menuZone.style.display = 'none';
        }
}
var pl_hit = 0
var en_hit = 0 
function scorehit(){
    pl_hit = enemy_attack - player_defense;
    if (pl_hit<1){
        pl_hit=1
    }
    en_hit = player_attack - enemy_defense;
    if (en_hit<1){
        en_hit=1
    }    
}


function enemy_move() {
    scorehit();
    if (pl_hit < 5 && enemy_magic>19){
        var enemymoving = document.querySelector('.enemy_move');
        enemy_attack+=5
        enemy_magic-=20
        enemymoving.textContent = `${enemy_name} использует Жажду крови (+5 к атаке)`;
        return 0        
    }
    if (en_hit < 5 && enemy_magic>14){
        var enemymoving = document.querySelector('.enemy_move');
        enemy_defense+=5
        enemy_magic-=15
        enemymoving.textContent = `${enemy_name} использует Каменную кожу (+5 к защите)`;
        return 0        
    }
    if (enemy_health < 50 && enemy_magic>9 && en_hit<19){
        var enemymoving = document.querySelector('.enemy_move');
        enemy_health+=20
        enemy_magic-=10
        enemymoving.textContent = `${enemy_name} использует Лечение (+20 к здоровью)`;
        return 0        
    }
    var enemymoving = document.querySelector('.enemy_move');
    player_health=player_health-pl_hit
    enemymoving.textContent = `${enemy_name} атакует и наносит ${pl_hit} урона.`;
            
}
function showbattlestat(){
    yourStatElement.textContent = `${player_name}\n
    Здоровье: ${player_health}\n
    Мана: ${player_magic}\n
    Атака: ${player_attack}\n
    Защита: ${player_defense}`;
    enemyStatElement.textContent = `${enemy_name}\n
    Здоровье: ${enemy_health}\n
    Мана: ${enemy_magic}\n
    Атака: ${enemy_attack}\n
    Защита: ${enemy_defense}`;
}


function allattackclick(name){
    //Атака
    if (name == 'attack'){
    scorehit();
    var playermoving = document.querySelector('.player_move');
    enemy_health=enemy_health-en_hit
    playermoving.textContent = `${player_name} атакует и наносит ${en_hit} урона.`;
    enemy_move();
    showbattlestat(); Condition();
    return 0} 
    //Лечение
    if(name == 'heal' && player_magic>=10){
    player_health+=20;
    player_magic-=10;
    var playermoving = document.querySelector('.player_move');
    playermoving.textContent = `${player_name} испольует Лечение (+ 20 к  здоровью)`;
    enemy_move();
    showbattlestat();Condition(); return 0} else{
        var playermoving = document.querySelector('.player_move');
        playermoving.textContent = `Не хватает маны`;
    }
    if(name == 'block' && player_magic>=15){
        player_defense+=5;
        player_magic-=15;
        var playermoving = document.querySelector('.player_move');
        playermoving.textContent = `${player_name} испольует Каменную кожу (+ 5 к  защите)`;
        enemy_move();
        showbattlestat();Condition();
        return 0 } else{
            var playermoving = document.querySelector('.player_move');
            playermoving.textContent = `Не хватает маны`;
        }
    
    if(name == 'fire' && player_magic>=20){
        player_attack+=5;
        player_magic-=20;
        var playermoving = document.querySelector('.player_move');
        playermoving.textContent = `${player_name} испольует Жажду крови (+ 5 к  атаке)`;
        enemy_move();
        showbattlestat();Condition(); return 0} else{
            var playermoving = document.querySelector('.player_move');
            playermoving.textContent = `Не хватает маны`;
        }
}


function Condition(){
    if (player_health<0){
        noninvis=false;
        choose_pl=false;
        choose_en=false;
        player_health = 0;
        player_attack = 0;
        player_defense =0;
        player_magic = 0;
        player_skill = 0;
        player_open =0;
        player_level= 0;
        player_name=0;
        enemy_health = 0;
        enemy_attack = 0;
        enemy_defense = 0;
        enemy_magic = 0;
        enemy_skill = 0;
        enemy_open = 0;
        enemy_level= 0;
        enemy_name= 0;        
        var battleZone = document.querySelector('.battle-zone');
        battleZone.style.display = 'none';
        var menuZone = document.querySelector('.vs-zone');
        menuZone.style.display = 'flex';
        alert("Вы проиграли !!!")
    }
    if (enemy_health<0){
        noninvis=false;
        choose_pl=false;
        choose_en=false;
        player_health = 0;
        player_attack = 0;
        player_defense =0;
        player_magic = 0;
        player_skill = 0;
        player_open =0;
        player_level= 0;
        player_name=0;
        enemy_health = 0;
        enemy_attack = 0;
        enemy_defense = 0;
        enemy_magic = 0;
        enemy_skill = 0;
        enemy_open = 0;
        enemy_level= 0;
        enemy_name= 0;        
        var battleZone = document.querySelector('.battle-zone');
        battleZone.style.display = 'none';
        var menuZone = document.querySelector('.vs-zone');
        menuZone.style.display = 'flex';
        alert("Вы победили !!!")
    }
}

// Изменяем стиль на 'block' для отображения
// var enStatElement = document.querySelector('.en-stat');
// enStatElement.textContent = 'Новый текст';

