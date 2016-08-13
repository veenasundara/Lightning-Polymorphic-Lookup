({
    chooseItem : function(component, event, helper) {
		var record = component.get('v.record');
		var chooseEvent = component.getEvent("EvtLookupInputSelect");
        chooseEvent.setParams({"record": record});
		chooseEvent.fire();
    }    
})