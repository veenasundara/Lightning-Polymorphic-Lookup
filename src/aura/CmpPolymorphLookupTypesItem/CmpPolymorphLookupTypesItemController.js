({
	selectItem : function(component, event, helper) {
		var cmpEvent = component.getEvent("EvtPolymorphLookupTypeSelect");	
        cmpEvent.setParams({"type": component.get("v.item.type"),
                            "iconType": component.get("v.item.iconType"),
                            "iconName": component.get("v.item.iconName")});
        cmpEvent.fire();
	}
})