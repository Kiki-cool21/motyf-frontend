gdjs.FIRST_32PAGECode = {};
gdjs.FIRST_32PAGECode.localVariables = [];
gdjs.FIRST_32PAGECode.idToCallbackMap = new Map();
gdjs.FIRST_32PAGECode.GDBoundaryObjects1_1final = [];

gdjs.FIRST_32PAGECode.GDEnemyObjects1_1final = [];

gdjs.FIRST_32PAGECode.GDPlayerObjects1_1final = [];

gdjs.FIRST_32PAGECode.GDTutorialObjects1= [];
gdjs.FIRST_32PAGECode.GDTutorialObjects2= [];
gdjs.FIRST_32PAGECode.GDUI_9595ScoreObjects1= [];
gdjs.FIRST_32PAGECode.GDUI_9595ScoreObjects2= [];
gdjs.FIRST_32PAGECode.GDTile_95959Objects1= [];
gdjs.FIRST_32PAGECode.GDTile_95959Objects2= [];
gdjs.FIRST_32PAGECode.GDDoor_9595With_9595FrameObjects1= [];
gdjs.FIRST_32PAGECode.GDDoor_9595With_9595FrameObjects2= [];
gdjs.FIRST_32PAGECode.GDGold_9595KeyObjects1= [];
gdjs.FIRST_32PAGECode.GDGold_9595KeyObjects2= [];
gdjs.FIRST_32PAGECode.GDDialogueBoxObjects1= [];
gdjs.FIRST_32PAGECode.GDDialogueBoxObjects2= [];
gdjs.FIRST_32PAGECode.GDDialogueTextObjects1= [];
gdjs.FIRST_32PAGECode.GDDialogueTextObjects2= [];
gdjs.FIRST_32PAGECode.GDTalkPromptObjects1= [];
gdjs.FIRST_32PAGECode.GDTalkPromptObjects2= [];
gdjs.FIRST_32PAGECode.GDNPCObjects1= [];
gdjs.FIRST_32PAGECode.GDNPCObjects2= [];
gdjs.FIRST_32PAGECode.GDbgggObjects1= [];
gdjs.FIRST_32PAGECode.GDbgggObjects2= [];
gdjs.FIRST_32PAGECode.GDNewSprite2Objects1= [];
gdjs.FIRST_32PAGECode.GDNewSprite2Objects2= [];
gdjs.FIRST_32PAGECode.GDNewSprite3Objects1= [];
gdjs.FIRST_32PAGECode.GDNewSprite3Objects2= [];
gdjs.FIRST_32PAGECode.GDPlayerObjects1= [];
gdjs.FIRST_32PAGECode.GDPlayerObjects2= [];
gdjs.FIRST_32PAGECode.GDTilemap_9595LevelObjects1= [];
gdjs.FIRST_32PAGECode.GDTilemap_9595LevelObjects2= [];
gdjs.FIRST_32PAGECode.GDLeftArrowRoundButtonObjects1= [];
gdjs.FIRST_32PAGECode.GDLeftArrowRoundButtonObjects2= [];
gdjs.FIRST_32PAGECode.GDRightArrowRoundButtonObjects1= [];
gdjs.FIRST_32PAGECode.GDRightArrowRoundButtonObjects2= [];
gdjs.FIRST_32PAGECode.GDTopArrowRoundButtonObjects1= [];
gdjs.FIRST_32PAGECode.GDTopArrowRoundButtonObjects2= [];
gdjs.FIRST_32PAGECode.GDBoundaryObjects1= [];
gdjs.FIRST_32PAGECode.GDBoundaryObjects2= [];
gdjs.FIRST_32PAGECode.GDBackgroundObjects1= [];
gdjs.FIRST_32PAGECode.GDBackgroundObjects2= [];
gdjs.FIRST_32PAGECode.GDEnemyObjects1= [];
gdjs.FIRST_32PAGECode.GDEnemyObjects2= [];
gdjs.FIRST_32PAGECode.GDPlatform_9595MovingObjects1= [];
gdjs.FIRST_32PAGECode.GDPlatform_9595MovingObjects2= [];
gdjs.FIRST_32PAGECode.GDPlatform_9595BridgeObjects1= [];
gdjs.FIRST_32PAGECode.GDPlatform_9595BridgeObjects2= [];
gdjs.FIRST_32PAGECode.GDCoinObjects1= [];
gdjs.FIRST_32PAGECode.GDCoinObjects2= [];
gdjs.FIRST_32PAGECode.GDDoorObjects1= [];
gdjs.FIRST_32PAGECode.GDDoorObjects2= [];
gdjs.FIRST_32PAGECode.GDLivesObjects1= [];
gdjs.FIRST_32PAGECode.GDLivesObjects2= [];
gdjs.FIRST_32PAGECode.GDE_9595buttonObjects1= [];
gdjs.FIRST_32PAGECode.GDE_9595buttonObjects2= [];


gdjs.FIRST_32PAGECode.mapOfGDgdjs_9546FIRST_959532PAGECode_9546GDPlayerObjects1Objects = Hashtable.newFrom({"Player": gdjs.FIRST_32PAGECode.GDPlayerObjects1});
gdjs.FIRST_32PAGECode.mapOfGDgdjs_9546FIRST_959532PAGECode_9546GDCoinObjects1Objects = Hashtable.newFrom({"Coin": gdjs.FIRST_32PAGECode.GDCoinObjects1});
gdjs.FIRST_32PAGECode.eventsList0 = function(runtimeScene) {

{

/* Reuse gdjs.FIRST_32PAGECode.GDEnemyObjects1 */
gdjs.copyArray(runtimeScene.getObjects("Tilemap_Level"), gdjs.FIRST_32PAGECode.GDTilemap_9595LevelObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.FIRST_32PAGECode.GDTilemap_9595LevelObjects1.length;i<l;++i) {
    if ( gdjs.FIRST_32PAGECode.GDTilemap_9595LevelObjects1[i].isCollidingWithPoint((( gdjs.FIRST_32PAGECode.GDEnemyObjects1.length === 0 ) ? 0 :gdjs.FIRST_32PAGECode.GDEnemyObjects1[0].getPointX("Checker")), (( gdjs.FIRST_32PAGECode.GDEnemyObjects1.length === 0 ) ? 0 :gdjs.FIRST_32PAGECode.GDEnemyObjects1[0].getPointY("Checker"))) ) {
        isConditionTrue_0 = true;
        gdjs.FIRST_32PAGECode.GDTilemap_9595LevelObjects1[k] = gdjs.FIRST_32PAGECode.GDTilemap_9595LevelObjects1[i];
        ++k;
    }
}
gdjs.FIRST_32PAGECode.GDTilemap_9595LevelObjects1.length = k;
if (isConditionTrue_0) {
/* Reuse gdjs.FIRST_32PAGECode.GDEnemyObjects1 */
{for(var i = 0, len = gdjs.FIRST_32PAGECode.GDEnemyObjects1.length ;i < len;++i) {
    gdjs.FIRST_32PAGECode.GDEnemyObjects1[i].getBehavior("Flippable").flipX(false);
}
}
}

}


};gdjs.FIRST_32PAGECode.eventsList1 = function(runtimeScene) {

{

/* Reuse gdjs.FIRST_32PAGECode.GDEnemyObjects1 */
gdjs.copyArray(runtimeScene.getObjects("Tilemap_Level"), gdjs.FIRST_32PAGECode.GDTilemap_9595LevelObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.FIRST_32PAGECode.GDTilemap_9595LevelObjects1.length;i<l;++i) {
    if ( gdjs.FIRST_32PAGECode.GDTilemap_9595LevelObjects1[i].isCollidingWithPoint((( gdjs.FIRST_32PAGECode.GDEnemyObjects1.length === 0 ) ? 0 :gdjs.FIRST_32PAGECode.GDEnemyObjects1[0].getPointX("Checker")), (( gdjs.FIRST_32PAGECode.GDEnemyObjects1.length === 0 ) ? 0 :gdjs.FIRST_32PAGECode.GDEnemyObjects1[0].getPointY("Checker"))) ) {
        isConditionTrue_0 = true;
        gdjs.FIRST_32PAGECode.GDTilemap_9595LevelObjects1[k] = gdjs.FIRST_32PAGECode.GDTilemap_9595LevelObjects1[i];
        ++k;
    }
}
gdjs.FIRST_32PAGECode.GDTilemap_9595LevelObjects1.length = k;
if (isConditionTrue_0) {
/* Reuse gdjs.FIRST_32PAGECode.GDEnemyObjects1 */
{for(var i = 0, len = gdjs.FIRST_32PAGECode.GDEnemyObjects1.length ;i < len;++i) {
    gdjs.FIRST_32PAGECode.GDEnemyObjects1[i].getBehavior("Flippable").flipX(true);
}
}
}

}


};gdjs.FIRST_32PAGECode.mapOfGDgdjs_9546FIRST_959532PAGECode_9546GDPlayerObjects1Objects = Hashtable.newFrom({"Player": gdjs.FIRST_32PAGECode.GDPlayerObjects1});
gdjs.FIRST_32PAGECode.mapOfGDgdjs_9546FIRST_959532PAGECode_9546GDEnemyObjects1Objects = Hashtable.newFrom({"Enemy": gdjs.FIRST_32PAGECode.GDEnemyObjects1});
gdjs.FIRST_32PAGECode.mapOfGDgdjs_9546FIRST_959532PAGECode_9546GDPlayerObjects2Objects = Hashtable.newFrom({"Player": gdjs.FIRST_32PAGECode.GDPlayerObjects2});
gdjs.FIRST_32PAGECode.mapOfGDgdjs_9546FIRST_959532PAGECode_9546GDEnemyObjects2Objects = Hashtable.newFrom({"Enemy": gdjs.FIRST_32PAGECode.GDEnemyObjects2});
gdjs.FIRST_32PAGECode.asyncCallback24116524 = function (runtimeScene, asyncObjectsList) {
asyncObjectsList.restoreLocalVariablesContainers(gdjs.FIRST_32PAGECode.localVariables);
{gdjs.evtTools.runtimeScene.replaceScene(runtimeScene, "START", false);
}
gdjs.FIRST_32PAGECode.localVariables.length = 0;
}
gdjs.FIRST_32PAGECode.idToCallbackMap.set(24116524, gdjs.FIRST_32PAGECode.asyncCallback24116524);
gdjs.FIRST_32PAGECode.eventsList2 = function(runtimeScene) {

{


{
{
const asyncObjectsList = new gdjs.LongLivedObjectsList();
asyncObjectsList.backupLocalVariablesContainers(gdjs.FIRST_32PAGECode.localVariables);
runtimeScene.getAsyncTasksManager().addTask(gdjs.evtTools.runtimeScene.wait(2), (runtimeScene) => (gdjs.FIRST_32PAGECode.asyncCallback24116524(runtimeScene, asyncObjectsList)), 24116524, asyncObjectsList);
}
}

}


};gdjs.FIRST_32PAGECode.mapOfGDgdjs_9546FIRST_959532PAGECode_9546GDPlayerObjects1Objects = Hashtable.newFrom({"Player": gdjs.FIRST_32PAGECode.GDPlayerObjects1});
gdjs.FIRST_32PAGECode.mapOfGDgdjs_9546FIRST_959532PAGECode_9546GDGold_95959595KeyObjects1Objects = Hashtable.newFrom({"Gold_Key": gdjs.FIRST_32PAGECode.GDGold_9595KeyObjects1});
gdjs.FIRST_32PAGECode.mapOfGDgdjs_9546FIRST_959532PAGECode_9546GDPlayerObjects1Objects = Hashtable.newFrom({"Player": gdjs.FIRST_32PAGECode.GDPlayerObjects1});
gdjs.FIRST_32PAGECode.mapOfGDgdjs_9546FIRST_959532PAGECode_9546GDDoorObjects1Objects = Hashtable.newFrom({"Door": gdjs.FIRST_32PAGECode.GDDoorObjects1});
gdjs.FIRST_32PAGECode.eventsList3 = function(runtimeScene) {

{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
{isConditionTrue_0 = runtimeScene.getScene().getVariables().getFromIndex(5).getAsBoolean();
}
if (isConditionTrue_0) {
gdjs.copyArray(runtimeScene.getObjects("DialogueBox"), gdjs.FIRST_32PAGECode.GDDialogueBoxObjects1);
gdjs.copyArray(runtimeScene.getObjects("DialogueText"), gdjs.FIRST_32PAGECode.GDDialogueTextObjects1);
{for(var i = 0, len = gdjs.FIRST_32PAGECode.GDDialogueBoxObjects1.length ;i < len;++i) {
    gdjs.FIRST_32PAGECode.GDDialogueBoxObjects1[i].getBehavior("Resizable").setWidth(gdjs.evtTools.common.clamp((( gdjs.FIRST_32PAGECode.GDDialogueTextObjects1.length === 0 ) ? 0 :gdjs.FIRST_32PAGECode.GDDialogueTextObjects1[0].getWidth()) + 92, 300, 1100));
}
}
}

}


};gdjs.FIRST_32PAGECode.eventsList4 = function(runtimeScene) {

{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.runtimeScene.sceneJustBegins(runtimeScene);
if (isConditionTrue_0) {
gdjs.copyArray(runtimeScene.getObjects("bggg"), gdjs.FIRST_32PAGECode.GDbgggObjects1);
{gdjs.evtTools.camera.setCameraZoom(runtimeScene, 4, "", 0);
}
{gdjs.evtTools.camera.centerCamera(runtimeScene, (gdjs.FIRST_32PAGECode.GDbgggObjects1.length !== 0 ? gdjs.FIRST_32PAGECode.GDbgggObjects1[0] : null), true, "", 0);
}
{gdjs.evtTools.sound.playMusicOnChannel(runtimeScene, "Upbeat Background Music For Videos The Drums.mp3", 0, true, 40, 1);
}
}

}


{


let isConditionTrue_0 = false;
{
gdjs.copyArray(runtimeScene.getObjects("Boundary"), gdjs.FIRST_32PAGECode.GDBoundaryObjects1);
gdjs.copyArray(runtimeScene.getObjects("Player"), gdjs.FIRST_32PAGECode.GDPlayerObjects1);
{gdjs.evtTools.camera.clampCamera(runtimeScene, (( gdjs.FIRST_32PAGECode.GDPlayerObjects1.length === 0 ) ? 0 :gdjs.FIRST_32PAGECode.GDPlayerObjects1[0].getPointX("")) - 1000, (( gdjs.FIRST_32PAGECode.GDPlayerObjects1.length === 0 ) ? 0 :gdjs.FIRST_32PAGECode.GDPlayerObjects1[0].getPointY("")) - 1000, (( gdjs.FIRST_32PAGECode.GDPlayerObjects1.length === 0 ) ? 0 :gdjs.FIRST_32PAGECode.GDPlayerObjects1[0].getPointX("")) + 1000, (( gdjs.FIRST_32PAGECode.GDBoundaryObjects1.length === 0 ) ? 0 :gdjs.FIRST_32PAGECode.GDBoundaryObjects1[0].getPointY("")), "", 0);
}
}

}


{

gdjs.copyArray(runtimeScene.getObjects("Coin"), gdjs.FIRST_32PAGECode.GDCoinObjects1);
gdjs.copyArray(runtimeScene.getObjects("Player"), gdjs.FIRST_32PAGECode.GDPlayerObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.object.hitBoxesCollisionTest(gdjs.FIRST_32PAGECode.mapOfGDgdjs_9546FIRST_959532PAGECode_9546GDPlayerObjects1Objects, gdjs.FIRST_32PAGECode.mapOfGDgdjs_9546FIRST_959532PAGECode_9546GDCoinObjects1Objects, false, runtimeScene, false);
if (isConditionTrue_0) {
/* Reuse gdjs.FIRST_32PAGECode.GDCoinObjects1 */
gdjs.copyArray(runtimeScene.getObjects("UI_Score"), gdjs.FIRST_32PAGECode.GDUI_9595ScoreObjects1);
{for(var i = 0, len = gdjs.FIRST_32PAGECode.GDCoinObjects1.length ;i < len;++i) {
    gdjs.FIRST_32PAGECode.GDCoinObjects1[i].deleteFromScene(runtimeScene);
}
}
{runtimeScene.getScene().getVariables().getFromIndex(6).add(1);
}
{for(var i = 0, len = gdjs.FIRST_32PAGECode.GDUI_9595ScoreObjects1.length ;i < len;++i) {
    gdjs.FIRST_32PAGECode.GDUI_9595ScoreObjects1[i].getBehavior("Text").setText("Score: " + runtimeScene.getScene().getVariables().getFromIndex(6).getAsString());
}
}
{gdjs.evtTools.sound.playSound(runtimeScene, "coin.wav", false, 50, 1);
}
}

}


{

gdjs.copyArray(runtimeScene.getObjects("Enemy"), gdjs.FIRST_32PAGECode.GDEnemyObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.FIRST_32PAGECode.GDEnemyObjects1.length;i<l;++i) {
    if ( gdjs.FIRST_32PAGECode.GDEnemyObjects1[i].getBehavior("Flippable").isFlippedX() ) {
        isConditionTrue_0 = true;
        gdjs.FIRST_32PAGECode.GDEnemyObjects1[k] = gdjs.FIRST_32PAGECode.GDEnemyObjects1[i];
        ++k;
    }
}
gdjs.FIRST_32PAGECode.GDEnemyObjects1.length = k;
if (isConditionTrue_0) {
/* Reuse gdjs.FIRST_32PAGECode.GDEnemyObjects1 */
{for(var i = 0, len = gdjs.FIRST_32PAGECode.GDEnemyObjects1.length ;i < len;++i) {
    gdjs.FIRST_32PAGECode.GDEnemyObjects1[i].getBehavior("PlatformerObject").simulateLeftKey();
}
}

{ //Subevents
gdjs.FIRST_32PAGECode.eventsList0(runtimeScene);} //End of subevents
}

}


{

gdjs.copyArray(runtimeScene.getObjects("Enemy"), gdjs.FIRST_32PAGECode.GDEnemyObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.FIRST_32PAGECode.GDEnemyObjects1.length;i<l;++i) {
    if ( !(gdjs.FIRST_32PAGECode.GDEnemyObjects1[i].getBehavior("Flippable").isFlippedX()) ) {
        isConditionTrue_0 = true;
        gdjs.FIRST_32PAGECode.GDEnemyObjects1[k] = gdjs.FIRST_32PAGECode.GDEnemyObjects1[i];
        ++k;
    }
}
gdjs.FIRST_32PAGECode.GDEnemyObjects1.length = k;
if (isConditionTrue_0) {
/* Reuse gdjs.FIRST_32PAGECode.GDEnemyObjects1 */
{for(var i = 0, len = gdjs.FIRST_32PAGECode.GDEnemyObjects1.length ;i < len;++i) {
    gdjs.FIRST_32PAGECode.GDEnemyObjects1[i].getBehavior("PlatformerObject").simulateRightKey();
}
}

{ //Subevents
gdjs.FIRST_32PAGECode.eventsList1(runtimeScene);} //End of subevents
}

}


{

gdjs.copyArray(runtimeScene.getObjects("Enemy"), gdjs.FIRST_32PAGECode.GDEnemyObjects1);
gdjs.copyArray(runtimeScene.getObjects("Player"), gdjs.FIRST_32PAGECode.GDPlayerObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.object.hitBoxesCollisionTest(gdjs.FIRST_32PAGECode.mapOfGDgdjs_9546FIRST_959532PAGECode_9546GDPlayerObjects1Objects, gdjs.FIRST_32PAGECode.mapOfGDgdjs_9546FIRST_959532PAGECode_9546GDEnemyObjects1Objects, false, runtimeScene, false);
if (isConditionTrue_0) {
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.FIRST_32PAGECode.GDPlayerObjects1.length;i<l;++i) {
    if ( gdjs.FIRST_32PAGECode.GDPlayerObjects1[i].getBehavior("PlatformerObject").isFalling() ) {
        isConditionTrue_0 = true;
        gdjs.FIRST_32PAGECode.GDPlayerObjects1[k] = gdjs.FIRST_32PAGECode.GDPlayerObjects1[i];
        ++k;
    }
}
gdjs.FIRST_32PAGECode.GDPlayerObjects1.length = k;
if (isConditionTrue_0) {
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.FIRST_32PAGECode.GDPlayerObjects1.length;i<l;++i) {
    if ( gdjs.FIRST_32PAGECode.GDPlayerObjects1[i].getY() < (( gdjs.FIRST_32PAGECode.GDEnemyObjects1.length === 0 ) ? 0 :gdjs.FIRST_32PAGECode.GDEnemyObjects1[0].getPointY("")) ) {
        isConditionTrue_0 = true;
        gdjs.FIRST_32PAGECode.GDPlayerObjects1[k] = gdjs.FIRST_32PAGECode.GDPlayerObjects1[i];
        ++k;
    }
}
gdjs.FIRST_32PAGECode.GDPlayerObjects1.length = k;
}
}
if (isConditionTrue_0) {
/* Reuse gdjs.FIRST_32PAGECode.GDEnemyObjects1 */
/* Reuse gdjs.FIRST_32PAGECode.GDPlayerObjects1 */
gdjs.copyArray(runtimeScene.getObjects("UI_Score"), gdjs.FIRST_32PAGECode.GDUI_9595ScoreObjects1);
{for(var i = 0, len = gdjs.FIRST_32PAGECode.GDEnemyObjects1.length ;i < len;++i) {
    gdjs.FIRST_32PAGECode.GDEnemyObjects1[i].deleteFromScene(runtimeScene);
}
}
{for(var i = 0, len = gdjs.FIRST_32PAGECode.GDPlayerObjects1.length ;i < len;++i) {
    gdjs.FIRST_32PAGECode.GDPlayerObjects1[i].getBehavior("PlatformerObject").simulateJumpKey();
}
}
{gdjs.evtTools.sound.playSound(runtimeScene, "coin.wav", false, 50, 1);
}
{runtimeScene.getScene().getVariables().getFromIndex(6).add(1);
}
{for(var i = 0, len = gdjs.FIRST_32PAGECode.GDUI_9595ScoreObjects1.length ;i < len;++i) {
    gdjs.FIRST_32PAGECode.GDUI_9595ScoreObjects1[i].getBehavior("Text").setText("Score: " + runtimeScene.getScene().getVariables().getFromIndex(6).getAsString());
}
}
}

}


{

gdjs.FIRST_32PAGECode.GDBoundaryObjects1.length = 0;

gdjs.FIRST_32PAGECode.GDEnemyObjects1.length = 0;

gdjs.FIRST_32PAGECode.GDPlayerObjects1.length = 0;


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
{gdjs.FIRST_32PAGECode.GDBoundaryObjects1_1final.length = 0;
gdjs.FIRST_32PAGECode.GDEnemyObjects1_1final.length = 0;
gdjs.FIRST_32PAGECode.GDPlayerObjects1_1final.length = 0;
let isConditionTrue_1 = false;
isConditionTrue_0 = false;
{
gdjs.copyArray(runtimeScene.getObjects("Enemy"), gdjs.FIRST_32PAGECode.GDEnemyObjects2);
gdjs.copyArray(runtimeScene.getObjects("Player"), gdjs.FIRST_32PAGECode.GDPlayerObjects2);
isConditionTrue_1 = gdjs.evtTools.object.hitBoxesCollisionTest(gdjs.FIRST_32PAGECode.mapOfGDgdjs_9546FIRST_959532PAGECode_9546GDPlayerObjects2Objects, gdjs.FIRST_32PAGECode.mapOfGDgdjs_9546FIRST_959532PAGECode_9546GDEnemyObjects2Objects, false, runtimeScene, false);
if(isConditionTrue_1) {
    isConditionTrue_0 = true;
    for (let j = 0, jLen = gdjs.FIRST_32PAGECode.GDEnemyObjects2.length; j < jLen ; ++j) {
        if ( gdjs.FIRST_32PAGECode.GDEnemyObjects1_1final.indexOf(gdjs.FIRST_32PAGECode.GDEnemyObjects2[j]) === -1 )
            gdjs.FIRST_32PAGECode.GDEnemyObjects1_1final.push(gdjs.FIRST_32PAGECode.GDEnemyObjects2[j]);
    }
    for (let j = 0, jLen = gdjs.FIRST_32PAGECode.GDPlayerObjects2.length; j < jLen ; ++j) {
        if ( gdjs.FIRST_32PAGECode.GDPlayerObjects1_1final.indexOf(gdjs.FIRST_32PAGECode.GDPlayerObjects2[j]) === -1 )
            gdjs.FIRST_32PAGECode.GDPlayerObjects1_1final.push(gdjs.FIRST_32PAGECode.GDPlayerObjects2[j]);
    }
}
}
{
gdjs.copyArray(runtimeScene.getObjects("Boundary"), gdjs.FIRST_32PAGECode.GDBoundaryObjects2);
gdjs.copyArray(runtimeScene.getObjects("Player"), gdjs.FIRST_32PAGECode.GDPlayerObjects2);
for (var i = 0, k = 0, l = gdjs.FIRST_32PAGECode.GDPlayerObjects2.length;i<l;++i) {
    if ( gdjs.FIRST_32PAGECode.GDPlayerObjects2[i].getY() > (( gdjs.FIRST_32PAGECode.GDBoundaryObjects2.length === 0 ) ? 0 :gdjs.FIRST_32PAGECode.GDBoundaryObjects2[0].getPointY("")) ) {
        isConditionTrue_1 = true;
        gdjs.FIRST_32PAGECode.GDPlayerObjects2[k] = gdjs.FIRST_32PAGECode.GDPlayerObjects2[i];
        ++k;
    }
}
gdjs.FIRST_32PAGECode.GDPlayerObjects2.length = k;
if(isConditionTrue_1) {
    isConditionTrue_0 = true;
    for (let j = 0, jLen = gdjs.FIRST_32PAGECode.GDBoundaryObjects2.length; j < jLen ; ++j) {
        if ( gdjs.FIRST_32PAGECode.GDBoundaryObjects1_1final.indexOf(gdjs.FIRST_32PAGECode.GDBoundaryObjects2[j]) === -1 )
            gdjs.FIRST_32PAGECode.GDBoundaryObjects1_1final.push(gdjs.FIRST_32PAGECode.GDBoundaryObjects2[j]);
    }
    for (let j = 0, jLen = gdjs.FIRST_32PAGECode.GDPlayerObjects2.length; j < jLen ; ++j) {
        if ( gdjs.FIRST_32PAGECode.GDPlayerObjects1_1final.indexOf(gdjs.FIRST_32PAGECode.GDPlayerObjects2[j]) === -1 )
            gdjs.FIRST_32PAGECode.GDPlayerObjects1_1final.push(gdjs.FIRST_32PAGECode.GDPlayerObjects2[j]);
    }
}
}
{
gdjs.copyArray(gdjs.FIRST_32PAGECode.GDBoundaryObjects1_1final, gdjs.FIRST_32PAGECode.GDBoundaryObjects1);
gdjs.copyArray(gdjs.FIRST_32PAGECode.GDEnemyObjects1_1final, gdjs.FIRST_32PAGECode.GDEnemyObjects1);
gdjs.copyArray(gdjs.FIRST_32PAGECode.GDPlayerObjects1_1final, gdjs.FIRST_32PAGECode.GDPlayerObjects1);
}
}
if (isConditionTrue_0) {
/* Reuse gdjs.FIRST_32PAGECode.GDPlayerObjects1 */
{for(var i = 0, len = gdjs.FIRST_32PAGECode.GDPlayerObjects1.length ;i < len;++i) {
    gdjs.FIRST_32PAGECode.GDPlayerObjects1[i].getBehavior("Animation").setAnimationName("Death");
}
}
{for(var i = 0, len = gdjs.FIRST_32PAGECode.GDPlayerObjects1.length ;i < len;++i) {
    gdjs.FIRST_32PAGECode.GDPlayerObjects1[i].activateBehavior("PlatformerObject", false);
}
}
}

}


{

gdjs.copyArray(runtimeScene.getObjects("Player"), gdjs.FIRST_32PAGECode.GDPlayerObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.FIRST_32PAGECode.GDPlayerObjects1.length;i<l;++i) {
    if ( gdjs.FIRST_32PAGECode.GDPlayerObjects1[i].getBehavior("Animation").getAnimationName() == "Death" ) {
        isConditionTrue_0 = true;
        gdjs.FIRST_32PAGECode.GDPlayerObjects1[k] = gdjs.FIRST_32PAGECode.GDPlayerObjects1[i];
        ++k;
    }
}
gdjs.FIRST_32PAGECode.GDPlayerObjects1.length = k;
if (isConditionTrue_0) {
isConditionTrue_0 = false;
{isConditionTrue_0 = runtimeScene.getOnceTriggers().triggerOnce(24116380);
}
}
if (isConditionTrue_0) {
{gdjs.evtTools.sound.playSound(runtimeScene, "hurt.wav", false, 50, 1);
}

{ //Subevents
gdjs.FIRST_32PAGECode.eventsList2(runtimeScene);} //End of subevents
}

}


{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.runtimeScene.sceneJustBegins(runtimeScene);
if (isConditionTrue_0) {
isConditionTrue_0 = false;
isConditionTrue_0 = !(gdjs.evtTools.systemInfo.hasTouchScreen(runtimeScene));
}
if (isConditionTrue_0) {
gdjs.copyArray(runtimeScene.getObjects("E_button"), gdjs.FIRST_32PAGECode.GDE_9595buttonObjects1);
gdjs.copyArray(runtimeScene.getObjects("LeftArrowRoundButton"), gdjs.FIRST_32PAGECode.GDLeftArrowRoundButtonObjects1);
gdjs.copyArray(runtimeScene.getObjects("RightArrowRoundButton"), gdjs.FIRST_32PAGECode.GDRightArrowRoundButtonObjects1);
gdjs.copyArray(runtimeScene.getObjects("TopArrowRoundButton"), gdjs.FIRST_32PAGECode.GDTopArrowRoundButtonObjects1);
{for(var i = 0, len = gdjs.FIRST_32PAGECode.GDLeftArrowRoundButtonObjects1.length ;i < len;++i) {
    gdjs.FIRST_32PAGECode.GDLeftArrowRoundButtonObjects1[i].deleteFromScene(runtimeScene);
}
for(var i = 0, len = gdjs.FIRST_32PAGECode.GDRightArrowRoundButtonObjects1.length ;i < len;++i) {
    gdjs.FIRST_32PAGECode.GDRightArrowRoundButtonObjects1[i].deleteFromScene(runtimeScene);
}
for(var i = 0, len = gdjs.FIRST_32PAGECode.GDTopArrowRoundButtonObjects1.length ;i < len;++i) {
    gdjs.FIRST_32PAGECode.GDTopArrowRoundButtonObjects1[i].deleteFromScene(runtimeScene);
}
for(var i = 0, len = gdjs.FIRST_32PAGECode.GDE_9595buttonObjects1.length ;i < len;++i) {
    gdjs.FIRST_32PAGECode.GDE_9595buttonObjects1[i].deleteFromScene(runtimeScene);
}
}
}

}


{

gdjs.copyArray(runtimeScene.getObjects("LeftArrowRoundButton"), gdjs.FIRST_32PAGECode.GDLeftArrowRoundButtonObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.FIRST_32PAGECode.GDLeftArrowRoundButtonObjects1.length;i<l;++i) {
    if ( gdjs.FIRST_32PAGECode.GDLeftArrowRoundButtonObjects1[i].getBehavior("ButtonFSM").IsPressed(null) ) {
        isConditionTrue_0 = true;
        gdjs.FIRST_32PAGECode.GDLeftArrowRoundButtonObjects1[k] = gdjs.FIRST_32PAGECode.GDLeftArrowRoundButtonObjects1[i];
        ++k;
    }
}
gdjs.FIRST_32PAGECode.GDLeftArrowRoundButtonObjects1.length = k;
if (isConditionTrue_0) {
gdjs.copyArray(runtimeScene.getObjects("Player"), gdjs.FIRST_32PAGECode.GDPlayerObjects1);
{for(var i = 0, len = gdjs.FIRST_32PAGECode.GDPlayerObjects1.length ;i < len;++i) {
    gdjs.FIRST_32PAGECode.GDPlayerObjects1[i].getBehavior("PlatformerObject").simulateControl("Left");
}
}
}

}


{

gdjs.copyArray(runtimeScene.getObjects("RightArrowRoundButton"), gdjs.FIRST_32PAGECode.GDRightArrowRoundButtonObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.FIRST_32PAGECode.GDRightArrowRoundButtonObjects1.length;i<l;++i) {
    if ( gdjs.FIRST_32PAGECode.GDRightArrowRoundButtonObjects1[i].getBehavior("ButtonFSM").IsPressed(null) ) {
        isConditionTrue_0 = true;
        gdjs.FIRST_32PAGECode.GDRightArrowRoundButtonObjects1[k] = gdjs.FIRST_32PAGECode.GDRightArrowRoundButtonObjects1[i];
        ++k;
    }
}
gdjs.FIRST_32PAGECode.GDRightArrowRoundButtonObjects1.length = k;
if (isConditionTrue_0) {
gdjs.copyArray(runtimeScene.getObjects("Player"), gdjs.FIRST_32PAGECode.GDPlayerObjects1);
{for(var i = 0, len = gdjs.FIRST_32PAGECode.GDPlayerObjects1.length ;i < len;++i) {
    gdjs.FIRST_32PAGECode.GDPlayerObjects1[i].getBehavior("PlatformerObject").simulateControl("Right");
}
}
}

}


{

gdjs.copyArray(runtimeScene.getObjects("TopArrowRoundButton"), gdjs.FIRST_32PAGECode.GDTopArrowRoundButtonObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.FIRST_32PAGECode.GDTopArrowRoundButtonObjects1.length;i<l;++i) {
    if ( gdjs.FIRST_32PAGECode.GDTopArrowRoundButtonObjects1[i].getBehavior("ButtonFSM").IsPressed(null) ) {
        isConditionTrue_0 = true;
        gdjs.FIRST_32PAGECode.GDTopArrowRoundButtonObjects1[k] = gdjs.FIRST_32PAGECode.GDTopArrowRoundButtonObjects1[i];
        ++k;
    }
}
gdjs.FIRST_32PAGECode.GDTopArrowRoundButtonObjects1.length = k;
if (isConditionTrue_0) {
gdjs.copyArray(runtimeScene.getObjects("Player"), gdjs.FIRST_32PAGECode.GDPlayerObjects1);
{for(var i = 0, len = gdjs.FIRST_32PAGECode.GDPlayerObjects1.length ;i < len;++i) {
    gdjs.FIRST_32PAGECode.GDPlayerObjects1[i].getBehavior("PlatformerObject").simulateControl("Jump");
}
}
}

}


{

gdjs.copyArray(runtimeScene.getObjects("E_button"), gdjs.FIRST_32PAGECode.GDE_9595buttonObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.FIRST_32PAGECode.GDE_9595buttonObjects1.length;i<l;++i) {
    if ( gdjs.FIRST_32PAGECode.GDE_9595buttonObjects1[i].getBehavior("ButtonFSM").IsPressed(null) ) {
        isConditionTrue_0 = true;
        gdjs.FIRST_32PAGECode.GDE_9595buttonObjects1[k] = gdjs.FIRST_32PAGECode.GDE_9595buttonObjects1[i];
        ++k;
    }
}
gdjs.FIRST_32PAGECode.GDE_9595buttonObjects1.length = k;
if (isConditionTrue_0) {
gdjs.copyArray(runtimeScene.getObjects("Player"), gdjs.FIRST_32PAGECode.GDPlayerObjects1);
{for(var i = 0, len = gdjs.FIRST_32PAGECode.GDPlayerObjects1.length ;i < len;++i) {
    gdjs.FIRST_32PAGECode.GDPlayerObjects1[i].getBehavior("PlatformerObject").simulateControl("E");
}
}
}

}


{


let isConditionTrue_0 = false;
{
}

}


{

gdjs.copyArray(runtimeScene.getObjects("Gold_Key"), gdjs.FIRST_32PAGECode.GDGold_9595KeyObjects1);
gdjs.copyArray(runtimeScene.getObjects("Player"), gdjs.FIRST_32PAGECode.GDPlayerObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.object.hitBoxesCollisionTest(gdjs.FIRST_32PAGECode.mapOfGDgdjs_9546FIRST_959532PAGECode_9546GDPlayerObjects1Objects, gdjs.FIRST_32PAGECode.mapOfGDgdjs_9546FIRST_959532PAGECode_9546GDGold_95959595KeyObjects1Objects, false, runtimeScene, false);
if (isConditionTrue_0) {
/* Reuse gdjs.FIRST_32PAGECode.GDGold_9595KeyObjects1 */
{runtimeScene.getGame().getVariables().getFromIndex(2).add(1);
}
{for(var i = 0, len = gdjs.FIRST_32PAGECode.GDGold_9595KeyObjects1.length ;i < len;++i) {
    gdjs.FIRST_32PAGECode.GDGold_9595KeyObjects1[i].deleteFromScene(runtimeScene);
}
}
}

}


{

gdjs.copyArray(runtimeScene.getObjects("Door"), gdjs.FIRST_32PAGECode.GDDoorObjects1);
gdjs.copyArray(runtimeScene.getObjects("Player"), gdjs.FIRST_32PAGECode.GDPlayerObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.object.hitBoxesCollisionTest(gdjs.FIRST_32PAGECode.mapOfGDgdjs_9546FIRST_959532PAGECode_9546GDPlayerObjects1Objects, gdjs.FIRST_32PAGECode.mapOfGDgdjs_9546FIRST_959532PAGECode_9546GDDoorObjects1Objects, false, runtimeScene, false);
if (isConditionTrue_0) {
isConditionTrue_0 = false;
{isConditionTrue_0 = (runtimeScene.getGame().getVariables().getFromIndex(2).getAsNumber() >= 1);
}
}
if (isConditionTrue_0) {
{gdjs.evtTools.sound.playSound(runtimeScene, "2e004a9391c46f0de998f83d9e1da1cd4277899ee97e36886cc38b3f8a232cc9_Teleport 2.aac", false, 70, 1);
}
{gdjs.evtTools.runtimeScene.replaceScene(runtimeScene, "START", false);
}
}

}


{


gdjs.FIRST_32PAGECode.eventsList3(runtimeScene);
}


{


let isConditionTrue_0 = false;
{
}

}


};

gdjs.FIRST_32PAGECode.func = function(runtimeScene) {
runtimeScene.getOnceTriggers().startNewFrame();

gdjs.FIRST_32PAGECode.GDTutorialObjects1.length = 0;
gdjs.FIRST_32PAGECode.GDTutorialObjects2.length = 0;
gdjs.FIRST_32PAGECode.GDUI_9595ScoreObjects1.length = 0;
gdjs.FIRST_32PAGECode.GDUI_9595ScoreObjects2.length = 0;
gdjs.FIRST_32PAGECode.GDTile_95959Objects1.length = 0;
gdjs.FIRST_32PAGECode.GDTile_95959Objects2.length = 0;
gdjs.FIRST_32PAGECode.GDDoor_9595With_9595FrameObjects1.length = 0;
gdjs.FIRST_32PAGECode.GDDoor_9595With_9595FrameObjects2.length = 0;
gdjs.FIRST_32PAGECode.GDGold_9595KeyObjects1.length = 0;
gdjs.FIRST_32PAGECode.GDGold_9595KeyObjects2.length = 0;
gdjs.FIRST_32PAGECode.GDDialogueBoxObjects1.length = 0;
gdjs.FIRST_32PAGECode.GDDialogueBoxObjects2.length = 0;
gdjs.FIRST_32PAGECode.GDDialogueTextObjects1.length = 0;
gdjs.FIRST_32PAGECode.GDDialogueTextObjects2.length = 0;
gdjs.FIRST_32PAGECode.GDTalkPromptObjects1.length = 0;
gdjs.FIRST_32PAGECode.GDTalkPromptObjects2.length = 0;
gdjs.FIRST_32PAGECode.GDNPCObjects1.length = 0;
gdjs.FIRST_32PAGECode.GDNPCObjects2.length = 0;
gdjs.FIRST_32PAGECode.GDbgggObjects1.length = 0;
gdjs.FIRST_32PAGECode.GDbgggObjects2.length = 0;
gdjs.FIRST_32PAGECode.GDNewSprite2Objects1.length = 0;
gdjs.FIRST_32PAGECode.GDNewSprite2Objects2.length = 0;
gdjs.FIRST_32PAGECode.GDNewSprite3Objects1.length = 0;
gdjs.FIRST_32PAGECode.GDNewSprite3Objects2.length = 0;
gdjs.FIRST_32PAGECode.GDPlayerObjects1.length = 0;
gdjs.FIRST_32PAGECode.GDPlayerObjects2.length = 0;
gdjs.FIRST_32PAGECode.GDTilemap_9595LevelObjects1.length = 0;
gdjs.FIRST_32PAGECode.GDTilemap_9595LevelObjects2.length = 0;
gdjs.FIRST_32PAGECode.GDLeftArrowRoundButtonObjects1.length = 0;
gdjs.FIRST_32PAGECode.GDLeftArrowRoundButtonObjects2.length = 0;
gdjs.FIRST_32PAGECode.GDRightArrowRoundButtonObjects1.length = 0;
gdjs.FIRST_32PAGECode.GDRightArrowRoundButtonObjects2.length = 0;
gdjs.FIRST_32PAGECode.GDTopArrowRoundButtonObjects1.length = 0;
gdjs.FIRST_32PAGECode.GDTopArrowRoundButtonObjects2.length = 0;
gdjs.FIRST_32PAGECode.GDBoundaryObjects1.length = 0;
gdjs.FIRST_32PAGECode.GDBoundaryObjects2.length = 0;
gdjs.FIRST_32PAGECode.GDBackgroundObjects1.length = 0;
gdjs.FIRST_32PAGECode.GDBackgroundObjects2.length = 0;
gdjs.FIRST_32PAGECode.GDEnemyObjects1.length = 0;
gdjs.FIRST_32PAGECode.GDEnemyObjects2.length = 0;
gdjs.FIRST_32PAGECode.GDPlatform_9595MovingObjects1.length = 0;
gdjs.FIRST_32PAGECode.GDPlatform_9595MovingObjects2.length = 0;
gdjs.FIRST_32PAGECode.GDPlatform_9595BridgeObjects1.length = 0;
gdjs.FIRST_32PAGECode.GDPlatform_9595BridgeObjects2.length = 0;
gdjs.FIRST_32PAGECode.GDCoinObjects1.length = 0;
gdjs.FIRST_32PAGECode.GDCoinObjects2.length = 0;
gdjs.FIRST_32PAGECode.GDDoorObjects1.length = 0;
gdjs.FIRST_32PAGECode.GDDoorObjects2.length = 0;
gdjs.FIRST_32PAGECode.GDLivesObjects1.length = 0;
gdjs.FIRST_32PAGECode.GDLivesObjects2.length = 0;
gdjs.FIRST_32PAGECode.GDE_9595buttonObjects1.length = 0;
gdjs.FIRST_32PAGECode.GDE_9595buttonObjects2.length = 0;

gdjs.FIRST_32PAGECode.eventsList4(runtimeScene);
gdjs.FIRST_32PAGECode.GDTutorialObjects1.length = 0;
gdjs.FIRST_32PAGECode.GDTutorialObjects2.length = 0;
gdjs.FIRST_32PAGECode.GDUI_9595ScoreObjects1.length = 0;
gdjs.FIRST_32PAGECode.GDUI_9595ScoreObjects2.length = 0;
gdjs.FIRST_32PAGECode.GDTile_95959Objects1.length = 0;
gdjs.FIRST_32PAGECode.GDTile_95959Objects2.length = 0;
gdjs.FIRST_32PAGECode.GDDoor_9595With_9595FrameObjects1.length = 0;
gdjs.FIRST_32PAGECode.GDDoor_9595With_9595FrameObjects2.length = 0;
gdjs.FIRST_32PAGECode.GDGold_9595KeyObjects1.length = 0;
gdjs.FIRST_32PAGECode.GDGold_9595KeyObjects2.length = 0;
gdjs.FIRST_32PAGECode.GDDialogueBoxObjects1.length = 0;
gdjs.FIRST_32PAGECode.GDDialogueBoxObjects2.length = 0;
gdjs.FIRST_32PAGECode.GDDialogueTextObjects1.length = 0;
gdjs.FIRST_32PAGECode.GDDialogueTextObjects2.length = 0;
gdjs.FIRST_32PAGECode.GDTalkPromptObjects1.length = 0;
gdjs.FIRST_32PAGECode.GDTalkPromptObjects2.length = 0;
gdjs.FIRST_32PAGECode.GDNPCObjects1.length = 0;
gdjs.FIRST_32PAGECode.GDNPCObjects2.length = 0;
gdjs.FIRST_32PAGECode.GDbgggObjects1.length = 0;
gdjs.FIRST_32PAGECode.GDbgggObjects2.length = 0;
gdjs.FIRST_32PAGECode.GDNewSprite2Objects1.length = 0;
gdjs.FIRST_32PAGECode.GDNewSprite2Objects2.length = 0;
gdjs.FIRST_32PAGECode.GDNewSprite3Objects1.length = 0;
gdjs.FIRST_32PAGECode.GDNewSprite3Objects2.length = 0;
gdjs.FIRST_32PAGECode.GDPlayerObjects1.length = 0;
gdjs.FIRST_32PAGECode.GDPlayerObjects2.length = 0;
gdjs.FIRST_32PAGECode.GDTilemap_9595LevelObjects1.length = 0;
gdjs.FIRST_32PAGECode.GDTilemap_9595LevelObjects2.length = 0;
gdjs.FIRST_32PAGECode.GDLeftArrowRoundButtonObjects1.length = 0;
gdjs.FIRST_32PAGECode.GDLeftArrowRoundButtonObjects2.length = 0;
gdjs.FIRST_32PAGECode.GDRightArrowRoundButtonObjects1.length = 0;
gdjs.FIRST_32PAGECode.GDRightArrowRoundButtonObjects2.length = 0;
gdjs.FIRST_32PAGECode.GDTopArrowRoundButtonObjects1.length = 0;
gdjs.FIRST_32PAGECode.GDTopArrowRoundButtonObjects2.length = 0;
gdjs.FIRST_32PAGECode.GDBoundaryObjects1.length = 0;
gdjs.FIRST_32PAGECode.GDBoundaryObjects2.length = 0;
gdjs.FIRST_32PAGECode.GDBackgroundObjects1.length = 0;
gdjs.FIRST_32PAGECode.GDBackgroundObjects2.length = 0;
gdjs.FIRST_32PAGECode.GDEnemyObjects1.length = 0;
gdjs.FIRST_32PAGECode.GDEnemyObjects2.length = 0;
gdjs.FIRST_32PAGECode.GDPlatform_9595MovingObjects1.length = 0;
gdjs.FIRST_32PAGECode.GDPlatform_9595MovingObjects2.length = 0;
gdjs.FIRST_32PAGECode.GDPlatform_9595BridgeObjects1.length = 0;
gdjs.FIRST_32PAGECode.GDPlatform_9595BridgeObjects2.length = 0;
gdjs.FIRST_32PAGECode.GDCoinObjects1.length = 0;
gdjs.FIRST_32PAGECode.GDCoinObjects2.length = 0;
gdjs.FIRST_32PAGECode.GDDoorObjects1.length = 0;
gdjs.FIRST_32PAGECode.GDDoorObjects2.length = 0;
gdjs.FIRST_32PAGECode.GDLivesObjects1.length = 0;
gdjs.FIRST_32PAGECode.GDLivesObjects2.length = 0;
gdjs.FIRST_32PAGECode.GDE_9595buttonObjects1.length = 0;
gdjs.FIRST_32PAGECode.GDE_9595buttonObjects2.length = 0;


return;

}

gdjs['FIRST_32PAGECode'] = gdjs.FIRST_32PAGECode;
