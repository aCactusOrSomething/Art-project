(function(){var supportsDirectProtoAccess=function(){var z=function(){}
z.prototype={p:{}}
var y=new z()
if(!(y.__proto__&&y.__proto__.p===z.prototype.p))return false
try{if(typeof navigator!="undefined"&&typeof navigator.userAgent=="string"&&navigator.userAgent.indexOf("Chrome/")>=0)return true
if(typeof version=="function"&&version.length==0){var x=version()
if(/^\d+\.\d+\.\d+\.\d+$/.test(x))return true}}catch(w){}return false}()
function map(a){a=Object.create(null)
a.x=0
delete a.x
return a}var A=map()
var B=map()
var C=map()
var D=map()
var E=map()
var F=map()
var G=map()
var H=map()
var J=map()
var K=map()
var L=map()
var M=map()
var N=map()
var O=map()
var P=map()
var Q=map()
var R=map()
var S=map()
var T=map()
var U=map()
var V=map()
var W=map()
var X=map()
var Y=map()
var Z=map()
function I(){}init()
function setupProgram(a,b){"use strict"
function generateAccessor(a9,b0,b1){var g=a9.split("-")
var f=g[0]
var e=f.length
var d=f.charCodeAt(e-1)
var c
if(g.length>1)c=true
else c=false
d=d>=60&&d<=64?d-59:d>=123&&d<=126?d-117:d>=37&&d<=43?d-27:0
if(d){var a0=d&3
var a1=d>>2
var a2=f=f.substring(0,e-1)
var a3=f.indexOf(":")
if(a3>0){a2=f.substring(0,a3)
f=f.substring(a3+1)}if(a0){var a4=a0&2?"r":""
var a5=a0&1?"this":"r"
var a6="return "+a5+"."+f
var a7=b1+".prototype.g"+a2+"="
var a8="function("+a4+"){"+a6+"}"
if(c)b0.push(a7+"$reflectable("+a8+");\n")
else b0.push(a7+a8+";\n")}if(a1){var a4=a1&2?"r,v":"v"
var a5=a1&1?"this":"r"
var a6=a5+"."+f+"=v"
var a7=b1+".prototype.s"+a2+"="
var a8="function("+a4+"){"+a6+"}"
if(c)b0.push(a7+"$reflectable("+a8+");\n")
else b0.push(a7+a8+";\n")}}return f}function defineClass(a1,a2){var g=[]
var f="function "+a1+"("
var e=""
for(var d=0;d<a2.length;d++){if(d!=0)f+=", "
var c=generateAccessor(a2[d],g,a1)
var a0="p_"+c
f+=a0
e+="this."+c+" = "+a0+";\n"}if(supportsDirectProtoAccess)e+="this."+"$deferredAction"+"();"
f+=") {\n"+e+"}\n"
f+=a1+".builtin$cls=\""+a1+"\";\n"
f+="$desc=$collectedClasses."+a1+"[1];\n"
f+=a1+".prototype = $desc;\n"
if(typeof defineClass.name!="string")f+=a1+".name=\""+a1+"\";\n"
f+=g.join("")
return f}var z=supportsDirectProtoAccess?function(c,d){var g=c.prototype
g.__proto__=d.prototype
g.constructor=c
g["$is"+c.name]=c
return convertToFastObject(g)}:function(){function tmp(){}return function(a0,a1){tmp.prototype=a1.prototype
var g=new tmp()
convertToSlowObject(g)
var f=a0.prototype
var e=Object.keys(f)
for(var d=0;d<e.length;d++){var c=e[d]
g[c]=f[c]}g["$is"+a0.name]=a0
g.constructor=a0
a0.prototype=g
return g}}()
function finishClasses(a4){var g=init.allClasses
a4.combinedConstructorFunction+="return [\n"+a4.constructorsList.join(",\n  ")+"\n]"
var f=new Function("$collectedClasses",a4.combinedConstructorFunction)(a4.collected)
a4.combinedConstructorFunction=null
for(var e=0;e<f.length;e++){var d=f[e]
var c=d.name
var a0=a4.collected[c]
var a1=a0[0]
a0=a0[1]
g[c]=d
a1[c]=d}f=null
var a2=init.finishedClasses
function finishClass(c1){if(a2[c1])return
a2[c1]=true
var a5=a4.pending[c1]
if(a5&&a5.indexOf("+")>0){var a6=a5.split("+")
a5=a6[0]
var a7=a6[1]
finishClass(a7)
var a8=g[a7]
var a9=a8.prototype
var b0=g[c1].prototype
var b1=Object.keys(a9)
for(var b2=0;b2<b1.length;b2++){var b3=b1[b2]
if(!u.call(b0,b3))b0[b3]=a9[b3]}}if(!a5||typeof a5!="string"){var b4=g[c1]
var b5=b4.prototype
b5.constructor=b4
b5.$isb=b4
b5.$deferredAction=function(){}
return}finishClass(a5)
var b6=g[a5]
if(!b6)b6=existingIsolateProperties[a5]
var b4=g[c1]
var b5=z(b4,b6)
if(a9)b5.$deferredAction=mixinDeferredActionHelper(a9,b5)
if(Object.prototype.hasOwnProperty.call(b5,"%")){var b7=b5["%"].split(";")
if(b7[0]){var b8=b7[0].split("|")
for(var b2=0;b2<b8.length;b2++){init.interceptorsByTag[b8[b2]]=b4
init.leafTags[b8[b2]]=true}}if(b7[1]){b8=b7[1].split("|")
if(b7[2]){var b9=b7[2].split("|")
for(var b2=0;b2<b9.length;b2++){var c0=g[b9[b2]]
c0.$nativeSuperclassTag=b8[0]}}for(b2=0;b2<b8.length;b2++){init.interceptorsByTag[b8[b2]]=b4
init.leafTags[b8[b2]]=false}}b5.$deferredAction()}if(b5.$isf)b5.$deferredAction()}var a3=Object.keys(a4.pending)
for(var e=0;e<a3.length;e++)finishClass(a3[e])}function finishAddStubsHelper(){var g=this
while(!g.hasOwnProperty("$deferredAction"))g=g.__proto__
delete g.$deferredAction
var f=Object.keys(g)
for(var e=0;e<f.length;e++){var d=f[e]
var c=d.charCodeAt(0)
var a0
if(d!=="^"&&d!=="$reflectable"&&c!==43&&c!==42&&(a0=g[d])!=null&&a0.constructor===Array&&d!=="<>")addStubs(g,a0,d,false,[])}convertToFastObject(g)
g=g.__proto__
g.$deferredAction()}function mixinDeferredActionHelper(c,d){var g
if(d.hasOwnProperty("$deferredAction"))g=d.$deferredAction
return function foo(){if(!supportsDirectProtoAccess)return
var f=this
while(!f.hasOwnProperty("$deferredAction"))f=f.__proto__
if(g)f.$deferredAction=g
else{delete f.$deferredAction
convertToFastObject(f)}c.$deferredAction()
f.$deferredAction()}}function processClassData(b1,b2,b3){b2=convertToSlowObject(b2)
var g
var f=Object.keys(b2)
var e=false
var d=supportsDirectProtoAccess&&b1!="b"
for(var c=0;c<f.length;c++){var a0=f[c]
var a1=a0.charCodeAt(0)
if(a0==="l"){processStatics(init.statics[b1]=b2.l,b3)
delete b2.l}else if(a1===43){w[g]=a0.substring(1)
var a2=b2[a0]
if(a2>0)b2[g].$reflectable=a2}else if(a1===42){b2[g].$D=b2[a0]
var a3=b2.$methodsWithOptionalArguments
if(!a3)b2.$methodsWithOptionalArguments=a3={}
a3[a0]=g}else{var a4=b2[a0]
if(a0!=="^"&&a4!=null&&a4.constructor===Array&&a0!=="<>")if(d)e=true
else addStubs(b2,a4,a0,false,[])
else g=a0}}if(e)b2.$deferredAction=finishAddStubsHelper
var a5=b2["^"],a6,a7,a8=a5
var a9=a8.split(";")
a8=a9[1]?a9[1].split(","):[]
a7=a9[0]
a6=a7.split(":")
if(a6.length==2){a7=a6[0]
var b0=a6[1]
if(b0)b2.$S=function(b4){return function(){return init.types[b4]}}(b0)}if(a7)b3.pending[b1]=a7
b3.combinedConstructorFunction+=defineClass(b1,a8)
b3.constructorsList.push(b1)
b3.collected[b1]=[m,b2]
i.push(b1)}function processStatics(a3,a4){var g=Object.keys(a3)
for(var f=0;f<g.length;f++){var e=g[f]
if(e==="^")continue
var d=a3[e]
var c=e.charCodeAt(0)
var a0
if(c===43){v[a0]=e.substring(1)
var a1=a3[e]
if(a1>0)a3[a0].$reflectable=a1
if(d&&d.length)init.typeInformation[a0]=d}else if(c===42){m[a0].$D=d
var a2=a3.$methodsWithOptionalArguments
if(!a2)a3.$methodsWithOptionalArguments=a2={}
a2[e]=a0}else if(typeof d==="function"){m[a0=e]=d
h.push(e)
init.globalFunctions[e]=d}else if(d.constructor===Array)addStubs(m,d,e,true,h)
else{a0=e
processClassData(e,d,a4)}}}function addStubs(b2,b3,b4,b5,b6){var g=0,f=b3[g],e
if(typeof f=="string")e=b3[++g]
else{e=f
f=b4}var d=[b2[b4]=b2[f]=e]
e.$stubName=b4
b6.push(b4)
for(g++;g<b3.length;g++){e=b3[g]
if(typeof e!="function")break
if(!b5)e.$stubName=b3[++g]
d.push(e)
if(e.$stubName){b2[e.$stubName]=e
b6.push(e.$stubName)}}for(var c=0;c<d.length;g++,c++)d[c].$callName=b3[g]
var a0=b3[g]
b3=b3.slice(++g)
var a1=b3[0]
var a2=a1>>1
var a3=(a1&1)===1
var a4=a1===3
var a5=a1===1
var a6=b3[1]
var a7=a6>>1
var a8=(a6&1)===1
var a9=a2+a7!=d[0].length
var b0=b3[2]
if(typeof b0=="number")b3[2]=b0+b
var b1=2*a7+a2+3
if(a0){e=tearOff(d,b3,b5,b4,a9)
b2[b4].$getter=e
e.$getterStub=true
if(b5){init.globalFunctions[b4]=e
b6.push(a0)}b2[a0]=e
d.push(e)
e.$stubName=a0
e.$callName=null}}function tearOffGetter(c,d,e,f){return f?new Function("funcs","reflectionInfo","name","H","c","return function tearOff_"+e+y+++"(x) {"+"if (c === null) c = "+"H.O"+"("+"this, funcs, reflectionInfo, false, [x], name);"+"return new c(this, funcs[0], x, name);"+"}")(c,d,e,H,null):new Function("funcs","reflectionInfo","name","H","c","return function tearOff_"+e+y+++"() {"+"if (c === null) c = "+"H.O"+"("+"this, funcs, reflectionInfo, false, [], name);"+"return new c(this, funcs[0], null, name);"+"}")(c,d,e,H,null)}function tearOff(c,d,e,f,a0){var g
return e?function(){if(g===void 0)g=H.O(this,c,d,true,[],f).prototype
return g}:tearOffGetter(c,d,f,a0)}var y=0
if(!init.libraries)init.libraries=[]
if(!init.mangledNames)init.mangledNames=map()
if(!init.mangledGlobalNames)init.mangledGlobalNames=map()
if(!init.statics)init.statics=map()
if(!init.typeInformation)init.typeInformation=map()
if(!init.globalFunctions)init.globalFunctions=map()
var x=init.libraries
var w=init.mangledNames
var v=init.mangledGlobalNames
var u=Object.prototype.hasOwnProperty
var t=a.length
var s=map()
s.collected=map()
s.pending=map()
s.constructorsList=[]
s.combinedConstructorFunction="function $reflectable(fn){fn.$reflectable=1;return fn};\n"+"var $desc;\n"
for(var r=0;r<t;r++){var q=a[r]
var p=q[0]
var o=q[1]
var n=q[2]
var m=q[3]
var l=q[4]
var k=!!q[5]
var j=l&&l["^"]
if(j instanceof Array)j=j[0]
var i=[]
var h=[]
processStatics(l,s)
x.push([p,o,i,h,n,j,k,m])}finishClasses(s)}I.a7=function(){}
var dart=[["","",,H,{"^":"",bq:{"^":"b;a"}}],["","",,J,{"^":"",
j:function(a){return void 0},
F:function(a,b,c,d){return{i:a,p:b,e:c,x:d}},
P:function(a){var z,y,x,w,v
z=a[init.dispatchPropertyName]
if(z==null)if($.R==null){H.b6()
z=a[init.dispatchPropertyName]}if(z!=null){y=z.p
if(!1===y)return z.i
if(!0===y)return a
x=Object.getPrototypeOf(a)
if(y===x)return z.i
if(z.e===x)throw H.d(new P.a3("Return interceptor for "+H.a(y(a,z))))}w=a.constructor
v=w==null?null:w[$.$get$J()]
if(v!=null)return v
v=H.bf(a)
if(v!=null)return v
if(typeof a=="function")return C.o
y=Object.getPrototypeOf(a)
if(y==null)return C.e
if(y===Object.prototype)return C.e
if(typeof w=="function"){Object.defineProperty(w,$.$get$J(),{value:C.a,enumerable:false,writable:true,configurable:true})
return C.a}return C.a},
f:{"^":"b;",
h:["B",function(a){return H.B(a)}],
"%":"ApplicationCacheErrorEvent|AutocompleteErrorEvent|DOMError|ErrorEvent|Event|FileError|InputEvent|MediaError|Navigator|NavigatorUserMediaError|PositionError|SQLError|SpeechRecognitionError"},
aB:{"^":"f;",
h:function(a){return String(a)},
$isaU:1},
aE:{"^":"f;",
h:function(a){return"null"}},
K:{"^":"f;",
h:["C",function(a){return String(a)}]},
aH:{"^":"K;"},
M:{"^":"K;"},
z:{"^":"K;",
h:function(a){var z=a[$.$get$X()]
return z==null?this.C(a):J.u(z)},
$S:function(){return{func:1,opt:[,,,,,,,,,,,,,,,,]}}},
x:{"^":"f;",
h:function(a){return P.Z(a,"[","]")},
gu:function(a){return new J.ai(a,a.length,0,null)},
gk:function(a){return a.length},
$ise:1,
$ase:null},
bp:{"^":"x;"},
ai:{"^":"b;a,b,c,d",
gm:function(){return this.d},
n:function(){var z,y,x
z=this.a
y=z.length
if(this.b!==y)throw H.d(H.bh(z))
x=this.c
if(x>=y){this.d=null
return!1}this.d=z[x]
this.c=x+1
return!0}},
I:{"^":"f;",
h:function(a){if(a===0&&1/a<0)return"-0.0"
else return""+a},
t:function(a,b){return a+b},
$ist:1},
aD:{"^":"I;",$ist:1,$isb8:1},
aC:{"^":"I;",$ist:1},
y:{"^":"f;",
D:function(a,b){if(b>=a.length)throw H.d(H.a6(a,b))
return a.charCodeAt(b)},
t:function(a,b){if(typeof b!=="string")throw H.d(P.ah(b,null,null))
return a+b},
A:function(a,b,c){if(c==null)c=a.length
if(b>c)throw H.d(P.L(b,null,null))
if(c>a.length)throw H.d(P.L(c,null,null))
return a.substring(b,c)},
w:function(a,b){return this.A(a,b,null)},
h:function(a){return a},
gk:function(a){return a.length},
$isaO:1}}],["","",,H,{"^":"",
b0:function(a){return init.types[a]},
by:function(a,b){var z
if(b!=null){z=b.x
if(z!=null)return z}return!!J.j(a).$isA},
a:function(a){var z
if(typeof a==="string")return a
if(typeof a==="number"){if(a!==0)return""+a}else if(!0===a)return"true"
else if(!1===a)return"false"
else if(a==null)return"null"
z=J.u(a)
if(typeof z!=="string")throw H.d(H.a5(a))
return z},
aI:function(a){var z=a.$identityHash
if(z==null){z=Math.random()*0x3fffffff|0
a.$identityHash=z}return z},
a_:function(a){var z,y,x,w,v,u,t,s
z=J.j(a)
y=z.constructor
if(typeof y=="function"){x=y.name
w=typeof x==="string"?x:null}else w=null
if(w==null||z===C.h||!!J.j(a).$isM){v=C.d(a)
if(v==="Object"){u=a.constructor
if(typeof u=="function"){t=String(u).match(/^\s*function\s*([\w$]*)\s*\(/)
s=t==null?null:t[1]
if(typeof s==="string"&&/^\w+$/.test(s))w=s}if(w==null)w=v}else w=v}w=w
if(w.length>1&&C.b.D(w,0)===36)w=C.b.w(w,1)
return function(b,c){return b.replace(/[^<,> ]+/g,function(d){return c[d]||d})}(w+H.aa(H.b_(a),0,null),init.mangledGlobalNames)},
B:function(a){return"Instance of '"+H.a_(a)+"'"},
b1:function(a){throw H.d(H.a5(a))},
a9:function(a,b){if(a==null)J.G(a)
throw H.d(H.a6(a,b))},
a6:function(a,b){var z,y
if(typeof b!=="number"||Math.floor(b)!==b)return new P.r(!0,b,"index",null)
z=J.G(a)
if(!(b<0)){if(typeof z!=="number")return H.b1(z)
y=b>=z}else y=!0
if(y)return P.ax(b,a,"index",null,z)
return P.L(b,"index",null)},
a5:function(a){return new P.r(!0,a,null,null)},
d:function(a){var z
if(a==null)a=new P.aG()
z=new Error()
z.dartException=a
if("defineProperty" in Object){Object.defineProperty(z,"message",{get:H.af})
z.name=""}else z.toString=H.af
return z},
af:function(){return J.u(this.dartException)},
bh:function(a){throw H.d(new P.ao(a))},
b9:function(a,b,c,d,e,f,g){switch(c){case 0:return new H.ba(a).$0()
case 1:return new H.bb(a,d).$0()
case 2:return new H.bc(a,d,e).$0()
case 3:return new H.bd(a,d,e,f).$0()
case 4:return new H.be(a,d,e,f,g).$0()}throw H.d(new P.aQ("Unsupported number of arguments for wrapped closure"))},
bu:function(a,b){var z
if(a==null)return
z=a.$identity
if(!!z)return z
z=function(c,d,e,f){return function(g,h,i,j){return f(c,e,d,g,h,i,j)}}(a,b,$,H.b9)
a.$identity=z
return z},
an:function(a,b,c,d,e,f){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=b[0]
y=z.$callName
if(!!J.j(c).$ise){z.$reflectionInfo=c
x=H.aL(z).r}else x=c
w=d?Object.create(new H.aN().constructor.prototype):Object.create(new H.T(null,null,null,null).constructor.prototype)
w.$initialize=w.constructor
if(d)v=function(){this.$initialize()}
else{u=$.i
$.i=J.q(u,1)
v=new Function("a,b,c,d"+u,"this.$initialize(a,b,c,d"+u+")")}w.constructor=v
v.prototype=w
if(!d){t=e.length==1&&!0
s=H.W(a,z,t)
s.$reflectionInfo=c}else{w.$static_name=f
s=z
t=!1}if(typeof x=="number")r=function(g,h){return function(){return g(h)}}(H.b0,x)
else if(typeof x=="function")if(d)r=x
else{q=t?H.V:H.H
r=function(g,h){return function(){return g.apply({$receiver:h(this)},arguments)}}(x,q)}else throw H.d("Error in reflectionInfo.")
w.$S=r
w[y]=s
for(u=b.length,p=1;p<u;++p){o=b[p]
n=o.$callName
if(n!=null){m=d?o:H.W(a,o,t)
w[n]=m}}w["call*"]=s
w.$R=z.$R
w.$D=z.$D
return v},
ak:function(a,b,c,d){var z=H.H
switch(b?-1:a){case 0:return function(e,f){return function(){return f(this)[e]()}}(c,z)
case 1:return function(e,f){return function(g){return f(this)[e](g)}}(c,z)
case 2:return function(e,f){return function(g,h){return f(this)[e](g,h)}}(c,z)
case 3:return function(e,f){return function(g,h,i){return f(this)[e](g,h,i)}}(c,z)
case 4:return function(e,f){return function(g,h,i,j){return f(this)[e](g,h,i,j)}}(c,z)
case 5:return function(e,f){return function(g,h,i,j,k){return f(this)[e](g,h,i,j,k)}}(c,z)
default:return function(e,f){return function(){return e.apply(f(this),arguments)}}(d,z)}},
W:function(a,b,c){var z,y,x,w,v,u,t
if(c)return H.am(a,b)
z=b.$stubName
y=b.length
x=a[z]
w=b==null?x==null:b===x
v=!w||y>=27
if(v)return H.ak(y,!w,z,b)
if(y===0){w=$.i
$.i=J.q(w,1)
u="self"+H.a(w)
w="return function(){var "+u+" = this."
v=$.m
if(v==null){v=H.v("self")
$.m=v}return new Function(w+H.a(v)+";return "+u+"."+H.a(z)+"();}")()}t="abcdefghijklmnopqrstuvwxyz".split("").splice(0,y).join(",")
w=$.i
$.i=J.q(w,1)
t+=H.a(w)
w="return function("+t+"){return this."
v=$.m
if(v==null){v=H.v("self")
$.m=v}return new Function(w+H.a(v)+"."+H.a(z)+"("+t+");}")()},
al:function(a,b,c,d){var z,y
z=H.H
y=H.V
switch(b?-1:a){case 0:throw H.d(new H.aM("Intercepted function with no arguments."))
case 1:return function(e,f,g){return function(){return f(this)[e](g(this))}}(c,z,y)
case 2:return function(e,f,g){return function(h){return f(this)[e](g(this),h)}}(c,z,y)
case 3:return function(e,f,g){return function(h,i){return f(this)[e](g(this),h,i)}}(c,z,y)
case 4:return function(e,f,g){return function(h,i,j){return f(this)[e](g(this),h,i,j)}}(c,z,y)
case 5:return function(e,f,g){return function(h,i,j,k){return f(this)[e](g(this),h,i,j,k)}}(c,z,y)
case 6:return function(e,f,g){return function(h,i,j,k,l){return f(this)[e](g(this),h,i,j,k,l)}}(c,z,y)
default:return function(e,f,g,h){return function(){h=[g(this)]
Array.prototype.push.apply(h,arguments)
return e.apply(f(this),h)}}(d,z,y)}},
am:function(a,b){var z,y,x,w,v,u,t,s
z=H.aj()
y=$.U
if(y==null){y=H.v("receiver")
$.U=y}x=b.$stubName
w=b.length
v=a[x]
u=b==null?v==null:b===v
t=!u||w>=28
if(t)return H.al(w,!u,x,b)
if(w===1){y="return function(){return this."+H.a(z)+"."+H.a(x)+"(this."+H.a(y)+");"
u=$.i
$.i=J.q(u,1)
return new Function(y+H.a(u)+"}")()}s="abcdefghijklmnopqrstuvwxyz".split("").splice(0,w-1).join(",")
y="return function("+s+"){return this."+H.a(z)+"."+H.a(x)+"(this."+H.a(y)+", "+s+");"
u=$.i
$.i=J.q(u,1)
return new Function(y+H.a(u)+"}")()},
O:function(a,b,c,d,e,f){var z
b.fixed$length=Array
if(!!J.j(c).$ise){c.fixed$length=Array
z=c}else z=c
return H.an(a,b,z,!!d,e,f)},
bi:function(a){throw H.d(new P.aq(a))},
a8:function(a){return init.getIsolateTag(a)},
b_:function(a){if(a==null)return
return a.$ti},
p:function(a,b){var z
if(a==null)return"dynamic"
if(typeof a==="object"&&a!==null&&a.constructor===Array)return a[0].builtin$cls+H.aa(a,1,b)
if(typeof a=="function")return a.builtin$cls
if(typeof a==="number"&&Math.floor(a)===a)return H.a(a)
if(typeof a.func!="undefined"){z=a.typedef
if(z!=null)return H.p(z,b)
return H.aS(a,b)}return"unknown-reified-type"},
aS:function(a,b){var z,y,x,w,v,u,t,s,r,q,p
z=!!a.v?"void":H.p(a.ret,b)
if("args" in a){y=a.args
for(x=y.length,w="",v="",u=0;u<x;++u,v=", "){t=y[u]
w=w+v+H.p(t,b)}}else{w=""
v=""}if("opt" in a){s=a.opt
w+=v+"["
for(x=s.length,v="",u=0;u<x;++u,v=", "){t=s[u]
w=w+v+H.p(t,b)}w+="]"}if("named" in a){r=a.named
w+=v+"{"
for(x=H.aW(r),q=x.length,v="",u=0;u<q;++u,v=", "){p=x[u]
w=w+v+H.p(r[p],b)+(" "+H.a(p))}w+="}"}return"("+w+") => "+z},
aa:function(a,b,c){var z,y,x,w,v,u
if(a==null)return""
z=new P.a1("")
for(y=b,x=!0,w=!0,v="";y<a.length;++y){if(x)x=!1
else z.j=v+", "
u=a[y]
if(u!=null)w=!1
v=z.j+=H.p(u,c)}return w?"":"<"+z.h(0)+">"},
bz:function(a){var z=$.Q
return"Instance of "+(z==null?"<Unknown>":z.$1(a))},
bx:function(a){return H.aI(a)},
bv:function(a,b,c){Object.defineProperty(a,b,{value:c,enumerable:false,writable:true,configurable:true})},
bf:function(a){var z,y,x,w,v,u
z=$.Q.$1(a)
y=$.C[z]
if(y!=null){Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}x=$.E[z]
if(x!=null)return x
w=init.interceptorsByTag[z]
if(w==null){z=$.a4.$2(a,z)
if(z!=null){y=$.C[z]
if(y!=null){Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}x=$.E[z]
if(x!=null)return x
w=init.interceptorsByTag[z]}}if(w==null)return
x=w.prototype
v=z[0]
if(v==="!"){y=H.S(x)
$.C[z]=y
Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}if(v==="~"){$.E[z]=x
return x}if(v==="-"){u=H.S(x)
Object.defineProperty(Object.getPrototypeOf(a),init.dispatchPropertyName,{value:u,enumerable:false,writable:true,configurable:true})
return u.i}if(v==="+")return H.ad(a,x)
if(v==="*")throw H.d(new P.a3(z))
if(init.leafTags[z]===true){u=H.S(x)
Object.defineProperty(Object.getPrototypeOf(a),init.dispatchPropertyName,{value:u,enumerable:false,writable:true,configurable:true})
return u.i}else return H.ad(a,x)},
ad:function(a,b){var z=Object.getPrototypeOf(a)
Object.defineProperty(z,init.dispatchPropertyName,{value:J.F(b,z,null,null),enumerable:false,writable:true,configurable:true})
return b},
S:function(a){return J.F(a,!1,null,!!a.$isA)},
bg:function(a,b,c){var z=b.prototype
if(init.leafTags[a]===true)return J.F(z,!1,null,!!z.$isA)
else return J.F(z,c,null,null)},
b6:function(){if(!0===$.R)return
$.R=!0
H.b7()},
b7:function(){var z,y,x,w,v,u,t,s
$.C=Object.create(null)
$.E=Object.create(null)
H.b2()
z=init.interceptorsByTag
y=Object.getOwnPropertyNames(z)
if(typeof window!="undefined"){window
x=function(){}
for(w=0;w<y.length;++w){v=y[w]
u=$.ae.$1(v)
if(u!=null){t=H.bg(v,z[v],u)
if(t!=null){Object.defineProperty(u,init.dispatchPropertyName,{value:t,enumerable:false,writable:true,configurable:true})
x.prototype=u}}}}for(w=0;w<y.length;++w){v=y[w]
if(/^[A-Za-z_]/.test(v)){s=z[v]
z["!"+v]=s
z["~"+v]=s
z["-"+v]=s
z["+"+v]=s
z["*"+v]=s}}},
b2:function(){var z,y,x,w,v,u,t
z=C.i()
z=H.k(C.j,H.k(C.k,H.k(C.c,H.k(C.c,H.k(C.m,H.k(C.l,H.k(C.n(C.d),z)))))))
if(typeof dartNativeDispatchHooksTransformer!="undefined"){y=dartNativeDispatchHooksTransformer
if(typeof y=="function")y=[y]
if(y.constructor==Array)for(x=0;x<y.length;++x){w=y[x]
if(typeof w=="function")z=w(z)||z}}v=z.getTag
u=z.getUnknownTag
t=z.prototypeForTag
$.Q=new H.b3(v)
$.a4=new H.b4(u)
$.ae=new H.b5(t)},
k:function(a,b){return a(b)||b},
aK:{"^":"b;a,b,c,d,e,f,r,x",l:{
aL:function(a){var z,y,x
z=a.$reflectionInfo
if(z==null)return
z.fixed$length=Array
z=z
y=z[0]
x=z[1]
return new H.aK(a,z,(y&1)===1,y>>1,x>>1,(x&1)===1,z[2],null)}}},
ba:{"^":"h;a",
$0:function(){return this.a.$0()}},
bb:{"^":"h;a,b",
$0:function(){return this.a.$1(this.b)}},
bc:{"^":"h;a,b,c",
$0:function(){return this.a.$2(this.b,this.c)}},
bd:{"^":"h;a,b,c,d",
$0:function(){return this.a.$3(this.b,this.c,this.d)}},
be:{"^":"h;a,b,c,d,e",
$0:function(){return this.a.$4(this.b,this.c,this.d,this.e)}},
h:{"^":"b;",
h:function(a){return"Closure '"+H.a_(this).trim()+"'"},
gv:function(){return this},
gv:function(){return this}},
a2:{"^":"h;"},
aN:{"^":"a2;",
h:function(a){var z=this.$static_name
if(z==null)return"Closure of unknown static method"
return"Closure '"+z+"'"}},
T:{"^":"a2;a,b,c,d",
h:function(a){var z=this.c
if(z==null)z=this.a
return"Closure '"+H.a(this.d)+"' of "+H.B(z)},
l:{
H:function(a){return a.a},
V:function(a){return a.c},
aj:function(){var z=$.m
if(z==null){z=H.v("self")
$.m=z}return z},
v:function(a){var z,y,x,w,v
z=new H.T("self","target","receiver","name")
y=Object.getOwnPropertyNames(z)
y.fixed$length=Array
x=y
for(y=x.length,w=0;w<y;++w){v=x[w]
if(z[v]===a)return v}}}},
aM:{"^":"n;a",
h:function(a){return"RuntimeError: "+this.a}},
b3:{"^":"h;a",
$1:function(a){return this.a(a)}},
b4:{"^":"h;a",
$2:function(a,b){return this.a(a,b)}},
b5:{"^":"h;a",
$1:function(a){return this.a(a)}}}],["","",,H,{"^":"",
aW:function(a){var z=a?Object.keys(a):[]
z.fixed$length=Array
return z}}],["","",,P,{"^":"",
Z:function(a,b,c){var z,y,x
if(P.aT(a))return b+"..."+c
z=new P.a1(b)
y=$.$get$N()
y.push(a)
try{x=z
x.j=P.aP(x.gj(),a,", ")}finally{if(0>=y.length)return H.a9(y,-1)
y.pop()}y=z
y.j=y.gj()+c
y=z.gj()
return y.charCodeAt(0)==0?y:y},
aT:function(a){var z,y
for(z=0;y=$.$get$N(),z<y.length;++z)if(a===y[z])return!0
return!1},
aF:{"^":"b;",
h:function(a){return P.Z(a,"[","]")},
$ise:1,
$ase:null}}],["","",,P,{"^":"",
Y:function(a){if(typeof a==="number"||typeof a==="boolean"||null==a)return J.u(a)
if(typeof a==="string")return JSON.stringify(a)
return P.as(a)},
as:function(a){var z=J.j(a)
if(!!z.$ish)return z.h(a)
return H.B(a)},
aU:{"^":"b;",
h:function(a){return this?"true":"false"}},
"+bool":0,
bw:{"^":"t;"},
"+double":0,
n:{"^":"b;"},
aG:{"^":"n;",
h:function(a){return"Throw of null."}},
r:{"^":"n;a,b,c,d",
gq:function(){return"Invalid argument"+(!this.a?"(s)":"")},
gp:function(){return""},
h:function(a){var z,y,x,w,v,u
z=this.c
y=z!=null?" ("+z+")":""
z=this.d
x=z==null?"":": "+z
w=this.gq()+y+x
if(!this.a)return w
v=this.gp()
u=P.Y(this.b)
return w+v+": "+H.a(u)},
l:{
ah:function(a,b,c){return new P.r(!0,a,b,c)}}},
a0:{"^":"r;e,f,a,b,c,d",
gq:function(){return"RangeError"},
gp:function(){var z,y,x
z=this.e
if(z==null){z=this.f
y=z!=null?": Not less than or equal to "+H.a(z):""}else{x=this.f
if(x==null)y=": Not greater than or equal to "+H.a(z)
else if(x>z)y=": Not in range "+H.a(z)+".."+H.a(x)+", inclusive"
else y=x<z?": Valid value range is empty":": Only valid value is "+H.a(z)}return y},
l:{
aJ:function(a){return new P.a0(null,null,!1,null,null,a)},
L:function(a,b,c){return new P.a0(null,null,!0,a,b,"Value not in range")}}},
aw:{"^":"r;e,k:f>,a,b,c,d",
gq:function(){return"RangeError"},
gp:function(){var z=this.b
if(typeof z!=="number")return z.E()
if(z<0)return": index must not be negative"
z=this.f
if(z===0)return": no indices are valid"
return": index should be less than "+H.a(z)},
l:{
ax:function(a,b,c,d,e){var z=e!=null?e:J.G(b)
return new P.aw(b,z,!0,a,c,"Index out of range")}}},
a3:{"^":"n;a",
h:function(a){var z=this.a
return z!=null?"UnimplementedError: "+H.a(z):"UnimplementedError"}},
ao:{"^":"n;a",
h:function(a){var z=this.a
if(z==null)return"Concurrent modification during iteration."
return"Concurrent modification during iteration: "+H.a(P.Y(z))+"."}},
aq:{"^":"n;a",
h:function(a){var z=this.a
return z==null?"Reading static variable during its initialization":"Reading static variable '"+H.a(z)+"' during its initialization"}},
aQ:{"^":"b;a",
h:function(a){return"Exception: "+this.a}},
b8:{"^":"t;"},
"+int":0,
e:{"^":"b;",$ase:null},
"+List":0,
br:{"^":"b;",
h:function(a){return"null"}},
"+Null":0,
t:{"^":"b;"},
"+num":0,
b:{"^":";",
h:function(a){return H.B(this)},
toString:function(){return this.h(this)}},
aO:{"^":"b;"},
"+String":0,
a1:{"^":"b;j<",
gk:function(a){return this.j.length},
h:function(a){var z=this.j
return z.charCodeAt(0)==0?z:z},
l:{
aP:function(a,b,c){var z=J.ag(b)
if(!z.n())return a
if(c.length===0){do a+=H.a(z.gm())
while(z.n())}else{a+=H.a(z.gm())
for(;z.n();)a=a+c+H.a(z.gm())}return a}}}}],["","",,W,{"^":"",w:{"^":"ar;","%":"HTMLAudioElement|HTMLBRElement|HTMLBaseElement|HTMLBodyElement|HTMLButtonElement|HTMLCanvasElement|HTMLContentElement|HTMLDListElement|HTMLDataListElement|HTMLDetailsElement|HTMLDialogElement|HTMLDirectoryElement|HTMLDivElement|HTMLEmbedElement|HTMLFieldSetElement|HTMLFontElement|HTMLFrameElement|HTMLFrameSetElement|HTMLHRElement|HTMLHeadElement|HTMLHeadingElement|HTMLHtmlElement|HTMLIFrameElement|HTMLImageElement|HTMLInputElement|HTMLKeygenElement|HTMLLIElement|HTMLLabelElement|HTMLLegendElement|HTMLLinkElement|HTMLMapElement|HTMLMarqueeElement|HTMLMediaElement|HTMLMenuElement|HTMLMenuItemElement|HTMLMetaElement|HTMLMeterElement|HTMLModElement|HTMLOListElement|HTMLObjectElement|HTMLOptGroupElement|HTMLOptionElement|HTMLOutputElement|HTMLParagraphElement|HTMLParamElement|HTMLPictureElement|HTMLPreElement|HTMLProgressElement|HTMLQuoteElement|HTMLScriptElement|HTMLShadowElement|HTMLSlotElement|HTMLSourceElement|HTMLSpanElement|HTMLStyleElement|HTMLTableCaptionElement|HTMLTableCellElement|HTMLTableColElement|HTMLTableDataCellElement|HTMLTableElement|HTMLTableHeaderCellElement|HTMLTableRowElement|HTMLTableSectionElement|HTMLTemplateElement|HTMLTextAreaElement|HTMLTitleElement|HTMLTrackElement|HTMLUListElement|HTMLUnknownElement|HTMLVideoElement;HTMLElement"},bj:{"^":"w;",
h:function(a){return String(a)},
"%":"HTMLAnchorElement"},bk:{"^":"w;",
h:function(a){return String(a)},
"%":"HTMLAreaElement"},bl:{"^":"o;k:length=","%":"CDATASection|CharacterData|Comment|ProcessingInstruction|Text"},bm:{"^":"ay;k:length=","%":"CSS2Properties|CSSStyleDeclaration|MSStyleCSSProperties"},ay:{"^":"f+ap;"},ap:{"^":"b;"},bn:{"^":"f;",
h:function(a){return String(a)},
"%":"DOMException"},ar:{"^":"o;",
h:function(a){return a.localName},
"%":"SVGAElement|SVGAnimateElement|SVGAnimateMotionElement|SVGAnimateTransformElement|SVGAnimationElement|SVGCircleElement|SVGClipPathElement|SVGComponentTransferFunctionElement|SVGCursorElement|SVGDefsElement|SVGDescElement|SVGDiscardElement|SVGElement|SVGEllipseElement|SVGFEBlendElement|SVGFEColorMatrixElement|SVGFEComponentTransferElement|SVGFECompositeElement|SVGFEConvolveMatrixElement|SVGFEDiffuseLightingElement|SVGFEDisplacementMapElement|SVGFEDistantLightElement|SVGFEDropShadowElement|SVGFEFloodElement|SVGFEFuncAElement|SVGFEFuncBElement|SVGFEFuncGElement|SVGFEFuncRElement|SVGFEGaussianBlurElement|SVGFEImageElement|SVGFEMergeElement|SVGFEMergeNodeElement|SVGFEMorphologyElement|SVGFEOffsetElement|SVGFEPointLightElement|SVGFESpecularLightingElement|SVGFESpotLightElement|SVGFETileElement|SVGFETurbulenceElement|SVGFilterElement|SVGForeignObjectElement|SVGGElement|SVGGeometryElement|SVGGradientElement|SVGGraphicsElement|SVGImageElement|SVGLineElement|SVGLinearGradientElement|SVGMPathElement|SVGMarkerElement|SVGMaskElement|SVGMetadataElement|SVGPathElement|SVGPatternElement|SVGPolygonElement|SVGPolylineElement|SVGRadialGradientElement|SVGRectElement|SVGSVGElement|SVGScriptElement|SVGSetElement|SVGStopElement|SVGStyleElement|SVGSwitchElement|SVGSymbolElement|SVGTSpanElement|SVGTextContentElement|SVGTextElement|SVGTextPathElement|SVGTextPositioningElement|SVGTitleElement|SVGUseElement|SVGViewElement;Element"},at:{"^":"f;","%":"DOMWindow|Window;EventTarget"},bo:{"^":"w;k:length=","%":"HTMLFormElement"},o:{"^":"at;",
h:function(a){var z=a.nodeValue
return z==null?this.B(a):z},
"%":"Attr|Document|DocumentFragment|DocumentType|HTMLDocument|ShadowRoot|XMLDocument;Node"},bs:{"^":"w;k:length=","%":"HTMLSelectElement"},bt:{"^":"aA;",
gk:function(a){return a.length},
$ise:1,
$ase:function(){return[W.o]},
$isA:1,
$asA:function(){return[W.o]},
"%":"MozNamedAttrMap|NamedNodeMap"},az:{"^":"f+aF;",
$ase:function(){return[W.o]},
$ise:1},aA:{"^":"az+av;",
$ase:function(){return[W.o]},
$ise:1},av:{"^":"b;",
gu:function(a){return new W.au(a,a.length,-1,null)},
$ise:1,
$ase:null},au:{"^":"b;a,b,c,d",
n:function(){var z,y
z=this.c+1
y=this.b
if(z<y){y=this.a
if(z<0||z>=y.length)return H.a9(y,z)
this.d=y[z]
this.c=z
return!0}this.d=null
this.c=y
return!1},
gm:function(){return this.d}}}],["","",,P,{"^":"",aR:{"^":"b;",
i:function(a){if(a<=0||a>4294967296)throw H.d(P.aJ("max must be in range 0 < max \u2264 2^32, was "+a))
return Math.random()*a>>>0}}}],["","",,P,{"^":""}],["","",,P,{"^":""}],["","",,F,{"^":"",
ab:function(){var z,y
z=document
$.ac=z.querySelector("#output")
$.c=C.f
y=z.createElementNS("http://www.w3.org/2000/svg","svg")
y.setAttribute("version","1.1")
$.l=y
y.setAttribute("width","800")
$.l.setAttribute("height","600")
F.aV()
$.ac.appendChild($.l)},
D:function(){var z=$.c.i(256)
return"rgb("+z+", "+z+", "+z+")"},
aV:function(){var z,y,x,w,v,u,t,s,r,q,p
z=$.l.style
y=F.D()
z.backgroundColor=y
x=$.c.i(50)+25
for(w=0;w<x;++w){v=$.c.i(3)
if(v===0){u=document.createElementNS("http://www.w3.org/2000/svg","circle")
u.setAttribute("cx",""+$.c.i(800))
u.setAttribute("cy",""+$.c.i(600))
u.setAttribute("r",""+($.c.i(40)+10))
t=F.D()
u.setAttribute("stroke",t)
u.setAttribute("fill",t)
$.l.appendChild(u)}if(v===1){u=document.createElementNS("http://www.w3.org/2000/svg","polyline")
s=$.c.i(800)
r=$.c.i(600)
q=s-50+$.c.i(100)
p=r-50+$.c.i(100)
z=$.c.i(60)
y=$.c.i(60)
t=F.D()
u.setAttribute("stroke",t)
u.setAttribute("fill",t)
u.setAttribute("points",""+s+","+r+" "+q+","+p+" "+(q-50+z)+","+(p-50+y))
$.l.appendChild(u)}if(v===2){u=document.createElementNS("http://www.w3.org/2000/svg","polyline")
s=$.c.i(800)
r=$.c.i(600)
z=$.c.i(100)
y=$.c.i(100)
t=F.D()
u.setAttribute("stroke",t)
u.setAttribute("fill",t)
u.setAttribute("stroke-width",""+(1+$.c.i(6)))
u.setAttribute("points",""+s+","+r+" "+(s-50+z)+","+(r-50+y))
$.l.appendChild(u)}}}},1]]
setupProgram(dart,0)
J.j=function(a){if(typeof a=="number"){if(Math.floor(a)==a)return J.aD.prototype
return J.aC.prototype}if(typeof a=="string")return J.y.prototype
if(a==null)return J.aE.prototype
if(typeof a=="boolean")return J.aB.prototype
if(a.constructor==Array)return J.x.prototype
if(typeof a!="object"){if(typeof a=="function")return J.z.prototype
return a}if(a instanceof P.b)return a
return J.P(a)}
J.aX=function(a){if(typeof a=="string")return J.y.prototype
if(a==null)return a
if(a.constructor==Array)return J.x.prototype
if(typeof a!="object"){if(typeof a=="function")return J.z.prototype
return a}if(a instanceof P.b)return a
return J.P(a)}
J.aY=function(a){if(a==null)return a
if(a.constructor==Array)return J.x.prototype
if(typeof a!="object"){if(typeof a=="function")return J.z.prototype
return a}if(a instanceof P.b)return a
return J.P(a)}
J.aZ=function(a){if(typeof a=="number")return J.I.prototype
if(typeof a=="string")return J.y.prototype
if(a==null)return a
if(!(a instanceof P.b))return J.M.prototype
return a}
J.q=function(a,b){if(typeof a=="number"&&typeof b=="number")return a+b
return J.aZ(a).t(a,b)}
J.ag=function(a){return J.aY(a).gu(a)}
J.G=function(a){return J.aX(a).gk(a)}
J.u=function(a){return J.j(a).h(a)}
var $=I.p
C.h=J.f.prototype
C.b=J.y.prototype
C.o=J.z.prototype
C.e=J.aH.prototype
C.a=J.M.prototype
C.f=new P.aR()
C.i=function() {  var toStringFunction = Object.prototype.toString;  function getTag(o) {    var s = toStringFunction.call(o);    return s.substring(8, s.length - 1);  }  function getUnknownTag(object, tag) {    if (/^HTML[A-Z].*Element$/.test(tag)) {      var name = toStringFunction.call(object);      if (name == "[object Object]") return null;      return "HTMLElement";    }  }  function getUnknownTagGenericBrowser(object, tag) {    if (self.HTMLElement && object instanceof HTMLElement) return "HTMLElement";    return getUnknownTag(object, tag);  }  function prototypeForTag(tag) {    if (typeof window == "undefined") return null;    if (typeof window[tag] == "undefined") return null;    var constructor = window[tag];    if (typeof constructor != "function") return null;    return constructor.prototype;  }  function discriminator(tag) { return null; }  var isBrowser = typeof navigator == "object";  return {    getTag: getTag,    getUnknownTag: isBrowser ? getUnknownTagGenericBrowser : getUnknownTag,    prototypeForTag: prototypeForTag,    discriminator: discriminator };}
C.c=function(hooks) { return hooks; }
C.j=function(hooks) {  if (typeof dartExperimentalFixupGetTag != "function") return hooks;  hooks.getTag = dartExperimentalFixupGetTag(hooks.getTag);}
C.k=function(hooks) {  var getTag = hooks.getTag;  var prototypeForTag = hooks.prototypeForTag;  function getTagFixed(o) {    var tag = getTag(o);    if (tag == "Document") {      // "Document", so we check for the xmlVersion property, which is the empty      if (!!o.xmlVersion) return "!Document";      return "!HTMLDocument";    }    return tag;  }  function prototypeForTagFixed(tag) {    if (tag == "Document") return null;    return prototypeForTag(tag);  }  hooks.getTag = getTagFixed;  hooks.prototypeForTag = prototypeForTagFixed;}
C.l=function(hooks) {  var userAgent = typeof navigator == "object" ? navigator.userAgent : "";  if (userAgent.indexOf("Firefox") == -1) return hooks;  var getTag = hooks.getTag;  var quickMap = {    "BeforeUnloadEvent": "Event",    "DataTransfer": "Clipboard",    "GeoGeolocation": "Geolocation",    "Location": "!Location",    "WorkerMessageEvent": "MessageEvent",    "XMLDocument": "!Document"};  function getTagFirefox(o) {    var tag = getTag(o);    return quickMap[tag] || tag;  }  hooks.getTag = getTagFirefox;}
C.d=function getTagFallback(o) {  var s = Object.prototype.toString.call(o);  return s.substring(8, s.length - 1);}
C.m=function(hooks) {  var userAgent = typeof navigator == "object" ? navigator.userAgent : "";  if (userAgent.indexOf("Trident/") == -1) return hooks;  var getTag = hooks.getTag;  var quickMap = {    "BeforeUnloadEvent": "Event",    "DataTransfer": "Clipboard",    "HTMLDDElement": "HTMLElement",    "HTMLDTElement": "HTMLElement",    "HTMLPhraseElement": "HTMLElement",    "Position": "Geoposition"  };  function getTagIE(o) {    var tag = getTag(o);    var newTag = quickMap[tag];    if (newTag) return newTag;    if (tag == "Object") {      if (window.DataView && (o instanceof window.DataView)) return "DataView";    }    return tag;  }  function prototypeForTagIE(tag) {    var constructor = window[tag];    if (constructor == null) return null;    return constructor.prototype;  }  hooks.getTag = getTagIE;  hooks.prototypeForTag = prototypeForTagIE;}
C.n=function(getTagFallback) {  return function(hooks) {    if (typeof navigator != "object") return hooks;    var ua = navigator.userAgent;    if (ua.indexOf("DumpRenderTree") >= 0) return hooks;    if (ua.indexOf("Chrome") >= 0) {      function confirm(p) {        return typeof window == "object" && window[p] && window[p].name == p;      }      if (confirm("Window") && confirm("HTMLElement")) return hooks;    }    hooks.getTag = getTagFallback;  };}
$.i=0
$.m=null
$.U=null
$.Q=null
$.a4=null
$.ae=null
$.C=null
$.E=null
$.R=null
$.ac=null
$.c=null
$.l=null
$=null
init.isHunkLoaded=function(a){return!!$dart_deferred_initializers$[a]}
init.deferredInitialized=new Object(null)
init.isHunkInitialized=function(a){return init.deferredInitialized[a]}
init.initializeLoadedHunk=function(a){$dart_deferred_initializers$[a]($globals$,$)
init.deferredInitialized[a]=true}
init.deferredLibraryUris={}
init.deferredLibraryHashes={};(function(a){for(var z=0;z<a.length;){var y=a[z++]
var x=a[z++]
var w=a[z++]
I.$lazy(y,x,w)}})(["X","$get$X",function(){return H.a8("_$dart_dartClosure")},"J","$get$J",function(){return H.a8("_$dart_js")},"N","$get$N",function(){return[]}])
I=I.$finishIsolateConstructor(I)
$=new I()
init.metadata=[]
init.types=[]
function convertToFastObject(a){function MyClass(){}MyClass.prototype=a
new MyClass()
return a}function convertToSlowObject(a){a.__MAGIC_SLOW_PROPERTY=1
delete a.__MAGIC_SLOW_PROPERTY
return a}A=convertToFastObject(A)
B=convertToFastObject(B)
C=convertToFastObject(C)
D=convertToFastObject(D)
E=convertToFastObject(E)
F=convertToFastObject(F)
G=convertToFastObject(G)
H=convertToFastObject(H)
J=convertToFastObject(J)
K=convertToFastObject(K)
L=convertToFastObject(L)
M=convertToFastObject(M)
N=convertToFastObject(N)
O=convertToFastObject(O)
P=convertToFastObject(P)
Q=convertToFastObject(Q)
R=convertToFastObject(R)
S=convertToFastObject(S)
T=convertToFastObject(T)
U=convertToFastObject(U)
V=convertToFastObject(V)
W=convertToFastObject(W)
X=convertToFastObject(X)
Y=convertToFastObject(Y)
Z=convertToFastObject(Z)
function init(){I.p=Object.create(null)
init.allClasses=map()
init.getTypeFromName=function(a){return init.allClasses[a]}
init.interceptorsByTag=map()
init.leafTags=map()
init.finishedClasses=map()
I.$lazy=function(a,b,c,d,e){if(!init.lazies)init.lazies=Object.create(null)
init.lazies[a]=b
e=e||I.p
var z={}
var y={}
e[a]=z
e[b]=function(){var x=this[a]
if(x==y)H.bi(d||a)
try{if(x===z){this[a]=y
try{x=this[a]=c()}finally{if(x===z)this[a]=null}}return x}finally{this[b]=function(){return this[a]}}}}
I.$finishIsolateConstructor=function(a){var z=a.p
function Isolate(){var y=Object.keys(z)
for(var x=0;x<y.length;x++){var w=y[x]
this[w]=z[w]}var v=init.lazies
var u=v?Object.keys(v):[]
for(var x=0;x<u.length;x++)this[v[u[x]]]=null
function ForceEfficientMap(){}ForceEfficientMap.prototype=this
new ForceEfficientMap()
for(var x=0;x<u.length;x++){var t=v[u[x]]
this[t]=z[t]}}Isolate.prototype=a.prototype
Isolate.prototype.constructor=Isolate
Isolate.p=z
Isolate.a7=a.a7
return Isolate}}!function(){var z=function(a){var t={}
t[a]=1
return Object.keys(convertToFastObject(t))[0]}
init.getIsolateTag=function(a){return z("___dart_"+a+init.isolateTag)}
var y="___dart_isolate_tags_"
var x=Object[y]||(Object[y]=Object.create(null))
var w="_ZxYxX"
for(var v=0;;v++){var u=z(w+"_"+v+"_")
if(!(u in x)){x[u]=1
init.isolateTag=u
break}}init.dispatchPropertyName=init.getIsolateTag("dispatch_record")}();(function(a){if(typeof document==="undefined"){a(null)
return}if(typeof document.currentScript!='undefined'){a(document.currentScript)
return}var z=document.scripts
function onLoad(b){for(var x=0;x<z.length;++x)z[x].removeEventListener("load",onLoad,false)
a(b.target)}for(var y=0;y<z.length;++y)z[y].addEventListener("load",onLoad,false)})(function(a){init.currentScript=a
if(typeof dartMainRunner==="function")dartMainRunner(F.ab,[])
else F.ab([])})})()