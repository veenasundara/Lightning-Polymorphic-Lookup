({
    initClasses : function(component)
    {
        var items = component.get("v.items");
        if(!items)
        {
            return;
        }
        var ulClass = "slds-dropdown__list slds-dropdown--length-" +  items.length;
        component.set("v.ulClass", ulClass)
    },
    
    handleToggleTypeDropdown : function(component)
    {
        var outerClass = component.get("v.outerDivClass");
        if(outerClass.includes('slds-is-open'))
        {
            outerClass = outerClass.replace(' slds-is-open', '');
        }
        else
        {
            outerClass = outerClass + ' slds-is-open' ;
        }
        component.set("v.outerDivClass", outerClass);
        
    }
    
})