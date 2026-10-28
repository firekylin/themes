"use strict";
// 2026-10-28: Firekylin adaptation. All queries reuse public-content filters.
module.exports=({ContentsWidget})=>({
 Widget_Matcha_FullPosts:class extends ContentsWidget {async execute(){const result=await this.model('post').getPostList(this.controller.get('page'),{tag:this.controller.get('tag'),cate:this.controller.get('cate'),field:'id,title,pathname,create_time,summary,content,comment_num,options'});this.pushAll(result&&result.data||[]);}}
});
