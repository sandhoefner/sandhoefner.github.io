a=document.getElementById("canvas"),
b=this.onkeydown,
c=this.onkeyup,
d=a.onmousemove,
e=a.width/2,
f=a.height/2,
this.onkeydown=function(g){b(g),
83!=g.keyCode||(e=-100000),
68!=g.keyCode||(f=100000),
69!=g.keyCode||(f=-100000),
70!=g.keyCode||(e=100000),
d({clientX:e,
clientY:f})},
this.onkeyup=function(g){c(g),
83!=g.keyCode||(e=a.width/2),
68!=g.keyCode||(f=a.height/2),
69!=g.keyCode||(f=a.height/2),
70!=g.keyCode||(e=a.width/2),
d({clientX:e,
clientY:f})},
a.onmousemove=null,
alert("You're ready to play Agar.io with ESDF!");