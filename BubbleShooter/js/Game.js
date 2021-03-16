class Game{
    constructor(){

    }
    getState() {
        var gameStateRef = database.ref('gameState');
            gameStateRef.on("value", function (data) {
            gameState = data.val();
        })

    }

    update(state) {
        database.ref('/').update({
            gameState: state
        });
    } 
    async start() {
        if (gameState === 0) {
            player = new Player();
            var playerCountRef = await database.ref('playerCount').once("value");
            if (playerCountRef.exists()) {
                playerCount = playerCountRef.val();
                player.getCount();
            }
            form = new Form()
            form.display();
        }
        player1 = createSprite(220,300);
        player1.addImage("player1",player1_img);
        player1.scale=0.7  

        player2 = createSprite(220,500);
        player2.addImage("player2", player2_img);
        player2.scale=0.85
        players=[player1,player2];
       
       
    }
    
    play(){
        
        form.hide();

        Player.getPlayerInfo();
        image(back_img, 0, 0, 1000, 800);
        var x=100;
        var y=200;
        var index =0;
        drawSprites();

        for(var plr in allPlayers){
        
            index = index+1;
            x = 100;
            y = 100-allPlayers[plr].distance;
            
            players[index -1].x = x;
            players[index -1].y = y;

            //if (plr === "player" + player.index)
           // fill("red")
        //  else
          //  fill("black");
                     
           
           
            
            textSize(25);
            fill("white");
            text(allPlayers.player1.name+":" +allPlayers.player1.score,820,50); 
            text(allPlayers.player2.name+":" +allPlayers.player2.score,820,100);
            //text("Player1;" +allPlayers.player1.score,820,50); 
            //text("Player2;" +allPlayers.player2.score,820,100); 

           

        }

        if (keyIsDown(UP_ARROW) && player.index !== null) {
            player.distance += 10
            player.update();
        }
        if (keyIsDown(DOWN_ARROW) && player.index !== null) {
            player.distance -= 10
            player.update();
        }

        if (keyWentDown ("space")&&player.index!== null&&gameState===1) {
           var bullets=createSprite(players[player.index-1].x+80,players[player.index-1].y-20,20,20)
           gunShotSou.play()
           bullets.velocityX=15;
           bullets.addImage(bullet1_img);
           bullets.scale=0.1;
           bullets.lifetime=300;
           bulletGroup.add(bullets)
        }
        if(player.index !==null&&gameState===1){
            for(var i = 0; i<bubbleGroup.length;i++){
               if(bubbleGroup.get(i).isTouching(bulletGroup)){
                  bubblePopSou.play()
                  bubbleGroup.get(i).destroy();
                  player.score= player.score+1;
                  player.update();
                
    
               }
            }   
          }
          if(player.index !==null&&gameState===1){
            for(var i = 0; i<blackBubbleGroup.length;i++){
               if(blackBubbleGroup.get(i).isTouching(bulletGroup)){
                  bubblePopSou.play()
                  blackBubbleGroup.get(i).destroy();
                  player.score= player.score-2;
                  player.update();
                
    
               }
            }   
          }

         

        if (frameCount % 30 === 0) {
            bubbles = createSprite(random(450, 1000), 0, 100, 100);
            bubbles.velocityY = 5;
            var rand = Math.round(random(1,6));
            switch(rand){
                case 1: bubbles.addImage("bubble1",bubbleBlue_img);
                bubbles.scale=0.25;
                break;
                case 2: bubbles.addImage("bubble2", bubbleRed_img);
                bubbles.scale=0.2;
                break;
                case 3: bubbles.addImage("bubble1", bubbleGreen_img);
                bubbles.scale=0.2;
                break;
                case 4: bubbles.addImage("bubble1", bubbleYellow_img);
                bubbles.scale=0.1;
                break;
                case 5: bubbles.addImage("bubble1", bubblePink_img);
                bubbles.scale=0.2;
                break;
                case 6: bubbles.addImage("bubble1", bubbleGrey_img);
                bubbles.scale=0.2;
                break;               
            }
            bubbleGroup.add(bubbles);
            
        }
        if (frameCount % 350 === 0) {
            blackBubble = createSprite(random(450, 1000), 0, 100, 100);
            blackBubble.velocityY = 5;
            blackBubble.addImage(bubbleBlack_img);
            blackBubble.scale=0.2;
            blackBubbleGroup.add(blackBubble);
        }
        // Add code to destroy bubbles, calculate scores and
        // update the scores to the database


        // Add code for game end condition
    if(player.score >=3){
        this.end()
        
    }

  }

    end(){
        game.update(2);
        clear();
        image(back_img, 0, 0, 1000, 800);
        GameOverSou.play();
        fill("blue")
        textSize(40);
        text("Game Over",350,300)
         // gameover(gameover_img);
        // bubbleGroup.get(i).destroy();

       // Add code to update game state and display Game Over

       
    }

   
}
