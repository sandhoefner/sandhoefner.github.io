// http://9to5google.com/2015/06/14/how-to-make-a-chrome-extensions/

var elements = document.getElementsByTagName('*');

for (var i = 0; i < elements.length; i++) {
    var element = elements[i];

    for (var j = 0; j < element.childNodes.length; j++) {
        var node = element.childNodes[j];

        if (node.nodeType === 3) {
            var text = node.nodeValue;
            var replacedText = text.replace(/3/gi, 'VB');
            var replacedText = replacedText.replace(/4\-/gi, 'V0-');
            var replacedText = replacedText.replace(/4/gi, 'V0');
            var replacedText = replacedText.replace(/4\+/gi, 'V0+');
            var replacedText = replacedText.replace(/5/gi, 'V1');
            var replacedText = replacedText.replace(/5\+/gi, 'V2');
            var replacedText = replacedText.replace(/6A/gi, 'V3');
            var replacedText = replacedText.replace(/6A\+/gi, 'V3+');
            var replacedText = replacedText.replace(/6B/gi, 'V4');
            var replacedText = replacedText.replace(/6B\+/gi, 'V4+');
            var replacedText = replacedText.replace(/6C/gi, 'V5');
            var replacedText = replacedText.replace(/6C\+/gi, 'V5+');
            var replacedText = replacedText.replace(/7A/gi, 'V6');
            var replacedText = replacedText.replace(/7A\+/gi, 'V7');
            var replacedText = replacedText.replace(/7B/gi, 'V8');
            var replacedText = replacedText.replace(/7B\+/gi, 'V8+');
            var replacedText = replacedText.replace(/7C/gi, 'V9');
            var replacedText = replacedText.replace(/7C\+/gi, 'V10');
            var replacedText = replacedText.replace(/8A/gi, 'V11');
            var replacedText = replacedText.replace(/8A\+/gi, 'V12');
            var replacedText = replacedText.replace(/8B/gi, 'V13');
            var replacedText = replacedText.replace(/8B\+/gi, 'V14');
            var replacedText = replacedText.replace(/8C/gi, 'V15');
            var replacedText = replacedText.replace(/8C\+/gi, 'V16');

            if (replacedText !== text) {
                element.replaceChild(document.createTextNode(replacedText), node);
            }
        }
    }
}