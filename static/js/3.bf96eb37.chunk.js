(this["webpackJsonpmy-app"]=this["webpackJsonpmy-app"]||[]).push([[3],{292:function(t,e,s){"use strict";s.d(e,"a",(function(){return u}));var c=s(3),n=s(1),o=s(38),a=s(39),r=s(42),i=s(41),j=s(11),l=s(0),A=s.n(l),b=s(17),p=function(t){return{isAuth:t.authUser.isAuth}},u=function(t){var e=function(e){Object(r.a)(l,e);var s=Object(i.a)(l);function l(){return Object(o.a)(this,l),s.apply(this,arguments)}return Object(a.a)(l,[{key:"render",value:function(){return this.props.isAuth?Object(n.jsx)(t,Object(c.a)({},this.props)):Object(n.jsx)(j.a,{to:"/login"})}}]),l}(A.a.Component);return Object(b.b)(p)(e)}},294:function(t,e,s){t.exports={container:"ProfileInfo_container__3CkCl",description:"ProfileInfo_description__3MNmR",cover:"ProfileInfo_cover__3HuDb",cover__img:"ProfileInfo_cover__img__3PGdE",userPhoto:"ProfileInfo_userPhoto__PJJs9",btnSave:"ProfileInfo_btnSave__32mN_",labelInput:"ProfileInfo_labelInput__3vASD",contact:"ProfileInfo_contact__3SThj",status:"ProfileInfo_status__9rWbm"}},295:function(t,e,s){t.exports={content:"MyPosts_content__Rtv75",item:"MyPosts_item__2ewIa",postsBlock:"MyPosts_postsBlock__2eUNN",posts:"MyPosts_posts__21lKX",newPost__block:"MyPosts_newPost__block__2mqKY",newPost:"MyPosts_newPost__1egRu"}},296:function(t,e,s){t.exports={content:"Post_content__3RZeE",post__item:"Post_post__item__uklZv",post__content:"Post_post__content__1s4O3"}},297:function(t,e,s){"use strict";s.r(e);var c=s(3),n=s(1),o=s(38),a=s(39),r=s(42),i=s(41),j=s(0),l=s.n(j),A=s(96),b=s(52),p=s(294),u=s.n(p),d=s.p+"static/media/noJob.705ecf7b.png",O=function(t){var e=Object(j.useState)(!1),s=Object(A.a)(e,2),c=s[0],o=s[1],a=Object(j.useState)(t.status),r=Object(A.a)(a,2),i=r[0],l=r[1];Object(j.useEffect)((function(){l(t.status)}),[t.status]);return Object(n.jsx)("div",{children:c?Object(n.jsx)("div",{children:Object(n.jsx)("input",{onBlur:function(){o(!1),t.updateUserStatus(i)},autoFocus:!0,type:"text",value:i,onChange:function(t){l(t.currentTarget.value)}})}):Object(n.jsx)("div",{onDoubleClick:function(){t.isOwner&&o(!0)},children:Object(n.jsxs)("span",{children:[Object(n.jsx)("b",{children:"Status:"})," ",t.status]})})})},h=s(75),f=s(95),x=s(127),m=s(128),U=s(59),k=s(27),S=s.n(k),v=Object(f.a)("input"),Q=Object(f.a)("textarea"),E=Object(m.a)({form:"editProfile"})((function(t){return Object(n.jsxs)("form",{onSubmit:t.handleSubmit,className:u.a.description,children:[Object(n.jsxs)("div",{children:[Object(n.jsx)("b",{children:"Name:"}),Object(n.jsx)("span",{children:Object(n.jsx)(x.a,{name:"fullName",component:v,validate:[U.b]})})]}),Object(n.jsxs)("div",{children:[Object(n.jsx)("b",{children:"About me:"}),Object(n.jsx)("span",{children:Object(n.jsx)(x.a,{name:"aboutMe",component:Q,validate:[U.b]})})]}),Object(n.jsxs)("div",{children:[Object(n.jsxs)("div",{className:u.a.contacts,children:[Object(n.jsx)("b",{children:"Contacts:"}),Object.keys(t.profile.contacts).map((function(t){var e="contacts."+t;return Object(n.jsxs)("div",{children:[t,":",Object(n.jsx)(x.a,{name:e,component:v})]},t)}))]}),Object(n.jsxs)("div",{children:[Object(n.jsx)("b",{children:"Looking for a job?"}),Object(n.jsx)("span",{children:Object(n.jsx)(x.a,{name:"lookingForAJob",component:v,type:"checkbox"})})]}),Object(n.jsxs)("div",{children:[Object(n.jsx)("b",{children:"My professional skills:"}),Object(n.jsx)("span",{children:Object(n.jsx)(x.a,{name:"lookingForAJobDescription",component:Q,validate:[U.b]})})]}),Object(n.jsx)("div",{children:t.error&&Object(n.jsx)("span",{className:S.a.sumError,children:t.error})}),Object(n.jsx)("div",{className:S.a.btn,children:Object(n.jsx)("button",{children:"save"})})]})]})})),P=function(t){return Object(n.jsxs)("div",{className:u.a.description,children:[Object(n.jsxs)("div",{children:[Object(n.jsx)("b",{children:"Name:"})," ",t.profile.fullName]}),Object(n.jsxs)("div",{children:[Object(n.jsx)("b",{children:"About me:"})," ",t.profile.aboutMe]}),Object(n.jsxs)("div",{children:[Object(n.jsx)("div",{className:u.a.status,children:Object(n.jsx)(O,{status:t.status,updateUserStatus:t.updateUserStatus,isOwner:t.isOwner})}),Object(n.jsxs)("div",{className:u.a.contacts,children:[Object(n.jsx)("b",{children:"Contacts:"}),Object.keys(t.profile.contacts).map((function(e){return Object(n.jsx)(I,{contactTitle:e,contactValue:t.profile.contacts[e]},e)}))]}),Object(n.jsx)("div",{children:Object(n.jsx)("img",{src:t.profile.lookingForAJob?"data:image/jpeg;base64,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":d,alt:""})}),t.profile.lookingForAJob&&Object(n.jsxs)("div",{children:[Object(n.jsx)("b",{children:"My professional skills:"})," ",t.profile.lookingForAJobDescription]})]}),t.isOwner&&Object(n.jsx)("div",{className:u.a.btnSave,children:Object(n.jsx)("button",{onClick:t.onEditMode,children:"edit"})})]})},I=function(t){var e=t.contactTitle,s=t.contactValue;return Object(n.jsx)("div",{className:u.a.contact,children:Object(n.jsx)("a",{href:s,children:e})})},q=function(t){var e=Object(j.useState)(!1),s=Object(A.a)(e,2),c=s[0],o=s[1];if(!t.profile)return Object(n.jsx)(b.a,{});return Object(n.jsxs)("div",{children:[Object(n.jsxs)("div",{className:u.a.container,children:[Object(n.jsxs)("div",{children:[Object(n.jsx)("img",{className:u.a.userPhoto,src:t.profile.photos.large||h.a}),Object(n.jsx)("div",{children:t.isOwner&&Object(n.jsxs)("label",{className:u.a.labelInput,children:[Object(n.jsx)("input",{type:"file",onChange:function(e){e.target.files.length&&t.savePhoto(e.target.files[0])}}),"Choose a photo"]})})]}),c?Object(n.jsx)(E,{initialValues:t.profile,onSubmit:function(e){t.saveProfile(e).then((function(){return o(!1)}))},profile:t.profile}):Object(n.jsx)(P,{profile:t.profile,isOwner:t.isOwner,status:t.status,updateUserStatus:t.updateUserStatus,onEditMode:function(){return o(!0)}})]}),Object(n.jsx)("div",{className:u.a.cover,children:Object(n.jsx)("img",{className:u.a.cover__img,src:"https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg",alt:""})})]})},C=s(43),B=s(295),g=s.n(B),N=s(296),V=s.n(N),y=function(t){return Object(n.jsxs)("div",{className:V.a.post__item,children:[Object(n.jsx)("div",{children:Object(n.jsx)("img",{src:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzI1Jqd25IhJsMJf4wBCd_EDER193pS9_KjQ&usqp=CAU",alt:""})}),Object(n.jsxs)("div",{className:V.a.post__content,children:[t.message,Object(n.jsxs)("div",{children:["\u2764 ",t.likesCount]})]})]})},w=Object(f.a)("textarea"),M=Object(U.a)(50),K=Object(m.a)({form:"myPost"})((function(t){return Object(n.jsx)("form",{onSubmit:t.handleSubmit,children:Object(n.jsxs)("div",{className:g.a.newPost,children:[Object(n.jsx)("div",{children:Object(n.jsx)(x.a,{placeholder:"How are you?",name:"postArea",component:w,cols:"70",rows:"3",validate:[U.b,M]})}),Object(n.jsx)("div",{children:Object(n.jsx)("button",{children:"Add post"})})]})})})),H=function(t){var e=t.posts.map((function(t){return Object(n.jsx)(y,{message:t.message,likesCount:t.likesCount},t.id)}));return Object(n.jsxs)("div",{className:g.a.postsBlock,children:[Object(n.jsxs)("div",{className:g.a.newPost__block,children:[Object(n.jsx)("h3",{children:"My posts"}),Object(n.jsx)(K,{onSubmit:function(e){t.addPost(e.postArea)}})]}),Object(n.jsx)("div",{className:g.a.posts,children:e})]})},J=s(17),R=s(37),X=Object(J.b)((function(t){return{posts:t.profilePage.postsData,newPost:t.profilePage.newPostText}}),(function(t){return{addPost:function(e){t(Object(C.a)(e)),t(Object(R.a)("myPost"))}}}))(H),G=function(t){return Object(n.jsxs)("div",{children:[Object(n.jsx)(q,{profile:t.profile,status:t.status,updateUserStatus:t.updateUserStatus,isOwner:t.isOwner,savePhoto:t.savePhoto,saveProfile:t.saveProfile}),Object(n.jsx)(X,{store:t.store})]})},_=s(11),T=s(292),D=s(10),F=function(t){Object(r.a)(s,t);var e=Object(i.a)(s);function s(){return Object(o.a)(this,s),e.apply(this,arguments)}return Object(a.a)(s,[{key:"refreshProfile",value:function(){var t=this.props.match.params.userId;t||(t=this.props.userId),t||this.props.history.push("/login"),this.props.getUserProfile(t),this.props.getUserStatus(t)}},{key:"componentDidMount",value:function(){this.refreshProfile()}},{key:"componentDidUpdate",value:function(t,e,s){this.props.match.params.userId!=t.match.params.userId&&this.refreshProfile()}},{key:"render",value:function(){return Object(n.jsx)(G,Object(c.a)(Object(c.a)({},this.props),{},{isOwner:!this.props.match.params.userId}))}}]),s}(l.a.Component);e.default=Object(D.d)(Object(J.b)((function(t){return{profile:t.profilePage.profile,status:t.profilePage.status,userId:t.authUser.userId}}),{getUserProfile:C.d,getUserStatus:C.e,updateUserStatus:C.i,savePhoto:C.f,saveProfile:C.g}),_.g,T.a)(F)}}]);
//# sourceMappingURL=3.bf96eb37.chunk.js.map