"use strict";(self.webpackChunkpokemon_app=self.webpackChunkpokemon_app||[]).push([[7],{6007:(nt,U,a)=>{a.r(U),a.d(U,{CardModule:()=>tt});var d=a(6019),u=a(3886),T=a(6065),A=a(4762),Z=a(4522),m=a(2997),y=a(9433),p=a(2835),f=a(6565),L=a(2399),t=a(3668);const g=L.N.serverUrl;let x=(()=>{class e{constructor(n){this.httpClient=n}getCards(n){const i=new Z.LE({fromString:`${n.query?"q="+n.query:""}&page=${n.page}&pageSize=${n.pageSize}&orderBy=${n.orderBy}`});return this.httpClient.get(`${g}/cards`,{params:i}).pipe((0,p.K)(o=>this.handleError(o)))}getTypes(){return this.httpClient.get(`${g}/types`,{context:(0,f.DN)()}).pipe((0,p.K)(()=>(0,m.of)("Error, could not load cards :-(")))}getSubtypes(){return this.httpClient.get(`${g}/subtypes`,{context:(0,f.DN)()}).pipe((0,p.K)(()=>(0,m.of)("Error, could not load cards :-(")))}getSupetypes(){return this.httpClient.get(`${g}/supertypes`,{context:(0,f.DN)()}).pipe((0,p.K)(()=>(0,m.of)("Error, could not load cards :-(")))}handleError(n){return n.error instanceof ErrorEvent?(0,y._)("Ohps something wrong happen here; please try again later."):(0,y._)(n)}}return e.\u0275fac=function(n){return new(n||e)(t.LFG(Z.eN))},e.\u0275prov=t.Yz7({token:e,factory:e.\u0275fac,providedIn:"root"}),e})();var q=a(8100),_=a(7384),F=a(423),O=a(4753),c=a(515),C=a(8583),v=a(8167),S=a(6400),h=a(9133),J=a(6731),b=a(86),M=a(7964);let z=(()=>{class e{constructor(){this.isLoading=!1,this.size=1}ngOnInit(){}}return e.\u0275fac=function(n){return new(n||e)},e.\u0275cmp=t.Xpm({type:e,selectors:[["app-loader"]],inputs:{isLoading:"isLoading",size:"size",message:"message"},decls:8,vars:4,consts:[[3,"hidden"],["mode","indeterminate",3,"strokeWidth","diameter"],[1,"message"]],template:function(n,i){1&n&&(t.TgZ(0,"div",0),t._uU(1,"\n  "),t._UZ(2,"mat-progress-spinner",1),t._uU(3,"\n  "),t.TgZ(4,"span",2),t._uU(5),t.qZA(),t._uU(6,"\n"),t.qZA(),t._uU(7,"\n")),2&n&&(t.Q6J("hidden",!i.isLoading),t.xp6(2),t.Q6J("strokeWidth",2)("diameter",32*i.size),t.xp6(3),t.Oqu(i.message))},directives:[M.Ou],styles:[".mat-progress-spinner[_ngcontent-%COMP%]{display:inline-block;vertical-align:middle}.message[_ngcontent-%COMP%]{margin-left:.5em}"]}),e})();var l=a(888),P=a(8977);const Q=["paginator"];function $(e,s){if(1&e&&(t.TgZ(0,"mat-option",14),t._uU(1),t.qZA()),2&e){const n=s.$implicit;t.Q6J("value",n),t.xp6(1),t.hij(" ",n,"")}}function N(e,s){if(1&e&&(t.TgZ(0,"mat-option",14),t._uU(1),t.qZA()),2&e){const n=s.$implicit;t.Q6J("value",n),t.xp6(1),t.hij(" ",n,"")}}function j(e,s){if(1&e&&(t.TgZ(0,"mat-option",14),t._uU(1),t.qZA()),2&e){const n=s.$implicit;t.Q6J("value",n),t.xp6(1),t.hij(" ",n,"")}}function E(e,s){1&e&&(t.TgZ(0,"div",1),t._uU(1,"No records found"),t.qZA())}function I(e,s){if(1&e&&(t.TgZ(0,"div",1),t._uU(1),t.qZA()),2&e){const n=t.oxw();t.xp6(1),t.Oqu(n.isError)}}function Y(e,s){if(1&e&&(t.TgZ(0,"span"),t._uU(1),t.qZA()),2&e){const n=s.$implicit;t.xp6(1),t.Oqu(n)}}function R(e,s){if(1&e&&(t.TgZ(0,"span"),t._uU(1,"\n                    "),t.TgZ(2,"strong"),t._uU(3,"Types:"),t.qZA(),t._uU(4),t.qZA()),2&e){const n=s.$implicit;t.xp6(4),t.hij("\n                    ",n,"\n                  ")}}function B(e,s){if(1&e&&(t.ynx(0),t._uU(1,"\n        "),t.TgZ(2,"div",4),t._uU(3,"\n          "),t.TgZ(4,"mat-card"),t._uU(5,"\n            "),t.TgZ(6,"mat-card-header"),t._uU(7,"\n              "),t.TgZ(8,"mat-card-title"),t._uU(9,"\n                "),t.TgZ(10,"div",18),t._uU(11,"\n                  "),t.TgZ(12,"span",19),t._uU(13),t.qZA(),t._uU(14,"\n                  "),t.TgZ(15,"small",20),t._uU(16),t.qZA(),t._uU(17,"\n                "),t.qZA(),t._uU(18,"\n              "),t.qZA(),t._uU(19,"\n              "),t.TgZ(20,"mat-card-subtitle"),t._uU(21,"\n                "),t.TgZ(22,"p"),t._uU(23,"\n                  "),t.TgZ(24,"strong"),t._uU(25," Supertype:"),t.qZA(),t._uU(26),t._UZ(27,"br"),t._uU(28,"\n                  "),t.TgZ(29,"strong"),t._uU(30," Subtypes:"),t.qZA(),t._uU(31,"\n                  "),t.YNc(32,Y,2,1,"span",17),t._uU(33," "),t._UZ(34,"br"),t._uU(35,"\n\n                  "),t.YNc(36,R,5,1,"span",17),t._uU(37,"\n                "),t.qZA(),t._uU(38,"\n              "),t.qZA(),t._uU(39,"\n            "),t.qZA(),t._uU(40,"\n\n            "),t.TgZ(41,"mat-card-content"),t._uU(42,"\n              "),t.TgZ(43,"div",21),t._uU(44,"\n                "),t._UZ(45,"img",22),t._uU(46,"\n              "),t.qZA(),t._uU(47,"\n            "),t.qZA(),t._uU(48,"\n          "),t.qZA(),t._uU(49,"\n        "),t.qZA(),t._uU(50,"\n      "),t.BQk()),2&e){const n=s.$implicit;t.xp6(13),t.hij(" ",n.name,""),t.xp6(2),t.Q6J("hidden",!n.hp),t.xp6(1),t.hij("HP: ",n.hp,""),t.xp6(10),t.hij(" ",n.supertype," "),t.xp6(6),t.Q6J("ngForOf",n.subtypes),t.xp6(4),t.Q6J("ngForOf",n.types),t.xp6(9),t.s9C("src",n.images.small,t.LSH),t.s9C("alt",n.name)}}function D(e,s){if(1&e&&(t.TgZ(0,"div",15),t._uU(1,"\n    "),t.TgZ(2,"div",16),t._uU(3,"\n      "),t.YNc(4,B,51,8,"ng-container",17),t._uU(5,"\n    "),t.qZA(),t._uU(6,"\n  "),t.qZA()),2&e){const n=s.ngIf;t.xp6(4),t.Q6J("ngForOf",n)}}const w=function(){return[10,20,50,100,200]};function G(e,s){if(1&e&&(t.TgZ(0,"mat-paginator",23,24),t._uU(2,"\n  "),t.qZA()),2&e){const n=t.oxw();t.Q6J("length",n.totalCount)("pageSize",n.pageSize)("pageSizeOptions",t.DdM(3,w))}}let K=(()=>{class e{constructor(n,i,o){this.pokemonService=n,this.route=i,this.router=o,this.isLoading=!1,this.isRecordsFound=!1,this.filters={types:"",subtypes:"",supertypes:""},this.request={page:1,pageSize:10,orderBy:"name"}}ngOnInit(){this.buildPaginationRequest(),this.loadData(this.request),this.loadFilters().pipe((0,_.b)(n=>{this.typesList=n[0].data,this.subtypesList=n[1].data,this.supertypesList=n[2].data})).subscribe()}ngAfterViewInit(){this.paginator.page.subscribe(()=>{this.request.page=this.paginator.pageIndex+1,this.request.pageSize=this.paginator.pageSize,this.request.orderBy="name",this.updateUrlParams(this.request),this.loadData(this.request)})}buildPaginationRequest(){this.route.queryParams.subscribe(n=>{this.activatedRoute=this.route.parent,this.request=Object.assign(Object.assign({},this.request),n)})}updateUrlParams(n){return this.router.navigate([],{relativeTo:this.activatedRoute,queryParams:n,queryParamsHandling:"merge"})}loadData(n){this.isLoading=!0,this.cards$=this.pokemonService.getCards(n).pipe((0,p.K)(i=>(0,A.mG)(this,void 0,void 0,function*(){this.isError=i.message})),(0,F.x)(()=>this.isLoading=!1),(0,_.b)(i=>{0!==(null==i?void 0:i.data.length)&&void 0!==(null==i?void 0:i.data)?(this.page=i.page,this.pageSize=i.pageSize,this.totalCount=i.totalCount):this.isRecordsFound=!0}),(0,O.U)(i=>i.data))}loadFilters(){const n=this.pokemonService.getTypes(),i=this.pokemonService.getSubtypes(),o=this.pokemonService.getSupetypes();return(0,q.D)([n,i,o])}applyAllFilters(){const{supertypes:n,types:i,subtypes:o}=this.filters;let r;!n&&!i&&!o||(n&&(r=`supertype:${n}`),n&&i&&(r=`supertype:${n} types:${i}`),n&&i&&o&&(r=`supertype:${n} types:${i} subtypes:${o}`),this.request=Object.assign(this.request,{query:r,page:1}),this.loadData(this.request),this.updateUrlParams(this.request))}clearFilters(){Object.keys(this.filters).forEach(n=>this.filters[n]=""),Object.keys(this.request).forEach(n=>this.request[n]=""),this.request.page=1,this.request.pageSize=10,this.request.orderBy="name",this.updateUrlParams(this.request),this.loadData(this.request)}}return e.\u0275fac=function(n){return new(n||e)(t.Y36(x),t.Y36(u.gz),t.Y36(u.F0))},e.\u0275cmp=t.Xpm({type:e,selectors:[["app-card-list"]],viewQuery:function(n,i){if(1&n&&t.Gf(Q,5),2&n){let o;t.iGM(o=t.CRH())&&(i.paginator=o.first)}},decls:102,vars:13,consts:[[1,"container"],["fxLayout","row","fxLayoutAlign","center start"],["translate",""],["fxLayout","row wrap","fxLayoutGap","16px grid","fxLayout.lt-sm","column","fxLayoutAlign","space-between center"],["fxFlex","25%","fxFlex.lt-md","50%","fxFlex.lt-sm","100%"],[3,"ngModel","ngModelChange"],[3,"value",4,"ngFor","ngForOf"],["fxLayout","row wrap","fxLayoutAlign","space-between center"],["fxFlex","","mat-flat-button","","color","primary",3,"click"],["fxFlex","","mat-button","","color","primary",3,"click"],[3,"isLoading"],["fxLayout","row","fxLayoutAlign","center start",4,"ngIf"],["class","card-content",4,"ngIf"],["showFirstLastButtons","",3,"length","pageSize","pageSizeOptions",4,"ngIf"],[3,"value"],[1,"card-content"],["fxLayout","row wrap","fxLayoutGap","16px grid","fxLayout.lt-sm","column","fxLayoutAlign","start center","fxLayoutAlign.lt-sm","start center"],[4,"ngFor","ngForOf"],["fxLayout","row","fxLayoutAlign","space-between center"],["fxFlex",""],[3,"hidden"],[1,"img-placeholder"],["loading","lazy",3,"src","alt"],["showFirstLastButtons","",3,"length","pageSize","pageSizeOptions"],["paginator",""]],template:function(n,i){1&n&&(t.TgZ(0,"div",0),t._uU(1,"\n  "),t.TgZ(2,"div",1),t._uU(3,"\n    "),t.TgZ(4,"h1",2),t._uU(5,"Pokemon Cards"),t.qZA(),t._uU(6,"\n  "),t.qZA(),t._uU(7,"\n  "),t.TgZ(8,"div",3),t._uU(9,"\n    "),t.TgZ(10,"div",4),t._uU(11,"\n      "),t.TgZ(12,"mat-form-field"),t._uU(13,"\n        "),t.TgZ(14,"mat-label"),t.TgZ(15,"span",2),t._uU(16,"Filter by supertypes"),t.qZA(),t.qZA(),t._uU(17,"\n        "),t.TgZ(18,"mat-select",5),t.NdJ("ngModelChange",function(r){return i.filters.supertypes=r}),t._uU(19,"\n          "),t.TgZ(20,"mat-option"),t.TgZ(21,"span",2),t._uU(22,"All"),t.qZA(),t.qZA(),t._uU(23,"\n          "),t.YNc(24,$,2,2,"mat-option",6),t._uU(25,"\n        "),t.qZA(),t._uU(26,"\n      "),t.qZA(),t._uU(27,"\n    "),t.qZA(),t._uU(28,"\n    "),t.TgZ(29,"div",4),t._uU(30,"\n      "),t.TgZ(31,"mat-form-field"),t._uU(32,"\n        "),t.TgZ(33,"mat-label"),t.TgZ(34,"span",2),t._uU(35,"Filter by types"),t.qZA(),t.qZA(),t._uU(36,"\n        "),t.TgZ(37,"mat-select",5),t.NdJ("ngModelChange",function(r){return i.filters.types=r}),t._uU(38,"\n          "),t.TgZ(39,"mat-option"),t.TgZ(40,"span",2),t._uU(41,"All"),t.qZA(),t.qZA(),t._uU(42,"\n          "),t.YNc(43,N,2,2,"mat-option",6),t._uU(44,"\n        "),t.qZA(),t._uU(45,"\n      "),t.qZA(),t._uU(46,"\n    "),t.qZA(),t._uU(47,"\n    "),t.TgZ(48,"div",4),t._uU(49,"\n      "),t.TgZ(50,"mat-form-field"),t._uU(51,"\n        "),t.TgZ(52,"mat-label"),t.TgZ(53,"span",2),t._uU(54,"Filter by subtypes"),t.qZA(),t.qZA(),t._uU(55,"\n        "),t.TgZ(56,"mat-select",5),t.NdJ("ngModelChange",function(r){return i.filters.subtypes=r}),t._uU(57,"\n          "),t.TgZ(58,"mat-option"),t.TgZ(59,"span",2),t._uU(60,"All"),t.qZA(),t.qZA(),t._uU(61,"\n          "),t.YNc(62,j,2,2,"mat-option",6),t._uU(63,"\n        "),t.qZA(),t._uU(64,"\n      "),t.qZA(),t._uU(65,"\n    "),t.qZA(),t._uU(66,"\n\n    "),t.TgZ(67,"div",7),t._uU(68,"\n      "),t.TgZ(69,"button",8),t.NdJ("click",function(){return i.applyAllFilters()}),t._uU(70,"\n        "),t.TgZ(71,"span",2),t._uU(72,"Apply Filters"),t.qZA(),t._uU(73,"\n      "),t.qZA(),t._uU(74,"\n      "),t.TgZ(75,"button",9),t.NdJ("click",function(){return i.clearFilters()}),t._uU(76,"\n        "),t.TgZ(77,"span",2),t._uU(78,"Clear Filters"),t.qZA(),t._uU(79,"\n      "),t.qZA(),t._uU(80,"\n    "),t.qZA(),t._uU(81,"\n  "),t.qZA(),t._uU(82,"\n\n  "),t._UZ(83,"br"),t._uU(84,"\n\n  "),t.TgZ(85,"div",1),t._uU(86,"\n    "),t._UZ(87,"app-loader",10),t._uU(88,"\n  "),t.qZA(),t._uU(89,"\n\n  "),t.YNc(90,E,2,0,"div",11),t._uU(91,"\n  "),t.YNc(92,I,2,1,"div",11),t._uU(93,"\n\n  "),t.YNc(94,D,7,1,"div",12),t.ALo(95,"async"),t._uU(96,"\n\n  "),t._UZ(97,"br"),t._uU(98,"\n  "),t.YNc(99,G,3,4,"mat-paginator",13),t._uU(100,"\n"),t.qZA(),t._uU(101,"\n")),2&n&&(t.xp6(18),t.Q6J("ngModel",i.filters.supertypes),t.xp6(6),t.Q6J("ngForOf",i.supertypesList),t.xp6(13),t.Q6J("ngModel",i.filters.types),t.xp6(6),t.Q6J("ngForOf",i.typesList),t.xp6(13),t.Q6J("ngModel",i.filters.subtypes),t.xp6(6),t.Q6J("ngForOf",i.subtypesList),t.xp6(25),t.Q6J("isLoading",i.isLoading),t.xp6(3),t.Q6J("ngIf",i.isRecordsFound),t.xp6(2),t.Q6J("ngIf",i.isError),t.xp6(2),t.Q6J("ngIf",t.lcZ(95,11,i.cards$)),t.xp6(5),t.Q6J("ngIf",!i.isRecordsFound))},directives:[c.xw,c.Wh,C.Pi,c.SQ,c.yH,v.KE,v.hX,S.gD,h.JJ,h.On,J.ey,d.sg,b.lW,z,d.O5,l.a8,l.dk,l.n5,l.$j,l.dn,P.NW],pipes:[d.Ov],styles:["[_nghost-%COMP%]   .mat-card-header-text[_ngcontent-%COMP%]{margin:0;width:100%}.img-placeholder[_ngcontent-%COMP%]{background-color:#f0f8ff;max-width:245px;margin:0 auto;padding:0;height:auto;min-height:285px;border-radius:10px}.img-placeholder[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:100%}.mat-flat-button[_ngcontent-%COMP%]{width:100%}.mat-form-field[_ngcontent-%COMP%]{width:100%}"]}),e})();const H=[{path:"",component:(()=>{class e{constructor(){}ngOnInit(){}}return e.\u0275fac=function(n){return new(n||e)},e.\u0275cmp=t.Xpm({type:e,selectors:[["app-card"]],decls:5,vars:0,consts:[[1,"app-container"]],template:function(n,i){1&n&&(t.TgZ(0,"div",0),t._uU(1,"\n  "),t._UZ(2,"router-outlet"),t._uU(3,"\n"),t.qZA(),t._uU(4,"\n"))},directives:[u.lC],styles:[".container[_ngcontent-%COMP%]{text-align:center;padding:1rem}"]}),e})(),data:{title:(0,T.J)("Card")},children:[{path:"",component:K}]}];let W=(()=>{class e{}return e.\u0275fac=function(n){return new(n||e)},e.\u0275mod=t.oAB({type:e}),e.\u0275inj=t.cJS({providers:[],imports:[[u.Bz.forChild(H)],u.Bz]}),e})();var X=a(6153),k=a(704),V=a(862);let tt=(()=>{class e{}return e.\u0275fac=function(n){return new(n||e)},e.\u0275mod=t.oAB({type:e}),e.\u0275inj=t.cJS({imports:[[d.ez,h.u5,C.aw,X.o9,V.m,k.q,W]]}),e})()}}]);