({
	handleInit : function(component) {
        try
        {
            var body = component.get("v.body");
            var items = [];
            var itemCmp = null;
            for (var i = 0; i < body.length; i++) {
                itemCmp = body[i];
                var item = {};
                item.type = itemCmp.get("v.type");
                item.icon = itemCmp.get("v.icon");
                item.action = itemCmp.get("v.fetchRecordsMethod") ;
                item.iconType = itemCmp.get("v.iconType") ;
                item.iconName = itemCmp.get("v.iconName") ;
                items.push(item);
            }
            component.set("v.items", items);
            component.set("v.body", []);
            this.doFetchItemRecords(component);
        }
        catch(e)
        {
            this.showError(component, e.message);
        }
	},

    doFetchItemRecords : function (component)
    {
        try
        {
            var items = component.get("v.items");
            for(var i = 0; i < items.length; i++)
            {
                this.doFetchRecordsMethod(component, items[i], i);
            }
        }
        catch(e)
        {
            this.showError(component, e.message);
        }
    },
    
    doFetchRecordsMethod : function (component, item, index)
    {
        try
        {
            var action = item.action;
            var type = item.type;
            action.setCallback(this, function(response){
                if(!this.handleResponse(component, response))
                {
                    return;
                }
                var allRecords = response.getReturnValue();
                var mapRecordsByType = component.get("v.mapRecordsByType");
                if(!mapRecordsByType)
                {
                    mapRecordsByType = {};
                }
                mapRecordsByType[type] = allRecords;
                component.set("v.mapRecordsByType", mapRecordsByType);
                
                // if we have fetched records for all types, set flag so that child
                // component will display types menu
                var items = component.get("v.items");
                if(Object.keys(mapRecordsByType).length === items.length)
                {
                    component.set("v.selectedMenuType", items[0].type);
                    component.set("v.selectedMenuIconType", items[0].iconType);
                    component.set("v.selectedMenuIconName", items[0].iconName);
                    component.set("v.allRecords", mapRecordsByType[items[0].type]);
		            component.set("v.itemsPopulated", true);
                }
            });
             $A.enqueueAction(action);   
        }
        catch(e)
        {
            showError(component, e.message);
        }
    },
    
    hdlDoSearch : function(component) {
        var matchedRecords = [];
        var inputName = component.getGlobalId() + '_searchInput';
        var searchText = document.getElementById(inputName).value.toLowerCase();;
        component.set("v.inputText", searchText);
        var allRecords = component.get("v.allRecords");
        var minChars = 1;
        if(searchText === "*")
        {
            matchedRecords = allRecords;
        }
        else
        {
            if (searchText.length >= minChars) {
                //loop through all the records and find any which match
                for (var i=0; i<allRecords.length; i++) {
                    var record = allRecords[i];
                    var nameLcase = record[1].toLowerCase();
                    var location = nameLcase.indexOf(searchText);
                    
                    if (location !== -1) 
                    {
                        matchedRecords.push(record);   
                    }                     
                }            
            }
        }
        component.set("v.matchedRecords", matchedRecords);
    },

    handleResponse : function(component, response) {
        var state = response.getState();
        if (state !== "SUCCESS") 
        {
            var unknownError = true;
            if(state === 'ERROR')
            {
                var errors = response.getError();
                if (errors) 
                {
                    if (errors[0] && errors[0].message) 
                    {
                        unknownError = false;
                        this.showError(component, errors[0].message);
                    }
                }
            }
            if(unknownError)
            {
                this.showError(component, 'Unknown error from Apex method ITAMFinancialTableCtrl.getFinancials');
            }
            return false;
        }
        var error = response.getReturnValue().error;
        if(error)
        {
            this.showError(component, error);
            return false;
        }
        return true;
    },
    showError : function(component, error) {
        var errorEvent = component.getEvent("EvtChildComponentError");
        errorEvent.setParams({"message" : message});
        errorEvent.fire();   
    }
})