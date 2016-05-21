function setDocHeight()
{
    try
    {
        var iframeElement = parent.document.getElementById('main'); 
        iframeElement.style.height = "10000px"; //100px or 100% 
                    
        var iframeElement2 = parent.document.getElementById('menu'); 
        iframeElement2.style.height = "10000px"; //100px or 100% 
                    
        //alert(iframeElement2);
                    
        docHeight = document.getElementById("marker").offsetTop;
                
        //alert(docHeight);
        
        //Min fönster bör vara ca 800    
        if(docHeight > 0)
        {
            if(docHeight > 6400)
            {
                var iframeElement = parent.document.getElementById('main'); 
                iframeElement.style.height = docHeight + "px"; //100px or 100% 
                    
                var iframeElement2 = parent.document.getElementById('menu'); 
                iframeElement2.style.height = docHeight + "px"; //100px or 100% 
            }
            else
            {
                docHeight = 6400;
                
                var iframeElement = parent.document.getElementById('main'); 
                iframeElement.style.height = docHeight + "px"; //100px or 100% 
                    
                var iframeElement2 = parent.document.getElementById('menu'); 
                iframeElement2.style.height = docHeight + "px"; //100px or 100% 
            }
        }
    }
    catch(err)
    {
        //Handle errors here
    }
}

function jumpScroll() 
{
    parent.window.scroll(0,0); // horizontal and vertical scroll targets
}

jumpScroll();

function OpenPopWin(url, w, h)
{
  window.open(url, '', 'toolbar=no,location=no,directories=no,status=yes,menubar=no,scrollbars=yes,resizeable=no,width=' + w + ', height=' + h +'');
}

function overlay(id, gradeId, ascentName, crag, cragSector, cragCountryCode, ascentType, repeat)
{
    try{
        docHeight = document.getElementById(id).offsetTop;
        el.style.top = docHeight + "px";
    }catch(err){}
    
    var url = 'EditAscent.aspx?Action=Add&Type=DIALOG&GradeId=' + gradeId + 
        '&AscentName=' + encodeURIComponent(ascentName) + 
        '&Crag=' + encodeURIComponent(crag) + 
        '&CragCountryCode=' + cragCountryCode + 
        '&CragSector=' + encodeURIComponent(cragSector) + 
        "&AscentType=" + ascentType + 
        '&AscentClass=0&Repeat=' + repeat;

    el = document.getElementById("overlay");
    el.innerHTML = '<div><p style="text-align:right"><a href=\'#\' onclick=\'overlay()\'>Close Window (X)</a></p><p><iframe width=\'900\' height=\'180\' frameborder=\'0\' scrolling="no" marginheight=\'0\' marginwidth=\'0\' src=' + url + '></iframe></p></div>';
    el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
}

function OpenPopWinAddAscent(gradeId, ascentName, crag, cragSector, cragCountryCode, ascentType, repeat)
{
    window.open(
        'EditAscent.aspx?Action=Add&GradeId=' + gradeId + 
            '&AscentName=' + encodeURIComponent(ascentName) + 
            '&Crag=' + encodeURIComponent(crag) + 
            '&CragCountryCode=' + cragCountryCode + 
            '&CragSector=' + encodeURIComponent(cragSector) + 
            '&AscentType=' + ascentType + 
            '&AscentClass=0&Repeat=' + repeat,
        '',
        'toolbar=no,location=no,directories=no,status=yes,menubar=no,scrollbars=yes,resizeable=no,width=900, height=200'
    );
}

function Close()
{
  window.close();
}

function RefreshOpenerWin()
{
  window.opener.location.reload(true);
  window.close();
}

function RefreshOpenerWinWithNewUrl(url)
{
  window.opener.location.href = url;
  window.close();
}

function GetDate(CtrlName)
{
  ChildWindow = window.open('../commonFunctions/Calendar.aspx?FormName=' + document.forms[0].name + '&CtrlName=' + CtrlName, "_blank", "width=270,height=300,top=200,left=200,toolbars=no,scrollbars=no,status=no,resizable=no");    
}

function ConfirmDelete(msg)
{
  if (confirm(msg) == true)
	return true;
  else
    return false;
}