"use strict";
// 2026-10-28: Firekylin adaptation. All queries reuse public-content filters.
module.exports=({Widget,ContentsWidget})=>({
 Widget_Nexmoe_Blog:class extends Widget {async execute(){const groups=await this.model('post').getPostArchive();this.push({groups,postCount:Object.values(groups).reduce((n,rows)=>n+rows.length,0)});}},
 Widget_Nexmoe_FullPosts:class extends ContentsWidget {async execute(){const result=await this.model('post').getPostList(this.controller.get('page'),{tag:this.controller.get('tag'),cate:this.controller.get('cate'),field:'id,title,pathname,create_time,summary,content,comment_num,options'});this.pushAll(result&&result.data||[]);}}
});
