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


gdjs.ENDINGCode.userFunc0xca07f8 = function GDJSInlineCode(runtimeScene) {
"use strict";
runtimeScene.setBackgroundColor(100,100,240);

let scores = [
    { code: "R", name: "REALISTIK (R)", score: runtimeScene.getGame().getVariables().get("score_R").getAsNumber(), desc: "Suka kerja praktikal, mengguna alatan, dan sumber fizikal." },
    { code: "I", name: "INVESTIGATIF (I)", score: runtimeScene.getGame().getVariables().get("score_I").getAsNumber(), desc: "Suka menganalisis, menyelidik, dan menyelesaikan masalah." },
    { code: "A", name: "ARTISTIK (A)", score: runtimeScene.getGame().getVariables().get("score_A").getAsNumber(), desc: "Kreatif, ekspresif, dan suka kebebasan serta seni." },
    { code: "S", name: "SOSIAL (S)", score: runtimeScene.getGame().getVariables().get("score_S").getAsNumber(), desc: "Suka membantu, mengajar, dan berinteraksi dengan orang lain." },
    { code: "E", name: "ENTERPRISING (E)", score: runtimeScene.getGame().getVariables().get("score_E").getAsNumber(), desc: "Berjiwa kepimpinan, suka memimpin dan mengurus." },
    { code: "K", name: "KONVENSIONAL (K)", score: runtimeScene.getGame().getVariables().get("score_K").getAsNumber(), desc: "Suka persekitaran teratur, pentadbiran, dan data." }
];

scores.sort((a, b) => b.score - a.score);

for (let i = 0; i < 3; i++) {
    runtimeScene.getGame().getVariables().get("Top" + (i + 1) + "_Name").setString(scores[i].name);
    runtimeScene.getGame().getVariables().get("Top" + (i + 1) + "_Score").setNumber(scores[i].score);
    runtimeScene.getGame().getVariables().get("Top" + (i + 1) + "_Desc").setString(scores[i].desc);
}

let resultData = {
    top1: scores[0].code,
    top1_score: scores[0].score,
    top2: scores[1].code,
    top2_score: scores[1].score,
    top3: scores[2].code,
    top3_score: scores[2].score,
    hollandCode: scores[0].code + scores[1].code + scores[2].code
};

runtimeScene.getGame().getVariables().get("WebPayload").setString(JSON.stringify(resultData));

// ==========================================
// HANTAR KE WEBSITE MoTYF+ ← TAMBAH NI
// ==========================================
try {
    const payloadString = runtimeScene.getGame().getVariables().get("WebPayload").getAsString();
    const payload = JSON.parse(payloadString);
    
    if (window.parent && window.parent !== window) {
        window.parent.postMessage({
            type: 'IMK_COMPLETED',
            imkCode: payload.hollandCode,
            detail: payload
        }, '*');
        
        console.log('✅ Kod IMK dihantar ke MoTYF+:', payload.hollandCode);
    }
} catch (err) {
    console.error('❌ Gagal hantar:', err);
}
};
gdjs.ENDINGCode.eventsList0 = function(runtimeScene) {

{


gdjs.ENDINGCode.userFunc0xca07f8(runtimeScene);

}


{


let isConditionTrue_0 = false;
{
/* Reuse gdjs.ENDINGCode.GDDescText1Objects1 */
/* Reuse gdjs.ENDINGCode.GDDescText2Objects1 */
/* Reuse gdjs.ENDINGCode.GDDescText3Objects1 */
gdjs.copyArray(runtimeScene.getObjects("TitleText1"), gdjs.ENDINGCode.GDTitleText1Objects1);
gdjs.copyArray(runtimeScene.getObjects("TitleText2"), gdjs.ENDINGCode.GDTitleText2Objects1);
gdjs.copyArray(runtimeScene.getObjects("TitleText3"), gdjs.ENDINGCode.GDTitleText3Objects1);
{for(var i = 0, len = gdjs.ENDINGCode.GDTitleText1Objects1.length ;i < len;++i) {
    gdjs.ENDINGCode.GDTitleText1Objects1[i].getBehavior("Text").setText(gdjs.evtTools.variable.getVariableString(runtimeScene.getGame().getVariables().get("Top1_Name")));
}
}
{for(var i = 0, len = gdjs.ENDINGCode.GDDescText1Objects1.length ;i < len;++i) {
    gdjs.ENDINGCode.GDDescText1Objects1[i].getBehavior("Text").setText(gdjs.evtTools.variable.getVariableString(runtimeScene.getGame().getVariables().get("Top1_Desc")));
}
}
{for(var i = 0, len = gdjs.ENDINGCode.GDTitleText2Objects1.length ;i < len;++i) {
    gdjs.ENDINGCode.GDTitleText2Objects1[i].getBehavior("Text").setText(gdjs.evtTools.variable.getVariableString(runtimeScene.getGame().getVariables().get("Top2_Name")));
}
}
{for(var i = 0, len = gdjs.ENDINGCode.GDDescText2Objects1.length ;i < len;++i) {
    gdjs.ENDINGCode.GDDescText2Objects1[i].getBehavior("Text").setText(gdjs.evtTools.variable.getVariableString(runtimeScene.getGame().getVariables().get("Top2_Desc")));
}
}
{for(var i = 0, len = gdjs.ENDINGCode.GDTitleText3Objects1.length ;i < len;++i) {
    gdjs.ENDINGCode.GDTitleText3Objects1[i].getBehavior("Text").setText(gdjs.evtTools.variable.getVariableString(runtimeScene.getGame().getVariables().get("Top3_Name")));
}
}
{for(var i = 0, len = gdjs.ENDINGCode.GDDescText3Objects1.length ;i < len;++i) {
    gdjs.ENDINGCode.GDDescText3Objects1[i].getBehavior("Text").setText(gdjs.evtTools.variable.getVariableString(runtimeScene.getGame().getVariables().get("Top3_Desc")));
}
}
}

}


};gdjs.ENDINGCode.eventsList1 = function(runtimeScene) {

{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.runtimeScene.sceneJustBegins(runtimeScene);
if (isConditionTrue_0) {
isConditionTrue_0 = false;
{isConditionTrue_0 = runtimeScene.getOnceTriggers().triggerOnce(25038852);
}
}
if (isConditionTrue_0) {
gdjs.copyArray(runtimeScene.getObjects("DescText1"), gdjs.ENDINGCode.GDDescText1Objects1);
gdjs.copyArray(runtimeScene.getObjects("DescText2"), gdjs.ENDINGCode.GDDescText2Objects1);
gdjs.copyArray(runtimeScene.getObjects("DescText3"), gdjs.ENDINGCode.GDDescText3Objects1);
{for(var i = 0, len = gdjs.ENDINGCode.GDDescText1Objects1.length ;i < len;++i) {
    gdjs.ENDINGCode.GDDescText1Objects1[i].setWrappingWidth(180);
}
}
{for(var i = 0, len = gdjs.ENDINGCode.GDDescText2Objects1.length ;i < len;++i) {
    gdjs.ENDINGCode.GDDescText2Objects1[i].setWrappingWidth(180);
}
}
{for(var i = 0, len = gdjs.ENDINGCode.GDDescText3Objects1.length ;i < len;++i) {
    gdjs.ENDINGCode.GDDescText3Objects1[i].setWrappingWidth(180);
}
}
{for(var i = 0, len = gdjs.ENDINGCode.GDDescText1Objects1.length ;i < len;++i) {
    gdjs.ENDINGCode.GDDescText1Objects1[i].setWrapping(true);
}
}
{for(var i = 0, len = gdjs.ENDINGCode.GDDescText2Objects1.length ;i < len;++i) {
    gdjs.ENDINGCode.GDDescText2Objects1[i].setWrapping(true);
}
}
{for(var i = 0, len = gdjs.ENDINGCode.GDDescText3Objects1.length ;i < len;++i) {
    gdjs.ENDINGCode.GDDescText3Objects1[i].setWrapping(true);
}
}

{ //Subevents
gdjs.ENDINGCode.eventsList0(runtimeScene);} //End of subevents
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


return;

}

gdjs['ENDINGCode'] = gdjs.ENDINGCode;
