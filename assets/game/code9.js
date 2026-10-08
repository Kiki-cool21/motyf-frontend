gdjs.ENDINGCode = {};
gdjs.ENDINGCode.localVariables = [];
gdjs.ENDINGCode.idToCallbackMap = new Map();
gdjs.ENDINGCode.GDNewPanelSpriteObjects1= [];
gdjs.ENDINGCode.GDNewPanelSpriteObjects2= [];
gdjs.ENDINGCode.GDNewSpriteObjects1= [];
gdjs.ENDINGCode.GDNewSpriteObjects2= [];
gdjs.ENDINGCode.GDTitleText3Objects1= [];
gdjs.ENDINGCode.GDTitleText3Objects2= [];
gdjs.ENDINGCode.GDTitleText2Objects1= [];
gdjs.ENDINGCode.GDTitleText2Objects2= [];
gdjs.ENDINGCode.GDTitleText1Objects1= [];
gdjs.ENDINGCode.GDTitleText1Objects2= [];
gdjs.ENDINGCode.GDDescText1Objects1= [];
gdjs.ENDINGCode.GDDescText1Objects2= [];
gdjs.ENDINGCode.GDDescText2Objects1= [];
gdjs.ENDINGCode.GDDescText2Objects2= [];
gdjs.ENDINGCode.GDDescText3Objects1= [];
gdjs.ENDINGCode.GDDescText3Objects2= [];
gdjs.ENDINGCode.GDNewSprite2Objects1= [];
gdjs.ENDINGCode.GDNewSprite2Objects2= [];
gdjs.ENDINGCode.GDtamatObjects1= [];
gdjs.ENDINGCode.GDtamatObjects2= [];
gdjs.ENDINGCode.GDNewSprite3Objects1= [];
gdjs.ENDINGCode.GDNewSprite3Objects2= [];
gdjs.ENDINGCode.GDPlayerObjects1= [];
gdjs.ENDINGCode.GDPlayerObjects2= [];
gdjs.ENDINGCode.GDTilemap_9595LevelObjects1= [];
gdjs.ENDINGCode.GDTilemap_9595LevelObjects2= [];
gdjs.ENDINGCode.GDLeftArrowRoundButtonObjects1= [];
gdjs.ENDINGCode.GDLeftArrowRoundButtonObjects2= [];
gdjs.ENDINGCode.GDRightArrowRoundButtonObjects1= [];
gdjs.ENDINGCode.GDRightArrowRoundButtonObjects2= [];
gdjs.ENDINGCode.GDTopArrowRoundButtonObjects1= [];
gdjs.ENDINGCode.GDTopArrowRoundButtonObjects2= [];
gdjs.ENDINGCode.GDBoundaryObjects1= [];
gdjs.ENDINGCode.GDBoundaryObjects2= [];
gdjs.ENDINGCode.GDBackgroundObjects1= [];
gdjs.ENDINGCode.GDBackgroundObjects2= [];
gdjs.ENDINGCode.GDEnemyObjects1= [];
gdjs.ENDINGCode.GDEnemyObjects2= [];
gdjs.ENDINGCode.GDPlatform_9595MovingObjects1= [];
gdjs.ENDINGCode.GDPlatform_9595MovingObjects2= [];
gdjs.ENDINGCode.GDPlatform_9595BridgeObjects1= [];
gdjs.ENDINGCode.GDPlatform_9595BridgeObjects2= [];
gdjs.ENDINGCode.GDCoinObjects1= [];
gdjs.ENDINGCode.GDCoinObjects2= [];
gdjs.ENDINGCode.GDDoorObjects1= [];
gdjs.ENDINGCode.GDDoorObjects2= [];
gdjs.ENDINGCode.GDLivesObjects1= [];
gdjs.ENDINGCode.GDLivesObjects2= [];
gdjs.ENDINGCode.GDE_9595buttonObjects1= [];
gdjs.ENDINGCode.GDE_9595buttonObjects2= [];
gdjs.ENDINGCode.GDC_9595buttonObjects1= [];
gdjs.ENDINGCode.GDC_9595buttonObjects2= [];


gdjs.ENDINGCode.userFunc0x1569750 = function GDJSInlineCode(runtimeScene) {
"use strict";
// Kira skor dan kod Holland
let scores = [
    { code: "R", name: "REALISTIK (R)", score: runtimeScene.getGame().getVariables().get("score_R").getAsNumber() },
    { code: "I", name: "INVESTIGATIF (I)", score: runtimeScene.getGame().getVariables().get("score_I").getAsNumber() },
    { code: "A", name: "ARTISTIK (A)", score: runtimeScene.getGame().getVariables().get("score_A").getAsNumber() },
    { code: "S", name: "SOSIAL (S)", score: runtimeScene.getGame().getVariables().get("score_S").getAsNumber() },
    { code: "E", name: "ENTERPRISING (E)", score: runtimeScene.getGame().getVariables().get("score_E").getAsNumber() },
    { code: "K", name: "KONVENSIONAL (K)", score: runtimeScene.getGame().getVariables().get("score_K").getAsNumber() }
];

// Sort dengan tie-break priority
const PRIORITY = { 'R': 1, 'I': 2, 'A': 3, 'S': 4, 'E': 5, 'K': 6 };
scores.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return PRIORITY[a.code] - PRIORITY[b.code];
});

// Simpan top 3
for (let i = 0; i < 3; i++) {
    runtimeScene.getGame().getVariables().get("Top" + (i + 1) + "_Name").setString(scores[i].name);
    runtimeScene.getGame().getVariables().get("Top" + (i + 1) + "_Score").setNumber(scores[i].score);
}

// Hasil
let resultData = {
    top1: scores[0].code,
    top1_score: scores[0].score,
    top2: scores[1].code,
    top2_score: scores[1].score,
    top3: scores[2].code,
    top3_score: scores[2].score,
    hollandCode: scores[0].code + scores[1].code + scores[2].code
};

// HANTAR KE WEBSITE
try {
    if (window.parent && window.parent !== window) {
        window.parent.postMessage({
            type: 'IMK_COMPLETED',
            imkCode: resultData.hollandCode,
            detail: resultData
        }, '*');
       
        console.log('✅ Kod IMK dihantar ke MoTYF+:', resultData.hollandCode);
    }
} catch (err) {
    console.error('❌ Gagal hantar:', err);
}
};
gdjs.ENDINGCode.eventsList0 = function(runtimeScene) {

{


gdjs.ENDINGCode.userFunc0x1569750(runtimeScene);

}


};gdjs.ENDINGCode.eventsList1 = function(runtimeScene) {

{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.runtimeScene.sceneJustBegins(runtimeScene);
if (isConditionTrue_0) {

{ //Subevents
gdjs.ENDINGCode.eventsList0(runtimeScene);} //End of subevents
}

}


{


let isConditionTrue_0 = false;
{
gdjs.copyArray(runtimeScene.getObjects("Player"), gdjs.ENDINGCode.GDPlayerObjects1);
{gdjs.evtTools.camera.centerCamera(runtimeScene, (gdjs.ENDINGCode.GDPlayerObjects1.length !== 0 ? gdjs.ENDINGCode.GDPlayerObjects1[0] : null), true, "", 0);
}
{gdjs.evtTools.camera.setCameraZoom(runtimeScene, 1.2, "", 0);
}
{gdjs.evtTools.sound.playSound(runtimeScene, "Glitch Sound Effect - Free.mp3", true, 35, 10);
}
}

}


{

gdjs.copyArray(runtimeScene.getObjects("Player"), gdjs.ENDINGCode.GDPlayerObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.ENDINGCode.GDPlayerObjects1.length;i<l;++i) {
    if ( gdjs.ENDINGCode.GDPlayerObjects1[i].getBehavior("PlatformerObject").isOnFloor() ) {
        isConditionTrue_0 = true;
        gdjs.ENDINGCode.GDPlayerObjects1[k] = gdjs.ENDINGCode.GDPlayerObjects1[i];
        ++k;
    }
}
gdjs.ENDINGCode.GDPlayerObjects1.length = k;
if (isConditionTrue_0) {
/* Reuse gdjs.ENDINGCode.GDPlayerObjects1 */
{for(var i = 0, len = gdjs.ENDINGCode.GDPlayerObjects1.length ;i < len;++i) {
    gdjs.ENDINGCode.GDPlayerObjects1[i].activateBehavior("PlatformerObject", false);
}
}
}

}


};

gdjs.ENDINGCode.func = function(runtimeScene) {
runtimeScene.getOnceTriggers().startNewFrame();

gdjs.ENDINGCode.GDNewPanelSpriteObjects1.length = 0;
gdjs.ENDINGCode.GDNewPanelSpriteObjects2.length = 0;
gdjs.ENDINGCode.GDNewSpriteObjects1.length = 0;
gdjs.ENDINGCode.GDNewSpriteObjects2.length = 0;
gdjs.ENDINGCode.GDTitleText3Objects1.length = 0;
gdjs.ENDINGCode.GDTitleText3Objects2.length = 0;
gdjs.ENDINGCode.GDTitleText2Objects1.length = 0;
gdjs.ENDINGCode.GDTitleText2Objects2.length = 0;
gdjs.ENDINGCode.GDTitleText1Objects1.length = 0;
gdjs.ENDINGCode.GDTitleText1Objects2.length = 0;
gdjs.ENDINGCode.GDDescText1Objects1.length = 0;
gdjs.ENDINGCode.GDDescText1Objects2.length = 0;
gdjs.ENDINGCode.GDDescText2Objects1.length = 0;
gdjs.ENDINGCode.GDDescText2Objects2.length = 0;
gdjs.ENDINGCode.GDDescText3Objects1.length = 0;
gdjs.ENDINGCode.GDDescText3Objects2.length = 0;
gdjs.ENDINGCode.GDNewSprite2Objects1.length = 0;
gdjs.ENDINGCode.GDNewSprite2Objects2.length = 0;
gdjs.ENDINGCode.GDtamatObjects1.length = 0;
gdjs.ENDINGCode.GDtamatObjects2.length = 0;
gdjs.ENDINGCode.GDNewSprite3Objects1.length = 0;
gdjs.ENDINGCode.GDNewSprite3Objects2.length = 0;
gdjs.ENDINGCode.GDPlayerObjects1.length = 0;
gdjs.ENDINGCode.GDPlayerObjects2.length = 0;
gdjs.ENDINGCode.GDTilemap_9595LevelObjects1.length = 0;
gdjs.ENDINGCode.GDTilemap_9595LevelObjects2.length = 0;
gdjs.ENDINGCode.GDLeftArrowRoundButtonObjects1.length = 0;
gdjs.ENDINGCode.GDLeftArrowRoundButtonObjects2.length = 0;
gdjs.ENDINGCode.GDRightArrowRoundButtonObjects1.length = 0;
gdjs.ENDINGCode.GDRightArrowRoundButtonObjects2.length = 0;
gdjs.ENDINGCode.GDTopArrowRoundButtonObjects1.length = 0;
gdjs.ENDINGCode.GDTopArrowRoundButtonObjects2.length = 0;
gdjs.ENDINGCode.GDBoundaryObjects1.length = 0;
gdjs.ENDINGCode.GDBoundaryObjects2.length = 0;
gdjs.ENDINGCode.GDBackgroundObjects1.length = 0;
gdjs.ENDINGCode.GDBackgroundObjects2.length = 0;
gdjs.ENDINGCode.GDEnemyObjects1.length = 0;
gdjs.ENDINGCode.GDEnemyObjects2.length = 0;
gdjs.ENDINGCode.GDPlatform_9595MovingObjects1.length = 0;
gdjs.ENDINGCode.GDPlatform_9595MovingObjects2.length = 0;
gdjs.ENDINGCode.GDPlatform_9595BridgeObjects1.length = 0;
gdjs.ENDINGCode.GDPlatform_9595BridgeObjects2.length = 0;
gdjs.ENDINGCode.GDCoinObjects1.length = 0;
gdjs.ENDINGCode.GDCoinObjects2.length = 0;
gdjs.ENDINGCode.GDDoorObjects1.length = 0;
gdjs.ENDINGCode.GDDoorObjects2.length = 0;
gdjs.ENDINGCode.GDLivesObjects1.length = 0;
gdjs.ENDINGCode.GDLivesObjects2.length = 0;
gdjs.ENDINGCode.GDE_9595buttonObjects1.length = 0;
gdjs.ENDINGCode.GDE_9595buttonObjects2.length = 0;
gdjs.ENDINGCode.GDC_9595buttonObjects1.length = 0;
gdjs.ENDINGCode.GDC_9595buttonObjects2.length = 0;

gdjs.ENDINGCode.eventsList1(runtimeScene);
gdjs.ENDINGCode.GDNewPanelSpriteObjects1.length = 0;
gdjs.ENDINGCode.GDNewPanelSpriteObjects2.length = 0;
gdjs.ENDINGCode.GDNewSpriteObjects1.length = 0;
gdjs.ENDINGCode.GDNewSpriteObjects2.length = 0;
gdjs.ENDINGCode.GDTitleText3Objects1.length = 0;
gdjs.ENDINGCode.GDTitleText3Objects2.length = 0;
gdjs.ENDINGCode.GDTitleText2Objects1.length = 0;
gdjs.ENDINGCode.GDTitleText2Objects2.length = 0;
gdjs.ENDINGCode.GDTitleText1Objects1.length = 0;
gdjs.ENDINGCode.GDTitleText1Objects2.length = 0;
gdjs.ENDINGCode.GDDescText1Objects1.length = 0;
gdjs.ENDINGCode.GDDescText1Objects2.length = 0;
gdjs.ENDINGCode.GDDescText2Objects1.length = 0;
gdjs.ENDINGCode.GDDescText2Objects2.length = 0;
gdjs.ENDINGCode.GDDescText3Objects1.length = 0;
gdjs.ENDINGCode.GDDescText3Objects2.length = 0;
gdjs.ENDINGCode.GDNewSprite2Objects1.length = 0;
gdjs.ENDINGCode.GDNewSprite2Objects2.length = 0;
gdjs.ENDINGCode.GDtamatObjects1.length = 0;
gdjs.ENDINGCode.GDtamatObjects2.length = 0;
gdjs.ENDINGCode.GDNewSprite3Objects1.length = 0;
gdjs.ENDINGCode.GDNewSprite3Objects2.length = 0;
gdjs.ENDINGCode.GDPlayerObjects1.length = 0;
gdjs.ENDINGCode.GDPlayerObjects2.length = 0;
gdjs.ENDINGCode.GDTilemap_9595LevelObjects1.length = 0;
gdjs.ENDINGCode.GDTilemap_9595LevelObjects2.length = 0;
gdjs.ENDINGCode.GDLeftArrowRoundButtonObjects1.length = 0;
gdjs.ENDINGCode.GDLeftArrowRoundButtonObjects2.length = 0;
gdjs.ENDINGCode.GDRightArrowRoundButtonObjects1.length = 0;
gdjs.ENDINGCode.GDRightArrowRoundButtonObjects2.length = 0;
gdjs.ENDINGCode.GDTopArrowRoundButtonObjects1.length = 0;
gdjs.ENDINGCode.GDTopArrowRoundButtonObjects2.length = 0;
gdjs.ENDINGCode.GDBoundaryObjects1.length = 0;
gdjs.ENDINGCode.GDBoundaryObjects2.length = 0;
gdjs.ENDINGCode.GDBackgroundObjects1.length = 0;
gdjs.ENDINGCode.GDBackgroundObjects2.length = 0;
gdjs.ENDINGCode.GDEnemyObjects1.length = 0;
gdjs.ENDINGCode.GDEnemyObjects2.length = 0;
gdjs.ENDINGCode.GDPlatform_9595MovingObjects1.length = 0;
gdjs.ENDINGCode.GDPlatform_9595MovingObjects2.length = 0;
gdjs.ENDINGCode.GDPlatform_9595BridgeObjects1.length = 0;
gdjs.ENDINGCode.GDPlatform_9595BridgeObjects2.length = 0;
gdjs.ENDINGCode.GDCoinObjects1.length = 0;
gdjs.ENDINGCode.GDCoinObjects2.length = 0;
gdjs.ENDINGCode.GDDoorObjects1.length = 0;
gdjs.ENDINGCode.GDDoorObjects2.length = 0;
gdjs.ENDINGCode.GDLivesObjects1.length = 0;
gdjs.ENDINGCode.GDLivesObjects2.length = 0;
gdjs.ENDINGCode.GDE_9595buttonObjects1.length = 0;
gdjs.ENDINGCode.GDE_9595buttonObjects2.length = 0;
gdjs.ENDINGCode.GDC_9595buttonObjects1.length = 0;
gdjs.ENDINGCode.GDC_9595buttonObjects2.length = 0;


return;

}

gdjs['ENDINGCode'] = gdjs.ENDINGCode;
