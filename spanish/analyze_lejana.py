# -*- coding: utf-8 -*-

# at the end of the day this isn't useful until you've folded words into lexemes

# some of these may not be used
# __future__ import must remain at top
# from __future__ import print_function
import csv
import io
from bs4 import BeautifulSoup
import urllib
import requests
import mechanize
import codecs
import cookielib
from requests import session
import collections
import operator
import locale
import os
import time
import sys
import unicodedata
from kitchen.text.converters import getwriter, to_bytes, to_unicode
import re

story = ["Diario","de","Alina","Reyes","12","de","enero","Anoche","fue","otra","vez,","yo","tan","cansada","de","pulseras","y","farándulas,","de","pink","champagne","y","la","cara","de","Renato","Viñes,","oh","esa","cara","de","foca","balbuceante,","de","retrato","de","Dorian","Gray","a","lo","último.","Me","acosté","con","gusto","a","bombón","de","menta,","al","Boogie","del","Banco","Rojo,","a","mamá","bostezada","y","cenicienta","(como","queda","ella","a","la","vuelta","de","las","fiestas,","cenicienta","y","durmiéndose,","pescado","enormísimo","y","tan","no","ella.)","Nora","que","dice","dormirse","con","luz,","con","bulla,","entre","las","urgidas","crónicas","de","su","hermana","a","medio","desvestir.","Qué","felices","son,","yo","apago","las","luces","y","las","manos,","me","desnudo","a","gritos","de","lo","diurno","y","moviente,","quiero","dormir","y","soy","una","horrible","campana","resonando,","una","ola,","la","cadena","que","Rex","arrastra","toda","la","noche","contra","los","ligustros.","Now","I","lay","me","down","to","sleep…","Tengo","que","repetir","versos,","o","el","sistema","de","buscar","palabras","con","a,","después","con","a","y","e,","con","las","cinco","vocales,","con","cuatro.","Con","dos","y","una","consonante","(ala,","ola),","con","tres","consonantes","y","una","vocal","(tras,","gris)","y","otra","vez","versos,","la","luna","bajó","a","la","fragua","con","su","polisón","de","nardos,","el","niño","la","mira","mira,","el","niño","la","está","mirando.","Con","tres","y","tres","aslternadas,","cábala,","laguna,","animal;","Ulises,","ráfaga,","reposo.","Así","paso","horas:","de","cuatro,","de","tres","y","dos,","y","más","tarde","palindromas.","Los","fáciles,","salta","Lenin","el","Atlas;","amigo,","no","gima;","los","más","difíciles","y","hermosos,","átate,","demoniaco","Caín","o","me","delata;","Anás","usó","tu","auto","Susana.","O","los","preciosos","anagramas:","Salvador","Dalí,","Avida","Dollars;","Alina","Reyes,","es","la","reina","y…","Tan","hermoso,","éste,","porque","abre","un","camino,","porque","no","concluye.","Porque","la","reina","y…","No,","horrible.","Horrible","porque","abre","camino","a","esta","que","no","es","la","reina,","y","que","otra","vez","odio","de","noche.","A","esa","que","es","Alina","Reyes","pero","no","la","reina","del","anagrama;","que","será","cualquier","cosa,","mendiga","en","Budapest,","pupila","de","mala","casa","en","Jujuy","o","sirvienta","en","Quetzaltenango,","cualquier","lado","lejos","y","no","reina.","Pero","sí","Alina","Reyes","y","por","eso","anoche","fue","otra","vez,","sentirla","y","el","odio.","20","de","enero","A","veces","sé","que","tiene","frío,","que","sufre,","que","le","pegan.","Puedo","solamente","odiarla","tanto,","aborrecer","las","manos","que","la","tiran","al","suelo","y","también","a","ella,","a","ella","todavía","más","porque","le","pegan,","porque","soy","yo","y","le","pegan.","Ah,","no","me","desespera","tanto","cuando","estoy","durmiendo","o","corto","un","vestido","o","son","las","horas","de","recibo","de","mamá","y","yo","sirvo","el","té","a","la","señora","de","Regules","o","al","chico","de","los","Rivas.","Entonces","me","importa","menos,","es","un","poco","cosa","personal,","yo","conmigo;","la","siento","más","dueña","de","su","infortunio,","lejos","y","sola","pero","dueña.","Que","sufra,","que","se","hiele;","yo","aguanto","desde","aquí,","y","creo","que","entonces","la","ayudo","un","poco.","Como","hacer","vendas","para","un","soldado","que","todavía","no","ha","sido","herido","y","sentir","eso","de","grato,","que","se","le","está","aliviando","desde","antes,","previsoramente.","Que","sufra.","Le","doy","un","beso","a","la","señora","de","Regules,","el","té","al","chico","de","los","Rivas,","y","me","reservo","para","resistir","por","dentro.","Me","digo:","«Ahora","estoy","cruzando","un","puente","helado,","ahora","la","nieve","me","entra","por","los","zapatos","rotos».","No","es","que","sienta","nada.","Sé","solamente","que","es","así,","que","en","algún","lado","cruzo","un","puente","en","el","instante","mismo","(pero","no","sé","si","es","el","instante","mismo)","en","que","el","chico","de","los","Rivas","me","acepta","el","té","y","pone","su","mejor","cara","de","tarado.","Y","aguanto","bien","porque","estoy","sola","entre","esas","gentes","sin","sentido,","y","no","me","desespera","tanto.","Nora","se","quedó","anoche","como","tonta,","dijo:","«¿Pero","qué","te","pasa?».","Le","pasaba","a","aquella,","a","mí","tan","lejos.","Algo","horrible","debió","pasarle,","le","pegaban","o","se","sentía","enferma","y","justamente","cuando","Nora","iba","a","cantar","a","Fauré","y","yo","en","el","piano,","mirándolo","tan","feliz","a","Luis","María","acodado","en","la","cola","que","le","hacía","como","un","marco,","él","mirándome","contento","con","cara","de","perrito,","esperando","oír","los","arpegios,","los","dos","tan","cerca","y","tan","queriéndonos.","Así","es","peor,","cuando","conozco","algo","nuevo","sobre","ella","y","justo","estoy","bailando","con","Luis","María,","besándolo","o","solamente","cerca","de","Luis","María.","Porque","a","mí,","a","la","lejana,","no","la","quieren.","Es","la","parte","que","no","quieren","y","cómo","no","me","va","a","desgarrar","por","dentro","sentir","que","me","pegano","la","nieve","me","entra","por","los","zapatos","cuando","Luis","María","baila","conmigo","y","su","mano","en","la","cintura","me","va","subiendo","como","un","calor","a","mediodía,","un","sabor","a","naranjas","fuertes","o","tacuaras","chicoteadas,","y","a","ella","le","pegan","y","es","imposible","resistir","y","entonces","tengo","que","decirle","a","Luis","María","que","no","estoy","bien,","que","es","la","humedad,","humedad","entre","esa","nieve","que","no","siento,","que","no","siento","y","me","está","entrando","por","los","zapatos.","25","de","enero","Claro,","vino","Nora","a","verme","y","fue","la","escena.","«M’hijita,","la","última","vez","que","te","pido","que","me","acompañes","al","piano.","Hicimos","un","papelón».","Qué","sabía","yo","de","papelones,","la","acompañé","como","pude,","me","acuerdo","que","la","oía","con","sordina.","Votre","âme","est","un","paysage","choisi…","pero","me","veía","las","manos","entre","las","teclas","y","parecía","que","tocaban","bien,","que","acompañaban","honestamente","a","Nora.","Luis","María","también","me","miró","las","manos,","el","pobrecito,","yo","creo","que","era","porque","no","se","animaba","a","mirarme","la","cara.","Debo","ponerme","tan","rara.","Pobre","Norita,","que","la","acompañe","otra.","(Esto","parece","cada","vez","más","un","castigo,","ahora","sólo","me","conozco","allá","cuando","voy","a","ser","feliz,","cuando","soy","feliz,","cuando","Nora","canta","Fauré","me","conozco","allá","y","no","queda","más","que","el","odio).","Noche","A","veces","es","ternura,","una","súbita","y","necesaria","ternura","hacia","la","que","no","es","reina","y","anda","por","ahí.","Me","gustaría","mandarle","un","telegrama,","encomiendas,","saber","que","sus","hijos","están","bien","o","que","no","tiene","hijos","-porque","yo","creo","que","allá","no","tengo","hijos-","y","necesita","confortación,","lástima,","caramelos.","Anoche","me","dormí","confabulando","mensajes,","puntos","de","reunión.","Estaré","jueves","stop","espérame","puente.","¿Qué","puente?","Idea","que","vuelve","como","vuelve","Budapest","donde","habrá","tanto","puente","y","nieve","que","rezuma.","Entonces","me","enderecé","rígida","en","la","cama","y","casi","aúllo,","casi","corro","a","despertar","a","mamá,","a","morderla","para","que","se","despertara.","Nada","más","que","por","pensar.","Todavía","no","es","fácil","decirlo.","Nada","más","que","por","pensar","que","yo","podría","irme","ahora","mismo","a","Budapest,","si","realmente","se","me","antojara.","O","a","Jujuy,","a","Quetzaltenango.","(Volví","a","buscar","estos","nombres","páginas","atrás).","No","valen,","igual","sería","decir","Tres","Arroyos,","Kobe,","Florida","al","cuatrocientos.","Sólo","queda","Budapest","porque","allí","es","el","frío,","allí","me","pegan","y","me","ultrajan.","Allí","(lo","he","soñado,","no","es","más","que","un","sueño,","pero","cómo","adhiere","y","se","insinúa","hacia","la","vigilia)","hay","alguien","que","se","llama","Rod","-o","Erod,","o","Rodo-","y","él","me","pega","y","yo","lo","amo,","no","sé","si","lo","amo","pero","me","dejo","pegar,","eso","vuelve","de","día","en","día,","entonces","es","seguro","que","lo","amo.","Más","tarde","Mentira.","Soñé","a","Rod","o","lo","hice","con","una","imagen","cualquiera","de","sueño,","ya","usada","y","a","tiro.","No","hay","Rod,","a","mí","me","han","de","castigar","allá,","pero","quién","sabe","si","es","un","hombre,","una","madre","furiosa,","una","soledad.","Ir","a","buscarme.","Decirle","a","Luis","María:","«Casémonos","y","me","llevas","a","Budapest,","a","un","puente","donde","hay","nieve","y","alguien».","Yo","digo:","¿y","si","estoy?","(Porque","todo","lo","pienso","con","la","secreta","ventaja","de","no","querer","creerlo","a","fondo.","¿Y","si","estoy?).","Bueno,","si","estoy…","Pero","solamente","loca,","solamente…","¡Qué","luna","de","miel!","28","de","enero","Pensé","una","cosa","curiosa.","Hace","tres","días","que","no","me","viene","nada","de","la","lejana.","Tal","vez","ahora","no","le","pegan,","o","no","pudo","conseguir","abrigo.","Mandarle","un","telegrama,","unas","medias…","Pensé","una","cosa","curiosa.","Llegaba","a","la","terrible","ciudad","y","era","de","tarde,","tarde","verdosa","y","ácuea","como","no","son","nunca","las","tardes","si","no","se","las","ayuda","pensándolas.","Por","el","lado","de","la","Dobrina","Stana,","en","la","perspectiva","Skorda,","caballos","erizados","de","estalagmitas","y","polizontes","rígidos,","hogazas","humeantes","y","flecos","de","viento","ensoberbeciendo","las","ventanas","Andar","por","la","Dobrina","con","paso","de","turista,","el","mapa","en","el","bolsillo","de","mi","sastre","azul","(con","ese","frío","y","dejarme","el","abrigo","en","el","Burglos),","hasta","una","plaza","contra","el","río,","casi","en","encima","del","río","tronante","de","hielos","rotos","y","barcazas","y","algún","martín","pescador","que","allá","se","llamará","sbunáia","tjéno","o","algo","peor.","Después","de","la","plaza","supuse","que","venía","el","puente.","Lo","pensé","y","no","quise","seguir.","Era","la","tarde","del","concierto","de","Elsa","Piaggio","de","Tarelli","en","el","Odeón,","me","vestí","sin","ganas","sospechando","que","después","me","esperaría","el","insomnio.","Este","pensar","de","noche,","tan","noche…","Quién","sabe","si","no","me","perdería.","Una","inventa","nombres","al","viajar","pensando,","los","recuerda","en","el","momento:","Dobrina","Stana,","sbunáia","tjéno,","Burglos.","Pero","no","sé","el","nombre","de","la","plaza,","es","como","si","de","veras","hubiera","llegado","a","una","plaza","de","Budapest","y","estuviera","perdida","por","no","saber","su","nombre;","ahí","donde","un","nombre","es","una","plaza.","Ya","voy,","mamá.","Llegaremos","bien","a","tu","Bach","y","a","tu","Brahms.","Es","un","camino","tan","simple.","Sin","plaza,","sin","Burglos.","Aquí","nosotras,","allá","Elsa","Piaggio.","Qué","triste","haberme","interrumpido,","saber","que","estoy","en","una","plaza","(pero","esto","ya","no","es","cierto,","solamente","lo","pienso","y","eso","es","menos","que","nada).","Y","que","al","final","de","la","plaza","empieza","el","puente.","Noche","Empieza,","sigue.","Entre","el","final","del","concierto","y","el","primer","bis","hallé","su","nombre","y","el","camino.","La","plaza","Vladas,","el","puente","de","los","mercados.","Por","la","plaza","Vladas","seguí","hasta","el","nacimiento","del","puente,","un","poco","andando","y","queriendo","a","veces","quedarme","en","casas","o","vitrinas,","en","chicos","abrigadísimos","y","fuentes","con","altos","héroes","de","emblanquecidas","pelerinas,","Tadeo","Alanko","y","Vladislas","Néroy,","bebedores","de","tokay","y","cimbalistas.","Yo","veía","saludar","a","Elsa","Piaggio","entre","un","Chopin","y","otro","Chopin,","pobrecita,","y","de","mi","platea","se","salía","abiertamente","a","la","plaza,","con","la","entrada","del","puente","entre","vastísimas","columnas.","Pero","esto","yo","lo","pensaba,","ojo,","lo","mismo","que","anagramar","es","la","reina","y…","en","vez","de","Alina","Reyes,","o","imaginarme","a","mamá","en","casa","de","los","Suárez","y","no","a","mi","lado.","Es","bueno","no","caer","en","la","sonsera:","eso","es","cosa","mía,","nada","más","que","dárseme","la","gana,","la","real","gana.","Real","porque","Alina,","vamos-No","lo","otro,","no","el","sentirla","tener","frío","o","que","la","maltratan.","Esto","se","me","antoja","y","lo","sigo","por","gusto,","por","saber","adónde","va,","para","enterarme","si","Luis","María","me","lleva","a","Budapest,","si","nos","casamos","y","le","pido","que","me","lleve","a","Budapest.","Más","fácil","salir","a","buscar","ese","puente,","salir","en","busca","mía","y","encontrarme","como","ahora","porque","ya","he","andado","la","mitad","del","puente","entre","gritos","y","aplausos,","entre","«¡Álbeniz!»","y","más","aplausos","y","«¡La","polonesa!»,","como","si","esto","tuviera","sentido","entre","la","nieve","arriscada","que","me","empuja","con","el","viento","por","la","espalda,","manos","de","toalla","de","esponja","llevándome","por","la","cintura","hacia","el","medio","del","puente.","(Es","más","cómodo","hablar","en","presente.","Esto","era","a","las","ocho,","cuando","Elsa","Piaggio","tocaba","el","tercer","bis,","creo","que","Julián","Aguirre","o","Carlos","Guastavino,","algo","con","pasto","y","pajaritos).","Pero","me","he","vuelto","canalla","con","el","tiempo,","ya","no","le","tengo","respeto.","Me","acuerdo","que","un","día","pensé:","«Allá","me","pegan,","allá","la","nieve","me","entra","por","los","zapatos","y","esto","lo","sé","en","el","momento,","cuando","me","está","ocurriendo","allá","yo","lo","sé","al","mismo","tiempo.","¿Pero","por","qué","al","mismo","tiempo?","A","lo","mejor","me","llega","tarde,","a","lo","mejor","no","ha","ocurrido","todavía.","A","lo","mejor","le","pegarán","dentro","de","catorce","años,","o","ya","es","una","cruz","y","una","cifra","en","el","cementerio","de","Santa","Úrsula.","Y","me","parecía","bonito,","posible,","tan","idiota.","Porque","detrás","de","eso","una","siempre","cae","en","el","tiempo","parejo.","Si","ahora","ella","estuviera","realmente","entrando","en","el","puente,","sé","que","lo","sentiría","ya","mismo","y","desde","aquí.","Me","acuerdo","que","me","paré","a","mirar","el","río","que","estaba","sonando","y","chicoteando.","(Esto","yo","lo","pensaba).","Valía","asomarse","al","parapeto","del","puente","y","sentir","en","las","orejas","la","rotura","del","hielo","ahí","abajo.","Valía","quedarse","un","poco","por","la","vista,","un","poco","por","el","miedo","que","me","venía","de","adentro","-o","era","el","desabrigo,","la","nevisca","deshecha","y","mi","tapado","en","el","hotel-.","Y","después","que","yo","soy","modesta,","soy","una","chica","sin","humos,","pero","vengan","a","decirme","de","otra","que","le","haya","pasado","lo","mismo,","que","viaje","a","Hungría","en","pleno","Odeón.","Eso","le","da","frío","a","cualquiera,","che,","aquí","o","en","Francia.","Pero","mamá","me","tironeaba","la","manga,","ya","casi","no","había","gente","en","la","platea.","Escribo","hasta","ahí,","sin","ganas","de","seguir","acordándome","de","lo","que","pensé.","Me","va","a","hacer","mal","si","sigo","acordándome.","Pero","es","cierto,","cierto;","pensé","una","cosa","curiosa.","30","de","enero","Pobre","Luis","María,","qué","idiota","casarse","conmigo.","No","sabe","lo","que","se","echa","encima.","O","debajo,","como","dice","Nora","que","posa","de","emancipada","intelectual.","31","de","enero","Iremos","allá.","Estuvo","tan","de","acuerdo","que","casi","grito.","Sentí","miedo,","me","pareció","que","él","entra","demasiado","fácilmente","en","este","juego.","Y","no","sabe","nada,","es","como","el","peoncito","de","dama","que","remata","la","partida","sin","sospecharlo.","Peoncito","Luis","María,","al","lado","de","su","reina.","De","la","reina","y","–","7","de","febrero","A","curarse.","No","escribiré","el","final","de","lo","que","había","pensado","en","el","concierto.","Anoche","la","sentí","sufrir","otra","vez.","Sé","que","allá","me","estarán","pegando","de","nuevo.","No","puedo","evitar","saberlo,","pero","basta","de","crónica.","Si","me","hubiese","limitado","a","dejar","constancia","de","eso","por","gusto,","por","desahogo…","Era","peor,","un","deseo","de","conocer","al","ir","releyendo;","de","encontar","claves","en","cada","palabra","tirada","al","papel","después","de","tantas","noches.","Como","cuando","pensé","la","plaza,","el","río","roto","y","los","ruidos,","y","después…","Pero","no","lo","escribo,","no","lo","escribiré","ya","nunca.","Ir","allá","a","convencerme","de","que","la","soltería","me","dañaba,","nada","más","que","eso,","tener","veintisiete","años","y","sin","hombre.","Ahora","estará","bien","mi","cachorro,","mi","bobo,","basta","de","pensar,","a","ser","al","fin","y","para","bien.","Y","sin","embargo,","ya","que","cerraré","este","diario,","porque","una","o","se","casa","o","escribe","un","diario,","las","dos","cosas","no","marchan","juntas","-Ya","ahora","no","me","gusta","salirme","de","él","sin","decir","esto","con","alegría","de","esperanza,","con","esperanza","de","alegría.","Vamos","allá","pero","no","ha","de","ser","como","lo","pensé","la","noche","del","concierto.","(Lo","escribo,","y","basta","de","diario","para","bien","mío.)","En","el","puente","la","hallaré","y","nos","miraremos.","La","noche","del","concierto","yo","sentía","en","las","orejas","la","rotura","del","hielo","ahí","abajo.","Y","será","la","victoria","de","la","reina","sobre","esa","adherencia","maligna,","esa","usurpación","indebida","y","sorda.","Se","doblegará","si","realmente","soy","yo,","se","sumará","a","mi","zona","iluminada,","más","bella","y","cierta;","con","sólo","ir","a","su","lado","y","apoyarle","una","mano","en","el","hombro.","*","Alina","Reyes","de","Aráoz","y","su","esposo","llegaron","a","Budapest","el","6","de","abril","y","se","alojaron","en","el","Ritz.","Eso","era","dos","meses","antes","de","su","divorcio.","En","la","tarde","del","segundo","día","Alina","salió","a","conocer","la","ciudad","y","el","deshielo.","Como","le","gustaba","caminar","sola","-era","rápida","y","curiosa-","anduvo","por","veinte","lados","buscando","vagamente","algo,","pero","sin","proponérselo","demasiado,","dejando","que","el","deseo","escogiera","y","se","expresara","con","bruscos","arranques","que","la","llevaban","de","una","vidriera","a","otra,","cambiando","aceras","y","escaparates.","Llegó","al","puente","y","lo","cruzó","hasta","el","centro","andando","ahora","con","trabajo","porque","la","nieve","se","oponía","y","del","Danubio","crece","un","viento","de","abajo,","difícil,","que","engancha","y","hostiga.","Sentía","cómo","la","pollera","se","le","pegaba","a","los","muslos","(no","estaba","bien","abrigada)","y","de","pronto","un","deseo","de","dar","vuelta,","de","volverse","a","la","ciudad","conocida.","En","el","centro","del","puente","desolado","la","harapienta","mujer","de","pelo","negro","y","lacio","esperaba","con","algo","fijo","y","ávido","en","la","cara","sinuosa,","en","el","pliegue","de","las","manos","un","poco","cerradas","pero","ya","tendiéndose.","Alina","estuvo","junto","a","ella","repitiendo,","ahora","lo","sabía,","gestos","y","distancias","como","después","de","un","ensayo","general.","Sin","temor,","liberándose","al","fin","-lo","creía","con","un","salto","terrible","de","júbilo","y","frío-","estuvo","junto","a","ella","y","alargó","también","las","manos,","negándose","a","pensar,","y","la","mujer","del","puente","se","apretó","contra","su","pecho","y","las","dos","se","abrazaron","rígidas","y","calladas","en","el","puente,","con","el","río","trizado","golpeando","en","los","pilares.","A","Alina","le","dolió","el","cierre","de","la","cartera","que","la","fuerza","del","abrazo","le","clavaba","entre","los","senos","con","una","laceración","dulce,","sostenible.","Ceñía","a","la","mujer","delgadísima,","sintiéndola","entera","y","absoluta","dentro","de","su","abrazo,","con","un","crecer","de","felicidad","igual","a","un","himno,","a","un","soltarse","de","palomas,","al","río","cantando.","Cerró","los","ojos","en","la","fusión","total,","rehuyendo","las","sensaciones","de","fuera,","la","luz","crepuscular;","repentinamente","tan","cansada,","pero","segura","de","su","victoria,","sin","celebrarlo","por","tan","suyo","y","por","fin.","Le","pareció","que","dulcemente","una","de","las","dos","lloraba.","Debía","ser","ella","porque","sintió","mojadas","las","mejillas,","y","el","pómulo","mismo","doliéndole","como","si","tuviera","allí","un","golpe.","También","el","cuello,","y","de","pronto","los","hombros,","agobiados","por","fatigas","incontables.","Al","abrir","los","ojos","(tal","vez","gritaba","ya)","vio","que","se","habían","separado.","Ahora","sí","gritó.","De","frío,","porque","la","nieve","le","estaba","entrando","por","los","zapatos","rotos,","porque","yéndose","camino","de","la","plaza","iba","Alina","Reyes","lindísima","en","su","sastre","gris,","el","pelo","un","poco","suelto","contra","el","viento,","sin","dar","vuelta","la","cara","y","yéndose"]
legal_chars = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z',u'á',u'é',u'í',u'ó',u'ú',u'ü',u'ñ']
buffer = []
print "\nStory contains " + str(len(story)) + " words"

# remove duplicates
story = list(set(story))

print "Story contains " + str(len(story)) + " unique words before normalizing characters"

# convert to lowercase and remove non-letter characters

for word in story:
	word = re.sub('Á', 'á', word)
	word = re.sub('É', 'é', word)
	word = re.sub('Í', 'í', word)
	word = re.sub('Ó', 'ó', word)
	word = re.sub('Ú', 'ú', word)
	word = re.sub('Ñ', 'ñ', word)
	word = re.sub('Ü', 'ü', word)
	word = re.sub('¿', '', word)
	word = re.sub('¡', '', word)
	# what I really need is obviously a way to get re.sub to sub unrecognized chars with blank instead of <?> (called REPLACEMENT CHARACTER)
	# or maybe that's not the right approach at all. there are characters such as â in my dictionary

	word = word.lower()

	# this is where the replacement character is inserted
	# my current preferred approach is when I see a replacement character in the output,
	# add it below so it just gets preserved (if it's a letter). obviously not extensible,
	# but there are a LOT of diacritics and idk what I'll want down the road.
	# I guess what happens in the 0 frequency territory doesn't matter a ton
	word = re.sub('[^abcdefghijklmnopqrstuvwxyzáéíóúüñâ]', '', word)
	# word = word.lower()
	# for char in word:
	# 	print to_unicode(char)
	# 	goodChar = False
	# 	for bitch in legal_chars:
	# 		if type(bitch) is str and bitch is char:
	# 			new_word += char
	# 			break
	# 		elif type(char) is unicode and bitch is char.decode('utf-8'):
	# 			# print 'FUCK YEAS IT IS'
	# 			new_word += char
	# 			break
	if word is not '':
		buffer.append(word)

# remove duplicates again
story = list(set(buffer))

print "Story contains " + str(len(story)) + " unique words\n"

obj = {}

# data = codecs.open('CREA_truncated.csv', "rb", "utf-8")
# print data

with open('CREA_truncated_utf8.csv', 'rb') as csvfile:
	myReader = csv.reader(csvfile, delimiter = ',', quotechar = '"')
	rows = list(myReader)
	# cols: rank, word, abs_freq, norm_freq
	rankCol = 0
	wordCol = 1
	afreqCol = 2
	nfreqCol = 3
	counter = 0
	progress = 0
	milestones = [i*int(len(story)/50) for i in range(51)]
	start = time.time()
	for word in story:
		if counter in milestones:
			if progress > 0:
				# print('fish' + str(counter), end='\r')
				# print('{0}\r'.format(progress)),
				# print("Progress {:2.1%}".format(progress / 10), end="\r")
				# print('\x1b[2K\r'),
				# print(progress)
				spacing = ""
				if progress < 10:
					spacing = " "
				sys.stdout.write('\r[' + '.'*progress + ' '*(50-progress) + '] ' + str(progress*2) + "% complete: " + spacing + str(int(((50-progress)/progress)*(time.time()-start))) + " seconds remaining     "),
				sys.stdout.flush()
				# print str(progress) + "% complete: " + str(((100-progress)/progress)*(time.time()-start)) + " seconds remaining"
			progress += 1
		for row in rows:
			dict_word = row[wordCol]
			# print type(word)
			# don't use IS here
			if word == dict_word.strip():
				# print "equality"
				obj[word] = float(row[nfreqCol])
				break
		else:
			obj[word] = 0
		counter += 1

print '\n\nTask took about ' + str(time.time()-start) + ' seconds\n'

# obj = collections.OrderedDict(sorted(obj.items()))
# obj = sorted(obj.items(), key=lambda x: x[1])
obj = sorted(obj.items(), key=operator.itemgetter(1), reverse=True)
for word, freq in obj:
	#.replace(u"\uFFFD", "")
	# print freq, word.strip()
	pass