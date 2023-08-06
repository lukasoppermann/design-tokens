(()=>{"use strict";const e={filename:"design-tokens",extension:".tokens.json",nameConversion:"default",tokenFormat:"standard",compression:!1,urlJsonCompression:!0,serverUrl:void 0,eventType:"update-tokens",accessToken:void 0,acceptHeader:"application/vnd.github.everest-preview+json",contentType:"text/plain;charset=UTF-8",authType:"token",reference:"main",exclusionPrefix:"",excludeExtensionProp:!1,alias:"alias, ref, reference",keyInName:!1,prefixInName:!0,prefix:{color:"color",gradient:"gradient",typography:"typography",font:"font",effect:"effect",grid:"grid",border:"border, borders",breakpoint:"breakpoint, breakpoints",radius:"radius, radii",size:"size, sizes",spacing:"spacing",motion:"motion",opacity:"opacity, opacities"},exports:{color:!0,gradient:!0,font:!0,typography:!0,effect:!0,grid:!0,border:!0,breakpoint:!0,radius:!0,size:!0,spacing:!0,motion:!0,opacity:!0,variables:!0}},t={ui:{generalSettings:{width:550,height:755},export:{width:550,height:356},urlExport:{width:550,height:650}},key:{lastVersionSettingsOpened:"lastVersionSettingsOpened",fileId:"fileId",settings:"settings",extensionPluginData:"org.lukasoppermann.figmaDesignTokens",extensionFigmaStyleId:"styleId",extensionVariableStyleId:"variableId",extensionAlias:"alias",authType:{token:"token",gitlabToken:"gitlab_token",basic:"Basic",bearer:"Bearer"}},exclusionPrefixDefault:["_","."],fileExtensions:[{label:".tokens.json",value:".tokens.json"},{label:".tokens",value:".tokens"},{label:".json",value:".json"}]},i=(e,t=!0)=>!0===t?JSON.stringify(e):JSON.stringify(e,null,2),n=(e,t)=>Object.fromEntries(Object.entries(e).map((([i,n])=>void 0!==n&&typeof t[i]!=typeof n?[i,e[i]]:[i,t[i]])));var a=function(e,t,i,n){return new(i||(i=Promise))((function(a,o){function r(e){try{l(n.next(e))}catch(e){o(e)}}function s(e){try{l(n.throw(e))}catch(e){o(e)}}function l(e){var t;e.done?a(e.value):(t=e.value,t instanceof i?t:new i((function(e){e(t)}))).then(r,s)}l((n=n.apply(e,t||[])).next())}))};const o={generalSettings:"generalSettings",export:"export",sendSettings:"sendSettings",urlExport:"urlExport",help:"help",demo:"demo",openUrl:"openUrl",reset:"reset",saveSettings:"saveSettings",closePlugin:"closePlugin"},r="6.8.6";const s=e=>{return i=void 0,n=void 0,o=function*(){const i=yield e.clientStorage.getAsync(t.key.lastVersionSettingsOpened),n=((e,t="1.0.0")=>{const[i,n,a]=t.split("."),[o,r,s]=e.split(".");return i<o?"major":n<r?"minor":a<s?"patch":void 0})(r,i);return i&&i===r||(yield e.clientStorage.setAsync(t.key.lastVersionSettingsOpened,r)),n},new((a=void 0)||(a=Promise))((function(e,t){function r(e){try{l(o.next(e))}catch(e){t(e)}}function s(e){try{l(o.throw(e))}catch(e){t(e)}}function l(t){var i;t.done?e(t.value):(i=t.value,i instanceof a?i:new a((function(e){e(i)}))).then(r,s)}l((o=o.apply(i,n||[])).next())}));var i,n,a,o},l=e=>{let i=e.root.getPluginData(t.key.fileId);return void 0!==i&&""!==i||(e.root.setPluginData(t.key.fileId,e.root.name+" "+Math.floor(1e9*Math.random())),i=e.root.getPluginData(t.key.fileId)),i},p="color",u="gradient",c="font",d="effect",g="grid",m="border",y="breakpoint",f="radius",v="size",x="spacing",b="motion",h="opacity",k="variables",S=(e,t=2)=>{if(void 0===e)return;if("number"!=typeof e||"number"!=typeof t)throw new Error(`Invalid parameters, both value "${e}" (${typeof e}) and decimalPlaces "${t}" (${typeof t}) must be of type number`);const i=Math.pow(10,t);return Math.round(e*i)/i},R=(e,t)=>{var i;return{r:S(255*e.r,0),g:S(255*e.g,0),b:S(255*e.b,0),a:S(null!==(i=null!=t?t:e.a)&&void 0!==i?i:1)}},E=e=>"SOLID"===e.type&&!0===e.visible?R(e.color,e.opacity):null,I={fill:{value:{r:0,g:0,b:0,a:0},type:"color",blendMode:"normal"}},T=e=>e?{[t.key.extensionAlias]:e}:{},O={GRADIENT_LINEAR:"linear",GRADIENT_RADIAL:"radial",GRADIENT_ANGULAR:"angular",GRADIENT_DIAMOND:"diamond"},A=([[e,t],[i,n]])=>{const a=Math.atan2(n-t,i-e)*(180/Math.PI)+315;return a>360?a-360:a},L=(e,i)=>e.reduce(((e,n)=>{const a=n.paints.filter((e=>"IMAGE"!==e.type));if(n.paints.length&&0===a.length)return e;n.paints=a;const{alias:o,description:r}=((e="",t)=>{t=t&&0!==t.filter((e=>e)).length?t:["Ref:"];const i=new RegExp("("+t.join("|").toLowerCase()+"):?\\s");let n;const a=e.split(/\r?\n/).filter((e=>!e.toLowerCase().match(i)||(n=e.toLowerCase().replace(i,"").trim(),!1)));return{alias:n,description:a.join("\n")}})(n.description,i.alias),s=(l=n.paints[0],["GRADIENT_LINEAR","GRADIENT_RADIAL","GRADIENT_ANGULAR","GRADIENT_DIAMOND"].includes(null==l?void 0:l.type));var l;const c=n.paints.length?n.paints.map((e=>(e=>{var t;return"SOLID"===e.type?{fill:{value:E(e),type:"color",blendMode:(null===(t=e.blendMode)||void 0===t?void 0:t.toLowerCase())||"normal"}}:["GRADIENT_LINEAR","GRADIENT_RADIAL","GRADIENT_ANGULAR","GRADIENT_DIAMOND"].includes(e.type)?{gradientType:{value:O[e.type],type:"string"},rotation:{value:A(e.gradientTransform),type:"number",unit:"degree"},stops:e.gradientStops.map((e=>({position:{value:S(e.position),type:"number"},color:{value:R(e.color),type:"color"}}))),opacity:{value:S(e.opacity),type:"number"}}:null})(e))):[I];return[...e,{name:`${s?i.gradient[0]:i.color[0]}/${n.name}`,category:s?"gradient":"color",exportKey:s?u:p,description:r,values:c,extensions:{[t.key.extensionPluginData]:Object.assign({[t.key.extensionFigmaStyleId]:n.id,exportKey:s?u:p},T(o))}}]}),[]),N=(e,i)=>e.filter((e=>e.layoutGrids.length>0)).map((e=>({name:`${i[0]}/${e.name}`,category:"grid",exportKey:g,description:e.description||null,values:e.layoutGrids.map((e=>"GRID"===e.pattern?(e=>({pattern:{value:e.pattern.toLowerCase(),type:"string"},sectionSize:{value:e.sectionSize,unit:"pixel",type:"number"}}))(e):(e=>{return Object.assign(Object.assign(Object.assign({pattern:{value:e.pattern.toLowerCase(),type:"string"}},void 0!==e.sectionSize&&{sectionSize:{value:e.sectionSize,unit:"pixel",type:"number"}}),{gutterSize:{value:e.gutterSize,unit:"pixel",type:"number"},alignment:{value:e.alignment.toLowerCase(),type:"string"},count:(t=e.count,t===1/0?{value:"auto",type:"string"}:{value:t,type:"number"})}),void 0!==e.offset&&{offset:{value:e.offset,unit:"pixel",type:"number"}});var t})(e))),extensions:{[t.key.extensionPluginData]:{[t.key.extensionFigmaStyleId]:e.id,exportKey:g}}}))),C={NONE:"none",UNDERLINE:"underline",STRIKETHROUGH:"line-through"},D={ORIGINAL:"none",UPPER:"uppercase",LOWER:"lowercase",TITLE:"capitalize",SMALL_CAPS:"small-caps"},P={100:100,thin:100,200:200,extralight:200,ultralight:200,extraleicht:200,300:300,light:300,leicht:300,400:400,normal:400,regular:400,buch:400,500:500,medium:500,kraeftig:500,kräftig:500,600:600,semibold:600,demibold:600,halbfett:600,700:700,bold:700,dreiviertelfett:700,800:800,extrabold:800,ultabold:800,fett:800,900:900,black:900,heavy:900,super:900,extrafett:900},w={normal:"normal",condensed:"condensed",expanded:"expanded",extended:"expanded"},_={normal:"normal",italic:"italic",kursiv:"italic",oblique:"oblique"},B=e=>{const t=e.toLowerCase().split(" ");let i=t[0];return["extra","ultra","semi","demi"].includes(t[0])&&["bold","light"].includes(t[1])&&(i=`${t[0]}${t[1]}`),P[i]||400},M=e=>{const t=e.toLowerCase().split(" ");return w[t[t.length-1]]||w[t[t.length-2]]||"normal"},j=e=>{const t=e.toLowerCase().split(" ").pop();return _[t]||"normal"},z=(e,i)=>e.map((e=>({name:`${i[0]}/${e.name}`,category:"font",exportKey:c,description:e.description||void 0,values:{fontSize:{value:e.fontSize,unit:"pixel",type:"number"},textDecoration:{value:C[e.textDecoration],type:"string"},fontFamily:{value:e.fontName.family,type:"string"},fontWeight:{value:B(e.fontName.style),type:"number"},fontStyle:{value:j(e.fontName.style),type:"string"},fontStretch:{value:M(e.fontName.style),type:"string"},_fontStyleOld:{value:e.fontName.style,type:"string"},letterSpacing:{value:S(e.letterSpacing.value),unit:"pixels"===e.letterSpacing.unit.toLowerCase()?"pixel":e.letterSpacing.unit.toLowerCase(),type:"number"},lineHeight:{value:S(e.lineHeight.value)||"normal",unit:"pixels"===e.lineHeight.unit.toLowerCase()?"pixel":e.lineHeight.unit.toLowerCase(),type:Object.prototype.hasOwnProperty.call(e.lineHeight,"value")?"number":"string"},paragraphIndent:{value:e.paragraphIndent,unit:"pixel",type:"number"},paragraphSpacing:{value:e.paragraphSpacing,unit:"pixel",type:"number"},textCase:{value:D[e.textCase]||"none",type:"string"}},extensions:{[t.key.extensionPluginData]:{[t.key.extensionFigmaStyleId]:e.id,exportKey:c}}}))),U={LAYER_BLUR:"layerBlur",BACKGROUND_BLUR:"backgroundBlur",DROP_SHADOW:"dropShadow",INNER_SHADOW:"innerShadow"},G=(e,i)=>e.filter((e=>e.effects.length>0)).map((e=>({name:`${i[0]}/${e.name}`,category:"effect",exportKey:d,description:e.description||null,values:e.effects.map((e=>"LAYER_BLUR"===e.type||"BACKGROUND_BLUR"===e.type?(e=>({effectType:{value:U[e.type],type:"string"},radius:{value:e.radius,unit:"pixel",type:"number"}}))(e):(e=>({effectType:{value:U[e.type],type:"string"},radius:{value:e.radius,unit:"pixel",type:"number"},color:{value:R(e.color),type:"color"},offset:{x:{value:e.offset.x,unit:"pixel",type:"number"},y:{value:e.offset.y,unit:"pixel",type:"number"}},spread:{value:e.spread,unit:"pixel",type:"number"}}))(e))),extensions:{[t.key.extensionPluginData]:{[t.key.extensionFigmaStyleId]:e.id,exportKey:d}}}))),K=e=>t=>{if(!Array.isArray(e))return;const i=t.name.substr(0,t.name.indexOf("/")).replace(/\s+/g,"");return 0!==i.length?e.includes(i):void 0},F=e=>{if(Object.prototype.hasOwnProperty.call(e,"direction"))return{direction:{value:e.direction.toLowerCase(),type:"string"}}},$={CUSTOM_CUBIC_BEZIER:{type:"custom-cubicBezier",curveType:"cubicBezier",easing:void 0},CUSTOM_SPRING:{type:"custom-spring",curveType:"spring",easing:void 0},LINEAR:{type:"linear",curveType:"cubicBezier",easing:{x1:0,y1:0,x2:1,y2:1}},EASE_IN:{type:"ease-in",curveType:"cubicBezier",easing:{x1:.41999998688697815,y1:0,x2:1,y2:1}},EASE_OUT:{type:"ease-out",curveType:"cubicBezier",easing:{x1:0,y1:0,x2:.5799999833106995,y2:1}},EASE_IN_AND_OUT:{type:"ease-in-out",curveType:"cubicBezier",easing:{x1:.41999998688697815,y1:0,x2:.5799999833106995,y2:1}},EASE_IN_BACK:{type:"ease-in-back",curveType:"cubicBezier",easing:{x1:.30000001192092896,y1:-.05000000074505806,x2:.699999988079071,y2:-.5}},EASE_OUT_BACK:{type:"ease-out-back",curveType:"cubicBezier",easing:{x1:.44999998807907104,y1:1.4500000476837158,x2:.800000011920929,y2:1}},EASE_IN_AND_OUT_BACK:{type:"ease-in-out-back",curveType:"cubicBezier",easing:{x1:.699999988079071,y1:-.4000000059604645,x2:.4000000059604645,y2:1.399999976158142}},BOUNCY:{type:"bouncy",curveType:"spring",easing:{mass:1,stiffness:600,damping:15}},GENTLE:{type:"gentle",curveType:"spring",easing:{mass:1,stiffness:100,damping:15}},QUICK:{type:"quick",curveType:"spring",easing:{mass:1,stiffness:300,damping:20}},SLOW:{type:"slow",curveType:"spring",easing:{mass:1,stiffness:80,damping:20}}},H=e=>{var t;if("type"in e&&void 0!==$[e.type])return"CUSTOM_CUBIC_BEZIER"===e.type&&($.CUSTOM_CUBIC_BEZIER.easing={x1:e.easingFunctionCubicBezier.x1,y1:e.easingFunctionCubicBezier.y1,x2:e.easingFunctionCubicBezier.x2,y2:e.easingFunctionCubicBezier.y2}),"CUSTOM_SPRING"===e.type&&($.CUSTOM_SPRING.easing={mass:e.easingFunctionSpring.mass,stiffness:e.easingFunctionSpring.stiffness,damping:e.easingFunctionSpring.damping}),{easingType:{value:$[e.type].type,type:"string"},easingCurveType:{value:$[e.type].curveType,type:"string"},easingFunction:(t=$[e.type],"spring"===t.curveType?{mass:{value:t.easing.mass,type:"number"},stiffness:{value:t.easing.stiffness,type:"number"},damping:{value:t.easing.damping,type:"number"}}:"cubicBezier"===t.curveType?{x1:{value:t.easing.x1,type:"number"},x2:{value:t.easing.x2,type:"number"},y1:{value:t.easing.y1,type:"number"},y2:{value:t.easing.y2,type:"number"}}:void 0)}},V=e=>{var t;const i=Object.keys($);return!!(e.reactions.length>0&&"NODE"===(null===(t=e.reactions[0].action)||void 0===t?void 0:t.type)&&null!==e.reactions[0].action.transition&&i.includes(e.reactions[0].action.transition.easing.type))},J=(e,i)=>e.filter(K(i)).filter(V).map((e=>({name:e.name,category:"motion",exportKey:b,description:e.description||null,values:Object.assign(Object.assign({transitionType:{value:e.reactions[0].action.transition.type.toLocaleLowerCase(),type:"string"},duration:{value:Math.round(1e3*(e.reactions[0].action.transition.duration+Number.EPSILON))/1e3,unit:"s",type:"number"}},H(e.reactions[0].action.transition.easing)),F(e.reactions[0].action.transition)),extensions:{[t.key.extensionPluginData]:{exportKey:b}}}))),W=(e,i)=>e.filter(K(i)).map((e=>({name:e.name,category:"spacing",exportKey:x,description:e.description||null,values:{top:{value:S(e.paddingTop,2),unit:"pixel",type:"number"},right:{value:S(e.paddingRight,2),unit:"pixel",type:"number"},bottom:{value:S(e.paddingBottom,2),unit:"pixel",type:"number"},left:{value:S(e.paddingLeft,2),unit:"pixel",type:"number"}},extensions:{[t.key.extensionPluginData]:{exportKey:x}}}))),q={MITER:"miter",BEVEL:"bevel",ROUND:"round"},Q={CENTER:"center",INSIDE:"inside",OUTSIDE:"outside"},Y=(e,i)=>e.filter(K(i)).filter((e=>e.strokes.length>0)).map((e=>({name:e.name,category:"border",exportKey:m,description:e.description||null,values:{strokeAlign:{value:Q[e.strokeAlign],type:"string"},dashPattern:{value:[...void 0!==e.dashPattern&&e.dashPattern.length>0?e.dashPattern:[0,0]],type:"string"},strokeCap:{value:"string"==typeof e.strokeCap?e.strokeCap.toLowerCase():"mixed",type:"string"},strokeJoin:{value:q[e.strokeJoin],type:"string"},strokeMiterLimit:{value:S(e.strokeMiterLimit),unit:"degree",type:"number"},strokeWeight:{value:e.strokeWeight,unit:"pixel",type:"number"},stroke:{value:e.strokes[0],type:"color"}},extensions:{[t.key.extensionPluginData]:{exportKey:m}}}))),Z=(e,i)=>{const n=e=>({topLeft:{value:e.topLeftRadius||0,unit:"pixel",type:"number"},topRight:{value:e.topRightRadius||0,unit:"pixel",type:"number"},bottomRight:{value:e.bottomRightRadius||0,unit:"pixel",type:"number"},bottomLeft:{value:e.bottomLeftRadius||0,unit:"pixel",type:"number"}});return e.filter(K(i)).map((e=>{return{name:e.name,category:"radius",exportKey:f,description:e.description||null,values:Object.assign(Object.assign({},"number"==typeof e.cornerRadius&&{radius:{value:e.cornerRadius,unit:"pixel",type:"number"}}),{radiusType:{value:(i=e.cornerRadius,"number"==typeof i?"single":"mixed"),type:"string"},radii:n(e),smoothing:{value:S(e.cornerSmoothing,2),comment:"Percent as decimal from 0.0 - 1.0",type:"number"}}),extensions:{[t.key.extensionPluginData]:{exportKey:f}}};var i}))},X=(e,i)=>e.filter(K(i)).map((e=>({name:e.name,category:"breakpoint",exportKey:y,description:e.description||null,values:{width:{value:S(e.width,2),unit:"pixel",type:"number"},height:{value:S(e.height,2),unit:"pixel",type:"number"}},extensions:{[t.key.extensionPluginData]:{exportKey:y}}}))),ee=(e,i)=>e.filter(K(i)).map((e=>({name:e.name,category:"opacity",exportKey:h,description:e.description||null,values:{opacity:{value:S(e.opacity,2),type:"number"}},extensions:{[t.key.extensionPluginData]:{exportKey:h}}}))),te=(e,i)=>!(e=>[...t.exclusionPrefixDefault,...e])(i).includes(e.name.trim().substr(0,1)),ie=e=>{const t=[];return e.forEach((e=>{t.push({name:e.name,id:e.id,description:e.description,paints:e.paints})})),t},ne=e=>{const t=[];return e.forEach((e=>{t.push({name:e.name,id:e.id,description:e.description,layoutGrids:e.layoutGrids})})),t},ae=e=>{var t,i;return{name:e.name,description:e.description||void 0,bottomLeftRadius:e.bottomLeftRadius,bottomRightRadius:e.bottomRightRadius,topLeftRadius:e.topLeftRadius,topRightRadius:e.topRightRadius,cornerRadius:e.cornerRadius||void 0,cornerSmoothing:e.cornerSmoothing,strokes:(i=e.strokes,[...i].map((e=>E(e))).filter((e=>null!=e))),strokeWeight:e.strokeWeight,strokeStyleId:e.strokeStyleId,strokeMiterLimit:e.strokeMiterLimit,strokeJoin:e.strokeJoin,strokeCap:e.strokeCap,dashPattern:e.dashPattern,strokeAlign:e.strokeAlign,width:e.width,height:e.height,reactions:e.reactions||void 0,paddingTop:e.paddingTop||0,paddingRight:e.paddingRight||0,paddingBottom:e.paddingBottom||0,paddingLeft:e.paddingLeft||0,opacity:null!==(t=e.opacity)&&void 0!==t?t:1}},oe=["COMPONENT","COMPONENT_SET","RECTANGLE","FRAME"],re="_tokens",se=e=>[...e.map((e=>e.findChildren((e=>(e=>"FRAME"===e.type&&e.name.trim().toLowerCase().substr(0,re.length)===re)(e))))).reduce(((e,t)=>[...e,...t]))].map((e=>e.findAll((e=>(e=>"COMPONENT_SET"!==e.parent.type&&oe.includes(e.type)&&e.name.length>0)(e))))).reduce(((e,t)=>[...e,...t]),[]).map((e=>("RECTANGLE"!==e.type&&"FRAME"!==e.type||console.warn("Please use only main components and variants, other types may be deprecated as tokens in the future"),"COMPONENT_SET"===e.type?e.children.map((t=>{return Object.assign(Object.assign({},ae(t)),{name:(i=e.name,n=t.name,`${i}/${n=n.split(",").filter((e=>!["_","."].includes(e.trim().substr(0,1)))).map((e=>e.split("=")[1])).join("/")}`)});var i,n})):[ae(e)]))).reduce(((e,t)=>[...e,...t]),[]),le=e=>{const t=[];return e.forEach((e=>{t.push({name:e.name,id:e.id,description:e.description,fontSize:e.fontSize,textDecoration:e.textDecoration,fontName:e.fontName,letterSpacing:e.letterSpacing,lineHeight:e.lineHeight,paragraphIndent:e.paragraphIndent,paragraphSpacing:e.paragraphSpacing,textCase:e.textCase})})),t},pe=e=>{const t=[];return e.forEach((e=>{t.push({name:e.name,id:e.id,description:e.description,effects:e.effects})})),t},ue=(e,t="/",i=".")=>e.split(t).join(i).toLowerCase(),ce=e=>"boolean"==typeof e?"string":"number"==typeof e?"dimension":"object"==typeof e?"color":"string"==typeof e?"string":void 0,de=(e,t)=>{let i="color",n={};if("VARIABLE_ALIAS"===t.type){const i=figma.variables.getVariableById(t.id),n=figma.variables.getVariableCollectionById(i.variableCollectionId);return{name:e.name,description:e.description||void 0,exportKey:k,category:ce(Object.values(i.valuesByMode)[0]),values:`{${n.name.toLowerCase()}.${ue(i.name,"/",".")}}`,aliasName:n.name,aliasModes:n.modes}}switch(e.resolvedType){case"COLOR":i="color",n={fill:{value:R(t),type:"color",blendMode:"normal"}};break;case"FLOAT":i="dimension",n=t;break;case"STRING":i="string",n=t;break;case"BOOLEAN":i="boolean",n=t}return{name:e.name,description:e.description||void 0,exportKey:k,category:i,values:n}},ge=e=>{const i=Object.fromEntries(e.variables.getLocalVariableCollections().map((e=>[e.id,e])));return e.variables.getLocalVariables().map((e=>{const{variableCollectionId:n}=e,{name:a,modes:o}=i[n];return Object.entries(e.valuesByMode).map((([i,n])=>Object.assign(Object.assign({},de(e,n)),{name:`${a}/${o.find((({modeId:e})=>e===i)).name}/${e.name}`,extensions:{[t.key.extensionPluginData]:{mode:o.find((({modeId:e})=>e===i)).name,collection:a,scopes:e.scopes,[t.key.extensionVariableStyleId]:e.id,exportKey:k}}})))})).flat().reduce(((e,t)=>{if(!t.aliasModes)return e.push(t),e;const i=t.aliasModes,n=t.aliasName;delete t.aliasModes,delete t.selfCollectionName;for(let a=0;a<i.length;a++){const o=Object.assign({},t),r=o.name.split("/");r.splice(1,0,i[a].name),o.values=o.values.replace(`{${n}.`,`{${n}.${i[a].name}.`),o.name=r.join("/"),e.push(o)}return e}),[])},me=(e="")=>e.split(",").map((e=>e.replace(/\s+/g,""))),ye=(e,i)=>{const n=((e,t)=>{const i=se([...e.root.children]),n=t.exclusionPrefix.split(",").map((e=>e.replace(/\s+/g,"")));return{tokenFrames:i,paintStyles:ie(e.getLocalPaintStyles()).filter((e=>te(e,n))),gridStyles:ne(e.getLocalGridStyles()).filter((e=>te(e,n))),textStyles:le(e.getLocalTextStyles()).filter((e=>te(e,n))),effectStyles:pe(e.getLocalEffectStyles()).filter((e=>te(e,n)))}})(e,i);return[...(a=n.tokenFrames,o=me(i.prefix.size),a.filter(K(o)).map((e=>({name:e.name,category:"size",exportKey:v,description:e.description||null,values:{width:{value:S(e.width,2),unit:"pixel",type:"number"},height:{value:S(e.height,2),unit:"pixel",type:"number"}},extensions:{[t.key.extensionPluginData]:{exportKey:v}}})))),...X(n.tokenFrames,me(i.prefix.breakpoint)),...W(n.tokenFrames,me(i.prefix.spacing)),...Y(n.tokenFrames,me(i.prefix.border)),...Z(n.tokenFrames,me(i.prefix.radius)),...J(n.tokenFrames,me(i.prefix.motion)),...ee(n.tokenFrames,me(i.prefix.opacity)),...L(n.paintStyles,{color:me(i.prefix.color),gradient:me(i.prefix.gradient),alias:me(i.alias)}),...N(n.gridStyles,me(i.prefix.grid)),...z(n.textStyles,me(i.prefix.font)),...G(n.effectStyles,me(i.prefix.effect)),...ge(e)];var a,o};var fe=function(e,t,i,n){return new(i||(i=Promise))((function(a,o){function r(e){try{l(n.next(e))}catch(e){o(e)}}function s(e){try{l(n.throw(e))}catch(e){o(e)}}function l(e){var t;e.done?a(e.value):(t=e.value,t instanceof i?t:new i((function(e){e(t)}))).then(r,s)}l((n=n.apply(e,t||[])).next())}))};figma.showUI(__html__,{themeColors:!0,visible:!1}),[o.export,o.urlExport,o.generalSettings].includes(figma.command)&&fe(void 0,void 0,void 0,(function*(){const o=(()=>{let i=figma.root.getPluginData(t.key.settings);if(""===i)return e;i=JSON.parse(i);const a=n(e,i);return a.prefix=n(e.prefix,a.prefix),a.exports=n(e.exports,a.exports),a})(),r=yield s(figma);var p;figma.ui.resize(t.ui[figma.command].width,t.ui[figma.command].height),void 0!==r&&"patch"!==r&&figma.ui.resize(t.ui[figma.command].width,t.ui[figma.command].height+60),figma.ui.postMessage({command:figma.command,payload:{settings:Object.assign(Object.assign({},o),{accessToken:yield(p=l(figma),a(void 0,void 0,void 0,(function*(){const e=yield figma.clientStorage.getAsync("accessTokens");return void 0!==e&&e instanceof Object&&e[p]||""})))}),data:i(ye(figma,o)),versionDifference:r,metadata:{filename:figma.root.name}}}||{}),figma.ui.show()})),figma.command===o.help&&figma.ui.postMessage({command:o.help,payload:{url:"https://github.com/lukasoppermann/design-tokens"}}),figma.command===o.demo&&figma.ui.postMessage({command:o.demo,payload:{url:"https://www.figma.com/file/2MQ759R5kJtzQn4qSHuqR7/Design-Tokens-for-Figma?node-id=231%3A2"}}),figma.command===o.reset&&(figma.root.setPluginData(t.key.settings,i(e)),figma.notify("⚙️ Settings have been reset."),figma.closePlugin()),figma.ui.onmessage=n=>fe(void 0,void 0,void 0,(function*(){const{command:r,payload:s}=n;var p,u,c;r===o.closePlugin&&(void 0!==(null==s?void 0:s.notification)&&""!==(null==s?void 0:s.notification)&&figma.notify(s.notification),figma.ui.hide(),figma.closePlugin()),r===o.saveSettings&&(c=s.settings,c=Object.assign(Object.assign({},e),c),figma.root.setPluginData(t.key.settings,i(c)),yield(p=l(figma),u=s.accessToken,a(void 0,void 0,void 0,(function*(){const e=(yield figma.clientStorage.getAsync("accessTokens"))||{},t=Object.assign(Object.assign({},e),{[p]:u});return yield figma.clientStorage.setAsync("accessTokens",t)}))),s.closePlugin&&!0===s.closePlugin&&figma.closePlugin())}))})();