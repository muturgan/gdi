!function(t){var n={};function e(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,e),o.l=!0,o.exports}e.m=t,e.c=n,e.d=function(t,n,r){e.o(t,n)||Object.defineProperty(t,n,{enumerable:!0,get:r})},e.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},e.t=function(t,n){if(1&n&&(t=e(t)),8&n)return t;if(4&n&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(e.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&n&&"string"!=typeof t)for(var o in t)e.d(r,o,function(n){return t[n]}.bind(null,o));return r},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},e.p="",e(e.s=4)}([function(t,n){t.exports=require("path")},function(t,n){t.exports=require("fs")},function(t,n){t.exports=require("child_process")},function(t,n){t.exports=require("stream")},function(t,n,e){"use strict";var r=this&&this.__awaiter||function(t,n,e,r){return new(e||(e=Promise))(function(o,i){function s(t){try{a(r.next(t))}catch(t){i(t)}}function u(t){try{a(r.throw(t))}catch(t){i(t)}}function a(t){t.done?o(t.value):new e(function(n){n(t.value)}).then(s,u)}a((r=r.apply(t,n||[])).next())})},o=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(n,"__esModule",{value:!0});const i=o(e(5)),s=o(e(8)),u=e(1),a=e(0);let c;i.default.version("0.1.0","-v, --version").arguments("<command> [packages...]").action(function(t,n){return r(this,void 0,void 0,function*(){try{if("i"===t||"install"===t)if(c=yield new Promise(function(t,n){u.readFile(a.resolve(__dirname,"./package.json"),"utf8",(e,r)=>{e&&n(e),t(JSON.parse(r))})}),n.length);else if(console.log("installing local dependencies..."),yield s.default("npm i"),c.globalDependencies&&Object.keys(c.globalDependencies).length){let t="";for(let n in c.globalDependencies)t+=`${n}@${c.globalDependencies[n]} `;console.info("installing global dependencies..."),s.default(`npm i ${t} -g`)}else console.info("where is no global dependencies")}catch(t){console.error(t)}})}),i.default.parse(process.argv)},function(t,n,e){var r=e(6).EventEmitter,o=e(2).spawn,i=e(0),s=i.dirname,u=i.basename,a=e(1);function c(t,n){this.flags=t,this.required=t.indexOf("<")>=0,this.optional=t.indexOf("[")>=0,this.bool=-1===t.indexOf("-no-"),(t=t.split(/[ ,|]+/)).length>1&&!/^[[<]/.test(t[1])&&(this.short=t.shift()),this.long=t.shift(),this.description=n||""}function l(t){this.commands=[],this.options=[],this._execs={},this._allowUnknownOption=!1,this._args=[],this._name=t||""}function f(t,n){var e=Math.max(0,n-t.length);return t+Array(e+1).join(" ")}function p(t,n){n=n||[];for(var e=0;e<n.length;e++)"--help"!==n[e]&&"-h"!==n[e]||(t.outputHelp(),process.exit(0))}function h(t){var n=t.name+(!0===t.variadic?"...":"");return t.required?"<"+n+">":"["+n+"]"}function d(t){try{if(a.statSync(t).isFile())return!0}catch(t){return!1}}e(7).inherits(l,r),(n=t.exports=new l).Command=l,n.Option=c,c.prototype.name=function(){return this.long.replace("--","").replace("no-","")},c.prototype.attributeName=function(){return function(t){return t.split("-").reduce(function(t,n){return t+n[0].toUpperCase()+n.slice(1)})}(this.name())},c.prototype.is=function(t){return this.short===t||this.long===t},l.prototype.command=function(t,n,e){"object"==typeof n&&null!==n&&(e=n,n=null),e=e||{};var r=t.split(/ +/),o=new l(r.shift());return n&&(o.description(n),this.executables=!0,this._execs[o._name]=!0,e.isDefault&&(this.defaultExecutable=o._name)),o._noHelp=!!e.noHelp,this.commands.push(o),o.parseExpectedArgs(r),o.parent=this,n?this:o},l.prototype.arguments=function(t){return this.parseExpectedArgs(t.split(/ +/))},l.prototype.addImplicitHelpCommand=function(){this.command("help [cmd]","display help for [cmd]")},l.prototype.parseExpectedArgs=function(t){if(t.length){var n=this;return t.forEach(function(t){var e={required:!1,name:"",variadic:!1};switch(t[0]){case"<":e.required=!0,e.name=t.slice(1,-1);break;case"[":e.name=t.slice(1,-1)}e.name.length>3&&"..."===e.name.slice(-3)&&(e.variadic=!0,e.name=e.name.slice(0,-3)),e.name&&n._args.push(e)}),this}},l.prototype.action=function(t){var n=this,e=function(e,r){e=e||[],r=r||[];var o=n.parseOptions(r);p(n,o.unknown),o.unknown.length>0&&n.unknownOption(o.unknown[0]),o.args.length&&(e=o.args.concat(e)),n._args.forEach(function(t,r){t.required&&null==e[r]?n.missingArgument(t.name):t.variadic&&(r!==n._args.length-1&&n.variadicArgNotLast(t.name),e[r]=e.splice(r))}),n._args.length?e[n._args.length]=n:e.push(n),t.apply(n,e)},r=this.parent||this,o=r===this?"*":this._name;return r.on("command:"+o,e),this._alias&&r.on("command:"+this._alias,e),this},l.prototype.option=function(t,n,e,r){var o=this,i=new c(t,n),s=i.name(),u=i.attributeName();if("function"!=typeof e)if(e instanceof RegExp){var a=e;e=function(t,n){var e=a.exec(t);return e?e[0]:n}}else r=e,e=null;return(!i.bool||i.optional||i.required)&&(i.bool||(r=!0),void 0!==r&&(o[u]=r,i.defaultValue=r)),this.options.push(i),this.on("option:"+s,function(t){null!==t&&e&&(t=e(t,void 0===o[u]?r:o[u])),"boolean"==typeof o[u]||void 0===o[u]?o[u]=null==t?!!i.bool&&(r||!0):t:null!==t&&(o[u]=t)}),this},l.prototype.allowUnknownOption=function(t){return this._allowUnknownOption=0===arguments.length||t,this},l.prototype.parse=function(t){this.executables&&this.addImplicitHelpCommand(),this.rawArgs=t,this._name=this._name||u(t[1],".js"),this.executables&&t.length<3&&!this.defaultExecutable&&t.push("--help");var n=this.parseOptions(this.normalize(t.slice(2))),e=this.args=n.args,r=this.parseArgs(this.args,n.unknown),o=r.args[0],i=null;return o&&(i=this.commands.filter(function(t){return t.alias()===o})[0]),this._execs[o]&&"function"!=typeof this._execs[o]?this.executeSubCommand(t,e,n.unknown):i?(e[0]=i._name,this.executeSubCommand(t,e,n.unknown)):this.defaultExecutable?(e.unshift(this.defaultExecutable),this.executeSubCommand(t,e,n.unknown)):r},l.prototype.executeSubCommand=function(t,n,e){(n=n.concat(e)).length||this.help(),"help"===n[0]&&1===n.length&&this.help(),"help"===n[0]&&(n[0]=n[1],n[1]="--help");var r,c=t[1],l=u(c,".js")+"-"+n[0],f=a.lstatSync(c).isSymbolicLink()?a.readlinkSync(c):c;f!==c&&"/"!==f.charAt(0)&&(f=i.join(s(c),f)),r=s(f);var p,h=i.join(r,l),g=!1;d(h+".js")?(l=h+".js",g=!0):d(h)&&(l=h),n=n.slice(1),"win32"!==process.platform?g?(n.unshift(l),n=(process.execArgv||[]).concat(n),p=o(process.argv[0],n,{stdio:"inherit",customFds:[0,1,2]})):p=o(l,n,{stdio:"inherit",customFds:[0,1,2]}):(n.unshift(l),p=o(process.execPath,n,{stdio:"inherit"}));["SIGUSR1","SIGUSR2","SIGTERM","SIGINT","SIGHUP"].forEach(function(t){process.on(t,function(){!1===p.killed&&null===p.exitCode&&p.kill(t)})}),p.on("close",process.exit.bind(process)),p.on("error",function(t){"ENOENT"===t.code?console.error("\n  %s(1) does not exist, try --help\n",l):"EACCES"===t.code&&console.error("\n  %s(1) not executable. try chmod or run with root\n",l),process.exit(1)}),this.runningCommand=p},l.prototype.normalize=function(t){for(var n,e,r,o=[],i=0,s=t.length;i<s;++i){if(n=t[i],i>0&&(e=this.optionFor(t[i-1])),"--"===n){o=o.concat(t.slice(i));break}e&&e.required?o.push(n):n.length>1&&"-"===n[0]&&"-"!==n[1]?n.slice(1).split("").forEach(function(t){o.push("-"+t)}):/^--/.test(n)&&~(r=n.indexOf("="))?o.push(n.slice(0,r),n.slice(r+1)):o.push(n)}return o},l.prototype.parseArgs=function(t,n){var e;return t.length?(e=t[0],this.listeners("command:"+e).length?this.emit("command:"+t.shift(),t,n):this.emit("command:*",t)):(p(this,n),n.length>0&&this.unknownOption(n[0]),0===this.commands.length&&0===this._args.filter(function(t){return t.required}).length&&this.emit("command:*")),this},l.prototype.optionFor=function(t){for(var n=0,e=this.options.length;n<e;++n)if(this.options[n].is(t))return this.options[n]},l.prototype.parseOptions=function(t){for(var n,e,r,o=[],i=t.length,s=[],u=0;u<i;++u)if(r=t[u],n)o.push(r);else if("--"!==r)if(e=this.optionFor(r))if(e.required){if(null==(r=t[++u]))return this.optionMissingArgument(e);this.emit("option:"+e.name(),r)}else e.optional?(null==(r=t[u+1])||"-"===r[0]&&"-"!==r?r=null:++u,this.emit("option:"+e.name(),r)):this.emit("option:"+e.name());else r.length>1&&"-"===r[0]?(s.push(r),u+1<t.length&&"-"!==t[u+1][0]&&s.push(t[++u])):o.push(r);else n=!0;return{args:o,unknown:s}},l.prototype.opts=function(){for(var t={},n=this.options.length,e=0;e<n;e++){var r=this.options[e].attributeName();t[r]=r===this._versionOptionName?this._version:this[r]}return t},l.prototype.missingArgument=function(t){console.error(),console.error("  error: missing required argument `%s'",t),console.error(),process.exit(1)},l.prototype.optionMissingArgument=function(t,n){console.error(),n?console.error("  error: option `%s' argument missing, got `%s'",t.flags,n):console.error("  error: option `%s' argument missing",t.flags),console.error(),process.exit(1)},l.prototype.unknownOption=function(t){this._allowUnknownOption||(console.error(),console.error("  error: unknown option `%s'",t),console.error(),process.exit(1))},l.prototype.variadicArgNotLast=function(t){console.error(),console.error("  error: variadic arguments must be last `%s'",t),console.error(),process.exit(1)},l.prototype.version=function(t,n){if(0===arguments.length)return this._version;this._version=t;var e=new c(n=n||"-V, --version","output the version number");return this._versionOptionName=e.long.substr(2)||"version",this.options.push(e),this.on("option:"+this._versionOptionName,function(){process.stdout.write(t+"\n"),process.exit(0)}),this},l.prototype.description=function(t,n){return 0===arguments.length?this._description:(this._description=t,this._argsDescription=n,this)},l.prototype.alias=function(t){var n=this;if(0!==this.commands.length&&(n=this.commands[this.commands.length-1]),0===arguments.length)return n._alias;if(t===n._name)throw new Error("Command alias can't be the same as its name");return n._alias=t,this},l.prototype.usage=function(t){var n=this._args.map(function(t){return h(t)}),e="[options]"+(this.commands.length?" [command]":"")+(this._args.length?" "+n.join(" "):"");return 0===arguments.length?this._usage||e:(this._usage=t,this)},l.prototype.name=function(t){return 0===arguments.length?this._name:(this._name=t,this)},l.prototype.prepareCommands=function(){return this.commands.filter(function(t){return!t._noHelp}).map(function(t){var n=t._args.map(function(t){return h(t)}).join(" ");return[t._name+(t._alias?"|"+t._alias:"")+(t.options.length?" [options]":"")+(n?" "+n:""),t._description]})},l.prototype.largestCommandLength=function(){return this.prepareCommands().reduce(function(t,n){return Math.max(t,n[0].length)},0)},l.prototype.largestOptionLength=function(){var t=[].slice.call(this.options);return t.push({flags:"-h, --help"}),t.reduce(function(t,n){return Math.max(t,n.flags.length)},0)},l.prototype.largestArgLength=function(){return this._args.reduce(function(t,n){return Math.max(t,n.name.length)},0)},l.prototype.padWidth=function(){var t=this.largestOptionLength();return this._argsDescription&&this._args.length&&this.largestArgLength()>t&&(t=this.largestArgLength()),this.commands&&this.commands.length&&this.largestCommandLength()>t&&(t=this.largestCommandLength()),t},l.prototype.optionHelp=function(){var t=this.padWidth();return this.options.map(function(n){return f(n.flags,t)+"  "+n.description+(n.bool&&void 0!==n.defaultValue?" (default: "+n.defaultValue+")":"")}).concat([f("-h, --help",t)+"  output usage information"]).join("\n")},l.prototype.commandHelp=function(){if(!this.commands.length)return"";var t=this.prepareCommands(),n=this.padWidth();return["  Commands:","",t.map(function(t){var e=t[1]?"  "+t[1]:"";return(e?f(t[0],n):t[0])+e}).join("\n").replace(/^/gm,"    "),""].join("\n")},l.prototype.helpInformation=function(){var t=[];if(this._description){t=["  "+this._description,""];var n=this._argsDescription;if(n&&this._args.length){var e=this.padWidth();t.push("  Arguments:"),t.push(""),this._args.forEach(function(r){t.push("    "+f(r.name,e)+"  "+n[r.name])}),t.push("")}}var r=this._name;this._alias&&(r=r+"|"+this._alias);var o=["","  Usage: "+r+" "+this.usage(),""],i=[],s=this.commandHelp();s&&(i=[s]);var u=["  Options:","",""+this.optionHelp().replace(/^/gm,"    "),""];return o.concat(t).concat(u).concat(i).concat([""]).join("\n")},l.prototype.outputHelp=function(t){t||(t=function(t){return t}),process.stdout.write(t(this.helpInformation())),this.emit("--help")},l.prototype.help=function(t){this.outputHelp(t),process.exit()}},function(t,n){t.exports=require("events")},function(t,n){t.exports=require("util")},function(t,n,e){"use strict";e.r(n);var r=e(3),o=e.n(r),i=e(1),s=e.n(i),u=e(0),a=e.n(u),c=e(2);function l(t){return Object.prototype.toString.call(t)}var f,p,h,d,g=Array.isArray||function(t){return"[object Array]"===l(t)},m=function(t){var n;return"undefined"!=typeof window&&t===window.alert||("[object Function]"===(n=l(t))||"[object GeneratorFunction]"===n||"[object AsyncFunction]"===n)},v=function(t){return"[object Object]"===l(t)},y=function(t){return"[object String]"===l(t)},b=function(t){return!!t&&("object"==typeof t||"function"==typeof t)&&"function"==typeof t.then},w=class extends o.a{constructor(){super(),this.buffer="",this.writable=!0}write(t){return this.buffer+=t}end(t){return arguments.length&&this.write(t),this.writable=!1}destroy(){return this.writable=!1}toString(){return this.buffer}},x={'"':'"',"\\":"\\","/":"/",b:"\b",f:"\f",n:"\n",r:"\r",t:"\t"},_=function(t){throw{name:"SyntaxError",message:t,at:f,text:h}},j=function(t){return t&&t!==p&&_("Expected '"+t+"' instead of '"+p+"'"),p=h.charAt(f),f+=1,p},O=function(){var t,n="";for("-"===p&&(n="-",j("-"));p>="0"&&p<="9";)n+=p,j();if("."===p)for(n+=".";j()&&p>="0"&&p<="9";)n+=p;if("e"===p||"E"===p)for(n+=p,j(),"-"!==p&&"+"!==p||(n+=p,j());p>="0"&&p<="9";)n+=p,j();if(t=+n,isFinite(t))return t;_("Bad number")},S=function(){var t,n,e,r="";if('"'===p)for(;j();){if('"'===p)return j(),r;if("\\"===p)if(j(),"u"===p){for(e=0,n=0;n<4&&(t=parseInt(j(),16),isFinite(t));n+=1)e=16*e+t;r+=String.fromCharCode(e)}else{if("string"!=typeof x[p])break;r+=x[p]}else r+=p}_("Bad string")},E=function(){for(;p&&p<=" ";)j()};d=function(){switch(E(),p){case"{":return function(){var t,n={};if("{"===p){if(j("{"),E(),"}"===p)return j("}"),n;for(;p;){if(t=S(),E(),j(":"),Object.hasOwnProperty.call(n,t)&&_('Duplicate key "'+t+'"'),n[t]=d(),E(),"}"===p)return j("}"),n;j(","),E()}}_("Bad object")}();case"[":return function(){var t=[];if("["===p){if(j("["),E(),"]"===p)return j("]"),t;for(;p;){if(t.push(d()),E(),"]"===p)return j("]"),t;j(","),E()}}_("Bad array")}();case'"':return S();case"-":return O();default:return p>="0"&&p<="9"?O():function(){switch(p){case"t":return j("t"),j("r"),j("u"),j("e"),!0;case"f":return j("f"),j("a"),j("l"),j("s"),j("e"),!1;case"n":return j("n"),j("u"),j("l"),j("l"),null}_("Unexpected '"+p+"'")}()}};var k,A,C,q=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,N={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"};function $(t){return q.lastIndex=0,q.test(t)?'"'+t.replace(q,function(t){var n=N[t];return"string"==typeof n?n:"\\u"+("0000"+t.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+t+'"'}for(var P={parse:function(t,n){var e;return h=t,f=0,p=" ",e=d(),E(),p&&_("Syntax error"),"function"==typeof n?function t(e,r){var o,i,s=e[r];if(s&&"object"==typeof s)for(o in s)Object.prototype.hasOwnProperty.call(s,o)&&(void 0!==(i=t(s,o))?s[o]=i:delete s[o]);return n.call(e,r,s)}({"":e},""):e},stringify:function(t,n,e){var r;if(k="",A="","number"==typeof e)for(r=0;r<e;r+=1)A+=" ";else"string"==typeof e&&(A=e);if(C=n,n&&"function"!=typeof n&&("object"!=typeof n||"number"!=typeof n.length))throw new Error("JSON.stringify");return function t(n,e){var r,o,i,s,u,a=k,c=e[n];switch(c&&"object"==typeof c&&"function"==typeof c.toJSON&&(c=c.toJSON(n)),"function"==typeof C&&(c=C.call(e,n,c)),typeof c){case"string":return $(c);case"number":return isFinite(c)?String(c):"null";case"boolean":case"null":return String(c);case"object":if(!c)return"null";if(k+=A,u=[],"[object Array]"===Object.prototype.toString.apply(c)){for(s=c.length,r=0;r<s;r+=1)u[r]=t(r,c)||"null";return i=0===u.length?"[]":k?"[\n"+k+u.join(",\n"+k)+"\n"+a+"]":"["+u.join(",")+"]",k=a,i}if(C&&"object"==typeof C)for(s=C.length,r=0;r<s;r+=1)"string"==typeof(o=C[r])&&(i=t(o,c))&&u.push($(o)+(k?": ":":")+i);else for(o in c)Object.prototype.hasOwnProperty.call(c,o)&&(i=t(o,c))&&u.push($(o)+(k?": ":":")+i);return i=0===u.length?"{}":k?"{\n"+k+u.join(",\n"+k)+"\n"+a+"}":"{"+u.join(",")+"}",k=a,i}}("",{"":t})}},M=function(t,n){if(t.map)return t.map(n);for(var e=[],r=0;r<t.length;r++){var o=t[r];F.call(t,r)&&e.push(n(o,r,t))}return e},F=Object.prototype.hasOwnProperty,H=function(t,n){if(t.filter)return t.filter(n);for(var e=[],r=0;r<t.length;r++)I.call(t,r)&&n(t[r],r,t)&&e.push(t[r]);return e},I=Object.prototype.hasOwnProperty,L=Object.prototype.hasOwnProperty,U=void 0!==typeof JSON?JSON:P,B="(?:"+["\\|\\|","\\&\\&",";;","\\|\\&","[&;()|<>]"].join("|")+")",D="(\\\\['\"|&;()<> \\t]|[^\\s'\"|&;()<> \\t])+",R='"((\\\\"|[^"])*?)"',J="'((\\\\'|[^'])*?)'",T="",G=0;G<4;G++)T+=(Math.pow(16,8)*Math.random()).toString(16);var V,W,z,K,Q,X,Y,Z=function(t,n,e){var r=function(t,n,e){var r=new RegExp(["("+B+")","("+D+"|"+R+"|"+J+")*"].join("|"),"g"),o=H(t.match(r),Boolean),i=!1;return o?(n||(n={}),e||(e={}),M(o,function(t,r){if(!i){if(RegExp("^"+B+"$").test(t))return{op:t};for(var s=e.escape||"\\",u=!1,a=!1,c="",l=!1,f=0,p=t.length;f<p;f++){var h=t.charAt(f);if(l=l||!u&&("*"===h||"?"===h),a)c+=h,a=!1;else if(u)h===u?u=!1:"'"==u?c+=h:h===s?(f+=1,h=t.charAt(f),c+='"'===h||h===s||"$"===h?h:s+h):c+="$"===h?d():h;else if('"'===h||"'"===h)u=h;else{if(RegExp("^"+B+"$").test(h))return{op:t};if(RegExp("^#$").test(h))return i=!0,c.length?[c,{comment:t.slice(f+1)+o.slice(r+1).join(" ")}]:[{comment:t.slice(f+1)+o.slice(r+1).join(" ")}];h===s?a=!0:c+="$"===h?d():h}}return l?{op:"glob",pattern:c}:c}function d(){var e,r;if(f+=1,"{"===t.charAt(f)){if(f+=1,"}"===t.charAt(f))throw new Error("Bad substitution: "+t.substr(f-2,3));if((e=t.indexOf("}",f))<0)throw new Error("Bad substitution: "+t.substr(f));r=t.substr(f,e-f),f=e}else/[*@#?$!_\-]/.test(t.charAt(f))?(r=t.charAt(f),f+=1):(e=t.substr(f).match(/[^\w\d_]/))?(r=t.substr(f,e.index),f+=e.index-1):(r=t.substr(f),f=t.length);return function(t,e,r){var o="function"==typeof n?n(r):n[r];return void 0===o&&(o=""),"object"==typeof o?e+T+U.stringify(o)+T:e+o}(0,"",r)}}).reduce(function(t,n){return void 0===n?t:t.concat(n)},[])):[]}(t,n,e);return"function"!=typeof n?r:function(t,n,e){var r=arguments.length>=3;if(r&&t.reduce)return t.reduce(n,e);if(t.reduce)return t.reduce(n);for(var o=0;o<t.length;o++)L.call(t,o)&&(r?e=n(e,t[o],o):(e=t[o],r=!0));return e}(r,function(t,n){if("object"==typeof n)return t.concat(n);var e=n.split(RegExp("("+T+".*?"+T+")","g"));return 1===e.length?t.concat(e[0]):t.concat(M(H(e,Boolean),function(t){return RegExp("^"+T).test(t)?U.parse(t.split(T)[1]):t}))},[])},tt={":":!0,".":!0,break:!0,cd:!0,continue:!0,eval:!0,exec:!0,exit:!0,export:!0,getopts:!0,hash:!0,pwd:!0,readonly:!0,return:!0,shift:!0,test:!0,times:!0,trap:!0,umask:!0,unset:!0,alias:!0,bind:!0,builtin:!0,caller:!0,command:!0,declare:!0,echo:!0,enable:!0,help:!0,let:!0,local:!0,logout:!0,mapfile:!0,printf:!0,read:!0,readarray:!0,source:!0,type:!0,typeset:!0,ulimit:!0,unalias:!0};V=/^win/.test(process.platform),X=function(t){var n,e,r,o;for(e=[],r=0,o=t.length;r<o;r++)n=t[r],y(n)?e.push(n):"glob"===n.op?e.push(n.pattern):e.push(n.op);return e},z=function(t,n,e=!0){var r,o,i,s,u;for(o=(r=Z(t,n)).shift();~o.indexOf("=");)i=!0,[s,u]=o.split("=",2),n[s]=u,o=r.shift();return e&&i?z(t,n,!1):[o,r,n]},K=function(t,n){var e,r,o;return o=Object.assign({},process.env,n.env),[r,e,o]=z(t,o)},W=function(t,n){var e;return[t.cmd,null!=(e=t.args)?e:[],Object.assign({},process.env,n.env,t.env)]},Q=function(t,n){var e,r,o;if(tt[t])return!0;for(r=0,o=n.length;r<o;r++)if(e=n[r],!y(e))return!0;return!1},Y=function(t,n){var e;return e=(t=a.a.normalize(t))+".cmd",s.a.existsSync(e)&&(t=e),n=["/c",t].concat(n),[t="cmd.exe",n]};var nt,et,rt,ot,it,st,ut,at=function(t,n={}){var e,r,o;if(y(t))[r,e,o]=K(t,n);else{if(!v(t))throw new Error(`Unable to parse command '${t}'`);[r,e,o]=W(t,n)}return Q(r,e)&&(null==n.shell&&(n.shell=!0),e=X(e)),V&&([r,e]=Y(r,e)),[r,e,n]},ct=function(t){if("ENOENT"===t.code&&/^spawn/.test(t.syscall))return console.error(`Error: ${t.code}, ${t.syscall}`),console.error(`Make sure '${t.cmd}' exists and is executable.`)},lt=function(t){var n,e;return n=!1,e=null,function(){return n?e:(n=!0,e=t.apply(this,arguments),t=null,e)}},ft=function(t,n,e,r){var o;return null==(o=null!=r?r:{}).status&&(o.status=e),null==o.stderr&&(o.stderr=n),null==o.stdout&&(o.stdout=t),o},pt=function(t,n,e){var r,o,i,s,u,a,l,f,p;return[t,r,n]=at(t,n),f=new w,p=new w,(o=Object(c.spawn)(t,r,{cwd:n.cwd,env:n.env,argv0:n.argv0,stdio:null!=(u=n.stdio)?u:[0,"pipe","pipe"],detached:n.detached,uid:n.uid,gid:n.gid,shell:n.shell})).setMaxListeners(0),o.stdout.setEncoding(null!=(a=n.encoding)?a:"utf8"),o.stderr.setEncoding(null!=(l=n.encoding)?l:"utf8"),n.interactive||(o.stdout.pipe(p),o.stderr.pipe(f)),n.quiet||(o.stdout.pipe(process.stdout),o.stderr.pipe(process.stderr)),i=lt(function(i,s){return p.destroy(),f.destroy(),o.kill(),p=p.toString(),f=f.toString(),null!=i&&(i.cmd=t,i.args=r,i.stdout=p,i.stderr=f,i.status=s,n.quiet||ct(i)),e(i,p,f,s)}),s=lt(function(n,e){var r;return r=null,0!==n&&((r=new Error(`Command failed, '${t}' exited with status ${n}`)).signal=e),i(r,n)}),o.on("close",s),o.on("error",i),o},ht=function(t,n,e){var r,o,i,s,u,a,l,f,p,h;return[t,r,n]=at(t,n),({pid:s,output:i,stdout:h,stderr:p,status:f,signal:l,error:o}=Object(c.spawnSync)(t,r,{cwd:n.cwd,input:n.input,stdio:null!=(u=n.stdio)?u:[0,"pipe","pipe"],env:n.env,uid:n.uid,gid:n.gid,timeout:n.timeout,killSignal:n.killSignal,maxBuffer:n.maxBuffer,encoding:null!=(a=n.encoding)?a:"utf8"})),n.quiet||(process.stdout.write(h),process.stderr.write(p)),null==o&&0!==f&&(o=new Error(`Command failed, '${t}' exited with status ${f}`)),null!=o&&(o.status=f,o.pid=s,o.signal=l,o.stderr=p,o.stdout=h,n.quiet||ct(o)),e(o,h,p,f),{status:f,stderr:p,stdout:h,error:o}},dt=function(t,n,e,r){var o,i,s,u,a,c,l;for(c="",s="",u=[],l=n.length,a=n.length&&g(n[0])?{}:null,o=function(t,n={}){var e,r,o,i;if(({error:e,stdout:i,stderr:o,status:r}=n),null!=i&&(c+=i),null!=o&&(s+=o),null!=t)return a[t]={error:e,stdout:i,stderr:o,status:r}},i=function(t,n=0){if(null!=t&&(e.quiet||console.error(t.toString()),u.push(t)),!--l)return u.length&&((t=new Error("Partial completion")).errors=u,n=1),r(t,c,s,n,a)};n.length;)!function(r){var s,u;if(g(r)&&([s,r]=r),y(r))return r=r.replace(/\\/g,"\\\\"),t(r,e,function(t,n,e,r){return o(s,{error:t,stdout:n,stderr:e,status:r}),i(t,r)});if(m(r))try{u=r(),b(u)?n.push(u):y(u)?n.push(u):(o(s,u),i(null,0))}catch(t){return i(t)}else if(b(r))r.then(function(t){return o(s,t),i(null,0)}).catch(function(t){return i(t)})}(n.shift())},gt=function(t,n,e,r){var o,i,s,u,a,c;return i="",c="",s=null,a=n.length&&g(n[0])?{}:null,o=function(t,n={}){var e,r,o,u;if(({error:e,stdout:u,stderr:o,status:r}=n),null!=u&&(c+=u),null!=o&&(i+=o),s=null!=r?r:0,null!=t)return a[t]={error:e,stdout:u,stderr:o,status:r}},(u=function(){var l,f,p;if(!n.length)return r(null,c,i,s,a);if(l=n.shift(),g(l)&&([f,l]=l),y(l))return l=l.replace(/\\/g,"\\\\"),t(l,e,function(t,n,l,p){return o(f,{error:t,stdout:n,stderr:l,status:p}),e.strict&&null!=t?r(t,c,i,s,a):u()});if(b(l))return l.then(function(t){return o(f,t),u()}).catch(function(t){return r(t,c,i,1,a)});if(!m(l))return r(new Error(`Not a valid command: ${l.toString()}`));try{return p=l(),b(p)||y(p)?n.unshift(p):o(f,p),u()}catch(t){return r(t,c,i,1,a)}})()};function mt(t,n,e){var r;if(r=n.sync?ht:pt,y(t))return rt(r,t,n,e);if(v(t))return et(r,t,n,e);if(g(t))return nt(r,t,n,e);throw new Error(`Unable to return results for cmds = ${JSON.stringify(t)}`)}function vt(t,n,e){return m(n)&&([e,n]=[n,{}]),null==n&&(n={}),m(e)?ot(t,n,e):n.sync?st(t,n):it(t,n)}nt=function(t,n,e,r){return e.parallel?dt(t,n,e,r):gt(t,n,e,r)},rt=function(t,n,e,r){var o,i;return o=function(){var t,e,r,o;for(o=[],t=0,e=(r=n.split("\n")).length;t<e;t++)""!==(i=r[t]).trim()&&o.push(i);return o}(),nt(t,o,e,r)},et=function(t,n,e,r){var o,i,s;return i=function(){var t;for(s in t=[],n)o=n[s],t.push([s,o]);return t}(),nt(t,i,e,r)},ot=function(t,n,e){return mt(t,n,function(t,n,r,o,i){var s;return null!=i?(s=ft(n,r,o,i),e(t,s,n,r,o)):e(t,n,r,o)})},st=function(t,n){var e;return e=null,mt(t,n,function(t,r,o,i,s){if(n.syncThrows){if(n.strict&&0!==i)throw t;if(null!=t&&null==i)throw t}return e=ft(r,o,i,s)}),e},it=function(t,n){return new Promise(function(e,r){return mt(t,n,function(t,o,i,s,u){return n.strict&&0!==s?r(t):null!=t&&null==s?r(t):e(ft(o,i,s,u))})})},ut=function(t){return function(n,e,r){return m(e)&&([r,e]=[e,{}]),vt(n,Object.assign({},t,e),r)}},vt.interactive=ut({interactive:!0}),vt.parallel=ut({parallel:!0}),vt.quiet=ut({quiet:!0}),vt.serial=ut({parallel:!1}),vt.strict=ut({strict:!0}),vt.sync=ut({sync:!0}),n.default=vt}]);