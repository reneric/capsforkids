//MooTools, My Object Oriented Javascript Tools. Copyright (c) 2006 Valerio Proietti, <http://mad4milk.net>, MIT Style License.

var MooTools={version:'1.12'};function $defined(obj){return(obj!=undefined);};function $type(obj){if(!$defined(obj))return false;if(obj.htmlElement)return'element';var type=typeof obj;if(type=='object'&&obj.nodeName){switch(obj.nodeType){case 1:return'element';case 3:return(/\S/).test(obj.nodeValue)?'textnode':'whitespace';}}
if(type=='object'||type=='function'){switch(obj.constructor){case Array:return'array';case RegExp:return'regexp';case Class:return'class';}
if(typeof obj.length=='number'){if(obj.item)return'collection';if(obj.callee)return'arguments';}}
return type;};function $merge(){var mix={};for(var i=0;i<arguments.length;i++){for(var property in arguments[i]){var ap=arguments[i][property];var mp=mix[property];if(mp&&$type(ap)=='object'&&$type(mp)=='object')mix[property]=$merge(mp,ap);else mix[property]=ap;}}
return mix;};var $extend=function(){var args=arguments;if(!args[1])args=[this,args[0]];for(var property in args[1])args[0][property]=args[1][property];return args[0];};var $native=function(){for(var i=0,l=arguments.length;i<l;i++){arguments[i].extend=function(props){for(var prop in props){if(!this.prototype[prop])this.prototype[prop]=props[prop];if(!this[prop])this[prop]=$native.generic(prop);}};}};$native.generic=function(prop){return function(bind){return this.prototype[prop].apply(bind,Array.prototype.slice.call(arguments,1));};};$native(Function,Array,String,Number);function $chk(obj){return!!(obj||obj===0);};function $pick(obj,picked){return $defined(obj)?obj:picked;};function $random(min,max){return Math.floor(Math.random()*(max-min+1)+min);};function $time(){return new Date().getTime();};function $clear(timer){clearTimeout(timer);clearInterval(timer);return null;};var Abstract=function(obj){obj=obj||{};obj.extend=$extend;return obj;};var Window=new Abstract(window);var Document=new Abstract(document);document.head=document.getElementsByTagName('head')[0];window.xpath=!!(document.evaluate);if(window.ActiveXObject)window.ie=window[window.XMLHttpRequest?'ie7':'ie6']=true;else if(document.childNodes&&!document.all&&!navigator.taintEnabled)window.webkit=window[window.xpath?'webkit420':'webkit419']=true;else if(document.getBoxObjectFor!=null||window.mozInnerScreenX!=null)window.gecko=true;window.khtml=window.webkit;Object.extend=$extend;if(typeof HTMLElement=='undefined'){var HTMLElement=function(){};if(window.webkit)document.createElement("iframe");HTMLElement.prototype=(window.webkit)?window["[[DOMElement.prototype]]"]:{};}
HTMLElement.prototype.htmlElement=function(){};if(window.ie6)try{document.execCommand("BackgroundImageCache",false,true);}catch(e){};var Class=function(properties){var klass=function(){return(arguments[0]!==null&&this.initialize&&$type(this.initialize)=='function')?this.initialize.apply(this,arguments):this;};$extend(klass,this);klass.prototype=properties;klass.constructor=Class;return klass;};Class.empty=function(){};Class.prototype={extend:function(properties){var proto=new this(null);for(var property in properties){var pp=proto[property];proto[property]=Class.Merge(pp,properties[property]);}
return new Class(proto);},implement:function(){for(var i=0,l=arguments.length;i<l;i++)$extend(this.prototype,arguments[i]);}};Class.Merge=function(previous,current){if(previous&&previous!=current){var type=$type(current);if(type!=$type(previous))return current;switch(type){case'function':var merged=function(){this.parent=arguments.callee.parent;return current.apply(this,arguments);};merged.parent=previous;return merged;case'object':return $merge(previous,current);}}
return current;};var Chain=new Class({chain:function(fn){this.chains=this.chains||[];this.chains.push(fn);return this;},callChain:function(){if(this.chains&&this.chains.length)this.chains.shift().delay(10,this);},clearChain:function(){this.chains=[];}});var Events=new Class({addEvent:function(type,fn){if(fn!=Class.empty){this.$events=this.$events||{};this.$events[type]=this.$events[type]||[];this.$events[type].include(fn);}
return this;},fireEvent:function(type,args,delay){if(this.$events&&this.$events[type]){this.$events[type].each(function(fn){fn.create({'bind':this,'delay':delay,'arguments':args})();},this);}
return this;},removeEvent:function(type,fn){if(this.$events&&this.$events[type])this.$events[type].remove(fn);return this;}});var Options=new Class({setOptions:function(){this.options=$merge.apply(null,[this.options].extend(arguments));if(this.addEvent){for(var option in this.options){if($type(this.options[option]=='function')&&(/^on[A-Z]/).test(option))this.addEvent(option,this.options[option]);}}
return this;}});Array.extend({forEach:function(fn,bind){for(var i=0,j=this.length;i<j;i++)fn.call(bind,this[i],i,this);},filter:function(fn,bind){var results=[];for(var i=0,j=this.length;i<j;i++){if(fn.call(bind,this[i],i,this))results.push(this[i]);}
return results;},map:function(fn,bind){var results=[];for(var i=0,j=this.length;i<j;i++)results[i]=fn.call(bind,this[i],i,this);return results;},every:function(fn,bind){for(var i=0,j=this.length;i<j;i++){if(!fn.call(bind,this[i],i,this))return false;}
return true;},some:function(fn,bind){for(var i=0,j=this.length;i<j;i++){if(fn.call(bind,this[i],i,this))return true;}
return false;},indexOf:function(item,from){var len=this.length;for(var i=(from<0)?Math.max(0,len+from):from||0;i<len;i++){if(this[i]===item)return i;}
return-1;},copy:function(start,length){start=start||0;if(start<0)start=this.length+start;length=length||(this.length-start);var newArray=[];for(var i=0;i<length;i++)newArray[i]=this[start++];return newArray;},remove:function(item){var i=0;var len=this.length;while(i<len){if(this[i]===item){this.splice(i,1);len--;}else{i++;}}
return this;},contains:function(item,from){return this.indexOf(item,from)!=-1;},associate:function(keys){var obj={},length=Math.min(this.length,keys.length);for(var i=0;i<length;i++)obj[keys[i]]=this[i];return obj;},extend:function(array){for(var i=0,j=array.length;i<j;i++)this.push(array[i]);return this;},merge:function(array){for(var i=0,l=array.length;i<l;i++)this.include(array[i]);return this;},include:function(item){if(!this.contains(item))this.push(item);return this;},getRandom:function(){return this[$random(0,this.length-1)]||null;},getLast:function(){return this[this.length-1]||null;}});Array.prototype.each=Array.prototype.forEach;Array.each=Array.forEach;function $A(array){return Array.copy(array);};function $each(iterable,fn,bind){if(iterable&&typeof iterable.length=='number'&&$type(iterable)!='object'){Array.forEach(iterable,fn,bind);}else{for(var name in iterable)fn.call(bind||iterable,iterable[name],name);}};Array.prototype.test=Array.prototype.contains;String.extend({test:function(regex,params){return(($type(regex)=='string')?new RegExp(regex,params):regex).test(this);},toInt:function(){return parseInt(this,10);},toFloat:function(){return parseFloat(this);},camelCase:function(){return this.replace(/-\D/g,function(match){return match.charAt(1).toUpperCase();});},hyphenate:function(){return this.replace(/\w[A-Z]/g,function(match){return(match.charAt(0)+'-'+match.charAt(1).toLowerCase());});},capitalize:function(){return this.replace(/\b[a-z]/g,function(match){return match.toUpperCase();});},trim:function(){return this.replace(/^\s+|\s+$/g,'');},clean:function(){return this.replace(/\s{2,}/g,' ').trim();},rgbToHex:function(array){var rgb=this.match(/\d{1,3}/g);return(rgb)?rgb.rgbToHex(array):false;},hexToRgb:function(array){var hex=this.match(/^#?(\w{1,2})(\w{1,2})(\w{1,2})$/);return(hex)?hex.slice(1).hexToRgb(array):false;},contains:function(string,s){return(s)?(s+this+s).indexOf(s+string+s)>-1:this.indexOf(string)>-1;},escapeRegExp:function(){return this.replace(/([.*+?^${}()|[\]\/\\])/g,'\\$1');}});Array.extend({rgbToHex:function(array){if(this.length<3)return false;if(this.length==4&&this[3]==0&&!array)return'transparent';var hex=[];for(var i=0;i<3;i++){var bit=(this[i]-0).toString(16);hex.push((bit.length==1)?'0'+bit:bit);}
return array?hex:'#'+hex.join('');},hexToRgb:function(array){if(this.length!=3)return false;var rgb=[];for(var i=0;i<3;i++){rgb.push(parseInt((this[i].length==1)?this[i]+this[i]:this[i],16));}
return array?rgb:'rgb('+rgb.join(',')+')';}});Function.extend({create:function(options){var fn=this;options=$merge({'bind':fn,'event':false,'arguments':null,'delay':false,'periodical':false,'attempt':false},options);if($chk(options.arguments)&&$type(options.arguments)!='array')options.arguments=[options.arguments];return function(event){var args;if(options.event){event=event||window.event;args=[(options.event===true)?event:new options.event(event)];if(options.arguments)args.extend(options.arguments);}
else args=options.arguments||arguments;var returns=function(){return fn.apply($pick(options.bind,fn),args);};if(options.delay)return setTimeout(returns,options.delay);if(options.periodical)return setInterval(returns,options.periodical);if(options.attempt)try{return returns();}catch(err){return false;};return returns();};},pass:function(args,bind){return this.create({'arguments':args,'bind':bind});},attempt:function(args,bind){return this.create({'arguments':args,'bind':bind,'attempt':true})();},bind:function(bind,args){return this.create({'bind':bind,'arguments':args});},bindAsEventListener:function(bind,args){return this.create({'bind':bind,'event':true,'arguments':args});},delay:function(delay,bind,args){return this.create({'delay':delay,'bind':bind,'arguments':args})();},periodical:function(interval,bind,args){return this.create({'periodical':interval,'bind':bind,'arguments':args})();}});Number.extend({toInt:function(){return parseInt(this);},toFloat:function(){return parseFloat(this);},limit:function(min,max){return Math.min(max,Math.max(min,this));},round:function(precision){precision=Math.pow(10,precision||0);return Math.round(this*precision)/precision;},times:function(fn){for(var i=0;i<this;i++)fn(i);}});var Element=new Class({initialize:function(el,props){if($type(el)=='string'){if(window.ie&&props&&(props.name||props.type)){var name=(props.name)?' name="'+props.name+'"':'';var type=(props.type)?' type="'+props.type+'"':'';delete props.name;delete props.type;el='<'+el+name+type+'>';}
el=document.createElement(el);}
el=$(el);return(!props||!el)?el:el.set(props);}});var Elements=new Class({initialize:function(elements){return(elements)?$extend(elements,this):this;}});Elements.extend=function(props){for(var prop in props){this.prototype[prop]=props[prop];this[prop]=$native.generic(prop);}};function $(el){if(!el)return null;if(el.htmlElement)return Garbage.collect(el);if([window,document].contains(el))return el;var type=$type(el);if(type=='string'){el=document.getElementById(el);type=(el)?'element':false;}
if(type!='element')return null;if(el.htmlElement)return Garbage.collect(el);if(['object','embed'].contains(el.tagName.toLowerCase()))return el;$extend(el,Element.prototype);el.htmlElement=function(){};return Garbage.collect(el);};document.getElementsBySelector=document.getElementsByTagName;function $$(){var elements=[];for(var i=0,j=arguments.length;i<j;i++){var selector=arguments[i];switch($type(selector)){case'element':elements.push(selector);case'boolean':break;case false:break;case'string':selector=document.getElementsBySelector(selector,true);default:elements.extend(selector);}}
return $$.unique(elements);};$$.unique=function(array){var elements=[];for(var i=0,l=array.length;i<l;i++){if(array[i].$included)continue;var element=$(array[i]);if(element&&!element.$included){element.$included=true;elements.push(element);}}
for(var n=0,d=elements.length;n<d;n++)elements[n].$included=null;return new Elements(elements);};Elements.Multi=function(property){return function(){var args=arguments;var items=[];var elements=true;for(var i=0,j=this.length,returns;i<j;i++){returns=this[i][property].apply(this[i],args);if($type(returns)!='element')elements=false;items.push(returns);};return(elements)?$$.unique(items):items;};};Element.extend=function(properties){for(var property in properties){HTMLElement.prototype[property]=properties[property];Element.prototype[property]=properties[property];Element[property]=$native.generic(property);var elementsProperty=(Array.prototype[property])?property+'Elements':property;Elements.prototype[elementsProperty]=Elements.Multi(property);}};Element.extend({set:function(props){for(var prop in props){var val=props[prop];switch(prop){case'styles':this.setStyles(val);break;case'events':if(this.addEvents)this.addEvents(val);break;case'properties':this.setProperties(val);break;default:this.setProperty(prop,val);}}
return this;},inject:function(el,where){el=$(el);switch(where){case'before':el.parentNode.insertBefore(this,el);break;case'after':var next=el.getNext();if(!next)el.parentNode.appendChild(this);else el.parentNode.insertBefore(this,next);break;case'top':var first=el.firstChild;if(first){el.insertBefore(this,first);break;}
default:el.appendChild(this);}
return this;},injectBefore:function(el){return this.inject(el,'before');},injectAfter:function(el){return this.inject(el,'after');},injectInside:function(el){return this.inject(el,'bottom');},injectTop:function(el){return this.inject(el,'top');},adopt:function(){var elements=[];$each(arguments,function(argument){elements=elements.concat(argument);});$$(elements).inject(this);return this;},remove:function(){return this.parentNode.removeChild(this);},clone:function(contents){var el=$(this.cloneNode(contents!==false));if(!el.$events)return el;el.$events={};for(var type in this.$events)el.$events[type]={'keys':$A(this.$events[type].keys),'values':$A(this.$events[type].values)};return el.removeEvents();},replaceWith:function(el){el=$(el);this.parentNode.replaceChild(el,this);return el;},appendText:function(text){this.appendChild(document.createTextNode(text));return this;},hasClass:function(className){return this.className.contains(className,' ');},addClass:function(className){if(!this.hasClass(className))this.className=(this.className+' '+className).clean();return this;},removeClass:function(className){this.className=this.className.replace(new RegExp('(^|\\s)'+className+'(?:\\s|$)'),'$1').clean();return this;},toggleClass:function(className){return this.hasClass(className)?this.removeClass(className):this.addClass(className);},setStyle:function(property,value){switch(property){case'opacity':return this.setOpacity(parseFloat(value));case'float':property=(window.ie)?'styleFloat':'cssFloat';}
property=property.camelCase();switch($type(value)){case'number':if(!['zIndex','zoom'].contains(property))value+='px';break;case'array':value='rgb('+value.join(',')+')';}
this.style[property]=value;return this;},setStyles:function(source){switch($type(source)){case'object':Element.setMany(this,'setStyle',source);break;case'string':this.style.cssText=source;}
return this;},setOpacity:function(opacity){if(opacity==0){if(this.style.visibility!="hidden")this.style.visibility="hidden";}else{if(this.style.visibility!="visible")this.style.visibility="visible";}
if(!this.currentStyle||!this.currentStyle.hasLayout)this.style.zoom=1;if(window.ie)this.style.filter=(opacity==1)?'':"alpha(opacity="+opacity*100+")";this.style.opacity=this.$tmp.opacity=opacity;return this;},getStyle:function(property){property=property.camelCase();var result=this.style[property];if(!$chk(result)){if(property=='opacity')return this.$tmp.opacity;result=[];for(var style in Element.Styles){if(property==style){Element.Styles[style].each(function(s){var style=this.getStyle(s);result.push(parseInt(style)?style:'0px');},this);if(property=='border'){var every=result.every(function(bit){return(bit==result[0]);});return(every)?result[0]:false;}
return result.join(' ');}}
if(property.contains('border')){if(Element.Styles.border.contains(property)){return['Width','Style','Color'].map(function(p){return this.getStyle(property+p);},this).join(' ');}else if(Element.borderShort.contains(property)){return['Top','Right','Bottom','Left'].map(function(p){return this.getStyle('border'+p+property.replace('border',''));},this).join(' ');}}
if(document.defaultView)result=document.defaultView.getComputedStyle(this,null).getPropertyValue(property.hyphenate());else if(this.currentStyle)result=this.currentStyle[property];}
if(window.ie)result=Element.fixStyle(property,result,this);if(result&&property.test(/color/i)&&result.contains('rgb')){return result.split('rgb').splice(1,4).map(function(color){return color.rgbToHex();}).join(' ');}
return result;},getStyles:function(){return Element.getMany(this,'getStyle',arguments);},walk:function(brother,start){brother+='Sibling';var el=(start)?this[start]:this[brother];while(el&&$type(el)!='element')el=el[brother];return $(el);},getPrevious:function(){return this.walk('previous');},getNext:function(){return this.walk('next');},getFirst:function(){return this.walk('next','firstChild');},getLast:function(){return this.walk('previous','lastChild');},getParent:function(){return $(this.parentNode);},getChildren:function(){return $$(this.childNodes);},hasChild:function(el){return!!$A(this.getElementsByTagName('*')).contains(el);},getProperty:function(property){var index=Element.Properties[property];if(index)return this[index];var flag=Element.PropertiesIFlag[property]||0;if(!window.ie||flag)return this.getAttribute(property,flag);var node=this.attributes[property];return(node)?node.nodeValue:null;},removeProperty:function(property){var index=Element.Properties[property];if(index)this[index]='';else this.removeAttribute(property);return this;},getProperties:function(){return Element.getMany(this,'getProperty',arguments);},setProperty:function(property,value){var index=Element.Properties[property];if(index)this[index]=value;else this.setAttribute(property,value);return this;},setProperties:function(source){return Element.setMany(this,'setProperty',source);},setHTML:function(){this.innerHTML=$A(arguments).join('');return this;},setText:function(text){var tag=this.getTag();if(['style','script'].contains(tag)){if(window.ie){if(tag=='style')this.styleSheet.cssText=text;else if(tag=='script')this.setProperty('text',text);return this;}else{this.removeChild(this.firstChild);return this.appendText(text);}}
this[$defined(this.innerText)?'innerText':'textContent']=text;return this;},getText:function(){var tag=this.getTag();if(['style','script'].contains(tag)){if(window.ie){if(tag=='style')return this.styleSheet.cssText;else if(tag=='script')return this.getProperty('text');}else{return this.innerHTML;}}
return($pick(this.innerText,this.textContent));},getTag:function(){return this.tagName.toLowerCase();},empty:function(){Garbage.trash(this.getElementsByTagName('*'));return this.setHTML('');}});Element.fixStyle=function(property,result,element){if($chk(parseInt(result)))return result;if(['height','width'].contains(property)){var values=(property=='width')?['left','right']:['top','bottom'];var size=0;values.each(function(value){size+=element.getStyle('border-'+value+'-width').toInt()+element.getStyle('padding-'+value).toInt();});return element['offset'+property.capitalize()]-size+'px';}else if(property.test(/border(.+)Width|margin|padding/)){return'0px';}
return result;};Element.Styles={'border':[],'padding':[],'margin':[]};['Top','Right','Bottom','Left'].each(function(direction){for(var style in Element.Styles)Element.Styles[style].push(style+direction);});Element.borderShort=['borderWidth','borderStyle','borderColor'];Element.getMany=function(el,method,keys){var result={};$each(keys,function(key){result[key]=el[method](key);});return result;};Element.setMany=function(el,method,pairs){for(var key in pairs)el[method](key,pairs[key]);return el;};Element.Properties=new Abstract({'class':'className','for':'htmlFor','colspan':'colSpan','rowspan':'rowSpan','accesskey':'accessKey','tabindex':'tabIndex','maxlength':'maxLength','readonly':'readOnly','frameborder':'frameBorder','value':'value','disabled':'disabled','checked':'checked','multiple':'multiple','selected':'selected'});Element.PropertiesIFlag={'href':2,'src':2};Element.Methods={Listeners:{addListener:function(type,fn){if(this.addEventListener)this.addEventListener(type,fn,false);else this.attachEvent('on'+type,fn);return this;},removeListener:function(type,fn){if(this.removeEventListener)this.removeEventListener(type,fn,false);else this.detachEvent('on'+type,fn);return this;}}};window.extend(Element.Methods.Listeners);document.extend(Element.Methods.Listeners);Element.extend(Element.Methods.Listeners);var Garbage={elements:[],collect:function(el){if(!el.$tmp){Garbage.elements.push(el);el.$tmp={'opacity':1};}
return el;},trash:function(elements){for(var i=0,j=elements.length,el;i<j;i++){if(!(el=elements[i])||!el.$tmp)continue;if(el.$events)el.fireEvent('trash').removeEvents();for(var p in el.$tmp)el.$tmp[p]=null;for(var d in Element.prototype)el[d]=null;Garbage.elements[Garbage.elements.indexOf(el)]=null;el.htmlElement=el.$tmp=el=null;}
Garbage.elements.remove(null);},empty:function(){Garbage.collect(window);Garbage.collect(document);Garbage.trash(Garbage.elements);}};window.addListener('beforeunload',function(){window.addListener('unload',Garbage.empty);if(window.ie)window.addListener('unload',CollectGarbage);});var Event=new Class({initialize:function(event){if(event&&event.$extended)return event;this.$extended=true;event=event||window.event;this.event=event;this.type=event.type;this.target=event.target||event.srcElement;if(this.target.nodeType==3)this.target=this.target.parentNode;this.shift=event.shiftKey;this.control=event.ctrlKey;this.alt=event.altKey;this.meta=event.metaKey;if(['DOMMouseScroll','mousewheel'].contains(this.type)){this.wheel=(event.wheelDelta)?event.wheelDelta/120:-(event.detail||0)/3;}else if(this.type.contains('key')){this.code=event.which||event.keyCode;for(var name in Event.keys){if(Event.keys[name]==this.code){this.key=name;break;}}
if(this.type=='keydown'){var fKey=this.code-111;if(fKey>0&&fKey<13)this.key='f'+fKey;}
this.key=this.key||String.fromCharCode(this.code).toLowerCase();}else if(this.type.test(/(click|mouse|menu)/)){this.page={'x':event.pageX||event.clientX+document.documentElement.scrollLeft,'y':event.pageY||event.clientY+document.documentElement.scrollTop};this.client={'x':event.pageX?event.pageX-window.pageXOffset:event.clientX,'y':event.pageY?event.pageY-window.pageYOffset:event.clientY};this.rightClick=(event.which==3)||(event.button==2);switch(this.type){case'mouseover':this.relatedTarget=event.relatedTarget||event.fromElement;break;case'mouseout':this.relatedTarget=event.relatedTarget||event.toElement;}
this.fixRelatedTarget();}
return this;},stop:function(){return this.stopPropagation().preventDefault();},stopPropagation:function(){if(this.event.stopPropagation)this.event.stopPropagation();else this.event.cancelBubble=true;return this;},preventDefault:function(){if(this.event.preventDefault)this.event.preventDefault();else this.event.returnValue=false;return this;}});Event.fix={relatedTarget:function(){if(this.relatedTarget&&this.relatedTarget.nodeType==3)this.relatedTarget=this.relatedTarget.parentNode;},relatedTargetGecko:function(){try{Event.fix.relatedTarget.call(this);}catch(e){this.relatedTarget=this.target;}}};Event.prototype.fixRelatedTarget=(window.gecko)?Event.fix.relatedTargetGecko:Event.fix.relatedTarget;Event.keys=new Abstract({'enter':13,'up':38,'down':40,'left':37,'right':39,'esc':27,'space':32,'backspace':8,'tab':9,'delete':46});Element.Methods.Events={addEvent:function(type,fn){this.$events=this.$events||{};this.$events[type]=this.$events[type]||{'keys':[],'values':[]};if(this.$events[type].keys.contains(fn))return this;this.$events[type].keys.push(fn);var realType=type;var custom=Element.Events[type];if(custom){if(custom.add)custom.add.call(this,fn);if(custom.map)fn=custom.map;if(custom.type)realType=custom.type;}
if(!this.addEventListener)fn=fn.create({'bind':this,'event':true});this.$events[type].values.push(fn);return(Element.NativeEvents.contains(realType))?this.addListener(realType,fn):this;},removeEvent:function(type,fn){if(!this.$events||!this.$events[type])return this;var pos=this.$events[type].keys.indexOf(fn);if(pos==-1)return this;var key=this.$events[type].keys.splice(pos,1)[0];var value=this.$events[type].values.splice(pos,1)[0];var custom=Element.Events[type];if(custom){if(custom.remove)custom.remove.call(this,fn);if(custom.type)type=custom.type;}
return(Element.NativeEvents.contains(type))?this.removeListener(type,value):this;},addEvents:function(source){return Element.setMany(this,'addEvent',source);},removeEvents:function(type){if(!this.$events)return this;if(!type){for(var evType in this.$events)this.removeEvents(evType);this.$events=null;}else if(this.$events[type]){this.$events[type].keys.each(function(fn){this.removeEvent(type,fn);},this);this.$events[type]=null;}
return this;},fireEvent:function(type,args,delay){if(this.$events&&this.$events[type]){this.$events[type].keys.each(function(fn){fn.create({'bind':this,'delay':delay,'arguments':args})();},this);}
return this;},cloneEvents:function(from,type){if(!from.$events)return this;if(!type){for(var evType in from.$events)this.cloneEvents(from,evType);}else if(from.$events[type]){from.$events[type].keys.each(function(fn){this.addEvent(type,fn);},this);}
return this;}};window.extend(Element.Methods.Events);document.extend(Element.Methods.Events);Element.extend(Element.Methods.Events);Element.Events=new Abstract({'mouseenter':{type:'mouseover',map:function(event){event=new Event(event);if(event.relatedTarget!=this&&!this.hasChild(event.relatedTarget))this.fireEvent('mouseenter',event);}},'mouseleave':{type:'mouseout',map:function(event){event=new Event(event);if(event.relatedTarget!=this&&!this.hasChild(event.relatedTarget))this.fireEvent('mouseleave',event);}},'mousewheel':{type:(window.gecko)?'DOMMouseScroll':'mousewheel'}});Element.NativeEvents=['click','dblclick','mouseup','mousedown','mousewheel','DOMMouseScroll','mouseover','mouseout','mousemove','keydown','keypress','keyup','load','unload','beforeunload','resize','move','focus','blur','change','submit','reset','select','error','abort','contextmenu','scroll'];Function.extend({bindWithEvent:function(bind,args){return this.create({'bind':bind,'arguments':args,'event':Event});}});Elements.extend({filterByTag:function(tag){return new Elements(this.filter(function(el){return(Element.getTag(el)==tag);}));},filterByClass:function(className,nocash){var elements=this.filter(function(el){return(el.className&&el.className.contains(className,' '));});return(nocash)?elements:new Elements(elements);},filterById:function(id,nocash){var elements=this.filter(function(el){return(el.id==id);});return(nocash)?elements:new Elements(elements);},filterByAttribute:function(name,operator,value,nocash){var elements=this.filter(function(el){var current=Element.getProperty(el,name);if(!current)return false;if(!operator)return true;switch(operator){case'=':return(current==value);case'*=':return(current.contains(value));case'^=':return(current.substr(0,value.length)==value);case'$=':return(current.substr(current.length-value.length)==value);case'!=':return(current!=value);case'~=':return current.contains(value,' ');}
return false;});return(nocash)?elements:new Elements(elements);}});function $E(selector,filter){return($(filter)||document).getElement(selector);};function $ES(selector,filter){return($(filter)||document).getElementsBySelector(selector);};$$.shared={'regexp':/^(\w*|\*)(?:#([\w-]+)|\.([\w-]+))?(?:\[(\w+)(?:([!*^$]?=)["']?([^"'\]]*)["']?)?])?$/,'xpath':{getParam:function(items,context,param,i){var temp=[context.namespaceURI?'xhtml:':'',param[1]];if(param[2])temp.push('[@id="',param[2],'"]');if(param[3])temp.push('[contains(concat(" ", @class, " "), " ',param[3],' ")]');if(param[4]){if(param[5]&&param[6]){switch(param[5]){case'*=':temp.push('[contains(@',param[4],', "',param[6],'")]');break;case'^=':temp.push('[starts-with(@',param[4],', "',param[6],'")]');break;case'$=':temp.push('[substring(@',param[4],', string-length(@',param[4],') - ',param[6].length,' + 1) = "',param[6],'"]');break;case'=':temp.push('[@',param[4],'="',param[6],'"]');break;case'!=':temp.push('[@',param[4],'!="',param[6],'"]');}}else{temp.push('[@',param[4],']');}}
items.push(temp.join(''));return items;},getItems:function(items,context,nocash){var elements=[];var xpath=document.evaluate('.//'+items.join('//'),context,$$.shared.resolver,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);for(var i=0,j=xpath.snapshotLength;i<j;i++)elements.push(xpath.snapshotItem(i));return(nocash)?elements:new Elements(elements.map($));}},'normal':{getParam:function(items,context,param,i){if(i==0){if(param[2]){var el=context.getElementById(param[2]);if(!el||((param[1]!='*')&&(Element.getTag(el)!=param[1])))return false;items=[el];}else{items=$A(context.getElementsByTagName(param[1]));}}else{items=$$.shared.getElementsByTagName(items,param[1]);if(param[2])items=Elements.filterById(items,param[2],true);}
if(param[3])items=Elements.filterByClass(items,param[3],true);if(param[4])items=Elements.filterByAttribute(items,param[4],param[5],param[6],true);return items;},getItems:function(items,context,nocash){return(nocash)?items:$$.unique(items);}},resolver:function(prefix){return(prefix=='xhtml')?'http://www.w3.org/1999/xhtml':false;},getElementsByTagName:function(context,tagName){var found=[];for(var i=0,j=context.length;i<j;i++)found.extend(context[i].getElementsByTagName(tagName));return found;}};$$.shared.method=(window.xpath)?'xpath':'normal';Element.Methods.Dom={getElements:function(selector,nocash){var items=[];selector=selector.trim().split(' ');for(var i=0,j=selector.length;i<j;i++){var sel=selector[i];var param=sel.match($$.shared.regexp);if(!param)break;param[1]=param[1]||'*';var temp=$$.shared[$$.shared.method].getParam(items,this,param,i);if(!temp)break;items=temp;}
return $$.shared[$$.shared.method].getItems(items,this,nocash);},getElement:function(selector){return $(this.getElements(selector,true)[0]||false);},getElementsBySelector:function(selector,nocash){var elements=[];selector=selector.split(',');for(var i=0,j=selector.length;i<j;i++)elements=elements.concat(this.getElements(selector[i],true));return(nocash)?elements:$$.unique(elements);}};Element.extend({getElementById:function(id){var el=document.getElementById(id);if(!el)return false;for(var parent=el.parentNode;parent!=this;parent=parent.parentNode){if(!parent)return false;}
return el;},getElementsByClassName:function(className){return this.getElements('.'+className);}});document.extend(Element.Methods.Dom);Element.extend(Element.Methods.Dom);Element.extend({getValue:function(){switch(this.getTag()){case'select':var values=[];$each(this.options,function(option){if(option.selected)values.push($pick(option.value,option.text));});return(this.multiple)?values:values[0];case'input':if(!(this.checked&&['checkbox','radio'].contains(this.type))&&!['hidden','text','password'].contains(this.type))break;case'textarea':return this.value;}
return false;},getFormElements:function(){return $$(this.getElementsByTagName('input'),this.getElementsByTagName('select'),this.getElementsByTagName('textarea'));},toQueryString:function(){var queryString=[];this.getFormElements().each(function(el){var name=el.name;var value=el.getValue();if(value===false||!name||el.disabled)return;var qs=function(val){queryString.push(name+'='+encodeURIComponent(val));};if($type(value)=='array')value.each(qs);else qs(value);});return queryString.join('&');}});Element.extend({scrollTo:function(x,y){this.scrollLeft=x;this.scrollTop=y;},getSize:function(){return{'scroll':{'x':this.scrollLeft,'y':this.scrollTop},'size':{'x':this.offsetWidth,'y':this.offsetHeight},'scrollSize':{'x':this.scrollWidth,'y':this.scrollHeight}};},getPosition:function(overflown){overflown=overflown||[];var el=this,left=0,top=0;do{left+=el.offsetLeft||0;top+=el.offsetTop||0;el=el.offsetParent;}while(el);overflown.each(function(element){left-=element.scrollLeft||0;top-=element.scrollTop||0;});return{'x':left,'y':top};},getTop:function(overflown){return this.getPosition(overflown).y;},getLeft:function(overflown){return this.getPosition(overflown).x;},getCoordinates:function(overflown){var position=this.getPosition(overflown);var obj={'width':this.offsetWidth,'height':this.offsetHeight,'left':position.x,'top':position.y};obj.right=obj.left+obj.width;obj.bottom=obj.top+obj.height;return obj;}});Element.Events.domready={add:function(fn){if(window.loaded){fn.call(this);return;}
var domReady=function(){if(window.loaded)return;window.loaded=true;window.timer=$clear(window.timer);this.fireEvent('domready');}.bind(this);if(document.readyState&&window.webkit){window.timer=function(){if(['loaded','complete'].contains(document.readyState))domReady();}.periodical(50);}else if(document.readyState&&window.ie){if(!$('ie_ready')){var src=(window.location.protocol=='https:')?'://0':'javascript:void(0)';document.write('<script id="ie_ready" defer src="'+src+'"><\/script>');$('ie_ready').onreadystatechange=function(){if(this.readyState=='complete')domReady();};}}else{window.addListener("load",domReady);document.addListener("DOMContentLoaded",domReady);}}};window.onDomReady=function(fn){return this.addEvent('domready',fn);};window.extend({getWidth:function(){if(this.webkit419)return this.innerWidth;if(this.opera)return document.body.clientWidth;return document.documentElement.clientWidth;},getHeight:function(){if(this.webkit419)return this.innerHeight;if(this.opera)return document.body.clientHeight;return document.documentElement.clientHeight;},getScrollWidth:function(){if(this.ie)return Math.max(document.documentElement.offsetWidth,document.documentElement.scrollWidth);if(this.webkit)return document.body.scrollWidth;return document.documentElement.scrollWidth;},getScrollHeight:function(){if(this.ie)return Math.max(document.documentElement.offsetHeight,document.documentElement.scrollHeight);if(this.webkit)return document.body.scrollHeight;return document.documentElement.scrollHeight;},getScrollLeft:function(){return this.pageXOffset||document.documentElement.scrollLeft;},getScrollTop:function(){return this.pageYOffset||document.documentElement.scrollTop;},getSize:function(){return{'size':{'x':this.getWidth(),'y':this.getHeight()},'scrollSize':{'x':this.getScrollWidth(),'y':this.getScrollHeight()},'scroll':{'x':this.getScrollLeft(),'y':this.getScrollTop()}};},getPosition:function(){return{'x':0,'y':0};}});var Fx={};Fx.Base=new Class({options:{onStart:Class.empty,onComplete:Class.empty,onCancel:Class.empty,transition:function(p){return-(Math.cos(Math.PI*p)-1)/2;},duration:500,unit:'px',wait:true,fps:50},initialize:function(options){this.element=this.element||null;this.setOptions(options);if(this.options.initialize)this.options.initialize.call(this);},step:function(){var time=$time();if(time<this.time+this.options.duration){this.delta=this.options.transition((time-this.time)/this.options.duration);this.setNow();this.increase();}else{this.stop(true);this.set(this.to);this.fireEvent('onComplete',this.element,10);this.callChain();}},set:function(to){this.now=to;this.increase();return this;},setNow:function(){this.now=this.compute(this.from,this.to);},compute:function(from,to){return(to-from)*this.delta+from;},start:function(from,to){if(!this.options.wait)this.stop();else if(this.timer)return this;this.from=from;this.to=to;this.change=this.to-this.from;this.time=$time();this.timer=this.step.periodical(Math.round(1000/this.options.fps),this);this.fireEvent('onStart',this.element);return this;},stop:function(end){if(!this.timer)return this;this.timer=$clear(this.timer);if(!end)this.fireEvent('onCancel',this.element);return this;},custom:function(from,to){return this.start(from,to);},clearTimer:function(end){return this.stop(end);}});Fx.Base.implement(new Chain,new Events,new Options);Fx.CSS={select:function(property,to){if(property.test(/color/i))return this.Color;var type=$type(to);if((type=='array')||(type=='string'&&to.contains(' ')))return this.Multi;return this.Single;},parse:function(el,property,fromTo){if(!fromTo.push)fromTo=[fromTo];var from=fromTo[0],to=fromTo[1];if(!$chk(to)){to=from;from=el.getStyle(property);}
var css=this.select(property,to);return{'from':css.parse(from),'to':css.parse(to),'css':css};}};Fx.CSS.Single={parse:function(value){return parseFloat(value);},getNow:function(from,to,fx){return fx.compute(from,to);},getValue:function(value,unit,property){if(unit=='px'&&property!='opacity')value=Math.round(value);return value+unit;}};Fx.CSS.Multi={parse:function(value){return value.push?value:value.split(' ').map(function(v){return parseFloat(v);});},getNow:function(from,to,fx){var now=[];for(var i=0;i<from.length;i++)now[i]=fx.compute(from[i],to[i]);return now;},getValue:function(value,unit,property){if(unit=='px'&&property!='opacity')value=value.map(Math.round);return value.join(unit+' ')+unit;}};Fx.CSS.Color={parse:function(value){return value.push?value:value.hexToRgb(true);},getNow:function(from,to,fx){var now=[];for(var i=0;i<from.length;i++)now[i]=Math.round(fx.compute(from[i],to[i]));return now;},getValue:function(value){return'rgb('+value.join(',')+')';}};Fx.Style=Fx.Base.extend({initialize:function(el,property,options){this.element=$(el);this.property=property;this.parent(options);},hide:function(){return this.set(0);},setNow:function(){this.now=this.css.getNow(this.from,this.to,this);},set:function(to){this.css=Fx.CSS.select(this.property,to);return this.parent(this.css.parse(to));},start:function(from,to){if(this.timer&&this.options.wait)return this;var parsed=Fx.CSS.parse(this.element,this.property,[from,to]);this.css=parsed.css;return this.parent(parsed.from,parsed.to);},increase:function(){this.element.setStyle(this.property,this.css.getValue(this.now,this.options.unit,this.property));}});Element.extend({effect:function(property,options){return new Fx.Style(this,property,options);}});Fx.Styles=Fx.Base.extend({initialize:function(el,options){this.element=$(el);this.parent(options);},setNow:function(){for(var p in this.from)this.now[p]=this.css[p].getNow(this.from[p],this.to[p],this);},set:function(to){var parsed={};this.css={};for(var p in to){this.css[p]=Fx.CSS.select(p,to[p]);parsed[p]=this.css[p].parse(to[p]);}
return this.parent(parsed);},start:function(obj){if(this.timer&&this.options.wait)return this;this.now={};this.css={};var from={},to={};for(var p in obj){var parsed=Fx.CSS.parse(this.element,p,obj[p]);from[p]=parsed.from;to[p]=parsed.to;this.css[p]=parsed.css;}
return this.parent(from,to);},increase:function(){for(var p in this.now)this.element.setStyle(p,this.css[p].getValue(this.now[p],this.options.unit,p));}});Element.extend({effects:function(options){return new Fx.Styles(this,options);}});Fx.Elements=Fx.Base.extend({initialize:function(elements,options){this.elements=$$(elements);this.parent(options);},setNow:function(){for(var i in this.from){var iFrom=this.from[i],iTo=this.to[i],iCss=this.css[i],iNow=this.now[i]={};for(var p in iFrom)iNow[p]=iCss[p].getNow(iFrom[p],iTo[p],this);}},set:function(to){var parsed={};this.css={};for(var i in to){var iTo=to[i],iCss=this.css[i]={},iParsed=parsed[i]={};for(var p in iTo){iCss[p]=Fx.CSS.select(p,iTo[p]);iParsed[p]=iCss[p].parse(iTo[p]);}}
return this.parent(parsed);},start:function(obj){if(this.timer&&this.options.wait)return this;this.now={};this.css={};var from={},to={};for(var i in obj){var iProps=obj[i],iFrom=from[i]={},iTo=to[i]={},iCss=this.css[i]={};for(var p in iProps){var parsed=Fx.CSS.parse(this.elements[i],p,iProps[p]);iFrom[p]=parsed.from;iTo[p]=parsed.to;iCss[p]=parsed.css;}}
return this.parent(from,to);},increase:function(){for(var i in this.now){var iNow=this.now[i],iCss=this.css[i];for(var p in iNow)this.elements[i].setStyle(p,iCss[p].getValue(iNow[p],this.options.unit,p));}}});Fx.Scroll=Fx.Base.extend({options:{overflown:[],offset:{'x':0,'y':0},wheelStops:true},initialize:function(element,options){this.now=[];this.element=$(element);this.bound={'stop':this.stop.bind(this,false)};this.parent(options);if(this.options.wheelStops){this.addEvent('onStart',function(){document.addEvent('mousewheel',this.bound.stop);}.bind(this));this.addEvent('onComplete',function(){document.removeEvent('mousewheel',this.bound.stop);}.bind(this));}},setNow:function(){for(var i=0;i<2;i++)this.now[i]=this.compute(this.from[i],this.to[i]);},scrollTo:function(x,y){if(this.timer&&this.options.wait)return this;var el=this.element.getSize();var values={'x':x,'y':y};for(var z in el.size){var max=el.scrollSize[z]-el.size[z];if($chk(values[z]))values[z]=($type(values[z])=='number')?values[z].limit(0,max):max;else values[z]=el.scroll[z];values[z]+=this.options.offset[z];}
return this.start([el.scroll.x,el.scroll.y],[values.x,values.y]);},toTop:function(){return this.scrollTo(false,0);},toBottom:function(){return this.scrollTo(false,'full');},toLeft:function(){return this.scrollTo(0,false);},toRight:function(){return this.scrollTo('full',false);},toElement:function(el){var parent=this.element.getPosition(this.options.overflown);var target=$(el).getPosition(this.options.overflown);return this.scrollTo(target.x-parent.x,target.y-parent.y);},increase:function(){this.element.scrollTo(this.now[0],this.now[1]);}});Fx.Slide=Fx.Base.extend({options:{mode:'vertical'},initialize:function(el,options){this.element=$(el);this.wrapper=new Element('div',{'styles':$extend(this.element.getStyles('margin'),{'overflow':'hidden'})}).injectAfter(this.element).adopt(this.element);this.element.setStyle('margin',0);this.setOptions(options);this.now=[];this.parent(this.options);this.open=true;this.addEvent('onComplete',function(){this.open=(this.now[0]===0);});if(window.webkit419)this.addEvent('onComplete',function(){if(this.open)this.element.remove().inject(this.wrapper);});},setNow:function(){for(var i=0;i<2;i++)this.now[i]=this.compute(this.from[i],this.to[i]);},vertical:function(){this.margin='margin-top';this.layout='height';this.offset=this.element.offsetHeight;},horizontal:function(){this.margin='margin-left';this.layout='width';this.offset=this.element.offsetWidth;},slideIn:function(mode){this[mode||this.options.mode]();return this.start([this.element.getStyle(this.margin).toInt(),this.wrapper.getStyle(this.layout).toInt()],[0,this.offset]);},slideOut:function(mode){this[mode||this.options.mode]();return this.start([this.element.getStyle(this.margin).toInt(),this.wrapper.getStyle(this.layout).toInt()],[-this.offset,0]);},hide:function(mode){this[mode||this.options.mode]();this.open=false;return this.set([-this.offset,0]);},show:function(mode){this[mode||this.options.mode]();this.open=true;return this.set([0,this.offset]);},toggle:function(mode){if(this.wrapper.offsetHeight==0||this.wrapper.offsetWidth==0)return this.slideIn(mode);return this.slideOut(mode);},increase:function(){this.element.setStyle(this.margin,this.now[0]+this.options.unit);this.wrapper.setStyle(this.layout,this.now[1]+this.options.unit);}});Fx.Transition=function(transition,params){params=params||[];if($type(params)!='array')params=[params];return $extend(transition,{easeIn:function(pos){return transition(pos,params);},easeOut:function(pos){return 1-transition(1-pos,params);},easeInOut:function(pos){return(pos<=0.5)?transition(2*pos,params)/2:(2-transition(2*(1-pos),params))/2;}});};Fx.Transitions=new Abstract({linear:function(p){return p;}});Fx.Transitions.extend=function(transitions){for(var transition in transitions){Fx.Transitions[transition]=new Fx.Transition(transitions[transition]);Fx.Transitions.compat(transition);}};Fx.Transitions.compat=function(transition){['In','Out','InOut'].each(function(easeType){Fx.Transitions[transition.toLowerCase()+easeType]=Fx.Transitions[transition]['ease'+easeType];});};Fx.Transitions.extend({Pow:function(p,x){return Math.pow(p,x[0]||6);},Expo:function(p){return Math.pow(2,8*(p-1));},Circ:function(p){return 1-Math.sin(Math.acos(p));},Sine:function(p){return 1-Math.sin((1-p)*Math.PI/2);},Back:function(p,x){x=x[0]||1.618;return Math.pow(p,2)*((x+1)*p-x);},Bounce:function(p){var value;for(var a=0,b=1;1;a+=b,b/=2){if(p>=(7-4*a)/11){value=-Math.pow((11-6*a-11*p)/4,2)+b*b;break;}}
return value;},Elastic:function(p,x){return Math.pow(2,10*--p)*Math.cos(20*p*Math.PI*(x[0]||1)/3);}});['Quad','Cubic','Quart','Quint'].each(function(transition,i){Fx.Transitions[transition]=new Fx.Transition(function(p){return Math.pow(p,[i+2]);});Fx.Transitions.compat(transition);});var Drag={};Drag.Base=new Class({options:{handle:false,unit:'px',onStart:Class.empty,onBeforeStart:Class.empty,onComplete:Class.empty,onSnap:Class.empty,onDrag:Class.empty,limit:false,modifiers:{x:'left',y:'top'},grid:false,snap:6},initialize:function(el,options){this.setOptions(options);this.element=$(el);this.handle=$(this.options.handle)||this.element;this.mouse={'now':{},'pos':{}};this.value={'start':{},'now':{}};this.bound={'start':this.start.bindWithEvent(this),'check':this.check.bindWithEvent(this),'drag':this.drag.bindWithEvent(this),'stop':this.stop.bind(this)};this.attach();if(this.options.initialize)this.options.initialize.call(this);},attach:function(){this.handle.addEvent('mousedown',this.bound.start);return this;},detach:function(){this.handle.removeEvent('mousedown',this.bound.start);return this;},start:function(event){this.fireEvent('onBeforeStart',this.element);this.mouse.start=event.page;var limit=this.options.limit;this.limit={'x':[],'y':[]};for(var z in this.options.modifiers){if(!this.options.modifiers[z])continue;this.value.now[z]=this.element.getStyle(this.options.modifiers[z]).toInt();this.mouse.pos[z]=event.page[z]-this.value.now[z];if(limit&&limit[z]){for(var i=0;i<2;i++){if($chk(limit[z][i]))this.limit[z][i]=($type(limit[z][i])=='function')?limit[z][i]():limit[z][i];}}}
if($type(this.options.grid)=='number')this.options.grid={'x':this.options.grid,'y':this.options.grid};document.addListener('mousemove',this.bound.check);document.addListener('mouseup',this.bound.stop);this.fireEvent('onStart',this.element);event.stop();},check:function(event){var distance=Math.round(Math.sqrt(Math.pow(event.page.x-this.mouse.start.x,2)+Math.pow(event.page.y-this.mouse.start.y,2)));if(distance>this.options.snap){document.removeListener('mousemove',this.bound.check);document.addListener('mousemove',this.bound.drag);this.drag(event);this.fireEvent('onSnap',this.element);}
event.stop();},drag:function(event){this.out=false;this.mouse.now=event.page;for(var z in this.options.modifiers){if(!this.options.modifiers[z])continue;this.value.now[z]=this.mouse.now[z]-this.mouse.pos[z];if(this.limit[z]){if($chk(this.limit[z][1])&&(this.value.now[z]>this.limit[z][1])){this.value.now[z]=this.limit[z][1];this.out=true;}else if($chk(this.limit[z][0])&&(this.value.now[z]<this.limit[z][0])){this.value.now[z]=this.limit[z][0];this.out=true;}}
if(this.options.grid[z])this.value.now[z]-=(this.value.now[z]%this.options.grid[z]);this.element.setStyle(this.options.modifiers[z],this.value.now[z]+this.options.unit);}
this.fireEvent('onDrag',this.element);event.stop();},stop:function(){document.removeListener('mousemove',this.bound.check);document.removeListener('mousemove',this.bound.drag);document.removeListener('mouseup',this.bound.stop);this.fireEvent('onComplete',this.element);}});Drag.Base.implement(new Events,new Options);Element.extend({makeResizable:function(options){return new Drag.Base(this,$merge({modifiers:{x:'width',y:'height'}},options));}});Drag.Move=Drag.Base.extend({options:{droppables:[],container:false,overflown:[]},initialize:function(el,options){this.setOptions(options);this.element=$(el);this.droppables=$$(this.options.droppables);this.container=$(this.options.container);this.position={'element':this.element.getStyle('position'),'container':false};if(this.container)this.position.container=this.container.getStyle('position');if(!['relative','absolute','fixed'].contains(this.position.element))this.position.element='absolute';var top=this.element.getStyle('top').toInt();var left=this.element.getStyle('left').toInt();if(this.position.element=='absolute'&&!['relative','absolute','fixed'].contains(this.position.container)){top=$chk(top)?top:this.element.getTop(this.options.overflown);left=$chk(left)?left:this.element.getLeft(this.options.overflown);}else{top=$chk(top)?top:0;left=$chk(left)?left:0;}
this.element.setStyles({'top':top,'left':left,'position':this.position.element});this.parent(this.element);},start:function(event){this.overed=null;if(this.container){var cont=this.container.getCoordinates();var el=this.element.getCoordinates();if(this.position.element=='absolute'&&!['relative','absolute','fixed'].contains(this.position.container)){this.options.limit={'x':[cont.left,cont.right-el.width],'y':[cont.top,cont.bottom-el.height]};}else{this.options.limit={'y':[0,cont.height-el.height],'x':[0,cont.width-el.width]};}}
this.parent(event);},drag:function(event){this.parent(event);var overed=this.out?false:this.droppables.filter(this.checkAgainst,this).getLast();if(this.overed!=overed){if(this.overed)this.overed.fireEvent('leave',[this.element,this]);this.overed=overed?overed.fireEvent('over',[this.element,this]):null;}
return this;},checkAgainst:function(el){el=el.getCoordinates(this.options.overflown);var now=this.mouse.now;return(now.x>el.left&&now.x<el.right&&now.y<el.bottom&&now.y>el.top);},stop:function(){if(this.overed&&!this.out)this.overed.fireEvent('drop',[this.element,this]);else this.element.fireEvent('emptydrop',this);this.parent();return this;}});Element.extend({makeDraggable:function(options){return new Drag.Move(this,options);}});var XHR=new Class({options:{method:'post',async:true,onRequest:Class.empty,onSuccess:Class.empty,onFailure:Class.empty,urlEncoded:true,encoding:'utf-8',autoCancel:false,headers:{}},setTransport:function(){this.transport=(window.XMLHttpRequest)?new XMLHttpRequest():(window.ie?new ActiveXObject('Microsoft.XMLHTTP'):false);return this;},initialize:function(options){this.setTransport().setOptions(options);this.options.isSuccess=this.options.isSuccess||this.isSuccess;this.headers={};if(this.options.urlEncoded&&this.options.method=='post'){var encoding=(this.options.encoding)?'; charset='+this.options.encoding:'';this.setHeader('Content-type','application/x-www-form-urlencoded'+encoding);}
if(this.options.initialize)this.options.initialize.call(this);},onStateChange:function(){if(this.transport.readyState!=4||!this.running)return;this.running=false;var status=0;try{status=this.transport.status;}catch(e){};if(this.options.isSuccess.call(this,status))this.onSuccess();else this.onFailure();this.transport.onreadystatechange=Class.empty;},isSuccess:function(status){return((status>=200)&&(status<300));},onSuccess:function(){this.response={'text':this.transport.responseText,'xml':this.transport.responseXML};this.fireEvent('onSuccess',[this.response.text,this.response.xml]);this.callChain();},onFailure:function(){this.fireEvent('onFailure',this.transport);},setHeader:function(name,value){this.headers[name]=value;return this;},send:function(url,data){if(this.options.autoCancel)this.cancel();else if(this.running)return this;this.running=true;if(data&&this.options.method=='get'){url=url+(url.contains('?')?'&':'?')+data;data=null;}
this.transport.open(this.options.method.toUpperCase(),url,this.options.async);this.transport.onreadystatechange=this.onStateChange.bind(this);if((this.options.method=='post')&&this.transport.overrideMimeType)this.setHeader('Connection','close');$extend(this.headers,this.options.headers);for(var type in this.headers)try{this.transport.setRequestHeader(type,this.headers[type]);}catch(e){};this.fireEvent('onRequest');this.transport.send($pick(data,null));return this;},cancel:function(){if(!this.running)return this;this.running=false;this.transport.abort();this.transport.onreadystatechange=Class.empty;this.setTransport();this.fireEvent('onCancel');return this;}});XHR.implement(new Chain,new Events,new Options);var Ajax=XHR.extend({options:{data:null,update:null,onComplete:Class.empty,evalScripts:false,evalResponse:false},initialize:function(url,options){this.addEvent('onSuccess',this.onComplete);this.setOptions(options);this.options.data=this.options.data||this.options.postBody;if(!['post','get'].contains(this.options.method)){this._method='_method='+this.options.method;this.options.method='post';}
this.parent();this.setHeader('X-Requested-With','XMLHttpRequest');this.setHeader('Accept','text/javascript, text/html, application/xml, text/xml, */*');this.url=url;},onComplete:function(){if(this.options.update)$(this.options.update).empty().setHTML(this.response.text);if(this.options.evalScripts||this.options.evalResponse)this.evalScripts();this.fireEvent('onComplete',[this.response.text,this.response.xml],20);},request:function(data){data=data||this.options.data;switch($type(data)){case'element':data=$(data).toQueryString();break;case'object':data=Object.toQueryString(data);}
if(this._method)data=(data)?[this._method,data].join('&'):this._method;return this.send(this.url,data);},evalScripts:function(){var script,scripts;if(this.options.evalResponse||(/(ecma|java)script/).test(this.getHeader('Content-type')))scripts=this.response.text;else{scripts=[];var regexp=/<script[^>]*>([\s\S]*?)<\/script>/gi;while((script=regexp.exec(this.response.text)))scripts.push(script[1]);scripts=scripts.join('\n');}
if(scripts)(window.execScript)?window.execScript(scripts):window.setTimeout(scripts,0);},getHeader:function(name){try{return this.transport.getResponseHeader(name);}catch(e){};return null;}});Object.toQueryString=function(source){var queryString=[];for(var property in source)queryString.push(encodeURIComponent(property)+'='+encodeURIComponent(source[property]));return queryString.join('&');};Element.extend({send:function(options){return new Ajax(this.getProperty('action'),$merge({data:this.toQueryString()},options,{method:'post'})).request();}});var Cookie=new Abstract({options:{domain:false,path:false,duration:false,secure:false},set:function(key,value,options){options=$merge(this.options,options);value=encodeURIComponent(value);if(options.domain)value+='; domain='+options.domain;if(options.path)value+='; path='+options.path;if(options.duration){var date=new Date();date.setTime(date.getTime()+options.duration*24*60*60*1000);value+='; expires='+date.toGMTString();}
if(options.secure)value+='; secure';document.cookie=key+'='+value;return $extend(options,{'key':key,'value':value});},get:function(key){var value=document.cookie.match('(?:^|;)\\s*'+key.escapeRegExp()+'=([^;]*)');return value?decodeURIComponent(value[1]):false;},remove:function(cookie,options){if($type(cookie)=='object')this.set(cookie.key,'',$merge(cookie,{duration:-1}));else this.set(cookie,'',$merge(options,{duration:-1}));}});var Json={toString:function(obj){switch($type(obj)){case'string':return'"'+obj.replace(/(["\\])/g,'\\$1')+'"';case'array':return'['+obj.map(Json.toString).join(',')+']';case'object':var string=[];for(var property in obj)string.push(Json.toString(property)+':'+Json.toString(obj[property]));return'{'+string.join(',')+'}';case'number':if(isFinite(obj))break;case false:return'null';}
return String(obj);},evaluate:function(str,secure){return(($type(str)!='string')||(secure&&!str.test(/^("(\\.|[^"\\\n\r])*?"|[,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t])+?$/)))?null:eval('('+str+')');}};Json.Remote=XHR.extend({initialize:function(url,options){this.url=url;this.addEvent('onSuccess',this.onComplete);this.parent(options);this.setHeader('X-Request','JSON');},send:function(obj){return this.parent(this.url,'json='+Json.toString(obj));},onComplete:function(){this.fireEvent('onComplete',[Json.evaluate(this.response.text,this.options.secure)]);}});var Asset=new Abstract({javascript:function(source,properties){properties=$merge({'onload':Class.empty},properties);var script=new Element('script',{'src':source}).addEvents({'load':properties.onload,'readystatechange':function(){if(this.readyState=='complete')this.fireEvent('load');}});delete properties.onload;return script.setProperties(properties).inject(document.head);},css:function(source,properties){return new Element('link',$merge({'rel':'stylesheet','media':'screen','type':'text/css','href':source},properties)).inject(document.head);},image:function(source,properties){properties=$merge({'onload':Class.empty,'onabort':Class.empty,'onerror':Class.empty},properties);var image=new Image();image.src=source;var element=new Element('img',{'src':source});['load','abort','error'].each(function(type){var event=properties['on'+type];delete properties['on'+type];element.addEvent(type,function(){this.removeEvent(type,arguments.callee);event.call(this);});});if(image.width&&image.height)element.fireEvent('load',element,1);return element.setProperties(properties);},images:function(sources,options){options=$merge({onComplete:Class.empty,onProgress:Class.empty},options);if(!sources.push)sources=[sources];var images=[];var counter=0;sources.each(function(source){var img=new Asset.image(source,{'onload':function(){options.onProgress.call(this,counter);counter++;if(counter==sources.length)options.onComplete();}});images.push(img);});return new Elements(images);}});var Hash=new Class({length:0,initialize:function(object){this.obj=object||{};this.setLength();},get:function(key){return(this.hasKey(key))?this.obj[key]:null;},hasKey:function(key){return(key in this.obj);},set:function(key,value){if(!this.hasKey(key))this.length++;this.obj[key]=value;return this;},setLength:function(){this.length=0;for(var p in this.obj)this.length++;return this;},remove:function(key){if(this.hasKey(key)){delete this.obj[key];this.length--;}
return this;},each:function(fn,bind){$each(this.obj,fn,bind);},extend:function(obj){$extend(this.obj,obj);return this.setLength();},merge:function(){this.obj=$merge.apply(null,[this.obj].extend(arguments));return this.setLength();},empty:function(){this.obj={};this.length=0;return this;},keys:function(){var keys=[];for(var property in this.obj)keys.push(property);return keys;},values:function(){var values=[];for(var property in this.obj)values.push(this.obj[property]);return values;}});function $H(obj){return new Hash(obj);};Hash.Cookie=Hash.extend({initialize:function(name,options){this.name=name;this.options=$extend({'autoSave':true},options||{});this.load();},save:function(){if(this.length==0){Cookie.remove(this.name,this.options);return true;}
var str=Json.toString(this.obj);if(str.length>4096)return false;Cookie.set(this.name,str,this.options);return true;},load:function(){this.obj=Json.evaluate(Cookie.get(this.name),true)||{};this.setLength();}});Hash.Cookie.Methods={};['extend','set','merge','empty','remove'].each(function(method){Hash.Cookie.Methods[method]=function(){Hash.prototype[method].apply(this,arguments);if(this.options.autoSave)this.save();return this;};});Hash.Cookie.implement(Hash.Cookie.Methods);var Color=new Class({initialize:function(color,type){type=type||(color.push?'rgb':'hex');var rgb,hsb;switch(type){case'rgb':rgb=color;hsb=rgb.rgbToHsb();break;case'hsb':rgb=color.hsbToRgb();hsb=color;break;default:rgb=color.hexToRgb(true);hsb=rgb.rgbToHsb();}
rgb.hsb=hsb;rgb.hex=rgb.rgbToHex();return $extend(rgb,Color.prototype);},mix:function(){var colors=$A(arguments);var alpha=($type(colors[colors.length-1])=='number')?colors.pop():50;var rgb=this.copy();colors.each(function(color){color=new Color(color);for(var i=0;i<3;i++)rgb[i]=Math.round((rgb[i]/100*(100-alpha))+(color[i]/100*alpha));});return new Color(rgb,'rgb');},invert:function(){return new Color(this.map(function(value){return 255-value;}));},setHue:function(value){return new Color([value,this.hsb[1],this.hsb[2]],'hsb');},setSaturation:function(percent){return new Color([this.hsb[0],percent,this.hsb[2]],'hsb');},setBrightness:function(percent){return new Color([this.hsb[0],this.hsb[1],percent],'hsb');}});function $RGB(r,g,b){return new Color([r,g,b],'rgb');};function $HSB(h,s,b){return new Color([h,s,b],'hsb');};Array.extend({rgbToHsb:function(){var red=this[0],green=this[1],blue=this[2];var hue,saturation,brightness;var max=Math.max(red,green,blue),min=Math.min(red,green,blue);var delta=max-min;brightness=max/255;saturation=(max!=0)?delta/max:0;if(saturation==0){hue=0;}else{var rr=(max-red)/delta;var gr=(max-green)/delta;var br=(max-blue)/delta;if(red==max)hue=br-gr;else if(green==max)hue=2+rr-br;else hue=4+gr-rr;hue/=6;if(hue<0)hue++;}
return[Math.round(hue*360),Math.round(saturation*100),Math.round(brightness*100)];},hsbToRgb:function(){var br=Math.round(this[2]/100*255);if(this[1]==0){return[br,br,br];}else{var hue=this[0]%360;var f=hue%60;var p=Math.round((this[2]*(100-this[1]))/10000*255);var q=Math.round((this[2]*(6000-this[1]*f))/600000*255);var t=Math.round((this[2]*(6000-this[1]*(60-f)))/600000*255);switch(Math.floor(hue/60)){case 0:return[br,t,p];case 1:return[q,br,p];case 2:return[p,br,t];case 3:return[p,q,br];case 4:return[t,p,br];case 5:return[br,p,q];}}
return false;}});var Scroller=new Class({options:{area:20,velocity:1,onChange:function(x,y){this.element.scrollTo(x,y);}},initialize:function(element,options){this.setOptions(options);this.element=$(element);this.mousemover=([window,document].contains(element))?$(document.body):this.element;},start:function(){this.coord=this.getCoords.bindWithEvent(this);this.mousemover.addListener('mousemove',this.coord);},stop:function(){this.mousemover.removeListener('mousemove',this.coord);this.timer=$clear(this.timer);},getCoords:function(event){this.page=(this.element==window)?event.client:event.page;if(!this.timer)this.timer=this.scroll.periodical(50,this);},scroll:function(){var el=this.element.getSize();var pos=this.element.getPosition();var change={'x':0,'y':0};for(var z in this.page){if(this.page[z]<(this.options.area+pos[z])&&el.scroll[z]!=0)
change[z]=(this.page[z]-this.options.area-pos[z])*this.options.velocity;else if(this.page[z]+this.options.area>(el.size[z]+pos[z])&&el.scroll[z]+el.size[z]!=el.scrollSize[z])
change[z]=(this.page[z]-el.size[z]+this.options.area-pos[z])*this.options.velocity;}
if(change.y||change.x)this.fireEvent('onChange',[el.scroll.x+change.x,el.scroll.y+change.y]);}});Scroller.implement(new Events,new Options);var Slider=new Class({options:{onChange:Class.empty,onComplete:Class.empty,onTick:function(pos){this.knob.setStyle(this.p,pos);},mode:'horizontal',steps:100,offset:0},initialize:function(el,knob,options){this.element=$(el);this.knob=$(knob);this.setOptions(options);this.previousChange=-1;this.previousEnd=-1;this.step=-1;this.element.addEvent('mousedown',this.clickedElement.bindWithEvent(this));var mod,offset;switch(this.options.mode){case'horizontal':this.z='x';this.p='left';mod={'x':'left','y':false};offset='offsetWidth';break;case'vertical':this.z='y';this.p='top';mod={'x':false,'y':'top'};offset='offsetHeight';}
this.max=this.element[offset]-this.knob[offset]+(this.options.offset*2);this.half=this.knob[offset]/2;this.getPos=this.element['get'+this.p.capitalize()].bind(this.element);this.knob.setStyle('position','relative').setStyle(this.p,-this.options.offset);var lim={};lim[this.z]=[-this.options.offset,this.max-this.options.offset];this.drag=new Drag.Base(this.knob,{limit:lim,modifiers:mod,snap:0,onStart:function(){this.draggedKnob();}.bind(this),onDrag:function(){this.draggedKnob();}.bind(this),onComplete:function(){this.draggedKnob();this.end();}.bind(this)});if(this.options.initialize)this.options.initialize.call(this);},set:function(step){this.step=step.limit(0,this.options.steps);this.checkStep();this.end();this.fireEvent('onTick',this.toPosition(this.step));return this;},clickedElement:function(event){var position=event.page[this.z]-this.getPos()-this.half;position=position.limit(-this.options.offset,this.max-this.options.offset);this.step=this.toStep(position);this.checkStep();this.end();this.fireEvent('onTick',position);},draggedKnob:function(){this.step=this.toStep(this.drag.value.now[this.z]);this.checkStep();},checkStep:function(){if(this.previousChange!=this.step){this.previousChange=this.step;this.fireEvent('onChange',this.step);}},end:function(){if(this.previousEnd!==this.step){this.previousEnd=this.step;this.fireEvent('onComplete',this.step+'');}},toStep:function(position){return Math.round((position+this.options.offset)/this.max*this.options.steps);},toPosition:function(step){return this.max*step/this.options.steps;}});Slider.implement(new Events);Slider.implement(new Options);var SmoothScroll=Fx.Scroll.extend({initialize:function(options){this.parent(window,options);this.links=(this.options.links)?$$(this.options.links):$$(document.links);var location=window.location.href.match(/^[^#]*/)[0]+'#';this.links.each(function(link){if(link.href.indexOf(location)!=0)return;var anchor=link.href.substr(location.length);if(anchor&&$(anchor))this.useLink(link,anchor);},this);if(!window.webkit419)this.addEvent('onComplete',function(){window.location.hash=this.anchor;});},useLink:function(link,anchor){link.addEvent('click',function(event){this.anchor=anchor;this.toElement(anchor);event.stop();}.bindWithEvent(this));}});var Sortables=new Class({options:{handles:false,onStart:Class.empty,onComplete:Class.empty,ghost:true,snap:3,onDragStart:function(element,ghost){ghost.setStyle('opacity',0.7);element.setStyle('opacity',0.7);},onDragComplete:function(element,ghost){element.setStyle('opacity',1);ghost.remove();this.trash.remove();}},initialize:function(list,options){this.setOptions(options);this.list=$(list);this.elements=this.list.getChildren();this.handles=(this.options.handles)?$$(this.options.handles):this.elements;this.bound={'start':[],'moveGhost':this.moveGhost.bindWithEvent(this)};for(var i=0,l=this.handles.length;i<l;i++){this.bound.start[i]=this.start.bindWithEvent(this,this.elements[i]);}
this.attach();if(this.options.initialize)this.options.initialize.call(this);this.bound.move=this.move.bindWithEvent(this);this.bound.end=this.end.bind(this);},attach:function(){this.handles.each(function(handle,i){handle.addEvent('mousedown',this.bound.start[i]);},this);},detach:function(){this.handles.each(function(handle,i){handle.removeEvent('mousedown',this.bound.start[i]);},this);},start:function(event,el){this.active=el;this.coordinates=this.list.getCoordinates();if(this.options.ghost){var position=el.getPosition();this.offset=event.page.y-position.y;this.trash=new Element('div').inject(document.body);this.ghost=el.clone().inject(this.trash).setStyles({'position':'absolute','left':position.x,'top':event.page.y-this.offset});document.addListener('mousemove',this.bound.moveGhost);this.fireEvent('onDragStart',[el,this.ghost]);}
document.addListener('mousemove',this.bound.move);document.addListener('mouseup',this.bound.end);this.fireEvent('onStart',el);event.stop();},moveGhost:function(event){var value=event.page.y-this.offset;value=value.limit(this.coordinates.top,this.coordinates.bottom-this.ghost.offsetHeight);this.ghost.setStyle('top',value);event.stop();},move:function(event){var now=event.page.y;this.previous=this.previous||now;var up=((this.previous-now)>0);var prev=this.active.getPrevious();var next=this.active.getNext();if(prev&&up&&now<prev.getCoordinates().bottom)this.active.injectBefore(prev);if(next&&!up&&now>next.getCoordinates().top)this.active.injectAfter(next);this.previous=now;},serialize:function(converter){return this.list.getChildren().map(converter||function(el){return this.elements.indexOf(el);},this);},end:function(){this.previous=null;document.removeListener('mousemove',this.bound.move);document.removeListener('mouseup',this.bound.end);if(this.options.ghost){document.removeListener('mousemove',this.bound.moveGhost);this.fireEvent('onDragComplete',[this.active,this.ghost]);}
this.fireEvent('onComplete',this.active);}});Sortables.implement(new Events,new Options);var Tips=new Class({options:{onShow:function(tip){tip.setStyle('visibility','visible');},onHide:function(tip){tip.setStyle('visibility','hidden');},maxTitleChars:30,showDelay:100,hideDelay:100,className:'tool',offsets:{'x':16,'y':16},fixed:false},initialize:function(elements,options){this.setOptions(options);this.toolTip=new Element('div',{'class':this.options.className+'-tip','styles':{'position':'absolute','top':'0','left':'0','visibility':'hidden'}}).inject(document.body);this.wrapper=new Element('div').inject(this.toolTip);$$(elements).each(this.build,this);if(this.options.initialize)this.options.initialize.call(this);},build:function(el){el.$tmp.myTitle=(el.href&&el.getTag()=='a')?el.href.replace('http://',''):(el.rel||false);if(el.title){var dual=el.title.split('::');if(dual.length>1){el.$tmp.myTitle=dual[0].trim();el.$tmp.myText=dual[1].trim();}else{el.$tmp.myText=el.title;}
el.removeAttribute('title');}else{el.$tmp.myText=false;}
if(el.$tmp.myTitle&&el.$tmp.myTitle.length>this.options.maxTitleChars)el.$tmp.myTitle=el.$tmp.myTitle.substr(0,this.options.maxTitleChars-1)+"&hellip;";el.addEvent('mouseenter',function(event){this.start(el);if(!this.options.fixed)this.locate(event);else this.position(el);}.bind(this));if(!this.options.fixed)el.addEvent('mousemove',this.locate.bindWithEvent(this));var end=this.end.bind(this);el.addEvent('mouseleave',end);el.addEvent('trash',end);},start:function(el){this.wrapper.empty();if(el.$tmp.myTitle){this.title=new Element('span').inject(new Element('div',{'class':this.options.className+'-title'}).inject(this.wrapper)).setHTML(el.$tmp.myTitle);}
if(el.$tmp.myText){this.text=new Element('span').inject(new Element('div',{'class':this.options.className+'-text'}).inject(this.wrapper)).setHTML(el.$tmp.myText);}
$clear(this.timer);this.timer=this.show.delay(this.options.showDelay,this);},end:function(event){$clear(this.timer);this.timer=this.hide.delay(this.options.hideDelay,this);},position:function(element){var pos=element.getPosition();this.toolTip.setStyles({'left':pos.x+this.options.offsets.x,'top':pos.y+this.options.offsets.y});},locate:function(event){var win={'x':window.getWidth(),'y':window.getHeight()};var scroll={'x':window.getScrollLeft(),'y':window.getScrollTop()};var tip={'x':this.toolTip.offsetWidth,'y':this.toolTip.offsetHeight};var prop={'x':'left','y':'top'};for(var z in prop){var pos=event.page[z]+this.options.offsets[z];if((pos+tip[z]-scroll[z])>win[z])pos=event.page[z]-this.options.offsets[z]-tip[z];this.toolTip.setStyle(prop[z],pos);};},show:function(){if(this.options.timeout)this.timer=this.hide.delay(this.options.timeout,this);this.fireEvent('onShow',[this.toolTip]);},hide:function(){this.fireEvent('onHide',[this.toolTip]);}});Tips.implement(new Events,new Options);var Group=new Class({initialize:function(){this.instances=$A(arguments);this.events={};this.checker={};},addEvent:function(type,fn){this.checker[type]=this.checker[type]||{};this.events[type]=this.events[type]||[];if(this.events[type].contains(fn))return false;else this.events[type].push(fn);this.instances.each(function(instance,i){instance.addEvent(type,this.check.bind(this,[type,instance,i]));},this);return this;},check:function(type,instance,i){this.checker[type][i]=true;var every=this.instances.every(function(current,j){return this.checker[type][j]||false;},this);if(!every)return;this.checker[type]={};this.events[type].each(function(event){event.call(this,this.instances,instance);},this);}});var Accordion=Fx.Elements.extend({options:{onActive:Class.empty,onBackground:Class.empty,display:0,show:false,height:true,width:false,opacity:true,fixedHeight:false,fixedWidth:false,wait:false,alwaysHide:false},initialize:function(){var options,togglers,elements,container;$each(arguments,function(argument,i){switch($type(argument)){case'object':options=argument;break;case'element':container=$(argument);break;default:var temp=$$(argument);if(!togglers)togglers=temp;else elements=temp;}});this.togglers=togglers||[];this.elements=elements||[];this.container=$(container);this.setOptions(options);this.previous=-1;if(this.options.alwaysHide)this.options.wait=true;if($chk(this.options.show)){this.options.display=false;this.previous=this.options.show;}
if(this.options.start){this.options.display=false;this.options.show=false;}
this.effects={};if(this.options.opacity)this.effects.opacity='fullOpacity';if(this.options.width)this.effects.width=this.options.fixedWidth?'fullWidth':'offsetWidth';if(this.options.height)this.effects.height=this.options.fixedHeight?'fullHeight':'scrollHeight';for(var i=0,l=this.togglers.length;i<l;i++)this.addSection(this.togglers[i],this.elements[i]);this.elements.each(function(el,i){if(this.options.show===i){this.fireEvent('onActive',[this.togglers[i],el]);}else{for(var fx in this.effects)el.setStyle(fx,0);}},this);this.parent(this.elements);if($chk(this.options.display))this.display(this.options.display);},addSection:function(toggler,element,pos){toggler=$(toggler);element=$(element);var test=this.togglers.contains(toggler);var len=this.togglers.length;this.togglers.include(toggler);this.elements.include(element);if(len&&(!test||pos)){pos=$pick(pos,len-1);toggler.injectBefore(this.togglers[pos]);element.injectAfter(toggler);}else if(this.container&&!test){toggler.inject(this.container);element.inject(this.container);}
var idx=this.togglers.indexOf(toggler);toggler.addEvent('click',this.display.bind(this,idx));if(this.options.height)element.setStyles({'padding-top':0,'border-top':'none','padding-bottom':0,'border-bottom':'none'});if(this.options.width)element.setStyles({'padding-left':0,'border-left':'none','padding-right':0,'border-right':'none'});element.fullOpacity=1;if(this.options.fixedWidth)element.fullWidth=this.options.fixedWidth;if(this.options.fixedHeight)element.fullHeight=this.options.fixedHeight;element.setStyle('overflow','hidden');if(!test){for(var fx in this.effects)element.setStyle(fx,0);}
return this;},display:function(index){index=($type(index)=='element')?this.elements.indexOf(index):index;if((this.timer&&this.options.wait)||(index===this.previous&&!this.options.alwaysHide))return this;this.previous=index;var obj={};this.elements.each(function(el,i){obj[i]={};var hide=(i!=index)||(this.options.alwaysHide&&(el.offsetHeight>0));this.fireEvent(hide?'onBackground':'onActive',[this.togglers[i],el]);for(var fx in this.effects)obj[i][fx]=hide?0:el[this.effects[fx]];},this);return this.start(obj);},showThisHideOpen:function(index){return this.display(index);}});Fx.Accordion=Accordion;


/**
* @version		$Id: caption.js 5263 2006-10-02 01:25:24Z webImagery $
* @copyright	Copyright (C) 2005 - 2010 Open Source Matters. All rights reserved.
* @license		GNU/GPL, see LICENSE.php
* Joomla! is free software. This version may have been modified pursuant
* to the GNU General Public License, and as distributed it includes or
* is derivative of works licensed under the GNU General Public License or
* other free or open source software licenses.
* See COPYRIGHT.php for copyright notices and details.
*/

/**
* JCaption javascript behavior
*
* Used for displaying image captions
*
* @package	Joomla
* @since	1.5
* @version	1.0
*/
var JCaption = new Class({
	initialize: function(selector)
	{
		this.selector = selector;

		var images = $$(selector);
		images.each(function(image){ this.createCaption(image); }, this);
	},

	createCaption: function(element)
	{
		var caption   = document.createTextNode(element.title);
		var container = document.createElement("div");
		var text      = document.createElement("p");
		var width     = element.getAttribute("width");
		var align     = element.getAttribute("align");

		if(!width) {
			width = element.width;
		}

		//Windows fix
		if (!align)
			align = element.getStyle("float");  // Rest of the world fix
		if (!align) // IE DOM Fix
			align = element.style.styleFloat;

		if (align=="") {
			align="none";
		}

		text.appendChild(caption);
		text.className = this.selector.replace('.', '_');

		element.parentNode.insertBefore(container, element);
		container.appendChild(element);
		if ( element.title != "" ) {
			container.appendChild(text);
		}
		container.className   = this.selector.replace('.', '_');
		container.className   = container.className + " " + align;
		container.setAttribute("style","float:"+align);

		container.style.width = width + "px";

	}
});

document.caption = null;
window.addEvent('load', function() {
	var caption = new JCaption('img.caption')
	document.caption = caption
});

/*!
 * jQuery Cycle Plugin (with Transition Definitions)
 * Examples and documentation at: http://jquery.malsup.com/cycle/
 * Copyright (c) 2007-2010 M. Alsup
 * Version: 2.9995 (09-AUG-2011)
 * Dual licensed under the MIT and GPL licenses.
 * http://jquery.malsup.com/license.html
 * Requires: jQuery v1.3.2 or later
 */
;(function($) {

var ver = '2.9995';

// if $.support is not defined (pre jQuery 1.3) add what I need
if ($.support == undefined) {
	$.support = {
		opacity: !($.browser.msie)
	};
}

function debug(s) {
	$.fn.cycle.debug && log(s);
}		
function log() {
	window.console && console.log && console.log('[cycle] ' + Array.prototype.join.call(arguments,' '));
}
$.expr[':'].paused = function(el) {
	return el.cyclePause;
}


// the options arg can be...
//   a number  - indicates an immediate transition should occur to the given slide index
//   a string  - 'pause', 'resume', 'toggle', 'next', 'prev', 'stop', 'destroy' or the name of a transition effect (ie, 'fade', 'zoom', etc)
//   an object - properties to control the slideshow
//
// the arg2 arg can be...
//   the name of an fx (only used in conjunction with a numeric value for 'options')
//   the value true (only used in first arg == 'resume') and indicates
//	 that the resume should occur immediately (not wait for next timeout)

$.fn.cycle = function(options, arg2) {
	var o = { s: this.selector, c: this.context };

	// in 1.3+ we can fix mistakes with the ready state
	if (this.length === 0 && options != 'stop') {
		if (!$.isReady && o.s) {
			log('DOM not ready, queuing slideshow');
			$(function() {
				$(o.s,o.c).cycle(options,arg2);
			});
			return this;
		}
		// is your DOM ready?  http://docs.jquery.com/Tutorials:Introducing_$(document).ready()
		log('terminating; zero elements found by selector' + ($.isReady ? '' : ' (DOM not ready)'));
		return this;
	}

	// iterate the matched nodeset
	return this.each(function() {
		var opts = handleArguments(this, options, arg2);
		if (opts === false)
			return;

		opts.updateActivePagerLink = opts.updateActivePagerLink || $.fn.cycle.updateActivePagerLink;
		
		// stop existing slideshow for this container (if there is one)
		if (this.cycleTimeout)
			clearTimeout(this.cycleTimeout);
		this.cycleTimeout = this.cyclePause = 0;

		var $cont = $(this);
		var $slides = opts.slideExpr ? $(opts.slideExpr, this) : $cont.children();
		var els = $slides.get();

		var opts2 = buildOptions($cont, $slides, els, opts, o);
		if (opts2 === false)
			return;

		if (els.length < 2) {
			log('terminating; too few slides: ' + els.length);
			return;
		}

		var startTime = opts2.continuous ? 10 : getTimeout(els[opts2.currSlide], els[opts2.nextSlide], opts2, !opts2.backwards);

		// if it's an auto slideshow, kick it off
		if (startTime) {
			startTime += (opts2.delay || 0);
			if (startTime < 10)
				startTime = 10;
			debug('first timeout: ' + startTime);
			this.cycleTimeout = setTimeout(function(){go(els,opts2,0,!opts.backwards)}, startTime);
		}
	});
};

function triggerPause(cont, byHover, onPager) {
	var opts = $(cont).data('cycle.opts');
	var paused = !!cont.cyclePause;
	if (paused && opts.paused)
		opts.paused(cont, opts, byHover, onPager);
	else if (!paused && opts.resumed)
		opts.resumed(cont, opts, byHover, onPager);
}

// process the args that were passed to the plugin fn
function handleArguments(cont, options, arg2) {
	if (cont.cycleStop == undefined)
		cont.cycleStop = 0;
	if (options === undefined || options === null)
		options = {};
	if (options.constructor == String) {
		switch(options) {
		case 'destroy':
		case 'stop':
			var opts = $(cont).data('cycle.opts');
			if (!opts)
				return false;
			cont.cycleStop++; // callbacks look for change
			if (cont.cycleTimeout)
				clearTimeout(cont.cycleTimeout);
			cont.cycleTimeout = 0;
			opts.elements && $(opts.elements).stop();
			$(cont).removeData('cycle.opts');
			if (options == 'destroy')
				destroy(opts);
			return false;
		case 'toggle':
			cont.cyclePause = (cont.cyclePause === 1) ? 0 : 1;
			checkInstantResume(cont.cyclePause, arg2, cont);
			triggerPause(cont);
			return false;
		case 'pause':
			cont.cyclePause = 1;
			triggerPause(cont);
			return false;
		case 'resume':
			cont.cyclePause = 0;
			checkInstantResume(false, arg2, cont);
			triggerPause(cont);
			return false;
		case 'prev':
		case 'next':
			var opts = $(cont).data('cycle.opts');
			if (!opts) {
				log('options not found, "prev/next" ignored');
				return false;
			}
			$.fn.cycle[options](opts);
			return false;
		default:
			options = { fx: options };
		};
		return options;
	}
	else if (options.constructor == Number) {
		// go to the requested slide
		var num = options;
		options = $(cont).data('cycle.opts');
		if (!options) {
			log('options not found, can not advance slide');
			return false;
		}
		if (num < 0 || num >= options.elements.length) {
			log('invalid slide index: ' + num);
			return false;
		}
		options.nextSlide = num;
		if (cont.cycleTimeout) {
			clearTimeout(cont.cycleTimeout);
			cont.cycleTimeout = 0;
		}
		if (typeof arg2 == 'string')
			options.oneTimeFx = arg2;
		go(options.elements, options, 1, num >= options.currSlide);
		return false;
	}
	return options;
	
	function checkInstantResume(isPaused, arg2, cont) {
		if (!isPaused && arg2 === true) { // resume now!
			var options = $(cont).data('cycle.opts');
			if (!options) {
				log('options not found, can not resume');
				return false;
			}
			if (cont.cycleTimeout) {
				clearTimeout(cont.cycleTimeout);
				cont.cycleTimeout = 0;
			}
			go(options.elements, options, 1, !options.backwards);
		}
	}
};

function removeFilter(el, opts) {
	if (!$.support.opacity && opts.cleartype && el.style.filter) {
		try { el.style.removeAttribute('filter'); }
		catch(smother) {} // handle old opera versions
	}
};

// unbind event handlers
function destroy(opts) {
	if (opts.next)
		$(opts.next).unbind(opts.prevNextEvent);
	if (opts.prev)
		$(opts.prev).unbind(opts.prevNextEvent);
	
	if (opts.pager || opts.pagerAnchorBuilder)
		$.each(opts.pagerAnchors || [], function() {
			this.unbind().remove();
		});
	opts.pagerAnchors = null;
	if (opts.destroy) // callback
		opts.destroy(opts);
};

// one-time initialization
function buildOptions($cont, $slides, els, options, o) {
	// support metadata plugin (v1.0 and v2.0)
	var opts = $.extend({}, $.fn.cycle.defaults, options || {}, $.metadata ? $cont.metadata() : $.meta ? $cont.data() : {});
	var meta = $.isFunction($cont.data) ? $cont.data(opts.metaAttr) : null;
	if (meta)
		opts = $.extend(opts, meta);
	if (opts.autostop)
		opts.countdown = opts.autostopCount || els.length;

	var cont = $cont[0];
	$cont.data('cycle.opts', opts);
	opts.$cont = $cont;
	opts.stopCount = cont.cycleStop;
	opts.elements = els;
	opts.before = opts.before ? [opts.before] : [];
	opts.after = opts.after ? [opts.after] : [];

	// push some after callbacks
	if (!$.support.opacity && opts.cleartype)
		opts.after.push(function() { removeFilter(this, opts); });
	if (opts.continuous)
		opts.after.push(function() { go(els,opts,0,!opts.backwards); });

	saveOriginalOpts(opts);

	// clearType corrections
	if (!$.support.opacity && opts.cleartype && !opts.cleartypeNoBg)
		clearTypeFix($slides);

	// container requires non-static position so that slides can be position within
	if ($cont.css('position') == 'static')
		$cont.css('position', 'relative');
	if (opts.width)
		$cont.width(opts.width);
	if (opts.height && opts.height != 'auto')
		$cont.height(opts.height);

	if (opts.startingSlide)
		opts.startingSlide = parseInt(opts.startingSlide,10);
	else if (opts.backwards)
		opts.startingSlide = els.length - 1;

	// if random, mix up the slide array
	if (opts.random) {
		opts.randomMap = [];
		for (var i = 0; i < els.length; i++)
			opts.randomMap.push(i);
		opts.randomMap.sort(function(a,b) {return Math.random() - 0.5;});
		opts.randomIndex = 1;
		opts.startingSlide = opts.randomMap[1];
	}
	else if (opts.startingSlide >= els.length)
		opts.startingSlide = 0; // catch bogus input
	opts.currSlide = opts.startingSlide || 0;
	var first = opts.startingSlide;

	// set position and zIndex on all the slides
	$slides.css({position: 'absolute', top:0, left:0}).hide().each(function(i) {
		var z;
		if (opts.backwards)
			z = first ? i <= first ? els.length + (i-first) : first-i : els.length-i;
		else
			z = first ? i >= first ? els.length - (i-first) : first-i : els.length-i;
		$(this).css('z-index', z)
	});

	// make sure first slide is visible
	$(els[first]).css('opacity',1).show(); // opacity bit needed to handle restart use case
	removeFilter(els[first], opts);

	// stretch slides
	if (opts.fit) {
		if (!opts.aspect) {
	        if (opts.width)
	            $slides.width(opts.width);
	        if (opts.height && opts.height != 'auto')
	            $slides.height(opts.height);
		} else {
			$slides.each(function(){
				var $slide = $(this);
				var ratio = (opts.aspect === true) ? $slide.width()/$slide.height() : opts.aspect;
				if( opts.width && $slide.width() != opts.width ) {
					$slide.width( opts.width );
					$slide.height( opts.width / ratio );
				}

				if( opts.height && $slide.height() < opts.height ) {
					$slide.height( opts.height );
					$slide.width( opts.height * ratio );
				}
			});
		}
	}

	if (opts.center && ((!opts.fit) || opts.aspect)) {
		$slides.each(function(){
			var $slide = $(this);
			$slide.css({
				"margin-left": opts.width ?
					((opts.width - $slide.width()) / 2) + "px" :
					0,
				"margin-top": opts.height ?
					((opts.height - $slide.height()) / 2) + "px" :
					0
			});
		});
	}

	if (opts.center && !opts.fit && !opts.slideResize) {
	  	$slides.each(function(){
	    	var $slide = $(this);
	    	$slide.css({
	      		"margin-left": opts.width ? ((opts.width - $slide.width()) / 2) + "px" : 0,
	      		"margin-top": opts.height ? ((opts.height - $slide.height()) / 2) + "px" : 0
	    	});
	  	});
	}
		
	// stretch container
	var reshape = opts.containerResize && !$cont.innerHeight();
	if (reshape) { // do this only if container has no size http://tinyurl.com/da2oa9
		var maxw = 0, maxh = 0;
		for(var j=0; j < els.length; j++) {
			var $e = $(els[j]), e = $e[0], w = $e.outerWidth(), h = $e.outerHeight();
			if (!w) w = e.offsetWidth || e.width || $e.attr('width');
			if (!h) h = e.offsetHeight || e.height || $e.attr('height');
			maxw = w > maxw ? w : maxw;
			maxh = h > maxh ? h : maxh;
		}
		if (maxw > 0 && maxh > 0)
			$cont.css({width:maxw+'px',height:maxh+'px'});
	}

	var pauseFlag = false;  // https://github.com/malsup/cycle/issues/44
	if (opts.pause)
		$cont.hover(
			function(){
				pauseFlag = true;
				this.cyclePause++;
				triggerPause(cont, true);
			},
			function(){
				pauseFlag && this.cyclePause--;
				triggerPause(cont, true);
			}
		);

	if (supportMultiTransitions(opts) === false)
		return false;

	// apparently a lot of people use image slideshows without height/width attributes on the images.
	// Cycle 2.50+ requires the sizing info for every slide; this block tries to deal with that.
	var requeue = false;
	options.requeueAttempts = options.requeueAttempts || 0;
	$slides.each(function() {
		// try to get height/width of each slide
		var $el = $(this);
		this.cycleH = (opts.fit && opts.height) ? opts.height : ($el.height() || this.offsetHeight || this.height || $el.attr('height') || 0);
		this.cycleW = (opts.fit && opts.width) ? opts.width : ($el.width() || this.offsetWidth || this.width || $el.attr('width') || 0);

		if ( $el.is('img') ) {
			// sigh..  sniffing, hacking, shrugging...  this crappy hack tries to account for what browsers do when
			// an image is being downloaded and the markup did not include sizing info (height/width attributes);
			// there seems to be some "default" sizes used in this situation
			var loadingIE	= ($.browser.msie  && this.cycleW == 28 && this.cycleH == 30 && !this.complete);
			var loadingFF	= ($.browser.mozilla && this.cycleW == 34 && this.cycleH == 19 && !this.complete);
			var loadingOp	= ($.browser.opera && ((this.cycleW == 42 && this.cycleH == 19) || (this.cycleW == 37 && this.cycleH == 17)) && !this.complete);
			var loadingOther = (this.cycleH == 0 && this.cycleW == 0 && !this.complete);
			// don't requeue for images that are still loading but have a valid size
			if (loadingIE || loadingFF || loadingOp || loadingOther) {
				if (o.s && opts.requeueOnImageNotLoaded && ++options.requeueAttempts < 100) { // track retry count so we don't loop forever
					log(options.requeueAttempts,' - img slide not loaded, requeuing slideshow: ', this.src, this.cycleW, this.cycleH);
					setTimeout(function() {$(o.s,o.c).cycle(options)}, opts.requeueTimeout);
					requeue = true;
					return false; // break each loop
				}
				else {
					log('could not determine size of image: '+this.src, this.cycleW, this.cycleH);
				}
			}
		}
		return true;
	});

	if (requeue)
		return false;

	opts.cssBefore = opts.cssBefore || {};
	opts.cssAfter = opts.cssAfter || {};
	opts.cssFirst = opts.cssFirst || {};
	opts.animIn = opts.animIn || {};
	opts.animOut = opts.animOut || {};

	$slides.not(':eq('+first+')').css(opts.cssBefore);
	$($slides[first]).css(opts.cssFirst);

	if (opts.timeout) {
		opts.timeout = parseInt(opts.timeout,10);
		// ensure that timeout and speed settings are sane
		if (opts.speed.constructor == String)
			opts.speed = $.fx.speeds[opts.speed] || parseInt(opts.speed,10);
		if (!opts.sync)
			opts.speed = opts.speed / 2;
		
		var buffer = opts.fx == 'none' ? 0 : opts.fx == 'shuffle' ? 500 : 250;
		while((opts.timeout - opts.speed) < buffer) // sanitize timeout
			opts.timeout += opts.speed;
	}
	if (opts.easing)
		opts.easeIn = opts.easeOut = opts.easing;
	if (!opts.speedIn)
		opts.speedIn = opts.speed;
	if (!opts.speedOut)
		opts.speedOut = opts.speed;

	opts.slideCount = els.length;
	opts.currSlide = opts.lastSlide = first;
	if (opts.random) {
		if (++opts.randomIndex == els.length)
			opts.randomIndex = 0;
		opts.nextSlide = opts.randomMap[opts.randomIndex];
	}
	else if (opts.backwards)
		opts.nextSlide = opts.startingSlide == 0 ? (els.length-1) : opts.startingSlide-1;
	else
		opts.nextSlide = opts.startingSlide >= (els.length-1) ? 0 : opts.startingSlide+1;

	// run transition init fn
	if (!opts.multiFx) {
		var init = $.fn.cycle.transitions[opts.fx];
		if ($.isFunction(init))
			init($cont, $slides, opts);
		else if (opts.fx != 'custom' && !opts.multiFx) {
			log('unknown transition: ' + opts.fx,'; slideshow terminating');
			return false;
		}
	}

	// fire artificial events
	var e0 = $slides[first];
	if (!opts.skipInitializationCallbacks) {
		if (opts.before.length)
			opts.before[0].apply(e0, [e0, e0, opts, true]);
		if (opts.after.length)
			opts.after[0].apply(e0, [e0, e0, opts, true]);
	}
	if (opts.next)
		$(opts.next).bind(opts.prevNextEvent,function(){return advance(opts,1)});
	if (opts.prev)
		$(opts.prev).bind(opts.prevNextEvent,function(){return advance(opts,0)});
	if (opts.pager || opts.pagerAnchorBuilder)
		buildPager(els,opts);

	exposeAddSlide(opts, els);

	return opts;
};

// save off original opts so we can restore after clearing state
function saveOriginalOpts(opts) {
	opts.original = { before: [], after: [] };
	opts.original.cssBefore = $.extend({}, opts.cssBefore);
	opts.original.cssAfter  = $.extend({}, opts.cssAfter);
	opts.original.animIn	= $.extend({}, opts.animIn);
	opts.original.animOut   = $.extend({}, opts.animOut);
	$.each(opts.before, function() { opts.original.before.push(this); });
	$.each(opts.after,  function() { opts.original.after.push(this); });
};

function supportMultiTransitions(opts) {
	var i, tx, txs = $.fn.cycle.transitions;
	// look for multiple effects
	if (opts.fx.indexOf(',') > 0) {
		opts.multiFx = true;
		opts.fxs = opts.fx.replace(/\s*/g,'').split(',');
		// discard any bogus effect names
		for (i=0; i < opts.fxs.length; i++) {
			var fx = opts.fxs[i];
			tx = txs[fx];
			if (!tx || !txs.hasOwnProperty(fx) || !$.isFunction(tx)) {
				log('discarding unknown transition: ',fx);
				opts.fxs.splice(i,1);
				i--;
			}
		}
		// if we have an empty list then we threw everything away!
		if (!opts.fxs.length) {
			log('No valid transitions named; slideshow terminating.');
			return false;
		}
	}
	else if (opts.fx == 'all') {  // auto-gen the list of transitions
		opts.multiFx = true;
		opts.fxs = [];
		for (p in txs) {
			tx = txs[p];
			if (txs.hasOwnProperty(p) && $.isFunction(tx))
				opts.fxs.push(p);
		}
	}
	if (opts.multiFx && opts.randomizeEffects) {
		// munge the fxs array to make effect selection random
		var r1 = Math.floor(Math.random() * 20) + 30;
		for (i = 0; i < r1; i++) {
			var r2 = Math.floor(Math.random() * opts.fxs.length);
			opts.fxs.push(opts.fxs.splice(r2,1)[0]);
		}
		debug('randomized fx sequence: ',opts.fxs);
	}
	return true;
};

// provide a mechanism for adding slides after the slideshow has started
function exposeAddSlide(opts, els) {
	opts.addSlide = function(newSlide, prepend) {
		var $s = $(newSlide), s = $s[0];
		if (!opts.autostopCount)
			opts.countdown++;
		els[prepend?'unshift':'push'](s);
		if (opts.els)
			opts.els[prepend?'unshift':'push'](s); // shuffle needs this
		opts.slideCount = els.length;

		$s.css('position','absolute');
		$s[prepend?'prependTo':'appendTo'](opts.$cont);

		if (prepend) {
			opts.currSlide++;
			opts.nextSlide++;
		}

		if (!$.support.opacity && opts.cleartype && !opts.cleartypeNoBg)
			clearTypeFix($s);

		if (opts.fit && opts.width)
			$s.width(opts.width);
		if (opts.fit && opts.height && opts.height != 'auto')
			$s.height(opts.height);
		s.cycleH = (opts.fit && opts.height) ? opts.height : $s.height();
		s.cycleW = (opts.fit && opts.width) ? opts.width : $s.width();

		$s.css(opts.cssBefore);

		if (opts.pager || opts.pagerAnchorBuilder)
			$.fn.cycle.createPagerAnchor(els.length-1, s, $(opts.pager), els, opts);

		if ($.isFunction(opts.onAddSlide))
			opts.onAddSlide($s);
		else
			$s.hide(); // default behavior
	};
}

// reset internal state; we do this on every pass in order to support multiple effects
$.fn.cycle.resetState = function(opts, fx) {
	fx = fx || opts.fx;
	opts.before = []; opts.after = [];
	opts.cssBefore = $.extend({}, opts.original.cssBefore);
	opts.cssAfter  = $.extend({}, opts.original.cssAfter);
	opts.animIn	= $.extend({}, opts.original.animIn);
	opts.animOut   = $.extend({}, opts.original.animOut);
	opts.fxFn = null;
	$.each(opts.original.before, function() { opts.before.push(this); });
	$.each(opts.original.after,  function() { opts.after.push(this); });

	// re-init
	var init = $.fn.cycle.transitions[fx];
	if ($.isFunction(init))
		init(opts.$cont, $(opts.elements), opts);
};

// this is the main engine fn, it handles the timeouts, callbacks and slide index mgmt
function go(els, opts, manual, fwd) {
	// opts.busy is true if we're in the middle of an animation
	if (manual && opts.busy && opts.manualTrump) {
		// let manual transitions requests trump active ones
		debug('manualTrump in go(), stopping active transition');
		$(els).stop(true,true);
		opts.busy = 0;
	}
	// don't begin another timeout-based transition if there is one active
	if (opts.busy) {
		debug('transition active, ignoring new tx request');
		return;
	}

	var p = opts.$cont[0], curr = els[opts.currSlide], next = els[opts.nextSlide];

	// stop cycling if we have an outstanding stop request
	if (p.cycleStop != opts.stopCount || p.cycleTimeout === 0 && !manual)
		return;

	// check to see if we should stop cycling based on autostop options
	if (!manual && !p.cyclePause && !opts.bounce &&
		((opts.autostop && (--opts.countdown <= 0)) ||
		(opts.nowrap && !opts.random && opts.nextSlide < opts.currSlide))) {
		if (opts.end)
			opts.end(opts);
		return;
	}

	// if slideshow is paused, only transition on a manual trigger
	var changed = false;
	if ((manual || !p.cyclePause) && (opts.nextSlide != opts.currSlide)) {
		changed = true;
		var fx = opts.fx;
		// keep trying to get the slide size if we don't have it yet
		curr.cycleH = curr.cycleH || $(curr).height();
		curr.cycleW = curr.cycleW || $(curr).width();
		next.cycleH = next.cycleH || $(next).height();
		next.cycleW = next.cycleW || $(next).width();

		// support multiple transition types
		if (opts.multiFx) {
			if (fwd && (opts.lastFx == undefined || ++opts.lastFx >= opts.fxs.length))
				opts.lastFx = 0;
			else if (!fwd && (opts.lastFx == undefined || --opts.lastFx < 0))
				opts.lastFx = opts.fxs.length - 1;
			fx = opts.fxs[opts.lastFx];
		}

		// one-time fx overrides apply to:  $('div').cycle(3,'zoom');
		if (opts.oneTimeFx) {
			fx = opts.oneTimeFx;
			opts.oneTimeFx = null;
		}

		$.fn.cycle.resetState(opts, fx);

		// run the before callbacks
		if (opts.before.length)
			$.each(opts.before, function(i,o) {
				if (p.cycleStop != opts.stopCount) return;
				o.apply(next, [curr, next, opts, fwd]);
			});

		// stage the after callacks
		var after = function() {
			opts.busy = 0;
			$.each(opts.after, function(i,o) {
				if (p.cycleStop != opts.stopCount) return;
				o.apply(next, [curr, next, opts, fwd]);
			});
		};

		debug('tx firing('+fx+'); currSlide: ' + opts.currSlide + '; nextSlide: ' + opts.nextSlide);
		
		// get ready to perform the transition
		opts.busy = 1;
		if (opts.fxFn) // fx function provided?
			opts.fxFn(curr, next, opts, after, fwd, manual && opts.fastOnEvent);
		else if ($.isFunction($.fn.cycle[opts.fx])) // fx plugin ?
			$.fn.cycle[opts.fx](curr, next, opts, after, fwd, manual && opts.fastOnEvent);
		else
			$.fn.cycle.custom(curr, next, opts, after, fwd, manual && opts.fastOnEvent);
	}

	if (changed || opts.nextSlide == opts.currSlide) {
		// calculate the next slide
		opts.lastSlide = opts.currSlide;
		if (opts.random) {
			opts.currSlide = opts.nextSlide;
			if (++opts.randomIndex == els.length)
				opts.randomIndex = 0;
			opts.nextSlide = opts.randomMap[opts.randomIndex];
			if (opts.nextSlide == opts.currSlide)
				opts.nextSlide = (opts.currSlide == opts.slideCount - 1) ? 0 : opts.currSlide + 1;
		}
		else if (opts.backwards) {
			var roll = (opts.nextSlide - 1) < 0;
			if (roll && opts.bounce) {
				opts.backwards = !opts.backwards;
				opts.nextSlide = 1;
				opts.currSlide = 0;
			}
			else {
				opts.nextSlide = roll ? (els.length-1) : opts.nextSlide-1;
				opts.currSlide = roll ? 0 : opts.nextSlide+1;
			}
		}
		else { // sequence
			var roll = (opts.nextSlide + 1) == els.length;
			if (roll && opts.bounce) {
				opts.backwards = !opts.backwards;
				opts.nextSlide = els.length-2;
				opts.currSlide = els.length-1;
			}
			else {
				opts.nextSlide = roll ? 0 : opts.nextSlide+1;
				opts.currSlide = roll ? els.length-1 : opts.nextSlide-1;
			}
		}
	}
	if (changed && opts.pager)
		opts.updateActivePagerLink(opts.pager, opts.currSlide, opts.activePagerClass);
	
	// stage the next transition
	var ms = 0;
	if (opts.timeout && !opts.continuous)
		ms = getTimeout(els[opts.currSlide], els[opts.nextSlide], opts, fwd);
	else if (opts.continuous && p.cyclePause) // continuous shows work off an after callback, not this timer logic
		ms = 10;
	if (ms > 0)
		p.cycleTimeout = setTimeout(function(){ go(els, opts, 0, !opts.backwards) }, ms);
};

// invoked after transition
$.fn.cycle.updateActivePagerLink = function(pager, currSlide, clsName) {
   $(pager).each(function() {
       $(this).children().removeClass(clsName).eq(currSlide).addClass(clsName);
   });
};

// calculate timeout value for current transition
function getTimeout(curr, next, opts, fwd) {
	if (opts.timeoutFn) {
		// call user provided calc fn
		var t = opts.timeoutFn.call(curr,curr,next,opts,fwd);
		while (opts.fx != 'none' && (t - opts.speed) < 250) // sanitize timeout
			t += opts.speed;
		debug('calculated timeout: ' + t + '; speed: ' + opts.speed);
		if (t !== false)
			return t;
	}
	return opts.timeout;
};

// expose next/prev function, caller must pass in state
$.fn.cycle.next = function(opts) { advance(opts,1); };
$.fn.cycle.prev = function(opts) { advance(opts,0);};

// advance slide forward or back
function advance(opts, moveForward) {
	var val = moveForward ? 1 : -1;
	var els = opts.elements;
	var p = opts.$cont[0], timeout = p.cycleTimeout;
	if (timeout) {
		clearTimeout(timeout);
		p.cycleTimeout = 0;
	}
	if (opts.random && val < 0) {
		// move back to the previously display slide
		opts.randomIndex--;
		if (--opts.randomIndex == -2)
			opts.randomIndex = els.length-2;
		else if (opts.randomIndex == -1)
			opts.randomIndex = els.length-1;
		opts.nextSlide = opts.randomMap[opts.randomIndex];
	}
	else if (opts.random) {
		opts.nextSlide = opts.randomMap[opts.randomIndex];
	}
	else {
		opts.nextSlide = opts.currSlide + val;
		if (opts.nextSlide < 0) {
			if (opts.nowrap) return false;
			opts.nextSlide = els.length - 1;
		}
		else if (opts.nextSlide >= els.length) {
			if (opts.nowrap) return false;
			opts.nextSlide = 0;
		}
	}

	var cb = opts.onPrevNextEvent || opts.prevNextClick; // prevNextClick is deprecated
	if ($.isFunction(cb))
		cb(val > 0, opts.nextSlide, els[opts.nextSlide]);
	go(els, opts, 1, moveForward);
	return false;
};

function buildPager(els, opts) {
	var $p = $(opts.pager);
	$.each(els, function(i,o) {
		$.fn.cycle.createPagerAnchor(i,o,$p,els,opts);
	});
	opts.updateActivePagerLink(opts.pager, opts.startingSlide, opts.activePagerClass);
};

$.fn.cycle.createPagerAnchor = function(i, el, $p, els, opts) {
	var a;
	if ($.isFunction(opts.pagerAnchorBuilder)) {
		a = opts.pagerAnchorBuilder(i,el);
		debug('pagerAnchorBuilder('+i+', el) returned: ' + a);
	}
	else
		a = '<a href="#">'+(i+1)+'</a>';
		
	if (!a)
		return;
	var $a = $(a);
	// don't reparent if anchor is in the dom
	if ($a.parents('body').length === 0) {
		var arr = [];
		if ($p.length > 1) {
			$p.each(function() {
				var $clone = $a.clone(true);
				$(this).append($clone);
				arr.push($clone[0]);
			});
			$a = $(arr);
		}
		else {
			$a.appendTo($p);
		}
	}

	opts.pagerAnchors =  opts.pagerAnchors || [];
	opts.pagerAnchors.push($a);
	
	var pagerFn = function(e) {
		e.preventDefault();
		opts.nextSlide = i;
		var p = opts.$cont[0], timeout = p.cycleTimeout;
		if (timeout) {
			clearTimeout(timeout);
			p.cycleTimeout = 0;
		}
		var cb = opts.onPagerEvent || opts.pagerClick; // pagerClick is deprecated
		if ($.isFunction(cb))
			cb(opts.nextSlide, els[opts.nextSlide]);
		go(els,opts,1,opts.currSlide < i); // trigger the trans
//		return false; // <== allow bubble
	}
	
	if ( /mouseenter|mouseover/i.test(opts.pagerEvent) ) {
		$a.hover(pagerFn, function(){/* no-op */} );
	}
	else {
		$a.bind(opts.pagerEvent, pagerFn);
	}
	
	if ( ! /^click/.test(opts.pagerEvent) && !opts.allowPagerClickBubble)
		$a.bind('click.cycle', function(){return false;}); // suppress click
	
	var cont = opts.$cont[0];
	var pauseFlag = false; // https://github.com/malsup/cycle/issues/44
	if (opts.pauseOnPagerHover) {
		$a.hover(
			function() { 
				pauseFlag = true;
				cont.cyclePause++; 
				triggerPause(cont,true,true);
			}, function() { 
				pauseFlag && cont.cyclePause--; 
				triggerPause(cont,true,true);
			} 
		);
	}
};

// helper fn to calculate the number of slides between the current and the next
$.fn.cycle.hopsFromLast = function(opts, fwd) {
	var hops, l = opts.lastSlide, c = opts.currSlide;
	if (fwd)
		hops = c > l ? c - l : opts.slideCount - l;
	else
		hops = c < l ? l - c : l + opts.slideCount - c;
	return hops;
};

// fix clearType problems in ie6 by setting an explicit bg color
// (otherwise text slides look horrible during a fade transition)
function clearTypeFix($slides) {
	debug('applying clearType background-color hack');
	function hex(s) {
		s = parseInt(s,10).toString(16);
		return s.length < 2 ? '0'+s : s;
	};
	function getBg(e) {
		for ( ; e && e.nodeName.toLowerCase() != 'html'; e = e.parentNode) {
			var v = $.css(e,'background-color');
			if (v && v.indexOf('rgb') >= 0 ) {
				var rgb = v.match(/\d+/g);
				return '#'+ hex(rgb[0]) + hex(rgb[1]) + hex(rgb[2]);
			}
			if (v && v != 'transparent')
				return v;
		}
		return '#ffffff';
	};
	$slides.each(function() { $(this).css('background-color', getBg(this)); });
};

// reset common props before the next transition
$.fn.cycle.commonReset = function(curr,next,opts,w,h,rev) {
	$(opts.elements).not(curr).hide();
	if (typeof opts.cssBefore.opacity == 'undefined')
		opts.cssBefore.opacity = 1;
	opts.cssBefore.display = 'block';
	if (opts.slideResize && w !== false && next.cycleW > 0)
		opts.cssBefore.width = next.cycleW;
	if (opts.slideResize && h !== false && next.cycleH > 0)
		opts.cssBefore.height = next.cycleH;
	opts.cssAfter = opts.cssAfter || {};
	opts.cssAfter.display = 'none';
	$(curr).css('zIndex',opts.slideCount + (rev === true ? 1 : 0));
	$(next).css('zIndex',opts.slideCount + (rev === true ? 0 : 1));
};

// the actual fn for effecting a transition
$.fn.cycle.custom = function(curr, next, opts, cb, fwd, speedOverride) {
	var $l = $(curr), $n = $(next);
	var speedIn = opts.speedIn, speedOut = opts.speedOut, easeIn = opts.easeIn, easeOut = opts.easeOut;
	$n.css(opts.cssBefore);
	if (speedOverride) {
		if (typeof speedOverride == 'number')
			speedIn = speedOut = speedOverride;
		else
			speedIn = speedOut = 1;
		easeIn = easeOut = null;
	}
	var fn = function() {
		$n.animate(opts.animIn, speedIn, easeIn, function() {
			cb();
		});
	};
	$l.animate(opts.animOut, speedOut, easeOut, function() {
		$l.css(opts.cssAfter);
		if (!opts.sync) 
			fn();
	});
	if (opts.sync) fn();
};

// transition definitions - only fade is defined here, transition pack defines the rest
$.fn.cycle.transitions = {
	fade: function($cont, $slides, opts) {
		$slides.not(':eq('+opts.currSlide+')').css('opacity',0);
		opts.before.push(function(curr,next,opts) {
			$.fn.cycle.commonReset(curr,next,opts);
			opts.cssBefore.opacity = 0;
		});
		opts.animIn	   = { opacity: 1 };
		opts.animOut   = { opacity: 0 };
		opts.cssBefore = { top: 0, left: 0 };
	}
};

$.fn.cycle.ver = function() { return ver; };

// override these globally if you like (they are all optional)
$.fn.cycle.defaults = {
	activePagerClass: 'activeSlide', // class name used for the active pager link
	after:		   null,  // transition callback (scope set to element that was shown):  function(currSlideElement, nextSlideElement, options, forwardFlag)
	allowPagerClickBubble: false, // allows or prevents click event on pager anchors from bubbling
	animIn:		   null,  // properties that define how the slide animates in
	animOut:	   null,  // properties that define how the slide animates out
	aspect:		   false,  // preserve aspect ratio during fit resizing, cropping if necessary (must be used with fit option)
	autostop:	   0,	  // true to end slideshow after X transitions (where X == slide count)
	autostopCount: 0,	  // number of transitions (optionally used with autostop to define X)
	backwards:     false, // true to start slideshow at last slide and move backwards through the stack
	before:		   null,  // transition callback (scope set to element to be shown):	 function(currSlideElement, nextSlideElement, options, forwardFlag)
	center: 	   null,  // set to true to have cycle add top/left margin to each slide (use with width and height options)
	cleartype:	   !$.support.opacity,  // true if clearType corrections should be applied (for IE)
	cleartypeNoBg: false, // set to true to disable extra cleartype fixing (leave false to force background color setting on slides)
	containerResize: 1,	  // resize container to fit largest slide
	continuous:	   0,	  // true to start next transition immediately after current one completes
	cssAfter:	   null,  // properties that defined the state of the slide after transitioning out
	cssBefore:	   null,  // properties that define the initial state of the slide before transitioning in
	delay:		   0,	  // additional delay (in ms) for first transition (hint: can be negative)
	easeIn:		   null,  // easing for "in" transition
	easeOut:	   null,  // easing for "out" transition
	easing:		   null,  // easing method for both in and out transitions
	end:		   null,  // callback invoked when the slideshow terminates (use with autostop or nowrap options): function(options)
	fastOnEvent:   0,	  // force fast transitions when triggered manually (via pager or prev/next); value == time in ms
	fit:		   0,	  // force slides to fit container
	fx:			  'fade', // name of transition effect (or comma separated names, ex: 'fade,scrollUp,shuffle')
	fxFn:		   null,  // function used to control the transition: function(currSlideElement, nextSlideElement, options, afterCalback, forwardFlag)
	height:		  'auto', // container height (if the 'fit' option is true, the slides will be set to this height as well)
	manualTrump:   true,  // causes manual transition to stop an active transition instead of being ignored
	metaAttr:     'cycle',// data- attribute that holds the option data for the slideshow
	next:		   null,  // element, jQuery object, or jQuery selector string for the element to use as event trigger for next slide
	nowrap:		   0,	  // true to prevent slideshow from wrapping
	onPagerEvent:  null,  // callback fn for pager events: function(zeroBasedSlideIndex, slideElement)
	onPrevNextEvent: null,// callback fn for prev/next events: function(isNext, zeroBasedSlideIndex, slideElement)
	pager:		   null,  // element, jQuery object, or jQuery selector string for the element to use as pager container
	pagerAnchorBuilder: null, // callback fn for building anchor links:  function(index, DOMelement)
	pagerEvent:	  'click.cycle', // name of event which drives the pager navigation
	pause:		   0,	  // true to enable "pause on hover"
	pauseOnPagerHover: 0, // true to pause when hovering over pager link
	prev:		   null,  // element, jQuery object, or jQuery selector string for the element to use as event trigger for previous slide
	prevNextEvent:'click.cycle',// event which drives the manual transition to the previous or next slide
	random:		   0,	  // true for random, false for sequence (not applicable to shuffle fx)
	randomizeEffects: 1,  // valid when multiple effects are used; true to make the effect sequence random
	requeueOnImageNotLoaded: true, // requeue the slideshow if any image slides are not yet loaded
	requeueTimeout: 250,  // ms delay for requeue
	rev:		   0,	  // causes animations to transition in reverse (for effects that support it such as scrollHorz/scrollVert/shuffle)
	shuffle:	   null,  // coords for shuffle animation, ex: { top:15, left: 200 }
	skipInitializationCallbacks: false, // set to true to disable the first before/after callback that occurs prior to any transition
	slideExpr:	   null,  // expression for selecting slides (if something other than all children is required)
	slideResize:   1,     // force slide width/height to fixed size before every transition
	speed:		   1000,  // speed of the transition (any valid fx speed value)
	speedIn:	   null,  // speed of the 'in' transition
	speedOut:	   null,  // speed of the 'out' transition
	startingSlide: 0,	  // zero-based index of the first slide to be displayed
	sync:		   1,	  // true if in/out transitions should occur simultaneously
	timeout:	   4000,  // milliseconds between slide transitions (0 to disable auto advance)
	timeoutFn:     null,  // callback for determining per-slide timeout value:  function(currSlideElement, nextSlideElement, options, forwardFlag)
	updateActivePagerLink: null, // callback fn invoked to update the active pager link (adds/removes activePagerClass style)
	width:         null   // container width (if the 'fit' option is true, the slides will be set to this width as well)
};

})(jQuery);


/*!
 * jQuery Cycle Plugin Transition Definitions
 * This script is a plugin for the jQuery Cycle Plugin
 * Examples and documentation at: http://malsup.com/jquery/cycle/
 * Copyright (c) 2007-2010 M. Alsup
 * Version:	 2.73
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 */
(function($) {

//
// These functions define slide initialization and properties for the named
// transitions. To save file size feel free to remove any of these that you
// don't need.
//
$.fn.cycle.transitions.none = function($cont, $slides, opts) {
	opts.fxFn = function(curr,next,opts,after){
		$(next).show();
		$(curr).hide();
		after();
	};
};

// not a cross-fade, fadeout only fades out the top slide
$.fn.cycle.transitions.fadeout = function($cont, $slides, opts) {
	$slides.not(':eq('+opts.currSlide+')').css({ display: 'block', 'opacity': 1 });
	opts.before.push(function(curr,next,opts,w,h,rev) {
		$(curr).css('zIndex',opts.slideCount + (!rev === true ? 1 : 0));
		$(next).css('zIndex',opts.slideCount + (!rev === true ? 0 : 1));
	});
	opts.animIn.opacity = 1;
	opts.animOut.opacity = 0;
	opts.cssBefore.opacity = 1;
	opts.cssBefore.display = 'block';
	opts.cssAfter.zIndex = 0;
};

// scrollUp/Down/Left/Right
$.fn.cycle.transitions.scrollUp = function($cont, $slides, opts) {
	$cont.css('overflow','hidden');
	opts.before.push($.fn.cycle.commonReset);
	var h = $cont.height();
	opts.cssBefore.top = h;
	opts.cssBefore.left = 0;
	opts.cssFirst.top = 0;
	opts.animIn.top = 0;
	opts.animOut.top = -h;
};
$.fn.cycle.transitions.scrollDown = function($cont, $slides, opts) {
	$cont.css('overflow','hidden');
	opts.before.push($.fn.cycle.commonReset);
	var h = $cont.height();
	opts.cssFirst.top = 0;
	opts.cssBefore.top = -h;
	opts.cssBefore.left = 0;
	opts.animIn.top = 0;
	opts.animOut.top = h;
};
$.fn.cycle.transitions.scrollLeft = function($cont, $slides, opts) {
	$cont.css('overflow','hidden');
	opts.before.push($.fn.cycle.commonReset);
	var w = $cont.width();
	opts.cssFirst.left = 0;
	opts.cssBefore.left = w;
	opts.cssBefore.top = 0;
	opts.animIn.left = 0;
	opts.animOut.left = 0-w;
};
$.fn.cycle.transitions.scrollRight = function($cont, $slides, opts) {
	$cont.css('overflow','hidden');
	opts.before.push($.fn.cycle.commonReset);
	var w = $cont.width();
	opts.cssFirst.left = 0;
	opts.cssBefore.left = -w;
	opts.cssBefore.top = 0;
	opts.animIn.left = 0;
	opts.animOut.left = w;
};
$.fn.cycle.transitions.scrollHorz = function($cont, $slides, opts) {
	$cont.css('overflow','hidden').width();
	opts.before.push(function(curr, next, opts, fwd) {
		if (opts.rev)
			fwd = !fwd;
		$.fn.cycle.commonReset(curr,next,opts);
		opts.cssBefore.left = fwd ? (next.cycleW-1) : (1-next.cycleW);
		opts.animOut.left = fwd ? -curr.cycleW : curr.cycleW;
	});
	opts.cssFirst.left = 0;
	opts.cssBefore.top = 0;
	opts.animIn.left = 0;
	opts.animOut.top = 0;
};
$.fn.cycle.transitions.scrollVert = function($cont, $slides, opts) {
	$cont.css('overflow','hidden');
	opts.before.push(function(curr, next, opts, fwd) {
		if (opts.rev)
			fwd = !fwd;
		$.fn.cycle.commonReset(curr,next,opts);
		opts.cssBefore.top = fwd ? (1-next.cycleH) : (next.cycleH-1);
		opts.animOut.top = fwd ? curr.cycleH : -curr.cycleH;
	});
	opts.cssFirst.top = 0;
	opts.cssBefore.left = 0;
	opts.animIn.top = 0;
	opts.animOut.left = 0;
};

// slideX/slideY
$.fn.cycle.transitions.slideX = function($cont, $slides, opts) {
	opts.before.push(function(curr, next, opts) {
		$(opts.elements).not(curr).hide();
		$.fn.cycle.commonReset(curr,next,opts,false,true);
		opts.animIn.width = next.cycleW;
	});
	opts.cssBefore.left = 0;
	opts.cssBefore.top = 0;
	opts.cssBefore.width = 0;
	opts.animIn.width = 'show';
	opts.animOut.width = 0;
};
$.fn.cycle.transitions.slideY = function($cont, $slides, opts) {
	opts.before.push(function(curr, next, opts) {
		$(opts.elements).not(curr).hide();
		$.fn.cycle.commonReset(curr,next,opts,true,false);
		opts.animIn.height = next.cycleH;
	});
	opts.cssBefore.left = 0;
	opts.cssBefore.top = 0;
	opts.cssBefore.height = 0;
	opts.animIn.height = 'show';
	opts.animOut.height = 0;
};

// shuffle
$.fn.cycle.transitions.shuffle = function($cont, $slides, opts) {
	var i, w = $cont.css('overflow', 'visible').width();
	$slides.css({left: 0, top: 0});
	opts.before.push(function(curr,next,opts) {
		$.fn.cycle.commonReset(curr,next,opts,true,true,true);
	});
	// only adjust speed once!
	if (!opts.speedAdjusted) {
		opts.speed = opts.speed / 2; // shuffle has 2 transitions
		opts.speedAdjusted = true;
	}
	opts.random = 0;
	opts.shuffle = opts.shuffle || {left:-w, top:15};
	opts.els = [];
	for (i=0; i < $slides.length; i++)
		opts.els.push($slides[i]);

	for (i=0; i < opts.currSlide; i++)
		opts.els.push(opts.els.shift());

	// custom transition fn (hat tip to Benjamin Sterling for this bit of sweetness!)
	opts.fxFn = function(curr, next, opts, cb, fwd) {
		if (opts.rev)
			fwd = !fwd;
		var $el = fwd ? $(curr) : $(next);
		$(next).css(opts.cssBefore);
		var count = opts.slideCount;
		$el.animate(opts.shuffle, opts.speedIn, opts.easeIn, function() {
			var hops = $.fn.cycle.hopsFromLast(opts, fwd);
			for (var k=0; k < hops; k++)
				fwd ? opts.els.push(opts.els.shift()) : opts.els.unshift(opts.els.pop());
			if (fwd) {
				for (var i=0, len=opts.els.length; i < len; i++)
					$(opts.els[i]).css('z-index', len-i+count);
			}
			else {
				var z = $(curr).css('z-index');
				$el.css('z-index', parseInt(z,10)+1+count);
			}
			$el.animate({left:0, top:0}, opts.speedOut, opts.easeOut, function() {
				$(fwd ? this : curr).hide();
				if (cb) cb();
			});
		});
	};
	$.extend(opts.cssBefore, { display: 'block', opacity: 1, top: 0, left: 0 });
};

// turnUp/Down/Left/Right
$.fn.cycle.transitions.turnUp = function($cont, $slides, opts) {
	opts.before.push(function(curr, next, opts) {
		$.fn.cycle.commonReset(curr,next,opts,true,false);
		opts.cssBefore.top = next.cycleH;
		opts.animIn.height = next.cycleH;
		opts.animOut.width = next.cycleW;
	});
	opts.cssFirst.top = 0;
	opts.cssBefore.left = 0;
	opts.cssBefore.height = 0;
	opts.animIn.top = 0;
	opts.animOut.height = 0;
};
$.fn.cycle.transitions.turnDown = function($cont, $slides, opts) {
	opts.before.push(function(curr, next, opts) {
		$.fn.cycle.commonReset(curr,next,opts,true,false);
		opts.animIn.height = next.cycleH;
		opts.animOut.top   = curr.cycleH;
	});
	opts.cssFirst.top = 0;
	opts.cssBefore.left = 0;
	opts.cssBefore.top = 0;
	opts.cssBefore.height = 0;
	opts.animOut.height = 0;
};
$.fn.cycle.transitions.turnLeft = function($cont, $slides, opts) {
	opts.before.push(function(curr, next, opts) {
		$.fn.cycle.commonReset(curr,next,opts,false,true);
		opts.cssBefore.left = next.cycleW;
		opts.animIn.width = next.cycleW;
	});
	opts.cssBefore.top = 0;
	opts.cssBefore.width = 0;
	opts.animIn.left = 0;
	opts.animOut.width = 0;
};
$.fn.cycle.transitions.turnRight = function($cont, $slides, opts) {
	opts.before.push(function(curr, next, opts) {
		$.fn.cycle.commonReset(curr,next,opts,false,true);
		opts.animIn.width = next.cycleW;
		opts.animOut.left = curr.cycleW;
	});
	$.extend(opts.cssBefore, { top: 0, left: 0, width: 0 });
	opts.animIn.left = 0;
	opts.animOut.width = 0;
};

// zoom
$.fn.cycle.transitions.zoom = function($cont, $slides, opts) {
	opts.before.push(function(curr, next, opts) {
		$.fn.cycle.commonReset(curr,next,opts,false,false,true);
		opts.cssBefore.top = next.cycleH/2;
		opts.cssBefore.left = next.cycleW/2;
		$.extend(opts.animIn, { top: 0, left: 0, width: next.cycleW, height: next.cycleH });
		$.extend(opts.animOut, { width: 0, height: 0, top: curr.cycleH/2, left: curr.cycleW/2 });
	});
	opts.cssFirst.top = 0;
	opts.cssFirst.left = 0;
	opts.cssBefore.width = 0;
	opts.cssBefore.height = 0;
};

// fadeZoom
$.fn.cycle.transitions.fadeZoom = function($cont, $slides, opts) {
	opts.before.push(function(curr, next, opts) {
		$.fn.cycle.commonReset(curr,next,opts,false,false);
		opts.cssBefore.left = next.cycleW/2;
		opts.cssBefore.top = next.cycleH/2;
		$.extend(opts.animIn, { top: 0, left: 0, width: next.cycleW, height: next.cycleH });
	});
	opts.cssBefore.width = 0;
	opts.cssBefore.height = 0;
	opts.animOut.opacity = 0;
};

// blindX
$.fn.cycle.transitions.blindX = function($cont, $slides, opts) {
	var w = $cont.css('overflow','hidden').width();
	opts.before.push(function(curr, next, opts) {
		$.fn.cycle.commonReset(curr,next,opts);
		opts.animIn.width = next.cycleW;
		opts.animOut.left   = curr.cycleW;
	});
	opts.cssBefore.left = w;
	opts.cssBefore.top = 0;
	opts.animIn.left = 0;
	opts.animOut.left = w;
};
// blindY
$.fn.cycle.transitions.blindY = function($cont, $slides, opts) {
	var h = $cont.css('overflow','hidden').height();
	opts.before.push(function(curr, next, opts) {
		$.fn.cycle.commonReset(curr,next,opts);
		opts.animIn.height = next.cycleH;
		opts.animOut.top   = curr.cycleH;
	});
	opts.cssBefore.top = h;
	opts.cssBefore.left = 0;
	opts.animIn.top = 0;
	opts.animOut.top = h;
};
// blindZ
$.fn.cycle.transitions.blindZ = function($cont, $slides, opts) {
	var h = $cont.css('overflow','hidden').height();
	var w = $cont.width();
	opts.before.push(function(curr, next, opts) {
		$.fn.cycle.commonReset(curr,next,opts);
		opts.animIn.height = next.cycleH;
		opts.animOut.top   = curr.cycleH;
	});
	opts.cssBefore.top = h;
	opts.cssBefore.left = w;
	opts.animIn.top = 0;
	opts.animIn.left = 0;
	opts.animOut.top = h;
	opts.animOut.left = w;
};

// growX - grow horizontally from centered 0 width
$.fn.cycle.transitions.growX = function($cont, $slides, opts) {
	opts.before.push(function(curr, next, opts) {
		$.fn.cycle.commonReset(curr,next,opts,false,true);
		opts.cssBefore.left = this.cycleW/2;
		opts.animIn.left = 0;
		opts.animIn.width = this.cycleW;
		opts.animOut.left = 0;
	});
	opts.cssBefore.top = 0;
	opts.cssBefore.width = 0;
};
// growY - grow vertically from centered 0 height
$.fn.cycle.transitions.growY = function($cont, $slides, opts) {
	opts.before.push(function(curr, next, opts) {
		$.fn.cycle.commonReset(curr,next,opts,true,false);
		opts.cssBefore.top = this.cycleH/2;
		opts.animIn.top = 0;
		opts.animIn.height = this.cycleH;
		opts.animOut.top = 0;
	});
	opts.cssBefore.height = 0;
	opts.cssBefore.left = 0;
};

// curtainX - squeeze in both edges horizontally
$.fn.cycle.transitions.curtainX = function($cont, $slides, opts) {
	opts.before.push(function(curr, next, opts) {
		$.fn.cycle.commonReset(curr,next,opts,false,true,true);
		opts.cssBefore.left = next.cycleW/2;
		opts.animIn.left = 0;
		opts.animIn.width = this.cycleW;
		opts.animOut.left = curr.cycleW/2;
		opts.animOut.width = 0;
	});
	opts.cssBefore.top = 0;
	opts.cssBefore.width = 0;
};
// curtainY - squeeze in both edges vertically
$.fn.cycle.transitions.curtainY = function($cont, $slides, opts) {
	opts.before.push(function(curr, next, opts) {
		$.fn.cycle.commonReset(curr,next,opts,true,false,true);
		opts.cssBefore.top = next.cycleH/2;
		opts.animIn.top = 0;
		opts.animIn.height = next.cycleH;
		opts.animOut.top = curr.cycleH/2;
		opts.animOut.height = 0;
	});
	opts.cssBefore.height = 0;
	opts.cssBefore.left = 0;
};

// cover - curr slide covered by next slide
$.fn.cycle.transitions.cover = function($cont, $slides, opts) {
	var d = opts.direction || 'left';
	var w = $cont.css('overflow','hidden').width();
	var h = $cont.height();
	opts.before.push(function(curr, next, opts) {
		$.fn.cycle.commonReset(curr,next,opts);
		if (d == 'right')
			opts.cssBefore.left = -w;
		else if (d == 'up')
			opts.cssBefore.top = h;
		else if (d == 'down')
			opts.cssBefore.top = -h;
		else
			opts.cssBefore.left = w;
	});
	opts.animIn.left = 0;
	opts.animIn.top = 0;
	opts.cssBefore.top = 0;
	opts.cssBefore.left = 0;
};

// uncover - curr slide moves off next slide
$.fn.cycle.transitions.uncover = function($cont, $slides, opts) {
	var d = opts.direction || 'left';
	var w = $cont.css('overflow','hidden').width();
	var h = $cont.height();
	opts.before.push(function(curr, next, opts) {
		$.fn.cycle.commonReset(curr,next,opts,true,true,true);
		if (d == 'right')
			opts.animOut.left = w;
		else if (d == 'up')
			opts.animOut.top = -h;
		else if (d == 'down')
			opts.animOut.top = h;
		else
			opts.animOut.left = -w;
	});
	opts.animIn.left = 0;
	opts.animIn.top = 0;
	opts.cssBefore.top = 0;
	opts.cssBefore.left = 0;
};

// toss - move top slide and fade away
$.fn.cycle.transitions.toss = function($cont, $slides, opts) {
	var w = $cont.css('overflow','visible').width();
	var h = $cont.height();
	opts.before.push(function(curr, next, opts) {
		$.fn.cycle.commonReset(curr,next,opts,true,true,true);
		// provide default toss settings if animOut not provided
		if (!opts.animOut.left && !opts.animOut.top)
			$.extend(opts.animOut, { left: w*2, top: -h/2, opacity: 0 });
		else
			opts.animOut.opacity = 0;
	});
	opts.cssBefore.left = 0;
	opts.cssBefore.top = 0;
	opts.animIn.left = 0;
};

// wipe - clip animation
$.fn.cycle.transitions.wipe = function($cont, $slides, opts) {
	var w = $cont.css('overflow','hidden').width();
	var h = $cont.height();
	opts.cssBefore = opts.cssBefore || {};
	var clip;
	if (opts.clip) {
		if (/l2r/.test(opts.clip))
			clip = 'rect(0px 0px '+h+'px 0px)';
		else if (/r2l/.test(opts.clip))
			clip = 'rect(0px '+w+'px '+h+'px '+w+'px)';
		else if (/t2b/.test(opts.clip))
			clip = 'rect(0px '+w+'px 0px 0px)';
		else if (/b2t/.test(opts.clip))
			clip = 'rect('+h+'px '+w+'px '+h+'px 0px)';
		else if (/zoom/.test(opts.clip)) {
			var top = parseInt(h/2,10);
			var left = parseInt(w/2,10);
			clip = 'rect('+top+'px '+left+'px '+top+'px '+left+'px)';
		}
	}

	opts.cssBefore.clip = opts.cssBefore.clip || clip || 'rect(0px 0px 0px 0px)';

	var d = opts.cssBefore.clip.match(/(\d+)/g);
	var t = parseInt(d[0],10), r = parseInt(d[1],10), b = parseInt(d[2],10), l = parseInt(d[3],10);

	opts.before.push(function(curr, next, opts) {
		if (curr == next) return;
		var $curr = $(curr), $next = $(next);
		$.fn.cycle.commonReset(curr,next,opts,true,true,false);
		opts.cssAfter.display = 'block';

		var step = 1, count = parseInt((opts.speedIn / 13),10) - 1;
		(function f() {
			var tt = t ? t - parseInt(step * (t/count),10) : 0;
			var ll = l ? l - parseInt(step * (l/count),10) : 0;
			var bb = b < h ? b + parseInt(step * ((h-b)/count || 1),10) : h;
			var rr = r < w ? r + parseInt(step * ((w-r)/count || 1),10) : w;
			$next.css({ clip: 'rect('+tt+'px '+rr+'px '+bb+'px '+ll+'px)' });
			(step++ <= count) ? setTimeout(f, 13) : $curr.css('display', 'none');
		})();
	});
	$.extend(opts.cssBefore, { display: 'block', opacity: 1, top: 0, left: 0 });
	opts.animIn	   = { left: 0 };
	opts.animOut   = { left: 0 };
};

})(jQuery);
/*
* JCE Utilities 2.2.0
*
* @version $Id$
* @package JCE Utilites
* @copyright Copyright (C) 2006-2009 Ryan Demmer. All rights reserved.
* @license http://www.gnu.org/copyleft/gpl.html GNU/GPL, see LICENSE.php
* This version may have been modified pursuant
* to the GNU General Public License, and as distributed it includes or
* is derivative of works licensed under the GNU General Public License or
* other free or open source software licenses.
*
*/
window.extend({getWidth:function(){return document.documentElement.clientWidth||document.body.clientWidth||this.innerWidth||0;},getHeight:function(){return document.documentElement.clientHeight||document.body.clientHeight||this.innerHeight||0;},getScrollHeight:function(){return document.documentElement.scrollHeight||document.body.scrollHeight||0;},getScrollWidth:function(){return document.documentElement.scrollWidth||document.body.scrollWidth||0;},getScrollTop:function(){return document.documentElement.scrollTop||this.pageYOffset||document.body.scrollTop||0;}});var JCETips=new Class({getOptions:function(){return{classname:'tooltip',opacity:1,speed:150,position:'br',offsets:{'x':16,'y':16}};},initialize:function(elements,options){this.setOptions(this.getOptions(),options);$$(elements).addEvents({'mouseover':this.show.bindWithEvent(this),'mousemove':this.locate.bindWithEvent(this),'mouseout':this.hide.bindWithEvent(this),'mousedown':this.hide.bindWithEvent(this),'blur':this.hide.bindWithEvent(this)});},show:function(e){var el=e.target,text=el.title||'',title='';if(/::/.test(text)){var parts=text.split('::');title=parts[0].trim();text=parts[1].trim();}var cls=el.className.replace(/(jce_?)tooltip/gi,'');this.tip=new Element('div').addClass(cls).addClass(this.options.classname).setStyles({'position':'absolute','visibility':'hidden'}).injectInside($E('body'));this.tip.title=el.title;$(el).setProperty('title','');if(title){new Element('h4').setHTML(title).injectInside($(this.tip));}new Element('p').setHTML(text).injectInside($(this.tip));new Fx.Style(this.tip,'opacity',{duration:this.options.speed}).start(0,this.options.opacity);this.exists=true;},locate:function(e){if(this.exists){var o=this.options.offsets;var page=e.page;var tip={'x':this.tip.offsetWidth,'y':this.tip.offsetHeight};var pos={'x':page.x+o.x,'y':page.y+o.y};switch(this.options.position){case'tl':pos.x=(page.x-tip.x)-o.x;pos.y=(page.y-tip.y)-o.y;break;case'tr':pos.x=page.x+o.x;pos.y=(page.y-tip.y)-o.y;break;case'tc':pos.x=(page.x-Math.round((tip.x/2)))+o.x;pos.y=(page.y-tip.y)-o.y;break;case'bl':pos.x=(page.x-tip.x)-o.x;pos.y=(page.y+tip.y)-o.y;break;case'br':pos.x=page.x+o.x;pos.y=page.y+o.y;break;case'bc':pos.x=(page.x-Math.round((tip.x/2)))+o.x;pos.y=(page.y+tip.y)-o.y;break;}$(this.tip).setStyles({top:pos.y+'px',left:pos.x+'px'});}},hide:function(e){if(this.exists){$(e.target).setProperty('title',this.tip.title);new Fx.Style(this.tip,'opacity',{duration:this.options.speed,onComplete:function(){$(this.tip).remove();}.bind(this)}).start(this.options.opacity,0);}this.exists=false;}});JCETips.implement(new Events,new Options);var JCEUtilities=new Class({getOptions:function(){return{popup:{legacy:0,overlay:1,overlayopacity:0.8,overlaycolor:'#000000',resize:1,icons:1,fadespeed:500,scalespeed:500,theme:'standard',themecustom:'',themepath:'plugins/system/jceutilities/themes',hideobjects:1,scrollpopup:1,onclose:Class.empty},tooltip:{className:'tooltip',showDelay:150,hideDelay:150,offsets:{x:16,y:16}},pngfix:1,wmode:0,imgpath:'plugins/system/jceutilities/img'};},getSite:function(){$ES('script[src$=jceutilities-220.js], script[src$=jceutilities-220-src.js]').each(function(el){s=el.src;});s=s.substring(0,s.lastIndexOf('plugins/system/jceutilities/js'))||'';if(/:\/\//.test(s)){s=s.match(/.*:\/\/[^\/]+(.*)/)[1];}return s;},initialize:function(options){this.setOptions(this.getOptions(),options);this.popup();this.tooltip();if(this.options.pngfix==1&&window.ie6){this._pngFix();}return this;},_pngFix:function(){var s,bg,site=this.getSite();$ES('img[src$=.png]',$E('body')).each(function(el){$(el).setStyle('filter',"progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+el.src+"', sizingMethod='')");el.src=site+'plugins/system/jceutilities/img/blank.gif';});$ES('*',$E('body')).each(function(el){s=$(el).getStyle('background-image');if(s&&/\.png/i.test(s)){bg=/url\("(.*)"\)/.exec(s)[1];$(el).setStyle('background-image','none');$(el).setStyle('filter',"progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+bg+"',sizingMethod='')");}});},_wmodeFix:function(){$ES('object').each(function(el){if(el.classid.toLowerCase()=='clsid:d27cdb6e-ae6d-11cf-96b8-444553540000'||el.type.toLowerCase()=='application/x-shockwave-flash'){if(!el.wmode||el.wmode.toLowerCase()=='window'){el.wmode='opaque';if(typeof el.outerHTML=='undefined'){$(el).replaceWith($(el).clone(true));}else{el.outerHTML=el.outerHTML;}}}});$ES('embed[type=application/x-shockwave-flash]').each(function(el){var wm=$(el).getProperty('wmode');if(!wm||wm.toLowerCase()=='window'){$(el).setProperty('wmode','opaque');if(typeof el.outerHTML=='undefined'){$(el).replaceWith($(el).clone(true));}else{el.outerHTML=el.outerHTML;}}});},tooltip:function(){new JCETips($ES('.jcetooltip, .jce_tooltip'),this.options.tooltip);},convert:function(){this.site=this.getSite();$ES('a[href^=jce]').each(function(el){var p,s;s=this._cleanEvent($(el).getProperty('onclick')).replace(/&amp;/g,'&').replace(/&#39;/g,"'").split("'");p=this._params(s[1]);img=p['img'];if(!/http:\/\//.test(img)){if(img.charAt(0)=='/'){img=img.substr(1);}img=this.site.replace(/http:\/\/([^\/]+)/,'')+img;}el.setProperties({'href':img,'title':p['title'].replace(/_/,' '),'onclick':''}).addClass('jcepopup').removeProperty('onclick');}.bind(this));},popup:function(){var t=this;this.popups=[];this.theme='';this.site=this.getSite();if(this.options.popup.legacy==1){this.convert();}$ES('.jcebox, .jcelightbox, .jcepopup').each(function(el){if(this.options.popup.icons==1&&el.nodeName=='A'&&!/(noicon|icon-none)/.test(el.className)){this._zoom(el);}if(!el.hasClass('nopopup')){var title=el.title||'';if(title&&/(\[.*\])/.test(title)){p=this._params(title);$(el).setProperty('rel',title+';group['+el.rel+']');$(el).setProperty('title',p.title||'');}this.popups.push(el);$(el).addEvent('click',function(e){e=new Event(e);e.stop();return this._start(el);}.bind(this))}}.bind(this));var theme=this.options.popup.theme=='custom'?this.options.popup.themecustom:this.options.popup.theme;new Ajax(this.site+this.options.popup.themepath+'/'+theme+'/theme.html',{method:'get',onComplete:function(data){var re=/<!-- THEME START -->([\s\S]*?)<!-- THEME END -->/;if(re.test(data)){data=re.exec(data)[1];}this.theme=data;}.bind(this)}).request();this.scrollbarWidth=this._getScrollbarWidth();},_getScrollbarWidth:function(){var inner=new Element('div').setStyles({width:'100%',height:200,border:0,margin:0,padding:0});var outer=new Element('div').setStyles({position:'absolute',visibility:'hidden',width:200,height:200,border:0,margin:0,padding:0,overflow:'hidden'}).injectInside(document.body).adopt(inner);var w1=parseInt(inner.offsetWidth);outer.style.overflow='scroll';var w2=parseInt(inner.offsetWidth);if(w1==w2){w2=parseInt(outer.clientWidth);}outer.remove();return(w1-w2);},_cleanEvent:function(s){return s.replace(/^function\s+anonymous\(\)\s+\{\s+(.*)\s+\}$/,'$1');},_params:function(s){var p={},x=s.split(/;/g)||s.split(/\&/g);x.each(function(n){v=n.match(/^(.+)\[(.*)\]$|^(.+)=(.*)$|^(.+):(.*)$/);if(v){if(!/[^0-9]/.test(v[2])){v[2]=parseInt(v[2]);}p[v[1]]=v[2];}}.bind(this));return p;},_png:function(el){var s;if(el.nodeName=='IMG'){s=el.src;if(/\.png$/i.test(s)){$(el).setProperty('src',this.site+'plugins/system/jceutilities/img/blank.gif').setStyle('filter','progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\''+s+'\'');}}else{s=$(el).getStyle('background-image');if(/\.png/i.test(s)){var bg=/url\("(.*)"\)/.exec(s)[1];$(el).setStyles({'background-image':'none','filter':"progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+bg+"')"});}}},_zoom:function(el){var s,m,x,y;var child=$E('img',el);var zoom=new Element('span');if(child){var w=$(child).getProperty('width')||$(child).getStyle('width')||0;var h=$(child).getProperty('height')||$(child).getStyle('height')||0;var align=$(child).getProperty('align');var vspace=$(child).getProperty('vspace');var hspace=$(child).getProperty('hspace');var styles={width:parseInt(w),height:parseInt(h)};if(align){$extend(styles,{'float':/left|right/.test(align)?align:'','text-align':/top|middle|bottom/.test(align)?align:''});}if(vspace){$extend(styles,{'margin-top':vspace+'px','margin-bottom':vspace+'px'});}if(hspace){$extend(styles,{'margin-left':hspace+'px','margin-right':hspace+'px'});}function _buildIcon(el,zoom,child,styles){var lft,top,w=styles.width,h=styles.height;var span=new Element('span').setStyles($(child).style.cssText).setStyles(styles).adopt(child).adopt(zoom);$each(['style','align','border','hspace','vspace'],function(s){child.removeProperty(s);});if(parseInt(span.getStyle('border-width'))==0)child.setStyle('border',0);m=el.className.match(/icon-(top-right|top-left|bottom-right|bottom-left|left|right)/)||['icon-right','right'];switch(m[1]){case'top-right':lft=w-20;top=-h;break;case'top-left':lft=0;top=-h;break;default:case'right':case'bottom-right':lft=w-20;top=-20;break;case'left':case'bottom-left':lft=0;top=-20;break;}$(zoom).setStyles({'margin-left':lft,'margin-top':top}).addClass('zoom-image');el.adopt(span);}if(/^(0|auto)/.test(w)||/^(0|auto)/.test(h)){x=new Image();x.src=$(child).src;x.onload=function(){$extend(styles,{width:parseInt(x.width),height:parseInt(x.height)});_buildIcon(el,zoom,child,styles);}}else{_buildIcon(el,zoom,child,styles);}}else{$(zoom).addClass('zoom-link');if(/icon-left/.test(el.className)){$(zoom).injectTop(el);}else{$(zoom).injectInside(el);}}if(window.ie6){s=$(zoom).getStyle('background-image');if(s&&/\.png/i.test(s)){s=/url\("(.+)"\)/.exec(s)[1];$(zoom).setStyle('background-image','none');$(zoom).setStyle('filter',"progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+s+"')");}}else{$(zoom).setStyle('position','relative');}},open:function(s,t,d){var link={};if(typeof s=='string'){link={'href':s,'title':t||'','type':d||''};}return this._start(link);},_group:function(s){var p;if(/(\[.*\])/.test(s)){p=this._params(s);return p.group||'';}else{return s;}},_styles:function(o){var v,s,x=[];if(!o)return{};o.split(';').each(function(s){s=s.replace(/(.*):(.*)/,function(a,b,c){return"'"+b+"':'"+c+"'";});x.push(s);});return Json.evaluate('{'+x.join(',')+'}');},_build:function(){var t=this;this.page=new Element('div',{id:'jcepopup-page'}).injectInside(document.body);if(this.options.popup.overlay==1){this.overlay=new Element('div',{'id':'jcepopup-overlay',styles:{opacity:'0','background-color':this.options.popup.overlaycolor},events:{click:function(){this.close();}.bind(this)}}).injectInside(this.page);}this.frame=new Element('div',{id:'jcepopup-frame'}).injectInside(this.page);if(window.ie6){$(this.overlay).setStyle('height',window.getScrollHeight());$(this.page).setStyle('position','absolute').setStyle('top',window.getScrollTop());}if(!this.theme){this.theme='<div id="jcepopup-container">';this.theme+='<div id="jcepopup-loader"></div>';this.theme+='<div id="jcepopup-content"></div>';this.theme+='<a id="jcepopup-closelink" href="javascript:;" title="Close"></a>';this.theme+='<div id="jcepopup-info">';this.theme+='<div id="jcepopup-caption"></div>';this.theme+='<div id="jcepopup-nav">';this.theme+='<a id="jcepopup-prev" href="javascript:;" title="Previous"></a>';this.theme+='<a id="jcepopup-next" href="javascript:;" title="Next"></a>';this.theme+='<span id="jcepopup-numbers"></span>';this.theme+='</div>';this.theme+='</div>';this.theme+='</div>';}this.theme=this.theme.replace(/<!--(.*?)-->/g,'');$(this.frame).adopt(new Element('div',{id:'jcepopup-body'}).setHTML(this.theme));['body','container','content','loader','closelink','cancellink','info-top','info-bottom','caption','next','prev','numbers'].each(function(s){if($('jcepopup-'+s))t[s]=$('jcepopup-'+s).setStyle('display','none');});if(this.closelink){$(this.closelink).addEvent('click',function(){this.close();}.bind(this));}if(this.cancellink){$(this.cancellink).addEvent('click',function(){this.close();}.bind(this));}if(this.next){$(this.next).addEvent('click',function(){this._next();}.bind(this));}if(this.prev){$(this.prev).addEvent('click',function(){this._previous();}.bind(this));}if(window.ie6){this._png(this.body);$ES('*',this.body).each(function(el){if(el.id=='jcepopup-content')return;this._png(el);}.bind(this));}},_start:function(link){var t=this,n=0,items=[];this._build();if(link.nodeName=='undefined'){items.push(link);}else if(link.nodeName=='AREA'||/(^[\[\]]+)|group\[.+\]|\w+/.test(link.rel)){if(/nogroup/.test(link.className)){items.push(link);}else{if(link.nodeName=='AREA'){$(link).parent('map').children('area').each(function(i,el){items.push(el);if(el.href==link.href){n=i;}});}else{var i=0;this.popups.each(function(el){if(el.rel){if(t._group(el.rel)==t._group(link.rel)){items.push(el);if(el.href==link.href){n=i;}i++;}}});}}}else{items.push(link);}return this._open(items,n);},_open:function(items,n){var t=this;this.items=items;this._bind(true);$(this.body).setStyle('display','').setStyle('top',(window.getHeight()-this._outerHeight(this.body))/2);if(this.options.popup.overlay==1&&$(this.overlay)){new Fx.Style(this.overlay,'opacity',{duration:this.options.popup.fadespeed}).start(0,this.options.popup.overlayopacity);}return this._change(n);},_bind:function(open){var t=this;if(window.ie6){$ES('select').each(function(el){if(open){el.tmpStyle=el.style.visibility;}el.setStyle('visibility',open?'hidden':el.tmpStyle);}.bind(this));}if(this.options.popup.hideobjects){$ES('object,embed').each(function(el){if(el.id=='jcepopup-object')return;if(open){el.tmpStyle=el.style.visibility;}el.style.visibility=open?'hidden':el.tmpStyle;}.bind(this));}if(open){$(document).addEvent('keydown',function(e){e=new Event(e);this._listener(e);}.bind(this));if(window.ie6){window.addEvent('scroll',function(){$(this.overlay).setStyle('height',window.getScrollHeight());}.bind(this));window.addEvent('resize',function(){$(this.overlay).setStyle('width',window.getScrollWidth());}.bind(this));}}else{if(window.ie6){window.removeEvent('scroll');window.removeEvent('resize');}$(document).removeEvent('keydown');}},_listener:function(e){switch(e.code){case 27:case 88:case 67:this.close();break;case 37:case 80:this._previous();break;case 39:case 78:this._next();break;}},_media:function(c){var ci,cb,mt;switch(c){case'director':case'application/x-director':ci='166b1bca-3f9c-11cf-8075-444553540000';cb='http://download.macromedia.com/pub/shockwave/cabs/director/sw.cab#version=8,5,1,0';mt='application/x-director';break;case'windowsmedia':case'mplayer':case'application/x-mplayer2':ci='6bf52a52-394a-11d3-b153-00c04f79faa6';cb='http://activex.microsoft.com/activex/controls/mplayer/en/nsmp2inf.cab#Version=5,1,52,701';mt='application/x-mplayer2';break;case'quicktime':case'video/quicktime':ci='02bf25d5-8c17-4b23-bc80-d3488abddc6b';cb='http://www.apple.com/qtactivex/qtplugin.cab#version=6,0,2,0';mt='video/quicktime';break;case'real':case'realaudio':case'audio/x-pn-realaudio-plugin':ci='cfcdaa03-8be4-11cf-b84b-0020afbbccfa';cb='http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,0,0';mt='audio/x-pn-realaudio-plugin';break;case'divx':case'video/divx':ci='67dabfbf-d0ab-41fa-9c46-cc0f21721616';cb='http://go.divx.com/plugin/DivXBrowserPlugin.cab';mt='video/divx';break;default:case'flash':case'application/x-shockwave-flash':ci='d27cdb6e-ae6d-11cf-96b8-444553540000';cb='http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,124,0';mt='application/x-shockwave-flash';break;}return{'classid':ci,'codebase':cb,'mediatype':mt};},_local:function(s){return(!/:\/\//.test(this.active.src)||this.active.src.indexOf(this.site)!=-1);},_outerWidth:function(n){var i,x=0;['padding-left','padding-right','border-left','border-right','width'].each(function(s){i=parseInt($(n).getStyle(s));i=/[^0-9]/.test(i)?0:i;x=x+i;});return x;},_outerHeight:function(n){var i,x=0;['padding-top','padding-bottom','border-top','border-bottom','height'].each(function(s){i=parseInt($(n).getStyle(s));i=/[^0-9]/.test(i)?0:i;x=x+i;});return x;},_frameWidth:function(){var w=0;['left','right'].each(function(s){w=w+parseInt($(this.frame).getStyle('padding-'+s));}.bind(this));return parseInt($(this.frame).clientWidth)-w;},_frameHeight:function(){var h=0;['top','bottom'].each(function(s){h=h+parseInt($(this.frame).getStyle('padding-'+s));}.bind(this));h=h+(window.ie6?this.scrollbarWidth:0);return parseInt(window.getHeight())-h;},_width:function(){return this._frameWidth()-this.scrollbarWidth;},_height:function(){var h=0;['top','bottom'].each(function(s){if(this['info-'+s]){h=h+parseInt(this._outerHeight(this['info-'+s]));}}.bind(this));return this._frameHeight()-(h+this.scrollbarWidth);},_next:function(){if(this.items.length==1)return false;var n=this.index+1;if(n<0||n>=this.items.length){return false;}return this._queue(n);},_previous:function(){if(this.items.length==1)return false;var n=this.index-1;if(n<0||n>=this.items.length){return false;}return this._queue(n);},_queue:function(n){var fs=this.options.popup.fadespeed,ss=this.options.popup.scalespeed;var t=this;var changed=false;['top','bottom'].each(function(s){var el=$(this['info-'+s]);if(el){var h=this._outerHeight(el);var m=s=='top'?'bottom':'top';el.setStyle('z-index',-1);new Fx.Style(el,m,{duration:ss,onComplete:function(){if(!changed){changed=true;return this._change(n);}}.bind(this)}).start(-h);}}.bind(this));},_info:function(){if(this.caption){var title=this.active.title||'',caption='';if(/:\/\//.test(title)){title='<a href="'+title+'" target="_blank">'+title+'</a>';}caption='<p>'+title+'</p>';if(/::/.test(title)){var parts=title.split('::');caption='<h4>'+parts[0]+'</h4>';if(parts[1]){caption+='<p>'+parts[1]+'</p>';}}$(this.caption).setHTML(caption).setStyle('display','');}var html='',i,len=this.items.length;if(len>1){for(i=0;i<len;i++){var n=i+1;html+='<a href="javascript:;"';if(this.index==i){html+=' class="active"';}html+='>'+n+'</a>';}if(this.prev){if(this.index>0){$(this.prev).setStyle('display','');}else{$(this.prev).setStyle('display','none');}}if(this.next){if(this.index<len-1){$(this.next).setStyle('display','');}else{$(this.next).setStyle('display','none');}}}if(this.numbers){$(this.numbers).setHTML(html).getChildren().each(function(el){if(el.nodeName=='A'){if(!$(el).hasClass('active')){$(el).addEvent('click',function(){this._queue(parseInt($(el).getText())-1);}.bind(this));}$(el).setStyle('display','');}}.bind(this));$(this.numbers).setStyle('display','');}['top','bottom'].each(function(s){if(this['info-'+s]){$(this['info-'+s]).setStyles({'display':'','visibility':'hidden'});}}.bind(this));if(this.closelink){$(this.closelink).setStyle('display','');}},_change:function(n){var t=this,p={},s,i,w,h;if(n<0||n>=this.items.length){return false;}this.index=n;this.active={};$(this.container).setStyle('display','');if(this.loader){$(this.loader).setStyle('display','');}if(this.cancellink){$(this.cancellink).setStyle('display','');}if(this.object){this.object=null;}$(this.content).empty();i=this.items[n];function getParams(t,i){if(i.rel&&/(\[.*\])/.test(i.rel)){return t._params(i.rel);}else if(i.title&&/(\[.*\])/.test(i.title)){return t._params(i.title);}else{s=i.href;if(/\?/.test(s)){s=s.replace(/^[^\?]+\??/,'').replace(/&amp;/gi,'&');}return t._params(s);}}p=getParams(this,i);$extend(this.active,{'src':i.href,'title':p.title||i.title||'','type':i.type||i.className||'','params':p,'width':p.width||0,'height':p.height||0});this._info();if(/(youtube|videoplay|googleplayer|metacafe|vimeo|\.swf)/i.test(this.active.src)){this.active.type='flash';}if(/\.(jpg|jpeg|png|gif|bmp|tif)$/i.test(this.active.src)){this.active.type='image';this.img=new Image();this.img.onload=function(){return t._setup();};this.img.src=this.active.src;}else if(/(flash|director|shockwave|mplayer|windowsmedia|quicktime|realaudio|real|divx)/i.test(this.active.type)){p.src=this.active.src;var base=/:\/\//.test(p.src)?'':this.site;this.object='';w=this._width();h=this._height();if(/youtube(.+)\/(watch\?v=|v\/)(.+)/.test(p.src)){p.src=p.src.replace(/watch\?v=/,'v/');w=this.active.width||425;h=this.active.height||344;}if(/google(.+)\/(videoplay|googleplayer\.swf)\?docid=(.+)/.test(p.src)){p.src=p.src.replace(/videoplay/,'googleplayer.swf');w=this.active.width||425;h=this.active.height||326;}if(/metacafe(.+)\/(watch|fplayer)\/(.+)/.test(p.src)){var s=p.src.trim();if(!/\.swf/i.test(s)){if(s.charAt(s.length-1)=='/'){s=s.substring(0,s.length-1);}s=s+'.swf';}p.src=s.replace(/watch/i,'fplayer');w=this.active.width||400;h=this.active.height||345;}if(/vimeo.com\/([0-9]+)/.test(p.src)){p.src=p.src.replace(/vimeo.com\/([0-9]+?)/,'vimeo.com/moogaloop.swf?clip_id=$1');w=this.active.width||400;h=this.active.height||300;}var mt=this._media(this.active.type);if(this.active.type=='flash'){p.wmode='transparent';p.base=base;}if(/(mplayer|windowsmedia)/i.test(this.active.type)){p.baseurl=base;if(window.ie){p.url=p.src;delete p.src;}}delete p.title;delete p.group;p.width=this.active.width=p.width||w;p.height=this.active.height=p.height||h;this.object='<object id="jcepopup-object" ';if(/flash/i.test(this.active.type)){this.object+='type="'+mt.mediatype+'" data="'+p.src+'" ';}else{this.object+='codebase="'+mt.codebase+'" classid="clsid:'+mt.classid+'" ';}for(n in p){if(p[n]!==''){if(/(id|name|width|height|style)$/.test(n)){t.object+=n+'="'+p[n]+'"';}}}this.object+='>';for(n in p){if(p[n]!==''){if(!/(id|name|width|height|style)$/.test(n)){t.object+='<param name="'+n+'" value="'+p[n]+'">';}}}if(!window.ie&&!/flash/i.test(this.active.type)){this.object+='<object type="'+mt.mediatype+'" data="'+p.src+'" ';for(n in p){if(p[n]!==''){t.object+=n+'="'+p[n]+'"';}}this.object+='></object>';}this.object+='</object>';this.active.type='media';this._setup();}else{p=getParams(this,i);this.active.title=p.title;this.active.src=this.active.src.replace(/(&|\?)(width|height|bw|bh)=[0-9]+/gi,'');this.active.width=parseInt(p.bw)||parseInt(p.width)||this._width();this.active.height=parseInt(p.bh)||parseInt(p.height)||this._height();var local=false;if(this._local(this.active.src)){if(!/tmpl=component/i.test(this.active.src)){this.active.src+=/\?/.test(this.active.src)?'&tmpl=component':'?tmpl=component';}local=true;}if((this.active.type=='ajax'||/text\/(xml|html|htm)/i.test(this.active.type)&&local)){this.active.type='ajax';this.ajax=new Element('div',{id:'jcepopup-ajax',styles:$merge(this._styles(p.styles),{display:'none'})}).injectInside($(this.content));new Ajax(this.active.src,{onComplete:function(data){var html=data,re=/<body[^>]*>([\s\S]*?)<\/body>/;if(re.test(data)){html=re.exec(data)[1];}this.ajax.innerHTML=html;if(this.loader){$(this.loader).setStyle('display','none');}$ES('a',$(this.content)).each(function(el){el.addEvent('click',function(){if(el.href&&el.href.indexOf('#')==-1){this.close();}}.bind(this))}.bind(this));return this._setup();}.bind(this)}).request();}else{this.active.type='iframe';this._setup();}}return false;},_setup:function(){var t=this,w,h;if(this.active.type=='image'){w=this.active.width||this.img.width;h=this.active.height||this.img.height;if(this.options.popup.resize==1){var x=this._width();var y=this._height();if(w>x){h=h*(x/w);w=x;if(h>y){w=w*(y/h);h=y;}}else if(h>y){w=w*(y/h);h=y;if(w>x){h=h*(x/w);w=x;}}}w=Math.round(w);h=Math.round(h);$(this.content).setStyles({display:'none',width:w,height:h}).setHTML('<img src="'+this.active.src+'" title="'+this.active.title+'" width="'+w+'" height="'+h+'" />');}else{$(this.content).setStyles({width:this.active.width,height:this.active.height,display:'none'});}return this._animate();},_animate:function(){var t=this,ss=this.options.popup.scalespeed,fs=this.options.popup.fadespeed;var cw=this._outerWidth(this.content);var ch=this._outerHeight(this.content);var ih=0;['top','bottom'].each(function(s){if(this['info-'+s]){ih=ih+this._outerHeight(this['info-'+s]);}}.bind(this));new Fx.Styles(this.body,{duration:ss,onComplete:function(){$(this.content).setStyles({'display':'','opacity':0});if(this.active.type=='ajax'){$(this.ajax).setStyle('display','');}['top','bottom'].each(function(s){var el=$(this['info-'+s]);if(el){var h=this._outerHeight(el);var m=s=='top'?'bottom':'top';el.setStyle('z-index',-1);el.setStyle(m,-h);el.setStyle('visibility','visible');new Fx.Style(el,m,{duration:ss,onComplete:function(){el.setStyle('z-index',0);}.bind(this)}).start(0);}}.bind(this));new Fx.Style(this.content,'opacity',{duration:fs,onComplete:function(){if(this.loader){$(this.loader).setStyle('display','none');}if(this.active.type=='media'&&this.object){$(this.content).setHTML(this.object);}$(this.content).setStyle('display','');if(this.active.type=='iframe'){new Element('iframe',{id:'jcepopup-iframe',frameBorder:0,scrolling:this.active.params.scrolling||'auto',allowTransparency:true,styles:{width:this.active.width,height:this.active.height}}).injectInside($(this.content)).setProperty('src',this.active.src);}}.bind(this)}).start(0,1);}.bind(this)}).start({height:ch,top:(this._frameHeight()/2)-((ch+ih)/2),width:cw});},close:function(){['img','object','iframe','ajax'].each(function(o){this[o]=null;});if(this.closelink){$(this.closelink).setStyle('display','none');}$(this.content).empty();['top','bottom'].each(function(s){if(this['info-'+s]){$(this['info-'+s]).setStyle('display','none');}}.bind(this));$(this.page).remove();if(this.overlay){if(window.ie6){this._bind();$(this.overlay).remove();}else{new Fx.Style(this.overlay,'opacity',{duration:this.options.popup.fadespeed,onComplete:function(){this._bind();$(this.overlay).remove();}.bind(this)}).start(this.options.popup.overlayopacity,0);}}this.options.popup.onclose.call(this);return false;}});JCEUtilities.implement(new Options,new Events);

/*
 * Media Object 1.5.0
 *
 * Copyright (c) 2007 - 2008 Ryan Demmer (www.joomlacontenteditor.net)
 * Licensed under the GPL (http://www.gnu.org/licenses/licenses.html#GPL)license.
 * Based on the Moxiecode Embed script
 */
var MediaObject = {
	version : {
		'flash' 		: '9,0,124,0',
		'windowsmedia'	: '5,1,52,701',
		'quicktime'		: '6,0,2,0',
		'realmedia'		: '7,0,0,0',
		'shockwave'		: '8,5,1,0'
	},
	init : function(v){
		var t = this;
		for(n in v){
			t.version[n] = v[n];	
		}
	},
	getSite : function(){
		var x, s = document.getElementsByTagName('script');
		for(x=0; x<s.length; x++){
			if(/mediaobject\/js\/mediaobject-150.js/i.test(s[x].src)){
				site = s[x].src;
			}
		}
		return site.substring(0, site.lastIndexOf('plugins/system/mediaobject/js')).replace(/http:\/\/([^\/]+)/, '');
	},
	writeObject : function(cls, cb, mt, p){
		var h = '', n;
		var msie 	= /msie/i.test(navigator.userAgent);
		var webkit 	= /webkit/i.test(navigator.userAgent);
		
		if(!/:\/\//.test(p.src)){
			p.src = this.getSite() + p.src;	
			if(mt == 'video/x-ms-wmv'){
				p.url = p.src;
			}
			if(mt == 'application/x-shockwave-flash'){
				p.movie = p.src;
				delete p.src;	
			}
		}
		h += '<object ';
		if(mt == 'application/x-shockwave-flash'){
			h += 'type="'+ mt +'" data="'+ p.movie +'" ';	
		}else{
			h += 'codebase="' + cb + '" classid="clsid:' + cls + '" ';
		}
		for (n in p){
			if(p[n] !== ''){
				if (/(id|name|width|height|style)$/.test(n)){
					h += n + '="' + p[n] + '"';	
				}
			}
		}
		h += '>';
		for (n in p){
			if(p[n] !== ''){
				if (!/(id|name|width|height|style)$/.test(n)){
					h += '<param name="' + n + '" value="' + p[n] + '">';
				}
			}
		}
		if(!msie && mt != 'application/x-shockwave-flash'){
			h += '<object type="'+ mt +'" data="'+ p.src +'"';
			for (n in p){
				if(p[n] !== ''){
					h += n + '="' + p[n] + '"';
				}
			}
			h += '></object>';	
		}
		h += '</object>';
		document.write(h);		
	},
	flash : function(p) {
		if(typeof p.wmode == 'undefined'){
			p['wmode'] = 'opaque';
		}
		this.writeObject(
			'D27CDB6E-AE6D-11cf-96B8-444553540000',
			'http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=' + this.version['flash'],
			'application/x-shockwave-flash',
			p
		);
	},
	shockwave : function(p) {
		this.writeObject(
		'166B1BCA-3F9C-11CF-8075-444553540000',
		'http://download.macromedia.com/pub/shockwave/cabs/director/sw.cab#version='  + this.version['shockwave'],
		'application/x-director',
			p
		);
	},
	quicktime : function(p) {
		this.writeObject(
			'02BF25D5-8C17-4B23-BC80-D3488ABDDC6B',
			'http://www.apple.com/qtactivex/qtplugin.cab#version=' + this.version['quicktime'],
			'video/quicktime',
			p
		);
	},
	realmedia : function(p) {
		this.writeObject(
			'CFCDAA03-8BE4-11CF-B84B-0020AFBBCCFA',
			'http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=' + this.version['realmedia'],
			'audio/x-pn-realaudio-plugin',
			p
		);
	},
	windowsmedia : function(p) {
		p.url = p.src;
		this.writeObject(
			'6BF52A52-394A-11D3-B153-00C04F79FAA6',
			'http://activex.microsoft.com/activex/controls/mplayer/en/nsmp2inf.cab#Version=' + this.version['windowsmedia'],
			'video/x-ms-wmv',
			p
		);
	},
	divx : function(p) {
		this.writeObject(
			'67DABFBF-D0AB-41FA-9C46-CC0F21721616',
			'http://go.divx.com/plugin/DivXBrowserPlugin.cab',
			'video/divx',
			p
		);
	}
}
function writeFlash(p) {
	MediaObject.flash(p);
}
function writeShockWave(p) {
	MediaObject.shockwave(p);
}
function writeQuickTime(p) {
	MediaObject.quicktime(p);
}
function writeRealMedia(p) {
	MediaObject.realmedia(p);
}
function writeWindowsMedia(p) {
	MediaObject.windowsmedia(p);
}
function writeDivX(p) {
	MediaObject.divx(p);
}
