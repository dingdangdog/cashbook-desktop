import{$ as S,d as Oe,a as Pe,_ as Be,o as ze,r as c,g as $e,b as Ee,c as Le,e as Ae,w as Re,f as d,p as Je,h as y,i as je,j as i,k as b,l as t,m as n,n as g,q as T,s as u,t as ue,u as r,F as Y,v as q,x as _,y as We,z as X,A as Qe,B as Ge,C as He,D as Ke,E as Xe,G as Z,H as re,I as v,J as ee,K as Ze,L as el,M as ll,N as tl}from"./index-83f5659e.js";const F="/admin/flow";function al(s){return S({url:F+"/getAll",method:"get",params:s})}function ol(s){return S({url:F,method:"get",params:s})}function nl(s){return S({url:F,method:"post",data:s})}function sl(s,h){return S({url:F+"/"+s,method:"put",data:h})}function ul(s){return S({url:F+"/"+s,method:"delete"})}function rl(s){return S({url:F+"/deleteFlows",method:"delete",data:{ids:s}})}function dl(s,h){return S({url:F+"/importFlows?flag="+s,method:"post",data:{flows:h}})}const il=(s,h)=>{pl(s,h)},pl=(s,h)=>{const w=new Blob([h],{type:"application/octet-stream"}),V=window.URL.createObjectURL(w),D=document.createElement("a");D.style.display="none",D.href=V,D.setAttribute("download",s),document.body.appendChild(D),D.click()},O=s=>(el("data-v-530b633e"),s=s(),ll(),s),cl={key:0,class:"table-header pc-button"},ml={key:1,class:"table-header pc-button"},yl={class:"table-header queryParam"},vl={class:"table-header queryParam"},fl={class:"table-header queryParam"},bl={class:"table-header queryParam"},gl={class:"table-header queryParam"},_l={class:"table-header queryParam"},hl={class:"table-header queryParam"},wl={class:"table-header query-icon"},Vl={key:2,class:"table-header pc-button"},kl={key:3,class:"table-header pc-button"},Tl={key:4,class:"table-header pc-button"},Cl=O(()=>u("hr",null,null,-1)),Dl={class:"el-table-div"},xl=O(()=>u("hr",null,null,-1)),Yl={class:"pageDiv"},Sl={class:"pageSpan"},Fl={style:{float:"left",color:"rgb(76, 152, 112)"}},Il={style:{float:"left",color:"rgb(217,159,8)"}},Ml={style:{float:"left",color:"rgb(66, 66, 66)"}},Ul={class:"el-dialog-main"},Nl={class:"dialog-footer"},ql={class:"el-dialog-main"},Ol=O(()=>u("b",{style:{color:"red"}},"删除原有流水",-1)),Pl=O(()=>u("b",null,"保留原有流水",-1)),Bl=O(()=>u("hr",null,null,-1)),zl=O(()=>u("div",{class:"el-upload__tip"},"仅支持上传Json文件",-1)),$l=Oe({__name:"FlowTable",props:["edit"],setup(s){const h=Pe(()=>Be(()=>import("./FlowExcelImport-dc36a7b6.js"),["./FlowExcelImport-dc36a7b6.js","./index-83f5659e.js","./index-6b4fc47c.css","./flowConvert-1f6d50f4.js","./FlowExcelImport-ab559ac6.css"],import.meta.url));ze(()=>{f(),ie()});const w=c("支出/收入类型"),V=c("支付/收款方式"),D=c([{value:"支出"},{value:"收入"},{value:"不计收支"}]),de=c([{value:"支出"},{value:"收入"},{value:"不计收支"}]),z=[{value:"请先选择流水类型"}],$=c(z),E=c(z),ie=()=>{$e().then(o=>{j(void 0)})},j=o=>{if(o==="支出"?(w.value="支出类型",V.value="支付方式"):o==="收入"?(w.value="收入类型",V.value="收款方式"):(w.value="支出/收入类型",V.value="支付/收款方式"),!o){$.value=z,E.value=z;return}Ee(o).then(e=>{$.value=e}),Le(o).then(e=>{E.value=e})},W=c(!1);document.body.clientWidth<=480&&(W.value=!0);const Q=c("");document.body.clientWidth<=480&&(Q.value="width: auto");const pe={pageNum:1,pageSize:0,totalPage:1,totalCount:0,totalOut:0,totalIn:0,notInOut:0,pageData:[]},ce={id:void 0,day:void 0,flowType:void 0,type:void 0,payType:void 0,money:void 0,name:void 0,description:void 0},me=c({day:[{required:!0,type:"date",message:"请选择日期！",trigger:"blur"}],flowType:[{required:!0,message:"请选择流水类型！",trigger:"blur"}],type:[{required:!0,message:"请选择消费类型！",trigger:"blur"}],money:[{required:!0,message:"请输入金额！",trigger:"blur"}],payType:[{required:!0,message:"请选择支付方式！",trigger:"blur"}]}),P=["新增流水","修改流水"],le=c(!0),I=c(!1),L=c(!1),B=c(P[0]),C=c("200px");document.body.clientWidth<=480&&(C.value="100px");const A=c(),M=c(pe),a=Ae(ce),ye=o=>{d.pageNum=o,f()},ve=o=>{d.pageSize=o,f()},f=()=>{ol(d).then(o=>{M.value=o,le.value=!1})},fe=o=>{console.log(o),o.order==="ascending"?d.moneySort="ASC":o.order==="descending"?d.moneySort="DESC":d.moneySort="",f()},te=async(o,e)=>{o&&await o.validate((m,U)=>{if(m)console.log("submit!");else return console.log("error submit!",U),!1})&&(P[0]===B.value?be():ge(),ae(o,e))},ae=(o,e)=>{o&&(e?(a.money=void 0,a.name=""):o.resetFields(),I.value=e)},be=()=>{nl({day:re("YYYY-MM-dd",a.day||new Date),bookId:parseInt(H||"0"),flowType:a.flowType,type:a.type,money:a.money,payType:a.payType,name:a.name,description:a.description}).then(o=>{o.id&&(f(),v({type:"success",message:"新增成功!"}))}).catch(()=>{v({type:"error",message:"新增出现异常"})})},ge=()=>{sl(a.id||-1,{day:re("YYYY-MM-dd",a.day||new Date),bookId:parseInt(H||"0"),flowType:a.flowType,type:a.type,money:a.money,payType:a.payType,name:a.name,description:a.description}).then(o=>{o.id&&(f(),v({type:"success",message:"更新成功!"}))}).catch(()=>{v({type:"error",message:"更新出现异常"})})},_e=o=>{ee.confirm("确定删除此流水？","确认删除",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(()=>{ul(o).then(()=>{f(),v({type:"success",message:"删除成功!"})}).catch(()=>{v({type:"error",message:"删除失败"})})}).catch(()=>{v({type:"info",message:"取消删除"})})},he=()=>{if(R.value.length===0){v.error("请至少选择一条要删除的流水");return}ee.confirm(`确定删除选中的【${R.value.length}】条流水？`,"确认删除",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(()=>{rl(R.value.map(o=>o.id)).then(()=>{f(),v({type:"success",message:"删除成功!"})}).catch(()=>{v({type:"error",message:"删除失败"})})}).catch(()=>{v({type:"info",message:"取消删除"})})},we=o=>{w.value="支出/收入类型",V.value="支付/收款方式",B.value=o,I.value=!0},Ve=(o,e)=>{B.value=o,I.value=!0,a.id=e.id,a.bookId=e.bookId,a.day=e.day,a.flowType=e.flowType,a.type=e.type,a.payType=e.payType,a.money=e.money,a.name=e.name,a.description=e.description},G=c("overwrite"),oe=c([]),ne=[],ke=o=>{var e;(e=o.raw)==null||e.text().then(m=>{JSON.parse(m).forEach(p=>{ne.push({id:p.id,day:p.day,flowType:p.flowType,type:p.type,bookId:parseInt(H||"0"),payType:p.payType,money:p.money,name:p.name,description:p.description})}),dl(G.value,ne).then(p=>{console.log(p),p>0?ee.alert("共导入"+p+"条流水","导入成功",{confirmButtonText:"确定",callback:()=>{I.value=!1,L.value=!1,f(),Ze.push({path:"/index/flows"})}}):v.error("导入失败，请重试！")}).catch(()=>{v.error("导入失败，请重试！")})})},Te=localStorage.getItem("bookName"),H=localStorage.getItem("bookId"),Ce=()=>{al(d).then(o=>{const e=Te+"-"+new Date().getTime()+".json";il(e,JSON.stringify(o))}).catch(()=>{v.error("数据获取出错，无法导出！")})},R=c([]),De=o=>{R.value=o};return Re(d,()=>{f()}),Je("flowMethods",{query:()=>{f()}}),(o,e)=>{const m=y("el-button"),U=y("el-date-picker"),p=y("el-option"),N=y("el-select"),J=y("el-input"),xe=y("el-row"),k=y("el-table-column"),Ye=y("el-table"),Se=y("el-pagination"),x=y("el-form-item"),Fe=y("el-input-number"),Ie=y("el-form"),K=y("el-dialog"),se=y("el-radio"),Me=y("el-radio-group"),Ue=y("el-upload"),Ne=je("loading");return i(),b(Y,null,[t(xe,{class:"queryRow"},{default:n(()=>[s.edit=="show"?(i(),b("div",cl,[t(m,{type:"primary",onClick:e[0]||(e[0]=l=>L.value=!0)},{default:n(()=>[g("导入")]),_:1})])):T("",!0),s.edit=="show"?(i(),b("div",ml,[t(m,{type:"success",onClick:e[1]||(e[1]=l=>Ce())},{default:n(()=>[g("导出")]),_:1})])):T("",!0),u("div",yl,[t(U,{style:ue(Q.value),class:"date-picker",modelValue:r(d).startDay,"onUpdate:modelValue":e[2]||(e[2]=l=>r(d).startDay=l),type:"date",format:"YYYY/MM/DD","value-format":"YYYY-MM-DD",placeholder:"开始时间"},null,8,["style","modelValue"])]),u("div",vl,[t(U,{style:ue(Q.value),class:"date-picker",modelValue:r(d).endDay,"onUpdate:modelValue":e[3]||(e[3]=l=>r(d).endDay=l),type:"date",format:"YYYY/MM/DD","value-format":"YYYY-MM-DD",placeholder:"结束时间"},null,8,["style","modelValue"])]),u("div",fl,[t(N,{modelValue:r(d).flowType,"onUpdate:modelValue":e[4]||(e[4]=l=>r(d).flowType=l),class:"m-2",placeholder:"流水类型",onChange:j,clearable:""},{default:n(()=>[(i(!0),b(Y,null,q(D.value,l=>(i(),_(p,{key:l.value,label:l.value,value:l.value},null,8,["label","value"]))),128))]),_:1},8,["modelValue"])]),u("div",bl,[t(N,{modelValue:r(d).payType,"onUpdate:modelValue":e[5]||(e[5]=l=>r(d).payType=l),class:"m-2",placeholder:V.value,clearable:""},{default:n(()=>[(i(!0),b(Y,null,q(E.value,l=>(i(),_(p,{key:l.value,label:l.value,value:l.value},null,8,["label","value"]))),128))]),_:1},8,["modelValue","placeholder"])]),u("div",gl,[t(N,{modelValue:r(d).type,"onUpdate:modelValue":e[6]||(e[6]=l=>r(d).type=l),class:"m-2",placeholder:w.value,clearable:""},{default:n(()=>[(i(!0),b(Y,null,q($.value,l=>(i(),_(p,{key:l.value,label:l.value,value:l.value},null,8,["label","value"]))),128))]),_:1},8,["modelValue","placeholder"])]),u("div",_l,[t(J,{modelValue:r(d).name,"onUpdate:modelValue":e[7]||(e[7]=l=>r(d).name=l),clearable:"",placeholder:"名称"},null,8,["modelValue"])]),u("div",hl,[t(J,{modelValue:r(d).description,"onUpdate:modelValue":e[8]||(e[8]=l=>r(d).description=l),clearable:"",placeholder:"备注"},null,8,["modelValue"])]),u("div",wl,[t(m,{icon:r(We),circle:"",onClick:e[9]||(e[9]=l=>f())},null,8,["icon"])]),s.edit=="show"?(i(),b("div",Vl,[t(m,{type:"primary",onClick:e[10]||(e[10]=l=>we(P[0]))},{default:n(()=>[g("新增")]),_:1})])):T("",!0),s.edit=="show"?(i(),b("div",kl,[t(m,{type:"danger",onClick:he},{default:n(()=>[g("删除")]),_:1})])):T("",!0),s.edit=="show"?(i(),b("div",Tl,[t(m,{type:"primary",onClick:e[11]||(e[11]=l=>r(X).visible=!0)},{default:n(()=>[g("Excel导入")]),_:1})])):T("",!0)]),_:1}),Cl,u("div",Dl,[Qe((i(),_(Ye,{data:M.value.pageData,"default-sort":{prop:"money",order:"null"},onSortChange:fe,onSelectionChange:De,"row-key":"row","max-height":"calc(100vh - 18rem)"},{default:n(()=>[t(k,{type:"selection","min-width":"40"}),T("",!0),t(k,{prop:"day",label:"日期",formatter:r(Ge),"min-width":"80"},null,8,["formatter"]),t(k,{prop:"flowType",label:"流水类型","min-width":"60"}),t(k,{prop:"payType",label:V.value,"min-width":"80"},null,8,["label"]),t(k,{prop:"type",label:w.value,"min-width":"80"},null,8,["label"]),t(k,{prop:"money",label:"金额（元）","min-width":"80",sortable:"custom"}),t(k,{prop:"name",label:"名称","min-width":"100","show-overflow-tooltip":""}),r(He)()==="pc"?(i(),_(k,{key:1,prop:"description",label:"备注","min-width":"100","show-overflow-tooltip":""})):T("",!0),s.edit=="show"?(i(),_(k,{key:2,label:"操作",width:"150"},{default:n(l=>[t(m,{type:"primary",icon:r(Ke),circle:"",onClick:qe=>Ve(P[1],l.row)},null,8,["icon","onClick"]),t(m,{type:"danger",icon:r(Xe),circle:"",onClick:qe=>_e(l.row.id)},null,8,["icon","onClick"])]),_:1})):T("",!0)]),_:1},8,["data"])),[[Ne,le.value]])]),xl,u("div",Yl,[u("span",Sl,[u("span",Fl,[g("   总收入："),u("b",null,Z(Number(M.value.totalIn.toFixed(2))),1)]),u("span",Il,[g("   总支出："),u("b",null,Z(Number(M.value.totalOut.toFixed(2))),1)]),u("span",Ml,[g("   不计收支："),u("b",null,Z(Number(M.value.notInOut.toFixed(2))),1)]),t(Se,{"current-page":r(d).pageNum,"page-size":r(d).pageSize,total:M.value.totalCount,"page-sizes":[10,20,50,100],onSizeChange:ve,onCurrentChange:ye,background:"",layout:"->, total, sizes, prev, pager, next"},null,8,["current-page","page-size","total"])])]),t(K,{modelValue:I.value,"onUpdate:modelValue":e[22]||(e[22]=l=>I.value=l),title:B.value,fullscreen:W.value,width:"40rem"},{footer:n(()=>[u("span",Nl,[t(m,{onClick:e[19]||(e[19]=l=>ae(A.value,!1))},{default:n(()=>[g(" 取消 ")]),_:1}),t(m,{type:"primary",onClick:e[20]||(e[20]=l=>te(A.value,!1))},{default:n(()=>[g(" 确定 ")]),_:1}),P[0]===B.value?(i(),_(m,{key:0,type:"success",onClick:e[21]||(e[21]=l=>te(A.value,!0))},{default:n(()=>[g(" 确定并继续 ")]),_:1})):T("",!0)])]),default:n(()=>[u("div",Ul,[t(Ie,{ref_key:"dialogFormRef",ref:A,model:a,rules:me.value},{default:n(()=>[t(x,{label:"日期","label-width":C.value,prop:"day"},{default:n(()=>[t(U,{modelValue:a.day,"onUpdate:modelValue":e[12]||(e[12]=l=>a.day=l),type:"date",format:"YYYY/MM/DD","default-value":new Date(a.day||new Date),"value-format":"YYYY-MM-DD",placeholder:"选择"},null,8,["modelValue","default-value"])]),_:1},8,["label-width"]),t(x,{label:"流水类型","label-width":C.value,prop:"type"},{default:n(()=>[t(N,{modelValue:a.flowType,"onUpdate:modelValue":e[13]||(e[13]=l=>a.flowType=l),placeholder:"选择",clearable:"",onChange:j},{default:n(()=>[(i(!0),b(Y,null,q(de.value,l=>(i(),_(p,{key:l.value,label:l.value,value:l.value},null,8,["label","value"]))),128))]),_:1},8,["modelValue"])]),_:1},8,["label-width"]),t(x,{label:V.value,"label-width":C.value,prop:"payType"},{default:n(()=>[t(N,{modelValue:a.payType,"onUpdate:modelValue":e[14]||(e[14]=l=>a.payType=l),placeholder:"选择或输入",clearable:"",filterable:"","allow-create":""},{default:n(()=>[(i(!0),b(Y,null,q(E.value,l=>(i(),_(p,{key:l.value,label:l.value,value:l.value},null,8,["label","value"]))),128))]),_:1},8,["modelValue"])]),_:1},8,["label","label-width"]),t(x,{label:w.value,"label-width":C.value,prop:"type"},{default:n(()=>[t(N,{modelValue:a.type,"onUpdate:modelValue":e[15]||(e[15]=l=>a.type=l),placeholder:"选择或输入",clearable:"",filterable:"","allow-create":""},{default:n(()=>[(i(!0),b(Y,null,q($.value,l=>(i(),_(p,{key:l.value,label:l.value,value:l.value},null,8,["label","value"]))),128))]),_:1},8,["modelValue"])]),_:1},8,["label","label-width"]),t(x,{label:"金额","label-width":C.value,prop:"money"},{default:n(()=>[t(Fe,{modelValue:a.money,"onUpdate:modelValue":e[16]||(e[16]=l=>a.money=l),min:0},null,8,["modelValue"])]),_:1},8,["label-width"]),t(x,{label:"名称","label-width":C.value,prop:"name"},{default:n(()=>[t(J,{modelValue:a.name,"onUpdate:modelValue":e[17]||(e[17]=l=>a.name=l),style:{width:"300px"}},null,8,["modelValue"])]),_:1},8,["label-width"]),t(x,{label:"备注","label-width":C.value,prop:"description",textarea:""},{default:n(()=>[t(J,{modelValue:a.description,"onUpdate:modelValue":e[18]||(e[18]=l=>a.description=l),style:{width:"400px"}},null,8,["modelValue"])]),_:1},8,["label-width"])]),_:1},8,["model","rules"])])]),_:1},8,["modelValue","title","fullscreen"]),t(K,{modelValue:L.value,"onUpdate:modelValue":e[25]||(e[25]=l=>L.value=l),title:"文件上传",fullscreen:W.value},{default:n(()=>[u("div",ql,[t(Me,{modelValue:G.value,"onUpdate:modelValue":e[23]||(e[23]=l=>G.value=l),class:"ml-4"},{default:n(()=>[t(se,{label:"overwrite",size:"large"},{default:n(()=>[Ol]),_:1}),t(se,{label:"add",size:"large"},{default:n(()=>[Pl]),_:1})]),_:1},8,["modelValue"]),Bl,t(Ue,{"auto-upload":!1,"on-change":ke,"file-list":oe.value,"onUpdate:fileList":e[24]||(e[24]=l=>oe.value=l)},{tip:n(()=>[zl]),default:n(()=>[t(m,{type:"primary"},{default:n(()=>[g("导入Json文件")]),_:1})]),_:1},8,["file-list"])])]),_:1},8,["modelValue","fullscreen"]),t(K,{modelValue:r(X).visible,"onUpdate:modelValue":e[26]||(e[26]=l=>r(X).visible=l),title:"Excel导入流水",fullscreen:!0,"destroy-on-close":"","close-on-click-modal":!1},{default:n(()=>[t(r(h))]),_:1},8,["modelValue"])],64)}}});const El=tl($l,[["__scopeId","data-v-530b633e"]]),Rl=Object.freeze(Object.defineProperty({__proto__:null,default:El},Symbol.toStringTag,{value:"Module"}));export{Rl as F,dl as i};
