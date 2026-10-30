'use strict';
// Firekylin adaptation, 2026. GPL-3.0; original Firekylin adapter. Fetch taxonomy only for IDs already
// selected by the native visibility-aware archive; never query post bodies.
module.exports = ({ContentsWidget}) => ({
  Widget_LoliMeow_Categories: class extends ContentsWidget {
    async execute() {
      this.byPost = {};
      const ids = [...new Set((this.parameter.postIds || []).map(Number))].filter(id => Number.isSafeInteger(id) && id > 0).slice(0, 100);
      if (!ids.length) return;
      const relations = await this.model('post_cate').where({post_id: ['IN', ids]}).select();
      const categoryIds = [...new Set(relations.map(row => row.cate_id))];
      if (!categoryIds.length) return;
      const categories = await this.model('cate').where({id: ['IN', categoryIds]}).setRelation(false).select();
      const lookup = new Map(categories.map(row => [Number(row.id), {name: row.name, pathname: row.pathname}]));
      for (const relation of relations) {
        const category = lookup.get(Number(relation.cate_id));
        if (category) (this.byPost[relation.post_id] ||= []).push(category);
      }
    }
  }
});
