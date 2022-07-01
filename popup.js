/**
 * 디버깅 메뉴 위치
 * 설정 - 확장 기능 관리 - 디버깅 - 임시부가 기능 로드
 * 
 * 
 * 
 */
$(function () {
    /**
     * parse 버튼 클릭시 실행
     */
    $("#btnparse").click(function () {
        navigator.clipboard.readText().then(text =>
            $("#outputdiv").html(fnSplitStrParam($("#txt_name").val()))
        );
    });

    /**
     * URL 값을 입력하고 엔터 입력시 실행
     */
    $("#txt_name").keypress(function () {
        if(key.keyCode==13) {
            $("#btnparse").click();
        };
    });

    $("document").ready(function () {
        navigator.clipboard.readText().then(function (text) {
            $("#txt_name").val(text);
            $("#btnparse").click();
        }

        );
    });
});

/**
 * 문자열을 parsing
 * @param  str 
 * @returns 
 */
function fnSplitStrParam(str) {
    var retStr = "";

    if (str.startsWith("http")) {
        var strCode = str;//"https://local3dspace.samsong.com/3dspace/common/emxIndentedTable.jsp?sortColumnName=EstFinishDate&showPageHeader=true&rowGroupingColumnNames=ProjectName&HelpMarker=emxhelpassignmentsummary&program=emxTask%3AgetCreateAndAssignedWBSTask%2CemxTask%3AgetAssignedWBSTask%2CemxTask%3AgetAllWBSTask%2CemxTask%3AgetCompletedWBSTask&portalMode=true&StringResourceFileId=emxProgramCentralStringResource&toolbar=PMCActualEffortToolbar&sortDirection=ascending&freezePane=WBSTaskName&selection=multiple&portalCmdName=custPMCAssignmentMyDesk&jsTreeID=null&rowGrouping=true&header=emxProgramCentral.Common.Assignments&Export=false&suiteKey=ProgramCentral&postProcessJPO=emxWeeklyTimeSheet%3ApostProcessRefresh&portal=AEFPowerView&editLink=true&table=PMCAssignedWBSTaskSummary&programLabel=emxProgramCentral.Common.CreateAndAssigned%2CemxProgramCentral.Common.AssignedTasks%2CemxProgramCentral.Common.All%2CemxProgramCentral.Common.CompletedTasks";
        var arrUrl = strCode.split("?");

        var arrColors = {
            "program":"deepskyblue",
            "toolbar":"lightblue",
            "menu":"powderblue",
            "portal":"grey",
            "command":"turquoise",
            "table":"cornflowerblue",
            "form":"orange",
            "postProcessJPO":"magenta",
            "objectId":"skyblue"
        };
        
        var strParam = arrUrl[1];
        var arrParam = strParam.split("&");
        var strColor = "";
        // retStr = retStr + "<div class='container-fluid'>";
        for (var i = 0; i < arrParam.length; i++) {
            retStr = retStr + "<tr >";
            var arrKeyValue = arrParam[i].split("=");            
            strColor = arrColors[arrKeyValue[0]];                
            if(!strColor){                              
                strColor="white";
            }
            //console.log("key => "+ arrKeyValue[0] + "           strColor =>" +strColor);                
            retStr = `${retStr} <td style='font-size:small;background-color:${strColor};'><b>${arrKeyValue[0]}</b> </td>\n`;
            
            // if (arrKeyValue[0] == "program"
            //     || arrKeyValue[0] == "toolbar"
            //     || arrKeyValue[0] == "menu"
            //     || arrKeyValue[0] == "portal"
            //     || arrKeyValue[0] == "command"
            //     || arrKeyValue[0] == "table"
            //     || arrKeyValue[0] == "form"
            // ) {
            //     retStr = retStr + "<td style='background-color:lightsteelblue;'><span >" + arrKeyValue[0] + "</span></td>" + "\n";
            // } else if (arrKeyValue[0] == "objectId"){
            //     retStr = retStr + "<td style='background-color:skyblue;'><span >" + arrKeyValue[0] + "</span></td>" + "\n";
            // } else{
            //     retStr = retStr + "<td ><span style='font-size:small'>" + arrKeyValue[0] + "</span></td>" + "\n";
            // }
            // console.log(`${decodeURIComponent(arrKeyValue[1]).replace("/,/g","<br>")}`);
            retStr = retStr + `<td style='font-size:small;background-color:${strColor};'><b>${decodeURIComponent(arrKeyValue[1]).replaceAll(",","<br>")}</b> </td>  \n`;
            retStr = retStr + "</tr>";
        }
        
        // retStr = retStr + "<p>&nbsp;</p>";
    }
    return retStr;
}