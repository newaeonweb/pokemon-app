(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{jPtW:function(t,e,n){"use strict";n.r(e),n.d(e,"CardModule",function(){return H});var c=n("ofXK"),i=n("tyNb"),a=n("4u49"),s=n("mrSG"),r=n("tk/3"),o=n("LRne"),b=n("z6cu"),p=n("JIr8"),l=n("J4O8"),u=n("AytR"),d=n("fXoL");const g=u.a.serverUrl;let f=(()=>{class t{constructor(t){this.httpClient=t}getCards(t){const e=new r.e({fromString:`${t.query?"q="+t.query:""}&page=${t.page}&pageSize=${t.pageSize}&orderBy=${t.orderBy}`});return this.httpClient.get(`${g}/cards`,{params:e}).pipe(Object(p.a)(t=>this.handleError(t)))}getTypes(){return this.httpClient.get(`${g}/types`,Object(l.b)()).pipe(Object(p.a)(()=>Object(o.a)("Error, could not load cards :-(")))}getSubtypes(){return this.httpClient.get(`${g}/subtypes`,Object(l.b)()).pipe(Object(p.a)(()=>Object(o.a)("Error, could not load cards :-(")))}getSupetypes(){return this.httpClient.get(`${g}/supertypes`,Object(l.b)()).pipe(Object(p.a)(()=>Object(o.a)("Error, could not load cards :-(")))}handleError(t){return t.error instanceof ErrorEvent?Object(b.a)("Ohps something wrong happen here; please try again later."):Object(b.a)(t)}}return t.\u0275fac=function(e){return new(e||t)(d.Yb(r.b))},t.\u0275prov=d.Kb({token:t,factory:t.\u0275fac,providedIn:"root"}),t})();var B=n("cp0P"),h=n("vkgz"),m=n("nYR2"),y=n("lJxs"),U=n("XiUz"),T=n("sYmb"),v=n("kmnG"),O=n("d3UM"),x=n("3Pt+"),D=n("FKr1"),L=n("bTqV"),F=n("ogi/"),w=n("Wp6s"),j=n("M9IT");const q=["paginator"];function S(t,e){if(1&t&&(d.Ub(0,"mat-option",14),d.Bc(1),d.Tb()),2&t){const t=e.$implicit;d.lc("value",t),d.Db(1),d.Dc(" ",t,"")}}function z(t,e){if(1&t&&(d.Ub(0,"mat-option",14),d.Bc(1),d.Tb()),2&t){const t=e.$implicit;d.lc("value",t),d.Db(1),d.Dc(" ",t,"")}}function C(t,e){if(1&t&&(d.Ub(0,"mat-option",14),d.Bc(1),d.Tb()),2&t){const t=e.$implicit;d.lc("value",t),d.Db(1),d.Dc(" ",t,"")}}function P(t,e){1&t&&(d.Ub(0,"div",1),d.Bc(1,"No records found"),d.Tb())}function M(t,e){if(1&t&&(d.Ub(0,"div",1),d.Bc(1),d.Tb()),2&t){const t=d.gc();d.Db(1),d.Cc(t.isError)}}function k(t,e){if(1&t&&(d.Ub(0,"span"),d.Bc(1),d.Tb()),2&t){const t=e.$implicit;d.Db(1),d.Cc(t)}}function $(t,e){if(1&t&&(d.Ub(0,"span"),d.Bc(1,"\n                    "),d.Ub(2,"strong"),d.Bc(3,"Types:"),d.Tb(),d.Bc(4),d.Tb()),2&t){const t=e.$implicit;d.Db(4),d.Dc("\n                    ",t,"\n                  ")}}function I(t,e){if(1&t&&(d.Sb(0),d.Bc(1,"\n        "),d.Ub(2,"div",4),d.Bc(3,"\n          "),d.Ub(4,"mat-card"),d.Bc(5,"\n            "),d.Ub(6,"mat-card-header"),d.Bc(7,"\n              "),d.Ub(8,"mat-card-title"),d.Bc(9,"\n                "),d.Ub(10,"div",18),d.Bc(11,"\n                  "),d.Ub(12,"span",19),d.Bc(13),d.Tb(),d.Bc(14,"\n                  "),d.Ub(15,"small",20),d.Bc(16),d.Tb(),d.Bc(17,"\n                "),d.Tb(),d.Bc(18,"\n              "),d.Tb(),d.Bc(19,"\n              "),d.Ub(20,"mat-card-subtitle"),d.Bc(21,"\n                "),d.Ub(22,"p"),d.Bc(23,"\n                  "),d.Ub(24,"strong"),d.Bc(25," Supertype:"),d.Tb(),d.Bc(26),d.Pb(27,"br"),d.Bc(28,"\n                  "),d.Ub(29,"strong"),d.Bc(30," Subtypes:"),d.Tb(),d.Bc(31,"\n                  "),d.zc(32,k,2,1,"span",17),d.Bc(33," "),d.Pb(34,"br"),d.Bc(35,"\n\n                  "),d.zc(36,$,5,1,"span",17),d.Bc(37,"\n                "),d.Tb(),d.Bc(38,"\n              "),d.Tb(),d.Bc(39,"\n            "),d.Tb(),d.Bc(40,"\n\n            "),d.Ub(41,"mat-card-content"),d.Bc(42,"\n              "),d.Ub(43,"div",21),d.Bc(44,"\n                "),d.Pb(45,"img",22),d.Bc(46,"\n              "),d.Tb(),d.Bc(47,"\n            "),d.Tb(),d.Bc(48,"\n          "),d.Tb(),d.Bc(49,"\n        "),d.Tb(),d.Bc(50,"\n      "),d.Rb()),2&t){const t=e.$implicit;d.Db(13),d.Dc(" ",t.name,""),d.Db(2),d.lc("hidden",!t.hp),d.Db(1),d.Dc("HP: ",t.hp,""),d.Db(10),d.Dc(" ",t.supertype," "),d.Db(6),d.lc("ngForOf",t.subtypes),d.Db(4),d.lc("ngForOf",t.types),d.Db(9),d.mc("src",t.images.small,d.uc),d.mc("alt",t.name)}}function A(t,e){if(1&t&&(d.Ub(0,"div",15),d.Bc(1,"\n    "),d.Ub(2,"div",16),d.Bc(3,"\n      "),d.zc(4,I,51,8,"ng-container",17),d.Bc(5,"\n    "),d.Tb(),d.Bc(6,"\n  "),d.Tb()),2&t){const t=e.ngIf;d.Db(4),d.lc("ngForOf",t)}}const E=function(){return[10,20,50,100,200]};function R(t,e){if(1&t&&(d.Ub(0,"mat-paginator",23,24),d.Bc(2,"\n  "),d.Tb()),2&t){const t=d.gc();d.lc("length",t.totalCount)("pageSize",t.pageSize)("pageSizeOptions",d.nc(3,E))}}let _=(()=>{class t{constructor(t,e,n){this.pokemonService=t,this.route=e,this.router=n,this.isLoading=!1,this.isRecordsFound=!1,this.filters={types:"",subtypes:"",supertypes:""},this.request={page:1,pageSize:10,orderBy:"name"}}ngOnInit(){this.buildPaginationRequest(),this.loadData(this.request),this.loadFilters().pipe(Object(h.a)(t=>{this.typesList=t[0].data,this.subtypesList=t[1].data,this.supertypesList=t[2].data})).subscribe()}ngAfterViewInit(){this.paginator.page.subscribe(()=>{this.request.page=this.paginator.pageIndex+1,this.request.pageSize=this.paginator.pageSize,this.request.orderBy="name",this.updateUrlParams(this.request),this.loadData(this.request)})}buildPaginationRequest(){this.route.queryParams.subscribe(t=>{this.activatedRoute=this.route.parent,this.request=Object.assign(Object.assign({},this.request),t)})}updateUrlParams(t){return this.router.navigate([],{relativeTo:this.activatedRoute,queryParams:t,queryParamsHandling:"merge"})}loadData(t){this.isLoading=!0,this.cards$=this.pokemonService.getCards(t).pipe(Object(p.a)(t=>Object(s.a)(this,void 0,void 0,function*(){this.isError=t.message})),Object(m.a)(()=>this.isLoading=!1),Object(h.a)(t=>{0!==(null==t?void 0:t.data.length)&&void 0!==(null==t?void 0:t.data)?(this.page=t.page,this.pageSize=t.pageSize,this.totalCount=t.totalCount):this.isRecordsFound=!0}),Object(y.a)(t=>t.data))}loadFilters(){const t=this.pokemonService.getTypes(),e=this.pokemonService.getSubtypes(),n=this.pokemonService.getSupetypes();return Object(B.a)([t,e,n])}applyAllFilters(){const{supertypes:t,types:e,subtypes:n}=this.filters;(t||e||n)&&(this.request=Object.assign(this.request,{query:`supertype:${t} types:${e} subtypes:${n}`,page:1}),this.loadData(this.request))}clearFilters(){Object.keys(this.filters).forEach(t=>this.filters[t]=""),Object.keys(this.request).forEach(t=>this.request[t]=""),this.request.page=1,this.request.pageSize=10,this.request.orderBy="name",this.updateUrlParams(this.request),this.loadData(this.request)}}return t.\u0275fac=function(e){return new(e||t)(d.Ob(f),d.Ob(i.a),d.Ob(i.e))},t.\u0275cmp=d.Ib({type:t,selectors:[["app-card-list"]],viewQuery:function(t,e){if(1&t&&d.Ec(q,1),2&t){let t;d.qc(t=d.dc())&&(e.paginator=t.first)}},decls:102,vars:13,consts:[[1,"container"],["fxLayout","row","fxLayoutAlign","center start"],["translate",""],["fxLayout","row wrap","fxLayoutGap","16px grid","fxLayout.lt-sm","column","fxLayoutAlign","space-between center"],["fxFlex","25%","fxFlex.lt-md","50%","fxFlex.lt-sm","100%"],[3,"ngModel","ngModelChange"],[3,"value",4,"ngFor","ngForOf"],["fxLayout","row wrap","fxLayoutAlign","space-between center"],["fxFlex","","mat-flat-button","","color","primary",3,"click"],["fxFlex","","mat-button","","color","primary",3,"click"],[3,"isLoading"],["fxLayout","row","fxLayoutAlign","center start",4,"ngIf"],["class","card-content",4,"ngIf"],["showFirstLastButtons","",3,"length","pageSize","pageSizeOptions",4,"ngIf"],[3,"value"],[1,"card-content"],["fxLayout","row wrap","fxLayoutGap","16px grid","fxLayout.lt-sm","column","fxLayoutAlign","start center","fxLayoutAlign.lt-sm","start center"],[4,"ngFor","ngForOf"],["fxLayout","row","fxLayoutAlign","space-between center"],["fxFlex",""],[3,"hidden"],[1,"img-placeholder"],["loading","lazy",3,"src","alt"],["showFirstLastButtons","",3,"length","pageSize","pageSizeOptions"],["paginator",""]],template:function(t,e){1&t&&(d.Ub(0,"div",0),d.Bc(1,"\n  "),d.Ub(2,"div",1),d.Bc(3,"\n    "),d.Ub(4,"h1",2),d.Bc(5,"Pokemon Cards"),d.Tb(),d.Bc(6,"\n  "),d.Tb(),d.Bc(7,"\n  "),d.Ub(8,"div",3),d.Bc(9,"\n    "),d.Ub(10,"div",4),d.Bc(11,"\n      "),d.Ub(12,"mat-form-field"),d.Bc(13,"\n        "),d.Ub(14,"mat-label"),d.Ub(15,"span",2),d.Bc(16,"Filter by supertypes"),d.Tb(),d.Tb(),d.Bc(17,"\n        "),d.Ub(18,"mat-select",5),d.cc("ngModelChange",function(t){return e.filters.supertypes=t}),d.Bc(19,"\n          "),d.Ub(20,"mat-option"),d.Ub(21,"span",2),d.Bc(22,"All"),d.Tb(),d.Tb(),d.Bc(23,"\n          "),d.zc(24,S,2,2,"mat-option",6),d.Bc(25,"\n        "),d.Tb(),d.Bc(26,"\n      "),d.Tb(),d.Bc(27,"\n    "),d.Tb(),d.Bc(28,"\n    "),d.Ub(29,"div",4),d.Bc(30,"\n      "),d.Ub(31,"mat-form-field"),d.Bc(32,"\n        "),d.Ub(33,"mat-label"),d.Ub(34,"span",2),d.Bc(35,"Filter by types"),d.Tb(),d.Tb(),d.Bc(36,"\n        "),d.Ub(37,"mat-select",5),d.cc("ngModelChange",function(t){return e.filters.types=t}),d.Bc(38,"\n          "),d.Ub(39,"mat-option"),d.Ub(40,"span",2),d.Bc(41,"All"),d.Tb(),d.Tb(),d.Bc(42,"\n          "),d.zc(43,z,2,2,"mat-option",6),d.Bc(44,"\n        "),d.Tb(),d.Bc(45,"\n      "),d.Tb(),d.Bc(46,"\n    "),d.Tb(),d.Bc(47,"\n    "),d.Ub(48,"div",4),d.Bc(49,"\n      "),d.Ub(50,"mat-form-field"),d.Bc(51,"\n        "),d.Ub(52,"mat-label"),d.Ub(53,"span",2),d.Bc(54,"Filter by subtypes"),d.Tb(),d.Tb(),d.Bc(55,"\n        "),d.Ub(56,"mat-select",5),d.cc("ngModelChange",function(t){return e.filters.subtypes=t}),d.Bc(57,"\n          "),d.Ub(58,"mat-option"),d.Ub(59,"span",2),d.Bc(60,"All"),d.Tb(),d.Tb(),d.Bc(61,"\n          "),d.zc(62,C,2,2,"mat-option",6),d.Bc(63,"\n        "),d.Tb(),d.Bc(64,"\n      "),d.Tb(),d.Bc(65,"\n    "),d.Tb(),d.Bc(66,"\n\n    "),d.Ub(67,"div",7),d.Bc(68,"\n      "),d.Ub(69,"button",8),d.cc("click",function(){return e.applyAllFilters()}),d.Bc(70,"\n        "),d.Ub(71,"span",2),d.Bc(72,"Apply Filters"),d.Tb(),d.Bc(73,"\n      "),d.Tb(),d.Bc(74,"\n      "),d.Ub(75,"button",9),d.cc("click",function(){return e.clearFilters()}),d.Bc(76,"\n        "),d.Ub(77,"span",2),d.Bc(78,"Clear Filters"),d.Tb(),d.Bc(79,"\n      "),d.Tb(),d.Bc(80,"\n    "),d.Tb(),d.Bc(81,"\n  "),d.Tb(),d.Bc(82,"\n\n  "),d.Pb(83,"br"),d.Bc(84,"\n\n  "),d.Ub(85,"div",1),d.Bc(86,"\n    "),d.Pb(87,"app-loader",10),d.Bc(88,"\n  "),d.Tb(),d.Bc(89,"\n\n  "),d.zc(90,P,2,0,"div",11),d.Bc(91,"\n  "),d.zc(92,M,2,1,"div",11),d.Bc(93,"\n\n  "),d.zc(94,A,7,1,"div",12),d.hc(95,"async"),d.Bc(96,"\n\n  "),d.Pb(97,"br"),d.Bc(98,"\n  "),d.zc(99,R,3,4,"mat-paginator",13),d.Bc(100,"\n"),d.Tb(),d.Bc(101,"\n")),2&t&&(d.Db(18),d.lc("ngModel",e.filters.supertypes),d.Db(6),d.lc("ngForOf",e.supertypesList),d.Db(13),d.lc("ngModel",e.filters.types),d.Db(6),d.lc("ngForOf",e.typesList),d.Db(13),d.lc("ngModel",e.filters.subtypes),d.Db(6),d.lc("ngForOf",e.subtypesList),d.Db(25),d.lc("isLoading",e.isLoading),d.Db(3),d.lc("ngIf",e.isRecordsFound),d.Db(2),d.lc("ngIf",e.isError),d.Db(2),d.lc("ngIf",d.ic(95,11,e.cards$)),d.Db(5),d.lc("ngIf",!e.isRecordsFound))},directives:[U.c,U.b,T.a,U.d,U.a,v.b,v.e,O.a,x.h,x.j,D.m,c.j,L.a,F.a,c.k,w.a,w.d,w.g,w.f,w.c,j.a],pipes:[c.b],styles:["[_nghost-%COMP%]   .mat-card-header-text[_ngcontent-%COMP%]{margin:0;width:100%}.img-placeholder[_ngcontent-%COMP%]{background-color:#f0f8ff;max-width:245px;margin:0 auto;padding:0;height:auto;min-height:285px;border-radius:10px}.img-placeholder[_ngcontent-%COMP%]   img[_ngcontent-%COMP%], .mat-flat-button[_ngcontent-%COMP%], .mat-form-field[_ngcontent-%COMP%]{width:100%}"]}),t})();const J=[{path:"",component:(()=>{class t{constructor(){}ngOnInit(){}}return t.\u0275fac=function(e){return new(e||t)},t.\u0275cmp=d.Ib({type:t,selectors:[["app-card"]],decls:5,vars:0,consts:[[1,"app-container"]],template:function(t,e){1&t&&(d.Ub(0,"div",0),d.Bc(1,"\n  "),d.Pb(2,"router-outlet"),d.Bc(3,"\n"),d.Tb(),d.Bc(4,"\n"))},directives:[i.j],styles:[".container[_ngcontent-%COMP%]{text-align:center;padding:1rem}"]}),t})(),data:{title:Object(a.a)("Card")},children:[{path:"",component:_}]}];let G=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=d.Mb({type:t}),t.\u0275inj=d.Lb({providers:[],imports:[[i.i.forChild(J)],i.i]}),t})();var Y=n("YUcS"),K=n("vvyD"),X=n("9urI");let H=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=d.Mb({type:t}),t.\u0275inj=d.Lb({imports:[[c.c,x.d,T.b,Y.a,X.a,K.a,G]]}),t})()}}]);