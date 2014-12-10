/**
 * Created by Schoeu on 2014/10/9.
 */
var schoeu = (function(){
    var $ = function(el){
        return new _Schoeu(el);
    }

    var _Schoeu = function(el) {
        var tarEles,queryType = el[0];
        if(document.querySelector){
            if(queryType == "#"){
                tarEles = document.querySelector(el);
            }else{
                tarEles = document.querySelectorAll(el);
            }
        }else{
            if(queryType == "#"){
                tarEles = document.getElementById(el.substring(1));
            }else if(queryType == "."){
                tarEles = $.getElementsByClassName(el.substring(1))
            }else if(/^[^#\.]/g.test(queryType)){
                tarEles = document.getElementsByTagName(el);
            }
        }
        this[0] = tarEles;
    };

    _Schoeu.prototype = {
        prePend : function(newNode){
            var parentNode = this[0].parentNode,
                parNode = parentNode.firstChild;
            if(parNode){
                parentNode.insertBefore(newNode,parNode);
            }else{
                parentNode.appendChild(newNode);
            }
        },
        addClass : function(cls){
            var el = this[0];
            var clsName = el.className,
                reg = new RegExp("\\b"+cls+"\\b");
            if(!clsName.match(reg)){
                el.className += " "+cls;
            }
        },
        removeClass : function(cls){
            var el = this[0];
            var clsName = el.className,
                reg = new RegExp("\\b"+cls+"\\b","g");
            el.className = clsName.replace(reg,"");
        },
        children : function(tagName){
            var parentNode = this[0].parentNode,
                children = parentNode.children,arr = [];
            for(var i= 0,lth = children.length;i<lth;i++){
                var c = children[i]
                if(!tagName && c.nodeType == 1){
                    arr.push(c);
                }else if(c.tagName == tagName.toUpperCase()){
                    arr.push(c);
                }
            }
            return arr;
        },
        setCss : function(attr,val){
            var el = this[0];
            if(val){
                try{
                    el.style[attr] = val;
                }catch(e){}
            }
        },
        hasCLass : function(cls){
            var el = this[0];
            if(arguments.length<1){
                throw new Error("arguments error");
            }
            var className = el.className,
                reg = new RegExp("\\b"+cls+"\\b","g");
            if(reg.test(className)){
                return true;
            }
            return false;
        },
        isLast : function(){
            var el = this[0];
            if(!this.nextEle(el)){
                return true;
            }
            return false;
        },
        isFirst : function(){
            var el = this[0];
            if(!this.preEle(el)){
                return true;
            }
            return false;
        },
        closet : function(){
            var el = this[0],
                a = [], p,n;
            p = this.preEle(el);
            n = this.nextEle(el);
            if(p){a.push(p);}
            if(n){a.push(n);}
            return a;
        },
        getIndex : function(){
            var el = this[0],
                pre = this.preSiblings(el);
            if(pre){
                return pre.length;
            }
            return null;
        },
        nextEle : function(){
            var el = this[0];
            if(typeof el.nextElementSibling == "object"){
                return el.nextElementSibling;
            }else{
                var ne = el.nextSibling;
                while(ne){
                    if(ne.nodeType == 1){
                        return ne;
                    }
                    ne = ne.nextSibling;
                }
            }
        },
        preEle : function(){
            var el = this[0];
            if(typeof el.previousElementSibling == "object"){
                return el.previousElementSibling;
            }else{
                var pe = el.previousSibling;
                while(pe){
                    if(pe.nodeType == 1){
                        return pe;
                    }
                    pe = pe.previousSibling;
                }
            }
        },
        nextSiblings : function(){
            var el = this[0];
            if(!el) return [];
            var a = [], nxt = el.nextEle();
            while(nxt){
                a.push(nxt);
                nxt = nxt.nextEle();
            }
            return a;
        },
        preSiblings : function(){
            var el = this[0];
            if(!el) return [];
            var a = [],pre = el.preEle();
            while(pre){
                a.unshift(pre);
                pre = pre.preEle();
            }
            return a;
        },
        getCss : function(attr){
            var el = this[0];
            try{
                return window.getComputedStyle(el,null)[attr];//ie8+ w3c
            }catch(e){
                return el.currentStyle(attr);
            }
        },
        css : function(attr,val){
            var para = arguments.length,el = this[0];
            if(para == 2){
                try{
                    if(val){
                        el.style[attr] = val;
                    }
                }catch(e){
                    console.log(e.message);
                }
            }else if(para == 1){
                if(typeof attr == "object"){
                    for(var a in attr){
                        this.setCss(el,a,attr[a]);
                    }
                }else if(typeof attr == "string"){
                    try{
                        return window.getComputedStyle(el,null)[attr];//ie8+,w3c
                    }catch(e){
                        return el.currentStyle(attr);
                    }
                }
            }
        },
        insertAfter : function(newNode){
            var el = this[0];
            if(el.nextElementSibling){
                el.parentNode.insertBefore(newNode,el.nextElementSibling);
            }else{
                el.parentNode.insertBefore(newNode);
            }
        },
        siblings : function(){
            var el = this[0];
            if(el){
                return this.preSiblings(el).concat(this.nextSiblings(el));
            }
            return [];
        },
        offset:function(){
            var el = this[0],
                l = el.offsetLeft || 0,
                t = el.offsetTop || 0,
                p = el.offsetParent;
            while(p){
                l += p.offsetLeft;
                t += p.offsetTop;
                p = p.offsetParent
            }
            return {left:l,top:t};
        },
        addEvent:function(type,fn){
            var el = this[0];
            if(el.addEventListener){
                el.addEventListener(type,fn,false);
            }else if(el.attachEvent){
                el.attachEvent("on"+type,fn);
            }
        },
        removeEvent:function(type,fn){
            var el = this[0];
            if(el.addEventListener){

            }
        }
    }


    Array.prototype.distinct = function(flag){
        var flag = flag || false,
            arr = this, b = [],obj={};
        if(flag){
            for(var m= 0;m<arr.length-1;m++){
                for(var j=m+1;j<arr.length;){
                    if(arr[m] === arr[j]){
                        arr.splice(j,1);
                    }else{
                        j++;
                    }
                }
            }
            return arr;
        }else{
            for(var i= 0;i<arr.length;){
                if(!obj[arr[i]]){
                    obj[arr[i]] = 1;
                    i++;
                }else{
                    arr.splice(i,1);
                }
            }
            return arr;
        }
    };
    String.prototype.trim = function(flag){
        var reg;
        reg = flag ? /[\s　]+/g : /^\s+|\s+$/g;
        return this.replace(reg,"");
    }


    $.getCookie = function(idx){
        var reg = new RegExp(idx+"=(\\w*)","g");
        return reg.exec(document.cookie)[1];
    };
    $.setCookie = function(idx,val,dur){
        var val = val || "",myCk = document.cookie,
            dur = dur || 86400000; //默认为max-age为一天
        document.cookie = idx + "=" + encodeURI(val) + ";expires=" + new Date(Date.now()+dur).toUTCString() + ";";
    };
    $.getElementsByClassName = function(clsName,context){
        var eleObj,a = [],allEl;
        if(typeof document.getElementsByClassName == "function"){
            if(context){
                return context.getElementsByClassName(clsName);
            }
            return document.getElementsByClassName(clsName);
        }else{
            if(context){
                allEl = context.getElementsByTagName("*");
            }else{
                allEl = document.getElementsByTagName("*");
            }
            for(var i= 0,l=allEl.length;i<l;i++){
                eleObj = allEl[i];
                if(eleObj.className == clsName){
                    a.push(eleObj);
                }
            }
            return a;
        }
    };
    $.getUrlParam = function(s){
        var s = s || "",r = /([^?=&]+)=([^?=&]+)/g,obj={};
        while(a = r.exec(s)){
            obj[a[1]] = a[2];
        }
        return obj;
    };

    $.browser = function(){
        var isIE = isChrome = isFireFox = isOpera = isSafari = false,
            userAgent = window.navigator.userAgent;
        if(userAgent.test(/MSIE/i)){
            isIE = true;
        }else if(userAgent.test(/Chrome/i)){
            isChrome = true;
        }else if(userAgent.test(/FireFox/i)){
            isFireFox = true;
        }else if(userAgent.test(/Opera/i)){
            isOpera = true;
        }else if(userAgent.test(/Safari/i)){
            isSafari = true;
        }
    };
    $.nodelist2Array = function(nl){
        try{
            return Array.prototype.slice.call(nl);
        }catch(e){
            var a = [];
            for(var i=0;l=nl.length;i++){
                a.push(nl[i]);
            }
            return a;
        }
    };
    return $;
    $.ajax = function(){
        var xhr = null;
        try{
            xhr = new XMLHttpRequest();
        }catch(e){
            xhr = new Act
        }
    }
})();

window.schoeu = schoeu;
window.$ === undefined && (window.$ = schoeu);


