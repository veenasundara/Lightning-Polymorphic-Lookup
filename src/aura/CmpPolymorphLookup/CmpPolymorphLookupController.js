({
	doInit : function(component, event, helper) {
		helper.handleInit(component);
	},
    selectMenuType : function(component, event, helper) {
        var menuType = event.getParam("type");
        var menuIconType = event.getParam("iconType");
        var menuIconName = event.getParam("iconName");
        
        var mapRecordsByType = component.get("v.mapRecordsByType");
        var allRecords = mapRecordsByType[menuType];
        
        component.set("v.selectedMenuType", menuType);
        component.set("v.selectedMenuIconType", menuIconType);
        component.set("v.selectedMenuIconName", menuIconName);
        component.set("v.allRecords", allRecords);
        
    },
    doSearch : function(component, event, helper) {
        helper.hdlDoSearch(component);
    },
    setChosenRecord : function(component, event, helper) {
        var record = event.getParam('record');
        component.set("v.selectedId", record[0]);
        component.set("v.selectedName", record[1]); 
        component.set("v.recordChosen", true); 
    },  
    removeChosen : function(component, event, helper) {
        component.set("v.matchedRecords", []);
        component.set("v.selectedId", null);
        component.set("v.selectedName", null); 
        component.set("v.recordChosen", false); 

        var inputName = component.getGlobalId() + '_searchInput';
        var inp = document.getElementById(inputName);
        if(inp)
        {
            inp.value = "";
        }
        
    }    
})