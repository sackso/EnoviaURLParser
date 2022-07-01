function onCreated(n) {
    if (browser.runtime.lastError) {
        console.log('Error:' + browser.runtime.lastError);
    } else {
        console.log("Item created successfully");
    }
}

//오른쪽 마우스 메뉴 작성
browser.contextMenus.create({
    id: "EnoviaParser",
    title: "Enovia URL Parse",
    contexts: ["frame", "page", "selection", "link"]
}, onCreated);

// browser.contextMenus.create({
//     id: "ReloadFrame",
//     title: "Frame refresh",
//     contexts: ["frame", "page", "selection", "link"]
// }, onCreated);


browser.contextMenus.onClicked.addListener(contextMenuAction);


var _FRMAE_URL = "";
function contextMenuAction(info, tab) {
    var menuItemId = info.menuItemId;

    console.log("[Start] contextMenuAction()");
    console.log("menuItemId => " + menuItemId);
    console.log("info: " + JSON.stringify(info));
    console.log("frameurl: " + JSON.stringify(info.frameUrl));
    // console.log("tab: " + JSON.stringify(tab));


    if (menuItemId == "EnoviaParser") {
        _FRMAE_URL = info.frameUrl;

        navigator.clipboard.writeText(_FRMAE_URL);


        //새로운 창으로 띄우기
        var popupURL = "popup.html";
        let creating = browser.windows.create({
            url: popupURL,
            type: "popup",
            height: 600,
            width: 800
        });
    } else if (menuItemId == "ReloadFrame") {
        // console.log("tab: " + JSON.stringify(tab));
        console.log("["+menuItemId+"]+tab.id: " + tab.id);
        console.log("["+menuItemId+"]+info.frameId: " + info.frameId);
        // browser.tabs.reload(tab.id);

        var iframe = $("document");
        console.log(tab);
        // for(ifr in iframe){
        //     console.log("ifr => "+ifr.location.href);
        // }
        // console.log($("#custVOCMain").contents());
        // console.log($("#custVOCMain").contents().find('.object').length);
        
        
        console.log("["+menuItemId+"] executing => ");
        console.log(executing);
        
    } else {

    }

    //test code    

    //메뉴에 있는 창으로 띄우기
    //browser.browserAction.openPopup();

    // const url = "https://bing.com/?q=" + info.selectionText;
    // browser.tabs.create({ url: url });
    console.log("[End] contextMenuAction()");
} 
