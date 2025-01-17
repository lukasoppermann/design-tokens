(()=>{"use strict";const e={filename:"design-tokens",extension:".tokens.json",nameConversion:"default",tokenFormat:"standard",compression:!1,urlJsonCompression:!0,serverUrl:void 0,eventType:"update-tokens",accessToken:void 0,acceptHeader:"application/vnd.github.everest-preview+json",contentType:"text/plain;charset=UTF-8",authType:"token",reference:"main",exclusionPrefix:"",excludeExtensionProp:!1,alias:"alias, ref, reference",keyInName:!1,prefixInName:!0,modeInTokenValue:!1,modeInTokenName:!1,resolveSameCollectionOrModeReference:!1,prefix:{color:"color",gradient:"gradient",typography:"typography",font:"font",effect:"effect",grid:"grid",border:"border, borders",breakpoint:"breakpoint, breakpoints",radius:"radius, radii",size:"size, sizes",spacing:"spacing",motion:"motion",opacity:"opacity, opacities"},exports:{color:!0,gradient:!0,font:!0,typography:!0,effect:!0,grid:!0,border:!0,breakpoint:!0,radius:!0,size:!0,spacing:!0,motion:!0,opacity:!0,variables:!0}},t={ui:{generalSettings:{width:550,height:836},export:{width:550,height:356},urlExport:{width:550,height:650}},key:{lastVersionSettingsOpened:"lastVersionSettingsOpened",fileId:"fileId",settings:"settings",extensionPluginData:"org.lukasoppermann.figmaDesignTokens",extensionFigmaStyleId:"styleId",extensionVariableStyleId:"variableId",extensionAlias:"alias",authType:{token:"token",gitlabToken:"gitlab_token",gitlabCommit:"gitlab_commit",basic:"Basic",bearer:"Bearer"}},exclusionPrefixDefault:["_","."],fileExtensions:[{label:".tokens.json",value:".tokens.json"},{label:".tokens",value:".tokens"},{label:".json",value:".json"}]},n=(e,t=!0)=>!0===t?JSON.stringify(e):JSON.stringify(e,null,2),i=(e,t)=>Object.fromEntries(Object.entries(e).map((([n,i])=>void 0!==i&&typeof t[n]!=typeof i?[n,e[n]]:[n,t[n]])));var a=function(e,t,n,i){return new(n||(n=Promise))((function(a,o){function r(e){try{l(i.next(e))}catch(e){o(e)}}function s(e){try{l(i.throw(e))}catch(e){o(e)}}function l(e){var t;e.done?a(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(r,s)}l((i=i.apply(e,t||[])).next())}))};const o={generalSettings:"generalSettings",export:"export",sendSettings:"sendSettings",urlExport:"urlExport",help:"help",demo:"demo",openUrl:"openUrl",reset:"reset",saveSettings:"saveSettings",closePlugin:"closePlugin"},r="6.11.1";const s=e=>{return n=void 0,i=void 0,o=function*(){const n=yield e.clientStorage.getAsync(t.key.lastVersionSettingsOpened),i=((e,t="1.0.0")=>{const[n,i,a]=t.split("."),[o,r,s]=e.split(".");return n<o?"major":i<r?"minor":a<s?"patch":void 0})(r,n);return n&&n===r||(yield e.clientStorage.setAsync(t.key.lastVersionSettingsOpened,r)),i},new((a=void 0)||(a=Promise))((function(e,t){function r(e){try{l(o.next(e))}catch(e){t(e)}}function s(e){try{l(o.throw(e))}catch(e){t(e)}}function l(t){var n;t.done?e(t.value):(n=t.value,n instanceof a?n:new a((function(e){e(n)}))).then(r,s)}l((o=o.apply(n,i||[])).next())}));var n,i,a,o},l=e=>{let n=e.root.getPluginData(t.key.fileId);return void 0!==n&&""!==n||(e.root.setPluginData(t.key.fileId,e.root.name+" "+Math.floor(1e9*Math.random())),n=e.root.getPluginData(t.key.fileId)),n},c="color",u="gradient",p="font",d="effect",y="grid",g="border",m="breakpoint",f="radius",v="size",x="spacing",b="motion",h="opacity",k="variables",S=(e,t=2)=>{if(void 0===e)return;if("number"!=typeof e||"number"!=typeof t)throw new Error(`Invalid parameters, both value "${e}" (${typeof e}) and decimalPlaces "${t}" (${typeof t}) must be of type number`);const n=Math.pow(10,t);return Math.round(e*n)/n},A=(e,t)=>{var n;return{r:S(255*e.r,0),g:S(255*e.g,0),b:S(255*e.b,0),a:S(null!==(n=null!=t?t:e.a)&&void 0!==n?n:1)}},I=e=>"SOLID"===e.type&&!0===e.visible?A(e.color,e.opacity):null,E={fill:{value:{r:0,g:0,b:0,a:0},type:"color",blendMode:"normal"}},R=e=>e?{[t.key.extensionAlias]:e}:{},T={GRADIENT_LINEAR:"linear",GRADIENT_RADIAL:"radial",GRADIENT_ANGULAR:"angular",GRADIENT_DIAMOND:"diamond"},O=([[e,t],[n,i]])=>{const a=Math.atan2(i-t,n-e)*(180/Math.PI)+315;return a>360?a-360:a},w=(e,n)=>e.reduce(((e,i)=>{const a=i.paints.filter((e=>"IMAGE"!==e.type));if(i.paints.length&&0===a.length)return e;i.paints=a;const{alias:o,description:r}=((e="",t)=>{t=t&&0!==t.filter((e=>e)).length?t:["Ref:"];const n=new RegExp("("+t.join("|").toLowerCase()+"):?\\s");let i;const a=e.split(/\r?\n/).filter((e=>!e.toLowerCase().match(n)||(i=e.toLowerCase().replace(n,"").trim(),!1)));return{alias:i,description:a.join("\n")}})(i.description,n.alias),s=(l=i.paints[0],["GRADIENT_LINEAR","GRADIENT_RADIAL","GRADIENT_ANGULAR","GRADIENT_DIAMOND"].includes(null==l?void 0:l.type));var l;const p=i.paints.length?i.paints.map((e=>(e=>{var t;return"SOLID"===e.type?{fill:{value:I(e),type:"color",blendMode:(null===(t=e.blendMode)||void 0===t?void 0:t.toLowerCase())||"normal"}}:["GRADIENT_LINEAR","GRADIENT_RADIAL","GRADIENT_ANGULAR","GRADIENT_DIAMOND"].includes(e.type)?{gradientType:{value:T[e.type],type:"string"},rotation:{value:O(e.gradientTransform),type:"number",unit:"degree"},stops:e.gradientStops.map((e=>({position:{value:S(e.position),type:"number"},color:{value:A(e.color),type:"color"}}))),opacity:{value:S(e.opacity),type:"number"}}:null})(e))):[E];return[...e,{name:`${s?n.gradient[0]:n.color[0]}/${i.name}`,category:s?"gradient":"color",exportKey:s?u:c,description:r,values:p,extensions:{[t.key.extensionPluginData]:Object.assign({[t.key.extensionFigmaStyleId]:i.id,exportKey:s?u:c},R(o))}}]}),[]),L=(e,n)=>e.filter((e=>e.layoutGrids.length>0)).map((e=>({name:`${n[0]}/${e.name}`,category:"grid",exportKey:y,description:e.description||null,values:e.layoutGrids.map((e=>"GRID"===e.pattern?(e=>({pattern:{value:e.pattern.toLowerCase(),type:"string"},sectionSize:{value:e.sectionSize,unit:"pixel",type:"number"}}))(e):(e=>{return Object.assign(Object.assign(Object.assign({pattern:{value:e.pattern.toLowerCase(),type:"string"}},void 0!==e.sectionSize&&{sectionSize:{value:e.sectionSize,unit:"pixel",type:"number"}}),{gutterSize:{value:e.gutterSize,unit:"pixel",type:"number"},alignment:{value:e.alignment.toLowerCase(),type:"string"},count:(t=e.count,t===1/0?{value:"auto",type:"string"}:{value:t,type:"number"})}),void 0!==e.offset&&{offset:{value:e.offset,unit:"pixel",type:"number"}});var t})(e))),extensions:{[t.key.extensionPluginData]:{[t.key.extensionFigmaStyleId]:e.id,exportKey:y}}}))),C={NONE:"none",UNDERLINE:"underline",STRIKETHROUGH:"line-through"},N={ORIGINAL:"none",UPPER:"uppercase",LOWER:"lowercase",TITLE:"capitalize",SMALL_CAPS:"small-caps"},P={100:100,thin:100,w1:100,200:200,w2:200,extralight:200,ultralight:200,extraleicht:200,300:300,light:300,leicht:300,w3:300,400:400,normal:400,regular:400,buch:400,w4:400,500:500,medium:500,kraeftig:500,kräftig:500,w5:500,600:600,semibold:600,demibold:600,halbfett:600,w6:600,700:700,bold:700,dreiviertelfett:700,w7:700,800:800,extrabold:800,ultabold:800,fett:800,w8:800,900:900,black:900,heavy:900,super:900,extrafett:900,w9:900},D={normal:"normal",condensed:"condensed",expanded:"expanded",extended:"expanded"},_={normal:"normal",italic:"italic",kursiv:"italic",oblique:"oblique"},M=e=>{const t=e.toLowerCase().split(" ");let n=t[0];return["extra","ultra","semi","demi"].includes(t[0])&&["bold","light"].includes(t[1])&&(n=`${t[0]}${t[1]}`),P[n]||400},j=e=>{const t=e.toLowerCase().split(" ");return D[t[t.length-1]]||D[t[t.length-2]]||"normal"},B=e=>{const t=e.toLowerCase().split(" ").pop();return _[t]||"normal"},z=(e,n)=>e.map((e=>({name:`${n[0]}/${e.name}`,category:"font",exportKey:p,description:e.description||void 0,values:{fontSize:{value:e.fontSize,unit:"pixel",type:"number"},textDecoration:{value:C[e.textDecoration],type:"string"},fontFamily:{value:e.fontName.family,type:"string"},fontWeight:{value:M(e.fontName.style),type:"number"},fontStyle:{value:B(e.fontName.style),type:"string"},fontStretch:{value:j(e.fontName.style),type:"string"},_fontStyleOld:{value:e.fontName.style,type:"string"},letterSpacing:{value:S(e.letterSpacing.value),unit:"pixels"===e.letterSpacing.unit.toLowerCase()?"pixel":e.letterSpacing.unit.toLowerCase(),type:"number"},lineHeight:{value:S(e.lineHeight.value)||"normal",unit:"pixels"===e.lineHeight.unit.toLowerCase()?"pixel":e.lineHeight.unit.toLowerCase(),type:Object.prototype.hasOwnProperty.call(e.lineHeight,"value")?"number":"string"},paragraphIndent:{value:e.paragraphIndent,unit:"pixel",type:"number"},paragraphSpacing:{value:e.paragraphSpacing,unit:"pixel",type:"number"},textCase:{value:N[e.textCase]||"none",type:"string"}},extensions:{[t.key.extensionPluginData]:{[t.key.extensionFigmaStyleId]:e.id,exportKey:p}}}))),U={LAYER_BLUR:"layerBlur",BACKGROUND_BLUR:"backgroundBlur",DROP_SHADOW:"dropShadow",INNER_SHADOW:"innerShadow"},G=(e,n)=>e.filter((e=>e.effects.length>0)).map((e=>({name:`${n[0]}/${e.name}`,category:"effect",exportKey:d,description:e.description||null,values:e.effects.map((e=>"LAYER_BLUR"===e.type||"BACKGROUND_BLUR"===e.type?(e=>({effectType:{value:U[e.type],type:"string"},radius:{value:e.radius,unit:"pixel",type:"number"}}))(e):(e=>({effectType:{value:U[e.type],type:"string"},radius:{value:e.radius,unit:"pixel",type:"number"},color:{value:A(e.color),type:"color"},offset:{x:{value:e.offset.x,unit:"pixel",type:"number"},y:{value:e.offset.y,unit:"pixel",type:"number"}},spread:{value:e.spread,unit:"pixel",type:"number"}}))(e))),extensions:{[t.key.extensionPluginData]:{[t.key.extensionFigmaStyleId]:e.id,exportKey:d}}}))),K=e=>t=>{if(!Array.isArray(e))return;const n=t.name.substr(0,t.name.indexOf("/")).replace(/\s+/g,"");return 0!==n.length?e.includes(n):void 0},F=e=>{if(Object.prototype.hasOwnProperty.call(e,"direction"))return{direction:{value:e.direction.toLowerCase(),type:"string"}}},$={CUSTOM_CUBIC_BEZIER:{type:"custom-cubicBezier",curveType:"cubicBezier",easing:void 0},CUSTOM_SPRING:{type:"custom-spring",curveType:"spring",easing:void 0},LINEAR:{type:"linear",curveType:"cubicBezier",easing:{x1:0,y1:0,x2:1,y2:1}},EASE_IN:{type:"ease-in",curveType:"cubicBezier",easing:{x1:.41999998688697815,y1:0,x2:1,y2:1}},EASE_OUT:{type:"ease-out",curveType:"cubicBezier",easing:{x1:0,y1:0,x2:.5799999833106995,y2:1}},EASE_IN_AND_OUT:{type:"ease-in-out",curveType:"cubicBezier",easing:{x1:.41999998688697815,y1:0,x2:.5799999833106995,y2:1}},EASE_IN_BACK:{type:"ease-in-back",curveType:"cubicBezier",easing:{x1:.30000001192092896,y1:-.05000000074505806,x2:.699999988079071,y2:-.5}},EASE_OUT_BACK:{type:"ease-out-back",curveType:"cubicBezier",easing:{x1:.44999998807907104,y1:1.4500000476837158,x2:.800000011920929,y2:1}},EASE_IN_AND_OUT_BACK:{type:"ease-in-out-back",curveType:"cubicBezier",easing:{x1:.699999988079071,y1:-.4000000059604645,x2:.4000000059604645,y2:1.399999976158142}},BOUNCY:{type:"bouncy",curveType:"spring",easing:{mass:1,stiffness:600,damping:15}},GENTLE:{type:"gentle",curveType:"spring",easing:{mass:1,stiffness:100,damping:15}},QUICK:{type:"quick",curveType:"spring",easing:{mass:1,stiffness:300,damping:20}},SLOW:{type:"slow",curveType:"spring",easing:{mass:1,stiffness:80,damping:20}}},V=e=>{var t;if("type"in e&&void 0!==$[e.type])return"CUSTOM_CUBIC_BEZIER"===e.type&&($.CUSTOM_CUBIC_BEZIER.easing={x1:e.easingFunctionCubicBezier.x1,y1:e.easingFunctionCubicBezier.y1,x2:e.easingFunctionCubicBezier.x2,y2:e.easingFunctionCubicBezier.y2}),"CUSTOM_SPRING"===e.type&&($.CUSTOM_SPRING.easing={mass:e.easingFunctionSpring.mass,stiffness:e.easingFunctionSpring.stiffness,damping:e.easingFunctionSpring.damping}),{easingType:{value:$[e.type].type,type:"string"},easingCurveType:{value:$[e.type].curveType,type:"string"},easingFunction:(t=$[e.type],"spring"===t.curveType?{mass:{value:t.easing.mass,type:"number"},stiffness:{value:t.easing.stiffness,type:"number"},damping:{value:t.easing.damping,type:"number"}}:"cubicBezier"===t.curveType?{x1:{value:t.easing.x1,type:"number"},x2:{value:t.easing.x2,type:"number"},y1:{value:t.easing.y1,type:"number"},y2:{value:t.easing.y2,type:"number"}}:void 0)}},H=e=>{var t;const n=Object.keys($);return!!(e.reactions.length>0&&"NODE"===(null===(t=e.reactions[0].action)||void 0===t?void 0:t.type)&&null!==e.reactions[0].action.transition&&n.includes(e.reactions[0].action.transition.easing.type))},J=(e,n)=>e.filter(K(n)).filter(H).map((e=>({name:e.name,category:"motion",exportKey:b,description:e.description||null,values:Object.assign(Object.assign({transitionType:{value:e.reactions[0].action.transition.type.toLocaleLowerCase(),type:"string"},duration:{value:Math.round(1e3*(e.reactions[0].action.transition.duration+Number.EPSILON))/1e3,unit:"s",type:"number"}},V(e.reactions[0].action.transition.easing)),F(e.reactions[0].action.transition)),extensions:{[t.key.extensionPluginData]:{exportKey:b}}}))),W=(e,n)=>e.filter(K(n)).map((e=>({name:e.name,category:"spacing",exportKey:x,description:e.description||null,values:{top:{value:S(e.paddingTop,2),unit:"pixel",type:"number"},right:{value:S(e.paddingRight,2),unit:"pixel",type:"number"},bottom:{value:S(e.paddingBottom,2),unit:"pixel",type:"number"},left:{value:S(e.paddingLeft,2),unit:"pixel",type:"number"}},extensions:{[t.key.extensionPluginData]:{exportKey:x}}}))),q={MITER:"miter",BEVEL:"bevel",ROUND:"round"},Q={CENTER:"center",INSIDE:"inside",OUTSIDE:"outside"},Y=(e,n)=>e.filter(K(n)).filter((e=>e.strokes.length>0)).map((e=>({name:e.name,category:"border",exportKey:g,description:e.description||null,values:{strokeAlign:{value:Q[e.strokeAlign],type:"string"},dashPattern:{value:[...void 0!==e.dashPattern&&e.dashPattern.length>0?e.dashPattern:[0,0]],type:"string"},strokeCap:{value:"string"==typeof e.strokeCap?e.strokeCap.toLowerCase():"mixed",type:"string"},strokeJoin:{value:q[e.strokeJoin],type:"string"},strokeMiterLimit:{value:S(e.strokeMiterLimit),unit:"degree",type:"number"},strokeWeight:{value:e.strokeWeight,unit:"pixel",type:"number"},stroke:{value:e.strokes[0],type:"color"}},extensions:{[t.key.extensionPluginData]:{exportKey:g}}}))),Z=(e,n)=>{const i=e=>({topLeft:{value:e.topLeftRadius||0,unit:"pixel",type:"number"},topRight:{value:e.topRightRadius||0,unit:"pixel",type:"number"},bottomRight:{value:e.bottomRightRadius||0,unit:"pixel",type:"number"},bottomLeft:{value:e.bottomLeftRadius||0,unit:"pixel",type:"number"}});return e.filter(K(n)).map((e=>{return{name:e.name,category:"radius",exportKey:f,description:e.description||null,values:Object.assign(Object.assign({},"number"==typeof e.cornerRadius&&{radius:{value:e.cornerRadius,unit:"pixel",type:"number"}}),{radiusType:{value:(n=e.cornerRadius,"number"==typeof n?"single":"mixed"),type:"string"},radii:i(e),smoothing:{value:S(e.cornerSmoothing,2),comment:"Percent as decimal from 0.0 - 1.0",type:"number"}}),extensions:{[t.key.extensionPluginData]:{exportKey:f}}};var n}))},X=(e,n)=>e.filter(K(n)).map((e=>({name:e.name,category:"breakpoint",exportKey:m,description:e.description||null,values:{width:{value:S(e.width,2),unit:"pixel",type:"number"},height:{value:S(e.height,2),unit:"pixel",type:"number"}},extensions:{[t.key.extensionPluginData]:{exportKey:m}}}))),ee=(e,n)=>e.filter(K(n)).map((e=>({name:e.name,category:"opacity",exportKey:h,description:e.description||null,values:{opacity:{value:S(e.opacity,2),type:"number"}},extensions:{[t.key.extensionPluginData]:{exportKey:h}}}))),te=(e,n)=>!(e=>[...t.exclusionPrefixDefault,...e])(n).includes(e.name.trim().substr(0,1)),ne=e=>{const t=[];return e.forEach((e=>{t.push({name:e.name,id:e.id,description:e.description,paints:e.paints})})),t},ie=e=>{const t=[];return e.forEach((e=>{t.push({name:e.name,id:e.id,description:e.description,layoutGrids:e.layoutGrids})})),t},ae=e=>{var t,n;return{name:e.name,description:e.description||void 0,bottomLeftRadius:e.bottomLeftRadius,bottomRightRadius:e.bottomRightRadius,topLeftRadius:e.topLeftRadius,topRightRadius:e.topRightRadius,cornerRadius:e.cornerRadius||void 0,cornerSmoothing:e.cornerSmoothing,strokes:(n=e.strokes,[...n].map((e=>I(e))).filter((e=>null!=e))),strokeWeight:e.strokeWeight,strokeStyleId:e.strokeStyleId,strokeMiterLimit:e.strokeMiterLimit,strokeJoin:e.strokeJoin,strokeCap:e.strokeCap,dashPattern:e.dashPattern,strokeAlign:e.strokeAlign,width:e.width,height:e.height,reactions:e.reactions||void 0,paddingTop:e.paddingTop||0,paddingRight:e.paddingRight||0,paddingBottom:e.paddingBottom||0,paddingLeft:e.paddingLeft||0,opacity:null!==(t=e.opacity)&&void 0!==t?t:1}},oe=["COMPONENT","COMPONENT_SET","RECTANGLE","FRAME"];const re="_tokens",se=e=>{return t=void 0,n=void 0,a=function*(){return yield figma.loadAllPagesAsync(),[...e.map((e=>e.findChildren((e=>(e=>"FRAME"===e.type&&e.name.trim().toLowerCase().substr(0,re.length)===re)(e))))).reduce(((e,t)=>[...e,...t]))].map((e=>e.findAll((e=>(e=>"COMPONENT_SET"!==e.parent.type&&oe.includes(e.type)&&e.name.length>0)(e))))).reduce(((e,t)=>[...e,...t]),[]).map((e=>("RECTANGLE"!==e.type&&"FRAME"!==e.type||console.warn("Please use only main components and variants, other types may be deprecated as tokens in the future"),"COMPONENT_SET"===e.type?e.children.map((t=>{return Object.assign(Object.assign({},ae(t)),{name:(n=e.name,i=t.name,`${n}/${i=i.split(",").filter((e=>!["_","."].includes(e.trim().substr(0,1)))).map((e=>e.split("=")[1])).join("/")}`)});var n,i})):[ae(e)]))).reduce(((e,t)=>[...e,...t]),[])},new((i=void 0)||(i=Promise))((function(e,o){function r(e){try{l(a.next(e))}catch(e){o(e)}}function s(e){try{l(a.throw(e))}catch(e){o(e)}}function l(t){var n;t.done?e(t.value):(n=t.value,n instanceof i?n:new i((function(e){e(n)}))).then(r,s)}l((a=a.apply(t,n||[])).next())}));var t,n,i,a},le=e=>{const t=[];return e.forEach((e=>{t.push({name:e.name,id:e.id,description:e.description,fontSize:e.fontSize,textDecoration:e.textDecoration,fontName:e.fontName,letterSpacing:e.letterSpacing,lineHeight:e.lineHeight,paragraphIndent:e.paragraphIndent,paragraphSpacing:e.paragraphSpacing,textCase:e.textCase})})),t},ce=e=>{const t=[];return e.forEach((e=>{t.push({name:e.name,id:e.id,description:e.description,effects:e.effects})})),t};const ue=(e,t)=>{return n=void 0,i=void 0,o=function*(){const n=yield se([...e.root.children]),i=t.exclusionPrefix.split(",").map((e=>e.replace(/\s+/g,"")));return{tokenFrames:n,paintStyles:ne(yield e.getLocalPaintStylesAsync()).filter((e=>te(e,i))),gridStyles:ie(yield e.getLocalGridStylesAsync()).filter((e=>te(e,i))),textStyles:le(yield e.getLocalTextStylesAsync()).filter((e=>te(e,i))),effectStyles:ce(yield e.getLocalEffectStylesAsync()).filter((e=>te(e,i)))}},new((a=void 0)||(a=Promise))((function(e,t){function r(e){try{l(o.next(e))}catch(e){t(e)}}function s(e){try{l(o.throw(e))}catch(e){t(e)}}function l(t){var n;t.done?e(t.value):(n=t.value,n instanceof a?n:new a((function(e){e(n)}))).then(r,s)}l((o=o.apply(n,i||[])).next())}));var n,i,a,o},pe=e=>"boolean"==typeof e?"string":"number"==typeof e?"dimension":"object"==typeof e?"color":"string"==typeof e?"string":void 0,de=(e,t="/",n=".")=>e.split(t).join(n).toLowerCase();const ye=function(e,t,n,i=!1){return a=this,o=void 0,s=function*(){const a=yield figma.variables.getVariableByIdAsync(t.id),o=yield figma.variables.getVariableCollectionByIdAsync(a.variableCollectionId);return{description:e.description||"",exportKey:k,category:pe(Object.values(a.valuesByMode)[0]),values:`{${o.name.toLowerCase()}.${de(a.name,"/",".")}}`,aliasCollectionName:o.name.toLowerCase(),aliasMode:n,aliasSameMode:e.aliasSameMode||i}},new((r=void 0)||(r=Promise))((function(e,t){function n(e){try{l(s.next(e))}catch(e){t(e)}}function i(e){try{l(s.throw(e))}catch(e){t(e)}}function l(t){var a;t.done?e(t.value):(a=t.value,a instanceof r?a:new r((function(e){e(a)}))).then(n,i)}l((s=s.apply(a,o||[])).next())}));var a,o,r,s},ge=e=>e.reduce(((e,t)=>{if(!t.aliasMode)return e.push(t),e;const{aliasMode:n,aliasCollectionName:i}=t;return e.push(Object.assign(Object.assign({},t),{values:t.values.replace(`{${i}.`,`{${i}.${n.name.toLowerCase()}.`)})),e}),[]),me=(e,t)=>{const n=e=>e&&"object"==typeof e;return n(e)&&n(t)?(Object.keys(t).forEach((i=>{const a=e[i],o=t[i];Array.isArray(a)&&Array.isArray(o)?e[i]=[...new Set(a.concat(o))]:n(a)&&n(o)?e[i]=me(Object.assign({},a),o):e[i]=o})),e):t},fe=me;var ve=function(e,t,n,i){return new(n||(n=Promise))((function(a,o){function r(e){try{l(i.next(e))}catch(e){o(e)}}function s(e){try{l(i.throw(e))}catch(e){o(e)}}function l(e){var t;e.done?a(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(r,s)}l((i=i.apply(e,t||[])).next())}))};const xe=(e,t)=>{var n;let i={};return t&&(null===(n=null==e?void 0:e.modes)||void 0===n||n.forEach((n=>{var a;const o=t.valuesByMode[n.modeId];null===(a=e.variableIds)||void 0===a||a.forEach((e=>ve(void 0,void 0,void 0,(function*(){const a=yield figma.variables.getVariableByIdAsync(e);a&&o&&"object"==typeof o&&t.name!==a.name&&o.id===a.id&&(i=ye(t,o,n,!0))}))))}))),fe(t,i)},be=(e,n)=>ve(void 0,void 0,void 0,(function*(){var i;const a=yield e.variables.getLocalVariableCollectionsAsync(),o=yield e.variables.getLocalVariablesAsync(),r=null==a?void 0:a.filter((e=>![".","_",...n.exclusionPrefix.split(",")].includes(e.name.charAt(0)))).map((e=>e.id)),s=a?Object.fromEntries(null==a?void 0:a.map((e=>[e.id,e]))):[],l=yield Promise.all((null===(i=null==o?void 0:o.filter((e=>r.includes(e.variableCollectionId))))||void 0===i?void 0:i.map((e=>ve(void 0,void 0,void 0,(function*(){var i;const{variableCollectionId:a}=e,{name:o,modes:r}=s[a];return n.resolveSameCollectionOrModeReference&&(e=xe(s[a],e)),yield Promise.all(null===(i=Object.entries(e.valuesByMode))||void 0===i?void 0:i.map((([i,a])=>ve(void 0,void 0,void 0,(function*(){const s=n.modeInTokenName&&r.length>1,l=r.find((({modeId:e})=>e===i)),c=`${o}/${e.name}`,u=`${o}/${l.name}/${e.name}`,p=yield((e,t,n)=>ve(void 0,void 0,void 0,(function*(){let i="color",a={};if("VARIABLE_ALIAS"===t.type)return yield ye(e,t,n);switch(e.resolvedType){case"COLOR":i="color",a={fill:{value:A(t),type:"color",blendMode:"normal"}};break;case"FLOAT":i="dimension",a=S(t,2);break;case"STRING":i="string",a=t;break;case"BOOLEAN":i="boolean",a=t}return{name:e.name,description:e.description||void 0,exportKey:k,category:i,values:a}})))(e,a,l);return Object.assign(Object.assign({},p),{name:s?u:c,extensions:{[t.key.extensionPluginData]:{mode:n.modeInTokenValue?l.name:void 0,collection:o,scopes:e.scopes,[t.key.extensionVariableStyleId]:e.id,exportKey:k}}})})))))})))))||[]);return n.modeInTokenValue?ge(l.flat()):l.flat().map((e=>(null==e?void 0:e.aliasSameMode)?ge([e]):e)).flat()}));const he=(e="")=>e.split(",").map((e=>e.replace(/\s+/g,"")));var ke=function(e,t,n,i){return new(n||(n=Promise))((function(a,o){function r(e){try{l(i.next(e))}catch(e){o(e)}}function s(e){try{l(i.throw(e))}catch(e){o(e)}}function l(e){var t;e.done?a(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(r,s)}l((i=i.apply(e,t||[])).next())}))};figma.showUI(__html__,{themeColors:!0,visible:!1}),[o.export,o.urlExport,o.generalSettings].includes(figma.command)&&ke(void 0,void 0,void 0,(function*(){const r=(()=>{let n=figma.root.getPluginData(t.key.settings);if(""===n)return e;n=JSON.parse(n);const a=i(e,n);return a.prefix=i(e.prefix,a.prefix),a.exports=i(e.exports,a.exports),a})(),c=yield s(figma);figma.ui.resize(t.ui[figma.command].width,t.ui[figma.command].height),void 0!==c&&"patch"!==c&&figma.ui.resize(t.ui[figma.command].width,t.ui[figma.command].height+60);const u={command:figma.command,payload:{settings:Object.assign(Object.assign({},r),{accessToken:yield(p=l(figma),a(void 0,void 0,void 0,(function*(){const e=yield figma.clientStorage.getAsync("accessTokens");return void 0!==e&&e instanceof Object&&e[p]||""})))}),data:null,versionDifference:c,metadata:{filename:figma.root.name}}};var p;[o.export,o.urlExport].includes(figma.command)&&(u.payload.data=n(yield((e,n)=>{return i=void 0,a=void 0,r=function*(){const i=yield ue(e,n);return[...(a=i.tokenFrames,o=he(n.prefix.size),a.filter(K(o)).map((e=>({name:e.name,category:"size",exportKey:v,description:e.description||null,values:{width:{value:S(e.width,2),unit:"pixel",type:"number"},height:{value:S(e.height,2),unit:"pixel",type:"number"}},extensions:{[t.key.extensionPluginData]:{exportKey:v}}})))),...X(i.tokenFrames,he(n.prefix.breakpoint)),...W(i.tokenFrames,he(n.prefix.spacing)),...Y(i.tokenFrames,he(n.prefix.border)),...Z(i.tokenFrames,he(n.prefix.radius)),...J(i.tokenFrames,he(n.prefix.motion)),...ee(i.tokenFrames,he(n.prefix.opacity)),...w(i.paintStyles,{color:he(n.prefix.color),gradient:he(n.prefix.gradient),alias:he(n.alias)}),...L(i.gridStyles,he(n.prefix.grid)),...z(i.textStyles,he(n.prefix.font)),...G(i.effectStyles,he(n.prefix.effect)),...yield be(e,n)];var a,o},new((o=void 0)||(o=Promise))((function(e,t){function n(e){try{l(r.next(e))}catch(e){t(e)}}function s(e){try{l(r.throw(e))}catch(e){t(e)}}function l(t){var i;t.done?e(t.value):(i=t.value,i instanceof o?i:new o((function(e){e(i)}))).then(n,s)}l((r=r.apply(i,a||[])).next())}));var i,a,o,r})(figma,r))),figma.ui.postMessage(Object.assign({},u)),figma.ui.show()})),figma.command===o.help&&figma.ui.postMessage({command:o.help,payload:{url:"https://github.com/lukasoppermann/design-tokens"}}),figma.command===o.demo&&figma.ui.postMessage({command:o.demo,payload:{url:"https://www.figma.com/file/2MQ759R5kJtzQn4qSHuqR7/Design-Tokens-for-Figma?node-id=231%3A2"}}),figma.command===o.reset&&(figma.root.setPluginData(t.key.settings,n(e)),figma.notify("⚙️ Settings have been reset."),figma.closePlugin()),figma.ui.onmessage=i=>ke(void 0,void 0,void 0,(function*(){const{command:r,payload:s}=i;var c,u,p;r===o.closePlugin&&(void 0!==(null==s?void 0:s.notification)&&""!==(null==s?void 0:s.notification)&&figma.notify(s.notification),figma.ui.hide(),figma.closePlugin()),r===o.saveSettings&&(p=s.settings,p=Object.assign(Object.assign({},e),p),figma.root.setPluginData(t.key.settings,n(p)),yield(c=l(figma),u=s.accessToken,a(void 0,void 0,void 0,(function*(){const e=(yield figma.clientStorage.getAsync("accessTokens"))||{},t=Object.assign(Object.assign({},e),{[c]:u});return yield figma.clientStorage.setAsync("accessTokens",t)}))),s.closePlugin&&!0===s.closePlugin&&figma.closePlugin())}))})();