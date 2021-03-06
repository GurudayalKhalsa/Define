//JS Livesearch/Autocomplete
(function(){$.fn.livesearch=function(e){function t(e){if(typeof e==="undefined")return false;if(typeof e!=="function"&&typeof e==="object"&&(typeof e.length==="undefined"||e.length===0))return false;if(e===""||e===0||e===null||e===undefined)return false;return true}if(!t(e.data))return;if(typeof e.data==="string"){$.getJSON(e.data,function(t){e.data=t;a()})}else a();var r=this;function a(){var a=e.data,h=[],o=r[0].value,c=e.maxResults||100,v=e.type||"",g=8,d=40,p=38,m=13,y=27,R=0;if(e.structure==="trie"){a=new u(a);trie=a}else{a=e.data.slice(0);e.data=l(e.data,"name");if(e.data[0]==="")e.data=e.data.slice(1);a=e.data.slice(0)}r.on("keyup",function(r){if(r.keyCode===p||r.keyCode===d||r.keyCode===m)return;if(e.structure==="trie"&&t(this.value)){var l=a.get(this.value)}else{if(t(this.value)&&o!==this.value){if(!t(o)&&this.value.length>0){var l=f(this.value,e.data,v);a=e.data.slice(0);h.push(l.slice(0))}else if(this.value.length>o.length){var l=a=f(this.value,a,v);h.push(l.slice(0))}else if(this.value.length<o.length-1||this.value.length<o.length&&h.length<this.value.length){var l=f(this.value,e.data,v);a=e.data.slice(0)}else if(this.value.length===o.length-1&&h.length===this.value.length+1&&h.length>1&&this.value===o.substr(0,o.length-1)){h.splice(h.length-1,1);a=h[h.length-1].slice(0);var l=a.slice(0)}else{h=[];var l=f(this.value,e.data,v);a=e.data.slice(0);h.push(l.slice(0))}}else{h=[]}o=this.value}if(l==0||r.keyCode===y||r.keyCode===g&&!t(this.value)){$(".searchResults").remove();return}var u=$(this);var b="";for(i in l){if(i>c)break;b+="<li>"+n(l[i])+"</li>"}if(!t($(".searchResults"))){var C=document.createElement("ul");C.innerHTML=b;C=$(C);C.css({left:u.offset().left,top:u.offset().top+u.outerHeight(),"min-width":u.outerWidth(),"max-height":400,overflow:"auto"});C.addClass("searchResults");document.body.appendChild(C[0])}else if(t($(".searchResults"))&&t(l)){$(".searchResults").show()[0].innerHTML=b}var j=0;$(".searchResults li").mouseenter(function(e){if(e.clientY===j)return;j=e.clientY;$(".searchResults li.active").removeClass("active");$(this).addClass("active");R=$(this).index();s($(".searchResults li.active"))});if(t(e.onload))e.onload($(".searchResults"));if(t($(".searchResults"))&&!t($(".searchResults li.active"))){R=0;$($(".searchResults").find("li")[R]).toggleClass("active")}});r.on("keydown",function(e){var r=$(".searchResults").find("li");if(e.keyCode===m&&t($(".searchResults"))){s($(".searchResults li.active"));var i=$(r[R]).find("a")[0];if(t(i.href))window.location.href=i.href}else if(e.keyCode===d&&t($(".searchResults"))){$(".searchResults li.active").removeClass("active");if(R<r.length-1)R++;$(r[R]).toggleClass("active");if(!b())$(r[R])[0].scrollIntoView(false);s($(".searchResults li.active"))}else if(e.keyCode===p&&t($(".searchResults"))){$(".searchResults li.active").removeClass("active");if(R>0)R--;$(r[R]).toggleClass("active");if(!b())$(r[R])[0].scrollIntoView(true);s($(".searchResults li.active"));e.preventDefault()}else if(t($(".searchResults"))&&R!==0){$(".searchResults li.active").removeClass("active")}});function b(){var e=$(".searchResults").offset().top,t=$(".searchResults li.active").offset().top,r=$(".searchResults").outerHeight(),i=$(".searchResults li.active").outerHeight();return e<t&&e+r>t+i}window.onclick=function(e){if(r.offset().left<e.clientX&&e.clientX<parseInt(parseInt(r.offset().left)+parseInt(r.outerWidth()))&&r.offset().top<e.clientY&&e.clientY<parseInt(parseInt(r.offset().top)+parseInt(r.outerHeight()))){$(".searchResults").show()}else{$(".searchResults").hide()}}}function s(e){var t=e.find("[data-livesearch-value]").attr("data-livesearch-value")||e.text();r[0].value=t}function n(r){if(!t(e.format)&&!t(r.name))return"<a data-livesearch-value='"+r+"'>"+r+"</a>";else if(!t(e.format)&&t(r.name)){return"<a data-livesearch-value='"+r.name+"'>"+r.name+"</a>"}else if(t(e.format)&&!t(r.name)){if(e.format.match("}{")!==null)return;var i=e.format.split(/[{}]/);if(e.format[0]==="{")var a=0;else var a=1;for(var s=a;s<i.length;s+=2){i[s]=r;if(e.capitalize)i[s].capitalize()}i=i.join("");return i}else{if(e.format.match("}{")!==null)return;var i=e.format.split(/[{}]/);if(e.format[0]==="{")var a=0;else var a=1;for(var s=a;s<i.length;s+=2){if(i[s].match(/[+]/)!==null){i[s]=i[s].split("+");for(j in i[s])i[s][j]=r[i[s][j]];i[s]=i[s].join("")}else{i[s]=r[i[s]]}if(e.capitalize)i[s].capitalize()}i=i.join("");return i}}function l(e,r){if(typeof e[0]==="object"&&t(e[0][r])){return e.sort(function(e,t){var i=e[r];var a=t[r];return i<a?-1:i>a?1:0})}else return e.sort()}String.prototype.capitalize=function(){return this.charAt(0).toUpperCase()+this.slice(1)};function f(e,r,i,a){String.prototype.livesearch_hasMatch=function(e,t){String.prototype.livesearch_score=function(e,t){t=t||0;if(e.length==0)return.9;if(e.length>this.length)return 0;for(var r=e.length;r>0;r--){var i=e.substring(0,r);var a=this.indexOf(i);if(a<0)continue;if(a+e.length>this.length+t)continue;var s=this.substring(a+i.length);var n=null;if(r>=e.length)n="";else n=e.substring(r);var l=s.score(n,t+a);if(l>0){var f=this.length-s.length;if(a!=0){var u=0;var h=this.charCodeAt(a-1);if(h==32||h==9){for(var u=a-2;u>=0;u--){h=this.charCodeAt(u);f-=h==32||h==9?1:.15}}else{f-=a}}f+=l*s.length;f/=this.length;return f}}return 0};if(t==="lazy")return this.livesearch_score(e)>0;return this.match(new RegExp("^"+e,"i"))!==null||this.match(new RegExp(" "+e,"i"))!==null};var s=[],n=r.length-1,l=0,f=Math.floor((n+l)/2),u=h();function h(){if(typeof r[f]==="object"&&t(r[f].name))return r[f].name;else return r[f]}var o=0;while(t(u)&&!u.livesearch_hasMatch(e,i)){o++;u=h();if(!t(u))break;if(u.length>=e.length&&!u.livesearch_hasMatch(e,i)){if(u>e){n=f;f=Math.floor((n+l)/2)}else if(u<e){l=f;f=Math.floor((n+l)/2)}}if(l===n||o>50)break}if(t(a)&&n>a)n=a;for(var f=l;f<=n;f++){var u=r[f];if(h().livesearch_hasMatch(e,i)){s.push(u)}}return s}function u(e){var t={};var r="|";this.getObject=function(e){if(!e)return t;var r="";var i=t;for(var a=0;a<e.length;a++){var s=e[a];if(i[s])i=i[s];else return false}if(i!==t){return i}return false};this.get=function(e){if(typeof e==="object"){var s={};for(var n in e)s[e[n]]=this.get(e[n]);return s}if(typeof e!=="string"&&e!==undefined)return[];var l=this.getObject(e);if(typeof e==="string"&&!l)return[];l=l||t;var s=[];function f(e){if(e[r]&&!s[e[r]])s.push(e[r]);if(i(e))for(var t in a(e))f(e[t]);else return}f(l);return s};this.insert=function(e){if(typeof e==="object"){for(var i in e)this.insert(e[i]);return true}if(typeof e!=="string")return false;var a="";var s=t;for(var i=0;i<e.length;i++){var n=e[i];if(!s[n]&&a!==e)s[n]={};a+=n;if(a===e){s[n][r]=e}s=s[n]}return true};this.remove=function(e,a){if(typeof e==="object"){for(var l in e)this.remove(e[l]);return true}if(typeof e!=="string")return false;var a=a||false;var f=this.getObject(e);if(typeof e==="string"&&this.getObject(e)===false||!this.has(e)&&a===false&&f[r]!==e)return false;if(!this.has(e)&&a===true&&u[e]){delete u[e];return true}else if(!this.has(e)&&a===false)return false;if(f[r]&&f[r]===e)delete f[r];var u=n(f,e,t);if(i(f)){if(a===true)for(var l in f)delete f[l];if(s(u)===1&&u[e[e.length-1]])return true}for(var l=e.length-1;l>=0;l--){var h=e[l];var u=n(f,e,t);if(s(u)>=1&&u[h]){delete u[h];if(s(u)>=1)return true}f=u}return true};this.has=function(e){if(typeof e==="object"){var t={};for(var i in e)t[e[i]]=this.has(e[i]);return t}if(typeof e!=="string")return false;var a=this.getObject(e);if(typeof e==="string"&&!a)return false;if(a[r]&&a[r]===e)return true;return false};this.insert(e);function i(e){if(e.length===0)return false;for(var t in e)if(typeof e[t]==="object")return true;return false}function a(e){var t={};for(var i in e){if(e[i]!==r)t[i]=e[i]}return t}function s(e){var t=0;for(var r in e){t++}return t}function n(e,t,r){var i="";var a=r;var s=[];for(var n=0;n<t.length;n++){var l=t[n];if(a[l]){s.push(a);a=a[l]}else return false;if(a===e)return s.pop()}}function l(e){return JSON.parse(JSON.stringify(e))}}}})();

function getJSONP(url, callback)
{

    //save callback
    if(typeof callback === "function") window.getJSONP.prototype.callback = callback;
    //if url
    if(typeof url === "string")
    {
        var script = document.createElement("script");
        script.getJSONPid="getJSONP";
        script.src = url+"&callback=getJSONP";
        document.body.appendChild(script);
    }
    //if JSON
    else
    {
        //remove the script appended to the body
        var scripts = document.getElementsByTagName("script");
        for(var i in scripts)
        {
            var script = scripts[i];
            if(typeof script.getJSONPid !== "undefined" && script.getJSONPid==="getJSONP") document.body.removeChild(script);
        }
        //call callback, with response as parameter
        if(typeof window.getJSONP.prototype.callback !== "undefined") window.getJSONP.prototype.callback(url);
    }
}

//fetches definition from google as JSON, and passes definitions as a parameter in callback
function define(word, callback)
{
    getJSONP("http://www.google.com/dictionary/json?sl=en&tl=en&q="+word, function(data)
    {
        callback(getDefinitions(data), data);
    });

    function getDefinitions(obj)
    {
        var definitions = {};

        for(var i in obj.primaries)
        {
            var primary = obj.primaries[i];
            for(var j in primary.entries)
            {
                var entry = primary.entries[j];
                if(entry.type==="meaning")
                {
                    var meaning = {};
                    if(!definitions[primary.terms[0].labels[0].text]) definitions[primary.terms[0].labels[0].text] = [];
                    definitions[primary.terms[0].labels[0].text].push(entry.terms[0].text);
                    break;
                }
                
            }
        }

        return definitions;
    }
}