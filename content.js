function getUrlVars() {
	var vars = {};
	var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
		vars[key] = value;
	});
	return vars;
}

//test if user is on blackboard
if (document.domain == "blackboard.leidenuniv.nl"){
	
	//find the action list
	var courseMenu = document.getElementById('courseMenuPalette_contents');
	
	if(courseMenu != null){
		//create a list item with a link
		var itemnode = document.createElement("LI");
		var linenode = document.createElement("LI");
		var linknode = document.createElement("A");
	
		//get the course information
		var course_id = getUrlVars()["course_id"];
		var content_id = getUrlVars()["content_id"];
	
		//set the link to the correct unsubscribe page
		linknode.href = "https://blackboard.leidenuniv.nl/webapps/3xo-unenroll-tool-bb_bb60/unenroll.jsp?course_id="  + course_id + "&content_id=" + content_id;
		//set the text
		linknode.text = "Unenroll";
	
		//set the class
		//linknode.className = "clearfix";
		linenode.className = "clearfix divider";
	
		courseMenu.appendChild(linenode);
	
		itemnode.appendChild(linknode);
		courseMenu.appendChild(itemnode);
	}
	
	//find the courses table
	var courseTables = document.getElementsByClassName('attachments');
	
	
	for(i = 0; i < courseTables.length; i++ ){
		courseTable = courseTables[i];
	
		var row = courseTable.getElementsByTagName("TR")[0];
		
		var titlenode = row.insertCell(-1);
		
		titlenode.innerHTML = "<b>Unenroll form course</b>";
		
		var rows = courseTable.getElementsByTagName("TR");
		rows.splice(0, 1);
		
		for(j = 0; j < rows.length; j++){
			row = rows[j];
			
			var cellnode = row.insertCell(-1);
			var linknode = document.createElement("A");
			
			linknode.text = "Unenroll";
			cellnode.appendChild(linknode);
		}
	}
	
	var courseEnrollTables = document.getElementsByClassName('inventory sortable $wrappingTableClass');
	
	var now = new Date();
	
	var thisYear = now.getFullYear()
	
	if(now.getMonth() < 7){//voor augustus:
		var startYear = thisYear - 1;
		var endYear = thisYear;
	}
	else{//na (of in) augustus:
		var startYear = thisYear;
		var endYear = thisYear + 1;
	}
	
	notation0 = '['+startYear.toString()+'-'+endYear.toString()+']';
	notation1 = '['+startYear.toString()+'-'+endYear.toString().slice(-2)+']';
	
	
	for(i = 0; i < courseEnrollTables.length; i++ ){
		courseTable = courseEnrollTables[i];
	
		var entries = courseTable.getElementsByTagName("TD");
		
		for(j = 0; j < entries.length; j++){
			entry = entries[j];
			var text = entry.innerHTML;
			if(text.indexOf(notation0)+text.indexOf(notation1) != -2){
				entry.innerHTML = '<b>'+text+'</b>';
			}
		}
	}
	
}


 
