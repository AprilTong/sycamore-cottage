import{A as g,E as d,d as f,o as h,c as x,a as s,r as l,u as B,t as F,b as y,p as S,e as C,s as p,f as k,g as $}from"./index-2f5fa273.js";import{_ as L}from"./plugin-vue_export-helper-c27b6911.js";const w="",n=g.create({baseURL:w,timeout:2e4});n.interceptors.request.use(e=>e,e=>Promise.reject(e));n.interceptors.response.use(e=>e,e=>{if(e.response&&e.response.data){const t=e.response.status,a=e.response.data.message;d.error(`Code: ${t}, Message: ${a}`)}else d.error(`${e}`);return Promise.reject(e)});function A(e){return n.get("/api/user/login",e)}const R=f({name:"Login",setup(){const e=l({codeSrc:"",codetoken:""}),t=l({user:"",pass:"",code:"",whetherAutoLogin:!1}),a={user:[{required:!0,message:"请输入用户名账号",trigger:"blur"}],pass:[{required:!0,message:"请输入密码",trigger:"blur"}],code:[{required:!0,message:"请输入验证码",trigger:"blur"}]},i=async()=>{e.codeSrc="",e.codetoken=""},r=B(),u=async()=>{const{data:_}=await A({}),{token:m,menuList:b}=_.data;p("token",m),p("menuList",b),await k();const v=$.state.menus;r.push({path:v.permissionMenu})},c=()=>{u()};return{...F(e),formRules:a,formField:t,submitForm:c,getValidateCodeHandle:i}}}),o=e=>(S("data-v-35b2ebb3"),e=e(),C(),e),q=o(()=>s("div",{class:"color"},null,-1)),D=o(()=>s("div",{class:"color"},null,-1)),I=o(()=>s("div",{class:"color"},null,-1)),E={class:"box"},M=y('<div class="circle" style="--x:0;" data-v-35b2ebb3></div><div class="circle" style="--x:1;" data-v-35b2ebb3></div><div class="circle" style="--x:2;" data-v-35b2ebb3></div><div class="circle" style="--x:3;" data-v-35b2ebb3></div><div class="circle" style="--x:4;" data-v-35b2ebb3></div>',5),V={class:"container"},j={class:"form"},H=o(()=>s("h2",null,"登录",-1)),N=o(()=>s("div",{class:"inputBox"},[s("input",{type:"text",placeholder:"姓名"})],-1)),P=o(()=>s("div",{class:"inputBox"},[s("input",{type:"password",placeholder:"密码"})],-1)),U={class:"inputBox"};function z(e,t,a,i,r,u){return h(),x("section",null,[q,D,I,s("div",E,[M,s("div",V,[s("div",j,[H,s("form",null,[N,P,s("div",U,[s("div",{class:"submit",onClick:t[0]||(t[0]=(...c)=>e.submitForm&&e.submitForm(...c))},"登录")])])])])])])}const O=L(R,[["render",z],["__scopeId","data-v-35b2ebb3"]]);export{O as default};